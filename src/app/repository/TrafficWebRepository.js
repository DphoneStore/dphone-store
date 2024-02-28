const mongoose = require("mongoose");
const TrafficWebSchema = require("../model/TrafficWebSchema");
const TrafficWeb = mongoose.model("TrafficWeb", TrafficWebSchema);

const TrafficWebRepository = {
    UserAccess(traffic_web) {
        return TrafficWeb.create(traffic_web)
    },
    async TrafficReport(){
        const date = new Date()
        let start_month = [
            '01',
            date.getMonth() + 1,
            date.getFullYear()
        ].join('-')
        let end_month = [
            '30',
            date.getMonth() + 1,
            date.getFullYear()
        ].join('-')
        const all_traffic_web = await TrafficWeb.find({
            date_access:
                {
                    $gte: start_month,
                    $lte: end_month
                },
        }).lean()
        let traffic_report = all_traffic_web.reduce((acc, curr) => {
            const existing_item = acc.find(item => {
                return item.hour_access === curr.hour_access
            });
            if (existing_item) {
                existing_item.quantity_access += 1;
            } else {
                acc.push({ quantity_access: 1, hour_access: curr.hour_access});
            }
            return acc;
        }, []);
        return traffic_report
    }
}

module.exports = TrafficWebRepository