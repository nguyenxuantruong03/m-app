"use client";
import {
  Bold,
  Strikethrough,
  Italic,
  BlocksIcon,
  Code,
  Redo,
  Undo,
  Highlighter,
  Subscript,
  Eraser,
  Unlink,
  Link,
  AlignEndHorizontal,
  AlignVerticalSpaceAround,
  Underline,
} from "lucide-react";
import { Editor } from "@tiptap/react";
import { Toggle } from "@/components/ui/toggle";
import { useState } from "react";
import { useTranslations } from "next-intl";
interface ExtensionDefaultPage {
  editor: Editor;
  showColorPicker: boolean;
  setShowColorPicker: React.Dispatch<React.SetStateAction<boolean>>;
  disabled: boolean;
}

const ExtensionDefaultPage: React.FC<ExtensionDefaultPage> = ({
  editor,
  showColorPicker,
  setShowColorPicker,
  disabled,
}) => {
  const t  = useTranslations("tiptap.extension")
  const [selectedFontFamily, setSelectedFontFamily] = useState("Inter"); // Font mặc định

  return (
    <>
      <h2 className="text-lg font-bold text-green-600">{t("default")}</h2>
      <Toggle
        size="sm"
        pressed={editor.isActive("bold")}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
        title={t("bold")}
        disabled={disabled}
      >
        <Bold className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("italic")}
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
        title={t("italic")}
        disabled={disabled}
      >
        <Italic className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("strike")}
        onPressedChange={() => editor.chain().focus().toggleStrike().run()}
        disabled={disabled}
        title={t("strikethrough")}
      >
        <Strikethrough className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("blockquote")}
        onPressedChange={() => editor.chain().focus().toggleBlockquote().run()}
        disabled={disabled}
        title={t("blockquote")}
      >
        <BlocksIcon className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("code")}
        onPressedChange={() => editor.chain().focus().toggleCodeBlock().run()}
        disabled={disabled}
        title={t("code")}
      >
        <Code className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={showColorPicker}
        onPressedChange={() => setShowColorPicker((prev: boolean) => !prev)}
        disabled={disabled}
        title={t("highlight")}
      >
        <Highlighter className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("unhighlight")}
        onPressedChange={() => editor.chain().focus().unsetHighlight().run()}
        disabled={disabled}
        title={t("removeHighlight")}
      >
        <Eraser className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("subscript")}
        onPressedChange={() => editor.chain().focus().toggleSubscript().run()}
        disabled={disabled}
        title={t("subtitle")}
      >
        <Subscript className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("horizontalRule")}
        onPressedChange={() => editor.chain().focus().setHorizontalRule().run()}
        disabled={disabled}
        title={t("horizontalRule")}
      >
        <AlignEndHorizontal className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("underline")}
        onPressedChange={() => editor.chain().focus().toggleUnderline().run()}
        disabled={disabled}
        title={t("underline")}
      >
        <Underline className="h-4 w-4" />
      </Toggle>

      <Toggle
        size="sm"
        pressed={editor.isActive("hardBreak")}
        onPressedChange={() => editor.chain().focus().setHardBreak().run()}
        disabled={disabled}
        title={t("lineHeight")}
      >
        <AlignVerticalSpaceAround className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("link")}
        onPressedChange={() =>
          editor
            .chain()
            .focus()
            .setLink({ href: "https://example.com", target: "_blank" })
            .run()
        }
        disabled={disabled}
        title={t("link")}
      >
        <Link className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("unLink")}
        onPressedChange={() => editor.chain().focus().unsetLink().run()}
        disabled={disabled}
        title={t("unlink")}
      >
        <Unlink className="h-4 w-4" />
      </Toggle>
      <select
        value={selectedFontFamily}
        onChange={(e) => {
          setSelectedFontFamily(e.target.value);
          editor.chain().focus().setFontFamily(e.target.value).run();
        }}
        className="border-2 border-green-600 p-2 cursor-pointer rounded-md"
        disabled={disabled}
      >
        <option value="Inter">Inter</option>
        <option value="Comic Sans MS, Comic Sans">Comic Sans</option>
        <option value="serif">serif</option>
        <option value="monospace">monospace</option>
        <option value="cursive">cursive</option>
        <option value="Sanѕ ѕerif">Sanѕ ѕerif</option>
        <option value="Display"> Display</option>
        <option value="Script">Script</option>
        <option value="Arial"> Arial</option>
        <option value="Times New Roman">Times New Roman</option>
        <option value="Helvetica">Times New Roman</option>
        <option value="Courier new">Courier new</option>
        <option value="Verdana"> Verdana</option>
        <option value="Georgia">Georgia </option>
        <option value="Tahoma"> Tahoma</option>
        <option value="Calibri">Calibri</option>
        <option value="Garamond"> Garamond</option>
        <option value="Bookman">Bookman</option>
      </select>
      <Toggle
        size="sm"
        pressed={editor.isActive("undo")}
        onPressedChange={() => editor.chain().focus().undo().run()}
        disabled={disabled}
        title={t("undo")}
      >
        <Undo className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("redo")}
        onPressedChange={() => editor.chain().focus().redo().run()}
        disabled={disabled}
        title={t("tiptap,extension.redo")}
      >
        <Redo className="h-4 w-4" />
      </Toggle>
    </>
  );
};

export default ExtensionDefaultPage;
