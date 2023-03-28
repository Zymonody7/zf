<template>
  <!-- 视频卡片 -->
  <v-list-item class="px-0">
    <!-- 视频封面 -->
    <v-list-item-avatar width="200" height="120" tile>
      <v-img class="rounded-lg" :src="cover"></v-img>
    </v-list-item-avatar>

    <!-- 视频介绍 -->
    <v-list-item-content class="align-self-start">
      <!-- 视频介绍的标题 -->
      <v-list-item-title class="font-weight-black">{{ title }}</v-list-item-title>

      <!-- 副标题(新、热门标签、发布时间) -->
      <v-list-item-subtitle>
        <!-- new -->
        <v-chip small color="success" class="font-weight-black font-italic rounded-0" v-if="is_new">NEW</v-chip>
        <!-- hot -->
        <v-chip small color="warning" class="mx-2 font-weight-black font-italic rounded-0" v-if="is_hot">HOT</v-chip>
        <!-- 发布时间 -->
        <span>更新于：{{ time }}</span>
      </v-list-item-subtitle>

      <!-- 特点介绍 -->
      <div class="line__3 text-caption grey--text text--lighten-1" v-html="desc"></div>
    </v-list-item-content>

    <!-- 学习 -->
    <v-list-item-action>
      <div class="text-center">
        <span class="text-caption grey--text text--lighten-1 ">{{ studyCount | numFormat }}人已学</span><br />
        <v-btn small block rounded color="info" :to="'/school-video-play/' + id">开始学习</v-btn>
      </div>
    </v-list-item-action>
  </v-list-item>
</template>

<script>
export default {
  name: 'School',
  props: {
    // ID
    id: {
      type: Number,
      required: true
    },
    // 封面
    cover: {
      type: String,
      required: true
    },
    // 视频标题
    title: {
      type: String,
      required: true
    },
    // new 标签
    is_new: {
      type: Boolean,
      default: false
    },
    // hot 标签
    is_hot: {
      type: Boolean,
      default: false
    },
    // 发布时间
    time: {
      type: String,
      required: true
    },
    // 描述
    desc: {
      type: String,
      required: true
    },
    // 学习人数
    studyCount: {
      type: Number,
      required: true
    }
  }
}
</script>

<style lang='less' scoped>
.line__3 {
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
</style>
