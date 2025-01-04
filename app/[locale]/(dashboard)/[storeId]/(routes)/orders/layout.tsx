import NavbarOrder from "./components/navbar-order";

export default async function SetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    < div  className="p-8 pt-6">
      <div>
        <NavbarOrder />
      </div>
      <div>{children}</div>
    </div>
  );
}
