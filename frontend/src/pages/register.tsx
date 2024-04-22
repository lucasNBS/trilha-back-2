import Head from "next/head";
import { Button } from "src/components/atoms/Button/button";
import { Input } from "src/components/atoms/Input/input";
import { UserForm } from "src/components/organisms/UserForm/userForm";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { useRouter } from "next/router";
import { baseAxios } from "src/lib/axios";

type RegisterFormType = {
  email: string
  name: string
  password: string
}

const RegisterFormSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email formar")
    .required("This field is required")
    .test("is-valid", (value) => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)),
  name: Yup.string()
    .trim()
    .required("This field is required")
    .max(25, "Name is too long"),
  password: Yup.string()
    .trim()
    .required("This field is required")
    .min(3, "Password is too short")
    .max(20, "Password is too long")
})

export default function Register() {
  const {
    register,
    formState: { errors },
    setError,
    handleSubmit
  } = useForm<RegisterFormType>({
    resolver: yupResolver(RegisterFormSchema)
  })
  const router = useRouter()

  async function submit(data: RegisterFormType) {

    const request = await baseAxios.post('/register/', JSON.stringify(data))
      .then(res => res.data)

    if (request.detail) {
      setError("email", { message: request.detail })
    } else {
      router.push("/login")
    }
  }

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>CRM - Register</title>
      </Head>
      <UserForm handleSubmit={handleSubmit(submit)} type="Register">
        <Input
          name="name"
          register={register}
          type="text"
          error={errors.name?.message}
          text="Username"
        />
        <Input
          name="email"
          register={register}
          type="email"
          error={errors.email?.message}
          text="E-mail"
        />
        <Input
          name="password"
          register={register}
          type="password"
          error={errors.password?.message}
          text="Password"
        />
        <Button isLink={false} onClick={() => {}} text="Register" />
      </UserForm>
    </>
  )
}
