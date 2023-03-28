<template>
  <div>
    <!-- 视差背景图 -->
    <v-parallax
      :src="homeBackPic"
      height="600"
    >
      <h1 class="text-h2 font-weight-medium mb-3 text-center">知否</h1>
      <p class="text-center">为您打造全方位的影音、博客、教学、考证网站</p>
    </v-parallax>

    <!-- 标题介绍 -->
    <v-container class="text-center">
      <h1 class="text-h4 font-weight-medium mb-2   2921905217">共享盛宴</h1>
      <p class="mb-0">知否为您打造全方位的影音、博客、教学、考证网站</p>
    </v-container>

    <!-- 主页卡片 -->
    <v-container
      fluid
      class="d-flex justify-center"
    >
      <!-- 四张卡片 -->
      <v-card
        width="280"
        hover="4"
        v-for="(card, i) in homeCards"
        :key="card.id"
        :class="{'ml-3': (i !== 0)}"
        :to="card.href"
      >
        <!-- 卡片的标题 -->
        <v-card-title class="font-weight-bold">{{ card.name }}</v-card-title>
        <!-- 卡片的副标题 -->
        <v-card-subtitle>{{ card.desc }}</v-card-subtitle>
        <v-card-text>
          <!-- 卡片中的标签 -->
          <v-chip
            label
            small
            color="transparent"
            v-for="(label, i) in card.labels"
            :key="i"
          >{{ label }}</v-chip>
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>

<script>


export default {
  name: 'Home',
  data: () => ({
    // 首页背景图
    homeBackPic: '',
    // 主页卡片信息
    homeCards: [],
  }),
  methods: {
    // 获取主页的卡片信息
    getHomeCards () {
      // 请求服务器  -->  获取  -->  获取卡片信息
      this.homeCards = [
        {
          id: 1,
          name: "博客",
          desc: "百万博主分享经验",
          href: "/blog",
          labels: [
            "Java",
            "Python",
            "Hadoop",
            "Liunx",
            "C++",
            "Unity",
            "UI 设计",
            "Android",
            "IOS",
            "HarmonyOs",
          ],
        },
        {
          id: 2,
          name: "学堂",
          desc: "百万教学视频畅游知识海洋",
          href: "/school",
          labels: [
            "VueJs",
            "前端",
            "后台",
            "大数据",
            "影视后期",
            "游戏开发",
            "人工智能",
            "物联网",
            "游戏建模",
            "应用开发",
          ],
        },
        {
          id: 3,
          name: "视频",
          desc: "百万影视视频畅享盛会",
          href: "/film",
          labels: [
            "电视剧",
            "电影",
            "纪录片",
            "少儿",
            "动漫",
            "短视频",
            "综艺",
            "港剧",
            "台剧",
            "韩剧",
            "恐怖片",
            "好莱坞",
          ],
        },
        {
          id: 4,
          name: "考证",
          desc: "千款认证考试线上测试",
          href: "/exam",
          labels: [
            "模拟考",
            "刷题",
            "期末考",
            "课堂考",
            "甲骨文认证",
            "华为认证",
            "三星认证",
            "TCL认证",
            "微软认证",
          ],
        },
      ]
    },
    // 获取首页的背景图
    getHomeBackPic () {
      // 请求服务器  -->  获取  -->  获取首页背景图
      this.homeBackPic = 'https://pic3.zhimg.com/v2-fbb002ec83393f1b87a55cfb69c864db_r.jpg'
    },
  },
  created () {
    // 获取首页背景图
    this.getHomeBackPic()
    // 获取主页卡片信息
    this.getHomeCards()
  }
}
</script>

<style lang='less'>
// 只显示一行
.showARow{
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
