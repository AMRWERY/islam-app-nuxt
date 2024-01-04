<template>
    <div class="flex cursor-pointer items-center text-xs text-slate-800 md:text-sm" @click="openModal">
        <Icon name="bi:exclamation-circle-fill" class="mr-1 text-base text-slate-800 md:text-lg" />
        Details
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
                            class="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                            <DialogTitle
                                class="flex items-center justify-between text-lg font-medium leading-6 text-gray-900">
                                {{ store.surah?.namaLatin }} - {{ store.surah?.nama }}
                                <button type="button" class="rounded-md px-4 py-2 text-sm font-medium focus:outline-none"
                                    @click="closeModal">
                                    <Icon name="mdi:window-close" class="h-6 w-6" />
                                </button>
                            </DialogTitle>
                            <div class="mt-2">
                                <p class="text-sm text-gray-500">
                                    {{ sanitizedDeskripsi }}
                                </p>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>
  
<script setup>
import { useQuranStore } from '@/stores/quranStore'
import { useRoute } from "vue-router";
import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogTitle } from '@headlessui/vue'

const isOpen = ref(false);
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
})

const sanitizedDeskripsi = computed(() => {
    let deskripsi = store.surah?.deskripsi;
    return deskripsi ? deskripsi.replace(/<i>/g, '').replace(/<\/i>/g, '') : '';
});
</script>