const mongoose=require("mongoose")
const DATABASE = process.env.DATABASE

const connectDB = async () => {
    const conn = await mongoose.connect( `${DATABASE}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    console.log(`connected to mongoDB atlas ${conn.connection.host}`)
}

module.exports = connectDB;
