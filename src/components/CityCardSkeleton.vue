<template>
  <div class="flex py-6 px-3 lg:mx-40 xl:mx-60 bg-clr-lightBlack rounded-md">
    <div class="flex flex-col flex-1 gap-2">
      <AnimatedPlaceholder class="max-w-[40%]" />
      <AnimatedPlaceholder class="h-[20px] max-w-[30%]" />
    </div>

    <div class="flex flex-col items-end flex-1 gap-2">
      <AnimatedPlaceholder class="max-w-[30%] w-full" />
      <AnimatedPlaceholder class="h-[20px] max-w-[40%] w-full" />
    </div>
  </div>
</template>

<script setup>
import AnimatedPlaceholder from "./AnimatedPlaceholder.vue";
</script>
