'use strict';

const { response } = require('express');
const express = require('express');
const pool = require("./db");

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();

app.get('/', (req, res) => {
  res.send('server up :D')
});

app.get('/users', async (req, res) => {
  try{
    const usuarios = await pool.query("SELECT usuario FROM Cliente");
    res.json(usuarios.rows);
  } catch (err){
    console.error(err.message);
  }
});

app.listen(PORT, HOST);