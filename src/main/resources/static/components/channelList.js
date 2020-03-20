export default{
  template: `
  <div>
    <h3>Your Channels:</h3>
    <div class="channelList" v-for="channel in userChannels" :key="channel.id">
      <h4 class="channelNameInList" @click="goToChannel(channel.id)">
        {{ channel.name }}
      </h4>
    </div>
    <div v-if="otherChannels()">
      <h3>All Channels:</h3>
      <div class="channelList" v-for="channel in allChannels" :key="channel.id">
        <h4 class="channelNameInList" @click="goToChannel(channel.id)" v-if="isChannelJoined(channel.id)">
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
    }
  },
  methods: {
    goToChannel(channelId){
      this.$store.commit('setCurrentChannel', channelId)
    },
    otherChannels(){
      for (let channel of this.allChannels){
        console.log(channel)
        if (!this.userChannels.includes(channel)){
          return true
        }
      }
      return false
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
    }
  }
}