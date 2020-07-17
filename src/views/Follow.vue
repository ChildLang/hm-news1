<template>
  <div class="follow">
    <van-nav-bar title="我的关注" left-text="返回" right-text left-arrow @click-left="$router.back()"/>
    <ul>
      <li v-for="item in info" :key="item.id">
        <div class="pic">
          <img :src="$url(item.head_img)" alt>
        </div>
        <div class="content">
          <p>{{item.nickname}}</p>
          <p class="time">{{item.create_date}}</p>
        </div>
        <div class="cancel">
          <button @click="outFn(item.id)">取消关注</button>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      info: []
    }
  },
  created() {
    this.getFollow()
  },
  methods: {
    async getFollow() {
      const res = await this.$axios.get('/user_follows')
      console.log(res)
      const { data, statusCode } = res.data
      if (statusCode === 200) {
        this.info = data
      }
    },
    async outFn(id) {
      try {
        await this.$dialog.confirm({
          title: '提示',
          message: '确认取关？'
        })
        const res = await this.$axios.get(`/user_unfollow/${id}`)
        if (res.data.statusCode === 200) {
          this.$toast.success('取关成功')
          this.getFollow()
        }
      } catch {
        this.$toast('取消')
      }
    }
  }
}
</script>
<style lang='less' scoped>
.van-nav-bar {
  background-color: #f3f3f3;
}
.follow {
  background-color: #f3f3f3;
  ul {
    li {
      display: flex;
      align-items: center;
      height: 100px;
      border-bottom: 1px solid #ccc;
      padding: 0 20px;
      .pic {
        img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }
      }
      .content {
        flex: 1;
        font-size: 19px;
        padding-left: 10px;
        .time {
          font-size: 15px;
          margin-top: 5px;
          color: #999;
        }
      }
      .cancel {
        button {
          width: 73px;
          height: 30px;
          border-radius: 15px;
          font-size: 14px;
        }
      }
    }
  }
}
</style>
