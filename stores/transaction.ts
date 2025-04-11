import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useUserStore } from "@/stores/user.js";

export interface TransactionType {
  id: number;
  reference: string;
  sender: string;
  receiver: string;
  amount: number;
  currency: string;
  remark: string;
  type: "TRANSFER" | "DEPOSIT" | "WITHDRAW" | "PAYMENT";
  status: "SUCCESS" | "PENDING" | "FAILED";
  createdAt: string;
  updatedAt: string;
}

export const useTransactionStore = defineStore(
  "transaction",
  () => {
    // const transactions = ref<TransactionType[] | null>(null);
    const receiverTransactions = ref<TransactionType[] | null>(null);
    const senderTransactions = ref<TransactionType[] | null>(null);

    const clearTransactions = () => {
      receiverTransactions.value = null;
      senderTransactions.value = null;
      localStorage.removeItem("transaction");
    }

    return {
      // states
      receiverTransactions,
      senderTransactions,

      //methods
      clearTransactions
    };
  },
  {
    persist: {
      storage: localStorage,
    },
  }
);
