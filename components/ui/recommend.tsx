import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
  import { CircleAlert } from 'lucide-react';

  interface RecommendProps{
    message: string;
  }

const Recommend:React.FC<RecommendProps> = ({message}) => {
    return ( 
        <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
          <CircleAlert className="w-5 h-5 hover:text-green-500 text-yellow-500 shadow-md bg-slate-900 rounded-full"/>
          </TooltipTrigger>
          <TooltipContent>
            <p>{message}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
     );
}
 
export default Recommend;