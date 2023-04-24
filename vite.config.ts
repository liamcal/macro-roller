import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import preload from "vite-plugin-preload";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(),  preload()],
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './src/setupTests.ts',
    },
    base: '/macro-roller',
});
