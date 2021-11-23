const express = require("express");
const helmet = require("helmet");
const config = require("./config/configuracion")
const api = require("./server/routes/youtubeRutas")
const mongoose = require('mongoose');


const app = express();
mongoose.connect("mongodb://localhost/apiyoutube", { useNewUrlParser: true, useUnifiedTopology: true }) //cambiar la string de conexion
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));


//middlewares
app.use(express.json());
app.use(express.urlencoded({extended :true}));
app.use(helmet());
app.use("/api/youtube",api);

//variables
app.set('puerto', config.get("express:port"));

app.get("/",(req,res) =>{
    res.send("epale api de youtube");

});



app.listen(app.get("puerto"),()=>{
    console.log(`Escuchando en el puerto... ${app.get("puerto")}`);
    console.log(`La direccion es: http://localhost:${app.get("puerto")}/`);
});

