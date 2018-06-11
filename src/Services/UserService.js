const UserService = {
    logUser: "",

    getUser: async ()=>{
        try {
            const promise   = await fetch('http://localhost:8080/user')
            const posts     = await promise.json();
            console.log(posts)
            this.logUser = posts
            return this.logUser
        }catch(err){
            alert('Hubo Un Error')
            alert(err)
        }
      }
}

Object.freeze(UserService);

export default UserService