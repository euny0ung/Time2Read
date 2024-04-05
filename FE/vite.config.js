import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import compression from 'vite-plugin-compression';
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    compression({
      // 압축 설정
      verbose: true, // 압축 프로세스의 로그를 출력
      threshold: 10240, // 10KB 미만의 파일은 압축하지 않음
      algorithm: 'gzip', // 사용할 압축 알고리즘
      ext: '.gz', // 생성되는 파일의 확장자
    }),
  ],
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
