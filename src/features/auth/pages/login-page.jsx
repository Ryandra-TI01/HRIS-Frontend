// @ts-ignore
import { LoginForm } from "../components/login-form";
import { Link } from "react-router";
import Logo from "@/components/Logo";

export default function LoginPage() {
  return (
    <div className=" flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link to="/" className="flex items-center gap-2 self-center font-medium">
          <Logo size={180} />
        </Link>
        <LoginForm />
      </div>
    </div>
  )
}
