import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoConnect from './DB/mongoConnect.js';
import serviceModel from './models/serviceModel.js';
import meetingModel from './models/meetingsModel.js';
import businessModel from "./models/businessData.js";

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.listen(8787, () => {
    console.log("Server started!");
});

app.get("/", (req, res) => {
    res.send("Hello World!");
}
);

//add get request that check if the request body has name = "admin" and password = 123456
//path: localhost:8787/login
app.post("/login", (req, res) => {
    const body = req.body;
    if (body.name === "admin" && body.password === "123456") {
        res.statusCode = 200;
        res.send("Login success!");
    } else {
        res.statusCode = 401;
        res.send("Login failed!");
    }
});

// add post request that add new appointment to the appointments array and check in the array if the time is available or not
app.post("/appointment", async (req, res) => {
    try {
        const { id, serviceName, serviceDescription, servicePrice, dateTime, clientName, clientPhone, clientEmail } = req.body;
        if (!serviceName || !dateTime || !clientName || !clientPhone) {
            return res.status(400).send("Missing required fields");
        }
        const existingAppointment = await meetingModel.findOne({ dateTime: dateTime });
        if (existingAppointment) {
            return res.status(400).send("Appointment is not available!");
        }
        const newAppointment = new meetingModel({
            id,
            serviceName,
            serviceDescription,
            servicePrice,
            dateTime,
            clientName,
            clientPhone,
            clientEmail
        });
        await newAppointment.save();
        console.log("Appointment added successfully!")
        res.status(200).send("Appointment added successfully!");
    } catch (error) {
        console.error("Error adding appointment:", error);
        res.status(500).send("Internal Server Error");
    }
});

// add get request that return all appointments
app.get("/appointments", async (req, res) => {
    try {
        const appointments = await meetingModel.find();
        res.send(appointments);
    } catch (error) {
        console.error("Error retrieving maatings:", error);
        res.status(500).send("Internal Server Error");
    }

});

app.post("/services", async (req, res) => {
    try {
        const { id, name, description, price, serviceMedia, arrPictures, duration } = req.body;
        if (!name || !description || !price || !duration) {
            return res.status(400).send("Missing required fields");
        }
        const newService = new serviceModel({
            id,
            name,
            description,
            price,
            serviceMedia,
            arrPictures,
            duration
        });
        await newService.save();
        res.status(200).send("Service added successfully!");
    } catch (error) {
        console.error("Error adding service:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/services", async (req, res) => {
    try {
        const services = await serviceModel.find();
        res.send(services);
    } catch (error) {
        console.error("Error retrieving services:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.post("/businessData", async (req, res) => {
    try {
        const { name, address, phone, owner, logo, description } = req.body;
        const newBusinessData = new businessModel({
            name,
            address,
            phone,
            owner,
            logo,
            description
        });
        const savedBusinessData = await newBusinessData.save();
        console.log('New business data saved successfully:', savedBusinessData);
        res.status(200).send("Business data added successfully!");
    } catch (error) {
        console.error("Error adding business data:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/businessData", async (req, res) => {
    try {
        const latestBusinessData = await businessModel.findOne().sort({ _id: -1 });
        res.send(latestBusinessData);
    } catch (error) {
        console.error("Error retrieving latest businessData:", error);
        res.status(500).send("Internal Server Error");
    }
});

mongoConnect();