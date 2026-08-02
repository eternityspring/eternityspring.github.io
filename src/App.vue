<script>
  import { computed, onMounted, ref } from "vue";

  export default {
    setup(){
      const loading = ref(true)
      const showEarly = ref(false)
      const userInfo = ref({
        exp:[],
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
      let getUserInfo = async ()=>{
        userInfo.value = await fetch('./resume.json').then(res => res.json())
        loading.value = false
      }
      const calcDate = (birthday)=>{
        let birthdayDate = new Date(birthday);
        let todyDate = new Date();
        return todyDate.getYear() - birthdayDate.getYear()
      }
      onMounted(getUserInfo)
      return {
        calcDate,
        userInfo,
        loading,
        showEarly,
        projects,
      }
    }
  }
</script>

<template>
  <div class="main-container" v-if="!loading">
    <div class="useful-link no-print">
      <!--<a class="theme-link" href="/index2.html"></a>-->
      <a class="github-button" href="https://github.com/eternityspring/eternityspring.github.io" title="查看源码">
        <img src="../public/img/star.svg" alt="Github"><span>Star</span>
      </a>
    </div>
    <section class="section section-header">
      <div class="section-bg section-header-bg"></div>
      <div class="section-bg section-content-bg"></div>
      <div class="container">
        <header class="header">
          <div class="header-box">
            <div class="avatar wow inShow no-print">
              <img src="../public/img/logo.jpg" alt="logo" class="img-responsive">
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
                <div class="col-md-6 col-lg-3">
                  <div class="item wow inShow" data-wow-delay="0.3s">
                    <h4>性别</h4>
                    <div class="info">{{userInfo.sex}}</div>
                  </div>
                </div>
                <div class="col-md-6 col-lg-3">
                  <div class="item wow inShow" data-wow-delay="0.45s">
                    <h4>年龄</h4>
                    <div class="info">{{calcDate(userInfo.birthday)}}</div>
                  </div>
                </div>
                <div class="col-md-6 col-lg-3">
                  <div class="item wow inShow" data-wow-delay="0.5s" :href="'mailto:'+userInfo.email">
                    <h4>学历</h4>
                    <div class="info">{{userInfo.education}}</div>
                  </div>
                </div>
                <div class="col-md-6 col-lg-3">
                  <a class="item wow inShow" data-wow-delay="0.55s" :href="userInfo.website" target="_blank">
                    <h4>经验</h4>
                    <div class="info">{{userInfo.exp[0]+(calcDate(userInfo.workSince)-1)+userInfo.exp[1]+calcDate(userInfo.workSince)+userInfo.exp[2]}}</div>
                  </a>
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
            <h2 class="title">介绍&nbsp;/&nbsp;
              <small><i>Intro</i></small>
            </h2>
            <div class="description">介绍一些个人基本情况</div>
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
            <h2 class="title">工作经验&nbsp;/&nbsp;
              <small><i>Experience</i></small>
            </h2>
            <div class="description">不同时期简短的从业经历介绍</div>
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
            <h2 class="title">技能&nbsp;/&nbsp;
              <small><i>Skills</i></small>
            </h2>
            <div class="description">我所掌握的工具和技术栈</div>
          </div>
        </header>
        <div class="section-content">
          <div class="row skill">
            <div class="col-md-6" v-for="skill in userInfo.skill" :key="skill.name">
              <div class="item">
                <div class="text-info">
                  <span class="num text-light">{{skill.percent}}</span>{{skill.name}}
                </div>
                <div class="progress">
                  <div class="progress-bar wow progressShow" :style="'width:'+skill.percent"></div>
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
            <h2 class="title">项目经验&nbsp;/&nbsp;
              <small><i>Projects</i></small>
            </h2>
            <div class="description">近期主要做过的一些项目</div>
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
              {{showEarly ? '收起早期项目' : '查看早期项目（'+userInfo.earlyProject.length+' 项）'}}
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
            <h2 class="title">开源作品&nbsp;/&nbsp;
              <small><i>Open Source</i></small>
            </h2>
            <div class="description">业余时间做的一些开源项目</div>
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
            <h2 class="title">常逛&nbsp;/&nbsp;
              <small><i>Usually</i></small>
            </h2>
            <div class="description">经常逛的技术或者设计相关网站</div>
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
            <h2 class="title">联系&nbsp;/&nbsp;
              <small><i>Contact</i></small>
            </h2>
            <div class="description">通过这些信息可以联系到我</div>
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
            <div class="description wow inShow" data-wow-delay="0.05s">{{userInfo.slogan}}（{{userInfo.tips}}）</div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
