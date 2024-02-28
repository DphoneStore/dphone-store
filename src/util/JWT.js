const jwt = require('jsonwebtoken')
const PRIVATE_KEY = 'something'
const JWT = {
    Create(object){
        return jwt.sign(object, PRIVATE_KEY)
    },
    Verify(token){
        try{
            return jwt.verify(token, PRIVATE_KEY)
        } catch (error){
            return false
        }
    }
}

module.exports = JWT