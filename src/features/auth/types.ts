export type AuthRequest = { login: string; password: string };

export type AuthResponse = {
  access: boolean;
  login: string;
  lastname: string;
};
