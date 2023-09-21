import { User } from "./user";

export class UserFilterParams {
  gender: string;
  minAge = 18;
  maxAge = 99;
  pageNumber = 1;
  pageSize = 12;
  orderBy = 'lastActive'


  constructor(user: User){
    this.gender = user.gender === 'female' ? 'male' : 'female'
  }
}
