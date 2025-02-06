import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FieldError, useForm } from "react-hook-form"
import { loginSchema, LoginSchema } from "../schemas/login-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { useLogin } from "../hooks/use-login"

interface loginFormProps{
  RenderSignUp: ()=> void;
}


export function LoginForm({RenderSignUp}: loginFormProps) {

  const {mutate: login, isPending} = useLogin();
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const{ errors } = form.formState;

  function onSubmit(values:LoginSchema){
    login(values);

  }

  function handleErrorStyling(value: FieldError | undefined): string {
    if (value) {
      return "border-red-600";
    }
    return "";
  }

  return (
    <div className="flex flex-col gap-6" >
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>

              <div className="flex flex-col gap-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <Label>Email</Label>
                      <FormControl>
                        <Input className={handleErrorStyling(errors.email)} placeholder="m@example.com" {...field} />
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
                      <div className="flex items-center">
                        <Label htmlFor="password">Password</Label>
                        
                      </div>
                      <FormControl>
                        <Input {...field} type="Password" className={handleErrorStyling(errors.password)}/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button type="submit" className="w-full" disabled={isPending}>
                  Login
                </Button>
              </div>
              <div className="mt-4 text-center text-sm">
                Don&apos;t have an account?{" "}
                <a aria-disabled={isPending} onClick={RenderSignUp} className="underline underline-offset-4 cursor-pointer">
                  Sign up
                </a>
              </div>
              
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
