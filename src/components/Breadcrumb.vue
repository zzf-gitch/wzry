<template>
    <div>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :replace="true" :to="{ path: '/' }">王者荣耀</el-breadcrumb-item>
            <el-breadcrumb-item v-for="item in routers" :key="item.path" :to="{ path: item.path }">
                {{ item.meta.title }}
            </el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script setup>
import {
    ref,
    defineEmits,
    defineProps,
    nextTick,
    reactive,
    onMounted,
    watch,
    computed,
    onUnmounted,
    onBeforeUnmount,
} from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
const store = useStore();
const router = useRouter();
const route = useRoute();
// 当前路由的匹配记录
console.log(router.currentRoute.value.matched)
// 过滤到没有meta的路由
const routers = computed(() => router.currentRoute.value.matched.filter(item => item.meta.title))
</script>

<style scoped>
.el-breadcrumb {
    margin-left: 15px;
}

.el-breadcrumb__item:deep(.el-breadcrumb__inner.is-link) {
    font-weight: 700;
    text-decoration: none;
    transition: #909399 0.2s !important;
    color: #909399;
}

.el-breadcrumb__item:deep(.el-breadcrumb__inner.is-link:hover) {
    color: whitesmoke;
}
</style>