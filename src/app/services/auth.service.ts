import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authManager_: BehaviorSubject<AuthState>
    = new BehaviorSubject(AuthState.LoggedOut);
  private authState_: AuthState;
  authChange: Observable<AuthState>;
  token: Token;

  constructor(private http: HttpClient) {
    this.authChange = this.authManager_.asObservable();
   }

  private static loadTokenFromStorage(): Token {
    try {
      const storageToken = localStorage.getItem('authorization');
      if (storageToken) {
        return JSON.parse(storageToken);
      }
    } catch (err) {
      console.log('error loading token from storage ' + err);
      localStorage.removeItem('authorization');
    }
  }

  public static rerouteToAuthPage(): void {
    console.log('rerouting to bungie auth page');
    const loginCheckString = this.randomString(10);
    localStorage.setItem('loginCheckString', loginCheckString);
    const url = environment.bungie.authUrl
      + '?client_id='
      + environment.bungie.clientId
      + '&response_type=code&state='
      + loginCheckString;
    window.location.href = url;
  }

  private static isTokenValid(aToken: Token): boolean {
    const now: number = new Date().getTime();
    return now < aToken.expiration;
  }
  private static randomString(length: number): string {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let text = '';
    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  private static cookToken(token: Token): Token {
    token.inception = new Date().getTime();
    token.expiration = token.inception + (token.expires_in * 1000);
    token.refresh_expiration = token.inception + (token.refresh_expires_in * 1000);

    return token;
  }

  login(): void {
    this.token = AuthService.loadTokenFromStorage();
    if (this.token) {
      this.setAuthState_(AuthState.LoggedIn);
    } else {
      AuthService.rerouteToAuthPage();
    }
  }

  logout(): void {
    this.setAuthState_(AuthState.LoggedOut);
    this.token = null;
    localStorage.removeItem('authorization');
    window.location.href = '/home';
  }

  emitAuthState(): void {
    this.authManager_.next(this.authState_);
  }

  private setAuthState_(newAuthState: AuthState) {
    this.authState_ = newAuthState;
    this.emitAuthState();
  }

  public getTokenFromBungie(code: string, state: string): Observable<Token> {
    const loginCheckString = localStorage.getItem('loginCheckString');
    if (loginCheckString) {
      if (loginCheckString !== state) {
        localStorage.removeItem('loginCheckString');
        throw new Error('State did not match on OAuth call');
      }
    }

    const urlContent = 'client_id=' + environment.bungie.clientId
      + '&grant_type=authorization_code'
      + '&code=' + code;

    return this.http.post<Token>(environment.bungie.apiUrl + 'App/OAuth/Token/', urlContent)
      .pipe(
        tap(res => {
          this.storeToken(<Token>res, true);
          this.setAuthState_(AuthState.LoggedIn);
        })
      );
  }

  private storeToken(token: Token, cook: boolean): void {
    if (cook) {
      AuthService.cookToken(token);
      localStorage.setItem('authorization', JSON.stringify(token));
      this.token = token;
    }
  }
}

export const enum AuthState {
  LoggedIn,
  LoggedOut
}

export interface Token {
  inception: number;
  expiration: number;
  refresh_expiration: number;

  expires_in: number;
  refresh_expires_in: number;

  access_token: string;
  token_type: string;
  refresh_token: string;
  membership_id: string;
}
