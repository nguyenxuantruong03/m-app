"use client";
import * as z from "zod";
import axios from "axios";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Trash, UserIcon } from "lucide-react";
import { Favorite, SentEmailUser, User } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";
import { AlertModal } from "@/components/modals/alert-modal";
import Tiptap from "@/components/tiptap/tiptap";
import { MentionsInput, Mention } from "react-mentions";
import { AvatarFallback, Avatar } from "@/components/ui/avatar";
import Image from "next/image";

import "./mention.css";
import Recommend from "@/components/ui/recommend";
import { translateSentEmailForm } from "@/translate/translate-dashboard";

interface UserSuggestion {
  imageCredential?: string;
  image?: string;
  email: string;
  nameuser: string;
}

interface FavoriteSuggestion {
  name: string; // Thêm các thuộc tính khác tùy theo cấu trúc dữ liệu của bạn
}

interface MappedUser {
  id: string;
  email: string;
  image: string | null;
  imageCredential: { url: string }[];
  nameuser: string;
}

interface MappedFavorite {
  id: string;
  value: string[];
}

interface SentEmailUserFormProps {
  initialData: SentEmailUser | null;
  associatedUser: (string | null | undefined)[];
  associatedFavorite: (string | null | undefined)[];
  language: string
}

export const SentEmailUserForm: React.FC<SentEmailUserFormProps> = ({
  initialData,
  associatedUser,
  associatedFavorite,
  language
}) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dataUser, setDataUser] = useState<User[]>([]); // Allow the array to contain USER type
  const [favorites, setFavorites] = useState<Favorite[]>([]); // Favorites array

  //language
  const sentEmailFormMessage = translateSentEmailForm(language)

  const title = initialData ? sentEmailFormMessage.editSent : sentEmailFormMessage.createSent;
  const description = initialData ? sentEmailFormMessage.editASent : sentEmailFormMessage.addANewSent;
  const action = initialData ? sentEmailFormMessage.saveChanges : sentEmailFormMessage.create;

  const formSchema = z.object({
    subject: z.string().min(2, { message: sentEmailFormMessage.enterAtLeastTwoChars}),
    description: z.string().min(2, { message: sentEmailFormMessage.enterAtLeastTwoChars}),
    sentemailuser: z.array(z.string()),
  });
  
  type SentEmailUserFormValues = z.infer<typeof formSchema>;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseuser = await axios.get(
          `/api/${params.storeId}/settingusers`
        );
        const responsefavorite = await axios.get(
          `/api/${params.storeId}/favorite`
        );
        const users = responseuser.data;
        const favorite = responsefavorite.data;

        // Add "All" option
        const mappedUsers = [
          {
            id: "all",
            display: "All",
            image: null,
            imageCredential: null,
            nameuser: "All Users",
          },
          ...users.map((item:MappedUser) => ({
            id: item.id.toString(),
            display: item.email,
            image: item.image,
            imageCredential: item.imageCredential[0]?.url,
            nameuser: item.nameuser,
          })),
        ];

        const mappedFavorites = [
          {
            id: "phobien",
            display: "Phổbiến",
          },
          ...favorite.map((item:MappedFavorite) => ({
            id: item.id.toString(),
            display: item.value,
          })),
        ];

        setDataUser(mappedUsers);
        setFavorites(mappedFavorites);
      } catch (error) {
        toast.error(sentEmailFormMessage.somethingWentWrong);
      }
    };
    fetchData();
  }, [params.storeId]);

  // Filter out null and undefined values
  const validAssociatedUser = associatedUser.filter((id): id is string => !!id);
  const validAssociatedFavorite = associatedFavorite.filter(
    (id): id is string => !!id
  );
  const sentemailuserToUse =
    validAssociatedUser.length > 0 || validAssociatedFavorite.length > 0
      ? [...validAssociatedUser, ...validAssociatedFavorite]
      : initialData?.sentemailuser;

  const form = useForm<SentEmailUserFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? {
          subject: initialData.subject,
          description: initialData.description,
          sentemailuser: sentemailuserToUse,
        }
      : {
          subject: "",
          description: "",
          sentemailuser: [],
        },
  });

  const onSubmit = async (data: SentEmailUserFormValues) => {
    const datasentemailuser = data.sentemailuser.map(item => item.trim()).filter(item => item !== "")
    const datasubject= data.subject.replace(/\s/g, '').trim()
    const datadescription = data.description.replace(/\s/g, '').trim()

    // Kiểm tra xem dữ liệu đã xử lý có giống dữ liệu ban đầu không
    const isSentEmailUserUnchanged = JSON.stringify(datasentemailuser) === JSON.stringify(initialData?.sentemailuser);
    const isSubjectUnchanged = datasubject === initialData?.subject;
    const isDescriptionUnchanged = datadescription === initialData?.description.replace(/\s/g, '').trim();
    try {
      // Hiển thị toast error nếu cả ba trường không thay đổi
      if (isSentEmailUserUnchanged && isSubjectUnchanged && isDescriptionUnchanged) {
        toast.error(sentEmailFormMessage.noChangesMade);
        return;
      }
      //Check xem dữ liệu có giống nhau không của data.sentemailuser
      const normalizeEmail = (item: string) => {
        // Try to match typical email pattern
        const emailMatch = item.match(
          /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i
        );
        if (emailMatch) {
          return emailMatch[0].toLowerCase();
        }
        // Check for special identifiers or usernames encapsulated in special syntax
        // Updated regex to match email identifier in the special syntax
        const specialIdentifierMatch = item.match(/@\[([^\]]+)\]\(([^)]+)\)/i);
        if (specialIdentifierMatch) {
          return specialIdentifierMatch[1].toLowerCase(); // returns 'nguyễnxuântrường (ID: clxrcqu9w0001cg2reju63ch1)' from your example
        }

        // Return null if no valid patterns are matched
        return null;
      };

      // Assuming `data.sentemailuser` contains an array of strings
      const normalizedData = data.sentemailuser
        .map(normalizeEmail)
        .filter((email): email is string => email !== null); // Filter out nulls from failed matches

      // Function to find duplicates
      const findDuplicates = (emails: string[]) => {
        const emailCounts: { [key: string]: number } = {};
        const duplicates: string[] = [];

        emails.forEach((email) => {
          if (!emailCounts[email]) {
            emailCounts[email] = 1;
          } else {
            emailCounts[email]++;
          }
        });

        for (const email in emailCounts) {
          if (emailCounts[email] > 1) {
            duplicates.push(email);
          }
        }

        return duplicates;
      };

      const duplicates = findDuplicates(normalizedData);

      if (duplicates.length > 0) {
        const duplicatedEmails = duplicates.join(", ");
        toast.error(`${sentEmailFormMessage.duplicateEntriesFound}: ${duplicatedEmails}`);
        return;
      }

       // Kiểm tra email và ưa thích không thê hiện cùng nhau
      const gmailFormatEmails = normalizedData.filter(email => email.includes('@'));
      const otherFormatEmails = normalizedData.filter(email => !email.includes('@'));

      if (gmailFormatEmails.length > 0 && otherFormatEmails.length > 0) {
        const gmailEmails = gmailFormatEmails.join(", ");
        const otherEmails = otherFormatEmails.join(", ");
        toast.error(`${sentEmailFormMessage.email}: (${gmailEmails}) ${sentEmailFormMessage.andFavorites}: (${otherEmails}) ${sentEmailFormMessage.cannotExistTogether}`);
        return;
      }

      setLoading(true);
      let promise;
      //Lọc bỏ chỉ lấy trong dâu () !Cách này dùng để có thể update lại
      const filteredSentEmailUser = datasentemailuser
        .filter((item) => /\(([^)]+)\)/.test(item)) // Lọc các item có dấu ngoặc đơn
        .map((item) => item.match(/\(([^)]+)\)/)![1]); // Lấy phần tử trong dấu ngoặc đơn

      const requestDataPost = {
        subject: datasubject,
        description: datadescription,
        sentemailuser: filteredSentEmailUser,
      };

      const requestDataPatch = {
        subject: datasubject,
        description: datadescription,
        sentemailuser: datasentemailuser,
      };

      if (initialData) {
        promise = axios.patch(
          `/api/${params.storeId}/sentmailuser/${params.sentmailuserId}`,
          requestDataPatch
        );
      } else {
        promise = axios.post(
          `/api/${params.storeId}/sentmailuser`,
          requestDataPost
        );
      }

      await toast.promise(
        promise.then((response) => {
          if (initialData) {
            return (
              <p>
                {sentEmailFormMessage.sentEmailUser}
                <span className="font-bold">{response.data?.subject}</span>
                {sentEmailFormMessage.updated}.
              </p>
            );
          } else {
            return (
              <p>
                {sentEmailFormMessage.sentEmailUser}
                <span className="font-bold"> {data.subject} </span>{sentEmailFormMessage.created}.
              </p>
            );
          }
        }),
        {
          loading: sentEmailFormMessage.updatingSentEmailUser,
          success: (message) => {
            router.refresh();
            router.push(`/${params.storeId}/sentmailuser`);
            return message;
          },
          error: (error: unknown) => {
            if (
              (error as { response?: { data?: { error?: string } } })
                .response &&
              (error as { response: { data?: { error?: string } } }).response
                .data &&
              (error as { response: { data: { error?: string } } }).response
                .data.error
            ) {
              return (error as { response: { data: { error: string } } })
                .response.data.error;
            } else {
              return sentEmailFormMessage.somethingWentWrong;
            }
          },
        }
      );
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(
        `/api/${params.storeId}/sentmailuser/${params.sentmailuserId}`
      );
      router.refresh();
      router.push(`/${params.storeId}/sentmailuser`);
      toast.success(sentEmailFormMessage.sentEmailUserDeleted);
    } catch (error: unknown) {
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
        toast.error(
          sentEmailFormMessage.somethingWentWrong
        );
      }
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
  
    if (value.includes("@[All](all)") && value.includes("@[Phổbiến](phobien)")) {
      toast(sentEmailFormMessage.onlySelectAllOrPopular, {
        icon: '😙',
      });
      return;
    }

    if (value.includes("@[Phổbiến](phobien)")) {
      toast(sentEmailFormMessage.ifChoosePopular, {
        icon: '😮',
      });
      const filteredValue = value
        .split(" ")
        .filter((v) => v === "@[Phổbiến](phobien)")
        .join(" ");
      form.setValue("sentemailuser", filteredValue.split(" "));
      return;
    }

    if (value.includes("@[All](all)")) {
      toast(sentEmailFormMessage.ifChooseAll, {
        icon: '🥰',
      });
      const filteredValue = value
        .split(" ")
        .filter((v) => v === "@[All](all)")
        .join(" ");
      form.setValue("sentemailuser", filteredValue.split(" "));
      return;
    }

    // Update the state with the new, split value
    form.setValue(
      "sentemailuser",
      value.split(" ").map((v) => v)
    );
  };

  const handleCopy = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    toast.error(sentEmailFormMessage.copyingNotAllowed);
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    toast.error(sentEmailFormMessage.pastingNotAllowed);
  };

  const handleCut = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    toast.error(sentEmailFormMessage.cuttingNotAllowed);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.ctrlKey && e.key === "c") || (e.ctrlKey && e.key === "v")) {
      e.preventDefault();
      toast.error(sentEmailFormMessage.copyingPastingNotAllowed);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
        languageToUse={language}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>

      <Separator />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="space-y-6 overflow-y-auto">
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex space-x-3 items-center">
                    {sentEmailFormMessage.subject} <span className="text-red-600 pl-1">(*)</span>{" "}
                    <Recommend message={sentEmailFormMessage.enterSubjectToMakeItClear} />
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder={sentEmailFormMessage.enterSubject} 
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="sentemailuser"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex space-x-3 items-center">
                    {sentEmailFormMessage.user} <span className="text-red-600 pl-1">(*)</span>{" "}
                    <Recommend message={sentEmailFormMessage.mentionUserWithAt} />
                  </FormLabel>
                  <FormControl>
                    <MentionsInput
                      value={field.value.join(" ")}
                      onChange={handleChange}
                      onKeyDown={handleKeyDown}
                      onCopy={handleCopy}
                      onCut={handleCut}
                      onPaste={handlePaste}
                      disabled={loading}
                      placeholder={sentEmailFormMessage.enterUserNameWithAt}
                      className="mentions"
                    >
                      <Mention
                        type="user"
                        className="mentions__mention"
                        trigger="@"
                        data={dataUser}
                        renderSuggestion={(
                          suggestion: UserSuggestion,
                          search: string,
                          highlightedDisplay: React.ReactNode
                        ) => (
                          <div className="">
                            <div className="flex items-center space-x-3">
                              {suggestion?.imageCredential ||
                              suggestion.image ? (
                                <Image
                                  width={32}
                                  height={32}
                                  src={
                                    suggestion?.imageCredential ||
                                    suggestion.image || "/device/404.png"
                                  }
                                  alt={`${sentEmailFormMessage.errorAvatar} ${suggestion.email}`}
                                  className="rounded-full"
                                />
                              ) : (
                                <Avatar className="w-8 h-8">
                                  <AvatarFallback className="bg-sky-500">
                                    <UserIcon className="text-white" />
                                  </AvatarFallback>
                                </Avatar>
                              )}
                              <div>
                                <p className="text-sm font-semibold text-slate-900">
                                  {highlightedDisplay}
                                </p>
                                <p className="text-xs text-slate-400">
                                  {suggestion.nameuser}
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                      />
                      <Mention
                        type="favorite"
                        className="mentions__mention"
                        trigger="$"
                        data={favorites}
                        renderSuggestion={(
                          suggestion: FavoriteSuggestion,
                          search: string,
                          highlightedDisplay: React.ReactNode
                        ) => (
                          <p className="text-sm font-semibold text-slate-900">
                            {highlightedDisplay}
                          </p>
                        )}
                      />
                    </MentionsInput>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{sentEmailFormMessage.description}</FormLabel>
                  <FormControl>
                    <Tiptap
                      disabled={loading}
                      value={field.value}
                      onChange={field.onChange}
                      languageToUse={language}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
