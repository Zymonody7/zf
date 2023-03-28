<template>
  <!-- 举报对话框 -->
  <v-dialog
    width="550"
    persistent
    v-model="report.value"
  >
    <v-card>
      <!-- 举报标题 -->
      <v-card-title class="font-weight-black">
        <v-spacer></v-spacer>
        {{ title }}
        <v-spacer></v-spacer>
      </v-card-title>

      <!-- 分隔符 -->
      <v-divider></v-divider>

      <!-- 举报内容 -->
      <v-container class="px-5">
        <v-row
          align="center"
          no-gutters
        >
          <v-col
            cols="2"
            class="align-self-start pt-2"
          >举报理由</v-col>
          <v-col cols="10">
            <!-- 理由下拉框 -->
            <v-select
              solo
              dense
              label="请选择举报理由"
              :items="report.reason.list"
              item-value="id"
              item-text="name"
              v-model="report.reason.value"
            ></v-select>
          </v-col>

          <v-col
            cols="2"
            class="pt-1"
          >举报标签</v-col>
          <v-col cols="10">
            <!-- 当理由没选择时，显示的纸片信息 -->
            <v-chip
              label
              disabled
              v-show="!report.reason.value"
            >请先选择举报理由</v-chip>
            <!-- 举报标签，当理由选择时，显示的纸片组 -->
            <v-chip-group
              column
              multiple
              active-class="info"
              v-model="report.label.value"
              v-show="report.reason.value"
            >
              <v-chip
                label
                outlined
                v-for="label in report.label.list"
                :key="label.id"
                :value="label.id"
              >{{ label.name }}</v-chip>
            </v-chip-group>
          </v-col>

          <v-col
            cols="12"
            class="pt-5"
          >
            <span>举报详情</span>
          </v-col>
          <v-col
            cols="12"
            class="pt-3"
          >
            <v-textarea
              outlined
              no-resize
              counter="200"
              v-model="report.content"
            ></v-textarea>
          </v-col>
        </v-row>
      </v-container>

      <!-- 功能按钮 -->
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          small
          rounded
          dark
          width="100"
          color="grey"
          @click="report.value = false"
        >取消</v-btn>
        <v-btn
          small
          rounded
          width="100"
          color="error"
        >举报</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import eventBus from '@/utils/eventBus'

export default {
  data: () => ({
    report: {  // 举报
      // 显示/隐藏对话框
      value: false,
      // 举报详情
      content: '',
      // 举报的理由
      reason: {
        value: null,
        list: [],
      },
      // 标签
      label: {
        value: [], // 标签值
        list: [], // 标签项
      },
    },
    // 举报对话框的标题
    title: '举报未定',
    /**
     * 举报类型
     * 1: 博客
     * 2：视频
     * 3: 评论
     */
    stamp: 0,
    // 举报内容的编号
    id: 0,
  }),
  watch: {
    // 监听对话框的显示/隐藏
    'report.value' (newData) {
      if (newData === false) {
        this.report.reason.value = null
        this.report.content = ''
      }
    },
    // 监听举报理由的编号
    'report.reason.value' (newData) {
      // 根据举报理由的编号获取举报标签
      this.getLabelByReasonId(newData);
    }
  },
  methods: {
    // 根据举报理由的编号获取举报标签
    getLabelByReasonId (r_id) {
      // 请求服务器 --> 根据举报理由的编号获取举报标签
      // this.report.label.list = 
      switch (r_id) {
        case 1:
          this.report.label.list = [{ id: 1, name: '色情' }, { id: 2, name: '低俗' }, { id: 3, name: '引导私下交易' },]
          break;
        case 2:
          this.report.label.list = [{ id: 4, name: '涉政不实信息' }, { id: 5, name: '涉政不当言论' },]
          break;
        case 3:
          this.report.label.list = [{ id: 6, name: '虚拟虚假时事' }, { id: 7, name: '虚拟虚假知识' },]
          break;
        case 4:
          this.report.label.list = [{ id: 8, name: '杀猪盘' }, { id: 9, name: '刷单欺诈' }, { id: 10, name: '换脸合成' }, { id: 11, name: '养老欺诈' },]
          break;
        case 5:
          this.report.label.list = [{ id: 12, name: '侮辱谩骂' }, { id: 13, name: '涉嫌非法集资' }, { id: 14, name: '危险行为' },]
          break;
        case 6:
          this.report.label.list = [{ id: 15, name: '骗赞骗互动' }, { id: 16, name: '内容观感体验差' }, { id: 17, name: '内容虚假/不完整' },]
          break;
        case 7:
          this.report.label.list = [{ id: 18, name: '虚假夸大宣传' }, { id: 19, name: '出售违禁品' }, { id: 20, name: '售卖假冒商品' },]
          break;
        case 8:
          this.report.label.list = [{ id: 21, name: '疑似自杀' }, { id: 22, name: '教唆自杀' },]
          break;
        case 9:
          this.report.label.list = [{ id: 23, name: '引人不适' }, { id: 24, name: '价值观导向不良' }, { id: 25, name: '网暴他人' },]
          break;
        case 10:
          this.report.label.list = [{ id: 26, name: '商标权' }, { id: 27, name: '名誉权' }, { id: 28, name: '肖像权' }, { id: 29, name: '隐私权' }, { id: 30, name: '专利权' }, { id: 31, name: '著作权（本人作品被盗用）' }, { id: 32, name: '无法确定侵权类型' }, { id: 33, name: '他人作品被盗用' },]
          break;
        case 11:
          this.report.label.list = [{ id: 34, name: '危险行为' }, { id: 35, name: '未成年营销' }, { id: 36, name: '未成年医美' },]
          break;
        case 12:
          this.report.label.list = [{ id: 37, name: '侵害未成年' }, { id: 38, name: '价值观导向不良' }, { id: 39, name: '儿童邪典' },]
          break;
        default:
          this.report.label.list = []
      }
    },
    // 获取举报的理由
    getReportReasons () {
      // 请求服务器 --> 获取举报的理由
      let responseReason = [{ id: 1, name: '内容违规', reason: [{ id: 1, name: '色情低俗' }, { id: 2, name: '政治敏感' }, { id: 3, name: '造谣传谣' }, { id: 4, name: '涉嫌欺诈' }, { id: 5, name: '违法犯罪' }, { id: 6, name: '诱导互动、体验差等' }, { id: 7, name: '违规卖货、假冒商品' }, { id: 8, name: '疑似/教唆自残自杀' }, { id: 9, name: '网暴他人，其他' },] }, { id: 2, name: '侵权权益', reason: [{ id: 10, name: '侵犯肖像、隐私、名誉、商标、专利、著作权' }] }, { id: 3, name: '未成年', reason: [{ id: 11, name: '未成年人不当行为' }, { id: 12, name: '内容不适合未成年观看' },] }];

      let reasonList = []

      // 循环服务器返回的举报理由 --> 封装成下拉框选项的格式(标题、选项、分割线)
      responseReason.some((item, index) => {
        // 分组标题
        reasonList[reasonList.length] = { header: item.name }

        // 选项
        item.reason.some(r_item => {
          reasonList[reasonList.length] = r_item
        })

        // 最后一个分组的选项后不需要分隔符
        if (index !== responseReason.length - 1) {
          // 分隔符
          reasonList[reasonList.length] = { divider: true }
        }
      })


      this.report.reason.list = reasonList
    },
  },
  created () {
    // 获取举报的理由
    this.getReportReasons()

    // 创建自定义的事件 --> 显示/隐藏对话框
    eventBus.$on('displayReportDialog', (isShow, title, stamp, id) => {
      this.report.value = isShow
      if(isShow) {
        this.title = title
        this.stamp = stamp
        this.id = id
      }
    })
  }
}
</script>

<style lang='less'>
</style>
