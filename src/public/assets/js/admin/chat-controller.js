const ChatController = {
    socket: null,
    socket_id_sender: null,
    user_token: null,
    receiver: null,
    EventListener() {
        $('.user-chat').click(function () {
            if ($('.sidebar').hasClass('open')) {
                $('.sidebar').removeClass('open')
            }
            ChatController.SelectUserChat(this)
        })

        $('#content_form').submit(function (e) {
            e.preventDefault()
            const content = {
                receiver: ChatController.receiver,
                message: $('#content_message').val()
            }
            console.log(content)
            ChatController.socket.emit("chat:message", {content})
            $('#content_message').val('')
        })
    },
    SelectUserChat(_this) {
        ChatController.receiver = $(_this).data('user-id')
        $(`#has_mess_user_id_${ChatController.receiver}`).addClass('visually-hidden')
        ChatController.LoadChatData(ChatController.receiver, UpdateUI)
        function UpdateUI() {
            const user_avatar = $(_this).data('user-avatar')
            const full_name = $(_this).data('user-full-name')

            $('#chat_container').removeClass('visually-hidden')
            $('#bg_default_chat').addClass('visually-hidden')
            $('.user-chat').removeClass('active')
            $(_this).addClass('active')

            $('#avatar_current_user').attr('src', `/assets/media/avatar/${user_avatar}`)
            $('#name_current_user').html(full_name)
        }
    },
    LoadChatData(receiver, callback) {
        $.ajax({
            url: `/admin/chat/load-chat/user/${receiver}`,
            type: 'GET',
            beforeSend: LoadingWrapper(true),
            success: function (response) {
                setTimeout(() => {
                    if (response.code === 200) {
                        callback()
                        if (response.chat) {
                            ChatController.RenderMessageData(response.chat.messages)
                        }
                    } else {
                        Alert.Show('warning', 'Can not load the message')
                    }
                    LoadingWrapper(false)
                }, 1000)

            },
            error: function (error) {
                setTimeout(() => {
                    Alert.Show('warning', 'Something went wrong!')
                    LoadingWrapper(false)
                }, 500)

            }
        })
    },
    RenderMessageData(messages) {
        let total_message = ''
        messages.map(mess => {
            console.log(mess)
            let time = new Date(mess.time)
            time = [String(time.getHours()).padStart(2, '0'), String(time.getMinutes()).padStart(2, '0')].join(':')
            let  message_html =  `<li class="chat-right">
                                <div class="chat-hour">${time}</div>
                                <div class="chat-text" style="background: black; color: white">${mess.message}</div>
                                <div class="chat-avatar">
                                <img src="/assets/media/avatar/${mess.sender.avatar}" alt="avatar">
                                </div>
                                </li>`

            if (mess.sender._id === ChatController.receiver) {
                message_html =  `<li class="chat-left">
                                    <div class="chat-avatar">
                                        <img src="/assets/media/avatar/${mess.sender.avatar}"
                                             alt="avatar">
                                    </div>
                                    <div class="chat-text" style="background: #ff00002e; color: white">
                                        ${mess.message}
                                    </div>
                                    <div class="chat-hour">${time}</div>
                                </li>`
            }

            total_message += message_html
        })
        $('.chat-box').empty()
        $('.chat-box').append(total_message)
        $('.chat-box').scrollTop($('.chat-box')[0].scrollHeight);
    },
    ConnectRealtimeServer() {
        ChatController.socket = io({
            transports: ['websocket'],
            upgrade: true,
            query: {token: this.GetTokenFromCookie('user_token')}
        })
    },
    RealtimeListener() {
        ChatController.socket.on("connect", function () {
            console.log('connected - socket id: ', ChatController.socket.id)
            ChatController.socket_id_sender = ChatController.socket.id

            ChatController.socket.on('chat:message', function (data) {
                console.log(data)
                console.log('receiver',ChatController.receiver)
                console.log('sender',ChatController.socket_id_sender)
                if (data.content.socket_id_sender === ChatController.socket_id_sender || data.content.sender.id === ChatController.receiver) {
                    ChatController.RenderMessageRealtime(data.content)
                }
                if (data.content.sender.id !== ChatController.receiver) {
                    $(`#has_mess_user_id_${data.content.sender.id}`).removeClass('visually-hidden')
                }
            })
        });

        ChatController.socket.on('connect_error', function (error) {
            ChatController.socket.removeAllListeners()
            if (error.message === 'unauthorized') {
                console.log('unauthorized');
            }
        });

        ChatController.socket.on('reconnect', function (number) {
            console.log('number')
            console.log('reconnect')
        })

        ChatController.socket.on('disconnect', function (reason) {
            ChatController.socket.removeListener('chat:message')
            console.log(reason)
        })
    },
    RenderMessageRealtime(content) {
        console.log(content)
        let message_html = `<li class="chat-right">
                                <div class="chat-hour">${content.time}</div>
                                <div class="chat-text" style="background: black; color: white">${content.message}</div>
                                <div class="chat-avatar">
                                <img src="/assets/media/avatar/${content.sender.avatar}" alt="avatar">
                                </div>
                                </li>`

        if (content.sender.id === ChatController.receiver) {
            message_html = `<li class="chat-left">
                                    <div class="chat-avatar">
                                        <img src="/assets/media/avatar/${content.sender.avatar}"
                                             alt="avatar">
                                    </div>
                                    <div class="chat-text" style="background: #ff00002e; color: white">
                                        ${content.message}
                                    </div>
                                    <div class="chat-hour">${content.time}</div>
                                </li>`
        }

        $('.chat-box').append(message_html)
        $('.chat-box').scrollTop($('.chat-box')[0].scrollHeight);
    },
    GetTokenFromCookie(cname) {
        return $.cookie(cname)
    },
    Run() {
        ChatController.ConnectRealtimeServer()
        ChatController.RealtimeListener()
        ChatController.EventListener()
    }
}


$(document).ready(function () {
    ChatController.Run()
})
