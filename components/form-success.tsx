import { CheckCircle2  } from "lucide-react";

interface FormSuccessProps {
  message?: string;
}

const FormSuccess = ({message}:FormSuccessProps) => {
  if(!message) return null
  return ( 
      <div className="bg-green-500 bg-opacity-20 p-3 rounded-md flex items-center gap-x-2 text-sm text-emerald-500 font-semibold">
          <CheckCircle2 className="w-4 h-4"/>
          <p>{message}</p>
      </div>
   );
}

export default FormSuccess;
