<template>
  <v-sheet :width="width">
    <v-container>
      <!-- 封面 -->
      <v-img
        class="rounded-lg"
        :height="height"
        :src="cover"
      >
        <span style="position: absolute;right: 0;top: 5px;">
          <slot name="topLabel"></slot>
        </span>

        <span style="position: absolute;right: 0;bottom: 5px;">
          <slot name="bottomLabel"></slot>
        </span>
      </v-img>

      <!-- 标题 -->
      <div class="my-1 text-body-1">{{ title }}</div>
      <div class="my-1 grey--text text--lighten-1 text-body-2">{{ subTitle }}</div>
    </v-container>
  </v-sheet>
</template>

<script>
export default {
  name: 'FilmCard',
  data: () => ({

  }),
  props: {
    width: {  // 卡片的宽度
      type: String,
      default: '214'
    },
    height: { // 图像的高度
      type: String,
      default: '280'
    },
    cover: {  // 封面
      type: String,
      require: true
    },
    title: { // 标题
      type: String,
      require: true
    },
    subTitle: { // 副标题
      type: String,
      require: true
    },
    id: { // id
      type: String,
      require: true
    },
    to: { // 跳转
      type: String,
      // require: true
    }
  }
}
</script>

<style lang='less'>
div {
}
</style>
