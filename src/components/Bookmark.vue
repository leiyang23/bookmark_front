<template>
    <div class="bookmark-page" @click="goto" :title="title">
        <div>
            <div class="logo">
                <img :src="logo_url_">
            </div>
            <div class="title">
                {{title.length>12?title.substring(0,12) + '...':title}}
            </div>
        </div>

        <div v-if="canClose" class="close" @click.stop="onClose"><span class="fa fa-times"></span></div>
    </div>
</template>

<script>
  export default {
    name: "Bookmark",
    props: {
      title: {
        default: '百度一下，你就上当'
      },
      url: {
        default: 'https://www.baidu.com'
      },
      logo_url: {
        default: null
      },
      canClose: {
        default: true
      }
    },
    computed: {
      logo_url_() {
        if (this.logo_url) {
          return this.logo_url
        }
        return 'https://www.google.cn/s2/favicons?domain=' + this.url
      }
    },
    methods: {
      goto() {
        window.open(this.url, "_blank");
      },
      onClose() {
        this.$emit("close")
      }
    }
  }
</script>

<style scoped lang="less">
    .bookmark-page {
        width: 150px;
        height: 140px;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: center;
        border-radius: 5px;
        position: relative;

        .close {
            display: none;
        }

        &:hover {
            background-color: rgba(200, 200, 200, .3);
            cursor: pointer;

            .close {
                display: flex;
                align-items: center;
                position: absolute;
                right: 10px;
                top: 5px;
                color: #bbb;
                font-size: 22px;


            }
        }

        div {
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            align-items: center;

            .logo {
                width: 50px;
                height: 50px;
                border-radius: 25px;
                background-color: #f7f7f7;

                img {
                    width: 50%;
                    height: 50%;
                }
            }

            .title {
                font-size: 14px;
                margin-top: 20px;
                margin-bottom: 10px;
                padding: 3px 10px;
                background-color: #f7f7f7;
                width: 120px;
                height: 20px;
                border-radius: 10px;
            }
        }
    }

</style>