"use client";

import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";
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
} from "lucide-react";
import FormInfoDetail from "./form-infodetail";

interface IntroductionUserProps {
  self: any;
}

const IntroductionUser = ({ self }: IntroductionUserProps) => {
  const user = useCurrentUser();
  const [openBio, setOpenBio] = useState(false);
  const [openInfoDetail, setOpenInfoDetail] = useState(false);

  return (
    <div className="bg-slate-900 rounded-md text-white py-2 px-5 space-y-2">
      <SheetInfomation
        role={self.role}
        userId={self.id}
        title=""
        description=""
        form={<FormBio setOpen={setOpenBio} />}
        open={openBio}
        setOpen={setOpenBio}
        side="center"
      />

      <SheetInfomation
        role={self.role}
        userId={self.id}
        title=""
        description=""
        form={<FormInfoDetail setOpen={setOpenInfoDetail} self={self} />}
        open={openInfoDetail}
        setOpen={setOpenInfoDetail}
        side="custom"
      />

      <span className="text-2xl font-bold">Giới thiệu</span>
      {self.bio ? (
        <>
          <p className="w-full text-center">
            <span>{self.bio} </span>
          </p>
          {self.id === user?.id && (
            <Button
              className="w-full"
              variant="secondary"
              size="sm"
              onClick={() => setOpenBio(true)}
            >
              Chỉnh sửa tiểu sử
            </Button>
          )}
        </>
      ) : (
        <>
          {self.id === user?.id && (
            <Button
              className="w-full"
              variant="secondary"
              size="sm"
              onClick={() => setOpenBio(true)}
            >
              Thêm tiểu sử{" "}
            </Button>
          )}
        </>
      )}
      
      {self.showInfomation.isEmail && (
        <p className="flex items-center">
          <Contact className="h-5 w-5 mr-2" />{" "}
          <span>{self.email ? <>{self.email}</> : <>Không có</>} </span>
        </p>
      )}

      {self.showInfomation.isGender && (
        <p className="flex items-center">
          <User className="h-5 w-5 mr-2" />{" "}
          <span>
            {self.gender === "None" ? <>Không có</> : <>{self.gender}</>}
          </span>
        </p>
      )}

      {self.showInfomation.isPhone && (
        <p className="flex items-center">
          <Phone className="h-5 w-5 mr-2" />{" "}
          <span>
            {self.phonenumber ? <><Link className="cursor-pointer underline" href={`tel:${self.phonenumber}`}>{self.phonenumber}</Link></> : <>Không có</>}
          </span>
        </p>
      )}

      {self.showInfomation.isDateofBirth && (
        <p className="flex items-center">
          <Cake className="h-5 w-5 mr-2" />{" "}
          <span>
            {self.dateofbirth ? (
              <>{format(new Date(self.dateofbirth), "dd/MM/yyyy")}</>
            ) : (
              <>Không có</>
            )}{" "}
          </span>
        </p>
      )}

      {self.showInfomation.isAddress && (
        <p className="flex items-center">
          <MapPin className="h-5 w-5 mr-2" />{" "}
          <span>{self.address ? <>{self.address}</> : <>Không có</>} </span>
        </p>
      )}

      {self.showInfomation.isAdressOther && (
        <p className="flex items-center">
          <MapPin className="h-5 w-5 mr-2" />{" "}
          <span>
            {self.addressother ? <>{self.addressother}</> : <>Không có</>}{" "}
          </span>
        </p>
      )}

      {self.showInfomation.isFavorite && (
        <p className="flex items-center">
          <BookHeart className="h-5 w-5 mr-2" />{" "}
          <span>
            {self.favorite.length > 0
              ? self.favorite
                  .map((item: string) =>
                    item === "phobien" ? "Phổ biến" : item || "Chưa thay đổi"
                  )
                  .join(", ")
              : ["Chưa thay đổi"]}{" "}
          </span>
        </p>
      )}

      {self.showInfomation.isSocial && (
        <>
          {self.socialLink.linkfacebook && (
            <p className="flex items-center">
              <Facebook className="h-5 w-5 mr-2" />
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
          )}

          {self.socialLink.linkinstagram && (
            <p className="flex items-center">
              <Instagram className="h-5 w-5 mr-2" />{" "}
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
          )}

          {self.socialLink.linkyoutube && (
            <p className="flex items-center">
              <Youtube className="h-5 w-5 mr-2" />{" "}
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
          )}

          {self.socialLink.linktiktok && (
            <p className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2" />{" "}
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
          )}

          {self.socialLink.linktwitter && (
            <p className="flex items-center">
              <Twitter className="h-5 w-5 mr-2" />{" "}
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
          )}

          {self.socialLink.linklinkedin && (
            <p className="flex items-center">
              <Linkedin className="h-5 w-5 mr-2" />{" "}
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
          )}

          {self.socialLink.linkwebsite && (
            <p className="flex items-center">
              <Earth className="h-5 w-5 mr-2" />{" "}
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
          )}

          {self.socialLink.linkgithub && (
            <p className="flex items-center">
              <Github className="h-5 w-5 mr-2" />{" "}
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
          )}

          {self.socialLink.linkother && (
            <p className="flex items-center">
              <LinkIcon className="h-5 w-5 mr-2" />{" "}
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
          )}
        </>
      )}

      {!self.bio &&
        !self.showInfomation.isEmail &&
        !self.showInfomation.isGender &&
        !self.showInfomation.isPhone &&
        !self.showInfomation.isDateofBirth &&
        !self.showInfomation.isAddress &&
        !self.showInfomation.isAdressOther &&
        !self.showInfomation.isFavorite &&
        !self.showInfomation.isSocial && (
          <div className="text-gray-600 py-3 w-full text-center">Không có.</div>
        )}

      {self.id === user?.id && (
        <Button
          className="w-full text-white"
          variant="primary"
          size="sm"
          onClick={() => setOpenInfoDetail(true)}
        >
          Chỉnh sửa chi tiết
        </Button>
      )}
    </div>
  );
};

export default IntroductionUser;
