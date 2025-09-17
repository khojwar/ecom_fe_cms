import { Input, Select } from "antd"
import { Controller, useController } from "react-hook-form"

export interface IEmailInputProps {
    control: any; // Replace 'any' with the actual type from react-hook-form if available
    name: string;
}

export interface ISelectsOptionsProps {
  control: any;
  name: string;
  errMsg?: string;
  options: Array<ISingleSelectOption>;
}

export interface ISingleSelectOption {
  label: "";
  value: "";
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


// For future reusable input components

// export const emailInput = () => {}

// export const passwordInput = () => {}

// export const SelectsOptionsFields = ({ control, name, errMsg='', options }: ISelectsOptionsProps) => {
//   const {field} = useController({
//     name: name,
//     control: control
//   })

//   const onSearch = (value: string) => {
//     console.log('search:', value);
//   };

//   return (
//     <div>
//       <Select
//         {...field}
//         showSearch
//         placeholder="Select any one"
//         optionFilterProp="label"
//         onSearch={onSearch}
//         options={options}
//       />
      
//       {errMsg && <div className="text-red-500 text-sm ml-4 italic">{errMsg}</div>}
//     </div>
//   );
// }

