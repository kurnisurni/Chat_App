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
    loggedInUsers(){
      return this.$store.state.loggedInUsers
    }
  },
  mounted(){
    
  }
}