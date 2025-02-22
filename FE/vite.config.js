import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, 'src') },
      { find: '@pages', replacement: path.resolve(__dirname, 'src/pages') },
      { find: '@public', replacement: path.resolve(__dirname, 'src/public') },
      {
        find: '@components',
        replacement: path.resolve(__dirname, 'src/components'),
      },
      {
        find: '@stores',
        replacement: path.resolve(__dirname, 'src/stores'),
      },
      {
        find: '@apis',
        replacement: path.resolve(__dirname, 'src/apis'),
      },
    ],
  },
});
