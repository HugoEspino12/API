import express from 'express';
import fs from "fs";
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

// Permite peticiones desde el navegador (Go Live)
app.use(cors());

// Servir la carpeta "img" como archivos estáticos
app.use('/img', express.static('img'));

const readData = () => {
    try {
        const data = fs.readFileSync("./db.json");
        return JSON.parse(data);
    } catch (error) {
        console.log(error);
    }
};

app.get("/", (req, res) => {
    res.send("Bienvenido a mi primer api con Node JS !!");
});

// Endpoint para obtener TODOS los cómics
app.get("/comics", (req, res) => {
    const data = readData();
    res.json(data.comics);
});

// Endpoint para obtener un cómic por su ID
app.get("/comics/:id", (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const comic = data.comics.find((comic) => comic.id === id);
    if (!comic) {
        return res.status(404).json({ error: "Cómic no encontrado" });
    }
    res.json(comic);
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando por el puerto ${PORT}`);
});