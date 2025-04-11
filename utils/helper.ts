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