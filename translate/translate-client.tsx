import VietNamSVG from "@/public/svg/vietnam";
import EnglishSVG from "@/public/svg/english";
import ChineseSVG from "@/public/svg/chinese";
import FrenchSVG from "@/public/svg/french";
import JapaneseSVG from "@/public/svg/japan";
import axios from "axios";
import cuid from "cuid";

const key = process.env.AZURE_TEXT_TRANSLATION_KEY;
const endpoint = process.env.AZURE_TEXT_TRANSLATION;
const location = process.env.AZURE_TEXT_LOCATION;

export const getLanguageToastSuccess = (language: string) => {
  switch (language) {
    case "vi":
      return "Thay đổi ngôn ngữ thành công!";
    case "en":
      return "Language changed successfully!";
    case "zh":
      return "语言更改成功！";
    case "fr":
      return "Changement de langue réussi !";
    case "ja":
      return "言語が正常に変更されました！";
    default:
      return "Language change successful!";
  }
};

export const getLanguageToastError = (language: string) => {
  switch (language) {
    case "vi":
      return "Lỗi khi thay đổi ngôn ngữ!";
    case "en":
      return "Language change error!";
    case "zh":
      return "语言更改错误！";
    case "fr":
      return "Erreur de changement de langue !";
    case "ja":
      return "言語の変更エラーが発生しました！";
    default:
      return "Language change error!";
  }
};

export const getToastError = (language: string) => {
  switch (language) {
    case "vi":
      return "Đã xảy ra lỗi!";
    case "en":
      return "Something went wrong!";
    case "zh":
      return "发生了错误！";
    case "fr":
      return "Une erreur s'est produite !";
    case "ja":
      return "エラーが発生しました！";
    default:
      return "An error occurred!";
  }
};

export const translateRewardErrorContactAdmin = (language: string) => {
  switch (language) {
    case "vi":
      return "Lỗi tặng thưởng liên hệ ADMIN ngay 0352261103.";
    case "en":
      return "Reward error, contact ADMIN immediately at 0352261103.";
    case "zh":
      return "奖励错误，请立即联系ADMIN，电话0352261103。";
    case "fr":
      return "Erreur de récompense, contactez ADMIN immédiatement au 0352261103.";
    case "ja":
      return "報酬エラー、すぐにADMINに連絡してください：0352261103。";
    default:
      return "Reward error, contact ADMIN immediately at 0352261103."; // Default is English
  }
};

export const translatePaymentSuccess = (language: string) => {
  switch (language) {
    case "vi":
      return "Thanh toán thành công!";
    case "en":
      return "Payment successful!";
    case "zh":
      return "支付成功！";
    case "fr":
      return "Paiement réussi !";
    case "ja":
      return "支払い成功！";
    default:
      return "Payment successful!"; // Default is English
  }
};

export const translatePaymentFailure = (language: string) => {
  switch (language) {
    case "vi":
      return "Thanh toán thất bại!";
    case "en":
      return "Payment failed!";
    case "zh":
      return "支付失败！";
    case "fr":
      return "Échec du paiement !";
    case "ja":
      return "支払い失敗！";
    default:
      return "Payment failed!"; // Default is English
  }
};

export const getCartItemsDeletedMessage = (language: string) => {
  switch (language) {
    case "vi":
      return "Tất cả lựa chọn trong giỏ hàng đã được xóa.";
    case "en":
      return "All selections in the cart have been removed.";
    case "zh":
      return "购物车中的所有选择已被删除。";
    case "fr":
      return "Toutes les sélections dans le panier ont été supprimées.";
    case "ja":
      return "カート内のすべての選択肢が削除されました。";
    default:
      return "All selections in the cart have been removed.";
  }
};

export const getProductNotFoundMessage = (language: string) => {
  switch (language) {
    case "vi":
      return "Không tìm thấy sản phẩm!";
    case "en":
      return "Product not found!";
    case "zh":
      return "未找到产品！";
    case "fr":
      return "Produit non trouvé !";
    case "ja":
      return "商品が見つかりません！";
    default:
      return "Product not found!";
  }
};

export const translateProductRewardError = (language: string) => {
  switch (language) {
    case "vi":
      return "Lỗi sản phẩm đã được nhận thưởng.";
    case "en":
      return "Error: Product has already been rewarded.";
    case "zh":
      return "错误：产品已获得奖励。";
    case "fr":
      return "Erreur : Le produit a déjà été récompensé.";
    case "ja":
      return "エラー：製品はすでに報酬を受け取っています。";
    default:
      return "Error: Product has already been rewarded."; // Default is English
  }
};

export const getConfirmDeleteMessage = (language: string) => {
  switch (language) {
    case "vi":
      return "Bạn có chắc chắn xóa tất cả sản phẩm đã chọn không?";
    case "en":
      return "Are you sure you want to delete all selected products?";
    case "zh":
      return "您确定要删除所有选择的产品吗？";
    case "fr":
      return "Êtes-vous sûr de vouloir supprimer tous les produits sélectionnés ?";
    case "ja":
      return "選択したすべての商品を削除してもよろしいですか？";
    default:
      return "Are you sure you want to delete all selected products?";
  }
};

export const getSelectAllMessage = (language: string) => {
  switch (language) {
    case "vi":
      return "Chọn tất cả";
    case "en":
      return "Select all";
    case "zh":
      return "全选";
    case "fr":
      return "Tout cocher";
    case "ja":
      return "すべて選択";
    default:
      return "Select all";
  }
};

export const getItemsSelectedMessage = (
  language: string,
  selectedItemsLength: number
) => {
  switch (language) {
    case "vi":
      return `Đã chọn ${selectedItemsLength} sản phẩm`;
    case "en":
      return `Selected ${selectedItemsLength} products`;
    case "zh":
      return `已选择 ${selectedItemsLength} 个产品`;
    case "fr":
      return `Sélectionné ${selectedItemsLength} produits`;
    case "ja":
      return `${selectedItemsLength} 商品が選択されました`;
    default:
      return `Selected ${selectedItemsLength} products`;
  }
};

export const getTotalAmountMessage = (language: string) => {
  switch (language) {
    case "vi":
      return "Tổng tiền";
    case "en":
      return "Total amount";
    case "zh":
      return "总金额";
    case "fr":
      return "Montant total";
    case "ja":
      return "合計金額";
    default:
      return "Total amount";
  }
};

export const getPaymentMethodMessage = (language: string) => {
  switch (language) {
    case "vi":
      return "Hình thức thanh toán";
    case "en":
      return "Payment method";
    case "zh":
      return "付款方式";
    case "fr":
      return "Mode de paiement";
    case "ja":
      return "支払い方法";
    default:
      return "Payment method";
  }
};

export const getCashPaymentMessage = (language: string) => {
  switch (language) {
    case "vi":
      return "Thanh toán tiền mặt";
    case "en":
      return "Cash payment";
    case "zh":
      return "现金支付";
    case "fr":
      return "Paiement en espèces";
    case "ja":
      return "現金払い";
    default:
      return "Cash payment";
  }
};

export const getVisaPaymentMessage = (language: string) => {
  switch (language) {
    case "vi":
      return "Thanh toán Visa";
    case "en":
      return "Visa payment";
    case "zh":
      return "Visa支付";
    case "fr":
      return "Paiement par Visa";
    case "ja":
      return "Visa決済";
    default:
      return "Visa payment";
  }
};

export const getActionIrreversibleMessage = (language: string) => {
  switch (language) {
    case "vi":
      return "Hành động này không thể hoàn tác.";
    case "en":
      return "This action cannot be undone.";
    case "zh":
      return "此操作无法撤销。";
    case "fr":
      return "Cette action ne peut pas être annulée.";
    case "ja":
      return "この操作は元に戻せません。";
    default:
      return "This action cannot be undone.";
  }
};

export const getTitleTranslate = (language: string) => {
  switch (language) {
    case "vi":
      return "Bạn có chắc chắn thay đổi ngôn ngữ vi 🇻🇳";
    case "en":
      return "Are you sure you want to change the language to English? 🇺🇸";
    case "zh":
      return "您确定要将语言更改为中文吗？ 🇨🇳";
    case "fr":
      return "Êtes-vous sûr de vouloir changer la langue en français ? 🇫🇷";
    case "ja":
      return "言語を日本語に変更してもよろしいですか？ 🇯🇵";
    default:
      return "Language change confirmation";
  }
};

export const getCoinMessage = (language: string) => {
  switch (language) {
    case "vi":
      return "Xu";
    case "en":
      return "Coins";
    case "zh":
      return "金币";
    case "fr":
      return "Pièces";
    case "ja":
      return "コイン";
    default:
      return "Coins";
  }
};

export const translateCoinsLowerCase = (language: string) => {
  switch (language) {
    case "vi":
      return "xu";
    case "en":
      return "coins";
    case "zh":
      return "金币";
    case "fr":
      return "pièces";
    case "ja":
      return "コイン";
    default:
      return "coins"; // Default is English
  }
};

export const getInsuranceAmountMessage = (language: string) => {
  switch (language) {
    case "vi":
      return "Tiền bảo hiểm";
    case "en":
      return "Insurance fee";
    case "zh":
      return "保险费";
    case "fr":
      return "Frais d'assurance";
    case "ja":
      return "保険料";
    default:
      return "Insurance fee";
  }
};

export const getAmountToPayMessage = (language: string) => {
  switch (language) {
    case "vi":
      return "Số tiền cần thanh toán";
    case "en":
      return "Amount to pay";
    case "zh":
      return "需支付金额";
    case "fr":
      return "Montant à payer";
    case "ja":
      return "支払う金額";
    default:
      return "Amount to pay";
  }
};

export const getPaymentMessage = (language: string) => {
  switch (language) {
    case "vi":
      return "Thanh toán";
    case "en":
      return "Payment";
    case "zh":
      return "付款";
    case "fr":
      return "Paiement";
    case "ja":
      return "支払い";
    default:
      return "Payment";
  }
};

export const getCopiedToClipboardMessage = (language: string) => {
  switch (language) {
    case "vi":
      return "ID đã được sao chép vào clipboard";
    case "en":
      return "ID copied to clipboard";
    case "zh":
      return "ID已复制到剪贴板";
    case "fr":
      return "ID copié dans le presse-papiers";
    case "ja":
      return "IDがクリップボードにコピーされました";
    default:
      return "ID copied to clipboard";
  }
};

export const getIncompleteInfoMessage = (language: string) => {
  switch (language) {
    case "vi":
      return "Chưa nhập đầy đủ thông tin!";
    case "en":
      return "Incomplete information!";
    case "zh":
      return "信息不完整！";
    case "fr":
      return "Informations incomplètes !";
    case "ja":
      return "情報が不完全です！";
    default:
      return "Incomplete information!";
  }
};

export const getSelectGenderMessage = (language: string) => {
  switch (language) {
    case "vi":
      return "Vui lòng chọn giới tính!";
    case "en":
      return "Please select gender!";
    case "zh":
      return "请选择性别！";
    case "fr":
      return "Veuillez sélectionner le genre !";
    case "ja":
      return "性別を選択してください！";
    default:
      return "Please select gender!";
  }
};

export const getEnterEmailMessage = (language: string) => {
  switch (language) {
    case "vi":
      return "Vui lòng nhập email!";
    case "en":
      return "Please enter your email!";
    case "zh":
      return "请输入邮箱！";
    case "fr":
      return "Veuillez entrer votre email !";
    case "ja":
      return "メールアドレスを入力してください！";
    default:
      return "Please enter your email!";
  }
};

export const getNoIndentationMessage = (language: string) => {
  switch (language) {
    case "vi":
      return "Không được cách đầu dòng";
    case "en":
      return "No indentation allowed";
    case "zh":
      return "不允许缩进";
    case "fr":
      return "Pas d'indentation autorisée";
    case "ja":
      return "インデントは許可されていません";
    default:
      return "No indentation allowed";
  }
};

export const getInvalidEmailMessage = (language: string) => {
  switch (language) {
    case "vi":
      return "Email không hợp lệ";
    case "en":
      return "Invalid email";
    case "zh":
      return "无效的邮箱";
    case "fr":
      return "Email invalide";
    case "ja":
      return "無効なメールアドレス";
    default:
      return "Invalid email";
  }
};

export const getEnterNameMessage = (language: string) => {
  switch (language) {
    case "vi":
      return "Vui lòng nhập tên!";
    case "en":
      return "Please enter your name!";
    case "zh":
      return "请输入姓名！";
    case "fr":
      return "Veuillez entrer votre nom !";
    case "ja":
      return "名前を入力してください！";
    default:
      return "Please enter your name!";
  }
};

export const getEnterPhoneNumberMessage = (language: string) => {
  switch (language) {
    case "vi":
      return "Vui lòng nhập SĐT!";
    case "en":
      return "Please enter your phone number!";
    case "zh":
      return "请输入电话号码！";
    case "fr":
      return "Veuillez entrer votre numéro de téléphone !";
    case "ja":
      return "電話番号を入力してください！";
    default:
      return "Please enter your phone number!";
  }
};

export const getSelectProvinceMessage = (language: string) => {
  switch (language) {
    case "vi":
      return "Vui lòng chọn Tỉnh!";
    case "en":
      return "Please select a province!";
    case "zh":
      return "请选择省份！";
    case "fr":
      return "Veuillez sélectionner une province !";
    case "ja":
      return "都道府県を選択してください！";
    default:
      return "Please select a province!";
  }
};

export const getSelectDistrictMessage = (language: string) => {
  switch (language) {
    case "vi":
      return "Vui lòng chọn Quận/Huyện!";
    case "en":
      return "Please select a district!";
    case "zh":
      return "请选择区/县！";
    case "fr":
      return "Veuillez sélectionner un district !";
    case "ja":
      return "区/町を選択してください！";
    default:
      return "Please select a district!";
  }
};

export const getSelectWardMessage = (language: string) => {
  switch (language) {
    case "vi":
      return "Vui lòng chọn Phường!";
    case "en":
      return "Please select a ward!";
    case "zh":
      return "请选择街道！";
    case "fr":
      return "Veuillez sélectionner un quartier !";
    case "ja":
      return "町を選択してください！";
    default:
      return "Please select a ward!";
  }
};

export const getEnterAddressMessage = (language: string) => {
  switch (language) {
    case "vi":
      return "Vui lòng nhập địa chỉ!";
    case "en":
      return "Please enter the address!";
    case "zh":
      return "请输入地址！";
    case "fr":
      return "Veuillez entrer l'adresse !";
    case "ja":
      return "住所を入力してください！";
    default:
      return "Please enter the address!";
  }
};

export const getOnlyNumbersMessage = (language: string) => {
  switch (language) {
    case "vi":
      return "Vui lòng chỉ nhập số!";
    case "en":
      return "Please enter only numbers!";
    case "zh":
      return "请输入数字！";
    case "fr":
      return "Veuillez entrer uniquement des chiffres !";
    case "ja":
      return "数字のみ入力してください！";
    default:
      return "Please enter only numbers!";
  }
};

export const getEnterZeroFirstMessage = (language: string) => {
  switch (language) {
    case "vi":
      return "Hãy nhập 0 trước!";
    case "en":
      return "Please enter 0 first!";
    case "zh":
      return "请先输入0！";
    case "fr":
      return "Veuillez entrer d'abord 0 !";
    case "ja":
      return "最初に0を入力してください！";
    default:
      return "Please enter 0 first!";
  }
};

export const getMaxCharacterMessage = (
  language: string,
  maxCharacter: number
) => {
  switch (language) {
    case "vi":
      return `Không được nhập quá ${maxCharacter} ký tự!`;
    case "en":
      return `You cannot enter more than ${maxCharacter} characters!`;
    case "zh":
      return `不能输入超过${maxCharacter}个字符！`;
    case "fr":
      return `Vous ne pouvez pas entrer plus de ${maxCharacter} caractères!`;
    case "ja":
      return `${maxCharacter}文字以上入力できません！`;
    default:
      return `You cannot enter more than ${maxCharacter} characters!`;
  }
};

export const getCitySelectionMessage = (language: string) => {
  switch (language) {
    case "vi":
      return "Chọn Thành phố";
    case "en":
      return "Select City";
    case "zh":
      return "选择城市";
    case "fr":
      return "Choisir une ville";
    case "ja":
      return "都市を選択";
    default:
      return "Select City";
  }
};

export const getDistrictSelectionMessage = (language: string) => {
  switch (language) {
    case "vi":
      return "Chọn Quận/Huyện";
    case "en":
      return "Select District";
    case "zh":
      return "选择区/县";
    case "fr":
      return "Choisir un district";
    case "ja":
      return "区/郡を選択";
    default:
      return "Select District";
  }
};

export const getWardSelectionMessage = (language: string) => {
  switch (language) {
    case "vi":
      return "Chọn Phường Xã";
    case "en":
      return "Select Ward";
    case "zh":
      return "选择街道/乡";
    case "fr":
      return "Choisir une commune";
    case "ja":
      return "区/町を選択";
    default:
      return "Select Ward";
  }
};

export const getAddressMessage = (language: string) => {
  switch (language) {
    case "vi":
      return "Địa chỉ";
    case "en":
      return "Address";
    case "zh":
      return "地址";
    case "fr":
      return "Adresse";
    case "ja":
      return "住所";
    default:
      return "Address";
  }
};

export const getOtherAddressMessage = (language: string) => {
  switch (language) {
    case "vi":
      return "Địa chỉ khác";
    case "en":
      return "Other Address";
    case "zh":
      return "其他地址";
    case "fr":
      return "Autre adresse";
    case "ja":
      return "その他の住所";
    default:
      return "Other Address";
  }
};

export const getDeliveryMethodMessage = (language: string) => {
  switch (language) {
    case "vi":
      return "Hình thức nhận hàng";
    case "en":
      return "Delivery Method";
    case "zh":
      return "配送方式";
    case "fr":
      return "Méthode de livraison";
    case "ja":
      return "受け取り方法";
    default:
      return "Delivery Method";
  }
};

export const getHomeDeliveryMessage = (language: string) => {
  switch (language) {
    case "vi":
      return "Giao hàng tận nơi";
    case "en":
      return "Home Delivery";
    case "zh":
      return "送货上门";
    case "fr":
      return "Livraison à domicile";
    case "ja":
      return "自宅配送";
    default:
      return "Home Delivery";
  }
};

export const getStorePickupMessage = (language: string) => {
  switch (language) {
    case "vi":
      return "Nhận tại cửa hàng";
    case "en":
      return "Store Pickup";
    case "zh":
      return "店内自取";
    case "fr":
      return "Retrait en magasin";
    case "ja":
      return "店頭受け取り";
    default:
      return "Store Pickup";
  }
};

export const getPickupLocationMessage = (language: string) => {
  switch (language) {
    case "vi":
      return "Nhận hàng tại: 457 Lê Văn Quới, Phường Bình Trị Đông A, Quận Bình Tân";
    case "en":
      return "Pick up at: 457 Le Van Quoi, Binh Tri Dong A Ward, Binh Tan District";
    case "zh":
      return "取货地点：457 Lê Văn Quới, Bình Trị Đông A 街, Bình Tân 区";
    case "fr":
      return "Retrait à: 457 Lê Văn Quới, Quartier Bình Trị Đông A, District Bình Tân";
    case "ja":
      return "受け取り場所：457 Lê Văn Quới, Bình Trị Đông A 地区, Bình Tân 区";
    default:
      return "Pick up at: 457 Le Van Quoi, Binh Tri Dong A Ward, Binh Tan District";
  }
};

export const getNoteMessage = (language: string) => {
  switch (language) {
    case "vi":
      return "Ghi chú";
    case "en":
      return "Note";
    case "zh":
      return "备注";
    case "fr":
      return "Note";
    case "ja":
      return "メモ";
    default:
      return "Note";
  }
};

export const getNotePlaceholderMessage = (language: string) => {
  switch (language) {
    case "vi":
      return "Ghi chú thêm địa chỉ mới hoặc số điện thoại mới.";
    case "en":
      return "Note add a new address or phone number.";
    case "zh":
      return "备注添加新的地址或电话号码。";
    case "fr":
      return "Note ajouter une nouvelle adresse ou un nouveau numéro de téléphone.";
    case "ja":
      return "メモ 新しい住所または電話番号を追加します。";
    default:
      return "Note add a new address or phone number.";
  }
};

export const getNotFoundMessage = (language: string) => {
  switch (language) {
    case "vi":
      return "Không tìm thấy";
    case "en":
      return "Not Found";
    case "zh":
      return "未找到";
    case "fr":
      return "Non trouvé";
    case "ja":
      return "見つかりません";
    default:
      return "Not Found";
  }
};

export const getProductInfoMessage = (language: string) => {
  switch (language) {
    case "vi":
      return "Thông tin sản phẩm";
    case "en":
      return "Product information";
    case "zh":
      return "产品信息";
    case "fr":
      return "Informations sur le produit";
    case "ja":
      return "製品情報";
    default:
      return "Product information";
  }
};

export const getCustomerInfoMessage = (language: string) => {
  switch (language) {
    case "vi":
      return "Thông tin khách hàng";
    case "en":
      return "Customer Information";
    case "zh":
      return "客户信息";
    case "fr":
      return "Informations client";
    case "ja":
      return "顧客情報";
    default:
      return "Customer Information";
  }
};

export const getGenderMaleMessage = (language: string) => {
  switch (language) {
    case "vi":
      return "Nam";
    case "en":
      return "Male";
    case "zh":
      return "男性";
    case "fr":
      return "Homme";
    case "ja":
      return "男性";
    default:
      return "Male";
  }
};

export const getGenderFemaleMessage = (language: string) => {
  switch (language) {
    case "vi":
      return "Nữ";
    case "en":
      return "Female";
    case "zh":
      return "女性";
    case "fr":
      return "Femme";
    case "ja":
      return "女性";
    default:
      return "Female";
  }
};

export const getFullNameMessage = (language: string) => {
  switch (language) {
    case "vi":
      return "Họ và tên";
    case "en":
      return "Full Name";
    case "zh":
      return "姓名";
    case "fr":
      return "Nom complet";
    case "ja":
      return "フルネーム";
    default:
      return "Full Name";
  }
};

export const getPhoneNumberMessage = (language: string) => {
  switch (language) {
    case "vi":
      return "Số điện thoại";
    case "en":
      return "Phone Number";
    case "zh":
      return "电话号码";
    case "fr":
      return "Numéro de téléphone";
    case "ja":
      return "電話番号";
    default:
      return "Phone Number";
  }
};

export const getGenderOtherMessage = (language: string) => {
  switch (language) {
    case "vi":
      return "Khác";
    case "en":
      return "Other";
    case "zh":
      return "其他";
    case "fr":
      return "Autre";
    case "ja":
      return "その他";
    default:
      return "Other";
  }
};

export const getEstimatedTotalMessage = (
  language: string,
  itemCount: number
) => {
  switch (language) {
    case "vi":
      return `Tạm tính (${itemCount} sản phẩm): `;
    case "en":
      return `Estimated total (${itemCount} items): `;
    case "zh":
      return `估算总计 (${itemCount} 件): `;
    case "fr":
      return `Total estimé (${itemCount} articles): `;
    case "ja":
      return `概算合計 (${itemCount} 商品): `;
    default:
      return `Estimated total (${itemCount} items): `;
  }
};

export const getPleaseWaitMessage = (language: string) => {
  switch (language) {
    case "vi":
      return "Hãy đợi trong giây lát...";
    case "en":
      return "Please wait a moment...";
    case "zh":
      return "请稍等...";
    case "fr":
      return "Veuillez patienter un instant...";
    case "ja":
      return "少々お待ちください...";
    default:
      return "Please wait a moment...";
  }
};

export const getSuccessMessage = (language: string) => {
  switch (language) {
    case "vi":
      return "THÀNH CÔNG";
    case "en":
      return "SUCCESS";
    case "zh":
      return "成功";
    case "fr":
      return "SUCCÈS";
    case "ja":
      return "成功";
    default:
      return "SUCCESS";
  }
};

export const getProcessingPaymentMessage = (language: string) => {
  switch (language) {
    case "vi":
      return "Đang xử lý thanh toán...";
    case "en":
      return "Processing payment...";
    case "zh":
      return "正在处理付款...";
    case "fr":
      return "Traitement du paiement...";
    case "ja":
      return "支払い処理中...";
    default:
      return "Processing payment...";
  }
};

export const getMessageTranslate = (language: string) => {
  switch (language) {
    case "vi":
      return (
        <div className="flex items-center space-x-2">
          <span>Tất cả dữ liệu của bạn sẽ thay đổi theo ngôn ngữ</span>
          <VietNamSVG />
        </div>
      );
    case "en":
      return (
        <div className="flex items-center space-x-2">
          <span>All your data will change according to the language</span>
          <EnglishSVG />
        </div>
      );
    case "zh":
      return (
        <div className="flex items-center space-x-2">
          <span>所有数据将根据语言更改</span>
          <ChineseSVG />
        </div>
      );
    case "fr":
      return (
        <div className="flex items-center space-x-2">
          <span>Toutes vos données changeront en fonction de la langue</span>
          <FrenchSVG />
        </div>
      );
    case "ja":
      return (
        <div className="flex items-center space-x-2">
          <span>すべてのデータが言語に応じて変更されます</span>
          <JapaneseSVG />
        </div>
      );
    default:
      return "Language change confirmation";
  }
};

export const getCartTranslation = (language: string) => {
  switch (language) {
    case "vi":
      return "Giỏ hàng";
    case "en":
      return "Cart";
    case "zh":
      return "购物车";
    case "fr":
      return "Panier";
    case "ja":
      return "カート";
    default:
      return "Cart";
  }
};

export const getEmptyCartMessage = (language: string) => {
  switch (language) {
    case "vi":
      return "Giỏ hàng của bạn còn trống";
    case "en":
      return "Your cart is empty";
    case "zh":
      return "您的购物车是空的";
    case "fr":
      return "Votre panier est vide";
    case "ja":
      return "カートが空です";
    default:
      return "Your cart is empty";
  }
};

export const getMaxProductsMessage = (language: string) => {
  switch (language) {
    case "vi":
      return "Bạn chỉ có thể chọn tối đa 99 sản phẩm!";
    case "en":
      return "You can only select up to 99 products!";
    case "zh":
      return "您最多只能选择 99 个产品！";
    case "fr":
      return "Vous ne pouvez sélectionner que jusqu'à 99 produits !";
    case "ja":
      return "最大で99個の商品しか選択できません！";
    default:
      return "You can only select up to 99 products!";
  }
};

export const getRemainingQuantityMessage = (
  language: string,
  maxQuantity: number
) => {
  switch (language) {
    case "vi":
      return `Số lượng còn lại ${maxQuantity} sản phẩm!`;
    case "en":
      return `Only ${maxQuantity} products left!`;
    case "zh":
      return `仅剩 ${maxQuantity} 个产品！`;
    case "fr":
      return `Il ne reste que ${maxQuantity} produits !`;
    case "ja":
      return `残り${maxQuantity}個の商品！`;
    default:
      return `Only ${maxQuantity} products left!`;
  }
};

export const getRemainingProductsMessage = (
  language: string,
  maxQuantity: number
) => {
  switch (language) {
    case "vi":
      return `Còn ${maxQuantity} sản phẩm`;
    case "en":
      return `Remaining ${maxQuantity} products`;
    case "zh":
      return `剩余 ${maxQuantity} 个产品`;
    case "fr":
      return `Il reste ${maxQuantity} produits`;
    case "ja":
      return `${maxQuantity} 個の製品が残っています`;
    default:
      return `Remaining ${maxQuantity} products`;
  }
};

export const getWarrantyPriceMessage = (language: string) => {
  switch (language) {
    case "vi":
      return "Giá tiền bảo hành cho";
    case "en":
      return "Warranty price for";
    case "zh":
      return "保修价格为";
    case "fr":
      return "Prix garantie pour"; // Rút ngắn tiếng Pháp
    case "ja":
      return "保証価格は";
    default:
      return "Warranty price for";
  }
};

export const getBuyNowTranslation = (language: string) => {
  switch (language) {
    case "vi":
      return "Mua ngay";
    case "en":
      return "Buy now";
    case "zh":
      return "立即购买";
    case "fr":
      return "Acheter maintenant";
    case "ja":
      return "今すぐ購入";
    default:
      return "Buy now";
  }
};

export const getOrderMessage = (language: string) => {
  switch (language) {
    case "vi":
      return "Đặt Hàng";
    case "en":
      return "Place Order";
    case "zh":
      return "下单";
    case "fr":
      return "Passer la commande";
    case "ja":
      return "注文する";
    default:
      return "Place Order";
  }
};

export const getOutOfStockMessage = (language: string) => {
  switch (language) {
    case "vi":
      return "Hết hàng";
    case "en":
      return "Sold out";
    case "zh":
      return "已售罄";
    case "fr":
      return "Rupture";
    case "ja":
      return "在庫切れ";
    default:
      return "Sold out";
  }
};

export const getNotEnoughStockMessage = (language: string) => {
  switch (language) {
    case "vi":
      return "Không đủ hàng";
    case "en":
      return "Out of stock";
    case "zh":
      return "库存不足";
    case "fr":
      return "Pas assez";
    case "ja":
      return "在庫不足";
    default:
      return "Out of stock";
  }
};

export const getSoldOutCategoryMessage = (language: string) => {
  switch (language) {
    case "vi":
      return "Phân loại hàng này bán hết, vui lòng lựa chọn một phân loại khác.";
    case "en":
      return "This category is sold out, please choose another one.";
    case "zh":
      return "此分类已售罄，请选择其他分类。";
    case "fr":
      return "Catégorie épuisée, choisissez-en une autre.";
    case "ja":
      return "このカテゴリーは売り切れです。他のカテゴリーを選択してください。";
    default:
      return "This category is sold out, please choose another one.";
  }
};

export const getInsufficientStockMessage = (language: string) => {
  switch (language) {
    case "vi":
      return "Phân loại hàng này không đủ hàng, giảm số lượng phù hợp trong kho.";
    case "en":
      return "Not enough stock, reduce quantity.";
    case "zh":
      return "此分类库存不足，请减少数量以匹配库存。";
    case "fr":
      return "Stock insuffisant, réduisez la quantité.";
    case "ja":
      return "在庫不足、数量を減らしてください。";
    default:
      return "Not enough stock, reduce quantity.";
  }
};

export const translatePin = (language: string) => {
  switch (language) {
    case "vi":
      return "Pin";
    case "en":
      return "Battery";
    case "zh":
      return "Battery";
    case "fr":
      return "Batterie";
    case "ja":
      return "バッテリー";
    default:
      return "Battery";
  }
};

export const translateXuanTruongBuildingMaterials = (language: string) => {
  switch (language) {
    case "vi":
      return "Vật liệu xây dựng Xuân Trường";
    case "en":
      return "Xuan Truong Building Materials";
    case "zh":
      return "春长建筑材料";
    case "fr":
      return "Matériaux de construction Xuan Truong";
    case "ja":
      return "スアンチュオン建築材料";
    default:
      return "Xuan Truong Building Materials";
  }
};
export const translateFan = (language: string) => {
  switch (language) {
    case "vi":
      return "Quạt";
    case "en":
      return "Fan";
    case "zh":
      return "Fan";
    case "fr":
      return "Ventil";
    case "ja":
      return "ファン";
    default:
      return "Fan";
  }
};

export const translatePlasticPipe = (language: string) => {
  switch (language) {
    case "vi":
      return "Ống nhựa, ống lưới xanh";
    case "en":
      return "Plastic pipe, green mesh pipe";
    case "zh":
      return "Plastic pipe, green mesh pipe";
    case "fr":
      return "Tube plastique"; // Further shortened French translation
    case "ja":
      return "プラパイプ、メッシュ"; // Further shortened Japanese translation
    default:
      return "Plastic pipe, green mesh pipe";
  }
};

export const translatePipe = (language: string) => {
  switch (language) {
    case "vi":
      return "Ống";
    case "en":
      return "Pipe";
    case "zh":
      return "Pipe";
    case "fr":
      return "Tube";
    case "ja":
      return "パイプ";
    default:
      return "Pipe"; // Default is English
  }
};

export const translateElectricWire = (language: string) => {
  switch (language) {
    case "vi":
      return "Dây điện";
    case "en":
      return "Wire"; // Shortened English translation
    case "zh":
      return "Wire";
    case "fr":
      return "Fil"; // Shortened French translation
    case "ja":
      return "電線";
    default:
      return "Wire";
  }
};

export const translateCuttingStone = (language: string) => {
  switch (language) {
    case "vi":
      return "Đá cắt";
    case "en":
      return "Cutting stone";
    case "zh":
      return "Cutting stone";
    case "fr":
      return "Pierre à couper";
    case "ja":
      return "切断石";
    default:
      return "Cutting stone";
  }
};

export const translateLock = (language: string) => {
  switch (language) {
    case "vi":
      return "Ổ khóa";
    case "en":
      return "Lock";
    case "zh":
      return "Lock";
    case "fr":
      return "Verrou";
    case "ja":
      return "鍵";
    default:
      return "Lock";
  }
};

export const translateGlue = (language: string) => {
  switch (language) {
    case "vi":
      return "Keo";
    case "en":
      return "Glue";
    case "zh":
      return "Glue";
    case "fr":
      return "Colle";
    case "ja":
      return "接着剤";
    default:
      return "Glue";
  }
};

export const translateSocketAndFaceplate = (language: string) => {
  switch (language) {
    case "vi":
      return "Ổ cắm, mặt ổ cắm";
    case "en":
      return "Socket";
    case "zh":
      return "Socket";
    case "fr":
      return "Prise, plaque de prise";
    case "ja":
      return "コンセント、コンセントプレート";
    default:
      return "Socket";
  }
};

export const translateSocket = (language: string) => {
  switch (language) {
    case "vi":
      return "Ổ cắm";
    case "en":
      return "Socket";
    case "zh":
      return "Socket";
    case "fr":
      return "Prise";
    case "ja":
      return "コンセント";
    default:
      return "Socket"; // Default is English
  }
};

export const translatePaint = (language: string) => {
  switch (language) {
    case "vi":
      return "Sơn";
    case "en":
      return "Paint";
    case "zh":
      return "Paint";
    case "fr":
      return "Peinture";
    case "ja":
      return "塗料";
    default:
      return "Paint";
  }
};

export const translateBathroomMaterials = (language: string) => {
  switch (language) {
    case "vi":
      return "Vật liệu nhà tắm";
    case "en":
      return "Bathroom materials";
    case "zh":
      return "Bathroom materials";
    case "fr":
      return "Matériaux de salle de bain";
    case "ja":
      return "浴室材料";
    default:
      return "Bathroom materials";
  }
};

export const translateBathroom = (language: string) => {
  switch (language) {
    case "vi":
      return "Nhà tắm";
    case "en":
      return "Bathroom";
    case "zh":
      return "Bathroom";
    case "fr":
      return "Salle";
    case "ja":
      return "バスルーム";
    default:
      return "Bathroom"; // Default is English
  }
};

export const translateLightBulb = (language: string) => {
  switch (language) {
    case "vi":
      return "Bóng đèn";
    case "en":
      return "Light bulb";
    case "zh":
      return "Light bulb";
    case "fr":
      return "Ampoule";
    case "ja":
      return "電球";
    default:
      return "Light bulb";
  }
};

export const translateCommonItems = (language: string) => {
  switch (language) {
    case "vi":
      return "Đồ thường dùng";
    case "en":
      return "Common items";
    case "zh":
      return "Common items";
    case "fr":
      return "Articles courants";
    case "ja":
      return "一般的なアイテム";
    default:
      return "Common items";
  }
};

export const translateCommonUse = (language: string) => {
  switch (language) {
    case "vi":
      return "Thường dùng";
    case "en":
      return "Commonly used";
    case "zh":
      return "Commonly used";
    case "fr":
      return "Courant"; // Shorter French translation
    case "ja":
      return "よく使われる";
    default:
      return "Commonly used"; // Default is English
  }
};

export const translateNoItemsLiked = (language: string) => {
  switch (language) {
    case "vi":
      return "Chưa có sản phẩm được thả";
    case "en":
      return "No items liked yet";
    case "zh":
      return "尚未点赞任何产品";
    case "fr":
      return "Aucun article aimé pour le moment";
    case "ja":
      return "まだいいねされた商品はありません";
    default:
      return "No items liked yet"; // Default is English
  }
};

export const translateDesktopOnlyMessage = (language: string) => {
  switch (language) {
    case "vi":
      return "Xin lỗi, trò chơi này chỉ hoạt động trên desktop!";
    case "en":
      return "Sorry, this game only works on desktop!";
    case "zh":
      return "抱歉，这个游戏只能在桌面版上运行！";
    case "fr":
      return "Désolé, ce jeu ne fonctionne que sur bureau !";
    case "ja":
      return "申し訳ありませんが、このゲームはデスクトップでのみ動作します！";
    default:
      return "Sorry, this game only works on desktop!"; // Default is English
  }
};

export const translateGameCoins = (language: string) => {
  switch (language) {
    case "vi":
      return "Trò Chơi nhận xu";
    case "en":
      return "Game earns coins";
    case "zh":
      return "游戏赚取金币";
    case "fr":
      return "Jeu gagne des pièces";
    case "ja":
      return "ゲームでコインを獲得";
    default:
      return "Game earns coins"; // Default is English
  }
};

export const translateNote = (language: string) => {
  switch (language) {
    case "vi":
      return "Lưu ý";
    case "en":
      return "Note";
    case "zh":
      return "注意";
    case "fr":
      return "Remarque";
    case "ja":
      return "注意";
    default:
      return "Note"; // Default is English
  }
};

export const translateUseButtonsOrArrows = (language: string) => {
  switch (language) {
    case "vi":
      return "Sử dụng các nút hoặc mũi tên";
    case "en":
      return "Use buttons or arrows";
    case "zh":
      return "使用按钮或箭头";
    case "fr":
      return "Utilisez les boutons ou les flèches";
    case "ja":
      return "ボタンや矢印を使用する";
    default:
      return "Use buttons or arrows"; // Default is English
  }
};

export const translateControlOrPressButtons = (language: string) => {
  switch (language) {
    case "vi":
      return "Để điều khiển hoặc ấn các nút có sẵn. Nhấn";
    case "en":
      return "To control or press available buttons. Press";
    case "zh":
      return "通过控制或按下可用的按钮。按下";
    case "fr":
      return "Pour contrôler ou appuyer sur les boutons disponibles. Appuyez";
    case "ja":
      return "利用可能なボタンを操作または押します。押す";
    default:
      return "To control or press available buttons. Press"; // Default is English
  }
};

export const translateStartOrRefreshGame = (language: string) => {
  switch (language) {
    case "vi":
      return "Để bắt đầu trò chơi hoặc làm mới.";
    case "en":
      return "To start the game or refresh.";
    case "zh":
      return "开始游戏或刷新";
    case "fr":
      return "Pour commencer le jeu ou rafraîchir.";
    case "ja":
      return "ゲームを開始するか、リフレッシュしてください。";
    default:
      return "To start the game or refresh."; // Default is English
  }
};

export const translateGoodExperience = (language: string) => {
  switch (language) {
    case "vi":
      return "Để có một trải nghiệm tốt";
    case "en":
      return "For a better experience";
    case "zh":
      return "为了更好的体验";
    case "fr":
      return "Pour une meilleure expérience";
    case "ja":
      return "より良い体験のために";
    default:
      return "For a better experience"; // Default is English
  }
};

export const translateClickOnSmile = (language: string) => {
  switch (language) {
    case "vi":
      return "Click vào mặt cười";
    case "en":
      return "Click on the smiley face";
    case "zh":
      return "点击笑脸";
    case "fr":
      return "Cliquez sur le visage souriant";
    case "ja":
      return "スマイリーフェイスをクリック";
    default:
      return "Click on the smiley face"; // Default is English
  }
};

export const translateStartGameOrRefresh = (language: string) => {
  switch (language) {
    case "vi":
      return "để bắt đầu trò chơi hoặc làm mới";
    case "en":
      return "to start the game or refresh";
    case "zh":
      return "开始游戏或刷新";
    case "fr":
      return "pour commencer le jeu ou actualiser";
    case "ja":
      return "ゲームを開始するか、リフレッシュする";
    default:
      return "to start the game or refresh"; // Default is English
  }
};

export const translateExperienceMessage = (language: string) => {
  switch (language) {
    case "vi":
      return "Để trải nghiệm tốt xem bảng điều khiển để di chuyển khối theo hướng.";
    case "en":
      return "For a better experience, view the control panel to move the block in the direction.";
    case "zh":
      return "为了更好的体验，请查看控制面板以按方向移动方块。";
    case "fr":
      return "Pour une meilleure expérience, consultez le panneau de commande pour déplacer le bloc dans la direction.";
    case "ja":
      return "より良い体験のために、コントロールパネルを見て、方向に沿ってブロックを移動してください。";
    default:
      return "For a better experience, view the control panel to move the block in the direction."; // Default is English
  }
};

export const translateTotalCoinsReceived = (language: string) => {
  switch (language) {
    case "vi":
      return "Tổng xu nhận được:";
    case "en":
      return "Total coins received:";
    case "zh":
      return "总共获得的金币：";
    case "fr":
      return "Total des pièces reçues :";
    case "ja":
      return "受け取った総コイン数：";
    default:
      return "Total coins received:"; // Default is English
  }
};

export const translateListProductMessage = (language: string) => {
  switch (language) {
    case "vi":
      return "Xin lỗi, danh sách sản phẩm này chỉ hoạt động trên điện thoại!";
    case "en":
      return "Sorry, this List Product only works on mobile!";
    case "zh":
      return "抱歉，此产品列表仅在手机上工作！";
    case "fr":
      return "Désolé, cette liste de produits ne fonctionne que sur mobile !";
    case "ja":
      return "申し訳ありませんが、この製品リストはモバイルでのみ機能します！";
    default:
      return "Sorry, this List Product only works on mobile!"; // Default is English
  }
};

export const translateMobileOnlyMessage = (language: string) => {
  switch (language) {
    case "vi":
      return "Xin lỗi, tiện ích này chỉ hoạt động trên điện thoại di động!";
    case "en":
      return "Sorry, this utility only works on mobile!";
    case "zh":
      return "抱歉，此工具仅适用于移动设备！";
    case "fr":
      return "Désolé, cet outil ne fonctionne que sur mobile !";
    case "ja":
      return "申し訳ありませんが、このツールはモバイルのみで動作します！";
    default:
      return "Sorry, this utility only works on mobile!"; // Default is English
  }
};

export const translatePaymentFailed = (language: string) => {
  switch (language) {
    case "vi":
      return "Đơn hàng của bạn đã thanh toán không thành công.";
    case "en":
      return "Your order payment was unsuccessful.";
    case "zh":
      return "您的订单支付失败。";
    case "fr":
      return "Le paiement de votre commande a échoué.";
    case "ja":
      return "ご注文の支払いは成功しませんでした。";
    default:
      return "Your order payment was unsuccessful."; // Default is English
  }
};

export const translatePlease = (language: string) => {
  switch (language) {
    case "vi":
      return "Quý khách vui lòng";
    case "en":
      return "Please";
    case "zh":
      return "请";
    case "fr":
      return "S'il vous plaît";
    case "ja":
      return "お願いします";
    default:
      return "Please"; // Default is English
  }
};

export const translateCheck = (language: string) => {
  switch (language) {
    case "vi":
      return "KIỂM TRA";
    case "en":
      return "Check";
    case "zh":
      return "检查";
    case "fr":
      return "Vérifier";
    case "ja":
      return "チェック";
    default:
      return "Check"; // Default is English
  }
};

export const translateNo = (language: string) => {
  switch (language) {
    case "vi":
      return "KHÔNG";
    case "en":
      return "NO";
    case "zh":
      return "不";
    case "fr":
      return "NON";
    case "ja":
      return "いいえ";
    default:
      return "NO"; // Default is English
  }
};

export const translatePaymentProcess = (language: string) => {
  switch (language) {
    case "vi":
      return "Quá trình thanh toán trước khi tắt trình duyệt.";
    case "en":
      return "Payment process before closing the browser.";
    case "zh":
      return "在关闭浏览器之前的支付过程。";
    case "fr":
      return "Processus de paiement avant de fermer le navigateur.";
    case "ja":
      return "ブラウザを閉じる前の支払いプロセス。";
    default:
      return "Payment process before closing the browser."; // Default is English
  }
};

export const translateBrowserCloseMessage = (language: string) => {
  switch (language) {
    case "vi":
      return "Tắt trình duyệt vì đang xử lý tặng quà cho quý khách mua hàng.";
    case "en":
      return "Close the browser as we are processing gift for your purchase.";
    case "zh":
      return "请关闭浏览器，正在处理赠品给您的购买。";
    case "fr":
      return "Fermez le navigateur car nous traitons un cadeau pour votre achat.";
    case "ja":
      return "購入商品のプレゼント処理中のため、ブラウザを閉じてください。";
    default:
      return "Close the browser as we are processing gift for your purchase."; // Default is English
  }
};

export const translateBackToPayment = (language: string, countdown: number) => {
  switch (language) {
    case "vi":
      return `Trở lại trang thanh toán trong ${countdown} giây. <br /> Xin vui lòng chờ trong giây lát...`;
    case "en":
      return `Back to the payment page in ${countdown} seconds. <br /> Please wait a moment...`;
    case "zh":
      return `将在 ${countdown} 秒内返回支付页面。 <br /> 请稍等片刻...`;
    case "fr":
      return `Retour à la page de paiement dans ${countdown} secondes. <br /> Veuillez patienter un instant...`;
    case "ja":
      return `支払いページに ${countdown} 秒で戻ります。 <br /> 少々お待ちください...`;
    default:
      return `Back to the payment page in ${countdown} seconds. <br /> Please wait a moment...`; // Default is English
  }
};

export const translateBeforeClosingBrowser = (language: string) => {
  switch (language) {
    case "vi":
      return "đơn hàng trước khi tắt trình duyệt";
    case "en":
      return "order before closing the browser";
    case "zh":
      return "在关闭浏览器之前的订单";
    case "fr":
      return "commande avant de fermer le navigateur";
    case "ja":
      return "ブラウザを閉じる前の注文";
    default:
      return "order before closing the browser"; // Default is English
  }
};

export const translateBackToHome = (language: string) => {
  switch (language) {
    case "vi":
      return "Trở về trang chủ 🏠";
    case "en":
      return "Back to home 🏠";
    case "zh":
      return "返回首页 🏠";
    case "fr":
      return "Retour à l'accueil 🏠";
    case "ja":
      return "ホームへ戻る 🏠";
    default:
      return "Back to home 🏠"; // Default is English
  }
};

export const translateResultForTerm = (language: string) => {
  switch (language) {
    case "vi":
      return "Kết quả cho từ";
    case "en":
      return "Result for term";
    case "zh":
      return "术语的结果";
    case "fr":
      return "Résultat pour le terme";
    case "ja":
      return "用語の結果";
    default:
      return "Result for term"; // Default is English
  }
};

export const translateNoResultFound = (language: string) => {
  switch (language) {
    case "vi":
      return "Không tìm thấy kết quả. Thử tìm kiếm cái khác.";
    case "en":
      return "No result found. Try searching for something else.";
    case "zh":
      return "未找到结果。尝试搜索其他内容。";
    case "fr":
      return "Aucun résultat trouvé. Essayez de rechercher autre chose.";
    case "ja":
      return "結果が見つかりませんでした。他のものを検索してみてください。";
    default:
      return "No result found. Try searching for something else."; // Default is English
  }
};

export const translateOrderSuccess = (language: string) => {
  switch (language) {
    case "vi":
      return "Đặt hàng thành công!";
    case "en":
      return "Order placed successfully!";
    case "zh":
      return "订单成功！";
    case "fr":
      return "Commande réussie !";
    case "ja":
      return "注文が成功しました！";
    default:
      return "Order placed successfully!"; // Default is English
  }
};

export const translateOrderCode = (language: string) => {
  switch (language) {
    case "vi":
      return "Mã đơn hàng:";
    case "en":
      return "Order code:";
    case "zh":
      return "订单号：";
    case "fr":
      return "Code de commande :";
    case "ja":
      return "注文コード：";
    default:
      return "Order code:"; // Default is English
  }
};

export const translatePaidAmount = (language: string) => {
  switch (language) {
    case "vi":
      return "Số tiền đã thanh toán:";
    case "en":
      return "Amount paid:";
    case "zh":
      return "已支付金额：";
    case "fr":
      return "Montant payé :";
    case "ja":
      return "支払額：";
    default:
      return "Amount paid:"; // Default is English
  }
};

export const translateAmountToPay = (language: string) => {
  switch (language) {
    case "vi":
      return "Số tiền cần thanh toán:";
    case "en":
      return "Amount to pay:";
    case "zh":
      return "需要支付的金额：";
    case "fr":
      return "Montant à payer :";
    case "ja":
      return "支払うべき金額：";
    default:
      return "Amount to pay:"; // Default is English
  }
};

export const translateGiftWheel = (language: string) => {
  switch (language) {
    case "vi":
      return "Vòng quay được tặng:";
    case "en":
      return "Gift wheel:";
    case "zh":
      return "赠送的转盘：";
    case "fr":
      return "Roue cadeau :";
    case "ja":
      return "プレゼントホイール：";
    default:
      return "Gift wheel:"; // Default is English
  }
};

export const translateInsufficientAmount = (language: string) => {
  switch (language) {
    case "vi":
      return "Số tiền không đáp ứng";
    case "en":
      return "Insufficient amount";
    case "zh":
      return "金额不足";
    case "fr":
      return "Montant insuffisant";
    case "ja":
      return "金額が不足しています";
    default:
      return "Insufficient amount"; // Default is English
  }
};

export const translatePayToReceiveReward = (language: string) => {
  switch (language) {
    case "vi":
      return "Thanh toán để nhận thưởng!";
    case "en":
      return "Pay to receive reward!";
    case "zh":
      return "付款以领取奖励！";
    case "fr":
      return "Payez pour recevoir la récompense !";
    case "ja":
      return "報酬を受け取るために支払ってください！";
    default:
      return "Pay to receive reward!"; // Default is English
  }
};

export const translateOrderTime = (language: string) => {
  switch (language) {
    case "vi":
      return "Thời gian đặt hàng:";
    case "en":
      return "Order time:";
    case "zh":
      return "下单时间：";
    case "fr":
      return "Heure de commande :";
    case "ja":
      return "注文時間：";
    default:
      return "Order time:"; // Default is English
  }
};

export const translateOrderStatus = (language: string) => {
  switch (language) {
    case "vi":
      return "Trạng thái đơn hàng:";
    case "en":
      return "Order status:";
    case "zh":
      return "订单状态：";
    case "fr":
      return "Statut de la commande :";
    case "ja":
      return "注文ステータス：";
    default:
      return "Order status:"; // Default is English
  }
};

export const translatePaidStatus = (language: string) => {
  switch (language) {
    case "vi":
      return "Đã thanh toán";
    case "en":
      return "Paid";
    case "zh":
      return "已支付";
    case "fr":
      return "Payé";
    case "ja":
      return "支払い済み";
    default:
      return "Paid"; // Default is English
  }
};

export const translateUnpaidStatus = (language: string) => {
  switch (language) {
    case "vi":
      return "Chưa thanh toán";
    case "en":
      return "Unpaid";
    case "zh":
      return "未支付";
    case "fr":
      return "Non payé";
    case "ja":
      return "未払い";
    default:
      return "Unpaid"; // Default is English
  }
};

export const translateLuckyWheel = (language: string) => {
  switch (language) {
    case "vi":
      return "Vòng quay May Mắn";
    case "en":
      return "Lucky Wheel";
    case "zh":
      return "幸运转盘";
    case "fr":
      return "Roulette Chanceuse";
    case "ja":
      return "ラッキーホイール";
    default:
      return "Lucky Wheel"; // Default is English
  }
};

export const translatePlayToWin = (language: string) => {
  switch (language) {
    case "vi":
      return "Vui chơi trúng thưởng";
    case "en":
      return "Play to Win";
    case "zh":
      return "玩游戏赢奖品";
    case "fr":
      return "Jouer pour gagner";
    case "ja":
      return "遊んで賞品を獲得";
    default:
      return "Play to Win"; // Default is English
  }
};

export const translatePurchaseRewards = (language: string) => {
  switch (language) {
    case "vi":
      return "Khi mua 1.000.000đ sẽ được tặng 2 vòng quay may mắn";
    case "en":
      return "When you purchase 1,000,000 VND, you will receive 2 lucky spins";
    case "zh":
      return "购买1,000,000越南盾可获得2次幸运抽奖";
    case "fr":
      return "Lors de l'achat de 1 000 000 VND, vous recevrez 2 tours de chance";
    case "ja":
      return "1,000,000 VNDを購入すると、2回のラッキースピンがもらえます";
    default:
      return "When you purchase 1,000,000 VND, you will receive 2 lucky spins"; // Default is English
  }
};

export const translatePurchaseReward = (language: string) => {
  switch (language) {
    case "vi":
      return "Khi mua 500.000đ sẽ được tặng 1 vòng quay may mắn";
    case "en":
      return "When you purchase 500,000 VND, you will receive 1 lucky spin";
    case "zh":
      return "购买500,000越南盾可获得1次幸运抽奖";
    case "fr":
      return "Lors de l'achat de 500 000 VND, vous recevrez 1 tour de chance";
    case "ja":
      return "500,000 VNDを購入すると、1回のラッキースピンがもらえます";
    default:
      return "When you purchase 500,000 VND, you will receive 1 lucky spin"; // Default is English
  }
};

export const translateCongratulations = (language: string) => {
  switch (language) {
    case "vi":
      return "Chúc mừng bạn đã có";
    case "en":
      return "Congratulations, you have";
    case "zh":
      return "恭喜你拥有了";
    case "fr":
      return "Félicitations, vous avez";
    case "ja":
      return "おめでとうございます、あなたは持っています";
    default:
      return "Congratulations, you have"; // Default is English
  }
};

export const translateTotal = (language: string) => {
  switch (language) {
    case "vi":
      return "Tổng";
    case "en":
      return "Total";
    case "zh":
      return "总计";
    case "fr":
      return "Total";
    case "ja":
      return "合計";
    default:
      return "Total"; // Default is English
  }
};

export const translateCoins = (language: string) => {
  switch (language) {
    case "vi":
      return "Xu";
    case "en":
      return "Coins";
    case "zh":
      return "金币";
    case "fr":
      return "Pièces";
    case "ja":
      return "コイン";
    default:
      return "Coins"; // Default is English
  }
};

export const translateSpin = (language: string) => {
  switch (language) {
    case "vi":
      return "Vòng quay";
    case "en":
      return "Spin";
    case "zh":
      return "旋转";
    case "fr":
      return "Rotation";
    case "ja":
      return "スピン";
    default:
      return "Spin"; // Default is English
  }
};

export const translateRefreshMessage = (language: string) => {
  switch (language) {
    case "vi":
      return "Nếu như xu chưa được cập nhật lại bạn có thể F5 để xu được cập nhật lại nhanh nhất.";
    case "en":
      return "If the coins haven't been updated, you can press F5 to refresh and update the coins quickly.";
    case "zh":
      return "如果金币还没有更新，您可以按F5快速刷新以更新金币。";
    case "fr":
      return "Si les pièces n'ont pas été mises à jour, vous pouvez appuyer sur F5 pour les mettre à jour rapidement.";
    case "ja":
      return "コインがまだ更新されていない場合は、F5を押してコインを迅速に更新できます。";
    default:
      return "If the coins haven't been updated, you can press F5 to refresh and update the coins quickly."; // Default is English
  }
};

export const translateUtility = (language: string) => {
  switch (language) {
    case "vi":
      return "Tiện ích";
    case "en":
      return "Utility";
    case "zh":
      return "工具";
    case "fr":
      return "Outil";
    case "ja":
      return "ツール";
    default:
      return "Utility";
  }
};

export const translateConvenient = (language: string) => {
  switch (language) {
    case "vi":
      return "Tiện";
    case "en":
      return "Convenient";
    case "zh":
      return "方便";
    case "fr":
      return "Pratique";
    case "ja":
      return "便利";
    default:
      return "Convenient"; // Default is English
  }
};

export const translateUseful = (language: string) => {
  switch (language) {
    case "vi":
      return "ích";
    case "en":
      return "useful";
    case "zh":
      return "有用";
    case "fr":
      return "utile";
    case "ja":
      return "役立つ";
    default:
      return "useful"; // Default is English
  }
};

export const translateSpinLucky = (language: string) => {
  switch (language) {
    case "vi":
      return { name: "Vòng quay", name2: "may mắn" };
    case "en":
      return { name: "Spin", name2: "Lucky" };
    case "zh":
      return { name: "幸运转盘", name2: "幸运" };
    case "fr":
      return { name: "Tour de chance", name2: "Chanceux" };
    case "ja":
      return { name: "ラッキースピン", name2: "幸運" };
    default:
      return { name: "Spin", name2: "Lucky" };
  }
};

export const translateWarehouse = (language: string) => {
  switch (language) {
    case "vi":
      return { name: "Mã giảm giá", name2: "siêu tốc" };
    case "en":
      return { name: "Discount Code", name2: "Super Speed" };
    case "zh":
      return { name: "折扣码", name2: "超速" };
    case "fr":
      return { name: "Code de réduction", name2: "Super rapide" };
    case "ja":
      return { name: "割引コード", name2: "スーパースピード" };
    default:
      return { name: "Discount Code", name2: "Super Speed" };
  }
};

export const translateNoDiscountCode = (language: string) => {
  switch (language) {
    case "vi":
      return "Không có mã giảm giá.";
    case "en":
      return "No discount code available.";
    case "zh":
      return "没有可用的折扣代码。";
    case "fr":
      return "Aucun code de réduction disponible.";
    case "ja":
      return "割引コードはありません。";
    default:
      return "No discount code available."; // Default is English
  }
};

export const translatePackageProduct = (language: string) => {
  switch (language) {
    case "vi":
      return { name: "Vận chuyển", name2: "đơn hàng" };
    case "en":
      return { name: "Shipping", name2: "Order" };
    case "zh":
      return { name: "运输", name2: "订单" };
    case "fr":
      return { name: "Expédition", name2: "Commande" };
    case "ja":
      return { name: "配送", name2: "注文" };
    default:
      return { name: "Shipping", name2: "Order" };
  }
};

export const translateSortHighToLow = (language: string) => {
  switch (language) {
    case "vi":
      return "Giá cao đến thấp";
    case "en":
      return "Price: High to Low";
    case "zh":
      return "价格从高到低";
    case "fr":
      return "Prix : du plus élevé au plus bas";
    case "ja":
      return "価格が高い順";
    default:
      return "Price: High to Low"; // Default is English
  }
};

export const translateSortLowToHigh = (language: string) => {
  switch (language) {
    case "vi":
      return "Giá thấp đến cao";
    case "en":
      return "Price: Low to High";
    case "zh":
      return "价格从低到高";
    case "fr":
      return "Prix : du plus bas au plus élevé";
    case "ja":
      return "価格が低い順";
    default:
      return "Price: Low to High"; // Default is English
  }
};

export const translateSortNameAToZ = (language: string) => {
  switch (language) {
    case "vi":
      return "Tên A đến Z";
    case "en":
      return "Name: A to Z";
    case "zh":
      return "名称从 A 到 Z";
    case "fr":
      return "Nom : de A à Z";
    case "ja":
      return "名前がAからZ順";
    default:
      return "Name: A to Z"; // Default is English
  }
};

export const translateSortNameZToA = (language: string) => {
  switch (language) {
    case "vi":
      return "Tên Z đến A";
    case "en":
      return "Name: Z to A";
    case "zh":
      return "名称从 Z 到 A";
    case "fr":
      return "Nom : de Z à A";
    case "ja":
      return "名前がZからA順";
    default:
      return "Name: Z to A"; // Default is English
  }
};

export const translateHotDeals = (language: string) => {
  switch (language) {
    case "vi":
      return "Khuyến mãi hot";
    case "en":
      return "Hot Deals";
    case "zh":
      return "热门促销";
    case "fr":
      return "Offres chaudes";
    case "ja":
      return "ホットディール";
    default:
      return "Hot Deals"; // Default is English
  }
};

export const translateCannotRemoveSavedProduct = (language: string) => {
  switch (language) {
    case "vi":
      return "Không thể xóa lưu sản phẩm!";
    case "en":
      return "Cannot remove saved product!";
    case "zh":
      return "无法删除已保存的产品！";
    case "fr":
      return "Impossible de supprimer le produit enregistré !";
    case "ja":
      return "保存した商品を削除できません！";
    default:
      return "Cannot remove saved product!"; // Default is English
  }
};

export const translateCannotSaveProduct = (language: string) => {
  switch (language) {
    case "vi":
      return "Không thể lưu sản phẩm!";
    case "en":
      return "Cannot save product!";
    case "zh":
      return "无法保存产品！";
    case "fr":
      return "Impossible d'enregistrer le produit !";
    case "ja":
      return "商品を保存できません！";
    default:
      return "Cannot save product!"; // Default is English
  }
};

export const translateInsufficientStock = (language: string) => {
  switch (language) {
    case "vi":
      return "Số lượng sản phẩm trong kho không đủ!";
    case "en":
      return "Insufficient stock quantity!";
    case "zh":
      return "库存数量不足！";
    case "fr":
      return "Quantité de stock insuffisante !";
    case "ja":
      return "在庫数量が不足しています！";
    default:
      return "Insufficient stock quantity!"; // Default is English
  }
};

export const translateProductQuantityUpdated = (language: string) => {
  switch (language) {
    case "vi":
      return "Sản phẩm đã được cập nhật số lượng trong giỏ hàng.";
    case "en":
      return "Product quantity has been updated in the cart.";
    case "zh":
      return "产品数量已在购物车中更新。";
    case "fr":
      return "La quantité du produit a été mise à jour dans le panier.";
    case "ja":
      return "カート内の商品数量が更新されました。";
    default:
      return "Product quantity has been updated in the cart."; // Default is English
  }
};

export const translateProductAddedToCart = (language: string) => {
  switch (language) {
    case "vi":
      return "Sản phẩm đã thêm vào giỏ hàng.";
    case "en":
      return "Product has been added to the cart.";
    case "zh":
      return "产品已添加到购物车。";
    case "fr":
      return "Le produit a été ajouté au panier.";
    case "ja":
      return "商品がカートに追加されました。";
    default:
      return "Product has been added to the cart."; // Default is English
  }
};

export const translateSize = (language: string) => {
  switch (language) {
    case "vi":
      return "Kích cỡ:";
    case "en":
      return "Size:";
    case "zh":
      return "尺寸：";
    case "fr":
      return "Taille :";
    case "ja":
      return "サイズ：";
    default:
      return "Size:"; // Default is English
  }
};

export const translateColor = (language: string) => {
  switch (language) {
    case "vi":
      return "Màu:";
    case "en":
      return "Color:";
    case "zh":
      return "颜色：";
    case "fr":
      return "Couleur :";
    case "ja":
      return "色：";
    default:
      return "Color:"; // Default is English
  }
};

export const translateColorLowerCase = (language: string) => {
  switch (language) {
    case "vi":
      return "màu";
    case "en":
      return "color";
    case "zh":
      return "颜色";
    case "fr":
      return "couleur";
    case "ja":
      return "色";
    default:
      return "color";
  }
};

export const translateAdded = (language: string) => {
  switch (language) {
    case "vi":
      return "Đã thêm";
    case "en":
      return "Added";
    case "zh":
      return "已添加";
    case "fr":
      return "Ajouté";
    case "ja":
      return "追加済み";
    default:
      return "Added"; // Default is English
  }
};

export const translateAddNew = (language: string) => {
  switch (language) {
    case "vi":
      return "Thêm mới";
    case "en":
      return "Add New";
    case "zh":
      return "新增";
    case "fr":
      return "Ajouter un nouveau";
    case "ja":
      return "新規追加";
    default:
      return "Add New"; // Default is English
  }
};

export const translateDecrease = (language: string) => {
  switch (language) {
    case "vi":
      return "Giảm";
    case "en":
      return "Decrease";
    case "zh":
      return "减少";
    case "fr":
      return "Diminuer";
    case "ja":
      return "減少";
    default:
      return "Decrease"; // Default is English
  }
};

export const translateMinimum = (language: string) => {
  switch (language) {
    case "vi":
      return "Tối thiểu:";
    case "en":
      return "Minimum:";
    case "zh":
      return "最小值：";
    case "fr":
      return "Minimum :";
    case "ja":
      return "最小値：";
    default:
      return "Minimum:"; // Default is English
  }
};
export const translateMaximum = (language: string) => {
  switch (language) {
    case "vi":
      return "Tối đa:";
    case "en":
      return "Maximum:";
    case "zh":
      return "最大值：";
    case "fr":
      return "Maximum :";
    case "ja":
      return "最大値：";
    default:
      return "Maximum:"; // Default is English
  }
};

export const translateProductTrending = (language: string) => {
  switch (language) {
    case "vi":
      return "Sản phẩm thịnh hành";
    case "en":
      return "Product Trending";
    case "zh":
      return "产品趋势";
    case "fr":
      return "Produits tendance";
    case "ja":
      return "トレンド商品";
    default:
      return "Product Trending"; // Default is English
  }
};

export const translateSavedSuccessfully = (language: string) => {
  switch (language) {
    case "vi":
      return "Đã lưu thành công!";
    case "en":
      return "Saved successfully!";
    case "zh":
      return "保存成功！";
    case "fr":
      return "Enregistré avec succès !";
    case "ja":
      return "保存に成功しました！";
    default:
      return "Saved successfully!"; // Default is English
  }
};

export const translateMaximumDiscount = (language: string) => {
  switch (language) {
    case "vi":
      return "Giảm tối đa";
    case "en":
      return "Maximum discount";
    case "zh":
      return "最大折扣";
    case "fr":
      return "Réduction maximale";
    case "ja":
      return "最大割引";
    default:
      return "Maximum discount"; // Default is English
  }
};

export const translateExpiryDate = (language: string) => {
  switch (language) {
    case "vi":
      return "Thời hạn:";
    case "en":
      return "Expiry date:";
    case "zh":
      return "有效期：";
    case "fr":
      return "Date d'expiration :";
    case "ja":
      return "有効期限：";
    default:
      return "Expiry date:"; // Default is English
  }
};

export const translateCode = (language: string) => {
  switch (language) {
    case "vi":
      return "Mã:";
    case "en":
      return "Code:";
    case "zh":
      return "代码：";
    case "fr":
      return "Code :";
    case "ja":
      return "コード：";
    default:
      return "Code:"; // Default is English
  }
};

export const translateSave = (language: string) => {
  switch (language) {
    case "vi":
      return "Lưu";
    case "en":
      return "Save";
    case "zh":
      return "保存";
    case "fr":
      return "Enregistrer";
    case "ja":
      return "保存";
    default:
      return "Save"; // Default is English
  }
};

export const translateDiscountCodeNotice = (language: string) => {
  switch (language) {
    case "vi":
      return "Mã giảm giá chỉ áp dụng cho khách hàng thanh toán trực tuyến. Khi khách hàng ấn vào lưu hãy đến chỗ thanh toán để dán mã code vào.";
    case "en":
      return "The discount code is only applicable for customers paying online. After clicking save, proceed to the payment section to paste the code.";
    case "zh":
      return "折扣代码仅适用于在线支付的客户。点击保存后，请前往支付页面粘贴代码。";
    case "fr":
      return "Le code de réduction est uniquement applicable aux clients payant en ligne. Après avoir cliqué sur enregistrer, allez à la section de paiement pour coller le code.";
    case "ja":
      return "割引コードはオンライン決済を利用するお客様のみが対象です。「保存」をクリックした後、支払いセクションに進みコードを貼り付けてください。";
    default:
      return "The discount code is only applicable for customers paying online. After clicking save, proceed to the payment section to paste the code."; // Default is English
  }
};

export const translateEmptyOrder = (language: string) => {
  switch (language) {
    case "vi":
      return "Đơn hàng của bạn còn trống";
    case "en":
      return "Your order is empty";
    case "zh":
      return "您的订单是空的";
    case "fr":
      return "Votre commande est vide";
    case "ja":
      return "ご注文は空です";
    default:
      return "Your order is empty"; // Default is English
  }
};

export const translateColorCategory = (language: string) => {
  switch (language) {
    case "vi":
      return "Phân loại màu:";
    case "en":
      return "Color Category:";
    case "zh":
      return "颜色分类：";
    case "fr":
      return "Couleur :";
    case "ja":
      return "色分類：";
    default:
      return "Color Category:";
  }
};

export const translateSizeCategory = (language: string) => {
  switch (language) {
    case "vi":
      return "Phân loại kích thước:";
    case "en":
      return "Size Category:";
    case "zh":
      return "尺寸分类：";
    case "fr":
      return "Catégorie de taille :";
    case "ja":
      return "サイズカテゴリ：";
    default:
      return "Size Category:"; // Default is English
  }
};

//warehouse
export const translateWaitingForConfirmation = (language: string) => {
  switch (language) {
    case "vi":
      return "Chờ xác nhận";
    case "en":
      return "Waiting";
    case "zh":
      return "等待确认";
    case "fr":
      return "En attente";
    case "ja":
      return "確認待ち";
    default:
      return "Waiting";
  }
};

export const translateProcessing = (language: string) => {
  switch (language) {
    case "vi":
      return "ĐANG XỬ LÝ";
    case "en":
      return "Processing";
    case "zh":
      return "处理中";
    case "fr":
      return "En cours";
    case "ja":
      return "処理中";
    default:
      return "Processing";
  }
};

export const translatePreparingGoods = (language: string) => {
  switch (language) {
    case "vi":
      return "Chuẩn bị hàng";
    case "en":
      return "Preparing goods";
    case "zh":
      return "准备商品";
    case "fr":
      return "Préparation";
    case "ja":
      return "商品準備中";
    default:
      return "Preparing goods";
  }
};

export const translatePackingGoods = (language: string) => {
  switch (language) {
    case "vi":
      return "SOẠN HÀNG";
    case "en":
      return "Packing goods";
    case "zh":
      return "打包商品";
    case "fr":
      return "Emballage";
    case "ja":
      return "商品梱包中";
    default:
      return "Packing goods";
  }
};

export const translateShippedToShipper = (language: string) => {
  switch (language) {
    case "vi":
      return "Chuyển hàng cho shipper";
    case "en":
      return "Shipped to shipper";
    case "zh":
      return "已交给快递员";
    case "fr":
      return "Expédié au livreur";
    case "ja":
      return "配達員に発送";
    default:
      return "Shipped to shipper";
  }
};

export const translateHandedOverToShipper = (language: string) => {
  switch (language) {
    case "vi":
      return "BÀN GIAO SHIPPER";
    case "en":
      return "Handed over to shipper";
    case "zh":
      return "交给快递员";
    case "fr":
      return "Remis au livreur";
    case "ja":
      return "配達員に引き渡し";
    default:
      return "Handed over to shipper";
  }
};

export const translateOrderShipping = (language: string) => {
  switch (language) {
    case "vi":
      return "Đơn hàng đang giao";
    case "en":
      return "Order is being delivered";
    case "zh":
      return "订单正在配送";
    case "fr":
      return "En livraison";
    case "ja":
      return "注文は配送中";
    default:
      return "Order is being delivered";
  }
};

export const translateDelivering = (language: string) => {
  switch (language) {
    case "vi":
      return "ĐANG GIAO";
    case "en":
      return "Delivering";
    case "zh":
      return "配送中";
    case "fr":
      return "En livraison";
    case "ja":
      return "配送中";
    default:
      return "Delivering";
  }
};

export const translateDeliveringNormal = (language: string) => {
  switch (language) {
    case "vi":
      return "Đang giao";
    case "en":
      return "Delivering";
    case "zh":
      return "配送中";
    case "fr":
      return "Livraison";
    case "ja":
      return "配達中";
    default:
      return "Delivering";
  }
};

export const translateDelivered = (language: string) => {
  switch (language) {
    case "vi":
      return "Đã giao";
    case "en":
      return "Delivered";
    case "zh":
      return "已交付";
    case "fr":
      return "Livré";
    case "ja":
      return "配達済み";
    default:
      return "Delivered";
  }
};

export const translateReturnItemNormal = (language: string) => {
  switch (language) {
    case "vi":
      return "Trả hàng";
    case "en":
      return "Return item";
    case "zh":
      return "退货";
    case "fr":
      return "Retour";
    case "ja":
      return "返品";
    default:
      return "Return item";
  }
};

export const translateReDelivering = (language: string) => {
  switch (language) {
    case "vi":
      return "Giao lại hàng";
    case "en":
      return "Re-delivering";
    case "zh":
      return "重新配送";
    case "fr":
      return "Remballage";
    case "ja":
      return "再配達";
    default:
      return "Re-delivering";
  }
};

export const translateReDeliveringNow = (language: string) => {
  switch (language) {
    case "vi":
      return "ĐANG GIAO LẠI HÀNG";
    case "en":
      return "Re-delivering now";
    case "zh":
      return "正在重新配送";
    case "fr":
      return "Livraison en cours";
    case "ja":
      return "再配達中";
    default:
      return "Re-delivering now";
  }
};

export const translateDeliverySuccessful = (language: string) => {
  switch (language) {
    case "vi":
      return "Giao hàng thành công";
    case "en":
      return "Delivery successful";
    case "zh":
      return "配送成功";
    case "fr":
      return "Livraison réussie";
    case "ja":
      return "配送成功";
    default:
      return "Delivery successful";
  }
};

export const translateCompleted = (language: string) => {
  switch (language) {
    case "vi":
      return "HOÀN THÀNH";
    case "en":
      return "Completed";
    case "zh":
      return "完成";
    case "fr":
      return "Terminé";
    case "ja":
      return "完了";
    default:
      return "Completed";
  }
};

export const translateOrderCancelled = (language: string) => {
  switch (language) {
    case "vi":
      return "Đơn hàng đã hủy";
    case "en":
      return "Order cancelled";
    case "zh":
      return "订单已取消";
    case "fr":
      return "Commande annulée";
    case "ja":
      return "注文がキャンセルされました";
    default:
      return "Order cancelled";
  }
};

export const translateCancelOrder = (language: string) => {
  switch (language) {
    case "vi":
      return "HỦY ĐƠN HÀNG";
    case "en":
      return "Cancel Order";
    case "zh":
      return "取消订单";
    case "fr":
      return "Annuler la commande";
    case "ja":
      return "注文をキャンセル";
    default:
      return "Cancel Order";
  }
};

export const translateCancelled = (language: string) => {
  switch (language) {
    case "vi":
      return "Đã hủy";
    case "en":
      return "Cancelled";
    case "zh":
      return "已取消";
    case "fr":
      return "Annulé";
    case "ja":
      return "キャンセル";
    default:
      return "Cancelled";
  }
};

export const translateReturnToShop = (language: string) => {
  switch (language) {
    case "vi":
      return "Trả hàng lại shop";
    case "en":
      return "Return to shop";
    case "zh":
      return "退还商品到店铺";
    case "fr":
      return "Retourner à la boutique";
    case "ja":
      return "ショップに返品";
    default:
      return "Return to shop";
  }
};

export const translateReturnItem = (language: string) => {
  switch (language) {
    case "vi":
      return "TRẢ HÀNG";
    case "en":
      return "Return item";
    case "zh":
      return "退货";
    case "fr":
      return "Retourner l'article";
    case "ja":
      return "商品を返品";
    default:
      return "Return item";
  }
};

export const translateShipperConfirmingOrder = (language: string) => {
  switch (language) {
    case "vi":
      return "Shipper đang xác nhận đơn hàng";
    case "en":
      return "Shipper is confirming the order";
    case "zh":
      return "快递员正在确认订单";
    case "fr":
      return "Le livreur confirme la commande";
    case "ja":
      return "配達員が注文を確認中";
    default:
      return "Shipper is confirming the order";
  }
};

export const translateShipperPreparingToArrive = (language: string) => {
  switch (language) {
    case "vi":
      return "SHIPPER CHUẨN BỊ ĐẾN";
    case "en":
      return "Shipper is preparing to arrive";
    case "zh":
      return "快递员准备到达";
    case "fr":
      return "Le livreur se prépare à arriver";
    case "ja":
      return "配達員が到着準備中";
    default:
      return "Shipper is preparing to arrive";
  }
};

export const translateShipperOnTheWay = (language: string) => {
  switch (language) {
    case "vi":
      return "Shipper đang đến";
    case "en":
      return "Shipper is on the way";
    case "zh":
      return "配送员正在路上";
    case "fr":
      return "Livreur en route";
    case "ja":
      return "配達員が向かっています";
    default:
      return "Shipper is on the way";
  }
};

export const translateShipperPickingUpOrder = (language: string) => {
  switch (language) {
    case "vi":
      return "Shipper đang đến nhận lại hàng";
    case "en":
      return "Shipper is coming to pick up the item";
    case "zh":
      return "快递员正在前来取回商品";
    case "fr":
      return "Le livreur vient récupérer l'article";
    case "ja":
      return "配達員が商品を取りに来ています";
    default:
      return "Shipper is coming to pick up the item";
  }
};

export const translateReceiveItem = (language: string) => {
  switch (language) {
    case "vi":
      return "NHẬN HÀNG";
    case "en":
      return "Receive item";
    case "zh":
      return "收货";
    case "fr":
      return "Recevoir l'article";
    case "ja":
      return "商品を受け取る";
    default:
      return "Receive item";
  }
};

export const translateItemReceivedWithIssue = (language: string) => {
  switch (language) {
    case "vi":
      return "Đã nhận lại hàng có vấn đề";
    case "en":
      return "Item received with issue";
    case "zh":
      return "收到有问题的商品";
    case "fr":
      return "Article reçu avec problème";
    case "ja":
      return "問題のある商品を受け取った";
    default:
      return "Item received with issue";
  }
};

export const translateReturnItemSuccess = (language: string) => {
  switch (language) {
    case "vi":
      return "TRẢ HÀNG THÀNH CÔNG";
    case "en":
      return "Item returned successfully";
    case "zh":
      return "退货成功";
    case "fr":
      return "Retour de l'article réussi";
    case "ja":
      return "商品が正常に返品されました";
    default:
      return "Item returned successfully";
  }
};

export const translatePickUpAtStore = (language: string) => {
  switch (language) {
    case "vi":
      return "Nhận tại cửa hàng";
    case "en":
      return "Pick up at store";
    case "zh":
      return "到店自取";
    case "fr":
      return "Retirer en magasin";
    case "ja":
      return "店舗で受け取る";
    default:
      return "Pick up at store";
  }
};

export const translatePickUpAtStoreUpperCase = (language: string) => {
  switch (language) {
    case "vi":
      return "NHẬN TẠI CỬA HÀNG";
    case "en":
      return "Pick up at store";
    case "zh":
      return "到店自取";
    case "fr":
      return "Retirer en magasin";
    case "ja":
      return "店舗で受け取る";
    default:
      return "Pick up at store";
  }
};

export const translatePreparingOrder = (language: string) => {
  switch (language) {
    case "vi":
      return "Đang soạn hàng";
    case "en":
      return "Preparing order";
    case "zh":
      return "正在准备订单";
    case "fr":
      return "Préparation de la commande";
    case "ja":
      return "注文を準備中";
    default:
      return "Preparing order";
  }
};

export const translatePrepareOrder = (language: string) => {
  switch (language) {
    case "vi":
      return "Soạn hàng";
    case "en":
      return "Prepare order";
    case "zh":
      return "准备订单";
    case "fr":
      return "Préparer";
    case "ja":
      return "注文を準備する";
    default:
      return "Prepare order";
  }
};

export const translateOrderPrepared = (language: string) => {
  switch (language) {
    case "vi":
      return "Đã soạn hàng xong";
    case "en":
      return "Order prepared";
    case "zh":
      return "订单已准备好";
    case "fr":
      return "Commande préparée";
    case "ja":
      return "注文準備完了";
    default:
      return "Order prepared";
  }
};

export const translateCustomerPickUp = (language: string) => {
  switch (language) {
    case "vi":
      return "KHÁCH HÀNG ĐẾN NHẬN";
    case "en":
      return "Customer arrives to pick up";
    case "zh":
      return "客户来取货";
    case "fr":
      return "Le client vient récupérer";
    case "ja":
      return "お客様が受け取りに来る";
    default:
      return "Customer arrives to pick up";
  }
};

export const translateReturnedItem = (language: string) => {
  switch (language) {
    case "vi":
      return "Hàng đã trả";
    case "en":
      return "Item returned";
    case "zh":
      return "商品已退还";
    case "fr":
      return "Retourné";
    case "ja":
      return "返却済み";
    default:
      return "Item returned";
  }
};

export const translateReturnRequestInfo = (language: string) => {
  switch (language) {
    case "vi":
      return "Nếu hàng nhận được có vấn đề, bạn có thể gửi yêu cầu Trả hàng/Hoàn tiền trước 3 ngày kể từ ngày bạn nhận.";
    case "en":
      return "If the received item has issues, you can submit a return/refund request within 3 days from the day you receive it.";
    case "zh":
      return "如果收到的商品有问题，您可以在收到商品后的3天内提交退货/退款申请。";
    case "fr":
      return "Si l'article reçu a des problèmes, vous pouvez soumettre une demande de retour/remboursement dans les 3 jours suivant la réception.";
    case "ja":
      return "受け取った商品に問題がある場合は、受け取った日から3日以内に返品/返金のリクエストを送信できます。";
    default:
      return "If the received item has issues, you can submit a return/refund request within 3 days from the day you receive it.";
  }
};

export const translateResolveOrderFirst = (language: string) => {
  switch (language) {
    case "vi":
      return "Giải quyết đơn hàng trước";
    case "en":
      return "Resolve the order first";
    case "zh":
      return "先解决订单";
    case "fr":
      return "Résoudre d'abord la commande";
    case "ja":
      return "最初に注文を解決する";
    default:
      return "Resolve the order first";
  }
};

export const translateOrderIssueContact = (language: string) => {
  switch (language) {
    case "vi":
      return "Có vấn đề về đơn hàng, liên hệ số điện thoại";
    case "en":
      return "For order issues, contact the phone number";
    case "zh":
      return "订单有问题，请联系电话号码";
    case "fr":
      return "Pour les problèmes de commande, contactez le numéro de téléphone";
    case "ja":
      return "注文に問題がある場合は、電話番号に連絡してください";
    default:
      return "For order issues, contact the phone number";
  }
};

export const translateRate = (language: string) => {
  switch (language) {
    case "vi":
      return "Đánh giá";
    case "en":
      return "Rate";
    case "zh":
      return "评价";
    case "fr":
      return "Évaluer";
    case "ja":
      return "評価";
    default:
      return "Rate";
  }
};

export const translateReturnRefund = (language: string) => {
  switch (language) {
    case "vi":
      return "Trả Hàng/Hoàn Tiền";
    case "en":
      return "Return/Refund";
    case "zh":
      return "退货/退款";
    case "fr":
      return "Retour/Remb.";
    case "ja":
      return "返品/返金";
    default:
      return "Return/Refund";
  }
};

export const translateContactStore = (language: string) => {
  switch (language) {
    case "vi":
      return "Liên hệ cửa hàng";
    case "en":
      return "Contact store";
    case "zh":
      return "联系商店";
    case "fr":
      return "Contacter le magasin";
    case "ja":
      return "店舗に連絡";
    default:
      return "Contact store";
  }
};

export const translateBuyAgain = (language: string) => {
  switch (language) {
    case "vi":
      return "Mua lại";
    case "en":
      return "Buy again";
    case "zh":
      return "再次购买";
    case "fr":
      return "Acheter à nouveau";
    case "ja":
      return "再購入";
    default:
      return "Buy again";
  }
};

export const translateTotalAmount = (language: string) => {
  switch (language) {
    case "vi":
      return "Thành tiền:";
    case "en":
      return "Total amount:";
    case "zh":
      return "总金额：";
    case "fr":
      return "Montant total :";
    case "ja":
      return "合計金額：";
    default:
      return "Total amount:";
  }
};

export const translateNoOrder = (language: string) => {
  switch (language) {
    case "vi":
      return "Chưa có đơn hàng";
    case "en":
      return "No orders yet";
    case "zh":
      return "还没有订单";
    case "fr":
      return "Aucune commande";
    case "ja":
      return "まだ注文がありません";
    default:
      return "No orders yet";
  }
};

export const translateBack = (language: string) => {
  switch (language) {
    case "vi":
      return "TRỞ LẠI";
    case "en":
      return "Back";
    case "zh":
      return "返回";
    case "fr":
      return "Retour";
    case "ja":
      return "戻る";
    default:
      return "Back";
  }
};

export const translateOrderCodeUpperCase = (language: string) => {
  switch (language) {
    case "vi":
      return "MÃ ĐƠN HÀNG:";
    case "en":
      return "ORDER CODE:";
    case "zh":
      return "订单号：";
    case "fr":
      return "Code commande :";
    case "ja":
      return "注文番号：";
    default:
      return "ORDER CODE:";
  }
};

export const translateDeliveryAddress = (language: string) => {
  switch (language) {
    case "vi":
      return "Địa chỉ nhận hàng";
    case "en":
      return "Delivery address";
    case "zh":
      return "收货地址";
    case "fr":
      return "Adresse de livraison";
    case "ja":
      return "配送先住所";
    default:
      return "Delivery address";
  }
};

export const translatePaymentMethod = (language: string) => {
  switch (language) {
    case "vi":
      return "Phương thức thanh toán:";
    case "en":
      return "Payment method:";
    case "zh":
      return "支付方式：";
    case "fr":
      return "Moyen de paiement :";
    case "ja":
      return "支払い方法：";
    default:
      return "Payment method:";
  }
};

export const translateCashPayment = (language: string) => {
  switch (language) {
    case "vi":
      return "Thanh toán tiền mặt";
    case "en":
      return "Cash payment";
    case "zh":
      return "现金支付";
    case "fr":
      return "Paiement en espèces";
    case "ja":
      return "現金支払い";
    default:
      return "Cash payment";
  }
};

export const translateOnlinePayment = (language: string) => {
  switch (language) {
    case "vi":
      return "Thanh toán online";
    case "en":
      return "Online payment";
    case "zh":
      return "在线支付";
    case "fr":
      return "Paiement en ligne";
    case "ja":
      return "オンライン決済";
    default:
      return "Online payment";
  }
};

export const translateWaitForPickup = (language: string) => {
  switch (language) {
    case "vi":
      return "Chờ lấy hàng";
    case "en":
      return "Wait for pickup";
    case "zh":
      return "等待取货";
    case "fr":
      return "En attente";
    case "ja":
      return "引き取り待ち";
    default:
      return "Wait for pickup";
  }
};

export const translateLogin = (language: string) => {
  switch (language) {
    case "vi":
      return "Đăng nhập";
    case "en":
      return "Login";
    case "zh":
      return "登录";
    case "fr":
      return "Connexion";
    case "ja":
      return "ログイン";
    default:
      return "Login";
  }
};

export const translateExit = (language: string) => {
  switch (language) {
    case "vi":
      return "Thoát";
    case "en":
      return "Exit";
    case "zh":
      return "退出";
    case "fr":
      return "Quitter";
    case "ja":
      return "終了";
    default:
      return "Exit";
  }
};

export const translateDashboard = (language: string) => {
  switch (language) {
    case "vi":
      return "Bảng điều khiển";
    case "en":
      return "Dashboard";
    case "zh":
      return "仪表板";
    case "fr":
      return "Tableau de bord";
    case "ja":
      return "ダッシュボード";
    default:
      return "Dashboard";
  }
};

export const translateOK = (language: string) => {
  switch (language) {
    case "vi":
      return "OK";
    case "en":
      return "OK";
    case "zh":
      return "好的";
    case "fr":
      return "D'accord";
    case "ja":
      return "OK";
    default:
      return "OK";
  }
};

export const translateFollowing = (language: string) => {
  switch (language) {
    case "vi":
      return "Đang theo dõi";
    case "en":
      return "Following";
    case "zh":
      return "正在跟随";
    case "fr":
      return "Suivant";
    case "ja":
      return "フォロー中";
    default:
      return "Following";
  }
};

export const translateRecommended = (language: string) => {
  switch (language) {
    case "vi":
      return "Đề xuất";
    case "en":
      return "Recommended";
    case "zh":
      return "推荐";
    case "fr":
      return "Recommandé";
    case "ja":
      return "おすすめ";
    default:
      return "Recommended";
  }
};

export const translateExpand = (language: string) => {
  switch (language) {
    case "vi":
      return "Mở rộng";
    case "en":
      return "Expand";
    case "zh":
      return "展开";
    case "fr":
      return "Développer";
    case "ja":
      return "展開";
    default:
      return "Expand";
  }
};

export const translateHideSidebar = (language: string) => {
  switch (language) {
    case "vi":
      return "Ẩn thanh bên";
    case "en":
      return "Hide Sidebar";
    case "zh":
      return "隐藏侧边栏";
    case "fr":
      return "Masquer la barre latérale";
    case "ja":
      return "サイドバーを隠す";
    default:
      return "Hide Sidebar";
  }
};

export const translateCollapse = (language: string) => {
  switch (language) {
    case "vi":
      return "Thu gọn";
    case "en":
      return "Collapse";
    case "zh":
      return "收起";
    case "fr":
      return "Réduire";
    case "ja":
      return "折りたたむ";
    default:
      return "Collapse";
  }
};

export const translateForYou = (language: string) => {
  switch (language) {
    case "vi":
      return "Cho bạn";
    case "en":
      return "For you";
    case "zh":
      return "为你";
    case "fr":
      return "Pour vous";
    case "ja":
      return "あなたのため";
    default:
      return "For you";
  }
};

export const translateEnterOrderId = (language: string) => {
  switch (language) {
    case "vi":
      return "Nhập id đơn hàng cần tìm...";
    case "en":
      return "Enter the order ID to search...";
    case "zh":
      return "输入要查找的订单ID...";
    case "fr":
      return "Entrez l'ID de la commande à rechercher...";
    case "ja":
      return "検索する注文IDを入力...";
    default:
      return "Enter the order ID to search...";
  }
};

export const translateLatestUpdateDate = (language: string) => {
  switch (language) {
    case "vi":
      return "Cập nhật mới nhất ngày";
    case "en":
      return "Latest update on";
    case "zh":
      return "最新更新于";
    case "fr":
      return "Dernière mise à jour le";
    case "ja":
      return "最新更新日";
    default:
      return "Latest update on";
  }
};

export const translateVoucherWarehouse = (language: string) => {
  switch (language) {
    case "vi":
      return "Kho voucher";
    case "en":
      return "Voucher warehouse";
    case "zh":
      return "优惠券仓库";
    case "fr":
      return "Entrepôt de bons";
    case "ja":
      return "クーポン倉庫";
    default:
      return "Voucher warehouse";
  }
};

export const translatePurchaseOrder = (language: string) => {
  switch (language) {
    case "vi":
      return "Đơn mua";
    case "en":
      return "Purchase Order";
    case "zh":
      return "购买订单";
    case "fr":
      return "Commande d'achat";
    case "ja":
      return "購入注文";
    default:
      return "Purchase Order";
  }
};

export const translateUserInfo = (language: string) => {
  switch (language) {
    case "vi":
      return "Thông tin người dùng";
    case "en":
      return "User information";
    case "zh":
      return "用户信息";
    case "fr":
      return "Informations utilisateur";
    case "ja":
      return "ユーザー情報";
    default:
      return "User information";
  }
};

export const translatePasswordSecurity = (language: string) => {
  switch (language) {
    case "vi":
      return "Mật khẩu & bảo mật";
    case "en":
      return "Password & Security";
    case "zh":
      return "密码与安全";
    case "fr":
      return "Mot de passe & sécurité";
    case "ja":
      return "パスワードとセキュリティ";
    default:
      return "Password & Security";
  }
};

export const translateMyAccount = (language: string) => {
  switch (language) {
    case "vi":
      return "Tài khoản của tôi";
    case "en":
      return "My Account";
    case "zh":
      return "我的账户";
    case "fr":
      return "Mon compte";
    case "ja":
      return "マイアカウント";
    default:
      return "My Account";
  }
};

export const translateConfirmOrder = (language: string) => {
  switch (language) {
    case "vi":
      return "Xác nhận đơn";
    case "en":
      return "Confirm Order";
    case "zh":
      return "确认订单";
    case "fr":
      return "Confirmer";
    case "ja":
      return "注文を確認する";
    default:
      return "Confirm Order";
  }
};

export const translateWaitingForDelivery = (language: string) => {
  switch (language) {
    case "vi":
      return "Chờ giao hàng";
    case "en":
      return "Waiting for Delivery";
    case "zh":
      return "等待配送";
    case "fr":
      return "En attente";
    case "ja":
      return "配送待ち";
    default:
      return "Waiting for Delivery";
  }
};

export const translateCompletedNormal = (language: string) => {
  switch (language) {
    case "vi":
      return "Hoàn thành";
    case "en":
      return "Completed";
    case "zh":
      return "完成";
    case "fr":
      return "Terminé";
    case "ja":
      return "完了";
    default:
      return "Completed";
  }
};

export const translateCancelledOrReturned = (language: string) => {
  switch (language) {
    case "vi":
      return "Đã hủy/Trả hàng";
    case "en":
      return "Cancelled/Returned";
    case "zh":
      return "已取消/退货";
    case "fr":
      return "Annulé/Retourner";
    case "ja":
      return "キャンセル/返品";
    default:
      return "Cancelled/Returned";
  }
};

export const translateAll = (language: string) => {
  switch (language) {
    case "vi":
      return "Tất cả";
    case "en":
      return "All";
    case "zh":
      return "所有";
    case "fr":
      return "Tout";
    case "ja":
      return "すべて";
    default:
      return "All";
  }
};

export const translateVerySatisfied = (language: string) => {
  switch (language) {
    case "vi":
      return "🤩Rất hài lòng";
    case "en":
      return "🤩Very satisfied";
    case "zh":
      return "🤩非常满意";
    case "fr":
      return "🤩Très satisfait";
    case "ja":
      return "🤩大満足";
    default:
      return "🤩Very satisfied";
  }
};

export const translateQuiteSatisfied = (language: string) => {
  switch (language) {
    case "vi":
      return "🥰Khá hài lòng";
    case "en":
      return "🥰Quite satisfied";
    case "zh":
      return "🥰比较满意";
    case "fr":
      return "🥰Assez satisfait";
    case "ja":
      return "🥰まあまあ満足";
    default:
      return "🥰Quite satisfied";
  }
};

export const translateNotSatisfied = (language: string) => {
  switch (language) {
    case "vi":
      return "🤨Không hài lòng";
    case "en":
      return "🤨Not satisfied";
    case "zh":
      return "🤨不满意";
    case "fr":
      return "🤨Pas satisfait";
    case "ja":
      return "🤨満足していない";
    default:
      return "🤨Not satisfied";
  }
};

export const translateBad = (language: string) => {
  switch (language) {
    case "vi":
      return "😔Tệ";
    case "en":
      return "😔Bad";
    case "zh":
      return "😔差";
    case "fr":
      return "😔Mauvais";
    case "ja":
      return "😔悪い";
    default:
      return "😔Bad";
  }
};

export const translateEditPost = (language: string) => {
  switch (language) {
    case "vi":
      return "Chỉnh sửa bài viết";
    case "en":
      return "Edit Post";
    case "zh":
      return "编辑文章";
    case "fr":
      return "Modifier l'article";
    case "ja":
      return "投稿を編集";
    default:
      return "Edit Post";
  }
};

export const translateViewProduct = (language: string) => {
  switch (language) {
    case "vi":
      return "Xem sản phẩm";
    case "en":
      return "View Product";
    case "zh":
      return "查看产品";
    case "fr":
      return "Voir le produit";
    case "ja":
      return "商品を見る";
    default:
      return "View Product";
  }
};

export const translateUpdate = (language: string) => {
  switch (language) {
    case "vi":
      return "Cập nhật";
    case "en":
      return "Update";
    case "zh":
      return "更新";
    case "fr":
      return "Mettre"; // Rút ngắn tiếng Pháp
    case "ja":
      return "更新";
    default:
      return "Update";
  }
};

export const translateDeletePost = (language: string) => {
  switch (language) {
    case "vi":
      return "Xóa bài viết";
    case "en":
      return "Delete Post";
    case "zh":
      return "删除文章";
    case "fr":
      return "Suppr."; // Rút ngắn tiếng Pháp
    case "ja":
      return "投稿を削除";
    default:
      return "Delete Post";
  }
};

export const translateItemType = (language: string) => {
  switch (language) {
    case "vi":
      return "Loại hàng: ";
    case "en":
      return "Item Type: ";
    case "zh":
      return "商品类型: ";
    case "fr":
      return "Type: "; // Rút ngắn tiếng Pháp
    case "ja":
      return "タイプ: "; // Rút ngắn tiếng Nhật
    default:
      return "Item Type: ";
  }
};

export const translateProduct = (language: string) => {
  switch (language) {
    case "vi":
      return "Sản phẩm ";
    case "en":
      return "Product ";
    case "zh":
      return "产品 ";
    case "fr":
      return "Produit ";
    case "ja":
      return "製品 ";
    default:
      return "Product ";
  }
};

export const translatePublic = (language: string) => {
  switch (language) {
    case "vi":
      return "Công khai";
    case "en":
      return "Public";
    case "zh":
      return "公开";
    case "fr":
      return "Public";
    case "ja":
      return "公開";
    default:
      return "Public";
  }
};

export const translatePersonal = (language: string) => {
  switch (language) {
    case "vi":
      return "Cá nhân";
    case "en":
      return "Personal";
    case "zh":
      return "个人";
    case "fr":
      return "Personnel";
    case "ja":
      return "個人";
    default:
      return "Personal";
  }
};

export const translateFollowers = (language: string) => {
  switch (language) {
    case "vi":
      return "người theo dõi";
    case "en":
      return "followers";
    case "zh":
      return "粉丝";
    case "fr":
      return "abonnés";
    case "ja":
      return "フォロワー";
    default:
      return "followers";
  }
};

export const translateCreatePost = (language: string) => {
  switch (language) {
    case "vi":
      return "Tạo bài viết";
    case "en":
      return "Create Post";
    case "zh":
      return "创建文章";
    case "fr":
      return "Créer un article";
    case "ja":
      return "投稿を作成";
    default:
      return "Create Post";
  }
};

export const translateWhatAreYouThinking = (language: string) => {
  switch (language) {
    case "vi":
      return "Bạn đang nghĩ gì?";
    case "en":
      return "What are you thinking?";
    case "zh":
      return "你在想什么？";
    case "fr":
      return "À quoi tu penses ?";
    case "ja":
      return "何を考えていますか？";
    default:
      return "What are you thinking?";
  }
};

export const translateLiveVideo = (language: string) => {
  switch (language) {
    case "vi":
      return "Video trực tiếp";
    case "en":
      return "Live Video";
    case "zh":
      return "现场直播";
    case "fr":
      return "Vidéo en direct";
    case "ja":
      return "ライブビデオ";
    default:
      return "Live Video";
  }
};

export const translateNoPost = (language: string) => {
  switch (language) {
    case "vi":
      return "Không có bài viết!";
    case "en":
      return "No posts!";
    case "zh":
      return "没有文章！";
    case "fr":
      return "Aucun article !";
    case "ja":
      return "投稿がありません！";
    default:
      return "No posts!";
  }
};

export const translatePostLimitMinute = (
  language: string,
  diffMinutes: number
) => {
  switch (language) {
    case "vi":
      return `Mỗi ngày chỉ được đăng 1 bài. Hãy quay lại sau ${diffMinutes} phút nữa!`;
    case "en":
      return `You can only post once a day. Please come back in ${diffMinutes} minutes!`;
    case "zh":
      return `每天只能发布一篇文章。请在${diffMinutes}分钟后再回来！`;
    case "fr":
      return `Vous ne pouvez publier qu'un seul article par jour. Revenez dans ${diffMinutes} minutes !`;
    case "ja":
      return `1日に1回しか投稿できません。${diffMinutes}分後に再度お越しください！`;
    default:
      return `You can only post once a day. Please come back in ${diffMinutes} minutes!`;
  }
};

export const translatePostLimitHourse = (
  language: string,
  hoursRemaining: number
) => {
  switch (language) {
    case "vi":
      return `Mỗi ngày chỉ được đăng 1 bài. Hãy quay lại sau ${hoursRemaining} giờ nữa!`;
    case "en":
      return `You can only post once a day. Please come back in ${hoursRemaining} hours!`;
    case "zh":
      return `每天只能发布一篇文章。请在${hoursRemaining}小时后再回来！`;
    case "fr":
      return `Vous ne pouvez publier qu'un seul article par jour. Revenez dans ${hoursRemaining} heures !`;
    case "ja":
      return `1日に1回しか投稿できません。${hoursRemaining}時間後に再度お越しください！`;
    default:
      return `You can only post once a day. Please come back in ${hoursRemaining} hours!`;
  }
};

export const translateEnterProductContent = (language: string) => {
  switch (language) {
    case "vi":
      return "Vui lòng nhập nội dung sản phẩm!";
    case "en":
      return "Please enter product content!";
    case "zh":
      return "请输入产品内容！";
    case "fr":
      return "Veuillez entrer le contenu du produit !";
    case "ja":
      return "製品の内容を入力してください！";
    default:
      return "Please enter product content!";
  }
};

export const translateEnterDetailedContent = (language: string) => {
  switch (language) {
    case "vi":
      return "Vui lòng nhập nội dung chi tiết hơn!";
    case "en":
      return "Please enter more detailed content!";
    case "zh":
      return "请输入更详细的内容！";
    case "fr":
      return "Veuillez entrer un contenu plus détaillé !";
    case "ja":
      return "より詳細な内容を入力してください！";
    default:
      return "Please enter more detailed content!";
  }
};

export const translateSelectPostMode = (language: string) => {
  switch (language) {
    case "vi":
      return "Vui lòng chọn chế độ bài viết!";
    case "en":
      return "Please select post mode!";
    case "zh":
      return "请选择文章模式！";
    case "fr":
      return "Veuillez sélectionner le mode de publication !";
    case "ja":
      return "投稿モードを選択してください！";
    default:
      return "Please select post mode!";
  }
};

export const translateSelectProductQuality = (language: string) => {
  switch (language) {
    case "vi":
      return "Vui lòng chọn chất lượng sản phẩm!";
    case "en":
      return "Please select product quality!";
    case "zh":
      return "请选择产品质量！";
    case "fr":
      return "Veuillez sélectionner la qualité du produit !";
    case "ja":
      return "製品の品質を選択してください！";
    default:
      return "Please select product quality!";
  }
};

export const translateSelectProductCategory = (language: string) => {
  switch (language) {
    case "vi":
      return "Vui lòng chọn danh mục sản phẩm!";
    case "en":
      return "Please select product category!";
    case "zh":
      return "请选择产品类别！";
    case "fr":
      return "Veuillez sélectionner la catégorie de produit !";
    case "ja":
      return "製品カテゴリーを選択してください！";
    default:
      return "Please select product category!";
  }
};

export const translateSelectSuitableProduct = (language: string) => {
  switch (language) {
    case "vi":
      return "Vui lòng chọn sản phẩm phù hợp!";
    case "en":
      return "Please select the suitable product!";
    case "zh":
      return "请选择合适的产品！";
    case "fr":
      return "Veuillez sélectionner le produit adapté !";
    case "ja":
      return "適切な製品を選択してください！";
    default:
      return "Please select the suitable product!";
  }
};

export const translateRemainingChars = (
  language: string,
  remainingChars: number
) => {
  switch (language) {
    case "vi":
      return `Còn ${remainingChars} ký tự nữa`;
    case "en":
      return `You have ${remainingChars} characters remaining`;
    case "zh":
      return `还剩 ${remainingChars} 个字符`;
    case "fr":
      return `Il vous reste ${remainingChars} caractères`;
    case "ja":
      return `${remainingChars} 文字が残っています`;
    default:
      return `You have ${remainingChars} characters remaining`;
  }
};

export const translateMode = (language: string) => {
  switch (language) {
    case "vi":
      return "Chế độ";
    case "en":
      return "Mode";
    case "zh":
      return "模式";
    case "fr":
      return "Mode";
    case "ja":
      return "モード";
    default:
      return "Mode";
  }
};

export const translateStatus = (language: string) => {
  switch (language) {
    case "vi":
      return "Trạng thái";
    case "en":
      return "Status";
    case "zh":
      return "状态";
    case "fr":
      return "Statut";
    case "ja":
      return "状態";
    default:
      return "Status";
  }
};

export const translateProductImageDescription = (language: string) => {
  switch (language) {
    case "vi":
      return "Hình ảnh mô tả sản phẩm";
    case "en":
      return "Product Image Description";
    case "zh":
      return "产品图片描述";
    case "fr":
      return "Description de l'image du produit";
    case "ja":
      return "製品画像の説明";
    default:
      return "Product Image Description";
  }
};

export const translateSelectProductImages = (
  language: string,
  limit: number
) => {
  switch (language) {
    case "vi":
      return `Chỉ chọn ${limit} ảnh sản phẩm chi tiết nhất.`;
    case "en":
      return `Select only the ${limit} most detailed product images.`;
    case "zh":
      return `仅选择 ${limit} 张最详细的产品图片。`;
    case "fr":
      return `Sélectionnez uniquement les ${limit} images de produit les plus détaillées.`;
    case "ja":
      return `${limit} 枚の最も詳細な製品画像のみを選択してください。`;
    default:
      return `Select only the ${limit} most detailed product images.`;
  }
};

export const translateCategory = (language: string) => {
  switch (language) {
    case "vi":
      return "Danh mục";
    case "en":
      return "Category";
    case "zh":
      return "类别";
    case "fr":
      return "Catégorie";
    case "ja":
      return "カテゴリー";
    default:
      return "Category";
  }
};

export const translateSelectCategory = (language: string) => {
  switch (language) {
    case "vi":
      return "Chọn một danh mục";
    case "en":
      return "Select a category";
    case "zh":
      return "选择一个类别";
    case "fr":
      return "Sélectionner une catégorie";
    case "ja":
      return "カテゴリーを選択してください";
    default:
      return "Select a category";
  }
};

export const translateSelectProduct = (language: string) => {
  switch (language) {
    case "vi":
      return "Chọn một sản phẩm";
    case "en":
      return "Select a product";
    case "zh":
      return "选择一个产品";
    case "fr":
      return "Sélectionner un produit";
    case "ja":
      return "製品を選択してください";
    default:
      return "Select a product";
  }
};

export const translateEmpty = (language: string) => {
  switch (language) {
    case "vi":
      return "Trống";
    case "en":
      return "Empty";
    case "zh":
      return "空的";
    case "fr":
      return "Vide";
    case "ja":
      return "空";
    default:
      return "Empty";
  }
};

export const translateCancel = (language: string) => {
  switch (language) {
    case "vi":
      return "Hủy";
    case "en":
      return "Cancel";
    case "zh":
      return "取消";
    case "fr":
      return "Annuler";
    case "ja":
      return "キャンセル";
    default:
      return "Cancel";
  }
};

export const translateSortPost = (language: string) => {
  switch (language) {
    case "vi":
      return "Sắp xếp bài đăng";
    case "en":
      return "Sort Post";
    case "zh":
      return "排序帖子";
    case "fr":
      return "Trier les publications";
    case "ja":
      return "投稿を並べ替え";
    default:
      return "Sort Post";
  }
};

export const translateNewest = (language: string) => {
  switch (language) {
    case "vi":
      return "Mới nhất";
    case "en":
      return "Newest";
    case "zh":
      return "最新";
    case "fr":
      return "Le plus récent";
    case "ja":
      return "最新";
    default:
      return "Newest";
  }
};

export const translateOldest = (language: string) => {
  switch (language) {
    case "vi":
      return "Cũ nhất";
    case "en":
      return "Oldest";
    case "zh":
      return "最旧";
    case "fr":
      return "Le plus ancien";
    case "ja":
      return "最も古い";
    default:
  }
};

export const translateTrending = (language: string) => {
  switch (language) {
    case "vi":
      return "Xu hướng";
    case "en":
      return "Trending";
    case "zh":
      return "趋势";
    case "fr":
      return "Tendance";
    case "ja":
      return "トレンド";
    default:
      return "Trending";
  }
};

export const translateStreamsRecommendation = (language: string) => {
  switch (language) {
    case "vi":
      return "Các luồng mà chúng tôi nghĩ bạn sẽ thích";
    case "en":
      return "Streams we think you'll like";
    case "zh":
      return "我们认为你会喜欢的直播";
    case "fr":
      return "Streams que nous pensons que vous aimerez";
    case "ja":
      return "あなたが好きだと思うストリーム";
    default:
      return "Streams we think you'll like";
  }
};

export const translateNoStreamsFound = (language: string) => {
  switch (language) {
    case "vi":
      return "Không tìm thấy luồng nào";
    case "en":
      return "No streams found";
    case "zh":
      return "未找到任何直播";
    case "fr":
      return "Aucun flux trouvé";
    case "ja":
      return "ストリームが見つかりません";
    default:
      return "No streams found";
  }
};

export const translateUserInactive = (language: string) => {
  switch (language) {
    case "vi":
      return "Người dùng đã ngưng hoạt động!";
    case "en":
      return "User has been inactive!";
    case "zh":
      return "用户已停止活动！";
    case "fr":
      return "L'utilisateur est inactif!";
    case "ja":
      return "ユーザーは非アクティブです！";
    default:
      return "User has been inactive!";
  }
};

export const translateBlockedUser = (language: string, name: string) => {
  switch (language) {
    case "vi":
      return `Đã chặn ${name}`;
    case "en":
      return `Blocked ${name}`;
    case "zh":
      return `已屏蔽 ${name}`;
    case "fr":
      return `Bloqué ${name}`;
    case "ja":
      return `${name} をブロックしました`;
    default:
      return `Blocked ${name}`;
  }
};

export const translateNowFollowing = (
  language: string,
  nameuser: string | null
) => {
  switch (language) {
    case "vi":
      return `Bạn đang theo dõi ${nameuser}`;
    case "en":
      return `You are now following ${nameuser}`;
    case "zh":
      return `您正在关注 ${nameuser}`;
    case "fr":
      return `Vous suivez maintenant ${nameuser}`;
    case "ja":
      return `あなたは今 ${nameuser} をフォローしています`;
    default:
      return `You are now following ${nameuser}`;
  }
};

export const translateUnfollowedUser = (
  language: string,
  nameuser: string | null
) => {
  switch (language) {
    case "vi":
      return `Bạn đã bỏ theo dõi ${nameuser}`;
    case "en":
      return `You have unfollowed ${nameuser}`;
    case "zh":
      return `您已取消关注 ${nameuser}`;
    case "fr":
      return `Vous avez cessé de suivre ${nameuser}`;
    case "ja":
      return `${nameuser} のフォローを解除しました`;
    default:
      return `You have unfollowed ${nameuser}`;
  }
};

export const translateBlock = (language: string) => {
  switch (language) {
    case "vi":
      return "Chặn";
    case "en":
      return "Block";
    case "zh":
      return "屏蔽";
    case "fr":
      return "Bloquer";
    case "ja":
      return "ブロック";
    default:
      return "Block";
  }
};

export const translateFollower = (language: string) => {
  switch (language) {
    case "vi":
      return "người theo dõi";
    case "en":
      return "follower";
    case "zh":
      return "关注者";
    case "fr":
      return "abonné";
    case "ja":
      return "フォロワー";
    default:
      return "follower";
  }
};

export const translateUnfollow = (language: string) => {
  switch (language) {
    case "vi":
      return "Bỏ theo dõi";
    case "en":
      return "Unfollow";
    case "zh":
      return "取消关注";
    case "fr":
      return "Ne plus suivre";
    case "ja":
      return "フォロー解除";
    default:
      return "Unfollow";
  }
};

export const translateFollow = (language: string) => {
  switch (language) {
    case "vi":
      return "Theo dõi";
    case "en":
      return "Follow";
    case "zh":
      return "关注";
    case "fr":
      return "Suivre";
    case "ja":
      return "フォロー";
    default:
      return "Follow";
  }
};

export const translateIntroduction = (language: string) => {
  switch (language) {
    case "vi":
      return "Giới thiệu";
    case "en":
      return "Introduction";
    case "zh":
      return "介绍";
    case "fr":
      return "Introduction";
    case "ja":
      return "紹介";
    default:
      return "Introduction";
  }
};

export const translateEditProfile = (language: string) => {
  switch (language) {
    case "vi":
      return "Chỉnh sửa tiểu sử";
    case "en":
      return "Edit Profile";
    case "zh":
      return "编辑简介";
    case "fr":
      return "Modifier le profil";
    case "ja":
      return "プロフィールを編集";
    default:
      return "Edit Profile";
  }
};

export const translateAddBio = (language: string) => {
  switch (language) {
    case "vi":
      return "Thêm tiểu sử";
    case "en":
      return "Add Bio";
    case "zh":
      return "添加简介";
    case "fr":
      return "Ajouter bio"; // Rút gọn
    case "ja":
      return "自己紹介を追加";
    default:
      return "Add Bio";
  }
};

export const translateNoData = (language: string) => {
  switch (language) {
    case "vi":
      return "Không có";
    case "en":
      return "None";
    case "zh":
      return "没有";
    case "fr":
      return "Aucun";
    case "ja":
      return "ありません";
    default:
      return "None";
  }
};

export const translatePopular = (language: string) => {
  switch (language) {
    case "vi":
      return "Phổ biến";
    case "en":
      return "Popular";
    case "zh":
      return "流行";
    case "fr":
      return "Populaire";
    case "ja":
      return "人気";
    default:
      return "Popular";
  }
};

export const translateNotChange = (language: string) => {
  switch (language) {
    case "vi":
      return "Chưa thay đổi";
    case "en":
      return "Not changed";
    case "zh":
      return "未更改";
    case "fr":
      return "Pas changé";
    case "ja":
      return "変更されていません";
    default:
      return "Not changed";
  }
};

export const translateEditDetails = (language: string) => {
  switch (language) {
    case "vi":
      return "Chỉnh sửa chi tiết";
    case "en":
      return "Edit Details";
    case "zh":
      return "编辑详情";
    case "fr":
      return "Modifier les détails";
    case "ja":
      return "詳細を編集";
    default:
      return "Edit Details";
  }
};

export const translateAccountInfo = (language: string) => {
  switch (language) {
    case "vi":
      return "Thông tin tài khoản";
    case "en":
      return "Account Information";
    case "zh":
      return "账户信息";
    case "fr":
      return "Informations du compte";
    case "ja":
      return "アカウント情報";
    default:
      return "Account Information";
  }
};

export const translatePrivateInfo = (language: string) => {
  switch (language) {
    case "vi":
      return "Thông tin riêng tư";
    case "en":
      return "Private Information";
    case "zh":
      return "私人信息";
    case "fr":
      return "Informations privées";
    case "ja":
      return "プライベート情報";
    default:
      return "Private Information";
  }
};

export const translateSocialInfo = (language: string) => {
  switch (language) {
    case "vi":
      return "Thông tin mạng xã hội";
    case "en":
      return "Social Information";
    case "zh":
      return "社交信息";
    case "fr":
      return "Informations sociales";
    case "ja":
      return "ソーシャル情報";
    default:
      return "Social Information";
  }
};

export const translateDone = (language: string) => {
  switch (language) {
    case "vi":
      return "Xong";
    case "en":
      return "Done";
    case "zh":
      return "完成";
    case "fr":
      return "Terminé";
    case "ja":
      return "完了";
    default:
      return "Done";
  }
};

export const translateSettingsUpdated = (language: string) => {
  switch (language) {
    case "vi":
      return "Cài đặt đã được cập nhật!";
    case "en":
      return "Setting updated!";
    case "zh":
      return "设置已更新！";
    case "fr":
      return "Paramètres mis à jour !";
    case "ja":
      return "設定が更新されました！";
    default:
      return "Setting updated!";
  }
};

export const translateFillInfoBeforePublic = (language: string) => {
  switch (language) {
    case "vi":
      return "Bạn hãy điền thông tin trước khi mở công khai.";
    case "en":
      return "Please fill in the information before making it public.";
    case "zh":
      return "请在公开之前填写信息。";
    case "fr":
      return "Veuillez remplir les informations avant de les rendre publiques.";
    case "ja":
      return "公開する前に情報を入力してください。";
    default:
      return "Please fill in the information before making it public.";
  }
};

export const translateLinkCopied = (language: string) => {
  switch (language) {
    case "vi":
      return "Đã sao chép liên kết!";
    case "en":
      return "Link copied!";
    case "zh":
      return "链接已复制！";
    case "fr":
      return "Lien copié !";
    case "ja":
      return "リンクがコピーされました！";
    default:
      return "Link copied!";
  }
};

export const translateLike = (language: string) => {
  switch (language) {
    case "vi":
      return "Thích";
    case "en":
      return "Like";
    case "zh":
      return "喜欢";
    case "fr":
      return "Aimer";
    case "ja":
      return "いいね";
    default:
      return "Like";
  }
};

export const translateFavorites = (language: string) => {
  switch (language) {
    case "vi":
      return "Yêu thích";
    case "en":
      return "Favorites";
    case "zh":
      return "收藏";
    case "fr":
      return "Favoris";
    case "ja":
      return "お気に入り";
    default:
      return "Favorites";
  }
};

export const translateHaha = (language: string) => {
  switch (language) {
    case "vi":
      return "Haha";
    case "en":
      return "Haha";
    case "zh":
      return "哈哈";
    case "fr":
      return "Haha";
    case "ja":
      return "ハハ";
    default:
      return "Haha";
  }
};

export const translateWow = (language: string) => {
  switch (language) {
    case "vi":
      return "Wow";
    case "en":
      return "Wow";
    case "zh":
      return "哇";
    case "fr":
      return "Waouh";
    case "ja":
      return "ワオ";
    default:
      return "Wow";
  }
};

export const translateSad = (language: string) => {
  switch (language) {
    case "vi":
      return "Buồn";
    case "en":
      return "Sad";
    case "zh":
      return "难过";
    case "fr":
      return "Triste";
    case "ja":
      return "悲しい";
    default:
      return "Sad";
  }
};

export const translateAngry = (language: string) => {
  switch (language) {
    case "vi":
      return "Phẫn nộ";
    case "en":
      return "Angry";
    case "zh":
      return "愤怒";
    case "fr":
      return "En colère";
    case "ja":
      return "怒っている";
    default:
      return "Angry";
  }
};

export const translateShare = (language: string) => {
  switch (language) {
    case "vi":
      return "Chia sẻ";
    case "en":
      return "Share";
    case "zh":
      return "分享";
    case "fr":
      return "Partager";
    case "ja":
      return "シェア";
    default:
      return "Share";
  }
};

export const translateSendToFacebook = (language: string) => {
  switch (language) {
    case "vi":
      return "Gửi đến Facebook";
    case "en":
      return "Send to Facebook";
    case "zh":
      return "发送到 Facebook";
    case "fr":
      return "Envoyer sur Facebook";
    case "ja":
      return "Facebookに送信";
    default:
      return "Send to Facebook";
  }
};

export const translateSendToInstagram = (language: string) => {
  switch (language) {
    case "vi":
      return "Gửi đến Instagram";
    case "en":
      return "Send to Instagram";
    case "zh":
      return "发送到 Instagram";
    case "fr":
      return "Envoyer sur Instagram";
    case "ja":
      return "Instagramに送信";
    default:
      return "Send to Instagram";
  }
};

export const translateSendToTikTok = (language: string) => {
  switch (language) {
    case "vi":
      return "Gửi đến TikTok";
    case "en":
      return "Send to TikTok";
    case "zh":
      return "发送到 TikTok";
    case "fr":
      return "Envoyer sur TikTok";
    case "ja":
      return "TikTokに送信";
    default:
      return "Send to TikTok";
  }
};

export const translateSendToZalo = (language: string) => {
  switch (language) {
    case "vi":
      return "Gửi đến Zalo";
    case "en":
      return "Send to Zalo";
    case "zh":
      return "发送到 Zalo";
    case "fr":
      return "Envoyer sur Zalo";
    case "ja":
      return "Zaloに送信";
    default:
      return "Send to Zalo";
  }
};

export const translateCopyLink = (language: string) => {
  switch (language) {
    case "vi":
      return "Sao chép liên kết";
    case "en":
      return "Copy link";
    case "zh":
      return "复制链接";
    case "fr":
      return "Copier le lien";
    case "ja":
      return "リンクをコピー";
    default:
      return "Copy link";
  }
};

export const translateHome = (language: string) => {
  switch (language) {
    case "vi":
      return "Trang chủ";
    case "en":
      return "Home";
    case "zh":
      return "首页";
    case "fr":
      return "Accueil";
    case "ja":
      return "ホーム";
    default:
      return "Home";
  }
};

export const translateProfile = (language: string) => {
  switch (language) {
    case "vi":
      return "Trang cá nhân";
    case "en":
      return "Profile";
    case "zh":
      return "个人主页";
    case "fr":
      return "Profil";
    case "ja":
      return "プロフィール";
    default:
      return "Profile";
  }
};

export const translateListLive = (language: string) => {
  switch (language) {
    case "vi":
      return "Trực tiếp";
    case "en":
      return "List Live";
    case "zh":
      return "直播列表";
    case "fr":
      return "Liste en direct";
    case "ja":
      return "ライブリスト";
    default:
      return "List Live";
  }
};

export const translateStream = (language: string) => {
  switch (language) {
    case "vi":
      return "Stream";
    case "en":
      return "Stream";
    case "zh":
      return "直播";
    case "fr":
      return "Stream";
    case "ja":
      return "ストリーム";
    default:
      return "Stream";
  }
};

export const translateKey = (language: string) => {
  switch (language) {
    case "vi":
      return "Key";
    case "en":
      return "Key";
    case "zh":
      return "键";
    case "fr":
      return "Clé";
    case "ja":
      return "キー";
    default:
      return "Key";
  }
};

export const translateChat = (language: string) => {
  switch (language) {
    case "vi":
      return "Trò chuyện";
    case "en":
      return "Chat";
    case "zh":
      return "聊天";
    case "fr":
      return "Chat";
    case "ja":
      return "チャット";
    default:
      return "Chat";
  }
};

export const translateListBlock = (language: string) => {
  switch (language) {
    case "vi":
      return "Danh sách chặn";
    case "en":
      return "List Block";
    case "zh":
      return "封锁列表";
    case "fr":
      return "Liste bloquée";
    case "ja":
      return "ブロックリスト";
    default:
      return "List Block";
  }
};

export const translateListProduct = (language: string) => {
  switch (language) {
    case "vi":
      return "Sản phẩm";
    case "en":
      return "List Product";
    case "zh":
      return "产品列表";
    case "fr":
      return "Liste des produits";
    case "ja":
      return "製品リスト";
    default:
      return "List Product";
  }
};

export const translateNoStreamKey = (language: string) => {
  switch (language) {
    case "vi":
      return "Chưa có StreamKey. Hãy tạo StreamKey!";
    case "en":
      return "No StreamKey. Please create a StreamKey!";
    case "zh":
      return "没有StreamKey。请创建StreamKey！";
    case "fr":
      return "Aucun StreamKey. Veuillez créer un StreamKey!";
    case "ja":
      return "StreamKeyがありません。StreamKeyを作成してください！";
    default:
      return "No StreamKey. Please create a StreamKey!";
  }
};

export const translateChatSettings = (language: string) => {
  switch (language) {
    case "vi":
      return "Cài đặt trò chuyện";
    case "en":
      return "Chat Settings";
    case "zh":
      return "聊天设置";
    case "fr":
      return "Paramètres de chat";
    case "ja":
      return "チャット設定";
    default:
      return "Chat Settings";
  }
};

export const translateChatSettingUpdated = (language: string) => {
  switch (language) {
    case "vi":
      return "Cài đặt trò chuyện đã được cập nhật!";
    case "en":
      return "Chat setting updated!";
    case "zh":
      return "聊天设置已更新！";
    case "fr":
      return "Paramètres de chat mis à jour !";
    case "ja":
      return "チャット設定が更新されました！";
    default:
      return "Chat setting updated!";
  }
};

export const translateChangeTimePrompt = (language: string) => {
  switch (language) {
    case "vi":
      return "Nhập thời gian bạn muốn thay đổi";
    case "en":
      return "Enter the time you want to change";
    case "zh":
      return "请输入您想要更改的时间";
    case "fr":
      return "Entrez l'heure que vous souhaitez changer";
    case "ja":
      return "変更したい時間を入力してください";
    default:
      return "Enter the time you want to change";
  }
};

export const translateTimeMustDiffer = (language: string) => {
  switch (language) {
    case "vi":
      return "Thời gian mới phải khác thời gian cũ!";
    case "en":
      return "The new time must be different from the old time!";
    case "zh":
      return "新时间必须与旧时间不同！";
    case "fr":
      return "Le nouveau temps doit être différent de l'ancien temps !";
    case "ja":
      return "新しい時間は古い時間と異なる必要があります！";
    default:
      return "The new time must be different from the old time!";
  }
};

export const translateHide = (language: string) => {
  switch (language) {
    case "vi":
      return "Ẩn";
    case "en":
      return "Hide";
    case "zh":
      return "隐藏";
    case "fr":
      return "Masquer";
    case "ja":
      return "隠す";
    default:
      return "Hide";
  }
};

export const translateChangeDelayTime = (language: string) => {
  switch (language) {
    case "vi":
      return "Thay đổi thời gian delay";
    case "en":
      return "Change delay time";
    case "zh":
      return "更改延迟时间";
    case "fr":
      return "Changer le temps de délai";
    case "ja":
      return "遅延時間を変更";
    default:
      return "Change delay time";
  }
};

export const translateTimeDelay = (language: string) => {
  switch (language) {
    case "vi":
      return "Thời gian delay";
    case "en":
      return "Time delay";
    case "zh":
      return "延迟时间";
    case "fr":
      return "Délai";
    case "ja":
      return "遅延時間";
    default:
      return "Time delay";
  }
};

export const translateEnterSeconds = (language: string) => {
  switch (language) {
    case "vi":
      return "Nhập số giây..";
    case "en":
      return "Enter seconds..";
    case "zh":
      return "输入秒数..";
    case "fr":
      return "Entrez les secondes..";
    case "ja":
      return "秒数を入力..";
    default:
      return "Enter seconds..";
  }
};

export const translateMinValue = (language: string) => {
  switch (language) {
    case "vi":
      return "Giá trị tối thiểu là 1 giây!";
    case "en":
      return "The minimum value is 1 second!";
    case "zh":
      return "最小值为1秒！";
    case "fr":
      return "La valeur minimale est de 1 seconde !";
    case "ja":
      return "最小値は1秒です！";
    default:
      return "The minimum value is 1 second!";
  }
};

export const translateChatTimeLimit = (language: string) => {
  switch (language) {
    case "vi":
      return "Bạn đã giới hạn thời gian chat trong";
    case "en":
      return "You have limited the chat time to";
    case "zh":
      return "您已将聊天时间限制为";
    case "fr":
      return "Vous avez limité le temps de chat à";
    case "ja":
      return "チャット時間を制限しました";
    default:
      return "You have limited the chat time to";
  }
};

export const translateIngressCreated = (language: string) => {
  switch (language) {
    case "vi":
      return "Ingress đã được tạo";
    case "en":
      return "Ingress created";
    case "zh":
      return "Ingress已创建";
    case "fr":
      return "Ingress créé";
    case "ja":
      return "Ingressが作成されました";
    default:
      return "Ingress created";
  }
};

export const translateGenerateConnection = (language: string) => {
  switch (language) {
    case "vi":
      return "Tạo kết nối";
    case "en":
      return "Generate connection";
    case "zh":
      return "生成连接";
    case "fr":
      return "Générer la connexion";
    case "ja":
      return "接続を生成";
    default:
      return "Generate connection";
  }
};

export const translateWarning = (language: string) => {
  switch (language) {
    case "vi":
      return "Cảnh báo";
    case "en":
      return "Warning";
    case "zh":
      return "警告";
    case "fr":
      return "Avertissement";
    case "ja":
      return "警告";
    default:
      return "Warning";
  }
};

export const translateResetStreamsWarning = (language: string) => {
  switch (language) {
    case "vi":
      return "Hành động này sẽ đặt lại tất cả các stream đang hoạt động sử dụng kết nối hiện tại";
    case "en":
      return "This action will reset all active streams using the current connection";
    case "zh":
      return "此操作将重置当前连接下的所有活动流";
    case "fr":
      return "Cette action réinitialisera tous les flux actifs utilisant la connexion actuelle";
    case "ja":
      return "この操作は現在の接続を使用しているすべてのアクティブなストリームをリセットします";
    default:
      return "This action will reset all active streams using the current connection";
  }
};

export const translateGenerate = (language: string) => {
  switch (language) {
    case "vi":
      return "Tạo ra";
    case "en":
      return "Generate";
    case "zh":
      return "生成";
    case "fr":
      return "Générer";
    case "ja":
      return "生成する";
    default:
      return "Generate";
  }
};

export const translateListBlockSettings = (language: string) => {
  switch (language) {
    case "vi":
      return "Cài đặt danh sách chặn";
    case "en":
      return "List Block Settings";
    case "zh":
      return "列表封锁设置";
    case "fr":
      return "Paramètres de blocage de la liste";
    case "ja":
      return "リストブロック設定";
    default:
      return "List Block Settings";
  }
};

export const translateUnblock = (language: string) => {
  switch (language) {
    case "vi":
      return "Mở chặn";
    case "en":
      return "Unblock";
    case "zh":
      return "解锁";
    case "fr":
      return "Débloquer";
    case "ja":
      return "アンブロック";
    default:
      return "Unblock";
  }
};

export const translateUserUnblocked = (
  language: string,
  username: string | null
) => {
  switch (language) {
    case "vi":
      return `Người dùng ${username} đã mở chặn`;
    case "en":
      return `User ${username} unblocked`;
    case "zh":
      return `用户 ${username} 已解锁`;
    case "fr":
      return `L'utilisateur ${username} débloqué`;
    case "ja":
      return `${username} さんがアンブロックされました`;
    default:
      return `User ${username} unblocked`;
  }
};

export const translatePersonalInfo = (language: string) => {
  switch (language) {
    case "vi":
      return "Thông tin cá nhân";
    case "en":
      return "Personal Information";
    case "zh":
      return "个人信息";
    case "fr":
      return "Informations personnelles";
    case "ja":
      return "個人情報";
    default:
      return "Personal Information";
  }
};

export const translateManagePersonalInfo = (language: string) => {
  switch (language) {
    case "vi":
      return "Quản lý thông tin cá nhân của bạn";
    case "en":
      return "Manage your personal information";
    case "zh":
      return "管理您的个人信息";
    case "fr":
      return "Gérez vos informations personnelles";
    case "ja":
      return "個人情報を管理する";
    default:
      return "Manage your personal information";
  }
};

export const translateBasicInfo = (language: string) => {
  switch (language) {
    case "vi":
      return "Thông tin cơ bản";
    case "en":
      return "Basic Information";
    case "zh":
      return "基本信息";
    case "fr":
      return "Informations de base";
    case "ja":
      return "基本情報";
    default:
      return "Basic Information";
  }
};

export const translateManageProfile = (language: string) => {
  switch (language) {
    case "vi":
      return "Quản lý tên hiển thị, tên người dùng, bio và avatar của bạn.";
    case "en":
      return "Manage your display name, username, bio, and avatar.";
    case "zh":
      return "管理您的显示名称、用户名、个人简介和头像。";
    case "fr":
      return "Gérez votre nom d'affichage, votre nom d'utilisateur, votre biographie et votre avatar.";
    case "ja":
      return "表示名、ユーザー名、バイオ、アバターを管理します。";
    default:
      return "Manage your display name, username, bio, and avatar.";
  }
};

export const translateManageSocialLinks = (language: string) => {
  switch (language) {
    case "vi":
      return "Quản lý liên kết tới các trang mạng xã hội của bạn";
    case "en":
      return "Manage your social media links";
    case "zh":
      return "管理您的社交媒体链接";
    case "fr":
      return "Gérez vos liens de réseaux sociaux";
    case "ja":
      return "ソーシャルメディアリンクを管理する";
    default:
      return "Manage your social media links";
  }
};

export const translateNotUpdated = (language: string) => {
  switch (language) {
    case "vi":
      return "Chưa cập nhật";
    case "en":
      return "Not updated";
    case "zh":
      return "未更新";
    case "fr":
      return "Non mis à jour";
    case "ja":
      return "更新されていません";
    default:
      return "Not updated";
  }
};

export const translateAvatar = (language: string) => {
  switch (language) {
    case "vi":
      return "Ảnh đại diện";
    case "en":
      return "Avatar";
    case "zh":
      return "头像";
    case "fr":
      return "Avatar";
    case "ja":
      return "アバター";
    default:
      return "Avatar";
  }
};

export const translateImageFrame = (language: string) => {
  switch (language) {
    case "vi":
      return "Khung ảnh";
    case "en":
      return "Image Frame";
    case "zh":
      return "图片框";
    case "fr":
      return "Cadre photo";
    case "ja":
      return "画像フレーム";
    default:
      return "Image Frame";
  }
};

export const translateFullName = (language: string) => {
  switch (language) {
    case "vi":
      return "Họ và tên";
    case "en":
      return "Full Name";
    case "zh":
      return "全名";
    case "fr":
      return "Nom complet";
    case "ja":
      return "フルネーム";
    default:
      return "Full Name";
  }
};

export const translateUsername = (language: string) => {
  switch (language) {
    case "vi":
      return "Tên người dùng";
    case "en":
      return "Username";
    case "zh":
      return "用户名";
    case "fr":
      return "Nom d'utilisateur";
    case "ja":
      return "ユーザー名";
    default:
      return "Username";
  }
};

export const translateProfileIntro = (language: string) => {
  switch (language) {
    case "vi":
      return "Giới thiệu trang cá nhân";
    case "en":
      return "Profile Introduction";
    case "zh":
      return "个人资料介绍";
    case "fr":
      return "Introduction du profil";
    case "ja":
      return "プロフィール紹介";
    default:
      return "Profile Introduction";
  }
};

export const translateGender = (language: string) => {
  switch (language) {
    case "vi":
      return "Giới tính";
    case "en":
      return "Gender";
    case "zh":
      return "性别";
    case "fr":
      return "Genre";
    case "ja":
      return "性別";
    default:
      return "Gender";
  }
};

export const translatePhoneNumber = (language: string) => {
  switch (language) {
    case "vi":
      return "Số điện thoại";
    case "en":
      return "Phone Number";
    case "zh":
      return "电话号码";
    case "fr":
      return "Numéro de téléphone";
    case "ja":
      return "電話番号";
    default:
      return "Phone Number";
  }
};

export const translateBirthday = (language: string) => {
  switch (language) {
    case "vi":
      return "Sinh nhật";
    case "en":
      return "Birthday";
    case "zh":
      return "生日";
    case "fr":
      return "Anniversaire";
    case "ja":
      return "誕生日";
    default:
      return "Birthday";
  }
};

export const translateFavorite = (language: string) => {
  switch (language) {
    case "vi":
      return "Ưa thích";
    case "en":
      return "Favorite";
    case "zh":
      return "喜欢";
    case "fr":
      return "Favori";
    case "ja":
      return "お気に入り";
    default:
      return "Favorite";
  }
};

export const translateAddress = (language: string) => {
  switch (language) {
    case "vi":
      return "Địa chỉ";
    case "en":
      return "Address";
    case "zh":
      return "地址";
    case "fr":
      return "Adresse";
    case "ja":
      return "住所";
    default:
      return "Address";
  }
};

export const translateOtherAddress = (language: string) => {
  switch (language) {
    case "vi":
      return "Địa chỉ khác";
    case "en":
      return "Other Address";
    case "zh":
      return "其他地址";
    case "fr":
      return "Autre adresse";
    case "ja":
      return "その他の住所";
    default:
      return "Other Address";
  }
};

export const translateDeleteAccount = (language: string) => {
  switch (language) {
    case "vi":
      return "Xóa tài khoản";
    case "en":
      return "Delete Account";
    case "zh":
      return "删除账户";
    case "fr":
      return "Supprimer le compte";
    case "ja":
      return "アカウント削除";
    default:
      return "Delete Account";
  }
};

export const translateEditAvatar = (language: string) => {
  switch (language) {
    case "vi":
      return "Chỉnh sửa ảnh đại diện";
    case "en":
      return "Edit Avatar";
    case "zh":
      return "编辑头像";
    case "fr":
      return "Modifier l'avatar";
    case "ja":
      return "アバターを編集";
    default:
      return "Edit Avatar";
  }
};

export const translateAvatarDescription = (language: string) => {
  switch (language) {
    case "vi":
      return "Ảnh đại diện giúp mọi người nhận biết bạn dễ dàng hơn qua các bài viết, bình luận, tin nhắn...";
    case "en":
      return "Avatar helps others recognize you more easily through posts, comments, messages...";
    case "zh":
      return "头像可以帮助他人通过帖子、评论、消息等更容易地识别你...";
    case "fr":
      return "L'avatar aide à vous reconnaître facilement via publications, commentaires, messages...";
    case "ja":
      return "アバターは投稿、コメント、メッセージで認識しやすくします...";
    default:
      return "Avatar helps others recognize you more easily through posts, comments, messages...";
  }
};

export const translateChangeFrame = (language: string) => {
  switch (language) {
    case "vi":
      return "Thay đổi khung";
    case "en":
      return "Change Frame";
    case "zh":
      return "更换框架";
    case "fr":
      return "Changer le cadre";
    case "ja":
      return "フレームを変更";
    default:
      return "Change Frame";
  }
};

export const translateChangeFrameMessage = (language: string) => {
  switch (language) {
    case "vi":
      return "Bạn có thể thay đổi khung tùy thích.";
    case "en":
      return "You can change the frame as you like.";
    case "zh":
      return "您可以根据喜好更换框架。";
    case "fr":
      return "Vous pouvez changer le cadre comme vous le souhaitez.";
    case "ja":
      return "フレームはお好みで変更できます。";
    default:
      return "You can change the frame as you like.";
  }
};

export const translateEditName = (language: string, name?: string | null) => {
  switch (language) {
    case "vi":
      return `Chỉnh sửa tên: ${name || "Chưa thay đổi"}`;
    case "en":
      return `Edit name: ${name || "Not changed"}`;
    case "zh":
      return `编辑姓名: ${name || "未更改"}`;
    case "fr":
      return `Modifier le nom: ${name || "Pas modifié"}`;
    case "ja":
      return `名前を編集: ${name || "変更なし"}`;
    default:
      return `Edit name: ${name || "Not changed"}`;
  }
};

export const translateNameDisplay = (
  language: string,
  name?: string | null
) => {
  switch (language) {
    case "vi":
      return `Tên sẽ được hiển thị trên trang cá nhân, trong các bình luận và bài viết của bạn: ${
        name || "Chưa thay đổi"
      }`;
    case "en":
      return `The name will be displayed on your profile, in comments, and posts: ${
        name || "Not changed"
      }`;
    case "zh":
      return `姓名将显示在您的个人资料、评论和帖子中: ${name || "未更改"}`;
    case "fr":
      return `Le nom sera affiché sur votre profil, dans les commentaires et les publications : ${
        name || "Pas modifié"
      }`;
    case "ja":
      return `名前はプロフィール、コメント、投稿に表示されます: ${
        name || "変更なし"
      }`;
    default:
      return `The name will be displayed on your profile, in comments, and posts: ${
        name || "Not changed"
      }`;
  }
};

export const translateProfileUrlChange = (
  language: string,
  nameuser?: string | null
) => {
  switch (language) {
    case "vi":
      return `URL trang cá nhân VLXD Xuân Trường của bạn sẽ bị thay đổi: ${
        nameuser || "Chưa thay đổi"
      }`;
    case "en":
      return `The URL of your VLXD Xuân Trường profile will be changed: ${
        nameuser || "Not changed"
      }`;
    case "zh":
      return `您的VLXD Xuân Trường个人资料URL将被更改: ${nameuser || "未更改"}`;
    case "fr":
      return `L'URL de votre profil VLXD Xuân Trường sera modifié: ${
        nameuser || "Pas modifié"
      }`;
    case "ja":
      return `VLXD Xuân TrườngのプロフィールURLが変更されます: ${
        nameuser || "変更なし"
      }`;
    default:
      return `The URL of your VLXD Xuân Trường profile will be changed: ${
        nameuser || "Not changed"
      }`;
  }
};

export const translateCurrentUsername = (
  language: string,
  nameuser?: string | null
) => {
  switch (language) {
    case "vi":
      return `Tên người dùng hiện tại: ${nameuser || "Chưa thay đổi"}`;
    case "en":
      return `Current username: ${nameuser || "Not changed"}`;
    case "zh":
      return `当前用户名: ${nameuser || "未更改"}`;
    case "fr":
      return `Nom d'utilisateur actuel : ${nameuser || "Pas modifié"}`;
    case "ja":
      return `現在のユーザー名: ${nameuser || "変更なし"}`;
    default:
      return `Current username: ${nameuser || "Not changed"}`;
  }
};

export const translateEditBio = (language: string, bio?: string | null) => {
  switch (language) {
    case "vi":
      return `Chỉnh sửa giới thiệu: ${bio || "Chưa thay đổi"}`;
    case "en":
      return `Edit bio: ${bio || "Not changed"}`;
    case "zh":
      return `编辑简介: ${bio || "未更改"}`;
    case "fr":
      return `Modifier la biographie : ${bio || "Pas modifié"}`;
    case "ja":
      return `自己紹介を編集: ${bio || "変更なし"}`;
    default:
      return `Edit bio: ${bio || "Not changed"}`;
  }
};

export const translateEditDisplayBio = (
  language: string,
  bio?: string | null
) => {
  switch (language) {
    case "vi":
      return `Chỉnh sửa giới thiệu hiển thị ở trang cá nhân: ${
        bio || "Chưa thay đổi"
      }`;
    case "en":
      return `Edit the bio displayed on your profile: ${bio || "Not changed"}`;
    case "zh":
      return `编辑显示在个人资料上的简介: ${bio || "未更改"}`;
    case "fr":
      return `Modifier la biographie affichée sur votre profil : ${
        bio || "Pas modifié"
      }`;
    case "ja":
      return `プロフィールに表示される自己紹介を編集: ${bio || "変更なし"}`;
    default:
      return `Edit the bio displayed on your profile: ${bio || "Not changed"}`;
  }
};

export const translateEditGender = (
  language: string,
  gender?: string | null
) => {
  switch (language) {
    case "vi":
      return `Chỉnh sửa giới tính: ${gender || "Chưa thay đổi"}`;
    case "en":
      return `Edit gender: ${gender || "Not changed"}`;
    case "zh":
      return `编辑性别: ${gender || "未更改"}`;
    case "fr":
      return `Modifier le sexe : ${gender || "Pas modifié"}`;
    case "ja":
      return `性別を編集: ${gender || "変更なし"}`;
    default:
      return `Edit gender: ${gender || "Not changed"}`;
  }
};

export const translateEditYourGender = (
  language: string,
  gender?: string | null
) => {
  switch (language) {
    case "vi":
      return `Chỉnh sửa giới tính của bản thân: ${gender || "Chưa thay đổi"}`;
    case "en":
      return `Edit your gender: ${gender || "Not changed"}`;
    case "zh":
      return `编辑您的性别: ${gender || "未更改"}`;
    case "fr":
      return `Modifier votre sexe : ${gender || "Pas modifié"}`;
    case "ja":
      return `自分の性別を編集: ${gender || "変更なし"}`;
    default:
      return `Edit your gender: ${gender || "Not changed"}`;
  }
};

export const translateEditPhoneNumber = (
  language: string,
  phonenumber?: string | null
) => {
  switch (language) {
    case "vi":
      return `Chỉnh sửa số điện thoại: ${phonenumber || "Chưa thay đổi"}`;
    case "en":
      return `Edit phone number: ${phonenumber || "Not changed"}`;
    case "zh":
      return `编辑电话号码: ${phonenumber || "未更改"}`;
    case "fr":
      return `Modifier le numéro de téléphone : ${
        phonenumber || "Pas modifié"
      }`;
    case "ja":
      return `電話番号を編集: ${phonenumber || "変更なし"}`;
    default:
      return `Edit phone number: ${phonenumber || "Not changed"}`;
  }
};

export const translateEditValidPhoneNumber = (
  language: string,
  phonenumber?: string | null
) => {
  switch (language) {
    case "vi":
      return `Chỉnh sửa số điện thoại phù hợp 10-11 số: ${
        phonenumber || "Chưa thay đổi"
      }`;
    case "en":
      return `Edit a valid phone number (10-11 digits): ${
        phonenumber || "Not changed"
      }`;
    case "zh":
      return `编辑有效的电话号码（10-11位数字）：${phonenumber || "未更改"}`;
    case "fr":
      return `Modifier un numéro de téléphone valide (10-11 chiffres) : ${
        phonenumber || "Pas modifié"
      }`;
    case "ja":
      return `10～11桁の有効な電話番号を編集：${phonenumber || "変更なし"}`;
    default:
      return `Edit a valid phone number (10-11 digits): ${
        phonenumber || "Not changed"
      }`;
  }
};

export const translateEditDateOfBirth = (
  language: string,
  dateofbirth?: string | null
) => {
  switch (language) {
    case "vi":
      return `Chỉnh sửa sinh nhật: ${dateofbirth || "Chưa thay đổi"}`;
    case "en":
      return `Edit date of birth: ${dateofbirth || "Not changed"}`;
    case "zh":
      return `编辑出生日期: ${dateofbirth || "未更改"}`;
    case "fr":
      return `Modifier la date de naissance : ${dateofbirth || "Pas modifié"}`;
    case "ja":
      return `生年月日を編集: ${dateofbirth || "変更なし"}`;
    default:
      return `Edit date of birth: ${dateofbirth || "Not changed"}`;
  }
};

export const translateEditYourDateOfBirth = (
  language: string,
  dateofbirth?: string | null
) => {
  switch (language) {
    case "vi":
      return `Chỉnh sửa sinh nhật của bản thân: ${
        dateofbirth || "Chưa thay đổi"
      }`;
    case "en":
      return `Edit your date of birth: ${dateofbirth || "Not changed"}`;
    case "zh":
      return `编辑您的出生日期: ${dateofbirth || "未更改"}`;
    case "fr":
      return `Modifier votre date de naissance : ${
        dateofbirth || "Pas modifié"
      }`;
    case "ja":
      return `自分の生年月日を編集: ${dateofbirth || "変更なし"}`;
    default:
      return `Edit your date of birth: ${dateofbirth || "Not changed"}`;
  }
};

export const translateEditAddress = (
  language: string,
  address?: string | null
) => {
  switch (language) {
    case "vi":
      return `Chỉnh sửa địa chỉ: ${address || "Chưa thay đổi"}`;
    case "en":
      return `Edit address: ${address || "Not changed"}`;
    case "zh":
      return `编辑地址: ${address || "未更改"}`;
    case "fr":
      return `Modifier l'adresse : ${address || "Pas modifié"}`;
    case "ja":
      return `住所を編集: ${address || "変更なし"}`;
    default:
      return `Edit address: ${address || "Not changed"}`;
  }
};

export const translateEditYourAddress = (
  language: string,
  address?: string | null
) => {
  switch (language) {
    case "vi":
      return `Chỉnh sửa địa chỉ của riêng bạn: ${address || "Chưa thay đổi"}`;
    case "en":
      return `Edit your address: ${address || "Not changed"}`;
    case "zh":
      return `编辑您的地址: ${address || "未更改"}`;
    case "fr":
      return `Modifier votre adresse : ${address || "Pas modifié"}`;
    case "ja":
      return `自分の住所を編集: ${address || "変更なし"}`;
    default:
      return `Edit your address: ${address || "Not changed"}`;
  }
};

export const translateDeleteAccountWarning = (language: string) => {
  switch (language) {
    case "vi":
      return "Hành động của bạn sẽ xóa đi vĩnh viễn tài khoản khỏi hệ thống. Hãy cân nhắc kỹ trước khi thực hiện hành động này.";
    case "en":
      return "Your action will permanently delete the account from the system. Please consider carefully before proceeding.";
    case "zh":
      return "您的操作将永久删除账户。请在执行此操作之前仔细考虑。";
    case "fr":
      return "Votre action supprimera définitivement le compte du système. Veuillez réfléchir attentivement avant de procéder.";
    case "ja":
      return "この操作はアカウントをシステムから永遠に削除します。実行する前に慎重に検討してください。";
    default:
      return "Your action will permanently delete the account from the system. Please consider carefully before proceeding.";
  }
};

export const translateEditFavorite = (language: string) => {
  switch (language) {
    case "vi":
      return "Chỉnh sửa ưa thích của bạn:";
    case "en":
      return "Edit your favorite:";
    case "zh":
      return "编辑您的喜欢:";
    case "fr":
      return "Modifier vos favoris :";
    case "ja":
      return "お気に入りを編集 :";
    default:
      return "Edit your favorite:";
  }
};

export const translateChooseFrameForAccount = (language: string) => {
  switch (language) {
    case "vi":
      return "Hãy chọn 1 khung thay đổi cho tài khoản của bạn.";
    case "en":
      return "Please choose a frame to change for your account.";
    case "zh":
      return "请选择一个框架来更改您的帐户。";
    case "fr":
      return "Veuillez choisir un cadre à changer pour votre compte.";
    case "ja":
      return "アカウントの変更のためにフレームを選んでください。";
    default:
      return "Please choose a frame to change for your account.";
  }
};

export const translateFrameAlreadySelected = (language: string) => {
  switch (language) {
    case "vi":
      return "Khung đã được chọn trước đó.";
    case "en":
      return "The frame has been selected previously.";
    case "zh":
      return "该框架已被选中。";
    case "fr":
      return "Le cadre a déjà été sélectionné.";
    case "ja":
      return "フレームはすでに選択されています。";
    default:
      return "The frame has been selected previously.";
  }
};

export const translateChooseAvatarFrame = (language: string) => {
  switch (language) {
    case "vi":
      return "Chọn khung avatar";
    case "en":
      return "Choose avatar frame";
    case "zh":
      return "选择头像框";
    case "fr":
      return "Choisir un cadre d'avatar";
    case "ja":
      return "アバター枠を選択";
    default:
      return "Choose avatar frame";
  }
};

export const translateChooseVIPAvatarFrame = (language: string) => {
  switch (language) {
    case "vi":
      return "Chọn khung avatar VIP";
    case "en":
      return "Choose VIP avatar frame";
    case "zh":
      return "选择VIP头像框";
    case "fr":
      return "Choisir un cadre d'avatar VIP";
    case "ja":
      return "VIPアバター枠を選択";
    default:
      return "Choose VIP avatar frame";
  }
};

export const translateChangeNameNotification = (language: string) => {
  switch (language) {
    case "vi":
      return "Hãy thay đổi tên mới, tên cũ đang được sử dụng.";
    case "en":
      return "Please choose a new name, the old name is already in use.";
    case "zh":
      return "请选择一个新名称，旧名称已被使用。";
    case "fr":
      return "Veuillez choisir un nouveau nom, l'ancien nom est déjà utilisé.";
    case "ja":
      return "新しい名前を選んでください。古い名前は既に使用されています。";
    default:
      return "Please choose a new name, the old name is already in use.";
  }
};

export const translateName = (language: string) => {
  switch (language) {
    case "vi":
      return "Tên";
    case "en":
      return "Name";
    case "zh":
      return "名称";
    case "fr":
      return "Nom";
    case "ja":
      return "名前";
    default:
      return "Name";
  }
};

export const translateProfileBio = (language: string) => {
  switch (language) {
    case "vi":
      return "Bio trang cá nhân";
    case "en":
      return "Profile bio";
    case "zh":
      return "个人简介";
    case "fr":
      return "Bio du profil";
    case "ja":
      return "プロフィールのバイオ";
    default:
      return "Profile bio";
  }
};

export const translateRemainingCharacters = (
  language: string,
  remainingChars: number
) => {
  const chars = remainingChars < 0 ? 0 : remainingChars;
  switch (language) {
    case "vi":
      return `Còn <span className="mx-1">${chars}</span> ký tự`;
    case "en":
      return `Remaining <span className="mx-1">${chars}</span> characters`;
    case "zh":
      return `还剩 <span className="mx-1">${chars}</span> 个字符`;
    case "fr":
      return `Il reste <span className="mx-1">${chars}</span> caractères`;
    case "ja":
      return `残り <span className="mx-1">${chars}</span> 文字`;
    default:
      return `Remaining <span className="mx-1">${chars}</span> characters`;
  }
};

export const translateChangeGenderNotification = (language: string) => {
  switch (language) {
    case "vi":
      return "Hãy thay đổi giới tính mới, giới tính trên đang được sử dụng.";
    case "en":
      return "Please choose a new gender, the current one is already in use.";
    case "zh":
      return "请选择一个新的性别，当前性别已被使用。";
    case "fr":
      return "Veuillez choisir un nouveau genre, celui actuel est déjà utilisé.";
    case "ja":
      return "新しい性別を選んでください。現在の性別はすでに使用されています。";
    default:
      return "Please choose a new gender, the current one is already in use.";
  }
};

export const translateChangePhoneNumberNotification = (language: string) => {
  switch (language) {
    case "vi":
      return "Hãy thay đổi số điện thoại mới, số điện thoại trên đang được sử dụng.";
    case "en":
      return "Please choose a new phone number, the current one is already in use.";
    case "zh":
      return "请选择一个新的电话号码，当前的电话号码已被使用。";
    case "fr":
      return "Veuillez choisir un nouveau numéro de téléphone, celui actuel est déjà utilisé.";
    case "ja":
      return "新しい電話番号を選んでください。現在の電話番号はすでに使用されています。";
    default:
      return "Please choose a new phone number, the current one is already in use.";
  }
};

export const translateChangeBirthdayNotification = (language: string) => {
  switch (language) {
    case "vi":
      return "Hãy thay đổi ngày sinh mới, ngày sinh trên đang được sử dụng.";
    case "en":
      return "Please choose a new birthdate, the current one is already in use.";
    case "zh":
      return "请选择一个新的生日，当前的生日已被使用。";
    case "fr":
      return "Veuillez choisir une nouvelle date de naissance, celle actuelle est déjà utilisée.";
    case "ja":
      return "新しい誕生日を選んでください。現在の誕生日はすでに使用されています。";
    default:
      return "Please choose a new birthdate, the current one is already in use.";
  }
};

export const translateDateValidation = (language: string) => {
  switch (language) {
    case "vi":
      return "Ngày chọn không được lớn hơn ngày hiện tại!";
    case "en":
      return "The selected date cannot be later than the current date!";
    case "zh":
      return "选择的日期不能晚于当前日期！";
    case "fr":
      return "La date sélectionnée ne peut pas être plus grande que la date actuelle !";
    case "ja":
      return "選択した日付は現在の日付より後になってはいけません！";
    default:
      return "The selected date cannot be later than the current date!";
  }
};

export const translateDateLimitNotification = (language: string) => {
  switch (language) {
    case "vi":
      return "Ngày chọn không được nhỏ hơn ngày 01/01/1900!";
    case "en":
      return "The selected date cannot be earlier than 01/01/1900!";
    case "zh":
      return "选择的日期不能早于 01/01/1900！";
    case "fr":
      return "La date sélectionnée ne peut pas être antérieure au 01/01/1900 !";
    case "ja":
      return "選択された日付は 01/01/1900 よりも前の日付に設定できません！";
    default:
      return "The selected date cannot be earlier than 01/01/1900!";
  }
};

export const translateChangeAddressNotification = (language: string) => {
  switch (language) {
    case "vi":
      return "Hãy thay đổi địa chỉ mới, địa chỉ trên đang được sử dụng.";
    case "en":
      return "Please choose a new address, the current one is already in use.";
    case "zh":
      return "请选择一个新的地址，当前的地址已被使用。";
    case "fr":
      return "Veuillez choisir une nouvelle adresse, celle actuelle est déjà utilisée.";
    case "ja":
      return "新しい住所を選んでください。現在の住所はすでに使用されています。";
    default:
      return "Please choose a new address, the current one is already in use.";
  }
};

export const translateAccountDeletionSuccess = (language: string) => {
  switch (language) {
    case "vi":
      return "Tài khoản của bạn đã xóa thành công!";
    case "en":
      return "Your account has been successfully deleted!";
    case "zh":
      return "您的帐户已成功删除！";
    case "fr":
      return "Votre compte a été supprimé avec succès !";
    case "ja":
      return "あなたのアカウントは正常に削除されました！";
    default:
      return "Your account has been successfully deleted!";
  }
};

export const translateAccountDeletionConfirmation = (language: string) => {
  switch (language) {
    case "vi":
      return "Bạn đã chắc chắn xóa đi tài khoản của mình?";
    case "en":
      return "Are you sure you want to delete your account?";
    case "zh":
      return "您确定要删除您的帐户吗？";
    case "fr":
      return "Êtes-vous sûr de vouloir supprimer votre compte ?";
    case "ja":
      return "アカウントを削除してもよろしいですか？";
    default:
      return "Are you sure you want to delete your account?";
  }
};

export const translateIrreversibleDeletion = (language: string) => {
  switch (language) {
    case "vi":
      return "Nếu bạn xóa sẽ không thể khôi phục.";
    case "en":
      return "If you delete, it cannot be recovered.";
    case "zh":
      return "如果您删除，将无法恢复。";
    case "fr":
      return "Si vous supprimez, il ne pourra pas être récupéré.";
    case "ja":
      return "削除すると復元できません。";
    default:
      return "If you delete, it cannot be recovered.";
  }
};

export const translateDeleteAccountPrompt = (
  language: string,
  email?: string | null
) => {
  switch (language) {
    case "vi":
      return `Để xóa tài khoản bạn cần nhập “<span className="font-bold text-red-500 text-sm">${email}</span>” vào bên dưới.`;
    case "en":
      return `To delete your account, you need to enter “<span className="font-bold text-red-500 text-sm">${email}</span>” below.`;
    case "zh":
      return `要删除您的帐户，您需要在下面输入“<span className="font-bold text-red-500 text-sm">${email}</span>”。`;
    case "fr":
      return `Pour supprimer votre compte, vous devez entrer “<span className="font-bold text-red-500 text-sm">${email}</span>” ci-dessous.`;
    case "ja":
      return `アカウントを削除するには、“<span className="font-bold text-red-500 text-sm">${email}</span>” を下に入力する必要があります。`;
    default:
      return `To delete your account, you need to enter “<span className="font-bold text-red-500 text-sm">${email}</span>” below.`;
  }
};

export const translateContent = (language: string) => {
  switch (language) {
    case "vi":
      return "Nội dung";
    case "en":
      return "Content";
    case "zh":
      return "内容";
    case "fr":
      return "Contenu";
    case "ja":
      return "コンテンツ";
    default:
      return "Content";
  }
};

export const translateEnterEmailPrompt = (
  language: string,
  email?: string | null
) => {
  switch (language) {
    case "vi":
      return `Hãy nhập ${email} vào đây.`;
    case "en":
      return `Please enter ${email} here.`;
    case "zh":
      return `请在这里输入 ${email}。`;
    case "fr":
      return `Veuillez entrer ${email} ici.`;
    case "ja":
      return `${email} をここに入力してください。`;
    default:
      return `Please enter ${email} here.`;
  }
};

export const translateChangePreferenceNotification = (language: string) => {
  switch (language) {
    case "vi":
      return "Hãy thay đổi ưa thích mới, ưa thích trên đang được sử dụng.";
    case "en":
      return "Please choose a new preference, the current one is already in use.";
    case "zh":
      return "请选择一个新的偏好，当前的偏好已被使用。";
    case "fr":
      return "Veuillez choisir une nouvelle préférence, celle actuelle est déjà utilisée.";
    case "ja":
      return "新しい好みを選んでください。現在の好みはすでに使用されています。";
    default:
      return "Please choose a new preference, the current one is already in use.";
  }
};

export const translateChooseYourPreference = (language: string) => {
  switch (language) {
    case "vi":
      return "Chọn sở thích của bạn";
    case "en":
      return "Choose your preference";
    case "zh":
      return "选择您的偏好";
    case "fr":
      return "Choisissez votre préférence";
    case "ja":
      return "あなたの好みを選んでください";
    default:
      return "Choose your preference";
  }
};

export const translateAddProfilePicture = (language: string) => {
  switch (language) {
    case "vi":
      return "Hãy thêm ảnh đại diện cho tài khoản của bạn.";
    case "en":
      return "Please add a profile picture for your account.";
    case "zh":
      return "请为您的帐户添加头像。";
    case "fr":
      return "Veuillez ajouter une photo de profil pour votre compte.";
    case "ja":
      return "アカウントのプロフィール画像を追加してください。";
    default:
      return "Please add a profile picture for your account.";
  }
};

export const translateChooseBestProfilePicture = (language: string) => {
  switch (language) {
    case "vi":
      return "Hãy lựa chọn 1 bức ảnh đẹp nhất để làm ảnh đại diện và xóa ảnh còn lại đi.";
    case "en":
      return "Please choose the best picture to set as your profile picture and delete the rest.";
    case "zh":
      return "请选择最好的照片作为您的头像，并删除其余的照片。";
    case "fr":
      return "Veuillez choisir la meilleure photo pour votre photo de profil et supprimer les autres.";
    case "ja":
      return "最も美しい写真をプロフィール画像として選択し、残りの写真は削除してください。";
    default:
      return "Please choose the best picture to set as your profile picture and delete the rest.";
  }
};

export const translateChangeProfilePictureNotification = (language: string) => {
  switch (language) {
    case "vi":
      return "Hãy thay đổi ảnh mới, ảnh trên đang được sử dụng.";
    case "en":
      return "Please choose a new picture, the current one is already in use.";
    case "zh":
      return "请选择一张新图片，当前的图片已在使用中。";
    case "fr":
      return "Veuillez choisir une nouvelle image, l'image actuelle est déjà utilisée.";
    case "ja":
      return "新しい画像を選んでください。現在の画像はすでに使用されています。";
    default:
      return "Please choose a new picture, the current one is already in use.";
  }
};

export const translateChooseProfilePicturePrompt = (language: string) => {
  switch (language) {
    case "vi":
      return "Chọn ảnh đại diện (Nếu bạn không có ảnh)";
    case "en":
      return "Choose a profile picture (If you don't have one)";
    case "zh":
      return "选择头像（如果您没有的话）";
    case "fr":
      return "Choisir une photo de profil (Si vous n'en avez pas)";
    case "ja":
      return "プロフィール画像を選んでください（画像がない場合）";
    default:
      return "Choose a profile picture (If you don't have one)";
  }
};

export const translateChooseVIPProfilePicture = (language: string) => {
  switch (language) {
    case "vi":
      return "Chọn ảnh đại diện VIP";
    case "en":
      return "Choose VIP profile picture";
    case "zh":
      return "选择VIP头像";
    case "fr":
      return "Choisir une photo de profil VIP";
    case "ja":
      return "VIPプロフィール画像を選択";
    default:
      return "Choose VIP profile picture";
  }
};

export const translatePersonalWebsite = (language: string) => {
  switch (language) {
    case "vi":
      return "Trang web cá nhân";
    case "en":
      return "Personal website";
    case "zh":
      return "个人网站";
    case "fr":
      return "Site web personnel";
    case "ja":
      return "個人ウェブサイト";
    default:
      return "Personal website";
  }
};

export const translateEditPersonalWebsiteLink = (
  language: string,
  linkwebsite: string | null
) => {
  switch (language) {
    case "vi":
      return `Chỉnh sửa link web cá nhân: ${linkwebsite || "Chưa thay đổi"}`;
    case "en":
      return `Edit personal website link: ${linkwebsite || "Not changed yet"}`;
    case "zh":
      return `编辑个人网站链接: ${linkwebsite || "尚未更改"}`;
    case "fr":
      return `Modifier le lien du site web personnel : ${
        linkwebsite || "Pas encore modifié"
      }`;
    case "ja":
      return `個人ウェブサイトのリンクを編集: ${
        linkwebsite || "まだ変更されていません"
      }`;
    default:
      return `Edit personal website link: ${linkwebsite || "Not changed yet"}`;
  }
};

export const translateEditYourPersonalWebsite = (
  language: string,
  linkwebsite: string | null
) => {
  switch (language) {
    case "vi":
      return `Chỉnh sửa trang web cá nhân của bạn: ${
        linkwebsite || "Chưa thay đổi"
      }`;
    case "en":
      return `Edit your personal website: ${linkwebsite || "Not changed yet"}`;
    case "zh":
      return `编辑您的个人网站: ${linkwebsite || "尚未更改"}`;
    case "fr":
      return `Modifier votre site web personnel : ${
        linkwebsite || "Pas encore modifié"
      }`;
    case "ja":
      return `あなたの個人ウェブサイトを編集: ${
        linkwebsite || "まだ変更されていません"
      }`;
    default:
      return `Edit your personal website: ${linkwebsite || "Not changed yet"}`;
  }
};

export const translateEditGithubLink = (
  language: string,
  linkgithub: string | null
) => {
  switch (language) {
    case "vi":
      return `Chỉnh sửa link Github: ${linkgithub || "Chưa thay đổi"}`;
    case "en":
      return `Edit Github link: ${linkgithub || "Not changed yet"}`;
    case "zh":
      return `编辑Github链接: ${linkgithub || "尚未更改"}`;
    case "fr":
      return `Modifier le lien Github : ${linkgithub || "Pas encore modifié"}`;
    case "ja":
      return `Githubリンクを編集: ${linkgithub || "まだ変更されていません"}`;
    default:
      return `Edit Github link: ${linkgithub || "Not changed yet"}`;
  }
};

export const translateEditGithubLinkForCode = (
  language: string,
  linkgithub: string | null
) => {
  switch (language) {
    case "vi":
      return `Chỉnh sửa link GitHub để tham khảo source code: ${
        linkgithub || "Chưa thay đổi"
      }`;
    case "en":
      return `Edit GitHub link to reference source code: ${
        linkgithub || "Not changed yet"
      }`;
    case "zh":
      return `编辑GitHub链接以参考源代码: ${linkgithub || "尚未更改"}`;
    case "fr":
      return `Modifier le lien GitHub pour consulter le code source : ${
        linkgithub || "Pas encore modifié"
      }`;
    case "ja":
      return `ソースコードを参照するためのGitHubリンクを編集: ${
        linkgithub || "まだ変更されていません"
      }`;
    default:
      return `Edit GitHub link to reference source code: ${
        linkgithub || "Not changed yet"
      }`;
  }
};

export const translateEditLinkedinLink = (
  language: string,
  linklinkedin: string | null
) => {
  switch (language) {
    case "vi":
      return `Chỉnh sửa link Linkedin: ${linklinkedin || "Chưa thay đổi"}`;
    case "en":
      return `Edit Linkedin link: ${linklinkedin || "Not changed yet"}`;
    case "zh":
      return `编辑Linkedin链接: ${linklinkedin || "尚未更改"}`;
    case "fr":
      return `Modifier le lien Linkedin : ${
        linklinkedin || "Pas encore modifié"
      }`;
    case "ja":
      return `Linkedinリンクを編集: ${
        linklinkedin || "まだ変更されていません"
      }`;
    default:
      return `Edit Linkedin link: ${linklinkedin || "Not changed yet"}`;
  }
};

export const translateEditLinkedinLinkForProfile = (
  language: string,
  linklinkedin: string | null
) => {
  switch (language) {
    case "vi":
      return `Chỉnh sửa link Linkedin để hiển thị ở trang cá nhân: ${
        linklinkedin || "Chưa thay đổi"
      }`;
    case "en":
      return `Edit Linkedin link to display on your profile: ${
        linklinkedin || "Not changed yet"
      }`;
    case "zh":
      return `编辑Linkedin链接以在个人资料页显示: ${
        linklinkedin || "尚未更改"
      }`;
    case "fr":
      return `Modifier le lien Linkedin pour l'afficher sur votre profil : ${
        linklinkedin || "Pas encore modifié"
      }`;
    case "ja":
      return `Linkedinリンクをプロフィールに表示するために編集: ${
        linklinkedin || "まだ変更されていません"
      }`;
    default:
      return `Edit Linkedin link to display on your profile: ${
        linklinkedin || "Not changed yet"
      }`;
  }
};

export const translateEditFacebookLink = (
  language: string,
  linkfacebook: string | null
) => {
  switch (language) {
    case "vi":
      return `Chỉnh sửa link Facebook: ${linkfacebook || "Chưa thay đổi"}`;
    case "en":
      return `Edit Facebook link: ${linkfacebook || "Not changed yet"}`;
    case "zh":
      return `编辑Facebook链接: ${linkfacebook || "尚未更改"}`;
    case "fr":
      return `Modifier le lien Facebook : ${
        linkfacebook || "Pas encore modifié"
      }`;
    case "ja":
      return `Facebookリンクを編集: ${
        linkfacebook || "まだ変更されていません"
      }`;
    default:
      return `Edit Facebook link: ${linkfacebook || "Not changed yet"}`;
  }
};

export const translateEditFacebookLinkForProfile = (
  language: string,
  linkfacebook: string | null
) => {
  switch (language) {
    case "vi":
      return `Chỉnh sửa link Facebook để hiển thị ở trang cá nhân: ${
        linkfacebook || "Chưa thay đổi"
      }`;
    case "en":
      return `Edit Facebook link to display on your profile: ${
        linkfacebook || "Not changed yet"
      }`;
    case "zh":
      return `编辑Facebook链接以在个人资料页显示: ${
        linkfacebook || "尚未更改"
      }`;
    case "fr":
      return `Modifier le lien Facebook pour l'afficher sur votre profil : ${
        linkfacebook || "Pas encore modifié"
      }`;
    case "ja":
      return `Facebookリンクをプロフィールに表示するために編集: ${
        linkfacebook || "まだ変更されていません"
      }`;
    default:
      return `Edit Facebook link to display on your profile: ${
        linkfacebook || "Not changed yet"
      }`;
  }
};

export const translateEditYoutubeLink = (
  language: string,
  linkyoutube: string | null
) => {
  switch (language) {
    case "vi":
      return `Chỉnh sửa link Youtube: ${linkyoutube || "Chưa thay đổi"}`;
    case "en":
      return `Edit Youtube link: ${linkyoutube || "Not changed yet"}`;
    case "zh":
      return `编辑Youtube链接: ${linkyoutube || "尚未更改"}`;
    case "fr":
      return `Modifier le lien Youtube : ${
        linkyoutube || "Pas encore modifié"
      }`;
    case "ja":
      return `Youtubeリンクを編集: ${linkyoutube || "まだ変更されていません"}`;
    default:
      return `Edit Youtube link: ${linkyoutube || "Not changed yet"}`;
  }
};

export const translateEditYoutubeLinkForProfile = (
  language: string,
  linkyoutube: string | null
) => {
  switch (language) {
    case "vi":
      return `Chỉnh sửa link Youtube để hiển thị ở trang cá nhân: ${
        linkyoutube || "Chưa thay đổi"
      }`;
    case "en":
      return `Edit Youtube link to display on your profile: ${
        linkyoutube || "Not changed yet"
      }`;
    case "zh":
      return `编辑Youtube链接以在个人资料页显示: ${linkyoutube || "尚未更改"}`;
    case "fr":
      return `Modifier le lien Youtube pour l'afficher sur votre profil : ${
        linkyoutube || "Pas encore modifié"
      }`;
    case "ja":
      return `Youtubeリンクをプロフィールに表示するために編集: ${
        linkyoutube || "まだ変更されていません"
      }`;
    default:
      return `Edit Youtube link to display on your profile: ${
        linkyoutube || "Not changed yet"
      }`;
  }
};

export const translateEditTiktokLink = (
  language: string,
  linktiktok: string | null
) => {
  switch (language) {
    case "vi":
      return `Chỉnh sửa link Tiktok: ${linktiktok || "Chưa thay đổi"}`;
    case "en":
      return `Edit Tiktok link: ${linktiktok || "Not changed yet"}`;
    case "zh":
      return `编辑Tiktok链接: ${linktiktok || "尚未更改"}`;
    case "fr":
      return `Modifier le lien Tiktok : ${linktiktok || "Pas encore modifié"}`;
    case "ja":
      return `Tiktokリンクを編集: ${linktiktok || "まだ変更されていません"}`;
    default:
      return `Edit Tiktok link: ${linktiktok || "Not changed yet"}`;
  }
};

export const translateEditTiktokLinkForProfile = (
  language: string,
  linktiktok: string | null
) => {
  switch (language) {
    case "vi":
      return `Chỉnh sửa link Tiktok để hiển thị ở trang cá nhân: ${
        linktiktok || "Chưa thay đổi"
      }`;
    case "en":
      return `Edit Tiktok link to display on your profile: ${
        linktiktok || "Not changed yet"
      }`;
    case "zh":
      return `编辑Tiktok链接以在个人资料页显示: ${linktiktok || "尚未更改"}`;
    case "fr":
      return `Modifier le lien Tiktok pour l'afficher sur votre profil : ${
        linktiktok || "Pas encore modifié"
      }`;
    case "ja":
      return `Tiktokリンクをプロフィールに表示するために編集: ${
        linktiktok || "まだ変更されていません"
      }`;
    default:
      return `Edit Tiktok link to display on your profile: ${
        linktiktok || "Not changed yet"
      }`;
  }
};

export const translateEditInstagramLink = (
  language: string,
  linkinstagram: string | null
) => {
  switch (language) {
    case "vi":
      return `Chỉnh sửa link Instagram: ${linkinstagram || "Chưa thay đổi"}`;
    case "en":
      return `Edit Instagram link: ${linkinstagram || "Not changed yet"}`;
    case "zh":
      return `编辑Instagram链接: ${linkinstagram || "尚未更改"}`;
    case "fr":
      return `Modifier le lien Instagram : ${
        linkinstagram || "Pas encore modifié"
      }`;
    case "ja":
      return `Instagramリンクを編集: ${
        linkinstagram || "まだ変更されていません"
      }`;
    default:
      return `Edit Instagram link: ${linkinstagram || "Not changed yet"}`;
  }
};

export const translateEditInstagramLinkForProfile = (
  language: string,
  linkinstagram: string | null
) => {
  switch (language) {
    case "vi":
      return `Chỉnh sửa link Instagram để hiển thị ở trang cá nhân: ${
        linkinstagram || "Chưa thay đổi"
      }`;
    case "en":
      return `Edit Instagram link to display on your profile: ${
        linkinstagram || "Not changed yet"
      }`;
    case "zh":
      return `编辑Instagram链接以在个人资料页显示: ${
        linkinstagram || "尚未更改"
      }`;
    case "fr":
      return `Modifier le lien Instagram pour l'afficher sur votre profil : ${
        linkinstagram || "Pas encore modifié"
      }`;
    case "ja":
      return `Instagramリンクをプロフィールに表示するために編集: ${
        linkinstagram || "まだ変更されていません"
      }`;
    default:
      return `Edit Instagram link to display on your profile: ${
        linkinstagram || "Not changed yet"
      }`;
  }
};

export const translateEditTwitterLink = (
  language: string,
  linktwitter: string | null
) => {
  switch (language) {
    case "vi":
      return `Chỉnh sửa link Twitter: ${linktwitter || "Chưa thay đổi"}`;
    case "en":
      return `Edit Twitter link: ${linktwitter || "Not changed yet"}`;
    case "zh":
      return `编辑Twitter链接: ${linktwitter || "尚未更改"}`;
    case "fr":
      return `Modifier le lien Twitter : ${
        linktwitter || "Pas encore modifié"
      }`;
    case "ja":
      return `Twitterリンクを編集: ${linktwitter || "まだ変更されていません"}`;
    default:
      return `Edit Twitter link: ${linktwitter || "Not changed yet"}`;
  }
};

export const translateEditTwitterLinkForProfile = (
  language: string,
  linktwitter: string | null
) => {
  switch (language) {
    case "vi":
      return `Chỉnh sửa link Twitter để hiển thị ở trang cá nhân: ${
        linktwitter || "Chưa thay đổi"
      }`;
    case "en":
      return `Edit Twitter link to display on your profile: ${
        linktwitter || "Not changed yet"
      }`;
    case "zh":
      return `编辑Twitter链接以在个人资料页显示: ${linktwitter || "尚未更改"}`;
    case "fr":
      return `Modifier le lien Twitter pour l'afficher sur votre profil : ${
        linktwitter || "Pas encore modifié"
      }`;
    case "ja":
      return `Twitterリンクをプロフィールに表示するために編集: ${
        linktwitter || "まだ変更されていません"
      }`;
    default:
      return `Edit Twitter link to display on your profile: ${
        linktwitter || "Not changed yet"
      }`;
  }
};

export const translateEditOtherLink = (
  language: string,
  linkother: string | null
) => {
  switch (language) {
    case "vi":
      return `Chỉnh sửa link Other: ${linkother || "Chưa thay đổi"}`;
    case "en":
      return `Edit Other link: ${linkother || "Not changed yet"}`;
    case "zh":
      return `编辑Other链接: ${linkother || "尚未更改"}`;
    case "fr":
      return `Modifier le lien Other : ${linkother || "Pas encore modifié"}`;
    case "ja":
      return `Otherリンクを編集: ${linkother || "まだ変更されていません"}`;
    default:
      return `Edit Other link: ${linkother || "Not changed yet"}`;
  }
};

export const translateEditOtherLinkForProfile = (
  language: string,
  linkother: string | null
) => {
  switch (language) {
    case "vi":
      return `Chỉnh sửa link Other để hiển thị ở trang cá nhân: ${
        linkother || "Chưa thay đổi"
      }`;
    case "en":
      return `Edit Other link to display on your profile: ${
        linkother || "Not changed yet"
      }`;
    case "zh":
      return `编辑Other链接以在个人资料页显示: ${linkother || "尚未更改"}`;
    case "fr":
      return `Modifier le lien Other pour l'afficher sur votre profil : ${
        linkother || "Pas encore modifié"
      }`;
    case "ja":
      return `Otherリンクをプロフィールに表示するために編集: ${
        linkother || "まだ変更されていません"
      }`;
    default:
      return `Edit Other link to display on your profile: ${
        linkother || "Not changed yet"
      }`;
  }
};

export const translateWebsitePath = (language: string) => {
  switch (language) {
    case "vi":
      return "Đường dẫn Website";
    case "en":
      return "Website URL";
    case "zh":
      return "网站路径";
    case "fr":
      return "Chemin du site Web";
    case "ja":
      return "ウェブサイトのパス";
    default:
      return "Website URL";
  }
};

export const translateChangeWebsiteLink = (language: string) => {
  switch (language) {
    case "vi":
      return "Hãy thay đổi link Website mới link Website trên đang được sử dụng.";
    case "en":
      return "Please update the new Website link; the current Website link is already in use.";
    case "zh":
      return "请更改新的网站链接，当前网站链接已在使用中。";
    case "fr":
      return "Veuillez modifier le nouveau lien du site Web, le lien actuel est déjà utilisé.";
    case "ja":
      return "新しいウェブサイトリンクに変更してください。現在のウェブサイトリンクは既に使用されています。";
    default:
      return "Please update the new Website link; the current Website link is already in use.";
  }
};

export const translateGithubPath = (language: string) => {
  switch (language) {
    case "vi":
      return "Đường dẫn Github";
    case "en":
      return "Github Path";
    case "zh":
      return "Github路径";
    case "fr":
      return "Chemin Github";
    case "ja":
      return "Githubのパス";
    default:
      return "Github Path";
  }
};

export const translateChangeGithubLink = (language: string) => {
  switch (language) {
    case "vi":
      return "Hãy thay đổi link Github mới link Github trên đang được sử dụng.";
    case "en":
      return "Please update the new Github link; the current Github link is already in use.";
    case "zh":
      return "请更改新的Github链接，当前Github链接已在使用中。";
    case "fr":
      return "Veuillez modifier le nouveau lien Github, le lien actuel est déjà utilisé.";
    case "ja":
      return "新しいGithubリンクに変更してください。現在のGithubリンクは既に使用されています。";
    default:
      return "Please update the new Github link; the current Github link is already in use.";
  }
};

export const translateLinkedInPath = (language: string) => {
  switch (language) {
    case "vi":
      return "Đường dẫn LinkedIn";
    case "en":
      return "LinkedIn Path";
    case "zh":
      return "LinkedIn路径";
    case "fr":
      return "Chemin LinkedIn";
    case "ja":
      return "LinkedInのパス";
    default:
      return "LinkedIn Path";
  }
};

export const translateChangeLinkedInLink = (language: string) => {
  switch (language) {
    case "vi":
      return "Hãy thay đổi link LinkedIn mới link LinkedIn trên đang được sử dụng.";
    case "en":
      return "Please update the new LinkedIn link; the current LinkedIn link is already in use.";
    case "zh":
      return "请更改新的LinkedIn链接，当前LinkedIn链接已在使用中。";
    case "fr":
      return "Veuillez modifier le nouveau lien LinkedIn, le lien actuel est déjà utilisé.";
    case "ja":
      return "新しいLinkedInリンクに変更してください。現在のLinkedInリンクは既に使用されています。";
    default:
      return "Please update the new LinkedIn link; the current LinkedIn link is already in use.";
  }
};

export const translateFacebookPath = (language: string) => {
  switch (language) {
    case "vi":
      return "Đường dẫn Facebook";
    case "en":
      return "Facebook Path";
    case "zh":
      return "Facebook路径";
    case "fr":
      return "Chemin Facebook";
    case "ja":
      return "Facebookのパス";
    default:
      return "Facebook Path";
  }
};

export const translateChangeFacebookLink = (language: string) => {
  switch (language) {
    case "vi":
      return "Hãy thay đổi link Facebook mới link Facebook trên đang được sử dụng.";
    case "en":
      return "Please update the new Facebook link; the current Facebook link is already in use.";
    case "zh":
      return "请更改新的Facebook链接，当前Facebook链接已在使用中。";
    case "fr":
      return "Veuillez modifier le nouveau lien Facebook, le lien actuel est déjà utilisé.";
    case "ja":
      return "新しいFacebookリンクに変更してください。現在のFacebookリンクは既に使用されています。";
    default:
      return "Please update the new Facebook link; the current Facebook link is already in use.";
  }
};

export const translateYoutubePath = (language: string) => {
  switch (language) {
    case "vi":
      return "Đường dẫn Youtube";
    case "en":
      return "Youtube Path";
    case "zh":
      return "Youtube路径";
    case "fr":
      return "Chemin Youtube";
    case "ja":
      return "Youtubeのパス";
    default:
      return "Youtube Path";
  }
};

export const translateChangeYoutubeLink = (language: string) => {
  switch (language) {
    case "vi":
      return "Hãy thay đổi link Youtube mới link Youtube trên đang được sử dụng.";
    case "en":
      return "Please update the new Youtube link; the current Youtube link is already in use.";
    case "zh":
      return "请更改新的Youtube链接，当前Youtube链接已在使用中。";
    case "fr":
      return "Veuillez modifier le nouveau lien Youtube, le lien actuel est déjà utilisé.";
    case "ja":
      return "新しいYoutubeリンクに変更してください。現在のYoutubeリンクは既に使用されています。";
    default:
      return "Please update the new Youtube link; the current Youtube link is already in use.";
  }
};

export const translateTiktokPath = (language: string) => {
  switch (language) {
    case "vi":
      return "Đường dẫn Tiktok";
    case "en":
      return "Tiktok Path";
    case "zh":
      return "Tiktok路径";
    case "fr":
      return "Chemin Tiktok";
    case "ja":
      return "Tiktokのパス";
    default:
      return "Tiktok Path";
  }
};

export const translateChangeTiktokLink = (language: string) => {
  switch (language) {
    case "vi":
      return "Hãy thay đổi link Tiktok mới link Tiktok trên đang được sử dụng.";
    case "en":
      return "Please update the new Tiktok link; the current Tiktok link is already in use.";
    case "zh":
      return "请更改新的Tiktok链接，当前Tiktok链接已在使用中。";
    case "fr":
      return "Veuillez modifier le nouveau lien Tiktok, le lien actuel est déjà utilisé.";
    case "ja":
      return "新しいTiktokリンクに変更してください。現在のTiktokリンクは既に使用されています。";
    default:
      return "Please update the new Tiktok link; the current Tiktok link is already in use.";
  }
};

export const translateInstagramPath = (language: string) => {
  switch (language) {
    case "vi":
      return "Đường dẫn Instagram";
    case "en":
      return "Instagram Path";
    case "zh":
      return "Instagram路径";
    case "fr":
      return "Chemin Instagram";
    case "ja":
      return "Instagramのパス";
    default:
      return "Instagram Path";
  }
};

export const translateChangeInstagramLink = (language: string) => {
  switch (language) {
    case "vi":
      return "Hãy thay đổi link Instagram mới link Instagram trên đang được sử dụng.";
    case "en":
      return "Please update the new Instagram link; the current Instagram link is already in use.";
    case "zh":
      return "请更改新的Instagram链接，当前Instagram链接已在使用中。";
    case "fr":
      return "Veuillez modifier le nouveau lien Instagram, le lien actuel est déjà utilisé.";
    case "ja":
      return "新しいInstagramリンクに変更してください。現在のInstagramリンクは既に使用されています。";
    default:
      return "Please update the new Instagram link; the current Instagram link is already in use.";
  }
};

export const translateTwitterPath = (language: string) => {
  switch (language) {
    case "vi":
      return "Đường dẫn Twitter";
    case "en":
      return "Twitter Path";
    case "zh":
      return "Twitter路径";
    case "fr":
      return "Chemin Twitter";
    case "ja":
      return "Twitterのパス";
    default:
      return "Twitter Path";
  }
};

export const translateChangeTwitterLink = (language: string) => {
  switch (language) {
    case "vi":
      return "Hãy thay đổi link Twitter mới link Twitter trên đang được sử dụng.";
    case "en":
      return "Please update the new Twitter link; the current Twitter link is already in use.";
    case "zh":
      return "请更改新的Twitter链接，当前Twitter链接已在使用中。";
    case "fr":
      return "Veuillez modifier le nouveau lien Twitter, le lien actuel est déjà utilisé.";
    case "ja":
      return "新しいTwitterリンクに変更してください。現在のTwitterリンクは既に使用されています。";
    default:
      return "Please update the new Twitter link; the current Twitter link is already in use.";
  }
};

export const translateOtherPath = (language: string) => {
  switch (language) {
    case "vi":
      return "Đường dẫn Other";
    case "en":
      return "Other Path";
    case "zh":
      return "Other路径";
    case "fr":
      return "Chemin Other";
    case "ja":
      return "Otherのパス";
    default:
      return "Other Path";
  }
};

export const translateChangeOtherLink = (language: string) => {
  switch (language) {
    case "vi":
      return "Hãy thay đổi link Other mới link Other trên đang được sử dụng.";
    case "en":
      return "Please update the new Other link; the current Other link is already in use.";
    case "zh":
      return "请更改新的Other链接，当前Other链接已在使用中。";
    case "fr":
      return "Veuillez modifier le nouveau lien Other, le lien actuel est déjà utilisé.";
    case "ja":
      return "新しいOtherリンクに変更してください。現在のOtherリンクは既に使用されています。";
    default:
      return "Please update the new Other link; the current Other link is already in use.";
  }
};

export const translatePasswordAndSecurity = (language: string) => {
  switch (language) {
    case "vi":
      return "Mật khẩu và bảo mật";
    case "en":
      return "Password and Security";
    case "zh":
      return "密码和安全";
    case "fr":
      return "Mot de passe et sécurité";
    case "ja":
      return "パスワードとセキュリティ";
    default:
      return "Password and Security";
  }
};

export const translatePasswordManagementAndSecuritySettings = (
  language: string
) => {
  switch (language) {
    case "vi":
      return "Quản lý mật khẩu và cài đặt bảo mật";
    case "en":
      return "Password Management and Security Settings";
    case "zh":
      return "密码管理和安全设置";
    case "fr":
      return "Gestion du mot de passe et paramètres de sécurité";
    case "ja":
      return "パスワード管理とセキュリティ設定";
    default:
      return "Password Management and Security Settings";
  }
};

export const translateLoginAndRecovery = (language: string) => {
  switch (language) {
    case "vi":
      return "Đăng nhập & khôi phục";
    case "en":
      return "Login & Recovery";
    case "zh":
      return "登录与恢复";
    case "fr":
      return "Connexion et récupération";
    case "ja":
      return "ログインと回復";
    default:
      return "Login & Recovery";
  }
};

export const translatePasswordManagementAndTwoFactorVerification = (
  language: string
) => {
  switch (language) {
    case "vi":
      return "Quản lý mật khẩu và xác minh 2 bước";
    case "en":
      return "Password Management and Two-Factor Verification";
    case "zh":
      return "密码管理和两步验证";
    case "fr":
      return "Gestion du mot de passe et vérification en deux étapes";
    case "ja":
      return "パスワード管理と二段階認証";
    default:
      return "Password Management and Two-Factor Verification";
  }
};

export const translateDeviceCheck = (language: string) => {
  switch (language) {
    case "vi":
      return "Kiểm tra thiết bị";
    case "en":
      return "Device Check";
    case "zh":
      return "设备检查";
    case "fr":
      return "Vérification de l'appareil";
    case "ja":
      return "デバイスチェック";
    default:
      return "Device Check";
  }
};

export const translateDeviceManagementAndLimitations = (language: string) => {
  switch (language) {
    case "vi":
      return "Quản lý thiết bị đang đăng nhập và giới hạn";
    case "en":
      return "Device Management and Limitations";
    case "zh":
      return "设备管理与限制";
    case "fr":
      return "Gestion des appareils et limitations";
    case "ja":
      return "ログイン中のデバイス管理と制限";
    default:
      return "Device Management and Limitations";
  }
};

export const translateChangePassword = (language: string) => {
  switch (language) {
    case "vi":
      return "Đổi mật khẩu";
    case "en":
      return "Change Password";
    case "zh":
      return "更改密码";
    case "fr":
      return "Changer le mot de passe";
    case "ja":
      return "パスワードを変更";
    default:
      return "Change Password";
  }
};

export const translatePasswordChanged = (
  language: string,
  password: string | null
) => {
  switch (language) {
    case "vi":
      return `Đã đổi mật khẩu vào ngày: ${password}`;
    case "en":
      return `Password changed on: ${password}`;
    case "zh":
      return `密码已更改，日期：${password}`;
    case "fr":
      return `Mot de passe changé le : ${password}`;
    case "ja":
      return `パスワードは ${password} に変更されました`;
    default:
      return `Password changed on: ${password}`;
  }
};

export const translatePasswordNotChanged = (language: string) => {
  switch (language) {
    case "vi":
      return "Chưa đổi mật khẩu";
    case "en":
      return "Password not changed";
    case "zh":
      return "密码未更改";
    case "fr":
      return "Mot de passe non changé";
    case "ja":
      return "パスワードは変更されていません";
    default:
      return "Password not changed";
  }
};

export const translateTwoFactorVerification = (language: string) => {
  switch (language) {
    case "vi":
      return "Xác minh 2 bước";
    case "en":
      return "Two-Factor Verification";
    case "zh":
      return "两步验证";
    case "fr":
      return "Vérification en deux étapes";
    case "ja":
      return "二段階認証";
    default:
      return "Two-Factor Verification";
  }
};

export const translatePasswordEdited = (
  language: string,
  password?: string | null
) => {
  switch (language) {
    case "vi":
      return `Đã chỉnh sửa mật khẩu vào lúc: ${password || "Chưa thay đổi"}`;
    case "en":
      return `Password edited at: ${password || "Not changed"}`;
    case "zh":
      return `密码已更改，时间：${password || "未更改"}`;
    case "fr":
      return `Mot de passe modifié à : ${password || "Non modifié"}`;
    case "ja":
      return `パスワードが変更されました: ${password || "変更されていません"}`;
    default:
      return `Password edited at: ${password || "Not changed"}`;
  }
};

export const translateSetNewPassword = (language: string) => {
  switch (language) {
    case "vi":
      return "Hãy đặt mật mã mới tránh trùng với mật khẩu cũ";
    case "en":
      return "Please set a new password that is different from the old one";
    case "zh":
      return "请设置一个与旧密码不同的新密码";
    case "fr":
      return "Veuillez définir un nouveau mot de passe différent de l'ancien";
    case "ja":
      return "古いパスワードと重複しない新しいパスワードを設定してください";
    default:
      return "Please set a new password that is different from the old one";
  }
};

export const translateTwoFactorEdit = (
  language: string,
  isTwoFactorEnabled?: boolean
) => {
  switch (language) {
    case "vi":
      return `Chỉnh sửa xác minh 2 bước: ${
        isTwoFactorEnabled || "Chưa thay đổi"
      }`;
    case "en":
      return `Edit Two-Factor Verification: ${
        isTwoFactorEnabled || "Not changed"
      }`;
    case "zh":
      return `编辑两步验证：${isTwoFactorEnabled || "未更改"}`;
    case "fr":
      return `Modifier la vérification en deux étapes : ${
        isTwoFactorEnabled || "Non modifié"
      }`;
    case "ja":
      return `二段階認証の編集: ${isTwoFactorEnabled || "変更されていません"}`;
    default:
      return `Edit Two-Factor Verification: ${
        isTwoFactorEnabled || "Not changed"
      }`;
  }
};

export const translateTwoFactorInfo = (
  language: string,
  isTwoFactorEnabled?: boolean
) => {
  switch (language) {
    case "vi":
      return `Sau khi bật xác minh 2 bước xong, khi đăng nhập lại sẽ không cần nhập tài khoản mật khẩu: ${
        isTwoFactorEnabled || "Chưa thay đổi"
      }`;
    case "en":
      return `After enabling two-factor verification, you won't need to enter your account password again when logging in: ${
        isTwoFactorEnabled || "Not changed"
      }`;
    case "zh":
      return `启用两步验证后，重新登录时无需再次输入帐户密码: ${
        isTwoFactorEnabled || "未更改"
      }`;
    case "fr":
      return `Après avoir activé la vérification en deux étapes, vous n'aurez plus besoin de saisir votre mot de passe lors de la connexion: ${
        isTwoFactorEnabled || "Non modifié"
      }`;
    case "ja":
      return `二段階認証を有効にした後、再度ログインするときはアカウントのパスワードを入力する必要はありません: ${
        isTwoFactorEnabled || "変更されていません"
      }`;
    default:
      return `After enabling two-factor verification, you won't need to enter your account password again when logging in: ${
        isTwoFactorEnabled || "Not changed"
      }`;
  }
};

export const translateEnterPassword = (language: string) => {
  switch (language) {
    case "vi":
      return "Hãy nhập mật khẩu!";
    case "en":
      return "Please enter your password!";
    case "zh":
      return "请输入密码！";
    case "fr":
      return "Veuillez entrer votre mot de passe !";
    case "ja":
      return "パスワードを入力してください！";
    default:
      return "Please enter your password!";
  }
};

export const translateEnterNewPassword = (language: string) => {
  switch (language) {
    case "vi":
      return "Hãy nhập mật khẩu mới!";
    case "en":
      return "Please enter your new password!";
    case "zh":
      return "请输入新密码！";
    case "fr":
      return "Veuillez entrer votre nouveau mot de passe !";
    case "ja":
      return "新しいパスワードを入力してください！";
    default:
      return "Please enter your new password!";
  }
};

export const translatePassword = (language: string) => {
  switch (language) {
    case "vi":
      return "Mật khẩu";
    case "en":
      return "Password";
    case "zh":
      return "密码";
    case "fr":
      return "Mot de passe";
    case "ja":
      return "パスワード";
    default:
      return "Password";
  }
};

export const translateNewPassword = (language: string) => {
  switch (language) {
    case "vi":
      return "Mật khẩu mới";
    case "en":
      return "New password";
    case "zh":
      return "新密码";
    case "fr":
      return "Nouveau mot de passe";
    case "ja":
      return "新しいパスワード";
    default:
      return "New password";
  }
};

export const translateEnterNewPasswordMessage = (language: string) => {
  switch (language) {
    case "vi":
      return "Bạn cần nhập mật khẩu mới!";
    case "en":
      return "You need to enter a new password!";
    case "zh":
      return "您需要输入新密码！";
    case "fr":
      return "Vous devez entrer un nouveau mot de passe !";
    case "ja":
      return "新しいパスワードを入力する必要があります！";
    default:
      return "You need to enter a new password!";
  }
};

export const translateLoggedInWith = (language: string) => {
  switch (language) {
    case "vi":
      return "Bạn đã đăng nhập bằng";
    case "en":
      return "You have logged in with";
    case "zh":
      return "您已使用登录";
    case "fr":
      return "Vous vous êtes connecté avec";
    case "ja":
      return "あなたはでログインしました";
    default:
      return "You have logged in with";
  }
};

export const translateCannotEnableTwoFactor = (language: string) => {
  switch (language) {
    case "vi":
      return "nên không thể bật xác minh 2 bước.";
    case "en":
      return "two-factor authentication cannot be enabled.";
    case "zh":
      return "无法启用两步验证。";
    case "fr":
      return "l'authentification à deux facteurs ne peut pas être activée.";
    case "ja":
      return "二段階認証は有効にできません。";
    default:
      return "two-factor authentication cannot be enabled.";
  }
};

export const translateCompletedPasswordUpperCase = (language: string) => {
  switch (language) {
    case "vi":
      return "Đã hoàn thành (A-Z)!";
    case "en":
      return "Completed (A-Z)!";
    case "zh":
      return "已完成 (A-Z)!";
    case "fr":
      return "Terminé (A-Z)!";
    case "ja":
      return "完了しました (A-Z)!";
    default:
      return "Completed (A-Z)!";
  }
};

export const translateHasUppercaseLetter = (language: string) => {
  switch (language) {
    case "vi":
      return "Có ít nhất một chữ cái viết hoa (A-Z)";
    case "en":
      return "There is at least one uppercase letter (A-Z)";
    case "zh":
      return "至少有一个大写字母 (A-Z)";
    case "fr":
      return "Il y a au moins une lettre majuscule (A-Z)";
    case "ja":
      return "少なくとも1つの大文字 (A-Z)があります";
    default:
      return "There is at least one uppercase letter (A-Z)";
  }
};

export const translateCompletedPassword = (language: string) => {
  switch (language) {
    case "vi":
      return "Đã hoàn thành (a-z)!";
    case "en":
      return "Completed (a-z)!";
    case "zh":
      return "已完成 (a-z)!";
    case "fr":
      return "Terminé (a-z)!";
    case "ja":
      return "完了しました (a-z)!";
    default:
      return "Completed (a-z)!";
  }
};

export const translateHasLowercase = (language: string) => {
  switch (language) {
    case "vi":
      return "Có ít nhất một chữ cái thường (a-z)";
    case "en":
      return "There must be at least one lowercase letter (a-z)";
    case "zh":
      return "必须至少有一个小写字母 (a-z)";
    case "fr":
      return "Il doit y avoir au moins une lettre minuscule (a-z)";
    case "ja":
      return "少なくとも1つの小文字 (a-z)が必要です";
    default:
      return "There must be at least one lowercase letter (a-z)";
  }
};

export const translateCompletedNumbers = (
  language: string,
  min: number,
  max: number
) => {
  switch (language) {
    case "vi":
      return `Đã hoàn thành (${min}-${max})!`;
    case "en":
      return `Completed (${min}-${max})!`;
    case "zh":
      return `已完成 (${min}-${max})!`;
    case "fr":
      return `Terminé (${min}-${max})!`;
    case "ja":
      return `完了しました (${min}-${max})!`;
    default:
      return `Completed (${min}-${max})!`;
  }
};

export const translateHasDigit = (language: string) => {
  switch (language) {
    case "vi":
      return "Có ít nhất một chữ số (0-9)";
    case "en":
      return "There is at least one digit (0-9)";
    case "zh":
      return "至少有一个数字 (0-9)";
    case "fr":
      return "Il y a au moins un chiffre (0-9)";
    case "ja":
      return "少なくとも1つの数字 (0-9)があります";
    default:
      return "There is at least one digit (0-9)";
  }
};

export const translateCharacterLength = (language: string) => {
  switch (language) {
    case "vi":
      return "6 đến 20 ký tự (6-20)";
    case "en":
      return "6 to 20 characters (6-20)";
    case "zh":
      return "6到20个字符 (6-20)";
    case "fr":
      return "6 à 20 caractères (6-20)";
    case "ja":
      return "6文字から20文字まで (6-20)";
    default:
      return "6 to 20 characters (6-20)";
  }
};

export const translateNoSpacesInPassword = (language: string) => {
  switch (language) {
    case "vi":
      return "Mật khẩu không được chứa khoảng trắng";
    case "en":
      return "Password cannot contain spaces";
    case "zh":
      return "密码不能包含空格";
    case "fr":
      return "Le mot de passe ne peut pas contenir d'espaces";
    case "ja":
      return "パスワードにスペースを含めることはできません";
    default:
      return "Password cannot contain spaces";
  }
};

export const translateNoValidSpace = (language: string) => {
  switch (language) {
    case "vi":
      return "Không chứa khoảng cách hợp lệ!";
    case "en":
      return "No valid spaces allowed!";
    case "zh":
      return "不允许有有效空格！";
    case "fr":
      return "Aucun espace valide autorisé !";
    case "ja":
      return "有効なスペースは許可されていません！";
    default:
      return "No valid spaces allowed!";
  }
};

export const translateNoAccentedCharactersInPassword = (language: string) => {
  switch (language) {
    case "vi":
      return "Mật khẩu không thể chứa ký tự có dấu";
    case "en":
      return "Password cannot contain accented characters";
    case "zh":
      return "密码不能包含带有重音的字符";
    case "fr":
      return "Le mot de passe ne peut pas contenir de caractères accentués";
    case "ja":
      return "パスワードにアクセント付きの文字を含めることはできません";
    default:
      return "Password cannot contain accented characters";
  }
};

export const translateNoValidAccent = (language: string) => {
  switch (language) {
    case "vi":
      return "Không chứa dấu hợp lệ!";
    case "en":
      return "No valid accents allowed!";
    case "zh":
      return "不允许有有效的重音符号！";
    case "fr":
      return "Aucun accent valide autorisé !";
    case "ja":
      return "有効なアクセントは許可されていません！";
    default:
      return "No valid accents allowed!";
  }
};

export const translateChangeTwoFactorStatus = (language: string) => {
  switch (language) {
    case "vi":
      return "Hãy thay đổi trạng thái xác minh 2 bước!";
    case "en":
      return "Please change the two-factor authentication status!";
    case "zh":
      return "请更改二步验证状态！";
    case "fr":
      return "Veuillez modifier l'état de l'authentification à deux facteurs !";
    case "ja":
      return "2段階認証の状態を変更してください！";
    default:
      return "Please change the two-factor authentication status!";
  }
};

export const translateTwoFactorAuthentication = (language: string) => {
  switch (language) {
    case "vi":
      return "Xác minh hai bước";
    case "en":
      return "Two Factor Authentication";
    case "zh":
      return "二步验证";
    case "fr":
      return "Authentification à deux facteurs";
    case "ja":
      return "二段階認証";
    default:
      return "Two Factor Authentication";
  }
};

export const translateEnableTwoFactorAuthentication = (language: string) => {
  switch (language) {
    case "vi":
      return "Bật xác minh hai bước cho tài khoản của bạn";
    case "en":
      return "Enable two factor authentication for your account";
    case "zh":
      return "为您的账户启用二步验证";
    case "fr":
      return "Activez l'authentification à deux facteurs pour votre compte";
    case "ja":
      return "アカウントの二段階認証を有効にする";
    default:
      return "Enable two factor authentication for your account";
  }
};

export const translateDeleteSuccess = (language: string) => {
  switch (language) {
    case "vi":
      return "Xóa thành công.";
    case "en":
      return "Deleted successfully.";
    case "zh":
      return "删除成功。";
    case "fr":
      return "Supprimé avec succès.";
    case "ja":
      return "削除に成功しました。";
    default:
      return "Deleted successfully.";
  }
};

export const translateLoggedInDevice = (language: string) => {
  switch (language) {
    case "vi":
      return "Thiết bị đăng nhập";
    case "en":
      return "Logged in device";
    case "zh":
      return "登录设备";
    case "fr":
      return "Appareil connecté";
    case "ja":
      return "ログインデバイス";
    default:
      return "Logged in device";
  }
};

export const translatePermanentDeleteAction = (language: string) => {
  switch (language) {
    case "vi":
      return "Hành động của bạn sẽ xóa đi vĩnh viễn:";
    case "en":
      return "Your action will permanently delete:";
    case "zh":
      return "您的操作将永久删除：";
    case "fr":
      return "Votre action supprimera définitivement :";
    case "ja":
      return "あなたの操作は永久に削除されます：";
    default:
      return "Your action will permanently delete:";
  }
};

export const translateUnknownDevice = (language: string) => {
  switch (language) {
    case "vi":
      return "Thiết bị không xác định";
    case "en":
      return "Unknown device";
    case "zh":
      return "未知设备";
    case "fr":
      return "Appareil inconnu";
    case "ja":
      return "不明なデバイス";
    default:
      return "Unknown device";
  }
};

export const translateDelete = (language: string) => {
  switch (language) {
    case "vi":
      return "Xóa";
    case "en":
      return "Delete";
    case "zh":
      return "删除";
    case "fr":
      return "Supprimer";
    case "ja":
      return "削除";
    default:
      return "Delete";
  }
};

export const translateFirstLoginBrowser = (language: string) => {
  switch (language) {
    case "vi":
      return "Đăng nhập đầu tiên ở trình duyệt:";
    case "en":
      return "First login in the browser:";
    case "zh":
      return "首次在浏览器登录：";
    case "fr":
      return "Première connexion dans le navigateur :";
    case "ja":
      return "ブラウザでの初回ログイン：";
    default:
      return "First login in the browser:";
  }
};

export const translateLoggedInDeviceSystem = (language: string) => {
  switch (language) {
    case "vi":
      return "Thiết bị đăng nhập vào hệ thống";
    case "en":
      return "Device logged into the system";
    case "zh":
      return "设备登录到系统";
    case "fr":
      return "Appareil connecté au système";
    case "ja":
      return "システムにログインしたデバイス";
    default:
      return "Device logged into the system";
  }
};

export const translateDeviceLimitMessage = (language: string) => {
  switch (language) {
    case "vi":
      return "Hãy thay đổi giới hạn thiết bị tùy chỉnh 1-5 thiết bị có thể đăng nhập vào hệ thống";
    case "en":
      return "Please change the device limit to 1-5 devices that can log into the system";
    case "zh":
      return "请更改设备限制为1-5个设备可以登录系统";
    case "fr":
      return "Veuillez changer la limite des appareils à 1-5 appareils pouvant se connecter au système";
    case "ja":
      return "システムにログインできるデバイスの制限を1-5に変更してください";
    default:
      return "Please change the device limit to 1-5 devices that can log into the system";
  }
};

export const translateDeviceLimitChanged = (
  language: string,
  inputValue: number | null
) => {
  switch (language) {
    case "vi":
      return `Bạn đã thay đổi giới hạn thành ${inputValue} thiết bị.`;
    case "en":
      return `You have changed the limit to ${inputValue} devices.`;
    case "zh":
      return `您已将限制更改为 ${inputValue} 个设备。`;
    case "fr":
      return `Vous avez changé la limite à ${inputValue} appareils.`;
    case "ja":
      return `デバイスの制限を ${inputValue} 台に変更しました。`;
    default:
      return `You have changed the limit to ${inputValue} devices.`;
  }
};

export const translateDeviceLimitError = (language: string) => {
  switch (language) {
    case "vi":
      return "Bạn chỉ có thể nhập 1 đến 5 thiết bị";
    case "en":
      return "You can only enter 1 to 5 devices";
    case "zh":
      return "您只能输入 1 到 5 个设备";
    case "fr":
      return "Vous ne pouvez entrer que de 1 à 5 appareils";
    case "ja":
      return "1台から5台のデバイスのみ入力できます";
    default:
      return "You can only enter 1 to 5 devices";
  }
};

export const translateDeviceLimitInputPrompt = (language: string) => {
  switch (language) {
    case "vi":
      return "Nhập giới hạn 1-5 thiết bị...";
    case "en":
      return "Enter the limit for 1-5 devices...";
    case "zh":
      return "请输入1到5个设备的限制...";
    case "fr":
      return "Entrez la limite de 1 à 5 appareils...";
    case "ja":
      return "1から5台のデバイスの制限を入力してください...";
    default:
      return "Enter the limit for 1-5 devices...";
  }
};

export const translateDeviceLimitSet = (language: string) => {
  switch (language) {
    case "vi":
      return "Bạn đã đặt giới hạn cho";
    case "en":
      return "You have set the limit for";
    case "zh":
      return "您已设置设备限制";
    case "fr":
      return "Vous avez défini la limite pour";
    case "ja":
      return "あなたは制限を設定しました";
    default:
      return "You have set the limit for";
  }
};

export const translateDevice = (language: string) => {
  switch (language) {
    case "vi":
      return "thiết bị";
    case "en":
      return "device";
    case "zh":
      return "设备";
    case "fr":
      return "appareil";
    case "ja":
      return "デバイス";
    default:
      return "device";
  }
};

export const translateInfo = (language: string) => {
  switch (language) {
    case "vi":
      return "Thông tin";
    case "en":
      return "Information";
    case "zh":
      return "信息";
    case "fr":
      return "Informations";
    case "ja":
      return "情報";
    default:
      return "Information";
  }
};

export const translateSecurity = (language: string) => {
  switch (language) {
    case "vi":
      return "Bảo mật";
    case "en":
      return "Security";
    case "zh":
      return "安全";
    case "fr":
      return "Sécurité";
    case "ja":
      return "セキュリティ";
    default:
      return "Security";
  }
};

export const translateAccountSettings = (language: string) => {
  switch (language) {
    case "vi":
      return "Cài đặt tài khoản";
    case "en":
      return "Account Settings";
    case "zh":
      return "账户设置";
    case "fr":
      return "Paramètres du compte";
    case "ja":
      return "アカウント設定";
    default:
      return "Account Settings";
  }
};

export const translateAccountManagement = (language: string) => {
  switch (language) {
    case "vi":
      return "Quản lý tài khoản của bạn như thông tin cá nhân, cài đặt bảo mật, quản lý thông báo, v.v.";
    case "en":
      return "Manage your account like personal information, security settings, notification management, etc.";
    case "zh":
      return "管理您的帐户，如个人信息、安全设置、通知管理等。";
    case "fr":
      return "Gérez votre compte comme les informations personnelles, les paramètres de sécurité, la gestion des notifications, etc.";
    case "ja":
      return "個人情報、セキュリティ設定、通知管理などのアカウント管理。";
    default:
      return "Manage your account like personal information, security settings, notification management, etc.";
  }
};

export const translateHappyBirthday = (language: string) => {
  switch (language) {
    case "vi":
      return "Chúc mừng sinh nhật";
    case "en":
      return "Happy Birthday";
    case "zh":
      return "生日快乐";
    case "fr":
      return "Joyeux anniversaire";
    case "ja":
      return "お誕生日おめでとう";
    default:
      return "Happy Birthday";
  }
};

export const translateAccompaniedWithUsToday = (language: string) => {
  switch (language) {
    case "vi":
      return "đã đồng hành cùng chúng tôi. Hôm nay";
    case "en":
      return "has been with us. Today";
    case "zh":
      return "一直与我们同行。今天";
    case "fr":
      return "a été avec nous. Aujourd'hui";
    case "ja":
      return "私たちと共に歩んできました。今日は";
    default:
      return "has been with us. Today";
  }
};

export const translateSpecialBirthdayMessage = (language: string) => {
  switch (language) {
    case "vi":
      return "là ngày đặc biệt dành cho bạn. Chúc bạn ngày sinh nhật vui vẻ bên người thân và gia đình! 🎉🎉🎉";
    case "en":
      return "is a special day for you. Wishing you a happy birthday with your loved ones and family! 🎉🎉🎉";
    case "zh":
      return "是属于你的特别一天。祝你和亲人、家人一起度过一个愉快的生日！🎉🎉🎉";
    case "fr":
      return "est un jour spécial pour vous. Nous vous souhaitons un joyeux anniversaire avec vos proches et votre famille ! 🎉🎉🎉";
    case "ja":
      return "あなたのための特別な日です。ご家族や愛する人と素敵な誕生日をお過ごしください！🎉🎉🎉";
    default:
      return "is a special day for you. Wishing you a happy birthday with your loved ones and family! 🎉🎉🎉";
  }
};

export const translateRetryAfter = (language: string, diffSeconds: number) => {
  switch (language) {
    case "vi":
      return `Bạn có thể đánh giá lại trong ${diffSeconds} giây nữa.`;
    case "en":
      return `You can retry in ${diffSeconds} seconds.`;
    case "zh":
      return `您可以在 ${diffSeconds} 秒后再试。`;
    case "fr":
      return `Vous pourrez réessayer dans ${diffSeconds} secondes.`;
    case "ja":
      return `${diffSeconds}秒後に再試行できます。`;
    default:
      return `You can retry in ${diffSeconds} seconds.`;
  }
};

export const translateRetryFeedback = (
  language: string,
  diffSeconds: number
) => {
  switch (language) {
    case "vi":
      return `Bạn có thể phản hồi lại trong ${diffSeconds} giây nữa.`;
    case "en":
      return `You can respond again in ${diffSeconds} seconds.`;
    case "zh":
      return `您可以在 ${diffSeconds} 秒后再次回复。`;
    case "fr":
      return `Vous pouvez répondre à nouveau dans ${diffSeconds} secondes.`;
    case "ja":
      return `${diffSeconds}秒後に再度返信できます。`;
    default:
      return `You can respond again in ${diffSeconds} seconds.`;
  }
};

export const translateRetryAfterMinutes = (
  language: string,
  diffMinutes: number
) => {
  switch (language) {
    case "vi":
      return `Bạn có thể đánh giá lại trong ${diffMinutes} phút nữa.`;
    case "en":
      return `You can retry in ${diffMinutes} minutes.`;
    case "zh":
      return `您可以在 ${diffMinutes} 分钟后再试。`;
    case "fr":
      return `Vous pourrez réessayer dans ${diffMinutes} minutes.`;
    case "ja":
      return `${diffMinutes}分後に再試行できます。`;
    default:
      return `You can retry in ${diffMinutes} minutes.`;
  }
};

export const translateFeedbackEmpty = (language: string) => {
  switch (language) {
    case "vi":
      return "Nội dung phản hồi không thể trống.";
    case "en":
      return "Feedback content cannot be empty.";
    case "zh":
      return "反馈内容不能为空。";
    case "fr":
      return "Le contenu du retour ne peut pas être vide.";
    case "ja":
      return "フィードバック内容を空にすることはできません。";
    default:
      return "Feedback content cannot be empty.";
  }
};

export const translateInputTooLong = (language: string, maxLength: number) => {
  switch (language) {
    case "vi":
      return `Bạn đã nhập quá ${maxLength} ký tự.`;
    case "en":
      return `You have entered more than ${maxLength} characters.`;
    case "zh":
      return `您输入的字符数已超过 ${maxLength} 个。`;
    case "fr":
      return `Vous avez entré plus de ${maxLength} caractères.`;
    case "ja":
      return `${maxLength}文字を超えて入力しました。`;
    default:
      return `You have entered more than ${maxLength} characters.`;
  }
};

export const translateProcessingResponse = (language: string) => {
  switch (language) {
    case "vi":
      return "Đang phản hồi..";
    case "en":
      return "Processing response..";
    case "zh":
      return "正在处理反馈..";
    case "fr":
      return "Réponse en cours..";
    case "ja":
      return "返信処理中..";
    default:
      return "Processing response..";
  }
};

export const translateSuccessResponse = (language: string) => {
  switch (language) {
    case "vi":
      return "Phản hồi thành công.";
    case "en":
      return "Feedback successful.";
    case "zh":
      return "反馈成功。";
    case "fr":
      return "Retour réussi.";
    case "ja":
      return "フィードバックが成功しました。";
    default:
      return "Feedback successful.";
  }
};

export const translateFeedbackFailure = (language: string) => {
  switch (language) {
    case "vi":
      return "Phản hồi không thành công.";
    case "en":
      return "Feedback failed.";
    case "zh":
      return "反馈失败。";
    case "fr":
      return "Échec du retour.";
    case "ja":
      return "フィードバックに失敗しました。";
    default:
      return "Feedback failed.";
  }
};

export const translateDeleting = (language: string) => {
  switch (language) {
    case "vi":
      return "Đang xóa...";
    case "en":
      return "Deleting...";
    case "zh":
      return "正在删除...";
    case "fr":
      return "Suppression en cours...";
    case "ja":
      return "削除中...";
    default:
      return "Deleting...";
  }
};

export const translateDeleteUnsuccessful = (language: string) => {
  switch (language) {
    case "vi":
      return "Xóa không thành công.";
    case "en":
      return "Delete was unsuccessful.";
    case "zh":
      return "删除不成功。";
    case "fr":
      return "La suppression a échoué.";
    case "ja":
      return "削除に失敗しました。";
    default:
      return "Delete was unsuccessful.";
  }
};

export const translateEditing = (language: string) => {
  switch (language) {
    case "vi":
      return "Đang chỉnh sửa...";
    case "en":
      return "Editing...";
    case "zh":
      return "正在编辑...";
    case "fr":
      return "En cours de modification...";
    case "ja":
      return "編集中...";
    default:
      return "Editing...";
  }
};

export const translateEditSuccess = (language: string) => {
  switch (language) {
    case "vi":
      return "Chỉnh sửa thành công.";
    case "en":
      return "Edit successful.";
    case "zh":
      return "编辑成功。";
    case "fr":
      return "Modification réussie.";
    case "ja":
      return "編集が成功しました。";
    default:
      return "Edit successful.";
  }
};

export const translateEditFailure = (language: string) => {
  switch (language) {
    case "vi":
      return "Chỉnh sửa không thành công.";
    case "en":
      return "Edit failed.";
    case "zh":
      return "编辑失败。";
    case "fr":
      return "Échec de la modification.";
    case "ja":
      return "編集に失敗しました。";
    default:
      return "Edit failed.";
  }
};

export const translateUpdateError = (language: string) => {
  switch (language) {
    case "vi":
      return "Lỗi khi cập nhật phản hồi.";
    case "en":
      return "Error updating response.";
    case "zh":
      return "更新反馈时出错。";
    case "fr":
      return "Erreur de mise à jour de la réponse.";
    case "ja":
      return "応答の更新中にエラーが発生しました。";
    default:
      return "Error updating response.";
  }
};

export const translatePleaseChooseStar = (language: string) => {
  switch (language) {
    case "vi":
      return "Hãy lựa chọn sao.";
    case "en":
      return "Please choose an option.";
    case "zh":
      return "请选择一个选项。";
    case "fr":
      return "Veuillez choisir une option.";
    case "ja":
      return "オプションを選んでください。";
    default:
      return "Please choose an option.";
  }
};

export const translateEnterFeedback = (language: string) => {
  switch (language) {
    case "vi":
      return "Hãy nhập nội dung đánh giá.";
    case "en":
      return "Please enter your feedback.";
    case "zh":
      return "请输入您的反馈内容。";
    case "fr":
      return "Veuillez entrer votre commentaire.";
    case "ja":
      return "フィードバック内容を入力してください。";
    default:
      return "Please enter your feedback.";
  }
};

export const translateEvaluating = (language: string) => {
  switch (language) {
    case "vi":
      return "Đang đánh giá...";
    case "en":
      return "Evaluating...";
    case "zh":
      return "正在评估...";
    case "fr":
      return "En évaluation...";
    case "ja":
      return "評価中...";
    default:
      return "Evaluating...";
  }
};

export const translateEvaluationSuccess = (language: string) => {
  switch (language) {
    case "vi":
      return "Đánh giá thành công!";
    case "en":
      return "Evaluation successful!";
    case "zh":
      return "评估成功!";
    case "fr":
      return "Évaluation réussie!";
    case "ja":
      return "評価が成功しました!";
    default:
      return "Evaluation successful!";
  }
};

export const translateEvaluationFailure = (language: string) => {
  switch (language) {
    case "vi":
      return "Đánh giá không thành công.";
    case "en":
      return "Evaluation failed.";
    case "zh":
      return "评估失败。";
    case "fr":
      return "Échec de l'évaluation.";
    case "ja":
      return "評価に失敗しました。";
    default:
      return "Evaluation failed.";
  }
};

export const translateOneYearAgo = (language: string) => {
  switch (language) {
    case "vi":
      return "1 năm trước";
    case "en":
      return "1 year ago";
    case "zh":
      return "1年前";
    case "fr":
      return "Il y a 1 an";
    case "ja":
      return "1年前";
    default:
      return "1 year ago";
  }
};

export const translateYearAgo = (language: string) => {
  switch (language) {
    case "vi":
      return "năm trước";
    case "en":
      return "year ago";
    case "zh":
      return "年前";
    case "fr":
      return "Il y a un an";
    case "ja":
      return "年前";
    default:
      return "year ago";
  }
};

export const translateOneMonthAgo = (language: string) => {
  switch (language) {
    case "vi":
      return "1 tháng trước";
    case "en":
      return "1 month ago";
    case "zh":
      return "1个月前";
    case "fr":
      return "Il y a 1 mois";
    case "ja":
      return "1ヶ月前";
    default:
      return "1 month ago";
  }
};

export const translateMonthAgo = (language: string) => {
  switch (language) {
    case "vi":
      return "tháng trước";
    case "en":
      return "month ago";
    case "zh":
      return "个月前";
    case "fr":
      return "Il y a un mois";
    case "ja":
      return "1ヶ月前";
    default:
      return "month ago";
  }
};

export const translateOneDayAgo = (language: string) => {
  switch (language) {
    case "vi":
      return "1 ngày trước";
    case "en":
      return "1 day ago";
    case "zh":
      return "1天前";
    case "fr":
      return "Il y a 1 jour";
    case "ja":
      return "1日前";
    default:
      return "1 day ago";
  }
};

export const translateDayAgo = (language: string) => {
  switch (language) {
    case "vi":
      return "ngày trước";
    case "en":
      return "day ago";
    case "zh":
      return "天前";
    case "fr":
      return "Il y a un jour";
    case "ja":
      return "1日前";
    default:
      return "day ago";
  }
};

export const translateOneHourAgo = (language: string) => {
  switch (language) {
    case "vi":
      return "1 giờ trước";
    case "en":
      return "1 hour ago";
    case "zh":
      return "1小时前";
    case "fr":
      return "Il y a 1 heure";
    case "ja":
      return "1時間前";
    default:
      return "1 hour ago";
  }
};

export const translateHourAgo = (language: string) => {
  switch (language) {
    case "vi":
      return "giờ trước";
    case "en":
      return "hour ago";
    case "zh":
      return "小时前";
    case "fr":
      return "Il y a une heure";
    case "ja":
      return "1時間前";
    default:
      return "hour ago";
  }
};

export const translateMinutesAgo = (language: string) => {
  switch (language) {
    case "vi":
      return "phút trước";
    case "en":
      return "minutes ago";
    case "zh":
      return "分钟前";
    case "fr":
      return "Il y a quelques minutes";
    case "ja":
      return "分前";
    default:
      return "minutes ago";
  }
};

export const translateJustNow = (language: string) => {
  switch (language) {
    case "vi":
      return "Vừa xong";
    case "en":
      return "Just now";
    case "zh":
      return "刚刚";
    case "fr":
      return "Tout de suite";
    case "ja":
      return "たった今";
    default:
      return "Just now";
  }
};

export const translateConfirmDeleteComment = (
  language: string,
  commentNameToDelete: string | undefined
) => {
  switch (language) {
    case "vi":
      return `Bạn có chắc chắn xóa đánh giá ${commentNameToDelete}.`;
    case "en":
      return `Are you sure you want to delete the review ${commentNameToDelete}?`;
    case "zh":
      return `您确定要删除评论 ${commentNameToDelete} 吗？`;
    case "fr":
      return `Êtes-vous sûr de vouloir supprimer l'avis ${commentNameToDelete} ?`;
    case "ja":
      return `${commentNameToDelete} のレビューを削除してもよろしいですか？`;
    default:
      return `Are you sure you want to delete the review ${commentNameToDelete}?`;
  }
};

export const translateConfirmDeleteFeedback = (
  language: string,
  commentNameToDelete: string | undefined
) => {
  switch (language) {
    case "vi":
      return `Bạn có chắc chắn xóa phản hồi ${commentNameToDelete}.`;
    case "en":
      return `Are you sure you want to delete the feedback ${commentNameToDelete}?`;
    case "zh":
      return `您确定要删除反馈 ${commentNameToDelete} 吗？`;
    case "fr":
      return `Êtes-vous sûr de vouloir supprimer le commentaire ${commentNameToDelete} ?`;
    case "ja":
      return `${commentNameToDelete} のフィードバックを削除してもよろしいですか？`;
    default:
      return `Are you sure you want to delete the feedback ${commentNameToDelete}?`;
  }
};

export const translateReviewAndComment = (language: string) => {
  switch (language) {
    case "vi":
      return "Đánh giá và Bình luận";
    case "en":
      return "Review and Comment";
    case "zh":
      return "评价与评论";
    case "fr":
      return "Évaluation et Commentaire";
    case "ja":
      return "評価とコメント";
    default:
      return "Review and Comment";
  }
};

export const translateReviewAndCommentLowercase = (language: string) => {
  switch (language) {
    case "vi":
      return "đánh giá và nhận xét";
    case "en":
      return "review and feedback";
    case "zh":
      return "评价与反馈";
    case "fr":
      return "évaluation et commentaires";
    case "ja":
      return "評価とフィードバック";
    default:
      return "review and feedback";
  }
};

export const translateReviewLowercase = (language: string) => {
  switch (language) {
    case "vi":
      return "đánh giá";
    case "en":
      return "review";
    case "zh":
      return "评价";
    case "fr":
      return "évaluation";
    case "ja":
      return "評価";
    default:
      return "review";
  }
};

export const translateRating = (language: string) => {
  switch (language) {
    case "vi":
      return "Đánh giá";
    case "en":
      return "Rating";
    case "zh":
      return "评分";
    case "fr":
      return "Évaluation";
    case "ja":
      return "評価";
    default:
      return "Rating";
  }
};

export const translateEnterReviewContent = (language: string) => {
  switch (language) {
    case "vi":
      return "Nhập nội dung đánh giá...........";
    case "en":
      return "Enter review content...........";
    case "zh":
      return "请输入评论内容...........";
    case "fr":
      return "Entrez le contenu de l'évaluation...........";
    case "ja":
      return "レビュー内容を入力してください...........";
    default:
      return "Enter review content...........";
  }
};

export const translateEnterFeedbackContent = (language: string) => {
  switch (language) {
    case "vi":
      return "Nhập nội dung phản hồi...........";
    case "en":
      return "Enter feedback content...........";
    case "zh":
      return "请输入反馈内容...........";
    case "fr":
      return "Entrez le contenu du feedback...........";
    case "ja":
      return "フィードバック内容を入力してください...........";
    default:
      return "Enter feedback content...........";
  }
};

export const translateEditedTimes = (
  language: string,
  totalChange: number | undefined
) => {
  switch (language) {
    case "vi":
      return `Đã chỉnh sửa ${totalChange} lần`;
    case "en":
      return `Edited ${totalChange} times`;
    case "zh":
      return `已编辑 ${totalChange} 次`;
    case "fr":
      return `Modifié ${totalChange} fois`;
    case "ja":
      return `${totalChange} 回編集済み`;
    default:
      return `Edited ${totalChange} times`;
  }
};

export const translateComment = (language: string) => {
  switch (language) {
    case "vi":
      return "Nhận xét";
    case "en":
      return "Comment";
    case "zh":
      return "评论";
    case "fr":
      return "Commentaire";
    case "ja":
      return "コメント";
    default:
      return "Comment";
  }
};

export const translateEdit = (language: string) => {
  switch (language) {
    case "vi":
      return "Chỉnh sửa";
    case "en":
      return "Edit";
    case "zh":
      return "编辑";
    case "fr":
      return "Modifier";
    case "ja":
      return "編集";
    default:
      return "Edit";
  }
};

export const translateResponse = (language: string) => {
  switch (language) {
    case "vi":
      return "Phản hồi";
    case "en":
      return "Response";
    case "zh":
      return "回应";
    case "fr":
      return "Réponse";
    case "ja":
      return "応答";
    default:
      return "Response";
  }
};

export const translateResponseLowercase = (language: string) => {
  switch (language) {
    case "vi":
      return "phản hồi";
    case "en":
      return "response";
    case "zh":
      return "回应";
    case "fr":
      return "réponse";
    case "ja":
      return "応答";
    default:
      return "response";
  }
};

export const translateHideResponseLowercase = (language: string) => {
  switch (language) {
    case "vi":
      return "Ẩn phản hồi";
    case "en":
      return "Hide response";
    case "zh":
      return "隐藏反馈";
    case "fr":
      return "Masquer la réponse";
    case "ja":
      return "応答を非表示";
    default:
      return "Hide response";
  }
};

export const translateViewResponseLowercase = (language: string) => {
  switch (language) {
    case "vi":
      return "Xem phản hồi";
    case "en":
      return "View response";
    case "zh":
      return "查看反馈";
    case "fr":
      return "Voir la réponse";
    case "ja":
      return "応答を見る";
    default:
      return "View response";
  }
};

export const translateSeeAll = (language: string) => {
  switch (language) {
    case "vi":
      return "Xem tất cả";
    case "en":
      return "See all";
    case "zh":
      return "查看全部";
    case "fr":
      return "Voir tout";
    case "ja":
      return "すべてを見る";
    default:
      return "See all";
  }
};

export const translateStarsLowercase = (language: string) => {
  switch (language) {
    case "vi":
      return "sao";
    case "en":
      return "stars";
    case "zh":
      return "星星";
    case "fr":
      return "étoiles";
    case "ja":
      return "星";
    default:
      return "stars";
  }
};

export const translateNotRatedYet = (language: string) => {
  switch (language) {
    case "vi":
      return "Chưa đánh giá";
    case "en":
      return "Not rated yet";
    case "zh":
      return "尚未评分";
    case "fr":
      return "Pas encore évalué";
    case "ja":
      return "まだ評価されていません";
    default:
      return "Not rated yet";
  }
};

export const translateThankYouForFeedback = (
  language: string,
  email: string
) => {
  switch (language) {
    case "vi":
      return `Cảm ơn ${email} đã gửi feedback cho cửa hàng!`;
    case "en":
      return `Thank you ${email} for sending feedback to the store!`;
    case "zh":
      return `感谢 ${email} 向商店提供反馈！`;
    case "fr":
      return `Merci ${email} d'avoir envoyé des commentaires au magasin !`;
    case "ja":
      return `${email} さん、店舗へのフィードバックをありがとうございます！`;
    default:
      return `Thank you ${email} for sending feedback to the store!`;
  }
};

export const translateUpdatingFeedback = (language: string) => {
  switch (language) {
    case "vi":
      return "Đang cập nhật phản hồi...";
    case "en":
      return "Updating feedback...";
    case "zh":
      return "正在更新反馈...";
    case "fr":
      return "Mise à jour des commentaires...";
    case "ja":
      return "フィードバックを更新しています...";
    default:
      return "Updating feedback...";
  }
};

export const translateInformation = (language: string) => {
  switch (language) {
    case "vi":
      return "Thông tin";
    case "en":
      return "Information";
    case "zh":
      return "信息";
    case "fr":
      return "Informations";
    case "ja":
      return "情報";
    default:
      return "Information";
  }
};

export const translateHelloVLXDXuanTruongAI = (language: string) => {
  switch (language) {
    case "vi":
      return "Xin chào VLXD Xuân Trường AI";
    case "en":
      return "Hello VLXD Xuan Truong AI";
    case "zh":
      return "你好 VLXD Xuân Trường AI";
    case "fr":
      return "Bonjour VLXD Xuân Trường AI";
    case "ja":
      return "こんにちは VLXD Xuân Trường AI";
    default:
      return "Hello VLXD Xuan Truong AI";
  }
};

export const translateMyVirtualAssistantWillHelpYou = (language: string) => {
  switch (language) {
    case "vi":
      return "Trợ lý ảo của tôi sẽ giúp bạn!";
    case "en":
      return "My virtual assistant will help you!";
    case "zh":
      return "我的虚拟助手会帮助你！";
    case "fr":
      return "Mon assistant virtuel vous aidera !";
    case "ja":
      return "私のバーチャルアシスタントがお手伝いします！";
    default:
      return "My virtual assistant will help you!";
  }
};

export const translateNewChat = (language: string) => {
  switch (language) {
    case "vi":
      return "Đoạn chat mới";
    case "en":
      return "New chat";
    case "zh":
      return "新的聊天";
    case "fr":
      return "Nouvelle discussion";
    case "ja":
      return "新しいチャット";
    default:
      return "New chat";
  }
};

export const translateFeedback = (language: string) => {
  switch (language) {
    case "vi":
      return "Phản hồi";
    case "en":
      return "Feedback";
    case "zh":
      return "反馈";
    case "fr":
      return "Commentaires";
    case "ja":
      return "フィードバック";
    default:
      return "Feedback";
  }
};

export const translateFeedbackContent = (language: string) => {
  switch (language) {
    case "vi":
      return "Nội dung Feedback.";
    case "en":
      return "Feedback content.";
    case "zh":
      return "反馈内容。";
    case "fr":
      return "Contenu des commentaires.";
    case "ja":
      return "フィードバック内容。";
    default:
      return "Feedback content.";
  }
};

export const translateRequired = (language: string) => {
  switch (language) {
    case "vi":
      return "Bắt buộc";
    case "en":
      return "Required";
    case "zh":
      return "必填";
    case "fr":
      return "Obligatoire";
    case "ja":
      return "必須";
    default:
      return "Required";
  }
};

export const translateSelectExperienceFeedback = (language: string) => {
  switch (language) {
    case "vi":
      return "Vui lòng chọn cảm nhận của bạn về trải nghiệm:";
    case "en":
      return "Please select how you feel about the experience:";
    case "zh":
      return "请选择您对体验的感受：";
    case "fr":
      return "Veuillez sélectionner votre ressenti sur l'expérience :";
    case "ja":
      return "この体験についての感想を選んでください：";
    default:
      return "Please select how you feel about the experience:";
  }
};

export const translateSelectFeedbackCategory = (language: string) => {
  switch (language) {
    case "vi":
      return "Vui lòng chọn danh mục phản hồi của bạn bên dưới:";
    case "en":
      return "Please select your feedback category below:";
    case "zh":
      return "请选择下面的反馈类别：";
    case "fr":
      return "Veuillez sélectionner votre catégorie de retour ci-dessous :";
    case "ja":
      return "以下からフィードバックカテゴリを選択してください：";
    default:
      return "Please select your feedback category below:";
  }
};

export const translateLeaveFeedbackBelow = (language: string) => {
  switch (language) {
    case "vi":
      return "Vui lòng để lại phản hồi của bạn bên dưới:";
    case "en":
      return "Please leave your feedback below:";
    case "zh":
      return "请在下面留下您的反馈：";
    case "fr":
      return "Veuillez laisser vos commentaires ci-dessous :";
    case "ja":
      return "以下にフィードバックを残してください：";
    default:
      return "Please leave your feedback below:";
  }
};

export const translatePleaseFillYourAnswer = (language: string) => {
  switch (language) {
    case "vi":
      return "Vui lòng điền câu trả lời của bạn...";
    case "en":
      return "Please fill on your answer...";
    case "zh":
      return "请填写您的答案...";
    case "fr":
      return "Veuillez remplir votre réponse...";
    case "ja":
      return "回答を記入してください...";
    default:
      return "Please fill on your answer...";
  }
};

export const translateSubmit = (language: string) => {
  switch (language) {
    case "vi":
      return "Gửi";
    case "en":
      return "Submit";
    case "zh":
      return "提交";
    case "fr":
      return "Soumettre";
    case "ja":
      return "提出する";
    default:
      return "Submit";
  }
};

export const translateLoading = (language: string) => {
  switch (language) {
    case "vi":
      return "Đang tải...";
    case "en":
      return "Loading...";
    case "zh":
      return "加载中...";
    case "fr":
      return "Chargement...";
    case "ja":
      return "読み込み中...";
    default:
      return "Loading...";
  }
};

export const translateMinCharacters = (language: string, chart: number) => {
  switch (language) {
    case "vi":
      return `Nhập ít nhất ${chart} ký tự.`;
    case "en":
      return `Enter at least ${chart} characters.`;
    case "zh":
      return `请输入至少 ${chart} 个字符。`;
    case "fr":
      return `Entrez au moins ${chart} caractères.`;
    case "ja":
      return `最低 ${chart} 文字を入力してください。`;
    default:
      return `Enter at least ${chart} characters.`;
  }
};

export const translateMaxCharacters = (language: string, maxChars: number) => {
  switch (language) {
    case "vi":
      return `Không được vượt quá ${maxChars} ký tự.`;
    case "en":
      return `Must not exceed ${maxChars} characters.`;
    case "zh":
      return `不得超过 ${maxChars} 个字符。`;
    case "fr":
      return `Ne doit pas dépasser ${maxChars} caractères.`;
    case "ja":
      return `${maxChars} 文字を超えてはいけません。`;
    default:
      return `Must not exceed ${maxChars} characters.`;
  }
};

export const translateLanguage = (language: string) => {
  switch (language) {
    case "vi":
      return "Ngôn ngữ";
    case "en":
      return "Language";
    case "zh":
      return "语言";
    case "fr":
      return "Langue";
    case "ja":
      return "言語";
    default:
      return "Language";
  }
};

export const translateSocial = (language: string) => {
  switch (language) {
    case "vi":
      return "Mạng xã hội";
    case "en":
      return "Social";
    case "zh":
      return "社交";
    case "fr":
      return "Social";
    case "ja":
      return "ソーシャル";
    default:
      return "Social";
  }
};

export const translateAIAssistant = (language: string) => {
  switch (language) {
    case "vi":
      return "Trợ lý AI";
    case "en":
      return "AI Assistant";
    case "zh":
      return "人工智能助手";
    case "fr":
      return "Assistant IA";
    case "ja":
      return "AIアシスタント";
    default:
      return "AI Assistant";
  }
};

export const translateAskQuestion = (language: string) => {
  switch (language) {
    case "vi":
      return "Vui lòng đặt câu hỏi cho tôi!";
    case "en":
      return "Please ask me a question!";
    case "zh":
      return "请向我提问！";
    case "fr":
      return "Veuillez me poser une question !";
    case "ja":
      return "私に質問してください！";
    default:
      return "Please ask me a question!";
  }
};

export const translateGoodMorningAskQuestion = (language: string) => {
  switch (language) {
    case "vi":
      return "Chào mừng buổi sáng. Hãy đặt câu hỏi cho tôi!";
    case "en":
      return "Good morning. Please ask me a question!";
    case "zh":
      return "早上好。请向我提问！";
    case "fr":
      return "Bonjour. Veuillez me poser une question !";
    case "ja":
      return "おはようございます。私に質問してください！";
    default:
      return "Good morning. Please ask me a question!";
  }
};

export const translateGoodAfternoonAskQuestion = (language: string) => {
  switch (language) {
    case "vi":
      return "Chào mừng buổi trưa. Hãy đặt câu hỏi cho tôi!";
    case "en":
      return "Good afternoon. Please ask me a question!";
    case "zh":
      return "下午好。请向我提问！";
    case "fr":
      return "Bon après-midi. Veuillez me poser une question !";
    case "ja":
      return "こんにちは。私に質問してください！";
    default:
      return "Good afternoon. Please ask me a question!";
  }
};

export const translateGoodNightAskQuestion = (language: string) => {
  switch (language) {
    case "vi":
      return "Chào mừng buổi tối. Hãy đặt câu hỏi cho tôi!";
    case "en":
      return "Good night. Please ask me a question!";
    case "zh":
      return "晚安。请向我提问！";
    case "fr":
      return "Bonne nuit. Veuillez me poser une question !";
    case "ja":
      return "おやすみなさい。私に質問してください！";
    default:
      return "Good night. Please ask me a question!";
  }
};

export const translateGoodEveningAskQuestion = (language: string) => {
  switch (language) {
    case "vi":
      return "Chào mừng buổi chiều. Hãy đặt câu hỏi cho tôi!";
    case "en":
      return "Good evening. Please ask me a question!";
    case "zh":
      return "晚上好。请向我提问！";
    case "fr":
      return "Bonsoir. Veuillez me poser une question !";
    case "ja":
      return "こんばんは。私に質問してください！";
    default:
      return "Good evening. Please ask me a question!";
  }
};

export const translateToday = (language: string) => {
  switch (language) {
    case "vi":
      return "Hôm nay";
    case "en":
      return "Today";
    case "zh":
      return "今天";
    case "fr":
      return "Aujourd'hui";
    case "ja":
      return "今日";
    default:
      return "Today";
  }
};

export const translateEnterYourContent = (language: string) => {
  switch (language) {
    case "vi":
      return "Nhập nội dung của bạn...";
    case "en":
      return "Enter your content...";
    case "zh":
      return "请输入您的内容...";
    case "fr":
      return "Entrez votre contenu...";
    case "ja":
      return "内容を入力してください...";
    default:
      return "Enter your content...";
  }
};

export const translateCopied = (language: string) => {
  switch (language) {
    case "vi":
      return "Đã sao chép";
    case "en":
      return "Copied";
    case "zh":
      return "已复制";
    case "fr":
      return "Copié";
    case "ja":
      return "コピーしました";
    default:
      return "Copied";
  }
};

export const translateCopyCode = (language: string) => {
  switch (language) {
    case "vi":
      return "Sao chép mã";
    case "en":
      return "Copy code";
    case "zh":
      return "复制代码";
    case "fr":
      return "Copier le code";
    case "ja":
      return "コードをコピー";
    default:
      return "Copy code";
  }
};

export const translateGood = (language: string) => {
  switch (language) {
    case "vi":
      return "Tốt";
    case "en":
      return "Good";
    case "zh":
      return "好";
    case "fr":
      return "Bon";
    case "ja":
      return "良い";
    default:
      return "Good";
  }
};

export const translateTemporary = (language: string) => {
  switch (language) {
    case "vi":
      return "Tạm";
    case "en":
      return "Temporary";
    case "zh":
      return "临时";
    case "fr":
      return "Temporaire";
    case "ja":
      return "一時的";
    default:
      return "Temporary";
  }
};

export const translateBadNotIcon = (language: string) => {
  switch (language) {
    case "vi":
      return "Tệ";
    case "en":
      return "Bad";
    case "zh":
      return "差";
    case "fr":
      return "Mauvais";
    case "ja":
      return "悪い";
    default:
      return "Bad";
  }
};

export const translatePoor = (language: string) => {
  switch (language) {
    case "vi":
      return "Kém";
    case "en":
      return "Poor";
    case "zh":
      return "差";
    case "fr":
      return "Mauvais";
    case "ja":
      return "悪い";
    default:
      return "Poor";
  }
};

export const translateTooBad = (language: string) => {
  switch (language) {
    case "vi":
      return "Quá tệ";
    case "en":
      return "Too bad";
    case "zh":
      return "太差了";
    case "fr":
      return "Tant pis";
    case "ja":
      return "あまりにも悪い";
    default:
      return "Too bad";
  }
};

export const translateSelectEmotion = (language: string) => {
  switch (language) {
    case "vi":
      return "Vui lòng chọn một cảm xúc";
    case "en":
      return "Please select an emotion";
    case "zh":
      return "请选择一个情感";
    case "fr":
      return "Sélectionnez une émotion";
    case "ja":
      return "感情を選択してください";
    default:
      return "Please select an emotion";
  }
};

export const translateUnprofessionalService = (language: string) => {
  switch (language) {
    case "vi":
      return "Dịch vụ không chuyên nghiệp";
    case "en":
      return "Unprofessional service";
    case "zh":
      return "不专业的服务";
    case "fr":
      return "Service non professionnel";
    case "ja":
      return "非専門的なサービス";
    default:
      return "Unprofessional service";
  }
};

export const translateDelayedResponse = (language: string) => {
  switch (language) {
    case "vi":
      return "Phản hồi chậm từ nhân viên";
    case "en":
      return "Delayed response from staff";
    case "zh":
      return "员工回复延迟";
    case "fr":
      return "Réponse retardée du personnel";
    case "ja":
      return "スタッフからの返信が遅れています";
    default:
      return "Delayed response from staff";
  }
};

export const translateComplicatedPayment = (language: string) => {
  switch (language) {
    case "vi":
      return "Thanh toán phức tạp";
    case "en":
      return "Complicated payment";
    case "zh":
      return "复杂的支付";
    case "fr":
      return "Paiement compliqué";
    case "ja":
      return "複雑な支払い";
    default:
      return "Complicated payment";
  }
};

export const translateNoResponseToCall = (language: string) => {
  switch (language) {
    case "vi":
      return "Gọi điện không trả lời";
    case "en":
      return "No response to the call";
    case "zh":
      return "没有对电话的回应";
    case "fr":
      return "Aucune réponse à l'appel";
    case "ja":
      return "電話に応答なし";
    default:
      return "No response to the call";
  }
};

export const translateWebsitePerformanceIssues = (language: string) => {
  switch (language) {
    case "vi":
      return "Vấn đề về hiệu suất trang web";
    case "en":
      return "Website performance issues";
    case "zh":
      return "网站性能问题";
    case "fr":
      return "Problèmes de performance du site"; // Rút gọn
    case "ja":
      return "ウェブサイトのパフォーマンスの問題";
    default:
      return "Website performance issues";
  }
};

export const translateSelectCategoryFeedback = (language: string) => {
  switch (language) {
    case "vi":
      return "Vui lòng chọn một danh mục";
    case "en":
      return "Please select a category";
    case "zh":
      return "请选择一个类别";
    case "fr":
      return "Sélectionnez une catégorie"; // Rút gọn
    case "ja":
      return "カテゴリを選択してください";
    default:
      return "Please select a category";
  }
};

export const translateOtherMessage = (language: string) => {
  switch (language) {
    case "vi":
      return "Khác";
    case "en":
      return "Other";
    case "zh":
      return "其他";
    case "fr":
      return "Autre";
    case "ja":
      return "その他";
    default:
      return "Other";
  }
};

export const translateFilter = (language: string) => {
  switch (language) {
    case "vi":
      return "Lọc";
    case "en":
      return "Filter";
    case "zh":
      return "筛选";
    case "fr":
      return "Filtrer";
    case "ja":
      return "フィルター";
    default:
      return "Filter";
  }
};

export const translateSizes = (language: string) => {
  switch (language) {
    case "vi":
      return "Kích thước";
    case "en":
      return "Sizes";
    case "zh":
      return "尺寸";
    case "fr":
      return "Tailles";
    case "ja":
      return "サイズ";
    default:
      return "Sizes";
  }
};

export const translateColors = (language: string) => {
  switch (language) {
    case "vi":
      return "Màu sắc";
    case "en":
      return "Colors";
    case "zh":
      return "颜色";
    case "fr":
      return "Couleurs";
    case "ja":
      return "色";
    default:
      return "Colors";
  }
};

export const translateSupportExchange = (language: string) => {
  switch (language) {
    case "vi":
      return "Hỗ trợ đổi hàng";
    case "en":
      return "Exchange support";
    case "zh":
      return "支持换货";
    case "fr":
      return "Support échange";
    case "ja":
      return "商品の交換サポート";
    default:
      return "Exchange support";
  }
};

export const translateInfoAndPolicy = (language: string) => {
  switch (language) {
    case "vi":
      return "Thông tin và chính sách";
    case "en":
      return "Information and policies";
    case "zh":
      return "信息与政策";
    case "fr":
      return "Informations et politiques";
    case "ja":
      return "情報と方針";
    default:
      return "Information and policies";
  }
};

export const translateServicesAndInfo = (language: string) => {
  switch (language) {
    case "vi":
      return "Dịch vụ và thông tin";
    case "en":
      return "Services and information";
    case "zh":
      return "服务与信息";
    case "fr":
      return "Services et informations";
    case "ja":
      return "サービスと情報";
    default:
      return "Services and information";
  }
};

export const translateOtherContact = (language: string) => {
  switch (language) {
    case "vi":
      return "Liên hệ khác";
    case "en":
      return "Other contact";
    case "zh":
      return "其他联系方式";
    case "fr":
      return "Autre contact";
    case "ja":
      return "その他の連絡先";
    default:
      return "Other contact";
  }
};

export const translateCallToOrder = (language: string) => {
  switch (language) {
    case "vi":
      return "Gọi mua hàng";
    case "en":
      return "Call to order";
    case "zh":
      return "拨打电话购买";
    case "fr":
      return "Commander";
    case "ja":
      return "注文のために電話する";
    default:
      return "Call to order";
  }
};

export const translateCallToComplaints = (language: string) => {
  switch (language) {
    case "vi":
      return "Gọi khiếu nại";
    case "en":
      return "Complaints";
    case "zh":
      return "拨打电话投诉";
    case "fr":
      return "Plainte";
    case "ja":
      return "苦情";
    default:
      return "Complaints";
  }
};

export const translateCallToWarranty = (language: string) => {
  switch (language) {
    case "vi":
      return "Gọi bảo hành";
    case "en":
      return "Call for warranty";
    case "zh":
      return "拨打电话保修";
    case "fr":
      return "Garantie";
    case "ja":
      return "保証";
    default:
      return "Call for warranty";
  }
};

export const translatePurchaseAndPayOnline = (language: string) => {
  switch (language) {
    case "vi":
      return "Mua hàng và thanh toán online";
    case "en":
      return "Purchase and pay online";
    case "zh":
      return "在线购物和支付";
    case "fr":
      return "Achat et paiement en ligne";
    case "ja":
      return "オンラインで購入して支払う";
    default:
      return "Purchase and pay online";
  }
};

export const translatePreOrderAndPayOnDelivery = (language: string) => {
  switch (language) {
    case "vi":
      return "Đặt hàng trước trả tiền khi nhận";
    case "en":
      return "Pre-order and pay on delivery";
    case "zh":
      return "预订并货到付款";
    case "fr":
      return "Prépaiement à la livraison"; // Rút gọn
    case "ja":
      return "事前注文と配達時の支払い";
    default:
      return "Pre-order and pay on delivery";
  }
};

export const translateOrderingPolicyAndLegalTerms = (language: string) => {
  switch (language) {
    case "vi":
      return "Chính sách và pháp lý đặt hàng";
    case "en":
      return "Ordering policy and legal terms";
    case "zh":
      return "订单政策与法律条款";
    case "fr":
      return "Politique et conditions"; // Rút gọn
    case "ja":
      return "注文ポリシーと法的条項";
    default:
      return "Ordering policy and legal terms";
  }
};

export const translateDiscountCode = (language: string) => {
  switch (language) {
    case "vi":
      return "Mã ưa đãi";
    case "en":
      return "Discount code";
    case "zh":
      return "优惠码";
    case "fr":
      return "Code de réduction";
    case "ja":
      return "割引コード";
    default:
      return "Discount code";
  }
};

export const translateCorporateCustomer = (language: string) => {
  switch (language) {
    case "vi":
      return "Khách hàng doanh nghiệp";
    case "en":
      return "Corporate customer";
    case "zh":
      return "企业客户";
    case "fr":
      return "Client entreprise";
    case "ja":
      return "企業顧客";
    default:
      return "Corporate customer";
  }
};

export const translateWarrantyPolicy = (language: string) => {
  switch (language) {
    case "vi":
      return "Chính sách Bảo hành";
    case "en":
      return "Warranty policy";
    case "zh":
      return "保修政策";
    case "fr":
      return "Politique de garantie";
    case "ja":
      return "保証ポリシー";
    default:
      return "Warranty policy";
  }
};

export const translateWebsiteBelongsToXuanTruong = (language: string) => {
  switch (language) {
    case "vi":
      return "Website thuộc về Xuân Trường";
    case "en":
      return "Website belongs to Xuân Trường";
    case "zh":
      return "该网站属于Xuân Trường";
    case "fr":
      return "Le site Web appartient à Xuân Trường";
    case "ja":
      return "Xuân Trườngのサイト";
    default:
      return "Website belongs to Xuân Trường";
  }
};

export const translateContact = (language: string) => {
  switch (language) {
    case "vi":
      return "Liên lạc";
    case "en":
      return "Contact";
    case "zh":
      return "联系";
    case "fr":
      return "Contact";
    case "ja":
      return "連絡";
    default:
      return "Contact";
  }
};

export const translateOrZalo = (language: string) => {
  switch (language) {
    case "vi":
      return "Hoặc Zalo";
    case "en":
      return "Or Zalo";
    case "zh":
      return "或 Zalo";
    case "fr":
      return "Ou Zalo";
    case "ja":
      return "または Zalo";
    default:
      return "Or Zalo";
  }
};

export const translateStore = (language: string) => {
  switch (language) {
    case "vi":
      return "Cửa hàng";
    case "en":
      return "Store";
    case "zh":
      return "商店";
    case "fr":
      return "Magasin";
    case "ja":
      return "店舗";
    default:
      return "Store";
  }
};

export const translateBuildingMaterialsStore = (language: string) => {
  switch (language) {
    case "vi":
      return "Cửa hàng vật liệu xây dựng";
    case "en":
      return "Building materials store";
    case "zh":
      return "建筑材料商店";
    case "fr":
      return "Magasin de matériaux";
    case "ja":
      return "建材店";
    default:
      return "Building materials store";
  }
};

export const translateEstablishmentDate = (language: string) => {
  switch (language) {
    case "vi":
      return "Ngày thành lập";
    case "en":
      return "Establishment date";
    case "zh":
      return "成立日期";
    case "fr":
      return "Date de création";
    case "ja":
      return "設立日";
    default:
      return "Establishment date";
  }
};

export const translateStoreHistory = (language: string) => {
  switch (language) {
    case "vi":
      return `Trong hơn 15 năm qua, từ năm 2005, Cửa hàng Trường Đạt đã góp phần không nhỏ vào ngành xây dựng và cung ứng vật liệu xây dựng chất lượng cao. Ban đầu, khi đường phố còn thô sơ, cửa hàng không có biển hiệu rõ ràng. Nhưng với sự phát triển từng ngày, sự chú ý của cộng đồng dần dần tăng lên, từ đó, cửa hàng đã chọn tên là Trường Đạt để đánh dấu sự đồng hành và uy tín.`;
    case "en":
      return `For more than 15 years, since 2005, Trường Đạt Store has made a significant contribution to the construction industry and the supply of high-quality building materials. Initially, when the streets were still rudimentary, the store did not have a clear sign. However, with its daily development, the community’s attention gradually increased, and thus, the store chose the name Trường Đạt to mark its partnership and reputation.`;
    case "zh":
      return `在过去的15年里，自2005年以来，Trường Đạt商店为建筑行业和高质量建筑材料的供应做出了重要贡献。最初，当街道还很简陋时，商店没有明确的招牌。然而，随着日益发展的过程中，社区的关注逐渐增加，因此商店选择了“Trường Đạt”这个名字，以标志其合作伙伴关系和信誉。`;
    case "fr":
      return `Depuis plus de 15 ans, depuis 2005, le magasin Trường Đạt a joué un rôle important dans l'industrie de la construction et l'approvisionnement en matériaux de construction de haute qualité. Au départ, lorsque les rues étaient encore rudimentaires, le magasin n'avait pas de panneau clair. Cependant, avec son développement quotidien, l'attention de la communauté a progressivement augmenté, et ainsi, le magasin a choisi le nom Trường Đạt pour marquer son partenariat et sa réputation.`;
    case "ja":
      return `2005年から15年以上にわたり、Trường Đạtストアは建設業界と高品質の建材供給に大きな貢献をしてきました。最初は、道路がまだ未舗装で、店舗にははっきりした看板がありませんでした。しかし、日々の成長と共にコミュニティの関心が徐々に高まり、店舗は「Trường Đạt」という名前を選び、そのパートナーシップと評判を示しました。`;
    default:
      return `For more than 15 years, since 2005, Trường Đạt Store has made a significant contribution to the construction industry and the supply of high-quality building materials. Initially, when the streets were still rudimentary, the store did not have a clear sign. However, with its daily development, the community’s attention gradually increased, and thus, the store chose the name Trường Đạt to mark its partnership and reputation.`;
  }
};

export const translateSpecializeIn = (language: string) => {
  switch (language) {
    case "vi":
      return "Chuyên bán mặt hàng";
    case "en":
      return "Specializes in";
    case "zh":
      return "专售";
    case "fr":
      return "Spécialisé dans";
    case "ja":
      return "専門の取り扱い";
    default:
      return "Specializes in";
  }
};

export const translateSpecializeInProducts = (language: string) => {
  switch (language) {
    case "vi":
      return `Chuyên cung cấp các sản phẩm chuyên dụng trong lĩnh vực vật liệu xây dựng, bao gồm ống nước, đồ điện và nhiều mặt hàng khác. Sự đa dạng trong danh mục sản phẩm không chỉ đáp ứng nhu cầu cá nhân mà còn phục vụ cho các dự án xây dựng lớn thông qua chính sách bỏ sỉ linh hoạt.`;
    case "en":
      return `Specializes in providing specialized products in the field of construction materials, including pipes, electrical goods, and many other items. The diversity in the product range not only meets individual needs but also serves large construction projects through flexible wholesale policies.`;
    case "zh":
      return `专门提供建筑材料领域的专业产品，包括水管、电气产品和其他许多商品。产品种类的多样性不仅满足个人需求，还通过灵活的批发政策为大型建筑项目提供服务。`;
    case "fr":
      return `Spécialisé dans la fourniture de produits spécialisés dans le domaine des matériaux de construction, y compris les tuyaux, les produits électriques et de nombreux autres articles. La diversité de la gamme de produits répond non seulement aux besoins individuels mais sert également de grands projets de construction grâce à des politiques de vente en gros flexibles.`;
    case "ja":
      return `建材分野での専門製品を提供する専門店で、水道管、電気製品、その他多くの商品を取り扱っています。製品ラインアップの多様性は、個人のニーズだけでなく、柔軟な卸売政策を通じて大規模な建設プロジェクトにも対応しています。`;
    default:
      return `Specializes in providing specialized products in the field of construction materials, including pipes, electrical goods, and many other items. The diversity in the product range not only meets individual needs but also serves large construction projects through flexible wholesale policies.`;
  }
};

export const translateQualityCommitment = (language: string) => {
  switch (language) {
    case "vi":
      return "Cam Kết Chất Lượng";
    case "en":
      return "Quality Commitment";
    case "zh":
      return "质量承诺";
    case "fr":
      return "Engagement de qualité";
    case "ja":
      return "品質の約束";
    default:
      return "Quality Commitment";
  }
};

export const translateQualityCommitmentText = (language: string) => {
  switch (language) {
    case "vi":
      return `Với hơn một thập kỷ kinh nghiệm, Trường Đạt luôn đặt chất lượng lên hàng đầu. Sự chăm chỉ trong việc lựa chọn các nhà cung cấp và kiểm soát chất lượng sản phẩm đã giúp cửa hàng xây dựng được uy tín mạnh mẽ trong cộng đồng.`;
    case "en":
      return `With over a decade of experience, Trường Đạt has always prioritized quality. The diligence in selecting suppliers and controlling product quality has helped the store build a strong reputation in the community.`;
    case "zh":
      return `凭借十多年经验，Trường Đạt始终将质量放在首位。精心挑选供应商并控制产品质量的努力帮助商店在社区建立了强大的声誉。`;
    case "fr":
      return `Avec plus d'une décennie d'expérience, Trường Đạt a toujours mis la qualité au premier plan. La rigueur dans le choix des fournisseurs et le contrôle de la qualité des produits a permis à la boutique de bâtir une solide réputation au sein de la communauté.`;
    case "ja":
      return `10年以上の経験を持つTrường Đạtは、常に品質を最優先にしています。仕入れ先の選定と製品品質の管理における努力が、店舗のコミュニティでの強い評判を築く助けとなっています。`;
    default:
      return `With over a decade of experience, Trường Đạt has always prioritized quality. The diligence in selecting suppliers and controlling product quality has helped the store build a strong reputation in the community.`;
  }
};

export const translateStoreInfo = (language: string) => {
  switch (language) {
    case "vi":
      return "Thông tin cửa hàng";
    case "en":
      return "Store Information";
    case "zh":
      return "商店信息";
    case "fr":
      return "Infos magasin";
    case "ja":
      return "店舗情報";
    default:
      return "Store Information";
  }
};

export const translateFurnitureServices = (language: string) => {
  switch (language) {
    case "vi":
      return "Dịch vụ nội thất";
    case "en":
      return "Furniture Services";
    case "zh":
      return "家具服务";
    case "fr":
      return "Services de mobilier";
    case "ja":
      return "家具サービス";
    default:
      return "Furniture Services";
  }
};

export const translateProject = (language: string) => {
  switch (language) {
    case "vi":
      return "Công trình";
    case "en":
      return "Project";
    case "zh":
      return "工程";
    case "fr":
      return "Projet";
    case "ja":
      return "プロジェクト";
    default:
      return "Project";
  }
};

export const translateBestPricesForContractors = (language: string) => {
  switch (language) {
    case "vi":
      return "Luôn để các giá cực tốt cho thầu xây cả công trình và hợp tác lâu dài.";
    case "en":
      return "Always offer the best prices for contractors building entire projects and long-term collaboration.";
    case "zh":
      return "始终为承包商提供最佳价格，用于整个项目建设和长期合作。";
    case "fr":
      return "Toujours proposer les meilleurs prix pour les entrepreneurs construisant des projets entiers et une collaboration à long terme.";
    case "ja":
      return "常に建設業者に最良の価格を提供し、プロジェクト全体と長期的な協力に対応します。";
    default:
      return "Always offer the best prices for contractors building entire projects and long-term collaboration.";
  }
};

export const translateHousing = (language: string) => {
  switch (language) {
    case "vi":
      return "Nhà ở";
    case "en":
      return "Housing";
    case "zh":
      return "住宅";
    case "fr":
      return "Logement";
    case "ja":
      return "住宅";
    default:
      return "Housing";
  }
};

export const translateAlwaysProvideAccessories = (language: string) => {
  switch (language) {
    case "vi":
      return "Luôn cung cấp phụ kiện cho nhà VD: tất cả loại đèn, cửa, quạt giá tốt.";
    case "en":
      return "Always provide accessories for the house, e.g., all types of lights, doors, fans at great prices.";
    case "zh":
      return "始终提供房屋配件，例如：所有类型的灯具、门、风扇，价格实惠。";
    case "fr":
      return "Toujours fournir des accessoires pour la maison, par exemple : tous types de lampes, portes, ventilateurs à prix avantageux.";
    case "ja":
      return "家のアクセサリーを常に提供します。例：すべての種類の照明、ドア、ファンが良い価格で。";
    default:
      return "Always provide accessories for the house, e.g., all types of lights, doors, fans at great prices.";
  }
};

export const translateSpecializeInWires = (language: string) => {
  switch (language) {
    case "vi":
      return "Chuyên cung cấp dây diện Daphaco, Cadivi đầy đủ dây đơn và tất cả dây đôi.";
    case "en":
      return "Specializes in providing Daphaco and Cadivi wires, including all single and double wires.";
    case "zh":
      return "专门提供Daphaco和Cadivi电线，包括所有单线和双线。";
    case "fr":
      return "Spécialise dans la fourniture de fils Daphaco et Cadivi, y compris tous les fils simples et doubles.";
    case "ja":
      return "DaphacoとCadiviの電線を専門に提供しており、すべての単線と二重線を取り揃えています。";
    default:
      return "Specializes in providing Daphaco and Cadivi wires, including all single and double wires.";
  }
};

export const translateCooperateWithBinhMinh = (language: string) => {
  switch (language) {
    case "vi":
      return "Chúng tôi hợp tác với ống nhựa Bình Minh PVC nên để giá sỉ rất tốt rất khác với giá lẻ chiết khấu cao.";
    case "en":
      return "We cooperate with Binh Minh PVC pipes, offering very good wholesale prices, which are very different from high retail discounts.";
    case "zh":
      return "我们与Bình Minh PVC管合作，提供非常好的批发价格，这与高折扣的零售价格大不相同。";
    case "fr":
      return "Nous collaborons avec les tuyaux en PVC Binh Minh, offrant des prix de gros très avantageux, très différents des remises élevées sur les prix de détail.";
    case "ja":
      return "私たちはBinh Minh PVCパイプと提携しており、非常に良い卸売価格を提供しており、小売価格の高い割引とは大きく異なります。";
    default:
      return "We cooperate with Binh Minh PVC pipes, offering very good wholesale prices, which are very different from high retail discounts.";
  }
};

export const translateSeeMore = (language: string) => {
  switch (language) {
    case "vi":
      return "Xem thêm";
    case "en":
      return "See more";
    case "zh":
      return "查看更多";
    case "fr":
      return "Voir plus";
    case "ja":
      return "もっと見る";
    default:
      return "See more";
  }
};

export const translateCoreValues = (language: string) => {
  switch (language) {
    case "vi":
      return "Chúng tôi không chỉ chú trọng vào việc thiết kế sản phẩm mà còn phát triển Hình thức và Chức năng. Giá trị cốt lõi của chúng tôi là động lực sáng tạo và tiến bộ.";
    case "en":
      return "We focus on product design and the development of Form and Function. Our core values drive creativity and progress.";
    case "zh":
      return "我们专注于产品设计和形式与功能的开发。我们的核心价值观推动创造力和进步。";
    case "fr":
      return "Nous nous concentrons sur la conception de produits et le développement de la forme et de la fonction. Nos valeurs fondamentales stimulent la créativité et le progrès.";
    case "ja":
      return "私たちは製品設計と形態・機能の開発に集中しています。私たちのコアバリューは創造力と進歩を促進します。";
    default:
      return "We focus on product design and the development of Form and Function. Our core values drive creativity and progress.";
  }
};

export const translateUniquePerspective = (language: string) => {
  switch (language) {
    case "vi":
      return "Quan điểm độc đáo";
    case "en":
      return "Unique perspective";
    case "zh":
      return "独特的视角";
    case "fr":
      return "Perspective unique";
    case "ja":
      return "ユニークな視点";
    default:
      return "Unique perspective";
  }
};

export const translateProductOffer = (language: string) => {
  switch (language) {
    case "vi":
      return "Chuyên cung cấp sản phẩm Điện Quang, MPE, Rạng Đông, hợp tác thương hiệu, giá ưu đãi, bảo hành chính hãng.";
    case "en":
      return "Specializing in products from Điện Quang, MPE, Rạng Đông, partnered brands, discount prices, and official warranty.";
    case "zh":
      return "专营 Điện Quang, MPE, Rạng Đông 产品，与品牌合作，优惠价格，官方保修。";
    case "fr":
      return "Spécialisé dans les produits de Điện Quang, MPE, Rạng Đông, partenariat avec des marques, prix avantageux, garantie officielle.";
    case "ja":
      return "Điện Quang, MPE, Rạng Đôngの製品を専門に取り扱い、ブランド提携、割引価格、公式保証。";
    default:
      return "Specializing in products from Điện Quang, MPE, Rạng Đông, partnered brands, discount prices, and official warranty.";
  }
};

export const translatePipeOffer = (language: string) => {
  switch (language) {
    case "vi":
      return "Chuyên cung cấp ống điện, ống Bình Minh, ống hoa sen, mua số lượng lớn, chiết khấu cao, hóa đơn đỏ.";
    case "en":
      return "Specializing in electrical pipes, Bình Minh pipes, shower pipes, bulk purchases with high discounts, and red invoice.";
    case "zh":
      return "专营电管，Bình Minh 管，花洒管，大宗购买，高折扣，红色发票。";
    case "fr":
      return "Spécialiste des tuyaux électriques, Bình Minh, douche, achats en gros, remise, facture rouge.";
    case "ja":
      return "電気配管、Bình Minh配管、シャワーパイプを専門に取り扱い、大量購入、高い割引、赤い請求書。";
    default:
      return "Specializing in electrical pipes, Bình Minh pipes, shower pipes, bulk purchases with high discounts, and red invoice.";
  }
};

export const translateCableOffer = (language: string) => {
  switch (language) {
    case "vi":
      return "Chuyên cung cấp dây điện Cadivi, Daphaco cho nhà ở và công ty, bán lẻ và bán sỉ.";
    case "en":
      return "Specializing in Cadivi, Daphaco cables for homes and companies, retail and wholesale.";
    case "zh":
      return "专营Cadivi，Daphaco电缆，适用于住宅和公司，零售和批发。";
    case "fr":
      return "Câbles Cadivi, Daphaco pour maisons et entreprises, vente au détail et en gros.";
    case "ja":
      return "住宅および企業向けのCadivi、Daphacoケーブルを専門に扱い、小売および卸売。";
    default:
      return "Specializing in Cadivi, Daphaco cables for homes and companies, retail and wholesale.";
  }
};

export const translateFanOffer = (language: string) => {
  switch (language) {
    case "vi":
      return "Chuyên cung cấp quạt Senko treo, để bàn hoặc công nghiệp, bảo hành 1 năm.";
    case "en":
      return "Specializing in Senko wall, desk, or industrial fans, 1-year warranty.";
    case "zh":
      return "专营Senko挂式、桌面或工业风扇，1年保修。";
    case "fr":
      return "Spécialisé dans les ventilateurs Senko muraux, de bureau ou industriels, garantie 1 an.";
    case "ja":
      return "Senkoの壁掛け、デスク、または工業用ファンを専門に取り扱い、1年間の保証付き。";
    default:
      return "Specializing in Senko wall, desk, or industrial fans, 1-year warranty.";
  }
};

export const translateSocketOffer = (language: string) => {
  switch (language) {
    case "vi":
      return "Chuyên cung cấp ổ cắm Sino, Panasonic, ổ cắm chống cháy, CP Sino, mặt nạ Sino, tủ chống cháy Sino.";
    case "en":
      return "Specializing in Sino, Panasonic sockets, fireproof sockets, CP Sino, Sino covers, and fireproof cabinets.";
    case "zh":
      return "专营Sino、Panasonic插座、防火插座、Sino断路器、Sino面板和防火柜。";
    case "fr":
      return "Spécialisé dans les prises Sino, Panasonic, anti-feu et armoires Sino.";
    case "ja":
      return "Sino、Panasonicのコンセント、防火コンセント、Sinoブレーカー、Sinoカバー、防火キャビネットを専門に取り扱い。";
    default:
      return "Specializing in Sino, Panasonic sockets, fireproof sockets, CP Sino, Sino covers, and fireproof cabinets.";
  }
};

export const translateLargeProjectsOffer = (language: string) => {
  switch (language) {
    case "vi":
      return "Chuyên nhận các công trình lớn, vật liệu nhà tắm, nhà bếp, đèn trần...";
    case "en":
      return "Specializing in large projects, bathroom and kitchen materials, ceiling lights...";
    case "zh":
      return "专营大型工程、浴室和厨房材料、吊灯...";
    case "fr":
      return "Grands projets, matériaux salle de bain, cuisine, éclairage...";
    case "ja":
      return "大規模プロジェクト、バスルームやキッチンの素材、天井ライトを専門に扱っています...";
    default:
      return "Specializing in large projects, bathroom and kitchen materials, ceiling lights...";
  }
};

export const translateBeautifyHome = (language: string) => {
  switch (language) {
    case "vi":
      return "Hãy làm đẹp cho ngôi nhà của bạn.";
    case "en":
      return "Beautify your home.";
    case "zh":
      return "美化你的家。";
    case "fr":
      return "Embelli ta maison.";
    case "ja":
      return "あなたの家を美しくしましょう。";
    default:
      return "Beautify your home.";
  }
};

export const translateDiningRoom = (language: string) => {
  switch (language) {
    case "vi":
      return "Phòng ăn";
    case "en":
      return "Dining room";
    case "zh":
      return "餐厅";
    case "fr":
      return "Salle à manger";
    case "ja":
      return "ダイニングルーム";
    default:
      return "Dining room";
  }
};

export const translateLivingRoom = (language: string) => {
  switch (language) {
    case "vi":
      return "Phòng khách";
    case "en":
      return "Living room";
    case "zh":
      return "客厅";
    case "fr":
      return "Salon";
    case "ja":
      return "リビングルーム";
    default:
      return "Living room";
  }
};

export const translateWaterPipeline = (language: string) => {
  switch (language) {
    case "vi":
      return "Đường ống nước";
    case "en":
      return "Water pipeline";
    case "zh":
      return "水管";
    case "fr":
      return "Pipeline d'eau";
    case "ja":
      return "水道管";
    default:
      return "Water pipeline";
  }
};

export const translateElectricWiring = (language: string) => {
  switch (language) {
    case "vi":
      return "Đường dây điện";
    case "en":
      return "Electric wiring";
    case "zh":
      return "电线";
    case "fr":
      return "Câblage électrique";
    case "ja":
      return "電気配線";
    default:
      return "Electric wiring";
  }
};

export const translateCeilingLight = (language: string) => {
  switch (language) {
    case "vi":
      return "Đèn trần";
    case "en":
      return "Ceiling light";
    case "zh":
      return "天花灯";
    case "fr":
      return "Lumière au plafond";
    case "ja":
      return "天井灯";
    default:
      return "Ceiling light";
  }
};

export const translateConstructionMaterials = (language: string) => {
  switch (language) {
    case "vi":
      return "VLXD công trình";
    case "en":
      return "Construction materials";
    case "zh":
      return "建筑材料";
    case "fr":
      return "Matériaux de construction";
    case "ja":
      return "建設資材";
    default:
      return "Construction materials";
  }
};

export const translateOverviewStore = (language: string) => {
  switch (language) {
    case "vi":
      return "Tổng quan cửa hàng";
    case "en":
      return "Overview Store";
    case "zh":
      return "店铺概述";
    case "fr":
      return "Aperçu du magasin";
    case "ja":
      return "店舗の概要";
    default:
      return "Overview Store";
  }
};

export const translateStoreDescriptionShort = (language: string) => {
  switch (language) {
    case "vi":
      return "Cửa hàng của chúng tôi cung cấp đa dạng sản phẩm, được khách hàng tin cậy. Tất cả thông số kỹ thuật chính xác, dựa trên dữ liệu đám mây.";
    case "en":
      return "Our store offers diverse products, trusted by customers. All technical specs are accurate, based on cloud data.";
    case "zh":
      return "我们的商店提供多种产品，客户信赖。所有技术规格准确，基于云数据。";
    case "fr":
      return "Notre magasin propose des produits divers, fiables. Toutes les spécifications techniques sont précises, basées sur les données cloud.";
    case "ja":
      return "当店は多様な商品を取り扱い、顧客に信頼されています。技術仕様は正確で、クラウドデータに基づいています。";
    default:
      return "Our store offers diverse products, trusted by customers. All technical specs are accurate, based on cloud data.";
  }
};

export const translateExplore = (language: string) => {
  switch (language) {
    case "vi":
      return "Khám phá";
    case "en":
      return "Explore";
    case "zh":
      return "探索";
    case "fr":
      return "Explorer";
    case "ja":
      return "探検する";
    default:
      return "Explore";
  }
};

export const translateTotalProduct = (language: string) => {
  switch (language) {
    case "vi":
      return "Tổng sản phẩm";
    case "en":
      return "Total product";
    case "zh":
      return "总产品";
    case "fr":
      return "Produit total";
    case "ja":
      return "総製品";
    default:
      return "Total product";
  }
};

export const translateQuantitySold = (language: string) => {
  switch (language) {
    case "vi":
      return "Số lượng đã bán";
    case "en":
      return "Quantity sold";
    case "zh":
      return "销售数量";
    case "fr":
      return "Quantité vendue";
    case "ja":
      return "販売数量";
    default:
      return "Quantity sold";
  }
};

export const translateEmployees = (language: string) => {
  switch (language) {
    case "vi":
      return "Nhân viên";
    case "en":
      return "Employees";
    case "zh":
      return "员工";
    case "fr":
      return "Employés";
    case "ja":
      return "従業員";
    default:
      return "Employees";
  }
};

export const translateTotalCustomers = (language: string) => {
  switch (language) {
    case "vi":
      return "Tổng khách hàng";
    case "en":
      return "Total Customers";
    case "zh":
      return "总客户";
    case "fr":
      return "Total des clients";
    case "ja":
      return "総顧客";
    default:
      return "Total Customers";
  }
};

export const translateBeautifyHomeYou = (language: string) => {
  switch (language) {
    case "vi":
      return "Tô điểm thế giới bên trong ngôi nhà của bạn";
    case "en":
      return "Beautify the world inside your home";
    case "zh":
      return "美化您家里的世界";
    case "fr":
      return "Embélissez le monde à l'intérieur de votre maison";
    case "ja":
      return "あなたの家の中の世界を美しく飾りましょう";
    default:
      return "Beautify the world inside your home";
  }
};

export const translateQualityAndTrust = (language: string) => {
  switch (language) {
    case "vi":
      return "Chúng tôi cung cấp cho bạn chất lượng với sự tín nhiệm hoàn hảo, sự hài lòng của bạn là cân nhắc hàng đầu của chúng tôi.";
    case "en":
      return "We provide you with quality and perfect trust, your satisfaction is our top priority.";
    case "zh":
      return "我们为您提供质量和完美的信任，您的满意是我们的首要考虑。";
    case "fr":
      return "Nous vous offrons qualité et confiance parfaite, votre satisfaction est notre priorité absolue.";
    case "ja":
      return "私たちは品質と完璧な信頼を提供し、お客様の満足が最優先事項です。";
    default:
      return "We provide you with quality and perfect trust, your satisfaction is our top priority.";
  }
};

export const translateStartShopping = (language: string) => {
  switch (language) {
    case "vi":
      return "Hãy bắt đầu ngay bây giờ nhấp vào bên dưới để mua hàng.";
    case "en":
      return "Start now by clicking below to shop.";
    case "zh":
      return "现在开始，点击下方购买。";
    case "fr":
      return "Commencez maintenant en cliquant ci-dessous pour acheter.";
    case "ja":
      return "今すぐ下のリンクをクリックして購入を始めましょう。";
    default:
      return "Start now by clicking below to shop.";
  }
};

export const translateBuyHere = (language: string) => {
  switch (language) {
    case "vi":
      return "Mua hàng tại đây";
    case "en":
      return "Buy here";
    case "zh":
      return "在这里购买";
    case "fr":
      return "Achetez ici";
    case "ja":
      return "ここで購入";
    default:
      return "Buy here";
  }
};

export const translateClickHere = (language: string) => {
  switch (language) {
    case "vi":
      return "Nhấp vào đây";
    case "en":
      return "Click here";
    case "zh":
      return "点击这里";
    case "fr":
      return "Cliquez ici";
    case "ja":
      return "クリック";
    default:
      return "Click here";
  }
};

export const translateNoPostsAvailable = (language: string) => {
  switch (language) {
    case "vi":
      return "Xin lỗi, không có bài viết nào.";
    case "en":
      return "Sorry, no posts available.";
    case "zh":
      return "抱歉，没有可用的帖子。";
    case "fr":
      return "Désolé, aucun post disponible.";
    case "ja":
      return "申し訳ありませんが、利用可能な投稿はありません。";
    default:
      return "Sorry, no posts available.";
  }
};

export const translateNews = (language: string) => {
  switch (language) {
    case "vi":
      return "Tin tức";
    case "en":
      return "News";
    case "zh":
      return "新闻";
    case "fr":
      return "Actualités";
    case "ja":
      return "ニュース";
    default:
      return "News";
  }
};

export const translateLatestNews = (language: string) => {
  switch (language) {
    case "vi":
      return "Cập nhật tin tức mới nhất";
    case "en":
      return "Latest news update";
    case "zh":
      return "最新新闻更新";
    case "fr":
      return "Dernières mises à jour";
    case "ja":
      return "最新のニュース更新";
    default:
      return "Latest news update";
  }
};

export const translateOtherSuggestions = (language: string) => {
  switch (language) {
    case "vi":
      return "Gợi ý khác";
    case "en":
      return "Other suggestions";
    case "zh":
      return "其他建议";
    case "fr":
      return "Autres suggestions";
    case "ja":
      return "他の提案";
    default:
      return "Other suggestions";
  }
};

export const translateOtherType = (language: string) => {
  switch (language) {
    case "vi":
      return "Loại khác";
    case "en":
      return "Other type";
    case "zh":
      return "其他类型";
    case "fr":
      return "Autre type";
    case "ja":
      return "他の種類";
    default:
      return "Other type";
  }
};

export const translateSelectSizeToDelete = (language: string) => {
  switch (language) {
    case "vi":
      return "Hãy chọn size sản phẩm cần xóa!";
    case "en":
      return "Please select the product size to delete!";
    case "zh":
      return "请选择要删除的产品尺寸！";
    case "fr":
      return "Veuillez sélectionner la taille du produit à supprimer !";
    case "ja":
      return "削除する商品のサイズを選択してください！";
    default:
      return "Please select the product size to delete!";
  }
};

export const translateSelectColorToDelete = (language: string) => {
  switch (language) {
    case "vi":
      return "Hãy chọn color sản phẩm cần xóa!";
    case "en":
      return "Please select the product color to delete!";
    case "zh":
      return "请选择要删除的产品颜色！";
    case "fr":
      return "Veuillez sélectionner la couleur du produit à supprimer !";
    case "ja":
      return "削除する商品の色を選択してください！";
    default:
      return "Please select the product color to delete!";
  }
};

export const translateSelectSizeToSave = (language: string) => {
  switch (language) {
    case "vi":
      return "Hãy chọn size sản phẩm cần lưu!";
    case "en":
      return "Please select the product size to save!";
    case "zh":
      return "请选择要保存的产品尺寸！";
    case "fr":
      return "Veuillez sélectionner la taille du produit à enregistrer !";
    case "ja":
      return "保存する商品のサイズを選択してください！";
    default:
      return "Please select the product size to save!";
  }
};

export const translateSelectColorToSave = (language: string) => {
  switch (language) {
    case "vi":
      return "Hãy chọn color sản phẩm cần lưu!";
    case "en":
      return "Please select the product color to save!";
    case "zh":
      return "请选择要保存的产品颜色！";
    case "fr":
      return "Veuillez sélectionner la couleur du produit à enregistrer !";
    case "ja":
      return "保存する商品の色を選択してください！";
    default:
      return "Please select the product color to save!";
  }
};

export const translateSelectSize = (language: string) => {
  switch (language) {
    case "vi":
      return "Vui lòng chọn kích thước";
    case "en":
      return "Please select the size";
    case "zh":
      return "请选择尺寸";
    case "fr":
      return "Veuillez sélectionner la taille";
    case "ja":
      return "サイズを選択してください";
    default:
      return "Please select the size";
  }
};

export const translateSelectColor = (language: string) => {
  switch (language) {
    case "vi":
      return "Vui lòng chọn màu!";
    case "en":
      return "Please select a color!";
    case "zh":
      return "请选择颜色！";
    case "fr":
      return "Veuillez sélectionner une couleur !";
    case "ja":
      return "色を選択してください！";
    default:
      return "Please select a color!";
  }
};

export const translateOutOfStock = (language: string) => {
  switch (language) {
    case "vi":
      return "Sản phẩm đã hết hàng trong kho!";
    case "en":
      return "The product is out of stock!";
    case "zh":
      return "产品已缺货！";
    case "fr":
      return "Le produit est en rupture de stock !";
    case "ja":
      return "製品は在庫切れです！";
    default:
      return "The product is out of stock!";
  }
};

export const translateAddToCartError = (language: string) => {
  switch (language) {
    case "vi":
      return "Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng!";
    case "en":
      return "An error occurred while adding the product to the cart!";
    case "zh":
      return "添加产品到购物车时发生错误！";
    case "fr":
      return "Une erreur est survenue lors de l'ajout du produit au panier !";
    case "ja":
      return "製品をカートに追加中にエラーが発生しました！";
    default:
      return "An error occurred while adding the product to the cart!";
  }
};

export const translateCountdownEnd = (language: string) => {
  switch (language) {
    case "vi":
      return "Kết thúc trong:";
    case "en":
      return "Ends in:";
    case "zh":
      return "结束于：";
    case "fr":
      return "Se termine dans :";
    case "ja":
      return "終了まで:";
    default:
      return "Ends in:";
  }
};

export const translateStockQuantity = (language: string) => {
  switch (language) {
    case "vi":
      return "Số lượng trong kho:";
    case "en":
      return "Stock quantity:";
    case "zh":
      return "库存数量：";
    case "fr":
      return "Quantité en stock :";
    case "ja":
      return "在庫数量：";
    default:
      return "Stock quantity:";
  }
};

export const translateTotalProductQuantity = (language: string) => {
  switch (language) {
    case "vi":
      return "Tổng số lượng sản phẩm:";
    case "en":
      return "Total product quantity:";
    case "zh":
      return "产品总数量：";
    case "fr":
      return "Quantité totale de produits :";
    case "ja":
      return "製品の総数量：";
    default:
      return "Total product quantity:";
  }
};

export const translateProductLowerCase = (language: string) => {
  switch (language) {
    case "vi":
      return "sản phẩm";
    case "en":
      return "product";
    case "zh":
      return "产品";
    case "fr":
      return "produit";
    case "ja":
      return "製品";
    default:
      return "product";
  }
};

export const translateSold = (language: string) => {
  switch (language) {
    case "vi":
      return "Đã bán";
    case "en":
      return "Sold";
    case "zh":
      return "已售出";
    case "fr":
      return "Vendu";
    case "ja":
      return "販売済み";
    default:
      return "Sold";
  }
};

export const translateTotalPrice = (language: string) => {
  switch (language) {
    case "vi":
      return "Tổng giá";
    case "en":
      return "Total price";
    case "zh":
      return "总价";
    case "fr":
      return "Prix total";
    case "ja":
      return "合計金額";
    default:
      return "Total price";
  }
};

export const translateAdditionalDiscount = (language: string) => {
  switch (language) {
    case "vi":
      return "Ưu đãi thêm";
    case "en":
      return "Additional discount";
    case "zh":
      return "额外折扣";
    case "fr":
      return "Remise supplémentaire";
    case "ja":
      return "追加割引";
    default:
      return "Additional discount";
  }
};

export const translateBulkDiscount = (language: string) => {
  switch (language) {
    case "vi":
      return "Chiết khấu cao khi mua hàng với giá sỉ";
    case "en":
      return "High discount when buying at wholesale prices";
    case "zh":
      return "批发价购买时享受高折扣";
    case "fr":
      return "Réduction importante lors de l'achat en gros";
    case "ja":
      return "卸売価格で購入すると高い割引が適用されます";
    default:
      return "High discount when buying at wholesale prices";
  }
};

export const translateBigDiscountOver2Million = (language: string) => {
  switch (language) {
    case "vi":
      return "Ưu đãi lớn khi thanh toán trên 2 triệu";
    case "en":
      return "Big discount when paying over 2 million";
    case "zh":
      return "支付超过 2 百万时享受大折扣";
    case "fr":
      return "Grande réduction lors du paiement de plus de 2 millions";
    case "ja":
      return "200万以上のお支払いで大きな割引";
    default:
      return "Big discount when paying over 2 million";
  }
};

export const translateRandomDiscountCode = (language: string) => {
  switch (language) {
    case "vi":
      return "Tặng mã giảm giá ngẫu nhiên";
    case "en":
      return "Give a random discount code";
    case "zh":
      return "赠送随机折扣码";
    case "fr":
      return "Offrir un code de réduction aléatoire";
    case "ja":
      return "ランダム割引コードをプレゼント";
    default:
      return "Give a random discount code";
  }
};

export const translatePaymentMethods = (language: string) => {
  switch (language) {
    case "vi":
      return "Có thể thanh toán bằng tiền mặt hoặc visa";
    case "en":
      return "You can pay by cash or visa";
    case "zh":
      return "可以通过现金或Visa支付";
    case "fr":
      return "Vous pouvez payer en espèces ou par carte Visa";
    case "ja":
      return "現金またはVisaで支払うことができます";
    default:
      return "You can pay by cash or visa";
  }
};

export const translateHugeDiscountForBulkPurchase = (language: string) => {
  switch (language) {
    case "vi":
      return "Ưu đãi cực nhiều khi mua hàng số lượng lớn";
    case "en":
      return "Huge discount for bulk purchases";
    case "zh":
      return "大量购买享受超大折扣";
    case "fr":
      return "Remise énorme pour les achats en grande quantité";
    case "ja":
      return "大量購入で大きな割引";
    default:
      return "Huge discount for bulk purchases";
  }
};

export const translateWarrantyInfoShort = (language: string) => {
  switch (language) {
    case "vi":
      return "Nếu sản phẩm có lỗi hoặc hư, bảo hành 1 năm tùy món hàng";
    case "en":
      return "1-year warranty for faulty or damaged items";
    case "zh":
      return "如果产品有故障或损坏，根据商品提供1年保修";
    case "fr":
      return "Garantie 1 an pour les articles défectueux";
    case "ja":
      return "製品に不具合がある場合、または破損している場合、商品に応じて1年間の保証";
    default:
      return "1-year warranty for faulty or damaged items";
  }
};

export const translateQuantity = (language: string) => {
  switch (language) {
    case "vi":
      return "Số lượng";
    case "en":
      return "Quantity";
    case "zh":
      return "数量";
    case "fr":
      return "Quantité";
    case "ja":
      return "数量";
    default:
      return "Quantity";
  }
};

export const translateNewWithAccessories = (language: string) => {
  switch (language) {
    case "vi":
      return "Mới, đầy đủ phụ kiện từ nhà sản xuất";
    case "en":
      return "New, with all accessories from the manufacturer";
    case "zh":
      return "全新，附带所有制造商配件";
    case "fr":
      return "Neuf, avec tous les accessoires du fabricant";
    case "ja":
      return "新品、すべての付属品がメーカーから提供されます";
    default:
      return "New, with all accessories from the manufacturer";
  }
};

export const translateRepairSupport = (language: string) => {
  switch (language) {
    case "vi":
      return "Hỗ trợ sửa chữa";
    case "en":
      return "Repair support";
    case "zh":
      return "维修支持";
    case "fr":
      return "Support de réparation";
    case "ja":
      return "修理サポート";
    default:
      return "Repair support";
  }
};

export const translateWarrantyDetails = (language: string) => {
  switch (language) {
    case "vi":
      return "Bảo hành 24 tháng tại trung tâm bảo hành Chính hãng, 1 đổi 1 trong 30 ngày nếu có lỗi từ phía nhà sản xuất";
    case "en":
      return "24-month warranty at the authorized service center, 1-to-1 exchange within 30 days for manufacturer defects";
    case "zh":
      return "24个月保修，在授权服务中心提供，30天内因制造商缺陷可换货";
    case "fr":
      return "Garantie de 24 mois au centre de service agréé, échange standard sous 30 jours en cas de défaut de fabrication";
    case "ja":
      return "24ヶ月の保証、正規サービスセンターでの保証、製造上の欠陥があれば30日以内に1対1交換";
    default:
      return "24-month warranty at the authorized service center, 1-to-1 exchange within 30 days for manufacturer defects";
  }
};

export const translatePriceIncludesVAT = (language: string) => {
  switch (language) {
    case "vi":
      return "Giá sản phẩm đã bao gồm VAT";
    case "en":
      return "The product price includes VAT";
    case "zh":
      return "产品价格已包含增值税";
    case "fr":
      return "Le prix du produit inclut la TVA";
    case "ja":
      return "製品価格にはVATが含まれています";
    default:
      return "The product price includes VAT";
  }
};

export const translateLoyalCustomerDiscount = (language: string) => {
  switch (language) {
    case "vi":
      return "Ưu đãi khách hàng thân thiết";
    case "en":
      return "Loyal customer discount";
    case "zh":
      return "忠实客户优惠";
    case "fr":
      return "Remise pour les clients fidèles";
    case "ja":
      return "ロイヤルカスタマーディスカウント";
    default:
      return "Loyal customer discount";
  }
};

export const translateWholesaleDiscount = (language: string) => {
  switch (language) {
    case "vi":
      return "Giảm giá mua sỉ";
    case "en":
      return "Wholesale discount";
    case "zh":
      return "批发折扣";
    case "fr":
      return "Réduc' gros";
    case "ja":
      return "卸売割引";
    default:
      return "Wholesale discount";
  }
};

export const translateContractorDiscount = (language: string) => {
  switch (language) {
    case "vi":
      return "Ưu đãi nhà thầu";
    case "en":
      return "Contractor discount";
    case "zh":
      return "承包商优惠";
    case "fr":
      return "Réduc' pour entrepreneurs";
    case "ja":
      return "請負業者向け割引";
    default:
      return "Contractor discount";
  }
};

export const translateProjectDiscount = (language: string) => {
  switch (language) {
    case "vi":
      return "Giảm giá công trình lớn và nhỏ";
    case "en":
      return "Discount for large and small projects";
    case "zh":
      return "大项目和小项目折扣";
    case "fr":
      return "Réduction pour tous projets";
    case "ja":
      return "大規模および小規模プロジェクトの割引";
    default:
      return "Discount for large and small projects";
  }
};

export const translateSpecifications = (language: string) => {
  switch (language) {
    case "vi":
      return "Thông số kỹ thuật";
    case "en":
      return "Specifications";
    case "zh":
      return "技术规格";
    case "fr":
      return "Spécifications";
    case "ja":
      return "仕様";
    default:
      return "Specifications";
  }
};

export const translateViewDetails = (language: string) => {
  switch (language) {
    case "vi":
      return "Xem chi tiết";
    case "en":
      return "View details";
    case "zh":
      return "查看详情";
    case "fr":
      return "Voir les détails";
    case "ja":
      return "詳細を見る";
    default:
      return "View details";
  }
};

export const translateProductProtection = (language: string) => {
  switch (language) {
    case "vi":
      return "Bảo vệ sản phẩm toàn diện với dịch vụ bảo hành mở rộng";
    case "en":
      return "Comprehensive product protection with extended warranty service";
    case "zh":
      return "全面产品保护，延长保修服务";
    case "fr":
      return "Protection complète du produit avec service de garantie prolongée";
    case "ja":
      return "製品の完全な保護と延長保証サービス";
    default:
      return "Comprehensive product protection with extended warranty service";
  }
};

export const translateServiceSummary = (language: string) => {
  switch (language) {
    case "vi":
      return "Tổng hợp dịch vụ";
    case "en":
      return "Service summary";
    case "zh":
      return "服务汇总";
    case "fr":
      return "Résumé des services";
    case "ja":
      return "サービス概要";
    default:
      return "Service summary";
  }
};

export const translateS24Plus12Months = (language: string) => {
  switch (language) {
    case "vi":
      return "S24 + 12 tháng";
    case "en":
      return "S24 + 12 months";
    case "zh":
      return "S24 + 12个月";
    case "fr":
      return "S24 + 12 mois";
    case "ja":
      return "S24 + 12ヶ月";
    default:
      return "S24 + 12 months";
  }
};

export const translateWarrantyExchange = (language: string) => {
  switch (language) {
    case "vi":
      return "Đổi sản phẩm tương đương hoặc miễn phí chi phí sửa chữa nếu có lỗi của nhà sản xuất khi hết hạn bảo hành trong 12 tháng";
    case "en":
      return "Exchange for an equivalent product or free repair if there is a manufacturer defect after the 12-month warranty expires";
    case "zh":
      return "如果产品在12个月保修期后因制造商缺陷，可以更换等值产品或免费维修";
    case "fr":
      return "Échange contre un produit équivalent ou réparation gratuite en cas de défaut du fabricant après la fin de la garantie de 12 mois";
    case "ja":
      return "製造元の欠陥が12ヶ月の保証期限後に発生した場合、同等の製品と交換するか、修理費用が無料になります";
    default:
      return "Exchange for an equivalent product or free repair if there is a manufacturer defect after the 12-month warranty expires";
  }
};

export const translateVIPExchange = (language: string) => {
  switch (language) {
    case "vi":
      return "1 đổi 1 VIP 12 tháng";
    case "en":
      return "1-to-1 VIP exchange 12 months";
    case "zh":
      return "1对1 VIP 12个月";
    case "fr":
      return "Échange VIP 1 pour 1 pendant 12 mois";
    case "ja":
      return "VIP 1対1 12ヶ月";
    default:
      return "1-to-1 VIP exchange 12 months";
  }
};

export const translateExchangeNewProduct = (language: string) => {
  switch (language) {
    case "vi":
      return "Đổi máy mới tương đương khi có lỗi từ nhà sản xuất trong 12 tháng";
    case "en":
      return "Exchange for an equivalent new product if there is a manufacturer defect within 12 months";
    case "zh":
      return "如果12个月内发生制造商缺陷，换一个等值的新产品";
    case "fr":
      return "Échange contre un produit neuf équivalent en cas de défaut du fabricant dans les 12 mois";
    case "ja":
      return "12ヶ月以内に製造元の欠陥が発生した場合、同等の新品と交換します";
    default:
      return "Exchange for an equivalent new product if there is a manufacturer defect within 12 months";
  }
};

export const translateDamagePolicy = (language: string) => {
  switch (language) {
    case "vi":
      return "Rơi vỡ - Rớt nước";
    case "en":
      return "Drops and water damage";
    case "zh":
      return "摔落和水损坏";
    case "fr":
      return "Casses et dommages causés par l'eau";
    case "ja":
      return "落下と水による損傷";
    default:
      return "Drops and water damage";
  }
};

export const translateRepairSupportProduct = (language: string) => {
  switch (language) {
    case "vi":
      return "Hỗ trợ 90% chi phí sửa chữa, đổi mới sản phẩm nếu hư hỏng nặng trong 12 tháng";
    case "en":
      return "90% repair cost support, product replacement if there is severe damage within 12 months";
    case "zh":
      return "12个月内严重损坏可提供90%的维修费用支持，并更换产品";
    case "fr":
      return "Soutien à 90% des frais de réparation, remplacement du produit en cas de dommage important dans les 12 mois";
    case "ja":
      return "12ヶ月以内に重大な損傷がある場合、修理費用の90％をサポートし、製品を交換します";
    default:
      return "90% repair cost support, product replacement if there is severe damage within 12 months";
  }
};

export const translateVIPExchange6Months = (language: string) => {
  switch (language) {
    case "vi":
      return "1 đổi 1 VIP 6 tháng";
    case "en":
      return "1-to-1 VIP exchange 6 months";
    case "zh":
      return "1对1 VIP 6个月";
    case "fr":
      return "Échange VIP 1 pour 1 pendant 6 mois";
    case "ja":
      return "VIP 1対1 6ヶ月";
    default:
      return "1-to-1 VIP exchange 6 months";
  }
};

export const translateExchangeNewProduct6Months = (language: string) => {
  switch (language) {
    case "vi":
      return "Đổi máy mới tương đương khi có lỗi từ nhà sản xuất trong 6 tháng";
    case "en":
      return "Exchange for an equivalent new product if there is a manufacturer defect within 6 months";
    case "zh":
      return "如果6个月内发生制造商缺陷，换一个等值的新产品";
    case "fr":
      return "Échange contre un produit neuf équivalent en cas de défaut du fabricant dans les 6 mois";
    case "ja":
      return "6ヶ月以内に製造元の欠陥が発生した場合、同等の新品と交換します";
    default:
      return "Exchange for an equivalent new product if there is a manufacturer defect within 6 months";
  }
};

export const translateCustomerRegistration = (language: string) => {
  switch (language) {
    case "vi":
      return "Khách hàng đăng ký thông tin để được hỗ trợ tư vấn và thanh toán tại cửa hàng nhanh nhất, số tiền phải thanh toán chưa bao gồm giá trị của gói bảo hành mở rộng";
    case "en":
      return "Customers register their information to receive consultation and make the fastest payment at the store, the payment amount does not include the value of the extended warranty package";
    case "zh":
      return "客户注册信息以便获得咨询并在商店进行最快支付，支付金额不包括扩展保修包的费用";
    case "fr":
      return "Inscription des clients pour une consultation et un paiement rapide en magasin, montant non compris la garantie étendue";
    case "ja":
      return "お客様は情報を登録して、店舗で最速の支払いと相談を受け、支払金額には延長保証パッケージの価値は含まれていません";
    default:
      return "Customers register their information to receive consultation and make the fastest payment at the store, the payment amount does not include the value of the extended warranty package";
  }
};

export const translateView = (language: string) => {
  switch (language) {
    case "vi":
      return "Xem";
    case "en":
      return "View";
    case "zh":
      return "查看";
    case "fr":
      return "Voir";
    case "ja":
      return "見る";
    default:
      return "View";
  }
};

export const translateExtendedServiceDetails = (language: string) => {
  switch (language) {
    case "vi":
      return "Chi tiết dịch vụ mở rộng";
    case "en":
      return "Extended Service Details";
    case "zh":
      return "扩展服务详情";
    case "fr":
      return "Détails du service étendu";
    case "ja":
      return "拡張サービスの詳細";
    default:
      return "Extended Service Details";
  }
};

export const translateVIPWarrantyUpperCase = (language: string) => {
  switch (language) {
    case "vi":
      return "BẢO HÀNH 1 ĐỔI 1 VIP";
    case "en":
      return "VIP 1-TO-1 WARRANTY";
    case "zh":
      return "VIP 1对1保修";
    case "fr":
      return "GARANTIE 1 POUR 1 VIP";
    case "ja":
      return "VIP 1対1 保証";
    default:
      return "VIP 1-TO-1 WARRANTY";
  }
};

export const translateApplicableProducts = (language: string) => {
  switch (language) {
    case "vi":
      return "Những đồ điện tử, quạt, có phiếu bảo hành";
    case "en":
      return "Electronic devices, fans, with warranty cards";
    case "zh":
      return "电子产品、风扇，带保修卡";
    case "fr":
      return "Appareils électroniques, ventilateurs, avec carte de garantie";
    case "ja":
      return "電子機器、ファン、保証書付き";
    default:
      return "Electronic devices, fans, with warranty cards";
  }
};

export const translateWarrantyPeriods = (language: string) => {
  switch (language) {
    case "vi":
      return "Thời gian bảo hành: 6 tháng / 12 tháng";
    case "en":
      return "Warranty period: 6 months / 12 months";
    case "zh":
      return "保修期：6个月 / 12个月";
    case "fr":
      return "Période de garantie : 6 mois / 12 mois";
    case "ja":
      return "保証期間：6ヶ月 / 12ヶ月";
    default:
      return "Warranty period: 6 months / 12 months";
  }
};

export const translateWarrantyBenefitsAndServices = (language: string) => {
  switch (language) {
    case "vi":
      return "Quyền lợi và dịch vụ bảo hành";
    case "en":
      return "Warranty benefits and services";
    case "zh":
      return "保修权益与服务";
    case "fr":
      return "Avantages et services de garantie";
    case "ja":
      return "保証特典とサービス";
    default:
      return "Warranty benefits and services";
  }
};

export const translateOneToOneCheck = (language: string) => {
  switch (language) {
    case "vi":
      return "Kiểm tra 1 đổi 1 toàn bộ linh kiện của sản phẩm";
    case "en":
      return "1-to-1 check for all components of the product";
    case "zh":
      return "产品所有部件的1对1检查";
    case "fr":
      return "Vérification 1 pour 1 de tous les composants du produit";
    case "ja":
      return "製品のすべての部品の1対1チェック";
    default:
      return "1-to-1 check for all components of the product";
  }
};

export const translateEquivalentProductExchange = (language: string) => {
  switch (language) {
    case "vi":
      return "Đổi sản phẩm tương đương sản phẩm bảo hành";
    case "en":
      return "Exchange the product with an equivalent warranty product";
    case "zh":
      return "以等效保修产品进行更换";
    case "fr":
      return "Échanger le produit contre un produit de garantie équivalent";
    case "ja":
      return "保証製品と同等の製品に交換";
    default:
      return "Exchange the product with an equivalent warranty product";
  }
};

export const translateWarrantyCondition = (language: string) => {
  switch (language) {
    case "vi":
      return "Điều kiện bảo hành: Sản phẩm bị lỗi do nhà sản xuất";
    case "en":
      return "Warranty condition: Product is defective due to manufacturer";
    case "zh":
      return "保修条件：产品因制造商原因有缺陷";
    case "fr":
      return "Condition de garantie : Produit défectueux dû au fabricant";
    case "ja":
      return "保証条件：製造者による製品の欠陥";
    default:
      return "Warranty condition: Product is defective due to manufacturer";
  }
};

export const translateWarrantyNotice = (language: string) => {
  switch (language) {
    case "vi":
      return "Lưu ý: Gói bảo hành không có hiệu lực với các sản phẩm bị biến dạng so với ban đầu (cấn, móp, cong, vênh, nứt…) và các sản phẩm bị vào nước hoặc đã được sửa chữa";
    case "en":
      return "Note: The warranty does not apply to products that are deformed compared to the original (dented, bent, warped, cracked…) or products that have been exposed to water or repaired";
    case "zh":
      return "注意：保修不适用于与原始状态不同形状的产品（凹陷、弯曲、变形、破裂等）或遭受水损坏或已修理的产品";
    case "fr":
      return "Note : La garantie ne s'applique pas aux produits déformés par rapport à l'état initial (bosselés, pliés, déformés, fissurés…) ou aux produits exposés à l'eau ou réparés";
    case "ja":
      return "注意：保証は、元の状態と異なる形状（へこみ、曲がり、歪み、ひび割れなど）を持つ製品や、水に浸かったり修理された製品には適用されません";
    default:
      return "Note: The warranty does not apply to products that are deformed compared to the original (dented, bent, warped, cracked…) or products that have been exposed to water or repaired";
  }
};

export const translateProcessingTimes = (language: string) => {
  switch (language) {
    case "vi":
      return "Thời gian xử lý: Trong vòng 24h và tối đa 14 ngày làm việc tùy thuộc vào tình trạng của sản phẩm";
    case "en":
      return "Processing time: Within 24 hours and up to 14 working days depending on the condition of the product";
    case "zh":
      return "处理时间：在24小时内，最长可达14个工作日，具体取决于产品状况";
    case "fr":
      return "Temps de traitement : Dans les 24 heures et jusqu'à 14 jours ouvrables en fonction de l'état du produit";
    case "ja":
      return "処理時間：24時間以内、製品の状態に応じて最大14営業日";
    default:
      return "Processing time: Within 24 hours and up to 14 working days depending on the condition of the product";
  }
};

export const translateFallDamageUpperCase = (language: string) => {
  switch (language) {
    case "vi":
      return "RƠI VỠ, RƠI NƯỚC";
    case "en":
      return "FALL DAMAGE, WATER DAMAGE";
    case "zh":
      return "摔坏，进水";
    case "fr":
      return "CASSE, DOMMAGE PAR L'EAU";
    case "ja":
      return "落下破損、水没";
    default:
      return "FALL DAMAGE, WATER DAMAGE";
  }
};

export const translateNoWarranty = (language: string) => {
  switch (language) {
    case "vi":
      return "Sẽ không được bảo hành";
    case "en":
      return "No warranty";
    case "zh":
      return "没有保修";
    case "fr":
      return "Aucune garantie";
    case "ja":
      return "保証なし";
    default:
      return "No warranty";
  }
};

export const translateOfficialWarrantyFeeUpperCase = (language: string) => {
  switch (language) {
    case "vi":
      return "BẢO HÀNH CHÍNH HÃNG MẤT PHÍ";
    case "en":
      return "OFFICIAL WARRANTY CHARGES APPLY";
    case "zh":
      return "官方保修收费";
    case "fr":
      return "GARANTIE OFFICIELLE PAYANTE";
    case "ja":
      return "公式保証には料金がかかります";
    default:
      return "OFFICIAL WARRANTY CHARGES APPLY";
  }
};

export const translateWarrantyApplicable = (language: string) => {
  switch (language) {
    case "vi":
      return "Những đồ điện tử, quạt, và chỉ hư một số phụ kiện";
    case "en":
      return "Electronics, fans, and only certain accessories are covered";
    case "zh":
      return "电子产品、风扇，仅限某些配件";
    case "fr":
      return "Électroniques, ventilateurs, et seulement certains accessoires";
    case "ja":
      return "電子製品、ファン、一部のアクセサリーのみ対象";
    default:
      return "Electronics, fans, and only certain accessories are covered";
  }
};

export const translateWarrantyTime = (language: string) => {
  switch (language) {
    case "vi":
      return "Thời gian bảo hành: 1-2 tuần";
    case "en":
      return "Warranty period: 1-2 weeks";
    case "zh":
      return "保修期：1-2周";
    case "fr":
      return "Période de garantie : 1-2 semaines";
    case "ja":
      return "保証期間：1〜2週間";
    default:
      return "Warranty period: 1-2 weeks";
  }
};

export const translateExtendedWarranty = (language: string) => {
  switch (language) {
    case "vi":
      return "Sau khi hết bảo hành chính hãng, sản phẩm vẫn được tiếp tục bảo hành các lỗi nhà sản xuất, thời gian bảo hành theo gói bảo hành mà khách hàng lựa chọn";
    case "en":
      return "After the official warranty expires, the product will continue to be covered for manufacturer defects, with warranty period based on the package chosen by the customer";
    case "zh":
      return "在官方保修期结束后，产品将继续享受制造商缺陷的保修，保修期根据客户选择的保修套餐";
    case "fr":
      return "Après la fin de la garantie officielle, le produit continuera à être couvert pour les défauts du fabricant, la période de garantie dépend du forfait choisi par le client";
    case "ja":
      return "公式保証期間終了後、製品は製造業者の欠陥について引き続き保証され、保証期間は顧客が選択したパッケージに基づきます";
    default:
      return "After the official warranty expires, the product will continue to be covered for manufacturer defects, with warranty period based on the package chosen by the customer";
  }
};

export const translateExchangeForDefect = (language: string) => {
  switch (language) {
    case "vi":
      return "Được đổi sản phẩm tương đương nếu máy hư hỏng nặng không sửa chữa được";
    case "en":
      return "Eligible for exchange with equivalent product if the device is severely damaged and cannot be repaired";
    case "zh":
      return "如果设备严重损坏且无法修复，可更换为同等产品";
    case "fr":
      return "Éligible pour un échange avec un produit équivalent si l'appareil est gravement endommagé et ne peut pas être réparé";
    case "ja":
      return "デバイスが重度の損傷を受け、修理不可能な場合、同等製品と交換可能";
    default:
      return "Eligible for exchange with equivalent product if the device is severely damaged and cannot be repaired";
  }
};

export const translateTradeInDiscount = (language: string) => {
  switch (language) {
    case "vi":
      return "Được trợ giá nhập lại sản phẩm bị hỏng để lên đời nếu không có sản phẩm để đổi";
    case "en":
      return "Eligible for trade-in discount to upgrade if no exchange product is available";
    case "zh":
      return "如果没有可交换的产品，允许通过旧产品换购折扣升级";
    case "fr":
      return "Éligible pour une remise de reprise pour une mise à niveau si aucun produit de remplacement n'est disponible";
    case "ja":
      return "交換用の製品がない場合、アップグレードのためのトレードイン割引を受けることができます";
    default:
      return "Eligible for trade-in discount to upgrade if no exchange product is available";
  }
};

export const translateExchangeOrRepairPolicy = (language: string) => {
  switch (language) {
    case "vi":
      return "Đổi sản phẩm tương đương hoặc miễn phí chi phí sửa chữa nếu có lỗi của NSX khi hết hạn bảo hành trong 12 tháng";
    case "en":
      return "Exchange for an equivalent product or free repair costs if there is a manufacturer defect after the 12-month warranty period";
    case "zh":
      return "如果在12个月保修期后出现制造商缺陷，可以更换等值产品或免收维修费用";
    case "fr":
      return "Échange contre un produit équivalent ou réparation gratuite si un défaut du fabricant survient après la période de garantie de 12 mois";
    case "ja":
      return "12ヶ月の保証期間後に製造業者の欠陥がある場合、同等の製品と交換するか、修理費用が無料となります";
    default:
      return "Exchange for an equivalent product or free repair costs if there is a manufacturer defect after the 12-month warranty period";
  }
};

export const translateWarrantyDefectPolicy = (language: string) => {
  switch (language) {
    case "vi":
      return "12 tháng: Đổi sản phẩm tương đương hoặc miễn phí chi phí sửa chữa nếu có lỗi của NSX khi hết hạn bảo hành trong 12 tháng";
    case "en":
      return "12 months: Exchange for an equivalent product or free repair if there is a manufacturer's defect after the warranty period of 12 months";
    case "zh":
      return "12个月：在12个月保修期过后，如果出现制造商缺陷，可更换为等效产品或免费修理";
    case "fr":
      return "12 mois : Échange contre un produit équivalent ou réparation gratuite en cas de défaut du fabricant après la période de garantie de 12 mois";
    case "ja":
      return "12ヶ月：12ヶ月の保証期間終了後に製造者の欠陥がある場合、同等の製品と交換するか、無料で修理";
    default:
      return "12 months: Exchange for an equivalent product or free repair if there is a manufacturer's defect after the warranty period of 12 months";
  }
};

export const translateApplicableProduct = (language: string) => {
  switch (language) {
    case "vi":
      return "Sản phẩm áp dụng";
    case "en":
      return "Applicable product";
    case "zh":
      return "适用产品";
    case "fr":
      return "Produit applicable";
    case "ja":
      return "適用製品";
    default:
      return "Applicable product";
  }
};

export const translateItems = (language: string) => {
  switch (language) {
    case "vi":
      return "Những đồ điện tử, quạt, có phiếu bảo hành";
    case "en":
      return "Electronic items, fans, with warranty cards";
    case "zh":
      return "电子产品、电风扇，带保修卡";
    case "fr":
      return "Articles électroniques, ventilateurs, avec carte de garantie";
    case "ja":
      return "電子製品、ファン、保証書付き";
    default:
      return "Electronic items, fans, with warranty cards";
  }
};

export const translateTime = (language: string) => {
  switch (language) {
    case "vi":
      return "Thời gian";
    case "en":
      return "Time";
    case "zh":
      return "时间";
    case "fr":
      return "Temps";
    case "ja":
      return "時間";
    default:
      return "Time";
  }
};

export const translateWarrantyDuration = (language: string) => {
  switch (language) {
    case "vi":
      return "24 tháng bao gồm 12 tháng bảo hành từ nhà sản xuất";
    case "en":
      return "24 months, including 12 months warranty from the manufacturer";
    case "zh":
      return "24个月，包括12个月的制造商保修期";
    case "fr":
      return "24 mois, dont 12 mois de garantie du fabricant";
    case "ja":
      return "24ヶ月、そのうち12ヶ月は製造業者の保証が含まれています";
    default:
      return "24 months, including 12 months warranty from the manufacturer";
  }
};

export const translateWarranty = (language: string) => {
  switch (language) {
    case "vi":
      return "24 tháng đến 36 tháng bao gồm 12 tháng bảo hành từ nhà sản xuất";
    case "en":
      return "24 to 36 months including 12 months manufacturer's warranty";
    case "zh":
      return "24个月到36个月，包括12个月的制造商保修";
    case "fr":
      return "De 24 à 36 mois, incluant 12 mois de garantie du fabricant";
    case "ja":
      return "24ヶ月から36ヶ月、製造者の12ヶ月保証を含む";
    default:
      return "24 to 36 months including 12 months manufacturer's warranty";
  }
};

export const translateWarrantyExtension = (language: string) => {
  switch (language) {
    case "vi":
      return "Sau khi hết bảo hành chính hãng, sản phẩm vẫn được tiếp tục bảo hành các lỗi nhà sản xuất, thời gian bảo hành theo gói bảo hành mà khách hàng lựa chọn";
    case "en":
      return "After the manufacturer's warranty expires, the product will still be covered for manufacturer defects, with warranty duration based on the plan chosen by the customer";
    case "zh":
      return "在厂商保修期结束后，产品仍然可以继续保修生产商缺陷，保修期根据客户选择的保修计划";
    case "fr":
      return "Après la fin de la garantie du fabricant, le produit continue d’être couvert pour les défauts de fabrication, la durée de la garantie dépend du plan choisi par le client";
    case "ja":
      return "メーカー保証が終了した後でも、製品は製造者の欠陥に対して引き続き保証され、保証期間はお客様が選んだ保証プランに基づきます";
    default:
      return "After the manufacturer's warranty expires, the product will still be covered for manufacturer defects, with warranty duration based on the plan chosen by the customer";
  }
};

export const translateTradeInOffer = (language: string) => {
  switch (language) {
    case "vi":
      return "Được trợ giá nhập lại sản phẩm bị hỏng để lên đời nếu không có sản phẩm để đổi";
    case "en":
      return "A trade-in subsidy is offered for damaged products to upgrade if there is no product available for exchange";
    case "zh":
      return "如果没有可交换的产品，则提供损坏产品的回收补贴，以便升级";
    case "fr":
      return "Une aide au rachat est offerte pour les produits endommagés afin de les échanger contre un modèle supérieur si aucun produit n’est disponible pour un échange";
    case "ja":
      return "交換する製品がない場合、故障した製品に対してアップグレード用の下取り補助が提供されます";
    default:
      return "A trade-in subsidy is offered for damaged products to upgrade if there is no product available for exchange";
  }
};

export const translateWarrantyConditions = (language: string) => {
  switch (language) {
    case "vi":
      return "Điều kiện bảo hành";
    case "en":
      return "Warranty conditions";
    case "zh":
      return "保修条件";
    case "fr":
      return "Conditions de garantie";
    case "ja":
      return "保証条件";
    default:
      return "Warranty conditions";
  }
};

export const translateWarrantyIssue = (language: string) => {
  switch (language) {
    case "vi":
      return "Sản phẩm bị lỗi do nhà sản xuất khi hết thời gian bảo hành";
    case "en":
      return "Product defects caused by the manufacturer after the warranty period expires";
    case "zh":
      return "产品在保修期结束后由制造商造成的缺陷";
    case "fr":
      return "Défauts du produit causés par le fabricant après l'expiration de la période de garantie";
    case "ja":
      return "保証期間終了後に製造業者によって引き起こされた製品の欠陥";
    default:
      return "Product defects caused by the manufacturer after the warranty period expires";
  }
};

export const translateWarrantyNote = (language: string) => {
  switch (language) {
    case "vi":
      return "Lưu ý: Gói bảo hành 12 tháng không có hiệu lực với các sản phẩm bị biến dạng so với ban đầu (cấn, móp, cong, vênh, nứt,…) và các sản phẩm bị vào nước hoặc đã được sửa chữa";
    case "en":
      return "Note: The 12-month warranty does not apply to products that are deformed compared to the original (dents, bends, warps, cracks, etc.) or products that have been water-damaged or repaired";
    case "zh":
      return "注意：12个月的保修不适用于与原始产品变形的产品（凹痕、弯曲、翘曲、裂纹等）或已进水或已修理的产品";
    case "fr":
      return "Remarque : La garantie de 12 mois ne s'applique pas aux produits déformés par rapport à l'état d'origine (bosses, plis, courbures, fissures, etc.) ni aux produits ayant subi des dommages liés à l'eau ou ayant été réparés";
    case "ja":
      return "注意：12ヶ月保証は、元の状態と比べて変形した製品（へこみ、曲がり、歪み、ひび割れなど）や、水濡れしたり修理された製品には適用されません";
    default:
      return "Note: The 12-month warranty does not apply to products that are deformed compared to the original (dents, bends, warps, cracks, etc.) or products that have been water-damaged or repaired";
  }
};

export const getProcessingTime = (language: string) => {
  switch (language) {
    case "vi":
      return "Thời gian xử lý";
    case "en":
      return "Processing time";
    case "zh":
      return "处理时间";
    case "fr":
      return "Délai de traitement";
    case "ja":
      return "処理時間";
    default:
      return "Processing time";
  }
};

export const translateRepairTime = (language: string) => {
  switch (language) {
    case "vi":
      return "Thời gian sửa chữa từ 7 đến 14 ngày làm việc tùy thuộc vào tình trạng của sản phẩm";
    case "en":
      return "Repair time is from 7 to 14 business days depending on the condition of the product";
    case "zh":
      return "维修时间为7到14个工作日，具体取决于产品的状况";
    case "fr":
      return "Le temps de réparation est de 7 à 14 jours ouvrables, en fonction de l'état du produit";
    case "ja":
      return "修理時間は製品の状態によって7〜14営業日です";
    default:
      return "Repair time is from 7 to 14 business days depending on the condition of the product";
  }
};

export const translateWarrantyLocation = (language: string) => {
  switch (language) {
    case "vi":
      return "Địa điểm kiểm tra lỗi và bảo hành";
    case "en":
      return "Location for defect checking and warranty";
    case "zh":
      return "检查故障和保修地点";
    case "fr":
      return "Lieu de contrôle des défauts et de garantie";
    case "ja":
      return "故障確認および保証の場所";
    default:
      return "Location for defect checking and warranty";
  }
};

export const translateWarrantyCenters = (language: string) => {
  switch (language) {
    case "vi":
      return "Tại các trung tâm bảo hành của nhà sản xuất";
    case "en":
      return "At the manufacturer's warranty centers";
    case "zh":
      return "在制造商的保修中心";
    case "fr":
      return "Dans les centres de garantie du fabricant";
    case "ja":
      return "製造者の保証センターで";
    default:
      return "At the manufacturer's warranty centers";
  }
};

export const translateExchangePolicy = (language: string) => {
  switch (language) {
    case "vi":
      return "Đổi máy mới tương đương khi có lỗi từ NSX trong 12 tháng";
    case "en":
      return "Exchange for an equivalent new device if there is a manufacturer's defect within 12 months";
    case "zh":
      return "在12个月内如果出现制造商的缺陷，则更换为等效的新设备";
    case "fr":
      return "Échange contre un appareil neuf équivalent en cas de défaut du fabricant dans les 12 mois";
    case "ja":
      return "12ヶ月以内に製造者の欠陥があった場合、同等の新しいデバイスに交換";
    default:
      return "Exchange for an equivalent new device if there is a manufacturer's defect within 12 months";
  }
};

export const translateVIPExchangePolicy = (language: string) => {
  switch (language) {
    case "vi":
      return "1 đổi 1 VIP 12 tháng: Đổi sản phẩm mới tương đương khi có lỗi từ NSX trong 12 tháng";
    case "en":
      return "1-to-1 VIP 12 months: Exchange for an equivalent new product if there is a manufacturer's defect within 12 months";
    case "zh":
      return "1对1 VIP 12个月：如果在12个月内出现制造商的缺陷，换取等效的新产品";
    case "fr":
      return "1 échange VIP 12 mois : Échange contre un produit neuf équivalent en cas de défaut du fabricant dans les 12 mois";
    case "ja":
      return "1対1 VIP 12ヶ月：12ヶ月以内に製造者の欠陥があった場合、同等の新しい製品と交換";
    default:
      return "1-to-1 VIP 12 months: Exchange for an equivalent new product if there is a manufacturer's defect within 12 months";
  }
};

export const translateWarrantyPeriod = (language: string) => {
  switch (language) {
    case "vi":
      return "Thời gian bảo hành";
    case "en":
      return "Warranty period";
    case "zh":
      return "保修期";
    case "fr":
      return "Période de garantie";
    case "ja":
      return "保証期間";
    default:
      return "Warranty period";
  }
};

export const translate12Months = (language: string) => {
  switch (language) {
    case "vi":
      return "12 tháng";
    case "en":
      return "12 months";
    case "zh":
      return "12个月";
    case "fr":
      return "12 mois";
    case "ja":
      return "12ヶ月";
    default:
      return "12 months";
  }
};

export const translateFullExchangePolicy = (language: string) => {
  switch (language) {
    case "vi":
      return "Bao test 1 đổi 1 toàn bộ nếu như lỗi";
    case "en":
      return "1-to-1 full exchange if there is a defect";
    case "zh":
      return "如果有缺陷，提供全额1对1更换";
    case "fr":
      return "Échange complet 1 pour 1 en cas de défaut";
    case "ja":
      return "欠陥がある場合、1対1で全品交換";
    default:
      return "1-to-1 full exchange if there is a defect";
  }
};

export const translateExchangeWarrantyProduct = (language: string) => {
  switch (language) {
    case "vi":
      return "Đổi sản phẩm tương đương sản phẩm bảo hành";
    case "en":
      return "Exchange for an equivalent product under warranty";
    case "zh":
      return "更换为等效的保修产品";
    case "fr":
      return "Échanger contre un produit équivalent sous garantie";
    case "ja":
      return "保証対象の同等製品に交換";
    default:
      return "Exchange for an equivalent product under warranty";
  }
};

export const translateManufacturerDefect = (language: string) => {
  switch (language) {
    case "vi":
      return "Sản phẩm bị lỗi do nhà sản xuất";
    case "en":
      return "Product defect due to manufacturer";
    case "zh":
      return "因制造商问题导致的产品故障";
    case "fr":
      return "Défaut du produit dû au fabricant";
    case "ja":
      return "製造者による製品の欠陥";
    default:
      return "Product defect due to manufacturer";
  }
};

export const translateNotWarrantyNote = (language: string) => {
  switch (language) {
    case "vi":
      return "Lưu ý: Gói bảo hành không có hiệu lực với các sản phẩm bị biến dạng so với ban đầu (cấn, móp, cong, vênh, nứt,…) và các sản phẩm bị vào nước hoặc đã được sửa chữa";
    case "en":
      return "Note: The warranty does not apply to products that have been deformed compared to the original condition (dents, bends, cracks, warping, etc.) or products that have been exposed to water or repaired";
    case "zh":
      return "注意：保修不适用于与原始状态发生变形的产品（如凹陷、弯曲、裂缝、翘曲等）或受潮或已修理的产品";
    case "fr":
      return "Note : La garantie ne s'applique pas aux produits déformés par rapport à leur état d'origine (bosses, plis, courbures, fissures, etc.) ou aux produits endommagés par l'eau ou déjà réparés";
    case "ja":
      return "注意：保証は、元の状態と比較して変形した製品（へこみ、歪み、ひび割れ、反りなど）や、水濡れや修理された製品には適用されません";
    default:
      return "Note: The warranty does not apply to products that have been deformed compared to the original condition (dents, bends, cracks, warping, etc.) or products that have been exposed to water or repaired";
  }
};

export const translateProcessingTime = (language: string) => {
  switch (language) {
    case "vi":
      return "Trong vòng 24h và tối đa 14 ngày làm việc tùy thuộc vào tình trạng của sản phẩm";
    case "en":
      return "Within 24 hours and up to 14 working days, depending on the condition of the product";
    case "zh":
      return "在24小时内，最多14个工作日，具体取决于产品的状况";
    case "fr":
      return "Dans les 24 heures et jusqu'à 14 jours ouvrables, selon l'état du produit";
    case "ja":
      return "24時間以内、最大14営業日、製品の状態に応じて";
    default:
      return "Within 24 hours and up to 14 working days, depending on the condition of the product";
  }
};

export const translateSupportPolicy = (language: string) => {
  switch (language) {
    case "vi":
      return "Hỗ trợ 90% chi phí sửa chữa, đổi mới sản phẩm nếu hư hỏng nặng trong 12 tháng";
    case "en":
      return "Support 90% of repair costs or product replacement if severely damaged within 12 months";
    case "zh":
      return "在12个月内，如产品严重损坏，支持90%的维修费用或更换产品";
    case "fr":
      return "Prise en charge de 90 % des frais de réparation ou de remplacement du produit en cas de dommage important dans les 12 mois";
    case "ja":
      return "12ヶ月以内に重大な損傷が発生した場合、修理費または製品交換費の90％をサポート";
    default:
      return "Support 90% of repair costs or product replacement if severely damaged within 12 months";
  }
};

export const translateVipWarrantyBenefits = (language: string) => {
  switch (language) {
    case "vi":
      return "Bao gồm quyền lợi của gói Bảo hành 1 đổi 1 VIP";
    case "en":
      return "Includes benefits of the 1-to-1 VIP Warranty package";
    case "zh":
      return "包含1对1 VIP保修套餐的权益";
    case "fr":
      return "Inclut les avantages du forfait Garantie VIP 1 pour 1";
    case "ja":
      return "1対1 VIP保証パッケージの特典を含む";
    default:
      return "Includes benefits of the 1-to-1 VIP Warranty package";
  }
};

export const translateUnlimitedExchanges = (language: string) => {
  switch (language) {
    case "vi":
      return "Không giới hạn số lần bảo hành đổi máy trong 12 tháng";
    case "en":
      return "Unlimited exchanges under warranty within 12 months";
    case "zh":
      return "12个月内不限次数的保修更换服务";
    case "fr":
      return "Échanges illimités sous garantie pendant 12 mois";
    case "ja":
      return "12ヶ月以内の無制限保証交換";
    default:
      return "Unlimited exchanges under warranty within 12 months";
  }
};

export const translateExchangeForIrreparable = (language: string) => {
  switch (language) {
    case "vi":
      return "Được đổi sản phẩm tương đương nếu máy hư hỏng nặng không sửa chữa được";
    case "en":
      return "Eligible for an equivalent product exchange if the device is severely damaged and cannot be repaired";
    case "zh":
      return "如果设备严重损坏且无法修复，可更换为等效产品";
    case "fr":
      return "Éligible à un échange pour un produit équivalent si l'appareil est gravement endommagé et irréparable";
    case "ja":
      return "修理不能な重大な損傷が発生した場合、同等製品への交換が可能";
    default:
      return "Eligible for an equivalent product exchange if the device is severely damaged and cannot be repaired";
  }
};

export const translateUpgradeSupport = (language: string) => {
  switch (language) {
    case "vi":
      return "Được trợ giá nhập lại sản phẩm bị hỏng để lên đời nếu không có sản phẩm để đổi";
    case "en":
      return "Eligible for trade-in support on damaged products to upgrade if no replacement product is available";
    case "zh":
      return "如无可更换产品，可通过回购受损产品获得升级支持";
    case "fr":
      return "Éligible au soutien pour la reprise des produits endommagés afin de passer à un modèle supérieur en cas d'absence de produit de remplacement";
    case "ja":
      return "交換可能な製品がない場合、損傷した製品の下取りサポートでアップグレード可能";
    default:
      return "Eligible for trade-in support on damaged products to upgrade if no replacement product is available";
  }
};

export const translateWarrantyFund = (language: string) => {
  switch (language) {
    case "vi":
      return "Quỹ bảo hành sửa chữa tính trên giá niêm yết sản phẩm";
    case "en":
      return "The warranty repair fund is calculated based on the listed price of the product";
    case "zh":
      return "保修维修基金按产品标价计算";
    case "fr":
      return "Le fonds de garantie pour les réparations est calculé sur la base du prix affiché du produit";
    case "ja":
      return "保証修理基金は製品の表示価格に基づいて計算されます";
    default:
      return "The warranty repair fund is calculated based on the listed price of the product";
  }
};

export const translateDamageExclusions = (language: string) => {
  switch (language) {
    case "vi":
      return "Sản phẩm bị tác động của ngoại lực gây vỡ hoặc bị ngấm nước, ngấm các chất lỏng khác dẫn đến sản phẩm không hoạt động bình thường";
    case "en":
      return "The product is damaged by external forces causing breakage or is exposed to water or other liquids, resulting in malfunction";
    case "zh":
      return "产品因外力导致破裂，或因接触水或其他液体而无法正常工作";
    case "fr":
      return "Le produit est endommagé par des forces externes provoquant une casse ou exposé à de l'eau ou d'autres liquides, entraînant un dysfonctionnement";
    case "ja":
      return "製品が外部からの衝撃で破損したり、水や他の液体に浸かることで正常に動作しなくなった場合";
    default:
      return "The product is damaged by external forces causing breakage or is exposed to water or other liquids, resulting in malfunction";
  }
};

export const translateVipWarrantyExclusions = (language: string) => {
  switch (language) {
    case "vi":
      return "Lưu ý: Gói bảo hành VIP 1 đổi 1 không có hiệu lực với các sản phẩm bị biến dạng so với ban đầu (cấn, móp, cong, vênh, nứt,…) và các sản phẩm bị vào nước hoặc đã được sửa chữa";
    case "en":
      return "Note: The VIP 1-to-1 Warranty package is not valid for products that are deformed (dents, bends, warping, cracks, etc.) or exposed to water or have been repaired";
    case "zh":
      return "注意：VIP 1对1保修套餐不适用于变形（凹陷、弯曲、翘曲、裂缝等）的产品或进水或已修复的产品";
    case "fr":
      return "Remarque : Le forfait de garantie VIP 1 pour 1 n'est pas valable pour les produits déformés (bosses, plis, déformations, fissures, etc.) ou exposés à l'eau ou déjà réparés";
    case "ja":
      return "注意: VIP 1対1保証パッケージは、変形した製品（へこみ、曲がり、反り、ひびなど）、水没した製品、または修理済みの製品には適用されません";
    default:
      return "Note: The VIP 1-to-1 Warranty package is not valid for products that are deformed (dents, bends, warping, cracks, etc.) or exposed to water or have been repaired";
  }
};

export const translateRepairTimes = (language: string) => {
  switch (language) {
    case "vi":
      return "Thời gian sửa chữa từ 7 đến 14 ngày làm việc tùy thuộc vào tình trạng của sản phẩm";
    case "en":
      return "Repair time ranges from 7 to 14 business days depending on the condition of the product";
    case "zh":
      return "维修时间为7至14个工作日，具体取决于产品的状况";
    case "fr":
      return "Le temps de réparation varie de 7 à 14 jours ouvrables en fonction de l'état du produit";
    case "ja":
      return "修理期間は製品の状態に応じて7〜14営業日です";
    default:
      return "Repair time ranges from 7 to 14 business days depending on the condition of the product";
  }
};

export const translateExchangePolicy6Month = (language: string) => {
  switch (language) {
    case "vi":
      return "Đổi máy mới tương đương khi có lỗi từ NSX trong 6 tháng";
    case "en":
      return "Exchange for a new equivalent device in case of manufacturer defects within 6 months";
    case "zh":
      return "在6个月内因制造商缺陷可更换为新设备";
    case "fr":
      return "Échange pour un nouvel appareil équivalent en cas de défaut du fabricant dans un délai de 6 mois";
    case "ja":
      return "製造元の欠陥がある場合、6ヶ月以内に同等の新しいデバイスと交換";
    default:
      return "Exchange for a new equivalent device in case of manufacturer defects within 6 months";
  }
};

export const translate6Months = (language: string) => {
  switch (language) {
    case "vi":
      return "6 tháng";
    case "en":
      return "6 months";
    case "zh":
      return "6个月";
    case "fr":
      return "6 mois";
    case "ja":
      return "6ヶ月";
    default:
      return "6 months";
  }
};

export const translateTestPolicy = (language: string) => {
  switch (language) {
    case "vi":
      return "Bao test 1 đổi 1 toàn bộ linh kiện";
    case "en":
      return "Full component 1-to-1 exchange warranty";
    case "zh":
      return "全组件1对1更换保修";
    case "fr":
      return "Garantie d'échange 1 pour 1 pour tous les composants";
    case "ja":
      return "全ての部品の1対1交換保証";
    default:
      return "Full component 1-to-1 exchange warranty";
  }
};

export const translateUnlimitedWarrantyPolicy = (language: string) => {
  switch (language) {
    case "vi":
      return "Không giới hạn số lần bảo hành đổi máy nếu phát sinh lỗi (trong phạm vi bảo hành) trong thời gian tham gia";
    case "en":
      return "No limit on the number of exchanges under warranty if defects occur (within the warranty coverage) during the participation period";
    case "zh":
      return "在参与期间，如果发生故障（在保修范围内），更换次数不限";
    case "fr":
      return "Pas de limite sur le nombre d'échanges sous garantie si des défauts surviennent (dans la couverture de la garantie) pendant la période de participation";
    case "ja":
      return "参加期間中に故障が発生した場合（保証範囲内）、交換回数に制限はありません";
    default:
      return "No limit on the number of exchanges under warranty if defects occur (within the warranty coverage) during the participation period";
  }
};

export const translateExchangeWarrantyProduct6Month = (language: string) => {
  switch (language) {
    case "vi":
      return "Đổi máy tương đương sản phẩm bảo hành";
    case "en":
      return "Exchange for an equivalent product under warranty";
    case "zh":
      return "更换为同等产品在保修期内";
    case "fr":
      return "Échange contre un produit équivalent sous garantie";
    case "ja":
      return "保証内で同等の製品と交換";
    default:
      return "Exchange for an equivalent product under warranty";
  }
};

export const translateWarrantyExclusionNote = (language: string) => {
  switch (language) {
    case "vi":
      return "Lưu ý: Gói bảo hành không có hiệu lực với các sản phẩm bị biến dạng so với ban đầu (cấn, móp, cong, vênh, nứt,…) và các sản phẩm bị vào nước hoặc đã được sửa chữa";
    case "en":
      return "Note: The warranty does not apply to products that have been deformed from the original condition (dents, bends, cracks, warps, etc.) or products that have been exposed to water or repaired";
    case "zh":
      return "注意：保修不适用于外观变形（凹痕、弯曲、裂缝、翘曲等）或受潮或已修理的产品";
    case "fr":
      return "Remarque : La garantie ne s'applique pas aux produits ayant subi des déformations par rapport à l'état initial (bosses, déformations, fissures, etc.) ou aux produits ayant été exposés à l'eau ou réparés";
    case "ja":
      return "注意：保証は、元の状態から変形した製品（へこみ、曲がり、ひび割れ、歪みなど）や、水に浸ったり修理された製品には適用されません";
    default:
      return "Note: The warranty does not apply to products that have been deformed from the original condition (dents, bends, cracks, warps, etc.) or products that have been exposed to water or repaired";
  }
};

export const translateKeyFeatures = (language: string) => {
  switch (language) {
    case "vi":
      return "Đặc điểm nổi bật";
    case "en":
      return "Key Features";
    case "zh":
      return "主要特点";
    case "fr":
      return "Caractéristiques principales";
    case "ja":
      return "主な特徴";
    default:
      return "Key Features";
  }
};

export const translateProductNewFeatures = (language: string, name: string) => {
  switch (language) {
    case "vi":
      return `Sản phẩm ${name} có gì mới ?`;
    case "en":
      return `What's new in the product ${name}?`;
    case "zh":
      return `${name} 产品有什么新特点吗？`;
    case "fr":
      return `Quoi de neuf dans le produit ${name} ?`;
    case "ja":
      return `${name} の新しい機能は何ですか？`;
    default:
      return `What's new in the product ${name}?`;
  }
};

export const translateProductQuantityError = (language: string) => {
  switch (language) {
    case "vi":
      return "Không tìm thấy số lượng của sản phẩm!";
    case "en":
      return "Product quantity not found!";
    case "zh":
      return "未找到产品数量!";
    case "fr":
      return "Quantité du produit non trouvée!";
    case "ja":
      return "製品の数量が見つかりません！";
    default:
      return "Product quantity not found!";
  }
};

export const translateOutOfStockCartError = (language: string) => {
  switch (language) {
    case "vi":
      return "Chúng tôi sẽ không thêm sản phẩm đã hết vào giỏ hàng!";
    case "en":
      return "We will not add out-of-stock products to the cart!";
    case "zh":
      return "我们不会将缺货的产品添加到购物车！";
    case "fr":
      return "Nous ne rajouterons pas les produits en rupture de stock dans le panier !";
    case "ja":
      return "在庫切れの商品はカートに追加しません！";
    default:
      return "We will not add out-of-stock products to the cart!";
  }
};

export const translateAddProduct = (language: string) => {
  switch (language) {
    case "vi":
      return "Thêm sản phẩm";
    case "en":
      return "Add product";
    case "zh":
      return "添加产品";
    case "fr":
      return "Ajouter un produit";
    case "ja":
      return "製品を追加";
    default:
      return "Add product";
  }
};

export const translateAgree = (language: string) => {
  switch (language) {
    case "vi":
      return "Đồng ý";
    case "en":
      return "Agree";
    case "zh":
      return "同意";
    case "fr":
      return "Accepter";
    case "ja":
      return "同意";
    default:
      return "Agree";
  }
};

export const translateReceiveAt = (language: string) => {
  switch (language) {
    case "vi":
      return "Nhận hàng tại";
    case "en":
      return "Receive at";
    case "zh":
      return "收货地点";
    case "fr":
      return "Réceptionner à";
    case "ja":
      return "受け取り場所";
    default:
      return "Receive at";
  }
};

export const translateInvoice = (language: string) => {
  switch (language) {
    case "vi":
      return "Hóa đơn thanh toán";
    case "en":
      return "Invoice";
    case "zh":
      return "支付账单";
    case "fr":
      return "Facture";
    case "ja":
      return "請求書";
    default:
      return "Invoice";
  }
};

export const translateCheckBeforeTurningOff = (language: string) => {
  switch (language) {
    case "vi":
      return "Kiểm tra trước khi tắt!";
    case "en":
      return "Check before turning off!";
    case "zh":
      return "关机前检查！";
    case "fr":
      return "Vérifiez avant d'éteindre !";
    case "ja":
      return "シャットダウン前に確認してください！";
    default:
      return "Check before turning off!";
  }
};

export const translateCustomerName = (language: string) => {
  switch (language) {
    case "vi":
      return "Tên khách hàng";
    case "en":
      return "Customer name";
    case "zh":
      return "客户姓名";
    case "fr":
      return "Nom du client";
    case "ja":
      return "顧客名";
    default:
      return "Customer name";
  }
};

export const translateOrderCreatedDate = (language: string) => {
  switch (language) {
    case "vi":
      return "Đơn hàng tạo ngày";
    case "en":
      return "Order created on";
    case "zh":
      return "订单创建日期";
    case "fr":
      return "Commande créée le";
    case "ja":
      return "注文作成日";
    default:
      return "Order created on";
  }
};

export const translateWhenYouClick = (language: string) => {
  switch (language) {
    case "vi":
      return "Khi bạn click vào";
    case "en":
      return "When you click on";
    case "zh":
      return "当你点击时";
    case "fr":
      return "Lorsque vous cliquez sur";
    case "ja":
      return "クリックすると";
    default:
      return "When you click on";
  }
};

export const translateTrackProduct = (language: string) => {
  switch (language) {
    case "vi":
      return "THEO DÕI SẢN PHẨM";
    case "en":
      return "TRACK PRODUCT";
    case "zh":
      return "跟踪产品";
    case "fr":
      return "SUIVRE LE PRODUIT";
    case "ja":
      return "製品を追跡";
    default:
      return "TRACK PRODUCT";
  }
};

export const translateAutoCopyOrderCode = (language: string) => {
  switch (language) {
    case "vi":
      return "sẽ tự động copy mã đơn hàng. khi chuyển tới trang xem quá trình vận chuyển, hãy";
    case "en":
      return "the order code will be automatically copied. when you go to the tracking page, please";
    case "zh":
      return "订单编号将自动复制。转到运输过程页面时，请";
    case "fr":
      return "le code de commande sera automatiquement copié. lorsque vous accédez à la page de suivi, veuillez";
    case "ja":
      return "注文コードは自動的にコピーされます。配送状況ページに移動するときは、";
    default:
      return "the order code will be automatically copied. when you go to the tracking page, please";
  }
};

export const translateSearchExit = (language: string) => {
  switch (language) {
    case "vi":
      return "vào ô tìm kiếm. nếu bạn không cần hãy click vào exit để thoát.";
    case "en":
      return "go to the search box. if you don't need it, click on exit to exit.";
    case "zh":
      return "进入搜索框。如果您不需要，点击退出以退出。";
    case "fr":
      return "allez à la barre de recherche. si vous n'en avez pas besoin, cliquez sur exit pour quitter.";
    case "ja":
      return "検索ボックスに移動します。必要ない場合は、exitをクリックして終了します。";
    default:
      return "go to the search box. if you don't need it, click on exit to exit.";
  }
};

export const translatePasteUpperCase = (language: string) => {
  switch (language) {
    case "vi":
      return "DÁN";
    case "en":
      return "PASTE";
    case "zh":
      return "粘贴";
    case "fr":
      return "COLLER";
    case "ja":
      return "貼り付け";
    default:
      return "PASTE";
  }
};

export const translateOrderReturnSuccess = (language: string) => {
  switch (language) {
    case "vi":
      return "Đơn hàng đã gửi trả thành công!";
    case "en":
      return "The order has been successfully returned!";
    case "zh":
      return "订单已成功退回！";
    case "fr":
      return "La commande a été retournée avec succès !";
    case "ja":
      return "注文は正常に返送されました！";
    default:
      return "The order has been successfully returned!";
  }
};

export const translateReturnProductInfo = (language: string) => {
  switch (language) {
    case "vi":
      return "Thông tin sản phẩm trả hàng đã được gửi đến cửa hàng. Bạn chờ trong 1 ngày để shipper đến nhận. Nếu chưa được phản hồi liên hệ";
    case "en":
      return "Return info sent to store. Wait 1 day for pickup. If no response, contact us.";
    case "zh":
      return "退货产品信息已发送到商店。请等待一天，等快递员来取货。如果没有收到回复，请联系。";
    case "fr":
      return "Informations de retour envoyées au magasin. Attendez 1 jour pour la collecte. Si pas de réponse, contactez-nous.";
    case "ja":
      return "返品製品の情報は店舗に送信されました。1日以内に配達員が取りに来るのをお待ちください。返答がない場合は、連絡してください。";
    default:
      return "Return info sent to store. Wait 1 day for pickup. If no response, contact us.";
  }
};

export const translateProductImage = (language: string) => {
  switch (language) {
    case "vi":
      return "Hình ảnh sản phẩm";
    case "en":
      return "Product Image";
    case "zh":
      return "产品图片";
    case "fr":
      return "Image du produit";
    case "ja":
      return "製品画像";
    default:
      return "Product Image";
  }
};

export const translateCaptureProductImages = (
  language: string,
  limit: number
) => {
  switch (language) {
    case "vi":
      return `Hãy chụp ${limit} ảnh sản phẩm bị lỗi`;
    case "en":
      return `Please take ${limit} pictures of the defective product`;
    case "zh":
      return `请拍摄 ${limit} 张有缺陷的产品照片`;
    case "fr":
      return `Veuillez prendre ${limit} photos du produit défectueux`;
    case "ja":
      return `${limit} 枚の不良製品の写真を撮ってください`;
    default:
      return `Please take ${limit} pictures of the defective product`;
  }
};

export const translateSelectClearProductImages = (
  language: string,
  limit: number
) => {
  switch (language) {
    case "vi":
      return `Chỉ chọn ${limit} ảnh sản phẩm rõ nét.`;
    case "en":
      return `Select only ${limit} clear product images.`;
    case "zh":
      return `请选择 ${limit} 张清晰的产品图片。`;
    case "fr":
      return `Sélectionnez seulement ${limit} images claires du produit.`;
    case "ja":
      return `${limit} 枚の鮮明な製品画像のみを選択してください。`;
    default:
      return `Select only ${limit} clear product images.`;
  }
};

export const translateReturnProductDescription = (language: string) => {
  switch (language) {
    case "vi":
      return "Mô tả chi tiết trả hàng";
    case "en":
      return "Detailed return description";
    case "zh":
      return "退货详细说明";
    case "fr":
      return "Description détaillée du retour";
    case "ja":
      return "返品の詳細説明";
    default:
      return "Detailed return description";
  }
};

export const translateShortReturnProductDescription = (language: string) => {
  switch (language) {
    case "vi":
      return "Mô tả ngắn về sản phẩm bị trả";
    case "en":
      return "Short description of the returned product";
    case "zh":
      return "退货产品的简短描述";
    case "fr":
      return "Description courte du produit retourné";
    case "ja":
      return "返品された製品の簡単な説明";
    default:
      return "Short description of the returned product";
  }
};

export const translateEnterReturnDescription = (language: string) => {
  switch (language) {
    case "vi":
      return "Nhập mô tả chi tiết trả hàng...";
    case "en":
      return "Enter detailed return description...";
    case "zh":
      return "请输入退货详细说明...";
    case "fr":
      return "Entrez la description détaillée du retour...";
    case "ja":
      return "返品の詳細説明を入力してください...";
    default:
      return "Enter detailed return description...";
  }
};

export const translateCharCount = (language: string, char: number) => {
  switch (language) {
    case "vi":
      return `${char} ký tự`;
    case "en":
      return `${char} characters`;
    case "zh":
      return `${char} 个字符`;
    case "fr":
      return `${char} caractères`;
    case "ja":
      return `${char} 文字`;
    default:
      return `${char} characters`;
  }
};

export const translateProductReview = (language: string) => {
  switch (language) {
    case "vi":
      return "Đánh giá sản phẩm";
    case "en":
      return "Product Review";
    case "zh":
      return "产品评价";
    case "fr":
      return "Avis sur le produit";
    case "ja":
      return "製品レビュー";
    default:
      return "Product Review";
  }
};

export const translateThankYouForReview = (language: string) => {
  switch (language) {
    case "vi":
      return "Cảm ơn bạn đã đánh giá cho cửa hàng của chúng tôi!";
    case "en":
      return "Thank you for your review of our store!";
    case "zh":
      return "感谢您对我们店铺的评价！";
    case "fr":
      return "Merci pour votre évaluation de notre magasin !";
    case "ja":
      return "当店のレビューをありがとうございます！";
    default:
      return "Thank you for your review of our store!";
  }
};

export const translateProductNotExist = (language: string) => {
  switch (language) {
    case "vi":
      return "Sản phẩm không tồn tại.";
    case "en":
      return "Product does not exist.";
    case "zh":
      return "产品不存在。";
    case "fr":
      return "Le produit n'existe pas.";
    case "ja":
      return "製品は存在しません。";
    default:
      return "Product does not exist.";
  }
};

export const translateReviewed = (language: string) => {
  switch (language) {
    case "vi":
      return "Đã đánh giá";
    case "en":
      return "Reviewed";
    case "zh":
      return "已评价";
    case "fr":
      return "Évalué";
    case "ja":
      return "評価済み";
    default:
      return "Reviewed";
  }
};

export const translateEnterContent = (language: string) => {
  switch (language) {
    case "vi":
      return "Nhập nội dung........";
    case "en":
      return "Enter content........";
    case "zh":
      return "请输入内容........";
    case "fr":
      return "Entrez le contenu........";
    case "ja":
      return "内容を入力........";
    default:
      return "Enter content........";
  }
};

export const translateOnlinePaymentNotification = (language: string) => {
  switch (language) {
    case "vi":
      return "Thông báo thanh toán online!";
    case "en":
      return "Online payment notification!";
    case "zh":
      return "在线支付通知!";
    case "fr":
      return "Notification de paiement en ligne!";
    case "ja":
      return "オンライン決済通知!";
    default:
      return "Online payment notification!";
  }
};

export const translateAmountNotSufficient = (language: string) => {
  switch (language) {
    case "vi":
      return "Số tiền không đáp ứng nhu cầu";
    case "en":
      return "The amount does not meet the requirements";
    case "zh":
      return "金额不符合要求";
    case "fr":
      return "Le montant ne répond pas aux exigences";
    case "ja":
      return "金額が要求を満たしていません";
    default:
      return "The amount does not meet the requirements";
  }
};

export const translateAmountTooLow = (language: string) => {
  switch (language) {
    case "vi":
      return "Số tiền cần thanh toán của quý khách quá thấp để thanh toán, quý khách có thể liên hệ";
    case "en":
      return "The amount you need to pay is too low to proceed. You can contact us.";
    case "zh":
      return "您需要支付的金额太低，无法继续付款，您可以联系我们。";
    case "fr":
      return "Le montant que vous devez payer est trop bas pour procéder. Vous pouvez nous contacter.";
    case "ja":
      return "お支払いの必要な金額が低すぎて、処理を進めることができません。ご連絡ください。";
    default:
      return "The amount you need to pay is too low to proceed. You can contact us.";
  }
};

export const translateDirectPaymentConsultation = (language: string) => {
  switch (language) {
    case "vi":
      return "tư vấn để được thanh toán trực tiếp";
    case "en":
      return "consult to make direct payment";
    case "zh":
      return "咨询以进行直接支付";
    case "fr":
      return "consultez pour effectuer un paiement direct";
    case "ja":
      return "直接支払いのために相談してください";
    default:
      return "consult to make direct payment";
  }
};

export const translateLuckyWheelNotification = (language: string) => {
  switch (language) {
    case "vi":
      return "Thông báo vòng quay trúng thưởng!";
    case "en":
      return "Lucky wheel prize notification!";
    case "zh":
      return "幸运轮奖品通知！";
    case "fr":
      return "Notification du tour de roue gagnant !";
    case "ja":
      return "ラッキーウィールの賞品通知！";
    default:
      return "Lucky wheel prize notification!";
  }
};

export const translateInsufficientSpins = (language: string) => {
  switch (language) {
    case "vi":
      return "Số vòng quay không đủ.";
    case "en":
      return "Insufficient spins.";
    case "zh":
      return "旋转次数不足。";
    case "fr":
      return "Nombre de tours insuffisant.";
    case "ja":
      return "回転数が不足しています。";
    default:
      return "Insufficient spins.";
  }
};

export const translateInsufficientSpinsDetails = (language: string) => {
  switch (language) {
    case "vi":
      return "Số vòng quay của quý khách không đủ để thực hiện vòng quay. Nếu muốn có thêm vòng quay quý khách có thể mua sắm để được tặng vòng quay may mắn. Vui chơi có thưởng.";
    case "en":
      return "Your spins are insufficient to perform the spin. If you want more spins, you can shop to receive a lucky spin. Play and win prizes!";
    case "zh":
      return "您的旋转次数不足以执行旋转。如果您想要更多的旋转次数，可以购物以获得幸运旋转。玩得开心并赢得奖品！";
    case "fr":
      return "Le nombre de vos tours est insuffisant pour effectuer le tour. Si vous souhaitez plus de tours, vous pouvez faire des achats pour recevoir un tour de chance. Jouez et gagnez des prix !";
    case "ja":
      return "あなたの回転数では回転を実行することができません。もっと回転したい場合は、買い物をしてラッキー回転を受け取ることができます。遊んで賞品をゲット！";
    default:
      return "Your spins are insufficient to perform the spin. If you want more spins, you can shop to receive a lucky spin. Play and win prizes!";
  }
};

export const translateHomepage = (language: string) => {
  switch (language) {
    case "vi":
      return "Trang chủ";
    case "en":
      return "Homepage";
    case "zh":
      return "主页";
    case "fr":
      return "Accueil";
    case "ja":
      return "ホームページ";
    default:
      return "Homepage";
  }
};

export const translateList = (language: string) => {
  switch (language) {
    case "vi":
      return "Danh sách";
    case "en":
      return "List";
    case "zh":
      return "列表";
    case "fr":
      return "Liste";
    case "ja":
      return "リスト";
    default:
      return "List";
  }
};

export const translateHeart = (language: string) => {
  switch (language) {
    case "vi":
      return "Thả tim";
    case "en":
      return "Heart";
    case "zh":
      return "点赞";
    case "fr":
      return "Cœur";
    case "ja":
      return "ハート";
    default:
      return "Heart";
  }
};

export const translateVoucher = (language: string) => {
  switch (language) {
    case "vi":
      return "Voucher";
    case "en":
      return "Voucher";
    case "zh":
      return "代金券";
    case "fr":
      return "Bon";
    case "ja":
      return "クーポン";
    default:
      return "Voucher";
  }
};

export const translateOrder = (language: string) => {
  switch (language) {
    case "vi":
      return "Đơn hàng";
    case "en":
      return "Order";
    case "zh":
      return "订单";
    case "fr":
      return "Commande";
    case "ja":
      return "注文";
    default:
      return "Order"; // Default is English
  }
};

export const translateTotalCoins = (language: string) => {
  switch (language) {
    case "vi":
      return "Tổng xu";
    case "en":
      return "Total Coins";
    case "zh":
      return "总金币";
    case "fr":
      return "Total Pièces";
    case "ja":
      return "総コイン";
    default:
      return "Total Coins"; // Default is English
  }
};

export const translateShopping = (language: string) => {
  switch (language) {
    case "vi":
      return "Mua sắm thỏa ga";
    case "en":
      return "Shop to your heart's content";
    case "zh":
      return "尽情购物";
    case "fr":
      return "Faites du shopping à volonté";
    case "ja":
      return "思う存分買い物";
    default:
      return "Shop to your heart's content"; // Default is English
  }
};

export const translateShoppingDiscount = (language: string) => {
  switch (language) {
    case "vi":
      return "Việc mua sắm sẽ tiết kiệm nhiều chi phí được giảm giá qua từng khung giờ.";
    case "en":
      return "Shopping will save you a lot of costs with discounts available at different times.";
    case "zh":
      return "购物将在不同的时间段通过折扣为您节省大量费用。";
    case "fr":
      return "Le shopping vous permettra d'économiser beaucoup sur les coûts grâce aux réductions disponibles à différentes heures.";
    case "ja":
      return "ショッピングは、時間帯ごとの割引で多くの費用を節約できます。";
    default:
      return "Shopping will save you a lot of costs with discounts available at different times."; // Default is English
  }
};

export const translateSpinAndLuck = (language: string) => {
  switch (language) {
    case "vi":
      return { name: "Vòng quay", name1: "may mắn" };
    case "en":
      return { name: "Spin", name1: "Good Luck" };
    case "zh":
      return { name: "旋转", name1: "好运" };
    case "fr":
      return { name: "Rotation", name1: "Bonne chance" };
    case "ja":
      return { name: "スピン", name1: "幸運" };
    default:
      return { name: "Spin", name1: "Good Luck" };
  }
};

export const translateDiscountAndSuperShocking = (language: string) => {
  switch (language) {
    case "vi":
      return { name: "Mã giảm giá", name2: "siêu sốc" };
    case "en":
      return { name: "Discount Code", name2: "Super Shocking" };
    case "zh":
      return { name: "优惠码", name2: "超级震撼" };
    case "fr":
      return { name: "Code promo", name2: "Super choqué" };
    case "ja":
      return { name: "割引コード", name2: "スーパーショック" };
    default:
      return { name: "Discount Code", name2: "Super Shocking" };
  }
};

export const translateGamesAndEntertainment = (language: string) => {
  switch (language) {
    case "vi":
      return { name: "Trò chơi", name2: "giải trí" }; // "Giải trí" viết thường
    case "en":
      return { name: "Game", name2: "Entertain" };
    case "zh":
      return { name: "游戏", name2: "娱乐" };
    case "fr":
      return { name: "Jeu", name2: "Divertir" };
    case "ja":
      return { name: "トロ", name2: "チョイ" };
    default:
      return { name: "Games", name2: "Entertainment" };
  }
};

export const translateThrowAndHeart = (language: string) => {
  switch (language) {
    case "vi":
      return { name: "Thả", name2: "Tim" };
    case "en":
      return { name: "Throw", name2: "Heart" };
    case "zh":
      return { name: "投", name2: "心" };
    case "fr":
      return { name: "Lancer", name2: "Cœur" };
    case "ja":
      return { name: "投げる", name2: "ハート" };
    default:
      return { name: "Throw", name2: "Heart" };
  }
};

export const translateBasketAndGoods = (language: string) => {
  switch (language) {
    case "vi":
      return { name: "Giỏ", name2: "hàng" };
    case "en":
      return { name: "Basket", name2: "Goods" };
    case "zh":
      return { name: "购物篮", name2: "商品" };
    case "fr":
      return { name: "Panier", name2: "Produits" };
    case "ja":
      return { name: "バスケット", name2: "商品" };
    default:
      return { name: "Basket", name2: "Goods" };
  }
};

export const translateConvenience = (language: string) => {
  switch (language) {
    case "vi":
      return { name: "Tiện", name2: "ích" };
    case "en":
      return { name: "Convenience", name2: "Service" }; // "Service" là từ bổ sung nếu bạn muốn chia ra
    case "zh":
      return { name: "方便", name2: "服务" }; // Dùng từ "Service" bổ sung
    case "fr":
      return { name: "Commodité", name2: "Service" }; // Dùng từ "Service" bổ sung
    case "ja":
      return { name: "便利", name2: "サービス" }; // Dùng từ "Service" bổ sung
    default:
      return { name: "Convenience", name2: "Service" };
  }
};

export const translateRegister = (language: string) => {
  switch (language) {
    case "vi":
      return "Đăng ký";
    case "en":
      return "Register";
    case "zh":
      return "注册";
    case "fr":
      return "S'inscrire";
    case "ja":
      return "登録";
    default:
      return "Register"; // Default is English
  }
};

export const translateSearchProduct = (language: string) => {
  switch (language) {
    case "vi":
      return "Tìm sản phẩm...";
    case "en":
      return "Search Product...";
    case "zh":
      return "搜索产品...";
    case "fr":
      return "Rechercher un produit...";
    case "ja":
      return "商品を検索...";
    default:
      return "Search Product...";
  }
};

export const translateEnterSearchContent = (language: string) => {
  switch (language) {
    case "vi":
      return "Hãy nhập nội dung tìm kiếm!";
    case "en":
      return "Please enter the search content!";
    case "zh":
      return "请输入搜索内容！";
    case "fr":
      return "Veuillez entrer le contenu de la recherche!";
    case "ja":
      return "検索内容を入力してください！";
    default:
      return "Please enter the search content!";
  }
};

export const translateRelatedTagBongden = (language: string) => {
  switch (language) {
    case "vi":
      return {
        name: "Điện quang Bulb 40W",
        name2: "Bàn học",
        name3: "MPE Bulb 40W",
        name4: "Rạng Đông 1m2",
        name5: "Bóng chữ u",
        name6: "Bóng cà na",
        name7: "Xem tất cả",
      };
    case "en":
      return {
        name: "Dien Quang Bulb 40W",
        name2: "Study Table",
        name3: "MPE Bulb 40W",
        name4: "Rang Dong 1m2",
        name5: "U-shaped Bulb",
        name6: "Cana Bulb",
        name7: "See All",
      };
    case "zh":
      return {
        name: "电光灯泡40W",
        name2: "书桌",
        name3: "MPE灯泡40W",
        name4: "长东1m2",
        name5: "U形灯泡",
        name6: "加那灯泡",
        name7: "查看所有",
      };
    case "fr":
      return {
        name: "Ampoule Dien Quang 40W",
        name2: "Table d'étude",
        name3: "Ampoule MPE 40W",
        name4: "Rang Dong 1m2",
        name5: "Ampoule en forme de U",
        name6: "Ampoule Cana",
        name7: "Voir tout",
      };
    case "ja":
      return {
        name: "ディエンクワン40W電球",
        name2: "学習机",
        name3: "MPE40W電球",
        name4: "ランドン1m2",
        name5: "U字型電球",
        name6: "カナ電球",
        name7: "すべてを見る",
      };
    default:
      return {
        name: "Dien Quang Bulb 40W",
        name2: "Study Table",
        name3: "MPE Bulb 40W",
        name4: "Rang Dong 1m2",
        name5: "U-shaped Bulb",
        name6: "Cana Bulb",
        name7: "See All",
      };
  }
};

export const translateRelatedTagDaCat = (language: string) => {
  switch (language) {
    case "vi":
      return {
        name: "Đá cắt gạch",
        name2: "Đá cắt gỗ",
        name3: "Đá cắt đa năng",
        name4: "Xem tất cả",
      };
    case "en":
      return {
        name: "Tile Cutting Stone",
        name2: "Wood Cutting Stone",
        name3: "Multi-purpose Cutting Stone",
        name4: "See All",
      };
    case "zh":
      return {
        name: "切割瓷砖石",
        name2: "切割木材石",
        name3: "多功能切割石",
        name4: "查看所有",
      };
    case "fr":
      return {
        name: "Pierre de coupe de carreaux",
        name2: "Pierre de coupe de bois",
        name3: "Pierre de coupe polyvalente",
        name4: "Voir tout",
      };
    case "ja":
      return {
        name: "タイルカッティングストーン",
        name2: "木材カッティングストーン",
        name3: "多目的カッティングストーン",
        name4: "すべて見る",
      };
    default:
      return {
        name: "Tile Cutting Stone",
        name2: "Wood Cutting Stone",
        name3: "Multi-purpose Cutting Stone",
        name4: "See All",
      };
  }
};

export const translateRelatedTagDayDien = (language: string) => {
  switch (language) {
    case "vi":
      return {
        name: "Daphaco 1.5",
        name2: "Daphoco 2.5",
        name3: "Cadivi 1.5",
        name4: "Cadivi 2.5",
        name5: "Daphaco 4.0",
        name6: "Xem tất cả",
      };
    case "en":
      return {
        name: "Daphaco 1.5",
        name2: "Daphoco 2.5",
        name3: "Cadivi 1.5",
        name4: "Cadivi 2.5",
        name5: "Daphaco 4.0",
        name6: "See All",
      };
    case "zh":
      return {
        name: "Daphaco 1.5",
        name2: "Daphoco 2.5",
        name3: "Cadivi 1.5",
        name4: "Cadivi 2.5",
        name5: "Daphaco 4.0",
        name6: "查看所有",
      };
    case "fr":
      return {
        name: "Daphaco 1.5",
        name2: "Daphoco 2.5",
        name3: "Cadivi 1.5",
        name4: "Cadivi 2.5",
        name5: "Daphaco 4.0",
        name6: "Voir tout",
      };
    case "ja":
      return {
        name: "Daphaco 1.5",
        name2: "Daphoco 2.5",
        name3: "Cadivi 1.5",
        name4: "Cadivi 2.5",
        name5: "Daphaco 4.0",
        name6: "すべて見る",
      };
    default:
      return {
        name: "Daphaco 1.5",
        name2: "Daphoco 2.5",
        name3: "Cadivi 1.5",
        name4: "Cadivi 2.5",
        name5: "Daphaco 4.0",
        name6: "See All",
      };
  }
};

export const translateRelatedTagDothuongdung = (language: string) => {
  switch (language) {
    case "vi":
      return {
        name: "Kéo",
        name2: "Bao tay",
        name3: "Kính",
        name4: "Xem tất cả",
      };
    case "en":
      return {
        name: "Scissors",
        name2: "Gloves",
        name3: "Glasses",
        name4: "See All",
      };
    case "zh":
      return {
        name: "剪刀",
        name2: "手套",
        name3: "眼镜",
        name4: "查看所有",
      };
    case "fr":
      return {
        name: "Ciseaux",
        name2: "Gants",
        name3: "Lunettes",
        name4: "Voir tout",
      };
    case "ja":
      return {
        name: "はさみ",
        name2: "手袋",
        name3: "眼鏡",
        name4: "すべて見る",
      };
    default:
      return {
        name: "Scissors",
        name2: "Gloves",
        name3: "Glasses",
        name4: "See All",
      };
  }
};

export const translateRelatedTagKeo = (language: string) => {
  switch (language) {
    case "vi":
      return {
        name: "Keo 502",
        name2: "Keo con chó",
        name3: "Keo dán đá",
        name4: "Xem tất cả",
      };
    case "en":
      return {
        name: "Glue 502",
        name2: "Dog Glue",
        name3: "Stone Adhesive",
        name4: "See All",
      };
    case "zh":
      return {
        name: "502胶水",
        name2: "狗狗胶水",
        name3: "石材胶水",
        name4: "查看所有",
      };
    case "fr":
      return {
        name: "Colle 502",
        name2: "Colle chien",
        name3: "Colle pierre",
        name4: "Voir tout",
      };
    case "ja":
      return {
        name: "502接着剤",
        name2: "犬用接着剤",
        name3: "石材用接着剤",
        name4: "すべて見る",
      };
    default:
      return {
        name: "Glue 502",
        name2: "Dog Glue",
        name3: "Stone Adhesive",
        name4: "See All",
      };
  }
};

export const translateRelatedTagOcam = (language: string) => {
  switch (language) {
    case "vi":
      return {
        name: "Mặt 3 lỗ",
        name2: "Công tắc",
        name3: "Cầu dao",
        name4: "Mặt 1 lỗ",
        name5: "Xem tất cả",
      };
    case "en":
      return {
        name: "3-Hole Plate",
        name2: "Switch",
        name3: "Circuit Breaker",
        name4: "1-Hole Plate",
        name5: "See All",
      };
    case "zh":
      return {
        name: "3孔面板",
        name2: "开关",
        name3: "断路器",
        name4: "1孔面板",
        name5: "查看所有",
      };
    case "fr":
      return {
        name: "Plaque 3 trous",
        name2: "Interrupteur",
        name3: "Disjoncteur",
        name4: "Plaque 1 trou",
        name5: "Voir tout",
      };
    case "ja":
      return {
        name: "3穴プレート",
        name2: "スイッチ",
        name3: "回路ブレーカー",
        name4: "1穴プレート",
        name5: "すべて見る",
      };
    default:
      return {
        name: "3-Hole Plate",
        name2: "Switch",
        name3: "Circuit Breaker",
        name4: "1-Hole Plate",
        name5: "See All",
      };
  }
};

export const translateRelatedTagOKhoa = (language: string) => {
  switch (language) {
    case "vi":
      return {
        name: "Việt Tiệp",
        name2: "Khóa số",
        name3: "Chống cắt",
        name4: "Xem tất cả",
      };
    case "en":
      return {
        name: "Viet Tiep",
        name2: "Combination Lock",
        name3: "Cut Resistant",
        name4: "See All",
      };
    case "zh":
      return {
        name: "越南铁",
        name2: "数字锁",
        name3: "防割",
        name4: "查看所有",
      };
    case "fr":
      return {
        name: "Viet Tiep",
        name2: "Cadenas à combinaison",
        name3: "Résistant à la coupe",
        name4: "Voir tout",
      };
    case "ja":
      return {
        name: "ビエットティエップ",
        name2: "番号ロック",
        name3: "カット防止",
        name4: "すべて見る",
      };
    default:
      return {
        name: "Viet Tiep",
        name2: "Combination Lock",
        name3: "Cut Resistant",
        name4: "See All",
      };
  }
};

export const translateRelatedTagOngnhua = (language: string) => {
  switch (language) {
    case "vi":
      return {
        name: "Ống 27",
        name1: "Ống 34",
        name2: "Ống 60",
        name3: "Ống 90",
        name4: "Ống 114",
        name5: "Co",
        name6: "Lơi",
        name7: "Xem tất cả",
      };
    case "en":
      return {
        name: "Pipe 27",
        name1: "Pipe 34",
        name2: "Pipe 60",
        name3: "Pipe 90",
        name4: "Pipe 114",
        name5: "Elbow",
        name6: "Tee",
        name7: "See All",
      };
    case "zh":
      return {
        name: "管子27",
        name1: "管子34",
        name2: "管子60",
        name3: "管子90",
        name4: "管子114",
        name5: "弯头",
        name6: "三通",
        name7: "查看所有",
      };
    case "fr":
      return {
        name: "Tuyau 27",
        name1: "Tuyau 34",
        name2: "Tuyau 60",
        name3: "Tuyau 90",
        name4: "Tuyau 114",
        name5: "Coude",
        name6: "Té",
        name7: "Voir tout",
      };
    case "ja":
      return {
        name: "パイプ27",
        name1: "パイプ34",
        name2: "パイプ60",
        name3: "パイプ90",
        name4: "パイプ114",
        name5: "エルボ",
        name6: "ティー",
        name7: "すべて見る",
      };
    default:
      return {
        name: "Pipe 27",
        name1: "Pipe 34",
        name2: "Pipe 60",
        name3: "Pipe 90",
        name4: "Pipe 114",
        name5: "Elbow",
        name6: "Tee",
        name7: "See All",
      };
  }
};

export const translateRelatedTagPin = (language: string) => {
  switch (language) {
    case "vi":
      return {
        name: "Pin con ó",
        name2: "Pin Panasonic",
        name3: "Pin Energizer",
        name4: "Xem tất cả",
      };
    case "en":
      return {
        name: "Eagle Battery",
        name2: "Panasonic Battery",
        name3: "Energizer Battery",
        name4: "See All",
      };
    case "zh":
      return {
        name: "鹰牌电池",
        name2: "松下电池",
        name3: "劲量电池",
        name4: "查看所有",
      };
    case "fr":
      return {
        name: "Batterie Aigle",
        name2: "Batterie Panasonic",
        name3: "Batterie Energizer",
        name4: "Voir tout",
      };
    case "ja":
      return {
        name: "ワシのバッテリー",
        name2: "パナソニックバッテリー",
        name3: "エナジャイザーバッテリー",
        name4: "すべて見る",
      };
    default:
      return {
        name: "Eagle Battery",
        name2: "Panasonic Battery",
        name3: "Energizer Battery",
        name4: "See All",
      };
  }
};

export const translateRelatedTagQuat = (language: string) => {
  switch (language) {
    case "vi":
      return {
        name: "Quạt Senko treo",
        name2: "Quạt đứng",
        name3: "Quạt công nghiệp",
        name4: "Xem tất cả",
      };
    case "en":
      return {
        name: "Senko Hanging Fan",
        name2: "Stand Fan",
        name3: "Industrial Fan",
        name4: "See All",
      };
    case "zh":
      return {
        name: "Senko 吊扇",
        name2: "立式风扇",
        name3: "工业风扇",
        name4: "查看所有",
      };
    case "fr":
      return {
        name: "Ventilateur Senko suspendu",
        name2: "Ventilateur sur pied",
        name3: "Ventilateur industriel",
        name4: "Voir tout",
      };
    case "ja":
      return {
        name: "Senko吊扇",
        name2: "スタンドファン",
        name3: "産業用ファン",
        name4: "すべて見る",
      };
    default:
      return {
        name: "Senko Hanging Fan",
        name2: "Stand Fan",
        name3: "Industrial Fan",
        name4: "See All",
      };
  }
};

export const translateRelatedTagSon = (language: string) => {
  switch (language) {
    case "vi":
      return {
        name: "Sơn Bạch tuyết",
        name2: "Sơn Expo",
        name3: "Sơn ATM",
        name4: "Xem tất cả",
      };
    case "en":
      return {
        name: "Snow White Paint",
        name2: "Expo Paint",
        name3: "ATM Paint",
        name4: "See All",
      };
    case "zh":
      return {
        name: "白雪漆",
        name2: "博览漆",
        name3: "ATM漆",
        name4: "查看所有",
      };
    case "fr":
      return {
        name: "Peinture Blanche Neige",
        name2: "Peinture Expo",
        name3: "Peinture ATM",
        name4: "Voir tout",
      };
    case "ja":
      return {
        name: "スノーホワイトペイント",
        name2: "エキスポペイント",
        name3: "ATMペイント",
        name4: "すべて見る",
      };
    default:
      return {
        name: "Snow White Paint",
        name2: "Expo Paint",
        name3: "ATM Paint",
        name4: "See All",
      };
  }
};

export const translateRelatedTagVatlieuNhaTam = (language: string) => {
  switch (language) {
    case "vi":
      return {
        name: "Vòi sen",
        name2: "Củ sen",
        name3: "Vòi xịt",
        name4: "Xem tất cả",
      };
    case "en":
      return {
        name: "Showerhead",
        name2: "Shower Bulb",
        name3: "Spray Gun",
        name4: "See All",
      };
    case "zh":
      return {
        name: "淋浴头",
        name2: "莲蓬头",
        name3: "喷枪",
        name4: "查看所有",
      };
    case "fr":
      return {
        name: "Pomme de douche",
        name2: "Ampoule de douche",
        name3: "Pistolet de pulvérisation",
        name4: "Voir tout",
      };
    case "ja":
      return {
        name: "シャワーヘッド",
        name2: "シャワーボウル",
        name3: "スプレーガン",
        name4: "すべて見る",
      };
    default:
      return {
        name: "Showerhead",
        name2: "Shower Bulb",
        name3: "Spray Gun",
        name4: "See All",
      };
  }
};

export const translateSuggest = (language: string) => {
  switch (language) {
    case "vi":
      return {
        name: "GIA DỤNG",
        name2: "NỘI THẤT",
        name3: "XÂY DỰNG",
      };
    case "en":
      return {
        name: "HOME GOODS",
        name2: "INTERIOR",
        name3: "CONSTRUCTION",
      };
    case "zh":
      return {
        name: "家居用品",
        name2: "室内",
        name3: "建筑",
      };
    case "fr":
      return {
        name: "BIEN D'UTILISATION",
        name2: "INTERIEUR",
        name3: "CONSTRUCTION",
      };
    case "ja":
      return {
        name: "家庭用品",
        name2: "インテリア",
        name3: "建設",
      };
    default:
      return {
        name: "HOME GOODS",
        name2: "INTERIOR",
        name3: "CONSTRUCTION",
      };
  }
};

export const translateAccessory = (language: string) => {
  switch (language) {
    case "vi":
      return {
        name: "Ốc vít",
        name1: "Bóng Điện",
        name2: "Quang",
        name3: "Co",
        name4: "Đá cắt",
        name5: "Dây điện",
        name6: "Daphaco",
        name7: "Cadivi",
        name8: "Daphaco lớn",
        name9: "Đèn Bàn Rạng",
        name10: "Đông",
        name11: "Keo 2 mặt",
        name12: "Keo Apolo",
        name13: "Kéo bếp ăn",
        name14: "Keo con chó",
        name15: "Keo dán sắt",
        name16: "Khóa Việt",
        name17: "Tiệp",
        name18: "Lơi",
        name19: "Lưới xanh",
        name20: "Mỏ lết",
        name21: "Nối",
        name22: "Ổ cắm cây",
        name23: "thông",
        name24: "Ổ cắm Điện",
        name25: "Quang",
      };
    case "en":
      return {
        name: "Screws",
        name1: "Bulb Điện",
        name2: "Quang",
        name3: "Elbow Joint",
        name4: "Cutting Stone",
        name5: "Electrical Wire",
        name6: "Daphaco",
        name7: "Cadivi",
        name8: "Large Daphaco",
        name9: "Desk Lamp Rạng",
        name10: "Đông",
        name11: "Double-sided Glue",
        name12: "Apolo Glue",
        name13: "Kitchen Scissors",
        name14: "Dog Glue",
        name15: "Iron Glue",
        name16: "Lock Việt",
        name17: "Tiệp",
        name18: "Bend",
        name19: "Green Mesh",
        name20: "Monkey Wrench",
        name21: "Connector",
        name22: "Socket Cây",
        name23: "Thông",
        name24: "Socket Điện",
        name25: "Quang",
      };
    case "zh":
      return {
        name: "螺丝",
        name1: "灯泡 Điện",
        name2: "Quang",
        name3: "接头",
        name4: "切割石",
        name5: "电线",
        name6: "Daphaco",
        name7: "Cadivi",
        name8: "大号Daphaco",
        name9: "桌灯 Rạng",
        name10: "Đông",
        name11: "双面胶",
        name12: "Apolo胶",
        name13: "厨房剪刀",
        name14: "狗胶",
        name15: "铁胶",
        name16: "锁 Việt",
        name17: "Tiệp",
        name18: "弯头",
        name19: "绿色网",
        name20: "活动扳手",
        name21: "连接器",
        name22: "插座 Cây",
        name23: "Thông",
        name24: "插座 Điện",
        name25: "Quang",
      };
    case "fr":
      return {
        name: "Vis",
        name1: "Ampoule Điện",
        name2: "Quang",
        name3: "Coude",
        name4: "Pierre coupante",
        name5: "Fil électrique",
        name6: "Daphaco",
        name7: "Cadivi",
        name8: "Grand Daphaco",
        name9: "Lampe Rạng",
        name10: "Đông",
        name11: "Colle double face",
        name12: "Colle Apolo",
        name13: "Ciseaux de cuisine",
        name14: "Colle de chien",
        name15: "Colle pour fer",
        name16: "Serrure Việt",
        name17: "Tiệp",
        name18: "Courbe",
        name19: "Filet vert",
        name20: "Clé à molette",
        name21: "Connecteur",
        name22: "Prise Cây",
        name23: "Thông",
        name24: "Prise Điện",
        name25: "Quang",
      };
    case "ja":
      return {
        name: "ネジ",
        name1: "電球 Điện",
        name2: "Quang",
        name3: "エルボジョイント",
        name4: "切断石",
        name5: "電線",
        name6: "Daphaco",
        name7: "Cadivi",
        name8: "大型Daphaco",
        name9: "デスクランプ Rạng",
        name10: "Đông",
        name11: "両面接着剤",
        name12: "アポロ接着剤",
        name13: "キッチンはさみ",
        name14: "犬用接着剤",
        name15: "鉄用接着剤",
        name16: "ロック Việt",
        name17: "Tiệp",
        name18: "曲げ",
        name19: "緑のメッシュ",
        name20: "モンキーレンチ",
        name21: "コネクタ",
        name22: "ソケット Cây",
        name23: "Thông",
        name24: "ソケット Điện",
        name25: "Quang",
      };
    default:
      return {
        name: "Screws",
        name1: "Bulb Điện",
        name2: "Quang",
        name3: "Elbow Joint",
        name4: "Cutting Stone",
        name5: "Electrical Wire",
        name6: "Daphaco",
        name7: "Cadivi",
        name8: "Large Daphaco",
        name9: "Desk Lamp Rạng",
        name10: "Đông",
        name11: "Double-sided Glue",
        name12: "Apolo Glue",
        name13: "Kitchen Scissors",
        name14: "Dog Glue",
        name15: "Iron Glue",
        name16: "Lock Việt",
        name17: "Tiệp",
        name18: "Bend",
        name19: "Green Mesh",
        name20: "Monkey Wrench",
        name21: "Connector",
        name22: "Socket Cây",
        name23: "Thông",
        name24: "Socket Điện",
        name25: "Quang",
      };
  }
};

export const translateAccessory2 = (language: string) => {
  switch (language) {
    case "vi":
      return {
        name: "Ống lưới",
        name2: "xanh",
        name3: "Ống nhựa PVC",
        name4: "Pin con ó",
        name5: "Quạt bàn",
        name6: "Senko",
        name7: "Quạt treo",
        name8: "Sifa thông",
        name9: "cống",
        name10: "Sơn Bạch",
        name11: "Tuyết",
        name12: "Sơn Expo",
        name13: "Sơn xịt ATM",
      };
    case "en":
      return {
        name: "Mesh Pipe",
        name2: "Green",
        name3: "PVC Pipe",
        name4: "Battery Eagle",
        name5: "Table Fan",
        name6: "Senko",
        name7: "Wall Fan",
        name8: "Sifa Vent",
        name9: "Drain",
        name10: "Paint Bạch",
        name11: "Tuyết",
        name12: "Paint Expo",
        name13: "Spray Paint ATM",
      };
    case "zh":
      return {
        name: "网管",
        name2: "绿色",
        name3: "PVC管",
        name4: "老鹰电池",
        name5: "台扇",
        name6: "Senko",
        name7: "挂墙扇",
        name8: "Sifa通风",
        name9: "排水",
        name10: "油漆 Bạch",
        name11: "Tuyết",
        name12: "油漆 Expo",
        name13: "喷漆 ATM",
      };
    case "fr":
      return {
        name: "Tuyau en maille",
        name2: "Vert",
        name3: "Tuyau PVC",
        name4: "Pile Eagle",
        name5: "Ventilateur de table",
        name6: "Senko",
        name7: "Ventilateur mural",
        name8: "Vent Sifa",
        name9: "Égout",
        name10: "Peinture Bạch",
        name11: "Tuyết",
        name12: "Peinture Expo",
        name13: "Peinture en spray ATM",
      };
    case "ja":
      return {
        name: "メッシュ管",
        name2: "緑",
        name3: "PVCパイプ",
        name4: "バッテリーイーグル",
        name5: "卓上扇風機",
        name6: "Senko",
        name7: "壁掛け扇風機",
        name8: "Sifaベント",
        name9: "排水口",
        name10: "ペイント Bạch",
        name11: "Tuyết",
        name12: "ペイント Expo",
        name13: "スプレーペイント ATM",
      };
    default:
      return {
        name: "Mesh Pipe",
        name2: "Green",
        name3: "PVC Pipe",
        name4: "Battery Eagle",
        name5: "Table Fan",
        name6: "Senko",
        name7: "Wall Fan",
        name8: "Sifa Vent",
        name9: "Drain",
        name10: "Paint ",
        name11: "Tuyết",
        name12: "Paint Expo",
        name13: "Spray Paint ATM",
      };
  }
};

export const translateAccessory3 = (language: string) => {
  switch (language) {
    case "vi":
      return {
        name: "Tê",
        name2: "Thước kéo",
        name3: "Bạt xanh",
        name4: "Bóng âm trần",
        name5: "MPE",
        name6: "Cờ lê Yeti",
        name7: "Cầu dao tự",
        name8: "động Sino",
        name9: "Máy bơm Panasonic",
        name10: "Mặt 3 lỗ",
        name11: "Sino",
        name12: "Que hàn",
        name13: "V lỗ",
        name14: "Xe rùa",
      };
    case "en":
      return {
        name: "Tee Joint",
        name2: "Measuring Tape",
        name3: "Green Tarpaulin",
        name4: "Recessed Ceiling Light",
        name5: "MPE",
        name6: "Yeti Wrench",
        name7: "Circuit Breaker",
        name8: "Automatic Sino",
        name9: "Panasonic Pump",
        name10: "3-Hole Plate",
        name11: "Sino",
        name12: "Welding Rod",
        name13: "V-Slot",
        name14: "Wheelbarrow",
      };
    case "zh":
      return {
        name: "三通接头",
        name2: "卷尺",
        name3: "绿色防水布",
        name4: "嵌入式天花灯",
        name5: "MPE",
        name6: "Yeti扳手",
        name7: "自动断路器",
        name8: "Sino",
        name9: "松下水泵",
        name10: "三孔面板",
        name11: "Sino",
        name12: "焊条",
        name13: "V形槽",
        name14: "手推车",
      };
    case "fr":
      return {
        name: "Raccord en T",
        name2: "Mètre ruban",
        name3: "Bâche verte",
        name4: "Plafonnier encastré",
        name5: "MPE",
        name6: "Clé Yeti",
        name7: "Disjoncteur",
        name8: "automatique Sino",
        name9: "Pompe Panasonic",
        name10: "Plaque 3 trous",
        name11: "Sino",
        name12: "Baguette de soudage",
        name13: "Rainure en V",
        name14: "Brouette",
      };
    case "ja":
      return {
        name: "ティージョイント",
        name2: "巻尺",
        name3: "グリーンターポリン",
        name4: "埋め込み式天井ライト",
        name5: "MPE",
        name6: "Yetiレンチ",
        name7: "自動ブレーカー",
        name8: "Sino",
        name9: "パナソニックポンプ",
        name10: "3穴プレート",
        name11: "Sino",
        name12: "溶接棒",
        name13: "Vスロット",
        name14: "一輪車",
      };
    default:
      return {
        name: "Tee Joint",
        name2: "Measuring Tape",
        name3: "Green Tarpaulin",
        name4: "Recessed Ceiling Light",
        name5: "MPE",
        name6: "Yeti Wrench",
        name7: "Circuit Breaker",
        name8: "Automatic Sino",
        name9: "Panasonic Pump",
        name10: "3-Hole Plate",
        name11: "Sino",
        name12: "Welding Rod",
        name13: "V-Slot",
        name14: "Wheelbarrow",
      };
  }
};

export const translateBestSeller = (language: string) => {
  switch (language) {
    case "vi":
      return "Bán chạy";
    case "en":
      return "Best Seller";
    case "zh":
      return "Best Seller";
    case "fr":
      return "Best-seller"; // Rút ngắn trong tiếng Pháp
    case "ja":
      return "ベストセラー";
    default:
      return "Best Seller";
  }
};

export const translateSaleTime = (language: string) => {
  switch (language) {
    case "vi":
      return "Thời gian Sale";
    case "en":
      return "Sale Time";
    case "zh":
      return "促销时间";
    case "fr":
      return "Heure de vente";
    case "ja":
      return "セール時間";
    default:
      return "Sale Time";
  }
};

export const translateComingSoon = (language: string) => {
  switch (language) {
    case "vi":
      return "Sắp diễn ra";
    case "en":
      return "Coming Soon";
    case "zh":
      return "即将开始";
    case "fr":
      return "Bientôt disponible";
    case "ja":
      return "近日公開予定";
    default:
      return "Coming Soon";
  }
};

export const translateHuntSaleLater = (language: string) => {
  switch (language) {
    case "vi":
      return "Săn Sale sau";
    case "en":
      return "Hunt Sale Later";
    case "zh":
      return "稍后抢购";
    case "fr":
      return "Chasser les soldes plus tard";
    case "ja":
      return "後でセールを狙う";
    default:
      return "Hunt Sale Later";
  }
};

export const translateHotProduct = (language: string) => {
  switch (language) {
    case "vi":
      return "Sản phẩm hot";
    case "en":
      return "Hot Product";
    case "zh":
      return "热销产品";
    case "fr":
      return "Produit chaud";
    case "ja":
      return "ホット商品";
    default:
      return "Hot Product";
  }
};

export const translateWorkingHours = (language: string) => {
  switch (language) {
    case "vi":
      return "Thời gian làm việc";
    case "en":
      return "Working Hours";
    case "zh":
      return "工作时间";
    case "fr":
      return "Heures de travail";
    case "ja":
      return "勤務時間";
    default:
      return "Working Hours";
  }
};

export const translateSuperSale = (language: string) => {
  switch (language) {
    case "vi":
      return "Siêu sale";
    case "en":
      return "Super Sale";
    case "zh":
      return "超级促销";
    case "fr":
      return "Super promotion";
    case "ja":
      return "スーパーセール";
    default:
      return "Super Sale";
  }
};

export const translateTrendingNow = (language: string) => {
  switch (language) {
    case "vi":
      return "Đang bán chạy";
    case "en":
      return "Trending Now";
    case "zh":
      return "热卖中";
    case "fr":
      return "En vente";
    case "ja":
      return "売れ筋中";
    default:
      return "Trending Now";
  }
};

export const translateSaved = (language: string) => {
  switch (language) {
    case "vi":
      return "Đã lưu";
    case "en":
      return "Saved";
    case "zh":
      return "已保存";
    case "fr":
      return "Sauvegardé";
    case "ja":
      return "保存済み";
    default:
      return "Saved";
  }
};

export const translateAuth = (language: string) => {
  switch (language) {
    case "vi":
      return "Xác thực";
    case "en":
      return "Auth";
    case "zh":
      return "验证";
    case "fr":
      return "Authentification";
    case "ja":
      return "認証";
    default:
      return "Auth";
  }
};

export const translateExceededAttempts = (language: string) => {
  switch (language) {
    case "vi":
      return "Bạn đã vượt quá số lần cho phép";
    case "en":
      return "You have exceeded the allowed attempts";
    case "zh":
      return "您已超过允许的尝试次数";
    case "fr":
      return "Vous avez dépassé le nombre d'essais autorisés";
    case "ja":
      return "許可された試行回数を超えました";
    default:
      return "You have exceeded the allowed attempts";
  }
};

export const translateResendSuccess = (language: string) => {
  switch (language) {
    case "vi":
      return "Mã xác thực đã được gửi lại thành công!";
    case "en":
      return "The verification code has been resent successfully!";
    case "zh":
      return "验证码已成功重新发送！";
    case "fr":
      return "Le code de vérification a été renvoyé avec succès !";
    case "ja":
      return "認証コードが正常に再送信されました！";
    default:
      return "The verification code has been resent successfully!";
  }
};

export const translateResendError = (language: string) => {
  switch (language) {
    case "vi":
      return "Đã xảy ra lỗi khi gửi lại mã xác thực!";
    case "en":
      return "An error occurred while resending the verification code!";
    case "zh":
      return "重新发送验证码时发生错误！";
    case "fr":
      return "Une erreur est survenue lors de l'envoi du code de vérification !";
    case "ja":
      return "認証コードの再送信中にエラーが発生しました！";
    default:
      return "An error occurred while resending the verification code!";
  }
};

export const translateVerifyRobot = (language: string) => {
  switch (language) {
    case "vi":
      return "Vui lòng xác minh tôi không phải là robot!";
    case "en":
      return "Please verify I am not a robot!";
    case "zh":
      return "请验证我不是机器人！";
    case "fr":
      return "Veuillez vérifier que je ne suis pas un robot !";
    case "ja":
      return "私はロボットではないことを確認してください！";
    default:
      return "Please verify I am not a robot!";
  }
};

export const translateWelcomeBack = (language: string) => {
  switch (language) {
    case "vi":
      return "Chào mừng trở lại";
    case "en":
      return "Welcome back";
    case "zh":
      return "欢迎回来";
    case "fr":
      return "Content de vous revoir";
    case "ja":
      return "お帰りなさい";
    default:
      return "Welcome back";
  }
};

export const translateDontHaveAccount = (language: string) => {
  switch (language) {
    case "vi":
      return "Chưa có tài khoản?";
    case "en":
      return "Don't have an account?";
    case "zh":
      return "没有账户？";
    case "fr":
      return "Vous n'avez pas de compte ?";
    case "ja":
      return "アカウントをお持ちでないですか？";
    default:
      return "Don't have an account?";
  }
};

export const translateTwoFactorAuth = (language: string) => {
  switch (language) {
    case "vi":
      return "Xác thực 2 yếu tố";
    case "en":
      return "Two-factor authentication";
    case "zh":
      return "两步验证";
    case "fr":
      return "Authentification à deux facteurs";
    case "ja":
      return "二段階認証";
    default:
      return "Two-factor authentication";
  }
};

export const translateForgotPassword = (language: string) => {
  switch (language) {
    case "vi":
      return "Quên mật khẩu?";
    case "en":
      return "Forgot password?";
    case "zh":
      return "忘记密码了吗？";
    case "fr":
      return "Mot de passe oublié ?";
    case "ja":
      return "パスワードをお忘れですか？";
    default:
      return "Forgot password?";
  }
};

export const translateTwoFactorExpiry = (language: string) => {
  switch (language) {
    case "vi":
      return { name1: "Xác thực 2 yếu tố sẽ hết hiệu lực sau", name2: "giây" };
    case "en":
      return { name1: "2FA expires in", name2: "seconds" };
    case "zh":
      return { name1: "两步验证将在", name2: "秒后过期" };
    case "fr":
      return { name1: "2FA expirera dans", name2: "secondes" };
    case "ja":
      return { name1: "二段階認証は", name2: "秒後に期限切れになります" };
    default:
      return { name1: "2FA expires in", name2: "seconds" };
  }
};

export const translateTwoFactorExpired = (language: string) => {
  switch (language) {
    case "vi":
      return {
        name1: "Xác thực 2 yếu tố đã hết hiệu lực. Nhấn để",
        name2: "thử lại",
      };
    case "en":
      return {
        name1: "Two-factor authentication has expired. Click to",
        name2: "try again",
      };
    case "zh":
      return { name1: "两步验证已过期。点击", name2: "重试" };
    case "fr":
      return { name1: "2FA expiré. Cliquez pour", name2: "réessayer" };
    case "ja":
      return {
        name1: "二段階認証は期限切れです。クリックして",
        name2: "再試行",
      };
    default:
      return {
        name1: "Two-factor authentication has expired. Click to",
        name2: "try again",
      };
  }
};

export const translateRetryLimit = (language: string) => {
  switch (language) {
    case "vi":
      return {
        name1: "Đã gửi lại",
        name2: "lần",
        name3: "Lưu ý:",
        name4:
          "Nếu bạn gửi lại quá 5 lần, bạn sẽ bị khóa tài khoản trong 24 giờ.",
      };
    case "en":
      return {
        name1: "Sent again",
        name2: "times",
        name3: "Note:",
        name4:
          "If you resend more than 5 times, your account will be locked for 24 hours.",
      };
    case "zh":
      return {
        name1: "已重新发送",
        name2: "次",
        name3: "注意:",
        name4: "如果您重新发送超过5次，您的账户将在24小时内被锁定。",
      };
    case "fr":
      return {
        name1: "Envoyé à nouveau",
        name2: "fois",
        name3: "Note:",
        name4:
          "Si vous renvoyez plus de 5 fois, votre compte sera verrouillé pendant 24 heures.",
      };
    case "ja":
      return {
        name1: "再送信しました",
        name2: "回",
        name3: "注意:",
        name4: "5回以上再送信すると、アカウントは24時間ロックされます。",
      };
    default:
      return {
        name1: "Sent again",
        name2: "times",
        name3: "Note:",
        name4:
          "If you resend more than 5 times, your account will be locked for 24 hours.",
      };
  }
};

export const translateConfirmLogin = (language: string) => {
  switch (language) {
    case "vi":
      return { name1: "Xác nhận", name2: "Đăng nhập" };
    case "en":
      return { name1: "Confirm", name2: "Login" };
    case "zh":
      return { name1: "确认", name2: "登录" };
    case "fr":
      return { name1: "Confirmer", name2: "Connexion" };
    case "ja":
      return { name1: "確認", name2: "ログイン" };
    default:
      return { name1: "Confirm", name2: "Login" };
  }
};

export const translateVerifyNotRobots = (language: string) => {
  switch (language) {
    case "vi":
      return "Vui lòng xác minh tôi không phải là robot trước khi tiếp tục!";
    case "en":
      return "Please verify I am not a robot before proceeding!";
    case "zh":
      return "请验证我不是机器人，在继续之前！";
    case "fr":
      return "Veuillez vérifier je ne suis pas un robot avant de continuer !";
    case "ja":
      return "確認してください私はロボットではないことを進む前に！";
    default:
      return "Please verify I am not a robot before proceeding!";
  }
};

export const translateGuestLogin = (language: string) => {
  switch (language) {
    case "vi":
      return "Đăng nhập tài khoản khách 👉";
    case "en":
      return "Login guest account 👉";
    case "zh":
      return "登录访客帐户 👉";
    case "fr":
      return "Se connecter compte invité 👉";
    case "ja":
      return "ゲストアカウントにログイン 👉";
    default:
      return "Login guest account 👉";
  }
};

export const translateVerifyNotRobot = (language: string) => {
  switch (language) {
    case "vi":
      return "Bạn chưa xác minh bạn không phải là robot.";
    case "en":
      return "You have not verified that you are not a robot.";
    case "zh":
      return "您尚未验证您不是机器人。";
    case "fr":
      return "Vous n'avez pas vérifié que vous n'êtes pas un robot.";
    case "ja":
      return "ロボットでないことを確認していません。";
    default:
      return "You have not verified that you are not a robot.";
  }
};

export const translateBackToLogin = (language: string) => {
  switch (language) {
    case "vi":
      return "Quay lại đăng nhập";
    case "en":
      return "Back to login";
    case "zh":
      return "返回登录";
    case "fr":
      return "Retour à la connexion";
    case "ja":
      return "ログイン画面に戻る";
    default:
      return "Back to login";
  }
};

export const translateEmailAdded = (language: string) => {
  switch (language) {
    case "vi":
      return "Đã thêm đầy đủ email!";
    case "en":
      return "Email has been added successfully!";
    case "zh":
      return "电子邮件已成功添加！";
    case "fr":
      return "L'email a été ajouté avec succès !";
    case "ja":
      return "メールが正常に追加されました！";
    default:
      return "Email has been added successfully!";
  }
};

export const translateEmailFormat = (language: string) => {
  switch (language) {
    case "vi":
      return "Bạn phải nhập email bao gồm @gmail.com hoặc các loại @example.com khác!";
    case "en":
      return "You must enter an email including @gmail.com or other @example.com types!";
    case "zh":
      return "您必须输入包含 @gmail.com 或其他 @example.com 类型的电子邮件！";
    case "fr":
      return "Vous devez entrer un email incluant @gmail.com ou d'autres types @example.com !";
    case "ja":
      return "gmail.com や他の @example.com タイプを含むメールアドレスを入力する必要があります！";
    default:
      return "You must enter an email including @gmail.com or other @example.com types!";
  }
};

export const translateEnterNewPasswordTitle = (language: string) => {
  switch (language) {
    case "vi":
      return "Nhập mật khẩu mới";
    case "en":
      return "Enter New password";
    case "zh":
      return "输入新密码";
    case "fr":
      return "Entrez le nouveau mot de passe";
    case "ja":
      return "新しいパスワードを入力";
    default:
      return "Enter New password";
  }
};

export const translateResetPassword = (language: string) => {
  switch (language) {
    case "vi":
      return "Đặt lại mật khẩu";
    case "en":
      return "Reset password";
    case "zh":
      return "重置密码";
    case "fr":
      return "Réinitialiser le mot de passe";
    case "ja":
      return "パスワードをリセット";
    default:
      return "Reset password";
  }
};

export const translateMissingToken = (language: string) => {
  switch (language) {
    case "vi":
      return "Thiếu Token!";
    case "en":
      return "Missing Token!";
    case "zh":
      return "缺少令牌！";
    case "fr":
      return "Token manquant !";
    case "ja":
      return "トークンが不足しています！";
    default:
      return "Missing Token!";
  }
};

export const translateConfirmingVerification = (language: string) => {
  switch (language) {
    case "vi":
      return "Đang xác nhận thông tin của bạn";
    case "en":
      return "Confirming your verification";
    case "zh":
      return "正在确认您的验证";
    case "fr":
      return "Confirmation de votre vérification";
    case "ja":
      return "確認中の検証";
    default:
      return "Confirming your verification";
  }
};

export const translateCreateAccount = (language: string) => {
  switch (language) {
    case "vi":
      return "Tạo tài khoản!";
    case "en":
      return "Create an account!";
    case "zh":
      return "创建账户！";
    case "fr":
      return "Créer un compte !";
    case "ja":
      return "アカウントを作成！";
    default:
      return "Create an account!";
  }
};

export const translateAlreadyHaveAccount = (language: string) => {
  switch (language) {
    case "vi":
      return "Đã có tài khoản?";
    case "en":
      return "Already have an account?";
    case "zh":
      return "已经有账户？";
    case "fr":
      return "Vous avez déjà un compte ?";
    case "ja":
      return "すでにアカウントをお持ちですか？";
    default:
      return "Already have an account?";
  }
};

export const translateValid = (language: string) => {
  switch (language) {
    case "vi":
      return "Hợp lệ!";
    case "en":
      return "Valid!";
    case "zh":
      return "有效！";
    case "fr":
      return "Valide !";
    case "ja":
      return "有効！";
    default:
      return "Valid!";
  }
};

export const translateNoIndentNoNumbers = (language: string) => {
  switch (language) {
    case "vi":
      return "Không được khoảng cách đầu dòng và ghi số";
    case "en":
      return "No indentation and no numbers";
    case "zh":
      return "不能有缩进和数字";
    case "fr":
      return "Pas d'indentation ni de numéros";
    case "ja":
      return "インデントと番号は不要です";
    default:
      return "No indentation and no numbers";
  }
};

export const translateFullNameEntered = (language: string) => {
  switch (language) {
    case "vi":
      return "Bạn đã nhập đủ Họ và Tên!";
    case "en":
      return "You have entered your full name!";
    case "zh":
      return "您已输入完整姓名！";
    case "fr":
      return "Vous avez saisi votre nom complet !";
    case "ja":
      return "フルネームを入力しました！";
    default:
      return "You have entered your full name!";
  }
};

export const translateEnterFullName = (language: string) => {
  switch (language) {
    case "vi":
      return "Hãy nhập đủ Họ và Tên.";
    case "en":
      return "Please enter your full name.";
    case "zh":
      return "请输入您的全名。";
    case "fr":
      return "Veuillez entrer votre nom complet.";
    case "ja":
      return "フルネームを入力してください。";
    default:
      return "Please enter your full name.";
  }
};

export const translateSentToEmail = (language: string) => {
  switch (language) {
    case "vi":
      return "Đã gửi đến email";
    case "en":
      return "Sent to Email";
    case "zh":
      return "已发送到邮箱";
    case "fr":
      return "Envoyé à l'email";
    case "ja":
      return "メールに送信しました";
    default:
      return "Sent to Email";
  }
};

export const translateTerms = (language: string) => {
  switch (language) {
    case "vi":
      return "Điều khoản";
    case "en":
      return "Terms";
    case "zh":
      return "条款";
    case "fr":
      return "Conditions";
    case "ja":
      return "利用規約";
    default:
      return "Terms";
  }
};

export const translateQuickLoginMessage = (language: string) => {
  switch (language) {
    case "vi":
      return "Đăng nhập bằng tài khoản nhanh sẽ giúp bạn trải nghiệm tốt hơn.";
    case "en":
      return "Logging in with a quick account will enhance your experience.";
    case "zh":
      return "使用快速账户登录将提升您的体验。";
    case "fr":
      return "Se connecter avec un compte rapide améliorera votre expérience.";
    case "ja":
      return "クイックアカウントでログインすると、より良い体験ができます。";
    default:
      return "Logging in with a quick account will enhance your experience.";
  }
};

export const translateGuestAccountMessage = (language: string) => {
  switch (language) {
    case "vi":
      return {
        name: "- Chào mừng bạn đến với ứng dụng của chúng tôi! Với tài khoản khách, bạn có thể khám phá các tính năng cơ bản mà không cần đăng nhập. Tuy nhiên, để trải nghiệm đầy đủ các chức năng và nhận các ưu đãi đặc biệt, chúng tôi khuyến khích bạn tạo một tài khoản cá nhân. Cảm ơn bạn đã chọn chúng tôi!",
        name2:
          "- Khi bạn đăng nhập với vai trò khách, thông tin của bạn sẽ được bảo mật tuyệt đối khi mua sản phẩm trên ứng dụng của chúng tôi. Chúng tôi không lưu thông tin của bạn và không chịu trách nhiệm.",
        name3:
          "- Bên cạnh đó, quy định của tài khoản khách, tất cả dữ liệu người dùng sẽ lưu dưới dạng local và nó sẽ không lưu vào database của chúng tôi. Việc bạn lạc mất những dữ liệu quan trọng trong quá trình sử dụng, chúng tôi sẽ không giải quyết khi bạn đăng nhập với vai trò khách.",
        name4: "Tôi đồng ý với điều khoản trên.",
      };
    case "en":
      return {
        name: "- Welcome to our app! With a guest account, you can explore basic features without logging in. However, to enjoy the full range of functions and receive special offers, we encourage you to create a personal account. Thank you for choosing us!",
        name2:
          "- When you log in as a guest, your information will be kept strictly confidential when purchasing products on our app. We do not store your information and are not responsible for it.",
        name3:
          "- Additionally, under guest account rules, all user data will be stored locally and will not be saved to our database. Any loss of important data during use will not be resolved when logged in as a guest.",
        name4: "I agree to the terms above.",
      };
    case "zh":
      return {
        name: "- 欢迎使用我们的应用程序！通过访客帐户，您可以在不登录的情况下探索基本功能。然而，为了体验完整的功能并获得特别优惠，我们鼓励您创建个人帐户。感谢您选择我们！",
        name2:
          "- 当您以访客身份登录时，您的信息将在我们应用上购买产品时得到严格保密。我们不会存储您的信息，也不对此负责。",
        name3:
          "- 此外，根据访客帐户的规定，所有用户数据将以本地方式存储，并且不会保存到我们的数据库中。使用过程中丢失重要数据，我们不会为您解决，特别是在您以访客身份登录时。",
        name4: "我同意以上条款。",
      };
    case "fr":
      return {
        name: "- Bienvenue dans notre application ! Avec un compte invité, vous pouvez explorer les fonctionnalités de base sans vous connecter. Cependant, pour profiter de toutes les fonctionnalités et recevoir des offres spéciales, nous vous encourageons à créer un compte personnel. Merci de nous avoir choisis !",
        name2:
          "- Lorsque vous vous connectez en tant qu'invité, vos informations seront strictement confidentielles lors de l'achat de produits sur notre application. Nous ne stockons pas vos informations et ne sommes pas responsables.",
        name3:
          "- De plus, selon les règles du compte invité, toutes les données utilisateur seront stockées localement et ne seront pas enregistrées dans notre base de données. Toute perte de données importantes pendant l'utilisation ne sera pas résolue lorsque vous êtes connecté en tant qu'invité.",
        name4: "J'accepte les termes ci-dessus.",
      };
    case "ja":
      return {
        name: "- 私たちのアプリへようこそ！ゲストアカウントでログインせずに基本機能を探索できます。ただし、すべての機能をフルに利用し、特別なオファーを受けるには、個人アカウントの作成をお勧めします。私たちを選んでいただきありがとうございます！",
        name2:
          "- ゲストとしてログインすると、アプリで製品を購入する際、あなたの情報は厳密に保護されます。私たちはあなたの情報を保存せず、責任を負いません。",
        name3:
          "- さらに、ゲストアカウントの規則に従って、すべてのユーザーデータはローカルに保存され、私たちのデータベースには保存されません。使用中に重要なデータを紛失した場合、ゲストアカウントでログインしている場合、私たちは解決しません。",
        name4: "上記の条件に同意します。",
      };
    default:
      return {
        name: "- Welcome to our app! With a guest account, you can explore basic features without logging in. However, to enjoy the full range of functions and receive special offers, we encourage you to create a personal account. Thank you for choosing us!",
        name2:
          "- When you log in as a guest, your information will be kept strictly confidential when purchasing products on our app. We do not store your information and are not responsible for it.",
        name3:
          "- Additionally, under guest account rules, all user data will be stored locally and will not be saved to our database. Any loss of important data during use will not be resolved when logged in as a guest.",
        name4: "I agree to the terms above.",
      };
  }
};

export const translateContinue = (language: string) => {
  switch (language) {
    case "vi":
      return "Tiếp tục";
    case "en":
      return "Continue";
    case "zh":
      return "继续";
    case "fr":
      return "Continuer";
    case "ja":
      return "続ける";
    default:
      return "Continue";
  }
};

export const translateErrorMessage = (language: string) => {
  switch (language) {
    case "vi":
      return "Ôi! Có gì đó không đúng!";
    case "en":
      return "Oops! Something went wrong!";
    case "zh":
      return "哎呀！出了点问题！";
    case "fr":
      return "Oups! Quelque chose s'est mal passé!";
    case "ja":
      return "おっと！何かがうまくいかなかった！";
    default:
      return "Oops! Something went wrong!";
  }
};

export const translateAccountSuspended = (language: string) => {
  switch (language) {
    case "vi":
      return "Khóa tài khoản do sai phạm điều khoản!";
    case "en":
      return "Account suspended due to violation of terms!";
    case "zh":
      return "因违反条款而暂停账户！";
    case "fr":
      return "Compte suspendu en raison de la violation des conditions !";
    case "ja":
      return "規約違反によりアカウントが停止されました！";
    default:
      return "Account suspended due to violation of terms!";
  }
};

export const translateAccountBanned = (language: string) => {
  switch (language) {
    case "vi":
      return "Tài khoản của bạn đã bị ban, hãy kiểm tra email để xem thời gian có thể đăng nhập lại. Thông cảm cho chúng tôi nếu có thắc mắc, liên hệ 0352261103.";
    case "en":
      return "Your account has been banned. Please check your email to see when you can log in again. We apologize for the inconvenience. For inquiries, contact 0352261103.";
    case "zh":
      return "您的账户已被禁止，请检查您的电子邮件以查看何时可以重新登录。如有疑问，请联系 0352261103，我们对此表示歉意。";
    case "fr":
      return "Votre compte a été banni. Veuillez vérifier votre e-mail pour voir quand vous pourrez vous reconnecter. Nous nous excusons pour la gêne occasionnée. Pour toute question, contactez le 0352261103.";
    case "ja":
      return "あなたのアカウントは停止されました。再度ログインできる日時についてはメールをご確認ください。ご不便をおかけして申し訳ありません。ご質問がある場合は0352261103までお問い合わせください。";
    default:
      return "Your account has been banned. Please check your email to see when you can log in again. We apologize for the inconvenience. For inquiries, contact 0352261103.";
  }
};

export const translateAccountPermanentlyBanned = (language: string) => {
  switch (language) {
    case "vi":
      return "Tài khoản khóa vĩnh viễn!";
    case "en":
      return "Account permanently banned!";
    case "zh":
      return "账户已永久封禁！";
    case "fr":
      return "Compte définitivement banni !";
    case "ja":
      return "アカウントは永久に停止されました！";
    default:
      return "Account permanently banned!";
  }
};

export const translateAccountPermanentlyBanneds = (language: string) => {
  switch (language) {
    case "vi":
      return "Chúng tôi xin lỗi đối với tài khoản của bạn đã bị khóa vĩnh viễn vì sai điều khoản!";
    case "en":
      return "We apologize for your account being permanently banned due to violation of terms!";
    case "zh":
      return "我们为您的账户因违反条款而被永久封禁感到抱歉！";
    case "fr":
      return "Nous nous excusons pour la suspension permanente de votre compte en raison de la violation des conditions !";
    case "ja":
      return "規約違反によりアカウントが永久に停止されたことをお詫び申し上げます！";
    default:
      return "We apologize for your account being permanently banned due to violation of terms!";
  }
};

export const translateAccountPermanentlyBannedPolicyViolation = (
  language: string
) => {
  switch (language) {
    case "vi":
      return "Tài khoản của bạn đã bị ban vĩnh viễn do vi phạm chính sách, có thể liên hệ chúng tôi để biết thêm lý do 0352261103.";
    case "en":
      return "Your account has been permanently banned due to policy violation, you can contact us for more details at 0352261103.";
    case "zh":
      return "由于违反政策，您的账户已被永久封禁，您可以联系我们了解更多原因，联系电话：0352261103。";
    case "fr":
      return "Votre compte a été définitivement banni en raison d'une violation de la politique, vous pouvez nous contacter pour plus de détails au 0352261103.";
    case "ja":
      return "ポリシー違反により、あなたのアカウントは永久に停止されました。詳細については、0352261103までお問い合わせください。";
    default:
      return "Your account has been permanently banned due to policy violation, you can contact us for more details at 0352261103.";
  }
};

export const translateEmailNotConfirmedOrInvalid = (language: string) => {
  switch (language) {
    case "vi":
      return "Bạn chưa xác nhận email hoặc email của bạn không hợp lệ!";
    case "en":
      return "You have not confirmed your email or your email is invalid!";
    case "zh":
      return "您尚未确认电子邮件或您的电子邮件无效！";
    case "fr":
      return "Vous n'avez pas confirmé votre e-mail ou votre e-mail est invalide !";
    case "ja":
      return "メールが確認されていないか、無効なメールです！";
    default:
      return "You have not confirmed your email or your email is invalid!";
  }
};

export const translateInvalid = (language: string) => {
  switch (language) {
    case "vi":
      return "Không hợp lệ!";
    case "en":
      return "Invalid!";
    case "zh":
      return "无效！";
    case "fr":
      return "Invalide !";
    case "ja":
      return "無効！";
    default:
      return "Invalid!";
  }
};

export const translateIncorrectPassword = (language: string) => {
  switch (language) {
    case "vi":
      return "Mật khẩu không đúng!";
    case "en":
      return "Incorrect password!";
    case "zh":
      return "密码错误！";
    case "fr":
      return "Mot de passe incorrect !";
    case "ja":
      return "パスワードが間違っています！";
    default:
      return "Incorrect password!";
  }
};

export const translateAccountBannedTime = (
  language: string,
  daysLeft: string
) => {
  switch (language) {
    case "vi":
      return `Tài khoản của bạn đã bị khóa. Bạn có thể đăng nhập lại sau ${daysLeft} ngày. Để biết thêm thông tin liên hệ ADMIN.`;
    case "en":
      return `Your account has been banned. You can log in again after ${daysLeft} days. For more information, contact ADMIN.`;
    case "zh":
      return `您的账户已被封禁。您可以在 ${daysLeft} 天后重新登录。如需更多信息，请联系管理员。`;
    case "fr":
      return `Votre compte a été bloqué. Vous pourrez vous reconnecter après ${daysLeft} jours. Pour plus d'informations, contactez l'ADMIN.`;
    case "ja":
      return `アカウントが禁止されました。${daysLeft}日後に再度ログインできます。詳細についてはADMINにお問い合わせください。`;
    default:
      return `Your account has been banned. You can log in again after ${daysLeft} days. For more information, contact ADMIN.`;
  }
};

export const translateValidInfo = (language: string) => {
  switch (language) {
    case "vi":
      return "Thông tin chính xác!";
    case "en":
      return "Accurate information!";
    case "zh":
      return "准确信息！";
    case "fr":
      return "Informations exactes !";
    case "ja":
      return "正確な情報です！";
    default:
      return "Accurate information!";
  }
};

export const translateDeviceLimitExceeded = (language: string) => {
  switch (language) {
    case "vi":
      return "Xin lỗi! Người dùng đã giới hạn thiết bị đăng nhập. Hiện tại đã quá nhiều thiết bị đăng nhập vào tài khoản này.";
    case "en":
      return "Sorry! The user has limited login devices. Currently, there are too many devices logged into this account.";
    case "zh":
      return "抱歉！用户已限制登录设备。当前有太多设备登录到该账户。";
    case "fr":
      return "Désolé ! L'utilisateur a limité les appareils de connexion. Actuellement, trop d'appareils sont connectés à ce compte.";
    case "ja":
      return "申し訳ありません！ユーザーはログインデバイスを制限しています。現在、このアカウントには多くのデバイスがログインしています。";
    default:
      return "Sorry! The user has limited login devices. Currently, there are too many devices logged into this account.";
  }
};

export const translateVerificationCodeNotFound = (language: string) => {
  switch (language) {
    case "vi":
      return "Không tìm thấy mã xác thực, hãy thử lại!";
    case "en":
      return "Verification code not found, please try again!";
    case "zh":
      return "未找到验证码，请重试！";
    case "fr":
      return "Code de vérification introuvable, veuillez réessayer !";
    case "ja":
      return "認証コードが見つかりません、もう一度お試しください！";
    default:
      return "Verification code not found, please try again!";
  }
};

export const translateIncorrectVerificationCode = (language: string) => {
  switch (language) {
    case "vi":
      return "Mã xác thực không chính xác, hãy thử lại!";
    case "en":
      return "Incorrect verification code, please try again!";
    case "zh":
      return "验证码不正确，请重试！";
    case "fr":
      return "Code de vérification incorrect, veuillez réessayer !";
    case "ja":
      return "認証コードが正しくありません、もう一度お試しください！";
    default:
      return "Incorrect verification code, please try again!";
  }
};

export const translateVerificationCodeExpired = (language: string) => {
  switch (language) {
    case "vi":
      return "Mã xác thực đã hết hạn!";
    case "en":
      return "The verification code has expired!";
    case "zh":
      return "验证码已过期！";
    case "fr":
      return "Le code de vérification a expiré !";
    case "ja":
      return "認証コードは期限切れです！";
    default:
      return "The verification code has expired!";
  }
};

export const translateTooManyVerificationRequests = (
  language: string,
  timeBan: string
) => {
  switch (language) {
    case "vi":
      return `Bạn đã gửi lại mã xác thực quá nhiều lần và đã bị khóa tài khoản trong 24 giờ. Hãy quay lại vào lúc ${timeBan}.`;
    case "en":
      return `You have requested the verification code too many times and your account has been locked for 24 hours. Please come back at ${timeBan}.`;
    case "zh":
      return `您已多次请求验证码，账户已被锁定24小时。请在 ${timeBan} 后再试。`;
    case "fr":
      return `Vous avez demandé le code de vérification trop de fois et votre compte a été verrouillé pendant 24 heures. Revenez à ${timeBan}.`;
    case "ja":
      return `認証コードを何度も要求しすぎて、アカウントが24時間ロックされました。${timeBan} に戻ってください。`;
    default:
      return `You have requested the verification code too many times and your account has been locked for 24 hours. Please come back at ${timeBan}.`;
  }
};

export const translateDeviceExists = (language: string) => {
  switch (language) {
    case "vi":
      return "Thiết bị đã tồn tại.";
    case "en":
      return "The device already exists.";
    case "zh":
      return "设备已存在。";
    case "fr":
      return "L'appareil existe déjà.";
    case "ja":
      return "デバイスはすでに存在します。";
    default:
      return "The device already exists.";
  }
};

export const translateDeviceSearchError = (language: string) => {
  switch (language) {
    case "vi":
      return "Lỗi tìm kiếm thiết bị.";
    case "en":
      return "Device search error.";
    case "zh":
      return "设备搜索错误。";
    case "fr":
      return "Erreur de recherche de périphérique.";
    case "ja":
      return "デバイス検索エラー。";
    default:
      return "Device search error.";
  }
};

export const translateDeviceNotFound = (language: string) => {
  switch (language) {
    case "vi":
      return "Không tìm thấy UA trên thiết bị này.";
    case "en":
      return "UA not found on this device.";
    case "zh":
      return "此设备上未找到UA。";
    case "fr":
      return "UA introuvable sur cet appareil.";
    case "ja":
      return "このデバイスにはUAが見つかりません。";
    default:
      return "UA not found on this device.";
  }
};

export const translateDeviceSaveError = (language: string) => {
  switch (language) {
    case "vi":
      return "Lỗi lưu thiết bị vào dữ liệu.";
    case "en":
      return "Error saving device data.";
    case "zh":
      return "保存设备数据时出错。";
    case "fr":
      return "Erreur lors de l'enregistrement des données du périphérique.";
    case "ja":
      return "デバイスデータの保存エラー。";
    default:
      return "Error saving device data.";
  }
};

export const translateDeviceInfoNotFound = (language: string) => {
  switch (language) {
    case "vi":
      return "DeviceInfo không tìm thấy!";
    case "en":
      return "DeviceInfo not found!";
    case "zh":
      return "未找到DeviceInfo！";
    case "fr":
      return "DeviceInfo non trouvé !";
    case "ja":
      return "DeviceInfoが見つかりません！";
    default:
      return "DeviceInfo not found!";
  }
};

export const translateInvalidEmailOrPassword = (language: string) => {
  switch (language) {
    case "vi":
      return "Email hoặc mật khẩu không đúng!";
    case "en":
      return "Incorrect email or password!";
    case "zh":
      return "邮箱或密码不正确！";
    case "fr":
      return "Email ou mot de passe incorrect !";
    case "ja":
      return "メールアドレスまたはパスワードが間違っています！";
    default:
      return "Incorrect email or password!";
  }
};

export const translateMissingTokens = (language: string) => {
  switch (language) {
    case "vi":
      return "Thiếu Token! Hãy click lại reset password!";
    case "en":
      return "Missing Token! Please click to reset password again!";
    case "zh":
      return "缺少Token！请重新点击重置密码！";
    case "fr":
      return "Token manquant ! Veuillez cliquer à nouveau pour réinitialiser le mot de passe !";
    case "ja":
      return "トークンが不足しています！もう一度パスワードをリセットするためにクリックしてください！";
    default:
      return "Missing Token! Please click to reset password again!";
  }
};

export const translateTokenNotFound = (language: string) => {
  switch (language) {
    case "vi":
      return "Không tìm thấy Token. Hãy send resetpassword click lại!";
    case "en":
      return "Token not found. Please send reset password and click again!";
    case "zh":
      return "找不到Token！请重新发送重置密码并点击！";
    case "fr":
      return "Token introuvable. Veuillez envoyer à nouveau la réinitialisation du mot de passe et cliquez !";
    case "ja":
      return "トークンが見つかりません！もう一度パスワードリセットを送信し、クリックしてください！";
    default:
      return "Token not found. Please send reset password and click again!";
  }
};

export const translateEmailNotFound = (language: string) => {
  switch (language) {
    case "vi":
      return "Không tìm thấy Email!";
    case "en":
      return "Email not found!";
    case "zh":
      return "找不到Email！";
    case "fr":
      return "Email introuvable !";
    case "ja":
      return "メールが見つかりません！";
    default:
      return "Email not found!";
  }
};

export const translateAccountLocked = (language: string) => {
  switch (language) {
    case "vi":
      return "Tài khoản của bạn đã bị khóa. Không thể đổi lại mật khẩu. Hãy kiểm tra Email để biết thời gian mở khóa!";
    case "en":
      return "Your account has been locked. Password cannot be reset. Please check your email for the unlock time!";
    case "zh":
      return "您的账户已被锁定。无法重置密码。请检查您的电子邮件以了解解锁时间！";
    case "fr":
      return "Votre compte a été verrouillé. Impossible de réinitialiser le mot de passe. Veuillez vérifier votre e-mail pour connaître l'heure de déverrouillage !";
    case "ja":
      return "アカウントはロックされています。パスワードはリセットできません。アンロックの時間についてはメールをご確認ください！";
    default:
      return "Your account has been locked. Password cannot be reset. Please check your email for the unlock time!";
  }
};

export const translatePasswordNotFound = (language: string) => {
  switch (language) {
    case "vi":
      return "Mật khẩu của người dùng không tồn tại!";
    case "en":
      return "User's password does not exist!";
    case "zh":
      return "用户的密码不存在！";
    case "fr":
      return "Le mot de passe de l'utilisateur n'existe pas !";
    case "ja":
      return "ユーザーのパスワードは存在しません！";
    default:
      return "User's password does not exist!";
  }
};

export const translatePasswordMismatch = (
  language: string,
  passwordSetDate: string
) => {
  switch (language) {
    case "vi":
      return `Mật khẩu mới không được giống mật khẩu cũ! Mật khẩu cũ đã được đặt vào ngày ${passwordSetDate}.`;
    case "en":
      return `The new password cannot be the same as the old password! The old password was set on ${passwordSetDate}.`;
    case "zh":
      return `新密码不能与旧密码相同！旧密码设置日期为 ${passwordSetDate}。`;
    case "fr":
      return `Le nouveau mot de passe ne peut pas être identique à l'ancien ! L'ancien mot de passe a été défini le ${passwordSetDate}.`;
    case "ja":
      return `新しいパスワードは古いパスワードと同じであってはなりません！ 古いパスワードは ${passwordSetDate} に設定されました。`;
    default:
      return `The new password cannot be the same as the old password! The old password was set on ${passwordSetDate}.`;
  }
};

export const translateTooManyAttempts = (language: string, timeBan: string) => {
  switch (language) {
    case "vi":
      return `Bạn đã gửi lại mã xác thực quá nhiều lần và đã bị khóa tài khoản trong 24 giờ. Hãy quay lại vào lúc ${timeBan}.`;
    case "en":
      return `You have sent the verification code too many times and your account has been locked for 24 hours. Please come back at ${timeBan}.`;
    case "zh":
      return `您已多次发送验证码，账户已被锁定24小时。请在 ${timeBan} 后再试。`;
    case "fr":
      return `Vous avez envoyé trop de fois le code de vérification et votre compte a été verrouillé pendant 24 heures. Revenez à ${timeBan}.`;
    case "ja":
      return `認証コードを何度も送信しすぎて、アカウントが24時間ロックされました。${timeBan} に戻ってきてください。`;
    default:
      return `You have sent the verification code too many times and your account has been locked for 24 hours. Please come back at ${timeBan}.`;
  }
};

export const translateTokenExpired = (language: string) => {
  switch (language) {
    case "vi":
      return "Token đã hết hạn! Đã gửi lại token mới. Hãy kiểm tra email.";
    case "en":
      return "Token has expired! A new token has been sent. Please check your email.";
    case "zh":
      return "Token已过期！已发送新的token，请检查电子邮件。";
    case "fr":
      return "Le token a expiré ! Un nouveau token a été envoyé. Veuillez vérifier votre e-mail.";
    case "ja":
      return "トークンの期限が切れました！新しいトークンが送信されました。メールを確認してください。";
    default:
      return "Token has expired! A new token has been sent. Please check your email.";
  }
};

export const translatePasswordUpdated = (language: string) => {
  switch (language) {
    case "vi":
      return "Mật khẩu mới đã cập nhật lại !";
    case "en":
      return "The new password has been updated!";
    case "zh":
      return "新密码已更新！";
    case "fr":
      return "Le nouveau mot de passe a été mis à jour !";
    case "ja":
      return "新しいパスワードが更新されました！";
    default:
      return "The new password has been updated!";
  }
};

export const translateEmailVerified = (language: string) => {
  switch (language) {
    case "vi":
      return "Email đã xác thực!";
    case "en":
      return "Email has been verified!";
    case "zh":
      return "电子邮件已验证！";
    case "fr":
      return "L'email a été vérifié !";
    case "ja":
      return "メールが確認されました！";
    default:
      return "Email has been verified!";
  }
};

export const translateEmailNotExist = (language: string) => {
  switch (language) {
    case "vi":
      return "Email hiện tại không có!";
    case "en":
      return "Current email does not exist!";
    case "zh":
      return "当前电子邮件不存在！";
    case "fr":
      return "L'email actuel n'existe pas !";
    case "ja":
      return "現在のメールは存在しません！";
    default:
      return "Current email does not exist!";
  }
};

export const translateAccountLockedForVerification = (language: string) => {
  switch (language) {
    case "vi":
      return "Tài khoản của bạn đã bị khóa. Không thể gửi lại mã xác thực mới. Hãy kiểm tra Email để biết thời gian mở khóa!";
    case "en":
      return "Your account has been locked. Cannot send a new verification code. Please check your email for the unlock time!";
    case "zh":
      return "您的账户已被锁定。无法发送新的验证码。请检查电子邮件以了解解锁时间！";
    case "fr":
      return "Votre compte a été verrouillé. Impossible d'envoyer un nouveau code de vérification. Veuillez vérifier votre e-mail pour connaître l'heure de déverrouillage !";
    case "ja":
      return "アカウントがロックされています。新しい認証コードを送信できません。アンロックの時間についてはメールをご確認ください！";
    default:
      return "Your account has been locked. Cannot send a new verification code. Please check your email for the unlock time!";
  }
};

export const translatePasswordRequirements = (language: string) => {
  switch (language) {
    case "vi":
      return "Mật khẩu yêu cầu [a-z] và [0-9], từ 6 đến 20 ký tự!";
    case "en":
      return "Password must contain [a-z] and [0-9], between 6 to 20 characters!";
    case "zh":
      return "密码要求包含 [a-z] 和 [0-9]，长度为 6 到 20 个字符！";
    case "fr":
      return "Le mot de passe doit contenir [a-z] et [0-9], entre 6 et 20 caractères !";
    case "ja":
      return "パスワードは [a-z] と [0-9] を含み、6〜20文字でなければなりません！";
    default:
      return "Password must contain [a-z] and [0-9], between 6 to 20 characters!";
  }
};

export const translatePleaseFillOutAllFields = (language: string) => {
  switch (language) {
    case "vi":
      return "Vui lòng nhập đầy đủ thông tin.";
    case "en":
      return "Please fill out all fields.";
    case "zh":
      return "请输入完整信息。";
    case "fr":
      return "Veuillez remplir toutes les informations.";
    case "ja":
      return "すべての情報を入力してください。";
    default:
      return "Please fill out all fields.";
  }
};

export const translateEmailAlreadyUsed = (language: string) => {
  switch (language) {
    case "vi":
      return "Email đã được sử dụng!";
    case "en":
      return "Email has already been used!";
    case "zh":
      return "电子邮件已被使用！";
    case "fr":
      return "L'email a déjà été utilisé !";
    case "ja":
      return "メールはすでに使用されています！";
    default:
      return "Email has already been used!";
  }
};

export const translateSuccessCheckEmail = (language: string) => {
  switch (language) {
    case "vi":
      return "Thành công. Hãy kiểm tra email của bạn!";
    case "en":
      return "Success. Please check your email!";
    case "zh":
      return "成功。请检查您的电子邮件！";
    case "fr":
      return "Succès. Veuillez vérifier votre e-mail !";
    case "ja":
      return "成功しました。メールを確認してください！";
    default:
      return "Success. Please check your email!";
  }
};

export const translateGuestAccountCannotResetPassword = (language: string) => {
  switch (language) {
    case "vi":
      return "Không thể đặt lại mật khẩu cho tài khoản khách. Đây là tài khoản cộng đồng!";
    case "en":
      return "Password cannot be reset for guest accounts. This is a community account!";
    case "zh":
      return "无法为访客帐户重置密码。这是一个社区帐户！";
    case "fr":
      return "Impossible de réinitialiser le mot de passe pour les comptes invités. C'est un compte communautaire !";
    case "ja":
      return "ゲストアカウントのパスワードはリセットできません。これはコミュニティアカウントです！";
    default:
      return "Password cannot be reset for guest accounts. This is a community account!";
  }
};

export const translateAccountLockedCannotChange = (language: string) => {
  switch (language) {
    case "vi":
      return "Tài khoản của bạn đã bị khóa. Không thể thay đổi. Hãy kiểm tra Email để biết thời gian mở khóa!";
    case "en":
      return "Your account has been locked. Cannot make changes. Please check your email for the unlock time!";
    case "zh":
      return "您的账户已被锁定。无法更改。请检查电子邮件以了解解锁时间！";
    case "fr":
      return "Votre compte a été verrouillé. Impossible de modifier. Veuillez vérifier votre e-mail pour connaître l'heure de déverrouillage !";
    case "ja":
      return "アカウントがロックされています。変更はできません。アンロックの時間についてはメールをご確認ください！";
    default:
      return "Your account has been locked. Cannot make changes. Please check your email for the unlock time!";
  }
};

export const translateEmailSentCheck = (language: string) => {
  switch (language) {
    case "vi":
      return "Đã gửi đến email hãy kiểm tra!";
    case "en":
      return "Sent to email, please check!";
    case "zh":
      return "已发送至电子邮件，请检查！";
    case "fr":
      return "Envoyé à l'email, veuillez vérifier !";
    case "ja":
      return "メールに送信されました。ご確認ください！";
    default:
      return "Sent to email, please check!";
  }
};

export const translateTooManyVerificationAttempts = (
  language: string,
  timeBan: string
) => {
  switch (language) {
    case "vi":
      return `Bạn đã gửi lại mã xác thực làm mới mật khẩu quá nhiều lần và đã bị khóa tài khoản trong 24 giờ. Hãy vào lại vào lúc ${timeBan}.`;
    case "en":
      return `You have sent the verification code to reset your password too many times and your account has been locked for 24 hours. Please come back at ${timeBan}.`;
    case "zh":
      return `您已多次发送重置密码的验证码，账户已被锁定24小时。请在 ${timeBan} 后再试。`;
    case "fr":
      return `Vous avez envoyé trop de fois le code de vérification pour réinitialiser le mot de passe et votre compte a été verrouillé pendant 24 heures. Revenez à ${timeBan}.`;
    case "ja":
      return `パスワードリセットの認証コードを何度も送信しすぎて、アカウントが24時間ロックされました。${timeBan} に戻ってきてください。`;
    default:
      return `You have sent the verification code to reset your password too many times and your account has been locked for 24 hours. Please come back at ${timeBan}.`;
  }
};

export const translateNotAllowed = (language: string) => {
  switch (language) {
    case "vi":
      return "Không được phép!";
    case "en":
      return "Not allowed!";
    case "zh":
      return "不允许！";
    case "fr":
      return "Non autorisé !";
    case "ja":
      return "許可されていません！";
    default:
      return "Not allowed!";
  }
};

export const translateEmailAlreadyInUse = (language: string) => {
  switch (language) {
    case "vi":
      return "Email đã được sử dụng!";
    case "en":
      return "Email already in use!";
    case "zh":
      return "电子邮件已被使用！";
    case "fr":
      return "L'email est déjà utilisé !";
    case "ja":
      return "メールはすでに使用されています！";
    default:
      return "Email already in use!";
  }
};

export const translateEmailVerifiedSuccess = (language: string) => {
  switch (language) {
    case "vi":
      return "Xác thực email thành công!";
    case "en":
      return "Email verification successful!";
    case "zh":
      return "电子邮件验证成功！";
    case "fr":
      return "Vérification de l'email réussie !";
    case "ja":
      return "メールの確認に成功しました！";
    default:
      return "Email verification successful!";
  }
};

export const translateNewPasswordCannotBeSameAsOld = (
  language: string,
  passwordSetDate: string
) => {
  switch (language) {
    case "vi":
      return `Mật khẩu mới không được giống mật khẩu cũ! Mật khẩu cũ đã được đặt vào ngày ${passwordSetDate}.`;
    case "en":
      return `New password cannot be the same as the old one! The old password was set on ${passwordSetDate}.`;
    case "zh":
      return `新密码不能与旧密码相同！旧密码已设置于 ${passwordSetDate}。`;
    case "fr":
      return `Le nouveau mot de passe ne peut pas être identique à l'ancien ! L'ancien mot de passe a été défini le ${passwordSetDate}.`;
    case "ja":
      return `新しいパスワードは古いパスワードと同じではいけません！古いパスワードは ${passwordSetDate} に設定されました。`;
    default:
      return `New password cannot be the same as the old one! The old password was set on ${passwordSetDate}.`;
  }
};

export const translateChangeSuccessful = (language: string) => {
  switch (language) {
    case "vi":
      return "Thay đổi thành công!";
    case "en":
      return "Change successful!";
    case "zh":
      return "更改成功！";
    case "fr":
      return "Changement réussi !";
    case "ja":
      return "変更成功！";
    default:
      return "Change successful!";
  }
};

export const translateUsernameAlreadyTaken = (language: string) => {
  switch (language) {
    case "vi":
      return "Tên người dùng này đã có người đặt!";
    case "en":
      return "This username is already taken!";
    case "zh":
      return "此用户名已被占用！";
    case "fr":
      return "Ce nom d'utilisateur est déjà pris !";
    case "ja":
      return "このユーザー名はすでに使用されています！";
    default:
      return "This username is already taken!";
  }
};

export const translateMenuItems = (language: string) => {
  switch (language) {
    case "vi":
      return {
        name1: "Trang cá nhân",
        name2: "Sản phẩm đã mua",
        name3: "Đơn vận chuyển",
        name4: "Kho voucher",
        name5: "Cài đặt",
        name6: "Đăng xuất",
        name7: "Danh sách trực tiếp", // Added "listlive"
      };
    case "en":
      return {
        name1: "Profile Page",
        name2: "Purchased Products",
        name3: "Shipping Orders",
        name4: "Voucher Storage",
        name5: "Settings",
        name6: "Logout",
        name7: "Live List", // Added "listlive"
      };
    case "zh":
      return {
        name1: "个人页面",
        name2: "已购买的产品",
        name3: "运输订单",
        name4: "优惠券库",
        name5: "设置",
        name6: "登出",
        name7: "实时列表", // Added "listlive"
      };
    case "fr":
      return {
        name1: "Page de profil",
        name2: "Produits achetés",
        name3: "Commandes de livraison",
        name4: "Stock de bons",
        name5: "Paramètres",
        name6: "Déconnexion",
        name7: "Liste en direct", // Added "listlive"
      };
    case "ja":
      return {
        name1: "プロフィールページ",
        name2: "購入した商品",
        name3: "配送注文",
        name4: "バウチャー庫",
        name5: "設定",
        name6: "ログアウト",
        name7: "ライブリスト", // Added "listlive"
      };
    default:
      return {
        name1: "Profile Page",
        name2: "Purchased Products",
        name3: "Shipping Orders",
        name4: "Voucher Storage",
        name5: "Settings",
        name6: "Logout",
        name7: "Live List", // Added "listlive"
      };
  }
  
};

export const translateNameuser = (language: string) => {
  switch (language) {
    case "vi":
      return "tênngườidùng";
    case "en":
      return "username";
    case "zh":
      return "用户名";
    case "fr":
      return "nom d'utilisateur";
    case "ja":
      return "ユーザー名";
    default:
      return "username"; // Mặc định nếu ngôn ngữ không hợp lệ
  }
};

export const translateImageCellOne = (language: string) => {
  switch (language) {
    case "vi":
      return {
        name1: "Xem Live",
        name2: "Xem ảnh đại diện",
        name3: "Thay ảnh đại diện",
        name4: "Chỉnh sửa ảnh đại diện",
        name5:
          "Ảnh đại diện giúp mọi người nhận biết bạn dễ dàng hơn qua các bài viết, bình luận, tin nhắn...",
      };
    case "en":
      return {
        name1: "Watch Live",
        name2: "View Profile Picture",
        name3: "Change Profile Picture",
        name4: "Edit Profile Picture",
        name5:
          "Your profile picture makes it easier for others to recognize you in posts, comments, and messages.",
      };
    case "zh":
      return {
        name1: "观看直播",
        name2: "查看头像",
        name3: "更换头像",
        name4: "编辑头像",
        name5: "头像可以帮助其他人更容易地通过帖子、评论和消息识别你。",
      };
    case "fr":
      return {
        name1: "Live",
        name2: "Voir photo",
        name3: "Changer photo",
        name4: "Modifier photo",
        name5: "Photo pour vous reconnaître facilement.",
      };
    case "ja":
      return {
        name1: "ライブ",
        name2: "写真を見る",
        name3: "写真を変更",
        name4: "写真を編集",
        name5: "写真で認識が簡単に。",
      };
    default:
      return {
        name1: "Watch Live",
        name2: "View Profile Picture",
        name3: "Change Profile Picture",
        name4: "Edit Profile Picture",
        name5:
          "Your profile picture makes it easier for others to recognize you in posts, comments, and messages.",
      };
  }
};

export const translateUserAndEmailMessage = (
  language: string,
  email: string
) => {
  switch (language) {
    case "vi":
      return `Người dùng: ${email}`;
    case "en":
      return `User: ${email}`;
    case "zh":
      return `用户: ${email}`;
    case "fr":
      return `Utilisateur : ${email}`;
    case "ja":
      return `ユーザー: ${email}`;
    default:
      return `User: ${email}`;
  }
};

export const translateAccountCreatedMessage = (
  language: string,
  createdAt: string
) => {
  switch (language) {
    case "vi":
      return `Tài khoản đã thành lập ngày - ${createdAt}`;
    case "en":
      return `Account was created on - ${createdAt}`;
    case "zh":
      return `账户创建日期 - ${createdAt}`;
    case "fr":
      return `Compte créé le - ${createdAt}`;
    case "ja":
      return `アカウント作成日 - ${createdAt}`;
    default:
      return `Account was created on - ${createdAt}`;
  }
};

export const translateRevenue = (language: string) => {
  switch (language) {
    case "vi":
      return {
        name1: "Tổng doanh thu",
        name2: "Tổng doanh thu chưa giảm giá",
        name3: "Tổng doanh thu bảo hành",
        name4: "Số đơn hàng",
        name5: "Tổng sản phẩm còn",
        name6: "Tổng sản phẩm còn",
        name7: "Sản phẩm hết hàng",
      };
    case "en":
      return {
        name1: "Total Revenue",
        name2: "Total Revenue Before Discount",
        name3: "Total Warranty Revenue",
        name4: "Number of Orders",
        name5: "Total Remaining Products",
        name6: "Total Remaining Products",
        name7: "Out-of-Stock Products",
      };
    case "zh":
      return {
        name1: "总收入",
        name2: "折扣前总收入",
        name3: "保修总收入",
        name4: "订单总数",
        name5: "剩余产品总数",
        name6: "剩余产品总数",
        name7: "缺货产品",
      };
    case "fr":
      return {
        name1: "Revenu total",
        name2: "Revenu total avant remise",
        name3: "Revenu total sous garantie",
        name4: "Nombre de commandes",
        name5: "Total des produits restants",
        name6: "Total des produits restants",
        name7: "Produits en rupture de stock",
      };
    case "ja":
      return {
        name1: "総収益",
        name2: "割引前の総収益",
        name3: "保証収益合計",
        name4: "注文数",
        name5: "残りの総製品",
        name6: "残りの総製品",
        name7: "在庫切れ製品",
      };
    default:
      return {
        name1: "Total Revenue",
        name2: "Total Revenue Before Discount",
        name3: "Total Warranty Revenue",
        name4: "Number of Orders",
        name5: "Total Remaining Products",
        name6: "Total Remaining Products",
        name7: "Out-of-Stock Products",
      };
  }
};

export const translateChartData = (language: string) => {
  switch (language) {
    case "vi":
      return {
        name1: "Biểu đồ cột tổng tiền tháng",
        name2: "Biểu đồ tổng hợp bảo hành, doanh thu, tiền sale tháng",
        name3: "Biểu đồ đường doanh thu ngày",
        name4: "Biểu đồ map tổng người dùng",
      };
    case "en":
      return {
        name1: "Monthly Total Amount Column Chart",
        name2: "Combined Chart of Warranty, Revenue, and Monthly Sales",
        name3: "Daily Revenue Line Chart",
        name4: "User Map Chart",
      };
    case "zh":
      return {
        name1: "月总金额柱状图",
        name2: "保修、收入和月销售额综合图表",
        name3: "每日收入折线图",
        name4: "用户地图图表",
      };
    case "fr":
      return {
        name1: "Graphique en colonnes des montants mensuels",
        name2: "Graphique combiné garantie, revenus et ventes mensuelles",
        name3: "Graphique en courbes des revenus journaliers",
        name4: "Graphique de carte des utilisateurs",
      };
    case "ja":
      return {
        name1: "月間総金額の棒グラフ",
        name2: "保証、収益、月間セールの統合グラフ",
        name3: "日次収益の折れ線グラフ",
        name4: "ユーザーマップグラフ",
      };
    default:
      return {
        name1: "Monthly Total Amount Column Chart",
        name2: "Combined Chart of Warranty, Revenue, and Monthly Sales",
        name3: "Daily Revenue Line Chart",
        name4: "User Map Chart",
      };
  }
};

export const translateChartTypes = (language: string) => {
  switch (language) {
    case "vi":
      return {
        name1: "Biểu đồ tròn",
        name2: "Biểu đồ bán kính",
        name3: "Biểu đồ funnel",
        name4: "Biểu đồ sở thích người dùng",
      };
    case "en":
      return {
        name1: "Pie Chart",
        name2: "Radar Chart",
        name3: "Funnel Chart",
        name4: "User Preference Chart",
      };
    case "zh":
      return {
        name1: "饼图",
        name2: "雷达图",
        name3: "漏斗图",
        name4: "用户偏好图",
      };
    case "fr":
      return {
        name1: "Graphique en camembert",
        name2: "Graphique en radar",
        name3: "Graphique en entonnoir",
        name4: "Graphique des préférences des utilisateurs",
      };
    case "ja":
      return {
        name1: "円グラフ",
        name2: "レーダーチャート",
        name3: "ファunnelチャート",
        name4: "ユーザーの好みグラフ",
      };
    default:
      return {
        name1: "Pie Chart",
        name2: "Radar Chart",
        name3: "Funnel Chart",
        name4: "User Preference Chart",
      };
  }
};

export const translateChooseChart = (language: string) => {
  switch (language) {
    case "vi":
      return "Lựa chọn biểu đồ";
    case "en":
      return "Choose Chart";
    case "zh":
      return "选择图表";
    case "fr":
      return "Choisir un graphique";
    case "ja":
      return "グラフを選択";
    default:
      return "Choose Chart"; // Mặc định là tiếng Anh
  }
};

export const translateSelectDateMessage = (language: string) => {
  switch (language) {
    case "vi":
      return "Vui lòng chọn ngày để tìm dữ liệu...";
    case "en":
      return "Please select date to find data...";
    case "zh":
      return "请选择日期以查找数据...";
    case "fr":
      return "Veuillez sélectionner une date pour trouver les données...";
    case "ja":
      return "データを見つけるために日付を選択してください...";
    default:
      return "Please select date to find data..."; // Default is English
  }
};

export const translateDeliveryOptions = (language: string) => {
  switch (language) {
    case "vi":
      return {
        name1: "Giao nhận tại cửa hàng",
        name2: "Giao hàng trực tuyến",
        name3: "Nam",
        name4: "Nữ",
        name5: "Khác",
        name6: "Trả hàng tại cửa hàng",
        name7: "Trả hàng trực tuyến",
      };
    case "en":
      return {
        name1: "Pickup Delivery",
        name2: "Online Delivery",
        name3: "Male",
        name4: "Female",
        name5: "Other",
        name6: "Pickup Return",
        name7: "Online Return",
      };
    case "zh":
      return {
        name1: "门店取货配送",
        name2: "在线配送",
        name3: "男性",
        name4: "女性",
        name5: "其他",
        name6: "门店取货退货",
        name7: "在线退货",
      };
    case "fr":
      return {
        name1: "Livraison en point de retrait",
        name2: "Livraison en ligne",
        name3: "Homme",
        name4: "Femme",
        name5: "Autre",
        name6: "Retour en point de retrait",
        name7: "Retour en ligne",
      };
    case "ja":
      return {
        name1: "店舗受け取り配送",
        name2: "オンライン配送",
        name3: "男性",
        name4: "女性",
        name5: "その他",
        name6: "店舗受け取り返品",
        name7: "オンライン返品",
      };
    default:
      return {
        name1: "Pickup Delivery",
        name2: "Online Delivery",
        name3: "Male",
        name4: "Female",
        name5: "Other",
        name6: "Pickup Return",
        name7: "Online Return",
      };
  }
};

export const translateSalesData = (language: string) => {
  switch (language) {
    case "vi":
      return {
        name1: "Tổng số bán",
        name2: "Tổng số đơn hàng",
      };
    case "en":
      return {
        name1: "Total Sold",
        name2: "Total Order Items",
      };
    case "zh":
      return {
        name1: "总销售量",
        name2: "总订单项",
      };
    case "fr":
      return {
        name1: "Total Vendu",
        name2: "Total des Articles Commandés",
      };
    case "ja":
      return {
        name1: "総売上",
        name2: "注文アイテム総数",
      };
    default:
      return {
        name1: "Total Sold",
        name2: "Total Order Items",
      };
  }
};

export const translateRole = (language: string) => {
  switch (language) {
    case 'vi': 
      return "Vai trò";
    case 'en': 
      return "Role";
    case 'zh': 
      return "角色";
    case 'fr': 
      return "Rôle";
    case 'ja': 
      return "役割";
    default: 
      return "Role"; // Default to English
  }
};

export const translateCreatedAt = (language: string) => {
  switch (language) {
    case 'vi': 
      return "Ngày tạo";
    case 'en': 
      return "Created At";
    case 'zh': 
      return "创建于";
    case 'fr': 
      return "Créé le";
    case 'ja': 
      return "作成日";
    default: 
      return "Created At"; // Default to English
  }
};

export const translateFavoritesNameChart = (language: string) => {
  switch (language) {
    case 'vi': 
      return {
        name1: "Tổng số yêu thích",
        name2: "Tổng sản phẩm yêu thích",
      };
    case 'en': 
      return {
        name1: "Total Favorite",
        name2: "Total Favorite Product",
      };
    case 'zh': 
      return {
        name1: "总收藏",
        name2: "总收藏产品",
      };
    case 'fr': 
      return {
        name1: "Total Favoris",
        name2: "Total des Produits Favoris",
      };
    case 'ja': 
      return {
        name1: "総お気に入り",
        name2: "総お気に入り製品",
      };
    default: 
      return {
        name1: "Total Favorite",
        name2: "Total Favorite Product",
      };
  }
};

export const translateSettings = (language: string) => {
  switch (language) {
    case 'vi': 
      return {
        name1: "Ảnh",
        name2: "Chế độ",
        name3: "Cài đặt",
        name4: "Thoát",
      };
    case 'en': 
      return {
        name1: "Image",
        name2: "Mode",
        name3: "Settings",
        name4: "Logout",
      };
    case 'zh': 
      return {
        name1: "图片",
        name2: "模式",
        name3: "设置",
        name4: "退出",
      };
    case 'fr': 
      return {
        name1: "Image",
        name2: "Mode",
        name3: "Paramètres",
        name4: "Déconnexion",
      };
    case 'ja': 
      return {
        name1: "画像",
        name2: "モード",
        name3: "設定",
        name4: "ログアウト",
      };
    default: 
      return {
        name1: "Image",
        name2: "Mode",
        name3: "Settings",
        name4: "Logout",
      };
  }
};

export const translateRolesCustomNav = (language: string) => {
  switch (language) {
    case 'vi': 
      return {
        name1: "ADMIN",
        name2: "quản lý tất cả các vai trò",
        name3: "STAFF",
        name4: "và",
        name5: "USER",
        name6: "đây được coi là vai trò cao nhất. Sử dụng tất cả các chức năng.",
        name7: "quản lý đơn hàng, thêm, chỉnh sửa sản phẩm và quản lý đơn hàng và giao hàng của khách hàng.",
        name8: "không thể xem được nội dung trong",
        name9: "chỉ có thể tương tác được trên trang sản phẩm.",
      };
    case 'en': 
      return {
        name1: "ADMIN",
        name2: "manage all roles",
        name3: "STAFF",
        name4: "and",
        name5: "USER",
        name6: "this is considered the highest role. Use all functionalities.",
        name7: "manage orders, add, edit products, and manage customer orders and delivery.",
        name8: "cannot view content in",
        name9: "can only interact on the product page.",
      };
    case 'zh': 
      return {
        name1: "管理员",
        name2: "管理所有角色",
        name3: "员工",
        name4: "和",
        name5: "用户",
        name6: "这是被认为是最高的角色。使用所有功能。",
        name7: "管理订单，添加、编辑产品，管理客户订单和配送。",
        name8: "无法查看",
        name9: "只能在产品页面上进行交互。",
      };
    case 'fr': 
      return {
        name1: "ADMIN",
        name2: "gérer tous les rôles",
        name3: "STAFF",
        name4: "et",
        name5: "USER",
        name6: "il s'agit du rôle le plus élevé. Utilisez toutes les fonctionnalités.",
        name7: "gérer les commandes, ajouter, modifier des produits et gérer les commandes et la livraison des clients.",
        name8: "ne peut pas voir le contenu dans",
        name9: "peut uniquement interagir sur la page produit.",
      };
    case 'ja': 
      return {
        name1: "管理者",
        name2: "すべての役割を管理",
        name3: "スタッフ",
        name4: "と",
        name5: "ユーザー",
        name6: "これは最も高い役割と見なされます。すべての機能を使用できます。",
        name7: "注文を管理し、製品を追加、編集し、顧客の注文と配送を管理します。",
        name8: "コンテンツは表示できません",
        name9: "製品ページでのみインタラクションできます。",
      };
    default: 
    return {
      name1: "ADMIN",
      name2: "manage all roles",
      name3: "STAFF",
      name4: "and",
      name5: "USER",
      name6: "this is considered the highest role. Use all functionalities.",
      name7: "manage orders, add, edit products, and manage customer orders and delivery.",
      name8: "cannot view content in",
      name9: "can only interact on the product page.",
    };
  }
};

export const translateSelectStore = (language: string) => {
  switch (language) {
    case 'vi': 
      return "Vui lòng chọn một cửa hàng";
    case 'en': 
      return "Please select a store";
    case 'zh': 
      return "请选择一个商店";
    case 'fr': 
      return "Veuillez sélectionner un magasin";
    case 'ja': 
      return "店舗を選択してください";
    default: 
      return "Please select a store";
  }
};

export const translateSearchStore = (language: string) => {
  switch (language) {
    case 'vi': 
      return "Tìm kiếm cửa hàng";
    case 'en': 
      return "Search store";
    case 'zh': 
      return "搜索商店";
    case 'fr': 
      return "Chercher un magasin";
    case 'ja': 
      return "店舗を検索";
    default: 
      return "Search store";
  }
};

export const translateStoreNotFound = (language: string) => {
  switch (language) {
    case 'vi': 
      return "Không tìm thấy cửa hàng";
    case 'en': 
      return "Store not found";
    case 'zh': 
      return "未找到商店";
    case 'fr': 
      return "Magasin introuvable";
    case 'ja': 
      return "店舗が見つかりません";
    default: 
      return "Store not found";
  }
};

export const translateCreateStore = (language: string) => {
  switch (language) {
    case 'vi': 
      return "Tạo cửa hàng";
    case 'en': 
      return "Create store";
    case 'zh': 
      return "创建商店";
    case 'fr': 
      return "Créer un magasin";
    case 'ja': 
      return "店舗を作成";
    default: 
      return "Create store";
  }
};

export const translateMainNav = (language: string) => {
  switch (language) {
    case 'vi':
      return {
        name1: "Tổng quan",
        name2: "Nhân viên",
        name3: "Billboard",
        name4: "Loại hàng",
        name5: "Thông số",
        name6: "Sản phẩm",
        name7: "Đơn hàng",
        name8: "Người dùng",
        name9: "Thanh toán",
        name10: "Cài đặt",
      };
    case 'en':
      return {
        name1: "Overview",
        name2: "Employees",
        name3: "Billboard",
        name4: "Product Category",
        name5: "Specifications",
        name6: "Products",
        name7: "Orders",
        name8: "Users",
        name9: "Payments",
        name10: "Settings",
      };
    case 'zh':
      return {
        name1: "概览",
        name2: "员工",
        name3: "广告牌",
        name4: "商品类别",
        name5: "规格",
        name6: "产品",
        name7: "订单",
        name8: "用户",
        name9: "付款",
        name10: "设置",
      };
    case 'fr':
      return {
        name1: "Aperçu",
        name2: "Employés",
        name3: "Panneau d'affichage",
        name4: "Catégorie de produit",
        name5: "Spécifications",
        name6: "Produits",
        name7: "Commandes",
        name8: "Utilisateurs",
        name9: "Paiements",
        name10: "Paramètres",
      };
    case 'ja':
      return {
        name1: "概要",
        name2: "従業員",
        name3: "ビルボード",
        name4: "商品カテゴリ",
        name5: "仕様",
        name6: "製品",
        name7: "注文",
        name8: "ユーザー",
        name9: "支払い",
        name10: "設定",
      };
    default:
      return {
        name1: "Overview",
        name2: "Employees",
        name3: "Billboard",
        name4: "Product Category",
        name5: "Specifications",
        name6: "Products",
        name7: "Orders",
        name8: "Users",
        name9: "Payments",
        name10: "Settings",
      };
  }
};

export const translateMenuHintNavbarMultiple = (language: string) => {
  switch (language) {
    case 'vi':
      return {
        name1: "Doanh nghiệp",
        name2: "Blog",
        name3: "Trung tâm trợ giúp",
        name4: "Hướng dẫn",
        name5: "Bảo mật",
        name6: "Sự kiện",
      };
    case 'en':
      return {
        name1: "Enterprise",
        name2: "Blog",
        name3: "Help Center",
        name4: "Guides",
        name5: "Security",
        name6: "Events",
      };
    case 'zh':
      return {
        name1: "企业",
        name2: "博客",
        name3: "帮助中心",
        name4: "指南",
        name5: "安全",
        name6: "事件",
      };
    case 'fr':
      return {
        name1: "Entreprise",
        name2: "Blog",
        name3: "Centre d'aide",
        name4: "Guides",
        name5: "Sécurité",
        name6: "Événements",
      };
    case 'ja':
      return {
        name1: "企業",
        name2: "ブログ",
        name3: "ヘルプセンター",
        name4: "ガイド",
        name5: "セキュリティ",
        name6: "イベント",
      };
    default:
      return {
        name1: "Enterprise",
        name2: "Blog",
        name3: "Help Center",
        name4: "Guides",
        name5: "Security",
        name6: "Events",
      };
  }
};

export const translateNavbarRoute = (language: string) => {
  switch (language) {
    case 'vi':
      return {
        overview: "Tổng quan",
        salesDataOverview: "Tổng quan dữ liệu bán hàng.",
        stores: "Cửa hàng",
        storeList: "Danh sách các cửa hàng các địa điểm.",
        feedback: "Phản hồi",  
        storeReviews: "Danh sách các đánh giá về cửa hàng."
      };
    case 'en':
      return {
        overview: "Overview",
        salesDataOverview: "Overview of sales data.",
        stores: "Stores",
        storeList: "List of stores and locations.",
        feedback: "Feedback",  
        storeReviews: "List of reviews for the store."
      };
    case 'zh':
      return {
        overview: "概览",
        salesDataOverview: "销售数据概览。",
        stores: "商店",
        storeList: "商店和位置列表。",
        feedback: "反馈", 
        storeReviews: "店铺评论列表。"
      };
    case 'fr':
      return {
        overview: "Aperçu",
        salesDataOverview: "Aperçu des données de vente.",
        stores: "Magasins",
        storeList: "Liste des magasins et des emplacements.",
        feedback: "Feedback",  
        storeReviews: "Liste des avis sur le magasin."
      };
    case 'ja':
      return {
        overview: "概要",
        salesDataOverview: "売上データの概要。",
        stores: "店舗",
        storeList: "店舗と場所のリスト。",
        feedback: "フィードバック",  
        storeReviews: "店舗のレビュー一覧。"
      };
    default:
      return {
        overview: "Overview",
        salesDataOverview: "Overview of sales data.",
        stores: "Stores",
        storeList: "List of stores and locations.",
        feedback: "Feedback",  
        storeReviews: "List of reviews for the store."
      };
  }
};

export const translateAttendanceManagement = (language: string) => {
  switch (language) {
    case 'vi':
      return {
        employeeattendance: "Nhân viên điểm danh",
        automaticpayroll: "Nhân viên điểm danh tự động nhận lương",
        sendmail: "Gửi Mail",
        maildescription: "Người đến người dùng hoặc cộng đồng.",
        attendancecontrol: "Quản lý điểm danh",
        userattendance: "Quản lý dữ liệu điểm danh người dùng",
        salarymanagement: "Quản lý lương nhân viên",
        attendancepayroll: "Quản lý lương nhân viên khi điểm danh.",
        coinmanagement: "Quản lý xu, vòng quay",
        coinmanagementdesc: "Quản lý xu, vòng quay cho người dùng.",
        reviewmanagement: "Quản lý đánh giá",
        userreviews: "Quản lý đánh giá của người dùng.",
      };
    case 'en':
      return {
        employeeattendance: "Employee attendance",
        automaticpayroll: "Employee attendance automatically receives salary",
        sendmail: "Send Mail",
        maildescription: "To users or community.",
        attendancecontrol: "Attendance management",
        userattendance: "User attendance data management",
        salarymanagement: "Employee salary management",
        attendancepayroll: "Employee salary management on attendance.",
        coinmanagement: "Coin and spin management",
        coinmanagementdesc: "Manage coins and spins for users.",
        reviewmanagement: "Review management",
        userreviews: "Manage user reviews.",
      };
    case 'zh':
      return {
        employeeattendance: "员工打卡",
        automaticpayroll: "员工打卡自动领取工资",
        sendmail: "发送邮件",
        maildescription: "发送给用户或社区。",
        attendancecontrol: "打卡管理",
        userattendance: "用户打卡数据管理",
        salarymanagement: "员工薪资管理",
        attendancepayroll: "员工打卡时的薪资管理。",
        coinmanagement: "积分与转盘管理",
        coinmanagementdesc: "为用户管理积分与转盘。",
        reviewmanagement: "评论管理",
        userreviews: "管理用户评论。",
      };
    case 'fr':
      return {
        employeeattendance: "Pointage des employés",
        automaticpayroll: "Les employés reçoivent automatiquement leur salaire à l'heure du pointage",
        sendmail: "Envoyer un mail",
        maildescription: "Envoyé aux utilisateurs ou à la communauté.",
        attendancecontrol: "Gestion des pointages",
        userattendance: "Gestion des données de pointage des utilisateurs",
        salarymanagement: "Gestion des salaires des employés",
        attendancepayroll: "Gestion des salaires des employés lors du pointage.",
        coinmanagement: "Gestion des coins et des spins",
        coinmanagementdesc: "Gérer les coins et spins pour les utilisateurs.",
        reviewmanagement: "Gestion des avis",
        userreviews: "Gérer les avis des utilisateurs.",
      };
    case 'ja':
      return {
        employeeattendance: "従業員の出席",
        automaticpayroll: "従業員は出席時に自動的に給与を受け取ります",
        sendmail: "メールを送信",
        maildescription: "ユーザーまたはコミュニティに送信。",
        attendancecontrol: "出席管理",
        userattendance: "ユーザーの出席データ管理",
        salarymanagement: "従業員の給与管理",
        attendancepayroll: "出席時の従業員給与管理。",
        coinmanagement: "コインとスピンの管理",
        coinmanagementdesc: "ユーザーのためにコインとスピンを管理します。",
        reviewmanagement: "レビュー管理",
        userreviews: "ユーザーレビューの管理。",
      };
    default:
      return {
        employeeattendance: "Employee attendance",
        automaticpayroll: "Employee attendance automatically receives salary",
        sendmail: "Send Mail",
        maildescription: "To users or community.",
        attendancecontrol: "Attendance management",
        userattendance: "User attendance data management",
        salarymanagement: "Employee salary management",
        attendancepayroll: "Employee salary management on attendance.",
        coinmanagement: "Coin and spin management",
        coinmanagementdesc: "Manage coins and spins for users.",
        reviewmanagement: "Review management",
        userreviews: "Manage user reviews.",
      };
  }
};

export const translateBillboard = (language: string) => {
  switch (language) {
    case 'vi':
      return {
        adImage: "Ảnh quảng cáo",
        adImageManagement: "Quản lý ảnh quảng cáo trên trang bán hàng.",
        imageDescription: "Mô tả ảnh",
        adImageDetails: "Mô tả chi tiết ảnh quảng cáo."
      };
    case 'en':
      return {
        adImage: "Advertisement Image",
        adImageManagement: "Manage advertisement images on the sales page.",
        imageDescription: "Image Description",
        adImageDetails: "Detailed description of the advertisement image."
      };
    case 'zh':
      return {
        adImage: "广告图片",
        adImageManagement: "在销售页面管理广告图片。",
        imageDescription: "图片描述",
        adImageDetails: "广告图片的详细描述"
      };
    case 'fr':
      return {
        adImage: "Image publicitaire",
        adImageManagement: "Gérer les images publicitaires sur la page de vente.",
        imageDescription: "Description de l'image",
        adImageDetails: "Description détaillée de l'image publicitaire."
      };
    case 'ja':
      return {
        adImage: "広告画像",
        adImageManagement: "販売ページの広告画像を管理する。",
        imageDescription: "画像の説明",
        adImageDetails: "広告画像の詳細説明"
      };
    default:
      return {
        adImage: "Advertisement Image",
        adImageManagement: "Manage advertisement images on the sales page.",
        imageDescription: "Image Description",
        adImageDetails: "Detailed description of the advertisement image."
      };
  }
};

export const translateCategoriNavbar = (language: string) => {
  switch (language) {
    case 'vi':
      return {
        pin: "Pin",
        pinDescription: "Pin cho các thiết bị điện tử.",
        fan: "Quạt",
        fanDescription: "Loại Quạt đa dụng.",
        plasticPipe: "Ống nhựa , Ống lưới xanh",
        plasticPipeDescription: "Loại Ống nhựa , Ống lưới xanh đa dụng.",
        electricWire: "Dây điện",
        electricWireDescription: "Loại Dây điện đa dụng.",
        cuttingStone: "Đá cắt",
        cuttingStoneDescription: "Loại Đá cắt đa dụng.",
        lock: "Ổ khóa",
        lockDescription: "Loại Ổ khóa đa dụng.",
        glue: "Keo",
        glueDescription: "Loại Keo đa dụng.",
        socket: "Ổ cắm, mặt ổ cắm",
        socketDescription: "Loại Ổ cắm, mặt ổ cắm đa dụng.",
        paint: "Sơn",
        paintDescription: "Loại Sơn đa dụng.",
        bathroomMaterials: "Vật liệu nhà tắm",
        bathroomMaterialsDescription: "Loại Vật liệu nhà tắm đa dụng.",
        lightBulb: "Bóng đèn",
        lightBulbDescription: "Loại Bóng đèn đa dụng.",
        dailyUseItems: "Đồ thường dùng",
        dailyUseItemsDescription: "Loại Đồ thường dùng đa dụng."
      };
    case 'en':
      return {
        pin: "Pin",
        pinDescription: "Battery for electronic devices.",
        fan: "Fan",
        fanDescription: "Multipurpose Fan.",
        plasticPipe: "Plastic Pipe, Green Net Pipe",
        plasticPipeDescription: "Multipurpose Plastic Pipe, Green Net Pipe.",
        electricWire: "Electric Wire",
        electricWireDescription: "Multipurpose Electric Wire.",
        cuttingStone: "Cutting Stone",
        cuttingStoneDescription: "Multipurpose Cutting Stone.",
        lock: "Lock",
        lockDescription: "Multipurpose Lock.",
        glue: "Glue",
        glueDescription: "Multipurpose Glue.",
        socket: "Socket, Socket Faceplate",
        socketDescription: "Multipurpose Socket, Socket Faceplate.",
        paint: "Paint",
        paintDescription: "Multipurpose Paint.",
        bathroomMaterials: "Bathroom Materials",
        bathroomMaterialsDescription: "Multipurpose Bathroom Materials.",
        lightBulb: "Light Bulb",
        lightBulbDescription: "Multipurpose Light Bulb.",
        dailyUseItems: "Daily Use Items",
        dailyUseItemsDescription: "Multipurpose Daily Use Items."
      };
    case 'zh':
      return {
        pin: "电池",
        pinDescription: "用于电子设备的电池。",
        fan: "风扇",
        fanDescription: "多用途风扇。",
        plasticPipe: "塑料管，绿色网管",
        plasticPipeDescription: "多用途塑料管，绿色网管。",
        electricWire: "电线",
        electricWireDescription: "多用途电线。",
        cuttingStone: "切割石",
        cuttingStoneDescription: "多用途切割石。",
        lock: "锁",
        lockDescription: "多用途锁。",
        glue: "胶水",
        glueDescription: "多用途胶水。",
        socket: "插座，插座面板",
        socketDescription: "多用途插座，插座面板。",
        paint: "油漆",
        paintDescription: "多用途油漆。",
        bathroomMaterials: "浴室材料",
        bathroomMaterialsDescription: "多用途浴室材料。",
        lightBulb: "灯泡",
        lightBulbDescription: "多用途灯泡。",
        dailyUseItems: "日常用品",
        dailyUseItemsDescription: "多用途日常用品。"
      };
    case 'fr':
      return {
        pin: "Piles",
        pinDescription: "Piles pour appareils électroniques.",
        fan: "Ventilateur",
        fanDescription: "Ventilateur polyvalent.",
        plasticPipe: "Tube en plastique, Tube en filet vert",
        plasticPipeDescription: "Tube en plastique, Tube en filet vert polyvalent.",
        electricWire: "Fil électrique",
        electricWireDescription: "Fil électrique polyvalent.",
        cuttingStone: "Pierre de coupe",
        cuttingStoneDescription: "Pierre de coupe polyvalente.",
        lock: "Cadenas",
        lockDescription: "Cadenas polyvalent.",
        glue: "Colle",
        glueDescription: "Colle polyvalente.",
        socket: "Prise, Plaque de prise",
        socketDescription: "Prise polyvalente, Plaque de prise.",
        paint: "Peinture",
        paintDescription: "Peinture polyvalente.",
        bathroomMaterials: "Matériaux pour salle de bain",
        bathroomMaterialsDescription: "Matériaux pour salle de bain polyvalents.",
        lightBulb: "Ampoule",
        lightBulbDescription: "Ampoule polyvalente.",
        dailyUseItems: "Articles quotidiens",
        dailyUseItemsDescription: "Articles quotidiens polyvalents."
      };
    case 'ja':
      return {
        pin: "バッテリー",
        pinDescription: "電子機器用のバッテリー。",
        fan: "ファン",
        fanDescription: "多用途ファン。",
        plasticPipe: "プラスチック管、グリーンネット管",
        plasticPipeDescription: "多用途プラスチック管、グリーンネット管。",
        electricWire: "電線",
        electricWireDescription: "多用途電線。",
        cuttingStone: "切断石",
        cuttingStoneDescription: "多用途切断石。",
        lock: "ロック",
        lockDescription: "多用途ロック。",
        glue: "接着剤",
        glueDescription: "多用途接着剤。",
        socket: "ソケット、ソケット面板",
        socketDescription: "多用途ソケット、ソケット面板。",
        paint: "ペイント",
        paintDescription: "多用途ペイント。",
        bathroomMaterials: "バスルーム素材",
        bathroomMaterialsDescription: "多用途バスルーム素材。",
        lightBulb: "電球",
        lightBulbDescription: "多用途電球。",
        dailyUseItems: "日常用品",
        dailyUseItemsDescription: "多用途日常用品。"
      };
    default:
      return {
        pin: "Pin",
        pinDescription: "Battery for electronic devices.",
        fan: "Fan",
        fanDescription: "Multipurpose Fan.",
        plasticPipe: "Plastic Pipe, Green Net Pipe",
        plasticPipeDescription: "Multipurpose Plastic Pipe, Green Net Pipe.",
        electricWire: "Electric Wire",
        electricWireDescription: "Multipurpose Electric Wire.",
        cuttingStone: "Cutting Stone",
        cuttingStoneDescription: "Multipurpose Cutting Stone.",
        lock: "Lock",
        lockDescription: "Multipurpose Lock.",
        glue: "Glue",
        glueDescription: "Multipurpose Glue.",
        socket: "Socket, Socket Faceplate",
        socketDescription: "Multipurpose Socket, Socket Faceplate.",
        paint: "Paint",
        paintDescription: "Multipurpose Paint.",
        bathroomMaterials: "Bathroom Materials",
        bathroomMaterialsDescription: "Multipurpose Bathroom Materials.",
        lightBulb: "Light Bulb",
        lightBulbDescription: "Multipurpose Light Bulb.",
        dailyUseItems: "Daily Use Items",
        dailyUseItemsDescription: "Multipurpose Daily Use Items."
      };
  }
};

export const translateParamaterNavbar = (language: string) => {
  switch (language) {
    case 'vi':
      return {
        size: "Kích thước",
        sizeDescription: "Kích thước sản phẩm.",
        color: "Màu sắc",
        colorDescription: "Màu sắc sản phẩm.",
        productDetails: "Chi tiết sản phẩm",
        productDetailsDescription: "Mô tả chi tiết sản phẩm.",
        preferences: "Sở thích",
        preferencesDescription: "Sở thích của người dùng."
      };
    case 'en':
      return {
        size: "Size",
        sizeDescription: "Product size.",
        color: "Color",
        colorDescription: "Product color.",
        productDetails: "Product Details",
        productDetailsDescription: "Detailed product description.",
        preferences: "Preferences",
        preferencesDescription: "User preferences."
      };
    case 'zh':
      return {
        size: "尺寸",
        sizeDescription: "产品尺寸。",
        color: "颜色",
        colorDescription: "产品颜色。",
        productDetails: "产品详情",
        productDetailsDescription: "详细产品描述。",
        preferences: "偏好",
        preferencesDescription: "用户的偏好。"
      };
    case 'fr':
      return {
        size: "Taille",
        sizeDescription: "Taille du produit.",
        color: "Couleur",
        colorDescription: "Couleur du produit.",
        productDetails: "Détails du produit",
        productDetailsDescription: "Description détaillée du produit.",
        preferences: "Préférences",
        preferencesDescription: "Préférences des utilisateurs."
      };
    case 'ja':
      return {
        size: "サイズ",
        sizeDescription: "製品のサイズ。",
        color: "色",
        colorDescription: "製品の色。",
        productDetails: "製品詳細",
        productDetailsDescription: "製品の詳細説明。",
        preferences: "好み",
        preferencesDescription: "ユーザーの好み。"
      };
    default:
      return {
        size: "Size",
        sizeDescription: "Product size.",
        color: "Color",
        colorDescription: "Product color.",
        productDetails: "Product Details",
        productDetailsDescription: "Detailed product description.",
        preferences: "Preferences",
        preferencesDescription: "User preferences."
      };
  }
};

export const translateProductNavbar = (language: string) => {
  switch (language) {
    case 'vi':
      return {
        pin: "Pin",
        pinDescription: "Sản phẩm Pin.",
        fan: "Quạt",
        fanDescription: "Sản phẩm Quạt.",
        pipe: "Ống nhựa, Ống lưới xanh",
        pipeDescription: "Sản phẩm Ống nhựa, Ống lưới xanh.",
        wire: "Dây điện",
        wireDescription: "Sản phẩm Dây điện.",
        cuttingStone: "Đá cắt",
        cuttingStoneDescription: "Sản phẩm Đá cắt.",
        lock: "Ổ khóa",
        lockDescription: "Sản phẩm Ổ khóa.",
        glue: "Keo",
        glueDescription: "Sản phẩm Keo.",
        socket: "Ổ cắm, mặt ổ cắm",
        socketDescription: "Sản phẩm Ổ cắm, mặt ổ cắm.",
        paint: "Sơn",
        paintDescription: "Sản phẩm Sơn.",
        bathroomMaterial: "Vật liệu nhà tắm",
        bathroomMaterialDescription: "Sản phẩm Vật liệu nhà tắm.",
        lightBulb: "Bóng đèn",
        lightBulbDescription: "Sản phẩm Bóng đèn.",
        commonItems: "Đồ thường dùng",
        commonItemsDescription: "Sản phẩm Đồ thường dùng.",
        discount: "Giảm giá",
        discountDescription: "Giảm giá sản phẩm."
      };
    case 'en':
      return {
        pin: "Pin",
        pinDescription: "Pin product.",
        fan: "Fan",
        fanDescription: "Fan product.",
        pipe: "Plastic Pipe, Green Mesh Pipe",
        pipeDescription: "Plastic Pipe, Green Mesh Pipe product.",
        wire: "Electric Wire",
        wireDescription: "Electric Wire product.",
        cuttingStone: "Cutting Stone",
        cuttingStoneDescription: "Cutting Stone product.",
        lock: "Lock",
        lockDescription: "Lock product.",
        glue: "Glue",
        glueDescription: "Glue product.",
        socket: "Socket, Socket Cover",
        socketDescription: "Socket, Socket Cover product.",
        paint: "Paint",
        paintDescription: "Paint product.",
        bathroomMaterial: "Bathroom Material",
        bathroomMaterialDescription: "Bathroom Material product.",
        lightBulb: "Light Bulb",
        lightBulbDescription: "Light Bulb product.",
        commonItems: "Common Items",
        commonItemsDescription: "Common Items product.",
        discount: "Discount",
        discountDescription: "Product discount."
      };
    case 'zh':
      return {
        pin: "电池",
        pinDescription: "电池产品。",
        fan: "风扇",
        fanDescription: "风扇产品。",
        pipe: "塑料管，绿色网管",
        pipeDescription: "塑料管，绿色网管产品。",
        wire: "电线",
        wireDescription: "电线产品。",
        cuttingStone: "切割石",
        cuttingStoneDescription: "切割石产品。",
        lock: "锁",
        lockDescription: "锁产品。",
        glue: "胶水",
        glueDescription: "胶水产品。",
        socket: "插座，插座盖",
        socketDescription: "插座，插座盖产品。",
        paint: "油漆",
        paintDescription: "油漆产品。",
        bathroomMaterial: "浴室材料",
        bathroomMaterialDescription: "浴室材料产品。",
        lightBulb: "灯泡",
        lightBulbDescription: "灯泡产品。",
        commonItems: "常用物品",
        commonItemsDescription: "常用物品产品。",
        discount: "折扣",
        discountDescription: "产品折扣。"
      };
    case 'fr':
      return {
        pin: "Pile",
        pinDescription: "Produit de pile.",
        fan: "Ventilateur",
        fanDescription: "Produit de ventilateur.",
        pipe: "Tube en plastique, Tube en maille verte",
        pipeDescription: "Produit de tube en plastique, tube en maille verte.",
        wire: "Fil électrique",
        wireDescription: "Produit de fil électrique.",
        cuttingStone: "Pierre de coupe",
        cuttingStoneDescription: "Produit de pierre de coupe.",
        lock: "Verrou",
        lockDescription: "Produit de verrou.",
        glue: "Colle",
        glueDescription: "Produit de colle.",
        socket: "Prise, Cache de prise",
        socketDescription: "Produit de prise, cache de prise.",
        paint: "Peinture",
        paintDescription: "Produit de peinture.",
        bathroomMaterial: "Matériau de salle de bain",
        bathroomMaterialDescription: "Produit de matériau de salle de bain.",
        lightBulb: "Ampoule",
        lightBulbDescription: "Produit d'ampoule.",
        commonItems: "Articles courants",
        commonItemsDescription: "Produit d'articles courants.",
        discount: "Réduction",
        discountDescription: "Réduction sur les produits."
      };
    case 'ja':
      return {
        pin: "ピン",
        pinDescription: "ピン製品。",
        fan: "ファン",
        fanDescription: "ファン製品。",
        pipe: "プラスチックパイプ、グリーンメッシュパイプ",
        pipeDescription: "プラスチックパイプ、グリーンメッシュパイプ製品。",
        wire: "電線",
        wireDescription: "電線製品。",
        cuttingStone: "切断石",
        cuttingStoneDescription: "切断石製品。",
        lock: "鍵",
        lockDescription: "鍵製品。",
        glue: "接着剤",
        glueDescription: "接着剤製品。",
        socket: "ソケット、ソケットカバー",
        socketDescription: "ソケット、ソケットカバー製品。",
        paint: "ペンキ",
        paintDescription: "ペンキ製品。",
        bathroomMaterial: "バスルーム素材",
        bathroomMaterialDescription: "バスルーム素材製品。",
        lightBulb: "電球",
        lightBulbDescription: "電球製品。",
        commonItems: "日用品",
        commonItemsDescription: "日用品製品。",
        discount: "割引",
        discountDescription: "製品割引。"
      };
    default:
      return {
        pin: "Pin",
        pinDescription: "Pin product.",
        fan: "Fan",
        fanDescription: "Fan product.",
        pipe: "Plastic Pipe, Green Mesh Pipe",
        pipeDescription: "Plastic Pipe, Green Mesh Pipe product.",
        wire: "Electric Wire",
        wireDescription: "Electric Wire product.",
        cuttingStone: "Cutting Stone",
        cuttingStoneDescription: "Cutting Stone product.",
        lock: "Lock",
        lockDescription: "Lock product.",
        glue: "Glue",
        glueDescription: "Glue product.",
        socket: "Socket, Socket Cover",
        socketDescription: "Socket, Socket Cover product.",
        paint: "Paint",
        paintDescription: "Paint product.",
        bathroomMaterial: "Bathroom Material",
        bathroomMaterialDescription: "Bathroom Material product.",
        lightBulb: "Light Bulb",
        lightBulbDescription: "Light Bulb product.",
        commonItems: "Common Items",
        commonItemsDescription: "Common Items product.",
        discount: "Discount",
        discountDescription: "Product discount."
      };
  }
};

export const translateOrderManagement = (language: string) => {
  switch (language) {
    case 'vi':
      return {
        order: "Đơn hàng",
        orderDescription: "Quản lý đơn hàng của người dùng đặt hàng.",
        delivery: "Giao hàng",
        deliveryDescription: "Quản lý đơn hàng giành cho shipper."
      };
    case 'en':
      return {
        order: "Order",
        orderDescription: "Manage the orders placed by users.",
        delivery: "Delivery",
        deliveryDescription: "Manage the orders for the shipper."
      };
    case 'zh':
      return {
        order: "订单",
        orderDescription: "管理用户下单的订单。",
        delivery: "送货",
        deliveryDescription: "管理发货人的订单。"
      };
    case 'fr':
      return {
        order: "Commande",
        orderDescription: "Gérer les commandes passées par les utilisateurs.",
        delivery: "Livraison",
        deliveryDescription: "Gérer les commandes pour le livreur."
      };
    case 'ja':
      return {
        order: "注文",
        orderDescription: "ユーザーが注文した注文を管理します。",
        delivery: "配送",
        deliveryDescription: "配達員向けの注文を管理します。"
      };
    default:
      return {
        order: "Order",
        orderDescription: "Manage the orders placed by users.",
        delivery: "Delivery",
        deliveryDescription: "Manage the orders for the shipper."
      };
  }
};

export const translateUserManagement = (language: string) => {
  switch (language) {
    case 'vi':
      return {
        user: "Người dùng",
        userDescription: "Người dùng đăng nhập.",
        staff: "Nhân viên",
        staffDescription: "Tài khoản nhân viên quản lý cửa hàng."
      };
    case 'en':
      return {
        user: "User",
        userDescription: "Logged-in user.",
        staff: "Staff",
        staffDescription: "Staff account for managing the store."
      };
    case 'zh':
      return {
        user: "用户",
        userDescription: "登录的用户。",
        staff: "员工",
        staffDescription: "员工账户用于管理商店。"
      };
    case 'fr':
      return {
        user: "Utilisateur",
        userDescription: "Utilisateur connecté.",
        staff: "Personnel",
        staffDescription: "Compte du personnel pour gérer le magasin."
      };
    case 'ja':
      return {
        user: "ユーザー",
        userDescription: "ログインしたユーザー。",
        staff: "スタッフ",
        staffDescription: "店舗管理のスタッフアカウント。"
      };
    default:
      return {
        user: "User",
        userDescription: "Logged-in user.",
        staff: "Staff",
        staffDescription: "Staff account for managing the store."
      };
  }
};

export const translatecheckoutNavbar = (language: string) => {
  switch (language) {
    case 'vi':
      return {
        discountCode: "Mã giảm giá",
        discountCodeDescription: "Mã giảm giá cho người dùng.",
        tax: "Thuế",
        taxDescription: "Thuế cho người dùng.",
        shippingFee: "Phí giao hàng",
        shippingFeeDescription: "Phí giao hàng cho người dùng."
      };
    case 'en':
      return {
        discountCode: "Discount Code",
        discountCodeDescription: "Discount code for users.",
        tax: "Tax",
        taxDescription: "Tax for users.",
        shippingFee: "Shipping Fee",
        shippingFeeDescription: "Shipping fee for users."
      };
    case 'zh':
      return {
        discountCode: "折扣码",
        discountCodeDescription: "用户的折扣码。",
        tax: "税费",
        taxDescription: "用户的税费。",
        shippingFee: "运费",
        shippingFeeDescription: "用户的运费。"
      };
    case 'fr':
      return {
        discountCode: "Code de réduction",
        discountCodeDescription: "Code de réduction pour les utilisateurs.",
        tax: "Taxe",
        taxDescription: "Taxe pour les utilisateurs.",
        shippingFee: "Frais de livraison",
        shippingFeeDescription: "Frais de livraison pour les utilisateurs."
      };
    case 'ja':
      return {
        discountCode: "割引コード",
        discountCodeDescription: "ユーザーのための割引コード。",
        tax: "税金",
        taxDescription: "ユーザーの税金。",
        shippingFee: "配送料",
        shippingFeeDescription: "ユーザーの配送料。"
      };
    default:
      return {
        discountCode: "Discount Code",
        discountCodeDescription: "Discount code for users.",
        tax: "Tax",
        taxDescription: "Tax for users.",
        shippingFee: "Shipping Fee",
        shippingFeeDescription: "Shipping fee for users."
      };
  }
};

export const translateSettingsNavbar = (language: string) => {
  switch (language) {
    case 'vi':
      return {
        settings: "Cài đặt",
        settingsDescription: "Cài đặt cửa hàng.",
        system: "Hệ thống",
        systemDescription: "Hệ thống người dùng."
      };
    case 'en':
      return {
        settings: "Settings",
        settingsDescription: "Store settings.",
        system: "System",
        systemDescription: "User system."
      };
    case 'zh':
      return {
        settings: "设置",
        settingsDescription: "商店设置。",
        system: "系统",
        systemDescription: "用户系统。"
      };
    case 'fr':
      return {
        settings: "Paramètres",
        settingsDescription: "Paramètres du magasin.",
        system: "Système",
        systemDescription: "Système utilisateur."
      };
    case 'ja':
      return {
        settings: "設定",
        settingsDescription: "店舗設定。",
        system: "システム",
        systemDescription: "ユーザーシステム。"
      };
    default:
      return {
        settings: "Settings",
        settingsDescription: "Store settings.",
        system: "System",
        systemDescription: "User system."
      };
  }
};

export const translateTitleNavbar = (language: string) => {
  switch (language) {
    case 'vi':
      return {
        overview: "Tổng quan",
        employees: "Nhân viên",
        billboard: "Quảng cáo",
        productType: "Loại hàng",
        specs: "Thông số",
        products: "Sản phẩm",
        orders: "Đơn hàng",
        users: "Người dùng",
        payments: "Thanh toán",
        settings: "Cài đặt",
      };
    case 'en':
      return {
        overview: "Overview",
        employees: "Employees",
        billboard: "Billboard",
        productType: "Product Type",
        specs: "Specifications",
        products: "Products",
        orders: "Orders",
        users: "Users",
        payments: "Payments",
        settings: "Settings",
      };
    case 'zh':
      return {
        overview: "概览",
        employees: "员工",
        billboard: "广告牌",
        productType: "商品类型",
        specs: "规格",
        products: "产品",
        orders: "订单",
        users: "用户",
        payments: "支付",
        settings: "设置",
      };
    case 'fr':
      return {
        overview: "Aperçu",
        employees: "Employés",
        billboard: "Panneau publicitaire",
        productType: "Type de produit",
        specs: "Spécifications",
        products: "Produits",
        orders: "Commandes",
        users: "Utilisateurs",
        payments: "Paiements",
        settings: "Paramètres",
      };
    case 'ja':
      return {
        overview: "概要",
        employees: "従業員",
        billboard: "ビルボード",
        productType: "製品タイプ",
        specs: "仕様",
        products: "製品",
        orders: "注文",
        users: "ユーザー",
        payments: "支払い",
        settings: "設定",
      };
    default:
      return {
        overview: "Overview",
        employees: "Employees",
        billboard: "Billboard",
        productType: "Product Type",
        specs: "Specifications",
        products: "Products",
        orders: "Orders",
        users: "Users",
        payments: "Payments",
        settings: "Settings",
      };
  }
};

export const translateImageUpload = (language: string) => {
  switch (language) {
    case 'vi':
      return {
        uploadSuccess: "Tải ảnh thành công",
        uploadFail: "Tải ảnh lên không thành công",
      };
    case 'en':
      return {
        uploadSuccess: "Image uploaded successfully",
        uploadFail: "Failed to upload image",
      };
    case 'zh':
      return {
        uploadSuccess: "图片上传成功",
        uploadFail: "图片上传失败",
      };
    case 'fr':
      return {
        uploadSuccess: "Image téléchargée avec succès",
        uploadFail: "Échec du téléchargement de l'image",
      };
    case 'ja':
      return {
        uploadSuccess: "画像のアップロードに成功しました",
        uploadFail: "画像のアップロードに失敗しました",
      };
    default:
      return {
        uploadSuccess: "Image uploaded successfully",
        uploadFail: "Failed to upload image",
      };
  }
};

export const translateProfileSettings = (language: string) => {
  switch (language) {
    case 'vi':
      return {
        backgroundImage: "Ảnh nền",
        changeImage: "Thay đổi Ảnh",
        note: "Lưu ý:",
        avatarDescription:
          "Ảnh đại diện giúp mọi người nhận biết bạn dễ dàng hơn qua các bài viết, bình luận, tin nhắn...",
      };
    case 'en':
      return {
        backgroundImage: "Background Image",
        changeImage: "Change Image",
        note: "Note:",
        avatarDescription:
          "Your profile picture helps people easily recognize you through posts, comments, and messages...",
      };
    case 'zh':
      return {
        backgroundImage: "背景图片",
        changeImage: "更换图片",
        note: "注意:",
        avatarDescription: "头像可以帮助人们通过帖子、评论和消息轻松识别您...",
      };
    case 'fr':
      return {
        backgroundImage: "Image de fond",
        changeImage: "Changer l'image",
        note: "Remarque :",
        avatarDescription:
          "Votre photo de profil aide les gens à vous reconnaître facilement à travers les publications, commentaires et messages...",
      };
    case 'ja':
      return {
        backgroundImage: "背景画像",
        changeImage: "画像を変更",
        note: "注意:",
        avatarDescription:
          "プロフィール画像は、投稿、コメント、メッセージを通じて人々があなたを簡単に認識できるようにします...",
      };
    default:
      return {
        backgroundImage: "Background Image",
        changeImage: "Change Image",
        note: "Note:",
        avatarDescription:
          "Your profile picture helps people easily recognize you through posts, comments, and messages...",
      };
  }
};

export const translateStreamChat = (language: string) => {
  switch (language) {
    case 'vi':
      return "Trò chuyện trực tuyến";
    case 'en':
      return "Stream Chat";
    case 'zh':
      return "流聊天";
    case 'fr':
      return "Chat en direct";
    case 'ja':
      return "ストリームチャット";
    default:
      return "Stream Chat";
  }
};

export const translateCommunity = (language: string) => {
  switch (language) {
    case 'vi':
      return "Cộng đồng";
    case 'en':
      return "Community";
    case 'zh':
      return "社区";
    case 'fr':
      return "Communauté";
    case 'ja':
      return "コミュニティ";
    default:
      return "Community";
  }
};

export const translateGoBackToChat = (language: string) => {
  switch (language) {
    case 'vi':
      return "Quay lại trò chuyện";
    case 'en':
      return "Go back to chat";
    case 'zh':
      return "返回聊天";
    case 'fr':
      return "Revenir au chat";
    case 'ja':
      return "チャットに戻る";
    default:
      return "Go back to chat";
  }
};

export const translateChatDisabled = (language: string) => {
  switch (language) {
    case 'vi':
      return "Trò chuyện đã bị vô hiệu hóa";
    case 'en':
      return "Chat is disabled";
    case 'zh':
      return "聊天已禁用";
    case 'fr':
      return "Le chat est désactivé";
    case 'ja':
      return "チャットが無効になっています";
    default:
      return "Chat is disabled";
  }
};

export const translateWelcomeToChat = (language: string) => {
  switch (language) {
    case 'vi':
      return "Chào mừng đến với trò chuyện";
    case 'en':
      return "Welcome to the chat";
    case 'zh':
      return "欢迎来到聊天";
    case 'fr':
      return "Bienvenue dans le chat";
    case 'ja':
      return "チャットへようこそ";
    default:
      return "Welcome to the chat";
  }
};

export const translateSendMessage = (language: string) => {
  switch (language) {
    case 'vi':
      return "Gửi tin nhắn";
    case 'en':
      return "Send a message";
    case 'zh':
      return "发送消息";
    case 'fr':
      return "Envoyer un message";
    case 'ja':
      return "メッセージを送る";
    default:
      return "Send a message";
  }
};

export const translateShoppingList = (language: string) => {
  switch (language) {
    case 'vi':
      return "Danh sách mua sắm";
    case 'en':
      return "Shopping List";
    case 'zh':
      return "购物清单";
    case 'fr':
      return "Liste de courses";
    case 'ja':
      return "買い物リスト";
    default:
      return "Shopping List";
  }
};

export const translateBuy = (language: string) => {
  switch (language) {
    case 'vi':
      return "Mua";
    case 'en':
      return "Buy";
    case 'zh':
      return "购买";
    case 'fr':
      return "Acheter";
    case 'ja':
      return "購入";
    default:
      return "Buy";
  }
};

export const translateShoppingCart = (language: string) => {
  switch (language) {
    case 'vi':
      return "Mua sắm";
    case 'en':
      return "Shopping";
    case 'zh':
      return "购物";
    case 'fr':
      return "Shopping";
    case 'ja':
      return "買い物";
    default:
      return "Shopping";
  }
};

export const translateFollowersOnlyChat = (language: string) => {
  switch (language) {
    case 'vi':
      return "Chỉ người theo dõi mới có thể trò chuyện";
    case 'en':
      return "Only followers can chat";
    case 'zh':
      return "只有关注者可以聊天";
    case 'fr':
      return "Seuls les abonnés peuvent discuter";
    case 'ja':
      return "フォロワーのみチャットできます";
    default:
      return "Only followers can chat";
  }
};

export const translateMessageDelay = (language: string, delayInSeconds: number) => {
  switch (language) {
    case 'vi':
      return `Tin nhắn bị trễ ${delayInSeconds} giây`;
    case 'en':
      return `Messages are delayed by ${delayInSeconds} seconds`;
    case 'zh':
      return `消息延迟了 ${delayInSeconds} 秒`;
    case 'fr':
      return `Les messages sont retardés de ${delayInSeconds} secondes`;
    case 'ja':
      return `メッセージは ${delayInSeconds} 秒遅れています`;
    default:
      return `Messages are delayed by ${delayInSeconds} seconds`;
  }
};

export const translateFollowersOnly = (language: string) => {
  switch (language) {
    case 'vi':
      return "Chỉ dành cho người theo dõi";
    case 'en':
      return "Followers only";
    case 'zh':
      return "仅限关注者";
    case 'fr':
      return "Réservé aux abonnés";
    case 'ja':
      return "フォロワーのみ";
    default:
      return "Followers only";
  }
};

export const translateSlowMode = (language: string) => {
  switch (language) {
    case 'vi':
      return "Chế độ chậm";
    case 'en':
      return "Slow mode";
    case 'zh':
      return "慢速模式";
    case 'fr':
      return "Mode lent";
    case 'ja':
      return "スローモード";
    default:
      return "Slow mode";
  }
};

export const translateFollowersAndSlowMode = (language: string) => {
  switch (language) {
    case 'vi':
      return "Chỉ dành cho người theo dõi và chế độ chậm";
    case 'en':
      return "Followers only and slow mode";
    case 'zh':
      return "仅限关注者且为慢速模式";
    case 'fr':
      return "Réservé aux abonnés et en mode lent";
    case 'ja':
      return "フォロワーのみ＆スローモード";
    default:
      return "Followers only and slow mode";
  }
};

export const translateCommunityDisabled = (language: string) => {
  switch (language) {
    case 'vi':
      return "Cộng đồng đã bị vô hiệu hóa";
    case 'en':
      return "Community is disabled";
    case 'zh':
      return "社区已禁用";
    case 'fr':
      return "La communauté est désactivée";
    case 'ja':
      return "コミュニティは無効です";
    default:
      return "Community is disabled";
  }
};

export const translateNoResults = (language: string) => {
  switch (language) {
    case 'vi':
      return "Không có kết quả";
    case 'en':
      return "No results";
    case 'zh':
      return "没有结果";
    case 'fr':
      return "Aucun résultat";
    case 'ja':
      return "結果がありません";
    default:
      return "No results";
  }
};

export const translateBlockedBy = (language: string) => {
  switch (language) {
    case 'vi':
      return "Đã bị chặn bởi";
    case 'en':
      return "Blocked by";
    case 'zh':
      return "已被封锁";
    case 'fr':
      return "Bloqué par";
    case 'ja':
      return "によってブロックされました";
    default:
      return "Blocked by";
  }
};

export const translateClickToSeeLive = (language: string) => {
  switch (language) {
    case 'vi':
      return "Nhấp để xem Live";
    case 'en':
      return "Click to see Live";
    case 'zh':
      return "点击观看直播";
    case 'fr':
      return "Voir en direct";
    case 'ja':
      return "ライブを見る";
    default:
      return "Click to see Live";
  }
};

export const translateOffline = (language: string) => {
  switch (language) {
    case "vi":
      return "Ngoại tuyến";
    case "en":
      return "is offline";
    case "zh":
      return "离线";
    case "fr":
      return "est hors ligne";
    case "ja":
      return "オフライン";
    default:
      return "is offline";
  }
};

export const translateOfflines = (language: string) => {
  switch (language) {
    case "vi":
      return "Ngoại tuyến";
    case "en":
      return "Offline";
    case "zh":
      return "离线";
    case "fr":
      return "Hors ligne";
    case "ja":
      return "オフライン";
    default:
      return "Offline";
  }
};


export const translatePause = (language: string) => {
  switch (language) {
    case "vi":
      return "Tạm dừng";
    case "en":
      return "Pause";
    case "zh":
      return "暂停";
    case "fr":
      return "Pause";
    case "ja":
      return "一時停止";
    default:
      return "Pause";
  }
};

export const translatePlay = (language: string) => {
  switch (language) {
    case "vi":
      return "Chơi";
    case "en":
      return "Play";
    case "zh":
      return "播放";
    case "fr":
      return "Jouer";
    case "ja":
      return "再生";
    default:
      return "Play";
  }
};

export const translateUnmute = (language: string) => {
  switch (language) {
    case "vi":
      return "Bỏ tắt tiếng";
    case "en":
      return "Unmute";
    case "zh":
      return "取消静音";
    case "fr":
      return "Désactiver le silence";
    case "ja":
      return "ミュート解除";
    default:
      return "Unmute";
  }
};

export const translateMute = (language: string) => {
  switch (language) {
    case "vi":
      return "Tắt tiếng";
    case "en":
      return "Mute";
    case "zh":
      return "静音";
    case "fr":
      return "Silencieux";
    case "ja":
      return "ミュート";
    default:
      return "Mute";
  }
};

export const translateExitFullscreen = (language: string) => {
  switch (language) {
    case "vi":
      return "Thoát toàn màn hình";
    case "en":
      return "Exit fullscreen";
    case "zh":
      return "退出全屏";
    case "fr":
      return "Quitter le plein écran";
    case "ja":
      return "フルスクリーンを終了";
    default:
      return "Exit fullscreen";
  }
};

export const translateFullscreen = (language: string) => {
  switch (language) {
    case "vi":
      return "Toàn màn hình";
    case "en":
      return "Fullscreen";
    case "zh":
      return "全屏";
    case "fr":
      return "Plein écran";
    case "ja":
      return "フルスクリーン";
    default:
      return "Fullscreen";
  }
};

export const translatePictureInPicture = (language: string) => {
  switch (language) {
    case "vi":
      return "Ảnh trong ảnh";
    case "en":
      return "Picture In Picture";
    case "zh":
      return "画中画";
    case "fr":
      return "Image dans l'image";
    case "ja":
      return "ピクチャーインピクチャー";
    default:
      return "Picture In Picture";
  }
};

export const translateFollowings = (language: string) => {
  switch (language) {
    case "vi":
      return "Bạn đang theo dõi";
    case "en":
      return "You are now following";
    case "zh":
      return "您现在正在关注";
    case "fr":
      return "Vous suivez maintenant";
    case "ja":
      return "あなたは今フォローしています";
    default:
      return "You are now following";
  }
};

export const translateUnfollowed = (language: string) => {
  switch (language) {
    case "vi":
      return "Bạn đã bỏ theo dõi";
    case "en":
      return "You have unfollowed";
    case "zh":
      return "您已取消关注";
    case "fr":
      return "Vous avez cessé de suivre";
    case "ja":
      return "フォローを解除しました";
    default:
      return "You have unfollowed";
  }
};

export const translateEditStreamInfo = (language: string) => {
  switch (language) {
    case "vi":
      return "Chỉnh sửa thông tin phát trực tuyến";
    case "en":
      return "Edit your stream info";
    case "zh":
      return "编辑您的直播信息";
    case "fr":
      return "Modifier les informations de votre stream";
    case "ja":
      return "あなたのストリーム情報を編集する";
    default:
      return "Edit your stream info";
  }
};

export const translateMaximizeVisibility = (language: string) => {
  switch (language) {
    case "vi":
      return "Tăng cường khả năng hiển thị của bạn";
    case "en":
      return "Maximize your visibility";
    case "zh":
      return "最大化您的可见性";
    case "fr":
      return "Maximisez votre visibilité";
    case "ja":
      return "あなたの視認性を最大化する";
    default:
      return "Maximize your visibility";
  }
};

export const translateThumbnail = (language: string) => {
  switch (language) {
    case "vi":
      return "Hình thu nhỏ";
    case "en":
      return "Thumbnail";
    case "zh":
      return "缩略图";
    case "fr":
      return "Vignette";
    case "ja":
      return "サムネイル";
    default:
      return "Thumbnail";
  }
};

export const translateStreamUpdated = (language: string) => {
  switch (language) {
    case "vi":
      return "Stream đã được cập nhật";
    case "en":
      return "Stream updated";
    case "zh":
      return "直播已更新";
    case "fr":
      return "Stream mis à jour";
    case "ja":
      return "ストリームが更新されました";
    default:
      return "Stream updated";
  }
};

export const translateEditInfoStream = (language: string) => {
  switch (language) {
    case "vi":
      return "Chỉnh sửa thông tin stream";
    case "en":
      return "Edit stream info";
    case "zh":
      return "编辑直播信息";
    case "fr":
      return "Modifier les informations du stream";
    case "ja":
      return "ストリーム情報を編集";
    default:
      return "Edit stream info";
  }
};

export const translateStreamName = (language: string) => {
  switch (language) {
    case "vi":
      return "Tên stream";
    case "en":
      return "Stream's name";
    case "zh":
      return "直播名称";
    case "fr":
      return "Nom du stream";
    case "ja":
      return "ストリームの名前";
    default:
      return "Stream's name";
  }
};

export const translateStreamNotFound = (language: string) => {
  switch (language) {
    case "vi":
      return "Không tìm thấy stream";
    case "en":
      return "Stream not found";
    case "zh":
      return "未找到直播";
    case "fr":
      return "Stream non trouvé";
    case "ja":
      return "ストリームが見つかりません";
    default:
      return "Stream not found";
  }
};

export const translateAbout = (language: string) => {
  switch (language) {
    case "vi":
      return "Giới thiệu";
    case "en":
      return "About";
    case "zh":
      return "关于";
    case "fr":
      return "À propos";
    case "ja":
      return "について";
    default:
      return "About";
  }
};

export const translateMystery = (language: string) => {
  switch (language) {
    case "vi":
      return "Người dùng này thích giữ một chút bí ẩn về bản thân.";
    case "en":
      return "This user prefers to keep an air of mystery about them.";
    case "zh":
      return "此用户喜欢保持神秘感。";
    case "fr":
      return "Cet utilisateur préfère garder une aura de mystère autour de lui.";
    case "ja":
      return "このユーザーは自分に謎めいた雰囲気を保つことを好みます。";
    default:
      return "This user prefers to keep an air of mystery about them.";
  }
};

export const translateUserBioUpdated = (language: string) => {
  switch (language) {
    case "vi":
      return "Thông tin người dùng đã được cập nhật!";
    case "en":
      return "User bio updated!";
    case "zh":
      return "用户简介已更新！";
    case "fr":
      return "Biographie de l'utilisateur mise à jour!";
    case "ja":
      return "ユーザーバイオが更新されました！";
    default:
      return "User bio updated!";
  }
};

export const translateEditUserBio = (language: string) => {
  switch (language) {
    case "vi":
      return "Chỉnh sửa thông tin người dùng";
    case "en":
      return "Edit user bio";
    case "zh":
      return "编辑用户简介";
    case "fr":
      return "Modifier la biographie de l'utilisateur";
    case "ja":
      return "ユーザーバイオを編集";
    default:
      return "Edit user bio";
  }
};

export const translateUserBio = (language: string) => {
  switch (language) {
    case "vi":
      return "Thông tin người dùng";
    case "en":
      return "User bio";
    case "zh":
      return "用户简介";
    case "fr":
      return "Biographie de l'utilisateur";
    case "ja":
      return "ユーザーバイオ";
    default:
      return "User bio";
  }
};

export const translateUserNotFound = (language: string) => {
  switch (language) {
    case "vi":
      return "Không tìm thấy người dùng";
    case "en":
      return "User not found";
    case "zh":
      return "未找到用户";
    case "fr":
      return "Utilisateur non trouvé";
    case "ja":
      return "ユーザーが見つかりません";
    default:
      return "User not found";
  }
};

export const translateUserBlocked = (language: string) => {
  switch (language) {
    case "vi":
      return "Người dùng đã bị chặn";
    case "en":
      return "User is blocked";
    case "zh":
      return "用户已被封锁";
    case "fr":
      return "Utilisateur bloqué";
    case "ja":
      return "ユーザーはブロックされています";
    default:
      return "User is blocked";
  }
};

export const translateChatLimitSuccess = (language: string, delayInSeconds: number) => {
  switch (language) {
    case "vi":
      return `Thành công. Giới hạn thời gian chat trong ${delayInSeconds}s.`;
    case "en":
      return `Success. Chat time limit is set to ${delayInSeconds}s.`;
    case "zh":
      return `成功。聊天时间限制设置为 ${delayInSeconds} 秒。`;
    case "fr":
      return `Succès. La limite de temps de chat est définie sur ${delayInSeconds} secondes.`;
    case "ja":
      return `成功。チャットの時間制限は${delayInSeconds}秒に設定されました。`;
    default:
      return `Success. Chat time limit is set to ${delayInSeconds}s.`;
  }
};

export const translateNoPermission = (language: string) => {
  switch (language) {
    case "vi":
      return "Bạn không có quyền!";
    case "en":
      return "You don't have permission!";
    case "zh":
      return "您没有权限！";
    case "fr":
      return "Vous n'avez pas la permission !";
    case "ja":
      return "権限がありません！";
    default:
      return "You don't have permission!";
  }
};

export const translateFailedToCreateIngress = (language: string) => {
  switch (language) {
    case "vi":
      return "Tạo ingress không thành công";
    case "en":
      return "Failed to create ingress";
    case "zh":
      return "创建入口失败";
    case "fr":
      return "Échec de la création de l'entrée";
    case "ja":
      return "Ingressの作成に失敗しました";
    default:
      return "Failed to create ingress";
  }
};

export const translateUpdateQuantityError = (language: string) => {
  switch (language) {
    case "vi":
      return "Có lỗi xảy ra khi cập nhật số lượng sản phẩm";
    case "en":
      return "An error occurred while updating the product quantity";
    case "zh":
      return "更新产品数量时发生错误";
    case "fr":
      return "Une erreur est survenue lors de la mise à jour de la quantité du produit";
    case "ja":
      return "製品の数量を更新中にエラーが発生しました";
    default:
      return "An error occurred while updating the product quantity";
  }
};

export const translateProductRemoved = (language: string) => {
  switch (language) {
    case "vi":
      return "Sản phẩm đã xóa khỏi giỏ hàng";
    case "en":
      return "The product has been removed from the cart";
    case "zh":
      return "产品已从购物车中移除";
    case "fr":
      return "Le produit a été retiré du panier";
    case "ja":
      return "商品はカートから削除されました";
    default:
      return "The product has been removed from the cart";
  }
};

export const translateLoginToAddToWishlist = (language: string) => {
  switch (language) {
    case "vi":
      return "Bạn cần đăng nhập để thêm sản phẩm vào danh sách thích";
    case "en":
      return "You need to log in to add products to your wishlist";
    case "zh":
      return "您需要登录才能将产品添加到愿望清单";
    case "fr":
      return "Vous devez vous connecter pour ajouter des produits à votre liste de souhaits";
    case "ja":
      return "製品をウィッシュリストに追加するにはログインする必要があります";
    default:
      return "You need to log in to add products to your wishlist";
  }
};

export const translateProductSaved = (language: string) => {
  switch (language) {
    case "vi":
      return "Sản phẩm đã được lưu";
    case "en":
      return "The product has been saved";
    case "zh":
      return "产品已保存";
    case "fr":
      return "Le produit a été enregistré";
    case "ja":
      return "製品が保存されました";
    default:
      return "The product has been saved";
  }
};

export const translateProductToWishlist = (language: string) => {
  switch (language) {
    case "vi":
      return "Sản phẩm vào danh sách thích";
    case "en":
      return "The product has been added to the wishlist";
    case "zh":
      return "产品已加入愿望清单";
    case "fr":
      return "Le produit a été ajouté à la liste de souhaits";
    case "ja":
      return "商品がウィッシュリストに追加されました";
    default:
      return "The product has been added to the wishlist";
  }
};

export const translateProductRemovedFromWishlist = (language: string) => {
  switch (language) {
    case "vi":
      return "Sản phẩm đã xóa khỏi danh sách thích";
    case "en":
      return "The product has been removed from the wishlist";
    case "zh":
      return "产品已从愿望清单中删除";
    case "fr":
      return "Le produit a été supprimé de la liste de souhaits";
    case "ja":
      return "商品がウィッシュリストから削除されました";
    default:
      return "The product has been removed from the wishlist";
  }
};


// Hàm dịch văn bản, trả về chuỗi đã dịch hoặc chuỗi gốc nếu lỗi
export async function translateText(
  text: string,
  language: string
): Promise<string> {
  if (!text) return ""; // Trả về chuỗi rỗng nếu không có dữ liệu
  const response = await axios({
    baseURL: endpoint,
    url: `/translate?api-version=3.0&to=${language}`, // Dynamic language
    method: "POST",
    headers: {
      "Ocp-Apim-Subscription-Key": key,
      "Ocp-Apim-Subscription-Region": location,
      "Content-type": "application/json",
      "X-ClientTraceId": cuid(),
    },
    data: [{ Text: text }],
  });

  return response.data[0]?.translations[0]?.text || text;
}

export const getUploadImageAction = (language: string) => {
  switch (language) {
    case "vi":
      return {
        invalid: "Không hợp lệ!",
        userNotFound: "User not found!",
        success: "Thành công!",
      };
    case "en":
      return {
        invalid: "Invalid!",
        userNotFound: "User not found!",
        success: "Success!",
      };
    case "zh":
      return {
        invalid: "无效！",
        userNotFound: "找不到用户！",
        success: "成功！",
      };
    case "fr":
      return {
        invalid: "Invalide !",
        userNotFound: "Utilisateur non trouvé !",
        success: "Succès !",
      };
    case "ja":
      return {
        invalid: "無効です！",
        userNotFound: "ユーザーが見つかりません！",
        success: "成功！",
      };
    default:
      return {
        invalid: "Invalid!",
        userNotFound: "User not found!",
        success: "Success!",
      };
  }
};

export const getNotFound = (language: string) => {
  switch (language) {
    case "vi":
      return {
        notFound: "Không có!",
        noProduct: "Chưa có sản phẩm!",
        suggestion: "Bạn có thể chuyển qua sản phẩm khác.",
        goToHome: "Về trang chủ",
      };
    case "en":
      return {
        notFound: "NOT FOUND!",
        noProduct: "No product!",
        suggestion: "You can switch to another product.",
        goToHome: "Go to Home",
      };
    case "zh":
      return {
        notFound: "未找到产品！",
        noProduct: "暂无产品！",
        suggestion: "您可以切换到其他产品。",
        goToHome: "返回主页",
      };
    case "fr":
      return {
        notFound: "Non trouvé !",
        noProduct: "Pas de produit !",
        suggestion: "Vous pouvez passer à un autre produit.",
        goToHome: "Aller à l'accueil",
      };
    case "ja":
      return {
        notFound: "なし！",
        noProduct: "商品なし！",
        suggestion: "別の商品に切り替えることができます。",
        goToHome: "ホームに戻る",
      };
    default:
      return {
        notFound: "NOT FOUND!",
        noProduct: "No product!",
        suggestion: "You can switch to another product.",
        goToHome: "Go to Home",
      };
  }
};

export const getNoResultStore = (language: string) => {
  switch (language) {
    case "vi":
      return {
        somethingWentWrong: "Đã có lỗi xảy ra!",
        noAccess: "Bạn không có quyền truy cập.",
        goToHome: "Về trang chủ",
      };
    case "en":
      return {
        somethingWentWrong: "Something went wrong!",
        noAccess: "You do not have access.",
        goToHome: "Go to Home",
      };
    case "zh":
      return {
        somethingWentWrong: "出了点问题！",
        noAccess: "您无权访问。",
        goToHome: "返回主页",
      };
    case "fr":
      return {
        somethingWentWrong: "Il y a eu un problème !",
        noAccess: "Vous n'avez pas accès.",
        goToHome: "Aller à l'accueil",
      };
    case "ja":
      return {
        somethingWentWrong: "何か問題が発生しました！",
        noAccess: "アクセス権がありません。",
        goToHome: "ホームに戻る",
      };
    default:
      return {
        somethingWentWrong: "Something went wrong!",
        noAccess: "You do not have access.",
        goToHome: "Go to Home",
      };
  }
};


export const getError = (language: string) => {
  switch (language) {
    case "vi":
      return {
        sorryUnable: "Xin lỗi, chúng tôi không thể thực hiện đúng theo yêu cầu của bạn!",
        tryAgain: "Thử lại",
        backToHomepage: "Quay lại trang chủ",
        pageNotFound: "Không tìm thấy trang",
      };
    case "en":
      return {
        sorryUnable: "Sorry, we cannot fulfill your request!",
        tryAgain: "Try again",
        backToHomepage: "Back to homepage",
        pageNotFound: "Page not found",
      };
    case "zh":
      return {
        sorryUnable: "抱歉，我们无法按您的要求执行！",
        tryAgain: "再试一次",
        backToHomepage: "返回主页",
        pageNotFound: "页面未找到",
      };
    case "fr":
      return {
        sorryUnable: "Désolé, nous ne pouvons pas répondre à votre demande !",
        tryAgain: "Réessayer",
        backToHomepage: "Retour à la page d'accueil",
        pageNotFound: "Page non trouvée",
      };
    case "ja":
      return {
        sorryUnable: "申し訳ありませんが、ご要望にお応えできません！",
        tryAgain: "もう一度試す",
        backToHomepage: "ホームページに戻る",
        pageNotFound: "ページが見つかりません",
      };
    default:
      return {
        sorryUnable: "Sorry, we cannot fulfill your request!",
        tryAgain: "Try again",
        backToHomepage: "Back to homepage",
        pageNotFound: "Page not found",
      };
  }
};


export const getThemeToogle = (language: string) => {
  switch (language) {
    case "vi":
      return {
        toggleTheme: "Chế độ",
        light: "Chế độ sáng",
        dark: "Chế độ tối",
        system: "Hệ thống",
      };
    case "en":
      return {
        toggleTheme: "Toggle theme",
        light: "Light",
        dark: "Dark",
        system: "System",
      };
    case "zh":
      return {
        toggleTheme: "切换主题",
        light: "光明模式",
        dark: "黑暗模式",
        system: "系统",
      };
    case "fr":
      return {
        toggleTheme: "Changer de thème",
        light: "Clair",
        dark: "Sombre",
        system: "Système",
      };
    case "ja":
      return {
        toggleTheme: "テーマを切り替え",
        light: "ライトモード",
        dark: "ダークモード",
        system: "システム",
      };
    default:
      return {
        toggleTheme: "Toggle theme",
        light: "Light",
        dark: "Dark",
        system: "System",
      };
  }
};

export const getListProductItem = (language: string) => {
  switch (language) {
    case "vi":
      return {
        viewProduct: "Xem sản phẩm",
        sold: "Đã bán",
        stock: "Tồn kho",
        productLivePin: "ProductLivePin",
        productShowLive: "ProductShowLive",
      };
    case "en":
      return {
        viewProduct: "View product",
        sold: "Sold",
        stock: "Stock",
        productLivePin: "ProductLivePin",
        productShowLive: "ProductShowLive",
      };
    case "zh":
      return {
        viewProduct: "查看产品",
        sold: "已售出",
        stock: "库存",
        productLivePin: "ProductLivePin",
        productShowLive: "ProductShowLive",
      };
    case "fr":
      return {
        viewProduct: "Voir le produit",
        sold: "Vendu",
        stock: "Stock",
        productLivePin: "ProductLivePin",
        productShowLive: "ProductShowLive",
      };
    case "ja":
      return {
        viewProduct: "製品を見る",
        sold: "売れました",
        stock: "在庫",
        productLivePin: "ProductLivePin",
        productShowLive: "ProductShowLive",
      };
    default:
      return {
        viewProduct: "View product",
        sold: "Sold",
        stock: "Stock",
        productLivePin: "ProductLivePin",
        productShowLive: "ProductShowLive",
      };
  }
};

export const getToggleCard = (language: string) => {
  switch (language) {
    case "vi":
      return {
        productUpdated: "Sản phẩm đã cập nhật.",
        outOfStock: "Hết hàng...",
      };
    case "en":
      return {
        productUpdated: "Product updated.",
        outOfStock: "Out of stock...",
      };
    case "zh":
      return {
        productUpdated: "产品已更新。",
        outOfStock: "缺货...",
      };
    case "fr":
      return {
        productUpdated: "Produit mis à jour.",
        outOfStock: "En rupture de stock...",
      };
    case "ja":
      return {
        productUpdated: "製品が更新されました。",
        outOfStock: "在庫切れ...",
      };
    default:
      return {
        productUpdated: "Product updated.",
        outOfStock: "Out of stock...",
      };
  }
};


export const getChatStatus = (language: string) => {
  switch (language) {
    case "vi":
      return {
        delayChat: "Trì hoãn trò chuyện",
        enableChat: "Bật trò chuyện",
        mustFollowToChat: "Phải theo dõi để trò chuyện",
      };
    case "en":
      return {
        delayChat: "Delay chat",
        enableChat: "Enable chat",
        mustFollowToChat: "Must be following to chat",
      };
    case "zh":
      return {
        delayChat: "延迟聊天",
        enableChat: "启用聊天",
        mustFollowToChat: "必须关注才能聊天",
      };
    case "fr":
      return {
        delayChat: "Retarder la discussion",
        enableChat: "Activer le chat",
        mustFollowToChat: "Vous devez suivre pour discuter",
      };
    case "ja":
      return {
        delayChat: "チャットを遅延させる",
        enableChat: "チャットを有効にする",
        mustFollowToChat: "チャットするにはフォローする必要があります",
      };
    default:
      return {
        delayChat: "Delay chat",
        enableChat: "Enable chat",
        mustFollowToChat: "Must be following to chat",
      };
  }
};


export const getReloadPageDropMenuHint = (language: string) => {
  switch (language) {
    case "vi": // Tiếng Việt
      return {
        confirm: "Bạn có muốn làm mới trang để thay đổi tất cả ngôn ngữ?",
        info: "Thời gian làm mới trang sẽ mất vài giây để hệ thống làm mới dữ liệu.",
      };
    case "en": // Tiếng Anh
      return {
        confirm: "Do you want to refresh the page to change all languages?",
        info: "The page refresh may take a few seconds to reload the data.",
      };
    case "zh": // Tiếng Trung
      return {
        confirm: "您是否要刷新页面以更改所有语言？",
        info: "页面刷新可能需要几秒钟，以便系统重新加载数据。",
      };
    case "fr": // Tiếng Pháp
      return {
        confirm: "Voulez-vous actualiser la page pour changer toutes les langues ?",
        info: "Le rafraîchissement de la page peut prendre quelques secondes pour recharger les données.",
      };
    case "ja": // Tiếng Nhật
      return {
        confirm: "すべての言語を変更するためにページを更新しますか？",
        info: "ページの更新には、データを再読み込みするために数秒かかることがあります。",
      };
    default:
      return {
        confirm: "Do you want to refresh the page to change all languages?",
        info: "The page refresh may take a few seconds to reload the data.",
      };
  }
};

export const getPasswordChangeStatus = (language: string): string => {
  switch (language) {
    case "vi":
      return "Chưa đổi mật khẩu";
    case "en":
      return "Password not changed";
    case "zh":
      return "未更改密码";
    case "fr":
      return "Mot de passe non modifié";
    case "ja":
      return "パスワードが変更されていません";
    default:
      return "Password not changed"; // Default to English if language is not recognized
  }
};

export const getViolationComment = (language: string) => {
  switch (language) {
    case "vi":
      return {
        violationMessage: "Vi phạm chính sách!",
        offensiveMessage: "Nội dung của bạn chứa ngôn ngữ phản cảm!",
        violationPart1: "Bạn đã vi phạm",
        violationPart2: "điều khoản chính sách",  // Chỉnh sửa: Viết thường chữ cái đầu
        violationPart3: "của chúng tôi"
      };
    case "en":
      return {
        violationMessage: "Policy violation!",
        offensiveMessage: "Your content contains offensive language!",
        violationPart1: "You have violated",
        violationPart2: "our policy terms",
        violationPart3: "of ours"
      };
    case "zh":
      return {
        violationMessage: "违反政策！", 
        offensiveMessage: "您的内容包含攻击性语言！",
        violationPart1: "您已违反", 
        violationPart2: "我们的政策条款", 
        violationPart3: "我们的"
      };
    case "fr":
      return {
        violationMessage: "Violation de la politique !",
        offensiveMessage: "Votre contenu contient un langage offensant !",
        violationPart1: "Vous avez violé",
        violationPart2: "nos conditions de politique",
        violationPart3: "les nôtres"
      };
    case "ja":
      return {
        violationMessage: "ポリシー違反！", 
        offensiveMessage: "あなたのコンテンツには攻撃的な言葉が含まれています！", 
        violationPart1: "あなたは違反しました", 
        violationPart2: "私たちのポリシー規約", 
        violationPart3: "私たちの"
      };
    default:
      return {
        violationMessage: "Policy violation!",
        offensiveMessage: "Your content contains offensive language!",
        violationPart1: "You have violated",
        violationPart2: "our policy terms",
        violationPart3: "of ours"
      };
  }
};