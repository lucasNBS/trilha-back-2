import Head from "next/head";
import { Button } from "src/components/atoms/Button/button";
import { Input } from "src/components/atoms/Input/input";
import { UserForm } from "src/components/organisms/UserForm/userForm";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { useRouter } from "next/router";
import { setCookie } from "nookies";
import { useContext } from "react";
import { AuthenticationContext } from "src/contexts/authenticationContext";

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
  const { setUser } = useContext(AuthenticationContext)

  async function submit(data: LoginFormType) {

    const request = await fetch('http://127.0.0.1:8000/login/',
      {
        method: 'POST',
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      }
    )
    .then(res => res.json())

    if (request.detail) {
      setError("password", { message: request.detail })
    } else {
      const accessToken = request['access_token']
      const refreshToken = request['refresh_token']

      setCookie(null, "access_token", accessToken, { maxAge: 60 * 60 * 1000 })
      setCookie(null, "refresh_token", refreshToken, { maxAge: 60 * 60 * 1000 })
      setUser(request['user'])

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
