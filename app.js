const express = require("express")
const mongoose = require("mongoose")
const APIRoutes = require("./routes/APIRoutes")
const bodyParser = require("body-parser")

// Define Express App
const app = express()

// Define Remote MongoDB URI and connect to it
const DBURI = " HERE COMES THE DB URI "

mongoose
	.connect(DBURI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => app.listen(3000))
	.catch((err) => console.log(err))

// Client can send datas in body ( for example when using /add URL )
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }))

// API Routes
app.use(APIRoutes)
