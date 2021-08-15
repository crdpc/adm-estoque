const express = require('express');
const app = express();

app.get("/", async (req, res) => {
    res.send('Hallo Welt. Nach');

});

app.listen(8081, () => {
    console.log("Server Started at port 8081: http://localhost:8081");
});
