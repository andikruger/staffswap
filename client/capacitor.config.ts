import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.staffswapp.staffswap',
  appName: 'staffswap',
  webDir: 'build',
  server: {
    androidScheme: 'https'
  }
};

export default config;
