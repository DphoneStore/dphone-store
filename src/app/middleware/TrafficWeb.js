const TrafficWebRepository = require('../repository/TrafficWebRepository')

const TrafficWeb = async (req, res, next) => {
    let date_access = new Date()
    let hour_access = date_access.getHours()
    date_access = [
        date_access.getDate(),
        date_access.getMonth() + 1,
        date_access.getFullYear()
    ].join('-')
    const traffic_web = {
        hour_access,
        date_access
    }
    TrafficWebRepository.UserAccess(traffic_web)
    next()
}

module.exports = TrafficWeb