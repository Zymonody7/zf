<template>
  <v-container
    class="pa-0 mb-4 white rounded overflow-hidden elevation-3"
    style="position: relative;"
  >
    <!-- 图片 -->
    <v-img
      v-if="id == 771055394"
      src="../../assets/images/SchoolVideo/vue3.0.jpg"
    ></v-img>
    <v-img
      v-else
      src="../../assets/images/SchoolVideo/vuex.jpg"
    ></v-img>

    <!-- 标题 -->
    <p class="my-3 px-3 text-body-1 black--text showARow">{{ title }}</p>

    <!-- 标签(发布时间、播放量) -->
    <div class="px-3 pb-4 d-flex justify-space-between">
      <v-chip
        class="pa-0 grey--text "
        color="transparent"
      >
        <v-icon>mdi-clock-time-one-outline</v-icon>
        {{ pubdate | timeFormat }}
      </v-chip>
      <v-chip
        class="pa-0 grey--text "
        color="transparent"
      >
        <v-icon>mdi-play-circle-outline</v-icon>
        {{ stat.view | numFormat }}
      </v-chip>
    </div>

    <!-- 视频时长 -->
    <v-chip
      label
      dark
      class="rounded-0"
      style="position: absolute; right: 10px; top: 126px; background-color: rgba(0,0,0,.2);"
    >{{ duration | durationFormat }}</v-chip>
  </v-container>
</template>

<script>
export default {
  name: 'SchoolVideoRecommend',
  data: () => ({}),
  props: {
    id: {
      type: Number,
      required: true
    },
    pic: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    // 发布时间
    pubdate: {
      type: Number,
      required: true
    },
    // 视频时长
    duration: {
      type: Number,
      required: true
    },
    // 作者
    owner: {
      type: Object,
      required: true
    },
    // 统计数据
    stat: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang='less'>
li {
}
</style>
