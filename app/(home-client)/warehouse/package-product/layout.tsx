import NavbarDelivery from "../components/navDelivery";

export default function SetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex-1 ml-4">
      <NavbarDelivery />
      <div className="flex-1 mt-3">{children}</div>
    </div>
  );
}
