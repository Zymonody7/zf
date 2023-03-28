<template>
  <div>
    <!-- 标题、更多按钮 -->
    <div class="d-flex justify-space-between">
      <span class="text-body-1">{{ title }}</span>
      <!-- 功能区按钮 -->
      <slot name="actionBtn"></slot>
    </div>
    <!-- 分隔符 -->
    <v-divider></v-divider>
    <!-- 列表内容区域【插槽】 -->
    <slot name="listContent"></slot>
  </div>
</template>

<script>
export default {
  name: "BlogListBox",
  props: {
    title: { // 标题 (文本、必填)
      type: String, require: true
    },
  }
}
</script>

<style lang='less'>
</style>
