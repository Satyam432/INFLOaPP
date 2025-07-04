// Email validation
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Phone validation
export const validatePhone = (phone) => {
  const phoneRegex = /^\+?[\d\s-()]+$/;
  return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
};

// Required field validation
export const validateRequired = (value, fieldName = 'Field') => {
  if (!value || !value.toString().trim()) {
    return `${fieldName} is required`;
  }
  return null;
};

// Minimum length validation
export const validateMinLength = (value, minLength, fieldName = 'Field') => {
  if (value && value.length < minLength) {
    return `${fieldName} must be at least ${minLength} characters`;
  }
  return null;
};

// Number validation
export const validateNumber = (value, fieldName = 'Field') => {
  if (value && isNaN(Number(value))) {
    return `${fieldName} must be a number`;
  }
  return null;
};

// URL validation
export const validateURL = (url) => {
  try {
    new URL(url);
    return null;
  } catch {
    return 'Please enter a valid URL';
  }
}; 