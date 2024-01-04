<template>
    <div
        class="mb-10 mt-16 flex h-72 w-full flex-col items-center justify-center gap-y-8 p-4 bg-gray-700 dark:bg-slate-400/50 md:h-80">
        <img src="https://faridnugraha-islam.netlify.app/images/alquran.svg" class="h-auto w-24">
        <div class="relative w-full md:w-8/12 lg:w-6/12">
            <input type="text" name="search" id="search" autocomplete="search" placeholder="Search Surah"
                class="block w-full px-3 rounded-xl border-0 py-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />

            <Icon name="mi:search" class="absolute cursor-pointer right-3 top-[10px] h-6 w-6 text-gray-400 mt-1" />
        </div>
    </div>
</template>

<script setup>

</script>