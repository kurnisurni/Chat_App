export default{
  template: `
  <div class="channel">
    
    <div>
      <h3>Your Channels</h3>
    </div>
    
    <div class="yourChannelList">
      <div class="yourChannels" v-for="channel in userChannels" :key="channel.id">
        <div class="nameAndNewMessages">
          <h4 class="channelNameInList" @click="goToChannel(channel)">
            {{ channel.name }}
          </h4>
          <h4 class="missedMessages" 
          v-if="checkNewMessages(channel.id) && checkChannels(channel.id)">
          {{ howMany(channel.id) }}
          </h4>
        </div>
        
      </div>
    </div> 
 
    

    <div>
      <h3>All Channels</h3>
    </div>
      
    
    <div class="allChannelList">
      <div class="allChan" v-for="channel in allChannels" :key="channel.id" v-if="isChannelJoined(channel.id)">
        <h4 class="channelNameInList" @click="goToChannel(channel)">
          {{ channel.name }}
        </h4>
      </div> 
    </div>

     
      
    
  </div>
  `,
  computed: {
    userChannels(){
      return this.$store.state.userChannels
    },
    allChannels(){
      return this.$store.state.channels
    },
    offlineMessages(){
      return this.$store.state.offlineMessages
    },
    readMessages(){
      return this.$store.state.readMessages
    }
  },
  mounted(){
    this.checkNewMessages()
  },
  updated(){
    this.checkNewMessages()
  },
  data(){
    return{
      newMessages: false,
      checkedChannels: []
    }
  },
  methods: {
    howMany(channelId){

      let amount = 0;
      for (let msg of this.offlineMessages){
        if (msg.channel_id === channelId){
          amount++
        }
      }
      return amount
    },
    checkNewMessages(channelId){
      for(let msg of this.offlineMessages){
        if(msg.channel_id === channelId){
          return this.newMessages = true
        }
      }
      return this.newMessages = false
    },
    async goToChannel(channel){
      if (!this.userChannels.includes(channel)) this.addChannelToUserChannels(channel)
      this.$store.commit('setCurrentChannel', channel)
      this.checkedChannels.push(channel.id)
      this.$store.commit('removeOfflineMessages', channel.id)
    },
    checkChannels(channelId){
      if(this.checkedChannels.includes(channelId)){
        return false
      }else{
        return true
      }
    },
    otherChannels(channelId){
      for (let chan of this.userChannels){
        if (chan.id === channelId){
          return false
        }
      }
      return true
    },
    isChannelJoined(channelId){
      let isItJoined = true

      for (let channel of this.userChannels){
        if (channel.id === channelId){
          isItJoined = false
          break
        }
      }
      return isItJoined
    },
    async addChannelToUserChannels(channel){

      let channelToAdd = {
      channel_id: channel.id,
      user_id: this.$store.state.currentUser.id
      }

      console.log(channelToAdd)

      //add channel to currentUser's userChannels in database
      try{
        await fetch('/rest/userChannels', {
        method: 'POST',
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify(channelToAdd)
      })
      } catch(e){
        console.log(e)
      }

      //add channel to userChannels in store
      let url = '/rest/users/channels/id/' +  this.$store.state.currentUser.id
      let userChannels = await fetch(url)
      userChannels = await userChannels.json()
      this.$store.commit('displayUserChannels', userChannels)


      //post server message saying user has joined room
      const srvMsg = this.$store.state.currentUser.username + ' has just joined the channel!'

      console.log(srvMsg)

      let serverMessage = {
        message: srvMsg,
        channel_id: channel.id,
        time: Date.now()
      }

      try{
        await fetch('/rest/serverMessages', {
        method: 'POST',
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify(serverMessage)
        })
      } catch (e) {
        console.log(e)
      }
      
    }
  }
}