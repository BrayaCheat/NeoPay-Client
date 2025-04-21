import { defineStore } from "pinia";
import { ref } from "vue";

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
    const transactions = ref<TransactionType[] | null>(null);
    const receiverTransactions = ref<any[] | null>(null);
    const senderTransactions = ref<any[] | null>(null);

    const clearTransactions = () => {
      receiverTransactions.value = null;
      senderTransactions.value = null;
      transactions.value = null
      localStorage.removeItem("transaction");
    }

    return {
      // states
      receiverTransactions,
      senderTransactions,
      transactions,

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
