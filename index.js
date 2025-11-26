const express = require("express");         // Importacion
const app = express();                      // Invocando core Express
const PORT = 3000;   

app.get('/', (req, res) => {
    res.send("<h1>Home</h1>")
});
app.get('/health', (req, res) => {
    res.send("<h1>HOLA MUNDO</h1>")
});
app.get('/alo', (req, res) => {
    res.send("<h1>alo</h1>")
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}/health`)
});