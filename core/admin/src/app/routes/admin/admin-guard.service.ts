import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../../shared/services/auth.service';
import { UserApiService } from '../../shared/http/user-api.service';

@Injectable()
export class AdminGuardService implements CanActivate {

  constructor(
    private router: Router,
    private userApiService: UserApiService,
    private authService: AuthService,
  ) { }

  canActivate(): Observable<boolean> {
    return this.userApiService.getMe().pipe(map((user) => {
      this.authService.changeUser(user);
      if (this.authService.isSigned()) {
        return true;
      } else {
        this.router.navigate(['/admin/login']);
        return false;
      }
    }));
  }
}
