<template>
    <div>

        <el-container>
            <el-header>
                <el-row>
                    <el-col :span="16" :offset="4">
                        <div class="header">
                            <div class="nav">
                                <div class="logo">
                                    <span class="fa fa-envira fa-lg"></span>
                                </div>
                                <div>导航一</div>
                                <div>导航二</div>
                                <div>导航三</div>
                            </div>
                            <div class="user">
                                <el-dropdown v-if="is_login" @command="handleCommand">
                                    <div class="avatar">
                                        <div class="img">
                                            <img :src="avatar_url">
                                        </div>
                                        <span>{{name}}</span>
                                        <i class="el-icon-caret-bottom"></i>
                                    </div>
                                    <el-dropdown-menu slot="dropdown">
                                        <el-dropdown-item command="myCollect">我的收藏</el-dropdown-item>
                                        <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                                    </el-dropdown-menu>
                                </el-dropdown>

                                <div class="login" v-else @click="login('/login')" title="点我登录">
                                    <span class="fa fa-github fa-2x"></span>
                                </div>

                            </div>
                        </div>

                    </el-col>
                </el-row>
            </el-header>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>

    </div>
</template>

<script>
  export default {
    name: "baseLayout",
    data() {
      return {
        is_login: false
      }
    },
    props: {
      name: {
        default: null
      },
      avatar_url: {
        default: ""
      },
      bio: {
        defult: ''
      }
    },

    mounted() {
      let user = localStorage.getItem("user");
      if (user) {
        let u = JSON.parse(user);
        this.name = u.name;
        this.avatar_url = u.avatar_url;
        this.bio = u.bio;
      }
      if (this.name) {
        this.is_login = true;
        localStorage.setItem("user", JSON.stringify({
          name: this.name,
          avatar_url: this.avatar_url,
          bio: this.bio
        }))
      }

    },
    methods: {
      handleCommand(command) {
        if (command === "myCollect") {
          this.goto("/myCollect")
        } else if (command === "logout") {
          this.is_login = false;
          localStorage.removeItem("user")
        }
      },
      login(path) {
        // this.$router.push(path); // 第一种方式
        this.$message({
          dangerouslyUseHTMLString: true,
          message:"&nbsp;&nbsp;&nbsp;登录中....",
          type:"info",
          duration:0,
          iconClass:"el-icon-loading",
        });
        let a = document.createElement("a");
        let href = "https://github.com/login/oauth/authorize?client_id=faf744205623aab0ff00&scope=user,public_repo"
        a.setAttribute('href', href);
        document.body.appendChild(a);
        a.click();
      }
    }

  }
</script>

<style scoped lang="less">
    .header {
        height: 60px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

        .nav {
            display: flex;
            flex-direction: row;

            div {
                margin-right: 30px;
                cursor: pointer;
            }

            .logo {
                color: #42b983;
            }
        }

        .user {
            .avatar {
                display: flex;
                flex-direction: row;
                align-items: center;
                color: #bbb;
                cursor: pointer;

                .img {
                    display: inline-block;
                    margin-right: 10px;
                    width: 30px;
                    height: 30px;
                    border-radius: 15px;
                    overflow: hidden;

                    img {
                        width: 100%;
                        height: 100%;
                    }
                }
            }

            .login {
                padding: 5px 2px;
                cursor: pointer;

                &:hover {
                    color: #42b983;
                }
            }
        }
    }
</style>