import { makeStateKey } from '@angular/core';

export interface AppConfig {
  apiUrl: string;
  environment: 'development' | 'production';
  featureFlag: boolean;
}

// This key matches the data between Server and Client
export const APP_CONFIG_KEY = makeStateKey<AppConfig>('APP_CONFIG');
