/**
 * 모듈을 한번더 호출 하였으면 예외를 던진다.
 * 
 * @function throwModuleAlreadyLoaded
 * @param parentModule 부모 모듈
 * @param moduleName 모듈 이름
 * @throws { Error } 이미 로드 되었습니다. AppModule에서만 핵심적인 모듈을 가져옵니다.
 */
export function throwModuleAlreadyLoaded(parentModule: any, moduleName: string) : void {
    if (parentModule) {
        throw new Error(`${moduleName} 이미 로드 되었습니다. AppModule에서만 핵심적인 모듈을 가져옵니다.`);
    }
}