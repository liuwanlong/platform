/**
 * Created by gaoying on 2017/10/31.
 */

import { get } from "../tools/async-tool";

export function getData(cb) {
  let url = 'http://10.132.20.14:8083/mockjsdata/62/getData';
  return get(url);
}