import { Injectable } from '@angular/core';

import { Resolve, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class IsLoggedIn implements Resolve<any> {
  constructor(private authService: AuthService, private router: Router) {}

  resolve() {
    this.authService.currentUser.subscribe(user => {
      if (user) {
        this.router.navigate(['/home']);
      }
    });
  }
}
