const { app, BrowserWindow, Menu } = require('electron')
const path = require('path')

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

function createWindow() {
    const mainWindow = new BrowserWindow({
        // frame: false,      //无边框窗口
        // transparent: true,   //创建透明窗口
        icon: 'dist/favicon.ico',
        title: 'Journey With Life',       // 窗口名称，当vue index.html中设置title标签后，会将此属性覆盖
        show: false,
        minWidth: 1000,
        minHeight: 700,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })
    
    // 设置窗口菜单
    Menu.setApplicationMenu(null)

    // 加载 index.html
    mainWindow.loadFile('dist/index.html') // 此处跟electron官网路径不同，需要注意

    // 打开开发工具
    mainWindow.webContents.openDevTools()

    // 默认窗口最大化
    mainWindow.maximize()
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


// 热加载
const isDevelopment = !app.isPackaged
if (isDevelopment) {
    // require('electron-reload')(path.join(__dirname, 'build'));
    try {
        require('electron-reloader')(module,{});
      } catch (_) {}
}

  // 在这个文件中，你可以包含应用程序剩余的所有部分的代码，
  // 也可以拆分成几个文件，然后用 require 导入。