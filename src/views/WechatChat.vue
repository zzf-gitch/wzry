&lt;template&gt;
  &lt;div class=&quot;wechat-page&quot;&gt;
    &lt;div class=&quot;chat-header&quot;&gt;
      &lt;div class=&quot;back&quot; @click=&quot;goBack&quot;&gt;
        &lt;i class=&quot;el-icon-arrow-left&quot;&gt;&lt;/i&gt;
      &lt;/div&gt;
      &lt;div class=&quot;title&quot;&gt;{{ chatInfo.name || &#39;聊天&#39; }}&lt;/div&gt;
    &lt;/div&gt;

    &lt;div class=&quot;chat-body&quot; ref=&quot;chatBody&quot;&gt;
      &lt;div v-for=&quot;(msg, index) in messages&quot; 
           :key=&quot;index&quot; 
           :class=&quot;[&#39;message-item&#39;, msg.type === &#39;send&#39; ? &#39;message-send&#39; : &#39;message-receive&#39;]&quot;&gt;
        &lt;div class=&quot;avatar&quot;&gt;
          &lt;img :src=&quot;msg.type === &#39;send&#39; ? userInfo.avatar : chatInfo.avatar&quot; alt=&quot;avatar&quot;&gt;
        &lt;/div&gt;
        &lt;div class=&quot;message-content&quot;&gt;
          &lt;p class=&quot;text&quot;&gt;{{ msg.content }}&lt;/p&gt;
          &lt;span class=&quot;time&quot;&gt;{{ msg.time }}&lt;/span&gt;
        &lt;/div&gt;
      &lt;/div&gt;
    &lt;/div&gt; &lt;div class=&quot;chat-container&quot;&gt;
    &lt;div class=&quot;chat-header&quot;&gt;
      &lt;span class=&quot;title&quot;&gt;微信聊天&lt;/span&gt;
    &lt;/div&gt;
    
    &lt;div class=&quot;chat-messages&quot; ref=&quot;messageContainer&quot;&gt;
      &lt;div v-for=&quot;(msg, index) in messages&quot; 
           :key=&quot;index&quot; 
           :class=&quot;[&#39;message&#39;, msg.type === &#39;sent&#39; ? &#39;message-sent&#39; : &#39;message-received&#39;]&quot;&gt;
        &lt;div class=&quot;avatar&quot;&gt;
          &lt;img :src=&quot;msg.type === &#39;sent&#39; ? &#39;/images/avatar-me.png&#39; : &#39;/images/avatar-other.png&#39;&quot; alt=&quot;avatar&quot;&gt;
        &lt;/div&gt;
        &lt;div class=&quot;message-content&quot;&gt;
          &lt;p&gt;{{ msg.content }}&lt;/p&gt;
          &lt;span class=&quot;time&quot;&gt;{{ msg.time }}&lt;/span&gt;
        &lt;/div&gt;
      &lt;/div&gt;
    &lt;/div&gt;

        &lt;div class=&quot;chat-footer&quot;&gt;
      &lt;div class=&quot;input-area&quot;&gt;
        &lt;el-input 
          v-model=&quot;inputText&quot;
          type=&quot;textarea&quot;
          :rows=&quot;1&quot;
          resize=&quot;none&quot;
          placeholder=&quot;输入消息...&quot;
          @keyup.enter.native=&quot;sendMessage&quot;
        &gt;&lt;/el-input&gt;
      &lt;/div&gt;
      &lt;div class=&quot;action-area&quot;&gt;
        &lt;el-button type=&quot;primary&quot; @click=&quot;sendMessage&quot; :disabled=&quot;!inputText.trim()&quot;&gt;发送&lt;/el-button&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script setup&gt;
import { ref, onMounted, nextTick } from &#39;vue&#39;
import { useRouter } from &#39;vue-router&#39;

const router = useRouter()
const chatBody = ref(null)
const inputText = ref(&#39;&#39;)

// 模拟用户信息
const userInfo = ref({
  id: &#39;user_001&#39;,
  name: &#39;我&#39;,
  avatar: &#39;https://img0.baidu.com/it/u=2503706842,2049036741&amp;fm=253&amp;fmt=auto&amp;app=138&amp;f=JPEG?w=500&amp;h=500&#39;
})

// 模拟聊天对象信息
const chatInfo = ref({
  id: &#39;friend_001&#39;,
  name: &#39;张三&#39;,
  avatar: &#39;https://img1.baidu.com/it/u=1817951587,521818333&amp;fm=253&amp;fmt=auto&amp;app=138&amp;f=JPEG?w=500&amp;h=500&#39;
})

// 聊天记录
const messages = ref([
  {
    type: &#39;receive&#39;,
    content: &#39;你好！&#39;,
    time: formatTime(new Date()),
    avatar: chatInfo.value.avatar
  }
])

// 自动回复内容
const autoReplies = [
  &#39;收到！&#39;,
  &#39;好的，知道了&#39;,
  &#39;稍等，我看看&#39;,
  &#39;明白了，没问题&#39;,
  &#39;这个建议不错&#39;,
  &#39;需要我帮你什么吗？&#39;
]

// 发送消息
function sendMessage(e) {
  if(e.type === &#39;keyup&#39; &amp;&amp; (e.shiftKey || e.ctrlKey)) return
  
  if(!inputText.value.trim()) return
  
  // 添加发送的消息
  messages.value.push({
    type: &#39;send&#39;,
    content: inputText.value,
    time: formatTime(new Date()),
    avatar: userInfo.value.avatar
  })
  
  inputText.value = &#39;&#39;
  
  // 自动回复
  setTimeout(() => {
    const randomReply = autoReplies[Math.floor(Math.random() * autoReplies.length)]
    messages.value.push({
      type: &#39;receive&#39;,
      content: randomReply,
      time: formatTime(new Date()),
      avatar: chatInfo.value.avatar
    })
    scrollToBottom()
  }, 1000)
  
  scrollToBottom()
}

// 格式化时间
function formatTime(date) {
  const hours = String(date.getHours()).padStart(2, &#39;0&#39;)
  const minutes = String(date.getMinutes()).padStart(2, &#39;0&#39;)
  return `${hours}:${minutes}`
}

// 滚动到底部
function scrollToBottom() {
  nextTick(() => {
    if (chatBody.value) {
      chatBody.value.scrollTop = chatBody.value.scrollHeight
    }
  })
}

// 返回上一页
function goBack() {
  router.go(-1)
}

onMounted(() => {
  scrollToBottom()
})
&lt;/script&gt;

&lt;style scoped lang=&quot;scss&quot;&gt;
.wechat-page {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f7f7f7;

  .chat-header {
    height: 50px;
    background: #42b983;
    color: #fff;
    display: flex;
    align-items: center;
    padding: 0 15px;
    position: relative;
    
    .back {
      font-size: 20px;
      cursor: pointer;
      
      &amp;:hover {
        opacity: 0.8;
      }
    }
    
    .title {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      font-size: 16px;
      font-weight: 500;
    }
  }

  .chat-body {
    flex: 1;
    overflow-y: auto;
    padding: 15px;

    .message-item {
      display: flex;
      margin-bottom: 15px;
      
      .avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        overflow: hidden;
        flex-shrink: 0;
        
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      
      .message-content {
        margin: 0 10px;
        max-width: 60%;
        
        .text {
          padding: 10px 15px;
          background: #fff;
          border-radius: 4px;
          position: relative;
          margin: 0;
          word-break: break-all;
        }
        
        .time {
          font-size: 12px;
          color: #999;
          margin-top: 5px;
          display: block;
        }
      }
      
      &amp;.message-send {
        flex-direction: row-reverse;
        
        .message-content {
          .text {
            background: #42b983;
            color: #fff;
          }
          
          .time {
            text-align: right;
          }
        }
      }
    }
  }

  .chat-footer {
    border-top: 1px solid #eee;
    padding: 10px 15px;
    background: #fff;
    display: flex;
    align-items: flex-end;
    
    .input-area {
      flex: 1;
      margin-right: 10px;
      
      .el-textarea__inner {
        resize: none;
        padding: 8px;
        min-height: 20px;
        max-height: 100px;
      }
    }
    
    .action-area {
      .el-button {
        height: 36px;
      }
    }
  }
}
&lt;/style&gt;
