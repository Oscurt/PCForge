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

app.get('/api/getUsuario/:id_cliente', async(req, res, next) =>{ // Obtener el usuario en base al id
  try {
    const id_cliente = req.param('id_cliente');
    const getUsuario = await pool.query('SELECT usuario FROM cliente WHERE id_cliente = $1',[id_cliente]);
    res.send(getUsuario.rows);
  } catch (err) {
    console.log(err.message);
  }
});

app.get('/api/profile/:usuario', async(req, res, next) =>{ // VER FAVORITO DE UN USUARIO
  try {
    const usuario = req.param('usuario');
    const getFAV = await pool.query('SELECT * FROM producto WHERE id_prod IN (SELECT id_prod FROM favorito WHERE id_cliente = (SELECT id_cliente FROM cliente WHERE usuario = $1::text))',[usuario]);
    res.send(getFAV.rows);
  } catch (err) {
    console.log(err.message);
  }
});

app.get('/api/products', async(req, res, next) =>{ // OBTIENE TODOS LOS PRODUCTOS
  try {  
    const getAllProd = await pool.query("SELECT * FROM producto");
    res.send(getAllProd.rows);
  } catch (err) {
    console.log(err.message);
  }
});

app.get('/api/cats', async(req, res, next) =>{ // OBTIENE TODOS LOS PRODUCTOS
  try {  
    const getAllCats = await pool.query("SELECT * FROM categoria");
    res.send(getAllCats.rows);
  } catch (err) {
    console.log(err.message);
  }
});

app.get('/api/pop_cat', async(req, res, next) =>{ // OBTIENE LA CATEGORIA MAS POPULAR
  try {  
    const getPopCat = await pool.query("SELECT * FROM categoria WHERE id_cat = (select id_cat from (select id_cat, COUNT(id_cat) AS total FROM producto GROUP BY id_cat ORDER BY total DESC LIMIT 1) AS bestCAT)");
    res.send(getPopCat.rows);
  } catch (err) {
    console.log(err.message);
  }
});

app.get('/api/pop_prod', async(req, res, next) =>{ // OBTIENE EL PRODUCTO MAS POPULAR
  try {  
    const best = [];
    const getPopProd = await pool.query("SELECT * FROM producto WHERE nfavoritos = (select max(nfavoritos) from producto)");
    if (getPopProd.rowCount){
      best.push(getPopProd.rows[0]);
    }
    const getSellProd = await pool.query("SELECT * FROM producto WHERE nventas = (select max(nventas) from producto)");
    if (getSellProd.rowCount){
      best.push(getSellProd.rows[0]);
    }
    const getValProd = await pool.query("SELECT * FROM producto WHERE puntaje = (select max(puntaje) from producto)");
    if (getValProd.rowCount){
      best.push(getValProd.rows[0]);
    }
    const getComProd = await pool.query("select * from producto where id_prod = (select id_prod from (select id_prod, COUNT(id_prod) AS total FROM comentario GROUP BY id_prod ORDER BY total DESC LIMIT 1) AS mostComent)");
    if (getComProd.rowCount){
      best.push(getComProd.rows[0]);
    }
    if (best.length){
      res.send(best);
    }
    else{
      res.status(404).send({message: 'Sin datos'})
    }
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

app.get('/api/productscat/:id_cat', async(req, res, next) =>{ // OBTIENE PRODUCTO
  try {
    const id_cat = req.param('id_cat');
    const getProd = await pool.query("select producto.*, categoria.id_cat, categoria.nombre as catname from producto, categoria where producto.id_cat = $1 and producto.id_cat = categoria.id_cat",[id_cat]);
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

app.get('/api/comentario/:id_prod', async(req, res, next) =>{ // OBTIENE PRODUCTO
  try {
    const id_prod = req.param('id_prod');
    const getProd = await pool.query("select comentario.*, cliente.usuario, cliente.id_cliente from comentario, cliente where cliente.id_cliente = comentario.id_cliente and id_prod = $1",[id_prod]);
    if (getProd.rowCount){
      res.send(getProd.rows);
    }
    else{
      res.status(404).send({ message: 'AUN NO COMENTADO' });
    }
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