const ComentariesService = {
     
    getCommentariesOfPublication: async (publicationID)=>{
        try {
            const promise   = await fetch('http://localhost:8080/comments/' + publicationID)
            const posts     = await promise.json();
            console.log(posts)
            return posts
        }catch(err){
            alert('Hubo Un Error')
            alert(err)
        }
    },
    //NO FUNCIONA, DA UN ERROR 500 DESDE EL SERVIDOR
    postNewReply: (aReply)=>{
        try {
            const promise   = fetch('http://localhost:8080/commentary/', {method:'post', body:JSON.stringify(aReply) })
            /* const posts     = promise.json(); */
            console.log(promise)
            return promise
        }catch(err){
            alert('Hubo Un Error')
            alert(err)
        }
    }
}

export default ComentariesService