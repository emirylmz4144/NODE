
let products = require('./data.js'); 
// server.js kullanırız çünkü node.js'le api yazarsak yönetim daha da zorlaşır 
const express = require('express');
const app = express();
const PORT = 3000;

// app express'in içindeki verilerin json ile alınma şeklini kullansın
app.use(express.json());

/** * ilgili endpoint'e gider ve req res adında iki tane parametreyi alır req isteği res sonucu
 * temsil eder böylece hem istek gönderip hem sonucunu alabiliriz
 */
app.post('/products', (req, res) => {
  // Yeni ürün nesnesini oluştur
  const newProduct = {
    id: products.length + 1,
    name: req.body.name,
    price: req.body.price,
    stock: req.body.stock,  
  };

  products.push(newProduct);
  res.status(201).json(newProduct);
});

//spesifik ürün getirme
app.get('/products', (req, res) => {
  const { id } = req.query; // Key-Value (Params) kısmından 'id'yi al

  // Eğer 'id' parametresi varsa (örn: /products?id=1)
  if (id) {
    const product = products.find(p => p.id === parseInt(id));

    if (!product) {
      return res.status(404).json({ message: 'Ürün bulunamadı!' });
    }
    
    res.json(product);
  } else {
    // Eğer 'id' parametresi yoksa (örn: /products)
    // Tüm ürünleri getir
    res.json(products);
  }
});

 //PUT isteğiyle gelen verilere göre var olan ürünü düzenler
app.put('/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).json({ message: 'Ürün bulunamadı!' });
  }
  product.name = req.body.name || product.name;
  product.price = req.body.price || product.price;
  product.stock = req.body.stock || product.stock;

  res.json(product);
});


app.delete('/products', (req, res) => {
    //express js node'da require url falan kısmını otomotik hallediyor böylee sen direkt alabiliyorsun req express için bir objedir
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ message: 'Silmek için bir id parametresi belirtmelisiniz!' });
  }

  const numericId = parseInt(id);
  const product = products.find(p => p.id === numericId);

  if (!product) {
    return res.status(404).json({ message: 'Ürün bulunamadı!' });
  }

  products = products.filter(p => p.id !== numericId);

  res.json({ message: `ID ${numericId} olan ürün başarıyla silindi!` });
});

//uygulamayı çalıştır ve dinle
app.listen(PORT, () => {
  console.log(`Sunucu http://localhost:${PORT} adresinde çalışıyor`);
});
