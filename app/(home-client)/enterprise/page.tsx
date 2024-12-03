"use client";
import Container from "@/components/ui/container";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useEffect, useState } from "react";

const Enterprise = () => {
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

  const getBusinessContactMessage = (language: string) => {
    switch (language) {
      case "vi":
        return "Liên hệ hợp tác bán hàng vật liệu xây dựng";
      case "en":
        return "Contact for building materials sales cooperation";
      case "zh":
        return "联系合作销售建筑材料";
      case "fr":
        return "Contactez pour la coopération en vente de matériaux de construction";
      case "ja":
        return "建材販売の協力についてお問い合わせ";
      default:
        return "Contact for building materials sales cooperation";
    }
  };

  const getBusinessPartnershipMessage = (language: string) => {
    switch (language) {
      case "vi":
        return "Liên hệ hợp tác trong lĩnh vực bán hàng vật liệu xây dựng là một quy trình quan trọng để xây dựng và duy trì một mối quan hệ hợp tác lâu dài giữa các đối tác tham gia trong ngành công nghiệp xây dựng. Các bên hợp tác cần thiết kế kỹ lưỡng và cẩn thận để đảm bảo sự hiệu quả và bền vững trong việc phát triển kinh doanh.";
      case "en":
        return "Business cooperation in the field of building materials sales is an important process to establish and maintain long-term partnerships among participants in the construction industry. Partners need to design carefully and thoughtfully to ensure effectiveness and sustainability in business development.";
      case "zh":
        return "在建筑材料销售领域的合作联系是建立和维护建筑行业各方长期合作关系的重要过程。合作方需要精心设计，以确保在业务发展中的有效性和可持续性。";
      case "fr":
        return "La coopération dans le domaine de la vente de matériaux de construction est un processus important pour établir et maintenir des partenariats à long terme entre les acteurs de l'industrie de la construction. Les partenaires doivent concevoir soigneusement et minutieusement pour garantir l'efficacité et la durabilité du développement des affaires.";
      case "ja":
        return "建材販売分野での協力は、建設業界の参加者間で長期的なパートナーシップを築き、維持するための重要なプロセスです。パートナーは、ビジネス開発における効果的かつ持続可能な成長を確保するために、慎重かつ丁寧に設計する必要があります。";
      default:
        return "Business cooperation in the field of building materials sales is an important process to establish and maintain long-term partnerships among participants in the construction industry. Partners need to design carefully and thoughtfully to ensure effectiveness and sustainability in business development.";
    }
  };

  const getDemandAndPotentialEvaluationMessage = (language: string) => {
    switch (language) {
      case "vi":
        return "Đánh giá nhu cầu và tiềm năng";
      case "en":
        return "Evaluate demand and potential";
      case "zh":
        return "评估需求和潜力";
      case "fr":
        return "Évaluer la demande et le potentiel";
      case "ja":
        return "需要と可能性の評価";
      default:
        return "Evaluate demand and potential";
    }
  };

  const getPartnershipPreparationMessage = (language: string) => {
    switch (language) {
      case "vi":
        return "Trước khi bắt đầu bất kỳ mối quan hệ hợp tác nào, cần phải tìm hiểu kỹ về thị trường, nhu cầu và tiềm năng trong lĩnh vực vật liệu xây dựng. Điều này có thể bao gồm phân tích thị trường, khám phá các kênh phân phối tiềm năng và đánh giá cạnh tranh.";
      case "en":
        return "Before starting any partnership, it is essential to thoroughly understand the market, demand, and potential in the building materials industry. This may include market analysis, exploring potential distribution channels, and evaluating competition.";
      case "zh":
        return "在开始任何合作关系之前，必须深入了解建筑材料行业的市场、需求和潜力。这可能包括市场分析、探索潜在的分销渠道以及评估竞争情况。";
      case "fr":
        return "Avant de commencer toute relation de partenariat, il est essentiel de bien comprendre le marché, la demande et le potentiel dans le domaine des matériaux de construction. Cela peut inclure l'analyse du marché, l'exploration des canaux de distribution potentiels et l'évaluation de la concurrence.";
      case "ja":
        return "どんなパートナーシップを始める前にも、建材業界の市場、需要、可能性について十分に理解することが重要です。これには市場分析、潜在的な流通チャネルの探求、競争の評価が含まれる場合があります。";
      default:
        return "Before starting any partnership, it is essential to thoroughly understand the market, demand, and potential in the building materials industry. This may include market analysis, exploring potential distribution channels, and evaluating competition.";
    }
  };

  const getAdditionalContactInfoMessage = (language: string) => {
    switch (language) {
      case "vi":
        return "Khách hàng cần thêm thông tin liên hệ";
      case "en":
        return "Customer needs additional contact information";
      case "zh":
        return "客户需要更多联系信息";
      case "fr":
        return "Le client a besoin d'informations de contact supplémentaires";
      case "ja":
        return "顧客は追加の連絡先情報が必要です";
      default:
        return "Customer needs additional contact information";
    }
  };

  return (
    <Container>
      <div className="mt-[130px] mb-[20px]">
        <h1 className="text-center text-3xl text-red-600 uppercase">
          {getBusinessContactMessage(languageToUse)}
        </h1>
        <span className="font-semibold text-slate-900 dark:text-slate-200">
          {getBusinessPartnershipMessage(languageToUse)}
        </span>
        <div className="flex space-x-1">
          <h1 className="text-green-600 font-semibold">
            {getDemandAndPotentialEvaluationMessage(languageToUse)}:{" "}
          </h1>
          <span className="text-slate-900 dark:text-slate-200">
            {getPartnershipPreparationMessage(languageToUse)}
          </span>
        </div>
        <div className="flex space-x-2">
          <h1 className="text-red-600 font-semibold">
            {getAdditionalContactInfoMessage(languageToUse)}:{" "}
          </h1>
          <span className="text-red-500">0352261103</span>
        </div>
      </div>
    </Container>
  );
};

export default Enterprise;
