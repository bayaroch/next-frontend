import React, { createContext, useContext } from 'react'
import {
  Control,
  UseFormHandleSubmit,
  FieldValues,
  UseFormSetValue,
  UseFieldArrayAppend,
  FieldErrors,
  UseFormReset,
  FormState,
} from 'react-hook-form'
import { ResponseField } from '@components/Automation/ResponseItem'

interface FormContextType<T extends FieldValues = FieldValues> {
  control: Control<T>
  handleSubmit: UseFormHandleSubmit<T>
  errors: FieldErrors<T>
  fields: ResponseField[]
  reset: UseFormReset<T>
  append: UseFieldArrayAppend<T, any>
  setValue: UseFormSetValue<T>
  formState: FormState<T>
}

const FormContext = createContext<FormContextType<any> | undefined>(undefined)

export const FormProvider = <T extends FieldValues>({
  children,
  value,
}: {
  children: React.ReactNode
  value: FormContextType<T>
}) => (
  <FormContext.Provider value={value as FormContextType<any>}>
    {children}
  </FormContext.Provider>
)

export const useFormContext = <T extends FieldValues>(): FormContextType<T> => {
  const context = useContext(FormContext)
  if (context === undefined) {
    throw new Error('useFormContext must be used within a FormProvider')
  }
  return context as FormContextType<T>
}
