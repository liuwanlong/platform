/**
 * Created by gaoying on 2017/10/31.
 */

import { get, post } from '../tools/async-tool'


export function getProject (param, cb) {
  get('/api/getProject/' + param).then(res => {
    cb(res)
  })
}

export function getProjects (cb) {
  get('/api/getProjects/').then(res => {
    cb(res)
  })
}

export function addProject (param, cb) {
  post('/api/new', param).then(res => {
    cb(res)
  })
}

export function setProject (param, cb) {
  post('/api/set', param).then(res => {
    cb(res)
  })
}
export function delProject (param, cb) {
  post('/api/del', param).then(res => {
    cb(res)
  })
}
