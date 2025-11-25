import {Component, inject, Inject, PLATFORM_ID} from '@angular/core';
import { AppConfig } from './app.config.tokens';
import {APP_ENV} from './app.config';
import {isPlatformBrowser} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {EnvService} from './env.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet
  ],
  template: `
    <h1>API URL: {{ env.apiUrl }}</h1>
    <h1>Env: {{ env.environment }}</h1>
    <h1>Feature Flag: {{ env.featureFlag }}</h1>

<!--    // This is intentional-->
<!--    // This allows you to REWRITE your application to support SSR-->
<!--    // at your own PACE, without having to refactor everything at once.-->
    @if (isBrowser) {
      <router-outlet></router-outlet>
    }
  `
})
export class AppComponent {
  protected env = inject(APP_ENV);
  private platformId = inject(PLATFORM_ID);
  private envService = inject(EnvService);

  isBrowser = isPlatformBrowser(this.platformId);
  apiUrl: string;
  environment: string;
  featureFlag: boolean;

  constructor() {
    this.apiUrl = this.envService.snapshot.apiUrl;
    this.environment = this.envService.snapshot.environment;
    this.featureFlag = this.envService.snapshot.featureFlag;
  }
}
