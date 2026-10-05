import express from 'express';
import fs from "fs";

const app = express();

// Render te asigna un puerto mediante process.env.PORT
const PORT = process.env.PORT || 3000;

const readData = () => {
    try {
        const data = fs.readFileSync("./db.json");
        return JSON.parse(data);
    } catch (error) {
        console.log(error);
    }
};

const writeData = (data) => {
    try {
        fs.writeFileSync("./db.json", JSON.stringify(data));
    } catch (error) {
        console.log(error);
    }
};

app.get("/", (req, res) => {
    res.send("Bienvenido a mi primer api con Node JS !!");
});

app.get("/pacientes/:id", (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const paciente = data.pacientes.find((paciente) => paciente.id === id);
    res.json(paciente);
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando por el puerto ${PORT}`);
});