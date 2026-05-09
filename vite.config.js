import { defineConfig } from 'vite';
import { resolve } from 'path';

/* eslint-disable no-undef */
const baseDir = resolve(__dirname);
const srcDir = resolve(baseDir, 'src');
const outDir = resolve(baseDir, 'dist');

export default defineConfig({
  build: {
    outDir: outDir,
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      '@src': srcDir,
    },
  },
});