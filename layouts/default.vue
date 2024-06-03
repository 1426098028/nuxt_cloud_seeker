<template>
  <div class='Layout grid  items-center  justify-center  font-mono'>
    <header class='sticky relative top-0 left-0 z-50 p-2 bg-white border-b-2 text-center'>
      <Input @onChange='onSearch' />
    </header>
    <main class='Main p-2.5'>
      <NuxtPage />
    </main>
    <footer></footer>
  </div>
</template>
<script setup>
const onSearch = (value) => {
  useEventBus.emit('onSearch', value)
}
</script>
<style scoped>
header {}

.Main {}

footer {}


@media only screen and (min-width: 768px) {
  .Layout {
    grid-template-columns: repeat(1, minmax(0, 50%));
  }
}

@media only screen and (max-width: 767px) {
  .Layout {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
}
</style>
