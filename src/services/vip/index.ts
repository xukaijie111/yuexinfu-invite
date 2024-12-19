
import {
    reuqestService,
    helperService
} from "@services/index"

import {
    VIP_PLUGIN_APP_ID
} from "@src/common/const"

export type IOpenCardParams = {
    templateId: string
    platformActivityId?:string
    appId:string
}

export class VipService {


    async getVipActivityDetail() {
        return reuqestService.fetch({
            url: "/vip-api/applet/api/vip/activity/detail",
            options: {
                showToast: false,
                showLoading: false
            }
        })
    }


    async getVipMemeberDetail() {
        return reuqestService.fetch({
            url: "/vip-api/applet/api/vip/member/detail",
            options: {
                showToast: false,
                showLoading: false
            }
        })
    }


    // 调用插件，开通vip卡
    async openVipCard(params: IOpenCardParams) {
        return new Promise((resolve) => {
            my.loadPlugin({
                plugin: `${VIP_PLUGIN_APP_ID}@*`, // 指定要加载的插件 ID 和版本号，为 * 时自动选择版本
                success: () => {
                    const plugin = requirePlugin(`dynamic-plugin://${VIP_PLUGIN_APP_ID}`);
                    // var plugin = requirePlugin("vipPlugin"); // 引用名称需与 app.json 中定义名称相同
         
                     let openParams = {
                         cardParams: {//开卡入参，
                             templateId: params.templateId, // 开卡的卡模板ID
                             templateAppId: helperService.getAppid(), // 卡模板ID 所关联的 AppId
                             joinBenefitId:params.platformActivityId,
                             joinBenefitType:"VOUCHER_MRCH",
                             pageType: 'half',//默认是 half
         
                         },
                         callback: function (res: any) {
                             let { resultCode,success } = res;
                           
         
                             if (success || ~~resultCode === 10000) {
                                 resolve(null)
                             }
                             
                         }
         
                     }
                     plugin.openCard(openParams)
                },
              });
           
   
            });
    }



    getRedPacketDetail(params:any) {

        return reuqestService.fetch({
            url: "/vip-api/applet/red/packet/detail",
            data:params,
            options: {
                showToast: true,
                showLoading: true
            }
        })

    }

}




export const vipService = new VipService();