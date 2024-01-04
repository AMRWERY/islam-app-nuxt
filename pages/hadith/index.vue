<template>
    <div class="bg-gray-700">
        <div
            class="mb-10 mt-16 flex h-72 w-full flex-col items-center justify-center gap-y-8 p-4 dark:bg-slate-700/50 md:h-80">
            <HadithBanner />
            <div class="no-scrollbar flex w-full items-center gap-x-2 overflow-x-auto scroll-smooth lg:justify-center">
                <div v-for="name in store.hadith" :key="name"
                    class="bg-teal-100 dark:bg-teal-800 text-teal-700 dark:text-teal-100 w-min cursor-pointer whitespace-nowrap rounded-full px-3 py-1 text-sm font-medium">
                    {{ name.name }}</div>
            </div>
        </div>
    </div>

    <div class="mt-5">
        <div v-for="card in store.hadith" :key="card">
            <div class="mb-3">
                <p class="text-sm text-yami dark:text-slate-200 md:text-base">
                    There are <b>{{ card.total }}</b> hadiths according to {{ card.name }}
                </p>
            </div>
            <div>
                <div class="grid grid-cols-1 gap-4">
                    <div
                        class="rounded-lg border border-gray-300/70 p-4 transition-all duration-150 ease-linear hover:!border-teal-600 hover:shadow-[0px_0px_20px_#e4e4e4] dark:border-gray-700 hover:dark:shadow-[0px_0px_20px_#2f2f2f] md:p-6">
                        <p class="mb-6 text-sm font-semibold text-yami dark:text-slate-200 md:text-base">Abu Dawud Hadith
                            Number
                            1</p>
                        <p dir="rtl" lang="ar"
                            class="mb-3 text-right font-mono text-3xl leading-[65px] text-slate-800 dark:text-slate-200 md:!leading-[70px] lg:text-4xl lg:!leading-[80px]">
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useHadithStore } from '@/stores/hadithStore'

const store = useHadithStore()

onMounted(() => {
    store.getHadithData()
})

useHead({
    title: 'Islam App | Hadith'
})
</script>