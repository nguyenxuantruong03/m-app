import { Toggle } from "@/components/ui/toggle";
import { Editor } from "@tiptap/react";
import { useTranslations } from "next-intl";

interface TablePageProps {
  editor: Editor;
  disabled: boolean;
}
const TablePage: React.FC<TablePageProps> = ({ editor, disabled }) => {
  const t = useTranslations("tiptap.table")
  //language
  return (
    <div className="  space-x-3  space-y-3">
      <h2 className="text-lg font-bold text-orange-500">{t("table")}</h2>
      <Toggle
        title={t("createTable")}
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
        {t("insertTable")}
      </Toggle>
      <Toggle
        variant="outline"
        onClick={() => editor.chain().focus().addColumnBefore().run()}
        title={t("addColumnBefore")}
        disabled={disabled}
      >
        {t("addColumnBefore")}
      </Toggle>
      <Toggle
        variant="outline"
        onClick={() => editor.chain().focus().addColumnAfter().run()}
        title={t("addColumnAfter")}
        disabled={disabled}
      >
        {t("addColumnAfter")}
      </Toggle>
      <Toggle
        variant="outline"
        onClick={() => editor.chain().focus().deleteColumn().run()}
        title={t("deleteColumn")}
        disabled={disabled}
      >
        {t("deleteColumn")}
      </Toggle>
      <Toggle
        variant="outline"
        onClick={() => editor.chain().focus().addRowBefore().run()}
        title={t("addRowBefore")}
        disabled={disabled}
      >
        {t("addRowBefore")}
      </Toggle>
      <Toggle
        variant="outline"
        onClick={() => editor.chain().focus().addRowAfter().run()}
        title={t("addRowAfter")}
        disabled={disabled}
      >
        {t("addRowAfter")}
      </Toggle>
      <Toggle
        variant="outline"
        onClick={() => editor.chain().focus().deleteRow().run()}
        title={t("deleteRow")}
        disabled={disabled}
      >
        {t("deleteRow")}
      </Toggle>
      <Toggle
        variant="outline"
        onClick={() => editor.chain().focus().deleteTable().run()}
        title={t("deleteTable")}
        disabled={disabled}
      >
        {t("deleteTable")}
      </Toggle>
      <Toggle
        variant="outline"
        onClick={() => editor.chain().focus().mergeCells().run()}
        title={t("mergeCells")}
        disabled={disabled}
      >
        {t("mergeCells")}
      </Toggle>
      <Toggle
        variant="outline"
        onClick={() => editor.chain().focus().splitCell().run()}
        title={t("splitCell")}
        disabled={disabled}
      >
        {t("splitCell")}
      </Toggle>
      <Toggle
        variant="outline"
        onClick={() => editor.chain().focus().toggleHeaderColumn().run()}
        title={t("toggleHeaderColumn")}
        disabled={disabled}
      >
        {t("toggleHeaderColumn")}
      </Toggle>
      <Toggle
        variant="outline"
        onClick={() => editor.chain().focus().toggleHeaderRow().run()}
        title={t("toggleHeaderRow")}
        disabled={disabled}
      >
        {t("toggleHeaderRow")}
      </Toggle>
      <Toggle
        variant="outline"
        onClick={() => editor.chain().focus().toggleHeaderCell().run()}
        title={t("toggleHeaderCell")}
        disabled={disabled}
      >
        {t("toggleHeaderCell")}
      </Toggle>
      <Toggle
        variant="outline"
        onClick={() => editor.chain().focus().mergeOrSplit().run()}
        title={t("mergeOrSplit")}
        disabled={disabled}
      >
        {t("mergeOrSplit")}
      </Toggle>
      <Toggle
        variant="outline"
        onClick={() =>
          editor.chain().focus().setCellAttribute("colspan", 2).run()
        }
        title={t("setCellAttribute")}
        disabled={disabled}
      >
        {t("setCellAttribute")}
      </Toggle>
      <Toggle
        variant="outline"
        onClick={() => editor.chain().focus().fixTables().run()}
        title={t("fixTables")}
        disabled={disabled}
      >
        {t("fixTables")}
      </Toggle>
      <Toggle
        variant="outline"
        onClick={() => editor.chain().focus().goToNextCell().run()}
        title={t("goToNextCell")}
        disabled={disabled}
      >
        {t("goToNextCell")}
      </Toggle>
      <Toggle
        variant="outline"
        onClick={() => editor.chain().focus().goToPreviousCell().run()}
        title={t("goToPreviousCell")}
        disabled={disabled}
      >
        {t("goToPreviousCell")}
      </Toggle>
    </div>
  );
};

export default TablePage;
