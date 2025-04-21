import axios from '../axiosInstance';

export const transactionCount = async (accountId: number) => {
  return (await axios.get(`/api/v1/transactions/${accountId}/transaction-count`)).data;
}

export const getTransaction = async (accountId: number) => {
  return (await axios.get(`/api/v1/transactions/${accountId}`)).data;
}

export const getReceiverTransaction = async (
  accountId: string,
  page: number,
  size = 10,
  senderAccountNumber?: string,
  receiverAccountNumber?: string
) => {
  const params: Record<string, any> = {
    page: page,
    size,
    sort: 'createdAt',
    direction: 'desc',
  };

  if (senderAccountNumber) params.senderAccountNumber = senderAccountNumber;
  if (receiverAccountNumber) params.receiverAccountNumber = receiverAccountNumber;

  return (await axios.get(`/api/v1/transactions/${accountId}/receiver`, { params })).data;
};

export const getSenderTransaction = async (
  accountId: string,
  page = 1,
  size = 10,
  senderAccountNumber?: string,
  receiverAccountNumber?: string
) => {
  const params: Record<string, any> = {
    page,
    size,
    sort: 'createdAt',
    direction: 'desc',
  };

  if (senderAccountNumber) params.senderAccountNumber = senderAccountNumber;
  if (receiverAccountNumber) params.receiverAccountNumber = receiverAccountNumber;

  return (await axios.get(`/api/v1/transactions/${accountId}/sender`, { params })).data;
};

