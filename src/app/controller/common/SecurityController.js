const SecurityController = {
    LoginPage: (req, res) =>{
        res.render('common/login', {layout: false})
    },
    Login: (req, res) => {
        console.log(req.body)
        res.send(req.body)
    }
}

module.exports = SecurityController