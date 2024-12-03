import { Toggle } from "@/components/ui/toggle";
import { translateListItems } from "@/translate/translate-dashboard";
import { Editor } from "@tiptap/react";
import { List, ListOrdered, ListPlus, ListVideo, ListX } from "lucide-react";

interface ListItemPageProps {
  editor: Editor;
  disabled: boolean;
  languageToUse: string
}

const ListItemPage: React.FC<ListItemPageProps> = ({ editor, disabled, languageToUse }) => {
  //language
  const listItemMessage = translateListItems(languageToUse)
  return (
    <>
      <h2 className="text-lg font-bold text-violet-600">{listItemMessage.listItem}</h2>
      <Toggle
        size="sm"
        pressed={editor.isActive("bulletList")}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive("bulletList") ? "is-active" : ""}
        title={listItemMessage.list}
        disabled={disabled}
      >
        <List />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("orderedList")}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive("orderedList") ? "is-active" : ""}
        title={listItemMessage.numberedList}
        disabled={disabled}
      >
        <ListOrdered />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("splitItem")}
        onClick={() => editor.chain().focus().splitListItem("listItem").run()}
        disabled={!editor.can().splitListItem("listItem") || disabled}
        title={listItemMessage.bulletedList}
      >
        <ListPlus />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("sinkList")}
        onClick={() => editor.chain().focus().sinkListItem("listItem").run()}
        disabled={!editor.can().sinkListItem("listItem") || disabled}
        title={listItemMessage.nestedList}
      >
        <ListVideo />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("liftList")}
        onClick={() => editor.chain().focus().liftListItem("listItem").run()}
        disabled={!editor.can().liftListItem("listItem") || disabled}
        title={listItemMessage.delete}
      >
        <ListX />
      </Toggle>
    </>
  );
};

export default ListItemPage;
