<template>
  <div class="flex flex-col my-12 mx-4">
    <!-- Overview -->
    <div class="flex flex-col items-center">
      <div
        class="flex flex-col gap-10 p-4 bg-clr-lightBlack max-w-[400px] w-full rounded-md"
      >
        <div class="flex justify-between">
          <AnimatedPlaceholder class="max-w-[120px] w-full" />
          <AnimatedPlaceholder class="max-w-[200px] w-full mb-4" />
        </div>
        <AnimatedPlaceholder class="h-[150px] w-full mb-12" />

        <AnimatedPlaceholder class="h-[120px] w-full" />
      </div>
    </div>
    <hr class="border-clr-marine/20 w-full my-20" />
    <!-- Hourly -->
    <div
      class="flex flex-col max-w-screen-md w-full mx-auto bg-clr-lightBlack p-8 rounded-md"
    >
      <AnimatedPlaceholder class="w-[100px] mb-12" />
      <AnimatedPlaceholder class="h-[150px] w-full mb-2" />
    </div>
    <hr class="border-clr-marine/20 w-full my-20" />
    <!-- Weekly -->
    <div class="flex flex-col max-w-screen-md w-full mx-auto">
      <AnimatedPlaceholder class="w-[100px] mb-10" />
      <AnimatedPlaceholder class="h-[20px] mb-8" />
      <AnimatedPlaceholder class="h-[20px] mb-8" />
      <AnimatedPlaceholder class="h-[20px] mb-8" />
      <AnimatedPlaceholder class="h-[20px] mb-8" />
    </div>
  </div>
</template>

<script setup>
import AnimatedPlaceholder from "./AnimatedPlaceholder.vue";
</script>
