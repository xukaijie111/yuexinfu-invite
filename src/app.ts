import { aApp } from '@morjs/core'

import {
    userService
} from "@services/index"

aApp({


  onLaunch(){


    userService.userLogin()
  }
  

 
})
