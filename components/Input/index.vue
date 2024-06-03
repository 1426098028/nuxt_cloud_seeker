<template>
  <div
    class='inline-flex justify-center items-center w-full  lg:w-1/2  border rounded border-solid border-slate-200 shadow rounded-full   leading-4 py-2.5 px-5 hover:shadow-md hover:bg-gray-100 active:bg-gray-200'>
    <input v-model='Value' class='w-full outline-none outline-transparent bg-transparent  pr-2.5' type="text"
      placeholder='搜索'>
    <i class='shrink-0 ' @click='onSearch'>
      <FontAwesomeIcon :icon="faMagnifyingGlass" />
    </i>
  </div>
</template>
<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
const emits = defineEmits(['onChange', 'onFocus'])
const Value = ref(null)
const onSearch = ({ target: { value } }) => {
  emits('onChange', Value.value)
  emits('onFocus', Value.value)
}
</script>

<style scoped></style>
