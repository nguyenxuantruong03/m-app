import { Toggle } from "@/components/ui/toggle";
import { Editor } from "@tiptap/react";
import { AlignCenter, AlignJustify, AlignLeft, AlignRight } from "lucide-react";
import { useTranslations } from "next-intl";

interface TextAlignProps {
  editor: Editor;
  disabled: boolean;
}
const TextAlignPage: React.FC<TextAlignProps> = ({ editor,disabled }) => {
  const t = useTranslations("tiptap.textAlign")

  return (
    <div>
      <h2 className="text-lg font-bold text-fuchsia-600">{t("textAlign")}</h2>
      <Toggle
        size="sm"
        pressed={editor.isActive("left")}
        onPressedChange={() =>
          editor.chain().focus().setTextAlign("left").run()
        }
        title={t("textLeft")}
        disabled={disabled}
      >
        <AlignLeft className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("right")}
        onPressedChange={() =>
          editor.chain().focus().setTextAlign("right").run()
        }
        title={t("textRight")}
        disabled={disabled}
      >
        <AlignRight className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("center")}
        onPressedChange={() =>
          editor.chain().focus().setTextAlign("center").run()
        }
        title={t("textCenter")}
        disabled={disabled}
      >
        <AlignCenter className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("justify")}
        onPressedChange={() =>
          editor.chain().focus().setTextAlign("justify").run()
        }
        title={t("textJustify")}
        disabled={disabled}
      >
        <AlignJustify className="h-4 w-4" />
      </Toggle>
    </div>
  );
};

export default TextAlignPage;
