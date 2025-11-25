// src/app/env.service.ts
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { APP_ENV } from './app.config'; // The token we set up previously

@Injectable({ providedIn: 'root' })
export class EnvService {
  // 1. Inject the value (works on Server and Client)
  private readonly initialEnv = inject(APP_ENV);

  // 2. Create your Subject
  // We initialize it immediately because TransferState is synchronous
  public env$ = new BehaviorSubject<any>(this.initialEnv);

  get snapshot() {
    return this.env$.getValue();
  }
}
