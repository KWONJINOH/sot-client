import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-login',
  template: 'login.component.html',
  styleUrls: ['./login.component.scss']
})

/**
 * 로그인 컴포넌트이다.
 * 
 * @class LoginComponent
 */
export class LoginComponent implements OnInit {
    /**
     * 사용자 식별자
     */
    userId: string = "";

    /**
     * 사용자 패스워드
     */
    userPw: string = "";

    /**
     * 생성자이다.
     */
    constructor() {

    }

    /**
     * 초기화한다.
     */
    ngOnInit(): void { 
      
    }

    /**
     * 사용자 로그인을 실행한다.
     * 
     * @param userId 
     * @param userPw 
     */
    doLogin(userId: string, userPw: string): void {

    } 
}