import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { zodResolver } from "@hookform/resolvers/zod"
import { FieldError, useForm } from "react-hook-form"
import { signupFormSchema, SignupSchema } from "../schemas/signup-schema"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { useSignUp } from "../hooks/use-signup"

interface signupFormProps {
  RenderLogin: () => void;
}
export function SignUpForm({ RenderLogin }: signupFormProps) {
  const {mutate: register,isPending} = useSignUp();

  const form = useForm<SignupSchema>({
    resolver: zodResolver(signupFormSchema),
  });

  const { errors } = form.formState;

  function onSubmit(values: SignupSchema) {
    register(values, {onSuccess: ()=>{
      RenderLogin();
    }});
  }

  function handleErrorStyling(value: FieldError | undefined): string {
    if (value) {
      return "border-red-600";
    }
    return "";
  }

  return (
    <div className="flex flex-col ">
      <Card >
        <CardHeader>
          <CardTitle className="text-2xl">SignUp</CardTitle>
          <CardDescription>
            Create an account with us!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col">
                <div className="flex justify-between gap-2">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <Label>First name</Label>
                        <FormControl>
                          <Input className={handleErrorStyling(errors.firstName)} placeholder="john" {...field} max={20} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <Label>Last name</Label>
                        <FormControl>
                          <Input className={handleErrorStyling(errors.lastName)} placeholder="Doe" {...field} max={20} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <Label>Email</Label>
                      <FormControl>
                        <Input className={handleErrorStyling(errors.email)} placeholder="jd@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <Label>Password</Label>
                      <FormControl>
                        <Input className={handleErrorStyling(errors.password)} type="Password" placeholder="**********" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <Label>Confirm password</Label>
                      <FormControl>
                        <Input className={handleErrorStyling(errors.confirmPassword)} type="Password" placeholder="**********" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full mt-6" disabled={isPending}>
                  SignUp
                </Button>
              </div>
              <div className="mt-4 text-center text-sm">
                Already have an account?{" "}
                <a onClick={!isPending? RenderLogin:undefined} className="underline underline-offset-4 cursor-pointer">
                  Login
                </a>
              </div>

            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
