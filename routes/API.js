const PeriodicTable = require("../model/API-Model")

// Get all elements
const GetAll = (req, res) => {
	PeriodicTable.find({}, "atomicnumber name symbol weight -_id")
		.sort({ id: 1 })
		.then((result) => {
			res.send(result)
		})
		.catch(() => {
			res.status(404).send("Fail")
		})
}

// Get 1 element by Atomic Number
const GetByAtomicNumber = (req, res) => {
	const AN = parseInt(req.params.atomicnumber)
	PeriodicTable.findOne({ atomicnumber: AN }, "atomicnumber name symbol weight -_id")
		.then((result) => {
			if (result) {
				res.send(result)
			}
			if (!result) {
				res.status(404).send({ Fail: "Not found" })
			}
		})
		.catch(() => {
			res.status(404).send({ Fail: "Not found" })
		})
}

// Get 1 random element
const GetRandom = (req, res) => {
	PeriodicTable.countDocuments({}).then((NumberOfElements) => {
		const RandomElementAtomicNumber = Math.floor(Math.random() * NumberOfElements) + 1

		PeriodicTable.findOne(
			{ atomicnumber: RandomElementAtomicNumber },
			"atomicnumber name symbol weight -_id"
		)
			.then((result) => {
				if (result) {
					res.send(result)
				}
				if (!result) {
					res.status(404).send({ Fail: "Not found" })
				}
			})
			.catch(() => {
				res.status(404).send({ Fail: "Not found" })
			})
	})
}

// Add 1 new element
const Add = (req, res) => {
	const Element = new PeriodicTable(req.body)
	Element.save()
		.then((result) => {
			res.send(result)
		})
		.catch((err) => {
			res.status(404).send(err.message)
		})
}

// Update 1 element by Atomic Number
const Update = (req, res) => {
	const AN = req.params.atomicnumber
	PeriodicTable.findOneAndUpdate({ atomicnumber: AN }, req.body)
		.then((result) => {
			if (result) {
				PeriodicTable.findOne({ atomicnumber: AN }, "atomicnumber name symbol weight -_id").then(
					(Element) => {
						res.send(Element)
					}
				)
			}
			if (!result) {
				res.status(404).send({ Fail: "Not found" })
			}
		})
		.catch((err) => {
			res.status(404).send(err.message)
		})
}

// Delete 1 element by Atomic Number
const Delete = (req, res) => {
	const AN = req.params.atomicnumber
	PeriodicTable.findOneAndDelete({ atomicnumber: AN })
		.then((result) => {
			if (result) {
				res.send(result)
			}
			if (!result) {
				res.status(404).send({ Fail: "Not found" })
			}
		})
		.catch((err) => {
			res.status(404).send(err.message)
		})
}

module.exports = {
	GetAll,
	GetByAtomicNumber,
	GetRandom,
	Add,
	Update,
	Delete,
}
