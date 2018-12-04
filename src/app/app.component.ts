import { Component, OnInit } from '@angular/core';
import { PageAnalyticsService } from './core/utils/pageAnalytics.service';

@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {
  /**
   * 생성자이다.
   * 
   * @param pageAnalyticsService 페이지 해석 서비스
   */
  constructor(private pageAnalyticsService: PageAnalyticsService) {
  }

  /**
   * 초기화 한다.
   */
  ngOnInit(): void {
    this.pageAnalyticsService.trackPageViews();
  }
}
