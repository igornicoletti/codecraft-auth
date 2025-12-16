import type { FieldPath, FieldValues, UseFormReturn } from "react-hook-form";

import { AuthFormField } from "@/features/auth/components/AuthFormField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Spinner } from "@/components/ui/spinner";

export interface AuthFieldConfig<T extends FieldValues> {
  name: FieldPath<T>;
  label: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
}

interface AuthFormProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  onSubmit: (data: T) => void;
  fields: AuthFieldConfig<T>[];
  submitText?: string;
  isLoading?: boolean;
}

export const AuthForm = <T extends FieldValues>({
  form,
  onSubmit,
  fields,
  submitText = "Submit",
  isLoading = false,
}: AuthFormProps<T>) => {
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
        noValidate
      >
        {fields.map((field) => (
          <AuthFormField
            key={field.name}
            control={form.control}
            name={field.name}
            label={field.label}
            type={field.type}
            placeholder={field.placeholder}
            autoComplete={field.autoComplete}
            disabled={isLoading}
          />
        ))}

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? <Spinner /> : submitText}
        </Button>
      </form>
    </Form>
  );
};
