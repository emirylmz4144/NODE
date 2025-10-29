import { exec } from 'child_process'
import http from 'http'
const PORT = process.env.PORT

const server = http.createServer((req, res) => {
    try {
        if (req.method == 'GET') {
            if (req.url === '/') {
                res.writeHead(200, { 'content-type': 'text/html' })
                res.write('<h1>ANASAYFA</h1>')

            }
            else if (req.url === '/about') {
                res.writeHead(200, { 'content-type': 'text/html' })
                res.write('<h1>HAKKIMIZDA</h1>')

            }
            else {
                res.writeHead(404, { 'content-type': 'text/html' })
                res.write('<h1>BULUNAMADI</h1>')
            }

        }else{
            throw new Error()
        }

    } catch {
        res.writeHead(500, { 'content-type': 'application/json' })
        res.write(JSON.stringify({message:"Sunucu hatası meydana geldi"}))
    }
    res.end()
})

server.listen(PORT, () => {
    console.log(`Server şu an ${PORT}'unda çalışıyor`)
})

