import qs from "qs"

import {
    isEmpty
} from "../../common/util"

import {
    dataService,

} from "@services/data/index"


import {
    BASE_URL
} from "@src/common/const"



import _ from "@src/common/lodash"


export type IRequestCustomOptions = {
    showToast?: boolean;
    showLoading?:boolean
};
export type IFetchParams = {

    url: string,
    data?: Record<any, any>,
    method?: "GET" | "POST",
    headers?: Record<any, any>,
    query?: Record<string, string>,
    options?: IRequestCustomOptions;
}


export type IResponse = {
    data: any,
    errorCode: string
    errorMsg: string
    status: number,
    success: boolean
}

let defaultParams = {
    enableHttp2: true,
    enableQuic: true,
    method: "POST",
    mode: "cors",
    options: {
        showToast: true,
    }
};

export class ReuqestService {
    hooks: Record<any, any>;
    constructor() {

        this.hooks = {
            beforeRequest: [],
            successRequest: [],
            failRequest: []
        };
        this.initHooks();
    }


    addHook(name: string, fn: Function) {
        if (!this.hooks[name]) return;
        let hooks = this.hooks[name];
        if (hooks.indexOf(fn) !== -1) return;
        hooks.push(fn);
    }

    async callHook(name: string, ...args: any) {
        let hooks = this.hooks[name];

        if (!hooks || !hooks.length) return;

        for (let processor of hooks) {
            await processor(...args);
        }
    }

    initHooks() {
        this.addHook("beforeRequest", this.addDefaultHeaderAndUrl);

        this.addHook("beforeRequest", this.addLoading);

        this.addHook("failRequest", this.showToastCheck);
        this.addHook("failRequest", this.failRequest);

    }

    addLoading = async (params: IFetchParams) => {
        let { options = {} } = params;
        if (options.showLoading) {
           my.showLoading();
        }
    };

    failRequest = async (res: Record<any, any>, params: IFetchParams) => {
        console.error(res, params);
    };



    showToastCheck = async (res: Record<any, any>, params: IFetchParams) => {
        let { options = {} } = params;
        if (options.showToast && res && !res.success && res.errorMsg) {
            my.showToast({
                content: res.errorMsg
            });
        }
    };

    addDefaultHeaderAndUrl = (params: IFetchParams) => {

        let {
            url,
            query = {},
            headers = {}
        } = params

        let defaultHeaders = {
            'content-type': 'application/json',
            "X-client": "MINI"
        };

        headers = {
            ...headers || {},
            ...defaultHeaders
        };

        const token = dataService.getData("TOKEN");
        if (token) {
            headers.Authorization = `Bearer ${token}`
        }
        params.headers = headers;


        let baseUrl = BASE_URL;

        url = `${baseUrl}${url}`;
        if (!isEmpty(query)) {
            url = `${url}?${qs.stringify(query)}`
        }
        params.url = url;

    };

    async fetch(params: IFetchParams) {


        let rawParams = _.cloneDeep(params);

        params = Object.assign({}, defaultParams , params )
        await this.callHook("beforeRequest", params);

        let options = {
            ...params
        };

        try {
            let res: Record<any, any> = await my.request(options);
            my.hideLoading();

            let { data, status } = res;
            if (data && [200, 201].includes(~~status) && data.success) {
                await this.callHook("successRequest", data, options);
                return data.data;
            } else {
                await this.callHook("failRequest", data, options , rawParams);

                // 可能是token 失效,重新请求,重新封装data;
                return data.success ? data.data :   Promise.reject(data);
               
            }

        } catch (err) {
            console.error(err);
            return Promise.reject(err);
        }






    }

}


export const reuqestService = new ReuqestService();