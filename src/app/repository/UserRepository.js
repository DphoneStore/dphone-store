const mongoose = require("mongoose");

const UserSchema = require("../model/UserSchema");
const User = mongoose.model("User", UserSchema);
const Roles = require('../constant/Role')

const UserRepository = {
    UpdateByEmail(email, new_pass){
        return User.updateOne({email}, {password: new_pass})
    },
    FindAdmin(){
        return User.findOne({role: Roles.ADMIN})
    },
    FindByEmail(email) {
        return User.findOne({email})
    },
    Create(user) {
        return User.create(user)
    },
    Update(id, user) {
        return User.findByIdAndUpdate(id, user)
    },
    UpdatePass(id, password){
        return User.findByIdAndUpdate(id, {password})
    },
    UpdateAvatar(id, avatar){
        return User.findByIdAndUpdate(id, {avatar})
    },
    CountCustomer(){
        return User.countDocuments({role:'customer'})
    }
}

module.exports = UserRepository