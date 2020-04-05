import messages from './messages.js'
import messageInput from './messageInput.js'
import adminWindow from './adminWindow.js'
import noChannels from './noChannels.js'
import privateChat from './privateChat.js'

export default {
  components: {
    messages,
    messageInput,
    adminWindow,
    noChannels,
    privateChat
  },
  template: `
  <div class="channelComponent">
    <div class="showIfHasChannels" v-if="hasJoinedChannels()">
      <div class="headerCard">
        <h2 class="channelNameHeader" v-if="channel.name">{{ channel.name }}</h2>
        <h2 class="channelNameHeader" v-if="channel.user1">Private conversation between {{ getUsername(channel.user1) }} & {{ getUsername(channel.user2) }}</h2>
        <button class="leaveChannelButton" @click="leaveChannel" v-if="channel.name && channel.adminid != currentUser.id">Leave</button>
        <button class="goToAdminWindow" @click="goToAdminWindow" v-if="channel.name && isAdmin()">Administration</button>
      </div>
      <div class="adminWindow" v-if="channel.name && adminWindowOpen && isAdmin() && hasJoinedChannels()">
        <adminWindow />
      </div>

      <div class="msgDiv" v-if="channel.user1">
        <privateChat />
      </div>

      <div class="msgDiv" ref="mesgDiv" v-if="channel.name && !adminWindowOpen && hasJoinedChannels()">
        <messages />
      </div>
      <div class="msgInputDiv" v-if="!adminWindowOpen && hasJoinedChannels()">
        <messageInput />
      </div>
    </div>

    <div class="noChannels" v-if="!hasJoinedChannels()">
        <noChannels />
    </div>
    
  </div>
  `,

  data(){
    return {
      adminWindowOpen: false,
      channelId: ''
    }
  },

  computed: {
    channel(){
      return this.$store.state.currentChannel
    },
    allChannels(){
      return this.$store.state.channels
    },
    userChannels(){
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

    getUsername(userId){
      for (let user of this.users){
        if (user.id === userId){
          return user.username
        }
      }
    },

    hasJoinedChannels(){
      if (this.userChannels.length > 0){
        return true
      } else return false
    },

    isAdmin(){
      if (this.currentUser.id === this.channel.adminid && this.channelId === this.channel.id){
        return true
      } else{
        this.channelId = this.channel.id
        this.adminWindowOpen = false
        return false
      } 
    },

    goToAdminWindow(){
      if (!this.adminWindowOpen){
        this.adminWindowOpen = true
      } else this.adminWindowOpen = false
    },

    async leaveChannel(){

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
    }

  },

  mounted(){
    this.channelId = this.channel.id
  }
}