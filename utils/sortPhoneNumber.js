function calculateAge(birthDate) {
    if (!birthDate) return '不明';
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--;
    }
    return age;
}

const sortPhoneNumber = function formatPhoneNumber(phoneNumber) {
    if (!phoneNumber) return '';
    const cleaned = phoneNumber.replace(/\D/g, '');

    if (cleaned.length === 11 && /^(090|080|070)/.test(cleaned)) {
        return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 7)}-${cleaned.slice(7)}`;
    }
    else if (cleaned.length === 10) {
        if (/^(03|04|06)/.test(cleaned)) {
            return `${cleaned.slice(0, 2)}-${cleaned.slice(2, 6)}-${cleaned.slice(6)}`;
        }
        else if (/^(01[1-9]|02[2-9]|04[2-9]|05[2-9]|07[2-9]|08[2-9]|09[2-9])/.test(cleaned)) {
            return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
        }
        else {
            return `${cleaned.slice(0, 4)}-${cleaned.slice(4, 6)}-${cleaned.slice(6)}`;
        }
    }
    return phoneNumber;
}

module.exports = {
    calculateAge,
    sortPhoneNumber
};