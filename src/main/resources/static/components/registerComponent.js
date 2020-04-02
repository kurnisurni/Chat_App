import { router } from "../router.js"

export default {
    template: `
    <section>
        <h1 class="registerPage">Welcome!</h1>

           <nav>
            <form class="registerForm" @submit.prevent="registerNewMember">
            <h3 class="h3Register">Sign up:</h3>
            <input class="inputFocus" v-model="username" type="text" required placeholder="Enter username">
            <input class="inputFocus" v-model="password" type="text" :type="passwordType" required placeholder="Enter password">
            <button type="button" class="showPasswordButton" @click=showOrHidePassword>{{ buttonText }}</button>
            <button class="registerBtn">Sign up</button>

            <p class="signUp">Already a member? <span class="LoginWord" @click="$router.push('/')"><a> Login here </a> </span></p>

            </form>
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
        users() {
            return this.$store.state.users
        }
    },
    methods: {
        async registerNewMember(){
            if(!this.username.trim() &&
            !this.password.trim()){
                return
            }
            let user = {
                username: this.username,
                password: this.password,
                role: ["admin", "user"]
            }

            try{
              await fetch('/rest/auth/signup',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
              })
            } catch(e){
              console.log(e)
            }

        this.$router.push('/login')

          
            
        
        //result = await result.json()

        //this.$store.commit('appendUser', result)

        this.username = ''
        this.password = ''
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
