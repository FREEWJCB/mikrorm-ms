import { FilterQuery } from '@mikro-orm/core';

export const filterKeysOfInstance = <T extends Record<string, unknown>>(
  instance: T,
  keys: Array<keyof T> = [],
): Array<keyof T> => {
  return keys
    .filter((key) => Object.keys(instance).includes(<string>key))
    .filter((key) => instance[key] !== undefined);
};

export const castToQueryFilter = <Entity, T extends Record<string, unknown>>(
  instance: T,
  keys: Array<keyof T> = [],
  callback: (key: keyof T, query: FilterQuery<Entity>) => void,
): FilterQuery<Entity> => {
  const query: FilterQuery<Entity> = {};
  filterKeysOfInstance<T>(instance, keys).forEach((key) => {
    callback(key, query);
  });
  return query;
};

export const isKeyOfModel = <T extends object>(
  model: T,
  key: string | number | symbol,
): key is keyof T => {
  return key in model;
};