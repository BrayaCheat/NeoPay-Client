import axios from '../axiosInstance';

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
