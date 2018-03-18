/**
 * Created by gaoying on 2017/9/21.
 */
export default {

  setName (state, param) {
    state.data.name = param
  },

  setPageId (state, param) {
    state.status.pageId = param
  },

  addPage (state, param) {
    let page = {
      id: state.data.pages.length + 1,
      style: {
        backgroundColor: '',
        backgroundImage: '',
        backgroundSize: '100% 100%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        opacity: 100,
      },
      children: []
    }
    state.data.pages.push(page)
    state.status.pageId = page.id
  },

  setPage (state, param) {
    state.status.pageId = param
  },

  setPageStyle (state, param) {
    let page = state.data.pages.find(p => p.id === param.id)
    if (page) {
      page.style[param.type] = param.val
    }
  },

  addChild (state) {
    state.data.pages[state.status.pageId - 1].children.push({
      id: +new Date(),
      type: 'div',
      style: {
        position: 'absolute',
        top: '100px',
        left: '100px',
        width: '150px',
        height: '150px',
        transform: '',
        transformRotate: 360,
        opacity: 1,
        borderRadius: '0px',
        backgroundColor: 'tomato'
      },
      attr: {
        text: '',
      }
    })
  },

  removeChild (state) {
    let activeChildren = state.data.pages[state.status.pageId - 1].children
    activeChildren.splice(activeChildren.findIndex(child => child.id === state.status.activeELId), 1)
  },

  setELPosition (state, param) {
    let actEl = state.data.pages[state.status.pageId - 1].children.find(child => child.id == param.id)
    actEl.style.left = param.left
    actEl.style.top = param.top
  },

  setCurrentEL (state, param) {
    state.status.activeELId = param
    let item = state.data.pages[state.status.pageId - 1].children.find(child => child.id === param)
    let flag = state.status.currentEL.find(c => c.id === item.id)
    if (flag === undefined) {
      state.status.currentEL.push(item)
    }
  },

  setELStyle (state, param) {
    let item = state.data.pages[state.status.pageId - 1].children.find(child => child.id === param.id)
    if (item) {
      item.style[param.type] = param.val
    }
  },

}
