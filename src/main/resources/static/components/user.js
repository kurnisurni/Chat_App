import {disconnect} from '../socket.js'
import userDetails from './userDetails.js'

export default{
  components:{
    userDetails,
  },
  template: `
    <div class="userComp">
      <div class="userDiv">
        <img class="userUserPic" :src="user.picture_url" alt="User Image" width="50" height="50" @click="goToUserDetails(user)">
        <div class="userName" @click="goToUserDetails(user)">{{user.username}}</div>
        <!-- Need to move width and height till css later -->
        
      </div>

      <div v-if="showModal" class="modal-route">
        <div class="modal-content"> 
          <userDetails :loggedInUser="user"/>
        </div>
      </div>
    </div>
  `,
  data(){
    return{
    showModal: false,
    loggedInUser: null,
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

    close() {
      this.showModal = false
    },
    goToUserDetails(user){
      this.loggedInUser = user
      this.showModal = true
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
    },
    async updateUser(picture){
      const userToUpdate = {
        id: this.$store.state.currentUser.id,
        picture_url: picture
      }
        try{
          await fetch('rest/users', {
            method:'PUT',
            headers: {
              'Content-Type':'application/json'
            },
            body: JSON.stringify(userToUpdate)
          })
          picture = ''
    }catch(e){
      console.log(e)
      }
    },
  }
}