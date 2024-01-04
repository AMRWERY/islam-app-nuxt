<template>
    <div class="flex cursor-pointer items-center text-xs text-teal-700 dark:text-teal-500 md:text-sm" @click="openModal">
        <Icon name="bi:play-circle-fill" class="mr-1 text-base text-teal-700 dark:text-teal-500 md:text-lg" />
        Play
    </div>
    <TransitionRoot appear :show="isOpen" as="template">
        <Dialog as="div" @close="closeModal" class="relative z-10">
            <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
                leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-black/25" />
            </TransitionChild>

            <div class="fixed inset-0 overflow-y-auto">
                <div class="flex min-h-full items-center justify-center p-4 text-center">
                    <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
                        enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
                        leave-to="opacity-0 scale-95">
                        <DialogPanel
                            class="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                            <div class="mt-2">
                                <ul role="list" class="divide-y divide-gray-100">
                                    <li v-for="(audioLink, index) in audioAyat" :key="index"
                                        class=" justify-between gap-x-6 py-5">
                                        <div class="flex gap-x-4 items-center">
                                            <div class="min-w-0 flex-auto">
                                                <p class="text-sm font-semibold leading-6 text-gray-900 mt-3">{{
                                                    getAudioAya(ayat.nomorAyat) }}</p>
                                            </div>
                                            <audio controls>
                                                <source :src="audioLink" type="audio/mpeg">
                                            </audio>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            <div class="mt-4">
                                <button type="button"
                                    class="inline-flex justify-center rounded-md float-right border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                    @click="closeModal">
                                    Close
                                </button>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>
  
<script setup>
import { ref, onMounted } from "vue";
import { useQuranStore } from '@/stores/quranStore'
import { useRoute } from "vue-router";
import { TransitionRoot, TransitionChild, Dialog, DialogPanel } from '@headlessui/vue'

const isOpen = ref(false)
const store = useQuranStore()
const route = useRoute();

const closeModal = () => {
    isOpen.value = false;
};

const openModal = () => {
    isOpen.value = true;
};

onMounted(() => {
    store.getSurahDetails(route.params.id)
    // const audioFull = store.surah?.audioFull;
    const audioAyat = store.surah?.ayat.audio;
    // console.log(audioFull);
})

const getAudioName = (link) => {
    let name = link.split('/')[4]
    return name
}

const getAudioAya = (nomorAyat) => {
    const ayat = store.surah?.ayat.find(ayat => ayat.nomorAyat === nomorAyat);
    return ayat?.audio['01'];
};
</script>