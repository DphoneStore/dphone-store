const UserRepository = require('../../repository/UserRepository')
const CartRepository = require('../../repository/CartRepository')
const ChatRepository = require('../../repository/ChatRepository')
const {BAD_REQUEST, CREATED, NOT_FOUND, OK, EMAIL_EXISTED} = require("../../constant/StatusCode");
const SecurityUtil = require('../../../util/security-util')
const JWT = require('../../../util/JWT')
const MailUtil = require('../../../util/mail-util')
const SecurityController = {
    async UpdatePasswordPage(req, res){
        let {pass, token} = req.body
        try{
            token = await JWT.Verify(token)
            if(token){
                pass = await SecurityUtil.Hash(pass)
                await UserRepository.UpdateByEmail(token.email, pass)
                return res.status(200).json({code:OK, message: 'updated password successfully'})
            }
            return res.status(200).json({code:BAD_REQUEST, message: 'Invalid Token'})
        } catch (error){
            console.log(error)
            return res.status(200).json({code:BAD_REQUEST, message: 'Invalid Token'})
        }
    },
    async ResetPassPage(req, res){
        const {token} = req.params
        return res.render(
            'security/reset-pass',
            {
                layout: false,
                token
            }
        )
    },
    async CreateForgotPass(req, res){
        const email = req.body.email
        const token = await JWT.CreateTokenForResetPass({email})
        const content = `Click <a href="http://localhost:1111/security/reset-pass/${token}">HERE</a> 
                            to reset your password, this link is only valid for 5 minutes`

        const from_mail = 'The system mail'
        const to_mail = email
        const subject = 'Reset password of DPhone Store'
        const mail_info = {
            from_mail,
            to_mail,
            subject,
            content
        }
        try{
            const result_send_mail = await MailUtil.Send(from_mail, to_mail, subject, content)
            console.log(result_send_mail)
            return res.status(200).json({code:OK})
        } catch (error){
            console.log(error)
            return res.status(200).json({code:BAD_REQUEST, message: 'Invalid email'})
        }
    },
    LoginPage: (req, res) => {
        res.render('security/login', {layout: false})
    },
    Login: async (req, res) => {
        const { email, password } = req.body
        const user = await UserRepository.FindByEmail(email)
        if(user && await SecurityUtil.Compare(password, user.password)){
           const token = JWT.Create({
               id:user._id,
               email:user.email,
               full_name: user.full_name,
               avatar: user.avatar,
               role:user.role})
           return res.status(200).json({code:OK, role:user.role, token, message: 'Login success'})
        }
        return res.status(200).json({code:NOT_FOUND, message: 'Not found user'})
    },
    RegisterPage: async (req, res) => {
        res.render('security/register', {layout: false})
    },
    Register: async (req, res) => {
        const email_existed = await UserRepository.FindByEmail(req.body.email)
        if(email_existed){
            return res.status(200).json({code:EMAIL_EXISTED, message: 'email existed!'})
        }

        const hash_pass = await SecurityUtil.Hash(req.body.password)
        const user = {
            ...
            req.body,
            password: hash_pass
        }
        try{
            const new_user = await UserRepository.Create(user)
            const cart = {
                user: new_user._id,
                detail: []
            }
            await CartRepository.Create(cart)
            let chat = {
                members: [new_user._id, global.admin_id],
                messages: []
            }
            await ChatRepository.CreateChat(chat)
            return res.status(200).json({code:CREATED, message: 'register successfully'})
        } catch (error){
            return res.status(200).json({code:BAD_REQUEST, message: 'register failed'})
        }
    },
    Unauthorized: (req, res)=>{
        res.render('security/unauthorized', {layout: false})
    }
}

module.exports = SecurityController