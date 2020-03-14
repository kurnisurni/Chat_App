export default{
    template:`
       <section>
            <h1>Welcome!</h1>
            <div>
            {{ users }}
            </div>
            <nav>
                <section>
                    <h3>Log In:</h3>
                    <input v-model="username" 
                        type="text" 
                        placeholder="Enter username:" 
                        required 
                    >

                    <input v-model="password" 
                        :type="passwordType" 
                        placeholder="Enter password:" 
                        required
                    >

                    <button @click=showOrHidePassword>{{ buttonText }}</button>
                    <button type="button" @click="logIn">Log In</button>
                </section>
                <router-link to="/sign-up">Sign Up</router-link>
            </nav>
       </section>
    `,
    data(){
        return{
            username: '',
            password: '',
            passwordType: 'password',
            buttonText: 'Show password',
        }
    },
    computed: {
      users(){
        return this.$store.state.users;
      }
    },
    methods:{
        async logIn(){
            console.log(this.username, this.password)
            let url = '/rest/users/login/' + this.username + '/' + this.password
            console.log(url)

            let user;
            try{
              user = await fetch(url)
              user = await user.json()
              console.log("success")
              this.$store.commit("loginUser", user)
              console.log(this.$store.state.currentUser)
            } catch (e){
              console.log("failed");
              console.log(e)
            }
        
        },

        showOrHidePassword(){
            if(this.passwordType === 'password') {
                this.passwordType = 'text'
                this.buttonText = 'Hide Password'
             } else {
                this.passwordType = 'password'
                this.buttonText = 'Show Password'
             }
         }
    }
}