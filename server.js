const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const admin = require('firebase-admin');
const axios = require('axios');
require('dotenv').config({ path: './env' });

const app = express();
app.use(bodyParser.json());
app.use(cors());

admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`,
});

const db = admin.firestore();

// Handle payment and quiz unlocking
app.post('/api/pay', async (req, res) => {
    const { phoneNumber, amount, section } = req.body;

    try {
        const response = await axios.post('https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest', {
            BusinessShortCode: process.env.BUSINESS_SHORT_CODE,
            Password: process.env.PASSKEY,
            Timestamp: Date.now(),
            TransactionType: "CustomerPayBillOnline",
            Amount: amount,
            PartyA: phoneNumber,
            PartyB: process.env.BUSINESS_SHORT_CODE,
            PhoneNumber: phoneNumber,
            CallBackURL: `${process.env.BASE_URL}/api/payment-callback`,
            AccountReference: "Quiz Win",
            TransactionDesc: `Payment for Section ${section}`,
        });

        res.status(200).send({ message: "STK Push sent. Check your phone." });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Payment failed. Try again." });
    }
});

// Handle quiz logic (simplified for brevity)
app.post('/api/quiz', async (req, res) => {
    const { userId, section } = req.body;

    // Validate user payment for the section
    const userDoc = await db.collection('users').doc(userId).get();
    if (userDoc.exists && userDoc.data().paidSections.includes(section)) {
        res.status(200).send({ message: "Access granted to the quiz." });
    } else {
        res.status(403).send({ message: "Payment required." });
    }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
