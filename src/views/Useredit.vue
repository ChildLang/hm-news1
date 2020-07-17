<template>
  <div class="useredit">
    <div class="mask" v-show="isShow">
      <van-button type="warning" @click="crop">裁剪</van-button>
      <van-button type="warning" @click="cancel">取消</van-button>
      <VueCropper
        ref="cropper"
        :img="img"
        :autoCrop="true"
        :autoCropWidth="150"
        :autoCropHeight="150"
        :fixed="true"
        :fixedNumber="[1,1]"
      ></VueCropper>
    </div>
    <van-nav-bar title="标题" left-text="返回" left-arrow @click-left="$router.back()">
      <template #title>登录</template>
    </van-nav-bar>
    <div class="pic">
      <img :src="$axios.defaults.baseURL+ info.head_img" alt>
      <van-uploader :after-read="afterRead"/>
    </div>
    <news-nav @click="nickShow">
      <template>昵称</template>
      <template v-slot:content>{{info.nickname}}</template>
    </news-nav>
    <news-nav @click="pwdShow">
      <template>密码</template>
      <template v-slot:content>******</template>
    </news-nav>
    <news-nav @click="genderShow">
      <template>性别</template>
      <template v-slot:content>{{info.gender?'男':'女'}}</template>
    </news-nav>

    <!-- 修改模态框 -->
    <van-dialog v-model="Nshow" title="修改昵称" show-cancel-button @confirm="editName">
      <van-field ref="nickname" v-model="nickname" placeholder="请输入用户名"/>
    </van-dialog>
    <van-dialog v-model="Pshow" title="修改密码" show-cancel-button @confirm="editPwd">
      <van-field v-model="password" placeholder="请输入密码"/>
    </van-dialog>
    <van-dialog v-model="Gshow" title="修改性别" show-cancel-button @confirm="editGender">
      <van-radio-group v-model="gender">
        <van-cell-group>
          <van-cell title="男" clickable @click="gender = 1">
            <template #right-icon>
              <van-radio :name="1"/>
            </template>
          </van-cell>
          <van-cell title="女" clickable @click="gender = 0">
            <template #right-icon>
              <van-radio :name="0"/>
            </template>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </van-dialog>
  </div>
</template>
<script>
import { VueCropper } from 'vue-cropper'
export default {
  data() {
    return {
      info: {},
      Nshow: false,
      Pshow: false,
      Gshow: false,
      nickname: '',
      password: '',
      gender: '',
      isShow: false,
      img: ''
    }
  },
  created() {
    this.getUser()
  },
  components: {
    VueCropper: VueCropper
  },
  methods: {
    async getUser() {
      const res = await this.$axios.get(`/user/${localStorage.getItem('id')}`)
      console.log(res)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.info = data
      }
    },
    async editUser(data) {
      const res = await this.$axios.post(
        `/user_update/${localStorage.getItem('id')}`,
        data
      )
      console.log(res)
      if (res.data.statusCode === 200) {
        this.$toast.success('修改成功')
        this.getUser()
      }
    },
    // 弹框显示
    nickShow() {
      console.log(123)
      this.Nshow = true
      console.log(this.$refs.nickname)
      // this.$refs.nickname.focus()
      this.nickname = this.info.nickname
    },
    pwdShow() {
      this.Pshow = true
      this.password = this.info.password
    },
    genderShow() {
      this.Gshow = true
      this.gender = this.info.gender
    },
    // 修改
    editName() {
      this.editUser({ nickname: this.nickname })
    },
    editPwd() {
      this.editUser({ password: this.password })
    },
    editGender() {
      this.editUser({ gender: this.gender })
    },
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file)
      this.isShow = true
      this.img = file.content
    },
    cancel() {
      this.$toast('取消')
    },
    crop() {
      this.$refs.cropper.getCropBlob(async blob => {
        const fd = new FormData()
        fd.append('file', blob)
        const res = await this.$axios.post('/upload', fd)
        console.log(res)
        const { statusCode, data } = res.data
        if (statusCode === 200) {
          this.$toast.success('修改成功')
          this.isShow = false
          this.editUser({
            head_img: data.url
          })
        }
      })
    }
  }
}
</script>
<style lang='less' scoped>
.useredit {
  background-color: rgb(243, 243, 243);
  .pic {
    position: relative;
    padding: 30px 0;
    text-align: center;
    img {
      width: 70px;
      height: 70px;
      border-radius: 50%;
    }
    .van-uploader {
      position: absolute;
      top: 30px;
      left: 50%;
      transform: translateX(-50%);
      opacity: 0;
    }
  }
  .mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 99;
    .van-button {
      position: absolute;
      z-index: 999;
    }
    .van-button:nth-child(1) {
      left: 0;
    }
    .van-button:nth-child(2) {
      right: 0;
    }
  }
}
</style>
