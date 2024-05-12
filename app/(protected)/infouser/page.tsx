"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition, useState,useEffect } from "react";
import { useSession } from "next-auth/react";
import { Switch } from "@/components/ui/switch";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { setting } from "@/actions/actions-signin-sign-up/setting";
import { SettingSchema } from "@/schemas";
import { useCurrentUser } from "@/hooks/use-current-user";
import FormSuccess from "@/components/form-success";
import FormError from "@/components/form-error";
import PasswordField from "@/components/auth/field/passwordfield";
import PasswordNewField from "@/components/auth/field/passwordfieldnew";
import { X } from "lucide-react";

const SettingPage = () => {
  const user = useCurrentUser();
  const { update } = useSession();
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState<string>();
  const [password, setPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [isPasswordValid, setPasswordValid] = useState(false);
  const [isPasswordNewValid, setPasswordNewValid] = useState(false);
  const [loginClicked, setLoginClicked] = useState(false);
    //Làm mới borderInput
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmittedPasswordnew, setIsSubmittedPasswordnew] = useState(false);
    //Disable nếu như có password
    const [isSaveDisabled, setIsSaveDisabled] = useState(true);

    useEffect(() => {
      // Kiểm tra xem password và newpassword có giá trị không
      if (password !== "" || newPassword !== "") {
        // Kiểm tra xem password và newPassword có giá trị hợp lệ không nếu đúng hết thì ko disalbe nếu sai thì disable
        if (!isPasswordValid || !isPasswordNewValid) {
          setIsSaveDisabled(true);
        } else {
          setIsSaveDisabled(false);
        }
      } else {
        setIsSaveDisabled(false);
      }
    }, [password, newPassword,isPasswordValid, isPasswordNewValid]);
    
    

  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof SettingSchema>>({
    resolver: zodResolver(SettingSchema),
    defaultValues: {
      newPassword: undefined,
      password: undefined,
      name: user?.name || undefined,
      email: user?.email || undefined,
      isTwoFactorEnabled: user?.isTwoFactorEnabled || undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof SettingSchema>) => {
    setSuccess("")
    setError("")
    setLoginClicked(true)
    startTransition(() => {
      setting(values)
        .then((data) => {
          if (data.error) {
            setError(data.error);
            setIsSubmitted(true);
            setIsSubmittedPasswordnew(true)
            setNewPassword("")
          }
          if (data.success) {
            update();
            setSuccess(data.success);
            setIsSubmitted(true);
            setIsSubmittedPasswordnew(true)
            setPassword("")
            setNewPassword("")
          }
        })
        .catch(() => {
          setError("Something went wrong");
        });
    });
  };
  return (
    <Card className="w-[600px]">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">Setting</p>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Xuan Truong"
                        disabled={isPending}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              {user?.isOAuth === false && (
                <>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="vlxdxuantruong@gmail.com"
                            type="email"
                            disabled={true}
                          />
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
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                        <PasswordField
                          field={field}
                          isPending={isPending}
                          setPassword={setPassword}
                          validatePassword={setPasswordValid}
                          password={password}
                          setError={setError}
                          setSuccess={setSuccess}
                          isSubmitted={isSubmitted}
                          setIsSubmitted={setIsSubmitted}
                        />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>New password</FormLabel>
                        <FormControl>
                        <PasswordNewField
                          field={field}
                          isPending={isPending}
                          validatePasswordNew={setPasswordNewValid}
                          setNewPassword={setNewPassword}
                          isSubmittedPasswordnew={isSubmittedPasswordnew}
                          newPassword={newPassword}
                          setError={setError}
                          setSuccess={setSuccess}
                          setIsSubmittedPasswordnew={setIsSubmittedPasswordnew}
                        />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}
              {user?.isOAuth === false && (
                <FormField
                  control={form.control}
                  name="isTwoFactorEnabled"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadpw-sm">
                      <div className="space-y-0.5">
                        <FormLabel>Two Factor Authentication</FormLabel>
                        <FormDescription>
                          Enable two factor authentication for your
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          disabled={isPending}
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              )}
            </div>
            <FormError message={error} />
            <FormSuccess message={success} />
            <Button type="submit" disabled={isPending ||  isSaveDisabled}>Save</Button>
            {loginClicked && isSaveDisabled && (
              <div className="flex items-center space-x-1">
                <X className="w-5 h-5 mr-1 text-red-500" />
                <span className="text-red-500 text-xs">
                  Bạn cần nhập mật khẩu mới!
                </span>
              </div>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default SettingPage;
