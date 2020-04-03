import { router } from "../router.js"

export default {
    template: `
    <section>
        <h1 class="registerPage">Welcome!</h1>

           <nav>
            <form name="regForm" class="registerForm" @submit.prevent="registerNewMember">
            <h3 class="h3Register">Sign up:</h3>
            <input class="inputFocus" v-model="username" type="text" required placeholder="Enter username">

            <input name="password" class="inputFocus" v-model="password" type="text" :type="passwordType" required placeholder="Enter password">
            <input class="inputFocus" v-model="rePassword" type="text" :type="passwordType" required placeholder=" re-enter password">
            <span id="shortPass"></span><br>
            <span id="wrongPass"></span>
            <span id="existUsername"></span><br><br>

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
            rePassword: '',
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

            if((regForm.password.value).length<3){
                    document.getElementById("shortPass").innerHTML="Password should be minimum 3 characters."
                    setTimeout(function(){
                        document.getElementById("shortPass").innerHTML='';
                    }, 3000);
                    return 

            }
            if(this.password != this.rePassword){    
                document.getElementById("wrongPass").innerHTML="Password doesn't match."
                setTimeout(function(){
                    document.getElementById("wrongPass").innerHTML='';
                }, 3000);
                return 
            }else{


             const user = {
                    username: this.username,
                    password: this.password,
                    role: ["admin", "user"]
                }

                
                let response= await fetch('/rest/auth/signup',{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(user)
                });

               try{
                    response = await response.json()
                    console.log(response)
                    if(response.message=="User registered successfully!"){
                        this.$router.push('/login')}
                    else{
                        document.getElementById("existUsername").innerHTML="Error: Username is already taken!." 
                        setTimeout(function(){
                            document.getElementById("existUsername").innerHTML='';
                        }, 3000);
                        return
                    }
                    
               }catch{
                   console.log('Error.')
               }           
                
            }
          
            
        
        //result = await result.json()

        //this.$store.commit('appendUser', result)

        this.username = ''
        this.password = ''
        this.rePassword=''

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
