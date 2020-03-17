
export default{
    template:`
      <div>
        <div v-for="message in messages" :key="message.id">
        {{ message.userName }}
        {{ message.userPic }} {{ message.content }}
          <hr>
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

         this.userPic = user.picture_url
         this.userName = user.username
       }
    },

    computed: {
      messages(){
        return this.$store.state.messages
      }
    },
    created(){
      getUser(1)
    }
}