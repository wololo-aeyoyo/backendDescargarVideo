const fs = require("fs");
const expres = require("express");
const youtube = require("../core/youtube-dl-core")
const continuarStream = require("../core/stream-pipe");
const router = expres.Router();


router.get("/post",(req,res) =>{
    console.log(req.body.link);

    //checkear input por implementar
    youtube(req.body.link).
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

router.get("/:link",(req,res) =>{
    console.log(req.params);
    res.send();


});


module.exports = router;