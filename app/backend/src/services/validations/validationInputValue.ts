import schema from './schema';

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return false;
  }
  return true;
}

function validatePassword(password: string): boolean {
  const { error } = schema.password.validate(password);
  if (error) {
    return false;
  }
  return true;
}

export {
  validateEmail,
  validatePassword,
};
