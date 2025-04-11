import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth.js";

export interface Account {
  id: number;
  accountName: string;
  accountNumber: string;
  currency: string;
  balance: number;
  accountType: 'SAVING' | 'CURRENT' | string;
  createdAt: string;
  active: boolean;
}

export interface UserProfile {
  id: number;
  fullName: string;
  username: string;
  email: string;
  lastLogin: string;
  accounts: Account[];
}


export const useUserStore = defineStore(
  "user",
  () => {
    const user = ref<UserProfile | null>(null);
    const balance = ref<number>(0)

    const filteredAccount = (id: number) => user.value?.accounts.find((account) => account.id == id)
    const clearUser = () => {
      user.value = null;
      balance.value = 0;
      localStorage.removeItem("user");
    }

    return {
      //states
      user,
      balance,

      //methods
      filteredAccount,
      clearUser
    };
  },
  {
    persist: {
      storage: localStorage,
    },
  }
);
