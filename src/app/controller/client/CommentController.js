const CommentRepository = require('../../repository/CommentRepository')
const ProductRepository = require('../../repository/ProductRepository')
const {BAD_REQUEST,  CREATED} = require("../../constant/StatusCode");

const CommentController = {
    Create: async (req, res)=>{
        const comment = {
            user: req.user.id,
            product: req.body.product_id,
            content: req.body.content,
            star: req.body.star
        }
        try{
            let result = await CommentRepository.Create(comment)
            const comments = await CommentRepository.FindAllCommentOfProduct(req.body.product_id)
            let total_star = 0
            comments.map(cmt => {
                total_star += cmt.star
            })
            total_star = Math.round(total_star/comments.length)
            await ProductRepository.UpdateStar(req.body.product_id, total_star)

            result = {
                ...result._doc,
                full_name: req.user.full_name,
                avatar: req.user.avatar,
            }
            console.log(result)
            return res.status(200).json({code:CREATED, comment:result})
        } catch (error){
            console.log(error)
            return res.status(200).json({code:BAD_REQUEST, message: 'BAD_REQUEST'})
        }
    }
}

module.exports = CommentController