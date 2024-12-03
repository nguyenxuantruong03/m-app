"use client";
import Container from "@/components/ui/container";
import Accessory from "./accessory";
import ComputerComponentSmall from "./accessory2";
import Secondhand from "./accessory3";
import { suggestcolor } from "@/components/(client)/color/color";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useEffect, useState } from "react";
import { translateSuggest } from "@/translate/translate-client";

const Suggest = () => {
  const user = useCurrentUser();

  const [storedLanguage, setStoredLanguage] = useState<string | null>(null);

  useEffect(() => {
    // Check if we're running on the client side
    if (typeof window !== "undefined") {
      const language = localStorage.getItem("language");
      setStoredLanguage(language);
    }
  }, []);

  const languageToUse =
    user?.id && user?.role !== "GUEST"
      ? user?.language
      : storedLanguage || "vi";

  const suggestMessage = translateSuggest(languageToUse);

  return (
    <Container>
      <div className=" mt-3 md:mt-10">
        <p className={suggestcolor.textcolor}>{suggestMessage.name}</p>
        <Accessory languageToUse={languageToUse} />
      </div>

      <div className="mt-3 md:mt-10">
        <p className={suggestcolor.textcolor}>{suggestMessage.name2}</p>
        <ComputerComponentSmall languageToUse={languageToUse} />
      </div>

      <div className="mt-3 md:mt-10">
        <p className={suggestcolor.textcolor}>{suggestMessage.name3}</p>
        <Secondhand languageToUse={languageToUse} />
      </div>
    </Container>
  );
};

export default Suggest;
