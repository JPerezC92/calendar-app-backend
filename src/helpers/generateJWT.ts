import jwt from "jsonwebtoken";

export const generateJWT = (
  uid: string,
  firstname: string,
  lastname: string
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const payload = { uid, firstname, lastname };
    jwt.sign(
      payload,
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("No se pudo generar el token");
        }

        if (token) resolve(token);
      }
    );
  });
};
