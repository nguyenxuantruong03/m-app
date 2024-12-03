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
import { translateHeadings } from "@/translate/translate-dashboard";

interface HeadingPageProps {
  editor: Editor;
  disabled: boolean;
  languageToUse: string;
}

const HeadingPage: React.FC<HeadingPageProps> = ({ editor, disabled,languageToUse }) => {
  //language
  const headingMessage = translateHeadings(languageToUse)
  return (
    <div>
      <h2 className="text-lg font-bold text-blue-600">{headingMessage.heading}</h2>
      <Toggle
        size="sm"
        pressed={editor.isActive("heading1")}
        title={headingMessage.heading1}
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
        title={headingMessage.heading2}
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
        title={headingMessage.heading3}
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
        title={headingMessage.heading4}
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
        title={headingMessage.heading5}
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
        title={headingMessage.heading6}
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
