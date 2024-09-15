import InfoDelivery from "./components/infouser-delivery";

export default function SetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="px-4 py-8 sm:px-6 xl:px-0 mt-20 flex max-w-7xl mx-auto">
      <InfoDelivery />
      <div className="flex-1">{children}</div>
    </div>
  );
}
