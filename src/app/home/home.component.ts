import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';

import { BungieService } from '../services/bungie.service';
import { GeneralUser, UserInfoCard } from '../models/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  searchString: string;
  membershipType: number;
  msg = '';
  resultUser: UserInfoCard[];
  searchResults = new MatTableDataSource();
  displayedColumns = ['membershipId', 'displayName', 'profilePicturePath', 'lastUpdate'];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private bungieService: BungieService) { }

  ngOnInit() {
    this.searchResults.paginator = this.paginator;

    this.searchString = localStorage.getItem('searchString');
    this.membershipType = + localStorage.getItem('membershipType');
  }

  search(): void {
    if (!this.searchString || this.searchString === '') { return; }
    if (!this.membershipType || this.membershipType === 0) { return; }

    localStorage.setItem('searchString', this.searchString);
    localStorage.setItem('membershipType', this.membershipType.toString());

    this.bungieService.searchDestinyPlayer(this.membershipType, this.searchString).subscribe(res => {
      this.resultUser = <UserInfoCard[]>res.Response;
      console.log(this.resultUser);
      if (this.resultUser.length === 0) {
        this.msg = 'User not found';
      } else {
        this.msg = '';
      }
    });
  }

  clear(): void {
    this.searchString = '';
    localStorage.removeItem('searchString');
    this.membershipType = 0;
    localStorage.removeItem('membershipType');
  }

}
