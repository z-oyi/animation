const rollup = require('rollup')
const jsx = require('rollup-plugin-jsx')
const pluginBabel = require('@rollup/plugin-babel')
const babel = pluginBabel.default
// const getBabelOutPlugin = pluginBabel.getBabelOutputPlugin
const resolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')
const ts = require('rollup-plugin-typescript2')
const styles = require('rollup-plugin-styles')
const path = require('path')
const browserSync = require("browser-sync").create();
const getPath = _path => path.resolve(__dirname, _path)
const packageJSON =  require('./package.json')
const extensions = [
    '.js',
    '.ts',
    '.tsx'
]

const tsPlugin = ts({
    tsconfig: getPath('./tsconfig.json'), // 导入本地ts配置
    extensions
})



const config = {
    input: 'src/main.ts',
    output: [
        {
            file: packageJSON.main, // 通用模块
            format: 'umd',
            name: 'OAnimation'
        },
        {
            file: packageJSON.module, // es6模块
            format: 'es',
            name: 'OAnimation'
        },
        {
            file: 'dist/bundle.js',
            format: 'umd',
            name: 'OAnimation',
            assetFileNames: "[name][extname]"
        }
    ],
    plugins: [
        styles({
            mode: "extract"
        }),
        resolve(extensions),
        commonjs(),
        tsPlugin,
        // babel()
    ]
};
const watcher = rollup.watch(config)
watcher.on('event', event => {
    if (event.code === 'END') {}
    if (event.code === 'ERROR') {
        console.log(event)
    }
    // event.code 会是下面其中一个：
    //   START        — 监听器正在启动（重启）
    //   BUNDLE_START — 构建单个文件束
    //   BUNDLE_END   — 完成文件束构建
    //   END          — 完成所有文件束构建
    //   ERROR        — 构建时遇到错误
    //   FATAL        — 遇到无可修复的错误
});
  

browserSync.init({
    server: "./dist",
    files: ["dist/css/bundle.css", "dist/**/*.js", "dist/index.html"],
    open: false
})