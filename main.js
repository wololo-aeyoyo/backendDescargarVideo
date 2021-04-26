const express = require("express");
const helmet = require("helmet");
const config = require("./config/configuracion")
const api = require("./server/routes/youtubeRutas")


const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended :true}));
app.use(helmet());
app.use("/api/youtube",api);

//variables
app.set('puerto', config.get("express:port"));

app.get("/",(req,res) =>{
    res.send("epale a vidly");

});



app.listen(app.get("puerto"),()=>{
    console.log(`Escuchando en el puerto... ${app.get("puerto")}`);
    console.log(`La direccion es: http://localhost:${app.get("puerto")}/`);
});

