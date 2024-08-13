import { defineConfig } from 'tsup';

export default defineConfig({
    entry: ['./index.ts'],
    format: ['esm', 'cjs'],
    dts: true,
    shims: true,
    skipNodeModulesBundle: true,
    clean: true,

});