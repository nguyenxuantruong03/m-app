import { AlertTriangle } from 'lucide-react';

interface  FormErrorProps{
    message?: string;
}

const FormError = ({message}:FormErrorProps) => {
    if(!message) return null
    return ( 
        <div className="bg-red-500 bg-opacity-20 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive font-semibold">
            <AlertTriangle className="w-4 h-4"/>
            <p>{message}</p>
        </div>
     );
}
 
export default FormError;