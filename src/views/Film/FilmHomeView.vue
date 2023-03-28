<template>

  <div>
    <!-- 轮播图容器 -->
    <v-container
      fluid
      class="px-0 pt-0"
      style="position: relative;"
    >
      <!-- 轮播图 -->
      <v-carousel
        cycle
        hide-delimiter-background
        hide-delimiters
        show-arrows-on-hover
        v-model="carousel.value"
      >
        <!-- 轮播图选项 -->
        <v-carousel-item
          v-for="carousel in carousel.items"
          :key="carousel.id"
          :value="carousel.id"
          :src="carousel.picture"
          :to="carousel.to"
        ></v-carousel-item>
      </v-carousel>

      <!-- 轮播缩略图 -->
      <v-slide-group
        style="position:absolute; bottom:10px; right:0;"
        v-model="carousel.value"
        class="pa-4"
        show-arrows
      >
        <v-slide-item
          v-for="carousel in carousel.items"
          :key="carousel.id"
          :value="carousel.id"
          v-slot="{active, toggle}"
        >
          <v-card
            :class="{'mask' : !active}"
            class="ma-1"
            height="60"
            width="120"
            @mouseenter="toggle"
            :to="carousel.to"
          >
            <v-img
              :src="carousel.picture"
              height="60"
              width="120"
            ></v-img>
          </v-card>
        </v-slide-item>
      </v-slide-group>
    </v-container>

    <!-- 搜索、筛选、影音列表、分页、追剧 -->
    <v-container
      fluid
      class="d-flex justify-center"
    >
      <!-- 搜索、筛选、影音列表、分页 -->
      <v-card
        width="980"
        flat
      >
        <!-- 搜索容器 -->
        <v-container style="width: 470px;">
          <v-menu
            offset-y
            allow-overflow
          >
            <template v-slot:activator="{ on, attrs }">
              <!-- 搜索框 -->
              <v-text-field
                dense
                rounded
                outlined
                hide-details
                placeholder="精彩世界一起看"
                v-model="searchValue"
                v-bind="attrs"
                v-on="on"
              >
                <template #append-outer>
                  <v-btn
                    small
                    fab
                    color="info"
                    class="mt-n2"
                  >
                    <v-icon>mdi-magnify</v-icon>
                  </v-btn>
                </template>
              </v-text-field>
            </template>
            <v-card>
              <v-card-text>
                <v-subheader>热门搜索</v-subheader>
                <!-- 热门搜索的列表 -->
                <v-list
                  dense
                  class="pt-0"
                >
                  <v-list-item
                    v-for="(film, index) in hotSearch"
                    :key="film.id"
                    @click="searchFilmFromHotSearchMenus(film)"
                  >
                    <!-- 序号图标 -->
                    <v-list-item-icon class="mr-2">
                      <v-icon color="red">mdi-numeric-{{ index + 1 }}-box</v-icon>
                    </v-list-item-icon>
                    <!-- 内容 -->
                    <v-list-item-content>
                      <v-list-item-title class="text-caption">{{ film.title }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card-text>
            </v-card>
          </v-menu>
        </v-container>

        <!-- 影音分类 -->
        <v-container
          fluid
          class="elevation-8"
        >
          <!-- 简单表格 -->
          <v-simple-table>
            <template #default>
              <tbody>
                <!-- 分类 -->
                <tr>
                  <th width="60">分类</th>
                  <td>
                    <v-chip-group
                      active-class="info"
                      v-model="classify.value"
                    >
                      <v-chip
                        small
                        color="transparent"
                        v-for="item in classify.list"
                        :key="item.id"
                        :value="item.id"
                      >{{ item.name }}</v-chip>
                    </v-chip-group>
                  </td>
                </tr>

                <!-- 类型 -->
                <tr>
                  <th width="60">类型</th>
                  <td>
                    <v-chip-group
                      column
                      active-class="info"
                      v-model="genre.value"
                    >
                      <v-chip
                        small
                        color="transparent"
                        :value="0"
                      >全部</v-chip>
                      <v-chip
                        small
                        color="transparent"
                        v-for="item in genre.list"
                        :key="item.id"
                        :value="item.id"
                      >{{ item.name }}</v-chip>
                    </v-chip-group>
                  </td>
                </tr>

                <!-- 地区 -->
                <tr>
                  <th width="60">地区</th>
                  <td>
                    <v-chip-group
                      column
                      active-class="info"
                      v-model="area.value"
                    >
                      <v-chip
                        small
                        color="transparent"
                        :value="0"
                      >全部</v-chip>
                      <v-chip
                        small
                        color="transparent"
                        v-for="item in area.list"
                        :key="item.id"
                        :value="item.id"
                      >{{ item.name }}</v-chip>
                    </v-chip-group>
                  </td>
                </tr>

                <!-- 上映时间 -->
                <tr>
                  <th width="60">时间</th>
                  <td>
                    <v-chip-group
                      column
                      active-class="info"
                      v-model="releaseTime.value"
                    >
                      <v-chip
                        small
                        color="transparent"
                        :value="0"
                      >全部</v-chip>
                      <v-chip
                        small
                        color="transparent"
                        v-for="item in releaseTime.list"
                        :key="item.id"
                        :value="item.id"
                      >{{ item.name }}</v-chip>
                    </v-chip-group>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-container>

        <!-- 影音列表 -->
        <v-container
          fluid
          class="pa-0"
        >
          <h3 class="ml-3 mt-3">影音列表</h3>
          <template>
            <div
              v-for="film in films.list"
              :key="film.id"
              class="d-inline-block mr-7 mb-5"
            >
              <v-hover v-slot="{ hover }">
                <FilmCard
                  :class="hover ? 'elevation-6' : 'elevation-0'"
                  :id="film.id"
                  :cover="film.pic"
                  :title="film.title"
                  :subTitle="film.subtitle"
                >
                  <template #topLabel>
                    <v-chip
                      small
                      class="rounded-r-0"
                      :color="labelColor(film.topLabel)"
                    >{{ film.topLabel }}</v-chip>
                  </template>

                  <template
                    #bottomLabel
                    v-if="film.bottomLabel"
                  >
                    <v-chip
                      dark
                      small
                      class="rounded-0"
                      color="rgba(0,0,0,0.3)"
                    >{{ film.bottomLabel }}</v-chip>
                  </template>
                </FilmCard>
              </v-hover>
            </div>
          </template>
        </v-container>

        <!-- 分页 -->
        <v-container fluid>
          <v-pagination
            v-show="films.total > 1"
            v-model="films.page"
            :length="films.total"
            :total-visible="7"
          ></v-pagination>
        </v-container>
      </v-card>

      <!-- 追剧 -->
      <v-card
        flat
        width="234"
        class="ml-10"
      >
        <!-- 使用文本居中分隔符组件 -->
        <DividerTextCenter title="追剧中"></DividerTextCenter>

        <!-- 追剧列表 -->
        <template>
          <div
            v-for="film in chasingDrama"
            :key="film.id"
            class="mb-3"
          >
            <v-hover v-slot="{ hover }">
              <FilmCard
                :class="hover ? 'elevation-4' : 'elevation-0'"
                :id="film.id"
                :cover="film.pic"
                :title="film.title"
                :subTitle="film.subtitle"
                :height="117"
              >
                <template #topLabel>
                  <v-chip
                    small
                    class="rounded-r-0"
                    :color="labelColor(film.topLabel)"
                  >{{ film.topLabel }}</v-chip>
                </template>

                <template
                  #bottomLabel
                  v-if="film.bottomLabel"
                >
                  <v-chip
                    dark
                    small
                    class="rounded-0"
                    color="rgba(0,0,0,0.3)"
                  >{{ film.bottomLabel }}</v-chip>
                </template>
              </FilmCard>
            </v-hover>
          </div>
        </template>
      </v-card>
    </v-container>
  </div>

</template>

<script>
import FilmCard from '@/components/film/FilmCard.vue'
import { labelColor } from '@/utils/label.js'
import DividerTextCenter from '@/components/DividerTextCenter.vue'

export default {
  name: 'FilmHomeView',
  components: {
    FilmCard,
    DividerTextCenter
  },
  data: () => ({
    carousel: {  // 轮播
      value: null,  // 值
      items: [], // 选项
    },
    searchValue: '',  // 搜索输入框的值
    hotSearch: [], // 热门搜索
    classify: { // 分类
      value: null,  // 值
      list: [], // 分类集合
    },
    genre: { // 类型
      value: null, // 值
      list: [], // 类型数组
    },
    area: { // 地区
      value: null,  // 值
      list: [], // 地区数组
    },
    releaseTime: { // 上映时间
      value: null, // 值
      list: [], // 时间数组
    },
    films: { // 影音列表
      page: null, // 当前页
      total: null, // 总页数
      list: [],  // 影音列表
    },
    chasingDrama: [], // 追剧列表

  }),
  watch: {
    'classify.value' (newData) {
      // 类型值变为全部
      this.genre.value = 0
      // 根据影音分类获取影音类型
      this.getFilmGenreByClassify(newData)

      // 地区变为全部
      this.area.value = 0
      // 根据影音分类获取地区
      this.getFilmAreaByClassify(newData)

      // 上映时间变为全部
      this.releaseTime.value = 0
    }
  },
  methods: {
    labelColor,
    // 获取追剧列表
    getChasingDrama () {
      //  请求服务器 --> 获取追剧列表
      this.chasingDrama = [

        {

          id: 1,

          title: '继承者们',

          subtitle: '高富帅遇灰姑娘擦爱火',

          topLabel: '首播',

          bottomLabel: '播放到第 24 集',

          pic: 'https://m.ykimg.com/05830000629425FF2037DD08EFD0E016?x-oss-process=image/resize,w_290/interlace,1/quality,Q_80'

        },

        {

          id: 2,

          title: '寒武纪',

          topLabel: 'VIP',

          bottomLabel: '播放到第 2 集',

          subtitle: '侯明昊贺军翔倾情出演',

          pic: 'https://m.ykimg.com/0583000058F5D08AADBA1FA0880E133D?x-oss-process=image/resize,w_290/interlace,1/quality,Q_80'

        },

        {

          id: 3,

          title: '水怪2：黑木林',

          topLabel: '',

          bottomLabel: '播放到 28:55',

          subtitle: '民间传说水猴子惊悚来袭',

          pic: 'https://liangcang-material.alicdn.com/prod/upload/8eb79232bfa248f0b12f4402c3d1a180.jpg?x-oss-process=image/resize,w_290/interlace,1/quality,Q_80'

        },

      ]
    },
    // 获取影音列表
    getFilms () {
      // 请求服务器 --> 获取影音列表
      this.films.list = [

        {

          id: 1,

          title: '长津湖',

          subtitle: '抗美援朝经典之战',

          topLabel: '9.6',

          bottomLabel: '',

          pic: 'https://m.ykimg.com/0584000061A868231FD852098F9700D0?x-oss-process=image/resize,w_290/interlace,1/quality,Q_80'

        },

        {

          id: 2,

          title: '门锁',

          subtitle: '白百何诠释独居女',

          topLabel: '8.6',

          bottomLabel: '',

          pic: 'https://m.ykimg.com/0584000061C567B913F7FF09582A36A3?x-oss-process=image/resize,w_290/interlace,1/quality,Q_80'

        },

        {

          id: 3,

          title: '铁道英雄',

          subtitle: '铁道英雄热血抗战',

          topLabel: '7.6',

          bottomLabel: '',

          pic: 'https://m.ykimg.com/0584000061D00101202742096F393ABB?x-oss-process=image/resize,w_290/interlace,1/quality,Q_80'

        },

        {

          id: 4,

          title: '再战江湖',

          subtitle: '陈小春肉搏黑帮',

          topLabel: '8.9',

          bottomLabel: '',

          pic: 'https://m.ykimg.com/0527000061BC409520274208DAE3909E?x-oss-process=image/resize,w_290/interlace,1/quality,Q_80'

        },

        {

          id: 5,

          title: '扫毒2天地对决',

          subtitle: '华仔古仔双雄争锋',

          topLabel: '9.2',

          bottomLabel: '',

          pic: 'https://m.ykimg.com/058400005F1EBF374265930D3F704B41?x-oss-process=image/resize,w_290/interlace,1/quality,Q_80'

        },

        {

          id: 6,

          title: '二龙湖往事：惊魂夜',

          subtitle: '东北农村离奇诡事',

          topLabel: '8.4',

          bottomLabel: '',

          pic: 'https://m.ykimg.com/0527000061B0646D13F7FF0951E5C6AD?x-oss-process=image/resize,w_290/interlace,1/quality,Q_80'

        },

        {

          id: 7,

          title: '1950他们正年轻',

          subtitle: '致敬抗美援朝英雄',

          topLabel: '7.7',

          bottomLabel: '',

          pic: 'https://m.ykimg.com/0584000061C564C313EB660A46DB5B33?x-oss-process=image/resize,w_290/interlace,1/quality,Q_80'

        },

        {

          id: 8,

          title: '反贪风暴4',

          subtitle: '古仔闯牢狠打虎',

          topLabel: '5.6',

          bottomLabel: '',

          pic: 'https://m.ykimg.com/058400006047253913EA350855339545?x-oss-process=image/resize,w_290/interlace,1/quality,Q_80'

        },

        {

          id: 9,

          title: '请叫我总监',

          subtitle: '职场邂逅欢乐甜怼',

          topLabel: '7.9',

          bottomLabel: '32 集全',

          pic: 'https://m.ykimg.com/05840000616FACD013F7FF098083A771?x-oss-process=image/resize,w_290/interlace,1/quality,Q_80'

        },

        {

          id: 10,

          title: '良辰好景知几何',

          subtitle: '将军爱上清冷才女',

          topLabel: '8.9',

          bottomLabel: '',

          pic: 'https://m.ykimg.com/05840000626514521FD85209207E984E?x-oss-process=image/resize,w_290/interlace,1/quality,Q_80'

        },

        {

          id: 11,

          title: '怦然心动20岁 第二季',

          subtitle: '毕业之旅甜蜜回归',

          topLabel: '9.6',

          bottomLabel: '更新至06-05期',

          pic: 'https://m.ykimg.com/0584000062980D9713EB660937D7BF75?x-oss-process=image/resize,w_290/interlace,1/quality,Q_80'

        },

        {

          id: 12,

          title: '了不起！舞社',

          subtitle: '毕业之旅甜蜜回归',

          topLabel: '9.0',

          bottomLabel: '更新至06-12期',

          pic: 'https://m.ykimg.com/058400006258C3D913EB66114B215112?x-oss-process=image/resize,w_290/interlace,1/quality,Q_80'

        },

      ]

      // 获取当前页
      this.films.page = 2
      // 获取总页数
      this.films.total = 25
    },
    // 获取影音发布时间
    getFilmReleaseTime () {
      // 请求服务器 --> 获取影音的发布时间
      this.releaseTime.list = [

        { id: 1, name: '2022' },

        { id: 2, name: '2021' },

        { id: 3, name: '2020' },

        { id: 4, name: '2019' },

        { id: 5, name: '2018' },

        { id: 6, name: '2017' },

        { id: 7, name: '2016' },

        { id: 8, name: '2015' },

        { id: 9, name: '2014' },

        { id: 10, name: '2013' },

        { id: 11, name: '2012' },

        { id: 12, name: '2011' },

        { id: 13, name: '2010' },

        { id: 14, name: '00年代' },

        { id: 15, name: '90年代' },

        { id: 16, name: '80年代' },

        { id: 17, name: '70年代' },

      ]
    },
    // 根据影音分类获取地区
    getFilmAreaByClassify (classifyValue) {
      // 请求服务器 --> 根据分类 ( this.classify.value ) 获取地区
      switch (classifyValue) {

        case 1:

          this.area.list = [

            { id: 1, name: '内地' },

            { id: 2, name: '中国香港' },

            { id: 3, name: '中国台湾' },

            { id: 4, name: '韩国' },

            { id: 5, name: '美国' },

            { id: 6, name: '日本' },

            { id: 7, name: '英国' },

            { id: 8, name: '泰国' },

          ]

          break

        case 2:

          this.area.list = [

            { id: 1, name: '内地' },

            { id: 2, name: '中国香港' },

            { id: 3, name: '中国台湾' },

            { id: 4, name: '韩国' },

            { id: 5, name: '美国' },

            { id: 6, name: '日本' },

            { id: 7, name: '英国' },

            { id: 8, name: '泰国' },

            { id: 9, name: '法国' },

            { id: 10, name: '俄罗斯' },

            { id: 11, name: '意大利' },

            { id: 12, name: '德国' },

            { id: 13, name: '加拿大' },

          ]

          break

        case 3:

          this.area.list = [

            { id: 1, name: '内地' },

            { id: 3, name: '中国台湾' },

            { id: 4, name: '韩国' },

            { id: 5, name: '美国' },

            { id: 7, name: '英国' },

          ]

          break

        case 4:

          this.area.list = [

            { id: 1, name: '内地' },

            { id: 6, name: '日本' },

            { id: 5, name: '美国' },

            { id: 3, name: '中国台湾' },

            { id: 2, name: '中国香港' },

            { id: 4, name: '韩国' },

            { id: 7, name: '英国' },

            { id: 9, name: '法国' },

          ]

          break

        case 5:

          this.area.list = [

            { id: 1, name: '内地' },

            { id: 2, name: '中国香港' },

            { id: 3, name: '中国台湾' },

            { id: 4, name: '韩国' },

            { id: 5, name: '美国' },

            { id: 6, name: '日本' },

            { id: 7, name: '英国' },

            { id: 10, name: '俄罗斯' },

            { id: 12, name: '德国' },

            { id: 13, name: '加拿大' },

            { id: 14, name: '澳大利亚' },

            { id: 15, name: '瑞士' },

            { id: 16, name: '西班牙' },

            { id: 17, name: '丹麦' },

            { id: 18, name: '墨西哥' },

            { id: 19, name: '新加波' },

            { id: 20, name: '印度' },

            { id: 21, name: '以色列' },

          ]

          break

      }
    },
    // 根据影音分类获取影音类型
    getFilmGenreByClassify (classifyValue) {
      // 请求服务器 --> 根据分类 ( this.classify.value ) 获取影音类型
      switch (classifyValue) {

        case 1:

          this.genre.list = [

            { id: 1, name: '青春' },

            { id: 2, name: '爱情' },

            { id: 3, name: '谍战' },

            { id: 4, name: '冒险' },

            { id: 5, name: '穿越' },

            { id: 6, name: '仙侠' },

            { id: 7, name: '罪案' },

            { id: 8, name: '年代' },

            { id: 9, name: '古装' },

            { id: 10, name: '武侠' },

            { id: 11, name: '警匪' },

            { id: 12, name: '战争' },

            { id: 13, name: '军旅' },

            { id: 14, name: '神话' },

            { id: 15, name: '科幻' },

            { id: 16, name: '悬疑' },

            { id: 17, name: '历史' },

            { id: 18, name: '儿童' },

            { id: 19, name: '农村' },

            { id: 20, name: '都市' },

            { id: 21, name: '家庭' },

            { id: 22, name: '喜剧' },

            { id: 23, name: '偶像' },

            { id: 24, name: '时装' },

          ]

          break

        case 2:

          this.genre.list = [

            { id: 2, name: '爱情' },

            { id: 4, name: '冒险' },

            { id: 10, name: '武侠' },

            { id: 11, name: '警匪' },

            { id: 12, name: '战争' },

            { id: 14, name: '神话' },

            { id: 15, name: '科幻' },

            { id: 16, name: '悬疑' },

            { id: 17, name: '历史' },

            { id: 18, name: '儿童' },

            { id: 25, name: '犯罪' },

            { id: 26, name: '恐怖' },

            { id: 27, name: '惊悚' },

            { id: 28, name: '戏曲' },

            { id: 29, name: '冒险' },

            { id: 30, name: '剧情' },

            { id: 31, name: '运动' },

          ]

          break

        case 3:

          this.genre.list = [

            { id: 1, name: '相声' },

            { id: 22, name: '喜剧' },

            { id: 32, name: '音乐' },

            { id: 33, name: '舞蹈' },

            { id: 23, name: '偶像' },

            { id: 34, name: '情感' },

            { id: 35, name: '婚恋' },

            { id: 36, name: '体育' },

            { id: 37, name: '明星访谈' },

            { id: 38, name: '旅游' },

            { id: 39, name: '文化' },

            { id: 40, name: '时尚' },

            { id: 41, name: '美食' },

            { id: 42, name: '生活' },

            { id: 43, name: '益智' },

            { id: 44, name: '晚会' },

            { id: 45, name: '游戏' },

            { id: 46, name: '亲子' },

          ]

          break

        case 4:

          this.genre.list = [

            { id: 47, name: '热血' },

            { id: 48, name: '格斗' },

            { id: 49, name: '恋爱' },

            { id: 50, name: '美少女' },

            { id: 51, name: '校园' },

            { id: 52, name: '搞笑' },

            { id: 53, name: '神魔' },

            { id: 54, name: '机战' },

            { id: 15, name: '科幻' },

            { id: 55, name: '真人' },

          ]

          break

        case 5:

          this.genre.list = [

            { id: 41, name: '美食' },

            { id: 56, name: '人物' },

            { id: 57, name: '军事' },

            { id: 17, name: '历史' },

            { id: 58, name: '自然' },

            { id: 59, name: '探险' },

            { id: 60, name: '科技' },

            { id: 39, name: '文化' },

            { id: 61, name: '刑侦' },

            { id: 62, name: '社会' },

            { id: 38, name: '旅游' },

          ]

          break

      }
    },
    // 获取影音分类
    getClassify () {
      // 请求服务器 --> 获取影音分类
      this.classify.list = [
        { id: 1, name: '电视剧' },
        { id: 2, name: '电影' },
        { id: 3, name: '综艺' },
        { id: 4, name: '动漫' },
        { id: 5, name: '纪录片' }
      ]
      // 默认选中第一项（电视剧）
      this.classify.value = this.classify.list[0].id
    },
    // 从热门菜单中搜索影音
    searchFilmFromHotSearchMenus (film) {
      // 将列表内容填入输入框中
      this.searchValue = film.title
      // 请求服务器获取搜索的影音
    },
    // 获取热门搜索
    getHotSearch () {
      // 请求服务器 --> 获取热门搜索
      this.hotSearch = [
        { id: 1, title: '法医秦明' },
        { id: 2, title: '长津湖' },
        { id: 3, title: '门锁' },
        { id: 4, title: '流浪地球' },
        { id: 5, title: '阿凡达' },
        { id: 6, title: '速度与激情' },
        { id: 7, title: '反贪风暴' },
        { id: 8, title: '乘风破浪的姐姐' },
        { id: 9, title: '知否知否应是绿肥红瘦' },
        { id: 10, title: '扫毒' },
      ]
    },
    // 获取轮播
    getCarousel () {
      // 请求服务器 --> 获取轮播
      this.carousel.items = [
        {
          id: 1,
          picture: 'https://liangcang-material.alicdn.com/prod/upload/c32d6f8e20fb4270a120efa8b074f189.jpg?x-oss-process=image/resize,w_2074/interlace,1/quality,Q_80',
          to: ''
        },
        {

          id: 2,

          picture: 'https://liangcang-material.alicdn.com/prod/upload/810308e3087342f0a1c89700b842399a.webp.jpg?x-oss-process=image/resize,w_2074/interlace,1/quality,Q_80',

          to: ''

        },

        {

          id: 3,

          picture: 'https://liangcang-material.alicdn.com/prod/upload/9045dd09b30a4d4e8eded62a01658c11.jpg?x-oss-process=image/resize,w_2074/interlace,1/quality,Q_80',

          to: ''

        },

        {

          id: 4,

          picture: 'https://liangcang-material.alicdn.com/prod/upload/d270a00903c34ae29c07910884b9f048.jpg?x-oss-process=image/resize,w_2074/interlace,1/quality,Q_80',

          to: ''

        }

      ]
    }
  },
  created () {
    // 获取轮播
    this.getCarousel()
    // 获取热门搜索
    this.getHotSearch()
    // 获取影音分类
    this.getClassify()
    // 获取影音上映时间
    this.getFilmReleaseTime()
    // 获取影音列表
    this.getFilms()
    // 获取追剧列表
    this.getChasingDrama()
  }
}
</script>

<style lang='less' scoped>
.mask::after {
  content: '';
  position: absolute;

  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
}
</style>
