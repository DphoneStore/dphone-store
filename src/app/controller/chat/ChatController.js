
const ChatRepository = require("../../repository/ChatRepository");
const {OK, BAD_REQUEST} = require("../../constant/StatusCode");
const ChatController = {
    async ChatAdminPage(req, res){
        let chat_list = await ChatRepository.GetChatListAdmin()
        let current_user = req.user.id
        chat_list.map(chat => {
           chat.members.map(user => {
                if(user._id.toString() !== current_user){
                    chat.customer = user
                }
            })
            console.log(chat.customer)
        })

        const data = {
            chat_list,
            admin: req.user
        }
        res.render(
            'admin/chat/chat',
            {
                layout: false,
                data
            }
        )
    },
    async LoadingChat(req ,res){
        const {receiver_id} = req.params
        try{
            let chat =  await ChatRepository.GetMessages(receiver_id)
            return res.status(200).json({code:OK, chat})
        } catch (error){
            console.log(error)
            return res.status(200).json({code:BAD_REQUEST, message: 'can not get messages'})
        }
    },
    async LoadingUserChat(req ,res){
        const user_id = req.user.id
        try{
            let chat =  await ChatRepository.GetMessages(user_id)
            chat.sender = user_id
            return res.status(200).json({code:OK, chat})
        } catch (error){
            console.log(error)
            return res.status(200).json({code:BAD_REQUEST, message: 'can not get messages'})
        }
    },

}

module.exports = ChatController
