"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Toolbar from "./toolbar";
import Heading from "@tiptap/extension-heading";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Highlight from "@tiptap/extension-highlight";
import Subscript from "@tiptap/extension-subscript";
import TextAlign from "@tiptap/extension-text-align";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import BulletList from "@tiptap/extension-bullet-list";
import Mention from "@tiptap/extension-mention";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import HardBreak from "@tiptap/extension-hard-break";
import { CodeBlockLowlight } from "@tiptap/extension-code-block-lowlight";
import { common, createLowlight } from "lowlight";
import Blockquote from "@tiptap/extension-blockquote";
import FontFamily from "@tiptap/extension-font-family";
import TextStyle from "@tiptap/extension-text-style";
import "./styles.scss";
import MentionPlugin from "./mention/suggestion";
import Recommend from "../ui/recommend";
import Underline from '@tiptap/extension-underline';

interface Tiptap {
  value: string;
  onChange: (richText: string) => void;
  disabled: boolean;
  isCustom?: boolean;
}

const Tiptap: React.FC<Tiptap> = ({ value, onChange, disabled, isCustom }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ codeBlock: false }),
      Underline,
      Image.configure({
        allowBase64: true,
        inline: true,
        HTMLAttributes: {
          class: "rounded-md w-64 h-64 mx-auto",
        },
      }),
      Heading.configure({
        levels: [1, 2, 3, 4, 5, 6],
      }),
      Link.configure({
        protocols: ["ftp", "mailto"],
      }),
      Highlight.configure({
        multicolor: true,
      }),
      Subscript.configure({}),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      BulletList.configure({
        HTMLAttributes: {
          class: "list-disc",
        },
      }),
      OrderedList.configure({
        HTMLAttributes: {
          class: "list-decimal",
        },
      }),
      ListItem,
      Mention.configure({
        HTMLAttributes: {
          class: "mention",
        },
        suggestion: MentionPlugin(),
      }),
      HorizontalRule,
      HardBreak,
      Blockquote,
      FontFamily,
      TextStyle,
      CodeBlockLowlight.configure({
        lowlight: createLowlight(common),
      }),
    ],
    content: value,
    editorProps: {
      attributes: {
        class: `${
          isCustom
            ? "rounded-md border min-h-[100px] md:min-h-[150px] border-input focus:outline-none p-3 mt-3"
            : "rounded-md border min-h-[150px] border-input focus:outline-none p-3 mt-3"
        }`,
      },
    },
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
  });

  return (
    <div className="flex flex-col justify-stretch min-h-[250px] overflow-y-auto">
      <Toolbar disabled={disabled} editor={editor} isCustom={isCustom} />
      <div className="text-sm flex items-center space-x-3 mt-3">
        Nội dung <span className="text-red-600 pl-1">(*)</span>{" "}
        <Recommend message="Nhập nội dung xong có thể chỉnh sửa lựa chọn các style bên trên." />
      </div>
      <EditorContent disabled={disabled} editor={editor} />
    </div>
  );
};

export default Tiptap;
