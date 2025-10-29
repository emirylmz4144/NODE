import http, { get } from 'http'
import { getAllUsers } from './data.js'
import { json } from 'stream/consumers'
const PORT = process.env.PORT

const server = http.createServer((req, res) => {
    //GET
    if (req.url === '/api/users' && req.method === 'GET') {
        res.setHeader('Content-Type', 'application/json')
        let users = getAllUsers()
        res.write(JSON.stringify(users))
        res.end()
    }

    //SPESİFİK GET
    else if (req.url.match(/\/api\/users\/\d+/) && req.method === 'GET') {
        let id = req.url.split("/")[3]
        let user = getAllUsers().find((user) => user.id === parseInt(id))
        if (user) {
            res.setHeader('Content-Type', 'application/json')
            res.write(JSON.stringify(user))
            res.end()
        }
        else {
            res.setHeader('Content-Type', 'application/json')
            res.statusCode = 404
            res.write(JSON.stringify({ message: 'Kullanıcı Bulunamadı' }))
            res.end()
        }
    }

    //POST
    else if (req.url === '/api/users' && req.method === 'POST') {
        let body = ''
        req.on('data', (chunk) => {
            body += chunk.toString();
        });
        req.on('end', () => {
            let newUser = JSON.parse(body);
            if (!getAllUsers().find((user) => user.id === parseInt(newUser.id))) {
                getAllUsers().push(newUser)
                res.statusCode = 201
                res.write(JSON.stringify(newUser))
                res.end()
            }
            else {
                res.setHeader('Content-Type', 'application/json')
                res.statusCode = 404
                res.write(JSON.stringify({ message: 'Kullanıcı zaten mevcut' }))
                res.end()
            }
        });
    }


    //PUT
    else if (req.url.match(/^\/api\/users\/\d+$/) && req.method === 'PUT') {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk.toString()
        });

        req.on('end', () => {
            const updatedData = JSON.parse(body);
            const id = parseInt(req.url.split('/')[3]);
            let userIndex = getAllUsers().findIndex((user) => user.id === id)

            if (userIndex !== -1) {
                getAllUsers()[userIndex] = { ...getAllUsers()[userIndex], ...updatedData }
                res.statusCode = 201
                res.write(JSON.stringify(updatedData))
                res.end()
            }
            else {
                res.setHeader('Content-Type', 'application/json')
                res.statusCode = 404
                res.write(JSON.stringify({ message: 'Güncellenmek istenen kullanıcı bulunamadı' }))
                res.end()
            }

        });
    }


    //DELETE
    else if (req.url.match(/^\/api\/users\/\d+$/) && req.method === 'DELETE') {
        let id = parseInt(req.url.split("/")[3])
        let userIndex = getAllUsers().findIndex((user) => user.id === id)
        if (userIndex !== -1) {
            getAllUsers().splice(userIndex, 1)
            res.statusCode = 204
            res.write(JSON.stringify({ message: 'silme işlemi başarı ile gerçekleşti' }))
            res.end()
        }
        else {
            res.setHeader('Content-Type', 'application/json')
            res.statusCode = 404
            res.write(JSON.stringify({ message: 'Silinmek istenen kullanıcı bulunamadı' }))
            res.end()
        }
    }



    else {
        res.setHeader('Content-Type', 'application/json')
        res.statusCode = 404
        res.write(JSON.stringify({ message: 'Yönlendirme veya yanlış istek hatası' }))
        res.end()
    }

})

server.listen(PORT, () => {
    console.log(`server şu an ${PORT} portunda çalışıyor`)
})


