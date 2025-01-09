import express from "express";
import cors from "cors";

const app = express();
const Port = 4000;

app.use(express.json());
app.use(cors());



app.get("/api/test", (req, res) => {
    console.log("GET request received at /api/test"); // Log incoming requests
    res.json({ message: "API connected" });
});

app.listen(Port, () => {
    console.log(`Server started on port: ${Port}`);
});
