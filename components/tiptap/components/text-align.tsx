import { Toggle } from "@/components/ui/toggle";
import { Editor } from "@tiptap/react";
import { AlignCenter, AlignJustify, AlignLeft, AlignRight } from "lucide-react";

interface TextAlignProps {
  editor: Editor;
  disabled: boolean;
}
const TextAlignPage: React.FC<TextAlignProps> = ({ editor,disabled }) => {
  return (
    <div>
      <h2 className="text-lg font-bold text-fuchsia-600">TextAlign</h2>
      <Toggle
        size="sm"
        pressed={editor.isActive("left")}
        onPressedChange={() =>
          editor.chain().focus().setTextAlign("left").run()
        }
        title="Text left"
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
        title="Text right"
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
        title="Text center"
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
        title="Text justify"
        disabled={disabled}
      >
        <AlignJustify className="h-4 w-4" />
      </Toggle>
    </div>
  );
};

export default TextAlignPage;
