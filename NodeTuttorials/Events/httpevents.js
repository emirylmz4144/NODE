const http=require('http')
const fs=require('fs')
const { error } = require('console')
const PORT=3000

const server=http.createServer((req,res)=>{
    if(req.url==='/'){
        res.setHeader('Content-Type','text/html ; charset=utf-8')
        res.write('<html>')
        res.write("<h1>ANASAYFAYA HOŞGELDİN</h1>")
        res.write('</html>')
        res.end()
    }
    if(req.url==='/api/file'){
        fs.readFile('forhttpevents.html',(err,sub)=>{
            if(err){
                res.setHeader('Content-Type','application/json')
                res.statusCode=404
                res.write(JSON.stringify({message:'Sayfa bulunamadı'}))
                res.end()
            }
            else{
                res.setHeader('Content-Type','application/json')
                res.statusCode=200
                res.write(JSON.stringify({message:'Dosya başarılı bir şekilde okundu'}))
                res.end()
                
            }
        })
    }
})

server.listen(PORT,()=>{
    console.log(`server ${PORT} portunda çalışıyor`)
})