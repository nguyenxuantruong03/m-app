import Modal from "@/components/ui/modal";

interface SeeDetail4Props {
    isOpen: boolean;
    onClose: () => void;
    message?: string;
    title?: string
}

const SeeDetail4Modal:React.FC<SeeDetail4Props> = ({ isOpen, onClose,message,title }) => {
    return ( 
        <Modal
            title={title || "1 đổi 1 VIP 6 tháng"}
            description={message || "Đổi máy mới tương đương khi có lỗi từ NSX trong 6 tháng"}
            isOpen={isOpen}
            onClose={onClose}
        >
            <div>
                <h1 className=" bg-[#e5002d] rounded-md text-white font-bold p-2"> 1 đổi 1 VIP 12 tháng: Đổi sản phẩm mới tương đương khi có lỗi từ NSX trong 12 tháng</h1>
                    <p className="font-bold">Sản phẩm áp dụng:</p>
                    <p>+ Những đồ điện tử, quạt, có phiếu bảo hành.</p>
                <div className="flex">
                    <p className="font-bold">Thời gian bảo hành:</p>
                    <p className="ml-2"> 6 tháng</p>
                </div>
                    <p className="font-bold">Quyền lợi và dịch vụ bảo hành:</p>
                    <p className="mt-3">+ Bao test 1 đổi 1 toàn bộ linh kiện. </p>
                    <p>+ Không giới hạn số lần bảo hành đổi máy nếu phát sinh lỗi (trong phạm vi bảo hành) trong thời gian tham gia.</p>
                    <p>+ Đổi máy tương đương sản phẩm bảo hành.</p>
                    <div className="flex mt-3">
                    <p className="font-bold">Điều kiện bảo hành:</p>
                    <p className="ml-2">Sản phẩm bị lỗi do nhà sản xuất.</p>
                </div>
                <p>Lưu ý: Gói bảo hành không có hiệu lực với các sản phẩm bị biến dạng so với ban đầu (cấn, móp,cong,vênh, nứt,…) và các sản phẩm bị vào nước hoặc đã được sửa chữa.</p>
                    <p className="font-bold"> Thời gian xử lý:</p>
                    <p className="">+ Trong vòng 24h và tối đa 14 ngày làm việc tùy thuộc vào tình trạng của sản phẩm.</p>
            </div>
        </Modal>
     );
}
 
export default SeeDetail4Modal;