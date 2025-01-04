"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FormSuccess from "@/components/form-success";
import FormError from "@/components/form-error";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { useTranslations } from "next-intl";

interface FormBanUserProps {
  userId: string | undefined;
  name: string | undefined;
  email: string | undefined;
  banTime: Date | null;
}

const FormBanUser: React.FC<FormBanUserProps> = ({
  userId,
  name,
  email,
  banTime,
}) => {
  const t = useTranslations()
  const params = useParams();
  const router = useRouter();
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [descriptionBan, setDescriptionBan] = useState<string>("");
  const [time, setTime] = useState<string>(() => {
    if (banTime) {
      const newBanTime = new Date(banTime);
      newBanTime.setHours(newBanTime.getHours() + 7); // Cộng thêm 7 giờ
      return newBanTime.toISOString().slice(0, 16); // Format lại thành chuỗi ngày giờ
    } else {
      const currentTime = new Date(); // Lấy thời gian hiện tại
      currentTime.setHours(currentTime.getHours() + 7); // Cộng thêm 7 giờ
      return currentTime.toISOString().slice(0, 16); // Format lại thành chuỗi ngày giờ
    }
  });

  useEffect(() => {
    // Kiểm tra xem input đã được render chưa và focus vào nó
    const inputElement = document.getElementById("address-input");
    if (inputElement) {
      inputElement.focus();
    }
  }, []);

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent form from submitting normally
    setSuccess("");
    setError("");
    setLoading(true);

    // Kiểm tra nếu descriptionBan trống
    if (descriptionBan.trim().length < 3) {
      setError(
        t("settinguser.form.banContentMinLength")
      );
      setLoading(false);
      return;
    }

    try {
      const checkTime = new Date(time);
      const now = new Date();
      const thirtyMinutesFromNow = new Date(now.getTime() + 10 * 60 * 1000);
      // Kiểm tra nếu thời gian ban nhỏ hơn thời gian hiện tại
      if (checkTime <= now) {
        setError(t("settinguser.form.cannotBanPastTime"));
        setLoading(false);
        return;
      }
      // Kiểm tra nếu thời gian ban ít nhất là 10 phút từ bây giờ
      if (checkTime < thirtyMinutesFromNow) {
        setError(t("settinguser.form.banTimeMin10Min"));
        setLoading(false);
        return;
      }

      const banTime = new Date(time);
      banTime.setHours(banTime.getHours() + 7);

      await axios.post(`/api/${params.storeId}/settingusers`, {
        time: banTime, // Convert string back to Date
        descriptionBan: descriptionBan,
        userId: userId,
      });

      router.refresh();
      setLoading(true)
      setSuccess(`${t("settinguser.form.banSuccess")}: ${name} - email: ${email}.`);
    } catch (error: unknown) {
      if (
        (error as { response?: { data?: { error?: string } } }).response &&
        (error as { response: { data?: { error?: string } } }).response.data &&
        (error as { response: { data: { error?: string } } }).response.data
          .error
      ) {
        // Hiển thị thông báo lỗi cho người dùng
        setError(
          (error as { response: { data: { error: string } } }).response.data
            .error
        );
      } else {
        // Hiển thị thông báo lỗi mặc định cho người dùng
        setError(t("toastError.somethingWentWrong"));
      }
    }finally {
      setLoading(false)
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="space-y-4">
        <p className="text-white font-semibold text-sm">{t("settinguser.form.content")}</p>
        <Input
          id="address-input"
          value={descriptionBan}
          onChange={(e) => setDescriptionBan(e.target.value)}
          placeholder={t("settinguser.form.enterBanContent")}
          disabled={loading}
        />

        <p className="text-white font-semibold text-sm">{t("settinguser.form.banTime")}</p>
        <Input
          value={time}
          onChange={(e) => setTime(e.target.value)}
          type="datetime-local"
          placeholder={t("settinguser.form.unbanTime")}
          disabled={loading}
        />
      </div>
      <div className="my-3">
        <FormError message={error} />
        <FormSuccess message={success} />
      </div>
      <Button type="submit" disabled={loading}>
      {t("action.save")}
      </Button>
    </form>
  );
};

export default FormBanUser;
