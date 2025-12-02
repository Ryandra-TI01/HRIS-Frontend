import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { toast } from "sonner";

import { useAuth } from "../../../context/AuthContext";
import { Link } from "react-router";
import handleApiError from "../../../utils/handleApiError";
import { AlertCircleIcon, Eye, EyeOff } from "lucide-react";

export function LoginForm({ className, ...props }) {
  // context for login
  const { login, authLoading } = useAuth();

  // state for error message
  const [errorMessage, setErrorMessage] = useState("");

  // form data state
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  // handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    try {
      await login(formData);
      toast.success("Sucessfully logged in", {
        description: "You have been logged in successfully.",
      });
    } catch (err) {
      setErrorMessage(handleApiError(err));
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>
            Login with your account credentials below
          </CardDescription>
        </CardHeader>

        <CardContent>
          {/* ERROR ALERT */}
          {errorMessage && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircleIcon />
              <AlertTitle>Please check the form and try again.</AlertTitle>
              <AlertDescription>
                <ul className="list-inside list-disc text-sm">
                  {errorMessage.split(", ").map((msg, index) => (
                    <li key={index}>{msg}</li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <FieldGroup>
              {/* EMAIL */}
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@hris.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </Field>

              {/* PASSWORD */}
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Link
                    to="#"
                    className="ml-auto text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </div>

                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    className="pr-10"
                  />

                  {/* Toggle Button */}
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="
                        absolute right-2 top-1/2 -translate-y-1/2 
                        text-muted-foreground hover:text-foreground transition
                      "
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </Field>

              {/* SUBMIT BUTTON */}
              <Field className="mb-4">
                <Button type="submit" disabled={authLoading}>
                  {authLoading && <Spinner />}
                  {authLoading ? "Loading..." : "Login"}
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>

      <p className="px-6 text-center text-sm text-muted-foreground">
        By clicking continue, you agree to our{" "}
        <Link to="#" className="underline">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link to="#" className="underline">
          Privacy Policy
        </Link>
        .
      </p>
    </div>
  );
}
