let posts=[
  {
    id:1,
    name:'emir',
    posts:'Bugünlerde hava çok güzel'
  },
  {
    id:2,
    name:'Hilal',
    posts:'Bugünlerde hava bence de  çok güzel'
  },
  {
    id:3,
    name:'Bilal',
    posts:'Bugünlerde havanın çok güzel olduğuna katılıyorum'
  }

]

let listOfBooks=()=>{
  for(let book of posts){
    console.log(`${book.id} id numaralı ve ${book.name} kullanıcı adına sahip kişi ${book.posts} gönderisini paylaştı`)
  }
}


let addPosts=(newPost)=>{
  return new Promise((resolve,reject)=>{
    if (typeof newPost === 'number' || typeof newPost === 'string'){
      reject('Tip hatası')
    }
    else{
      resolve(newPost)
    }
  })
}

addPosts({id:4,name:'Dr Who',posts:'Bence de hava bugün müthiş'})
.then((post)=>{
  posts.push(post)
  listOfBooks()
})
.catch((err)=>console.log(err))