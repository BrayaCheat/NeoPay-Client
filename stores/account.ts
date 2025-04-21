import { defineStore } from "pinia";
import { ref } from "vue";

interface AccountType {
    id: number
    accountName: string
    accountNumber: string
    currency: string
    balance: number
    accountType: string
    active: boolean
    createdAt: string
}

export const useAccountStore = defineStore(
  "account",
  () => {
    const accounts = ref<AccountType[] | null>(null);

    const clearAccount = () => {
      accounts.value = null;
      localStorage.removeItem("account");
    }
    return {
      // states
      accounts,
      // methods
      clearAccount
    };
  },
  {
    persist: {
      storage: localStorage,
    },
  }
);
