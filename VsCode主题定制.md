#  Vscode主题定制

![输入图片说明](%E5%8F%91%E5%85%89%E4%BB%A3%E7%A0%81.png)

![输入图片说明](%E5%8F%91%E5%85%89%E4%BB%A3%E7%A0%811.png)

![输入图片说明](%E5%8F%91%E5%85%89%E4%BB%A3%E7%A0%812.png)

## SynthWave '84

> 代码荧光主题
>
> 以管理员身份运行`Vscode`
>
> 安装扩展 > `Ctrl + Shift + P` > 搜索`84` > 鼠标点击`synthwave84.enableNeon` > 右下角弹窗 > 点击`Reset`按钮重启`Vscode` > 重启完成 > Ctrl + Shift +P > 搜索`打开设置(json)` > 将`"synthwave84.brightness"`值修改为`1`，如果没有则添加 > 重启`Vscode`，如果荧光不明显则再重启一次

##  vscode-live2d

右下角看板娘

以管理员身份运行`Vscode`

安装扩展 > `Ctrl + Shift + P` > 搜索`打开设置(json)` > 删除带有`vscode-live2d`前缀的内容 > 将下列参数粘贴进去 > 重启`Vscode`



```javascript
"vscode-live2d.model": "Pio",
"vscode-live2d.modelHeight": 500,
"vscode-live2d.English": true,
"vscode-live2d.opacity": 0.5,
"vscode-live2d.pointerPenetration": true,
"vscode-live2d.talk": false,
"vscode-live2d.moveY": -150,
"vscode-live2d.moveX": -75,
```

如果看板娘没有出现 > 打开路径（`Vscode`安装在哪个盘？`C or D`） `C:\Program Files (x86)\Microsoft VS Code\resources\app\out\vs\code\electron-browser\workbench` > 编辑`workbench.html` > 将`head`标签内容更改如下 > 重启`Vscode`

```html
<head>
  <meta charset="utf-8" />
  <meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src 'self' https: data: blob: vscode-remote-resource:; media-src 'none'; frame-src 'self' vscode-webview: https://*.vscode-webview-test.com; object-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; connect-src 'self' https:; font-src 'self' https: vscode-remote-resource:;"/>
</head>
```

##  indent-rainbow

彩色缩进

安装扩展 > `Ctrl + Shift + P` > 搜索`打开设置(json)` > 删除带有`indentRainbow`前缀的内容 > 将下列参数粘贴进去 > 重启`Vscode`

```css
"indentRainbow.colors": [
  "rgba(255, 0, 0, 0.15)",
  "rgba(255, 115, 0, 0.15)",
  "rgba(229, 255, 0, 0.15)",
  "rgba(0, 255, 21, 0.15)",
  "rgba(0, 255, 242, 0.15)",
  "rgba(0, 110, 255, 0.15)",
  "rgba(38, 0, 255, 0.15)",
  "rgba(183, 0, 255, 0.15)",
  "rgba(255, 0, 170, 0.15)"
],
```

##  Power Mode

代码粒子效果

安装扩展 > `Ctrl + Shift + P` > 搜索`打开设置(json)` > 删除带有`powermode`前缀的内容 > 将下列参数粘贴进去 > 重启`Vscode`

```javascript
"powermode.enabled": true,
"powermode.comboThreshold": 1,
"powermode.explosionDuration": 1500,
"powermode.explosionSize": 20,
"powermode.shakeIntensity": 0,
```

##  Bracket Pair Colorizer

带颜色的`{}`，点击括号会有线条首尾相连，区分代码块

##  vscode-icons

文件及文件夹图标



##  Typora主题

下载上面的`灰.css`或`紫.css` > 打开`Typora` > 点击文件 > 偏好设置 > 外观 > 打开主题文件夹 > 将`css文件`粘贴到此文件夹 > 重启`Typora` > 点击主题 > 选择`zzf`

**灰.css**

```css
:root {
  --fontColor: #ccc; /* 字体颜色 */
  --bgColor: #111; /* 主背景 */
  --sidebarbgColor: #111; /* 侧边栏背景 */
  --bgsmallColor: #141414; /* 代码背景 */
  --themeColor: #222; /* 主题色 */
  --tipsBgColor: #111; /* 标签背景色 */
}

* {
  text-shadow: 0px -2px 3px, 0px 2px 3px #000 !important;
}

html {
  font-size: 16px;
}

html,
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica, 'PingFang SC', 'Microsoft YaHei',
    sans-serif;
  text-align: justify;
  overflow-x: hidden;
  color: var(--fontColor);
  background-color: var(--bgColor);
  -webkit-font-smoothing: antialiased;
}

content #write {
  background-color: var(--bgColor);
  max-width: 90%;
  margin: 0 auto;
  padding-bottom: 7.5rem;
}

content #write p {
  word-spacing: 0.05rem;
}

content #write ol li {
  padding-left: 0.5rem;
}

content #write > h1:first-child {
  font-weight: normal;
}

content #write > h5.md-focus:before {
  top: 2px;
}

::-moz-selection {
  background-color: #67769660;
}

::selection {
  background-color: #67769660;
}

/* h1-h3 */
#write h1,
#write h2,
#write h3,
#write h4,
#write h5,
#write h6 {
  font-style: normal;
}

#write h1,
#write h2 {
  text-align: center;
  margin-top: 2rem;
  margin-bottom: 1rem;
}

#write h1 {
  font-size: 3rem;
}

#write h2 {
  text-align: left;
  font-size: 2.4rem;
}

#write h1:after {
  content: '';
  display: block;
  width: 6.25rem;
  height: 1px;
  margin: 0 auto;
  border-bottom: 1px solid;
}

#write h3 {
  font-size: 1.8rem;
}

/* paragraph */
p {
  margin-top: 0;
  margin-bottom: 0.5rem;
}

/* ul ol */
ul,
ol {
  padding-left: 1.75rem;
}

ul:first-child,
ol:first-child {
  margin-top: 0;
}

ul:last-child,
ol:last-child {
  margin-bottom: 0;
}

/* blockquote */
blockquote {
  font-size: 18px;
  padding: 0.5rem 1rem;
  border-left: 8px solid var(--themeColor);
  background-color: var(--tipsBgColor);
  box-shadow: 0 1px 3px 0px #00000073;
  border-radius: 4px;
}

/* horizontal line */
hr {
  margin-top: 2rem;
  margin-bottom: 2rem;
  border-top: 2px dashed #abb2bf;
}

/* table */
table {
  width: auto !important;
  font-size: 18px;
}

.md-table-fig .md-table {
  border: 2px solid var(--themeColor);
  box-shadow: 0 0 5px 0px var(--themeColor) inset;
  border-radius: 6px;
  border-collapse: separate;
  overflow: hidden;
}

.md-table-fig .md-table th,
.md-table-fig .md-table td {
  min-width: 180px;
  padding: 10px 16px;
  border-top: 2px solid var(--themeColor);
  border-left: 2px solid var(--themeColor);
  box-shadow: 0 0 3px 0 var(--themeColor) inset;
}

.md-table-fig .md-table th:first-child,
.md-table-fig .md-table td:first-child {
  border-left: 0;
}

.md-table-fig .md-table thead {
  background-color: var(--themeColor);
  color: var(--fontColor) fff96;
}

.md-table-fig .md-table caption + thead tr:first-child th,
.md-table-fig .md-table caption + thead tr:first-child td,
.md-table-fig .md-table colgroup + thead tr:first-child th,
.md-table-fig .md-table colgroup + thead tr:first-child td,
.md-table-fig .md-table thead + tbody tr:first-child th,
.md-table-fig .md-table thead + tbody tr:first-child td,
.md-table-fig .md-table thead:first-child tr:first-child th,
.md-table-fig .md-table thead:first-child tr:first-child td {
  border-top: 0;
}

tr {
  box-shadow: 0 0 10px 0px var(--themeColor);
}

.md-table-fig .md-table tbody + tbody {
  border-top: 2px solid var(--themeColor);
}

.md-table-fig .md-table-edit {
  background-color: var(--bgsmallColor);
}

.md-table-fig .md-table-edit .btn-default:hover {
  background-color: #3e4249;
}

.md-table-fig .md-table-edit .md-table-resize-popover {
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  border: none;
  padding: 0;
  background-color: transparent;
}

.md-table-fig .md-table-edit .md-table-resize-popover .arrow {
  top: -10px;
}

.md-table-fig .md-table-edit .md-table-resize-popover .arrow::after {
  border-bottom-color: var(--bgsmallColor);
}

.md-table-fig .md-table-edit .md-table-resize-popover .md-reset {
  border-radius: 6px;
  background-color: var(--bgsmallColor);
}

.md-table-fig .md-table-edit .md-table-resize-popover .md-reset input {
  color: var(--fontColor) !important;
}

.md-table-fig .md-table-edit .md-table-resize-popover .md-reset input#md-grid-width,
.md-table-fig .md-table-edit .md-table-resize-popover .md-reset input#md-grid-height {
  text-align: center;
}

.md-table-fig .md-table-edit .md-table-resize-popover .popover-title {
  border-top: 1px solid rgba(171, 192, 208, 0.1);
}

#table-insert-dialog .modal-content {
  background-color: var(--bgsmallColor);
  border: none;
  border-radius: 6px;
}

#table-insert-dialog .modal-content .btn-default:hover {
  background-color: #3e4249;
}

/* yaml front matter */
#write pre.md-meta-block {
  background: var(--bgsmallColor);
  color: #86a5c3;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  border: 0;
  font-size: 18px !important;
  border-radius: 6px;
  line-height: 1.3rem;
  padding: 0.5rem 1.5rem;
  margin-top: -1rem;
  margin-bottom: 2rem;
}

/* table of contents */
.md-toc {
  margin-bottom: 1.25rem;
}

/* task list */
.md-task-list-item > input::before {
  content: '';
  position: absolute;
  top: -5px;
  left: -4px;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  border: 1px solid var(--fontColor);
  background: var(--bgsmallColor);
  transition: background-color 200ms ease-in-out;
}

.md-task-list-item > input::after {
  content: '';
  position: absolute;
  top: 2px;
  left: 1px;
  width: 0.6rem;
  height: 0.3rem;
  border: 2px solid var(--fontColor);
  border-top: 0;
  border-right: 0;
  transform: rotate(-45deg);
  opacity: 0;
  transition: opacity 200ms ease-in-out;
}

.md-task-list-item > input:checked::before {
  background-color: #67c23a;
  border: none;
}

.md-task-list-item > input:checked::after {
  opacity: 1;
}

.md-task-list-item.task-list-done {
  text-decoration: line-through;
  color: #999;
}

/* footnote */
.footnotes {
  font-size: 1rem;
}

/* math,html block common */
.mathjax-block,
.md-htmlblock {
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  border-radius: 6px;
  background-color: var(--bgsmallColor);
}

.mathjax-block[contenteditable='false']:active,
.mathjax-block[contenteditable='false']:focus,
.md-htmlblock[contenteditable='false']:active,
.md-htmlblock[contenteditable='false']:focus {
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
}

.mathjax-block:hover .md-rawblock-container,
.mathjax-block:hover .md-rawblock-tooltip,
.md-htmlblock:hover .md-rawblock-container,
.md-htmlblock:hover .md-rawblock-tooltip {
  background-color: var(--bgsmallColor);
  -webkit-animation: showRawBlockTooltip 0s linear;
  animation: showRawBlockTooltip 0s linear;
}

.mathjax-block:hover .md-rawblock-container,
.md-htmlblock:hover .md-rawblock-container {
  border-radius: 6px 0 6px 6px;
}

.mathjax-block .md-rawblock-control,
.md-htmlblock .md-rawblock-control {
  background-color: var(--bgsmallColor);
}

.mathjax-block .md-rawblock-tooltip,
.md-htmlblock .md-rawblock-tooltip {
  background-color: var(--bgsmallColor);
  -webkit-animation: showRawBlockTooltip 0s linear;
  animation: showRawBlockTooltip 0s linear;
  border-radius: 4px 4px 0 0;
}

.mathjax-block .md-mathblock-panel .code-tooltip[contenteditable='false'] {
  box-shadow: none;
}

.mathjax-block .md-mathblock-panel .md-rawblock-before {
  padding-top: 6px;
  border-top-left-radius: 6px;
}

.mathjax-block .md-mathblock-panel .md-rawblock-after {
  padding-bottom: 6px;
}

.mathjax-block .md-mathblock-panel .md-rawblock-input .cm-s-inner .CodeMirror-lines {
  color: #abb2bf;
}

.mathjax-block .md-mathblock-panel .md-rawblock-input .cm-s-inner .CodeMirror-gutters {
  background-color: var(--bgsmallColor);
}

.mathjax-block .md-math-container {
  padding-top: 10px;
  padding-bottom: 10px;
}

.md-htmlblock .md-htmlblock-panel {
  border-radius: 6px;
  border-top-right-radius: 0;
  padding-left: 6px;
  padding-right: 6px;
}

.md-htmlblock .md-htmlblock-panel .md-rawblock-input {
  padding-top: 14px;
  padding-bottom: 10px;
}

.md-htmlblock-container {
  background-color: var(--bgColor);
  box-shadow: none;
}

.on-focus-mode .md-end-block:not(.md-focus):not(.md-focus-container) * {
  color: #585a5b !important;
}

.on-focus-mode .md-end-block:not(.md-focus):not(.md-focus-container) img {
  opacity: 50%;
}

.on-focus-mode .task-list-item:not(.md-focus-container) > input {
  opacity: 50%;
}

.on-focus-mode .md-fences.md-focus .CodeMirror-code > *:not(.CodeMirror-activeline) *,
.on-focus-mode .CodeMirror.cm-s-inner:not(.CodeMirror-focused) * {
  color: #585a5b !important;
}

.on-focus-mode li[cid]:not(.md-focus-container) {
  color: #585a5b !important;
}

.on-focus-mode #typora-source .CodeMirror-code > *:not(.CodeMirror-activeline) * {
  color: #585a5b !important;
}

.on-focus-mode .md-focus,
.on-focus-mode .md-focus-container {
  color: var(--fontColor);
}

/* strong */
strong {
  font-size: 1.5rem;
  color: var(--fontColor);
  margin: 0 5px;
  background-color: inherit;
}

/* emphasis */
em {
  color: rgb(108, 117, 125);
  background-color: inherit;
}

/* underline */
u {
  background-color: inherit;
  color: inherit;
  text-decoration: none;
  border-bottom: 2px solid;
  padding-bottom: 1px;
}

/* code */
h1 code,
h2 code,
h3 code,
h4 code,
h5 code,
h6 code {
  font-size: inherit;
}

code {
  color: #00ce84;
  font-family: 'Fira Code', Consolas, 'Lucida Console', 'Courier', monospace, 'Helvetica Neue', Helvetica, Arial,
    sans-serif;
  font-size: 1.1rem;
  font-weight: 500;
  margin: 0 2px;
  padding: 2px 5px;
  border-radius: 4px;
}

/* strike */
del {
  color: #999;
  text-decoration: line-through;
}

/* hightlight */
mark {
  color: #00ce84;
  font-weight: 500;
  padding: 1px 5px 2px;
  border-radius: 2px;
  background-color: transparent;
}

/* hyperlink */
a {
  background-color: inherit;
  color: #2484c1;
  font-weight: 600;
}

a:hover {
  text-decoration: underline;
}

a img {
  border: none;
}

p > .md-image:only-child:not(.md-img-error) img,
p > img:only-child {
  margin: 0;
}

/* code fences */
.md-fences {
  font-family: 'Fira Code', Consolas, 'Lucida Console', 'Courier', monospace, 'Helvetica Neue', Helvetica, Arial,
    sans-serif;
  background-color: var(--bgsmallColor);
  padding-top: 6px;
  padding-bottom: 6px;
  padding-left: 10px;
  padding-right: 10px;
  box-shadow: 0 0px 5px 0px rgba(0, 0, 0, 0.5) inset;
  margin-bottom: 2.5rem;
  border: none;
  border-radius: 6px;
}

.md-fences[contenteditable='false']:active,
.md-fences[contenteditable='false']:focus {
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
}

.md-fences .code-tooltip {
  background-color: var(--bgsmallColor);
  border-radius: 4px;
}

.md-fences span {
  color: #abb2bf;
}

.md-fences .code-tooltip .ty-input {
  color: var(--fontColor);
  font-weight: 500;
}

.ty-show .autoComplt-list li.active {
  background-color: #3e4249;
}

/* code container */
.cm-s-inner {
  background-color: var(--bgsmallColor);
}

.cm-s-inner .CodeMirror-gutters {
  background-color: var(--bgsmallColor);
  border: none;
}

.cm-s-inner .CodeMirror-guttermarker,
.cm-s-inner .CodeMirror-guttermarker-subtle,
.cm-s-inner .CodeMirror-linenumber {
  color: #737984;
}

.cm-s-inner .CodeMirror-cursor {
  border-left: 1px solid #528bff !important;
}

.cm-s-inner div.CodeMirror-selected {
  background: rgba(255, 255, 255, 0.15);
}

.cm-s-inner.CodeMirror-focused div.CodeMirror-selected {
  background: rgba(255, 255, 255, 0.1);
}

.cm-s-inner .CodeMirror-line::-moz-selection,
.cm-s-inner .CodeMirror-line > span::-moz-selection,
.cm-s-inner .CodeMirror-line > span > span::-moz-selection {
  background-color: #bac6e9;
}

.cm-s-inner .CodeMirror-line::-moz-selection,
.cm-s-inner .CodeMirror-line > span::-moz-selection,
.cm-s-inner .CodeMirror-line > span > span::-moz-selection {
  background-color: #bac6e9;
}

.cm-s-inner .CodeMirror-line::-moz-selection,
.cm-s-inner .CodeMirror-line > span::-moz-selection,
.cm-s-inner .CodeMirror-line > span > span::-moz-selection {
  background-color: #bac6e9;
}

.cm-s-inner .CodeMirror-line::-moz-selection,
.cm-s-inner .CodeMirror-line > span::-moz-selection,
.cm-s-inner .CodeMirror-line > span > span::-moz-selection {
  background-color: #bac6e9;
}

.cm-s-inner .CodeMirror-line::-moz-selection,
.cm-s-inner .CodeMirror-line > span::-moz-selection,
.cm-s-inner .CodeMirror-line > span > span::-moz-selection {
  background-color: #bac6e9;
}

.cm-s-inner .CodeMirror-line::-moz-selection,
.cm-s-inner .CodeMirror-line > span::-moz-selection,
.cm-s-inner .CodeMirror-line > span > span::-moz-selection {
  background-color: #bac6e9;
}

.cm-s-inner .CodeMirror-line::-moz-selection,
.cm-s-inner .CodeMirror-line > span::-moz-selection,
.cm-s-inner .CodeMirror-line > span > span::-moz-selection {
  background-color: #bac6e9;
}

.cm-s-inner .CodeMirror-line::-moz-selection,
.cm-s-inner .CodeMirror-line > span::-moz-selection,
.cm-s-inner .CodeMirror-line > span > span::-moz-selection {
  background-color: #bac6e9;
}

.cm-s-inner .CodeMirror-line::-moz-selection,
.cm-s-inner .CodeMirror-line > span::-moz-selection,
.cm-s-inner .CodeMirror-line > span > span::-moz-selection {
  background-color: #bac6e9;
}

.cm-s-inner .CodeMirror-line::-moz-selection,
.cm-s-inner .CodeMirror-line > span::-moz-selection,
.cm-s-inner .CodeMirror-line > span > span::-moz-selection {
  background-color: #bac6e9;
}

.cm-s-inner .CodeMirror-line::-moz-selection,
.cm-s-inner .CodeMirror-line > span::-moz-selection,
.cm-s-inner .CodeMirror-line > span > span::-moz-selection {
  background-color: #bac6e9;
}

.cm-s-inner .CodeMirror-line::-moz-selection, .cm-s-inner .CodeMirror-line > span::-moz-selection, .cm-s-inner .CodeMirror-line > span > span::-moz-selection {
  background-color: #bac6e9;
}

.cm-s-inner .CodeMirror-line::selection,
.cm-s-inner .CodeMirror-line > span::selection,
.cm-s-inner .CodeMirror-line > span > span::selection {
  background-color: #bac6e9;
}

.cm-s-inner .CodeMirror-activeline-background {
  background: rgba(0, 0, 0, 0);
}

.cm-s-inner .CodeMirror-matchingbracket {
  text-decoration: underline;
  color: white !important;
}

.cm-s-inner .CodeMirror-selected,
.cm-s-inner .CodeMirror-selectedtext {
  background-color: #404859 !important;
}

/* code fences color */
.cm-s-inner .cm-keyword {
  color: #00ffa6 !important;
}

.cm-s-inner .cm-operator {
  color: var(--fontColor) !important;
}

.cm-s-inner .cm-variable {
  color: rgb(249, 42, 173) !important;
}

.cm-s-inner .cm-variable-2 {
  color: #f92aad !important;
}

.cm-s-inner .cm-variable-3 {
  color: var(--fontColor) fff !important;
}

.cm-s-inner .cm-builtin {
  color: #e8bf6a !important;
}

.cm-s-inner .cm-atom {
  color: #e8766d !important;
}

.cm-s-inner .cm-number {
  color: #f78739 !important;
}

.cm-s-inner .cm-def {
  color: #f92aad !important;
}

.cm-s-inner .cm-string {
  color: #f78739 !important;
}

.cm-s-inner .cm-string-2 {
  color: #f78739 !important;
}

.cm-s-inner .cm-comment {
  color: rgb(108, 117, 125) !important;
}

.cm-s-inner .cm-tag {
  color: #72f1b8 !important;
}

.cm-s-inner .cm-meta {
  color: #e06c75 !important;
}

.cm-s-inner .cm-attribute {
  color: #f4eee4 !important;
}

.cm-s-inner .cm-property {
  color: #00f2ff !important;
}

.cm-s-inner .cm-qualifier {
  color: #decb6b !important;
}

.cm-s-inner .cm-error {
  color: var(--fontColor) !important;
  background-color: #ec5f67 !important;
}

.cm-s-inner .cm-tag.cm-bracket {
  color: #abb2bf !important;
}

.outline-label {
}

/* scrollbar */
::-webkit-scrollbar-thumb {
  background-color: var(--themeColor) !important;
  border-radius: 4px;
}

/* find dialog */
#typora-quick-open {
  background-color: var(--bgsmallColor);
  color: var(--fontColor);
}

#typora-quick-open .typora-quick-open-item.active {
  background-color: #3e4249 !important;
}

#typora-quick-open .ty-quick-open-category-title {
  border-top: 1px solid rgba(171, 192, 208, 0.1) !important;
}

/* modal dialog */
#common-dialog .modal-dialog .modal-content {
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  background-color: var(--bgsmallColor);
  border: none;
  border-radius: 6px;
}

#common-dialog .modal-dialog .modal-content .modal-footer .btn-default:hover {
  background-color: #3e4249 !important;
}

/* preferences */
.ty-preferences {
  font-family: 'Fira Code', Consolas, 'Lucida Console', 'Courier', monospace, 'Helvetica Neue', Helvetica, Arial,
    sans-serif;
  color: #282c34;
}

.ty-preferences .window-header h2 {
  font-size: 1.6rem;
}

.ty-preferences .sidebar {
  font-size: 1.4rem;
}

.ty-preferences .sidebar .nav-group-item.active,
.ty-preferences .sidebar .nav-group-item:active {
  color: #efefef;
  background-color: var(--themeColor);
}

/* sidebar includes file-tree,articles and outline*/
.html-for-mac #typora-sidebar {
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
}

/* focus mode/typewriter mode notification  */
#md-notification {
  background-color: var(--bgsmallColor) !important;
}

#md-notification #ty-surpress-mode-warning-close-btn:hover {
  background-color: #3e4249 !important;
}

/* Unibody sidebar */
#top-titlebar,
#top-titlebar * {
  color: inherit;
}

#top-titlebar #w-min:hover,
#top-titlebar #w-max-group .toolbar-icon:hover {
  background-color: #67769660;
}

#megamenu-menu-sidebar {
  color: #282c34;
}

#megamenu-menu-sidebar .megamenu-menu-list li {
  font-size: 0.8rem;
}

#megamenu-menu-sidebar .megamenu-menu-list li a.active {
  background-color: #3e4249 !important;
}

#megamenu-menu-sidebar .megamenu-menu-list li a#m-saved {
  background-color: transparent !important;
}

.megamenu-opened .megamenu-menu {
  left: 0;
}

#megamenu-content {
  color: #000;
}

/* sidebar */
#typora-sidebar {
  background-color: var(--sidebarbgColor);
  border-right: 1px solid rgba(171, 192, 208, 0.1);
}

#typora-sidebar #sidebar-loading-template.file-list-item {
  border-bottom: transparent !important;
  background-color: rgba(171, 192, 208, 0.1);
}

#typora-sidebar .info-panel-tab-wrapper .info-panel-tab:hover {
  color: inherit;
}

#typora-sidebar .info-panel-tab-wrapper .info-panel-tab .info-panel-tab-border {
  background-color: var(--fontColor) !important;
  border-radius: 4px;
}

#typora-sidebar .sidebar-osx-tab .sidebar-tabs {
  border-bottom-color: transparent;
}

#typora-sidebar #sidebar-content .file-list-item {
  border-bottom: 1px solid rgba(171, 192, 208, 0.1);
}

#typora-sidebar #sidebar-content .file-list-item.active {
  background-color: var(--bgsmallColor);
  border-left: 4px solid var(--themeColor);
}

#typora-sidebar #sidebar-content .ty-sidebar-search-panel {
  border-bottom: 1px solid rgba(171, 192, 208, 0.1);
}

#typora-sidebar #sidebar-content .ty-sidebar-search-panel .searchpanel-search-option-btn {
  background-color: var(--bgsmallColor);
}

#typora-sidebar #sidebar-content .sidebar-content-content .file-node-content {
  line-height: 1.375rem;
  font-size: 1rem;
  color: var(--fontColor) !important;
}

#typora-sidebar
  #sidebar-content
  .sidebar-content-content
  .file-tree-node:not(.file-node-root):hover
  > .file-node-background {
  border-left: 4px solid var(--themeColor);
  background-color: var(--bgsmallColor);
}

#typora-sidebar #sidebar-content .sidebar-content-content .file-tree-node.active > .file-node-background {
  border-color: var(--themeColor);
  background-color: var(--bgsmallColor);
}

#typora-sidebar #sidebar-content .sidebar-content-content #file-library-list-children .file-library-file-node:hover {
  border-left: 4px solid var(--themeColor);
  background-color: var(--bgsmallColor);
}

#file-library {
  background-color: var(--sidebarbgColor);
}

#typora-sidebar #sidebar-content #outline-content .no-collapse-outline .outline-item {
  line-height: 1.375rem;
  font-size: 1rem;
}

#typora-sidebar #sidebar-content #outline-content .outline-expander:before {
  color: inherit;
  font-size: 14px;
  top: auto;
  content: '\f0da';
  font-family: FontAwesome;
}

#typora-sidebar #sidebar-content #outline-content .outline-expander:hover:before,
#typora-sidebar #sidebar-content #outline-content .outline-item-open > .outline-item > .outline-expander:before {
  content: '\f0d7';
}

#typora-sidebar #sidebar-content #outline-content .outline-item:hover {
  background-color: var(--bgsmallColor) !important;
  box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.5);
}

#outline-content {
  background-color: var(--sidebarbgColor);
}

#typora-sidebar #ty-sidebar-footer {
  border-top: 1px solid rgba(171, 192, 208, 0.1);
}

#typora-sidebar #ty-sidebar-footer .sidebar-footer-item:hover {
  background-color: #3e4249 !important;
}

#typora-sidebar #ty-sidebar-footer #sidebar-files-menu {
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
}

/* dropdown menu */
.dropdown-menu {
  background-color: var(--bgsmallColor);
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  border-top: 1px solid rgba(171, 192, 208, 0.1);
}

.dropdown-menu > .show + .menuitem-group-label.show {
  border-top: 1px solid rgba(171, 192, 208, 0.1) !important;
}

.dropdown-menu > .active > a,
.dropdown-menu > li > a:hover,
.dropdown-menu .menu-style-btn.active {
  background-color: #3e4249 !important;
}

.dropdown-menu li a {
  color: var(--fontColor) !important;
}

.dropdown-menu li a:hover {
  background-color: #3e4249 !important;
}

.dropdown-menu .divider {
  border-color: var(--bgsmallColor);
}

/* sidebar-files-menu,toc-dropmenu,suggest common */
#sidebar-files-menu,
#toc-dropmenu,
.auto-suggest-container {
  background-color: var(--bgsmallColor);
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  border: none;
}

#toc-dropmenu .outline-item:hover {
  background-color: #3e4249 !important;
}

/* emoji,fences,word suggest */
.auto-suggest-container {
  padding-top: 4px;
  padding-bottom: 4px;
}

.auto-suggest-container li.active,
.auto-suggest-container li:hover {
  background-color: #3e4249 !important;
}

/** source code mode */
#typora-source {
  font-family: 'Fira Code', Consolas, 'Lucida Console', 'Courier', monospace, 'Helvetica Neue', Helvetica, Arial,
    sans-serif;
  color: #6a6a6a;
}

#typora-source .cm-s-typora-default .cm-header,
#typora-source .cm-s-typora-default .cm-property,
#typora-source .CodeMirror.cm-s-typora-default div.CodeMirror-cursor {
  color: #428bca;
}

#typora-source .cm-s-typora-default .cm-atom,
#typora-source .cm-s-typora-default .cm-number {
  color: #777777;
}

#typora-source .CodeMirror-selected,
#typora-source .CodeMirror-selectedtext {
  background-color: #b5d6fc !important;
}

.typora-node .file-list-item-parent-loc,
.typora-node .file-list-item-time,
.typora-node .file-list-item-summary {
  font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica, 'PingFang SC', 'Microsoft YaHei',
    sans-serif;
}

.window-header {
  background-color: var(--sidebarbgColor) !important;
}

.window-header-title {
  color: var(--fontColor);
  background-color: var(--sidebarbgColor);
}

.window-header button,
.window-header button:hover {
  background: var(--sidebarbgColor) !important;
  color: var(--fontColor);
}

.ty-preferences .sidebar {
  color: var(--fontColor);
  background-color: var(--sidebarbgColor);
}

.pane-group {
  color: var(--fontColor);
  background-color: var(--sidebarbgColor);
}

tr {
  box-shadow: none;
}

button.btn-default {
  color: var(--fontColor) !important;
}

.input-group-content select {
  background-color: var(--bgsmallColor);
}

.outline-active {
  color: var(--fontColor);
  text-decoration: underline;
}

.export-detail input[type='number'],
.export-detail input[type='text'],
input[type='number'],
input[type='search'],
input[type='text'],
textarea {
  color: #000;
}

.export-detail,
.export-item.active,
.export-items-list-control {
  background-color: transparent;
}

#megamenu-section-open {
  background-color: var(--bgsmallColor);
  color: var(--fontColor);
}

.long-btn {
  color: var(--fontColor);
}

#recent-file-panel-search-input {
  color: var(--fontColor);
  background-color: transparent;
}

.megamenu-menu-panel table {
  background-color: #aaa;
}

.megamenu-content {
  background: var(--bgsmallColor);
}

.megamenu-menu {
  background-color: var(--bgsmallColor);
}

.megamenu-opened header {
  background-color: var(--bgsmallColor);
}

#recent-file-panel-action-btn {
  background-color: transparent;
  color: var(--fontColor);
}

.export-detail input[type='number'],
.export-detail input[type='text'],
input[type='number'],
input[type='search'],
input[type='text'],
textarea {
  color: var(--fontColor);
}

.export-detail input[type='number'],
.export-detail input[type='text'] {
  background: transparent !important;
}

.export-detail,
.export-item.active,
.export-items-list-control {
  background: transparent !important;
}

.md-plain {
  margin: 0 5px;
}
```

**紫.css**

```css
* {
  /* text-shadow: 0 0 10px  !important; */
  text-shadow: 0px -2px 3px, 0px 2px 3px #000 !important;
  /* text-shadow: none !important; */
  /* box-shadow: none !important; */
}

html {
  font-size: 16px;
}

html,
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica,
    'PingFang SC', 'Microsoft YaHei', sans-serif;
  text-align: justify;
  overflow-x: hidden;
  color: #abc0d0;
  background-color: #1f1827;
  -webkit-font-smoothing: antialiased;
}

content #write {
  background-color: #1f1827;
  max-width: 90%;
  margin: 0 auto;
  padding-bottom: 7.5rem;
}

content #write p {
  word-spacing: 0.05rem;
}

content #write ol li {
  padding-left: 0.5rem;
}

content #write>h1:first-child {
  font-weight: normal;
}

content #write>h5.md-focus:before {
  top: 2px;
}

::-moz-selection {
  background-color: #67769660;
}

::selection {
  background-color: #67769660;
}

/* h1-h3 */
#write h1,
#write h2,
#write h3,
#write h4,
#write h5,
#write h6 {
  font-style: normal;
}

#write h1,
#write h2 {
  text-align: center;
  margin-top: 2rem;
  margin-bottom: 1rem;
}

#write h1 {
  font-size: 3rem;
}

#write h2 {
  text-align: left;
  font-size: 2.4rem;
}

#write h1:after {
  content: '';
  display: block;
  width: 6.25rem;
  height: 1px;
  margin: 0 auto;
  border-bottom: 1px solid;
}

#write h3 {
  font-size: 1.8rem;
}

/* paragraph */
p {
  margin-top: 0;
  margin-bottom: 0.5rem;
}

/* ul ol */
ul,
ol {
  padding-left: 1.75rem;
}

ul:first-child,
ol:first-child {
  margin-top: 0;
}

ul:last-child,
ol:last-child {
  margin-bottom: 0;
}

/* blockquote */
blockquote {
  font-size: 18px;
  padding: 0.5rem 1rem;
  border-left: 8px solid #9b008e;
  background-color: #221b2a;
  box-shadow: 0 1px 3px 0px #00000073;
  border-radius: 4px;
}

/* horizontal line */
hr {
  margin-top: 2rem;
  margin-bottom: 2rem;
  border-top: 2px dashed #abb2bf;
}

/* table */
table {
  width: auto !important;
  font-size: 18px;
}

.md-table-fig .md-table {
  border: 2px solid #9b008e;
  box-shadow: 0 0 5px 0px #9b008e inset;
  border-radius: 6px;
  border-collapse: separate;
  overflow: hidden;
}

.md-table-fig .md-table th,
.md-table-fig .md-table td {
  min-width: 180px;
  padding: 10px 16px;
  border-top: 2px solid #9b008e;
  border-left: 2px solid #9b008e;
  box-shadow: 0 0 3px 0 #9b008e inset;
}

.md-table-fig .md-table th:first-child,
.md-table-fig .md-table td:first-child {
  border-left: 0;
}

.md-table-fig .md-table thead {
  background-color: #9b008e;
  color: #ffffff96;
}

.md-table-fig .md-table caption+thead tr:first-child th,
.md-table-fig .md-table caption+thead tr:first-child td,
.md-table-fig .md-table colgroup+thead tr:first-child th,
.md-table-fig .md-table colgroup+thead tr:first-child td,
.md-table-fig .md-table thead+tbody tr:first-child th,
.md-table-fig .md-table thead+tbody tr:first-child td,
.md-table-fig .md-table thead:first-child tr:first-child th,
.md-table-fig .md-table thead:first-child tr:first-child td {
  border-top: 0;
}

tr {
  box-shadow: 0 0 10px 0px #9b008e;
}

.md-table-fig .md-table tbody+tbody {
  border-top: 2px solid #9b008e;
}

.md-table-fig .md-table-edit {
  background-color: #1b1624;
}

.md-table-fig .md-table-edit .btn-default:hover {
  background-color: #3e4249;
}

.md-table-fig .md-table-edit .md-table-resize-popover {
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  border: none;
  padding: 0;
  background-color: transparent;
}

.md-table-fig .md-table-edit .md-table-resize-popover .arrow {
  top: -10px;
}

.md-table-fig .md-table-edit .md-table-resize-popover .arrow::after {
  border-bottom-color: #1b1624;
}

.md-table-fig .md-table-edit .md-table-resize-popover .md-reset {
  border-radius: 6px;
  background-color: #1b1624;
}

.md-table-fig .md-table-edit .md-table-resize-popover .md-reset input {
  color: #abc0d0 !important;
}

.md-table-fig .md-table-edit .md-table-resize-popover .md-reset input#md-grid-width,
.md-table-fig .md-table-edit .md-table-resize-popover .md-reset input#md-grid-height {
  text-align: center;
}

.md-table-fig .md-table-edit .md-table-resize-popover .popover-title {
  border-top: 1px solid rgba(171, 192, 208, 0.1);
}

#table-insert-dialog .modal-content {
  background-color: #1b1624;
  border: none;
  border-radius: 6px;
}

#table-insert-dialog .modal-content .btn-default:hover {
  background-color: #3e4249;
}

/* yaml front matter */
#write pre.md-meta-block {
  background: #1b1624;
  color: #86a5c3;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  border: 0;
  font-size: 18px !important;
  border-radius: 6px;
  line-height: 1.3rem;
  padding: 0.5rem 1.5rem;
  margin-top: -1rem;
  margin-bottom: 2rem;
}

/* table of contents */
.md-toc {
  margin-bottom: 1.25rem;
}

/* task list */
.md-task-list-item>input::before {
  content: '';
  position: absolute;
  top: -5px;
  left: -4px;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  border: 1px solid #abc0d0;
  background: #1b1624;
  transition: background-color 200ms ease-in-out;
}

.md-task-list-item>input::after {
  content: '';
  position: absolute;
  top: 2px;
  left: 1px;
  width: 0.6rem;
  height: 0.3rem;
  border: 2px solid #fff;
  border-top: 0;
  border-right: 0;
  transform: rotate(-45deg);
  opacity: 0;
  transition: opacity 200ms ease-in-out;
}

.md-task-list-item>input:checked::before {
  background-color: #67c23a;
  border: none;
}

.md-task-list-item>input:checked::after {
  opacity: 1;
}

.md-task-list-item.task-list-done {
  text-decoration: line-through;
  color: #999;
}

/* footnote */
.footnotes {
  font-size: 1rem;
}

/* math,html block common */
.mathjax-block,
.md-htmlblock {
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  border-radius: 6px;
  background-color: #1b1624;
}

.mathjax-block[contenteditable='false']:active,
.mathjax-block[contenteditable='false']:focus,
.md-htmlblock[contenteditable='false']:active,
.md-htmlblock[contenteditable='false']:focus {
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
}

.mathjax-block:hover .md-rawblock-container,
.mathjax-block:hover .md-rawblock-tooltip,
.md-htmlblock:hover .md-rawblock-container,
.md-htmlblock:hover .md-rawblock-tooltip {
  background-color: #1b1624;
  -webkit-animation: showRawBlockTooltip 0s linear;
  animation: showRawBlockTooltip 0s linear;
}

.mathjax-block:hover .md-rawblock-container,
.md-htmlblock:hover .md-rawblock-container {
  border-radius: 6px 0 6px 6px;
}

.mathjax-block .md-rawblock-control,
.md-htmlblock .md-rawblock-control {
  background-color: #1b1624;
}

.mathjax-block .md-rawblock-tooltip,
.md-htmlblock .md-rawblock-tooltip {
  background-color: #1b1624;
  -webkit-animation: showRawBlockTooltip 0s linear;
  animation: showRawBlockTooltip 0s linear;
  border-radius: 4px 4px 0 0;
}

.mathjax-block .md-mathblock-panel .code-tooltip[contenteditable='false'] {
  box-shadow: none;
}

.mathjax-block .md-mathblock-panel .md-rawblock-before {
  padding-top: 6px;
  border-top-left-radius: 6px;
}

.mathjax-block .md-mathblock-panel .md-rawblock-after {
  padding-bottom: 6px;
}

.mathjax-block .md-mathblock-panel .md-rawblock-input .cm-s-inner .CodeMirror-lines {
  color: #abb2bf;
}

.mathjax-block .md-mathblock-panel .md-rawblock-input .cm-s-inner .CodeMirror-gutters {
  background-color: #1b1624;
}

.mathjax-block .md-math-container {
  padding-top: 10px;
  padding-bottom: 10px;
}

.md-htmlblock .md-htmlblock-panel {
  border-radius: 6px;
  border-top-right-radius: 0;
  padding-left: 6px;
  padding-right: 6px;
}

.md-htmlblock .md-htmlblock-panel .md-rawblock-input {
  padding-top: 14px;
  padding-bottom: 10px;
}

.md-htmlblock-container {
  background-color: #1f1827;
  box-shadow: none;
}

.on-focus-mode .md-end-block:not(.md-focus):not(.md-focus-container) * {
  color: #585a5b !important;
}

.on-focus-mode .md-end-block:not(.md-focus):not(.md-focus-container) img {
  opacity: 50%;
}

.on-focus-mode .task-list-item:not(.md-focus-container)>input {
  opacity: 50%;
}

.on-focus-mode .md-fences.md-focus .CodeMirror-code>*:not(.CodeMirror-activeline) *,
.on-focus-mode .CodeMirror.cm-s-inner:not(.CodeMirror-focused) * {
  color: #585a5b !important;
}

.on-focus-mode li[cid]:not(.md-focus-container) {
  color: #585a5b !important;
}

.on-focus-mode #typora-source .CodeMirror-code>*:not(.CodeMirror-activeline) * {
  color: #585a5b !important;
}

.on-focus-mode .md-focus,
.on-focus-mode .md-focus-container {
  color: #abc0d0;
}

/* strong */
strong {
  font-size: 1.5rem;
  color: #abc0d0;
  margin: 0 5px;
  background-color: inherit;
}

/* emphasis */
em {
  color: rgb(108, 117, 125);
  background-color: inherit;
}

/* underline */
u {
  background-color: inherit;
  color: inherit;
  text-decoration: none;
  border-bottom: 2px solid;
  padding-bottom: 1px;
}

/* code */
h1 code,
h2 code,
h3 code,
h4 code,
h5 code,
h6 code {
  font-size: inherit;
}

code {
  color: #00ce84;
  font-family: 'Fira Code', Consolas, 'Lucida Console', 'Courier', monospace,
    'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-size: 1.1rem;
  font-weight: 500;
  margin: 0 2px;
  padding: 2px 5px;
  border-radius: 4px;
}

/* strike */
del {
  color: #999;
  text-decoration: line-through;
}

/* hightlight */
mark {
  color: #00ce84;
  font-weight: 500;
  padding: 1px 5px 2px;
  border-radius: 2px;
  background-color: transparent;
}

/* hyperlink */
a {
  background-color: inherit;
  color: #2484c1;
  font-weight: 600;
}

a:hover {
  text-decoration: underline;
}

a img {
  border: none;
}

p>.md-image:only-child:not(.md-img-error) img,
p>img:only-child {
  margin: 0;
}

/* code fences */
.md-fences {
  font-family: 'Fira Code', Consolas, 'Lucida Console', 'Courier', monospace,
    'Helvetica Neue', Helvetica, Arial, sans-serif;
  background-color: #1b1624;
  padding-top: 6px;
  padding-bottom: 6px;
  padding-left: 10px;
  padding-right: 10px;
  box-shadow: 0 0px 5px 0px rgba(0, 0, 0, 0.5) inset;
  margin-bottom: 2.5rem;
  border: none;
  border-radius: 6px;
}

.md-fences[contenteditable='false']:active,
.md-fences[contenteditable='false']:focus {
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
}

.md-fences .code-tooltip {
  background-color: #1b1624;
  border-radius: 4px;
}

.md-fences span {
  color: #abb2bf;
}

.md-fences .code-tooltip .ty-input {
  color: #fff;
  font-weight: 500;
}

.ty-show .autoComplt-list li.active {
  background-color: #3e4249;
}

/* code container */
.cm-s-inner {
  background-color: #1b1624;
}

.cm-s-inner .CodeMirror-gutters {
  background-color: #1b1624;
  border: none;
}

.cm-s-inner .CodeMirror-guttermarker,
.cm-s-inner .CodeMirror-guttermarker-subtle,
.cm-s-inner .CodeMirror-linenumber {
  color: #737984;
}

.cm-s-inner .CodeMirror-cursor {
  border-left: 1px solid #528bff !important;
}

.cm-s-inner div.CodeMirror-selected {
  background: rgba(255, 255, 255, 0.15);
}

.cm-s-inner.CodeMirror-focused div.CodeMirror-selected {
  background: rgba(255, 255, 255, 0.1);
}

.cm-s-inner .CodeMirror-line::-moz-selection,
.cm-s-inner .CodeMirror-line>span::-moz-selection,
.cm-s-inner .CodeMirror-line>span>span::-moz-selection {
  background-color: #bac6e9;
}

.cm-s-inner .CodeMirror-line::-moz-selection, .cm-s-inner .CodeMirror-line>span::-moz-selection, .cm-s-inner .CodeMirror-line>span>span::-moz-selection {
  background-color: #bac6e9;
}

.cm-s-inner .CodeMirror-line::selection,
.cm-s-inner .CodeMirror-line>span::selection,
.cm-s-inner .CodeMirror-line>span>span::selection {
  background-color: #bac6e9;
}

.cm-s-inner .CodeMirror-activeline-background {
  background: rgba(0, 0, 0, 0);
}

.cm-s-inner .CodeMirror-matchingbracket {
  text-decoration: underline;
  color: white !important;
}

.cm-s-inner .CodeMirror-selected,
.cm-s-inner .CodeMirror-selectedtext {
  background-color: #404859 !important;
}

/* code fences color */
.cm-s-inner .cm-keyword {
  color: #00ffa6 !important;
}

.cm-s-inner .cm-operator {
  color: #fff !important;
}

.cm-s-inner .cm-variable {
  color: rgb(249, 42, 173) !important;
}

.cm-s-inner .cm-variable-2 {
  color: #f92aad !important;
}

.cm-s-inner .cm-variable-3 {
  color: #ffffff !important;
}

.cm-s-inner .cm-builtin {
  color: #e8bf6a !important;
}

.cm-s-inner .cm-atom {
  color: #e8766d !important;
}

.cm-s-inner .cm-number {
  color: #f78739 !important;
}

.cm-s-inner .cm-def {
  color: #f92aad !important;
}

.cm-s-inner .cm-string {
  color: #f78739 !important;
}

.cm-s-inner .cm-string-2 {
  color: #f78739 !important;
}

.cm-s-inner .cm-comment {
  color: rgb(108, 117, 125) !important;
}

.cm-s-inner .cm-tag {
  color: #72f1b8 !important;
}

.cm-s-inner .cm-meta {
  color: #e06c75 !important;
}

.cm-s-inner .cm-attribute {
  color: #f4eee4 !important;
}

.cm-s-inner .cm-property {
  color: #00f2ff !important;
}

.cm-s-inner .cm-qualifier {
  color: #decb6b !important;
}

.cm-s-inner .cm-error {
  color: #fff !important;
  background-color: #ec5f67 !important;
}

.cm-s-inner .cm-tag.cm-bracket {
  color: #abb2bf !important;
}

.outline-label {}

/* scrollbar */
::-webkit-scrollbar-thumb {
  background: linear-gradient(#b928ae 0%, #04edf9 150%) !important;
  border-radius: 4px;
}

/* find dialog */
#typora-quick-open {
  background-color: #1b1624;
  color: #abc0d0;
}

#typora-quick-open .typora-quick-open-item.active {
  background-color: #3e4249 !important;
}

#typora-quick-open .ty-quick-open-category-title {
  border-top: 1px solid rgba(171, 192, 208, 0.1) !important;
}

/* modal dialog */
#common-dialog .modal-dialog .modal-content {
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  background-color: #1b1624;
  border: none;
  border-radius: 6px;
}

#common-dialog .modal-dialog .modal-content .modal-footer .btn-default:hover {
  background-color: #3e4249 !important;
}

/* preferences */
.ty-preferences {
  font-family: 'Fira Code', Consolas, 'Lucida Console', 'Courier', monospace,
    'Helvetica Neue', Helvetica, Arial, sans-serif;
  color: #282c34;
}

.ty-preferences .window-header h2 {
  font-size: 1.6rem;
}

.ty-preferences .sidebar {
  font-size: 1.4rem;
}

.ty-preferences .sidebar .nav-group-item.active,
.ty-preferences .sidebar .nav-group-item:active {
  color: #efefef;
  background-color: #b928ae;
}

/* sidebar includes file-tree,articles and outline*/
.html-for-mac #typora-sidebar {
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
}

/* focus mode/typewriter mode notification  */
#md-notification {
  background-color: #1b1624 !important;
}

#md-notification #ty-surpress-mode-warning-close-btn:hover {
  background-color: #3e4249 !important;
}

/* Unibody sidebar */
#top-titlebar,
#top-titlebar * {
  color: inherit;
}

#top-titlebar #w-min:hover,
#top-titlebar #w-max-group .toolbar-icon:hover {
  background-color: #67769660;
}

#megamenu-menu-sidebar {
  color: #282c34;
}

#megamenu-menu-sidebar .megamenu-menu-list li {
  font-size: 0.8rem;
}

#megamenu-menu-sidebar .megamenu-menu-list li a.active {
  background-color: #3e4249 !important;
}

#megamenu-menu-sidebar .megamenu-menu-list li a#m-saved {
  background-color: transparent !important;
}

.megamenu-opened .megamenu-menu {
  left: 0;
}

#megamenu-content {
  color: #000;
}

/* sidebar */
#typora-sidebar {
  background-color: #1b1622;
  border-right: 1px solid rgba(171, 192, 208, 0.1);
}

#typora-sidebar #sidebar-loading-template.file-list-item {
  border-bottom: transparent !important;
  background-color: rgba(171, 192, 208, 0.1);
}

#typora-sidebar .info-panel-tab-wrapper .info-panel-tab:hover {
  color: inherit;
}

#typora-sidebar .info-panel-tab-wrapper .info-panel-tab .info-panel-tab-border {
  background: linear-gradient(45deg, #b928ae 0%, #04edf9 150%) !important;
  border-radius: 4px;
}

#typora-sidebar .sidebar-osx-tab .sidebar-tabs {
  border-bottom-color: transparent;
}

#typora-sidebar #sidebar-content .file-list-item {
  border-bottom: 1px solid rgba(171, 192, 208, 0.1);
}

#typora-sidebar #sidebar-content .file-list-item.active {
  background-color: #1b1624;
  border-left: 4px solid #9b008e;
}

#typora-sidebar #sidebar-content .ty-sidebar-search-panel {
  border-bottom: 1px solid rgba(171, 192, 208, 0.1);
}

#typora-sidebar #sidebar-content .ty-sidebar-search-panel .searchpanel-search-option-btn {
  background-color: #1b1624;
}

#typora-sidebar #sidebar-content .sidebar-content-content .file-node-content {
  line-height: 1.375rem;
  font-size: 1rem;
  color: #abc0d0 !important;
}

#typora-sidebar #sidebar-content .sidebar-content-content .file-tree-node:not(.file-node-root):hover>.file-node-background {
  border-left: 4px solid #b928ae;
  background-color: #1b1624;
}

#typora-sidebar #sidebar-content .sidebar-content-content .file-tree-node.active>.file-node-background {
  border-color: #b928ae;
  background-color: #1b1624;
}

#typora-sidebar #sidebar-content .sidebar-content-content #file-library-list-children .file-library-file-node:hover {
  border-left: 4px solid #b928ae;
  background-color: #1b1624;
}

#file-library {
  background-color: #21192a;
}

#typora-sidebar #sidebar-content #outline-content .no-collapse-outline .outline-item {
  line-height: 1.375rem;
  font-size: 1rem;
}

#typora-sidebar #sidebar-content #outline-content .outline-expander:before {
  color: inherit;
  font-size: 14px;
  top: auto;
  content: '\f0da';
  font-family: FontAwesome;
}

#typora-sidebar #sidebar-content #outline-content .outline-expander:hover:before,
#typora-sidebar #sidebar-content #outline-content .outline-item-open>.outline-item>.outline-expander:before {
  content: '\f0d7';
}

#typora-sidebar #sidebar-content #outline-content .outline-item:hover {
  background-color: #1b1624 !important;
  box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.5);
}

#outline-content {
  background-color: #1b1622;
}

#typora-sidebar #ty-sidebar-footer {
  border-top: 1px solid rgba(171, 192, 208, 0.1);
}

#typora-sidebar #ty-sidebar-footer .sidebar-footer-item:hover {
  background-color: #3e4249 !important;
}

#typora-sidebar #ty-sidebar-footer #sidebar-files-menu {
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
}

/* dropdown menu */
.dropdown-menu {
  background-color: #1b1624;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  border-top: 1px solid rgba(171, 192, 208, 0.1);
}

.dropdown-menu>.show+.menuitem-group-label.show {
  border-top: 1px solid rgba(171, 192, 208, 0.1) !important;
}

.dropdown-menu>.active>a,
.dropdown-menu>li>a:hover,
.dropdown-menu .menu-style-btn.active {
  background-color: #3e4249 !important;
}

.dropdown-menu li a {
  color: #abc0d0 !important;
}

.dropdown-menu li a:hover {
  background-color: #3e4249 !important;
}

.dropdown-menu .divider {
  border-color: #1b1624;
}

/* sidebar-files-menu,toc-dropmenu,suggest common */
#sidebar-files-menu,
#toc-dropmenu,
.auto-suggest-container {
  background-color: #1b1624;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  border: none;
}

#toc-dropmenu .outline-item:hover {
  background-color: #3e4249 !important;
}

/* emoji,fences,word suggest */
.auto-suggest-container {
  padding-top: 4px;
  padding-bottom: 4px;
}

.auto-suggest-container li.active,
.auto-suggest-container li:hover {
  background-color: #3e4249 !important;
}

/** source code mode */
#typora-source {
  font-family: 'Fira Code', Consolas, 'Lucida Console', 'Courier', monospace,
    'Helvetica Neue', Helvetica, Arial, sans-serif;
  color: #6a6a6a;
}

#typora-source .cm-s-typora-default .cm-header,
#typora-source .cm-s-typora-default .cm-property,
#typora-source .CodeMirror.cm-s-typora-default div.CodeMirror-cursor {
  color: #428bca;
}

#typora-source .cm-s-typora-default .cm-atom,
#typora-source .cm-s-typora-default .cm-number {
  color: #777777;
}

#typora-source .CodeMirror-selected,
#typora-source .CodeMirror-selectedtext {
  background-color: #b5d6fc !important;
}

.typora-node .file-list-item-parent-loc,
.typora-node .file-list-item-time,
.typora-node .file-list-item-summary {
  font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica,
    'PingFang SC', 'Microsoft YaHei', sans-serif;
}

.window-header {
  background-color: #1b1622 !important;
}

.window-header-title {
  color: #fff;
  background-color: #1b1622;
}

.window-header button,
.window-header button:hover {
  background: #1b1622 !important;
  color: #fff;
}

.ty-preferences .sidebar {
  color: #fff;
  background-color: #21192a;
}

.pane-group {
  color: #fff;
  background-color: #21192a;
}

tr {
  box-shadow: none;
}

button.btn-default {
  color: #fff !important;
}

.input-group-content select {
  background-color: #1b1624;
}

.outline-active {
  color: #fff;
  text-decoration: underline;
}

.export-detail input[type='number'],
.export-detail input[type='text'],
input[type='number'],
input[type='search'],
input[type='text'],
textarea {
  color: #000;
}

.export-detail,
.export-item.active,
.export-items-list-control {
  background-color: transparent;
}

#megamenu-section-open {
  background-color: #1b1624;
  color: #fff;
}

.long-btn {
  color: #fff;
}

#recent-file-panel-search-input {
  color: #fff;
  background-color: transparent;
}

.megamenu-menu-panel table {
  background-color: #aaa;
}

.megamenu-content {
  background: #1b1624;
}

.megamenu-menu {
  background-color: #1b1624;
}

.megamenu-opened header {
  background-color: #1b1624;
}

#recent-file-panel-action-btn {
  background-color: transparent;
  color: #fff;
}

.export-detail input[type='number'],
.export-detail input[type='text'],
input[type='number'],
input[type='search'],
input[type='text'],
textarea {
  color: #fff;
}

.export-detail input[type='number'],
.export-detail input[type='text'] {
  background: transparent !important;
}

.export-detail,
.export-item.active,
.export-items-list-control {
  background: transparent !important;
}

.md-plain {
  margin: 0 5px;
}
```

