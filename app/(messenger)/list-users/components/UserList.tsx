'use client';

import { User } from "@prisma/client";

import UserBox from "./UserBox";
import { translatePeopleMessages } from "@/translate/translate-client";

interface UserListProps {
  items: User[];
  language: string;
}

const UserList: React.FC<UserListProps> = ({ 
  items, 
  language
}) => {
  const peopleMessage = translatePeopleMessages(language);

  return ( 
    <aside 
      className="
        fixed 
        inset-y-0 
        pb-20
        lg:pb-0
        lg:left-20 
        lg:w-80 
        lg:block
        overflow-y-auto 
        border-r 
        border-gray-200
        block w-full left-0
      "
    >
      <div className="px-5 space-y-3">
        <div className="flex-col">
          <div 
            className="
              text-2xl 
              font-bold 
              text-slate-900 
              dark:text-slate-200
              py-4
            "
          >
            {peopleMessage}
          </div>
        </div>
        {items.map((item) => (
          <UserBox
            key={item.id}
            data={item}
          />
        ))}
      </div>
    </aside>
  );
}
 
export default UserList;
