import mongoose from 'mongoose'

mongoose.connect(process.env.MONGO_DB_URI).then(()=>console.log("Database is Connected")).catch((err)=>console.log(err))