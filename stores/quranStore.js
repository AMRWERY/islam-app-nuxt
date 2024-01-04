import { defineStore } from "pinia";

export const useQuranStore = defineStore("quran", {
  state: () => ({
    quran: [],
    surah: null,
    tafsir: [],
  }),

  actions: {
    async getQuranData() {
      const quran = await $fetch("https://equran.id/api/v2/surat");
      // console.log(quran);
      this.quran = quran.data;
    },

    async getSurahDetails(id) {
      const { data: surah } = await $fetch(
        `https://equran.id/api/v2/surat/${id}`
      );
      // console.log(surah);
      const audioFull = surah.audioFull;
      // debugger;
      // const audioAyat = surah.ayat.map((ayat) => ayat.audio);
      const audioAyat = surah.ayat.map((ayat) => ayat.audio);
      console.log("audio per aya", audioAyat);
      // console.log(audioFull);
      this.surah = surah;
    },

    async getSurahTafsir(id) {
      const tafsirData = await $fetch(`https://equran.id/api/v2/tafsir/${id}`);
      // console.log("tafsir data", tafsirData.data);
      this.tafsir = tafsirData.data.tafsir;
    },
  },
});
