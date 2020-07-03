<template>
  <div class="navbar" @click="$emit('click')">
    <div class="name">
      <slot></slot>
    </div>
    <div class="content">
      <slot name="content"></slot>
    </div>
    <div class="jump">
      <span class="iconfont iconjiantou1"></span>
    </div>
  </div>
</template>
<script>
</script>
<style lang='less' scoped>
.navbar {
  display: flex;
  height: 60px;
  line-height: 60px;
  margin-left: 20px;
  padding-right: 20px;
  border-bottom: 1px solid #333;
  font-size: 16px;
  .content {
    flex: 1;
    text-align: right;
    color: #999;
    padding-right: 10px;
  }
}
</style>
