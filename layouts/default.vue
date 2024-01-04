<template>
    <Disclosure as="nav" class="bg-gray-800" v-slot="{ open }">
        <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div class="relative flex h-16 items-center justify-between">
                <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
                    <!-- Mobile menu button-->
                    <DisclosureButton
                        class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white">
                        <span class="absolute -inset-0.5" />
                        <span class="sr-only">Open main menu</span>
                        <Icon name="material-symbols:menu-rounded" class="block h-6 w-6" aria-hidden="true" v-if="!open" />
                        <Icon name="material-symbols:menu-open-rounded" class="block h-6 w-6" aria-hidden="true" v-else />
                    </DisclosureButton>
                </div>
                <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                    <div class="flex flex-shrink-0 items-center">
                        <icon name="openmoji:mosque" class="text-5xl" />
                    </div>
                    <div class="hidden sm:ml-6 sm:block mt-2">
                        <div class="flex space-x-4">
                            <nuxt-link v-for="item in navigation" :key="item.name" :to="item.route"
                                :class="[item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'rounded-md px-3 py-2 text-sm font-medium']"
                                :aria-current="item.current ? 'page' : undefined">{{ item.name }}</nuxt-link>
                        </div>
                    </div>
                </div>
                <div
                    class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 space-x-3">
                    <button type="button"
                        class="relative rounded-full text-neutral-200 hover:text-neutral-400 focus:text-neutral-400 text-lg font-medium disabled:text-black/30 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
                        @click="toggleTheme">
                        <span class="absolute -inset-1.5" />
                        <icon v-if="theme === 'dark'" name="mi:moon" class="h-5 w-5" />
                        <icon v-else name="mi:sun" class="h-5 w-5" />
                    </button>
                </div>
            </div>
        </div>

        <DisclosurePanel class="sm:hidden">
            <div class="space-y-1 px-2 pb-3 pt-2">
                <DisclosureButton v-for="item in navigation" :key="item.name" as="a" :href="item.route"
                    :class="[item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'block rounded-md px-3 py-2 text-base font-medium']"
                    :aria-current="item.current ? 'page' : undefined">{{ item.name }}</DisclosureButton>
            </div>
        </DisclosurePanel>
    </Disclosure>

    <main>
        <div class="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            <slot />
        </div>
    </main>
</template>
  
<script setup>
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'

const navigation = [
    { name: 'AL-Quran', route: '/', current: true },
    { name: 'Hadits', route: '/hadith', current: false },
    { name: 'Doa', route: '/doa', current: false },
    { name: 'Jadwal Sholat', route: '', current: false },
]

const theme = ref('light');

const toggleTheme = () => {
    theme.value = theme.value === 'dark' ? 'light' : 'dark';
    // sessionStorage.setItem('theme', theme.value);
    updateThemeClasses(theme.value);
};

const updateThemeClasses = (newTheme) => {
    const body = document.querySelector('body');
    if (newTheme === 'dark') {
        body.classList.add('dark');
    } else {
        body.classList.remove('dark');
    }
};
</script>