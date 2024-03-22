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
} from "lucide-react";
import { Editor } from "@tiptap/react";
import { Toggle } from "@/components/ui/toggle";
import { useState } from "react";
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
  const [selectedFontFamily, setSelectedFontFamily] = useState("Inter"); // Font mặc định
  return (
    <>
      <h2 className="text-lg font-bold text-green-600">Default</h2>
      <Toggle
        size="sm"
        pressed={editor.isActive("bold")}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
        title="Chữ đậm"
        disabled={disabled}
      >
        <Bold className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("italic")}
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
        title="Chữ nghiêng"
        disabled={disabled}
      >
        <Italic className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("strike")}
        onPressedChange={() => editor.chain().focus().toggleStrike().run()}
        disabled={disabled}
        title="Gạch ngang"
      >
        <Strikethrough className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("blockquote")}
        onPressedChange={() => editor.chain().focus().toggleBlockquote().run()}
        disabled={disabled}
        title="Khôi trích dẫn"
      >
        <BlocksIcon className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("code")}
        onPressedChange={() => editor.chain().focus().toggleCodeBlock().run()}
        disabled={disabled}
        title="Chữ code"
      >
        <Code className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={showColorPicker}
        onPressedChange={() => setShowColorPicker((prev: boolean) => !prev)}
        disabled={disabled}
        title="Nổi bật"
      >
        <Highlighter className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("unhighlight")}
        onPressedChange={() => editor.chain().focus().unsetHighlight().run()}
        disabled={disabled}
        title="Xóa nổi bật"
      >
        <Eraser className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("subscript")}
        onPressedChange={() => editor.chain().focus().toggleSubscript().run()}
        disabled={disabled}
        title="Phụ đề"
      >
        <Subscript className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("horizontalRule")}
        onPressedChange={() => editor.chain().focus().setHorizontalRule().run()}
        disabled={disabled}
        title="Gạch ngang"
      >
        <AlignEndHorizontal className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("hardBreak")}
        onPressedChange={() => editor.chain().focus().setHardBreak().run()}
        disabled={disabled}
        title="Line Height"
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
        title="Link"
      >
        <Link className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("unLink")}
        onPressedChange={() => editor.chain().focus().unsetLink().run()}
        disabled={disabled}
        title="Un link"
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
        title="Hoàn tác"
      >
        <Undo className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("redo")}
        onPressedChange={() => editor.chain().focus().redo().run()}
        disabled={disabled}
        title="Làm lại"
      >
        <Redo className="h-4 w-4" />
      </Toggle>
    </>
  );
};

export default ExtensionDefaultPage;
