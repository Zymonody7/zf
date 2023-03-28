<template>
  <v-app>
    <!-- 应用栏 -->
    <v-app-bar
      app
      color="#fff"
    >
      <!-- 使用 HeadBar 组件 -->
      <headBar></headBar>
    </v-app-bar>

    <v-main>
      <!-- 路由占位符 -->
      <router-view></router-view>
    </v-main>

    <!-- 网页页脚 -->
    <v-footer>
      <!-- 使用 FooterBar 组件 -->
      <footerBar></footerBar>
    </v-footer>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
  })
};
</script>
