/**
 * 前端高级统计工具
 * 功能：
 * 1. 页面访问统计(PV/UV)
 * 2. 性能指标收集
 * 3. 错误监控
 * 4. 用户行为追踪
 * 5. 数据持久化(本地存储+可选上报)
 */

const Stats = {
  // 初始化配置
  config: {
    appId: 'wzry-admin',
    reportUrl: '',
    autoReport: false,
    maxLocalRecords: 100
  },

  // 存储访问者唯一ID
  _visitorId: null,

  // 初始化统计模块
  init(options = {}) {
    Object.assign(this.config, options)
    this._initVisitorId()
    this._setupPerformanceObserver()
    this._setupErrorHandler()
    this._recordVisit()
  },

  // 生成/获取访问者唯一ID
  _initVisitorId() {
    const key = `${this.config.appId}-visitor-id`
    let id = localStorage.getItem(key)
    if (!id) {
      id = 'visitor-' + Math.random().toString(36).substr(2, 9)
      localStorage.setItem(key, id)
    }
    this._visitorId = id
    return id
  },

  // 记录页面访问
  _recordVisit() {
    const today = new Date().toISOString().split('T')[0]
    const key = `${this.config.appId}-visits-${today}`
    
    let visits = JSON.parse(localStorage.getItem(key)) || {
      pv: 0,
      uv: {},
      lastVisit: new Date().toISOString()
    }

    visits.pv++
    visits.uv[this._visitorId] = true
    visits.lastVisit = new Date().toISOString()

    localStorage.setItem(key, JSON.stringify(visits))
    this._maybeReport('visit', visits)
  },

  // 性能监控
  _setupPerformanceObserver() {
    if (!window.PerformanceObserver) return

    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      entries.forEach(entry => {
        this._recordPerformance(entry)
      })
    })
    observer.observe({ entryTypes: ['measure', 'resource', 'navigation'] })
  },

  _recordPerformance(entry) {
    const data = {
      name: entry.name,
      type: entry.entryType,
      duration: entry.duration,
      startTime: entry.startTime,
      timestamp: new Date().toISOString()
    }
    this._saveToLocal('performance', data)
  },

  // 错误监控
  _setupErrorHandler() {
    window.addEventListener('error', (event) => {
      this._recordError({
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        stack: event.error?.stack,
        timestamp: new Date().toISOString()
      })
    })

    window.addEventListener('unhandledrejection', (event) => {
      this._recordError({
        message: event.reason?.message || 'Unhandled promise rejection',
        stack: event.reason?.stack,
        timestamp: new Date().toISOString()
      })
    })
  },

  _recordError(errorInfo) {
    this._saveToLocal('error', errorInfo)
  },

  // 自定义事件追踪
  track(eventName, payload = {}) {
    const data = {
      event: eventName,
      payload,
      timestamp: new Date().toISOString(),
      visitorId: this._visitorId
    }
    this._saveToLocal('event', data)
  },

  // 本地存储
  _saveToLocal(type, data) {
    const key = `${this.config.appId}-${type}-records`
    let records = JSON.parse(localStorage.getItem(key)) || []
    records.push(data)
    
    // 限制记录数量
    if (records.length > this.config.maxLocalRecords) {
      records = records.slice(-this.config.maxLocalRecords)
    }
    
    localStorage.setItem(key, JSON.stringify(records))
    this._maybeReport(type, data)
  },

  // 数据上报
  _maybeReport(type, data) {
    if (this.config.autoReport && this.config.reportUrl) {
      this._reportData(type, data)
    }
  },

  _reportData(type, data) {
    if (!navigator.onLine) {
      // 离线时暂存数据
      this._queueOfflineData(type, data)
      return
    }

    fetch(this.config.reportUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, data, appId: this.config.appId })
    }).catch(() => {
      this._queueOfflineData(type, data)
    })
  },

  _queueOfflineData(type, data) {
    const key = `${this.config.appId}-offline-queue`
    let queue = JSON.parse(localStorage.getItem(key)) || []
    queue.push({ type, data, timestamp: new Date().toISOString() })
    localStorage.setItem(key, JSON.stringify(queue))
  },

  // 获取统计数据
  getStats(type, date = new Date().toISOString().split('T')[0]) {
    const key = `${this.config.appId}-${type}-records`
    return JSON.parse(localStorage.getItem(key)) || []
  },

  // 清除本地数据
  clearLocalData() {
    const prefix = `${this.config.appId}-`
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith(prefix)) {
        localStorage.removeItem(key)
      }
    })
  }
}

export default Stats
