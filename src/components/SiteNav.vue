<template>
  <div>
    <header
      class="sticky top-0 border-b border-clr-marine/20 border-opacity-20"
    >
      <nav
        class="container flex flex-col sm:flex-row items-center gap-4 py-6 justify-between"
      >
        <RouterLink :to="{ name: 'home' }">
          <div
            class="flex items-center hover:text-clr-marine transition-all duration-300 gap-3"
          >
            <i class="fa fa-cloud text-xl"></i>
            <p class="text-xl tracking-wider">Weatherify</p>
          </div>
        </RouterLink>
        <div class="flex gap-8">
          <i
            @click="toggleModal"
            class="fa fa-info text-xl hover:text-clr-marine transition-all duration-300 cursor-pointer"
          ></i>

          <i
            @click="addCity"
            v-if="route.query.preview"
            class="fa fa-plus text-xl hover:text-clr-marine transition-all duration-300 cursor-pointer"
          ></i>
        </div>
        <BaseModal :modal-active="modalActive" @closeModal="toggleModal">
          <h1 class="text-xl mb-1">About:</h1>
          <p class="mb-4 text-sm pb-5 border-b border-clr-marine/20">
            Weatherify allows you to track the current and future weather of
            cities of your choosing.
          </p>
          <h2 class="text-md mb-1">How it works:</h2>
          <ol
            class="list-disc list-inside mb-4 text-sm pb-4 border-b border-clr-marine/20"
          >
            <li class="mb-2">
              Search for your city by entering the name into the search bar.
            </li>
            <li class="mb-2">
              Select a city within the results, this will take you to the
              current weather for your selection.
            </li>
            <li class="mb-2">
              Track the city by clicking on the "<i
                class="fa fa-plus text-[10px]"
              ></i
              >" icon in the top right. This will save the city to view at a
              later time on the home page.
            </li>
          </ol>

          <h2 class="text-md mb-1">Removing a city:</h2>
          <p class="text-sm">
            If you no longer wish to track a city, simply select the city within
            the home page. At the bottom of the page, there will be am option to
            delete the city.
          </p>
        </BaseModal>
      </nav>
    </header>
  </div>
</template>

<script setup>
import BaseModal from "./BaseModal.vue";
import { ref } from "vue";
import { uid } from "uid";
import { useRoute, useRouter } from "vue-router";

const savedCities = ref([]);
const route = useRoute();
const router = useRouter();
const addCity = () => {
  if (localStorage.getItem("savedCities")) {
    savedCities.value = JSON.parse(localStorage.getItem("savedCities"));
  }

  const locationObj = {
    id: uid(),
    country: route.params.country,
    state: route.params.state,
    city: route.params.city,
    coords: {
      lat: route.query.lat,
      lng: route.query.lng,
    },
  };

  savedCities.value.push(locationObj);
  localStorage.setItem("savedCities", JSON.stringify(savedCities.value));

  let query = { ...route.query };
  delete query.preview;
  query.id = locationObj.id;
  router.replace({ query });
};

const modalActive = ref(false);
const toggleModal = () => (modalActive.value = !modalActive.value);
</script>
