const ChatController = {
    socket: null,
    socket_id_sender: null,
    user_token: null,
    receiver: null,
    is_login: false,
    ConnectSocketServer() {
        ChatController.socket = io({
            transports: ['websocket'],
            upgrade: true,
            query: {token: ChatController.user_token}
        })
    },
    SetUpSocketEvent() {
        ChatController.socket.on("connect", function () {
            console.log('connected id::', ChatController.socket.id)
            ChatController.socket_id_sender = ChatController.socket.id
            ChatController.socket.on('chat:message', function (data) {
                ChatController.RenderMessageRealtime(data.content)
            })
        });
        ChatController.socket.on('connect_error', function (error) {
            ChatController.socket.removeAllListeners()
            if (error.message === 'unauthorized') {
                console.log('unauthorized');
            }
        });

        ChatController.socket.on('reconnect', function (number) {
            console.log('reconnect::', number)
        })

        ChatController.socket.on('disconnect', function (reason) {
            ChatController.socket.removeListener('chat:message')
            console.log('disconnect::', reason)
        })
    },
    RenderMessageRealtime(content) {
        console.log(content)
        let message_html = `<div>
                            <img src="/assets/media/decoration/smartphone.svg"
                                 alt="icon"
                                 width="10%"
                                 class="d-inline-block">
                            <div class="message d-inline-block">
                                <div style="text-align: end">
                                    <div>
                                        ${content.message}
                                    </div>
                                    <p style="text-align: end;font-size: 11px">${content.time}</p>
                                </div>
                            </div>
                        </div>`

        if (content.socket_id_sender === ChatController.socket_id_sender) {
            message_html = `<div style="text-align: end">
                            <div class="message message-right d-inline-block">
                                <div style="text-align: end">
                                    <div>
                                         ${content.message}
                                    </div>
                                    <p style="text-align: start;color: white; font-size: 11px">${content.time}</p>
                                </div>
                            </div>
                            <img src="/assets/media/avatar/${content.sender.avatar}"
                                 alt="icon"
                                 width="10%"
                                 class="d-inline-block">
                        </div>`
        }

        $('#chat_box').append(message_html)
        $('#chat_box').scrollTop($('#chat_box')[0].scrollHeight);
    },
    EvenListener() {
        $('#btn_toggle_chat_box').click(function () {
            if ($('.chat').hasClass('open-chat-box')) {
                $('.chat').removeClass('open-chat-box')
                $('.chat').addClass('close-chat-box')
                $('#icon_toggle_chat_box').css('rotate', '0deg')
            } else {
                $('.chat').removeClass('close-chat-box')
                $('.chat').addClass('open-chat-box')
                $('#icon_toggle_chat_box').css('rotate', '180deg')
            }
        })

        $('#chat_form').submit(function (e) {
            e.preventDefault()
            if (!ChatController.is_login) {
                Alert.Show('warning', 'You must be login first!')
                return
            }
            const content = {
                message: $('#input_chat').val(),
                receiver: 'admin',

            }
            ChatController.socket.emit('chat:message', {content})
            $('#input_chat').val('')
        })

    },
    LoadChat() {
        $.ajax({
            url: '/chat/user-load-chat',
            type: 'GET',
            success: function (response) {
                console.log(response)
                if (response.chat) {
                    ChatController.RenderChat(response.chat)
                }
            },
            error: function (error) {

            }
        })
    },
    RenderChat(chat) {
        let total_messages = ''
        chat.messages.map(mess => {
            let time = new Date(mess.time)
            time = [String(time.getHours()).padStart(2, '0'), String(time.getMinutes()).padStart(2, '0')].join(':')
            let message_html = `<div>
                            <img src="/assets/media/avatar/${mess.sender.avatar}"
                                 alt="icon"
                                 width="10%"
                                 class="d-inline-block">
                            <div class="message d-inline-block">
                                <div style="text-align: end">
                                    <div>
                                        ${mess.message}
                                    </div>
                                    <p style="text-align: end;font-size: 11px">${time}</p>
                                </div>
                            </div>
                        </div>`

            if (chat.sender === mess.sender._id) {
                message_html = `<div style="text-align: end">
                            <div class="message message-right d-inline-block">
                                <div style="text-align: end">
                                    <div>
                                         ${mess.message}
                                    </div>
                                    <p style="text-align: start;color: white; font-size: 11px">${time}</p>
                                </div>
                            </div>
                            <img src="/assets/media/avatar/${mess.sender.avatar}"
                                 alt="icon"
                                 width="10%"
                                 class="d-inline-block">
                        </div>`
            }
            total_messages += message_html
        })
        $('#chat_box').append(total_messages)
        $('#chat_box').scrollTop($('#chat_box')[0].scrollHeight);
    },
    Run() {
        ChatController.user_token = $.cookie('user_token')
        if (ChatController.user_token !== undefined) {
            ChatController.LoadChat()
            ChatController.is_login = true
            ChatController.ConnectSocketServer()
            ChatController.SetUpSocketEvent()
        }
        ChatController.EvenListener()
    }
}


$(document).ready(function () {
    ChatController.Run()
})