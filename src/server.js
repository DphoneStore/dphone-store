const IP = 'localhost'
const PORT = 1111

const app = require('./app')

app.listen(PORT, IP, () => console.log(`listen request on http://${IP}:${PORT}`))