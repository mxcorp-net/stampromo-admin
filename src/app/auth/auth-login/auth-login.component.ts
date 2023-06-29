import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.scss']
})
export class AuthLoginComponent implements OnInit {
  // TODO: corregir datalles visuales en formulario

  email: string;
  password: string;
  callback: string;
  error = '';

  constructor(
      private authService: AuthService,
      private route: ActivatedRoute,
      private router: Router
  ) {
    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.callback = this.route.snapshot.queryParams['callback'] || '/';
  }

  onSubmit() {
    this.authService.login(this.email, this.password)
        .pipe()
        .subscribe(
            data => {
              this.router.navigate([this.callback]);
            },
            error => {
              console.log(error);
              this.error = error.message;
            });
  }
}
