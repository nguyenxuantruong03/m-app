"use client";
import Container from "@/components/ui/container";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useEffect, useState } from "react";

const PromotionalCode = () => {
  const user = useCurrentUser();
  const [storedLanguage, setStoredLanguage] = useState<string | null>(null);

  useEffect(() => {
    // Check if we're running on the client side
    if (typeof window !== "undefined") {
      const language = localStorage.getItem("language");
      setStoredLanguage(language);
    }
  }, []);

  //language
  const languageToUse =
    user?.id && user?.role !== "GUEST"
      ? user?.language
      : storedLanguage || "vi";

  const translatePromotionalCode = (language: string) => {
    switch (language) {
      case "vi":
        return "Mã khuyến mãi"; // Vietnamese
      case "en":
        return "Promotional Code"; // English
      case "zh":
        return "促销代码"; // Chinese
      case "fr":
        return "Code promotionnel"; // French
      case "ja":
        return "プロモーションコード"; // Japanese
      default:
        return "Promotional Code"; // Default case if language is not found
    }
  };

  useEffect(() => {
    document.title = translatePromotionalCode(languageToUse);
  }, []);

  const getDiscountCode = (language: string) => {
    switch (language) {
      case "vi":
        return "Mã ưa đãi";
      case "en":
        return "Discount Code";
      case "zh":
        return "优惠码";
      case "fr":
        return "Code de réduction";
      case "ja":
        return "割引コード";
      default:
        return "Discount Code";
    }
  };

  const getDiscountCodeDescription = (language: string) => {
    switch (language) {
      case "vi":
        return "Mã ưu đãi có thể được cung cấp dưới nhiều hình thức, bao gồm mã giảm giá dựa trên phần trăm hoặc số tiền giảm, quà tặng miễn phí, vận chuyển miễn phí, hoặc các ưu đãi đặc biệt khác. Khách hàng thường nhập mã này vào trang thanh toán khi mua hàng trực tuyến hoặc cung cấp mã này tại cửa hàng để nhận ưu đãi tương ứng.";
      case "en":
        return "Discount codes can be provided in various forms, including percentage-based or amount-based discounts, free gifts, free shipping, or other special offers. Customers typically enter this code on the checkout page when shopping online or provide the code in-store to receive the corresponding benefit.";
      case "zh":
        return "优惠码可以以多种形式提供，包括基于百分比或金额的折扣、免费赠品、免费送货或其他特别优惠。客户通常在在线购物时在结账页面输入该代码，或在店内提供该代码以获得相应的优惠。";
      case "fr":
        return "Les codes de réduction peuvent être fournis sous différentes formes, y compris des réductions basées sur un pourcentage ou un montant, des cadeaux gratuits, la livraison gratuite ou d'autres offres spéciales. Les clients saisissent généralement ce code sur la page de paiement lorsqu'ils achètent en ligne ou fournissent le code en magasin pour bénéficier de l'offre correspondante.";
      case "ja":
        return "割引コードは、パーセント割引や金額割引、無料ギフト、無料配送、またはその他の特別オファーなど、さまざまな形態で提供される場合があります。顧客は通常、オンラインで購入する際にチェックアウトページでこのコードを入力するか、店舗でコードを提供して対応する特典を受けます。";
      default:
        return "Discount codes can be provided in various forms, including percentage-based or amount-based discounts, free gifts, free shipping, or other special offers. Customers typically enter this code on the checkout page when shopping online or provide the code in-store to receive the corresponding benefit.";
    }
  };

  const getPaymentMethodDescription = (language: string) => {
    switch (language) {
      case "vi":
        return "Chuyển khoản hoặc Thanh toán online trên website:";
      case "en":
        return "Bank transfer or Online payment on the website:";
      case "zh":
        return "银行转账或在网站上进行在线支付:";
      case "fr":
        return "Virement bancaire ou Paiement en ligne sur le site Web:";
      case "ja":
        return "銀行振込またはウェブサイトでのオンライン決済:";
      default:
        return "Bank transfer or Online payment on the website:";
    }
  };

  const getBulkPurchaseRewardMessage = (language: string) => {
    switch (language) {
      case "vi":
        return "Sẽ nhận được nhiều quà ưu đãi hơn khi mua với một số lượng lớn.";
      case "en":
        return "You will receive more rewards when purchasing in large quantities.";
      case "zh":
        return "购买大批量时将获得更多优惠礼品。";
      case "fr":
        return "Vous recevrez plus de récompenses lors de l'achat en grande quantité.";
      case "ja":
        return "大量購入すると、より多くの特典がもらえます。";
      default:
        return "You will receive more rewards when purchasing in large quantities.";
    }
  };

  const getDiscountCodeInfo = (language: string) => {
    switch (language) {
      case "vi":
        return "Cách để nhận mã ưu đãi:";
      case "en":
        return "How to receive the discount code:";
      case "zh":
        return "如何获得优惠码：";
      case "fr":
        return "Comment recevoir le code de réduction :";
      case "ja":
        return "割引コードを受け取る方法：";
      default:
        return "How to receive the discount code:";
    }
  };

  const getDiscountCodeProcess = (language: string) => {
    switch (language) {
      case "vi":
        return "Trước tiên, khách hàng phải thanh toán qua Stripe để nhận được một mã ưu đãi ngẫu nhiên.";
      case "en":
        return "First, customers must make a payment through Stripe to receive a random discount code.";
      case "zh":
        return "首先，客户需要通过Stripe进行付款，以获得一个随机的优惠码。";
      case "fr":
        return "Tout d'abord, les clients doivent effectuer un paiement via Stripe pour recevoir un code de réduction aléatoire.";
      case "ja":
        return "まず、顧客はStripeを通じて支払いを行い、ランダムな割引コードを受け取る必要があります。";
      default:
        return "First, customers must make a payment through Stripe to receive a random discount code.";
    }
  };

  const getLuckyWheelOffer = (language: string) => {
    switch (language) {
      case "vi":
        return "Tặng vòng quay may mắn:";
      case "en":
        return "Giveaway lucky wheel:";
      case "zh":
        return "赠送幸运转盘:";
      case "fr":
        return "Offre roue de la chance:";
      case "ja":
        return "ラッキーホイールをプレゼント:";
      default:
        return "Giveaway lucky wheel:";
    }
  };

  const getLuckyWheelOfferDetails = (language: string) => {
    switch (language) {
      case "vi":
        return "Khi mua 1.000.000đ sẽ được tặng 2 vòng quay may mắn, 500.000đ sẽ được tặng 1 vòng quay may mắn.";
      case "en":
        return "When you purchase 1,000,000 VND, you will receive 2 lucky wheels, and with 500,000 VND, you will get 1 lucky wheel.";
      case "zh":
        return "购买1,000,000越南盾将赠送2次幸运转盘，购买500,000越南盾将赠送1次幸运转盘。";
      case "fr":
        return "Pour un achat de 1.000.000 VND, vous recevrez 2 roues de la chance, et pour un achat de 500.000 VND, vous recevrez 1 roue de la chance.";
      case "ja":
        return "1,000,000 VND購入でラッキーホイール2回、500,000 VND購入でラッキーホイール1回がプレゼントされます。";
      default:
        return "When you purchase 1,000,000 VND, you will receive 2 lucky wheels, and with 500,000 VND, you will get 1 lucky wheel.";
    }
  };

  return (
    <Container>
      <div className="mt-[130px] mb-[20px]">
        <h1 className="text-center text-3xl text-red-600 uppercase">
          {getDiscountCode(languageToUse)}
        </h1>
        <span className="font-semibold text-slate-900 dark:text-slate-200">
          {getDiscountCodeDescription(languageToUse)}
        </span>
        <div className="flex space-x-1">
          <h1 className="text-red-600 font-semibold">
            {getPaymentMethodDescription(languageToUse)}
          </h1>
          <span className="text-slate-900 dark:text-slate-200">
            {getBulkPurchaseRewardMessage(languageToUse)}
          </span>
        </div>
        <h1 className="text-red-600 font-semibold">
          {getDiscountCodeInfo(languageToUse)}
        </h1>
        <span className="text-slate-900 dark:text-slate-200">
          {getDiscountCodeProcess(languageToUse)}
        </span>
        <h1 className="text-red-600 font-semibold">
          {getLuckyWheelOffer(languageToUse)}
        </h1>
        <span className="text-slate-900 dark:text-slate-200">
          {getLuckyWheelOfferDetails(languageToUse)}
        </span>
      </div>
    </Container>
  );
};

export default PromotionalCode;
