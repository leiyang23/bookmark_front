<template>
    <div>
        <el-container>
            <el-header class="header_">
                <el-row>
                    <el-col :span="16" :offset="4">
                        <div class="header">
                            <div class="nav">
                                <div class="logo" @click="goto('/')">
                                    <span class="fa fa-envira fa-2x"></span>
                                </div>
                                <div class="nav-btn" @click="goto('/',1)" :style="{color:navIndex==1?'#42b983':'#111'}">
                                    推荐
                                </div>
                                <div class="nav-btn" @click="goto('/selfNav',2)"
                                     :style="{color:navIndex==2?'#42b983':'#111'}">我的
                                </div>
                                <div class="nav-btn" @click="goto('/shareNav',3)"
                                     :style="{color:navIndex==3?'#42b983':'#111'}">分享
                                </div>
                            </div>
                            <div class="user">
                                <el-dropdown v-if="is_login" @command="handleCommand">
                                    <div class="avatar">
                                        <div class="img">
                                            <img :src="user.avatar_url">
                                        </div>
                                        <span>{{user.github_nick}}</span>
                                        <i class="el-icon-caret-bottom"></i>
                                    </div>
                                    <el-dropdown-menu slot="dropdown">
                                        <el-dropdown-item command="myCollect">我的收藏</el-dropdown-item>
                                        <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                                    </el-dropdown-menu>
                                </el-dropdown>

                                <div class="login" v-else @click="handleLoginGithub" title="点我登录">
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
    import {GITHUB_APPID} from "../utils/conf";

    export default {
        name: "baseLayout",
        data() {
            return {
                is_login: false,
                user: null,
                navIndex: 1,
            }
        },
        computed: {
            //计算属性获取,url中query code 参数
            code() {
                const urlParams = new URLSearchParams(window.location.search);
                const myParam = urlParams.get('code');
                return myParam || false;
            },
        },
        mounted() {
            if(this.code){
                this.login()
            }
        },
        methods: {
            handleCommand(command) {
                if (command === "logout") {
                    this.is_login = false;
                    localStorage.removeItem("user");
                    this.$router.push("/")
                }
            },
            handleLoginGithub() {
                //跳转到GitHub 授权页面
                const url = "https://github.com/login/oauth/authorize?client_id=" + GITHUB_APPID + "&scope=user&state=github";
                window.location.href = url
            },
            login() {
                let that = this;
                that.$http({
                    url: "/login",
                    params: {
                        code: that.code,
                        state:"github"
                    }
                }).then(res => {
                    if (res.data.errcode == 0) {
                        that.get_user_info()
                    }
                })
            },
            goto(path, index) {
                this.$router.push(path);
                this.navIndex = index
            },
            get_user_info() {
                let that = this;
                that.$http({
                    url: "/bookmark/get_user_info",
                }).then(res => {
                    if (res.data.errcode == 0) {
                        that.is_login = true;
                        that.user = res.data.data;
                        window.location.href  = "/"
                    }else{
                        console.log(res.data)
                    }
                })
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
                cursor: pointer;
                line-height: 46px;
            }

            .logo {
                color: #42b983;
                margin-right: 60px;
            }

            .nav-btn {
                margin-right: 40px;
                padding: 0 10px;
                transition: all ease-in-out .1s;
                letter-spacing: 3px;
            }

            .nav-btn:hover {
                /*background-color: #b0b948;*/
                border-bottom: #42b983 1px solid;
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