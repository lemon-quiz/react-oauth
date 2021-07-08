import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';

const external = (id) => !id.startsWith('\0') && !id.startsWith('.') && !id.startsWith('/');

const baseConfig = {
  input: 'src/index.ts',
  plugins: [
    babel({
      exclude: 'node_modules/**',
      babelHelpers: 'bundled',
    }),
    nodeResolve(),
    typescript({ useTsconfigDeclarationDir: true }),
    commonjs({ extensions: ['.js', '.ts'] }), // the ".ts" extension is required
  ],
  external,
};

const minifyConfig = {
  ...baseConfig,
  plugins: [
    ...baseConfig.plugins,
    terser(),
  ],
};

export default [
  {
    output: {
      file: 'cjs/index.js',
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
    },
    ...baseConfig,
  },
  {
    output: {
      file: 'cjs/index.min.js',
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
    },
    ...minifyConfig,
  },
  {
    output: {
      file: 'es/index.js',
      format: 'esm',
      exports: 'named',
      sourcemap: true,
    },
    ...baseConfig,
  },
];
