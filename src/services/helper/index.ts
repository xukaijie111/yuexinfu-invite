

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

    extSyncConifg: any
    getSystemInfoSync() {
        return my.getSystemInfoSync();
    }


    getExtConfigSync(): Record<any, any> {
        if (this.extSyncConifg) return this.extSyncConifg
        console.log(`ext config is`, my.getExtConfigSync())
        return (this.extSyncConifg = my.getExtConfigSync()) || {}
    }

    getBaseUrl() {
        return this.getExtConfigSync().baseUrl;
    }
   

    getAppid() {
        return my.getAppIdSync().appId 
    }


}



export const helperService = new HelperService();