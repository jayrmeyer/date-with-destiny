import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  msg: string;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService) { }

  ngOnInit() {
    let code = '';
    let state = '';
    this.route.queryParams.forEach((params: Params) => {
      code = params['code'];
      state = params['state'];
    });

    this.msg = 'Authenticating with Bungie...';
    if (code) {
      this.authService.getTokenFromBungie(code, state).subscribe(
        res => {
          this.msg = 'Success';
          this.router.navigate(['/home']);
        },
        err => {
          this.msg = JSON.stringify(err);
          console.error(err);
        }
      );
    }
  }

}
