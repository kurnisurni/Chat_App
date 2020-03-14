export default {
  template: `
  <div>
    <h3>Channels</h3>
    <ul class="channelList">
      <li v-for="channel in channels" :key="channel.id">
        <router-link :to="channel.name">{{ channel.name }}</router-link>
      </li>
    </ul>   
  </div>
  `,
  computed: {
    channels(){
      return this.$store.state.channels
    }
  },
  methods: {
    async getChannels(){
      let channels = await fetch('/rest/channels')

      channels = await channels.json()

      this.$store.commit('displayChannels', channels)
    }
  },
  created() {
    this.getChannels()
  }
}