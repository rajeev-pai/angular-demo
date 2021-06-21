export interface SignUpFormData {
  email: string;
  password: string;
  confirmPassword: string;
  username: string;
}

export interface LoginFormData {
  username: string;
  password: string;
}

export interface LoginResponse {
  id: number;
  email: string;
  username: string;
  token: string;
}

export interface AccountDetailsResponse {
  id: number;
  email: string;
  username: string;
}