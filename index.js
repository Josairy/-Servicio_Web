const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(express.static('public'));

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/contactos', async (req, res) => {
  try {
    const response = await axios.get('http://www.raydelto.org/agenda.php');
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener los contactos', error });
  }
});

app.post('/contactos', async (req, res) => {
  const nuevoContacto = req.body;

  try {
    const response = await axios.post('http://www.raydelto.org/agenda.php', nuevoContacto);
    res.json({ mensaje: 'Contacto almacenado correctamente', data: response.data });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al guardar el contacto', error });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});