<template>
  <div class="flex flex-col items-center mx-4 my-12">
    <div v-if="route.query.preview" class="mt-[-20px] mb-8 text-center text-xs">
      <p>
        You are currently previewing this city, click the "<i
          class="fa fa-plus text-[10px]"
        ></i
        >" icon to start tracking this city.
      </p>
    </div>
    <!-- Weather Overview Card -->
    <div
      class="flex flex-col max-w-[400px] w-full gap-8 p-4 bg-clr-lightBlack rounded-md"
    >
      <div class="flex items-baseline flex-wrap">
        <h1 class="text-sm flex-1 mb-2">
          {{ route.params.city }}, {{ route.params.country }}
        </h1>
        <p class="text-xs">
          {{
            new Date(weatherData.currentTime).toLocaleDateString("en-us", {
              weekday: "short",
              day: "2-digit",
              month: "long",
            })
          }},
          {{
            new Date(weatherData.currentTime).toLocaleTimeString("en-us", {
              timeStyle: "short",
            })
          }}
        </p>
      </div>
      <!-- <img
        class="w-[150px] h-auto object-cover"
        :src="`http://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`"
        alt=""
      /> -->
      <Vue3Lottie
        :animation-link="getWeatherDescImg(weatherData.current.weather[0].main)"
        :height="200"
        :width="200"
      />
      <div class="text-center bg-clr-black py-4 w-full rounded-lg">
        <p class="capitalize text-sm mb-4">
          {{ weatherData.current.weather[0].description }}
        </p>
        <p class="text-4xl mb-4 inline-flex items-center">
          {{ weatherData.current.temp.toFixed() }}&deg;C/
          <span class="text-lg">
            {{ weatherData.current.feels_like.toFixed() }}&deg;C
          </span>
        </p>
      </div>
    </div>

    <hr class="border-clr-marine/20 w-full my-20" />

    <!-- Hourly Weather -->
    <div class="max-w-screen-md w-full bg-clr-lightBlack p-6 rounded-md">
      <h2 class="mb-6">Hourly Weather</h2>
      <div class="flex gap-6 overflow-x-scroll">
        <div
          v-for="hourData in weatherData.hourly"
          :key="hourData.dt"
          class="flex flex-col bg-clr-black gap-4 items-center p-4 mb-6 rounded-lg"
        >
          <p class="whitespace-nowrap text-md">
            {{
              new Date(hourData.currentTime).toLocaleTimeString("en-us", {
                hour: "numeric",
              })
            }}
          </p>
          <img
            class="w-auto h-[50px] object-cover"
            :src="`http://openweathermap.org/img/wn/${hourData.weather[0].icon}@2x.png`"
            alt=""
          />
          <p class="text-xl">{{ Math.round(hourData.temp) }}&deg;C</p>
        </div>
      </div>
    </div>

    <hr class="border-clr-marine/20 w-full my-20" />

    <div class="max-w-screen-md w-full">
      <h2 class="mb-6">7 Day Forecast</h2>
      <div
        v-for="day in weatherData.daily"
        :key="day.dt"
        class="flex items-center mb-5"
      >
        <p class="flex-1">
          {{
            new Date(day.dt * 1000).toLocaleDateString("en-us", {
              weekday: "long",
            })
          }}
        </p>
        <img
          class="w-[50px] h-[50px] object-cover"
          :src="`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`"
          alt=""
        />
        <div class="flex gap-2 flex-1 flex-wrap justify-end">
          <p>H: {{ Math.round(day.temp.max) }}&deg;C</p>

          <p>L: {{ Math.round(day.temp.min) }}&deg;C</p>
        </div>
      </div>
    </div>

    <div
      class="flex items-center mt-12 gap-2 cursor-pointer duration-150 hover:text-red-500"
      @click="removeCity"
    >
      <i class="fa fa-trash"></i>
      <p>Remove City</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Vue3Lottie } from "vue3-lottie";

const route = useRoute();
const errorMsg = ref("");
const API_KEY = "64f60853740a1ee3ba20d0fb595c97d5";

const getWeatherData = async () => {
  try {
    const URL = `https://api.openweathermap.org/data/2.5/onecall?lat=${route.query.lat}&lon=${route.query.lng}&exclude={part}&appid=${API_KEY}&units=metric`;
    const res = await fetch(URL);
    const data = await res.json();

    if (!res.ok) {
      throw new Error("data not available");
    }
    // cal current date & time

    const localOffset = new Date().getTimezoneOffset() * 60000;
    const utc = data.current.dt * 1000 + localOffset;
    data.currentTime = utc + 1000 * data.timezone_offset;

    // cal hourly weather offset
    data.hourly.forEach((hour) => {
      const utc = hour.dt * 1000 + localOffset;
      hour.currentTime = utc + 1000 * data.timezone_offset;
    });

    await new Promise((res) => setTimeout(res, 1000));

    return data;
  } catch (err) {
    errorMsg.value = err.message;
    console.error(errorMsg.value);
  }
};

const weatherData = await getWeatherData();
// console.log(weatherData);

const getWeatherDescImg = (weatherDesc) => {
  if (!weatherDesc)
    "https://lottie.host/04b68f9c-a237-4e95-adb3-44df274a721e/EN4l0IQaq2.json";

  switch (weatherDesc) {
    case "Fog":
    case "Mist":
    case "Smoke":
    case "Dust":
    case "Haze":
      return "https://lottie.host/2fc22481-db46-4788-bceb-930a43fee95d/Th9sqGGJSw.json";

    case "Windy":
    case "Clouds":
    case "Breeze":
      return "https://lottie.host/d77dba41-742e-4a56-8a65-2972c42a993c/5Bv9R1koQy.json";

    case "Partly cloudy":
    case "Clear":
      return "https://lottie.host/75fffe17-4fe5-4a83-9fd6-bec21b79022b/Y59trvIAcs.json";

    case "Rain":
    case "Drizzle":
      return "https://lottie.host/de0d5150-3166-41a3-84da-43d24a5a7847/50z3rpoEKy.json";

    case "Thunder storm":
    case "Weather storm":
      return "https://lottie.host/7e1e1e5b-9352-41ce-b68b-aa25abc6ec86/OX5Bc8FOt1.json";

    default:
      return "https://lottie.host/04b68f9c-a237-4e95-adb3-44df274a721e/EN4l0IQaq2.json";
  }
};

const router = useRouter();
const removeCity = () => {
  const cities = JSON.parse(localStorage.getItem("savedCities"));
  const updatedCities = cities.filter((city) => city.id !== route.query.id);
  localStorage.setItem("savedCities", JSON.stringify(updatedCities));
  router.push({
    name: "home",
  });
};
</script>

<style scoped>
::-webkit-scrollbar {
  width: 0.5rem;
  height: 0.5rem;
  background: hsl(217 35% 45% / 20%);
  border-radius: 2rem;
}
::-webkit-scrollbar-thumb {
  background: hsl(217 35% 45%);
  border-radius: 2rem;
  cursor: pointer;
}
::-webkit-scrollbar-thumb:hover {
  background: hsl(212 100% 50% / 70%);
  border-radius: 2rem;
}
</style>
