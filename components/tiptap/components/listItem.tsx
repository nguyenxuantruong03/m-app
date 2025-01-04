import { Toggle } from "@/components/ui/toggle";
import { Editor } from "@tiptap/react";
import { List, ListOrdered, ListPlus, ListVideo, ListX } from "lucide-react";
import { useTranslations } from "next-intl";

interface ListItemPageProps {
  editor: Editor;
  disabled: boolean;
}

const ListItemPage: React.FC<ListItemPageProps> = ({ editor, disabled }) => {
  const t = useTranslations("tiptap.listItems")
  return (
    <>
      <h2 className="text-lg font-bold text-violet-600">{t("listItem")}</h2>
      <Toggle
        size="sm"
        pressed={editor.isActive("bulletList")}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive("bulletList") ? "is-active" : ""}
        title={t("list")}
        disabled={disabled}
      >
        <List />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("orderedList")}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive("orderedList") ? "is-active" : ""}
        title={t("numberedList")}
        disabled={disabled}
      >
        <ListOrdered />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("splitItem")}
        onClick={() => editor.chain().focus().splitListItem("listItem").run()}
        disabled={!editor.can().splitListItem("listItem") || disabled}
        title={t("bulletedList")}
      >
        <ListPlus />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("sinkList")}
        onClick={() => editor.chain().focus().sinkListItem("listItem").run()}
        disabled={!editor.can().sinkListItem("listItem") || disabled}
        title={t("nestedList")}
      >
        <ListVideo />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("liftList")}
        onClick={() => editor.chain().focus().liftListItem("listItem").run()}
        disabled={!editor.can().liftListItem("listItem") || disabled}
        title={t("delete")}
      >
        <ListX />
      </Toggle>
    </>
  );
};

export default ListItemPage;
