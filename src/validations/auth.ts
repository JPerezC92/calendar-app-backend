import { check } from "express-validator";

export const name = check("name", "El nombre es obligatorio")
  .not()
  .isEmpty()
  .isLength({ min: 1 });

export const passwordValidation = check(
  "password",
  "La contraseña debe contener mayusculas, minusculas, numeros y un caracter especial"
)
  .not()
  .isEmpty()
  .isStrongPassword();

export const emailValidation = check(
  "email",
  "El correo es obligatorio"
).isEmail();

export const credentialsValidation = [emailValidation, passwordValidation];
