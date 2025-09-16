import { Input } from "antd"
import { Controller } from "react-hook-form"

export interface IEmailInputProps {
    control: any; // Replace 'any' with the actual type from react-hook-form if available
    name: string;
}

const FormInput = ({control, name}: Readonly<IEmailInputProps>) => {
  return (
    <div>
        <Controller
            name={name}
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
            <div>
                <Input
                type={name}
                id={name}
                className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder={`Enter your ${name}`}
                {...field}   // <-- use field here
                />
            </div>
            )}
        />
    </div>
  )
}

export default FormInput