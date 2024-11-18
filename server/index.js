import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { createServer } from "http";
import setupSocket from "./socket.js";
import user from "./routes/user.js";
import match from "./routes/match.js";
import connectDB from "./db/mongo.js";

dotenv.config();
connectDB();

const app = express();
const port = process.env.PORT || 3000;
const httpServer = createServer(app);

setupSocket(httpServer);

const corsOptions = {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/user", user);
app.use("/match", match);

app.get("/test", (req, res)=>{
    res.send("hi");
})


httpServer.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});