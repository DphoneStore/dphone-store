const jwt = require('jsonwebtoken')
const PRIVATE_KEY = 'something'
const JWT = {
    CreateTokenForResetPass(object){
        return jwt.sign(object, PRIVATE_KEY, {expiresIn: 60*5})
    },
    Create(object){
        return jwt.sign(object, PRIVATE_KEY)
    },
    Verify(token){
        try{
            return jwt.verify(token, PRIVATE_KEY)
        } catch (error){
            console.log(error)
            return false
        }
    }
}

module.exports = JWT