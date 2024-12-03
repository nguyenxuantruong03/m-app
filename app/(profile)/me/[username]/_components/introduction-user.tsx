"use client";

import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { useState } from "react";
import SheetInfomation from "./sheet-info";
import FormBio from "@/app/(setting-user)/components/form/form-infomation/form-bio";
import Link from "next/link";
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
  Contact,
  User,
  Phone,
  Cake,
  MapPin,
  BookHeart,
  UserPlus,
} from "lucide-react";
import FormInfoDetail from "./form-infodetail";
import FormatDate from "@/components/format-Date";
import {
  translateAddBio,
  translateEditDetails,
  translateEditProfile,
  translateIntroduction,
  translateNoData,
  translateNotChange,
  translatePopular,
} from "@/translate/translate-client";

interface IntroductionUserProps {
  self: any;
  showFunction?: boolean;
  user: any;
  languageToUse: string;
}

const IntroductionUser = ({
  self,
  showFunction = true,
  user,
  languageToUse,
}: IntroductionUserProps) => {
  const [openBio, setOpenBio] = useState(false);
  const [openInfoDetail, setOpenInfoDetail] = useState(false);

  //language
  const introductionMessage = translateIntroduction(languageToUse);
  const editProfileMessage = translateEditProfile(languageToUse);
  const addBioMessage = translateAddBio(languageToUse);
  const noDataMessage = translateNoData(languageToUse);
  const popularMessage = translatePopular(languageToUse);
  const notChangeMessage = translateNotChange(languageToUse);
  const editDetailsMessage = translateEditDetails(languageToUse);

  return (
    <div className="bg-slate-900 rounded-md text-white py-2 px-5 space-y-">
      <SheetInfomation
        role={self.role}
        userId={self.id}
        title=""
        description=""
        form={<FormBio setOpen={setOpenBio} languageToUse={languageToUse} />}
        open={openBio}
        setOpen={setOpenBio}
        side="center"
      />

      <SheetInfomation
        role={self.role}
        userId={self.id}
        title=""
        description=""
        form={
          <FormInfoDetail
            languageToUse={languageToUse}
            setOpen={setOpenInfoDetail}
            self={self}
          />
        }
        open={openInfoDetail}
        setOpen={setOpenInfoDetail}
        side="custom"
      />

      <span className="text-2xl font-bold pb-5 flex">
        {introductionMessage}
      </span>
      {self.bio ? (
        <>
          <p className="w-full text-center break-words max-w-xs md:max-w-xl mb-6">
            {self.bio}
          </p>
          {showFunction && (
            <>
              {self.id === user?.id && (
                <Button
                  className="w-full mt-4 mb-2"
                  variant="secondary"
                  size="sm"
                  onClick={() => setOpenBio(true)}
                >
                  {editProfileMessage}
                </Button>
              )}
            </>
          )}
        </>
      ) : (
        <>
          {showFunction && (
            <>
              {self.id === user?.id && (
                <Button
                  className="w-full mt-4 mb-2"
                  variant="secondary"
                  size="sm"
                  onClick={() => setOpenBio(true)}
                >
                  {addBioMessage}
                </Button>
              )}
            </>
          )}
        </>
      )}

      {self.showInfomation?.isCreatedAt && (
        <p className="flex items-center my-2">
          <UserPlus className="h-5 w-5 mr-2" />{" "}
          <span>
            {self.createdAt ? (
              <span className="truncate w-80 md:w-96 overflow-hidden whitespace-nowrap">
                <FormatDate data={self.createdAt} />
              </span>
            ) : (
              <>{noDataMessage}</>
            )}{" "}
          </span>
        </p>
      )}

      {self.showInfomation?.isEmail && (
        <p className="flex items-center my-2">
          <Contact className="h-5 w-5 mr-2" />{" "}
          <span>
            {self.email ? (
              <span className="truncate w-80 md:w-96 overflow-hidden whitespace-nowrap">
                {self.email}
              </span>
            ) : (
              <>{noDataMessage}</>
            )}{" "}
          </span>
        </p>
      )}

      {self.showInfomation?.isGender && (
        <p className="flex items-center my-2">
          <User className="h-5 w-5 mr-2" />{" "}
          <span>
            {self.gender === "None" ? <>{noDataMessage}</> : <>{self.gender}</>}
          </span>
        </p>
      )}

      {self.showInfomation?.isPhone && (
        <p className="flex items-center my-2">
          <Phone className="h-5 w-5 mr-2" />{" "}
          <span>
            {self.phonenumber ? (
              <>
                <Link
                  className="cursor-pointer underline truncate w-80 md:w-96 overflow-hidden whitespace-nowrap"
                  href={`tel:${self.phonenumber}`}
                >
                  {self.phonenumber}
                </Link>
              </>
            ) : (
              <>{noDataMessage}</>
            )}
          </span>
        </p>
      )}

      {self.showInfomation?.isDateofBirth && (
        <p className="flex items-center my-2">
          <Cake className="h-5 w-5 mr-2" />{" "}
          <span className="truncate w-80 md:w-96 overflow-hidden whitespace-nowrap">
            {self.dateofbirth ? (
              <>{format(new Date(self.dateofbirth), "dd/MM/yyyy")}</>
            ) : (
              <>{noDataMessage}</>
            )}{" "}
          </span>
        </p>
      )}

      {self.showInfomation?.isAddress && (
        <p className="flex items-center my-2">
          <MapPin className="h-5 w-5 mr-2" />{" "}
          <span>
            {self.address ? (
              <span className="truncate w-80 md:w-96 overflow-hidden whitespace-nowrap">
                {self.address}
              </span>
            ) : (
              <>{noDataMessage}</>
            )}{" "}
          </span>
        </p>
      )}

      {self.showInfomation?.isAdressOther && (
        <p className="flex items-center my-2">
          <MapPin className="h-5 w-5 mr-2" />{" "}
          <span>
            {self.addressother ? (
              <span className="truncate w-80 md:w-96 overflow-hidden whitespace-nowrap">
                {self.addressother}
              </span>
            ) : (
              <>{noDataMessage}</>
            )}
          </span>
        </p>
      )}

      {self.showInfomation?.isFavorite && (
        <p className="flex items-center my-2">
          <BookHeart className="h-5 w-5 mr-2" />{" "}
          <span>
            {self.favorite.length > 0
              ? self.favorite
                  .map((item: string) =>
                    item === "phobien"
                      ? popularMessage
                      : item || notChangeMessage
                  )
                  .join(", ")
              : [notChangeMessage]}
          </span>
        </p>
      )}

      {self.showInfomation?.isSocial && (
        <>
          {self.socialLink.linkfacebook && (
            <p className="flex items-center my-2">
              <Facebook className="h-5 w-5 mr-2" />
              <span className="truncate w-80 md:w-96 overflow-hidden whitespace-nowrap">
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
          )}

          {self.socialLink.linkinstagram && (
            <p className="flex items-center my-2">
              <Instagram className="h-5 w-5 mr-2" />{" "}
              <span className="truncate w-80 md:w-96 overflow-hidden whitespace-nowrap">
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
          )}

          {self.socialLink.linkyoutube && (
            <p className="flex items-center my-2">
              <Youtube className="h-5 w-5 mr-2" />{" "}
              <span className="truncate w-80 md:w-96 overflow-hidden whitespace-nowrap">
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
          )}

          {self.socialLink.linktiktok && (
            <p className="flex items-center my-2">
              <TrendingUp className="h-5 w-5 mr-2" />{" "}
              <span className="truncate w-80 md:w-96 overflow-hidden whitespace-nowrap">
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
          )}

          {self.socialLink.linktwitter && (
            <p className="flex items-center my-2">
              <Twitter className="h-5 w-5 mr-2" />{" "}
              <span className="truncate w-80 md:w-96 overflow-hidden whitespace-nowrap">
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
          )}

          {self.socialLink.linklinkedin && (
            <p className="flex items-center my-2">
              <Linkedin className="h-5 w-5 mr-2" />{" "}
              <span className="truncate w-80 md:w-96 overflow-hidden whitespace-nowrap">
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
          )}

          {self.socialLink.linkwebsite && (
            <p className="flex items-center my-2">
              <Earth className="h-5 w-5 mr-2" />{" "}
              <span className="truncate w-80 md:w-96 overflow-hidden whitespace-nowrap">
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
          )}

          {self.socialLink.linkgithub && (
            <p className="flex items-center my-2">
              <Github className="h-5 w-5 mr-2" />{" "}
              <span className="truncate w-80 md:w-96 overflow-hidden whitespace-nowrap">
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
          )}

          {self.socialLink.linkother && (
            <p className="flex items-center my-2">
              <LinkIcon className="h-5 w-5 mr-2" />{" "}
              <span className="truncate w-80 md:w-96 overflow-hidden whitespace-nowrap">
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
          )}
        </>
      )}

      {!self.bio &&
        !self.showInfomation?.isEmail &&
        !self.showInfomation?.isGender &&
        !self.showInfomation?.isPhone &&
        !self.showInfomation?.isDateofBirth &&
        !self.showInfomation?.isAddress &&
        !self.showInfomation?.isAdressOther &&
        !self.showInfomation?.isFavorite &&
        !self.showInfomation?.isSocial && (
          <div className="text-gray-600 py-3 w-full text-center">
            {noDataMessage}.
          </div>
        )}
      {showFunction && (
        <>
          {self.id === user?.id && (
            <Button
              className="w-full text-white mb-4 mt-2"
              variant="primary"
              size="sm"
              onClick={() => setOpenInfoDetail(true)}
            >
              {editDetailsMessage}
            </Button>
          )}
        </>
      )}
    </div>
  );
};

export default IntroductionUser;
