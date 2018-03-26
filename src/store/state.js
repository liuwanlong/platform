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
        type: 'div',
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
          backgroundColor: '',
          color: '#000',
          fontSize: '16px',
          lineHeight: '18px',
          textAlign: 'left',
          textIndent: '0px',
          border: 'none'
        },
        attr: '',
        animate: {
          animated: true,
          aniType: 'none',
          duration: '1s',
          delay: '1s',
          time: '1',
          loop: false
        }
      }
    ]
  },

}
