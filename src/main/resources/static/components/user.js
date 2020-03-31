import {disconnect} from '../socket.js'
import userDetails from './userDetails.js'

export default{
  components:{
    userDetails
  },
  template: `
    <div>
      <div @click="goToUserDetails(user)">{{user.username}}</div>
      <!-- Need to move width and height till css later -->
      <img :src="user.picture_url" alt="User Image" width="50" height="50">
      
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
    loggedInUser: null
    }
  },
  computed: {
    user(){
      return this.$store.state.currentUser
    }
  },
  methods:{
    async logOut(){
      const url = '/rest/users/logout'

      const userToLogout = {
        id: this.$store.state.currentUser.id
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

    goToUserDetails(user){
      this.loggedInUser = user
      this.showModal = true
    },
    close() {
      this.showModal = false;
    }
    },
}