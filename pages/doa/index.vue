<template>
    <div class="max-w-screen-xl mx-auto p-4 bg-teal-400 dark:bg-slate-500">
        <div class="p-6 text-center">
            <img src="/Symbol_of_Islam.svg" class="w-40 h-auto mx-auto">
            <div class="relative w-full md:w-8/12 lg:w-6/12 mt-4 mx-auto">
                <input type="text"
                    class="border rounded-full w-full py-3 px-4 pr-10 text-gray-700 leading-tight shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-300"
                    placeholder="Search for Doa" />
                <div
                    class="absolute inset-y-2/4 right-2 flex h-8 w-8 -translate-y-2/4 items-center justify-center rounded-full md:h-9 md:w-9">
                    <Icon name="mdi:magnify" class="text-gray-700 w-6 h-6" />
                </div>
            </div>
        </div>
    </div>

    <div class="space-y-4">
        <div class="w-full px-4 pt-16">
            <div class="mx-auto rounded-2xl p-2" v-for="item in doa" :key="item">
                <Disclosure as="div" class="mt-2" v-slot="{ open }">
                    <DisclosureButton
                        class="flex w-full justify-between rounded-lg bg-purple-100 dark:bg-purple-300 px-4 py-3 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75">
                        <span class="text-base">{{ item.nama }}</span>
                        <Icon name="mdi:chevron-up" class="h-5 w-5 text-purple-500"
                            :class="open ? 'rotate-180 transform' : ''" />
                    </DisclosureButton>
                    <transition enter-active-class="transition duration-1000 ease-out"
                        enter-from-class="transform scale-95 opacity-0" enter-to-class="transform scale-100 opacity-100"
                        leave-active-class="transition duration-75 ease-out"
                        leave-from-class="transform scale-100 opacity-100" leave-to-class="transform scale-95 opacity-0">
                        <DisclosurePanel class="px-4 pb-2 pt-4 text-sm text-gray-500">
                            <p class="text-right mb-8 mt-3 text-3xl font-semibold text-black">{{ item.arab }}</p>
                            <span class="font-medium text-lg dark:text-gray-200">{{ item.latin }}</span>
                            <p class="mt-3 text-base dark:text-gray-200">{{ item.arti }}</p>
                        </DisclosurePanel>
                    </transition>
                </Disclosure>
            </div>
        </div>
    </div>
</template>

<script setup>
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'

import dataBase from '/public/doa.json'

const doa = ref(dataBase)
</script>