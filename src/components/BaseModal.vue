<template>
  <Teleport to="body">
    <Transition name="modal-outer">
      <div
        v-show="modalActive"
        class="fixed inset-0 flex justify-center items-center px-4 text-white bg-black bg-opacity-40"
      >
        <Transition name="modal-inner">
          <div
            v-if="modalActive"
            class="max-w-screen-sm p-4 bg-clr-lightBlack rounded-sm text-justify"
          >
            <slot />
            <button
              @click="$emit('closeModal')"
              class="bg-clr-blue text-xs font-bold tracking-wider mt-8 px-6 py-2 rounded-md hover:bg-opacity-70 transition-all duration-300"
            >
              Close
            </button>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
defineProps({
  modalActive: {
    type: Boolean,
    default: false,
  },
});
defineEmits(["closeModal"]);
</script>

<style scoped>
.modal-outer-enter-active,
.modal-outer-leave-active {
  transition: opacity 0.35s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-outer-enter-from,
.modal-outer-leave-to {
  opacity: 0;
}

.modal-inner-enter-active {
  transition: all 0.35s cubic-bezier(0.52, 0.02, 0.19, 1.02) 0.15s;
}

.modal-inner-leave-active {
  transition: all 0.35s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-inner-enter-from {
  opacity: 0;
  transform: scale(0.6);
}

.modal-inner-leave-to {
  opacity: 0;
  transform: scale(0.6);
}
</style>
