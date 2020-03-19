export default{
    template:`
      <div class="messages">
        <div v-for="message in messages" :key="message.id">
          <div v-for="user in users" :key="user.id">
            <div class="messageDiv" v-if="message.user_id === user.id">
              <img class="messagePicture" :src=user.picture_url>
              <p class="messageParagraph">{{ user.username }}: {{ message.content }}, {{ message.message_time }}</p>
            </div>
          </div>          
        </div>
      </div>
    `,

    props: []
    ,

    data(){
        return{
         
        }
    },

    methods:{
       async getUser(userId){
         let url = '/rest/users/' + userId

         let user = await fetch(url)
         user = await user.json()

         this.userPic = user.picture
         this.userName = user.username
       },
    },

    computed: {
      messages(){
        return this.$store.state.messages
      },
      users(){
        return this.$store.state.users
      }
    },
    created(){
      
    }
}