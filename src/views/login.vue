<template>
    <div>
        <a id="login"
           href="https://github.com/login/oauth/authorize?client_id=faf744205623aab0ff00&scope=user,public_repo">登录</a>

    </div>
</template>

<script>
  export default {
    name: "login",
    mounted() {
      document.getElementById("login").click()
    }
  }
</script>

<style scoped lang="less">

</style>