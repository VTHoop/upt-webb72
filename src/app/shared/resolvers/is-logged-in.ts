import { Injectable } from '@angular/core';

import { Resolve, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IsLoggedIn implements Resolve<any> {
  constructor(private authService: AuthService, private router: Router) {}

  resolve() {
    this.authService.currentUser.pipe(take(1)).subscribe(user => {
      if (user) {
        console.log('is the resolver being hit?');
        this.router.navigate(['/home']);
      }
    });
  }
}
