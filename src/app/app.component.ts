import { Component, OnInit } from '@angular/core';

import { DestinyCacheService } from './services/destiny-cache.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'A Date With Destiny';

  constructor(private destinyCacheService: DestinyCacheService) {}

  ngOnInit(): void {
    console.log('in AppComponent.ngOnInit, about to load cache');
    this.destinyCacheService.init().then(() => {
      console.log('in AppComponent.ngOnInit, cache loaded');
    });
  }
}
