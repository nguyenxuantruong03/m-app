"use client"
import Container from "@/components/ui/container";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useEffect, useState } from "react";

const Guarantee = () => {
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
  
  const getWarrantyPolicyMessage = (language: string) => {
    switch (language) {
      case "vi":
        return "Chính sách Bảo hành";
      case "en":
        return "Warranty Policy";
      case "zh":
        return "保修政策";
      case "fr":
        return "Politique de garantie";
      case "ja":
        return "保証ポリシー";
      default:
        return "Warranty Policy";
    }
  };

  const getWarrantyPeriodMessage = (language: string) => {
    switch (language) {
      case "vi":
        return "Thời gian bảo hành:";
      case "en":
        return "Warranty Period:";
      case "zh":
        return "保修期:";
      case "fr":
        return "Période de garantie:";
      case "ja":
        return "保証期間:";
      default:
        return "Warranty Period:";
    }
  };

  const getWarrantyDescriptionMessage = (language: string) => {
    switch (language) {
      case "vi":
        return "Thời gian bảo hành thường được quy định từ trước bởi nhà sản xuất hoặc nhà cung cấp dựa trên loại sản phẩm. Đối với đồ điện tử và điện nước, thời gian bảo hành thường nằm trong khoảng từ 6 tháng đến 2 năm. Một số sản phẩm cao cấp có thể có thời gian bảo hành lâu hơn.";
      case "en":
        return "The warranty period is usually predetermined by the manufacturer or supplier based on the type of product. For electronics and electrical items, the warranty period typically ranges from 6 months to 2 years. Some premium products may have a longer warranty period.";
      case "zh":
        return "保修期通常由制造商或供应商根据产品类型预先规定。对于电子产品和电器，保修期通常在6个月到2年之间。一些高端产品可能有更长的保修期。";
      case "fr":
        return "La période de garantie est généralement prédéfinie par le fabricant ou le fournisseur en fonction du type de produit. Pour les produits électroniques et électriques, la période de garantie est généralement comprise entre 6 mois et 2 ans. Certains produits haut de gamme peuvent bénéficier d'une période de garantie plus longue.";
      case "ja":
        return "保証期間は通常、製造業者または供給業者によって製品の種類に基づいて事前に定められています。電子機器や電気製品の場合、保証期間は通常6ヶ月から2年の間です。一部の高級製品には、より長い保証期間がある場合があります。";
      default:
        return "The warranty period is usually predetermined by the manufacturer or supplier based on the type of product. For electronics and electrical items, the warranty period typically ranges from 6 months to 2 years. Some premium products may have a longer warranty period.";
    }
  };

  const getWarrantyContentMessage = (language: string) => {
    switch (language) {
      case "vi":
        return "Nội dung bảo hành:";
      case "en":
        return "Warranty Content:";
      case "zh":
        return "保修内容:";
      case "fr":
        return "Contenu de la garantie:";
      case "ja":
        return "保証内容:";
      default:
        return "Warranty Content:";
    }
  };

  const getWarrantyPolicyDetailsMessage = (language: string) => {
    switch (language) {
      case "vi":
        return "Chính sách bảo hành cần ghi rõ những phần mà bảo hành áp dụng, ví dụ như linh kiện, cấu trúc, hoặc chất lượng công việc. Bảo hành thường không áp dụng đối với các sự cố gây ra do lỗi của người dùng hoặc do các yếu tố bên ngoài như lửa, nước, va đập.";
      case "en":
        return "The warranty policy should clearly specify the parts covered by the warranty, such as components, structure, or workmanship quality. The warranty typically does not apply to issues caused by user error or external factors such as fire, water, or impact.";
      case "zh":
        return "保修政策应明确列出保修适用的部分，例如部件、结构或工艺质量。保修通常不适用于由于用户错误或外部因素（如火灾、水灾或碰撞）造成的问题。";
      case "fr":
        return "La politique de garantie doit spécifier clairement les parties couvertes par la garantie, telles que les composants, la structure ou la qualité du travail. La garantie ne s'applique généralement pas aux problèmes causés par des erreurs de l'utilisateur ou des facteurs externes tels que le feu, l'eau ou les chocs.";
      case "ja":
        return "保証ポリシーには、保証が適用される部分、例えば部品、構造、または作業品質を明確に記載する必要があります。保証は通常、ユーザーの誤操作や火災、水害、衝撃などの外的要因による問題には適用されません。";
      default:
        return "The warranty policy should clearly specify the parts covered by the warranty, such as components, structure, or workmanship quality. The warranty typically does not apply to issues caused by user error or external factors such as fire, water, or impact.";
    }
  };

  const getWarrantySubmissionMethodMessage = (language: string) => {
    switch (language) {
      case "vi":
        return "Cách thức gửi bảo hành:";
      case "en":
        return "Warranty Submission Method:";
      case "zh":
        return "保修提交方式:";
      case "fr":
        return "Méthode de soumission de la garantie:";
      case "ja":
        return "保証の提出方法:";
      default:
        return "Warranty Submission Method:";
    }
  };

  const getWarrantyProcessMessage = (language: string) => {
    switch (language) {
      case "vi":
        return "Chính sách này mô tả quy trình người tiêu dùng cần thực hiện khi muốn gửi sản phẩm bảo hành. Điều này bao gồm việc liên hệ với trung tâm bảo hành, điền thông tin, và cách đóng gói sản phẩm.";
      case "en":
        return "This policy describes the process consumers need to follow when they want to send a product for warranty. This includes contacting the warranty center, filling in information, and how to package the product.";
      case "zh":
        return "本政策描述了消费者在需要发送产品进行保修时需要遵循的流程。这包括联系保修中心、填写信息以及如何包装产品。";
      case "fr":
        return "Cette politique décrit le processus que les consommateurs doivent suivre lorsqu'ils souhaitent envoyer un produit pour garantie. Cela inclut contacter le centre de garantie, remplir des informations et comment emballer le produit.";
      case "ja":
        return "このポリシーは、消費者が製品を保証のために送付する際に従うべきプロセスを説明しています。これには、保証センターへの連絡、情報の記入、および製品の梱包方法が含まれます。";
      default:
        return "This policy describes the process consumers need to follow when they want to send a product for warranty. This includes contacting the warranty center, filling in information, and how to package the product.";
    }
  };

  const getWarrantyFeeMessage = (language: string) => {
    switch (language) {
      case "vi":
        return "Phí bảo hành:";
      case "en":
        return "Warranty Fee:";
      case "zh":
        return "保修费用:";
      case "fr":
        return "Frais de garantie:";
      case "ja":
        return "保証料金:";
      default:
        return "Warranty Fee:";
    }
  };

  const getWarrantyFeeDetailsMessage = (language: string) => {
    switch (language) {
      case "vi":
        return "Một số chính sách bảo hành có thể quy định các loại phí có thể phát sinh trong quá trình bảo hành như phí vận chuyển, phí thay thế linh kiện, hoặc phí sửa chữa.";
      case "en":
        return "Some warranty policies may specify the types of fees that may arise during the warranty process, such as shipping fees, parts replacement fees, or repair fees.";
      case "zh":
        return "某些保修政策可能规定在保修过程中可能产生的费用类型，例如运输费用、更换零件费用或修理费用。";
      case "fr":
        return "Certaines politiques de garantie peuvent spécifier les types de frais pouvant survenir lors du processus de garantie, tels que les frais de transport, les frais de remplacement des pièces ou les frais de réparation.";
      case "ja":
        return "一部の保証ポリシーでは、保証プロセス中に発生する可能性のある費用の種類（例えば、送料、部品交換費用、修理費用）を規定している場合があります。";
      default:
        return "Some warranty policies may specify the types of fees that may arise during the warranty process, such as shipping fees, parts replacement fees, or repair fees.";
    }
  };

  const getPostWarrantySupportMessage = (language: string) => {
    switch (language) {
      case "vi":
        return "Dịch vụ hỗ trợ sau bảo hành:";
      case "en":
        return "Post-Warranty Support:";
      case "zh":
        return "保修后的支持服务:";
      case "fr":
        return "Support après garantie:";
      case "ja":
        return "保証後のサポートサービス:";
      default:
        return "Post-Warranty Support:";
    }
  };

  const getPostWarrantySupportDetailsMessage = (language: string) => {
    switch (language) {
      case "vi":
        return "Bên cạnh chính sách bảo hành, cần nêu rõ dịch vụ hỗ trợ sau khi kết thúc thời gian bảo hành, bao gồm việc cung cấp linh kiện, sửa chữa với chi phí phát sinh.";
      case "en":
        return "In addition to the warranty policy, the post-warranty support services should be clearly stated, including the provision of parts and repairs with additional costs after the warranty period.";
      case "zh":
        return "除了保修政策外，还应明确说明保修期结束后的支持服务，包括提供零件和修理服务，且可能会产生额外费用。";
      case "fr":
        return "En plus de la politique de garantie, les services de support après la période de garantie doivent être clairement indiqués, y compris la fourniture de pièces de rechange et les réparations avec des frais supplémentaires.";
      case "ja":
        return "保証ポリシーに加えて、保証期間終了後のサポートサービスを明確に示す必要があります。これには、部品の提供や修理が含まれ、追加費用が発生する場合があります。";
      default:
        return "In addition to the warranty policy, the post-warranty support services should be clearly stated, including the provision of parts and repairs with additional costs after the warranty period.";
    }
  };

  const getConsumerRightsMessage = (language: string) => {
    switch (language) {
      case "vi":
        return "Quyền lợi của người tiêu dùng:";
      case "en":
        return "Consumer Rights:";
      case "zh":
        return "消费者权益:";
      case "fr":
        return "Droits des consommateurs:";
      case "ja":
        return "消費者の権利:";
      default:
        return "Consumer Rights:";
    }
  };

  const getConsumerRightsDetailsMessage = (language: string) => {
    switch (language) {
      case "vi":
        return "Chính sách cần nêu rõ quyền lợi của người tiêu dùng trong thời gian bảo hành, bao gồm quyền được sửa chữa, thay thế, hoặc hoàn tiền trong trường hợp sản phẩm không hoạt động đúng chức năng.";
      case "en":
        return "The policy should clearly state the consumer's rights during the warranty period, including the right to repair, replace, or refund if the product does not function correctly.";
      case "zh":
        return "政策应明确说明消费者在保修期内的权利，包括在产品无法正常工作时有权进行修理、更换或退款。";
      case "fr":
        return "La politique doit clairement indiquer les droits du consommateur pendant la période de garantie, y compris le droit à la réparation, au remplacement ou au remboursement si le produit ne fonctionne pas correctement.";
      case "ja":
        return "ポリシーは、保証期間中の消費者の権利を明確に記載する必要があります。これには、製品が正常に機能しない場合の修理、交換、または返金の権利が含まれます。";
      default:
        return "The policy should clearly state the consumer's rights during the warranty period, including the right to repair, replace, or refund if the product does not function correctly.";
    }
  };

  return (
    <Container>
      <div className="mt-[130px] mb-[20px]">
        <h1 className="text-center text-3xl text-red-600 uppercase">
          {getWarrantyPolicyMessage(languageToUse)}
        </h1>
        <div className="flex space-x-1">
          <h1 className="text-green-600 font-semibold">
            {getWarrantyPeriodMessage(languageToUse)}
          </h1>
          <span className="text-slate-900 dark:text-slate-200">
            {getWarrantyDescriptionMessage(languageToUse)}
          </span>
        </div>
        <h1 className="text-red-600 font-semibold">
          {getWarrantyContentMessage(languageToUse)}
        </h1>
        <span className="text-slate-900 dark:text-slate-200">
          {getWarrantyPolicyDetailsMessage(languageToUse)}
        </span>
        <h1 className="text-red-600 font-semibold">
          {getWarrantySubmissionMethodMessage(languageToUse)}
        </h1>
        <span className="text-slate-900 dark:text-slate-200">
          {getWarrantyProcessMessage(languageToUse)}
        </span>
        <h1 className="text-red-600 font-semibold">
          {" "}
          {getWarrantyFeeMessage(languageToUse)}
        </h1>
        <span className="text-slate-900 dark:text-slate-200">
          {getWarrantyFeeDetailsMessage(languageToUse)}
        </span>
        <h1 className="text-red-600 font-semibold">
          {getPostWarrantySupportMessage(languageToUse)}
        </h1>
        <span className="text-slate-900 dark:text-slate-200">
          {getPostWarrantySupportDetailsMessage(languageToUse)}
        </span>
        <h1 className="text-red-600 font-semibold">
          {getConsumerRightsMessage(languageToUse)}
        </h1>
        <span className="text-slate-900 dark:text-slate-200">
          {getConsumerRightsDetailsMessage(languageToUse)}
        </span>
      </div>
    </Container>
  );
};

export default Guarantee;
