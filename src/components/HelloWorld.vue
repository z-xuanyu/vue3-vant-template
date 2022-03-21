<!--
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-03-18 14:53:16
 * @LastEditTime: 2022-03-21 16:50:44
 * @Description: Modify here please
-->

<script lang="ts">
export default defineComponent({
  name: 'HelloWorld',
  inheritAttrs: false,
})
</script>
<script setup lang="ts">
withDefaults(defineProps<{ msg: string }>(), {
  msg: 'xuanyu',
})
</script>

<template>
  <div>
    <VanButton v-bind="$attrs">{{ msg }}</VanButton>
    <IconMdiAirplaneSearch width="100" height="100" />
    <IconSvgDaKa />
  </div>
</template>

<style scoped></style>
