export interface IRegister {
  firstname:string,
  lsatname:string,
  email:string,
  password:string,
}

export interface IUser {
  _id:string
  firstname:string,
  lastname:string,
  email:string,
  password:string,
  image:string,
  role:string,
  createdAt:Date,
}

export interface IUSERS {
  user : IUser[],
  usertotal:number
}

export interface IChanepass {
  old_pass:string,
  new_pass:string
}

export interface ISearch {
  key:string,
  value:string
}

export interface SearchUser {
  searchType?:string,
  searchText?:string

  startPage:number,
  limitPage:number
}

export interface IRole {
  admin:'admin',
  instructor:'instructor',
  student:'student'
}




