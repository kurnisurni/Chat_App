import {disconnect} from '../socket.js'

export default{

    template: `
        <div>
            <div>{{user.username}}</div>
            <!-- Need to move width and height till css later -->
            <img :src="user.picture_url" alt="User Image" width="50" height="50">
            <button @click="logOut">Log Out</button>
            <button @click="showOfflineMessages">New Messages</button>
        </div>
    `,
    data(){
        return{
            
        }
    },
    computed: {
        user(){
            return this.$store.state.currentUser
        },
        offlineMessages(){
          return this.$store.state.offlineMessages
        }
    },
    methods:{
      showOfflineMessages(){
        //öppna en modal med alla offline messages uppdelade efter kanal
      },

      async logOut(){

        const url = '/rest/users/logout'

        const userToLogout = {
          id: this.$store.state.currentUser.id,
          logoff_time: Date.now()
        }

        try{
          await fetch(url, {
          method:'PUT',
          headers: {
            'Content-Type':'application/json'
          },
          body: JSON.stringify(userToLogout)
          })
        } catch(e){
          console.log(e)
        }

        localStorage.removeItem('accessToken')
        disconnect()
        this.$router.push('/login')
      }
    },
}