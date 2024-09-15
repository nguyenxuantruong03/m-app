import NavbarDelivery from "./components/navbar-delivery";

export default async function SetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    < div  className="p-8 pt-6">
      <div>
        <NavbarDelivery />
      </div>
      <div>{children}</div>
    </div>
  );
}
