<template>
    <div class="open">
        <div class="main_left">
            <div class="main_left_main">
                <div class="main_video">
                    <div class="video_main">
                        <!-- <div class="video" v-if="suffix == 'mp4'"> -->

                        <!-- <video autoplay loop class="fullvideo" controls="controls" type="video/mp4"
                src="./video/视频.mp4"></video> -->
                        <!-- </div> -->
                        <!-- <div class="pdf">
                            <template v-for="item in state.pageNum" :key="item" class="pdf-page">
                                <canvas :id="`pdf-canvas-${item}`"></canvas>
                            </template>
                        </div> -->



                        <div class="my-component" ref="previews">
                            <input type="file" @change="preview" ref="file">
                        </div>
                    </div>
                </div>
            </div>
        </div>
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
    watchEffect
} from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();
const store = useStore();
const docx = require('docx-preview');
window.JSZip = require('jszip')
const previews = ref(null)
const file = ref(null)
const preview = (e) => {
    console.log(file.value.files[0]);
    console.dir(previews.value);
    docx.renderAsync(file.value.files[0], previews.value) // 渲染到页面预览
}
// const PDF = require("pdfjs-dist");
// PDF.GlobalWorkerOptions.workerSrc = "./pdf_viewer.js.map";
const state = reactive({
    url: "",  // pdf的地址
    pageNum: 0, // pdf的总页数
    pdfCtx: null, // pdf对象
});

const url = ref('')
// url.value=require('test.pdf')
// watchEffect(() => {
//   if (url.value) {
//     const baseUrl = 'http://localhost:8081' + url.value
//     state.url = baseUrl;
//     nextTick(() => {
//       resolvePdf(state.url);
//     });
//   }
// });
// const resolvePdf = (url) => {
//   const loadingTask = PDF.getDocument(url);
//   loadingTask.promise.then((pdf) => {
//     state.pdfCtx = pdf;
//     state.pageNum = pdf.numPages;
//     nextTick(() => {
//       renderPdf();
//     });
//   });
// };
// const renderPdf = (num = 1) => {
//   state.pdfCtx.getPage(num).then((page) => {
//     // 获取元素
//     const canvas = document.getElementById(`pdf-canvas-${num}`);
//     const ctx = canvas.getContext("2d");
//     // 设置缩放值
//     const viewport = page.getViewport(state.scale);
//     canvas.height = viewport.height;
//     canvas.width = viewport.width;
//     page.render({
//       canvasContext: ctx,
//       viewport: viewport,
//     });
//     if (num < state.pageNum) {
//       setTimeout(() => {
//         renderPdf(num + 1);
//       }, 100);
//     }
//   });
// };
onMounted(() => {

})
</script>

<style scoped lang="scss">
.open {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    margin-left: 100px;

    .main_left {
        width: 60%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;

        .main_left_main {
            width: 100%;
            height: 90%;
            border: 1px solid #dadada;
            display: flex;
            align-items: center;
            justify-content: center;

            .main_video {
                width: 98%;
                height: 95%;

                .video_main {
                    width: 100%;
                    height: 100%;

                    .pdf {
                        width: 100%;
                        height: 100%;
                        overflow: hidden;
                        overflow-y: scroll;

                        canvas {
                            display: block;
                            margin-top: 20px;
                            margin-left: 12%;
                        }
                    }

                    .video {
                        width: 100%;
                        height: 100%;

                        .fullvideo {
                            width: 100%;
                            height: 100%;
                            object-fit: cover;
                        }
                    }
                }

                .my-component {
                    width: 100%;
                    height: 100%;
                    overflow: hidden;
                    overflow-y: scroll;
                }
            }
        }
    }

}
</style>