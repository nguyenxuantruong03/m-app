"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { AlertModal } from "@/components/modals/alert-modal";

const FormDeleteAccount = () => {
  const user = useCurrentUser();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    // Focus on the input field when it is rendered
    const inputElement = document.getElementById("address-input");
    if (inputElement) {
      inputElement.focus();
    }
  }, []);

  const onSubmit = async () => {
    setLoading(true);
    try {
      await axios.delete(`/api/deleteaccount`);
      setLoading(false);
      toast.success("Tài khoản của bạn đã xóa thành công!");
      router.push("/auth/login")
    } catch (error: unknown) {
      setLoading(false);
      if (
        (error as { response?: { data?: { error?: string } } }).response &&
        (error as { response: { data?: { error?: string } } }).response.data &&
        (error as { response: { data: { error?: string } } }).response.data
          .error
      ) {
        toast.error(
          (error as { response: { data: { error: string } } }).response.data
            .error
        );
      } else {
        toast.error("Có vấn đề khi xóa tài khoản!");
      }
    } finally {
      setLoading(true);
      if (!user?.id) {
        router.push("/auth/login");
      }
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const isEmailValid = inputValue === user?.email;

  return (
    <>
      <AlertModal
        title="Bạn đã chắc chắn xóa đi tài khoản tài khoản của mình?"
        message="Nếu bạn xóa sẽ không thể khôi phục lại được."
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onSubmit}
        loading={loading}
      />
      <div className="space-y-3">
        <p className="text-sm">
          Để xóa tài khoản bạn cần nhập &ldquo;
          <span className="font-bold text-red-500  text-sm">{user?.email}</span>
          &rdquo; vào bên dưới.
        </p>
        <p className=" text-white font-semibold text-sm">Nội dung</p>
        <Input
          id="address-input"
          placeholder={`Hãy nhập ${user?.email} vào đây.`}
          disabled={loading}
          onChange={handleChange}
        />
      </div>
      <div className="my-2"></div>
      <Button disabled={loading || !isEmailValid} onClick={() => setOpen(true)}>
        Delete Account
      </Button>
    </>
  );
};

export default FormDeleteAccount;
