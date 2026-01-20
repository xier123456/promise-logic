import { defineConfig } from 'rollup';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import dts from 'rollup-plugin-dts';

export default defineConfig([
  // 主入口打包配置
  {
    input: 'src/index.js',
    output: [
      {
        file: 'dist/index.esm.js',
        format: 'esm',
        sourcemap: true
      },
      {
        file: 'dist/index.cjs.js',
        format: 'cjs',
        sourcemap: true
      }
    ],
    plugins: [nodeResolve(), commonjs()],
    external: []
  },
  // 工厂函数打包配置
  {
    input: 'src/factory.js',
    output: [
      {
        file: 'dist/factory.esm.js',
        format: 'esm',
        sourcemap: true
      },
      {
        file: 'dist/factory.cjs.js',
        format: 'cjs',
        sourcemap: true
      }
    ],
    plugins: [nodeResolve(), commonjs()],
    external: []
  },
  // 类型声明文件打包配置
  {
    input: 'src/types/index.d.ts',
    output: [
      {
        file: 'dist/types/index.d.ts',
        format: 'esm'
      }
    ],
    plugins: [dts()]
  },
  // 工厂函数类型声明文件打包配置
  {
    input: 'src/types/factory.d.ts',
    output: [
      {
        file: 'dist/types/factory.d.ts',
        format: 'esm'
      }
    ],
    plugins: [dts()]
  }
]);