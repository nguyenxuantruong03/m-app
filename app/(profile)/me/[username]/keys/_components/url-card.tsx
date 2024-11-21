import { Input } from "@/components/ui/input";
import { CopyButton } from './copy-button';

interface urlCardProps {
  value: string | null;
}

export const UrlCard = ({ value }: urlCardProps) => {
  return (
    <div className="rounded-xl bg-muted p-6">
      <div className="flex items-center gap-x-10">
        <p className="font-semibold shrink-0 text-slate-900 dark:text-slate-200">Server URL</p>
        <div className="space-y-2 w-full">
          <div className="w-full flex items-center gap-x-2">
            <Input 
            value={value || ""}
            disabled
            placeholder="Server URL"
            className="dark:text-slate-200"
            />
            <CopyButton 
            value={value || ""}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
