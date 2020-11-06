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