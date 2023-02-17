const { cyan } = require('colors');
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const connection = async () => {
    try {
        console.log(process.env.MONGO_URI)
        const connection = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected : ${connection.connection.host}`.cyan.underline.bold)
    } catch (error) {
        console.log(error)
        console.log(`MongoDB Not Connected `)

    }
}

module.exports = connection