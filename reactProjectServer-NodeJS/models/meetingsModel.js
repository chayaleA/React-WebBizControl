import mongoose from 'mongoose';

const meetingSchema = new mongoose.Schema({
    id:String,
    serviceName: String,
    serviceDescription: String,
    servicePrice: Number,
    dateTime: String,
    clientName: String,
    clientPhone: String,
    clientEmail: String  
})

const meetingModel = mongoose.model("meetings", meetingSchema);
export default meetingModel;