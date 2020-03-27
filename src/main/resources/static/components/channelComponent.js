import messages from './messages.js'
import messageInput from './messageInput.js'

export default {
  components: {
    messages,
    messageInput
  },
  template: `
  <div>
    <div class="channelComponent">

      <div class="headerCard">
        <nav>
        <h2>{{ channel.name }}</h2>     <!-- Here we need to make a navbar and pick up the channel name -->
        </nav>
        <messages />
      </div>

      <div>
          <h2>Users</h2>
            <h3>Online:</h3>
              <ul v-for="userChannels in allUserChannels">
                  <li v-for="user in online" 
                  :key="user.id"
                  v-if="userChannels.channel_id === channel.id && userChannels.user_id === user.id && user.id !== currentUser.id">
                  <h4>{{ user.username }}</h4>          
                  </li>
              </ul>
              <h3>Offline:</h3>
              <ul>
                  <li v-for="user in offline" 
                  :key="user.id"
                  v-if="user.id !== currentUser.id">
                  <h4>{{ user.username }}</h4>          
                  </li>
              </ul>      
      </div>  
    </div>
    <messageInput />
  </div>
  `,
  computed: {
    channel(){
      return this.$store.state.currentChannel
    },
    usersInChannels(){
      return this.$store.state.userChannels
    },
    users(){
      return this.$store.state.users
    },
    online(){
      return this.$store.state.onlineUsers 
    },
    currentUser(){
      return this.$store.state.currentUser
    },
    offline(){
      return this.users.filter(user => user.online === false)
    },
    allUserChannels() {
      return this.$store.state.allUserChannels
    }
  }
}