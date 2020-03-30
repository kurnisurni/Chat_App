import user from "./user.js"


export default {
    components: {
    user
    },
    template: `
        <div class="onlineList">
            <h2>Users</h2>
            <h3>Online:</h3>
                <ul>
                    <li v-for="user in online" 
                    :key="user.id"
                    v-if="user.id !== currentUser.id && checkUserChannel(user.id)">
                    <h4>{{ user.username }}</h4>          
                    </li>
                </ul>
                <h3>Offline:</h3>
                <ul>
                    <li v-for="user in offline" 
                    :key="user.id"
                    v-if="user.id !== currentUser.id && checkUserChannel(user.id)">
                    <h4>{{ user.username }}</h4>          
                    </li>
                </ul>          
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