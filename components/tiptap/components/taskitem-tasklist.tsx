import { Toggle } from "@/components/ui/toggle";
import { translateTaskList } from "@/translate/translate-dashboard";
import { Editor } from "@tiptap/react";
import { Brackets, Columns2, Columns3 } from "lucide-react";

interface TaskItemAndTaskListProps {
  editor: Editor;
  disabled: boolean;
  languageToUse: string;
}

const TaskItemandTasklist: React.FC<TaskItemAndTaskListProps> = ({
  editor,
  disabled,
  languageToUse
}) => {
  //language
  const taskListMessage = translateTaskList(languageToUse)
  return (
    <div>
      <h2 className="text-lg font-bold text-indigo-600">
        {taskListMessage.taskItemAndTaskList}
      </h2>
      <Toggle
        size="sm"
        pressed={editor.isActive("taskList")}
        onPressedChange={() => editor.chain().focus().toggleTaskList().run()}
        title={taskListMessage.list}
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
        title={taskListMessage.addNewList}
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
        title={taskListMessage.nestedList}
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
        title={taskListMessage.deleteList}
      >
        <Brackets className="h-4 w-4" />
      </Toggle>
    </div>
  );
};

export default TaskItemandTasklist;
