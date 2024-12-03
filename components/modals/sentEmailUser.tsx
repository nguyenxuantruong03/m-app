"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Modal from "../ui/modal";
import { Button } from "../ui/button";
import Tiptap from "../tiptap/tiptap";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import toast from "react-hot-toast";
import axios from "axios";
import { translateSentEmailUserModal } from "@/translate/translate-dashboard";

interface SentEmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  loading: boolean;
  message?: string;
  title?: string;
  email: string | null;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setOpenSentEmail: Dispatch<SetStateAction<boolean>>;
  languageToUse: string
}


export const SentEmailUserModal: React.FC<SentEmailModalProps> = ({
  isOpen,
  onClose,
  loading,
  message,
  title,
  email,
  setLoading,
  setOpenSentEmail,
  languageToUse
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [value, setValue] = useState(""); // State for Tiptap content
  const [subject, setSubject] = useState("");
  const [error, setError] = useState<{ subject?: string; value?: string }>({});

  //language
  const emailUserModalMessage = translateSentEmailUserModal(languageToUse)

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // If email is not provided, close the modal
  useEffect(() => {
    if (!email) {
      onClose(); // Close the modal if email is not provided
    }
  }, [email, onClose]);

  if (!email) {
    return null;
  }

  if (!isMounted) {
    return null;
  }

  const sendEmail = async () => {
    const newError: { subject?: string; value?: string } = {};
    if (!subject.trim()) newError.subject = `${emailUserModalMessage.subjectRequired}`;
    if (!value.trim()) newError.value = `${emailUserModalMessage.emailContentRequired}`;

    if (Object.keys(newError).length > 0) {
      setError(newError);
      return;
    }
    try {
      setLoading(true);
      await axios.post("/api/sentEmailfeedback", {
        subject: subject,
        value: value,
        email: email,
      });
    } catch (err) {
      toast.error(emailUserModalMessage.somethingWentWrong);
    } finally {
      setError({}); // Clear errors if no issues
      toast.success(`${emailUserModalMessage.emailSentToUser}: ${email}.`);
      setLoading(false);
      setOpenSentEmail(false)
    }
  };

  return (
    <Modal
      title={title || `${emailUserModalMessage.sendEmailToUser}: ${email}`}
      description={message || emailUserModalMessage.chooseEmailDesign}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="space-y-4">
        <div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="email">{emailUserModalMessage.sentFrom}</Label>
            <Input
              disabled
              value="mail@vlxdxuantruong.email"
              placeholder={emailUserModalMessage.sendFromPlaceholder}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5 mt-2">
            <Label htmlFor="email">{emailUserModalMessage.emailTo}</Label>
            <Input disabled value={email || ""} placeholder={emailUserModalMessage.emailPlaceholder}/>
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5 mt-2">
            <Label htmlFor="subject">{emailUserModalMessage.subject}</Label>
            <Input
              id="subject"
              disabled={loading}
              value={subject}
              onChange={(e) => {
                setSubject(e.target.value);
                setError((prevError) => ({ ...prevError, subject: undefined })); // Xóa lỗi subject
              }}
              placeholder={emailUserModalMessage.subjectPlaceholder}
            />
            {error.subject && (
              <p className="text-red-500 text-sm">{error.subject}</p>
            )}
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Tiptap
              disabled={loading}
              value={value}
              onChange={(newValue) => {
                setValue(newValue);
                setError((prevError) => ({ ...prevError, value: undefined })); // Xóa lỗi value
              }}
              isCustom={true}
              languageToUse={languageToUse}
            />
            {error.value && (
              <p className="text-red-500 text-sm">{error.value}</p>
            )}
          </div>
        </div>
        <Button onClick={sendEmail} disabled={loading}>
          {emailUserModalMessage.sendEmail}
        </Button>
      </div>
    </Modal>
  );
};
