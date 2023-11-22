import { ZodObject, ZodRawShape, ZodString, infer as zinfer } from "zod";

export interface IDomainObject<T> {
  isEqual(comparable: T): boolean;
}

export type TEntityProps = { id: string };

export interface IEntity<T> extends IDomainObject<T>, TEntityProps {}

export const Entity: {
  fromKeys: <
    IDefault = never,
    T extends TEntityProps & IDefault = TEntityProps & IDefault
  >(
    keys: (keyof T)[]
  ) => new (args: T) => T & IEntity<T>;
  fromZodSchema: <T extends ZodRawShape & { id: ZodString }>(
    schema: ZodObject<T>
  ) => new (argsObj: zinfer<typeof schema>) => zinfer<typeof schema> &
    IEntity<zinfer<typeof schema>>;
};
