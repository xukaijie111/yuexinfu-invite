

export type IDataKey = "STORE" | "TOKEN" | "MERCHANT" | "USER"


export class DataService {

        data:Record<any,any>

        constructor(){
            this.data = { }
        }


        assignData(key:IDataKey,value:any) {
            let current = this.getData(key) || {}
            Object.assign(current,value)
            this.setData(key,current);
        }

        setData(key:IDataKey,value:any) {
            this.data[key] = value
        }

        getData(key:IDataKey) {
            return this.data[key]
        }

}


export const dataService = new DataService();