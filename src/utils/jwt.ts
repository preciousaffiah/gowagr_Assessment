import jwt from "jsonwebtoken";

export function generateJWTToken(userId: string) {
  // Generate JWT token
  const userData = {
    userId,
  };

  const token = jwt.sign({ user: userData }, process.env.JWT_SECRET || "", {
    expiresIn: "2d",
  });

  return token;
}
