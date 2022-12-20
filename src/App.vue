<script setup>
import anime from "animejs/lib/anime.es.js";
import {
  ref,
  reactive,
  onMounted,
  watchEffect,
  nextTick,
  onUpdated,
} from "vue";
const easings = ["easeInOutQuad", "easeInOutCirc", "easeInOutSine", "spring"];
const reasonsList = reactive({
  list: [
    {
      imgName: "join_1.png",
      title: "共同創造未來",
      text: "創意發想與設計需要跳脫框架，我們相信透過團隊創意激盪，共享共學可以激發更多靈感並做出具影響力的事。",
    },
    {
      imgName: "join_2.png",
      title: "領導專案執行",
      text: "在這除了能參與產品專案，甚至將有機會參與並主導專案或計畫的進行，讓你在短時間內累積豐富且扎實的實戰經驗。",
    },
    {
      imgName: "join_3.png",
      title: "技能課程培訓",
      text: "依實習需求可參多元的內部訓練課程，如元宇宙開發、設計實務相關課程等，讓你在實習期間收穫滿滿！",
    },
    {
      imgName: "join_4.png",
      title: "升遷正職機會",
      text: "實習期間若表現優異，我們將會非常歡迎您成為我們的正職夥伴，未來與我們一起共事並成長茁壯！",
    },
  ],
});
let isMobile = ref(false);
let windowWidth = ref(window.innerWidth);
let trianglePoints = ref(null);
const decElRef = ref(null); //環境小人圖Dom

function fitElementToParent(el, padding) {
  var timeout = null;
  function resize() {
    if (timeout) clearTimeout(timeout);
    anime.set(el, { scale: 1 });
    var pad = padding || 0;
    var parentEl = el.parentNode;
    var elOffsetWidth = el.offsetWidth - pad;
    var parentOffsetWidth = parentEl.offsetWidth;
    var ratio = parentOffsetWidth / elOffsetWidth;
    timeout = setTimeout(anime.set(el, { scale: ratio }), 100);
  }
  resize();
  window.addEventListener("resize", resize);
}
function createKeyframes(value) {
  var keyframes = [];
  for (var i = 0; i < 30; i++) keyframes.push({ value: value });
  return keyframes;
}
function animateShape(el) {
  var circleEl = el.querySelector("circle");
  var rectEl = el.querySelector("rect");
  var polyEl = el.querySelector("polygon");

  var animation = anime
    .timeline({
      targets: el,
      duration: function () {
        return anime.random(600, 2200);
      },
      easing: function () {
        return easings[anime.random(0, easings.length - 1)];
      },
      complete: function (anim) {
        animateShape(anim.animatables[0].target);
      },
    })
    .add(
      {
        translateX: createKeyframes(function (el) {
          return el.classList.contains("large")
            ? anime.random(-300, 300)
            : anime.random(-520, 520);
        }),
        translateY: createKeyframes(function (el) {
          return el.classList.contains("large")
            ? anime.random(-110, 110)
            : anime.random(-280, 280);
        }),
        rotate: createKeyframes(function () {
          return anime.random(-180, 180);
        }),
      },
      0
    );
  if (circleEl) {
    animation.add(
      {
        targets: circleEl,
        r: createKeyframes(function () {
          return anime.random(32, 72);
        }),
      },
      0
    );
  }
  if (rectEl) {
    animation.add(
      {
        targets: rectEl,
        width: createKeyframes(function () {
          return anime.random(64, 120);
        }),
        height: createKeyframes(function () {
          return anime.random(64, 120);
        }),
      },
      0
    );
  }
  //RWD拖拉error先註解(不影響)
  if (polyEl) {
    // animation.add(
    //   {
    //     targets: polyEl,
    //     points: createKeyframes(function () {
    //       var scale = anime.random(72, 180) / 100;
    //       return trianglePoints.value
    //         .map(function (p) {
    //           return p * scale;
    //         })
    //         .join(" ");
    //     }),
    //   },
    //   0
    // );
  }
}
function headerAnimate() {
  nextTick(() => {
    var layeredAnimationEl = document.querySelector(".layered-animations");
    var shapeEls = layeredAnimationEl.querySelectorAll(".shape");
    var triangleEl = layeredAnimationEl.querySelector("polygon");
    trianglePoints.value = triangleEl.getAttribute("points").split(" ");
    fitElementToParent(layeredAnimationEl);
    for (var i = 0; i < shapeEls.length; i++) {
      animateShape(shapeEls[i]);
    }
  });
}
const getImageUrl = (name) => {
  return new URL(`./assets/images/${name}`, import.meta.url).href;
};

onMounted(() => {
  window.addEventListener("scroll", (e) => {
    if (!isMobile.value) {
      nextTick(() => {
        let decElTop = decElRef.value.getBoundingClientRect().top;
        if (window.scrollY - 650 < decElTop) {
          decElRef.value.classList.remove("show");
        } else {
          decElRef.value.classList.add("show");
        }
      });
    }
  }); //監聽滾動事件
  window.addEventListener("resize", function () {
    windowWidth.value = window.innerWidth;
  });
  if (!isMobile.value) headerAnimate();
});
onUpdated(() => {
  if (!isMobile.value) headerAnimate();
});
watchEffect(() => {
  isMobile.value = windowWidth.value <= 768 ? true : false;
});
</script>

<template>
  <div
    v-if="isMobile"
    class="mobile_wrap flex h-[100vh] items-center justify-center p-[26px]"
  >
    <img src="./assets/images/ch_device.png" alt="" />
  </div>
  <div v-else>
    <!-- header -->
    <header id="header">
      <div class="container mx-auto px-4">
        <div class="content item-start flex items-center justify-start">
          <div class="text">
            <div class="logo">
              <img src="./assets/images/logo.png" alt="" />
              <div class="dep sub-text">資訊技術分公司｜綜合企劃處</div>
            </div>

            <div class="main">
              <div class="title">服務發展設計中心</div>
              <div class="title">2023實習計畫</div>
              <div class="sub-text">
                CHT Design Center Internship program 2023
              </div>
              <div class="sub-title">一起成為未來造夢師</div>
              <a
                href="https://forms.gle/FQtiLn7qntmVTHuQA"
                target="_blank"
                class="button apply"
                >立即投遞 <i class="fa-solid fa-arrow-right"></i
              ></a>
            </div>
          </div>
        </div>
      </div>
      <div class="scroll-next">
        <a href="#section1" v-smooth-scroll><span></span></a>
      </div>
      <img class="person" src="./assets/images/header_person.png" alt="" />
      <div class="haloBallBg haloBall_1"></div>
      <div class="haloBallBg haloBall_2"></div>
      <div class="haloBallBg haloBall_3"></div>
      <!-- animation block -->
      <div class="animation-wrapper">
        <div class="layered-animations">
          <svg class="large shape" viewBox="0 0 96 96">
            <defs>
              <linearGradient
                id="circleGradient"
                x1="0%"
                x2="100%"
                y1="20%"
                y2="80%"
              >
                <stop stop-color="#373734" offset="0%" />
                <stop stop-color="#242423" offset="50%" />
                <stop stop-color="#0D0D0C" offset="100%" />
              </linearGradient>
            </defs>
            <circle
              cx="48"
              cy="48"
              r="28"
              fill-rule="evenodd"
              stroke-linecap="square"
              fill="url(#circleGradient)"
            />
          </svg>
          <svg class="small shape color-red" viewBox="0 0 96 96">
            <polygon
              fill-rule="evenodd"
              points="48 17.28 86.4 80.11584 9.6 80.11584"
              stroke-linecap="square"
            />
          </svg>
          <svg class="large shape" viewBox="0 0 96 96">
            <defs>
              <linearGradient
                id="triangleGradient"
                x1="0%"
                x2="100%"
                y1="20%"
                y2="80%"
              >
                <stop stop-color="#373734" offset="0%" />
                <stop stop-color="#242423" offset="50%" />
                <stop stop-color="#0D0D0C" offset="100%" />
              </linearGradient>
            </defs>
            <polygon
              fill-rule="evenodd"
              points="48 17.28 86.4 80.11584 9.6 80.11584"
              stroke-linecap="square"
              fill="url(#triangleGradient)"
            />
          </svg>
          <svg class="x-small shape" viewBox="0 0 96 96">
            <polygon
              fill-rule="evenodd"
              points="48 17.28 86.4 80.11584 9.6 80.11584"
              stroke-linecap="square"
            />
          </svg>
          <svg class="x-small shape" viewBox="0 0 96 96">
            <rect
              width="48"
              height="48"
              x="24"
              y="24"
              fill-rule="evenodd"
              stroke-linecap="square"
            />
          </svg>
          <svg class="small shape color-red" viewBox="0 0 96 96">
            <rect
              width="48"
              height="48"
              x="24"
              y="24"
              fill-rule="evenodd"
              stroke-linecap="square"
            />
          </svg>
          <svg class="large shape" viewBox="0 0 96 96">
            <defs>
              <linearGradient
                id="rectGradient"
                x1="0%"
                x2="100%"
                y1="20%"
                y2="80%"
              >
                <stop stop-color="#373734" offset="0%" />
                <stop stop-color="#242423" offset="50%" />
                <stop stop-color="#0D0D0C" offset="100%" />
              </linearGradient>
            </defs>
            <rect
              width="48"
              height="48"
              x="24"
              y="24"
              fill-rule="evenodd"
              stroke-linecap="square"
              fill="url(#rectGradient)"
            />
          </svg>
          <svg class="small shape color-red" viewBox="0 0 96 96">
            <circle
              cx="48"
              cy="48"
              r="32"
              fill-rule="evenodd"
              stroke-linecap="square"
            />
          </svg>
          <svg class="x-small shape" viewBox="0 0 96 96">
            <circle
              cx="48"
              cy="48"
              r="32"
              fill-rule="evenodd"
              stroke-linecap="square"
            />
          </svg>
        </div>
      </div>
    </header>
    <!-- why join us -->
    <section id="section1" class="relative">
      <div class="title">為什麼要加入我們 ?</div>
      <div class="content container mx-auto">
        <ul class="flex flex-wrap">
          <li v-for="(item, index) in reasonsList.list" :key="index">
            <div class="slogan flex flex-col items-center justify-center">
              <img :src="getImageUrl(item.imgName)" alt="" />
              <div class="img-text sub-title">{{ item.title }}</div>
            </div>
            <div class="text text-justify">{{ item.text }}</div>
          </li>
        </ul>
      </div>
      <div class="haloBallBg haloBall_1"></div>
    </section>
    <!-- environment -->
    <section id="section2" class="relative">
      <div class="title under-line">我們的工作環境</div>
      <div class="content container mx-auto px-[26px]">
        <div class="text mx-auto text-center">
          設計者最重要的就是不受拘束，有別於傳統的辦公場域，開放式的工作環境，讓你在有問題時可以隨時討論，活潑的環境色彩，隨時激發你的創意力！
          溫馨放鬆的訪談室除了能傾聽顧客聲音外，也是我們團隊情感交流的好去處
        </div>
        <div class="image-wall">
          <div class="image-group flex">
            <div class="left">
              <img src="./assets/images/en_group_1.jpg" alt="" />
            </div>
            <div class="right">
              <div class="right-top flex">
                <div ref="decElRef" class="dec-1">
                  <img src="./assets/images/en_dec_1.png" alt="" />
                </div>
                <div class="right-top-left">
                  <img src="./assets/images/en_group_3.jpg" alt="" />
                </div>
                <div class="right-top-right relative">
                  <img src="./assets/images/en_group_4.png" alt="" />
                </div>
              </div>
              <div class="right-bottom">
                <img src="./assets/images/en_group_2.png" alt="" />
              </div>
            </div>
          </div>
          <div class="image-spacial relative">
            <div class="image-intro">
              <img src="./assets/images/en_intro_1.png" alt="" />
            </div>
            <div class="tag text-left">
              <div class="sub-title">設計新知分享</div>
              <div class="title">除了輸出，也要輸入</div>
            </div>
            <div class="haloBallBg haloBall_1"></div>
          </div>
          <div class="image-spacial relative">
            <div class="image-intro">
              <img src="./assets/images/en_intro_2.png" alt="" />
            </div>
            <div class="tag text-left">
              <div class="sub-title">團隊交流活動</div>
              <div class="title">放鬆，是為了走更遠</div>
            </div>
          </div>
        </div>
      </div>
      <div class="haloBallBg haloBall_1"></div>
      <div class="dec-2">
        <img src="./assets/images/en_dec_2.png" alt="" />
      </div>
    </section>
    <!-- job explain -->
    <section id="section3" class="relative">
      <div class="title under-line">職缺說明</div>
      <div class="content container mx-auto px-[26px]">
        <div class="main flex flex-col items-center justify-center lg:flex-row">
          <div class="left w-[40%] lg:mr-[40px]">
            <img src="./assets/images/explain.png" alt="" />
          </div>
          <div class="right w-full lg:w-[60%]">
            <div class="title">XR開發實習生</div>
            <div class="txt">
              在虛實整合科技的浪潮下，我們在尋找一位擁有良好執行力且相信XR虛擬數位將改變世界的你，邀請你和我們一起接受挑戰並突破現實框架，如果你符合我們所需要的特質，歡迎你與我們一起做夢，合作造夢。
            </div>
            <ul class="list">
              <li class="item">
                <div class="text">能力需求</div>
                <ul class="detail">
                  <li class="d-item">
                    具備Unity程式開發或有網頁前/後端程式設計經驗
                  </li>
                  <li class="d-item">學過Maya、3DMAX建模流程</li>
                  <li class="d-item">
                    熟悉程式語言(如C/C++、 C#等)建構、編寫和發佈
                  </li>
                </ul>
              </li>
              <li class="item">
                <div class="text">參加條件</div>
                <ul class="detail">
                  <li class="d-item">大三、大四、碩士（需為在學狀態）</li>
                </ul>
              </li>
              <li class="item">
                <div class="text">實習時間</div>
                <ul class="detail">
                  <li class="d-item">大三、大四、碩士（需為在學狀態）</li>
                </ul>
              </li>
              <li class="item">
                <div class="text">薪資</div>
                <ul class="detail">
                  <li class="d-item">
                    180 元/ 小時，採最低基本工資，包含勞保、健保
                  </li>
                </ul>
              </li>
              <li class="item">
                <div class="text">
                  報名須備妥：1.個人簡歷 2.作品集電子檔 3.個人作品URL(可省略)
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="haloBallBg haloBall_1"></div>
    </section>
    <div class="m-[44px] text-center text-[48px] text-[#30FFFF]">/////////</div>
    <!-- apply -->
    <section id="section4">
      <div class="title">還在猶豫嗎？時間有限！快點擊報名</div>
      <div class="sub-text">報名截至: 2023/01/06 22:00</div>
      <a
        href="https://forms.gle/FQtiLn7qntmVTHuQA"
        target="_blank"
        class="ani-btn apply"
        >前往應徵</a
      >
      <div class="container mx-auto">
        <div class="image">
          <img class="mx-auto" src="./assets/images/apply.png" alt="" />
        </div>
      </div>
    </section>
    <!-- footer -->
    <footer class="bg-[#373635]">
      <div
        class="container mx-auto flex h-[84px] flex-col items-center justify-center px-[26px] lg:flex-row lg:justify-between"
      >
        <div class="dep inline-block text-[#E9E7E4]">
          中華電信｜服務發展設計中心
        </div>
        <div class="mem inline-block text-[#9B9995]">
          如有任何疑問，請聯絡 朱小姐 joycechu@cht.com.tw
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped lang="scss">
header {
  width: 100%;
  height: 100vh;
  position: relative;
  color: #fff;

  .haloBall_1 {
    position: absolute;
    width: 10vw;
    height: 30vh;
    left: 0;
    top: 0;
  }

  .haloBall_2 {
    position: absolute;
    width: 10vw;
    height: 30vh;
    right: 0px;
    bottom: 100px;
  }
  .haloBall_3 {
    position: absolute;
    width: 10vw;
    height: 30vh;
    right: 200px;
    top: 100px;
  }

  .person {
    max-width: 100%;
    z-index: 1;
    position: absolute;
    top: 50%;
    right: 20%;
    transform: translateY(-60%);
  }

  .content {
    height: 100vh;
    flex: 1 1 auto;
    .main {
      max-width: 540px;
      margin-left: 81px;
      z-index: 2;
      position: relative;
    }

    .logo {
      margin-bottom: 80px;
      position: relative;
      z-index: 3;
      display: flex;
      align-items: center;

      .dep {
        color: #fff;
        margin-top: 8px;
      }
    }

    .title {
      font-size: $title;
      font-weight: 600;
    }

    .sub-text {
      color: #bdbbb7;
      margin-top: 8px;
    }

    .sub-title {
      color: #30ffff;
      margin-top: 68px;
    }

    .apply {
      margin-top: 36px;
    }
  }
}
// why join us
#section1 {
  padding: 112px 0;
  .content {
    li {
      flex: 0 0 auto;
      width: 25%;
      padding: 0 26px;
      .slogan {
        padding: 28px 35px;
        border: 1px solid #0f7193;
        box-shadow: 0px 0px 3px rgba(0, 85, 85, 0.87),
          0px 0px 28px rgba(48, 255, 255, 0.26);
        margin-bottom: 40px;
        border-radius: 60px;
        .img-text {
          margin-top: 28px;
          color: #fff;
        }
      }
    }
  }
  .haloBall_1 {
    position: absolute;
    width: 40vw;
    height: 30vh;
    left: 0;
    top: 100px;
    z-index: -1;
  }
}
// environment
#section2 {
  .dec-2 {
    position: absolute;
    left: 0;
    bottom: 108px;
    img {
      width: 15vw;
    }
  }
  .text {
    max-width: 936px;
  }
  .image-wall {
    margin-top: 52px;
    position: relative;

    .image-group {
      height: 600px;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .left {
        flex: 1 1 auto;
        width: 45%;
        height: 100%;
        border-radius: 40px;
        overflow: hidden;
        margin-right: 30px;
      }
      .right {
        flex: 1 1 auto;
        height: 100%;
        width: 55%;

        .right-top {
          height: calc((100% - 30px) * 0.4);
          margin-bottom: 30px;
          & > * {
            flex: 1 1 auto;
            overflow: hidden;
            border-radius: 40px;
          }
          .dec-1 {
            position: absolute;
            right: 0;
            top: -225px;
            z-index: -1;
            transform: translateY(225px);
            transition: transform 0.4s ease;
            img {
              width: 250px;
            }
            &.show {
              transform: translateY(0);
            }
          }
          .right-top-left {
            width: 10%;
            margin-right: 30px;
          }
          .right-top-right {
            img {
              // object-fit: fill;
            }
          }
        }
        .right-bottom {
          height: calc((100% - 30px) * 0.6);
          border-radius: 40px;
          overflow: hidden;
        }
      }
    }

    .image-spacial {
      position: relative;
      .image-intro {
        margin-top: 108px;
        width: 80%;
        max-height: 700px;
        border-radius: 60px;
        overflow: hidden;
        img {
          display: block;
          width: 100%;
          object-fit: cover;
        }
      }
      .tag {
        position: absolute;
        padding: 26px 44px;
        background-color: #fff;
        border-radius: 36px;
        top: 50px;
        .sub-title {
          color: #7b7977;
          font-weight: 400;
          margin-bottom: 8px;
        }
        .title {
          color: #189bb7;
          font-weight: 600;
          margin-bottom: 0;
        }
      }
    }
    .image-spacial:nth-child(2) {
      .tag {
        right: 0;
      }
      .haloBall_1 {
        position: absolute;
        width: 10vw;
        height: 30vh;
        right: 100px;
        top: 0;
        z-index: -1;
      }
    }
    .image-spacial:last-child {
      .image-intro {
        margin-left: auto;
      }
    }
  }
  .haloBall_1 {
    position: absolute;
    width: 20vw;
    height: 30vh;
    right: 0px;
    top: 150px;
    z-index: -2;
  }
}
// job explain
#section3 {
  padding: 72px 0;
  .title {
    margin-bottom: 44px;
  }

  .main {
    background: #373635;
    border-radius: 60px;
    padding: 32px 40px;
    .right {
      .title {
        font-size: 36px;
        color: #30ffff;
        margin-bottom: 8px;
        font-weight: 400;
      }
      .txt {
        text-align: justify;

        color: #fff;
        margin-bottom: 44px;
      }
      .list {
        text-align: left;
        color: #e9e7e4;

        .item {
          position: relative;

          &::before {
            position: absolute;
            content: "";
            background: #30ffff;
            top: 12px;
            left: 0px;
            width: 12px;
            height: 12px;
          }
          .text {
            margin-left: 24px;

            color: #e9e7e4;
          }
          .detail {
            list-style: disc;
            margin-top: 4px;
            margin-bottom: 16px;
            margin-left: 56px;
          }
        }
      }
    }
  }
  .haloBall_1 {
    position: absolute;
    width: 50vw;
    height: 50vh;
    left: 20%;
    top: 30%;
    transform: translate(-50%, -50%);
    z-index: -1;
  }
}
// apply
#section4 {
  padding: 0;
  .title {
    margin-bottom: 6px;
  }

  .sub-text {
    color: #bdbbb7;
  }
  .apply {
    margin-top: 44px;
  }
  img {
    z-index: -3;
    position: relative;
  }
}

/* RWD */
@media (max-width: 1536px) {
  header {
    .person {
      right: 5%;
    }
  }
  #section1 {
    .content {
      li {
        width: 50%;
      }
      .text {
        &:first-child,
        &:nth-child(2) {
          margin-bottom: 40px;
        }
      }
    }
  }
}
@media (max-width: 1280px) {
  header {
    .layered-animations {
      left: 20%;
    }
    .content {
      height: 100vh;
    }
    .person {
    }
  }
  #section2 {
    .image-wall {
      .image-group {
        height: auto;
        flex-direction: column-reverse;

        .left {
          margin-top: 30px;
          width: 100%;
          height: 300px;
          img {
            object-position: 50% 65%;
          }
        }
        .right {
          width: 100%;
          .right-top {
            height: 300px;
            .dec-1 {
              top: -155px;
              transform: translateY(155px);
              img {
                width: 180px;
              }
            }
            .right-top-left {
              width: 40%;
              img {
                object-position: 50% 60%;
              }
            }
            .right-top-right {
              width: 60%;
            }
          }
          .right-bottom {
            width: 100%;
            height: 300px;
          }
        }
      }

      .image-spacial {
        .tag {
          top: -45px;
          transform: rotate(-25deg);
        }
      }
      .image-spacial:nth-child(2) {
        .tag {
          transform: rotate(25deg);
        }
      }
    }
  }
}
// 主斷點
@media (max-width: 1024px) {
  header {
    .content {
      .logo {
        margin-bottom: 36px;
        position: relative;
        z-index: 3;
        flex-direction: column;
        align-items: flex-start;

        .dep {
          color: #fff;
          margin-top: 4px;
          margin-left: 81px;
        }
      }
      .title {
        font-size: $mobile-title;
      }
    }
    .person {
    }
    .animation-wrapper {
      display: none;
    }
  }
  footer {
  }
}
</style>
