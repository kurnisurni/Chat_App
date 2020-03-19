export default{
  template: `
  <div>
    <h3>Channels:</h3>
      <ul class="channelList">
        <li v-for="channel in channels" :key="channel.id">
          {{ channel.name }}
        </li>
      </ul>   
  </div>
  `,
  computed: {
    channels(){
      return this.$store.state.userChannels
    }
  }
}