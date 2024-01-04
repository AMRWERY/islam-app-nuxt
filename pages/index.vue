<template>
    <QuranBanner />

    <div class="container">
        <div class="mb-12" v-if="favoriteSurah.length > 0">
            <p class="mb-3 border-l-4 border-teal-600 pl-2 text-base font-semibold text-yami dark:text-gray-200">
                Surah Favorite
            </p>
        </div>

        <div class="mb-12" v-else>
            <p class="mb-3 border-l-4 border-teal-600 pl-2 text-base font-semibold text-yami dark:text-gray-200">
                Surah Favorite
            </p>
            <p class="text-sm text-yami dark:text-gray-200">You don't have a favorite surah yet</p>
        </div>


        <!-- favorite surah list 😂 -->

        <div class="no-scrollbar flex gap-x-3 overflow-x-auto scroll-smooth mb-8">
            <nuxt-link :to="'/quran/' + surah.nomor" v-for="surah in favoriteSurah" :key="surah"
                class="group min-w-[200px] max-w-[200px] cursor-pointer rounded-lg border border-gray-300/70 dark:border-gray-300 p-3 hover:border-teal-600 hover:shadow-surah-card dark:hover:border-teal-600 dark:hover:shadow-surah-card-dark">
                <div class="mb-3 flex items-center justify-between">
                    <div>
                        <p class="mb-1 text-[13px] font-semibold tracking-wide text-yami dark:text-slate-200">
                            {{ surah.nama }}
                        </p>
                        <p class="text-xs font-normal text-smoke-1 dark:text-slate-300">
                            {{ surah.arti }}
                        </p>
                    </div>
                    <div class="relative inline-flex" @click.prevent="removeFromFavorites(surah)">
                        <Icon name="mi:heart" class="text-xl text-gray-700 dark:text-white" />
                    </div>
                </div>
                <div class="flex h-20 flex-col items-center justify-center rounded-md bg-slate-100 dark:bg-slate-700">
                    <p class="mb-0.5 font-mono text-lg font-medium text-yami dark:text-slate-200">
                        {{ surah.nama }}
                    </p>
                    <p class="text-xs font-normal text-smoke-1 dark:text-slate-200">
                        {{ surah.jumlahAyat }} Ayat
                    </p>
                </div>
            </nuxt-link>
        </div>


        <div class="mb-3 border-l-4 border-teal-600 pl-2 text-base font-semibold text-yami dark:text-slate-200">Surah List
        </div>
        <div class="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            <nuxt-link :to="'/quran/' + surah.nomor" v-for="surah in store.quran" :key="surah"
                class="group w-full cursor-pointer rounded-lg border border-gray-300/70 p-3 dark:border-gray-300 hover:border-teal-600 hover:shadow-surah-card dark:hover:border-teal-600 dark:hover:shadow-surah-card-dark">
                <div class="mb-3 flex items-center justify-between">
                    <div
                        class="flex h-11 w-11 rotate-45 items-center justify-center rounded-lg bg-gray-200/50 group-hover:bg-teal-600 dark:bg-teal-700/50">
                        <p class="-rotate-45 text-sm font-semibold text-yami group-hover:text-white dark:text-slate-300">{{
                            surah.nomor }}</p>
                    </div>
                    <button class="relative inline-flex" @click.prevent="toggleFavorite(surah)">
                        <icon name="mi:heart" class="text-2xl text-gray-700 dark:text-white" />
                    </button>
                </div>
                <div class="flex items-center justify-between">
                    <div>
                        <p class="mb-1 text-[13px] font-semibold tracking-wide text-yami dark:text-slate-200">{{
                            surah.namaLatin
                        }}</p>
                        <p class="text-xs font-normal text-smoke-1 dark:text-slate-200">{{ surah.tempatTurun }}</p>
                    </div>
                    <div class="flex flex-col items-end gap-y-[2px]">
                        <p class="font-mono text-lg font-medium text-yami dark:text-slate-200">{{ surah.nama }}</p>
                        <p class="text-xs font-normal text-smoke-1 dark:text-slate-200 mr-2">{{ surah.jumlahAyat }} Ayat</p>
                    </div>
                </div>
            </nuxt-link>
        </div>
    </div>
</template>
  
<script setup>
import { useQuranStore } from '@/stores/quranStore'

const store = useQuranStore()

onMounted(() => {
    store.getQuranData()
})

const favoriteSurah = ref([]);

onMounted(() => {
    const storedFavoriteSurah = JSON.parse(localStorage.getItem('favoriteSurah')) || [];
    favoriteSurah.value = storedFavoriteSurah;
});

const toggleFavorite = (surah) => {
    const isAlreadyFavorite = favoriteSurah.value.some((favSurah) => favSurah.nomor === surah.nomor);
    if (!isAlreadyFavorite) {
        surah.isFavorite = !surah.isFavorite;
        if (surah.isFavorite) {
            favoriteSurah.value.push(surah);
        } else {
            favoriteSurah.value = favoriteSurah.value.filter((favSurah) => favSurah.nomor !== surah.nomor);
        }
        localStorage.setItem('favoriteSurah', JSON.stringify(favoriteSurah.value));
    }
};

const removeFromFavorites = (surah) => {
    const index = favoriteSurah.value.findIndex((favSurah) => favSurah.nomor === surah.nomor);

    if (index !== -1) {
        favoriteSurah.value.splice(index, 1);
    }
    localStorage.setItem('favoriteSurah', JSON.stringify(favoriteSurah.value));
};

useHead({
    title: 'Islam App | Quran'
})
</script>