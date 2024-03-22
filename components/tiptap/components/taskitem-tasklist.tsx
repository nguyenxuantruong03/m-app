import { Toggle } from "@/components/ui/toggle";
import { Editor } from "@tiptap/react";
import { Brackets, Columns2, Columns3 } from "lucide-react";

interface TaskItemAndTaskListProps {
  editor: Editor;
  disabled: boolean;
}

const TaskItemandTasklist: React.FC<TaskItemAndTaskListProps> = ({
  editor,
  disabled,
}) => {
  return (
    <div>
      <h2 className="text-lg font-bold text-indigo-600">
        TaskItem and TaskList
      </h2>
      <Toggle
        size="sm"
        pressed={editor.isActive("taskList")}
        onPressedChange={() => editor.chain().focus().toggleTaskList().run()}
        title="Danh sách"
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
        title="Thêm mới danh sách"
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
        title="Danh sách chìm"
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
        title="Xóa danh sách"
      >
        <Brackets className="h-4 w-4" />
      </Toggle>
    </div>
  );
};

export default TaskItemandTasklist;
