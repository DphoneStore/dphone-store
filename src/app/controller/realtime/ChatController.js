const ChatRepository = require('../../repository/ChatRepository')
const Roles = require('../../constant/Role')
const ChatController = (socket) => {
    console.log('connection::', socket.id)

    const message = async (data) => {
        const content = data.content
        console.log(content)

        let  receiver_id = content.receiver
        if(receiver_id === Roles.ADMIN){
            receiver_id = global.admin_id
        }
        const receiver = __user_sockets.find(user => {
            return user.user_id === receiver_id
        })

        content.socket_id_sender = socket.id
        content.sender = {
            id: socket.sender.id,
            avatar: socket.sender.avatar
        }
        const sender_id = socket.sender.id
        let time = new Date()
        const message = {
            sender: content.sender.id,
            message: content.message,
            time
        }
        try{
            console.log(await ChatRepository.AddNewMessage(sender_id, receiver_id, message))
        } catch (error){
            console.log(error)
        }
        content.time = [
            String(time.getHours()).padStart(2, '0'),
            String(time.getMinutes()).padStart(2, '0')
        ].join(':')


        if (receiver) {
            receiver.socket.emit('chat:message', {content})
        }
        socket.emit('chat:message', {content})
    }
    const disconnect = () => {
        socket.removeAllListeners()
        __user_sockets = __user_sockets.filter(user => user.socket.id !== socket.id)
    }
    socket.on('chat:message', message);
    socket.on('disconnect', disconnect);
}

module.exports = ChatController