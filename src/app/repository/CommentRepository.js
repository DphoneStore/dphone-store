const mongoose = require("mongoose");
const {Types} = mongoose
const CommentSchema = require("../model/CommentSchema");
const Comment = mongoose.model("Comment", CommentSchema);

const CommentRepository = {
    Create(comment){
        return Comment.create(comment)
    },
    FindAllCommentOfProduct(product_id){
        product_id = new Types.ObjectId(product_id)
        return Comment.find({product:product_id})
            .populate({
                path: 'user',
                select: 'full_name avatar'
            })
            .sort({createdAt:'desc'}).lean()
    }
}

module.exports = CommentRepository