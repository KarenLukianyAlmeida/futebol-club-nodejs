export type NewEntity<T> = Omit<T, 'id' | 'inProgress' >;
