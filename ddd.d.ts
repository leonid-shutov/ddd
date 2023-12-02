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

export type TMetaEntity = { id: string };

export interface IEntity<T> extends IDomainObject<T>, TMetaEntity {}

export const Entity: {
  fromKeys: <TMetaModel>(
    keys: (keyof TMetaModel)[],
  ) => new (args: TMetaModel & TMetaEntity) => TMetaModel & IEntity<TMetaModel>;
  fromZodSchema: <TMetaSchema extends ZodRawShape>(
    schema: ZodObject<TMetaSchema>,
  ) => new (argsObj: zinfer<typeof schema> & TMetaEntity) => zinfer<
    typeof schema
  > &
    IEntity<zinfer<typeof schema>>;
};

export interface IValueObject<T> extends IDomainObject<T> {}

export const ValueObject: {
  fromKeys: <TMetaModel>(
    keys: (keyof TMetaModel)[],
  ) => new (args: TMetaModel) => TMetaModel & IValueObject<TMetaModel>;
  fromZodSchema: <TMetaSchema extends ZodRawShape>(
    schema: ZodObject<TMetaSchema>,
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
