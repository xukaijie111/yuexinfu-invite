
import {
    reuqestService,
} from "../request/index"
import _ from "@src/common/lodash"


export class MerchantService {

    
    applyEnter(params:any) {
        return  reuqestService.fetch({
            url:"/user-api/alipaymini/merchant/enter/apply",
            data:params,
            options:{
                showLoading:true,
                showToast:true
            }
        })
       
    }

}



export const merchantService = new MerchantService();