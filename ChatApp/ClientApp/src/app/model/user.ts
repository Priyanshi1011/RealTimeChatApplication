export interface IUser {

  Id: number;
  userName: string;
 
}


export class User implements IUser {
  constructor(
  ) {
    
  }

 public  Id: number;
  public userName: string;
  public Password: string;
  public connId: string;
  public Connected: boolean;
  public count: number=0;
}
