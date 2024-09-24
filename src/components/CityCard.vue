<template>
  <div
    class="flex flex-wrap gap-5 p-4 bg-clr-lightBlack rounded-md hover:bg-clr-marine/70 transition-all duration-300 cursor-pointer"
  >
    <div class="flex flex-col flex-1">
      <h2 class="text-xl">{{ city.city }},</h2>
      <h3 class="text-sm">{{ city.country }}</h3>
    </div>

    <div class="flex flex-col gap-2">
      <p class="text-xl">{{ Math.round(city.weather.main.temp) }}&deg;C</p>
      <div class="flex gap-3">
        <span class="text-sm">
          H:
          {{ Math.round(city.weather.main.temp_max) }}&deg;C
        </span>
        <span class="text-sm">
          L:
          {{ Math.round(city.weather.main.temp_min) }}&deg;C
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  city: {
    type: Object,
    default: {},
  },
});
</script>
