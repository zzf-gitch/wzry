# 王者荣耀后台管理系统 - 统计工具深度集成指南

## 一、初始化配置

### 1. 推荐全局初始化 (main.js)
```javascript
import Stats from '@/utils/stats'

// 生产环境配置
Stats.init({
  appId: 'wzry-admin-prod',     // 项目专属ID
  autoReport: true,             // 开启自动上报
  reportUrl: '/api/stats',      // 王者荣耀统计API
  maxLocalRecords: 200,         // 适当增大容量
  debug: import.meta.env.DEV    // 开发模式
})
```

### 2. 组件级初始化 (按需)
```javascript
import Stats from '@/utils/stats'

// 确保只初始化一次
if (!Stats.config.appId) {
  Stats.init({
    appId: 'wzry-module',
    autoReport: false,  // 开发环境关闭上报
    debug: true         // 开启调试日志
  })
}
```

## 二、完整页面示例

### 1. 英雄管理页面 (Composition API)
```vue
<template>
  <div class="hero-management">
    <h2>英雄数据管理</h2>
    
    <!-- 属性编辑 -->
    <div v-for="prop in editableProps" :key="prop">
      <label>{{ prop }}:</label>
      <input v-model="heroData[prop]" @change="trackPropertyChange(prop)">
    </div>

    <!-- 技能管理 -->
    <button @click="addSkill">新增技能</button>
    <button @click="saveAll" :disabled="isSaving">保存修改</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import Stats from '@/utils/stats'

const route = useRoute()
const heroData = ref({})
const isSaving = ref(false)

// 初始化时加载数据
onMounted(async () => {
  Stats.track('hero-page-enter', {
    path: route.path,
    heroId: route.params.id
  })
  
  try {
    const res = await api.getHero(route.params.id)
    heroData.value = res.data
  } catch (error) {
    Stats.track('hero-load-failed', {
      heroId: route.params.id,
      error: error.message
    })
  }
})

// 属性修改追踪
const trackPropertyChange = (propName) => {
  Stats.track('hero-property-edit', {
    heroId: heroData.value.id,
    property: propName,
    value: heroData.value[propName]
  })
}

// 保存数据
const saveAll = async () => {
  isSaving.value = true
  Stats.track('hero-save-start', { 
    heroId: heroData.value.id,
    changedProps: Object.keys(heroData.value.changes)
  })

  try {
    await api.updateHero(heroData.value)
    Stats.track('hero-save-success', {
      heroId: heroData.value.id
    })
  } catch (error) {
    Stats.track('hero-save-failed', {
      heroId: heroData.value.id,
      error: error.message
    })
  } finally {
    isSaving.value = false
  }
}
</script>
```

### 2. 对战数据页面 (Options API)
```vue
<template>
  <div class="battle-stats">
    <h2>对战数据分析</h2>
    
    <div class="filters">
      <select v-model="selectedHero" @change="loadBattleData">
        <option v-for="hero in heroList" :value="hero.id">{{ hero.name }}</option>
      </select>
    </div>

    <div v-if="loading" class="loading">加载中...</div>
    <BattleChart v-else :data="battleData" />
  </div>
</template>

<script>
import Stats from '@/utils/stats'

export default {
  data() {
    return {
      selectedHero: null,
      heroList: [],
      battleData: [],
      loading: false
    }
  },

  mounted() {
    Stats.track('battle-page-view', {
      path: this.$route.path
    })
    this.loadHeroList()
  },

  methods: {
    async loadHeroList() {
      try {
        const res = await api.getHeroList()
        this.heroList = res.data
        Stats.track('battle-hero-list-loaded', {
          count: this.heroList.length
        })
      } catch (error) {
        Stats.track('battle-hero-list-failed', {
          error: error.message
        })
      }
    },

    async loadBattleData() {
      this.loading = true
      Stats.track('battle-data-load', {
        heroId: this.selectedHero
      })

      try {
        const res = await api.getBattleStats(this.selectedHero)
        this.battleData = res.data
        Stats.track('battle-data-success', {
          heroId: this.selectedHero,
          recordCount: this.battleData.length
        })
      } catch (error) {
        Stats.track('battle-data-failed', {
          heroId: this.selectedHero,
          error: error.message
        })
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
```

## Vue组件集成指南

### Composition API 使用示例
```javascript
<script setup>
import { onMounted } from 'vue'
import Stats from '@/utils/stats'

// 组件挂载时记录
onMounted(() => {
  Stats.track('component-mounted', {
    name: 'MyComponent'
  })
})

// 按钮点击事件
const handleClick = () => {
  Stats.track('button-click', {
    id: 'submit-btn',
    page: location.pathname // route.path
  })
}
</script>
```

### Options API 使用示例
```javascript
<script>
import Stats from '@/utils/stats'

export default {
  mounted() {
    Stats.track('component-mounted', {
      name: 'MyComponent'
    })
  },
  methods: {
    handleClick() {
      Stats.track('button-click', {
        id: 'submit-btn',
        page: this.$route.path
      })
    }
  }
}
</script>
```

## 核心功能使用

### 1. 页面访问统计
自动记录PV/UV，无需手动调用

### 2. 性能监控
自动收集：
```javascript
// 手动添加性能标记
performance.mark('component-start')
// ...代码执行
performance.mark('component-end')
performance.measure('component-render', 'component-start', 'component-end')
```

### 3. 错误监控
自动捕获错误，也可手动记录：
```javascript
try {
  // 业务代码
} catch (err) {
  Stats.track('error', {
    message: err.message,
    stack: err.stack
  })
}
```

### 4. 自定义事件追踪
```javascript
// 用户行为追踪
Stats.track('user-action', {
  action: 'search',
  keyword: '...', // 注意脱敏
  results: 15
})

// 路由变化追踪
router.afterEach((to) => {
  Stats.track('route-change', {
    path: to.path,
    name: to.name
  })
})
```

### 5. 数据查询与分析
```javascript
// 获取今日错误统计
const today = new Date().toISOString().split('T')[0]
const errors = Stats.getStats('error').filter(
  e => e.timestamp.includes(today)
```

## 最佳实践

### 推荐追踪场景
1. 页面/组件生命周期
```javascript
onMounted(() => {
  Stats.track('component-view', {
    name: 'UserProfile',
    duration: 0 // 将在unmounted时更新
  })
})

onUnmounted(() => {
  Stats.track('component-duration', {
    name: 'UserProfile',
    duration: Date.now() - startTime
  })
})
```

2. 关键用户交互
```javascript
const handleCheckout = () => {
  Stats.track('checkout-start', {
    items: cart.value.length,
    total: cart.value.total
  })
  
  // 支付结果处理
  Stats.track('payment-result', {
    success: true,
    method: 'alipay'
  })
}
```

3. API请求监控
```javascript
axios.interceptors.response.use(
  response => {
    Stats.track('api-success', {
      url: response.config.url,
      status: response.status
    })
    return response
  },
  error => {
    Stats.track('api-error', {
      url: error.config.url,
      status: error.response?.status,
      message: error.message
    })
    return Promise.reject(error)
  }
)
```

## 注意事项

1. **数据安全**
   - 避免记录敏感信息（密码、token等）
   - 对用户ID等做匿名化处理

2. **性能优化**
   - 高频事件做节流处理
   - 批量上报减少请求次数

3. **开发建议**
   ```javascript
   // 开发环境增加debug标记
   if (import.meta.env.DEV) {
     window.__STATS_DEBUG__ = Stats
   }
   ```

完整示例参考: `src/components/StatsDemo.vue`
