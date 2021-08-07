
import pluginBabel from '@rollup/plugin-buble'
import ts from 'rollup-plugin-typescript2'
import path from 'path'
import pkg from './package.json'
import dts from 'rollup-plugin-dts'

const join = (...args) => path.resolve(...args);
const getPath = _path => path.resolve(__dirname, _path)


const extensions = [
    '.js',
    '.ts',
    '.tsx'
]

const tsPlugin = ts({
    tsconfig: getPath('./tsconfig.json'),
    extensions
})

const config = [
    {
        input: join('./src/main.ts'),
        output: {
            file: join('./', pkg.main),
            format: 'umd',
            name: 'OAnimation', 
        },
        plugins: [
            tsPlugin,
            pluginBabel()
        ],
        
    },
    {
        input: join('./src/main.ts'),
        output: {
            file: join('./', pkg.module),
            format: 'es',
            name: 'OAnimation',
        },
        plugins: [tsPlugin]
    },
    {
        input: join('./src/main.ts'),
        output: {
          file: join('./', pkg.types),
          format: 'es',
        },
        plugins: [dts()],
    },
]

export default config;