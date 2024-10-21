import jwt from "jsonwebtoken";

export function generateJWTToken(user: any) {
  // Generate JWT token
  const { userId } = user;
  const userData = {
    userId,
  };

  const token = jwt.sign({ user: userData }, process.env.JWT_SECRET || "", {
    expiresIn: "2d",
  });

  return token;
}
