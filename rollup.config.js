import jsx from 'rollup-plugin-jsx'
import babel from '@rollup/plugin-babel'
import styles from "rollup-plugin-styles";

export default {
    input: 'src/main.js',
    output: {
      file: 'dist/bundle.js',
      format: 'cjs',
      assetFileNames: "[name][extname]"
    },
    plugins: [
        styles({
            mode: ["extract", "awesome-bundle.css"]
        }),
        jsx({factory: '_h'}),
        babel({
            exclude: 'node_modules/**',
            babelHelpers: 'runtime'  // 当启用沙箱 polyfill 时，需要设定为 runtime
        }),
        
    ]
};