/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-03-21 15:57:40
 * @LastEditTime: 2022-03-21 15:59:01
 * @Description: test api
 */
import request from '/@/utils/service'

interface Req {
  apiKey: string
  area?: string
  areaID?: string
}
interface Res {
  area: string
  areaCode: string
  areaid: string
  dayList: any[]
}
export const get15DaysWeatherByArea = (data: Req) => {
  return request<Req, Res>({
    url: '/api/zhouxuanyu.com/test',
    method: 'GET',
    data,
  })
}
