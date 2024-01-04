<template>
    <Head>
        <Title>Surah: {{ store.surah?.nama }} | {{ store.surah?.namaLatin }} ({{ store.surah?.jumlahAyat }})</Title>
    </Head>
    <div>
        <div class="relative">
            <div
                class="sticky top-0 z-10 flex h-10 w-full items-center border-b border-slate-700/10 bg-white/75 backdrop-blur dark:border-slate-300/10 dark:bg-background-dark/70 rounded-md">
                <div class="container flex items-center justify-between px-2">

                    <surah-list />

                    <div class="flex items-center gap-x-4">

                        <surah-description />

                        <audio-list />

                    </div>
                </div>
            </div>
            <div class="pt-8">
                <img src="https://justfields.com/storage/projects/7M5rV059/bismillah.svg"
                    class="mx-auto mb-10 h-auto w-48 md:w-52 lg:w-56">

                <div class="space-y-5"></div>
                <div class="flex w-full flex-col gap-8" v-for="ayat in store.surah?.ayat" :key="ayat">
                    <div class="flex items-center justify-between rounded-xl bg-teal-600/10 px-4 py-1.5">
                        <p class="text-sm font-semibold tracking-wide text-teal-700 dark:text-teal-500">{{ ayat.nomorAyat }}
                        </p>
                        <div class="flex items-center gap-1">
                            <div class="relative inline-flex">
                                <div class="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-lg text-teal-700 hover:bg-teal-100/60 dark:text-teal-500 hover:dark:bg-teal-200/10"
                                    role="button)" @click="openAudioAyatDialog(ayat.nomorAyat)">
                                    <Icon name="bi:play-circle-fill" aria-hidden="true" />
                                </div>
                            </div>
                            <div class="relative inline-flex">
                                <div class="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-lg text-teal-700 hover:bg-teal-100/60 dark:text-teal-500 hover:dark:bg-teal-200/10"
                                    role="button" @click="openAudioListDialog(ayat.nomorAyat)">
                                    <Icon name="bi:book-half" aria-hidden="true" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="w-full mb-5">
                        <p
                            class="mb-5 text-right font-mono text-3xl leading-[65px] text-slate-800 dark:text-white md:!leading-[70px] lg:text-4xl lg:!leading-[80px]">
                            {{ ayat.teksArab }}</p>
                        <p
                            class="mb-3 text-sm !leading-7 tracking-wide font-semibold text-teal-800 dark:text-gray-300 md:text-base">
                            {{
                                ayat.teksLatin }}</p>
                        <p class="text-sm !leading-7 text-smoke-1 dark:text-gray-300 md:text-base">{{ ayat.teksIndonesia }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <tafsir-ayat :tafsirData="tafsirAya" :isOpen="openViewModal" :closeDialog="closeModal" />

    <audio-ayat />
</template>

<script setup>
import { useQuranStore } from '@/stores/quranStore'
import { useRoute } from "vue-router";

const store = useQuranStore()
const storeTwo = useQuranStore()
const route = useRoute();
const openViewModal = ref(false);
const selectedTafsir = ref(null);
const selectedAyat = ref(null);
const tafsirAya = ref('')
const audioAya = ref({})

onMounted(() => {
    store.getSurahDetails(route.params.id)
})

watch(() => store.tafsir, (newTafsir) => {
    const selectedTafsirItem = Array.isArray(newTafsir) ? newTafsir.find(item => item.tafsir?.teks === selectedAyat.value) : null;
    if (selectedTafsirItem) {
        selectedTafsir.value = selectedTafsirItem.nomor;
    }
});

const openAudioListDialog = (nomorAyat) => {
    openViewModal.value = true
    let ayaaaaat = store.tafsir
    tafsirAya.value = ayaaaaat.find((tafsir_aya) => tafsir_aya.ayat == nomorAyat)?.teks
};

const openAudioAyatDialog = (nomorAyat) => {
    openViewModal.value = true;
    let ayat = store.surah?.ayat.find((ayat) => ayat.nomorAyat == nomorAyat);
    audioAya.value = ayat?.audio['01'];
};

// const openAudioAyatDialog = (nomorAyat) => {
//     openViewModal.value = true
//     let ayaaaaat = store.surah?.ayat;
//     audioAya.value = ayaaaaat.find(ayat => ayat.nomorAyat == nomorAyat)?.audio['01'];
// };

// const openAudioAyatDialog = (nomorAyat) => {
//     openViewModal.value = true
//     let ayaaaaat = store.surah?.ayat[0].audio
//     // let ayaaaaat = store.tafsir
//     audioAya.value = ayaaaaat.find((tafsir_aya) => tafsir_aya.ayat.audio == nomorAyat)?.ayat
// };

onMounted(() => {
    storeTwo.getSurahTafsir(route.params.id)
})

const closeModal = () => {
    openViewModal.value = false;
};
</script> 