import Head from "next/head";
import { Button } from "src/components/atoms/Button/button";
import { Input } from "src/components/atoms/Input/input";
import { UserForm } from "src/components/organisms/UserForm/userForm";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { useRouter } from "next/router";

type LoginFormType = {
  email: string
  password: string
}

const LoginFormSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("This field is required")
    .test("is-valid", (value) => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)),
  password: Yup.string()
    .trim()
    .required("This field is required")
    .min(3, "Password is too short")
    .max(20, "Password is too long")
})

export default function Login() {
  const {
    register,
    formState: { errors },
    setError,
    handleSubmit
  } = useForm<LoginFormType>({
    resolver: yupResolver(LoginFormSchema)
  })
  const router = useRouter()

  async function submit(data: LoginFormType) {

    const request = await fetch('http://127.0.0.1:8000/login/',
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      }
    )
    .then(res => res.json())

    console.log(request)

    if (request.detail) {
      setError("password", { message: request.detail })
    } else {
      router.push("/")
    }
  }

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>CRM - Login</title>
      </Head>
      <UserForm handleSubmit={handleSubmit(submit)} type="Login">
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
        <Button isLink={false} onClick={() => {}} text="Login" />
      </UserForm>
    </>
  )
}
