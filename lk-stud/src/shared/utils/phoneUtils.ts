
export const formatPhoneNumber = (value:string) => {
    const numbers = value.replace(/\D/g, '');

    let cleanNumbers = numbers;
    if (numbers.startsWith('8')) {
        cleanNumbers = '7' + numbers.slice(1);
    }

    if (!cleanNumbers.startsWith('7') && cleanNumbers.length > 0) {
        cleanNumbers = '7' + cleanNumbers;
    }

    cleanNumbers = cleanNumbers.slice(0, 11);

    if (cleanNumbers.length === 0) return '';
    if (cleanNumbers.length <= 1) return '+7';
    if (cleanNumbers.length <= 4) return `+7 (${cleanNumbers.slice(1)}`;
    if (cleanNumbers.length <= 7) return `+7 (${cleanNumbers.slice(1, 4)}) ${cleanNumbers.slice(4)}`;
    if (cleanNumbers.length <= 9) return `+7 (${cleanNumbers.slice(1, 4)}) ${cleanNumbers.slice(4, 7)}-${cleanNumbers.slice(7)}`;

    return `+7 (${cleanNumbers.slice(1, 4)}) ${cleanNumbers.slice(4, 7)}-${cleanNumbers.slice(7, 9)}-${cleanNumbers.slice(9, 11)}`;
};

export const getCleanPhoneNumber = (formattedPhone: string) => {
    return formattedPhone.replace(/\D/g, '');
};