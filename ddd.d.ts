import {
  ZodBoolean,
  ZodFunction,
  ZodObject,
  ZodRawShape,
  ZodString,
  ZodTuple,
  ZodUnknown,
  infer as zinfer,
} from 'zod';

export interface IDomainObject<T> {
  isEqual(comparable: T): boolean;
}

export type TEntityProps = { id: string };

export interface IEntity<T> extends IDomainObject<T>, TEntityProps {}

export const Entity: {
  fromKeys: <T extends TEntityProps>(
    keys: (keyof T)[],
  ) => new (args: T) => T & IEntity<T>;
  fromZodSchema: <T extends ZodRawShape & { id: ZodString }>(
    schema: ZodObject<T>,
  ) => new (argsObj: zinfer<typeof schema>) => zinfer<typeof schema> &
    IEntity<zinfer<typeof schema>>;
};

export interface IValueObject<T> extends IDomainObject<T> {}

export const ValueObject: {
  fromKeys: <T>(keys: (keyof T)[]) => new (args: T) => T & IValueObject<T>;
  fromZodSchema: <T extends ZodRawShape>(
    schema: ZodObject<T>,
  ) => new (argsObj: zinfer<typeof schema>) => zinfer<typeof schema> &
    IValueObject<zinfer<typeof schema>>;
};

type TDomainObjectZodRawShape = {
  isEqual: ZodFunction<ZodTuple<[], ZodUnknown>, ZodBoolean>;
};

type TDomainObjectZodSchema = ZodObject<TDomainObjectZodRawShape>;

export const DomainObjectZodSchema: TDomainObjectZodSchema;

export const EntityZodSchema: ZodObject<
  TDomainObjectZodRawShape & { id: ZodString }
>;

export const ValueObjectZodSchema: ZodObject<TDomainObjectZodRawShape & {}>;
