const express = require('express')
const app = express()
const port = 3100
// const routers = require('./routers.js')
const path = require('path')
const menu = require('../database/models.js')
const cors = require('cors')
var expressStaticGzip = require('express-static-gzip');
const CronJob = require('cron').CronJob;
const bodyParser = require('body-parser')
// const bodyParser = require('body-parser')
// // const tester = require('../database/seeder.js')


//require middleware
const morgan = require("morgan")

//use middleware
// app.use(cors())

// app.use(express.json())
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
// app.use(express.json())
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.raw())
// app.use(bodyParser.text())

//serve the client
// app.use('/restaurants/menu_cart', expressStaticGzip(path.join(__dirname, '../public'), {
//     enableBrotli: true,
//     orderPreference: ['br', 'gz']
//  }))
app.use(express.static(path.join(__dirname, '../public')))
//set up router
// app.use('/api', routers)

app.get('/:id', (req, res) => {
    const { id } = req.params
    // console.log(req.params.id)
    console.log(menu)
    menu.find({restaurant_id: Number(id)})
    .then((result)=>{console.log(result); res.status(200).send(result)})
    .catch((err)=>{
        console.log('error in get menus!!', err)
        res.status(300).send(err)
    })
})


//cron task (this runs the seeder every midnight at 1am)
// new CronJob('* * * * * *', tester, null, true, 'America/Los_Angeles');


app.listen(port, () => console.log(`Example app listening on port ${port}!`))