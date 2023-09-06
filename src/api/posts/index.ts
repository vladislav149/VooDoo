import {defaultApiInstance} from '@/api'
import URLS from '@/api/URLS'
import type {Post} from '@/types'

export default {
  getPosts() {
    return defaultApiInstance.get<Array<Post>>(URLS.POSTS)
  }
}
