import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { SearchUsersResponse, BungieServiceResponse } from '../models/service.responses';

@Injectable({
  providedIn: 'root'
})
export class BungieService {

  constructor(private http: HttpClient) { }

  /*
    Can't figure out how to get more than 25 results.  Makes this hard
    to use
  */
  searchUsers(searchString: string): Observable<SearchUsersResponse> {
    const params = new HttpParams().set('q', searchString);
    return <Observable<SearchUsersResponse>>this.http.get(environment.bungie.apiUrl + 'User/SearchUsers/', {params});
  }

  searchDestinyPlayer(membershipType: number, displayName: string): Observable<BungieServiceResponse> {
    const urlContent =
      environment.bungie.apiUrl +
      '/Destiny2/SearchDestinyPlayer/' +
      membershipType + '/' +
      displayName + '/';

    return <Observable<BungieServiceResponse>>this.http.get(urlContent);
  }
}
