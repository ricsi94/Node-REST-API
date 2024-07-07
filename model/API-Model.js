const mongoose = require("mongoose")
const Schema = mongoose.Schema

const PeriodicTableSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		symbol: {
			type: String,
			required: true,
		},
		atomicnumber: {
			type: Number,
			required: true,
		},
		weight: {
			type: Number,
			required: true,
		},
	},
	{
		timestamps: true,
	}
)

mongoose.pluralize(null)
const PeriodicTable = mongoose.model("PeriodicTable", PeriodicTableSchema)
module.exports = PeriodicTable
