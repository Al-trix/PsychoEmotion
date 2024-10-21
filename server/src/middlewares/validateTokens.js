import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

export const authRequiredAdmin = (req, res, next) => {
  const { tokenAdmin } = req.cookies;

  if (!tokenAdmin) {
    // Asegúrate de retornar para detener el flujo
    return res
      .status(401)
      .json({ message: "No se encontró el token, no autorizado" });
  }

  jwt.verify(tokenAdmin, TOKEN_SECRET, (err, user) => {
    if (err) {
      // Asegúrate de retornar para detener el flujo
      return res.status(403).json({ message: "Token inválido" });
    }

    // Si llegamos aquí, el token es válido
    req.userAdmin = user;

    // Llamamos a next() solo si no hemos enviado una respuesta
    next();
  });
};
export const authRequired = (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    // Asegúrate de retornar para detener el flujo
    return res
      .status(401)
      .json({ message: "No se encontró el token, no autorizado" });
  }

  jwt.verify(token, TOKEN_SECRET, (err, user) => {
    if (err) {
      // Asegúrate de retornar para detener el flujo
      return res.status(403).json({ message: "Token inválido" });
    }
    // Si llegamos aquí, el token es válido
    req.user = user;

    // Llamamos a next() solo si no hemos enviado una respuesta
    next();
  });
};
