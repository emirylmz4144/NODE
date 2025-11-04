import jwt from "jsonwebtoken"; 

const authMiddleware = (req, res, next) => {
  try {
    /* 
      req.headers.authorization -> İstek header’ındaki Authorization bilgisini alır.
      Eğer bu header yoksa undefined olur, o yüzden || "" diyerek boş string’e çeviriyoruz.
      Bu sayede split() hataya düşmez.
    */
    const auth = req.headers.authorization || "";

    /* 
      auth örneği genelde şöyle gelir:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
      Yani arada boşluk var.
      Bu yüzden split(" ") ile boşluktan ayırıyoruz.
      parts[0] -> "Bearer"
      parts[1] -> asıl token kısmı (uzun base64 string)
    */
    const parts = auth.split(" ");

    /* 
      parts.length === 2 → gerçekten "Bearer <token>" formatında mı diye kontrol eder.
      parts[0] === "Bearer" → ilk kelimenin 'Bearer' olduğundan emin olur.
      eğer iki şart da sağlanıyorsa parts[1] (yani token) alınır.
       aksi durumda null döner (yani geçersiz ya da eksik header).
      
      Header düzgün formatta geldiyse token değişkenine asıl JWT string’ini atar, değilse null verir.
    */
    const token = parts.length === 2 && parts[0] === "Bearer" ? parts[1] : null;

    if (!token) {
      res.status(401).json({ message: "Oturum süresi doldu veya yetkisiz işlem algılandı" });
      return;
    }

    /* 
      Eğer token doğruysa içindeki payload (örneğin { id, username }) döner.
      Eğer token sahte, süresi dolmuş veya anahtar yanlışsa hata fırlatır.
    */
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    /* 
      Token içindeki veriler decoded değişkeninde durur.
      Bu bilgileri istek objesine ekliyoruz (req.user).
      Böylece bu middleware’den geçen her istek artık kullanıcının id ve username bilgisine erişebilir.
    */
    req.user = { id: decoded.id, username: decoded.username };


    // next() → middleware zincirinde bir sonraki aşamaya geç.

    next();
  } catch (error) {
    console.log(error)
    res.status(401).json({ message: "Token geçersiz veya süresi dolmuş" });
  }
};

export default authMiddleware;

