export const counterinitialState = {
  count: 0,
};

type Action = {
  type: string;
  payload?: unknown;
};

interface IncrementAction extends Action {
  type: 'increment';
  payload?: never;
}

interface DecrementAction extends Action {
  type: 'decrement';
  payload?: never;
}

interface SetCountAction extends Action {
  type: 'set-count';
  payload: number;
}

export type CounterAction = IncrementAction | DecrementAction | SetCountAction;

export const counterReducer = (
  state = counterinitialState,
  action: CounterAction,
): { count: number } => {
  console.log({ action });
  const { count } = state;

  switch (action.type) {
    case 'increment':
      return { count: count + 1 };
    case 'decrement':
      return { count: count - 1 };
    case 'set-count':
      return { count: action.payload };
  }
};
