<template>
  <main class="container">
    <div class="pt-6 mb-8 relative flex justify-center">
      <div
        class="flex items-center group gap-3 ps-2 w-80 text-sm bg-clr-lightBlack rounded-md"
      >
        <i
          class="fa fa-search text-clr-blue group-hover:opacity-70 transition-all duration-300"
        ></i>
        <input
          v-model="searchQuery"
          @input="getSearchResults"
          type="text"
          placeholder="Search for a city or state..."
          class="bg-transparent group outline-none w-full py-2 placeholder:text-clr-grayBlue"
        />
      </div>

      <ul
        v-if="searchResults"
        class="absolute w-full bg-clr-lightBlack max-w-screen-sm rounded-md top-[70px] overflow-hidden"
      >
        <p class="p-3 text-center" v-if="searchError">
          Sorry, something went wrong, please try again.
        </p>
        <p
          class="p-3 text-center"
          v-if="!searchError && searchResults.length === 0"
        >
          No results match your query, try a different term.
        </p>
        <template v-else>
          <li
            @click="gotoCity(result)"
            class="p-4 text-sm cursor-pointer [&:not(:last-child)]:border-b border-clr-marine/20 hover:bg-clr-marine/50 transition-all duration-300"
            v-for="result in searchResults"
            :key="result.id"
          >
            {{ result.place_name }}
          </li>
        </template>
      </ul>
    </div>

    <Suspense>
      <CityList />

      <template #fallback>
        <CityCardSkeleton />
      </template>
    </Suspense>
  </main>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import CityList from "@/components/CityList.vue";
import CityCardSkeleton from "@/components/CityCardSkeleton.vue";

const router = useRouter();
const gotoCity = (searchResult) => {
  const [city, state] = searchResult.place_name.split(",");
  const country = searchResult.place_name.split(",").pop();

  router.push({
    name: "cityView",
    params: {
      country: country.replaceAll(" ", ""),
      state: state.replaceAll(" ", ""),
      city: city.replaceAll(" ", ""),
    },
    query: {
      lat: searchResult.geometry.coordinates[1],
      lng: searchResult.geometry.coordinates[0],
      preview: true,
    },
  });
};

const mapboxAPIKey =
  "pk.eyJ1Ijoiam9obmtvbWFybmlja2kiLCJhIjoiY2t5NjFzODZvMHJkaDJ1bWx6OGVieGxreSJ9.IpojdT3U3NENknF6_WhR2Q";
const searchQuery = ref("");
const queryTimeout = ref(null);
const searchResults = ref(null);
const searchError = ref(null);

const getSearchResults = () => {
  clearTimeout(queryTimeout.value);

  queryTimeout.value = setTimeout(async () => {
    if (searchQuery.value !== "") {
      try {
        const res = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery.value}.json?access_token=${mapboxAPIKey}&types=place`
        );
        const data = await res.json();
        searchResults.value = data.features;
      } catch {
        searchError.value = true;
      }
      return;
    }
    searchResults.value = null;
  }, 300);
};
</script>
