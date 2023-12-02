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
  fromKeys: <TMetaModel extends TEntityProps>(
    keys: (keyof TMetaModel)[],
  ) => new <TDomainModel extends TMetaModel>(
    args: TDomainModel,
  ) => TDomainModel & IEntity<TDomainModel>;
  fromZodSchema: <TMetaSchema extends ZodRawShape & { id: ZodString }>(
    schema: ZodObject<TMetaSchema>,
  ) => new <TDomainModel extends zinfer<typeof schema>>(
    argsObj: TDomainModel,
  ) => TDomainModel & IEntity<TDomainModel>;
};

export interface IValueObject<T> extends IDomainObject<T> {}

export const ValueObject: {
  fromKeys: <TMetaModel>(
    keys: (keyof TMetaModel)[],
  ) => new <TDomainModel extends TMetaModel>(
    args: TDomainModel,
  ) => TDomainModel & IValueObject<TDomainModel>;
  fromZodSchema: <TMetaSchema extends ZodRawShape>(
    schema: ZodObject<TMetaSchema>,
  ) => new <TDomainModel extends zinfer<typeof schema>>(
    argsObj: TDomainModel,
  ) => TDomainModel & IValueObject<TDomainModel>;
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
