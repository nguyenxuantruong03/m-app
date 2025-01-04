import Actions from "./actions";
import { Logo } from "./logo";
import { Search } from "./search";

interface NavbarProps {
  exitLink?: boolean
}

export const Navbar = ({exitLink = false}:NavbarProps) => {
  return (
    <nav
      className="fixed space-x-2 top-0 w-full h-20 z-[9999] bg-[#232731]
     px-1 lg:px-4 flex justify-between items-center shadow-sm"
    >
      {
        !exitLink && (
          <Logo />
        )
      }
      <Search />
      <Actions exitLink={exitLink}/>
    </nav>
  );
};
