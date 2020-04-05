export default {
  template: `
      <div class="messages">
        <div class="messageLoop" ref="msgs">
          <div v-for="(message, i) in messages" :key="message.id">  <!-- Eventuellt en ny dynamsik key så man kan trigga en omrendering -->
            
            <div v-if="message.private_chat_id === currentChannel.id">
                
              <div v-for="user in users" :key="user.id">
                <div class="messageDiv" v-if="message.user_id === user.id">
                  
                  <div class="userAndPicDiv">
                    <div class="usrNPic">
                      <img class="messagePicture" :src=user.picture_url @click="goToUserDetails(user)">
                      <p class="msgUser" @click="goToUserDetails(user)">{{ user.username }}</p>
                      <p class="messageTime">{{ new Date(message.message_time).toLocaleString() }}</p>
                      <div v-if="message.user_id === currentUser.id" class="removeMessage" @click="askIfDelete(message.id)">🗑️</div>
                      <button v-if="removing === message.id" class="deleteMsgButton" @click="deleteMessage(message.id, i)">Delete message</button>
                      
                      <!-- <p class="newMessageAlert" v-if="newMessage(message)">------ NEW MESSAGE ------</p> -->
                    </div>
                    <div class="messageParagraph">
                      <p class="msgP">{{ message.content }}<br>
                        <img class="messageImage" v-if="message.image_url" :src="message.image_url" width="100px" height="100px"/>
                      </p>                 
                    </div> 

                  </div>

                </div>
              </div>

            </div>
          </div>
        </div>
        
        <div v-if="showModal" class="modal-route">
          <div class="modal-content"> 
            <userDetails :user="clickedUser"/>
          </div>
        </div>
      </div>
    `,

    data(){
        return {
          removing: '',
          newMessagesBorder: false,
          clickedUser: null,
          showModal: false
        }
    },
    computed: {
      messages(){
        return this.$store.state.privateMessages
      },
      users(){
        return this.$store.state.users
      },
      currentChannel(){
        return this.$store.state.currentChannel
      },
      currentUser(){
        return this.$store.state.currentUser
      }

    },

    methods:{
      askIfDelete(messageId){
        if (this.removing !== messageId){
          this.removing = messageId
        } else this.removing = ''
        
      },
      async deleteMessage(messageId, index){
        let url = '/rest/privateMessages/' + messageId + '/' + index
        try {
          await fetch(url, {
            method: 'DELETE'
          })
        } catch(e){
          console.log(e)
        }
      },
      goToUserDetails(user){
        if(user.id === this.currentUser.id) return
        this.clickedUser = user
         this.showModal = true
       },
      close() {
         this.showModal = false;
       }
    },
    updated(){
      let messageContainer = this.$refs.msgs
      messageContainer.scrollTop = messageContainer.scrollHeight
    },
    mounted(){
      let messageContainer = this.$refs.msgs
      messageContainer.scrollTop = messageContainer.scrollHeight
    }
  
}