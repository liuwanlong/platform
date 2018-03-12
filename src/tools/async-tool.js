/**
 * Created by gaoying on 2017/10/31.
 */


import Vue from 'vue';
export function get(url, [options] = []) {
  return Vue.http.get(url, [options]);
}

export function post(url,param) {
  return Vue.http.post(url,param,{emulateJSON:true});
}
