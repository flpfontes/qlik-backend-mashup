export interface CreateToken {
  create: (params: CreateToken.Params) => CreateToken.Result;
}

export namespace CreateToken {
  export type Params = {
    id: string;
    isAdmin: boolean;
  };

  export type Result = {
    token: string;
  };
}
