import {disconnect} from '../socket.js'
import userDetails from './userDetails.js'

export default{
  components:{
    userDetails
  },
  template: `
    <div>
      <div @click="goToUserDetails(user)">
        <div>{{user.username}}</div>
        <!-- Need to move width and height till css later -->
        <img :src="user.picture_url" alt="User Image" width="50" height="50">
      </div>

        <form @submit.prevent="updateUser">
        <input v-model="picture" type="text" placeholder="Add image url here..">
        <button>update picture</button>
        </form>

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
    picture: ''
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
    },

    async updateUser(){
      console.log(this.picture)
      const userToUpdate = {
        id: this.$store.state.currentUser.id,
        picture_url: this.picture
      }
        try{
          await fetch('rest/users', {
            method:'PUT',
            headers: {
              'Content-Type':'application/json'
            },
            body: JSON.stringify(userToUpdate)
          })
          console.log(this.$store.state.currentUser);
          
          this.picture = ''
          
  
    }catch(e){
      console.log(e)
      }
    },
  }
}