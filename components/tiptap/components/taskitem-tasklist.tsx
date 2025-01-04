import { Toggle } from "@/components/ui/toggle";
import { Editor } from "@tiptap/react";
import { Brackets, Columns2, Columns3 } from "lucide-react";
import { useTranslations } from "next-intl";

interface TaskItemAndTaskListProps {
  editor: Editor;
  disabled: boolean;
}

const TaskItemandTasklist: React.FC<TaskItemAndTaskListProps> = ({
  editor,
  disabled,
}) => {
  const t = useTranslations("tiptap.taskList")
  return (
    <div>
      <h2 className="text-lg font-bold text-indigo-600">
        {t("taskItemAndTaskList")}
      </h2>
      <Toggle
        size="sm"
        pressed={editor.isActive("taskList")}
        onPressedChange={() => editor.chain().focus().toggleTaskList().run()}
        title={t("list")}
        disabled={disabled}
      >
        <Brackets className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("splitItem")}
        onPressedChange={() =>
          editor.chain().focus().splitListItem("taskItem").run()
        }
        title={t("addNewList")}
        disabled={!editor.can().splitListItem("taskItem") || disabled}
      >
        <Columns2 className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("sinkList")}
        onPressedChange={() =>
          editor.chain().focus().sinkListItem("taskItem").run()
        }
        disabled={!editor.can().sinkListItem("taskItem") || disabled}
        title={t("nestedList")}
      >
        <Columns3 className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("liftList")}
        onPressedChange={() =>
          editor.chain().focus().liftListItem("taskItem").run()
        }
        disabled={!editor.can().liftListItem("taskItem") || disabled}
        title={t("deleteList")}
      >
        <Brackets className="h-4 w-4" />
      </Toggle>
    </div>
  );
};

export default TaskItemandTasklist;
