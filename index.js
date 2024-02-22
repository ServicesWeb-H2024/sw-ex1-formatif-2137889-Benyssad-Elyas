const express = require ('express');
const app = express();
const PORT = 3000;

app.use(express.json());


app.use('/api', require('./src/routes/netflix.route.js'));


app.get('/', (req, res) => {
    res.send("<h1>Formatif 1 - Services Web</h1>");
});

app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});