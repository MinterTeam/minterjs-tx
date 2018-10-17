import json from 'rollup-plugin-json';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';
import { terser } from 'rollup-plugin-terser';
import babel from 'rollup-plugin-babel';

export default {
    input: 'src/index.js',
    plugins: [
        json(),
        resolve({
            browser: true,
        }),
        commonjs({
            namedExports: {
                'node_modules/ethereumjs-util/dist/index.js': [ 'stripHexPrefix' ],
                //@TODO `browser` field is used instead of `module`, can be fixed after merge https://github.com/rollup/rollup-plugin-node-resolve/pull/182
                'node_modules/minterjs-util/dist/index.js': [ 'defineProperties '],
            }
        }),
        // globals(),
        // builtins(),
        babel({
            babelrc: false,
            presets: [['@babel/preset-env', { modules: false }]],
        }),
        terser(), // uglifyjs alternative with es6 support
    ],
    output: {
        file: 'dist/index.min.js',
        format: 'umd',
        name: 'minterJsTx',
    }
};
