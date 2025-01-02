export const validatePassword = (value) => {
  // Vérification des critères de complexité du mot de passe
  const regexUpperCase = /[A-Z]/;
  const regexLowerCase = /[a-z]/;
  const regexNumber = /[0-9]/;
  const regexSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;

  if (value.length < 8 || !regexUpperCase.test(value) || !regexLowerCase.test(value) || !regexNumber.test(value) || !regexSpecialChar.test(value)) {
    return "Le mot de passe doit contenir au moins 8 caractères dont une majuscule, une minuscule, un chiffre et un caractère spécial.";
  }

  return "";
};

export const validateConfirmPassword = (name, value) => {
  const password = name === "password" ? value : document.querySelector(`input[name="password"]`).value;
  const confirmPassword = name === "confirmPassword" ? value : document.querySelector(`input[name="confirmPassword"]`).value;
  return password !== confirmPassword ? "Les mots de passe ne correspondent pas." : "";
};
