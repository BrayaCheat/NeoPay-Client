import axios from '../axiosInstance';

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
