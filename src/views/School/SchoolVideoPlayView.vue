<template>
  <v-container id="container">
    <!-- 视频播放标题及标签 ( 播放数量、弹幕量、时间、是否可转载 ) -->
    <v-sheet>
      <!-- 视频标题 -->
      <h5 class="text-h6 font-weight-bold mb-1">{{ collection.list[collection.lastPlay].title }}</h5>

      <!-- 标签 ( 播放数量、弹幕量、时间、是否可转载 ) -->
      <div class=" font-weight-bold">
        <!-- 播放数量 -->
        <v-chip
          small
          label
          class="ml-n3"
          text-color="grey"
          color="transparent"
        >
          <v-icon
            size="20"
            class="mr-1"
          >mdi-play-circle-outline</v-icon>
          {{ collection.playCount | numFormat }}
        </v-chip>

        <!-- 弹幕量 -->
        <v-chip
          small
          label
          text-color="grey"
          color="transparent"
        >
          <v-icon
            size="20"
            class="mr-1"
          >mdi-segment</v-icon>
          {{ collection.barrageCount | numFormat }}
        </v-chip>

        <!-- 时间 -->
        <v-chip
          small
          label
          text-color="grey"
          color="transparent"
        >
          <v-icon
            size="20"
            class="mr-1"
          >mdi-clock-time-one-outline</v-icon>
          {{ collection.time }}
        </v-chip>

        <!-- 是否可转载 -->
        <v-chip
          small
          label
          text-color="grey"
          color="transparent"
          v-if="!collection.reprintEnabled"
        >
          <v-icon
            size="20"
            class="mr-1"
            color="error"
          >mdi-close-circle</v-icon>
          未经作者同意, 禁止转载
        </v-chip>
      </div>
    </v-sheet>

    <!-- 视频播放器、分享、收藏、举报、打分、简介、发布评论、评论列表, 选集、猜你喜欢 -->
    <v-sheet class="d-flex justify-space-between mt-2">
      <!-- 视频播放器、分享、收藏、举报、打分、简介、发布评论、评论列表 -->
      <v-sheet
        color="rgba(121,201,201,0)"
        width="800"
        min-width="800"
        max-width="800"
      >
        <MuiPlayer
          :id="collection.list[collection.lastPlay].id"
          :title="collection.list[collection.lastPlay].title"
          :nextMedia="(collection.lastPlay + 1) < collection.list.length ? true : false "
          :collection="collection.list"
          :poster="collection.poster"
          :playTime="collection.lastTime"
          :barrageCount="collection.barrageCount"
        ></MuiPlayer>

        <!-- 一键三连(点赞、收藏、分享)、评分、简介 -->
        <v-card
          tile
          flat
          color="#f7f5f6"
          class="mt-3"
        >
          <v-card-text class="d-flex align-center justify-space-between">
            <!-- 一键三连(点赞、收藏、分享) -->
            <v-container class="pa-0">
              <!-- 点赞 -->
              <v-chip
                class="px-2"
                color="rgba(0,0,0,0)"
              >
                <v-icon color="info">mdi-thumb-up</v-icon>
                <span class="ml-2">{{ collection.like | numFormat }}</span>
              </v-chip>

              <!-- 收藏 -->
              <v-chip
                class="px-2"
                color="rgba(0,0,0,0)"
              >
                <v-icon color="info">mdi-star</v-icon>
                <span class="ml-2">{{ collection.collect | numFormat }}</span>
              </v-chip>

              <!-- 分享 -->
              <v-chip
                class="px-2"
                color="rgba(0,0,0,0)"
              >
                <v-icon color="info">mdi-share</v-icon>
                <span class="ml-2">{{ collection.share | numFormat }}</span>
              </v-chip>
            </v-container>

            <!-- 打分 -->
            <v-rating
              dense
              hover
              half-increments
              color="orange"
              v-model="ratingValue"
              style="position: absolute; left: 50%; transform: translateX(-50%);"
            ></v-rating>

            <!-- 简介 -->
            <v-btn
              plain
              @click="synopsis.show = !synopsis.show"
            >
              <span>简介</span>
              <v-icon v-show="synopsis.show">mdi-menu-up</v-icon>
              <v-icon v-show="!synopsis.show">mdi-menu-down</v-icon>
            </v-btn>
          </v-card-text>

          <!-- 简介内容 -->
          <v-card-text
            class="pt-0"
            v-show="synopsis.show"
          >
            <!-- 分割线 -->
            <v-divider class="pb-4"></v-divider>
            <span>{{ synopsis.text }}</span>
          </v-card-text>
        </v-card>

        <!-- 发布评论 -->
        <v-card
          id="aaa"
          elevation="4"
          class="mt-8"
        >
          <v-card-title class="font-weight-black text-h6">吐个槽</v-card-title>
          <v-card-text>
            <!-- 评论发送组件 -->
            <SendComment
              :textId="collection.id"
              :type="1"
            ></SendComment>
          </v-card-text>
        </v-card>

        <!-- 评论列表 -->
        <v-card
          elevation="4"
          class="mt-8"
        >
          <!-- 列表标题 -->
          <v-card-title class="font-weight-black text-h6">精彩评论</v-card-title>

          <!-- 评论列表 -->
          <v-card-text>
            <Comment
              v-for="comment in comments"
              :key="comment.id"
              :isLandLord="true"
              :id="comment.id"
              :headPic="comment.commentator.headPic"
              :nickname="comment.commentator.nickname"
              :text="comment.text"
              :isTop="comment.top"
              :isAuthorLiked="comment.isAuthorLiked"
              :time="comment.time"
              :count="comment.count"
            ></Comment>
          </v-card-text>
        </v-card>

      </v-sheet>

      <!-- 选集、猜你喜欢 -->
      <v-sheet
        width="300"
        min-width="300"
        max-width="300"
      >
        <!-- 选集 -->
        <v-card
          class="pa-3"
          height="400"
          elevation="0"
          color="#f6f6f6"
        >
          <!-- 标题 -->
          <v-card-title class="px-0 py-2">视频选集 <span class="grey--text text-body-1">(1/78)</span></v-card-title>
          <v-divider></v-divider>
          <!-- 集数 -->
          <v-card-text
            class="pa-0 pt-2 pr-3 overflow-y-auto overflow-player"
            style="max-height: 330px;"
          >
            <!-- 选集的菜单列表 -->
            <v-list
              dense
              class="py-0 text-left"
              color="rgba(0,0,0,0)"
            >
              <v-list-item-group
                mandatory
                v-model="collection.lastPlay"
              >
                <v-list-item
                  class="px-4"
                  input-value="null"
                  v-for="(anthology,index) in collection.list"
                  :key="anthology.id"
                  :value="anthology.name"
                >
                  <!-- 选集集数 -->
                  <v-list-item-icon
                    class="mr-4"
                    width="max-content"
                  >
                    <!-- 正在播放 -->
                    <v-icon v-show="index === collection.lastPlay">mdi-play-protected-content</v-icon>
                    <!-- 序列号 -->
                    <span v-show="index !== collection.lastPlay">P{{ index + 1 }}</span>
                  </v-list-item-icon>

                  <!-- 选集名字 -->
                  <v-list-item-content>
                    <v-list-item-title>{{ anthology.title }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card-text>
        </v-card>

        <!-- 猜你喜欢 -->
        <v-card
          class="pa-4 mt-6"
          elevation="0"
          color="#f6f6f6"
        >
          <!-- 标题 -->
          <v-card-title class="px-0 pt-2 pb-6">
            <h3>猜你喜欢</h3>
          </v-card-title>

          <!-- 视频列表 -->
          <v-card-text class="pa-0">
              <SchoolVideoRecommend
                v-for="recommend in recommends"
                :key="recommend.aid"
                :id="recommend.aid"
                :pic="recommend.pic"
                :title="recommend.title"
                :pubdate="recommend.pubdate"
                :duration="recommend.duration"
                :owner="recommend.owner"
                :stat="recommend.stat"
              ></SchoolVideoRecommend>
          </v-card-text>
        </v-card>
      </v-sheet>
    </v-sheet>

  </v-container>
</template>

<script>
import eventBus from '@/utils/eventBus'
import MuiPlayer from '@/components/player/MuiPlayer.vue'
import SendComment from '@/components/comment/SendComment.vue' // 发布评论组件
import Comment from '@/components/comment/Comment.vue' // 评论列表组件
import SchoolVideoRecommend from '@/components/School/SchoolVideoRecommend.vue' // 视频推荐组件

export default {
  name: 'SchoolVideoPlayView',
  data: () => ({
    // 视频合集列表
    collection: {},
    // 评价值
    ratingValue: 0,
    // 简介
    synopsis: {
      show: false,
      text: '为了帮助广大对Java有兴趣和立志进入本行业的零基础学员，本套java教程由此而生，舍弃了冗长的理论，结合软件公司一个个真实的应用需求，来加强大家对知识的理解和掌握。本课程知识全面透彻，案例极为丰富，阶段课程完结后都配备了综合实战案例，具备大量优雅、高质量的代码供初学者训练，手把手边学边干，清楚，实用！是Java零基础学员极好的入门视频。课程从Java语言的简介到程序开发执行的原理、集成开发工具IDEA的使用，再到Java技术的应用都一应俱全'
    },
    // 评论
    comments: [],
    // 猜你喜欢的视频推荐
    recommends: [],
  }),
  props: ['id'],
  components: {
    MuiPlayer, SendComment, Comment, SchoolVideoRecommend
  },
  methods: {
    // 获取视频推荐
    getSchoolVideoRecommends () {
      // 请求服务器 --> 获取视频推荐
      this.recommends = [
        {
          "aid": 771055394,
          "pic": "http://i2.hdslb.com/bfs/archive/c02c8ae46a564a9ab72d56f790d47395ff60b891.jpg",
          "title": "2022最新前端（已完结）vue3全套零基础教学，一小时学会",
          // 发布时间
          "pubdate": 1658038746,
          // 持续时间
          "duration": 16959,
          // 作者
          "owner": {
            "mid": 1772328850,
            "name": "WKK大前端",
            "face": "https://i1.hdslb.com/bfs/face/66b18787cc372dd7915fbb4ba82d404461926f60.jpg"
          },
          // 统计数据
          "stat": {
            "aid": 771055394,
            // 视频播放量
            "view": 3063,
            // 弹幕
            "danmaku": 21,
            // 评论
            "reply": 53,
            // 收藏
            "favorite": 110,
            // 投币
            "coin": 38,
            // 分享
            "share": 44,
            // 点赞数
            "like": 53,
          }
        }, {
          "aid": 417422490,
          "pic": "http://i0.hdslb.com/bfs/archive/f9351732281684951a095275bfb3d0c9f124711b.jpg",
          "title": "8分钟项目部署-黑马vue电商后台管理系统-购买服务器部署上线-搭建网站",
          "pubdate": 1617796887,
          "duration": 475,
          "owner": {
            "mid": 1503877955,
            "name": "许泽鸿",
            "face": "https://i2.hdslb.com/bfs/face/d7aa5e0457848d4bf6d3f5f8ee516c51e96196fa.jpg"
          },
          "stat": {
            "view": 60581,
            "danmaku": 81,
            "reply": 237,
            "favorite": 2989,
            "coin": 743,
            "share": 269,
            "like": 1106,
          },
        }
      ]
    },
    // 获取学堂视频评论
    getSchoolVideoComments () {
      // 请求服务器 --> 获取学堂视频评论
      this.comments = [{ id: 1, text: '阿姨，我不想努力了', time: '2022-07-07 20:47:23', isAuthorLiked: false, top: true, like: 234, noLike: 1241, count: 4, commentator: { id: 23, nickname: '开心的太阳花朵朵', headPic: 'https://img2.woyaogexing.com/2022/07/18/3b040b92628a8f23!400x400.jpg' } }, { id: 2, text: '你的文章也是我白嫖的动力。', time: '2022-07-12 12:08:09', isAuthorLiked: false, top: false, like: 89, noLike: 1, count: 0, commentator: { id: 24, nickname: '爷不考剑桥了', headPic: 'https://img2.woyaogexing.com/2022/07/18/96e2d160eb4d466d!400x400.jpg', } }, { id: 3, text: '下学期要学，先收藏了', time: '2022-07-19 09:34:11', isAuthorLiked: true, top: false, like: 56, noLike: 6, count: 0, commentator: { id: 34, nickname: 'august殇', headPic: 'https://img2.woyaogexing.com/2022/07/18/8faf925dfca62a52!400x400.jpg' } }, { id: 4, text: '讲的你还别说，真的不错', time: '2020-07-19 09:34:11', isAuthorLiked: false, top: false, like: 21, noLike: 45, count: 3, commentator: { id: 78, nickname: '大侠带你走', headPic: 'https://img2.woyaogexing.com/2022/07/18/79c32764c11c818c!400x400.jpg' } }]
    },
    // 获取学堂视频的合集
    getSchoolVideoCollection () {
      // 请求服务器 --> 获取学堂视频的合集
      this.collection = {
        id: 567, // 合集编号    
        lastPlay: 2, // 上次播放的合集中的位置（合集索引）    
        lastTime: 450, // 上次播放的时间点（秒）    
        like: 56721, // 点赞量    
        collect: 4567, // 收藏量    
        share: 456, // 分享量    
        poster: 'https://pic4.zhimg.com/v2-6ad24f187fc1c4fcea0a6e83199dcd03_r.jpg?source=1940ef5c', // 合集封面    
        playCount: 64578, // 播放数量    
        time: '2022-01-31 14:22:45', // 合集发布时间    
        barrageCount: 23421, // 弹幕量    
        reprintEnabled: false, // 不可转载    
        // 合集列表    
        list: [
          { id: 1001, title: 'Java语言发展史' },
          { id: 1002, title: 'Java语言跨平台原理' },
          { id: 1003, title: 'JRE和JDK' },
          { id: 1004, title: 'JDK的下载和安装' },
          { id: 1005, title: '常用DOS命令' },
          { id: 1006, title: 'Path环境变量的配置' },
          { id: 1007, title: 'HelloWorld案例' },
          { id: 1008, title: 'HelloWorld案例常见问题' },
          { id: 1009, title: 'Notepad软件的安装和使用' },
          { id: 1010, title: '注释' },
          { id: 1011, title: '关键字' },
          { id: 1012, title: '常量' },
          { id: 1013, title: '数据类型' },
          { id: 1014, title: '变量' },
          { id: 1015, title: '变量使用的注意事项' },
          { id: 1016, title: '标识符' },
          { id: 1017, title: '类型转换' },
          { id: 1018, title: '算术运算符' },
          { id: 1019, title: '字符的+操作' },
          { id: 1020, title: '字符串的+操作' }]
      }
    }
  },
  created () {
    // 自动触发 'changeTab' 事件，更改头部应用栏为 '学堂'
    eventBus.setToolbarTabValue('/school')

    // 获取学堂视频的合集
    this.getSchoolVideoCollection()

    // 获取学堂视频评论
    this.getSchoolVideoComments()

    // 获取视频推荐
    this.getSchoolVideoRecommends()
  }
}
</script>

<style lang='less' scoped>
#container {
  width: 1200px;
}

.overflow-player::-webkit-scrollbar {
  width: 3px;
  background-color: transparent;
  border-radius: 5px;
}

.overflow-player::-webkit-scrollbar-thumb {
  background-color: rgba(58, 58, 58, 0.5);
  border-radius: 2px;
}
</style>
