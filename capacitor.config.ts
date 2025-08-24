import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'tp1',
  webDir: 'dist/tp1/browser',
  includePlugins: ['@capacitor/assets'],
  plugins: {
    CapacitorAssets: {
      copyPublicAssets: true
    }
  }
};

export default config;
