import { Card } from '$/common/components/card';
import { useReducer, useState, type ActionDispatch } from 'react';
import { Button } from './button';
import { counterinitialState, counterReducer, type CounterAction } from './counter-reducer';

type DispatchCountAction = { dispatch: ActionDispatch<[action: CounterAction]> };

// interface CounterFormProps extends ComponentPropsWithoutRef<'form'> {
//   /** The direction of the form. */
//   layout?: 'horizontal' | 'vertical';
// }

const CounterControls = ({ dispatch }: DispatchCountAction) => {
  return (
    <div className="flex gap-2">
      <Button onClick={() => dispatch({ type: 'decrement' })}>➖ Decrement</Button>
      <Button onClick={() => dispatch({ type: 'set-count', payload: 0 })}>🔁 Reset</Button>
      <Button onClick={() => dispatch({ type: 'increment' })}>➕ Increment</Button>
    </div>
  );
};

/**
 * A special kind of form for counter operations.
 */
const CounterForm = ({ dispatch }: DispatchCountAction) => {
  const [draftCount, setDraftCount] = useState(0);

  return (
    <form
      className="flex items-center gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        dispatch({ type: 'set-count', payload: draftCount });
      }}
    >
      <input
        className="ring-primary-600 focus:border-primary-800 rounded border border-slate-500 px-4 py-2 outline-none focus:ring-2"
        type="number"
        name="count"
        value={draftCount}
        onChange={(e) => setDraftCount(e.target.valueAsNumber)}
      />
      <Button type="submit">Update Counter</Button>
    </form>
  );
};

export const Counter = () => {
  const [count, dispatch] = useReducer(counterReducer, counterinitialState);

  return (
    <Card className="border-primary-500 flex w-2/3 flex-col items-center gap-8">
      <h1>Days Since the Last Accident</h1>
      <p className="text-6xl">{count.count}</p>
      <CounterControls setCount={setCount} />
      <CounterForm
        layout="vertical"
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const count = Number(formData.get('count'));
          dispatch({ type: 'set-count', payload: count });
        }}
      />
    </Card>
  );
};
