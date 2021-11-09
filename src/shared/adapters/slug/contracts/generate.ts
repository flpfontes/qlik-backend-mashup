export interface SlugGenerate {
  generate: (plaintext: SlugGenerate.Params) => SlugGenerate.Result;
}

export namespace SlugGenerate {
  export type Params = string
  export type Result = string;
}
