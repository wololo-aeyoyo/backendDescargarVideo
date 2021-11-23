const youtubedl = require("youtube-dl-exec");
const fs = require('fs');
const { resolve } = require("path");

function videoBajarOLD(link="https://youtu.be/1wnE4vF9CQ4") {
    return new Promise(async(resolve, reject)=>{
        try{
            console.log("invoca data_______________")
            data = await youtubedl(link,{
                f: ["bestvideo[ext=mp4]+bestaudio[ext=m4a]/mp4"],
                o:[`./server/video/temp`]//añadir id de la db para despues
            })
            console.log(data)
            
            

            fs.readdir("./server/video/temp", (err, files) => {
                files.forEach(file => {
                  console.log(file);
                });
              });
           path = data.match(/(?<=Destination: ).*/)
           //console.log(path[0])
            //resolve(`${path}.mp4`); arreglar 
            resolve("./server/video/temp.mp4"); 
            

        }
        catch(error){
            console.log(error)
            reject(error)
        }
    })
};

function buscarVideo(link){
    return new Promise(async(resolve, reject)=>{
        try {
        let separado = [];
        let noEspacio=[];
        let jsonResolucion=[];
        let data = await youtubedl(link,{
            listFormats:true
        });
        let titulo = await youtubedl(link,{
            getTitle:true
        })
        let regex = data.match(/(?<=note)[^\$]*$/);
        let separa = regex[0].split("\n");
        for (const i in separa){
            noEspacio.push(separa[i].replace(/\s+/g, ' ').trim());
        };
        noEspacio.shift();
        for (const e in noEspacio){
            separado.push(noEspacio[e].split(" "));
        };
        for (const a in separado){
            jsonResolucion.push({
                "codigo": separado[a][0],
                "formato": separado[a][1],
                "resolucion": separado[a][2]
            })
        };
        jsonResolucion.unshift(titulo);
        console.log(jsonResolucion);

        resolve(jsonResolucion);

        } 
        catch (error) {
            console.log(error)
        }

    })

};

function videoBajar(link,codigo,id) {
    return new Promise(async(resolve, reject)=>{
        try {
            data = await youtubedl(link,{
                f: [`${codigo}+bestaudio[ext=m4a]/mp4`],
                o:[`./server/video/${id}`]//añadir id de la db para despues
            })
            console.log(data);
            fs.readdir("./server/video", (err, files) => {
                files.forEach(file => {
                  console.log(file);
                  resolve(file);
                });
              });

        }
        catch (error) {
            console.log(error);
            
        }
    })
};

module.exports.videoBajar =  videoBajar;
module.exports.buscarVideo = buscarVideo;