import { defineStore } from "pinia";
import { ref } from "vue";

interface AuthType {
  token: string;
  expiresIn: number;
}

export const useAuthStore = defineStore(
  "auth",
  () => {
    const auth = ref<AuthType | null>(null);

    const clearAuth = () => {
      auth.value = null;
      localStorage.removeItem("auth");
    }
    return {
      //states
      auth,

      //methods
      clearAuth
    };
  },
  {
    persist: {
      storage: localStorage,
    },
  }
);
