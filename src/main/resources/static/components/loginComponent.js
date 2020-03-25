import { router } from "../router.js"

export default{
    template:`
       <section>
            <h1 class="LogInPage">Welcome!</h1>
            <nav>
                <form class="loginForm" @submit.prevent="logIn">
                    <h3 class="h3LogIn">Log In:</h3>
                    <input v-model="username" type="text" placeholder="Enter username:" required>

                    <input v-model="password" type="text" :type="passwordType" placeholder="Enter password:" required>

                    <button type="button" class="showPasswordButton" @click=showOrHidePassword>{{ buttonText }}</button>
                    <button class="logInButton">Log In</button>
                </form>
                 <router-link class="signUp" to="/register">Sign Up</router-link>
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

    },

    created(){
      this.loadUsers()
    },
    methods:{
      async logIn(){
        const url = '/rest/auth/signin'

        const userToLogin = {
          username: this.username,
          password: this.password
        }

        let result;
        try{
          result = await fetch(url, {
          method:'POST',
          headers: {
            'Content-Type':'application/json'
          },
          body: JSON.stringify(userToLogin)
          })

          result = await token.json()

          this.$store.commit('setAccessToken', result.accessToken)
        } catch (e){
          console.log(e)
          console.log('probably wrong username or password')
        }

        router.push('home')
      },

      showOrHidePassword(){
        if(this.passwordType === 'password') {
          this.passwordType = 'text'
          this.buttonText = 'Hide Password'
        } else {
          this.passwordType = 'password'
          this.buttonText = 'Show Password'
        }
      },
      async loadUsers(){
        //Loads all online users so that we can keep from logging in twice, will be solved with sessions later
          let users = await fetch('/rest/users')
          users = await users.json()
          this.$store.commit('displayUsers', users)
          console.log('Users:')
          console.log(users)


          let onlineUsers = users.filter(user => user.online)
          console.log(onlineUsers)

          for (let user of onlineUsers){
            this.$store.commit('goOnline', user)
          }
      }
    }
}