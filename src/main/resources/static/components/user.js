import {disconnect} from '../socket.js'

export default{

    template: `
        <div>
            <div>{{user.username}}</div>
            <!-- Need to move width and height till css later -->
            <img :src="user.picture" alt="User Image" width="50" height="50">
            <button @click="logOut">Log Out</button>
            
        
        </div>
    `,
    data(){
        return{
            userName: this.$store.state.currentUser.username,
            userPicture: this.$store.state.currentUser.picture
        }
    },
    computed: {
        user(){
            return this.$store.state.currentUser
        }
    },
    methods:{
        logOut(){
          disconnect()
          this.$router.push('/')
        }
    },
}