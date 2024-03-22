import { Toggle } from "@/components/ui/toggle";
import { Editor } from "@tiptap/react";

interface TablePageProps {
  editor: Editor;
  disabled: boolean;
}
const TablePage: React.FC<TablePageProps> = ({ editor, disabled }) => {
  return (
    <div className="  space-x-3  space-y-3">
      <h2 className="text-lg font-bold text-orange-500">Table</h2>
      <Toggle
        title="Tạo bảng"
        variant="outline"
        onClick={() =>
          editor
            .chain()
            .focus()
            .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
            .run()
        }
        disabled={disabled}
      >
        insertTable
      </Toggle>
      <Toggle
        variant="outline"
        onClick={() => editor.chain().focus().addColumnBefore().run()}
        title="Thêm 1 cột trước"
        disabled={disabled}
      >
        addColumnBefore
      </Toggle>
      <Toggle
        variant="outline"
        onClick={() => editor.chain().focus().addColumnAfter().run()}
        title="Thêm 1 cột sau"
        disabled={disabled}
      >
        addColumnAfter
      </Toggle>
      <Toggle
        variant="outline"
        onClick={() => editor.chain().focus().deleteColumn().run()}
        title="Xóa 1 cột"
        disabled={disabled}
      >
        deleteColumn
      </Toggle>
      <Toggle
        variant="outline"
        onClick={() => editor.chain().focus().addRowBefore().run()}
        title="Thêm 1 hàng ngang trước"
        disabled={disabled}
      >
        addRowBefore
      </Toggle>
      <Toggle
        variant="outline"
        onClick={() => editor.chain().focus().addRowAfter().run()}
        title="Thêm 1 hàng ngang sau"
        disabled={disabled}
      >
        addRowAfter
      </Toggle>
      <Toggle
        variant="outline"
        onClick={() => editor.chain().focus().deleteRow().run()}
        title="Xóa 1 hàng ngang"
        disabled={disabled}
      >
        deleteRow
      </Toggle>
      <Toggle
        variant="outline"
        onClick={() => editor.chain().focus().deleteTable().run()}
        title="Xóa bảng "
        disabled={disabled}
      >
        deleteTable
      </Toggle>
      <Toggle
        variant="outline"
        onClick={() => editor.chain().focus().mergeCells().run()}
        title="Hơp nhất các ô"
        disabled={disabled}
      >
        mergeCells
      </Toggle>
      <Toggle
        variant="outline"
        onClick={() => editor.chain().focus().splitCell().run()}
        title="Chia ô"
        disabled={disabled}
      >
        splitCell
      </Toggle>
      <Toggle
        variant="outline"
        onClick={() => editor.chain().focus().toggleHeaderColumn().run()}
        title="Tô đậm 1 cột"
        disabled={disabled}
      >
        toggleHeaderColumn
      </Toggle>
      <Toggle
        variant="outline"
        onClick={() => editor.chain().focus().toggleHeaderRow().run()}
        title="Tô đậm 1 hàng ngang"
        disabled={disabled}
      >
        toggleHeaderRow
      </Toggle>
      <Toggle
        variant="outline"
        onClick={() => editor.chain().focus().toggleHeaderCell().run()}
        title="Tô đậm 1"
        disabled={disabled}
      >
        toggleHeaderCell
      </Toggle>
      <Toggle
        variant="outline"
        onClick={() => editor.chain().focus().mergeOrSplit().run()}
        title="Hợp nhất hoặc tách"
        disabled={disabled}
      >
        mergeOrSplit
      </Toggle>
      <Toggle
        variant="outline"
        onClick={() =>
          editor.chain().focus().setCellAttribute("colspan", 2).run()
        }
        title="Đặt thuộc tính ô"
        disabled={disabled}
      >
        setCellAttribute
      </Toggle>
      <Toggle
        variant="outline"
        onClick={() => editor.chain().focus().fixTables().run()}
        title="Sửa bảng"
        disabled={disabled}
      >
        fixTables
      </Toggle>
      <Toggle
        variant="outline"
        onClick={() => editor.chain().focus().goToNextCell().run()}
        title="Đi đến ô kế"
        disabled={disabled}
      >
        goToNextCell
      </Toggle>
      <Toggle
        variant="outline"
        onClick={() => editor.chain().focus().goToPreviousCell().run()}
        title="Đi đến ô trước"
        disabled={disabled}
      >
        goToPreviousCell
      </Toggle>
    </div>
  );
};

export default TablePage;
