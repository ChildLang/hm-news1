<template>
  <div class="register">
    <van-nav-bar title="标题" left-text="返回" left-arrow @click-left="$router.back()">
      <template #title>注册</template>
    </van-nav-bar>
    <news-logo></news-logo>
    <van-form @submit="onSubmit">
      <van-field v-model="user.username" label="用户名" placeholder="请输入用户名" :rules="rules.username"/>
      <van-field v-model="user.nickname" label="昵称" placeholder="请输入昵称" :rules="rules.username"/>
      <van-field
        v-model="user.password"
        type="password"
        label="密码"
        placeholder="请输入密码"
        :rules="rules.password"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      user: {
        username: '',
        password: '',
        nickname: ''
      },
      rules: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'onblur' },
          {
            pattern: /^\d{5,11}$/,
            message: '用户名不合法',
            trigger: 'onChange'
          }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'onblur' },
          {
            pattern: /^\w{3,11}$/,
            message: '密码格式不正确',
            trigger: 'onChange'
          }
        ],
        nickname: [
          { required: true, message: '昵称不能为空', trigger: 'onblur' },
          {
            pattern: /^\w{2,11}$/,
            message: '昵称应为2-11位',
            trigger: 'onChange'
          }
        ]
      }
    }
  },
  methods: {
    async onSubmit() {
      const res = await this.$axios.post('/register', this.user)
      console.log(res)
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.$toast.success(message)
        this.$router.push({
          name: 'login',
          params: this.user
        })
      } else {
        this.$toast.fail(message)
      }
    }
  }
}
</script>
<style>
</style>
