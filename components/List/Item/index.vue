<template>
  <div
    class='relative border  rounded flex-col border-solid border-slate-200 shadow p-4  ring-offset-8 cursor-default hover:shadow-md cursor-pointer'>
    <div v-if="Info.highlight.disk_name.length === 0"
      class='font-black tracking-wider text-black text-lg hover:text-[#0064fa]'>{{
        Info.disk_name }}</div>
    <div v-if="Info.highlight.disk_name.length > 0"
      class='font-black tracking-wider text-black text-lg hover:text-[#0064fa]'>
      <div v-for="(Item, index) in Info.highlight.disk_name" :key="index" v-html="Item"></div>
    </div>
    <div class='text-xs text-slate-700 gap-5 py-2 ' v-if="Info.highlight.files.length > 0">
      <div v-for="(Item, index) in Info.highlight.files" :key="index" v-html="Item"></div>
    </div>
    <div class='flex flex-row gap-5   text-xs  '>
      <div class='flex flex-row gap-1'>
        <i>

          <FontAwesomeIcon :icon='faCircleUser' />
        </i>
        <span>{{ Info.share_user }}</span>
      </div>
      <div class='flex flex-row gap-1'>
        <i>
          <FontAwesomeIcon :icon='faClockRotateLeft' />
        </i>
        <span>{{ Info.shared_time }}</span>
      </div>
      <div class='flex flex-row gap-1'>
        <i>
          <FontAwesomeIcon :icon='faSkyatlas' />
        </i>
        <span>{{ NetdiscType[Info.disk_type.toUpperCase()] }}</span>
      </div>
      <div v-if="Info.disk_pass" class='flex flex-row gap-1'>
        <i>
          <FontAwesomeIcon :icon='faUnlockKeyhole' />
        </i>
        <span>{{ Info.disk_pass }}</span>
      </div>
    </div>
  </div>
</template>
<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faCircleUser, } from '@fortawesome/free-regular-svg-icons';
import { faSkyatlas, } from '@fortawesome/free-brands-svg-icons';
import { faClockRotateLeft, faUnlockKeyhole } from '@fortawesome/free-solid-svg-icons';
const props = defineProps({
  Info: {
    type: Object,
    required: true
  }
})
const NetdiscType = ref(
  {
    BAIDU: '百度云盘',

    QUARK: '夸克网盘',

    ALY: '阿里云盘',

    XUNLEI: '迅雷网盘',

    UC: 'UC   网盘',
  },
)


</script>

<style scoped></style>
