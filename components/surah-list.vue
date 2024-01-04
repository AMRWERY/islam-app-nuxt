<template>
    <div class="flex cursor-pointer items-center gap-x-2" role="button" @click="openModal">
        <Icon name="mdi:border-all" class="text-base text-slate-800 md:text-lg" />
        <p class="text-xs text-slate-800 md:text-sm">{{ store.surah?.namaLatin }} ({{
            store.surah?.jumlahAyat }}) Ayat</p>
    </div>
    <TransitionRoot as="template" :show="isOpen">
        <Dialog as="div" class="relative z-10">
            <TransitionChild as="template" enter="ease-in-out duration-500" enter-from="opacity-0" enter-to="opacity-100"
                leave="ease-in-out duration-500" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </TransitionChild>

            <div class="fixed inset-0 overflow-hidden">
                <div class="absolute inset-0 overflow-hidden">
                    <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                        <TransitionChild as="template" enter="transform transition ease-in-out duration-500 sm:duration-700"
                            enter-from="translate-x-full" enter-to="translate-x-0"
                            leave="transform transition ease-in-out duration-500 sm:duration-700" leave-from="translate-x-0"
                            leave-to="translate-x-full">
                            <DialogPanel class="pointer-events-auto w-screen max-w-md">
                                <div class="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                    <div class="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                                        <div class="flex items-start justify-between">
                                            <DialogTitle class="text-lg font-medium text-gray-900">List Surah
                                            </DialogTitle>
                                            <div class="ml-3 flex h-7 items-center">
                                                <button type="button"
                                                    class="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                                                    @click="closeModal">
                                                    <span class="absolute -inset-0.5" />
                                                    <span class="sr-only">Close panel</span>
                                                    <Icon name="mdi:window-close" class="h-6 w-6" aria-hidden="true" />
                                                </button>
                                            </div>
                                        </div>
                                        <div class="relative mt-4">
                                            <input type="text" placeholder="Search for Surah"
                                                class="form-input relative block disabled:cursor-not-allowed disabled:opacity-75 focus:outline-none border-0 w-full rounded-lg placeholder-gray-500 dark:placeholder-gray-400 text-sm px-3 py-2 shadow-sm text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 bg-white dark:bg-background-dark focus:ring-primary-500 dark:focus:ring-primary-600 pe-10">
                                            <span
                                                class="absolute inset-y-0 end-0 flex items-center pointer-events-none pe-3">
                                                <Icon name="mdi:magnify"
                                                    class="mt-1 flex-shrink-0 text-gray-400 dark:text-gray-500 h-5 w-5" />
                                            </span>
                                        </div>

                                        <div class="mt-8">
                                            <div class="flow-root">
                                                <ul role="list" class="divide-y divide-gray-100">
                                                    <li v-for="surah in store.quran?.data" :key="surah"
                                                        class="flex justify-between gap-x-6 py-5">
                                                        <div class="flex min-w-0 gap-x-4">
                                                            <p class="mt-0.5 text-xs leading-5 text-gray-500">{{
                                                                surah.nomor }}-</p>
                                                            <div class="min-w-0 flex-auto">
                                                                <p class="text-sm font-semibold leading-6 text-gray-900">{{
                                                                    surah.namaLatin }}</p>

                                                            </div>
                                                        </div>
                                                        <div class="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                                                            <p class="text-sm leading-6 text-gray-900">{{ surah.jumlahAyat
                                                            }} ayat</p>

                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>
  
<script setup>
import { useQuranStore } from '@/stores/quranStore'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'

const isOpen = ref(false)
const store = useQuranStore()

const closeModal = () => {
    isOpen.value = false;
};

const openModal = () => {
    isOpen.value = true;
};

onMounted(() => {
    store.getQuranData()
})
</script>