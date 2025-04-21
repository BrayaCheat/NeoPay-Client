export const spacingAccountNumber = (accountNumber: string) => {
  return accountNumber.replace(/(\d{3})(?=\d)/g, '$1 ');
}

export const convertISODateToLocal = (date: string) => {
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
}

export const sliceText = (text: string, length: number) => {
  if (text.length > length) {
    return text.slice(0, length) + '...';
  }
  return text;
}

export const balanceColor = (balance: number) => {
  return balance < 0 ? 'bg-red-100 text-red-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300 w-fit' : 'bg-green-100 text-green-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300 w-fit';
}