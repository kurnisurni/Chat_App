import user from "./user.js"
import userDetails from './userDetails.js'


export default {
    components: {
    user,
    userDetails
    },
    template: `
        <div class="onlineList">
            <h2>Users</h2>
            <h3>Online:</h3>
                <ul>
                    <li v-for="user in online" 
                    @click="goToUserDetails(user)" 
                    :key="user.id"
                    v-if="user.id !== currentUser.id && checkUserChannel(user.id)">
                    <h4>{{ user.username }}</h4>          
                    </li>
                    <!-- <div v-if="showModal" class="modal-route">
                      <div class="modal-content"> 
                        <userDetails :onlineUser="clickedUser"/>
                      </div>
                    </div> -->
                </ul>
                <h3>Offline:</h3>
                <ul>
                    <li v-for="user in offline"
                    @click="goToUserDetails(user)" 
                    :key="user.id"
                    v-if="user.id !== currentUser.id && checkUserChannel(user.id)">
                    <h4>{{ user.username }}</h4>          
                    </li>
                </ul>          
                    <div v-if="showModal" class="modal-route">
                      <div class="modal-content"> 
                        <userDetails :offlineUser="user"/>
                      </div>
                    </div>
        </div>
    `,

computed: {
    users(){
      return this.$store.state.users
    },
    currentUser(){
      return this.$store.state.currentUser
    },
    online(){
      return this.$store.state.onlineUsers 
    },
    offline(){
      return this.users.filter(user => user.online === false)
    },
    channel(){
      return this.$store.state.currentChannel
    },
    userChannels() {
      return this.$store.state.allUserChannels
    }
  },
  data(){
    return{
      user: null,
      showModal: false
    }
  },
  methods: {
    checkUserChannel(userId) {
      let isUserInChannel = false

      for (let userChannel of this.userChannels) {
        if(userChannel.channel_id === this.channel.id && userChannel.user_id === userId) {
          isUserInChannel = true
          break
        }
      }
      return isUserInChannel
    }
  }
}