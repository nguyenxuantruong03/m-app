import Modal from "@/components/ui/modal";
import { Product } from "@/types/type";

interface SeeDetailSpecificationsProps {
  data: Product;
  isOpen: boolean;
  onClose: () => void;
  message?: string;
  title?: string;
}

const SeeDetailSpecifications: React.FC<SeeDetailSpecificationsProps> = ({
  data,
  isOpen,
  onClose,
  message,
  title,
}) => {
  const { productdetail } = data;

  // Lấy tất cả các cặp key-value của productdetail
  const specificationEntries = Object.entries(productdetail);
  
  // Tách các description và value thành các cặp
  const specifications = [];
  for (let i = 0; i < specificationEntries.length; i += 2) {
    const desc = specificationEntries[i];
    const value = specificationEntries[i + 1];
    if (
      desc &&
      value &&
      desc[0].startsWith('description') &&
      value[0].startsWith('value') &&
      (desc[1] !== "" && desc[1] !== null) &&
      (value[1] !== "" && value[1] !== null)
    ) {
      specifications.push([desc, value]);
    }
  }

  return (
    <Modal
      title={title || "Bảo vệ sản phẩm toàn diện với dịch vụ bảo hành mở rộng"}
      description={message || "Tổng hợp dịch vụ"}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="w-full space-y-2">
        <div className="bg-[#e5002d] rounded-md text-white font-bold p-2 text-center">
          Thông số kỹ thuật
        </div>
        {specifications.map(([desc, value], index) => (
          <div
            key={index}
            className={`flex justify-between items-center p-2 ${index % 2 === 1 ? 'bg-gray-500 bg-opacity-10 rounded-md' : 'bg-white bg-opacity-10 rounded-md'}`}
          >
             <span>{typeof desc[1] === "string" || typeof desc[1] === "number" ? `${desc[1]}:` : ""}</span>
             <p>{typeof value[1] === "string" || typeof value[1] === "number" ? value[1] : ""}</p>
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default SeeDetailSpecifications;
