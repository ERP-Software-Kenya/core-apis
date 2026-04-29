export interface IPredicateFunc<T> {
  (elem: T): boolean;
}

export const combinePredicates = <T>(predicate1: IPredicateFunc<T>, predicate2: IPredicateFunc<T>): IPredicateFunc<T> => {
  return (x) => predicate1(x) && predicate2(x);
};

export const combineMultiplePredicates = <T>(predicates: IPredicateFunc<T>[]): IPredicateFunc<T> => {
  let pred = predicates[0];
  for (let index = 0; index < predicates.length; index++) {
    const predicate = predicates[index];
    pred = combinePredicates(pred, predicate);
  }
  return pred;
};
