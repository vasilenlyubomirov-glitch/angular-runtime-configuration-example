import { ApplicationConfig, provideZoneChangeDetection, inject, InjectionToken } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { TransferState } from '@angular/core';

import { routes } from './app.routes';
import { APP_CONFIG_KEY, AppConfig } from './app.config.tokens';

// 1. Create an Injection Token for components to use
// This allows you to do: inject(APP_ENV)
export const APP_ENV = new InjectionToken<AppConfig>('APP_ENV');

export const appConfig: ApplicationConfig = {
  providers: [
    // Standard Angular Performance setup
    provideZoneChangeDetection({ eventCoalescing: true }),

    // Routing
    provideRouter(routes),

    // Hydration with Event Replay (Standard for Angular 18/19+)
    provideClientHydration(withEventReplay()),

    // 2. The Provider Logic
    {
      provide: APP_ENV,
      useFactory: () => {
        const transferState = inject(TransferState);
        const defaultConfig: AppConfig = {
          apiUrl: 'http://localhost:4200/api',
          environment: 'development',
          featureFlag: false
        };
        return transferState.get(APP_CONFIG_KEY, defaultConfig);
      }
    }
  ]
};
