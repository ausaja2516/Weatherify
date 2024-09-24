<template>
  <div class="flex flex-col min-h-screen bg-clr-black text-white">
    <SiteNav />
    <RouterView class="flex-1" v-slot="{ Component }">
      <Transition name="page">
        <component :is="Component" />
      </Transition>
    </RouterView>
  </div>
</template>

<script setup>
import SiteNav from "./components/SiteNav.vue";
</script>

<style scoped>
.page-enter-active {
  transition: all 600ms ease-in-out;
}

.page-enter-from {
  opacity: 0;
}
</style>
