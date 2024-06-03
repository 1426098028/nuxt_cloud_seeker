<template>
  <div
    class='relative border  rounded flex-col border-solid border-slate-200 shadow p-2  ring-offset-8 cursor-default hover:shadow-md'>
    <div class='font-black tracking-wider text-black text-lg border-b-2 pb-1.5 mb-1.5'>{{ Title }}</div>
    <div v-for="(item, index) in ListData" :key="index" class=' text-sm tracking-wide leading-4 py-2 pb-1.5'
      @click='onClick(item)'>
      {{ item.disk_name }}
    </div>
  </div>
</template>
<script setup>
defineProps(['Title', 'ListData'])
const emits = defineEmits(['onTarget'])

const onClick = (item) => {
  emits('onTarget', item)
}

</script>

<style scoped></style>
