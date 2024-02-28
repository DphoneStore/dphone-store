const WebInfoRepository = require("../../repository/WebInfoRepository");
const UserRepository = require('../../repository/UserRepository')
const {BAD_REQUEST, UPDATED} = require("../../constant/StatusCode");
const SecurityUtil = require('../../../util/security-util')
const FileUtil = require('../../../util/file-util')
const {AVATAR_STORAGE_PATH} = require("../../constant/StoragePath");

const ProfileController = {
    async ProfilePage(req, res) {
        const has_login = !!req.cookies.user_token
        const {website} = await WebInfoRepository.GetWebsiteInfo()

        const user = await UserRepository.FindByEmail(req.user.email)

        const page_info = {
            title: 'Profile',
            has_login,
            website
        }
        const data = {
            user
        }
        res.render(
            'client/profile',
            {
                layout: 'layout/client-layout',
                page_info,
                data
            }
        )
    },
    async UpdateDetail(req, res) {
        const user_id = req.user.id
        const user = {
            ...
                req.body
        }
        try {
            await UserRepository.Update(user_id, user)
            return res.status(200).json({code: UPDATED, message: 'Update information successfully'})
        } catch (error) {
            return res.status(200).json({code: BAD_REQUEST, message: 'Update information failed'})
        }
    },
    async UpdatePass(req, res) {
        const {current_pass, new_pass} = req.body
        const user = await UserRepository.FindByEmail(req.user.email)
        const is_valid = await SecurityUtil.Compare(current_pass, user.password)
        if (is_valid) {
            const hash_pass = await SecurityUtil.Hash(new_pass)
            await UserRepository.UpdatePass(user._id, hash_pass)
            return res.status(200).json({code: UPDATED, message: 'Update password successfully'})
        } else {
            return res.status(200).json({code: BAD_REQUEST, message: 'invalid current password'})
        }
    },
    async UpdateAvatar(req, res){
        console.log(req.file)
        const avatar = req.file.filename
        const user_id = req.user.id
        const user = await UserRepository.UpdateAvatar(user_id, avatar)
        if(user.avatar !== 'user.svg'){
            FileUtil.DeleteFile(AVATAR_STORAGE_PATH, user.avatar)
        }
        return res.status(200).json({code: UPDATED, message: 'Update avatar successfully'})
    }
}

module.exports = ProfileController