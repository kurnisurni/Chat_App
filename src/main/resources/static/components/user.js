
export default{
    template: `
        <div>
            <div>{{user.username}}</div>
            <!-- Move width and height till css -->
            <img :src="user.picture" alt="User Image" width="50" height="50">
        </div>
    `,
    data(){
        return{
            userName: this.$store.state.currentUser.username,
            userPicture: this.$store.state.currentUser.picture
        }
    },
    computed: {
        user(){
            return this.$store.state.currentUser
        }
    },
    methods:{
        logOut(){
          
        }
    }
}