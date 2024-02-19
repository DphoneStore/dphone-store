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

const webSchema = require("../model/WebInfoSchema");
const WebInfo = mongoose.model("WebInfo", webSchema);
const web_seed = require('../../data/web.json')
const database = require('../../config/connect-db')
async function create(){
    database.connect()
    const result = await WebInfo.create(web_seed)
    console.log(result)
}

create()


