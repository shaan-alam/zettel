import { Input, type InputProps } from "@/components/ui/input";
import type { FormikProps } from "formik";
import clsx from "clsx";

interface FormInputProps<T> extends InputProps {
  formik: FormikProps<T>;
  name: string;
}

const FormInput = <T,>({
  formik,
  name,
  className,
  placeholder,
  type,
  ...props
}: FormInputProps<T>) => {
  return (
    <div>
      {(formik.touched as any)[name] && (formik.errors as any)[name] && (
        <div className="text-red-600 block my-2 text-sm">
          {(formik.errors as any)[name]}
        </div>
      )}
      <Input
        type={type}
        className={clsx(
          "border text-[#333] dark:text-white px-4 py-2 rounded-sm focus:ring-2 outline-none text-sm w-full",
          className
        )}
        placeholder={placeholder}
        {...formik.getFieldProps(name)}
        {...props}
      />
    </div>
  );
};


export default FormInput;