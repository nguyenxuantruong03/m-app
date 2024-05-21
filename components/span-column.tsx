type Props = {
  children: React.ReactNode;
  onClick:  () => void
};

const SpanColumn = ({ children,onClick }: Props) => {
  return (
    <span
      className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background 
        transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 
        disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground"
        onClick={onClick}
    >
      {children}
    </span>
  );
};

export default SpanColumn;
