import * as Yup from "yup";

export const loginSchema=Yup.object({
    email:Yup.string().email().required("*Enter Email"),
    password:Yup.string().required("*Enter Password")
})