import mongoose from 'mongoose';

const businessSchema = new mongoose.Schema({
    name: String,
    address: String,
    phone: String,
    owner: String,
    logo: String,
    description: String,  
})

const businessModel = mongoose.model("businesses", businessSchema);
export default businessModel;