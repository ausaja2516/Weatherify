<template>
  <div class="flex flex-col gap-4 lg:px-40 xl:px-60">
    <div v-for="city in savedCities" :key="city.id">
      <CityCard :city="city" @click="gotoCity(city)" />
    </div>
    <p v-if="savedCities.length === 0">
      No location is added. To start tracking a location, search in the field
      above.
    </p>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";
import CityCard from "./CityCard.vue";
import { useRouter } from "vue-router";

const savedCities = ref([]);
const API_KEY = "64f60853740a1ee3ba20d0fb595c97d5";

const getCities = async () => {
  if (localStorage.getItem("savedCities")) {
    savedCities.value = JSON.parse(localStorage.getItem("savedCities"));

    const requests = [];
    savedCities.value.forEach((city) => {
      requests.push(
        axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${city.coords.lat}&lon=${city.coords.lng}&appid=${API_KEY}&units=metric`
        )
      );
    });

    const weatherData = await Promise.all(requests);

    await new Promise((res) => setTimeout(res, 1000));

    weatherData.forEach((value, index) => {
      savedCities.value[index].weather = value.data;
    });
  }
};
await getCities();

const router = useRouter();
const gotoCity = (city) => {
  router.push({
    name: "cityView",
    params: {
      city: city.city,
      state: city.state,
      country: city.country,
    },
    query: {
      id: city.id,
      lat: city.coords.lat,
      lng: city.coords.lng,
    },
  });
};
</script>
