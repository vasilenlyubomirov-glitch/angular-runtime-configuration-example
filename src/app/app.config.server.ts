import { mergeApplicationConfig, ApplicationConfig, TransferState, inject, provideAppInitializer } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { APP_CONFIG_KEY, AppConfig } from './app.config.tokens';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    // New Functional Approach
    provideAppInitializer(() => {
      const transferState = inject(TransferState);
      console.log(process.env)
      // 1. Capture Node.js Environment Variables
      const envConfig: AppConfig = {
        apiUrl: process.env['API_URL'] || 'http://localhost:3000',
        environment: (process.env['NODE_ENV'] as any) || 'development',
        featureFlag: process.env['ENABLE_FEATURE'] === 'true',
      };

      // 2. Write to TransferState
      transferState.set(APP_CONFIG_KEY, envConfig);
    }),
  ],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
