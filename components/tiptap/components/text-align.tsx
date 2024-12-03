import { Toggle } from "@/components/ui/toggle";
import { translateTextAlign } from "@/translate/translate-dashboard";
import { Editor } from "@tiptap/react";
import { AlignCenter, AlignJustify, AlignLeft, AlignRight } from "lucide-react";

interface TextAlignProps {
  editor: Editor;
  disabled: boolean;
  languageToUse: string;
}
const TextAlignPage: React.FC<TextAlignProps> = ({ editor,disabled,languageToUse }) => {
  //language
  const textAlignMessage = translateTextAlign(languageToUse)
  return (
    <div>
      <h2 className="text-lg font-bold text-fuchsia-600">{textAlignMessage.textAlign}</h2>
      <Toggle
        size="sm"
        pressed={editor.isActive("left")}
        onPressedChange={() =>
          editor.chain().focus().setTextAlign("left").run()
        }
        title={textAlignMessage.textLeft}
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
        title={textAlignMessage.textRight}
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
        title={textAlignMessage.textCenter}
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
        title={textAlignMessage.textJustify}
        disabled={disabled}
      >
        <AlignJustify className="h-4 w-4" />
      </Toggle>
    </div>
  );
};

export default TextAlignPage;
