const app = require("./app");
const port = 3000;

app.get("/", (req, res) => {
    res.send("Port 3000 test");
});
app.listen(port);