export interface User {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
}

export interface Blog {
  id: number;
  title: string;
  description: string;
  author: string;
  createdAt: string; 
  image?: string;
}

export type SignUpErrors = Partial<{
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}>;


