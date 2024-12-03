"use client"
import Container from "@/components/ui/container";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useEffect, useState } from "react";

const Policy = () => {
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
  user?.id && user?.role !== "GUEST" ? user?.language : storedLanguage || "vi";

  const getOrderPolicyAndLegalityMessage = (language: string) => {
    switch (language) {
      case "vi":
        return "Chính sách và pháp lý đặt hàng";
      case "en":
        return "Order Policy and Legality";
      case "zh":
        return "订单政策与法律";
      case "fr":
        return "Politique de commande et légalité";
      case "ja":
        return "注文ポリシーと法的事項";
      default:
        return "Order Policy and Legality";
    }
  };

  const getOrderPolicyAndLegalityDetailsMessage = (language: string) => {
    switch (language) {
      case "vi":
        return "Chính sách và pháp lý đặt hàng là những quy định và quy tắc mà các tổ chức, doanh nghiệp và cá nhân phải tuân thủ khi thực hiện quá trình đặt hàng sản phẩm hoặc dịch vụ từ nhà cung cấp. Điều này đảm bảo tính hợp pháp, công bằng và đồng nhất trong quá trình mua bán và giao nhận hàng hóa.";
      case "en":
        return "Order policies and legalities are regulations and rules that organizations, businesses, and individuals must follow when placing an order for products or services from a supplier. This ensures legality, fairness, and consistency in the buying and delivery process.";
      case "zh":
        return "订单政策和法律是组织、企业和个人在从供应商订购产品或服务时必须遵守的规定和规则。这确保了购买和交付过程中的合法性、公平性和一致性。";
      case "fr":
        return "Les politiques et légalité des commandes sont des règlements et des règles que les organisations, entreprises et particuliers doivent respecter lorsqu'ils passent une commande de produits ou de services auprès d'un fournisseur. Cela garantit la légalité, l'équité et la cohérence dans le processus d'achat et de livraison des marchandises.";
      case "ja":
        return "注文ポリシーと法的事項は、組織、企業、個人が供給業者から製品やサービスを注文する際に遵守しなければならない規定とルールです。これにより、購入および配送プロセスにおける合法性、公平性、一貫性が保証されます。";
      default:
        return "Order policies and legalities are regulations and rules that organizations, businesses, and individuals must follow when placing an order for products or services from a supplier. This ensures legality, fairness, and consistency in the buying and delivery process.";
    }
  };

  const getGeneralOrderRegulationsMessage = (language: string) => {
    switch (language) {
      case "vi":
        return "Quy định chung về đặt hàng:";
      case "en":
        return "General Order Regulations:";
      case "zh":
        return "订单通用规定:";
      case "fr":
        return "Réglementations générales sur les commandes:";
      case "ja":
        return "注文に関する一般規定:";
      default:
        return "General Order Regulations:";
    }
  };

  const getGeneralOrderRegulationsDetailsMessage = (language: string) => {
    switch (language) {
      case "vi":
        return "Các quy định chung liên quan đến quy trình đặt hàng, bao gồm các bước thực hiện, thời gian giao hàng, phương thức thanh toán, và các điều kiện vận chuyển hàng hóa.";
      case "en":
        return "General regulations related to the order process, including the steps involved, delivery time, payment methods, and shipping conditions.";
      case "zh":
        return "与订单流程相关的一般规定，包括实施步骤、交货时间、支付方式和货物运输条件。";
      case "fr":
        return "Les réglementations générales liées au processus de commande, y compris les étapes à suivre, le délai de livraison, les méthodes de paiement et les conditions de transport des marchandises.";
      case "ja":
        return "注文プロセスに関する一般的な規定には、実施手順、納期、支払い方法、及び貨物の配送条件が含まれます。";
      default:
        return "General regulations related to the order process, including the steps involved, delivery time, payment methods, and shipping conditions.";
    }
  };

  const getPricingAndPaymentRegulationsMessage = (language: string) => {
    switch (language) {
      case "vi":
        return "Quy định về giá cả và thanh toán:";
      case "en":
        return "Pricing and Payment Regulations:";
      case "zh":
        return "价格和支付规定:";
      case "fr":
        return "Réglementations sur les prix et les paiements:";
      case "ja":
        return "価格および支払い規定:";
      default:
        return "Pricing and Payment Regulations:";
    }
  };

  const getPricingAndPaymentDetailsMessage = (language: string) => {
    switch (language) {
      case "vi":
        return "Xác định giá cả, thuế và các chi phí phát sinh khác liên quan đến quá trình đặt hàng. Bao gồm cả quy định về phương thức thanh toán, điều khoản về hạn thanh toán và việc xác nhận thanh toán.";
      case "en":
        return "Determining prices, taxes, and other additional costs related to the order process. Includes regulations on payment methods, payment terms, and payment confirmation.";
      case "zh":
        return "确定与订单流程相关的价格、税费和其他附加费用。包括支付方式、支付条款和支付确认的规定。";
      case "fr":
        return "Déterminer les prix, les taxes et les autres frais supplémentaires liés au processus de commande. Inclut les réglementations sur les méthodes de paiement, les conditions de paiement et la confirmation de paiement.";
      case "ja":
        return "注文プロセスに関連する価格、税金、その他の追加費用を決定します。支払い方法、支払い条件、支払い確認に関する規定を含みます。";
      default:
        return "Determining prices, taxes, and other additional costs related to the order process. Includes regulations on payment methods, payment terms, and payment confirmation.";
    }
  };

  const getReturnAndExchangeRegulationsMessage = (language: string) => {
    switch (language) {
      case "vi":
        return "Quy định về hoàn trả và đổi trả hàng:";
      case "en":
        return "Return and Exchange Regulations:";
      case "zh":
        return "退货和换货规定:";
      case "fr":
        return "Réglementations sur les retours et les échanges:";
      case "ja":
        return "返品および交換に関する規定:";
      default:
        return "Return and Exchange Regulations:";
    }
  };

  const getOrderConfirmationMessage = (language: string) => {
    switch (language) {
      case "vi":
        return "Trước khi xác nhận đơn hàng, hãy kiểm tra lại thông tin về sản phẩm, số lượng, giá, địa chỉ giao hàng, và phương thức thanh toán để đảm bảo không có sai sót.";
      case "en":
        return "Before confirming the order, please double-check the product information, quantity, price, delivery address, and payment method to ensure there are no errors.";
      case "zh":
        return "在确认订单之前，请仔细检查产品信息、数量、价格、送货地址和支付方式，以确保没有错误。";
      case "fr":
        return "Avant de confirmer la commande, veuillez vérifier les informations sur le produit, la quantité, le prix, l'adresse de livraison et le mode de paiement pour vous assurer qu'il n'y a pas d'erreurs.";
      case "ja":
        return "注文を確認する前に、製品情報、数量、価格、配送先住所、および支払い方法を再確認して、間違いがないことを確認してください。";
      default:
        return "Before confirming the order, please double-check the product information, quantity, price, delivery address, and payment method to ensure there are no errors.";
    }
  };

  const getInformationSecurityMessage = (language: string) => {
    switch (language) {
      case "vi":
        return "Bảo mật thông tin:";
      case "en":
        return "Information Security:";
      case "zh":
        return "信息安全:";
      case "fr":
        return "Sécurité de l'information:";
      case "ja":
        return "情報セキュリティ:";
      default:
        return "Information Security:";
    }
  };

  const getPersonalInformationProtectionMessage = (language: string) => {
    switch (language) {
      case "vi":
        return "Quy định về bảo vệ thông tin cá nhân và quyền riêng tư của khách hàng, đảm bảo rằng thông tin được quản lý và sử dụng một cách an toàn và tuân thủ pháp luật.";
      case "en":
        return "Regulations on protecting customers' personal information and privacy, ensuring that the information is managed and used safely and in compliance with the law.";
      case "zh":
        return "关于保护客户个人信息和隐私的规定，确保信息的管理和使用安全，并符合相关法律法规。";
      case "fr":
        return "Règlement sur la protection des informations personnelles et de la vie privée des clients, garantissant que les informations sont gérées et utilisées de manière sécurisée et conforme à la législation.";
      case "ja":
        return "顧客の個人情報とプライバシーの保護に関する規定、情報が安全に管理され、法律に従って使用されることを保証します。";
      default:
        return "Regulations on protecting customers' personal information and privacy, ensuring that the information is managed and used safely and in compliance with the law.";
    }
  };

  const getReturnAndExchangePolicy = (language: string) => {
    switch (language) {
      case "vi":
        return "Quy định về hoàn trả và đổi trả hàng:";
      case "en":
        return "Return and Exchange Policy:";
      case "zh":
        return "退货和换货政策:";
      case "fr":
        return "Politique de retour et d'échange:";
      case "ja":
        return "返品および交換ポリシー:";
      default:
        return "Return and Exchange Policy:";
    }
  };
  const getReturnExchangeRefundPolicy = (language: string) => {
    switch (language) {
      case "vi":
        return "Các chính sách liên quan đến việc đổi trả, hoàn tiền hoặc sửa chữa sản phẩm nếu có lỗi hoặc không đáp ứng yêu cầu của khách hàng.";
      case "en":
        return "Policies related to returns, refunds, or repairs of products in case of defects or failure to meet customer requirements.";
      case "zh":
        return "有关退货、退款或修理产品的政策，如果产品有缺陷或未能满足客户要求。";
      case "fr":
        return "Les politiques relatives aux retours, remboursements ou réparations des produits en cas de défauts ou de non-conformité aux exigences des clients.";
      case "ja":
        return "製品に欠陥がある場合や、顧客の要求に合わない場合の返品、返金、修理に関するポリシー。";
      default:
        return "Policies related to returns, refunds, or repairs of products in case of defects or failure to meet customer requirements.";
    }
  };

  return (
    <Container>
      <div className="mt-[130px] mb-[20px]">
        <h1 className="text-center text-3xl text-red-600 uppercase">
          {getOrderPolicyAndLegalityMessage(languageToUse)}
        </h1>
        <span className="font-semibold text-slate-900 dark:text-slate-200">
          {getOrderPolicyAndLegalityDetailsMessage(languageToUse)}
        </span>
        <div className="flex space-x-1">
          <h1 className="text-green-600 font-semibold">
            {getGeneralOrderRegulationsMessage(languageToUse)}
          </h1>
          <span className="text-slate-900 dark:text-slate-200">
            {getGeneralOrderRegulationsDetailsMessage(languageToUse)}
          </span>
        </div>
        <h1 className="text-red-600 font-semibold">
          {getPricingAndPaymentRegulationsMessage(languageToUse)}
        </h1>
        <span className="text-slate-900 dark:text-slate-200">
          {getPricingAndPaymentDetailsMessage(languageToUse)}
        </span>
        <h1 className="text-red-600 font-semibold">
          {getReturnAndExchangeRegulationsMessage(languageToUse)}
        </h1>
        <span className="text-slate-900 dark:text-slate-200">
          {getOrderConfirmationMessage(languageToUse)}
        </span>
        <h1 className="text-red-600 font-semibold">
          {getInformationSecurityMessage(languageToUse)}
        </h1>
        <span className="text-slate-900 dark:text-slate-200">
          {getPersonalInformationProtectionMessage(languageToUse)}
        </span>
        <h1 className="text-red-600 font-semibold">
          {getReturnAndExchangePolicy(languageToUse)}
        </h1>
        <span className="text-slate-900 dark:text-slate-200">
          {getReturnExchangeRefundPolicy(languageToUse)}
        </span>
      </div>
    </Container>
  );
};

export default Policy;
