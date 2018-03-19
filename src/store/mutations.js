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

  addPage (state) {
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

  removePage (state) {
    let pages = state.data.pages
    let pageId = state.status.pageId
    if (pages.length === 1) {
      return
    } else {
      pages.splice(pages.findIndex(p => p.id === pageId), 1)
      pages.map((p, i) => {
        p.id = i + 1
      })
      pageId--
    }

  },
  sortUp (state) {
    let pages = state.data.pages
    let pageId = state.status.pageId
    if (pageId === 1) {
      return
    } else {
      let item = pages[pageId - 1]
      pages[pageId - 1] = pages[pageId - 2]
      pages[pageId - 2] = item
      pages.map((p, i) => {
        p.id = i + 1
      })
      state.status.pageId = pageId - 1
    }
  },

  sortDown (state) {
    let pages = state.data.pages
    let pageId = state.status.pageId
    if (pageId === pages.length) {
      return
    } else {
      let item = pages[pageId - 1]
      pages[pageId - 1] = pages[pageId]
      pages[pageId] = item
      pages.map((p, i) => {
        p.id = i + 1
      })
      state.status.pageId = pageId + 1
    }
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
        zIndex: state.data.pages[state.status.pageId - 1].children.length + 1,
        top: '100px',
        left: '100px',
        width: '150px',
        height: '150px',
        transform: '',
        transformRotate: 360,
        opacity: 1,
        borderRadius: '0px',
        backgroundColor: '#ff6347'
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

  upIndex (state) {
    let item = state.data.pages[state.status.pageId - 1].children.find(child => child.id === state.status.activeELId)
    if (item) {
      item.style.zIndex++
    }
  },
  downIndex (state) {
    let item = state.data.pages[state.status.pageId - 1].children.find(child => child.id === state.status.activeELId)
    if (item) {
      item.style.zIndex--
    }
  }

}
