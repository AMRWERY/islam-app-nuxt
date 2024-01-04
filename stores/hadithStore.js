import { defineStore } from "pinia";

export const useHadithStore = defineStore("hadith", {
  state: () => ({
    hadith: [],
  }),

  actions: {
    async getHadithData() {
      // debugger;
      const hadith = await $fetch("https://hadis-api-id.vercel.app/hadith");
      console.log(hadith);
      this.hadith = hadith;
    },
  },
});
