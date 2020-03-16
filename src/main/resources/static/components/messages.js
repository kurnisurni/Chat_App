
export default{
    template:`
      <div>
        <div v-for="message in messages" :key="message.id">
        {{ getUser(message.user_id) }}
          <hr>
          <img class="messagePicture" :src=userPic> {{ userName }}: {{ message.content }}
          <hr>
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
      },
    },
    created(){
      
    }
}