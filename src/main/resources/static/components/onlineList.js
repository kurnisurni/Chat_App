import user from "./user.js"
import userDetails from './userDetails.js'


export default {
    components: {
    user,
    userDetails
    },
    template: `
      <div class="onlineList" v-if="hasJoinedChannels()">
        <div class="usersHeader">
          <h2 class="usersh2"></h2>
        </div>
        <div>
          <h3>Online</h3>
        </div>
        <div class="onlineUsersDiv">
          <div v-for="user in online"  
          :key="user.id"
          v-if="user.id !== currentUser.id && checkUserChannel(user.id)"
          >
            <h4 class="onlineUserInList" @click="goToUserDetails(user)">{{ user.username }}</h4>          
          </div>  
        </div>
        
        
        <div>
          <h3>Offline</h3>
        </div>
        
        <div class="offlineUsersDiv">
          <div v-for="user in offline" 
          :key="user.id"
          v-if="user.id !== currentUser.id && checkUserChannel(user.id)"
          >
            <h4 class="onlineUserInList" @click="goToUserDetails(user)">{{ user.username }}</h4>          
          </div>
        </div>
              
        <div v-if="showModal" class="modal-route">
          <div class="modal-content"> 
            <userDetails />
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
    },
    myChannels(){
      return this.$store.state.userChannels
    },
    friendList(){
      return this.$store.state.friendShips
    },
    showModal(){
      return this.$store.state.showModal
    }
  },
  methods: {
    hasJoinedChannels(){
      if (this.myChannels.length > 0){
        return true
      } else return false
    },
    checkUserChannel(userId) {
      let isUserInChannel = false
      for (let userChannel of this.userChannels) {
        if(userChannel.channel_id === this.channel.id && userChannel.user_id === userId) {
          isUserInChannel = true
          break
        }
      }
      return isUserInChannel
    },
    goToUserDetails(user){
      if(user.id === this.currentUser.id) return
      this.$store.commit('setUserInModal', user)
    },
    close() {
      this.$store.commit('setUserInModal', {})
    }
  }
}