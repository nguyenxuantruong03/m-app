import { Hint } from "@/components/ui/hint";
import MasterCardSVG from "@/public/svg/mastercard";
import StripeSVG from "@/public/svg/stripe";
import VnPaySVG from "@/public/svg/vnpay";
import ZaloPaySVG from "@/public/svg/zalopay";

const PaymentMethod = () => {
  return (
    <>
      <div className=" w-[3.3rem]">
        <Hint label="Stripe">
          <StripeSVG width={50} height={50}/>
        </Hint>
      </div>
      <div className="  w-[3.3rem]">
        <Hint label="MasterCard">
          <MasterCardSVG width={50} height={50}/>
        </Hint>
      </div>
      <div className=" w-14">
        <Hint label="VnPay">
          <VnPaySVG width={50} height={50}/>
        </Hint>
      </div>
      <div className=" w-14">
        <Hint label="ZaloPay">
          <ZaloPaySVG width={50} height={50}/>
        </Hint>
      </div>
    </>
  );
};

export default PaymentMethod;
