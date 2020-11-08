'use strict';

const { response } = require('express');
const express = require('express');
const pool = require("./db");
const cors = require('cors');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App

const app = express();

app.use(cors());
app.use(express.json());

app.get('/verifyUser/:user', async(req, res, next) =>{ // CHECKEA SI EL USERNAME YA EXISTE
  try {
    const user = req.param('user')
    const getUser = await pool.query("SELECT usuario FROM cliente WHERE usuario = $1::text",[user]);
    if(getUser.rowCount){
        // EXISTE USUARIO CON ESE NOMBRE, ERROR
        res.redirect('/');
    }
    else{
      // NO EXISTE USUARIO, PUEDE REGISTRAR
      return next();
    }
  } catch (err) {
    console.log(err.message);
  }
});

app.post('/register', async(req, res) =>{  // sirve para registrar usuarios, no permite duplicidad y longitud menor a 5 en ambos camposS
  try {
    const { usuario, clave } = req.body;
    if (usuario.length > 4  && clave.length > 4){
      const newUser = await pool.query("INSERT INTO Cliente(usuario, clave) VALUES ($1::text, $2::text) RETURNING *", [usuario, clave]);
      res.json(newUser);
    }
    else{
      res.send("POCA SEGURIDAD MI PANA");
    }
  } catch (err) {
    console.log(err.message);
  }
});

app.get('/', (req, res) => { // PRINCIPAL
  res.send('server up :D')
});


app.listen(PORT, HOST);