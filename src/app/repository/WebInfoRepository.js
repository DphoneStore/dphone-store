const mongoose = require("mongoose");

const WebInfoSchema = require("../model/WebInfoSchema");
const WebInfo = mongoose.model("WebInfos", WebInfoSchema);

const WebInfoRepository = {
    GetInfo() {
        return WebInfo.findOne({}).lean()
    },
    GetWebsiteInfo(){
        return WebInfo.findOne({}).select('website').lean()
    },
    GetHomeInfo(){
        return WebInfo.findOne({}).select('about slider').lean()
    },
    UpdateWebInfo(webInfo) {
        return WebInfo.updateOne(webInfo)
    },
    PushImagesSlider(images) {
        return WebInfo.updateOne(
            {},
            {$push: {slider: {$each: images}}}
        )
    },
    PullImageSlider(img_name) {
        return WebInfo.updateOne(
            {},
            {
                $pull : {slider: {name:img_name}}
            },

        )
    }
}

module.exports = WebInfoRepository