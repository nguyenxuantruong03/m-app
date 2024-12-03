"use client";
import Container from "@/components/ui/container";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useEffect, useState } from "react";

const Preorder = () => {
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

  const translateOrderMethod = (language: string) => {
    switch (language) {
      case "vi":
        return "Đặt hàng trước trả tiền khi nhận";
      case "en":
        return "Pre-order and pay upon receipt";
      case "zh":
        return "预订并在收到时付款";
      case "fr":
        return "Commander à l'avance et payer à la réception";
      case "ja":
        return "前注文して、受け取る際に支払う";
      default:
        return "Language not supported";
    }
  };

  const translateOrderModel = (language: string) => {
    switch (language) {
      case "vi":
        return "Đặt hàng trước và trả tiền khi nhận là một mô hình mua sắm phổ biến và linh hoạt mà nhiều người tiêu dùng lựa chọn. Thực tế, đây là một xu hướng mà nhiều doanh nghiệp và cửa hàng đã áp dụng để tối ưu hóa trải nghiệm mua sắm của khách hàng và giải quyết một số vấn đề liên quan đến thanh toán và đảm bảo sự hài lòng của người tiêu dùng.";
      case "en":
        return "Pre-ordering and paying upon delivery is a popular and flexible shopping model that many consumers choose. In fact, this is a trend that many businesses and stores have adopted to optimize the customer shopping experience and address payment issues while ensuring consumer satisfaction.";
      case "zh":
        return "预订并在收到商品时付款是许多消费者选择的一种流行且灵活的购物模式。事实上，这是许多企业和商店已经采用的趋势，以优化顾客的购物体验，解决与付款相关的问题，并确保消费者的满意度。";
      case "fr":
        return "Commander à l'avance et payer à la livraison est un modèle d'achat populaire et flexible que de nombreux consommateurs choisissent. En fait, c'est une tendance que de nombreuses entreprises et magasins ont adoptée pour optimiser l'expérience d'achat des clients et résoudre certains problèmes liés au paiement tout en garantissant la satisfaction des consommateurs.";
      case "ja":
        return "前払いと受け取り時の支払いは、多くの消費者が選ぶ人気のある柔軟なショッピングモデルです。実際、これは多くの企業や店舗が採用しており、顧客のショッピング体験を最適化し、支払いに関する問題を解決し、消費者の満足を確保するためのトレンドです。";
      default:
        return "Language not supported";
    }
  };

  const translateRiskReduction = (language: string) => {
    switch (language) {
      case "vi":
        return "Giảm rủi ro:";
      case "en":
        return "Reduce risk:";
      case "zh":
        return "降低风险:";
      case "fr":
        return "Réduire les risques:";
      case "ja":
        return "リスクの軽減:";
      default:
        return "Language not supported:";
    }
  };

  const translatePaymentOnDelivery = (language: string) => {
    switch (language) {
      case "vi":
        return "Việc thanh toán khi nhận hàng giúp tránh những tình huống không mong muốn, như sản phẩm không đúng mẫu mã, không đủ chất lượng hoặc không đúng yêu cầu của khách hàng. Người mua chỉ trả tiền khi thực sự hài lòng với sản phẩm hoặc dịch vụ đã nhận.";
      case "en":
        return "Paying upon delivery helps avoid unwanted situations, such as receiving products that are not the correct model, not of sufficient quality, or do not meet the customer's requirements. The buyer only pays when they are truly satisfied with the product or service received.";
      case "zh":
        return "货到付款有助于避免不希望发生的情况，例如收到的产品与样式不符、质量不合格或不符合客户要求。买家只有在真正满意收到的产品或服务时才付款。";
      case "fr":
        return "Payer à la livraison permet d'éviter des situations indésirables, comme recevoir des produits qui ne correspondent pas au modèle, qui ne sont pas de qualité suffisante ou qui ne répondent pas aux exigences du client. L'acheteur ne paie que lorsqu'il est réellement satisfait du produit ou service reçu.";
      case "ja":
        return "商品到着時に支払うことは、望ましくない状況を避けるのに役立ちます。たとえば、製品がモデルと異なる、品質が不十分である、または顧客の要求に合わない場合です。購入者は、受け取った商品やサービスに本当に満足している場合にのみ支払います。";
      default:
        return "Language not supported";
    }
  };

  const translateIncreaseReliability = (language: string) => {
    switch (language) {
      case "vi":
        return "Tăng độ tin cậy:";
      case "en":
        return "Increase reliability:";
      case "zh":
        return "提高可靠性:";
      case "fr":
        return "Augmenter la fiabilité:";
      case "ja":
        return "信頼性の向上:";
      default:
        return "Language not supported:";
    }
  };

  const translateTrustBuildingModel = (language: string) => {
    switch (language) {
      case "vi":
        return "Mô hình này tạo sự tin cậy cho khách hàng vì họ có thể kiểm tra sản phẩm trước khi trả tiền. Điều này đặc biệt quan trọng đối với các sản phẩm có giá trị lớn hoặc khi mua từ các nhà cung cấp mới.";
      case "en":
        return "This model builds trust with customers because they can inspect the product before paying. This is especially important for high-value products or when buying from new suppliers.";
      case "zh":
        return "这个模型通过让客户在付款前检查产品来建立信任。这对于高价值产品或从新供应商购买时尤其重要。";
      case "fr":
        return "Ce modèle crée de la confiance chez les clients car ils peuvent vérifier le produit avant de payer. Cela est particulièrement important pour les produits de grande valeur ou lorsqu'ils achètent chez de nouveaux fournisseurs.";
      case "ja":
        return "このモデルは、顧客が支払い前に商品を確認できるため、信頼を築きます。これは、高価な製品や新しい供給者から購入する場合に特に重要です。";
      default:
        return "Language not supported";
    }
  };

  const translateOrderConfirmation = (language: string) => {
    switch (language) {
      case "vi":
        return "Xác nhận đơn hàng:";
      case "en":
        return "Order confirmation:";
      case "zh":
        return "订单确认:";
      case "fr":
        return "Confirmation de commande:";
      case "ja":
        return "注文確認:";
      default:
        return "Language not supported:";
    }
  };

  const translateOrderProcess = (language: string) => {
    switch (language) {
      case "vi":
        return "Cửa hàng xác nhận đơn hàng và tiến hành giao hàng đến địa chỉ khách hàng chỉ định. Khách hàng kiểm tra sản phẩm hoặc dịch vụ sau khi nhận hàng. Sau khi kiểm tra và hài lòng, khách hàng thanh toán tiền cho đơn hàng đã nhận.";
      case "en":
        return "The store confirms the order and proceeds with delivery to the customer's designated address. The customer inspects the product or service after receiving it. After checking and being satisfied, the customer pays for the order received.";
      case "zh":
        return "商店确认订单并将商品送到客户指定的地址。客户在收到商品后检查产品或服务。检查并满意后，客户支付已收到的订单款项。";
      case "fr":
        return "Le magasin confirme la commande et procède à la livraison à l'adresse désignée par le client. Le client vérifie le produit ou le service après l'avoir reçu. Après avoir vérifié et être satisfait, le client paie pour la commande reçue.";
      case "ja":
        return "店舗は注文を確認し、顧客指定の住所に配達を進めます。顧客は商品またはサービスを受け取った後に確認します。確認して満足した後、顧客は受け取った注文に対して支払いを行います。";
      default:
        return "Language not supported";
    }
  };

  return (
    <Container>
      <div className="mt-[130px] mb-[20px]">
        <h1 className="text-center text-3xl text-red-600 uppercase">
          {translateOrderMethod(languageToUse)}
        </h1>
        <span className="font-semibold text-slate-900 dark:text-slate-200">
          {translateOrderModel(languageToUse)}
        </span>
        <div className="flex space-x-2">
          <h1 className="text-green-600 font-semibold">
            {" "}
            {translateRiskReduction(languageToUse)}
          </h1>
          <span className="text-slate-900 dark:text-slate-200">
            {translatePaymentOnDelivery(languageToUse)}
          </span>
        </div>
        <h1 className="text-red-600 font-semibold">
          {" "}
          {translateIncreaseReliability(languageToUse)}{" "}
        </h1>
        <span className="text-slate-900 dark:text-slate-200">
          {translateTrustBuildingModel(languageToUse)}
        </span>
        <h1 className="text-red-600 font-semibold">
          {translateOrderConfirmation(languageToUse)}
        </h1>
        <span className="text-slate-900 dark:text-slate-200">
          {translateOrderProcess(languageToUse)}
        </span>
      </div>
    </Container>
  );
};

export default Preorder;
