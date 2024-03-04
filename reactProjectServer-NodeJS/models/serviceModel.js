import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
    id:String,
    name: String,
    description: String,
    price: Number,
    serviceMedia: String,
    arrPictures: Array,
    duration: Number,  
})

const serviceModel = mongoose.model("services", serviceSchema);
export default serviceModel;