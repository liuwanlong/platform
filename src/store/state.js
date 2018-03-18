/**
 * Created by gaoying on 2017/9/21.
 */
export default {
  data: {
    name: 'vue-demo',
    type: {
      picture: {
        property: ['width', 'height', 'positionX', 'positionY', 'rotate', 'opacity', 'borderRadius', 'backgroundColor']
      },
      div: {
        property: ['width', 'height', 'positionX', 'positionY', 'rotate', 'opacity', 'borderRadius', 'backgroundColor']
      }
    },
    pages: [
      {
        id: 1,
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
    ]

  },
  status: {
    pageId: 1,
    activeELId: '',
    currentEL: [
      {
        id: '',
        type: '',
        style: {
          position: 'absolute',
          width: '',
          height: '',
          top: '',
          left: '',
          transform: 'rotate(0deg)',
          opacity: 1,
          borderRadius: '',
          backgroundColor: ''
        },
        attr: ''
      }
    ]
  },

}
