'use strict';

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

app.get('/api/products', async(req, res, next) =>{ // OBTIENE TODOS LOS PRODUCTOS
  try {  
    const getAllProd = await pool.query("SELECT * FROM producto");
    res.send(getAllProd.rows);
  } catch (err) {
    console.log(err.message);
  }
});

app.get('/api/products/:id_prod', async(req, res, next) =>{ // OBTIENE PRODUCTO
  try {
    const id_prod = req.param('id_prod');
    const getProd = await pool.query("SELECT * FROM producto WHERE id_prod = $1",[id_prod]);
    if (getProd.rowCount){
      res.send(getProd.rows);
    }
    else{
      res.status(404).send({ message: 'Product Not Found' });
    }
  } catch (err) {
    console.log(err.message);
  }
});

app.get('/api/profiles', async(req, res, next) =>{ // OBTIENE LISTA DE USUARIOS
  try {
    const getAllUsers = await pool.query("SELECT usuario FROM cliente");
    res.json(getAllUsers.rows);
  } catch (err) {
    console.log(err.message);
  }
});

app.post('/api/login', async(req, res, next) =>{ // CHECKEA SI EL USERNAME Y CONTRASEÑA SON CORRECTOS
  try {
    const {usuario, clave} = req.body;
    const getUser = await pool.query("SELECT usuario, clave FROM cliente WHERE usuario = $1::text AND clave = $2::text",[usuario, clave]);
    if(getUser.rowCount){
      res.send({
        usuario,
        clave,
      });
    }
    else{
      res.status(404).send({ message: 'Usuario o contraseña invalida' });
    }
  } catch (err) {
    console.log(err.message);
  }
});

app.post('/api/register', async(req, res) =>{  // sirve para registrar usuarios, no permite duplicidad y longitud menor a 5 en ambos camposS
  try {
    const { usuario, clave } = req.body;
    if (usuario.length > 4  && clave.length > 4){
      const verify = await pool.query('SELECT usuario FROM cliente WHERE usuario = $1::text',[usuario]);
      if (verify.rowCount){
        res.status(404).send({ message: 'Este usuario no esta disponible' });
      }
      else{
        const newUser = await pool.query("INSERT INTO Cliente(usuario, clave) VALUES ($1::text, $2::text) RETURNING *", [usuario, clave]);
        res.send({
          usuario,
          clave,
        });
      }
    }
    else{
      res.status(404).send({ message: 'El usuario y la contraseña deben tener mas de 4 caracteres.' });
    }
  } catch (err) {
    console.log(err.message);
  }
});

app.get('/', (req, res) => { // PRINCIPAL
  res.send('server up :D')
});


app.listen(PORT, HOST);