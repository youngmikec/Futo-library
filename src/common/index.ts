export * from "./book";
export * from './book-category';
export * from './book-request';
export * from "./enums";
export * from "./mail";
export * from "./user";

export type Step = {
  title: string;
  isActive: boolean;
};

export type ApiResponse = {
  success: boolean;
  message: string;
  payload: any;
};

export type Review = {
  fullName: string;
  stars: number;
  review: string;
};
