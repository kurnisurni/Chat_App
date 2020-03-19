
export default{
    template: `
        <div>
            <div>{{userName}}</div>
            <img :src="userPicture" alt="User Image" width="50" height="50">
        </div>
    `,
    data(){
        return{
            userName: this.$store.state.currentUser.username,
            userPicture: this.$store.state.currentUser.picture
        }
    },
}