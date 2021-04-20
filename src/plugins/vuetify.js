import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify);



export default new Vuetify({
    theme: {
        themes: {
          light: {
            primary: '#D82E4A',
            secondary: '#000000',
            accent: colors.blue,
            error: colors.red,
          },
        },
  },
  icons: {
    iconfont: 'mdiSvg'
  }
});
