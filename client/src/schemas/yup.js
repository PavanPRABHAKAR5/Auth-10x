import * as Yup from "yup";

export const userSchema=Yup.object({
    email:Yup.string().email().required("*Enter Email"),
    password:Yup.string().required("*Enter Password"),
    cpass:Yup.string().required("*field is empty").oneOf([Yup.ref('password'),null],"*Password must match")
})