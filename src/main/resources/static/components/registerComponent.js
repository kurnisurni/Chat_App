import { router } from "../router.js"

export default {
    template: `
    <section>
    <h1>Welcome!</h1>
    <h2>Not a member yet? Please, register to start a conversation!</h2>
    <div>
    {{ users }}
    </div>
    <form @submit.prevent="registerNewMember">
    <h3>Sign up:</h3>
        <input v-model="username" type="text" required placeholder="Enter username">
        <input v-model="password" type="passwordType" required placeholder="Enter password">

        <button @click=showOrHidePassword>{{ buttonText }}</button>
                    <button type="button" @click="signUp">Sign up</button>
                </section>
                <h4>Already a member?</h4>
                <router-link to="/">Login</router-link>

    </form>
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
            }

            let signUp = await fetch('http://localhost:5000/rest/users',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        result = await result.json()

        this.$store.commit('displayUsers', users)

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
