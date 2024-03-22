import { Editor } from "@tiptap/react";
import {
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
} from "lucide-react";
import { Toggle } from "@/components/ui/toggle";

interface HeadingPageProps {
  editor: Editor;
  disabled: boolean;
}

const HeadingPage: React.FC<HeadingPageProps> = ({ editor, disabled }) => {
  return (
    <div>
      <h2 className="text-lg font-bold text-blue-600">Heading</h2>
      <Toggle
        size="sm"
        pressed={editor.isActive("heading1")}
        title="Heading 1"
        onPressedChange={() =>
          editor.chain().focus().toggleHeading({ level: 1 }).run()
        }
        disabled={disabled}
      >
        <Heading1 />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("heading2")}
        title="Heading 2"
        onPressedChange={() =>
          editor.chain().focus().toggleHeading({ level: 2 }).run()
        }
        disabled={disabled}
      >
        <Heading2 />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("heading3")}
        title="Heading 3"
        onPressedChange={() =>
          editor.chain().focus().toggleHeading({ level: 3 }).run()
        }
        disabled={disabled}
      >
        <Heading3 />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("heading4")}
        title="Heading 4"
        onPressedChange={() =>
          editor.chain().focus().toggleHeading({ level: 4 }).run()
        }
        disabled={disabled}
      >
        <Heading4 />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("heading5")}
        title="Heading 5"
        onPressedChange={() =>
          editor.chain().focus().toggleHeading({ level: 5 }).run()
        }
        disabled={disabled}
      >
        <Heading5 />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("heading6")}
        title="Heading 6"
        onPressedChange={() =>
          editor.chain().focus().toggleHeading({ level: 6 }).run()
        }
        disabled={disabled}
      >
        <Heading6 />
      </Toggle>
    </div>
  );
};

export default HeadingPage;
