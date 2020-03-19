import { router } from "../router.js"

export default{
    template:`
       <section>
            <h1 class="frontPage">Welcome!</h1>
            <nav>
                <form class="loginForm" @submit.prevent="logIn">
                    <h3 class="h3LogIn">Log In:</h3>
                    <input v-model="username" type="text" placeholder="Enter username:" required>

                    <input v-model="password" type="text" :type="passwordType" placeholder="Enter password:" required>

                    <button type="button" class="showPasswordButton" @click=showOrHidePassword>{{ buttonText }}</button>
                    <button class="logInButton">Log In</button>
                </form>
                <router-link class="signUp" to="/sign-up">Sign Up</router-link>
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
    methods:{
      async logIn(){
          let url = '/rest/users/login/' + this.username + '/' + this.password

          let user;
          try{
            user = await fetch(url)
            user = await user.json()
            this.$store.commit("loginUser", user)

            router.push('home')
          } catch (e){
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