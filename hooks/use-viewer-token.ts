import { toast } from "react-hot-toast";
import { useState, useEffect } from "react";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { createViewerToken } from "@/actions/stream/token";
import { getToastError } from "@/translate/translate-client";

export const useViewerToken = (hostIdentity: string, languageToUse: string) => {
  const [token, setToken] = useState("");
  const [name, setName] = useState("");
  const [identity, setIdentity] = useState("");

  const toastErrorMessage = getToastError(languageToUse);

  useEffect(() => {
    const createToken = async () => {
      try {
        const viewerToken = await createViewerToken(hostIdentity,languageToUse);
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
        toast.error(toastErrorMessage);
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
