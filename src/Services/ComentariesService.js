/* export default class ComentariesService {

    commentariesOfPublication=async (publicationID)=>{
        try {
            const promise   = await fetch('http://localhost:8080/publication/' + publicationID)
            const posts     = await promise.json();
            console.log(posts)
            return posts
        }catch(err){
            alert(err)
        }

    }
} */

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
      }
}

export default ComentariesService