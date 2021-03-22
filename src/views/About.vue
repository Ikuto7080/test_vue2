<template lang="pug">
  div 
    v-app
      v-navigation-drawer(app v-model='drawer')
        v-list-item
          v-list-item-title.title
            | Application
          v-btn(icon)
            v-icon 
              | mdi-chevron-left
        v-divider
          v-list(nav)
            v-list-item(v-for='menu in menus' :key='menu.title' :to='menu.url')
              v-list-item-icon
                v-icon 
                  | {{ menu.icon }}
              v-list-item-content
                v-list-item-title 
                  | {{ menu.title }}
      v-app-bar(app)
        // アプリケーションバー
        v-app-bar-nav-icon(@click.stop='drawer = !drawer')
      v-content
        router-view
      v-footer(app='')
        // フッター
    


  </v-app>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    drawer: false,
    menus: [
      { title: 'Index', icon: 'mdi-web', url: '/' },
      { title: 'Home', icon: 'mdi-home', url: '/home' },
      { title: 'Favorites', icon: 'mdi-heart', url: '/favorites' },
      { title: 'About', icon: 'mdi-information-variant', url: '/about' }
    ]
  })
}
</script>

<style>
v-navigation-drawer{
    background-color: blue;
}
</style>
