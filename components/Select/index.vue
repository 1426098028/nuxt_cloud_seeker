<template>
  <div class="relative bg-slate-50 inline-block">
    <button @click.stop='onOpen'
      class="px-2 py-1 text-base     shadow focus:outline-none  flex justify-between items-center  gap-2  hover:shadow-md hover:bg-gray-100 active:bg-gray-200">
      <span v-if="!Multiple">{{ Text }}</span>
      <button v-if="Multiple && Object.keys(Value).length !== 0"
        class="px-2 -my-px -ml-px mr-px leading-none py-1 rounded bg-white border border-solid flex justify-between items-center  gap-2   ">
        <span class='text-xs'>{{ Text }} </span>
        <i @click.stop='onDelete' class='text-xs'>
          <FontAwesomeIcon :icon='faX' />
        </i>
      </button>
      <span v-if="Multiple"> {{ Object.keys(Value).length !== 0 ? '+' + Object.keys(Value).length : Text }}
      </span>
      <i class='text-base'>
        <FontAwesomeIcon :icon='faChevronDown' />
      </i>
    </button>
    <div v-show="isOpen" class="absolute mt-1 flex-1  bg-white border border-gray-300 rounded shadow-lg z-10">
      <ul class="max-h-60 overflow-auto ">
        <li v-for="(item) in SelectList" :key="item.SelectType" @click="onSelectOption(item)"
          class="px-4 py-2 hover:bg-gray-100 active:bg-gray-200 cursor-pointer"
          :class='{ "bg-gray-200": Value[item.SelectType] }'>
          {{ item.SelectName }}</li>
      </ul>
    </div>
  </div>
</template>
<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faChevronDown, faX } from '@fortawesome/free-solid-svg-icons';
const { Title, Multiple, SelectList: [SelectList] } = defineProps({ Title: { type: String, default: '过滤类型' }, Multiple: { type: Boolean, default: false }, SelectList: { type: Array, required: true } })
const emits = defineEmits(['onChange'])
const isOpen = ref(false)
const Text = ref(Multiple ? Title : SelectList.SelectName)
const Value = ref(Multiple ? {} : {
  [SelectList.SelectType]: SelectList.SelectName
})
const onOpen = () => { isOpen.value = !isOpen.value }
const onSelectOption = ({ SelectName, SelectType }) => {
  if (Multiple) {
    if (Value.value[SelectType]) {
      delete Value.value[SelectType]
    } else {
      Value.value[SelectType] = SelectName
    }
  } else {
    Value.value = {}
    Value.value[SelectType] = SelectName
  }
  emits('onChange', Multiple ? Value.value : { SelectName, SelectType })
  Text.value = SelectName
  onOpen()
}
const onDelete = () => {
  let DeleteKey = ''
  Object.keys(Value.value).forEach(item => {
    if (Value.value[item] == Text.value) {
      DeleteKey = item
    }
  })
  delete Value.value[DeleteKey]
  Text.value = Object.keys(Value.value) == 0 ? Title : Value.value[Object.keys(Value.value)[0]]
  emits('onChange', Multiple ? Value.value : { SelectName, SelectType })
}
</script>
<style scoped></style>
