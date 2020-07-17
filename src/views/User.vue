<template>
  <div class="user">
    <van-nav-bar title="标题" left-text="返回" left-arrow @click-left="$router.back()">
      <template #title>个人中心</template>
    </van-nav-bar>
    <div class="header" @click="$router.push('/useredit')">
      <div class="pic">
        <img :src="$axios.defaults.baseURL+info.head_img" alt>
      </div>
      <div class="nickname">
        <p>
          <span class="iconfont iconxingbienan" v-if="info.gender"></span>
          <span class="iconfont iconxingbienv" v-else></span>
          {{info.nickname}}
        </p>
        <p class="time">{{info.create_date | time}}</p>
      </div>
      <div class="jump">
        <span class="iconfont iconjiantou1"></span>
      </div>
    </div>
    <news-nav @click="$router.push('/follow')">
      <template>我的关注</template>
      <template v-slot:content>关注的用户</template>
    </news-nav>
    <news-nav @click="$router.push('/comment')">
      <template>我的跟帖</template>
      <template v-slot:content>跟帖/回复</template>
    </news-nav>
    <news-nav>
      <template>我的收藏</template>
      <template v-slot:content>文章/视频</template>
    </news-nav>
    <news-nav @click="$router.push('/useredit')">设置</news-nav>
    <news-nav @click="outFn">退出</news-nav>
  </div>
</template>
<script>
export default {
  data() {
    return {
      info: {}
    }
  },
  async created() {
    const res = await this.$axios.get(`/user/${localStorage.getItem('id')}`)
    console.log(res)
    const { statusCode, data } = res.data
    if (statusCode === 200) {
      this.info = data
    }
  },
  methods: {
    async outFn() {
      console.log(123)
      try {
        await this.$dialog.confirm({
          title: '提示',
          message: '是否退出'
        })
        localStorage.removeItem('id')
        localStorage.removeItem('token')
        this.$router.push('/login')
        this.$toast.success('退出成功')
      } catch {
        this.$toast('取消')
      }
    }
  }
}
</script>
<style lang='less' scoped>
.user {
  background-color: rgb(243, 243, 243);
  .header {
    height: 100px;
    display: flex;
    padding: 0 20px;
    align-items: center;
    border-bottom: 5px solid #999;
    .pic {
      width: 70px;
      img {
        width: 100%;
        border-radius: 50%;
      }
    }
    .nickname {
      flex: 1;
      padding-left: 10px;
      font-size: 16px;
      .time {
        color: #999;
        font-size: 14px;
        margin-top: 5px;
      }
    }
  }
  .iconxingbienan {
    color: cadetblue;
  }
  .iconxingbienv {
    color: chocolate;
  }
}
</style>
