<template>
  <v-container
    fluid
    class="d-flex justify-center"
  >
    <!-- 左侧栏 ( 博主介绍、博主的其他博客、打分 ) -->
    <v-sheet width="300">
      <!-- 博主简介 -->
      <v-card elevation="4">
        <!-- 用户头像、昵称、个性签名 -->
        <v-container>
          <v-list-item class="px-0">
            <!-- 头像 -->
            <v-list-item-avatar>
              <v-img :src="author.headPic"></v-img>
            </v-list-item-avatar>

            <!-- 昵称、个性签名 -->
            <v-list-item-content>
              <v-list-item-title>{{ author.nickname }}</v-list-item-title>
              <v-list-item-subtitle class="grey--text">{{ author.signature }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-container>

        <!-- 粉丝数、获赞量、积分 -->
        <v-container class="text-center text-body-2">
          <v-row>
            <v-col>
              <div>{{ author.fansCount }}</div>
              <div class="grey--text">粉丝</div>
            </v-col>
            <v-col>
              <div>{{ author.likeCount }}</div>
              <div class="grey--text">获赞</div>
            </v-col>
            <v-col>
              <div>{{ author.integralCount | numFormat }}</div>
              <div class="grey--text">积分</div>
            </v-col>
          </v-row>
        </v-container>

        <!-- 关注、私信 -->
        <v-container>
          <v-row>
            <v-col>
              <v-btn
                block
                outlined
                rounded
                small
                color="info"
              >
                <v-icon class="mr-2">mdi-plus</v-icon>
                关注
              </v-btn>
            </v-col>
            <v-col>
              <v-btn
                block
                outlined
                rounded
                small
                color="warning"
              >
                <v-icon class="mr-2">mdi-chat-outline</v-icon>
                私信
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card>

      <!-- 博主文章 -->
      <v-card
        class="mt-5"
        elevation="4"
      >
        <v-container>
          <BlogListBox title="博主文章">
            <!-- 功能按钮 -->
            <template #actionBtn>
              <v-btn
                icon
                small
                text
                plain
              >
                <v-icon>mdi-dots-horizontal</v-icon>
              </v-btn>
            </template>

            <!-- 列表内容 -->
            <template #listContent>
              <!-- 热门博客的列表 -->
              <v-list dense>
                <v-list-item-group>
                  <v-list-item
                    class="px-1"
                    v-for="blog in blogs"
                    :key="blog.id"
                    :to="`/blog-content/${blog.id}`"
                  >
                    <v-list-item-content>
                      <v-list-item-title class="text-caption">{{ blog.title }}</v-list-item-title>
                    </v-list-item-content>
                    <v-list-item-action class="text-caption">{{ blog.read | numFormat }}</v-list-item-action>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </template>
          </BlogListBox>
        </v-container>
      </v-card>

      <!-- 对博客的评价 -->
      <v-card
        elevation="4"
        class="mt-5"
        style="position:sticky; top:80px;"
      >
        <v-container class="text-center">
          <v-subheader>觉得这篇博客怎样?</v-subheader>
          <v-rating
            large
            hover
            half-increments
            color="orange"
            v-model="ratingValue"
          ></v-rating>
        </v-container>
      </v-card>
    </v-sheet>

    <!-- 右侧栏 ( 博客主要内容 ) -->
    <v-sheet
      width="800"
      height="min-content"
      class="ml-5"
    >
      <!-- 博客内容卡片 -->
      <v-card elevation="4">
        <!-- 博客标题 -->
        <v-card-title class="font-weight-black text-h6">{{ blog.title }}</v-card-title>

        <!-- 类型 [ 原创, 翻译, 转载 ]、发布时间、浏览量、文章标签 -->
        <v-card-subtitle>
          <v-container class="grey lighten-4">
            <!-- 类型 [ 原创, 翻译, 转载 ] -->
            <v-chip
              label
              small
              color="error"
              class="mr-5"
            >{{ blog.type }}</v-chip>

            <!-- 发布时间 -->
            <span class="mr-5">发布时间: {{ blog.time }}</span>

            <!-- 浏览量 -->
            <span class="mr-5">
              <v-icon
                class="mr-1"
                color="grey lighten-1"
                size="20"
              >mdi-eye</v-icon>
              {{ blog.eye | numFormat }}
            </span>

            <!-- 文章标签 -->
            <span>文章标签：
              <v-chip
                label
                small
                color="#eee"
                class="mr-2"
                v-for="item in blog.label"
                :key="item.id"
                to=""
              >{{ item.name }}</v-chip>
            </span>
          </v-container>
        </v-card-subtitle>

        <!-- 文章的主要内容 -->
        <v-container
          class="mx-4"
          v-html="blog.content"
        ></v-container>
      </v-card>

      <!-- 回复评论 -->
      <v-card
        id="blogComment"
        elevation="4"
        class="mt-8"
      >
        <v-card-title class="font-weight-black text-h6">留下精彩评论</v-card-title>
        <v-card-text>
          <!-- 评论发送组件 -->
          <SendComment :textId="blog.id" :type="1"></SendComment>
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

    <!-- 悬浮按钮 -->
    <v-sheet
      color="transparent"
      class="text-caption text-center"
      style="position: fixed;right: 100px;bottom: 80px;"
    >
      <!-- 举报组 -->
      <div class="my-2">
        <v-btn
          fab
          outlined
          small
          color="grey"
          @click="showReportDialog"
        >
          <v-icon>mdi-alert-circle-outline</v-icon>
        </v-btn>
        <div class="mt-2 grey--text">举报</div>
      </div>

      <!-- 分享组 -->
      <div class="my-2">
        <v-btn
          fab
          outlined
          small
          color="orange"
        >
          <v-icon>mdi-share</v-icon>
        </v-btn>
        <div class="mt-2 orange--text">{{ blog.share | numFormat  }}</div>
      </div>

      <!-- 收藏组 -->
      <div class="my-2">
        <v-btn
          fab
          outlined
          small
          color="red"
        >
          <v-icon>mdi-star</v-icon>
        </v-btn>
        <div class="mt-2 red--text">{{ blog.collect | numFormat  }}</div>
      </div>

      <!-- 评论组 -->
      <div class="my-2">
        <v-btn
          fab
          outlined
          small
          color="blue"
          @click="$vuetify.goTo('#blogComment')"
        >
          <v-icon>mdi-message-text</v-icon>
        </v-btn>
        <div class="mt-2 blue--text">{{ blog.comment | numFormat }}</div>
      </div>

      <!-- 返回顶部 -->
      <div class="my-2">
        <v-btn
          fab
          color="info"
          @click="$vuetify.goTo(0)"
        >
          <v-icon>mdi-navigation</v-icon>
        </v-btn>
      </div>
    </v-sheet>

    <!-- 举报对话框 -->
    <ReportDialog></ReportDialog>
  </v-container>
</template>

<script>
import BlogListBox from '@/components/blog/BlogListBox.vue'
import ReportDialog from '@/components/report/ReportDialog.vue'
import eventBus from '@/utils/eventBus'
import SendComment from '@/components/comment/SendComment.vue'
import Comment from '@/components/comment/Comment.vue'

// 主题
import 'highlight.js/styles/androidstudio.css'
// 引入代码高亮的脚本
window.hljs = require('highlight.js')
// 引入代码行数显示的脚本
require('highlightjs-line-numbers.js')

export default {
  name: 'BlogContentView',
  props: ['id'],
  data: () => ({
    author: {},  // 博主信息
    blogs: [], // 博主博客
    ratingValue: null,  // 评分值
    blog: {}, // 博客
    comments: [], // 评论列表
  }),
  components: {
    BlogListBox,
    ReportDialog,
    SendComment,
    Comment
  },
  methods: {
    // 根据博客的编号查询博客
    getBlogById () {
      // 请求服务器 --> 根据博客编号获取博客内容
      this.blog = {
        id: 23,
        title: 'Java实现图片文件上传',
        time: '2022-12-10',
        type: '原创',
        eye: 24329,
        comment: 34523,
        share: 78,
        collect: 90,
        label: [
          { id: 1, name: 'JAVA' },
          { id: 2, name: 'JAVA WEB' },
          { id: 3, name: '图像上传' },
          { id: 4, name: 'WEB' },
          { id: 5, name: 'IT' },
        ],
        content: '<p>Java实现后台图片上传，将上传图片的接口进行分层，便于维护接口。</p>\n' +
          '<h3>接口部分（interface）</h3>\n' +
          '<p>将接口分为单图片上传以及多图片上传</p>\n' +
          '<pre>\n' +
          '<code class="language-java">public interface FileUploadService {\n' +
          '\t//单图片上传\n' +
          '    PicUploadResult uplodadImg(MultipartFile uploadFile, HttpServletRequest request);\n' +
          '\n' +
          '\t//多图片上传\n' +
          '    PicUploadResult uploadManyImg(MultipartFile[] uploadFile, HttpServletRequest request);\n' +
          '}\n' +
          '</code></pre>\n' +
          '<br>' +
          '<h3>接口实现类（interface impl）</h3>\n' +
          '<h4>上传图片方法类（主要）</h4>\n' +
          '<p>上传多个图片只是使用了数组的方式将文件存到<em>MultipartFile</em>里面。以防代码冗余，所以将实现方法抽出来</p>\n' +
          '<pre>\n' +
          '<code class="language-java">   /**\n' +
          '     * 上传图片方法类\n' +
          '     * @param multipartFile\n' +
          '     * @param request\n' +
          '     * @return\n' +
          '     */\n' +
          '    private PicUploadResult uploadImgMethod(MultipartFile multipartFile, HttpServletRequest request) {\n' +
          '        PicUploadResult picUploadResult = new PicUploadResult();\n' +
          '\n' +
          '        if (multipartFile.isEmpty()) {\n' +
          '            //返回选择文件提示\n' +
          '            picUploadResult.setLegal(false);\n' +
          '            return picUploadResult;\n' +
          '        }\n' +
          '        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd/");\n' +
          '        String format = sdf.format(new Date());\n' +
          '        //存放上传文件的文件夹\n' +
          '        File file = new File(baseFilePath + format);\n' +
          '        logger.info("-----------存放上传文件的文件夹【" + file + "】-----------");\n' +
          '        logger.info("-----------输出文件夹绝对路径 -- 这里的绝对路径是相当于当前项目的路径而不是“容器”路径【" + file.getAbsolutePath() + "】-----------");\n' +
          '        if (!file.isDirectory()) {\n' +
          '            //递归生成文件夹\n' +
          '            file.mkdirs();\n' +
          '        }\n' +
          '        //获取原始的名字  original:最初的，起始的  方法是得到原来的文件名在客户机的文件系统名称\n' +
          '        String oldName = multipartFile.getOriginalFilename();\n' +
          '        logger.info("-----------文件原始的名字【" + oldName + "】-----------");\n' +
          '        String newName = UUID.randomUUID().toString() + oldName.substring(oldName.lastIndexOf("."), oldName.length());\n' +
          '        logger.info("-----------文件要保存后的新名字【" + newName + "】-----------");\n' +
          '        try {\n' +
          '            //构建真实的文件路径\n' +
          '            File newFile = new File(file.getAbsolutePath() + File.separator + newName);\n' +
          '            //转存文件到指定路径，如果文件名重复的话，将会覆盖掉之前的文件,这里是把文件上传到 “绝对路径”\n' +
          '            multipartFile.transferTo(newFile);\n' +
          '            String filePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + "/picbook/" + UPLOAD_PATH_PREFIX + format + newName;\n' +
          '            logger.info("-----------【" + filePath + "】-----------");\n' +
          '            picUploadResult.setLegal(true);\n' +
          '            picUploadResult.setImgPath(filePath);\n' +
          '            return picUploadResult;\n' +
          '        } catch (Exception e) {\n' +
          '            e.printStackTrace();\n' +
          '        }\n' +
          '        picUploadResult.setLegal(false);\n' +
          '        return picUploadResult;\n' +
          '    }\n' +
          '</code></pre>\n' +
          '<br>' +
          '<h3>实现方法接口</h3>\n' +
          '\n' +
          '<h4>单图片上传</h4>\n' + '<br>' +
          '\n' +
          '<pre>\n' +
          '<code class="language-java">public PicUploadResult uplodadImg(MultipartFile multipartFile, HttpServletRequest request) {\n' +
          '    return uploadImgMethod(multipartFile, request);\n' +
          '}\n' +
          '</code></pre>\n' +
          '<br>' +
          '<h4>多图片上传</h4>\n' + '<br>' +
          '<pre>\n' +
          '<code class="language-java">public PicUploadResult uploadManyImg(MultipartFile[] uploadFile, HttpServletRequest request) {\n' +
          '\n' +
          '    List&lt;String&gt; imgPaths = new ArrayList&lt;&gt;();\n' +
          '    for (MultipartFile multipartFile : uploadFile) {\n' +
          '        PicUploadResult picUploadResult = uploadImgMethod(multipartFile, request);\n' +
          '        if(picUploadResult.isLegal()){\n' +
          '            imgPaths.add(picUploadResult.getImgPath());\n' +
          '        } else{\n' +
          '            return picUploadResult;\n' +
          '        }\n' +
          '\n' +
          '    }\n' +
          '\n' +
          '    PicUploadResult picUploadResult = new PicUploadResult();\n' +
          '    picUploadResult.setLegal(true);\n' +
          '    picUploadResult.setImgPahts(imgPaths);\n' +
          '    return picUploadResult;\n' +
          '}\n' +
          '</code></pre>\n' +
          '<br>' +
          '<h4>实现方法补充</h4>\n' +
          '<br>' +
          '<pre>\n' +
          '<code class="language-java">    // 项目上传至绝对路径(在yml里配置你的项目绝对路径)\n' +
          '    @Value("${file.save-path}")\n' +
          '    private String baseFilePath;\n' +
          '    // 项目根路径下的目录  -- SpringBoot static 目录相当于是根路径下（SpringBoot 默认）\n' +
          '    private final static String UPLOAD_PATH_PREFIX = "statics/uploadFile/";\n' +
          '</code></pre>\n' +
          '<br>' +
          '<h3>控制层</h3>\n' +
          '<br>' +
          '<pre>\n' +
          '<code class="language-java">public class FileUploadController {\n' +
          '    // 允许上传的格式 图片形式\n' +
          '    private static final String[] IMAGE_TYPE = new String[]{".bmp", ".jpg", ".jpeg", ".png"};\n' +
          '\n' +
          '    @Resource\n' +
          '    private FileUploadService fileUploadService;\n' +
          '\n' +
          '    @PostMapping("/uploadImg")\n' +
          '    public R uploadImg(@RequestParam("file") MultipartFile file, HttpServletRequest request) {\n' +
          '        boolean isFlag = false;\n' +
          '        for (String type : IMAGE_TYPE) {\n' +
          '            System.out.println(file.getOriginalFilename());\n' +
          '            if (StringUtils.endsWithIgnoreCase(file.getOriginalFilename(), type)) {\n' +
          '                isFlag = true;\n' +
          '                break;\n' +
          '            }\n' +
          '        }\n' +
          '\n' +
          '        if (isFlag) {\n' +
          '            PicUploadResult picUploadResult = fileUploadService.uplodadImg(file, request);\n' +
          '            boolean isLegal = picUploadResult.isLegal();\n' +
          '\n' +
          '            if (isLegal) {\n' +
          '                Map resMap = new HashMap&lt;&gt;();\n' +
          '                resMap.put("imgPath", picUploadResult.getImgPath());\n' +
          '                return R.ok(resMap);\n' +
          '            } else {\n' +
          '                return R.error("图片上传有误");\n' +
          '            }\n' +
          '        } else {\n' +
          '            return R.error("上传的图片格式必须为:bmp,jpg,jpeg,png");\n' +
          '        }\n' +
          '\n' +
          '    }\n' +
          '\n' +
          '    @PostMapping("/uploadManyImg")\n' +
          '    public R uploadManyImg(@RequestParam("files") MultipartFile[] files, HttpServletRequest request) {\n' +
          '        boolean isFlag = false;\n' +
          '        for (MultipartFile uploadFile : files) {\n' +
          '            for (String type : IMAGE_TYPE) {\n' +
          '                if (StringUtils.endsWithIgnoreCase(uploadFile.getOriginalFilename(), type)) {\n' +
          '                    isFlag = true;\n' +
          '                    break;\n' +
          '                }\n' +
          '            }\n' +
          '        }\n' +
          '\n' +
          '        if (isFlag) {\n' +
          '            PicUploadResult picUploadResult = fileUploadService.uploadManyImg(files, request);\n' +
          '            boolean isLegal = picUploadResult.isLegal();\n' +
          '\n' +
          '            if (isLegal) {\n' +
          '                Map resMap = new HashMap&lt;&gt;();\n' +
          '                resMap.put("imgPaths", picUploadResult.getImgPahts());\n' +
          '                return R.ok(resMap);\n' +
          '            } else {\n' +
          '                return R.error("图片上传有误");\n' +
          '            }\n' +
          '        } else {\n' +
          '            return R.error("上传的图片格式必须为:bmp,jpg,jpeg,png");\n' +
          '        }\n' +
          '    }\n' +
          '}\n' +
          '</code></pre>\n' +
          '<br>' +
          '<h3>工具类</h3>\n' +
          '\n' +
          '<p>根据实际情况添加所需的字段</p>\n' +
          '<pre>\n' +
          '<code class="language-java">public class PicUploadResult {\n' +
          '    private boolean isLegal;\n' +
          '    private String imgPath;\n' +
          '    private List&lt;String&gt; imgPahts;\n' +
          '}\n' +
          '</code></pre>'
      }
    },
    // 根据博客的编号查询博主的其他博客信息
    getBlogsByBlogId () {
      // 请求服务器 --> 通过博客的编号获取博主其他博客信息
      this.blogs = [
        { id: 1, title: '考前50分-四六级必考词汇预测', read: 483200 },
        { id: 2, title: '魔导国东征记－世界守护突破（622～624）三更！•OVERLORD', read: 154641 },
        { id: 3, title: 'FGO国服《妖精圆桌领域 阿瓦隆･勒･菲 星辰诞生之刻》2.6前篇主线概况攻略', read: 120005 },
        { id: 4, title: '1999元的miniLED HDR1000显示器HKC PG271Q简评', read: 100058 },
        { id: 5, title: '22年四六级翻译预测--共青团', read: 75645 },
      ]
    },
    // 根据博客的编号获取博主简介
    getAuthorByBlogId () {
      // 请求服务器获取博主简介
      this.author = {
        id: 1,
        nickname: '云中漫步ZDC',
        headPic: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
        signature: '人生自古谁无死，留取丹心照汗青',
        fansCount: 776,
        likeCount: 4543,
        integralCount: 24343,
      }
    },
    // 显示举报对话框
    showReportDialog () {
      eventBus.isShowReportDialog(true, '举报博客', 1, this.blog.id)
    },
    // 获取博客的评论列表(一级楼层)
    getComments () {
      // 请求服务器 --> 获取评论列表(一级评论)
      this.comments = [{ id: 1, text: '阿姨，我不想努力了', time: '2022-07-07 20:47:23', isAuthorLiked: false, top: true, like: 234, noLike: 1241, count: 4, commentator: { id: 23, nickname: '开心的太阳花朵朵', headPic: 'https://img2.woyaogexing.com/2022/07/18/3b040b92628a8f23!400x400.jpg' } }, { id: 2, text: '你的文章也是我白嫖的动力。', time: '2022-07-12 12:08:09', isAuthorLiked: false, top: false, like: 89, noLike: 1, count: 0, commentator: { id: 24, nickname: '爷不考剑桥了', headPic: 'https://img2.woyaogexing.com/2022/07/18/96e2d160eb4d466d!400x400.jpg', } }, { id: 3, text: '下学期要学，先收藏了', time: '2022-07-19 09:34:11', isAuthorLiked: true, top: false, like: 56, noLike: 6, count: 0, commentator: { id: 34, nickname: 'august殇', headPic: 'https://img2.woyaogexing.com/2022/07/18/8faf925dfca62a52!400x400.jpg' } }, { id: 4, text: '讲的你还别说，真的不错', time: '2020-07-19 09:34:11', isAuthorLiked: false, top: false, like: 21, noLike: 45, count: 3, commentator: { id: 78, nickname: '大侠带你走', headPic: 'https://img2.woyaogexing.com/2022/07/18/79c32764c11c818c!400x400.jpg' } }]
    }
  },
  created () {
    // 根据博客的编号查询博主简介
    this.getAuthorByBlogId()

    // 根据博客的编号查询博主的其他博客信息
    this.getBlogsByBlogId()

    // 根据博客的编号查询博客
    this.getBlogById()

    // 获取博客的评论列表(一级楼层)
    this.getComments()
  },
  // 页面加载成功后执行
  mounted () {
    // 代码高亮
    hljs.highlightAll()
    // 代码行数
    hljs.initLineNumbersOnLoad()

    // 自动触发 'changeTab' 事件，更改头部应用栏为 'blog'
    eventBus.setToolbarTabValue('/blog')
  }
}
</script>

<style>
code {
  font-family: Consolas;
  font-size: 14px;
  /* 限制代码高亮区域的宽度 */
  width: calc(100% - 32px);
}

td.hljs-ln-line.hljs-ln-numbers {
  text-align: right;
  padding-right: 16px;
}
</style>
