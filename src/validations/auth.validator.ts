import { check } from "express-validator";

const firstname = check("firstname", "El nombre es obligatorio")
  .not()
  .isEmpty()
  .isLength({ min: 1 });

const lastname = check("lastname", "El nombre es obligatorio")
  .not()
  .isEmpty()
  .isLength({ min: 1 });

const passwordValidation = check(
  "password",
  "La contraseña debe contener minimo 8 caracteres, una minuscula, una mayuscula y un número"
)
  .not()
  .isEmpty()
  .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/);

const emailValidation = check("email", "El correo es obligatorio").isEmail();

export const registerValidation = [
  firstname,
  lastname,
  emailValidation,
  passwordValidation,
];
