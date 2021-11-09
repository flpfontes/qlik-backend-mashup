
export interface GetObjects {
  execute:(params:GetObjects.Params) => Promise<GetObjects.Result[]>;
}

export namespace GetObjects {
  export type Params ={
    sheetURL:string
    resourceId:string
  }

  export type Result = {
    id: string;
    name:string;
    type: string;
    objectURL: string;
    imageURL: string;
  };
}
