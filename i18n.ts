import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';
import { currentUser } from './lib/auth';
 
// Can be imported from a shared config
export const locales = ['vi', 'en'];
 
export default getRequestConfig(async ({locale}) => {
  const user = await currentUser()
  const language = user?.language
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(language || locale || "vi")) notFound();
 
  return {
    messages: (await import(`/messages/${language || locale || "vi"}.json`)).default
  };
});