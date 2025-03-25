<template>
    <div class="heroInfo">
        <!-- <div  class="videoContainer"> -->
        <img class="videoContainer" :src="videoContainerUrl" alt="">
        <!-- </div> -->

        <div class="fanhui" @click="gonext">
            <span>返回</span>
        </div>

        <div class="left_box">
            <span class="line-top"></span>
            <span class="line-right"></span>
            <span class="line-bottom"></span>
            <span class="line-left"></span>
            <div style="width:100%;height: 100%;">
                <div class="left_box_header">
                    <h1 @click="Switch">{{ listimg.name }}</h1>
                    <div class="ren">
                        <h3>{{ listimg.title }}</h3>
                        <p>{{ listimg.game }}</p>
                    </div>
                </div>
                <div class="left_box_main">
                    <div class="left_main">
                        <div class="main">
                            <p class="iconfont icon-dingwei">定位：{{ listimg.Position }}</p>
                            <p class="iconfont icon-techang">特长：{{ listimg.Specialty }}</p>
                            <p class="iconfont icon-qian">价格：{{ listimg.money }}</p>
                            <p class="iconfont icon-shengao">身高：{{ listimg.stature }}</p>
                            <p class="iconfont icon-shijian">上架时间：{{ listimg.time }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="right_box">
            <span class="line-top"></span>
            <span class="line-right"></span>
            <span class="line-bottom"></span>
            <span class="line-left"></span>
            <div class="right_box_header">
                <h1>英雄属性</h1>
            </div>
            <div class="right_box_main">
                <img :src="listimg.icon">
            </div>
            <div class="right_box_footer">
                <div class="progress">
                    <p>生存能力：</p><el-progress :percentage="listimg.viability" :color="customColors.data" :text-inside="true"
                        :stroke-width="24" />
                </div>
                <div class="progress">
                    <p>攻击伤害：</p><el-progress :percentage="listimg.Damage" :color="customColors.data" :text-inside="true"
                        :stroke-width="24" />
                </div>
                <div class="progress">
                    <p>技能效果：</p><el-progress :percentage="listimg.Skill" :color="customColors.data" :text-inside="true"
                        :stroke-width="24" />
                </div>
                <div class="progress">
                    <p>上手难度：</p><el-progress :percentage="listimg.difficulty" :color="customColors.data" :text-inside="true"
                        :stroke-width="24" />
                </div>
            </div>
        </div>

        <div class="bottom_Box">
            <template v-for="(row, i) in listimg.Header" :key="i">
                <div class="box">
                    <img @mouseenter="mouseenter(row, i)" :class="currentIndex === i ? 'bottom-box-hover' : 'bottom-box'"
                        :src="row.url" alt="">
                    <p>{{ row.name }}</p>
                </div>
            </template>
        </div>
    </div>
</template>

<script setup>
import { ElLoading } from "element-plus";
import { ref, defineEmits, defineProps, nextTick, reactive, onMounted, watch, computed, onUnmounted , provide } from 'vue'
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import { ElMessage, ElMessageBox } from "element-plus";
import { color } from 'echarts';
const store = useStore();
const router = useRouter();
const route = useRoute();
const relo = ref(false)
const gonext = () => {
    router.push({name:"英雄"})
}
// 从vuex里面取数据(modules)
const listimg = computed(() => store.state.heroinfo.heroInFo);
const videoContainerUrl = ref('')
videoContainerUrl.value = listimg.value.poster[0].url
const customColors = reactive({
    data: [
        { color: '#f56c6c', percentage: 20 },
        { color: '#e6a23c', percentage: 40 },
        { color: '#5cb87a', percentage: 60 },
        { color: '#1989fa', percentage: 80 },
        { color: '#6f7ad3', percentage: 100 },
    ]
})
const currentIndex = ref(0)
const mouseenter = (r, i) => {
    currentIndex.value = i
    for (let item of listimg.value.poster) {
        if (r.name == item.name) {
            videoContainerUrl.value = item.url
        }
    }
}
onMounted(() => {
    const loading = ElLoading.service({
        lock: true,
        text: "正在加载中，请稍后.......",
        background: "rgba(0, 0, 0, 0.7)",
    });
    setTimeout(() => {
        loading.close();
    }, 800);
})
</script>

<style  scoped>
.heroInfo {
    width: 100%;
    height: 100%;
    display: flex;
}

.videoContainer {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: -1;
    object-fit: cover;
    inset: 0;
    transition: all 0.25s ease-out;
}

/* .fullscreenVideo {
  width: 100%;
  height: 100%;
} */
.left_box {
    width: 20%;
    position: absolute;
    height: 75%;
    transform: perspective(150px) rotateX(5deg) rotateZ(-10deg) skewX(10deg);
    color: white;
    left: 10%;
    top: 5%;
    background-color: #070a09;
    opacity: 0.6;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.5s;
    cursor: pointer;
}

.left_box:hover {
    top: 10%;
    transform: perspective(300px) rotateX(0deg) rotateZ(0deg) skewX(10deg);
}

.right_box {
    width: 20%;
    height: 75%;
    color: white;
    transform: perspective(150px) rotateX(5deg) rotateZ(10deg) skewX(-10deg);
    background-color: #070a09;
    opacity: 0.6;
    position: absolute;
    right: 10%;
    top: 5%;
    transition: all 0.5s;
    cursor: pointer;
}

.right_box:hover {
    top: 10%;
    transform: perspective(300px) rotateX(0deg) rotateZ(0deg) skewX(-10deg);
}

.progress {
    display: flex;
    padding: 15px 15px 15px 30px;
}

.progress p {
    font-size: 20px;
    font-weight: 800;
}

.el-progress {
    width: 230px !important;
}

.right_box_header {
    width: 100%;
    height: 10%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
}

.right_box_main {
    width: 100%;
    height: 10%;
}

.right_box_footer {
    width: 100%;
    height: 80%;
}

.right_box_main img {
    width: 50%;
    height: 100%;
    opacity: 0.6;
    background-color: black;
}

.left_box_header {
    width: 100%;
    height: 10%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.left_box_header h1 {
    font-size: 50px;
    font-weight: 800;
    padding-left: 15px;
    padding-right: 15px;
}

.ren h3 {
    font-size: 20px;
    font-weight: 800;
}

.ren p {
    font-size: 16px;
    font-weight: 800;
}

.left_box_main {
    width: 100%;
    height: 90%;
}

.left_main {
    width: 100%;
    height: 100%;
    margin: 0 auto;
}

.main p {
    padding-top: 30px;
    font-size: 20px;
    font-weight: bold;
    padding-left: 60px;
}

.line-top {
    position: absolute;
    width: 80px;
    height: 1px;
    top: -1px;
    left: 0;
    background: linear-gradient(to right, #0e96e7, #fff);
    border-radius: 50%;
    animation: left_to_right 4s 0s linear infinite;
}

.line-top::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 11px;
    background: linear-gradient(to right, transparent, #0e96e7, #fff);
    left: 0;
    top: -5px;
    filter: blur(4px);
    z-index: -1;
}

.line-right {
    position: absolute;
    width: 1px;
    height: 0;
    top: 0;
    right: -1px;
    background: linear-gradient(#0e96e7, #fff);
    animation: top_to_bottom 4s 3s linear infinite;
}

.line-right::before {
    content: "";
    position: absolute;
    width: 11px;
    height: 100%;
    background: linear-gradient(to bottom, transparent, #0e96e7, #fff);
    left: -5px;
    top: 0;
    filter: blur(4px);
    z-index: -1;
}

.line-bottom {
    position: absolute;
    width: 0;
    height: 1px;
    bottom: -1px;
    right: 0;
    background: linear-gradient(to left, #0e96e7, #fff);
    border-radius: 50%;
    animation: right_to_left 4s 6s linear infinite;
}

.line-bottom::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 11px;
    background: linear-gradient(to left, transparent, #0e96e7, #fff);
    left: 0;
    top: -5px;
    filter: blur(4px);
    z-index: -1;
}

.line-left {
    position: absolute;
    width: 1px;
    height: 0;
    bottom: 0;
    left: -1px;
    background: linear-gradient(to top, #0e96e7, #fff);
    animation: bottom_to_top 4s 9s linear infinite;
}

.line-left::before {
    content: "";
    position: absolute;
    width: 11px;
    height: 100%;
    background: linear-gradient(to top, transparent, #0e96e7, #fff);
    left: -5px;
    top: 0;
    filter: blur(4px);
    z-index: -1;
}


@keyframes left_to_right {
    0% {
        width: 0;
        left: 0;
    }

    25% {
        left: 0;
        width: 80px;
    }

    75% {
        left: calc(100% - 80px);
        width: 80px;
    }

    100% {
        left: 100%;
        width: 0;
    }
}

@keyframes top_to_bottom {
    0% {
        top: 0;
        height: 0;
    }

    25% {
        top: 0;
        height: 80px;
    }

    75% {
        top: calc(100% - 80px);
        height: 80px;
    }

    100% {
        top: 100%;
        height: 0;
    }
}

@keyframes right_to_left {
    0% {
        right: 0;
    }

    25% {
        width: 80px;
        right: 0;
    }

    75% {
        width: 80px;
        right: calc(100% - 80px);
    }

    100% {
        right: 100%;
        width: 0;
    }
}

@keyframes bottom_to_top {
    0% {
        bottom: 0;
    }

    25% {
        bottom: 0;
        height: 80px;
    }

    75% {
        height: 80px;
        bottom: calc(100% - 80px);
    }


    100% {
        height: 0;
    }
}

.bottom_Box {
    width: auto;
    height: auto;
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    bottom: 20px;
    display: flex;
}

.box {
    width: auto;
    height: auto;
    margin: 10px;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    font-size: 14px;
}

.bottom-box {
    width: 70px;
    height: 70px;
    border: solid 4px #7a7a7a;
    border-radius: 0 12px;
    cursor: pointer;
}

.bottom-box-hover {
    width: 70px;
    height: 70px;
    border: solid 4px #7a7a7a;
    border-radius: 0 12px;
    cursor: pointer;
    border-color: #f3c258;
}

.fanhui{
    position: absolute;
    top: 50px;
    left: 50px;
    width: 45px;
    height: 45px;
    background: black;
    opacity: 0.8;
    border: 2px solid black;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    cursor: pointer;
    font-size: 14px;
}
</style>