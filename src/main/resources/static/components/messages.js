export default{
    template:`
      <div class="messages">
        <div v-for="message in messages" :key="message.id">
          <div class="hiddenGetUserMethod" style="visibility: hidden">{{ getUser(message.user_id) }}</div>
          <div class="messageDiv">
            <img class="messagePicture" :src=userPic>
            <p class="messageParagraph">{{ userName }}: {{ message.content }}, {{ message.message_time }}</p>
          </div>
        </div>
      </div>
    `,

    props: []
    ,

    data(){
        return{
          userName: '',
          userPic: ''
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
      }
    },
    created(){
      
    }
}