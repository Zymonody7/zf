<template>
  <!-- 应用栏容器 -->
  <v-container fluid>
    <!-- 应用栏菜单选项 -->
    <v-tabs
      centered
      slider-size="4"
      :value="tabValue"
    >
      <v-tab
        v-for="tab in tabMenus"
        :key="tab.id"
        :to="tab.href"
      >{{ tab.name }}</v-tab>
    </v-tabs>

    <!-- 登录按钮 -->
    <v-btn
      absolute
      right
      top
      text
      class="mr-16"
      @click="showLoginRegisterDialog"
    >
      登录
    </v-btn>

    <!-- 登录注册的对话框 -->
    <LoginRegisterDialog></LoginRegisterDialog>
  </v-container>
</template>

<script>
import LoginRegisterDialog from '@/components/LoginRegisterDialog.vue'
import eventBus from '@/utils/eventBus'

export default {
  data: () => ({
    // 选项值
    tabValue: null,
    // 应用栏菜单数据
    tabMenus: [],
  }),
  components: {
    LoginRegisterDialog
  },
  methods: {
    // 显示登录注册对话框
    showLoginRegisterDialog () {
      eventBus.$emit('showLoginRegisterDialog', true)
    },
    // 获取应用栏菜单
    getAppBarMenus () {
      // 请求服务器  -->  获取  -->  获取应用栏菜单
      this.tabMenus = [
        { id: 1, name: '首页', href: '/' },
        { id: 2, name: '博客', href: '/blog' },
        { id: 3, name: '学堂', href: '/school' },
        { id: 4, name: '影音', href: '/film' },
        { id: 5, name: '考证', href: '/exam' },
      ]
    }
  },
  created () {
    // 获取应用栏菜单
    this.getAppBarMenus()
    // 
    eventBus.$on('changeTab', tabValue => {
      this.tabValue = tabValue
    })
  }
}
</script>

<style lang='less'>
</style>
