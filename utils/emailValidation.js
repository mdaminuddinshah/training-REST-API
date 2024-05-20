const emailValidation = () => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailValidity = regex.test(email);
    return emailValidity;
};

export default emailValidation;