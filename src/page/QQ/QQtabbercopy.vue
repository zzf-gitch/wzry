<template>
    <div class="QQ">
        <router-view></router-view>
        <Footer></Footer>
    </div>
</template>

<script setup>
import Footer from '@/components/Footercopy.vue'
</script>

<style scoped>
    .QQ{
        width: 100%;
        height: 100%;
    }
</style>