export default{
    template: `
      <div>
        <form @submit.prevent="createNewChannel">
            <input v-model="name" type="text"
            required
            placeholder = "Enter channel name...">

            <button>Create New Channel</button>

        </form>
       <div>
    `,

     props: []
     ,

    data() {
        return {
            name: ''
        }
    },

    methods: {
        async createNewChannel(){
            if(!this.name.trim()){
                return
            }

            let newChannel = {
                name: this.name,
                admin_id: this.$store.state.currentUser.id
            }

            let channel = await fetch('/rest/channels',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newChannel)
            })

            channel = await channel.json()

            this.$store.commit('appendChannel', channel)

            this.name = ' '
        }
    }
}

