const mongoose = require("mongoose");

const WebInfoSchema = require("../model/WebInfoSchema");
const WebInfo = mongoose.model("WebInfos", WebInfoSchema);

const BrandRepository = {
    GetInfo() {
        return WebInfo.findOne({}).lean()
    },
    UpdateWebInfo(webInfo){
        return WebInfo.updateOne(webInfo)
    }
}

module.exports = BrandRepository