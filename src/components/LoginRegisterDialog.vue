<template>
  <!-- 对话框 -->
  <v-dialog
    v-model="show"
    persistent
    width="1000"
    content-class="rounded-0"
  >
    <div class="d-flex">
      <!-- 网站信息 -->
      <v-card
        tile
        dark
        width="500"
        height="573"
        class="dialog_back pa-14 d-flex flex-column"
      >
        <v-btn
          absolute
          light
          fab
          small
          style="top:0; right:0;transform: translate(50%, 10px);"
          @click="show = false"
        >
          <v-icon
            size="30"
            color="grey"
          >mdi-close-circle-outline</v-icon>
        </v-btn>

        <!-- 网站的标题 -->
        <v-container class="mb-auto">
          <h1>ZHIFOU</h1>
          <p class="text-caption gray--text text--lighten-2">全方位的教学、考证、博客、咨询网站</p>
        </v-container>

        <!-- 推荐的博主 -->
        <v-container class="mb-auto">
          <!-- 头像和昵称 -->
          <div class="mb-3">
            <v-avatar size="40">
              <img
                :src="remAuthor.head_pic"
                alt="John"
              >
            </v-avatar>
            <span class="ml-2 text-caption">{{ remAuthor.nickname }}</span>
          </div>
          <!-- 个性签名 -->
          <p
            class="text-caption gray--text text--lighten-2"
            v-html="remAuthor.canvases"
          >
          </p>
        </v-container>

        <!-- 网站咨询标签 -->
        <v-container class="text-center">
          <v-chip
            label
            small
            color="transparent"
            text-color="grey lighten-2"
            v-for="link in footerLinks"
            :key="link.id"
            :to="link.to"
          >{{ link.name }}</v-chip>
        </v-container>
      </v-card>

      <!-- 窗口 (登录, 注册, 注册成功) -->
      <v-window v-model="step">
        <!-- 登录窗口 -->
        <v-window-item :value="1">
          <v-card
            width="500"
            height="573"
            tile
            class="pa-16 d-flex flex-column"
          >
            <!-- 标题区域 -->
            <v-container class="d-flex align-center">
              <h2>登录</h2>
              <span class="text-caption ml-auto">没有账号?
                <a
                  class="text-decoration-none"
                  @click="step = 2"
                >点击注册</a>
              </span>
            </v-container>

            <!-- 表单区域 -->
            <v-container>

              <!-- 登录表单 -->
              <v-form
                lazy-validation
                v-model="login.value"
                ref="login_form"
              >

                <!-- 账号文本框 -->
                <v-text-field
                  dense
                  outlined
                  v-model="login.account.value"
                  label="账号 / 邮箱 / 手机号"
                  placeholder="账号 / 邮箱 / 手机号"
                  :rules="login.account.rule"
                ></v-text-field>

                <!-- 密码输入框 -->
                <v-text-field
                  dense
                  outlined
                  v-model="login.password.value"
                  label="密码"
                  placeholder="请输入密码"
                  @click:append="eyePasswordTextFiled"
                  :append-icon="login.password.icon"
                  :type="login.password.type"
                  :rules="login.account.rule"
                ></v-text-field>

                <!-- 条款与协议 -->
                <v-checkbox
                  class="mt-0 pt-0 mb-3"
                  dense
                  v-model="login.term.value"
                  label="同意本公司的条款与协议"
                  :rules="login.term.rule"
                >
                  <template #label>
                    同意本公司的
                    <a
                      class="text-decoration-none"
                      @click.stop
                      href="https://www.baidu.com"
                    >《条款与协议》</a>
                  </template>
                </v-checkbox>

                <!-- 登录按钮 -->
                <v-btn
                  block
                  color="success"
                  :disabled="!login.value"
                  @click="toLogin"
                >登录</v-btn>
              </v-form>

              <!-- 忘记密码区域 -->
              <v-container class="text-center">
                <a
                  href=""
                  class="text-caption grey--text text-decoration-none"
                >忘记密码</a>
              </v-container>
            </v-container>

            <!-- 其他登录方式 -->
            <v-container class="mt-auto">
              <!-- 使用文本居中分隔符组件 -->
              <DividerTextCenter title="其他登录方式"></DividerTextCenter>

              <!-- 图标 -->
              <v-container class="text-center py-0">
                <v-btn
                  small
                  fab
                  class="mx-4"
                  v-for="item in login.otherMethods"
                  :key="item.id"
                  :color="item.color"
                  :to="item.to"
                >
                  <v-icon>{{ item.icon }}</v-icon>
                </v-btn>
              </v-container>
            </v-container>
          </v-card>
        </v-window-item>

        <!-- 注册窗口 -->
        <v-window-item :value="2">
          <v-card
            width="500"
            height="573"
            class="px-16 d-flex align-center"
            tile
          >
            <v-container>

              <!-- 标题区域 -->
              <v-container class="d-flex align-center">
                <h2>注册</h2>
                <span class="text-caption ml-auto">已有账号?
                  <a
                    class="text-decoration-none"
                    @click="step = 1"
                  >直接登录</a>
                </span>
              </v-container>

              <!-- 注册区域 -->
              <v-container>

                <!-- 表单区域 -->
                <v-form
                  lazy-validation
                  v-model="register.value"
                  ref="register_form"
                >

                  <!-- 邮箱 -->
                  <v-text-field
                    outlined
                    dense
                    label="邮箱号码"
                    placeholder="请输入邮箱号码"
                    v-model="register.email.value"
                    :rules="register.email.rule"
                  ></v-text-field>

                  <!-- 验证码区域 -->
                  <v-row no-gutters>
                    <v-col class="mr-3">
                      <!-- 验证码 -->
                      <v-text-field
                        outlined
                        dense
                        label="验证码"
                        placeholder="请输入验证码"
                        v-model="register.evc.value"
                        :rules="register.evc.rule"
                      ></v-text-field>
                    </v-col>

                    <!-- 发送验证码 -->
                    <v-col class="ml-3">
                      <!-- 获取验证码按钮 -->
                      <v-btn
                        block
                        color="info"
                        :disabled="register.btnCountDown.disabled"
                        @click="buttonCountDown"
                      >{{ register.btnCountDown.text }}</v-btn>
                    </v-col>
                  </v-row>

                  <!-- 条款与协议 -->
                  <v-checkbox
                    class="mt-0 pt-0 mb-3"
                    dense
                    v-model="register.term.value"
                    label="同意本公司的条款与协议"
                    :rules="register.term.rule"
                  >
                    <template #label>
                      同意本公司的
                      <a
                        class="text-decoration-none"
                        @click.stop
                        href="https://www.baidu.com"
                      >《条款与协议》</a>
                    </template>
                  </v-checkbox>

                  <!-- 登录按钮 -->
                  <v-btn
                    block
                    color="info"
                    :disabled="!register.value"
                    @click="toRegister"
                  >登录</v-btn>
                </v-form>
              </v-container>
            </v-container>
          </v-card>
        </v-window-item>

        <!-- 注册成功窗口 -->
        <v-window-item :value="3">
          <v-card
            tile
            width="500"
            height="573"
            class="d-flex align-center"
          >
            <v-container class="text-center">
              <!-- 图标 -->
              <v-icon
                size="150"
                color="success"
              >mdi-check-circle</v-icon>
              <!-- 标题 -->
              <h3>欢迎加入知否大家庭</h3>
              <p class="text-caption grey--text">
                请前往注册的邮箱，查看账号信息，
                <a
                  class="text-decoration-none"
                  @click="step = 1"
                >可点击此处前往登录</a>
              </p>
            </v-container>
          </v-card>
        </v-window-item>
      </v-window>
    </div>
  </v-dialog>
</template>

<script>
import eventBus from '@/utils/eventBus'
import DividerTextCenter from '@/components/DividerTextCenter.vue'

export default {
  name: 'LoginRegisterDialog',
  components:{
    DividerTextCenter
  },
  data: () => ({
    // 显示 / 隐藏 对话框
    show: false,
    // 显示的窗口
    step: 1,
    // 推荐博主
    remAuthor: {},
    // 登录对话框脚注链接
    footerLinks: [],
    // 登录
    login: {
      value: null, // 表单状态
      account: { // 账号
        value: '', // 账号值
        rule: [
          v => !!v || '请填写您的账号信息!'
        ]
      },
      password: {   // 密码
        icon: 'mdi-eye',  // 密码图标
        value: '',  // 密码内容
        type: 'password',  // 输入框类型
        rule: [
          v => !!v || '请填写您的密码!'
        ]
      },
      term: {
        value: false, // 条款
        rule: [
          v => !!v || '请认真阅读并同意条款与协议!'
        ]
      },
      otherMethods: [], // 其他登录方式
    },
    // 注册
    register: {
      value: null,  // 表单状态
      email: {  // 邮箱
        value: '',  // 邮箱号码
        rule: [
          v => !!v || '请填写您的邮箱信息!',
          v => /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(v) || '请输入正确的邮箱!',
        ]
      },
      evc: {  // 验证码
        value: '',
        rule: [
          v => !!v || '请填写验证码!',

        ]
      },
      term: {  // 条款
        value: false,
        rule: [
          v => !!v || '请认真阅读并同意条款与协议!'
        ]
      },
      btnCountDown: { // 按钮倒计时
        text: '获取验证码',  // 文本
        time: 60, // 时间
        disabled: false,  // 是否禁用
        clock: null
      }
    }
  }),
  methods: {
    // 重置按钮倒计时
    restBtnDownStatus () {
      // 清除 Interval
      clearInterval(this.register.btnCountDown.clock)

      // 恢复按钮初始状态
      this.register.btnCountDown.disabled = false
      this.register.btnCountDown.time = 60
      this.register.btnCountDown.text = '获取验证码'
    },
    // 获取验证码倒计时
    buttonCountDown () {
      // 每1秒执行对应代码片段
      this.register.btnCountDown.clock = setInterval(() => {
        if (this.register.btnCountDown.time - 1 == 0) {
          // 不需要再倒计时
          this.restBtnDownStatus()
        } else {
          // 继续倒计时
          this.register.btnCountDown.disabled = true  // 禁用按钮
          this.register.btnCountDown.time--  // 时间递减
          this.register.btnCountDown.text = this.register.btnCountDown.time + '秒重新获取'  // 修改按钮文本
        }
      }, 1000)
    },
    // 注册账号
    toRegister () {
      // 手动验证表单的状态
      let isSuccess = this.$refs.register_form.validate()
      if (!isSuccess) { return }
      else {
        // 请求服务器 -- 登录
        alert("验证成功！申请注册")
      }

    },
    // 获取其他登录的方式
    getOtherMethods () {
      // 请求服务器 --> 获取其他的登录方式
      this.login.otherMethods = [
        { id: 1, name: 'QQ', icon: 'mdi-qqchat', color: 'info', to: '' },
        { id: 2, name: '微信', icon: 'mdi-wechat', color: 'success', to: '' },
        { id: 3, name: '微博', icon: 'mdi-sina-weibo', color: 'error', to: '' }
      ]
    },
    // 登录账号
    toLogin () {
      // 手动验证表单的状态
      let isSuccess = this.$refs.login_form.validate()
      if (!isSuccess) { return }
      else {
        // 请求服务器 -- 登录
        alert("验证成功！请求登录")
      }

    },
    // 查看密码
    eyePasswordTextFiled () {
      if (this.login.password.type == 'password') {
        this.login.password.icon = 'mdi-eye-off'
        this.login.password.type = 'text'
      } else {
        this.login.password.icon = 'mdi-eye'
        this.login.password.type = 'password'
      }

    },
    // 获取推荐的博主
    getRecommendAuthor () {
      // 请求服务器 -> 获取推荐的博主
      this.remAuthor = {
        head_pic: 'https://cdn.vuetifyjs.com/images/john.jpg', // 头像
        nickname: '落叶归根', // 昵称
        canvases:
          '编程是爱好，恭喜你发现宝藏男孩一枚~希望你们关注我是因为喜欢我，嘿嘿！<br>' +
          '私人微信：kuangshenya 备注来意<br>' +
          '公众号：狂神说' // 个性签名
      }
    },
    // 获取登录对话框脚注链接
    getFooterLinks () {
      // 请求服务器 -> 获取登录对话框脚注链接
      this.footerLinks = [
        { id: 1, name: '知否咨询', to: '' },
        { id: 2, name: '关于我们', to: '' },
        { id: 3, name: '使用条款', to: '' },
        { id: 4, name: '帮助文档', to: '' },
      ]
    }
  },
  watch: {
    step (newData, oldData) {
      if (oldData == 1) { // 从登录窗口跳转到其他窗口
        // 清除登录表单的内容和状态
        this.$refs.login_form.reset()
      } else if (oldData == 2) {
        // 清除注册表单的内容和状态
        this.$refs.register_form.reset()
        // 清除倒计时
        this.restBtnDownStatus()
      }
    },
    show: {
      immediate: true,
      handler (newData) {
        if (newData) {
          // 获取推荐博主
          this.getRecommendAuthor()
        }
      }
    }

  },
  created () {
    // 监听一个关闭登录注册对话框的事件
    eventBus.$on('showLoginRegisterDialog', isShow => {
      this.show = isShow
    })

    // 获取登录对话框脚注链接
    this.getFooterLinks()

    // 获取其他登录方式
    this.getOtherMethods()
  }
}
</script>

<style lang='less' scoped>
// 对话框的背景颜色
.dialog_back {
  background-image: linear-gradient(to bottom, #3a485a, #607089);
}
</style>
