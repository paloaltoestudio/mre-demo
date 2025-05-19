import type { ReactNode } from "react";
import { FormProvider, useForm, type FieldValues, type UseFormProps } from "react-hook-form";

type authProps<T extends FieldValues> = {
  children: ReactNode;
  onSubmit: (data: T) => void;
  defaultValues?: UseFormProps<T>["defaultValues"];
};

export const AuthForm = <T extends FieldValues>({ children, onSubmit, defaultValues }: authProps<T>) => {
  const methods = useForm<T>({ defaultValues });

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="w-full">{children}</form>
    </FormProvider>
  );
};
