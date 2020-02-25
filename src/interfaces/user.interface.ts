export interface User {
    firstName?: string;
    lastName?: string;
    email?: string;
    updatedAt?: string;
    company?: string;
    birthday?: string;
    gender?: "Male" | "Female" | "Other";
    summary?: string;
    avatarUrl?: string;
  }