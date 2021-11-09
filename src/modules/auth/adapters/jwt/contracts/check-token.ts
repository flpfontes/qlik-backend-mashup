export interface CheckToken {
  check: (params: CheckToken.Params) => CheckToken.Result;
}

export namespace CheckToken {
  export type Params = {
    token: string;
  };

  export type Result = {
    id: string;
    isAdmin:boolean };
}
