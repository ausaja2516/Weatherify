<template>
  <div>
    <Suspense>
      <AsyncCityView />

      <template #fallback>
        <CityViewSkeleton />
      </template>
    </Suspense>
  </div>
</template>

<script setup>
import CityViewSkeleton from "@/components/CityViewSkeleton.vue";
import AsyncCityView from "../components/AsyncCityView.vue";
</script>

<style>
.skeleton {
  animation: skeleton-loading 1s linear infinite alternate;
}

@keyframes skeleton-loading {
  0% {
    background-color: #f1f5f9;
  }
  100% {
    background-color: white;
  }
}
</style>
