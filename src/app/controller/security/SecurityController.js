const UserRepository = require('../../repository/UserRepository')
const CartRepository = require('../../repository/CartRepository')
const {BAD_REQUEST, CREATED, NOT_FOUND, OK, EMAIL_EXISTED} = require("../../constant/StatusCode");
const SecurityUtil = require('../../../util/security-util')
const JWT = require('../../../util/JWT')
const SecurityController = {
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
           return res.status(200).json({code:OK, token, message: 'Login success'})
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