import { BookRequest } from "./book-request";
import { UserType } from "./enums";
    
export type User = {
    id: string;
    _id: string;
    regNumber: string;
    employeeId: string;
    userType: UserType;
    code: string;
    resetCode: string;
    canResetPassword: boolean;
    balance: number;
    transactionPin: string;
    firstName: string;
    lastName: string;
    dob: Date;
    photo: string;
    gender: 'MALE' | 'FEMALE';
    address: string;
    password: string;
    email: string;
    phoneNumber: string;
    age: boolean;
    isAdmin: boolean;
    points: number;
    activeTransactions: Array<BookRequest>;
    prevTransactions: Array<BookRequest>;
    
    isProfileComplete: boolean;
    isVerified: boolean;
    approvedBy: string;
    approvedDate: Date;
    verifiedBy: string;
    verifiedDate: Date;
    disengagedBy: string;
    disengagedDate: Date;
    accessLevel: number;
    emailNotification: boolean;
    smsNotification: boolean;
    notifications: any[];
      
    createdBy: User;
    updatedBy: User;
    deleted: number;
    deletedAt: Date;
    deletedBy: User;
}