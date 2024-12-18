type ModalProps = {
  isOpen: boolean;
  children: React.ReactNode;
};
const ModalChat = ({ isOpen, children }:ModalProps) => {
    if (!isOpen) return null;
    return (
      <div
        className="fixed z-[9999999999] bottom-[110px] w-full md:w-96 left-0  bg-white rounded-lg shadow-lg md:ml-3"
      >
        {children}
      </div>
    );
  };

  export default ModalChat;