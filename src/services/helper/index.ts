

type IButtonPosition = {
    width: number,
    height: number,
    top: number,
    right: number,
    left: number,
    bottom: number,
}

export type ILeftButtons = {
    backButtonIcon: IButtonPosition

}

export type IOpenLocParams = {
    latitude: number,
    longitude: number,
    name: string,
    address: string
}

export class HelperService {


    getSystemInfoSync() {
        return my.getSystemInfoSync();
    }

   

    getAppid() {
        return my.getAppIdSync().appId 
    }


}



export const helperService = new HelperService();