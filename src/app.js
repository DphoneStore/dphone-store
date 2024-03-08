const path = require('path')

//add library dev
const morgan = require('morgan')

//add library
const express = require('express')
const cookieParser = require('cookie-parser')
const route = require('./routes/index-route')
const app = express()

//[GET] image from public
app.use(express.static(path.join(__dirname, 'public')))

//middleware to get post method value
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cookieParser())

//HTTP logger for dev
app.use(morgan('combined'))

//Template engine
// let ejs = require('ejs')
// ejs.delimiter = '%';
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'app/view'))
const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts)

const database = require('./config/connect-db')
database.connect()
//Rout init

route(app)

const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const SecurityUtil = require("./util/security-util");
const UserRepository = require("./app/repository/UserRepository");
const io = new Server(server);

const Roles = require('./app/constant/Role')
async function InitAdminAccount(){
    let admin = await UserRepository.FindAdmin()
    if(!admin){
        const email = 'admin@gmail.com'
        const pass = '123123123'

        const hash_pass = await SecurityUtil.Hash(pass)
        admin = {
            email,
            full_name: 'admin',
            gender: 'male',
            phone: '0123456789',
            avatar: 'user.svg',
            address: 'somewhere',
            birth_date: '2023-10-10',
            role: Roles.ADMIN,
            password: hash_pass
        }
        admin = await UserRepository.Create(admin)
        console.log('admin account: ', admin.email + ' - ' + pass)
    }
    global.admin_id = admin._id.toString()
    console.log('admin_id: ', global.admin_id)
}
InitAdminAccount()

global.__user_sockets = []
const ChatController = require('./app/controller/realtime/ChatController')
const JWT = require("./util/JWT");
io.use((socket, next) => {
    const token = socket.handshake.query.token
    const user = JWT.Verify(token)
    if (user) {
        socket.sender = user
        __user_sockets.push({user_id: user.id, socket})
        next();
    } else {
        next(new Error("unauthorized"));
    }
})

io.on('connection', function (socket){
    ChatController(socket)
})

module.exports = server