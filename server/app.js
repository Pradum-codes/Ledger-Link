const express = require('express');
const app = express();
const PORT = process.env.port || 3000;

app.get('/', (req,res) => {
    res.send("Server is up");
});

app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`)
});