import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbAuthModule, NbDummyAuthStrategy } from '@nebular/auth';
import { NbSecurityModule, NbRoleProvider } from '@nebular/security';

import { DataModule } from './data/data.module';
import { PageAnalyticsService } from './utils/pageAnalytics.service';
import { AuthRoleProvider } from './AuthRoleProvider';
import { throwModuleAlreadyLoaded } from './ModuleImportGuard';

const socialLinks = [
    {
        url: 'https://github.com/KWONJINOH',
        target: '_blank',
        icon: 'socicon-github',
    },
];

export const SOT_CORE_PROVIDERS = [
    // 목업데이터
    ...DataModule.forRoot().providers,
    /**
     * @todo Java 인증 구현 완료 되기전에 임시방편으로 사용.
     */
    ...NbAuthModule.forRoot({
        strategies: [
            NbDummyAuthStrategy.setup({
                name: 'email',
                delay: 3000,
            }),
        ],
        forms: {
            login: {
                socialLinks: socialLinks,
            },
            register: {
                socialLinks: socialLinks,
            },
        },
    }).providers,

    /**
     * @todo 클라이언트에서 사용 가능한 시큐리티 목록(필요한 기능 맞춰서 사용 할 것)
     * @see https://akveo.github.io/nebular/docs/security/introduction#security-
     */
    NbSecurityModule.forRoot({
        accessControl: {
            guest: {
                view: '*',
            },
            user: {
                parent: 'guest',
                create: '*',
                edit: '*',
                remove: '*',
            },
        },
    }).providers,

    {
        provide: NbRoleProvider, useClass: AuthRoleProvider,
    },
    PageAnalyticsService,
];

@NgModule({
    imports: [
        CommonModule,
    ],
    exports: [
        NbAuthModule,
    ],
    declarations: [],
})
export class CoreModule {
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        throwModuleAlreadyLoaded(parentModule, 'CoreModule');
    }

    static forRoot(): ModuleWithProviders {
        return <ModuleWithProviders>{
            ngModule: CoreModule,
            providers: [
                ...SOT_CORE_PROVIDERS,
            ],
        };
    }
}
