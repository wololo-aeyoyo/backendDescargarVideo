const fs = require("fs");
const expres = require("express");
const youtube = require("../core/youtube-dl-core");
const continuarStream = require("../core/stream-pipe");
const {videoDb} = require("../modelos/videoModelo");
const router = expres.Router();



router.post("/post",(req,res) =>{
    console.log(req.body.link);

    //checkear input por implementar
    youtube.videoBajar(req.body.link).
    then(pathVideo => {
        
        console.log("el path " + pathVideo);
        const stat = fs.statSync(pathVideo);
        const fileSize = stat.size;
        const range = req.headers.range;
       
        if (range) {
            console.log("xDDDDDDDDDDDD")
            const [head,end,start] = continuarStream(pathVideo, fileSize, range);
            const file = fs.createReadStream(pathVideo, { start, end });
            res.writeHead(206, head);
            file.pipe(res);
          } 
        else {
            const head = {
              'Content-Length': fileSize,
              'Content-Type': 'video/mp4',
            };
            res.writeHead(200, head)
            fs.createReadStream(pathVideo).pipe(res)
          };


        //res.send(url);
        

    });
    


});

router.post("/buscar",(req,res)=>{
  console.log(req.body.link);
  youtube.buscarVideo(req.body.link)
  .then(calidad =>{
    res.send(calidad);
  })

});

router.post("/decargar",async(req,res)=>{
  //falta la vaina pa validar los datos ojo importante
  //tambien pa invalido redirect

  let videoData = new videoDb({
    titulo: req.body.link,
    link: req.body.codigo,
    codigo: req.body.codigo,
    resolucion : req.body.resolucion

  });
  videoData = await videoData.save();
  console.log(videoData.id);
  youtube.videoBajar(req.body.link,req.body.codigo,videoData.id).
  then(data => {

    res.send(videoData);

  })

});

router.get("/:link",(req,res) =>{
    console.log(req.params);
    res.send();


});


module.exports = router;