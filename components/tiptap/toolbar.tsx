"use client";

import { type Editor } from "@tiptap/react";
import { CompactPicker } from "react-color";
import { useState } from "react";
import TextAlignPage from "./components/text-align";
import TaskItemandTasklist from "./components/taskitem-tasklist";
import ExtensionDefaultPage from "./components/extension-default";
import TablePage from "./components/table";
import ListItemPage from "./components/listItem";
import HeadingPage from "./components/heading";
import { ColorResult } from 'react-color';

type Props = {
  editor: Editor | null;
  disabled: boolean;
};

const Toolbar: React.FC<Props> = ({ editor,disabled }) => {
  const [showColorPicker, setShowColorPicker] = useState<boolean>(false);
  const [selectedColor, setSelectedColor] = useState<string>("#ffcc00"); // Màu mặc định

  const handleHighlightColorChange = (color: ColorResult) => {
    setSelectedColor(color.hex);
  };
  const handleHighlightColorSelection = () => {
    if (!editor) return;

    const isActive = editor.isActive("highlight", { color: selectedColor });

    if (isActive) {
      editor
        .chain()
        .focus()
        .unsetMark("highlight")
        .run(); // Cast options to 'any'
    } else {
      editor
        .chain()
        .focus()
        .setMark("highlight", { color: selectedColor })
        .run();
    }
    setShowColorPicker(false);
  };

  if (!editor) {
    return null;
  }

  return (
    <div className="grid grid-cols-2 gap-16">
      <div className="bg-transparent rounded-br-md">
        <ExtensionDefaultPage
          editor={editor}
          showColorPicker={showColorPicker}
          setShowColorPicker={setShowColorPicker}
          disabled={disabled}
        />
        {showColorPicker && (
          <CompactPicker
            color={selectedColor}
            onChange={handleHighlightColorChange}
            onChangeComplete={handleHighlightColorSelection}
          />
        )}

        <HeadingPage editor={editor} disabled={disabled}/>

        <TextAlignPage editor={editor} disabled={disabled}/>

        <ListItemPage editor={editor} disabled={disabled}/>

        <TaskItemandTasklist editor={editor} disabled={disabled}/>

      </div>
      <div className="space-y-3">
        <TablePage editor={editor} disabled={disabled}/>
      </div>
    </div>
  );
};

export default Toolbar;
