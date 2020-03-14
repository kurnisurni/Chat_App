import login from '../components/login.js'
import userChannels from '../components/userChannels.js'

export default{
    components:{
       login,
       userChannels
    },
    template:`
    <div>
      <login />
      <userChannels />
    </div>
    `
}