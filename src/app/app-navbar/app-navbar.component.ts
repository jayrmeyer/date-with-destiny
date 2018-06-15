import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService, AuthState } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './app-navbar.component.html',
  styleUrls: ['./app-navbar.component.scss']
})
export class AppNavbarComponent implements OnInit, OnDestroy {

  loggedIn: boolean;
  private authChangeSubscription_: Subscription;

  constructor(private authService_: AuthService) {
    this.authChangeSubscription_ = authService_.authChange.subscribe(
      newAuthState => this.loggedIn = (newAuthState === AuthState.LoggedIn)
    );
   }

  ngOnInit() {
  }

  ngOnDestroy() {
    console.log('unsubscribing from auth change');
    this.authChangeSubscription_.unsubscribe();
  }

  login(): void {
    this.authService_.login();
  }

  logout(): void {
    this.authService_.logout();
  }

}
