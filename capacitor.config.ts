
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.649e0e8f16644ba486d20e7e0e2ec06e',
  appName: 'ebd-turma-digital',
  webDir: 'dist',
  server: {
    url: 'https://649e0e8f-1664-4ba4-86d2-0e7e0e2ec06e.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  android: {
    buildOptions: {
      keystorePath: 'android.keystore',
      keystoreAlias: 'key0',
      releaseType: 'APK'
    }
  }
};

export default config;
