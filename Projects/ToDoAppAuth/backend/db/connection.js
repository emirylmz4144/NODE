import path from "path"; //Dosya yollarını işletim sistemi uyumlu biçimde birleştirip çözer. Windows’ta \, Unix’te / gibi
import { fileURLToPath } from "url";  // Modül yolu olan url'yi dosya yoluna çevirmek için
import dotenv from "dotenv"; // env dosyasını process.cwd içerisine atar
import pkg from 'pg' //node postgresql


const __filename = fileURLToPath(import.meta.url);  //Common Modulde var olan dirname ve filename ESM modulde yoktur o yüzden url'yi filename'e tanımlarız
const __dirname = path.dirname(__filename);// file uzantısından tanımlanan klasörün dosya yolunu alır

dotenv.config({ path: path.join(__dirname, "../.env") });//env dosyasının yerini şu anki klasör(connection.js)'ün neresinde olduğunu belirtip __dirname'e ata


const { Client } = pkg; // Pool yerine Client kullanıyoruz

// Tek bağlantı oluştur
 const client = new Client({connectionString: process.env.DB_URL});

// Bağlantıyı başlat
client.connect()
  .then(() => console.log("PostgreSQL bağlantısı kuruldu"))
  .catch(err => console.error("Bağlantı hatası:", err));


export {client}