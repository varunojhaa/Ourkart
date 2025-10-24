const express = require('express');
const cors = require('cors');
const connectDB = require("./config/db.js")
const userRouter = require("./routes/userRoute.js")
const cartRouter = require("./routes/cartRoute.js")

// It is used to load environment variables from a .env file into process.env in a Node.js application.
const dotenv = require("dotenv");
dotenv.config();


const app = express();
const port = 8000;

// --- Middleware
app.use(express.json())
app.use(cors())

// --- Connect to MongoDB
connectDB();

// api endpoints
app.use("/api/user", userRouter)
app.use("/api/cart", cartRouter)
// app.use("/api/order", orderRouter)

app.get('/', (req, res) => res.send('All API endpoint is working !' + port));

app.listen(port, () => console.log(`Listening on port ${port}!`))