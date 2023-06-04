import bcrypt from "bcrypt";

export async function hashPassword(password: string) {
  return await bcrypt.hash(password, 10);
}

export async function comparePassword(
  inputPassword: string,
  userPassword: string
) {
  return bcrypt.compare(inputPassword, userPassword);
}
