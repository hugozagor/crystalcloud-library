import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import dts from 'rollup-plugin-dts'

//NEW
import terser from '@rollup/plugin-terser'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'

const packageJson = require('./package.json')
console.log(packageJson)
export default [
    {
        input: 'src/index.ts',
        output: [
            {
                file: packageJson.main,
                format: 'cjs',
                sourcemap: true,
            },
        ],
        plugins: [
            // NEW
            typescript(),
            peerDepsExternal(),

            resolve(),
            commonjs(),

            // NEW
            terser(),
        ],
    },
    {
        input: 'dist/cjs/types/src/index.d.ts',
        output: [{ file: 'dist/index.d.ts', format: 'cjs' }],
        plugins: [dts.default()],
        external: [/\.css$/],
    },
]
