export declare let routerPath: any;
export declare let pagePath: any;
export declare let apiPath: any;
export declare let tsDeclarationPath: any;
export declare function getConfigure(): import("@babel/parser").ParseResult<import("@babel/types").File>;
export declare function writeRouter(content: any): void;
export declare function createFile(createPaths: string[]): Promise<void>;
