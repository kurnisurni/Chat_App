export default{
    template:`
      <div class="messages">
        <div v-for="message in messages" :key="message.id">
          <div v-if="message.channel_id === currentChannel">
            <div v-for="user in users" :key="user.id">
              <div class="messageDiv" v-if="message.user_id === user.id">
                <img class="messagePicture" :src=user.picture_url>
                <p class="messageParagraph">{{ user.username }}: {{ message.content }}, {{ message.message_time }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `,

    props: []
    ,

    data(){
        return {
          
        }
    },

    methods:{
      
    },

    computed: {
      messages(){
        return this.$store.state.messages
      },
      users(){
        return this.$store.state.users
      },
      currentChannel(){
        return this.$store.state.currentChannel
      }
    },
    created(){
      
    }
}