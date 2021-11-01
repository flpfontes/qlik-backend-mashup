export interface CreateToken {
  create: (params: CreateToken.Params) => CreateToken.Result;
}

export namespace CreateToken {
  export type Params = {
    id: string;
    email: string;
  };

  export type Result = {
    token: string;
  };
}
