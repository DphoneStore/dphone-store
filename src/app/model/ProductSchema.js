const mongoose = require('mongoose')
const Schema = mongoose.Schema
slug = require('mongoose-slug-generator')
mongoose.plugin(slug)

const ProductSchema = new Schema({
    release_date: {type: String, required: true},
    name: {type: String, required: true},
    brand: {
        type: Schema.Types.ObjectId,
        ref: 'Brand'
    },
    slug: {type: String, slug: 'name'},
    price: {type: Number, required: true},
    stock: {type: Number, required: true},
    discount: {type: Number, required: true},
    images: {type: Array, required: true},
    rating: {type: Number, default: 0},
    is_discount: {type: Boolean, default: false},
    screen: {
        screen_size: {type: String, required: true},
        screen_tech: {type: String, required: true},
        screen_resolution: {type: String, required: true},
        scan_frequency: {type: String, required: true},
        screen_type: {type: String, required: true}
    },
    camera: {
        back_camera: {type: String, required: true},
        back_video: {type: String, required: true},
        front_camera: {type: String, required: true},
        front_video: {type: String, required: true}
    },
    processor_graphics: {
        chipset: {type: String, required: true},
        cpu: {type: String, required: true},
        gpu: {type: String, required: true}
    },
    ram_storage: {
        ram: {type: String, required: true},
        internal_memory: {type: String, required: true},
        memory_card_slot: {type: String, required: true}
    },
    battery: {
        pin: {type: String, required: true},
        charging_tech: {type: String, required: true},
        charging_port: {type: String, required: true}
    },
    communicate_connect: {
        sim: {type: String, required: true},
        operating: {type: String, required: true},
        infrared: {type: String, required: true},
        headphone_jack: {type: String, required: true},
        network_support: {type: String, required: true},
        nfc_tech: {type: String, required: true},
        wifi: {type: String, required: true},
        bluetooth: {type: String, required: true},
        gps: {type: String, required: true},
    },
    design_weight: {
        size: {type: String, required: true},
        weight: {type: String, required: true},
        back_material: {type: String, required: true},
        frame_material: {type: String, required: true}
    },
    other: {
        audio_tech: {type: String, required: true},
        finger_sensor: {type: String, required: true},
        types_of_sensors: {type: String, required: true},
        special_feature: {type: String, required: true}
    },
    deleted: {type: Boolean, default: false}
}, {timestamps: true})

module.exports = ProductSchema