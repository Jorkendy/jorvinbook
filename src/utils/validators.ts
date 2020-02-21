export const validateName = (name: string) => {
  const regName = /[a-z]{1,10}/;
  return regName.test(name);
};

export const validateEmail = (email: string) => {
  // eslint-disable-next-line no-useless-escape
  const regEmail = /^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/;
  return regEmail.test(email);
};

export const isEmpty = (string: string) => !string.trim();
