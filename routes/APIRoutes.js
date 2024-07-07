const express = require("express")
const API = require("./API")

const router = express.Router()

//Define the routes
router.get("/", API.GetAll)

router.get("/atomicnumber/:atomicnumber", API.GetByAtomicNumber)

router.get("/random", API.GetRandom)

router.post("/add", API.Add)

router.put("/update/:atomicnumber", API.Update)

router.delete("/delete/:atomicnumber", API.Delete)

module.exports = router
