import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  //.
  isLoading = false;
  authStatusSubscription: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authStatusSubscription = this.authService
      .getAuthStatusListener()
      .subscribe((authStatus) => {
        this.isLoading = false;
      });
  }

  onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.authService.login(form.value.email, form.value.password);
    this.isLoading = true;
  }

  ngOnDestroy() {
    this.authStatusSubscription.unsubscribe();
  }
}
