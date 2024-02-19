const BrandRepository = require('../../repository/BrandRepository')
const ProductRepository = require('../../repository/ProductRepository')
const {BAD_REQUEST, CREATED, NOT_FOUND, UPDATED, DELETED} = require("../../constant/StatusCode");
const FileUtil = require('../../../util/file-util')
const {PRODUCT_STORAGE_PATH} = require("../../constant/StoragePath");

const ProductController = {
    SearchProduct: async (req, res) => {
        const product_name = req.params.name
        const product_list = await ProductRepository.FindByName(product_name)
        const page_info = {
            title: 'Product'
        }
        console.log(product_list)
        const data = {
            product_list
        }
        res.render(
            'admin/product/product',
            {
                layout: 'layout/admin-layout',
                page_info,
                data
            }
        )
    },
    ProductManagement: async (req, res) => {
        const product_list = await ProductRepository.ProductList('_id name slug price discount is_discount stock images rating release_date')
        const page_info = {
            title: 'Product'
        }
        // return res.send(product_list)
        const data = {
            product_list
        }
        res.render(
            'admin/product/product',
            {
                layout: 'layout/admin-layout',
                page_info,
                data
            }
        )
    },
    NewProductPage: async (req, res) => {
        const brand_list = await BrandRepository.BrandList()

        const page_info = {
            title: 'Product'
        }
        const data = {
            brand_list
        }
        res.render(
            'admin/product/new-product',
            {
                layout: 'layout/admin-layout',
                page_info,
                data
            }
        )
    },
    CreateProduct: async (req, res) => {
        const images = []
        req.files.map((file) => {
            images.push({
                filename: file.filename,
                size: file.size
            })
        })
        const product = {
            release_date: req.body.release_date,
            name: req.body.name,
            price: req.body.price,
            brand: req.body.brand,
            stock: req.body.stock,
            discount: req.body.discount,
            is_discount: req.body.is_discount,
            images: images,
            screen: {
                screen_size: req.body.screen_size,
                screen_tech: req.body.screen_tech,
                screen_resolution: req.body.screen_resolution,
                scan_frequency: req.body.scan_frequency,
                screen_type: req.body.screen_type
            },
            camera: {
                back_camera: req.body.back_camera,
                back_video: req.body.back_video,
                front_camera: req.body.front_camera,
                front_video: req.body.front_video
            },
            processor_graphics: {
                chipset: req.body.chipset,
                cpu: req.body.cpu,
                gpu: req.body.gpu
            },
            ram_storage: {
                ram: req.body.ram,
                internal_memory: req.body.internal_memory,
                memory_card_slot: req.body.memory_card_slot
            },
            battery: {
                pin: req.body.pin,
                charging_tech: req.body.charging_tech,
                charging_port: req.body.charging_port
            },
            communicate_connect: {
                sim: req.body.sim,
                operating: req.body.operating,
                infrared: req.body.infrared,
                headphone_jack: req.body.headphone_jack,
                network_support: req.body.network_support,
                nfc_tech: req.body.nfc_tech,
                wifi: req.body.wifi,
                bluetooth: req.body.bluetooth,
                gps: req.body.gps
            },
            design_weight: {
                size: req.body.size,
                weight: req.body.weight,
                back_material: req.body.back_material,
                frame_material: req.body.frame_material
            },
            other: {
                audio_tech: req.body.audio_tech,
                finger_sensor: req.body.finger_sensor,
                types_of_sensors: req.body.types_of_sensors,
                special_feature: req.body.special_feature
            }
        }
        try {
            await ProductRepository.Create(product)
            res.status(200).json({code: CREATED, message: 'Success create new product'})
        } catch (error) {
            let errors = {};
            Object.keys(error.errors).forEach((key) => {
                errors[key] = error.errors[key].message;
            });
            res.status(200).json({code: BAD_REQUEST, errors})
        }
    },
    EditProductPage: async (req, res) => {
        const page_info = {
            title: 'Product'
        }
        const product_id = req.params.id
        let product = await ProductRepository.FindById(product_id)
        if (!product) {
            return res.render('admin/not-found',
                {
                    layout: 'layout/admin-layout',
                    page_info
                })
        }
        const brand_list = await BrandRepository.BrandList()
        const data = {
            brand_list,
            product
        }
        return res.render(
            'admin/product/edit-product',
            {
                layout: 'layout/admin-layout',
                page_info,
                data
            }
        )
    },
    UpdateProduct: async (req, res) => {
        const current_product = await ProductRepository.FindById(req.body.product_id)
        if (!current_product) {
            return res.status(200).json({code: NOT_FOUND, message: 'Not found product'})
        }
        let images = current_product.images
        let file_remove = req.body.images_remove

        if (file_remove.length > 0) {
            if (file_remove.includes(',')) {
                file_remove = file_remove.split(',')
                images = images.filter(img => !file_remove.includes(img.filename))
                file_remove.map((file_name) => {
                    FileUtil.DeleteFile(PRODUCT_STORAGE_PATH, file_name)
                })
            } else {
                for (const img of images) {
                    if (img.filename === file_remove) {
                        images.pop(img)
                        FileUtil.DeleteFile(PRODUCT_STORAGE_PATH, img.filename)
                        break
                    }
                }
            }
        }

        req.files.map((file) => {
            images.push({
                filename: file.filename,
                size: file.size
            })
        })

        const product = {
            _id: req.body.product_id,
            release_date: req.body.release_date,
            name: req.body.name,
            price: req.body.price,
            brand: req.body.brand,
            stock: req.body.stock,
            discount: req.body.discount,
            is_discount: req.body.is_discount,
            images: images,
            screen: {
                screen_size: req.body.screen_size,
                screen_tech: req.body.screen_tech,
                screen_resolution: req.body.screen_resolution,
                scan_frequency: req.body.scan_frequency,
                screen_type: req.body.screen_type
            },
            camera: {
                back_camera: req.body.back_camera,
                back_video: req.body.back_video,
                front_camera: req.body.front_camera,
                front_video: req.body.front_video
            },
            processor_graphics: {
                chipset: req.body.chipset,
                cpu: req.body.cpu,
                gpu: req.body.gpu
            },
            ram_storage: {
                ram: req.body.ram,
                internal_memory: req.body.internal_memory,
                memory_card_slot: req.body.memory_card_slot
            },
            battery: {
                pin: req.body.pin,
                charging_tech: req.body.charging_tech,
                charging_port: req.body.charging_port
            },
            communicate_connect: {
                sim: req.body.sim,
                operating: req.body.operating,
                infrared: req.body.infrared,
                headphone_jack: req.body.headphone_jack,
                network_support: req.body.network_support,
                nfc_tech: req.body.nfc_tech,
                wifi: req.body.wifi,
                bluetooth: req.body.bluetooth,
                gps: req.body.gps
            },
            design_weight: {
                size: req.body.size,
                weight: req.body.weight,
                back_material: req.body.back_material,
                frame_material: req.body.frame_material
            },
            other: {
                audio_tech: req.body.audio_tech,
                finger_sensor: req.body.finger_sensor,
                types_of_sensors: req.body.types_of_sensors,
                special_feature: req.body.special_feature
            }
        }

        try {
            await ProductRepository.Update(product)
            res.status(200).json({code: UPDATED, message: 'Success update product'})
        } catch (error) {
            let errors = {};
            Object.keys(error.errors).forEach((key) => {
                errors[key] = error.errors[key].message;
            });
            res.status(200).json({code: BAD_REQUEST, errors})
        }
    },
    DeleteProduct: async (req, res) => {
        const product_id = req.body.product_id
        let product = null
        try {
            product = await ProductRepository.FindAndDelete(product_id)
        } catch (error){
            return res.status(200).json({code:BAD_REQUEST, message: 'Fail delete product'})
        }

        if(!product){
            return res.status(200).json({code: NOT_FOUND, message: 'Not found product'})
        }
        return res.status(200).json({code: DELETED, message: 'Success delete product'})
    }
}

module.exports = ProductController