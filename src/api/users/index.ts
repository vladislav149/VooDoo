import {defaultApiInstance} from '@/api'
import URLS from '@/api/URLS'
import type {User} from '@/types'

export default {
  getUsers() {
    return defaultApiInstance.get<Array<User>>(URLS.USERS)
  }
}
