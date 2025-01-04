import { toast } from "react-hot-toast";
import { useState, useEffect } from "react";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { createViewerToken } from "@/actions/stream/token";
import { useTranslations } from "next-intl";

export const useViewerToken = (hostIdentity: string) => {
  const t = useTranslations()
  const [token, setToken] = useState("");
  const [name, setName] = useState("");
  const [identity, setIdentity] = useState("");

  useEffect(() => {
    const createToken = async () => {
      try {
        const viewerToken = await createViewerToken(hostIdentity);
        setToken(viewerToken);

        const decodedToken = jwtDecode(viewerToken) as JwtPayload & {
          name?: string;
        };

        const name = decodedToken?.name;
        const identity = decodedToken.jti;

        if (identity) {
          setIdentity(identity);
        }

        if (name) {
          setName(name);
        }
      } catch {
        toast.error(t("toastError.somethingWentWrong"));
      }
    };

    createToken();
  }, [hostIdentity]);

  return {
    token,
    name,
    identity
  }
};
