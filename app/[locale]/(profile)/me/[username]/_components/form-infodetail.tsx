"use client";
import { Dispatch, SetStateAction, useState } from "react";
import { ToggleCard } from "./Toggle-card";
import { Button } from "@/components/ui/button";
import FormGender from "@/app/[locale]/(setting-user)/components/form/form-infomation/form-gender";
import FormPhoneNumber from "@/app/[locale]/(setting-user)/components/form/form-infomation/form-phonenumber";
import FormDateOfBirth from "@/app/[locale]/(setting-user)/components/form/form-infomation/form-dateofbirth";
import FormAddress from "@/app/[locale]/(setting-user)/components/form/form-infomation/form-address";
import FormAddressOther from "@/app/[locale]/(setting-user)/components/form/form-infomation/form-addressother";
import FormFavorite from "@/app/[locale]/(setting-user)/components/form/form-infomation/form-favorite";
import FormLinkFaceBook from "@/app/[locale]/(setting-user)/components/form/form-social/form-linkfacebook";
import FormLinkGithub from "@/app/[locale]/(setting-user)/components/form/form-social/form-linkgithub";
import FormLinkInstagram from "@/app/[locale]/(setting-user)/components/form/form-social/form-linkinstagram";
import FormLinkLinkedIn from "@/app/[locale]/(setting-user)/components/form/form-social/form-linklinkedin";
import FormLinkOther from "@/app/[locale]/(setting-user)/components/form/form-social/form-linkother";
import FormLinkTiktok from "@/app/[locale]/(setting-user)/components/form/form-social/form-linktiktok";
import FormLinkTwitter from "@/app/[locale]/(setting-user)/components/form/form-social/form-linktwitter";
import FormLinkWebSite from "@/app/[locale]/(setting-user)/components/form/form-social/form-linkwebsite";
import FormLinkYoutube from "@/app/[locale]/(setting-user)/components/form/form-social/form-linkyoutube";
import {
  Earth,
  Facebook,
  Github,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
  Link as LinkIcon,
  TrendingUp,
  User,
  Phone,
  Cake,
  MapPin,
  BookHeart,
  Pencil,
} from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { useTranslations } from "next-intl";

interface FormInfoDetailProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
  self: any;
  languageToUse: string;
}
const FormInfoDetail = ({
  setOpen,
  self,
  languageToUse,
}: FormInfoDetailProps) => {
  const t = useTranslations()
  const [isOpenGender, setIsOpenGender] = useState(false);
  const [isOpenPhone, setIsOpenPhone] = useState(false);
  const [isOpenBirthday, setIsOpenBirthday] = useState(false);
  const [isOpenAddress, setIsOpenAdress] = useState(false);
  const [isOpenAddressOther, setIsOpenAdressOther] = useState(false);
  const [isOpenFavorite, setIsOpenFavorite] = useState(false);

  const [isOpenFacebook, setIsOpenFacebook] = useState(false);
  const [isOpenInstagram, setIsOpenInstagram] = useState(false);
  const [isOpenYoutube, setIsOpenYoutube] = useState(false);
  const [isOpenTiktok, setIsOpenTiktok] = useState(false);
  const [isOpenTwitter, setIsOpenTwitter] = useState(false);
  const [isOpenLinkedIn, setIsOpenLinkedIn] = useState(false);
  const [isOpenWebSite, setIsOpenWebsite] = useState(false);
  const [isOpenGithub, setIsOpenGitHub] = useState(false);
  const [isOpenOther, setIsOpenOther] = useState(false);

  return (
    <div className="space-y-2">
      <span className="text-xl font-semibold">{t("profile.accountInfo")}</span>
      <ToggleCard
        field="isEmail"
        label="Email"
        value={self.showInfomation?.isEmail}
        data={!!self.email}
      />
      <ToggleCard
        field="isCreatedAt"
        label={t("info.createdAccount")}
        value={self.showInfomation?.isCreatedAt}
        data={!!self.createdAt}
      />
      <span className="flex items center pt-4 text-xl font-semibold">
        {t("profile.privateInfo")}
      </span>
      <ToggleCard
        field="isGender"
        label={t("info.gender")}
        value={self.showInfomation?.isGender}
        data={!!self.gender}
      />

      {isOpenGender ? (
        <FormGender
          classNames="md:flex justify-between"
          setOpen={setIsOpenGender}
          languageToUse={languageToUse}
        />
      ) : (
        <>
          <div className="p-2 flex justify-between">
            <div className="flex items-center">
              <span className="mr-2">
                <User className="w-5 h-5" />
              </span>
              {self.gender === "None" ? (
                <>{t("profile.noData")}</>
              ) : (
                <>{self.gender}</>
              )}
            </div>
            <Pencil
              className="h-8 w-8 p-1 border border-slate-900 rounded-full cursor-pointer hover:opacity-50"
              onClick={() => setIsOpenGender(true)}
            />
          </div>
        </>
      )}

      <ToggleCard
        field="isPhone"
        label={t("info.phoneNumber")}
        value={self.showInfomation?.isPhone}
        data={!!self.phonenumber}
      />
      {isOpenPhone ? (
        <FormPhoneNumber
          classNames="md:flex justify-between"
          setOpen={setIsOpenPhone}
          languageToUse={languageToUse}
        />
      ) : (
        <>
          <div className="p-2 flex justify-between">
            <div className="flex items-center">
              <span className="mr-2">
                <Phone className="h-5 w-5" />
              </span>
              {self.phonenumber ? (
                <>
                  <Link
                    className="cursor-pointer underline"
                    href={`tel:${self.phonenumber}`}
                  >
                    {self.phonenumber}
                  </Link>
                </>
              ) : (
                <>{t("profile.noData")}</>
              )}
            </div>
            <Pencil
              className="h-8 w-8 p-1 border border-slate-900 rounded-full cursor-pointer hover:opacity-50"
              onClick={() => setIsOpenPhone(true)}
            />
          </div>
        </>
      )}
      <ToggleCard
        field="isDateofBirth"
        label={t("info.birthday")}
        value={self.showInfomation?.isDateofBirth}
        data={!!self.dateofbirth}
      />
      {isOpenBirthday ? (
        <FormDateOfBirth
          classNames="md:flex justify-between"
          setOpen={setIsOpenBirthday}
          languageToUse={languageToUse}
        />
      ) : (
        <>
          <div className="p-2 flex justify-between">
            <div className="flex items-center">
              <span className="mr-2">
                <Cake className="h-5 w-5" />
              </span>
              {self.dateofbirth ? (
                <>{format(new Date(self.dateofbirth), "dd/MM/yyyy")}</>
              ) : (
                <>{t("profile.noData")}</>
              )}
            </div>
            <Pencil
              className="h-8 w-8 p-1 border border-slate-900 rounded-full cursor-pointer hover:opacity-50"
              onClick={() => setIsOpenBirthday(true)}
            />
          </div>
        </>
      )}
      <ToggleCard
        field="isAddress"
        label={t("info.address")}
        value={self.showInfomation?.isAddress}
        data={!!self.address}
      />
      {isOpenAddress ? (
        <FormAddress
          classNames="md:flex justify-between"
          setOpen={setIsOpenAdress}
          languageToUse={languageToUse}
        />
      ) : (
        <>
          <div className="p-2 flex justify-between">
            <div className="flex items-center">
              <span className="mr-2">
                <MapPin className="h-5 w-5" />
              </span>
              {self.address ? <>{self.address}</> : <>{t("profile.noData")}</>}
            </div>
            <Pencil
              className="h-8 w-8 p-1 border border-slate-900 rounded-full cursor-pointer hover:opacity-50"
              onClick={() => setIsOpenAdress(true)}
            />
          </div>
        </>
      )}
      <ToggleCard
        field="isAdressOther"
        label={t("info.addressOther")}
        value={self.showInfomation?.isAdressOther}
        data={!!self.addressother}
      />
      {isOpenAddressOther ? (
        <FormAddressOther
          classNames="md:flex justify-between"
          setOpen={setIsOpenAdressOther}
          languageToUse={languageToUse}
        />
      ) : (
        <>
          <div className="p-2 flex justify-between">
            <div className="flex items-center">
              <span className="mr-2">
                <MapPin className="h-5 w-5" />
              </span>
              {self.addressother ? (
                <>{self.addressother}</>
              ) : (
                <>{t("profile.noData")}</>
              )}
            </div>
            <Pencil
              className="h-8 w-8 p-1 border border-slate-900 rounded-full cursor-pointer hover:opacity-50"
              onClick={() => setIsOpenAdressOther(true)}
            />
          </div>
        </>
      )}
      <ToggleCard
        field="isFavorite"
        label={t("info.favorite")}
        value={self.showInfomation?.isFavorite}
        data={!!self.favorite}
      />
      {isOpenFavorite ? (
        <FormFavorite
          dataallfavorite={self.favorite}
          classNames="md:flex justify-between"
          setOpen={setIsOpenFavorite}
          languageToUse={languageToUse}
        />
      ) : (
        <>
          <div className="p-2 flex justify-between">
            <div className="flex items-center">
              <span className="mr-2">
                <BookHeart className="h-5 w-5" />
              </span>
              {self.favorite.length > 0 ? (
                <>
                  {self.favorite.length > 0
                    ? self.favorite
                        .map((item: string) =>
                          item === "phobien"
                            ? t("profile.popular")
                            : item || t("profile.notChange")
                        )
                        .join(", ")
                    : [t("profile.notChange")]}{" "}
                </>
              ) : (
                <>{t("profile.noData")}</>
              )}
            </div>
            <Pencil
              className="h-8 w-8 p-1 border border-slate-900 rounded-full cursor-pointer hover:opacity-50"
              onClick={() => setIsOpenFavorite(true)}
            />
          </div>
        </>
      )}
      <span className="flex items center pt-4 text-xl font-semibold">
        {t("profile.socialInfo")}
      </span>
      <ToggleCard
        field="isSocial"
        label={t("info.social")}
        value={self.showInfomation?.isSocial}
        data={
          !!self.socialLink.linkfacebook ||
          !!self.socialLink.linkinstagram ||
          !!self.socialLink.linkyoutube ||
          !!self.socialLink.linktiktok ||
          !!self.socialLink.linktwitter ||
          !!self.socialLink.linklinkedin ||
          !!self.socialLink.linkwebsite ||
          !!self.socialLink.linkgithub ||
          !!self.socialLink.linkother
        }
      />

      {isOpenFacebook ? (
        <FormLinkFaceBook
          classNames="md:flex justify-between"
          setOpen={setIsOpenFacebook}
          languageToUse={languageToUse}
        />
      ) : (
        <>
          <div className="p-2 flex justify-between">
            <div className="flex items-center">
              <span className="mr-2">
                <Facebook className="h-5 w-5" />
              </span>
              {self.socialLink.linkfacebook ? (
                <>
                  <p className="flex items-center">
                    <span className="truncate w-96 overflow-hidden whitespace-nowrap">
                      <>
                        <Link
                          href={self.socialLink.linkfacebook}
                          className="underline text-blue-600"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {self.socialLink.linkfacebook}
                        </Link>
                      </>
                    </span>
                  </p>
                </>
              ) : (
                <>{t("profile.noData")}</>
              )}
            </div>
            <Pencil
              className="h-8 w-8 p-1 border border-slate-900 rounded-full cursor-pointer hover:opacity-50"
              onClick={() => setIsOpenFacebook(true)}
            />
          </div>
        </>
      )}

      {isOpenInstagram ? (
        <FormLinkInstagram
          classNames="md:flex justify-between"
          setOpen={setIsOpenInstagram}
          languageToUse={languageToUse}
        />
      ) : (
        <>
          <div className="p-2 flex justify-between">
            <div className="flex items-center">
              <span className="mr-2">
                <Instagram className="h-5 w-5" />
              </span>
              {self.socialLink.linkinstagram ? (
                <>
                  <p className="flex items-center">
                    <span className="truncate w-96 overflow-hidden whitespace-nowrap">
                      <>
                        <Link
                          href={self.socialLink.linkinstagram}
                          className="underline text-blue-600"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {self.socialLink.linkinstagram}
                        </Link>
                      </>
                    </span>
                  </p>
                </>
              ) : (
                <>{t("profile.noData")}</>
              )}
            </div>
            <Pencil
              className="h-8 w-8 p-1 border border-slate-900 rounded-full cursor-pointer hover:opacity-50"
              onClick={() => setIsOpenInstagram(true)}
            />
          </div>
        </>
      )}

      {isOpenYoutube ? (
        <FormLinkYoutube
          classNames="md:flex justify-between"
          setOpen={setIsOpenYoutube}
          languageToUse={languageToUse}
        />
      ) : (
        <>
          <div className="p-2 flex justify-between">
            <div className="flex items-center">
              <span className="mr-2">
                <Youtube className="h-5 w-5" />
              </span>
              {self.socialLink.linkyoutube ? (
                <>
                  <p className="flex items-center">
                    <span className="truncate w-96 overflow-hidden whitespace-nowrap">
                      <>
                        <Link
                          href={self.socialLink.linkyoutube}
                          className="underline text-blue-600"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {self.socialLink.linkyoutube}
                        </Link>
                      </>
                    </span>
                  </p>
                </>
              ) : (
                <>{t("profile.noData")}</>
              )}
            </div>
            <Pencil
              className="h-8 w-8 p-1 border border-slate-900 rounded-full cursor-pointer hover:opacity-50"
              onClick={() => setIsOpenYoutube(true)}
            />
          </div>
        </>
      )}

      {isOpenTiktok ? (
        <FormLinkTiktok
          classNames="md:flex justify-between"
          setOpen={setIsOpenTiktok}
          languageToUse={languageToUse}
        />
      ) : (
        <>
          <div className="p-2 flex justify-between">
            <div className="flex items-center">
              <span className="mr-2">
                <TrendingUp className="h-5 w-5" />
              </span>
              {self.socialLink.linktiktok ? (
                <>
                  <p className="flex items-center">
                    <span className="truncate w-96 overflow-hidden whitespace-nowrap">
                      <>
                        <Link
                          href={self.socialLink.linktiktok}
                          className="underline text-blue-600"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {self.socialLink.linktiktok}
                        </Link>
                      </>
                    </span>
                  </p>
                </>
              ) : (
                <>{t("profile.noData")}</>
              )}
            </div>
            <Pencil
              className="h-8 w-8 p-1 border border-slate-900 rounded-full cursor-pointer hover:opacity-50"
              onClick={() => setIsOpenTiktok(true)}
            />
          </div>
        </>
      )}

      {isOpenTwitter ? (
        <FormLinkTwitter
          classNames="md:flex justify-between"
          setOpen={setIsOpenTwitter}
          languageToUse={languageToUse}
        />
      ) : (
        <>
          <div className="p-2 flex justify-between">
            <div className="flex items-center">
              <span className="mr-2">
                <Twitter className="h-5 w-5" />
              </span>
              {self.socialLink.linktwitter ? (
                <>
                  <p className="flex items-center">
                    <span className="truncate w-96 overflow-hidden whitespace-nowrap">
                      <>
                        <Link
                          href={self.socialLink.linktwitter}
                          className="underline text-blue-600"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {self.socialLink.linktwitter}
                        </Link>
                      </>
                    </span>
                  </p>
                </>
              ) : (
                <>{t("profile.noData")}</>
              )}
            </div>
            <Pencil
              className="h-8 w-8 p-1 border border-slate-900 rounded-full cursor-pointer hover:opacity-50"
              onClick={() => setIsOpenTwitter(true)}
            />
          </div>
        </>
      )}

      {isOpenLinkedIn ? (
        <FormLinkLinkedIn
          classNames="md:flex justify-between"
          setOpen={setIsOpenLinkedIn}
          languageToUse={languageToUse}
        />
      ) : (
        <>
          <div className="p-2 flex justify-between">
            <div className="flex items-center">
              <span className="mr-2">
                <Linkedin className="h-5 w-5" />
              </span>
              {self.socialLink.linklinkedin ? (
                <>
                  <p className="flex items-center">
                    <span className="truncate w-96 overflow-hidden whitespace-nowrap">
                      <>
                        <Link
                          href={self.socialLink.linklinkedin}
                          className="underline text-blue-600"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {self.socialLink.linklinkedin}
                        </Link>
                      </>
                    </span>
                  </p>
                </>
              ) : (
                <>{t("profile.noData")}</>
              )}
            </div>
            <Pencil
              className="h-8 w-8 p-1 border border-slate-900 rounded-full cursor-pointer hover:opacity-50"
              onClick={() => setIsOpenLinkedIn(true)}
            />
          </div>
        </>
      )}

      {isOpenWebSite ? (
        <FormLinkWebSite
          classNames="md:flex justify-between"
          setOpen={setIsOpenWebsite}
          languageToUse={languageToUse}
        />
      ) : (
        <>
          <div className="p-2 flex justify-between">
            <div className="flex items-center">
              <span className="mr-2">
                <Earth className="h-5 w-5" />
              </span>
              {self.socialLink.linkwebsite ? (
                <>
                  <p className="flex items-center">
                    <span className="truncate w-96 overflow-hidden whitespace-nowrap">
                      <>
                        <Link
                          href={self.socialLink.linkwebsite}
                          className="underline text-blue-600"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {self.socialLink.linkwebsite}
                        </Link>
                      </>
                    </span>
                  </p>
                </>
              ) : (
                <>{t("profile.noData")}</>
              )}
            </div>
            <Pencil
              className="h-8 w-8 p-1 border border-slate-900 rounded-full cursor-pointer hover:opacity-50"
              onClick={() => setIsOpenWebsite(true)}
            />
          </div>
        </>
      )}

      {isOpenGithub ? (
        <FormLinkGithub
          classNames="md:flex justify-between"
          setOpen={setIsOpenGitHub}
          languageToUse={languageToUse}
        />
      ) : (
        <>
          <div className="p-2 flex justify-between">
            <div className="flex items-center">
              <span className="mr-2">
                <Github className="h-5 w-5" />
              </span>
              {self.socialLink.linkgithub ? (
                <>
                  <p className="flex items-center">
                    <span className="truncate w-96 overflow-hidden whitespace-nowrap">
                      <>
                        <Link
                          href={self.socialLink.linkgithub}
                          className="underline text-blue-600"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {self.socialLink.linkgithub}
                        </Link>
                      </>
                    </span>
                  </p>
                </>
              ) : (
                <>{t("profile.noData")}</>
              )}
            </div>
            <Pencil
              className="h-8 w-8 p-1 border border-slate-900 rounded-full cursor-pointer hover:opacity-50"
              onClick={() => setIsOpenGitHub(true)}
            />
          </div>
        </>
      )}

      {isOpenOther ? (
        <FormLinkOther
          classNames="md:flex justify-between"
          setOpen={setIsOpenOther}
          languageToUse={languageToUse}
        />
      ) : (
        <>
          <div className="p-2 flex justify-between">
            <div className="flex items-center">
              <span className="mr-2">
                <LinkIcon className="h-5 w-5" />
              </span>
              {self.socialLink.linkother ? (
                <>
                  <p className="flex items-center">
                    <span className="truncate w-96 overflow-hidden whitespace-nowrap">
                      <>
                        <Link
                          href={self.socialLink.linkother}
                          className="underline text-blue-600"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {self.socialLink.linkother}
                        </Link>
                      </>
                    </span>
                  </p>
                </>
              ) : (
                <>{t("profile.noData")}</>
              )}
            </div>
            <Pencil
              className="h-8 w-8 p-1 border border-slate-900 rounded-full cursor-pointer hover:opacity-50"
              onClick={() => setIsOpenOther(true)}
            />
          </div>
        </>
      )}

      <div className="w-full flex items-center justify-end">
        <Button
          variant="primary"
          size="sm"
          onClick={() => setOpen(false)}
          className="text-white"
        >
          {t("action.done")}
        </Button>
      </div>
    </div>
  );
};

export default FormInfoDetail;
