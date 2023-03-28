<template>
  <v-list-item three-line :to="`/blog-content/${id}`">
    <!-- 博客的标题、简介、作者（头像、昵称、发布时间、浏览量、点赞量、评论量） -->
    <v-list-item-content>
      <!-- 标题 -->
      <v-list-item-title class="font-weight-black">{{ title }}</v-list-item-title>
      <!-- 简介 -->
      <v-list-item-subtitle>{{ desc }}</v-list-item-subtitle>
      <!-- 作者（头像、昵称、发布时间、浏览量、点赞量、评论量） -->
      <v-list-item-subtitle class="text-caption">
        <!-- 头像 -->
        <v-avatar
          size="30"
          class="mr-3"
        >
          <v-img :src="headPic"></v-img>
        </v-avatar>

        <!-- 昵称 -->
        <span class="mr-5">{{ nickname }}</span>

        <!-- 发布时间 -->
        <span class="mr-5">{{ time }}</span>

        <!-- 浏览量 -->
        <div
          class="d-inline-block  mr-3"
          c
        >
          <v-icon
            size="18"
            class="mr-1 "
          >mdi-eye</v-icon>{{ eye | numFormat }}
        </div>

        <!-- 点赞量 -->
        <div class="d-inline-block mr-3 red--text">
          <v-icon
            size="18"
            class="mr-1"
            color="red"
          >mdi-thumb-up</v-icon>{{ like | numFormat }}
        </div>

        <!-- 评论量 -->
        <div class="d-inline-block blue--text">
          <v-icon
            size="18"
            class="mr-1"
            color="blue"
          >mdi-message-text</v-icon>{{ comment | numFormat }}
        </div>
      </v-list-item-subtitle>
    </v-list-item-content>

    <!-- 博客的封面 -->
    <v-list-item-avatar
      tile
      width="160"
      height="90"
      class="rounded-lg"
    >
      <v-img :src="cover"></v-img>
    </v-list-item-avatar>
  </v-list-item>
</template>

<script>
export default {
  name: 'BlogCard',
  props: {
    id: { // 编号
      type: Number,
      require: true
    },
    title: { // 标题
      type: String, require: true
    },
    desc: { // 简介
      type: String, default: ''
    },
    time: { // 发布时间
      type: String, require: true
    },
    eye: { // 浏览量
      type: Number, default: 0
    },
    like: { // 点赞量
      type: Number, default: 0
    },
    comment: { // 评论量
      type: Number, default: 0
    },
    cover: { // 封面
      type: String, require: true
    },
    nickname: { // 作者昵称
      type: String, require: true
    },
    headPic: { // 作者头像地址
      type: String, require: true
    },
    to:{  // 跳转的目标路由
      type: String
    }
  }
}
</script>

<style lang='less'>
</style>
