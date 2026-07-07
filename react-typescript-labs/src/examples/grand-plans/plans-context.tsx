import React, { createContext, useState, type PropsWithChildren } from 'react';
import * as Api from './api';
import type { Plan } from './types';
import type { Todo } from '$/common/api';

type PlansContextType = {
  plans: Plan[];
  createPlan: (title: string) => Promise<void>;
  updatePlan: (id: number, updatedPlan: Partial<Omit<Plan, 'id'>>) => Promise<void>;
  removePlan: (id: number) => Promise<void>;
};

// This is the practical way
const PlansContext = createContext<PlansContextType | null>(null as unknown as PlansContextType);

// // This is the Right way
// const createBetterContext = <T,>() => {
//   const Context = createContext<T | null>(null);

//   const useContext = () => {
//     const ctx = React.useContext(Context);

//     if (ctx === null) {
//       throw new Error('Context was not properly set!');
//     }

//     return ctx;
//   };

//   return [useContext, Context.Provider] as const;
// };

export const PlansProvider = ({ children }: PropsWithChildren) => {
  const [plans, setPlans] = useState<Plan[]>([]);

  const createPlan = async (title: string) => {
    const plan = await Api.createPlan(title);
    setPlans((prevPlans) => [...prevPlans, plan]);
  };

  const updatePlan = async (id: number, updatedPlan: Omit<Partial<Todo>, 'id' | 'userId'>) => {
    const plan = await Api.updatePlan(id, updatedPlan);
    setPlans((prevPlans) => prevPlans.map((p) => (p.id === plan.id ? plan : p)));
  };

  const removePlan = async (id: number) => {
    const deleted = await Api.deletePlan(id);
    if (!deleted) return;
    setPlans((prevPlans) => prevPlans.filter((p) => p.id !== id));
  };

  return (
    <PlansContext.Provider value={{ plans, createPlan, updatePlan, removePlan }}>
      {children}
    </PlansContext.Provider>
  );
};
