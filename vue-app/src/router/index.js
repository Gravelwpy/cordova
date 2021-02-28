import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

import message from '@/pages/message/message'
import my from '@/pages/my/my'
import personinfo from '@/pages/my/personinfo'
import edit_personInfo from '@/pages/my/edit_personInfo'
import schedule from '@/pages/schedule/schedule'
import studentsignrecord from '@/pages/sign/studentsignrecord'
import sign from '@/pages/sign/sign'
import messagemanagement from '@/pages/sign/messagemanagement'
import sutdengsignresult from '@/pages/sign/sutdengsignresult'
import studentsign from '@/pages/sign/studentsign'
import studentsigndetail from '@/pages/sign/studentsigndetail'
import signmanagement from '@/pages/sign/signmanagement'
import creatnewsign from '@/pages/sign/creatnewsign'
import selectLocation from '@/pages/sign/selectLocation'
import login from '@/pages/login/login'
import loginbak from '@/pages/login/loginbak'
import register from '@/pages/register/register'
import messageadd from '@/pages/message/messageadd'
import hallSeat from '@/pages/sign/hallSeat'
import addsign from '@/pages/sign/addsign'
import wifiget from '@/pages/wifi/wifiget'
import wifiTest from '@/pages/wifi/wifiTest'
import seat from '@/pages/seat/seat'
import question from '@/pages/question/question'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/schedule',
      name: 'schedule',
      component: schedule
    },
    {
      path: '/sign',
      name: 'sign',
      component: sign
    },
    {
      path: '/message',
      name: 'message',
      component: message
    },
    {
      path: '/my',
      name: 'my',
      component: my
    },
    {
      path: '/personinfo',
      name: 'personinfo',
      component: personinfo
    },
    {
      path: '/edit_personInfo',
      name: 'edit_personInfo',
      component: edit_personInfo
    },
    {
      path: '/selectLocation',
      name: 'selectLocation',
      component: selectLocation
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/loginbak',
      name: 'loginbak',
      component: loginbak
    },
    {
      path: '/messageadd',
      name: 'messageadd',
      component: messageadd
    },
    {
      path: '/hallSeat',
      name: 'hallSeat',
      component: hallSeat
    },
    {
      path: '/addsign',
      name: 'addsign',
      component: addsign
    },
    {
      path: '/wifiget',
      name: 'wifiget',
      component: wifiget
    },
    {
      path: '/wifiTest',
      name: 'wifiTest',
      component: wifiTest
    },
    {
      path: '/seat',
      name: 'seat',
      component: seat
    },
    {
      path: '/question',
      name: 'question',
      component: question
    },
    {
      path: '/creatnewsign',
      name: 'creatnewsign',
      component: creatnewsign
    },
    {
      path: '/signmanagement',
      name: 'signmanagement',
      component: signmanagement
    },
    {
      path: '/studentsign',
      name: 'studentsign',
      component: studentsign
    },
    {
      path: '/studentsigndetail',
      name: 'studentsigndetail',
      component: studentsigndetail
    },
    {
      path: '/sutdengsignresult',
      name: 'sutdengsignresult',
      component: sutdengsignresult
    },
    {
      path: '/messagemanagement',
      name: 'messagemanagement',
      component: messagemanagement
    },
    {
      path: '/studentsignrecord',
      name: 'studentsignrecord',
      component: studentsignrecord
    },
  ]
})
