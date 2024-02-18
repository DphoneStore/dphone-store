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

const data = [
    {name: 'khang1'},
    {name: 'khang2'},
    {name: 'khang3'}
]

