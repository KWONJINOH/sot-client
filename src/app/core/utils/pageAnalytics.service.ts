import { Injectable } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Location } from '@angular/common';

import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

declare const ga: any;

const APP_TITLE = 'NoDice!';
const SEPARATOR = ' > ';

/**
 * 페이지 해석 하는 서비스이다.
 * 
 * @author kjo
 */
@Injectable()
export class PageAnalyticsService {
  /**
   * 사용 가능 여부
   */
  private isUse : boolean = false;

  /**
   * 생성자이다.
   * 
   * @param router 라우터
   * @param location 경로
   * @param activatedRoute 활성화 된 라우터
   * @param titleService 타이틀서비스
   */
  constructor(
    private router: Router,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private titleService: Title) {
      // 생성자 초기화 내용
  }

  /**
   * @todo 정확한 함수 역할이 뭔지 파악할것.
   * @param string 문자열
   */
  static ucFirst(string) : void {
    if (!string) {
      return string;
    }

    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  /**
   * 페이지를 이동하면서 제목을 동적으로 처리한다.
   */
  trackPageViews() : void {
    if (this.isUse) {
      this.router.events
        .filter((event) => event instanceof NavigationEnd)
        .map(() => {
          let route = this.activatedRoute;
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        })
        .filter((route) => route.outlet === 'primary')
        .mergeMap((route) => route.data)
        .map((data) => {
          if (data.title) {
            // routing 파일에 data : [title 이름] 타이틀 set
            return data.title;
          }
          else {
            // data 파일에 없으면 임의로 title를 지정한다.
            return this.router.url.split('/').reduce((acc, frag) => {
              if (acc && frag) { 
                acc += SEPARATOR;
              }
              return acc + PageAnalyticsService.ucFirst(frag);
            });
          }
        })
        .subscribe((pathString) => {
          this.titleService.setTitle(`${APP_TITLE} ${pathString}`)
          ga('send', { hitType: 'pageview', page: this.location.path() });
        });
    }
  }

  // trackPageViews() {
  //   if (this.enabled) {
  //     this.router.events.pipe(
  //       filter((event) => event instanceof NavigationEnd)
  //     )
  //     .subscribe((event) => {
  //       ga('send', {hitType: 'pageview', page: this.location.path()});
  //     });
  //   }
  // }

  /**
   * 이벤트를 보낸다.
   * 
   * @param eventName 이벤트 이름
   */
  trackEvent(eventName: string) : void {
    if (this.isUse) {
      ga('send', 'event', eventName);
    }
  }
}
