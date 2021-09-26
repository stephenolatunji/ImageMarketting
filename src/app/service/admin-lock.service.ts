import { Injectable } from '@angular/core';
import { AdminAuthService } from './admin-auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminLockService {

  constructor(private auth: AdminAuthService) { }

  canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {
      return false;
    }
    return true;
  }

}
