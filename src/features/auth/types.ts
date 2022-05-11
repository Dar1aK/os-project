export type AuthRequest = { email: string; password: string };

export type AuthResponse = {
  access: boolean;
  email: string;
  lastname: string;
};
