/**
 * Created by gaoying on 2017/9/21.
 */

export const name = state => state.data.name
export const pageId = state => state.status.pageId
export const page = state => state.data.pages[state.status.pageId - 1]
export const pages = state => state.data.pages
export const activeELId = state => state.status.activeELId
export const currentEL = state => state.status.currentEL.find(c => c.id === state.status.activeELId)
