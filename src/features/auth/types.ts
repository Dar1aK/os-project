export type AuthRequest = { email: string; password: string };

export type AuthResponse = {
  access: boolean;
  email: string;
  lastname: string;
};

export type AuthError = {
  access: boolean;
  error: string;
};
