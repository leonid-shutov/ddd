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

export type TMetaEntity = { id?: string };

export interface IEntity<T> extends IDomainObject<T>, TMetaEntity {}

export type TEntityFactoryOptions = { generateId: boolean };

export const Entity: {
  fromKeys: <TMetaModel>(
    keys: (keyof TMetaModel)[],
    options?: TEntityFactoryOptions,
  ) => new (args: TMetaModel & TMetaEntity) => TMetaModel & IEntity<TMetaModel>;
  fromZodSchema: <TMetaSchema extends ZodRawShape>(
    schema: ZodObject<TMetaSchema>,
    options?: TEntityFactoryOptions,
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

type TDomainObjectZodRawShape<TSchema extends ZodObject<ZodRawShape>> = {
  isEqual: ZodFunction<ZodTuple<[TSchema], ZodUnknown>, ZodBoolean>;
};

type TDomainObjectZodSchema<TSchema extends ZodObject<ZodRawShape>> = ZodObject<
  TDomainObjectZodRawShape<TSchema>
>;

export const DomainObjectZodSchema: {
  fromModelSchema: <TShape extends ZodRawShape>(
    modelSchema: ZodObject<TShape>,
  ) => TDomainObjectZodSchema<ZodObject<TShape>>;
};

export const EntityZodSchema: {
  fromModelSchema: <TShape extends ZodRawShape>(
    modelSchema: ZodObject<TShape>,
  ) => ZodObject<
    TDomainObjectZodRawShape<ZodObject<TShape>> & { id: ZodString }
  >;
};

export const ValueObjectZodSchema: {
  fromModelSchema: <TShape extends ZodRawShape>(
    modelSchema: ZodObject<TShape>,
  ) => ZodObject<TDomainObjectZodRawShape<ZodObject<TShape>> & {}>;
};
