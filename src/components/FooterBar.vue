<template>
  <v-container class="text-center">
    <v-chip label small color="transparent" v-for="link in footerLinks" :key="link.id">{{ link.text }}</v-chip>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    // 页脚链接
    footerLinks: []
  }),
  methods: {// 获取页脚链接
    getFooterLinks () {
      // 请求服务器  -->  获取  -->  获取页脚链接
      this.footerLinks = [
        { id: 1, text: '增值电信业务经营许可证：合字B2-20090007', to: '' },
        { id: 2, text: '京ICP备10036305号-7', to: '' },
        { id: 3, text: '京公网安备11010802022657号', to: '' },
        { id: 4, text: '隐私声明和 Cookie', to: '' },
        { id: 5, text: '法律声明', to: '' },
        { id: 6, text: '广告', to: '' },
        { id: 7, text: '帮助', to: '' },
        { id: 8, text: '反馈', to: '' },
        { id: 9, text: '© 2022 Microsoft', to: '' },
      ]
    },
  },
  created () {
    // 获取页脚链接
    this.getFooterLinks()
  }
}
</script>

<style lang='less'>
</style>
