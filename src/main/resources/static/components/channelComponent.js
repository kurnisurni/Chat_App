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
      <h2 class="channelNameHeader">{{ channel.name }}</h2>
      <button class="leaveChannelButton" @click="leaveChannel">Leave channel</button>
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
  methods: {
    async leaveChannel(){
      const userChannelToDelete = {
        channel_id: this.channel.id,
        user_id: this.currentUser.id
      }

      try {
        await fetch('/rest/userChannels', {
          method:'DELETE',
          headers: {
            'Content-Type':'application/json'
          },
          body: JSON.stringify(userChannelToDelete)
        })
      } catch (error) {
        console.log(error);
      }

      const srvMsg = this.currentUser.username + ' just left the channel!'

      const newServerMessage = {
        message: srvMsg,
        channel_id: this.channel.id,
        time: Date.now()
      }

      try {
        await fetch('/rest/serverMessages', {
          method:'POST',
          headers: {
            'Content-Type':'application/json'
          },
          body: JSON.stringify(newServerMessage)
        })
      } catch (error) {
        console.log(error)
      }

      this.$store.commit('setCurrentChannel', this.$store.state.channels[0])
    }
  }
}