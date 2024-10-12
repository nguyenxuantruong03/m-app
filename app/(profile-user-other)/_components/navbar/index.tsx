import Actions from "./actions";
import { Logo } from "./logo";
import { Search } from "./search";

interface NavbarProps {
  exitLink?: boolean
}

export const Navbar = ({exitLink = false}:NavbarProps) => {
  return (
    <nav
      className="fixed top-0 w-full h-20 z-[9999] bg-[#232731]
     px-2 lg:px-4 flex justify-between items-center shadow-sm"
    >
      <Logo />
      <Search />
      <Actions exitLink={exitLink}/>
    </nav>
  );
};
