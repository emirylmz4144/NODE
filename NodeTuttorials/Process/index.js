//node <<js dosya adi>>
//node index 

console.log(global.process) //-->/ O anki işlemle alakalı bilgileri verir --> node index
console.log(global.process.argv) //--> node'un o an içerisindeki çalıştığı dosyanın içindeki argümanların isimlerini verir

//node index 2 11 --> index'e argüman olarak 2 ve 11'i ekler 

let ourArg=global.process.argv.slice(2)
console.log(ourArg) //--> ['2','11']