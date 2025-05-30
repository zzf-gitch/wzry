const packageInfo = require('./package.json');
module.exports = {
    // publicPath: './',
    publicPath: '/wzry/',
    pluginOptions: {
        electronBuilder: {
            builderOptions: {
                "appId": "com.example.app",
                "productName": "王者荣耀后台管理系统", //项目名，也是生成的安装文件名，即aDemo.exe
                "copyright": "zzf © 2025", //版权信息
                // "directories": {
                //     "output": "./dist_electron" //输出文件路径，之前编译的默认是dist_electron
                // },
                "win": {
                    "icon": "wzry.ico", //这里注意配好图标路径
                    "target": [{
                        "target": "nsis", //利用nsis制作安装程序
                        "arch": [
                            "x64", //64位
                            "ia32" //32位
                        ]
                    }]
                },
                "nsis": {
                    "oneClick": false, // 是否一键安装
                    "allowElevation": true, // 允许请求提升。 如果为false，则用户必须使用提升的权限重新启动安装程序。
                    "allowToChangeInstallationDirectory": true, // 允许修改安装目录
                    "installerIcon": "wzry.ico", // 安装图标
                    "uninstallerIcon": "wzry.ico", //卸载图标
                    "installerHeaderIcon": "wzry.ico", // 安装时头部图标
                    "createDesktopShortcut": true, // 创建桌面图标
                    "createStartMenuShortcut": true, // 创建开始菜单图标
                    "shortcutName": "王者荣耀后台管理系统", // 图标名称
                }
                // options placed here will be merged with default configuration and passed to electron-builder
            }
        }
    },
    chainWebpack: (config) => {
        config.plugin('define').tap((definitions) => {
            definitions[0]['process.env'].VERSION = JSON.stringify(packageInfo.version);
            return definitions;
        });
    }
    // pages: {
    //     index: {
    //         // page 的入口
    //         entry: 'src/main.js',
    //         // 模板来源
    //         template: 'public/index.html',
    //         // 在 dist/index.html 的输出
    //         filename: 'index.html',
    //         // 当使用 title 选项时，
    //         // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
    //         title: '王者荣耀后台管理系统',
    //         // 在这个页面中包含的块，默认情况下会包含
    //         // 提取出来的通用 chunk 和 vendor chunk。
    //         chunks: ['chunk-vendors', 'chunk-common', 'index'],
    //         meta: [{ name: 'revised', content: `版本号, ${packageInfo.version}` }]
    //     },
    //     // 当使用只有入口的字符串格式时，
    //     // 模板会被推导为 `public/subpage.html`
    //     // 并且如果找不到的话，就回退到 `public/index.html`。
    //     // 输出文件名会被推导为 `subpage.html`。
    //     // subpage: 'src/subpage/main.js'
    // }
}