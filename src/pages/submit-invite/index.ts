import { aPage } from '@morjs/core'

import {
    merchantService
} from "../../services"

import _ from "../../common/lodash"

aPage({
    
    data: {

        form : {

            businessType:"",
            name:"",
            phone:"",
            storeNumRange:""
        },


        businessTypes:[
            {
                key : "BEAUTY",
                name :"美业"
            },
            {
                key : "FITNESS",
                name :"健身"
            },
            {
                key : "PET",
                name :"宠物"
            },
            {
                key : "EDU",
                name :"教培"
            },
            {
                key : "OTHER",
                name :"其他"
            }
        ],

        businessTypeIndex:null,

        storeNumRangeIndex:null,

        storeNumRanges:[
            
            {
                key:"RANGE_1_5",
                name :"1~5"
            },
            {
                key:"RANGE_6_10",
                 name :"6~10"
            },
            {
                key:"RANGE_11_50",
                 name :"11~50"
            },
            {
                key:"RANGE_51_100",
                 name :"51~100"
            },
            {
                key:"RANGE_101_500",
                 name :"101~500"
            },
            {
                key:"RANGE_501_1000",
                 name :"501~1000"
            },

            {
                key:"RANGE_GT_1000",
                 name :"1000以上"
            }
        ]
        
    },

    onBusinessTypeChange(e:any) {

        this.setData({
            businessTypeIndex: e.detail.value,
          });
    },

    onStoreNumRangeChange(e:any) {
        this.setData({
            storeNumRangeIndex: e.detail.value,
          });

    },

    onInputName(e:any) {
        this.setData({
            ['form.name']: e.detail.value,
          });
    },
    onInputPhone(e:any) {
        this.setData({
            ['form.phone']: e.detail.value,
          });
    },


    async onSubmit() {

        let { form,
            businessTypes,
            storeNumRanges,
            businessTypeIndex,storeNumRangeIndex } = this.data

        form = _.cloneDeep(form);
        let { name,phone  } = form

        if (!name) {
            return my.showToast({
                content:"请输入姓名",
                type:"none"
            })
        }
        if (!phone) {
            return my.showToast({
                content:"请输入手机号",
                type:"none"
            })
        }
        if (businessTypeIndex ===null) {
            return my.showToast({
                content:"请选择行业",
                type:"none"
            })
        }
        if (!storeNumRangeIndex === null) {
            return my.showToast({
                content:"请选择门店数量",
                type:"none"
            })
        }

        //@ts-ignore
        form.businessType = businessTypes[businessTypeIndex].key;
         //@ts-ignore
        form.storeNumRange = storeNumRanges[storeNumRangeIndex].key;


        await merchantService.applyEnter(form);

         my.showToast({
            content:"提交成功",
            type:"none"
        })

        setTimeout(() => {
            my.navigateBack()
        }, 1000);
    }
})