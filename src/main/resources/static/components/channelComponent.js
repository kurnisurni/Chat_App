import messages from './messages.js'
import messageInput from './messageInput.js'

export default {
  components: {
    messages,
    messageInput
  },
  template: `
  <div class="channelComponent">
    <div class="headerCard">
      <h2>{{ channel.name }}</h2>
    
    </div>
    <div class="msgDiv" ref="mesgDiv">
    <messages />
    </div>
    <div class="msgInputDiv">
    <messageInput />
    </div>
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
  },
  mounted(){
    
  }
}