import express from 'express';
import fs from "fs";
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// Servir la carpeta de imágenes públicamente
app.use('/img', express.static(path.join(__dirname, 'img')));

const readData = () => {
    try {
        const data = fs.readFileSync(path.join(__dirname, "db.json"));
        return JSON.parse(data);
    } catch (error) {
        console.log(error);
    }
};

// Ruta principal: ahora carga directamente tu página visual
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
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