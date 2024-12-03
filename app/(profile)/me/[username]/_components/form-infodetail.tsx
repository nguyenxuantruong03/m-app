"use client";
import { Dispatch, SetStateAction, useState } from "react";
import { ToggleCard } from "./Toggle-card";
import { Button } from "@/components/ui/button";
import FormGender from "@/app/(setting-user)/components/form/form-infomation/form-gender";
import FormPhoneNumber from "@/app/(setting-user)/components/form/form-infomation/form-phonenumber";
import FormDateOfBirth from "@/app/(setting-user)/components/form/form-infomation/form-dateofbirth";
import FormAddress from "@/app/(setting-user)/components/form/form-infomation/form-address";
import FormAddressOther from "@/app/(setting-user)/components/form/form-infomation/form-addressother";
import FormFavorite from "@/app/(setting-user)/components/form/form-infomation/form-favorite";
import FormLinkFaceBook from "@/app/(setting-user)/components/form/form-social/form-linkfacebook";
import FormLinkGithub from "@/app/(setting-user)/components/form/form-social/form-linkgithub";
import FormLinkInstagram from "@/app/(setting-user)/components/form/form-social/form-linkinstagram";
import FormLinkLinkedIn from "@/app/(setting-user)/components/form/form-social/form-linklinkedin";
import FormLinkOther from "@/app/(setting-user)/components/form/form-social/form-linkother";
import FormLinkTiktok from "@/app/(setting-user)/components/form/form-social/form-linktiktok";
import FormLinkTwitter from "@/app/(setting-user)/components/form/form-social/form-linktwitter";
import FormLinkWebSite from "@/app/(setting-user)/components/form/form-social/form-linkwebsite";
import FormLinkYoutube from "@/app/(setting-user)/components/form/form-social/form-linkyoutube";
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
import {
  translateAccountInfo,
  translateDone,
  translateNoData,
  translateNotChange,
  translatePopular,
  translatePrivateInfo,
  translateSocialInfo,
} from "@/translate/translate-client";

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

  //language
  const accountInfoMessage = translateAccountInfo(languageToUse);
  const privateInfoMessage = translatePrivateInfo(languageToUse);
  const noDataMessage = translateNoData(languageToUse);
  const popularMessage = translatePopular(languageToUse);
  const notChangeMessage = translateNotChange(languageToUse);
  const socialInfoMessage = translateSocialInfo(languageToUse);
  const doneMessage = translateDone(languageToUse);

  return (
    <div className="space-y-2">
      <span className="text-xl font-semibold">{accountInfoMessage}</span>
      <ToggleCard
        field="isEmail"
        label="Enable Email"
        value={self.showInfomation?.isEmail}
        data={!!self.email}
        languageToUse={languageToUse}
      />
      <ToggleCard
        field="isCreatedAt"
        label="Enable Created Account"
        value={self.showInfomation?.isCreatedAt}
        data={!!self.createdAt}
        languageToUse={languageToUse}
      />
      <span className="flex items center pt-4 text-xl font-semibold">
        {privateInfoMessage}
      </span>
      <ToggleCard
        field="isGender"
        label="Enable Gender"
        value={self.showInfomation?.isGender}
        data={!!self.gender}
        languageToUse={languageToUse}
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
                <>{noDataMessage}</>
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
        label="Enable Phone"
        value={self.showInfomation?.isPhone}
        data={!!self.phonenumber}
        languageToUse={languageToUse}
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
                <>{noDataMessage}</>
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
        label="Enable Birdthday"
        value={self.showInfomation?.isDateofBirth}
        data={!!self.dateofbirth}
        languageToUse={languageToUse}
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
                <>{noDataMessage}</>
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
        label="Enable Adress"
        value={self.showInfomation?.isAddress}
        data={!!self.address}
        languageToUse={languageToUse}
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
              {self.address ? <>{self.address}</> : <>{noDataMessage}</>}
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
        label="Enable AdressOther"
        value={self.showInfomation?.isAdressOther}
        data={!!self.addressother}
        languageToUse={languageToUse}
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
                <>{noDataMessage}</>
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
        label="Enable Favorite"
        value={self.showInfomation?.isFavorite}
        data={!!self.favorite}
        languageToUse={languageToUse}
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
                            ? popularMessage
                            : item || notChangeMessage
                        )
                        .join(", ")
                    : [notChangeMessage]}{" "}
                </>
              ) : (
                <>{noDataMessage}</>
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
        {socialInfoMessage}
      </span>
      <ToggleCard
        field="isSocial"
        label="Enable Social"
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
        languageToUse={languageToUse}
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
                <>{noDataMessage}</>
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
                <>{noDataMessage}</>
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
                <>{noDataMessage}</>
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
                <>{noDataMessage}</>
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
                <>{noDataMessage}</>
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
                <>{noDataMessage}</>
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
                <>{noDataMessage}</>
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
                <>{noDataMessage}</>
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
                <>{noDataMessage}</>
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
          {doneMessage}
        </Button>
      </div>
    </div>
  );
};

export default FormInfoDetail;
