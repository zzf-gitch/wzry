<template>
  <div class="stats-demo">
    <h2>统计功能演示</h2>
    
    <div class="demo-section">
      <h3>1. 自定义事件追踪</h3>
      <button @click="trackButtonClick">记录按钮点击</button>
      <button @click="trackPageView">模拟页面浏览</button>
    </div>

    <div class="demo-section">
      <h3>2. 错误监控测试</h3>
      <button @click="triggerError">触发一个错误</button>
      <button @click="triggerPromiseRejection">触发Promise拒绝</button>
    </div>

    <div class="demo-section">
      <h3>3. 数据查询</h3>
      <button @click="showStats">显示统计数据</button>
      <button @click="clearStats">清除本地数据</button>
    </div>

    <div v-if="statsData" class="stats-result">
      <h3>统计结果</h3>
      <pre>{{ statsData }}</pre>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import Stats from '@/utils/stats'
import { ElMessage } from 'element-plus'

const route = useRoute()
const statsData = ref(null)

// 初始化统计
if (!Stats.config.appId) {
  Stats.init({
    appId: 'wzry-demo',
    maxLocalRecords: 50
  })
}

// 记录组件加载事件
onMounted(() => {
  Stats.track('component-mounted', {
    component: 'StatsDemo'
  })
})

const trackButtonClick = () => {
  Stats.track('button-click', {
    buttonId: 'demo-button',
    page: route.path,
    timestamp: Date.now()
  })
  ElMessage.success('按钮点击已记录')
}

const trackPageView = () => {
  Stats.track('page-view', {
    path: '/demo',
    title: '统计演示页面'
  })
  ElMessage.success('页面浏览已记录')
}

const triggerError = () => {
  try {
    // 故意触发一个错误
    const obj = null
    obj.method()
  } catch (error) {
    ElMessage.error('已触发并捕获错误')
  }
}

const triggerPromiseRejection = () => {
  Promise.reject(new Error('测试Promise拒绝'))
    .catch(() => {
      ElMessage.error('已触发Promise拒绝')
    })
}

const showStats = () => {
  const visits = Stats.getStats('visit')
  const errors = Stats.getStats('error')
  const events = Stats.getStats('event')

  statsData.value = {
    visits: visits[0] || {},
    errorCount: errors.length,
    recentEvents: events.slice(-3)
  }

  console.log('完整统计数据:', {
    visits, errors, events
  })
}

const clearStats = () => {
  Stats.clearLocalData()
  statsData.value = null
  ElMessage.success('已清除本地统计数据')
}
</script>

<style scoped>
.stats-demo {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}
.demo-section {
  margin: 20px 0;
  padding: 15px;
  border: 1px solid #eee;
  border-radius: 4px;
}
button {
  margin-right: 10px;
  padding: 8px 15px;
}
.stats-result {
  margin-top: 20px;
  padding: 15px;
  background: #f5f5f5;
  border-radius: 4px;
}
pre {
  white-space: pre-wrap;
  word-wrap: break-word;
}
</style>
