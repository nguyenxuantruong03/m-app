import { Toggle } from "@/components/ui/toggle";
import { translateTable } from "@/translate/translate-dashboard";
import { Editor } from "@tiptap/react";

interface TablePageProps {
  editor: Editor;
  disabled: boolean;
  languageToUse: string
}
const TablePage: React.FC<TablePageProps> = ({ editor, disabled,languageToUse }) => {
  //language
  const tableMessage = translateTable(languageToUse)
  return (
    <div className="  space-x-3  space-y-3">
      <h2 className="text-lg font-bold text-orange-500">{tableMessage.table}</h2>
      <Toggle
        title={tableMessage.createTable}
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
        {tableMessage.insertTable}
      </Toggle>
      <Toggle
        variant="outline"
        onClick={() => editor.chain().focus().addColumnBefore().run()}
        title={tableMessage.addColumnBefore}
        disabled={disabled}
      >
        {tableMessage.addColumnBefore}
      </Toggle>
      <Toggle
        variant="outline"
        onClick={() => editor.chain().focus().addColumnAfter().run()}
        title={tableMessage.addColumnAfter}
        disabled={disabled}
      >
        {tableMessage.addColumnAfter}
      </Toggle>
      <Toggle
        variant="outline"
        onClick={() => editor.chain().focus().deleteColumn().run()}
        title={tableMessage.deleteColumn}
        disabled={disabled}
      >
        {tableMessage.deleteColumn}
      </Toggle>
      <Toggle
        variant="outline"
        onClick={() => editor.chain().focus().addRowBefore().run()}
        title={tableMessage.addRowBefore}
        disabled={disabled}
      >
        {tableMessage.addRowBefore}
      </Toggle>
      <Toggle
        variant="outline"
        onClick={() => editor.chain().focus().addRowAfter().run()}
        title={tableMessage.addRowAfter}
        disabled={disabled}
      >
        {tableMessage.addRowAfter}
      </Toggle>
      <Toggle
        variant="outline"
        onClick={() => editor.chain().focus().deleteRow().run()}
        title={tableMessage.deleteRow}
        disabled={disabled}
      >
        {tableMessage.deleteRow}
      </Toggle>
      <Toggle
        variant="outline"
        onClick={() => editor.chain().focus().deleteTable().run()}
        title={tableMessage.deleteTable}
        disabled={disabled}
      >
        {tableMessage.deleteTable}
      </Toggle>
      <Toggle
        variant="outline"
        onClick={() => editor.chain().focus().mergeCells().run()}
        title={tableMessage.mergeCells}
        disabled={disabled}
      >
        {tableMessage.mergeCells}
      </Toggle>
      <Toggle
        variant="outline"
        onClick={() => editor.chain().focus().splitCell().run()}
        title={tableMessage.splitCell}
        disabled={disabled}
      >
        {tableMessage.splitCell}
      </Toggle>
      <Toggle
        variant="outline"
        onClick={() => editor.chain().focus().toggleHeaderColumn().run()}
        title={tableMessage.toggleHeaderColumn}
        disabled={disabled}
      >
        {tableMessage.toggleHeaderColumn}
      </Toggle>
      <Toggle
        variant="outline"
        onClick={() => editor.chain().focus().toggleHeaderRow().run()}
        title={tableMessage.toggleHeaderRow}
        disabled={disabled}
      >
        {tableMessage.toggleHeaderRow}
      </Toggle>
      <Toggle
        variant="outline"
        onClick={() => editor.chain().focus().toggleHeaderCell().run()}
        title={tableMessage.toggleHeaderCell}
        disabled={disabled}
      >
        {tableMessage.toggleHeaderCell}
      </Toggle>
      <Toggle
        variant="outline"
        onClick={() => editor.chain().focus().mergeOrSplit().run()}
        title={tableMessage.mergeOrSplit}
        disabled={disabled}
      >
        {tableMessage.mergeOrSplit}
      </Toggle>
      <Toggle
        variant="outline"
        onClick={() =>
          editor.chain().focus().setCellAttribute("colspan", 2).run()
        }
        title={tableMessage.setCellAttribute}
        disabled={disabled}
      >
        {tableMessage.setCellAttribute}
      </Toggle>
      <Toggle
        variant="outline"
        onClick={() => editor.chain().focus().fixTables().run()}
        title={tableMessage.fixTables}
        disabled={disabled}
      >
        {tableMessage.fixTables}
      </Toggle>
      <Toggle
        variant="outline"
        onClick={() => editor.chain().focus().goToNextCell().run()}
        title={tableMessage.goToNextCell}
        disabled={disabled}
      >
        {tableMessage.goToNextCell}
      </Toggle>
      <Toggle
        variant="outline"
        onClick={() => editor.chain().focus().goToPreviousCell().run()}
        title={tableMessage.goToPreviousCell}
        disabled={disabled}
      >
        {tableMessage.goToPreviousCell}
      </Toggle>
    </div>
  );
};

export default TablePage;
