import resolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'

export default {
  input: 'lib/index.js',
  output: {
    file: 'dist/lib.js',
    format: 'cjs'
  },
  plugins: [
    resolve(),
    babel({
      babelrc: false,
      presets: ["@babel/preset-env"],
    }),
    commonjs({ include: 'node_modules/**' })
  ]
}
