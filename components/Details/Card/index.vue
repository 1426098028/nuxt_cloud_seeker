<template>
  <div
    class='relative border  rounded flex-col border-solid border-slate-200 shadow p-7  ring-offset-8 cursor-default mb-1.5 hover:shadow-md'>
    <div v-if="Info.highlight.disk_name.length === 0" class='font-black tracking-wider text-black text-2xl py-6'>{{
      Info.disk_name }}</div>
    <div v-if="Info.highlight.disk_name.length > 0" class='font-black tracking-wider text-black text-2xl py-6'>
      <div v-for="(Item, index) in Info.highlight.disk_name" :key="index" v-html="Item"></div>
    </div>
    <ul class='max-h-48 overflow-auto text-sm -mt-2' v-if="Info.highlight.files.length > 0">
      <li v-for="(Item, index) in Info.highlight.files" :key="index" v-html="Item"></li>
    </ul>
    <div class='flex flex-row text-sm text-slate-700 gap-5 py-2 pt-6'>
      <div>
        网盘类型
      </div>
      <div>
        {{ Info.disk_type }}
      </div>
    </div>
    <div v-if="Info.disk_pass" class='flex flex-row text-sm text-slate-700 gap-5 py-2 cursor-pointer'>
      <div>
        访问密码
      </div>
      <div class='text-slate-800 decoration-solid'>
        {{ Info.disk_pass }}
      </div>
    </div>
    <div class='flex flex-row text-sm text-slate-700 gap-5 py-2'>
      <div>
        分享用户
      </div>
      <div class='text-slate-800'>
        {{ Info.share_user }}
      </div>
    </div>
    <div class='flex flex-row text-sm text-slate-700 gap-5 py-2'>
      <div>
        分享日期
      </div>
      <div>
        {{ Info.shared_time }}
      </div>
    </div>
    <div class='flex flex-row gap-5 text-blue-500 font-semibold text-xs pt-16 cursor-pointer'>
      <div class='flex flex-row  hover:text-blue-600 gap-1' @click='onGetUrl("Copy")'>
        <i>
          <FontAwesomeIcon :icon='faPaste' />
        </i>
        <span>链接</span>
      </div>
      <div class='flex flex-row  hover:text-blue-600 gap-1' @click='onGetUrl("Jump")'>
        <i>
          <FontAwesomeIcon :icon='faLocationArrow' />
        </i>
        <span>跳转</span>
      </div>
      <div class='flex flex-row  hover:text-blue-600 gap-1' @click='onGetUrl("Copy")'>
        <i>
          <FontAwesomeIcon :icon='faShareNodes' />
        </i>
        <span>分享</span>
      </div>
    </div>
    <div v-if='QRCodeUrl'
      class=' absolute  right-16  bottom-10 flex flex-col  items-center justify-center    border  rounded  border-solid border-slate-200 shadow    '>
      <img class='' :src="QRCodeUrl" alt="">
      <div class='flex flex-row text-sm font-medium text-slate-700 gap-1 p-4 pt-0'>
        <i>
          <FontAwesomeIcon :icon='faQrcode' />
        </i>
        <span class=''>扫码获取资源</span>
      </div>
    </div>
    <input style='width: 0;height: 0;margin: 0;padding: 0;position: absolute;top: -1000px;left: -1000px;' type="text" />
  </div>
</template>
<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faShareNodes, faPaste, faLocationArrow, faQrcode } from '@fortawesome/free-solid-svg-icons';
import QRCode from 'qrcode'
const router = useRouter()
const { Info } = defineProps({
  Info: {
    type: Object,
    required: true
  }
})
const NetdiscUrlType = {
  BDY: `https://pan.baidu.com/share/init?surl=${Info.disk_id}&pwd=${Info.disk_pass}`,
  QUARK: `https://pan.quark.cn/s/${Info.disk_id}`,
  ALY: `https://www.aliyundrive.com/s/${Info.disk_id}`,
  XUNLEI: `https://pan.xunlei.com/s/${Info.disk_id}?origin=lpss&pwd=${Info.disk_pass}`,
  UC: '',
}
const QRCodeUrl = ref('')
const CreateQRCode = async () => {
  const { doc_id, disk_id, disk_pass } = Info
  QRCodeUrl.value = await QRCode.toDataURL('https://worktile.com/kb/ask/2173846.html')
}
const onGetUrl = async (type) => {
  const { doc_id, disk_id, disk_pass, disk_type } = Info
  switch (type) {
    case 'Jump':
      window.location.href = NetdiscUrlType[disk_type.toUpperCase()]
      break;
    default:
      const textInput = document.createElement('input');
      textInput.value = NetdiscUrlType[disk_type.toUpperCase()]
      document.body.appendChild(textInput);
      textInput.select();
      document.execCommand('copy');
      document.body.removeChild(textInput);
      alert('资源链接已复制');
      break;
  }
}
onBeforeMount(() => {
  CreateQRCode()
})
</script>
<style scoped>
::-webkit-scrollbar {
  width: 0.51rem;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #a8a8a8;
  /* 滑块颜色 */
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
