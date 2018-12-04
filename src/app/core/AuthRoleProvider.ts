import { NbRoleProvider } from "@nebular/security";
import { of as observableOf } from 'rxjs';

/**
 * 사용자 권한 제공 클래스이다.
 * 
 * @author kjo
 * @class AuthRoleProvider
 */
export class AuthRoleProvider extends NbRoleProvider {
    getRole() {
        /**
         * @description 추가되는 인증 권한을 작성한다.
         * @todo 인증 추가 될 경우... 사용법 확인후 작성...
         */
        return observableOf('guest');
    }
}