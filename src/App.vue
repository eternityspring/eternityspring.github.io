<script>
  import { computed, onMounted, ref } from "vue";
  import { Languages } from "@lucide/vue";

  export default {
    components: {
      Languages,
    },
    setup(){
      const loading = ref(true)
      const showEarly = ref(false)
      const getInitialLocale = () => {
        const requestedLocale = new URLSearchParams(window.location.search).get('lang')
        if (requestedLocale === 'zh' || requestedLocale === 'en') {
          return requestedLocale
        }

        const browserLocale = navigator.languages?.[0] || navigator.language || 'en'
        return browserLocale.toLowerCase().startsWith('zh') ? 'zh' : 'en'
      }
      const locale = ref(getInitialLocale())
      const messages = {
        zh: {
          pageTitle: '王烁皓的在线简历',
          languageSwitch: 'English',
          languageSwitchLabel: 'Switch to English',
          sections: {
            intro: ['介绍', 'Intro', '介绍一些个人基本情况'],
            experience: ['工作经验', 'Experience', '不同时期简短的从业经历介绍'],
            skills: ['技能', 'Skills', '我所掌握的工具和技术栈'],
            projects: ['项目经验', 'Projects', '近期主要做过的一些项目'],
            sideProjects: ['个人作品', 'Side Projects', '业余时间做的一些东西'],
            communities: ['常逛', 'Usually', '经常逛的技术或者设计相关网站'],
            contact: ['联系', 'Contact', '通过这些信息可以联系到我'],
          },
          showEarly: count => `查看早期项目（${count} 项）`,
          hideEarly: '收起早期项目',
          tipPrefix: '（',
          tipSuffix: '）',
        },
        en: {
          pageTitle: 'Wesley Wang — Frontend & Full-Stack Engineer',
          languageSwitch: '中文',
          languageSwitchLabel: '切换到中文版',
          sections: {
            intro: ['About', 'Profile', 'A concise overview of my background and focus'],
            experience: ['Experience', 'Career', 'Roles, responsibilities, and engineering impact'],
            skills: ['Skills', 'Expertise', 'Technologies and engineering capabilities'],
            projects: ['Projects', 'Selected Work', 'Recent products and systems I have built'],
            sideProjects: ['Side Projects', 'Open Source', 'Products and tools built outside client work'],
            communities: ['Communities', 'Around the Web', 'Where I follow technology, design, and other builders'],
            contact: ['Contact', 'Get in Touch', 'Ways to reach me'],
          },
          showEarly: count => `View ${count} earlier projects`,
          hideEarly: 'Hide earlier projects',
          tipPrefix: ' · ',
          tipSuffix: '',
        },
      }
      const userInfo = ref({
        highlights:[],
        qq:{},
        wechat:{},
        intro:{
          content:[],
          technology:{
            title:'',
            content:[]
          }
        },
        experience:[{
          tips:{
            title:'',
            content:[],
          },
          technology:[],
        }],
        skill:[],
        project:[{
          tips:{
            title:'',
            content:[],
          },
          technology:[],
        }],
        earlyProject:[],
        openSource:[],
        usually:[],
      })
      const projects = computed(()=> showEarly.value
        ? userInfo.value.project.concat(userInfo.value.earlyProject)
        : userInfo.value.project)
      const labels = computed(() => messages[locale.value])
      const localeHref = computed(() => {
        const url = new URL(window.location.href)
        url.searchParams.set('lang', locale.value === 'en' ? 'zh' : 'en')
        return `${url.pathname}${url.search}${url.hash}`
      })
      const getUserInfo = async ()=>{
        const source = locale.value === 'en' ? './resume-en.json' : './resume.json'
        userInfo.value = await fetch(source).then(res => res.json())
        document.documentElement.lang = locale.value === 'en' ? 'en' : 'zh-CN'
        document.title = labels.value.pageTitle
        loading.value = false
      }
      onMounted(getUserInfo)
      return {
        userInfo,
        loading,
        showEarly,
        projects,
        labels,
        localeHref,
      }
    }
  }
</script>

<template>
  <div class="main-container" v-if="!loading">
    <div class="useful-link no-print">
      <!--<a class="theme-link" href="/index2.html"></a>-->
      <a class="language-switch" :href="localeHref" :title="labels.languageSwitchLabel" :aria-label="labels.languageSwitchLabel">
        <Languages :size="14" :stroke-width="1.8" aria-hidden="true" />
        <span class="sr-only">{{labels.languageSwitch}}</span>
      </a>
    </div>
    <section class="section section-header">
      <div class="section-bg section-header-bg"></div>
      <div class="section-bg section-content-bg"></div>
      <div class="container">
        <header class="header">
          <div class="header-box">
            <div class="avatar wow inShow no-print">
              <img src="../public/img/logo.png" alt="logo" class="img-responsive">
            </div>
            <h1 class="name text-center wow inShow no-print">{{userInfo.nickname}}</h1>
            <h1 class="name text-center hide show-print-block">{{userInfo.name}}</h1>
          </div>
        </header>
        <div class="section-content">
          <div class="content-box">
            <div class="name-slogan">
              <h2 class="wow inShow no-print" data-wow-delay="0.1s">
                <span class="text-light">{{userInfo.lastName}}</span>&nbsp;{{userInfo.firstName}}
              </h2>
              <div class="description wow inShow" data-wow-delay="0.15s">{{userInfo.slogan}}</div>
            </div>
            <div class="contact-info">
              <div class="row">
                <div class="col-md-6 col-lg-3" v-for="(hl,hlIndex) in userInfo.highlights" :key="hlIndex">
                  <div class="item wow inShow">
                    <h4>{{hl.label}}</h4>
                    <div class="info">{{hl.value}}</div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6 col-lg-3">
                  <div class="item wow inShow wechat" data-wow-delay="0.6s">
                    <h4>WeChat</h4>
                    <address class="info">{{userInfo.wechat.number}}</address>
                    <div class="qr no-print" v-if="userInfo.wechat.qr">
                      <img :src="userInfo.wechat.qr" alt="WeChat QR">
                    </div>
                  </div>
                </div>
                <div class="col-md-6 col-lg-3">
                  <div class="item wow inShow" data-wow-delay="0.65s">
                    <h4>QQ</h4>
                    <div class="info">{{userInfo.qq.number}}</div>
                  </div>
                </div>
                <div class="col-md-6 col-lg-3">
                  <a class="item wow inShow" data-wow-delay="0.7s" :href="userInfo.website" target="_blank">
                    <h4>Website</h4>
                    <div class="info">{{userInfo.website}}</div>
                  </a>
                </div>
                <div class="col-md-6 col-lg-3">
                  <a class="item wow inShow" data-wow-delay="0.75s" :href="userInfo.github" target="_blank">
                    <h4>Github</h4>
                    <div class="info">{{userInfo.github}}</div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="section-bg section-header-bg"></div>
        <div class="section-bg section-content-bg"></div>
        <header class="header">
          <div class="content-box">
            <h2 class="title">{{labels.sections.intro[0]}}&nbsp;/&nbsp;
              <small><i>{{labels.sections.intro[1]}}</i></small>
            </h2>
            <div class="description">{{labels.sections.intro[2]}}</div>
          </div>
        </header>
        <div class="section-content">
          <div class="intro">
            <p v-for="(intro,idx) in userInfo.intro.content" :key="idx" v-html="intro"></p>
          </div>
          <div class="technology">
            <ul class="inline">
              <li><b>{{userInfo.intro.technology.title}}</b></li>
              <li v-for="item in userInfo.intro.technology.content" :key="item">{{item}}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="section-bg section-header-bg"></div>
        <div class="section-bg section-content-bg"></div>
        <header class="header">
          <div class="content-box">
            <h2 class="title">{{labels.sections.experience[0]}}&nbsp;/&nbsp;
              <small><i>{{labels.sections.experience[1]}}</i></small>
            </h2>
            <div class="description">{{labels.sections.experience[2]}}</div>
          </div>
        </header>
        <div class="section-content">
          <div class="experience">
            <div class="item" v-for="item in userInfo.experience" :key="item.title">
              <div class="row">
                <div class="col-md-5">
                  <div class="time">{{item.time}}</div>
                  <div class="title">{{item.title}}</div>
                  <div class="description">{{item.intro}}</div>
                </div>
                <div class="col-md-7">
                  <div class="content">{{item.description}}</div>
                  <div class="tips" v-for="tip in item.tips" :key="tip.title">
                    <b>{{tip.title}}</b>
                    <ul>
                      <li v-for="list in tip.content" :key="list">{{list}}</li>
                    </ul>
                  </div>
                  <div class="technology" v-for="tech in item.technology" :key="tech.title">
                    <b>{{tech.title}}</b>
                    <ul class="inline">
                      <li v-for="techItem in tech.content" :key="techItem">{{techItem}}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="section-bg section-header-bg"></div>
        <div class="section-bg section-content-bg"></div>
        <header class="header">
          <div class="content-box">
            <h2 class="title">{{labels.sections.skills[0]}}&nbsp;/&nbsp;
              <small><i>{{labels.sections.skills[1]}}</i></small>
            </h2>
            <div class="description">{{labels.sections.skills[2]}}</div>
          </div>
        </header>
        <div class="section-content">
          <div class="skill">
            <div class="group" v-for="(group,groupIndex) in userInfo.skill" :key="groupIndex">
              <b>{{group.title}}</b>
              <ul class="inline">
                <li v-for="item in group.content" :key="item">{{item}}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="section-bg section-header-bg"></div>
        <div class="section-bg section-content-bg"></div>
        <header class="header">
          <div class="content-box">
            <h2 class="title">{{labels.sections.projects[0]}}&nbsp;/&nbsp;
              <small><i>{{labels.sections.projects[1]}}</i></small>
            </h2>
            <div class="description">{{labels.sections.projects[2]}}</div>
          </div>
        </header>
        <div class="section-content">
          <div class="experience">
            <div class="item" v-for="(item,idx) in projects" :key="idx"
                 :class="{'no-print':idx>=userInfo.project.length}">
              <div class="row">
                <div class="col-md-5">
                  <div class="time">{{item.time}}</div>
                  <div class="title">{{item.title}}</div>
                  <div class="description">{{item.intro}}</div>
                </div>
                <div class="col-md-7">
                  <div class="content">{{item.description}}</div>
                  <div class="tips" v-for="tip in item.tips" :key="tip.title">
                    <b>{{tip.title}}</b>
                    <ul>
                      <li v-for="list in tip.content" :key="list">{{list}}</li>
                    </ul>
                  </div>
                  <div class="technology" v-for="tech in item.technology" :key="tech.title">
                    <b>{{tech.title}}</b>
                    <ul class="inline">
                      <li v-for="(techItem,techItemIndex) in tech.content" :key="techItemIndex">{{techItem}}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="early-toggle no-print">
            <a @click="showEarly = !showEarly">
              {{showEarly ? labels.hideEarly : labels.showEarly(userInfo.earlyProject.length)}}
              <span class="arrow" :class="{open:showEarly}">▾</span>
            </a>
          </div>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="section-bg section-header-bg"></div>
        <div class="section-bg section-content-bg"></div>
        <header class="header">
          <div class="content-box">
            <h2 class="title">{{labels.sections.sideProjects[0]}}&nbsp;/&nbsp;
              <small><i>{{labels.sections.sideProjects[1]}}</i></small>
            </h2>
            <div class="description">{{labels.sections.sideProjects[2]}}</div>
          </div>
        </header>
        <div class="section-content">
          <div class="row usually open-source">
            <div class="col-lg-4 col-md-6" v-for="(repo,repoIndex) in userInfo.openSource" :key="repoIndex">
              <a v-if="repo.link" :href="repo.link" target="_blank" class="item" :title="repo.link">
                <h3 class="text-light">{{repo.name}}</h3>
                <p>{{repo.description}}</p>
              </a>
              <div v-if="!repo.link" class="item">
                <h3 class="text-light">{{repo.name}}</h3>
                <p>{{repo.description}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="section-bg section-header-bg"></div>
        <div class="section-bg section-content-bg"></div>
        <header class="header">
          <div class="content-box">
            <h2 class="title">{{labels.sections.communities[0]}}&nbsp;/&nbsp;
              <small><i>{{labels.sections.communities[1]}}</i></small>
            </h2>
            <div class="description">{{labels.sections.communities[2]}}</div>
          </div>
        </header>
        <div class="section-content">
          <div class="row usually">
            <div class="col-lg-4 col-md-6" v-for="(usually,usuallyIndex) in userInfo.usually" :key="usuallyIndex">
              <a v-if="usually.link" :href="usually.link" target="_blank" class="item" :title="usually.link">
                <i class="fa fa-github"></i>
                <h3 class="text-light">{{usually.name}}</h3>
                <p>{{usually.description}}</p>
              </a>
              <div v-if="!usually.link" class="item" :title="usually.link">
                <i class="fa fa-github"></i>
                <h3 class="text-light">{{usually.name}}</h3>
                <p>{{usually.description}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="section no-print">
      <div class="container">
        <div class="section-bg section-header-bg"></div>
        <div class="section-bg section-content-bg"></div>
        <header class="header">
          <div class="content-box">
            <h2 class="title">{{labels.sections.contact[0]}}&nbsp;/&nbsp;
              <small><i>{{labels.sections.contact[1]}}</i></small>
            </h2>
            <div class="description">{{labels.sections.contact[2]}}</div>
          </div>
        </header>
        <div class="section-content">
          <div class="contact">
            <div class="row">
              <div class="col-md-6 col-lg-3">
                <div class="item wechat">
                  <h4>WeChat</h4>
                  <div class="info">{{userInfo.wechat.number}}</div>
                  <div class="qr no-print" v-if="userInfo.wechat.qr">
                    <img :src="userInfo.wechat.qr" alt="WeChat QR">
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-lg-3">
                <div class="item">
                  <h4>QQ</h4>
                  <div class="info">{{userInfo.qq.number}}</div>
                </div>
              </div>
              <div class="col-md-6 col-lg-3">
                <div class="item">
                  <h4>Location</h4>
                  <div class="info">{{userInfo.location}}</div>
                </div>
              </div>
              <div class="col-md-6 col-lg-3">
                <a class="item" :href="'mailto:'+userInfo.email">
                  <h4>Email</h4>
                  <div class="info">{{userInfo.email}}</div>
                </a>
              </div>
            </div>
          </div>
          <div class="name-slogan">
            <h2 class="wow inShow">
              <span class="text-light">{{userInfo.lastName}}</span>&nbsp;{{userInfo.firstName}}
            </h2>
            <div class="description wow inShow" data-wow-delay="0.05s">{{userInfo.slogan}}{{labels.tipPrefix}}{{userInfo.tips}}{{labels.tipSuffix}}</div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
