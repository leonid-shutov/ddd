import {
  ZodBoolean,
  ZodFunction,
  ZodObject,
  ZodRawShape,
  ZodString,
  ZodTuple,
  ZodTypeAny,
  ZodUnknown,
  infer as zinfer,
} from "zod";

export interface IDomainObject<T> {
  isEqual(comparable: T): boolean;
}

export type TEntityProps = { id: string };

export interface IEntity<T> extends IDomainObject<T>, TEntityProps {}

export const Entity: {
  fromKeys: <T extends TEntityProps>(keys: (keyof T)[]) => new (args: T) => T & IEntity<T>;
  fromZodSchema: <T extends ZodRawShape & { id: ZodString }>(
    schema: ZodObject<T>
  ) => new (argsObj: zinfer<typeof schema>) => zinfer<typeof schema> & IEntity<zinfer<typeof schema>>;
};

export interface IValueObject<T> extends IDomainObject<T> {}

export const ValueObject: {
  fromKeys: <T>(keys: (keyof T)[]) => new (args: T) => T & IValueObject<T>;
  fromZodSchema: <T extends ZodRawShape>(
    schema: ZodObject<T>
  ) => new (argsObj: zinfer<typeof schema>) => zinfer<typeof schema> & IValueObject<zinfer<typeof schema>>;
};

type TDomainObjectZodSchema = ZodObject<
  {
    isEqual: ZodFunction<ZodTuple<[], ZodUnknown>, ZodBoolean>;
  },
  "strip",
  ZodTypeAny,
  {
    isEqual: (...args: unknown[]) => boolean;
  },
  {
    isEqual: (...args: unknown[]) => boolean;
  }
>;

export const DomainObjectZodSchema: TDomainObjectZodSchema;

export const EntityZodSchema: {} & TDomainObjectZodSchema;

export const ValueObjectZodSchema: {} & TDomainObjectZodSchema;
