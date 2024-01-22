const express = require('express')
const app = express();
const PORT = process.env.PORT || 5000;
const { ApiError } = require('../utils/apiResponse');
const globelError = require('../middlewares/errorMiddleware');
const authJwt = require('../middlewares/expressJwt');
const helmet = require('helmet')
const morgan = require('morgan');
const cors = require('cors')
const validateQueryLn = require('./../middlewares/validateQueryLn');
const routerOutlet = require('./router.js')

//middlewares
app.use(cors())
if (process.env.NODE_ENV === "development") {
    app.use(morgan('combined'))
}

app.use(authJwt)
app.use(express.json());
app.use(helmet())
app.use(express.static('./../public'))

//routes
app.use('/', validateQueryLn(), routerOutlet)
app.all("*", (req, res, next) => next(new ApiError(`Can't find this route: ${req.originalUrl}`, 404)));
//handle errors
app.use(globelError)
//run server
const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`Connected To Port ${PORT}`)
})
//handle unhandledRejection outside express
process.on("unhandledRejection", (err) => {
    console.error(`Database error ${err}`);
    server.close(() => {
        console.error(`Shutting down`);
        process.exit(1)
    })
})

