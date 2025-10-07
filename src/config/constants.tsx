// export enum UserRoles {
//   ADMIN = "admin",
//   SELLER = "seller",
//   CUSTOMER = "customer",
// }

// export enum Gender {
//   MALE = "male",
//   FEMALE = "female",
//   OTHER = "other",
// }



export const paginationDefault = {
  page: 1,
  limit: 10,
  total: 0,
};

export interface IPaginationType {
    current: number;   
    pageSize: number;
    total: number;
}

export interface IPaginationWithSearchType {
    page?: number;   
    limit?: number;
    search?: string | null;
}