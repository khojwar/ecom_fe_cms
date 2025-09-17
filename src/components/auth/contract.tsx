  import * as yup from 'yup';
// import type { Gender, UserRoles } from '../../config/constants';
  
//   interface and credentialsDTO to be used in LoginForm.tsx
  export interface ICredentials {
    email: string;
    password: string;
  }

  export const credentialsDTO = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
  })


//   // interface and schema to be used in RegisterForm.tsx
//     export interface IRegisterFormInput {
//       name: string;
//       email: string;
//       password: string;
//       confirmPassword: string;
//       role: UserRoles | string;
//       gender: Gender | string;
//       phone: string;
//       address: {
//         billingAddress: string;
//         shippingAddress: string;
//       };
//       dob: Date | null;
//       image: null;
//     }

//     export const registerDTO = yup.object().shape({
//       name: yup.string().required("Name is required"),
//       email: yup.string().email("Invalid email").required("Email is required"),
//         password: yup.string().min(6, "Password must be at least 6 characters").required(),
//         confirmPassword: yup
//           .string()
//           .nullable()
//           .oneOf([yup.ref("password"), null], "Passwords must match")
//           .required("Confirm password is required"),
//         role: yup.string().required("Role is required"),
//         gender: yup.string().required("Gender is required"),
//         phone: yup.string().matches(/^\d{10}$/, "Phone must be 10 digits").required(),
//         address: yup.object({
//           billingAddress: yup.string().required("Billing address required"),
//           shippingAddress: yup.string().required("Shipping address required"),
//         }),
//         dob: yup.date().required("Date of birth is required"),
//         image: yup.mixed().required("Image is required"),
//       });
