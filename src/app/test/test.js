const mongoose = require("mongoose");

const ProductSchema = require("../model/ProductSchema");
const Product = mongoose.model("Product", ProductSchema);
// async function create(){
//     try {
//         const pro = new Product()
//         console.log(pro)
//         const result = await pro.save()
//         // console.log(result)
//     } catch (error){
//
//         let errors_arr = {};
//
//         Object.keys(error.errors).forEach((key) => {
//             errors_arr[key] = error.errors[key].message;
//         });
//         console.log(errors_arr)
//     }
// }
//
// create()
//
// const webSchema = require("../model/WebInfoSchema");
// const WebInfo = mongoose.model("WebInfo", webSchema);
// const web_seed = require('../../data/web.json')
// const database = require('../../config/connect-db')
// async function create(){
//     database.connect()
//     const result = await WebInfo.create(web_seed)
//     console.log(result)
// }
//
// create()

// const bcrypt = require('bcrypt');
// const saltRounds = 10;
// const myPlaintextPassword = 's0/\/\P4$$w0rD';
// const someOtherPlaintextPassword = 'not_bacon';
//
//
//
// async function hash(){
//     const pass = await bcrypt.hash(myPlaintextPassword, saltRounds)
//     console.log(pass)
//     const res = await bcrypt.compare(myPlaintextPassword, pass)
//     console.log(res)
// }
//
// hash()



// bcrypt.compare(myPlaintextPassword, hash, function(err, result) {
//     // result == true
// });

// const JWT = require('../../app/hooks/JWT')
//
// const token = JWT.Create({name: 'khang'})
// console.log(token)
// const user = JWT.Verify(token)
// console.log(user)

// const date = require('../../util/date-util')
// console.log(date.GetDate())

// let date = ['21-02-2002','22-02-2002', '23-02-2002', '24-02-2002']
//
// date.map(d => {
//     if(d > '21-02-2002' && d < '24-02-2002'){
//         console.log(d)
//     }
// })
const OrderRepository = require('../repository/OrderRepository')
const TrafficWebRepository = require('../repository/TrafficWebRepository')
const database = require('../../config/connect-db')
database.connect()

async function a(){
    const all_traffic = await TrafficWebRepository.TrafficReport()
    let traffic_report = all_traffic.reduce((acc, curr) => {
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
    console.log(traffic_report)
}

a()