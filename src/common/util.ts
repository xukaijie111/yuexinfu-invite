


export function isEmpty(obj:any = {}) {
    for (let key in obj) {
        return false
    }
    return true
}





  
  /**
   * 货币分转元辅助函数
   * @param {number|string} value
   * @param {number?} digit
   * @return {string|number}
   */
  export function toYuan(value:any) {
   if (!value) return "0";
   let label = "0"
   if (value % 100 === 0) {
    label = (value*0.01).toFixed(0)
   }else if (value % 10 === 0) {
    label = (value*0.01).toFixed(1)
   }
   else  {
    label = (value*0.01).toFixed(2)
   }

   return label
  }
  



  export function formatAnyToPrice(value:any) {
    //正则验证金额输入框格式
    value = value.replace(/^(\-)*(\d+)\.(\d{6}).*$/, '$1$2.$3');
    value = value.replace(/[\u4e00-\u9fa5]+/g, ''); //清除汉字
    value = value.replace(/[^\d.]/g, ''); //清楚非数字和小数点
    value = value.replace(/^\./g, ''); //验证第一个字符是数字而不是
    value = value.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.'); //只保留第一个小数点, 清除多余的
    return value;
  }