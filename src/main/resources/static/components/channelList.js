export default{
  template: `
  <div>
    <h3>Channels:</h3>
    <div class="channelList" v-for="channel in channels" :key="channel.id">
      <h4 class="channelNameInList" @click="goToChannel(channel.id)">
        {{ channel.name }}
      </h4>
    </div>   
  </div>
  `,
  computed: {
    channels(){
      return this.$store.state.userChannels
    }
  },
  methods: {
    goToChannel(channelId){
      this.$store.commit('setCurrentChannel', channelId)
    }
  }
}