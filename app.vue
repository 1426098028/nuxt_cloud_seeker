<template>
  <div>
    <h1 class="text-3xl font-bold underline bg-blend-color-burn">
      {{ content }}
      message: {{ message}}
    </h1>
    <div class="bg-amber-200 h-screen w-screen"></div>
  </div>
</template>

<script setup>
import {onMounted} from "vue"

const {data: content} = await useFetch("https://v1.hitokoto.cn/?c=i&c=d&encode=text")

const message =  ref("Hello World!")

async function fetchHitokoto() {
  const url = "https://v1.hitokoto.cn/?c=i&c=d&encode=text"
  try {
    const response = fetch(url)
    if (response.ok) {
      message.value = await response.text()
      console.log(content.value)
    } else {
      console.error(
          `Failed to fetch hitokoto: ${response.status} ${response.statusText}`,
      )
    }
  } catch (error) {
    console.error("Error fetching hitokoto:", error)
  }
}

onMounted(() => {
  fetchHitokoto()
})
</script>
