
import {
    reuqestService,
    helperService,
    dataService
} from "@services/index"
import { IRequestCustomOptions } from "@services/request"


export type ILoginParams = {
    appId:string,
    code:string
}


export type IUserLocation = {

    longitude: string;
    /**
     * 纬度。
     */
    latitude: string;

}


export type IUserAvatarAndNickName = {
    avatar:string,
    nickName:string
}
export class UserService {

     getAuthCode():Promise<string> {
        return new Promise((resolve,reject) => {
            my.getAuthCode({
                scopes:"auth_base",
                success:(data) => {
                    resolve(data.authCode)
                },
                fail:(err) => {
                    console.error(err)
                    reject();
                }
            })
        })
    }



   async  userLogin(options:IRequestCustomOptions = {}) {
        // 如果有token 了，则不用再登录了

        if (dataService.getData("TOKEN")) return ;

        let appId = helperService.getAppid();
        let authCode = await this.getAuthCode();
        let params:ILoginParams = {
            appId,
            code:authCode
        }
        let res = await reuqestService.fetch({
            url:"/user-api/alipaymini/user/auth",
            data:params,
            options
        })

        let { token , avatar , nickName , userPhone} = res;

       
        let user = {
            avatar,
            nickName,
            userPhone
        }

        dataService.setData("TOKEN",token)
        dataService.assignData("USER",user);

    }


    async getUserInfo(){
        return  reuqestService.fetch({
            url:"/user-api/alipaymini/user/my/info"
        })
    }



    
    getUserData() {
        return dataService.getData("USER") || {}
    }




    haUserAvatar(){
        return !!dataService.getData("USER").avatar
    }


    hasPhone() {
        return !!dataService.getData("USER").userPhone
    }


    getPhoneNumber(){
        return dataService.getData("USER").userPhone
    }
    
}


export const userService = new UserService();