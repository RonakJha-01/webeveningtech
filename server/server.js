import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: "https://web-evening-tech-server.onrender.com" || "http://localhost:5173",
  methods: ["GET", "POST"],
  credentials: true
}));
app.use(express.json());



// create transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.WEB_EVENING_TECH_EMAIL_USER,
    pass: process.env.WEB_EVENING_TECH_EMAIL_PASS,
  },
});

// UPDATED ROUTE WITH BASIC VALIDATION
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // email content
    const mailOptions = {
  from: `"Website Enquiry" <${process.env.WEB_EVENING_TECH_EMAIL_USER}>`,  
  to: process.env.WEB_EVENING_TECH_EMAIL_USER,  

  // 👇 THIS IS IMPORTANT
  replyTo: email,  

  subject: "🚀 New Client Enquiry",

  html: `
    <h2>New Contact Request</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Phone:</strong> ${phone}</p>
    <p><strong>Message:</strong> ${message}</p>
  `,
};

    // send email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Email not sent" });
  }
});


app.get("/", (req, res) => {
  res.send("Server is up and running!");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));