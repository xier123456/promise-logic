import { defineConfig } from 'rollup';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import dts from 'rollup-plugin-dts';
import typescript from '@rollup/plugin-typescript';

export default defineConfig([
  //v1版本构建 (JavaScript - 默认) 
  
  // v1 主入口打包配置
  {
    input: 'src/v1/index.js',
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
  
  // v1 工厂函数打包配置
  {
    input: 'src/v1/factory.js',
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
  
  // v1 类型声明文件打包配置 (为JavaScript用户提供基础类型)
  {
    input: 'src/types/v1/index.d.ts',
    output: [
      {
        file: 'dist/types/index.d.ts',
        format: 'esm'
      }
    ],
    plugins: [dts()]
  },
  
  // v1 工厂函数类型声明文件打包配置
  {
    input: 'src/types/v1/factory.d.ts',
    output: [
      {
        file: 'dist/types/factory.d.ts',
        format: 'esm'
      }
    ],
    plugins: [dts()]
  },
  
  //v2版本构建 (TypeScript - @types包)
  
  // v2 主入口打包配置
  {
    input: 'src/v2/index.ts',
    output: [
      {
        file: 'dist/v2/index.esm.js',
        format: 'esm',
        sourcemap: true
      },
      {
        file: 'dist/v2/index.cjs.js',
        format: 'cjs',
        sourcemap: true
      }
    ],
    plugins: [nodeResolve(), commonjs(), typescript({
      tsconfig: './tsconfig.v2.json'
    })],
    external: []
  },
  
  // v2 工厂函数打包配置
  {
    input: 'src/v2/factory.ts',
    output: [
      {
        file: 'dist/v2/factory.esm.js',
        format: 'esm',
        sourcemap: true
      },
      {
        file: 'dist/v2/factory.cjs.js',
        format: 'cjs',
        sourcemap: true
      }
    ],
    plugins: [nodeResolve(), commonjs(), typescript({
      tsconfig: './tsconfig.v2.json'
    })],
    external: []
  },
  
  // v2 类型声明文件打包配置 (用于@types包)
  {
    input: 'src/types/v2/index.d.ts',
    output: [
      {
        file: 'dist/v2/types/index.d.ts',
        format: 'esm'
      }
    ],
    plugins: [dts()]
  },
  
  // v2 工厂函数类型声明文件打包配置
  {
    input: 'src/types/v2/factory.d.ts',
    output: [
      {
        file: 'dist/v2/types/factory.d.ts',
        format: 'esm'
      }
    ],
    plugins: [dts()]
  }
]);