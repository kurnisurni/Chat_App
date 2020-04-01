export default {
  template: `
  <div>
    <h3 class="channelNameAdminWindow">{{ currentChannel.name }}</h3>
    <form class="changeChannelName" @submit.prevent="changeChannelName">
      <label for="newName">Change channel name</label>
      <input type="text" v-model="newChannelName" name="newName" placeholder="Enter new channel name..." required>
      <button class="changeChannelNameButton">Submit</button>
    </form>

    <div v-for="user in users" :key="user.id">
      <div class="usersInChannels" v-if="userInChannel(user)">
        <p class="userInAdminWindow">{{ user.username }}</p>
        <p class="kickUser" @click="askIfKick(user)">🗑️</p>
        <button type="button" @click="kickUser(user)" v-if="kicking === user.id">Kick user</button>
      </div>
    </div>
  </div>
  `,

  data(){
    return {
      newChannelName: '',
      kicking: ''
    }
  },

  computed: {
    users(){
      return this.$store.state.users
    },
    userChannels(){
      return this.$store.state.allUserChannels
    },
    currentChannel(){
      return this.$store.state.currentChannel
    }
  },

  methods: {
    askIfKick(user){
      if (this.kicking != user.id){
        this.kicking = user.id
      } else this.kicking = ''
    },

    async changeChannelName(){

      let channelAndName = {
        id: this.currentChannel.id,
        name: this.newChannelName,
        adminid: this.currentChannel.adminid
      }

      try{
        await fetch('/rest/channels', {
          method:'PUT',
          headers: {
            'Content-Type':'application/json'
          },
          body: JSON.stringify(channelAndName)
        })
      } catch(e){
        console.log(e)
      }

    },
    userInChannel(user){
      for (let usCh of this.userChannels){
        if (usCh.user_id === user.id && usCh.channel_id === this.currentChannel.id && usCh.user_id !== this.$store.state.currentUser.id){
          return true
        }
      }
      return false
    },
    async kickUser(user){

      const userChannelToRemove = {
        channel_id: this.currentChannel.id,
        user_id: user.id
      }

      try{
        await fetch('/rest/userChannels', {
          method:'DELETE',
          headers: {
            'Content-Type':'application/json'
          },
          body: JSON.stringify(userChannelToRemove)
        })
      } catch (e){
        console.log(e)
      }

      const srvMsg = user.username + ' has just been KICKED from the channel!'

      const newServerMessage = {
        message: srvMsg,
        channel_id: this.currentChannel.id,
        time: Date.now()
      }

      try{
        await fetch('rest/serverMessages', {
          method:'POST',
          headers: {
            'Content-Type':'application/json'
          },
          body: JSON.stringify(newServerMessage)
        })
      } catch(e){
        console.log(e)
      }
      this.kicking = ''
    }

  }
}