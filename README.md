# electron-app

Electron + Vue3项目模板

## 版本说明

Electron@21.1.0
Vue@3.2.38
Vite@3.0.9


## 构建说明

基于 vue 项目进行构建，通过对 vue3 项目的修改，引入 Electron 依赖，实现 Electron + Vue 的应用结合。

### 1）构建Vue项目

使用 yarn 构建新的vue项目
```sh
yarn create vue@latest
```

对新建项目进行编译
```sh
cd project-name
yarn 
yarn dev
```

vue项目能够正常运行后，对项目进行打包
```sh
yarn build
```

### 2）引入Electron

引入electron依赖
```sh
yarn add --dev electron
```

修改根目录下的 vite.config.js 文件
```sh
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'                     // 新增

// https://vitejs.dev/config/
export default defineConfig({
  base: path.resolve(__dirname, './dist/'),	// 新增
  plugins: [vue()]
})
```

根目录创建 main.js 文件，大部分与Electron官网的配置相同，修改主窗口加载的页面为[1）构建Vue项目](# 1）构建Vue项目)中打包后的index.html **（此main.js并不是Vue的main.js，而是创建Electron应用窗口，引导启动的main.js）**
```sh
// 控制应用生命周期和创建原生浏览器窗口的模组
const { app, BrowserWindow } = require('electron')
const path = require('path')

function createWindow () {
  // 创建浏览器窗口
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // 加载 index.html
  mainWindow.loadFile('dist/index.html') // 此处跟electron官网路径不同，修改为vue打包后的index.html

  // 打开开发工具
  // mainWindow.webContents.openDevTools()
}

// 这段程序将会在 Electron 结束初始化
// 和创建浏览器窗口的时候调用
// 部分 API 在 ready 事件触发后才能使用。
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // 通常在 macOS 上，当点击 dock 中的应用程序图标时，如果没有其他
    // 打开的窗口，那么程序会重新创建一个窗口。
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// 除了 macOS 外，当所有窗口都被关闭的时候退出程序。 因此，通常对程序和它们在
// 任务栏上的图标来说，应当保持活跃状态，直到用户使用 Cmd + Q 退出。
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
// 在这个文件中，你可以包含应用程序剩余的所有部分的代码，
// 也可以拆分成几个文件，然后用 require 导入。

```

根目录创建 main.js 文件
```sh
// 所有Node.js API都可以在预加载过程中使用。
// 它拥有与Chrome扩展一样的沙盒。
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const dependency of ['chrome', 'node', 'electron']) {
    replaceText(`${dependency}-version`, process.versions[dependency])
  }
})

```

修改package.json中的入口，增加main属性为上面创建的main.js文件，以及增加启动命令
```sh
{
  "name": "kuari",
  "version": "0.0.0",
  "main": "main.js", 			// 新增
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "serve": "vite preview",
    "start": "electron ."     // start为启动命令，yarn start
  },
  "dependencies": {
    "vue": "^3.2.16"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^1.9.3",
    "electron": "^15.1.2",
    "vite": "^2.6.4"
  }
}
```

## 打包为可执行程序

以打包为 exe 程序为例，在package.json中启动命令后面增加打包命令，具体含义请参考[electron安装+运行+打包成桌面应用](https://blog.csdn.net/qq285679784/article/details/119962625)

在使用打包命令前，如果没有安装打包依赖则先安装相关依赖
```sh
yarn global add electron-packager   // 全局安装

// 增加打包命令
"package": "electron-packager . electron-app --platform=win32 --arch=x64 --out=./out --asar --app-version=0.0.1 --overwirte --ignore=node_modules"
```

## Project Setup

```sh
yarn
```

### Compile and Hot-Reload for Development

```sh
yarn dev
```

### Compile and Minify for Production

```sh
yarn build
```
