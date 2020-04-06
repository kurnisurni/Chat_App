import userDetails from '../components/userDetails.js'
export default{
  components:{
    userDetails
  },
    template:`
      <div class="messages">
        <div class="messageLoop" ref="msgs">
          <div v-for="(message, i) in messages" :key="message.id">  <!-- Eventuellt en ny dynamsik key så man kan trigga en omrendering -->
            
            <div v-if="message.channel_id === currentChannel.id">
                
              <div v-for="user in users" :key="user.id">
                <div class="messageDiv" v-if="message.user_id === user.id">
                  
                  <div class="userAndPicDiv">
                    <div class="usrNPic">
                      <img class="messagePicture" :src=user.picture_url @click="goToUserDetails(user)">
                      <p class="msgUser" @click="goToUserDetails(user)">{{ user.username }}</p>
                      <p class="messageTime">{{ new Date(message.message_time).toLocaleString() }}</p>
                      <div v-if="message.user_id === currentUser.id || currentUser.id === currentChannel.adminid" class="removeMessage" @click="askIfDelete(message.id)">🗑️</div>
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
            <div v-for="serverMessage in serverMessages" :key="serverMessage.id">
              <div class="serverMessageDiv" v-if="serverMessage.channel_id === currentChannel.id && correctTime(serverMessage, i)">
                <p class="serverMessage">{{ new Date(serverMessage.time).toLocaleString() }} {{ serverMessage.message }}</p>
              </div>
            </div>
          </div>
        </div>
        
            <div v-if="showModal" class="modal-route">
              <div class="modal-content"> 
                <userDetails />
              </div>
            </div>
      </div>
    `,

    data(){
        return {
          removing: '',
          newMessagesBorder: false,
        }
    },

    methods:{

      newMessage(message){
        for (let msg of this.offlineMessages){
          if (msg.id === message.id){
            return true
          }
        }
        return false
      },

      correctTime(serverMessage, messageIndex){
        let isCorrect = false

        if (serverMessage.time > this.messages[messageIndex].message_time){
          if (messageIndex === this.messages.length - 1){
            isCorrect = true
            return isCorrect
          } 
          if (serverMessage.time < this.messages[messageIndex + 1].message_time){
          
            isCorrect = true
            return isCorrect
          }
        }
        return isCorrect
      },

      askIfDelete(messageId){
        if (this.removing !== messageId){
          this.removing = messageId
        } else this.removing = ''
        
      },
      async deleteMessage(messageId, index){
        let url = 'rest/messages/' + messageId + '/' + index
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
        this.$store.commit('setUserInModal', user)
      },
      close() {
        this.$store.commit('setUserInModal', {})
      }
    },

    computed: {
      messages(){
        return this.$store.state.messages
      },
      users(){
        return this.$store.state.users
      },
      serverMessages(){
        return this.$store.state.serverMessages
      },
      offlineMessages(){
        return this.$store.state.offlineMessages
      },
      currentChannel(){
        return this.$store.state.currentChannel
      },
      currentUser(){
        return this.$store.state.currentUser
      },
      friendList(){
      return this.$store.state.friendShips
      },
      showModal(){
        return this.$store.state.showModal
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