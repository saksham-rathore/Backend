require("dotenv").config();
const app = require("./app");
const connectDB = require("./config/db");

connectDB();

app.get("/test", (req, res) => {
    res.send("Hello World!");
})

app.listen(3000, () => {
    console.log('server is running on port 3000');
})