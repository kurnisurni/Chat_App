import messages from './messages.js'
import messageInput from './messageInput.js'
import adminWindow from './adminWindow.js'

export default {
  components: {
    messages,
    messageInput,
    adminWindow
  },
  template: `
  <div class="channelComponent">
    <div class="headerCard">
      <h2 class="channelNameHeader">{{ channel.name }}</h2>
      <button class="leaveChannelButton" @click="leaveChannel">Leave channel</button>
      <button class="goToAdminWindow" @click="goToAdminWindow" v-if="isAdmin()">Admin view</button>
    </div>
    <div class="adminWindow" v-if="adminWindowOpen && isAdmin()">
      <adminWindow />
    </div>
    <div class="msgDiv" ref="mesgDiv">
    <messages />
    </div>
    <div class="msgInputDiv">
    <messageInput />
    </div>
  </div>
  `,

  data(){
    return {
      adminWindowOpen: false
    }
  },

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
    isAdmin(){

      console.log(this.currentUser.id)
        console.log(this.channel.adminid)

      if (this.currentUser.id === this.channel.adminid){
        console.log(this.currentUser.id)
        console.log(this.channel.adminid)
        return true
      } else return false
    },

    goToAdminWindow(){
      if (!this.adminWindowOpen){
        this.adminWindowOpen = true
      } else this.adminWindowOpen = false
    },

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