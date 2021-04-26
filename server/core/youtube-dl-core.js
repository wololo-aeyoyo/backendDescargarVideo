const youtubedl = require("youtube-dl-exec");
const fs = require('fs');

module.exports =  function videoBajar(link="https://youtu.be/1wnE4vF9CQ4") {
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
}
