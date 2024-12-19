import { defineConfig } from '@morjs/cli'

import Path from "path"

const commonAlias = {

  "@services":Path.resolve(__dirname,"./src/services"),
  "@src":Path.resolve(__dirname,"./src")

}

export default defineConfig([
  {
    name: 'alipay-miniprogram',
    sourceType: 'alipay',
    target: 'alipay',
    compileType: 'miniprogram',
    alias:commonAlias,
    compileMode: 'bundle'
  },
  
  
])
