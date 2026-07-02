import { Card } from '$/common/components/card';
import { useEffect, useState } from 'react';
import { Button } from './button';

type CounterControlsProps = {
  setCount: React.Dispatch<React.SetStateAction<number>>;
};

type CounterFormProps = {
  onSubmit: React.FormEventHandler<HTMLFormElement>;
};

const CounterControls = ({ setCount }: CounterControlsProps) => {
  return (
    <div className="flex gap-2">
      <button onClick={() => setCount((prev) => prev - 1)}>➖ Decrement</button>
      <button onClick={() => setCount(0)}>🔁 Reset</button>
      <button onClick={() => setCount((prev) => prev + 1)}>➕ Increment</button>
    </div>
  );
};

const CounterForm = ({ onSubmit }: CounterFormProps) => {
  const [draftCount, setDraftCount] = useState(0);

  return (
    <form className="flex items-center gap-2" onSubmit={onSubmit}>
      <input
        className="ring-primary-600 focus:border-primary-800 rounded border border-slate-500 px-4 py-2 outline-none focus:ring-2"
        type="number"
        name="count"
        value={draftCount}
        onChange={(e) => setDraftCount(e.target.valueAsNumber)}
      />
      <Button>Update Counter</Button>
    </form>
  );
};

export const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <Card className="border-primary-500 flex w-2/3 flex-col items-center gap-8">
      <h1>Days Since the Last Accident</h1>
      <p className="text-6xl">{count}</p>
      <CounterControls setCount={setCount} />
      <CounterForm
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const count = Number(formData.get('count'));
          setCount(count);
        }}
      />
    </Card>
  );
};
