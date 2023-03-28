import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home'
import BlogHomeView from '@/views/Blog/BlogHomeView'
import ExamHomeView from '@/views/Exam/ExamHomeView'
import SchoolHomeView from '@/views/School/SchoolHomeView'
import FilmHomeView from '@/views/Film/FilmHomeView'
import BlogContentView from '@/views/Blog/BlogContentView'
import SchoolVideoPlayView from '@/views/School/SchoolVideoPlayView'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: 'home',
  },
  {
    path: '/home',
    name: '主页',
    component: Home,
  },
  {
    path: '/blog',
    name: '博客主页',
    component: BlogHomeView,
  },
  {
    path: '/exam',
    name: '考证主页',
    component: ExamHomeView,
  },
  {
    path: '/school',
    name: '学堂主页',
    component: SchoolHomeView,
  },
  {
    path: '/film',
    name: '影音主页',
    component: FilmHomeView,
  },
  {
    path: '/blog-content/:id',
    props: true,
    name: '博客详情页',
    component: BlogContentView,
  },
  {
    path: '/school-video-play/:id',
    props: true,
    name: '学堂视频播放页',
    component: SchoolVideoPlayView,
  },
]

const router = new VueRouter({
  routes,
})

export default router
