export interface CheckToken {
  check: (params: CheckToken.Params) => string;
}

export namespace CheckToken {
  export type Params = {
    token: string;
  };
}
