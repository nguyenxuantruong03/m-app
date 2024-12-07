export const translateBillboardPost = (language: string) => {
  switch (language) {
    case "vi":
      return {
        name1: "Không tìm thấy user id!",
        name2: "Bạn không có quyền để tạo billboard!",
        name3: "Label là bắt buộc!",
        name4: "Mô tả là bắt buộc!",
        name5: "Hình ảnh billboard là bắt buộc!",
        name6: "Store id là bắt buộc!",
        name7: "Không tìm thấy store id!",
        name8: "Lỗi hệ thống khi đăng billboard.",
        name9: "Label đã tồn tại!",
      };
    case "en":
      return {
        name1: "User ID not found!",
        name2: "You do not have permission to create a billboard!",
        name3: "Label is required!",
        name4: "Description is required!",
        name5: "Images for the billboard are required!",
        name6: "Store ID is required!",
        name7: "Store ID not found!",
        name8: "Internal error while posting the billboard.",
        name9: "Label already exists!",
      };
    case "zh":
      return {
        name1: "未找到用户ID！",
        name2: "您没有权限创建广告牌！",
        name3: "标签是必填项！",
        name4: "描述是必填项！",
        name5: "广告牌图片是必填项！",
        name6: "商店ID是必填项！",
        name7: "未找到商店ID！",
        name8: "发布广告牌时发生内部错误。",
        name9: "标签已存在！",
      };
    case "fr":
      return {
        name1: "ID utilisateur introuvable !",
        name2: "Vous n'avez pas l'autorisation de créer un panneau d'affichage !",
        name3: "L'étiquette est requise !",
        name4: "La description est requise !",
        name5: "Les images du panneau d'affichage sont requises !",
        name6: "L'ID du magasin est requis !",
        name7: "ID du magasin introuvable !",
        name8: "Erreur interne lors de la publication du panneau d'affichage.",
        name9: "L'étiquette existe déjà !",
      };
    case "ja":
      return {
        name1: "ユーザーIDが見つかりません！",
        name2: "あなたには広告板を作成する権限がありません！",
        name3: "ラベルは必須です！",
        name4: "説明は必須です！",
        name5: "広告板の画像は必須です！",
        name6: "店舗IDは必須です！",
        name7: "店舗IDが見つかりません！",
        name8: "広告板の投稿中に内部エラーが発生しました。",
        name9: "ラベルはすでに存在します！",
      };
    default:
      return {
        name1: "User ID not found!",
        name2: "You do not have permission to create a billboard!",
        name3: "Label is required!",
        name4: "Description is required!",
        name5: "Images for the billboard are required!",
        name6: "Store ID is required!",
        name7: "Store ID not found!",
        name8: "Internal error while posting the billboard.",
        name9: "Label already exists!",
      };
  }
};


export const translatebillboardGet = (language: string) => {
  switch (language) {
    case "vi":
      return {
        name1: "Cần ID cửa hàng!",
        name2: "Lỗi nội bộ khi lấy bảng quảng cáo.",
      };
    case "en":
      return {
        name1: "Store id is required!",
        name2: "Internal error get billboard.",
      };
    case "zh":
      return {
        name1: "需要商店ID！",
        name2: "获取广告牌时发生内部错误。",
      };
    case "fr":
      return {
        name1: "L'ID du magasin est requis !",
        name2:
          "Erreur interne lors de la récupération du panneau publicitaire.",
      };
    case "ja":
      return {
        name1: "ストアIDが必要です！",
        name2: "ビルボードの取得中に内部エラーが発生しました。",
      };
    default:
      return {
        name1: "Store id is required!",
        name2: "Internal error get billboard.",
      };
  }
};

export const translateBillboardDelete = (language: string) => {
  switch (language) {
    case "vi":
      return {
        name1: "Không tìm thấy user!",
        name2: "Bạn không có quyền để xóa billboard!",
        name3: "Mảng IDs không được trống!",
        name4: "Không tìm thấy store id!",
        name5: "Xóa thành công!",
        name6: "Lỗi hệ thống khi xóa billboard.",
      };
    case "en":
      return {
        name1: "User not found!",
        name2: "You do not have permission to delete the billboard!",
        name3: "IDs array cannot be empty!",
        name4: "Store ID not found!",
        name5: "Delete successful!",
        name6: "Internal error delete billboards.",
      };
    case "zh":
      return {
        name1: "未找到用户！",
        name2: "您没有权限删除广告牌！",
        name3: "IDs数组不能为空！",
        name4: "未找到商店ID！",
        name5: "删除成功！",
        name6: "删除广告牌时发生内部错误。",
      };
    case "fr":
      return {
        name1: "Utilisateur non trouvé !",
        name2:
          "Vous n'avez pas l'autorisation de supprimer le panneau d'affichage !",
        name3: "Le tableau des IDs ne peut pas être vide !",
        name4: "ID du magasin introuvable !",
        name5: "Suppression réussie !",
        name6: "Erreur interne lors de la suppression du panneau d'affichage.",
      };
    case "ja":
      return {
        name1: "ユーザーが見つかりません！",
        name2: "広告板を削除する権限がありません！",
        name3: "IDの配列は空にできません！",
        name4: "店舗IDが見つかりません！",
        name5: "削除成功！",
        name6: "広告板の削除中に内部エラーが発生しました。",
      };
    default:
      return {
        name1: "User not found!",
        name2: "You do not have permission to delete the billboard!",
        name3: "IDs array cannot be empty!",
        name4: "Store ID not found!",
        name5: "Delete successful!",
        name6: "Internal error delete billboards.",
      };
  }
};

export const translateBillboardIdGet = (language: string) => {
  switch (language) {
    case "vi":
      return {
        name1: "ID billboard là bắt buộc!",
        name2: "Không tìm thấy billboard!",
        name3: "Lỗi hệ thống khi lấy billboard.",
      };
    case "en":
      return {
        name1: "Billboard id is required!",
        name2: "Billboard not found!",
        name3: "Internal error get billboard.",
      };
    case "zh":
      return {
        name1: "广告牌ID是必填项！",
        name2: "未找到广告牌！",
        name3: "获取广告牌时发生内部错误。",
      };
    case "fr":
      return {
        name1: "L'ID du panneau d'affichage est requis !",
        name2: "Panneau d'affichage introuvable !",
        name3: "Erreur interne lors de la récupération du panneau d'affichage.",
      };
    case "ja":
      return {
        name1: "ビルボードIDは必須です！",
        name2: "ビルボードが見つかりません！",
        name3: "ビルボードの取得中に内部エラーが発生しました。",
      };
    default:
      return {
        name1: "Billboard id is required!",
        name2: "Billboard not found!",
        name3: "Internal error get billboard.",
      };
  }
};

export const translateBillboardIdDelete = (language: string) => {
  switch (language) {
    case "vi":
      return {
        name1: "Không tìm thấy userId!",
        name2: "Bạn không có quyền để xóa billboard!",
        name3: "Billboard id là bắt buộc!",
        name4: "Không tìm thấy store id!",
        name5: "Lỗi hệ thống khi xóa billboard.",
      };
    case "en":
      return {
        name1: "userId not found!",
        name2: "You do not have permission to delete the billboard!",
        name3: "Billboard id is required!",
        name4: "Store id not found!",
        name5: "Internal error delete billboard.",
      };
    case "zh":
      return {
        name1: "未找到用户ID！",
        name2: "您没有权限删除广告牌！",
        name3: "广告牌ID是必填项！",
        name4: "未找到商店ID！",
        name5: "删除广告牌时发生内部错误。",
      };
    case "fr":
      return {
        name1: "ID utilisateur introuvable !",
        name2:
          "Vous n'avez pas l'autorisation de supprimer le panneau d'affichage !",
        name3: "L'ID du panneau d'affichage est requis !",
        name4: "ID du magasin introuvable !",
        name5: "Erreur interne lors de la suppression du panneau d'affichage.",
      };
    case "ja":
      return {
        name1: "ユーザーIDが見つかりません！",
        name2: "広告板を削除する権限がありません！",
        name3: "ビルボードIDは必須です！",
        name4: "店舗IDが見つかりません！",
        name5: "ビルボードの削除中に内部エラーが発生しました。",
      };
    default:
      return {
        name1: "userId not found!",
        name2: "You do not have permission to delete the billboard!",
        name3: "Billboard id is required!",
        name4: "Store id not found!",
        name5: "Internal error delete billboard.",
      };
  }
};

export const translateBillboardIdPatch = (language: string) => {
  switch (language) {
    case "vi":
      return {
        name1: "Không tìm thấy user id!",
        name2: "Bạn không có quyền để cập nhật billboard!",
        name3: "Label là bắt buộc!",
        name4: "Mô tả là bắt buộc!",
        name5: "Hình ảnh billboard là bắt buộc!",
        name6: "Billboard id là bắt buộc!",
        name7: "Không tìm thấy store id!",
        name8: "Lỗi hệ thống khi cập nhật billboard.",
        name9: "Không tìm thấy billboard!",
        name10: "Label đã tồn tại trong billboard này!",
      };
    case "en":
      return {
        name1: "User id not found!",
        name2: "You do not have permission to update the billboard!",
        name3: "Label is required!",
        name4: "Description is required!",
        name5: "Images for the billboard are required!",
        name6: "Billboard id is required!",
        name7: "Store id not found!",
        name8: "Internal error patch billboard.",
        name9: "Billboard not found!",
        name10: "Label already exists in this billboard.",
      };
    case "zh":
      return {
        name1: "未找到用户ID！",
        name2: "您没有权限更新广告牌！",
        name3: "标签是必填项！",
        name4: "描述是必填项！",
        name5: "广告牌图片是必填项！",
        name6: "广告牌ID是必填项！",
        name7: "未找到商店ID！",
        name8: "更新广告牌时发生内部错误。",
        name9: "未找到广告牌！",
        name10: "标签已存在于此广告牌中！",
      };
    case "fr":
      return {
        name1: "ID utilisateur introuvable !",
        name2: "Vous n'avez pas l'autorisation de mettre à jour le panneau d'affichage !",
        name3: "L'étiquette est requise !",
        name4: "La description est requise !",
        name5: "Les images du panneau d'affichage sont requises !",
        name6: "L'ID du panneau d'affichage est requis !",
        name7: "ID du magasin introuvable !",
        name8: "Erreur interne lors de la mise à jour du panneau d'affichage.",
        name9: "Panneau d'affichage introuvable !",
        name10: "L'étiquette existe déjà dans ce panneau d'affichage !",
      };
    case "ja":
      return {
        name1: "ユーザーIDが見つかりません！",
        name2: "広告板を更新する権限がありません！",
        name3: "ラベルは必須です！",
        name4: "説明は必須です！",
        name5: "広告板の画像は必須です！",
        name6: "ビルボードIDは必須です！",
        name7: "店舗IDが見つかりません！",
        name8: "ビルボードの更新中に内部エラーが発生しました。",
        name9: "ビルボードが見つかりません！",
        name10: "このビルボードにはラベルがすでに存在します！",
      };
    default:
      return {
        name1: "User id not found!",
        name2: "You do not have permission to update the billboard!",
        name3: "Label is required!",
        name4: "Description is required!",
        name5: "Images for the billboard are required!",
        name6: "Billboard id is required!",
        name7: "Store id not found!",
        name8: "Internal error patch billboard.",
        name9: "Billboard not found!",
        name10: "Label already exists in this billboard.",
      };
  }
};

export const translateCategoriesPost = (language: string) => {
  switch (language) {
    case "vi":
      return {
        name1: "Không tìm thấy user id!",
        name2: "Bạn không có quyền để tạo mới categories!",
        name3: "Name là bắt buộc!",
        name4: "Store id là bắt buộc!",
        name5: "Không tìm thấy store id!",
        name6: "Lỗi hệ thống khi tạo mới categories",
        name7: "Tên category đã tồn tại!",
      };
    case "en":
      return {
        name1: "User id not found!",
        name2: "You do not have permission to create categories!",
        name3: "Name is required!",
        name4: "Store id is required!",
        name5: "Store id not found!",
        name6: "Internal error post categories",
        name7: "Category name already exists!",
      };
    case "zh":
      return {
        name1: "未找到用户ID！",
        name2: "您没有权限创建类别！",
        name3: "名称是必填项！",
        name4: "商店ID是必填项！",
        name5: "未找到商店ID！",
        name6: "创建类别时发生内部错误",
        name7: "类别名称已存在！",
      };
    case "fr":
      return {
        name1: "ID utilisateur introuvable !",
        name2: "Vous n'avez pas l'autorisation de créer des catégories !",
        name3: "Le nom est requis !",
        name4: "L'ID du magasin est requis !",
        name5: "ID du magasin introuvable !",
        name6: "Erreur interne lors de la création des catégories",
        name7: "Le nom de la catégorie existe déjà !",
      };
    case "ja":
      return {
        name1: "ユーザーIDが見つかりません！",
        name2: "カテゴリを作成する権限がありません！",
        name3: "名前は必須です！",
        name4: "店舗IDは必須です！",
        name5: "店舗IDが見つかりません！",
        name6: "カテゴリ作成中に内部エラーが発生しました",
        name7: "カテゴリ名はすでに存在します！",
      };
    default:
      return {
        name1: "User id not found!",
        name2: "You do not have permission to create categories!",
        name3: "Name is required!",
        name4: "Store id is required!",
        name5: "Store id not found!",
        name6: "Internal error post categories",
        name7: "Category name already exists!",
      };
  }
};


export const translateCategoriesGet = (language: string) => {
  switch (language) {
    case "vi":
      return {
        name1: "Store id là bắt buộc!",
        name2: "Lỗi hệ thống khi lấy danh mục",
      };
    case "en":
      return {
        name1: "Store id is required!",
        name2: "Internal error get categories",
      };
    case "zh":
      return {
        name1: "商店ID是必填项！",
        name2: "获取类别时发生内部错误",
      };
    case "fr":
      return {
        name1: "L'ID du magasin est requis !",
        name2: "Erreur interne lors de la récupération des catégories",
      };
    case "ja":
      return {
        name1: "店舗IDは必須です！",
        name2: "カテゴリーの取得中に内部エラーが発生しました",
      };
    default:
      return {
        name1: "Store id is required!",
        name2: "Internal error get categories",
      };
  }
};

export const translateCategoriesDelete = (language: string) => {
  switch (language) {
    case "vi":
      return {
        name1: "Không tìm thấy userId!",
        name2: "Bạn không có quyền xóa categories!",
        name3: "Mảng IDs không được trống!",
        name4: "Không tìm thấy store id!",
        name5: "Xóa thành công!",
        name6: "Lỗi hệ thống khi xóa category",
      };
    case "en":
      return {
        name1: "userId not found!",
        name2: "You do not have permission to delete categories!",
        name3: "IDs array cannot be empty!",
        name4: "Store id not found!",
        name5: "Deleted successfully!",
        name6: "Internal error delete category",
      };
    case "zh":
      return {
        name1: "未找到用户ID！",
        name2: "您没有权限删除类别！",
        name3: "ID数组不能为空！",
        name4: "未找到商店ID！",
        name5: "删除成功！",
        name6: "删除类别时发生内部错误",
      };
    case "fr":
      return {
        name1: "ID utilisateur introuvable !",
        name2: "Vous n'avez pas l'autorisation de supprimer des catégories !",
        name3: "Le tableau d'IDs ne peut pas être vide !",
        name4: "ID du magasin introuvable !",
        name5: "Supprimé avec succès !",
        name6: "Erreur interne lors de la suppression de la catégorie",
      };
    case "ja":
      return {
        name1: "ユーザーIDが見つかりません！",
        name2: "カテゴリを削除する権限がありません！",
        name3: "IDの配列は空にできません！",
        name4: "店舗IDが見つかりません！",
        name5: "削除に成功しました！",
        name6: "カテゴリー削除中に内部エラーが発生しました",
      };
    default:
      return {
        name1: "userId not found!",
        name2: "You do not have permission to delete categories!",
        name3: "IDs array cannot be empty!",
        name4: "Store id not found!",
        name5: "Deleted successfully!",
        name6: "Internal error delete category",
      };
  }
};

export const translateCategoriesIdGet = (language: string) => {
  switch (language) {
    case "vi":
      return {
        name1: "Category id là bắt buộc!",
        name2: "Không tìm thấy user id!",
        name3: "Bạn không có quyền xem categories!",
        name4: "Lỗi hệ thống khi lấy danh mục",
      };
    case "en":
      return {
        name1: "Category id is required!",
        name2: "User id not found!",
        name3: "You do not have permission to view categories!",
        name4: "Internal error get categories",
      };
    case "zh":
      return {
        name1: "类别ID是必填项！",
        name2: "未找到用户ID！",
        name3: "您没有权限查看类别！",
        name4: "获取类别时发生内部错误",
      };
    case "fr":
      return {
        name1: "L'ID de la catégorie est requis !",
        name2: "ID utilisateur introuvable !",
        name3: "Vous n'avez pas l'autorisation de voir les catégories !",
        name4: "Erreur interne lors de la récupération des catégories",
      };
    case "ja":
      return {
        name1: "カテゴリIDは必須です！",
        name2: "ユーザーIDが見つかりません！",
        name3: "カテゴリを見る権限がありません！",
        name4: "カテゴリー取得中に内部エラーが発生しました",
      };
    default:
      return {
        name1: "Category id is required!",
        name2: "User id not found!",
        name3: "You do not have permission to view categories!",
        name4: "Internal error get categories",
      };
  }
};

export const translateCategoriesIdDelete = (language: string) => {
  switch (language) {
    case "vi":
      return {
        name1: "Không tìm thấy user id!",
        name2: "Bạn không có quyền xóa categories!",
        name3: "Category id là bắt buộc!",
        name4: "Không tìm thấy store id!",
        name5: "Lỗi hệ thống khi xóa categories",
      };
    case "en":
      return {
        name1: "User id not found!",
        name2: "You do not have permission to delete categories!",
        name3: "Category id is required!",
        name4: "Store id not found!",
        name5: "Internal error delete categories",
      };
    case "zh":
      return {
        name1: "未找到用户ID！",
        name2: "您没有权限删除类别！",
        name3: "类别ID是必填项！",
        name4: "未找到商店ID！",
        name5: "删除类别时发生内部错误",
      };
    case "fr":
      return {
        name1: "ID utilisateur introuvable !",
        name2: "Vous n'avez pas l'autorisation de supprimer des catégories !",
        name3: "L'ID de la catégorie est requis !",
        name4: "ID du magasin introuvable !",
        name5: "Erreur interne lors de la suppression des catégories",
      };
    case "ja":
      return {
        name1: "ユーザーIDが見つかりません！",
        name2: "カテゴリを削除する権限がありません！",
        name3: "カテゴリIDは必須です！",
        name4: "店舗IDが見つかりません！",
        name5: "カテゴリー削除中に内部エラーが発生しました",
      };
    default:
      return {
        name1: "User id not found!",
        name2: "You do not have permission to delete categories!",
        name3: "Category id is required!",
        name4: "Store id not found!",
        name5: "Internal error delete categories",
      };
  }
};

export const translateCategoriesIdPatch = (language: string) => {
  switch (language) {
    case "vi":
      return {
        name1: "Không tìm thấy user id!",
        name2: "Bạn không có quyền cập nhật categories!",
        name3: "Name là bắt buộc!",
        name4: "Category id là bắt buộc!",
        name5: "Không tìm thấy store id!",
        name6: "Lỗi hệ thống khi cập nhật categories",
        name7: "Không tìm thấy category!",
        name8: "Tên category đã tồn tại!",
      };
    case "en":
      return {
        name1: "User id not found!",
        name2: "You do not have permission to update categories!",
        name3: "Name is required!",
        name4: "Category id is required!",
        name5: "Store id not found!",
        name6: "Internal error patch categories",
        name7: "Category not found!",
        name8: "Category name already exists!",
      };
    case "zh":
      return {
        name1: "未找到用户ID！",
        name2: "您没有权限更新类别！",
        name3: "名称是必填项！",
        name4: "类别ID是必填项！",
        name5: "未找到商店ID！",
        name6: "更新类别时发生内部错误",
        name7: "未找到类别！",
        name8: "类别名称已存在！",
      };
    case "fr":
      return {
        name1: "ID utilisateur introuvable !",
        name2:
          "Vous n'avez pas l'autorisation de mettre à jour des catégories !",
        name3: "Le nom est requis !",
        name4: "L'ID de la catégorie est requis !",
        name5: "ID du magasin introuvable !",
        name6: "Erreur interne lors de la mise à jour des catégories",
        name7: "Catégorie introuvable !",
        name8: "Le nom de la catégorie existe déjà !",
      };
    case "ja":
      return {
        name1: "ユーザーIDが見つかりません！",
        name2: "カテゴリを更新する権限がありません！",
        name3: "名前は必須です！",
        name4: "カテゴリIDは必須です！",
        name5: "店舗IDが見つかりません！",
        name6: "カテゴリの更新中に内部エラーが発生しました",
        name7: "カテゴリが見つかりません！",
        name8: "カテゴリ名はすでに存在します！",
      };
    default:
      return {
        name1: "User id not found!",
        name2: "You do not have permission to update categories!",
        name3: "Name is required!",
        name4: "Category id is required!",
        name5: "Store id not found!",
        name6: "Internal error patch categories",
        name7: "Category not found!",
        name8: "Category name already exists!",
      };
  }
};


export const translateBarChart = (language: string) => {
  switch (language) {
    case "vi":
      return {
        name1: "Không tìm thấy user id!",
        name2: "Bạn không có quyền xem chart!",
        name3: "Lỗi hệ thống khi lấy dữ liệu biểu đồ cột.",
      };
    case "en":
      return {
        name1: "User id not found!",
        name2: "You do not have permission to view the chart!",
        name3: "Internal error while fetching bar chart data.",
      };
    case "zh":
      return {
        name1: "未找到用户ID！",
        name2: "您没有权限查看图表！",
        name3: "获取柱状图数据时发生内部错误。",
      };
    case "fr":
      return {
        name1: "ID utilisateur introuvable !",
        name2: "Vous n'avez pas l'autorisation de voir le graphique !",
        name3:
          "Erreur interne lors de la récupération des données du graphique à barres.",
      };
    case "ja":
      return {
        name1: "ユーザーIDが見つかりません！",
        name2: "チャートを表示する権限がありません！",
        name3: "棒グラフのデータ取得中に内部エラーが発生しました。",
      };
    default:
      return {
        name1: "User id not found!",
        name2: "You do not have permission to view the chart!",
        name3: "Internal error while fetching bar chart data.",
      };
  }
};

export const translateComposedChart = (language: string) => {
  switch (language) {
    case "vi":
      return {
        name1: "Không tìm thấy user id!",
        name2: "Bạn không có quyền xem chart!",
        name3: "Lỗi hệ thống khi lấy dữ liệu biểu đồ tổng hợp.",
      };
    case "en":
      return {
        name1: "User id not found!",
        name2: "You do not have permission to view the chart!",
        name3: "Internal error while fetching composed chart data.",
      };
    case "zh":
      return {
        name1: "未找到用户ID！",
        name2: "您没有权限查看图表！",
        name3: "获取综合图表数据时发生内部错误。",
      };
    case "fr":
      return {
        name1: "ID utilisateur introuvable !",
        name2: "Vous n'avez pas l'autorisation de voir le graphique !",
        name3:
          "Erreur interne lors de la récupération des données du graphique composé.",
      };
    case "ja":
      return {
        name1: "ユーザーIDが見つかりません！",
        name2: "チャートを表示する権限がありません！",
        name3: "複合チャートデータの取得中に内部エラーが発生しました。",
      };
    default:
      return {
        name1: "User id not found!",
        name2: "You do not have permission to view the chart!",
        name3: "Internal error while fetching composed chart data.",
      };
  }
};

export const translateFunnelChart = (language: string) => {
  switch (language) {
    case "vi":
      return {
        name1: "Không tìm thấy user id!",
        name2: "Bạn không có quyền xem chart!",
        name3: "Lỗi hệ thống khi lấy dữ liệu biểu đồ phễu.",
      };
    case "en":
      return {
        name1: "User id not found!",
        name2: "You do not have permission to view the chart!",
        name3: "Internal error while fetching funnel chart data.",
      };
    case "zh":
      return {
        name1: "未找到用户ID！",
        name2: "您没有权限查看图表！",
        name3: "获取漏斗图数据时发生内部错误。",
      };
    case "fr":
      return {
        name1: "ID utilisateur introuvable !",
        name2: "Vous n'avez pas l'autorisation de voir le graphique !",
        name3:
          "Erreur interne lors de la récupération des données du graphique en entonnoir.",
      };
    case "ja":
      return {
        name1: "ユーザーIDが見つかりません！",
        name2: "チャートを表示する権限がありません！",
        name3: "ファネルチャートデータの取得中に内部エラーが発生しました。",
      };
    default:
      return {
        name1: "User id not found!",
        name2: "You do not have permission to view the chart!",
        name3: "Internal error while fetching funnel chart data.",
      };
  }
};

export const translateLineChart = (language: string) => {
  switch (language) {
    case "vi":
      return {
        name1: "Không tìm thấy user id!",
        name2: "Bạn không có quyền xem chart!",
        name3: "Lỗi hệ thống khi lấy dữ liệu biểu đồ đường.",
      };
    case "en":
      return {
        name1: "User id not found!",
        name2: "You do not have permission to view the chart!",
        name3: "Internal error while fetching line chart data.",
      };
    case "zh":
      return {
        name1: "未找到用户ID！",
        name2: "您没有权限查看图表！",
        name3: "获取折线图数据时发生内部错误。",
      };
    case "fr":
      return {
        name1: "ID utilisateur introuvable !",
        name2: "Vous n'avez pas l'autorisation de voir le graphique !",
        name3:
          "Erreur interne lors de la récupération des données du graphique en ligne.",
      };
    case "ja":
      return {
        name1: "ユーザーIDが見つかりません！",
        name2: "チャートを表示する権限がありません！",
        name3: "折れ線グラフのデータ取得中に内部エラーが発生しました。",
      };
    default:
      return {
        name1: "User id not found!",
        name2: "You do not have permission to view the chart!",
        name3: "Internal error while fetching line chart data.",
      };
  }
};

export const translatePieChart = (language: string) => {
  switch (language) {
    case "vi":
      return {
        name1: "Không tìm thấy user id!",
        name2: "Bạn không có quyền xem chart!",
        name3: "Lỗi hệ thống khi lấy dữ liệu biểu đồ tròn.",
      };
    case "en":
      return {
        name1: "User id not found!",
        name2: "You do not have permission to view the chart!",
        name3: "Internal error while fetching pie chart data.",
      };
    case "zh":
      return {
        name1: "未找到用户ID！",
        name2: "您没有权限查看图表！",
        name3: "获取饼图数据时发生内部错误。",
      };
    case "fr":
      return {
        name1: "ID utilisateur introuvable !",
        name2: "Vous n'avez pas l'autorisation de voir le graphique !",
        name3:
          "Erreur interne lors de la récupération des données du graphique circulaire.",
      };
    case "ja":
      return {
        name1: "ユーザーIDが見つかりません！",
        name2: "チャートを表示する権限がありません！",
        name3: "円グラフのデータ取得中に内部エラーが発生しました。",
      };
    default:
      return {
        name1: "User id not found!",
        name2: "You do not have permission to view the chart!",
        name3: "Internal error while fetching pie chart data.",
      };
  }
};

export const translateRadarChart = (language: string) => {
  switch (language) {
    case "vi":
      return {
        name1: "Không tìm thấy user id!",
        name2: "Bạn không có quyền xem chart!",
        name3: "Lỗi hệ thống khi lấy dữ liệu biểu đồ radar.",
      };
    case "en":
      return {
        name1: "User id not found!",
        name2: "You do not have permission to view the chart!",
        name3: "Internal error while fetching radar chart data.",
      };
    case "zh":
      return {
        name1: "未找到用户ID！",
        name2: "您没有权限查看图表！",
        name3: "获取雷达图数据时发生内部错误。",
      };
    case "fr":
      return {
        name1: "ID utilisateur introuvable !",
        name2: "Vous n'avez pas l'autorisation de voir le graphique !",
        name3:
          "Erreur interne lors de la récupération des données du graphique radar.",
      };
    case "ja":
      return {
        name1: "ユーザーIDが見つかりません！",
        name2: "チャートを表示する権限がありません！",
        name3: "レーダーチャートのデータ取得中に内部エラーが発生しました。",
      };
    default:
      return {
        name1: "User id not found!",
        name2: "You do not have permission to view the chart!",
        name3: "Internal error while fetching radar chart data.",
      };
  }
};

export const translateRadialChart = (language: string) => {
  switch (language) {
    case "vi":
      return {
        name1: "Không tìm thấy user id!",
        name2: "Bạn không có quyền xem chart!",
        name3: "Lỗi hệ thống khi lấy dữ liệu biểu đồ vòng.",
      };
    case "en":
      return {
        name1: "User id not found!",
        name2: "You do not have permission to view the chart!",
        name3: "Internal error while fetching radial chart data.",
      };
    case "zh":
      return {
        name1: "未找到用户ID！",
        name2: "您没有权限查看图表！",
        name3: "获取径向图表数据时发生内部错误。",
      };
    case "fr":
      return {
        name1: "ID utilisateur introuvable !",
        name2: "Vous n'avez pas l'autorisation de voir le graphique !",
        name3:
          "Erreur interne lors de la récupération des données du graphique radial.",
      };
    case "ja":
      return {
        name1: "ユーザーIDが見つかりません！",
        name2: "チャートを表示する権限がありません！",
        name3: "放射チャートのデータ取得中に内部エラーが発生しました。",
      };
    default:
      return {
        name1: "User id not found!",
        name2: "You do not have permission to view the chart!",
        name3: "Internal error while fetching radial chart data.",
      };
  }
};

export const translateTreeMapChart = (language: string) => {
  switch (language) {
    case "vi":
      return {
        name1: "Không tìm thấy user id!",
        name2: "Bạn không có quyền xem chart!",
        name3: "Lỗi hệ thống khi lấy dữ liệu biểu đồ cây.",
      };
    case "en":
      return {
        name1: "User id not found!",
        name2: "You do not have permission to view the chart!",
        name3: "Internal error while fetching treemap chart data.",
      };
    case "zh":
      return {
        name1: "未找到用户ID！",
        name2: "您没有权限查看图表！",
        name3: "获取树形图数据时发生内部错误。",
      };
    case "fr":
      return {
        name1: "ID utilisateur introuvable !",
        name2: "Vous n'avez pas l'autorisation de voir le graphique !",
        name3:
          "Erreur interne lors de la récupération des données du graphique en arborescence.",
      };
    case "ja":
      return {
        name1: "ユーザーIDが見つかりません！",
        name2: "チャートを表示する権限がありません！",
        name3: "ツリーマップチャートのデータ取得中に内部エラーが発生しました。",
      };
    default:
      return {
        name1: "User id not found!",
        name2: "You do not have permission to view the chart!",
        name3: "Internal error while fetching treemap chart data.",
      };
  }
};

export const translateCheckAttendanceGet = (language: string) => {
  switch (language) {
    case "vi":
      return {
        name1: "Không tìm thấy user id!",
        name2: "Bạn không có quyền xem attendance!",
        name3: "Lỗi hệ thống khi lấy dữ liệu lịch sự kiện.",
      };
    case "en":
      return {
        name1: "User id not found!",
        name2: "You do not have permission to view attendance!",
        name3: "Internal error while fetching event calendar data.",
      };
    case "zh":
      return {
        name1: "未找到用户ID！",
        name2: "您没有权限查看出勤记录！",
        name3: "获取事件日历数据时发生内部错误。",
      };
    case "fr":
      return {
        name1: "ID utilisateur introuvable !",
        name2: "Vous n'avez pas l'autorisation de voir les présences !",
        name3:
          "Erreur interne lors de la récupération des données du calendrier des événements.",
      };
    case "ja":
      return {
        name1: "ユーザーIDが見つかりません！",
        name2: "出席情報を表示する権限がありません！",
        name3: "イベントカレンダーのデータ取得中に内部エラーが発生しました。",
      };
    default:
      return {
        name1: "User id not found!",
        name2: "You do not have permission to view attendance!",
        name3: "Internal error while fetching event calendar data.",
      };
  }
};

export const translateCheckAttendancePost = (language: string) => {
  switch (language) {
    case "vi":
      return {
        name1: "Không tìm thấy user id!",
        name2: "Bạn không có quyền check attendance!",
        name3: "Store id là bắt buộc!",
        name4: "Ảnh quá mờ hoặc không tìm thấy!",
        name5: "Không tìm thấy ảnh!",
        name6: "Eventcalendar id là bắt buộc!",
        name7: "Không tìm thấy store id!",
        name8: "Mã qr không đúng!",
        name9: "Bạn đã cập nhật ảnh!",
        name10: "Bạn đã cập nhật bằng NFC!",
        name11: "Lỗi hệ thống khi đăng lịch sự kiện.",
      };
    case "en":
      return {
        name1: "User id not found!",
        name2: "You do not have permission to check attendance!",
        name3: "Store id is required!",
        name4: "The image is too blurry or not found!",
        name5: "Image not found!",
        name6: "Eventcalendar id is required!",
        name7: "Store id not found!",
        name8: "QR code is incorrect!",
        name9: "You have updated the image!",
        name10: "You have updated with NFC!",
        name11: "Internal error while posting the event calendar.",
      };
    case "zh":
      return {
        name1: "未找到用户ID！",
        name2: "您没有权限检查出勤记录！",
        name3: "商店ID是必填项！",
        name4: "图片模糊或未找到！",
        name5: "未找到图片！",
        name6: "事件日历ID是必填项！",
        name7: "未找到商店ID！",
        name8: "二维码不正确！",
        name9: "您已更新图片！",
        name10: "您已通过NFC更新！",
        name11: "发布事件日历时发生内部错误。",
      };
    case "fr":
      return {
        name1: "ID utilisateur introuvable !",
        name2: "Vous n'avez pas l'autorisation de vérifier la présence !",
        name3: "L'ID du magasin est requis !",
        name4: "L'image est trop floue ou introuvable !",
        name5: "Image introuvable !",
        name6: "L'ID du calendrier des événements est requis !",
        name7: "ID du magasin introuvable !",
        name8: "Le code QR est incorrect !",
        name9: "Vous avez mis à jour l'image !",
        name10: "Vous avez mis à jour avec NFC !",
        name11:
          "Erreur interne lors de la publication du calendrier des événements.",
      };
    case "ja":
      return {
        name1: "ユーザーIDが見つかりません！",
        name2: "出席情報を確認する権限がありません！",
        name3: "店舗IDは必須です！",
        name4: "画像がぼやけているか、見つかりません！",
        name5: "画像が見つかりません！",
        name6: "イベントカレンダーIDは必須です！",
        name7: "店舗IDが見つかりません！",
        name8: "QRコードが間違っています！",
        name9: "画像を更新しました！",
        name10: "NFCで更新しました！",
        name11: "イベントカレンダーの投稿中に内部エラーが発生しました。",
      };
    default:
      return {
        name1: "User id not found!",
        name2: "You do not have permission to check attendance!",
        name3: "Store id is required!",
        name4: "The image is too blurry or not found!",
        name5: "Image not found!",
        name6: "Eventcalendar id is required!",
        name7: "Store id not found!",
        name8: "QR code is incorrect!",
        name9: "You have updated the image!",
        name10: "You have updated with NFC!",
        name11: "Internal error while posting the event calendar.",
      };
  }
};

export const translateCheckAttendancePatch = (language: string) => {
  switch (language) {
    case "vi":
      return {
        name1: "Store id là bắt buộc!",
        name2: "Không tìm thấy user id!",
        name3: "Bạn không có quyền cập nhật check attendance!",
        name4: "Không tìm mã thẻ!",
        name5: "Eventcalendar id là bắt buộc!",
        name6: "Không tìm thấy store id!",
        name7: "Mã NFC không đúng!",
        name8: "Bạn đã cập nhật bằng ảnh!",
        name9: "Bạn đã cập nhật NFC!",
        name10: "Lỗi hệ thống khi đăng lịch sự kiện.",
      };
    case "en":
      return {
        name1: "Store id is required!",
        name2: "User id not found!",
        name3: "You do not have permission to update check attendance!",
        name4: "Card code not found!",
        name5: "Eventcalendar id is required!",
        name6: "Store id not found!",
        name7: "NFC code is incorrect!",
        name8: "You have updated with an image!",
        name9: "You have updated with NFC!",
        name10: "Internal error while posting the event calendar.",
      };
    case "zh":
      return {
        name1: "商店ID是必填项！",
        name2: "未找到用户ID！",
        name3: "您没有权限更新出勤记录！",
        name4: "未找到卡片代码！",
        name5: "事件日历ID是必填项！",
        name6: "未找到商店ID！",
        name7: "NFC代码不正确！",
        name8: "您已通过图像更新！",
        name9: "您已通过NFC更新！",
        name10: "发布事件日历时发生内部错误。",
      };
    case "fr":
      return {
        name1: "L'ID du magasin est requis !",
        name2: "ID utilisateur introuvable !",
        name3: "Vous n'avez pas l'autorisation de mettre à jour la présence !",
        name4: "Code de la carte introuvable !",
        name5: "L'ID du calendrier des événements est requis !",
        name6: "ID du magasin introuvable !",
        name7: "Le code NFC est incorrect !",
        name8: "Vous avez mis à jour avec une image !",
        name9: "Vous avez mis à jour avec NFC !",
        name10:
          "Erreur interne lors de la publication du calendrier des événements.",
      };
    case "ja":
      return {
        name1: "店舗IDは必須です！",
        name2: "ユーザーIDが見つかりません！",
        name3: "出席情報を更新する権限がありません！",
        name4: "カードコードが見つかりません！",
        name5: "イベントカレンダーIDは必須です！",
        name6: "店舗IDが見つかりません！",
        name7: "NFCコードが間違っています！",
        name8: "画像で更新しました！",
        name9: "NFCで更新しました！",
        name10: "イベントカレンダーの投稿中に内部エラーが発生しました。",
      };
    default:
      return {
        name1: "Store id is required!",
        name2: "User id not found!",
        name3: "You do not have permission to update check attendance!",
        name4: "Card code not found!",
        name5: "Eventcalendar id is required!",
        name6: "Store id not found!",
        name7: "NFC code is incorrect!",
        name8: "You have updated with an image!",
        name9: "You have updated with NFC!",
        name10: "Internal error while posting the event calendar.",
      };
  }
};

export const translateCheckout = (language: string) => {
  switch (language) {
    case "vi":
      return {
        productIdsRequired: "Product ids là bắt buộc",
        insufficientQuantity: "Số lượng không đủ cho sản phẩm",
        product: "Sản phẩm",
        insuranceAmount: "Số tiền bảo hiểm là",
        amountNotOnSale: "Số tiền chưa sale là",
      };
    case "en":
      return {
        productIdsRequired: "Product ids are required",
        insufficientQuantity: "Insufficient quantity for the product",
        product: "Product",
        insuranceAmount: "The insurance amount is",
        amountNotOnSale: "The amount not on sale is",
      };
    case "zh":
      return {
        productIdsRequired: "产品ID是必填项",
        insufficientQuantity: "产品数量不足",
        product: "产品",
        insuranceAmount: "保险金额为",
        amountNotOnSale: "未销售金额为",
      };
    case "fr":
      return {
        productIdsRequired: "Les identifiants des produits sont requis",
        insufficientQuantity: "Quantité insuffisante pour le produit",
        product: "Produit",
        insuranceAmount: "Le montant de l'assurance est",
        amountNotOnSale: "Le montant non soldé est",
      };
    case "ja":
      return {
        productIdsRequired: "製品IDは必須です",
        insufficientQuantity: "製品の数量が不足しています",
        product: "製品",
        insuranceAmount: "保険金額は",
        amountNotOnSale: "未販売の金額は",
      };
    default:
      return {
        productIdsRequired: "Product ids are required",
        insufficientQuantity: "Insufficient quantity for the product",
        product: "Product",
        insuranceAmount: "The insurance amount is",
        amountNotOnSale: "The amount not on sale is",
      };
  }
};

export const translateCheckOutCashPost = (language: string) => {
  switch (language) {
    case "vi":
      return {
        insufficientQuantity: "Số lượng không đủ cho sản phẩm",
        totalAmount: "Thành tiền",
        orderSuccess: "ĐẶT HÀNG THÀNH CÔNG",
        thankYou: "Cảm ơn",
        orderInfo:
          " đã tin tưởng của hàng VLXD Xuân Trường. Mã vận đơn của bạn là",
        deliveryInfo:
          "Sau khi shop nhận đơn hàng, sản phẩm sẽ được giao đến địa chỉ",
        deliveryTime: "trong",
        estimatedArrival: "Dự kiến trước ngày",
        shopPrepare:
          "Sau khi shop nhận đơn hàng, ngay lập tức soạn hàng nhanh chóng. Sau khi soạn đủ sẽ gọi bạn đến lấy.",
        orderId: "ID",
        productName: "Tên sản phẩm",
        quantity: "Số lượng",
        warranty: "Bảo hành",
        price: "Giá tiền",
        trackOrder: "Bạn có thể theo dõi đơn hàng tại",
        shippingInfo: "Vận chuyển đơn hàng",
        shippingInstructions: "sau đó dán mã vận đơn chúng tôi đã gửi cho bạn.",
        customerService: "VLXD Xuân Trường rất hân hạnh được phục vụ bạn!",
        continueShopping: "Tiếp tục mua hàng",
        orderDetails: "Chi tiết đơn hàng",
        orderCompleted: "Order Completed",
        emailError: "Error sending email",
        checkoutError: "Internal error during checkout.",
      };
    case "en":
      return {
        insufficientQuantity: "Insufficient quantity for the product",
        totalAmount: "Total amount",
        orderSuccess: "ORDER SUCCESSFUL",
        thankYou: "Thank you",
        orderInfo:
          " has trusted VLXD Xuân Trường store. Your tracking number is",
        deliveryInfo:
          "After the shop receives the order, the product will be delivered to the address",
        deliveryTime: "within",
        estimatedArrival: "Estimated before",
        shopPrepare:
          "Once the shop receives the order, we will immediately prepare the goods. After the preparation is complete, we will call you to pick it up.",
        orderId: "ID",
        productName: "Product Name",
        quantity: "Quantity",
        warranty: "Warranty",
        price: "Price",
        trackOrder: "You can track your order at",
        shippingInfo: "Shipping the order",
        shippingInstructions:
          "then paste the tracking number we have sent you.",
        customerService: "VLXD Xuân Trường is honored to serve you!",
        continueShopping: "Continue shopping",
        orderDetails: "Order details",
        orderCompleted: "Order Completed",
        emailError: "Error sending email",
        checkoutError: "Internal error during checkout.",
      };
    case "zh":
      return {
        insufficientQuantity: "产品数量不足",
        totalAmount: "总金额",
        orderSuccess: "订单成功",
        thankYou: "谢谢",
        orderInfo: " 已信任VLXD Xuân Trường商店。您的运单号是",
        deliveryInfo: "商店收到订单后，产品将送到地址",
        deliveryTime: "在",
        estimatedArrival: "预计在之前到达",
        shopPrepare: "商店收到订单后，将立即准备商品，准备好后会通知您来取货。",
        orderId: "ID",
        productName: "产品名称",
        quantity: "数量",
        warranty: "保修",
        price: "价格",
        trackOrder: "您可以在这里追踪您的订单",
        shippingInfo: "运输订单",
        shippingInstructions: "然后粘贴我们已发送给您的运单号。",
        customerService: "VLXD Xuân Trường很荣幸为您服务！",
        continueShopping: "继续购物",
        orderDetails: "订单详情",
        orderCompleted: "订单完成",
        emailError: "发送电子邮件错误",
        checkoutError: "结账过程中发生内部错误。",
      };
    case "fr":
      return {
        insufficientQuantity: "Quantité insuffisante pour le produit",
        totalAmount: "Montant total",
        orderSuccess: "COMMANDE RÉUSSIE",
        thankYou: "Merci",
        orderInfo:
          " a fait confiance au magasin VLXD Xuân Trường. Votre numéro de suivi est",
        deliveryInfo:
          "Après que le magasin ait reçu la commande, le produit sera livré à l'adresse",
        deliveryTime: "dans",
        estimatedArrival: "Prévu avant le",
        shopPrepare:
          "Une fois que le magasin reçoit la commande, nous préparons immédiatement les articles. Une fois les articles prêts, nous vous appellerons pour venir les chercher.",
        orderId: "ID",
        productName: "Nom du produit",
        quantity: "Quantité",
        warranty: "Garantie",
        price: "Prix",
        trackOrder: "Vous pouvez suivre votre commande à",
        shippingInfo: "Expédition de la commande",
        shippingInstructions:
          "puis collez le numéro de suivi que nous vous avons envoyé.",
        customerService: "VLXD Xuân Trường est honoré de vous servir!",
        continueShopping: "Continuer vos achats",
        orderDetails: "Détails de la commande",
        orderCompleted: "Commande terminée",
        emailError: "Erreur d'envoi d'email",
        checkoutError: "Erreur interne lors du passage en caisse.",
      };
    case "ja":
      return {
        insufficientQuantity: "製品の数量が不足しています",
        totalAmount: "合計金額",
        orderSuccess: "注文成功",
        thankYou: "ありがとうございます",
        orderInfo: " はVLXD Xuân Trườngに信頼しています。追跡番号は",
        deliveryInfo: "店舗が注文を受け取った後、商品は住所に配達されます",
        deliveryTime: "以内",
        estimatedArrival: "予定日以前",
        shopPrepare:
          "店舗が注文を受け取った後、すぐに商品を準備します。準備が整ったら、取りに来るようにお電話します。",
        orderId: "ID",
        productName: "製品名",
        quantity: "数量",
        warranty: "保証",
        price: "価格",
        trackOrder: "注文はここで追跡できます",
        shippingInfo: "注文の配送",
        shippingInstructions: "その後、送信した追跡番号を貼り付けてください。",
        customerService:
          "VLXD Xuân Trườngはお客様にサービスを提供できることを光栄に思います！",
        continueShopping: "ショッピングを続ける",
        orderDetails: "注文詳細",
        orderCompleted: "注文完了",
        emailError: "メール送信エラー",
        checkoutError: "チェックアウト中に内部エラーが発生しました。",
      };
    default:
      return {
        insufficientQuantity: "Insufficient quantity for the product",
        totalAmount: "Total amount",
        orderSuccess: "ORDER SUCCESSFUL",
        thankYou: "Thank you",
        orderInfo:
          " has trusted VLXD Xuân Trường store. Your tracking number is",
        deliveryInfo:
          "After the shop receives the order, the product will be delivered to the address",
        deliveryTime: "within",
        estimatedArrival: "Estimated before",
        shopPrepare:
          "Once the shop receives the order, we will immediately prepare the goods. After the preparation is complete, we will call you to pick it up.",
        orderId: "ID",
        productName: "Product Name",
        quantity: "Quantity",
        warranty: "Warranty",
        price: "Price",
        trackOrder: "You can track your order at",
        shippingInfo: "Shipping the order",
        shippingInstructions:
          "then paste the tracking number we have sent you.",
        customerService: "VLXD Xuân Trường is honored to serve you!",
        continueShopping: "Continue shopping",
        orderDetails: "Order details",
        orderCompleted: "Order Completed",
        emailError: "Error sending email",
        checkoutError: "Internal error during checkout.",
      };
  }
};

export const translateOrderErrorPatch = (language: string) => {
  switch (language) {
    case "vi":
      return "Lỗi hệ thống khi lấy đơn hàng.";
    case "en":
      return "Internal error while getting orders.";
    case "zh":
      return "获取订单时发生内部错误。";
    case "fr":
      return "Erreur interne lors de la récupération des commandes.";
    case "ja":
      return "注文の取得中に内部エラーが発生しました。";
    default:
      return "Internal error while getting orders.";
  }
};

export const translateColorPost = (language: string) => {
  switch (language) {
    case "vi":
      return {
        userIdNotFound: "Không tìm thấy user id!",
        permissionDenied: "Bạn không có quyền tạo mới color!",
        nameRequired: "Name is required!",
        colorRequired: "Color is required!",
        storeIdRequired: "Store id is required!",
        storeIdNotFound: "Không tìm thấy store id!",
        internalError: "Internal error post color.",
        colorExists: "Tên màu đã tồn tại!",
      };
    case "en":
      return {
        userIdNotFound: "User ID not found!",
        permissionDenied: "You do not have permission to create a new color!",
        nameRequired: "Name is required!",
        colorRequired: "Color is required!",
        storeIdRequired: "Store ID is required!",
        storeIdNotFound: "Store ID not found!",
        internalError: "Internal error while posting color.",
        colorExists: "Color already exists!",
      };
    case "zh":
      return {
        userIdNotFound: "未找到用户ID！",
        permissionDenied: "您没有权限创建新颜色！",
        nameRequired: "名称是必填项！",
        colorRequired: "颜色是必填项！",
        storeIdRequired: "商店ID是必填项！",
        storeIdNotFound: "未找到商店ID！",
        internalError: "发布颜色时发生内部错误。",
        colorExists: "颜色已存在！",
      };
    case "fr":
      return {
        userIdNotFound: "ID utilisateur introuvable !",
        permissionDenied:
          "Vous n'avez pas l'autorisation de créer une nouvelle couleur !",
        nameRequired: "Le nom est requis !",
        colorRequired: "La couleur est requise !",
        storeIdRequired: "L'ID du magasin est requis !",
        storeIdNotFound: "ID du magasin introuvable !",
        internalError: "Erreur interne lors de la publication de la couleur.",
        colorExists: "Le nom de la couleur existe déjà !",
      };
    case "ja":
      return {
        userIdNotFound: "ユーザーIDが見つかりません！",
        permissionDenied: "新しい色を作成する権限がありません！",
        nameRequired: "名前は必須です！",
        colorRequired: "色は必須です！",
        storeIdRequired: "店舗IDは必須です！",
        storeIdNotFound: "店舗IDが見つかりません！",
        internalError: "色の投稿中に内部エラーが発生しました。",
        colorExists: "色名は既に存在します！",
      };
    default:
      return {
        userIdNotFound: "User ID not found!",
        permissionDenied: "You do not have permission to create a new color!",
        nameRequired: "Name is required!",
        colorRequired: "Color is required!",
        storeIdRequired: "Store ID is required!",
        storeIdNotFound: "Store ID not found!",
        internalError: "Internal error while posting color.",
        colorExists: "Color already exists!",
      };
  }
};

export const translateColorGet = (language: string) => {
  switch (language) {
    case "vi":
      return {
        storeIdRequired: "Store id là bắt buộc!",
        internalError: "Lỗi hệ thống khi lấy màu.",
      };
    case "en":
      return {
        storeIdRequired: "Store ID is required!",
        internalError: "Internal error while getting color.",
      };
    case "zh":
      return {
        storeIdRequired: "商店ID是必填项！",
        internalError: "获取颜色时发生内部错误。",
      };
    case "fr":
      return {
        storeIdRequired: "L'ID du magasin est requis !",
        internalError: "Erreur interne lors de la récupération de la couleur.",
      };
    case "ja":
      return {
        storeIdRequired: "店舗IDは必須です！",
        internalError: "色の取得中に内部エラーが発生しました。",
      };
    default:
      return {
        storeIdRequired: "Store ID is required!",
        internalError: "Internal error while getting color.",
      };
  }
};

export const translateColorDelete = (language: string) => {
  switch (language) {
    case "vi":
      return {
        userNotFound: "Không tìm thấy user!",
        permissionDenied: "Bạn không có quyền xóa color!",
        idsRequired: "Mảng IDs không được trống!",
        storeIdNotFound: "Không tìm thấy store id!",
        deleteSuccess: "Xóa thành công!",
        internalError: "Lỗi hệ thống khi xóa color.",
      };
    case "en":
      return {
        userNotFound: "User not found!",
        permissionDenied: "You do not have permission to delete color!",
        idsRequired: "IDs array cannot be empty!",
        storeIdNotFound: "Store ID not found!",
        deleteSuccess: "Deleted successfully!",
        internalError: "Internal error while deleting color.",
      };
    case "zh":
      return {
        userNotFound: "未找到用户！",
        permissionDenied: "您没有权限删除颜色！",
        idsRequired: "ID数组不能为空！",
        storeIdNotFound: "未找到商店ID！",
        deleteSuccess: "删除成功！",
        internalError: "删除颜色时发生内部错误。",
      };
    case "fr":
      return {
        userNotFound: "Utilisateur introuvable !",
        permissionDenied:
          "Vous n'avez pas l'autorisation de supprimer la couleur !",
        idsRequired: "Le tableau d'IDs ne peut pas être vide !",
        storeIdNotFound: "ID du magasin introuvable !",
        deleteSuccess: "Supprimé avec succès !",
        internalError: "Erreur interne lors de la suppression de la couleur.",
      };
    case "ja":
      return {
        userNotFound: "ユーザーが見つかりません！",
        permissionDenied: "色を削除する権限がありません！",
        idsRequired: "ID配列は空にできません！",
        storeIdNotFound: "店舗IDが見つかりません！",
        deleteSuccess: "削除に成功しました！",
        internalError: "色の削除中に内部エラーが発生しました。",
      };
    default:
      return {
        userNotFound: "User not found!",
        permissionDenied: "You do not have permission to delete color!",
        idsRequired: "IDs array cannot be empty!",
        storeIdNotFound: "Store ID not found!",
        deleteSuccess: "Deleted successfully!",
        internalError: "Internal error while deleting color.",
      };
  }
};

export const translateColorIdGet = (language: string) => {
  switch (language) {
    case "vi":
      return {
        colorIdRequired: "Color id là bắt buộc!",
        userIdNotFound: "Không tìm thấy user id!",
        permissionDenied: "Bạn không có quyền xem color!",
        internalError: "Lỗi hệ thống khi lấy color.",
      };
    case "en":
      return {
        colorIdRequired: "Color ID is required!",
        userIdNotFound: "User ID not found!",
        permissionDenied: "You do not have permission to view color!",
        internalError: "Internal error while getting color.",
      };
    case "zh":
      return {
        colorIdRequired: "颜色ID是必填项！",
        userIdNotFound: "未找到用户ID！",
        permissionDenied: "您没有权限查看颜色！",
        internalError: "获取颜色时发生内部错误。",
      };
    case "fr":
      return {
        colorIdRequired: "L'ID de la couleur est requis !",
        userIdNotFound: "ID utilisateur introuvable !",
        permissionDenied: "Vous n'avez pas l'autorisation de voir la couleur !",
        internalError: "Erreur interne lors de la récupération de la couleur.",
      };
    case "ja":
      return {
        colorIdRequired: "色のIDは必須です！",
        userIdNotFound: "ユーザーIDが見つかりません！",
        permissionDenied: "色を見る権限がありません！",
        internalError: "色の取得中に内部エラーが発生しました。",
      };
    default:
      return {
        colorIdRequired: "Color ID is required!",
        userIdNotFound: "User ID not found!",
        permissionDenied: "You do not have permission to view color!",
        internalError: "Internal error while getting color.",
      };
  }
};

export const translateColorIdDelete = (language: string) => {
  switch (language) {
    case "vi":
      return {
        userIdNotFound: "Không tìm thấy user id!",
        permissionDenied: "Bạn không có quyền xóa color!",
        colorIdRequired: "Color id là bắt buộc!",
        storeIdNotFound: "Không tìm thấy store id!",
        internalError: "Lỗi hệ thống khi xóa color.",
      };
    case "en":
      return {
        userIdNotFound: "User ID not found!",
        permissionDenied: "You do not have permission to delete color!",
        colorIdRequired: "Color ID is required!",
        storeIdNotFound: "Store ID not found!",
        internalError: "Internal error while deleting color.",
      };
    case "zh":
      return {
        userIdNotFound: "未找到用户ID！",
        permissionDenied: "您没有权限删除颜色！",
        colorIdRequired: "颜色ID是必填项！",
        storeIdNotFound: "未找到商店ID！",
        internalError: "删除颜色时发生内部错误。",
      };
    case "fr":
      return {
        userIdNotFound: "ID utilisateur introuvable !",
        permissionDenied:
          "Vous n'avez pas l'autorisation de supprimer la couleur !",
        colorIdRequired: "L'ID de la couleur est requis !",
        storeIdNotFound: "ID du magasin introuvable !",
        internalError: "Erreur interne lors de la suppression de la couleur.",
      };
    case "ja":
      return {
        userIdNotFound: "ユーザーIDが見つかりません！",
        permissionDenied: "色を削除する権限がありません！",
        colorIdRequired: "色のIDは必須です！",
        storeIdNotFound: "店舗IDが見つかりません！",
        internalError: "色の削除中に内部エラーが発生しました。",
      };
    default:
      return {
        userIdNotFound: "User ID not found!",
        permissionDenied: "You do not have permission to delete color!",
        colorIdRequired: "Color ID is required!",
        storeIdNotFound: "Store ID not found!",
        internalError: "Internal error while deleting color.",
      };
  }
};

export const translateColorPatch = (language: string) => {
  switch (language) {
    case "vi":
      return {
        userIdNotFound: "Không tìm thấy user id!",
        permissionDenied: "Bạn không có quyền cập nhật color!",
        nameRequired: "Name là bắt buộc!",
        colorRequired: "Color là bắt buộc!",
        colorIdRequired: "Color id là bắt buộc!",
        storeIdNotFound: "Không tìm thấy store id!",
        internalError: "Lỗi hệ thống khi cập nhật color.",
        colorExists: "Tên màu đã tồn tại!",
        colorNotFound: "Không tìm thấy màu!",
      };
    case "en":
      return {
        userIdNotFound: "User ID not found!",
        permissionDenied: "You do not have permission to update color!",
        nameRequired: "Name is required!",
        colorRequired: "Color is required!",
        colorIdRequired: "Color ID is required!",
        storeIdNotFound: "Store ID not found!",
        internalError: "Internal error while updating color.",
        colorExists: "Color already exists!",
        colorNotFound: "Color not found!",
      };
    case "zh":
      return {
        userIdNotFound: "未找到用户ID！",
        permissionDenied: "您没有权限更新颜色！",
        nameRequired: "名称是必填项！",
        colorRequired: "颜色是必填项！",
        colorIdRequired: "颜色ID是必填项！",
        storeIdNotFound: "未找到商店ID！",
        internalError: "更新颜色时发生内部错误。",
        colorExists: "颜色已存在！",
        colorNotFound: "未找到颜色！",
      };
    case "fr":
      return {
        userIdNotFound: "ID utilisateur introuvable !",
        permissionDenied:
          "Vous n'avez pas l'autorisation de mettre à jour la couleur !",
        nameRequired: "Le nom est requis !",
        colorRequired: "La couleur est requise !",
        colorIdRequired: "L'ID de la couleur est requis !",
        storeIdNotFound: "ID du magasin introuvable !",
        internalError: "Erreur interne lors de la mise à jour de la couleur.",
        colorExists: "Le nom de la couleur existe déjà !",
        colorNotFound: "Couleur introuvable !",
      };
    case "ja":
      return {
        userIdNotFound: "ユーザーIDが見つかりません！",
        permissionDenied: "色を更新する権限がありません！",
        nameRequired: "名前は必須です！",
        colorRequired: "色は必須です！",
        colorIdRequired: "色のIDは必須です！",
        storeIdNotFound: "店舗IDが見つかりません！",
        internalError: "色の更新中に内部エラーが発生しました。",
        colorExists: "色名は既に存在します！",
        colorNotFound: "色が見つかりません！",
      };
    default:
      return {
        userIdNotFound: "User ID not found!",
        permissionDenied: "You do not have permission to update color!",
        nameRequired: "Name is required!",
        colorRequired: "Color is required!",
        colorIdRequired: "Color ID is required!",
        storeIdNotFound: "Store ID not found!",
        internalError: "Internal error while updating color.",
        colorExists: "Color already exists!",
        colorNotFound: "Color not found!",
      };
  }
};


export const translateCommentPost = (language: string) => {
  switch (language) {
    case "vi":
      return {
        ratingRequired: "Rating là bắt buộc!",
        productRequired: "Sản phẩm là bắt buộc!",
        commentRequired: "Comment là bắt buộc!",
        userIdNotFound: "Không tìm thấy user id!",
        internalError: "Lỗi hệ thống khi đăng bình luận.",
      };
    case "en":
      return {
        ratingRequired: "Rating is required!",
        productRequired: "Product is required!",
        commentRequired: "Comment is required!",
        userIdNotFound: "User ID not found!",
        internalError: "Internal error while posting the comment.",
      };
    case "zh":
      return {
        ratingRequired: "评分是必填项！",
        productRequired: "产品是必填项！",
        commentRequired: "评论是必填项！",
        userIdNotFound: "未找到用户ID！",
        internalError: "发布评论时发生内部错误。",
      };
    case "fr":
      return {
        ratingRequired: "La note est requise !",
        productRequired: "Le produit est requis !",
        commentRequired: "Le commentaire est requis !",
        userIdNotFound: "ID utilisateur introuvable !",
        internalError: "Erreur interne lors de la publication du commentaire.",
      };
    case "ja":
      return {
        ratingRequired: "評価は必須です！",
        productRequired: "製品は必須です！",
        commentRequired: "コメントは必須です！",
        userIdNotFound: "ユーザーIDが見つかりません！",
        internalError: "コメント投稿中に内部エラーが発生しました。",
      };
    default:
      return {
        ratingRequired: "Rating is required!",
        productRequired: "Product is required!",
        commentRequired: "Comment is required!",
        userIdNotFound: "User ID not found!",
        internalError: "Internal error while posting the comment.",
      };
  }
};

export const translateCommentDelete = (language: string) => {
  switch (language) {
    case "vi":
      return {
        userIdNotFound: "Không tìm thấy user id!",
        commentByIdNotFound: "Không tìm thấy comment theo ID!",
        internalError: "Lỗi hệ thống khi xóa bình luận.",
      };
    case "en":
      return {
        userIdNotFound: "User ID not found!",
        commentByIdNotFound: "Comment by ID not found!",
        internalError: "Internal error while deleting the comment.",
      };
    case "zh":
      return {
        userIdNotFound: "未找到用户ID！",
        commentByIdNotFound: "未找到按ID的评论！",
        internalError: "删除评论时发生内部错误。",
      };
    case "fr":
      return {
        userIdNotFound: "ID utilisateur introuvable !",
        commentByIdNotFound: "Commentaire par ID introuvable !",
        internalError: "Erreur interne lors de la suppression du commentaire.",
      };
    case "ja":
      return {
        userIdNotFound: "ユーザーIDが見つかりません！",
        commentByIdNotFound: "IDでコメントが見つかりません！",
        internalError: "コメント削除中に内部エラーが発生しました。",
      };
    default:
      return {
        userIdNotFound: "User ID not found!",
        commentByIdNotFound: "Comment by ID not found!",
        internalError: "Internal error while deleting the comment.",
      };
  }
};

export const translateCommentPatch = (language: string) => {
  switch (language) {
    case "vi":
      return {
        userIdNotFound: "Không tìm thấy user id!",
        internalError: "Lỗi hệ thống khi cập nhật bình luận.",
      };
    case "en":
      return {
        userIdNotFound: "User ID not found!",
        internalError: "Internal error while patching the comment.",
      };
    case "zh":
      return {
        userIdNotFound: "未找到用户ID！",
        internalError: "更新评论时发生内部错误。",
      };
    case "fr":
      return {
        userIdNotFound: "ID utilisateur introuvable !",
        internalError: "Erreur interne lors de la mise à jour du commentaire.",
      };
    case "ja":
      return {
        userIdNotFound: "ユーザーIDが見つかりません！",
        internalError: "コメント更新中に内部エラーが発生しました。",
      };
    default:
      return {
        userIdNotFound: "User ID not found!",
        internalError: "Internal error while patching the comment.",
      };
  }
};

export const translateCommentGet = (language: string) => {
  switch (language) {
    case "vi":
      return {
        internalError: "Lỗi hệ thống khi lấy bình luận.",
      };
    case "en":
      return {
        internalError: "Internal error while getting the comment.",
      };
    case "zh":
      return {
        internalError: "获取评论时发生内部错误。",
      };
    case "fr":
      return {
        internalError: "Erreur interne lors de la récupération du commentaire.",
      };
    case "ja":
      return {
        internalError: "コメント取得中に内部エラーが発生しました。",
      };
    default:
      return {
        internalError: "Internal error while getting the comment.",
      };
  }
};

export const translateResponseCommentPost = (language: string) => {
  switch (language) {
    case "vi":
      return {
        descriptionRequired: "Mô tả là bắt buộc!",
        userIdNotFound: "Không tìm thấy user id!",
        internalError: "Lỗi hệ thống khi đăng phản hồi bình luận.",
      };
    case "en":
      return {
        descriptionRequired: "Description is required!",
        userIdNotFound: "User ID not found!",
        internalError: "Internal error while posting the response comment.",
      };
    case "zh":
      return {
        descriptionRequired: "描述是必填项！",
        userIdNotFound: "未找到用户ID！",
        internalError: "发布响应评论时发生内部错误。",
      };
    case "fr":
      return {
        descriptionRequired: "La description est requise !",
        userIdNotFound: "ID utilisateur introuvable !",
        internalError:
          "Erreur interne lors de la publication de la réponse au commentaire.",
      };
    case "ja":
      return {
        descriptionRequired: "説明は必須です！",
        userIdNotFound: "ユーザーIDが見つかりません！",
        internalError: "コメントへの返信投稿中に内部エラーが発生しました。",
      };
    default:
      return {
        descriptionRequired: "Description is required!",
        userIdNotFound: "User ID not found!",
        internalError: "Internal error while posting the response comment.",
      };
  }
};

export const translateResponseCommentDelete = (language: string) => {
  switch (language) {
    case "vi":
      return {
        userIdNotFound: "Không tìm thấy user id!",
        internalError: "Lỗi hệ thống khi xóa phản hồi bình luận.",
      };
    case "en":
      return {
        userIdNotFound: "User ID not found!",
        internalError: "Internal error while deleting the response comment.",
      };
    case "zh":
      return {
        userIdNotFound: "未找到用户ID！",
        internalError: "删除响应评论时发生内部错误。",
      };
    case "fr":
      return {
        userIdNotFound: "ID utilisateur introuvable !",
        internalError:
          "Erreur interne lors de la suppression de la réponse au commentaire.",
      };
    case "ja":
      return {
        userIdNotFound: "ユーザーIDが見つかりません！",
        internalError: "コメントへの返信削除中に内部エラーが発生しました。",
      };
    default:
      return {
        userIdNotFound: "User ID not found!",
        internalError: "Internal error while deleting the response comment.",
      };
  }
};

export const translateResponseCommentPatch = (language: string) => {
  switch (language) {
    case "vi":
      return {
        userIdNotFound: "Không tìm thấy user id!",
        internalError: "Lỗi hệ thống khi cập nhật phản hồi bình luận.",
      };
    case "en":
      return {
        userIdNotFound: "User ID not found!",
        internalError: "Internal error while patching the response comment.",
      };
    case "zh":
      return {
        userIdNotFound: "未找到用户ID！",
        internalError: "更新响应评论时发生内部错误。",
      };
    case "fr":
      return {
        userIdNotFound: "ID utilisateur introuvable !",
        internalError:
          "Erreur interne lors de la mise à jour de la réponse au commentaire.",
      };
    case "ja":
      return {
        userIdNotFound: "ユーザーIDが見つかりません！",
        internalError: "コメントへの返信更新中に内部エラーが発生しました。",
      };
    default:
      return {
        userIdNotFound: "User ID not found!",
        internalError: "Internal error while patching the response comment.",
      };
  }
};

export const translateResponseCommentGet = (language: string) => {
  switch (language) {
    case "vi":
      return {
        internalError: "Lỗi hệ thống khi lấy phản hồi bình luận.",
      };
    case "en":
      return {
        internalError: "Internal error while getting the response comment.",
      };
    case "zh":
      return {
        internalError: "获取响应评论时发生内部错误。",
      };
    case "fr":
      return {
        internalError:
          "Erreur interne lors de la récupération de la réponse au commentaire.",
      };
    case "ja":
      return {
        internalError: "コメントへの返信取得中に内部エラーが発生しました。",
      };
    default:
      return {
        internalError: "Internal error while getting the response comment.",
      };
  }
};

export const translateCouponPost = (language: string) => {
  switch (language) {
    case "vi":
      return {
        userIdNotFound: "Không tìm thấy user id!",
        permissionDenied: "Bạn không có quyền tạo mới coupon!",
        nameRequired: "Name là bắt buộc!",
        percentRequired: "Percent là bắt buộc!",
        imageRequired: "Imagecoupon là bắt buộc!",
        storeIdRequired: "Store id là bắt buộc!",
        storeIdNotFound: "Không tìm thấy store id!",
        invalidDurationMonths: "Invalid duration_in_months!",
        invalidDuration: "Invalid duration!",
        internalError: "Lỗi hệ thống khi đăng coupon.",
      };
    case "en":
      return {
        userIdNotFound: "User ID not found!",
        permissionDenied: "You do not have permission to create a new coupon!",
        nameRequired: "Name is required!",
        percentRequired: "Percent is required!",
        imageRequired: "Imagecoupon is required!",
        storeIdRequired: "Store ID is required!",
        storeIdNotFound: "Store ID not found!",
        invalidDurationMonths: "Invalid duration_in_months!",
        invalidDuration: "Invalid duration!",
        internalError: "Internal error while posting the coupon.",
      };
    case "zh":
      return {
        userIdNotFound: "未找到用户ID！",
        permissionDenied: "您没有权限创建新的优惠券！",
        nameRequired: "名称是必填项！",
        percentRequired: "百分比是必填项！",
        imageRequired: "优惠券图片是必填项！",
        storeIdRequired: "商店ID是必填项！",
        storeIdNotFound: "未找到商店ID！",
        invalidDurationMonths: "无效的duration_in_months！",
        invalidDuration: "无效的持续时间！",
        internalError: "发布优惠券时发生内部错误。",
      };
    case "fr":
      return {
        userIdNotFound: "ID utilisateur introuvable !",
        permissionDenied: "Vous n'avez pas l'autorisation de créer un coupon !",
        nameRequired: "Le nom est requis !",
        percentRequired: "Le pourcentage est requis !",
        imageRequired: "L'image du coupon est requise !",
        storeIdRequired: "L'ID du magasin est requis !",
        storeIdNotFound: "ID du magasin introuvable !",
        invalidDurationMonths: "Durée_in_mois invalide !",
        invalidDuration: "Durée invalide !",
        internalError: "Erreur interne lors de la publication du coupon.",
      };
    case "ja":
      return {
        userIdNotFound: "ユーザーIDが見つかりません！",
        permissionDenied: "新しいクーポンを作成する権限がありません！",
        nameRequired: "名前は必須です！",
        percentRequired: "パーセントは必須です！",
        imageRequired: "クーポン画像は必須です！",
        storeIdRequired: "店舗IDは必須です！",
        storeIdNotFound: "店舗IDが見つかりません！",
        invalidDurationMonths: "無効なduration_in_months！",
        invalidDuration: "無効な期間！",
        internalError: "クーポン投稿中に内部エラーが発生しました。",
      };
    default:
      return {
        userIdNotFound: "User ID not found!",
        permissionDenied: "You do not have permission to create a new coupon!",
        nameRequired: "Name is required!",
        percentRequired: "Percent is required!",
        imageRequired: "Imagecoupon is required!",
        storeIdRequired: "Store ID is required!",
        storeIdNotFound: "Store ID not found!",
        invalidDurationMonths: "Invalid duration_in_months!",
        invalidDuration: "Invalid duration!",
        internalError: "Internal error while posting the coupon.",
      };
  }
};

export const translateCouponGet = (language: string) => {
  switch (language) {
    case "vi":
      return {
        storeIdRequired: "Store id là bắt buộc!",
        internalError: "Lỗi hệ thống khi lấy coupon.",
      };
    case "en":
      return {
        storeIdRequired: "Store ID is required!",
        internalError: "Internal error while getting the coupon.",
      };
    case "zh":
      return {
        storeIdRequired: "商店ID是必填项！",
        internalError: "获取优惠券时发生内部错误。",
      };
    case "fr":
      return {
        storeIdRequired: "L'ID du magasin est requis !",
        internalError: "Erreur interne lors de la récupération du coupon.",
      };
    case "ja":
      return {
        storeIdRequired: "店舗IDは必須です！",
        internalError: "クーポン取得中に内部エラーが発生しました。",
      };
    default:
      return {
        storeIdRequired: "Store ID is required!",
        internalError: "Internal error while getting the coupon.",
      };
  }
};

export const translateCouponDelete = (language: string) => {
  switch (language) {
    case "vi":
      return {
        userNotFound: "Không tìm thấy user!",
        permissionDenied: "Bạn không có quyền xóa coupon!",
        emptyIdsArray: "Mảng IDs không được trống!",
        storeIdNotFound: "Không tìm thấy store id!",
        deleteSuccess: "Xóa thành công!",
        internalError: "Lỗi hệ thống khi xóa coupon.",
      };
    case "en":
      return {
        userNotFound: "User not found!",
        permissionDenied: "You do not have permission to delete the coupon!",
        emptyIdsArray: "IDs array cannot be empty!",
        storeIdNotFound: "Store ID not found!",
        deleteSuccess: "Deletion successful!",
        internalError: "Internal error while deleting the coupon.",
      };
    case "zh":
      return {
        userNotFound: "未找到用户！",
        permissionDenied: "您没有权限删除优惠券！",
        emptyIdsArray: "IDs数组不能为空！",
        storeIdNotFound: "未找到商店ID！",
        deleteSuccess: "删除成功！",
        internalError: "删除优惠券时发生内部错误。",
      };
    case "fr":
      return {
        userNotFound: "Utilisateur introuvable !",
        permissionDenied:
          "Vous n'avez pas l'autorisation de supprimer le coupon !",
        emptyIdsArray: "Le tableau des IDs ne peut pas être vide !",
        storeIdNotFound: "ID du magasin introuvable !",
        deleteSuccess: "Suppression réussie !",
        internalError: "Erreur interne lors de la suppression du coupon.",
      };
    case "ja":
      return {
        userNotFound: "ユーザーが見つかりません！",
        permissionDenied: "クーポンを削除する権限がありません！",
        emptyIdsArray: "IDの配列は空であってはなりません！",
        storeIdNotFound: "店舗IDが見つかりません！",
        deleteSuccess: "削除成功！",
        internalError: "クーポン削除中に内部エラーが発生しました。",
      };
    default:
      return {
        userNotFound: "User not found!",
        permissionDenied: "You do not have permission to delete the coupon!",
        emptyIdsArray: "IDs array cannot be empty!",
        storeIdNotFound: "Store ID not found!",
        deleteSuccess: "Deletion successful!",
        internalError: "Internal error while deleting the coupon.",
      };
  }
};

export const translateCouponIdGet = (language: string) => {
  switch (language) {
    case "vi":
      return {
        couponIdRequired: "Coupon id là bắt buộc!",
        userIdNotFound: "Không tìm thấy user id!",
        permissionDenied: "Bạn không có quyền xem coupon!",
        internalError: "Lỗi hệ thống khi lấy coupon.",
      };
    case "en":
      return {
        couponIdRequired: "Coupon id is required!",
        userIdNotFound: "User ID not found!",
        permissionDenied: "You do not have permission to view the coupon!",
        internalError: "Internal error while getting the coupon.",
      };
    case "zh":
      return {
        couponIdRequired: "优惠券ID是必填项！",
        userIdNotFound: "未找到用户ID！",
        permissionDenied: "您没有权限查看优惠券！",
        internalError: "获取优惠券时发生内部错误。",
      };
    case "fr":
      return {
        couponIdRequired: "L'ID du coupon est requis !",
        userIdNotFound: "ID utilisateur introuvable !",
        permissionDenied: "Vous n'avez pas l'autorisation de voir le coupon !",
        internalError: "Erreur interne lors de la récupération du coupon.",
      };
    case "ja":
      return {
        couponIdRequired: "クーポンIDは必須です！",
        userIdNotFound: "ユーザーIDが見つかりません！",
        permissionDenied: "クーポンを表示する権限がありません！",
        internalError: "クーポン取得中に内部エラーが発生しました。",
      };
    default:
      return {
        couponIdRequired: "Coupon id is required!",
        userIdNotFound: "User ID not found!",
        permissionDenied: "You do not have permission to view the coupon!",
        internalError: "Internal error while getting the coupon.",
      };
  }
};

export const translateCouponIdDelete = (language: string) => {
  switch (language) {
    case "vi":
      return {
        userIdNotFound: "Không tìm thấy user id!",
        permissionDenied: "Bạn không có quyền xóa coupon!",
        couponIdRequired: "Coupon id là bắt buộc!",
        storeIdNotFound: "Không tìm thấy store id!",
        internalError: "Lỗi hệ thống khi xóa coupon.",
      };
    case "en":
      return {
        userIdNotFound: "User ID not found!",
        permissionDenied: "You do not have permission to delete the coupon!",
        couponIdRequired: "Coupon id is required!",
        storeIdNotFound: "Store ID not found!",
        internalError: "Internal error while deleting the coupon.",
      };
    case "zh":
      return {
        userIdNotFound: "未找到用户ID！",
        permissionDenied: "您没有权限删除优惠券！",
        couponIdRequired: "优惠券ID是必填项！",
        storeIdNotFound: "未找到商店ID！",
        internalError: "删除优惠券时发生内部错误。",
      };
    case "fr":
      return {
        userIdNotFound: "ID utilisateur introuvable !",
        permissionDenied:
          "Vous n'avez pas l'autorisation de supprimer le coupon !",
        couponIdRequired: "L'ID du coupon est requis !",
        storeIdNotFound: "ID du magasin introuvable !",
        internalError: "Erreur interne lors de la suppression du coupon.",
      };
    case "ja":
      return {
        userIdNotFound: "ユーザーIDが見つかりません！",
        permissionDenied: "クーポンを削除する権限がありません！",
        couponIdRequired: "クーポンIDは必須です！",
        storeIdNotFound: "店舗IDが見つかりません！",
        internalError: "クーポン削除中に内部エラーが発生しました。",
      };
    default:
      return {
        userIdNotFound: "User ID not found!",
        permissionDenied: "You do not have permission to delete the coupon!",
        couponIdRequired: "Coupon id is required!",
        storeIdNotFound: "Store ID not found!",
        internalError: "Internal error while deleting the coupon.",
      };
  }
};

export const translateCouponIdPatch = (language: string) => {
  switch (language) {
    case "vi":
      return {
        userIdNotFound: "Không tìm thấy user id!",
        permissionDenied: "Bạn không có quyền cập nhật coupon!",
        nameRequired: "Name là bắt buộc!",
        percentRequired: "Percent là bắt buộc!",
        imageCouponRequired: "Imagecoupon là bắt buộc!",
        couponIdRequired: "CouponId id là bắt buộc!",
        storeIdNotFound: "Không tìm thấy store id!",
        internalError: "Lỗi hệ thống khi cập nhật coupon.",
      };
    case "en":
      return {
        userIdNotFound: "User ID not found!",
        permissionDenied: "You do not have permission to update the coupon!",
        nameRequired: "Name is required!",
        percentRequired: "Percent is required!",
        imageCouponRequired: "Imagecoupon is required!",
        couponIdRequired: "CouponId id is required!",
        storeIdNotFound: "Store ID not found!",
        internalError: "Internal error while updating the coupon.",
      };
    case "zh":
      return {
        userIdNotFound: "未找到用户ID！",
        permissionDenied: "您没有权限更新优惠券！",
        nameRequired: "名称是必填项！",
        percentRequired: "百分比是必填项！",
        imageCouponRequired: "优惠券图片是必填项！",
        couponIdRequired: "优惠券ID是必填项！",
        storeIdNotFound: "未找到商店ID！",
        internalError: "更新优惠券时发生内部错误。",
      };
    case "fr":
      return {
        userIdNotFound: "ID utilisateur introuvable !",
        permissionDenied:
          "Vous n'avez pas l'autorisation de mettre à jour le coupon !",
        nameRequired: "Le nom est requis !",
        percentRequired: "Le pourcentage est requis !",
        imageCouponRequired: "L'image du coupon est requise !",
        couponIdRequired: "L'ID du coupon est requis !",
        storeIdNotFound: "ID du magasin introuvable !",
        internalError: "Erreur interne lors de la mise à jour du coupon.",
      };
    case "ja":
      return {
        userIdNotFound: "ユーザーIDが見つかりません！",
        permissionDenied: "クーポンを更新する権限がありません！",
        nameRequired: "名前は必須です！",
        percentRequired: "パーセントは必須です！",
        imageCouponRequired: "クーポン画像は必須です！",
        couponIdRequired: "クーポンIDは必須です！",
        storeIdNotFound: "店舗IDが見つかりません！",
        internalError: "クーポン更新中に内部エラーが発生しました。",
      };
    default:
      return {
        userIdNotFound: "User ID not found!",
        permissionDenied: "You do not have permission to update the coupon!",
        nameRequired: "Name is required!",
        percentRequired: "Percent is required!",
        imageCouponRequired: "Imagecoupon is required!",
        couponIdRequired: "CouponId id is required!",
        storeIdNotFound: "Store ID not found!",
        internalError: "Internal error while updating the coupon.",
      };
  }
};

export const translateEvenCalendarGet = (language: string) => {
  switch (language) {
    case "vi":
      return {
        userIdNotFound: "Không tìm thấy user id!",
        permissionDenied: "Bạn không có quyền xem attendance!",
        internalError: "Lỗi hệ thống khi lấy eventcalendar.",
      };
    case "en":
      return {
        userIdNotFound: "User ID not found!",
        permissionDenied: "You do not have permission to view attendance!",
        internalError: "Internal error while getting event calendar.",
      };
    case "zh":
      return {
        userIdNotFound: "未找到用户ID！",
        permissionDenied: "您没有权限查看考勤！",
        internalError: "获取事件日历时发生内部错误。",
      };
    case "fr":
      return {
        userIdNotFound: "ID utilisateur introuvable !",
        permissionDenied:
          "Vous n'avez pas l'autorisation de consulter l'attendance !",
        internalError:
          "Erreur interne lors de la récupération du calendrier des événements.",
      };
    case "ja":
      return {
        userIdNotFound: "ユーザーIDが見つかりません！",
        permissionDenied: "出席情報を見る権限がありません！",
        internalError: "イベントカレンダー取得中に内部エラーが発生しました。",
      };
    default:
      return {
        userIdNotFound: "User ID not found!",
        permissionDenied: "You do not have permission to view attendance!",
        internalError: "Internal error while getting event calendar.",
      };
  }
};

export const translateEvenCalendarPost = (
  language: string,
  timestartwork: string | null | undefined
) => {
  switch (language) {
    case "vi":
      return {
        userIdNotFound: "Không tìm thấy user id!",
        permissionDenied: "Bạn không có quyền kiểm tra điểm danh!",
        startRequired: "Start là bắt buộc!",
        storeIdRequired: "Yêu cầu có id cửa hàng!",
        storeIdNotFound: "Không tìm thấy store id!",
        missingWorkingTime: "Thiếu thời gian làm việc!",
        missingTimeStartWork: "Thiếu thời gian bắt đầu công việc!",
        notYourWorkingDay: "Hôm nay không phải lịch làm của bạn!",
        lateAttendance: "Bạn đã điểm danh trễ, vui lòng quay lại vào ngày mai!",
        invalidWorkingTime: "Thời gian làm việc không hợp lệ!",
        timeStartWorkMessage: `Hãy quay lại vào lúc ${timestartwork}!`,
        internalError: "Lỗi hệ thống khi đăng lịch sự kiện.",
        invalidUserOrMissingWorkingTime:
          "User không hợp lệ hoặc thiếu thời gian làm việc!",
      };
    case "en":
      return {
        userIdNotFound: "User ID not found!",
        permissionDenied: "You do not have permission to check attendance!",
        startRequired: "Start is required!",
        storeIdRequired: "Store ID is required!",
        storeIdNotFound: "Store ID not found!",
        missingWorkingTime: "Missing working time!",
        missingTimeStartWork: "Missing time start work!",
        notYourWorkingDay: "Today is not your working day!",
        lateAttendance: "You have checked in late, please come back tomorrow!",
        invalidWorkingTime: "Invalid working time!",
        timeStartWorkMessage: `Please return at ${timestartwork}!`,
        internalError: "Internal error while posting event calendar.",
        invalidUserOrMissingWorkingTime:
          "Invalid user or missing working time!",
      };
    case "zh":
      return {
        userIdNotFound: "未找到用户ID！",
        permissionDenied: "您没有权限检查考勤！",
        startRequired: "开始时间是必填项！",
        storeIdRequired: "商店ID是必填项！",
        storeIdNotFound: "未找到商店ID！",
        missingWorkingTime: "缺少工作时间！",
        missingTimeStartWork: "缺少开始工作时间！",
        notYourWorkingDay: "今天不是您的工作日！",
        lateAttendance: "您迟到了，请明天再来！",
        invalidWorkingTime: "无效的工作时间！",
        timeStartWorkMessage: `请在 ${timestartwork} 返回！`,
        internalError: "发布事件日历时发生内部错误。",
        invalidUserOrMissingWorkingTime: "用户无效或缺少工作时间！",
      };
    case "fr":
      return {
        userIdNotFound: "ID utilisateur introuvable !",
        permissionDenied:
          "Vous n'avez pas l'autorisation de vérifier l'attendance !",
        startRequired: "Le début est requis !",
        storeIdRequired: "L'ID du magasin est requis !",
        storeIdNotFound: "ID du magasin introuvable !",
        missingWorkingTime: "Temps de travail manquant !",
        missingTimeStartWork: "Temps de début du travail manquant !",
        notYourWorkingDay: "Aujourd'hui n'est pas votre jour de travail !",
        lateAttendance:
          "Vous avez enregistré une arrivée tardive, revenez demain !",
        invalidWorkingTime: "Temps de travail invalide !",
        timeStartWorkMessage: `Veuillez revenir à ${timestartwork} !`,
        internalError:
          "Erreur interne lors de la publication du calendrier des événements.",
        invalidUserOrMissingWorkingTime:
          "Utilisateur invalide ou temps de travail manquant !",
      };
    case "ja":
      return {
        userIdNotFound: "ユーザーIDが見つかりません！",
        permissionDenied: "出席を確認する権限がありません！",
        startRequired: "開始時間は必須です！",
        storeIdRequired: "店舗IDは必須です！",
        storeIdNotFound: "店舗IDが見つかりません！",
        missingWorkingTime: "勤務時間がありません！",
        missingTimeStartWork: "開始時間がありません！",
        notYourWorkingDay: "今日はあなたの勤務日ではありません！",
        lateAttendance: "遅刻してしまいましたので、明日再度来てください！",
        invalidWorkingTime: "無効な勤務時間です！",
        timeStartWorkMessage: ` ${timestartwork} に戻ってください！`,
        internalError: "イベントカレンダーの投稿中に内部エラーが発生しました。",
        invalidUserOrMissingWorkingTime: "無効なユーザーまたは勤務時間の欠落！",
      };
    default:
      return {
        userIdNotFound: "User ID not found!",
        permissionDenied: "You do not have permission to check attendance!",
        startRequired: "Start is required!",
        storeIdRequired: "Store ID is required!",
        storeIdNotFound: "Store ID not found!",
        missingWorkingTime: "Missing working time!",
        missingTimeStartWork: "Missing time start work!",
        notYourWorkingDay: "Today is not your working day!",
        lateAttendance: "You have checked in late, please come back tomorrow!",
        invalidWorkingTime: "Invalid working time!",
        timeStartWorkMessage: `Please return at ${timestartwork}!`,
        internalError: "Internal error while posting event calendar.",
        invalidUserOrMissingWorkingTime:
          "Invalid user or missing working time!",
      };
  }
};

export const translateEvenCalendarPatch = (language: string) => {
  switch (language) {
    case "vi":
      return {
        userIdNotFound: "Không tìm thấy user id!",
        permissionDenied: "Bạn không có quyền cập nhật điểm danh!",
        startRequired: "Start là bắt buộc!",
        storeIdRequired: "Yêu cầu có id cửa hàng!",
        storeIdNotFound: "Không tìm thấy store id!",
        internalError: "Lỗi hệ thống khi cập nhật lịch sự kiện.",
      };
    case "en":
      return {
        userIdNotFound: "User ID not found!",
        permissionDenied: "You do not have permission to update attendance!",
        startRequired: "Start is required!",
        storeIdRequired: "Store ID is required!",
        storeIdNotFound: "Store ID not found!",
        internalError: "Internal error while updating event calendar.",
      };
    case "zh":
      return {
        userIdNotFound: "未找到用户ID！",
        permissionDenied: "您没有权限更新考勤！",
        startRequired: "开始时间是必需的！",
        storeIdRequired: "商店ID是必需的！",
        storeIdNotFound: "未找到商店ID！",
        internalError: "更新事件日历时发生内部错误。",
      };
    case "fr":
      return {
        userIdNotFound: "ID utilisateur introuvable !",
        permissionDenied:
          "Vous n'avez pas l'autorisation de mettre à jour la présence !",
        startRequired: "Le début est requis !",
        storeIdRequired: "L'ID du magasin est requis !",
        storeIdNotFound: "ID du magasin introuvable !",
        internalError:
          "Erreur interne lors de la mise à jour du calendrier des événements.",
      };
    case "ja":
      return {
        userIdNotFound: "ユーザーIDが見つかりません！",
        permissionDenied: "出席を更新する権限がありません！",
        startRequired: "開始時間は必須です！",
        storeIdRequired: "店舗IDは必須です！",
        storeIdNotFound: "店舗IDが見つかりません！",
        internalError: "イベントカレンダーの更新中に内部エラーが発生しました。",
      };
    default:
      return {
        userIdNotFound: "User ID not found!",
        permissionDenied: "You do not have permission to update attendance!",
        startRequired: "Start is required!",
        storeIdRequired: "Store ID is required!",
        storeIdNotFound: "Store ID not found!",
        internalError: "Internal error while updating event calendar.",
      };
  }
};

export const translateEvenCalendarDelete = (language: string) => {
  switch (language) {
    case "vi":
      return {
        userIdNotFound: "Không tìm thấy user id!",
        permissionDenied: "Bạn không có quyền xóa điểm danh!",
        eventIdRequired: "Event id là bắt buộc!",
        storeIdRequired: "Yêu cầu có id cửa hàng!",
        storeIdNotFound: "Không tìm thấy store id!",
        internalError: "Lỗi hệ thống khi xóa lịch sự kiện.",
      };
    case "en":
      return {
        userIdNotFound: "User ID not found!",
        permissionDenied: "You do not have permission to delete attendance!",
        eventIdRequired: "Event ID is required!",
        storeIdRequired: "Store ID is required!",
        storeIdNotFound: "Store ID not found!",
        internalError: "Internal error while deleting event calendar.",
      };
    case "zh":
      return {
        userIdNotFound: "未找到用户ID！",
        permissionDenied: "您没有权限删除考勤！",
        eventIdRequired: "事件ID是必需的！",
        storeIdRequired: "商店ID是必需的！",
        storeIdNotFound: "未找到商店ID！",
        internalError: "删除事件日历时发生内部错误。",
      };
    case "fr":
      return {
        userIdNotFound: "ID utilisateur introuvable !",
        permissionDenied:
          "Vous n'avez pas l'autorisation de supprimer la présence !",
        eventIdRequired: "L'ID de l'événement est requis !",
        storeIdRequired: "L'ID du magasin est requis !",
        storeIdNotFound: "ID du magasin introuvable !",
        internalError:
          "Erreur interne lors de la suppression du calendrier des événements.",
      };
    case "ja":
      return {
        userIdNotFound: "ユーザーIDが見つかりません！",
        permissionDenied: "出席を削除する権限がありません！",
        eventIdRequired: "イベントIDは必須です！",
        storeIdRequired: "店舗IDは必須です！",
        storeIdNotFound: "店舗IDが見つかりません！",
        internalError: "イベントカレンダーの削除中に内部エラーが発生しました。",
      };
    default:
      return {
        userIdNotFound: "User ID not found!",
        permissionDenied: "You do not have permission to delete attendance!",
        eventIdRequired: "Event ID is required!",
        storeIdRequired: "Store ID is required!",
        storeIdNotFound: "Store ID not found!",
        internalError: "Internal error while deleting event calendar.",
      };
  }
};

export const translateEventCalendarEndGet = (language: string) => {
  switch (language) {
    case "vi":
      return {
        userIdNotFound: "Không tìm thấy user id!",
        permissionDenied: "Bạn không có quyền xem điểm danh!",
        storeIdRequired: "Yêu cầu có id cửa hàng!",
        storeIdNotFound: "Không tìm thấy store id!",
        dayEnded: "Bạn đã kết thúc ngày hôm nay!",
        attendanceNotFinished: "Điểm danh chưa kết thúc! Hãy quay lại vào lúc",
        noAttendanceFound: "Không có điểm danh nào diễn ra!",
        internalError: "Lỗi hệ thống khi lấy thông tin điểm danh.",
      };
    case "en":
      return {
        userIdNotFound: "User ID not found!",
        permissionDenied: "You do not have permission to view attendance!",
        storeIdRequired: "Store ID is required!",
        storeIdNotFound: "Store ID not found!",
        dayEnded: "You have already ended today!",
        attendanceNotFinished: "Attendance has not ended! Please come back at",
        noAttendanceFound: "No attendance found!",
        internalError: "Internal error while getting event calendar end.",
      };
    case "zh":
      return {
        userIdNotFound: "未找到用户ID！",
        permissionDenied: "您没有权限查看考勤！",
        storeIdRequired: "商店ID是必需的！",
        storeIdNotFound: "未找到商店ID！",
        dayEnded: "今天已经结束！",
        attendanceNotFinished: "考勤尚未结束！请在",
        noAttendanceFound: "没有考勤记录！",
        internalError: "获取事件日历结束时发生内部错误。",
      };
    case "fr":
      return {
        userIdNotFound: "ID utilisateur introuvable !",
        permissionDenied:
          "Vous n'avez pas l'autorisation de voir la présence !",
        storeIdRequired: "L'ID du magasin est requis !",
        storeIdNotFound: "ID du magasin introuvable !",
        dayEnded: "Vous avez déjà terminé aujourd'hui !",
        attendanceNotFinished:
          "La présence n'est pas terminée ! Veuillez revenir à",
        noAttendanceFound: "Aucune présence trouvée !",
        internalError:
          "Erreur interne lors de la récupération du calendrier des événements.",
      };
    case "ja":
      return {
        userIdNotFound: "ユーザーIDが見つかりません！",
        permissionDenied: "出席を表示する権限がありません！",
        storeIdRequired: "店舗IDは必須です！",
        storeIdNotFound: "店舗IDが見つかりません！",
        dayEnded: "今日はすでに終了しています！",
        attendanceNotFinished: "出席はまだ終了していません！",
        noAttendanceFound: "出席記録がありません！",
        internalError: "イベントカレンダー終了時に内部エラーが発生しました。",
      };
    default:
      return {
        userIdNotFound: "User ID not found!",
        permissionDenied: "You do not have permission to view attendance!",
        storeIdRequired: "Store ID is required!",
        storeIdNotFound: "Store ID not found!",
        dayEnded: "You have already ended today!",
        attendanceNotFinished: "Attendance has not ended! Please come back at",
        noAttendanceFound: "No attendance found!",
        internalError: "Internal error while getting event calendar end.",
      };
  }
};

export const translateEventCalendarEndPost = (language: string) => {
  switch (language) {
    case "vi":
      return {
        storeIdRequired: "Yêu cầu có id cửa hàng!",
        userIdNotFound: "Không tìm thấy user id!",
        permissionDenied: "Bạn không có quyền kiểm tra điểm danh!",
        storeIdNotFound: "Không tìm thấy store id!",
        notYourWorkingDay: "Hôm nay không phải lịch làm của bạn!",
        internalError: "Lỗi hệ thống khi tạo eventcalendar.",
      };
    case "en":
      return {
        storeIdRequired: "Store ID is required!",
        userIdNotFound: "User ID not found!",
        permissionDenied: "You do not have permission to check attendance!",
        storeIdNotFound: "Store ID not found!",
        notYourWorkingDay: "Today is not your working day!",
        internalError: "Internal error while posting event calendar.",
      };
    case "zh":
      return {
        storeIdRequired: "商店ID是必需的！",
        userIdNotFound: "未找到用户ID！",
        permissionDenied: "您没有权限检查考勤！",
        storeIdNotFound: "未找到商店ID！",
        notYourWorkingDay: "今天不是您的工作日！",
        internalError: "发布事件日历时发生内部错误。",
      };
    case "fr":
      return {
        storeIdRequired: "L'ID du magasin est requis !",
        userIdNotFound: "ID utilisateur introuvable !",
        permissionDenied:
          "Vous n'avez pas l'autorisation de vérifier la présence !",
        storeIdNotFound: "ID du magasin introuvable !",
        notYourWorkingDay: "Aujourd'hui n'est pas votre jour de travail !",
        internalError:
          "Erreur interne lors de la création du calendrier des événements.",
      };
    case "ja":
      return {
        storeIdRequired: "店舗IDは必須です！",
        userIdNotFound: "ユーザーIDが見つかりません！",
        permissionDenied: "出席を確認する権限がありません！",
        storeIdNotFound: "店舗IDが見つかりません！",
        notYourWorkingDay: "今日はあなたの勤務日ではありません！",
        internalError: "イベントカレンダーの投稿中に内部エラーが発生しました。",
      };
    default:
      return {
        storeIdRequired: "Store ID is required!",
        userIdNotFound: "User ID not found!",
        permissionDenied: "You do not have permission to check attendance!",
        storeIdNotFound: "Store ID not found!",
        notYourWorkingDay: "Today is not your working day!",
        internalError: "Internal error while posting event calendar.",
      };
  }
};

export const translateFavoritePost = (language: string) => {
  switch (language) {
    case "vi":
      return {
        userIdNotFound: "Không tìm thấy user id!",
        permissionDenied: "Bạn không có quyền tạo mới favorite!",
        nameRequired: "Name is required!",
        storeIdRequired: "Store id is required!",
        storeIdNotFound: "Không tìm thấy store id!",
        internalError: "Lỗi nội bộ khi tạo yêu thích.",
        favoriteExists: "Yêu thích đã tồn tại!",
      };
    case "en":
      return {
        userIdNotFound: "User ID not found!",
        permissionDenied: "You do not have permission to create a favorite!",
        nameRequired: "Name is required!",
        storeIdRequired: "Store ID is required!",
        storeIdNotFound: "Store ID not found!",
        internalError: "Internal error while posting favorite.",
        favoriteExists: "Favorite already exists.",
      };
    case "zh":
      return {
        userIdNotFound: "未找到用户ID！",
        permissionDenied: "您没有权限创建收藏！",
        nameRequired: "名称是必需的！",
        storeIdRequired: "商店ID是必需的！",
        storeIdNotFound: "未找到商店ID！",
        internalError: "发布收藏时发生内部错误。",
        favoriteExists: "收藏已存在。",
      };
    case "fr":
      return {
        userIdNotFound: "ID utilisateur introuvable !",
        permissionDenied: "Vous n'avez pas l'autorisation de créer un favori !",
        nameRequired: "Le nom est requis !",
        storeIdRequired: "L'ID du magasin est requis !",
        storeIdNotFound: "ID du magasin introuvable !",
        internalError: "Erreur interne lors de la publication du favori.",
        favoriteExists: "Le favori existe déjà.",
      };
    case "ja":
      return {
        userIdNotFound: "ユーザーIDが見つかりません！",
        permissionDenied: "お気に入りを作成する権限がありません！",
        nameRequired: "名前は必須です！",
        storeIdRequired: "店舗IDは必須です！",
        storeIdNotFound: "店舗IDが見つかりません！",
        internalError: "お気に入りの投稿中に内部エラーが発生しました。",
        favoriteExists: "お気に入りはすでに存在します。",
      };
    default:
      return {
        userIdNotFound: "User ID not found!",
        permissionDenied: "You do not have permission to create a favorite!",
        nameRequired: "Name is required!",
        storeIdRequired: "Store ID is required!",
        storeIdNotFound: "Store ID not found!",
        internalError: "Internal error while posting favorite.",
        favoriteExists: "Favorite already exists.",
      };
  }
};


export const translateFavoriteGet = (language: string) => {
  switch (language) {
    case "vi":
      return {
        storeIdRequired: "Store id is required!",
        userIdNotFound: "Không tìm thấy user id!",
        permissionDenied: "Bạn không có quyền xem favorite!",
        internalError: "Lỗi nội bộ khi lấy bài yêu thích.",
      };
    case "en":
      return {
        storeIdRequired: "Store ID is required!",
        userIdNotFound: "User ID not found!",
        permissionDenied: "You do not have permission to view favorite!",
        internalError: "Internal error while getting favorite.",
      };
    case "zh":
      return {
        storeIdRequired: "商店ID是必需的！",
        userIdNotFound: "未找到用户ID！",
        permissionDenied: "您没有权限查看收藏！",
        internalError: "获取收藏时发生内部错误。",
      };
    case "fr":
      return {
        storeIdRequired: "L'ID du magasin est requis !",
        userIdNotFound: "ID utilisateur introuvable !",
        permissionDenied:
          "Vous n'avez pas l'autorisation de voir les favoris !",
        internalError: "Erreur interne lors de la récupération des favoris.",
      };
    case "ja":
      return {
        storeIdRequired: "店舗IDは必須です！",
        userIdNotFound: "ユーザーIDが見つかりません！",
        permissionDenied: "お気に入りを表示する権限がありません！",
        internalError: "お気に入りの取得中に内部エラーが発生しました。",
      };
    default:
      return {
        storeIdRequired: "Store ID is required!",
        userIdNotFound: "User ID not found!",
        permissionDenied: "You do not have permission to view favorite!",
        internalError: "Internal error while getting favorite.",
      };
  }
};

export const translateFavoriteDelete = (language: string) => {
  switch (language) {
    case "vi":
      return {
        userNotFound: "Không tìm thấy user!",
        permissionDenied: "Bạn không có quyền xóa favorite!",
        idsArrayEmpty: "Mảng IDs không được trống!",
        storeIdNotFound: "Không tìm thấy store id!",
        deleteSuccess: "Xóa thành công!",
        internalError: "Lỗi nội bộ khi xóa bài yêu thích.",
      };
    case "en":
      return {
        userNotFound: "User not found!",
        permissionDenied: "You do not have permission to delete favorite!",
        idsArrayEmpty: "IDs array cannot be empty!",
        storeIdNotFound: "Store ID not found!",
        deleteSuccess: "Successfully deleted!",
        internalError: "Internal error while deleting favorite.",
      };
    case "zh":
      return {
        userNotFound: "未找到用户！",
        permissionDenied: "您没有权限删除收藏！",
        idsArrayEmpty: "IDs数组不能为空！",
        storeIdNotFound: "未找到商店ID！",
        deleteSuccess: "删除成功！",
        internalError: "删除收藏时发生内部错误。",
      };
    case "fr":
      return {
        userNotFound: "Utilisateur non trouvé !",
        permissionDenied:
          "Vous n'avez pas l'autorisation de supprimer le favori !",
        idsArrayEmpty: "Le tableau d'IDs ne peut pas être vide !",
        storeIdNotFound: "ID du magasin introuvable !",
        deleteSuccess: "Suppression réussie !",
        internalError: "Erreur interne lors de la suppression du favori.",
      };
    case "ja":
      return {
        userNotFound: "ユーザーが見つかりません！",
        permissionDenied: "お気に入りを削除する権限がありません！",
        idsArrayEmpty: "IDs配列は空にできません！",
        storeIdNotFound: "店舗IDが見つかりません！",
        deleteSuccess: "削除成功！",
        internalError: "お気に入りの削除中に内部エラーが発生しました。",
      };
    default:
      return {
        userNotFound: "User not found!",
        permissionDenied: "You do not have permission to delete favorite!",
        idsArrayEmpty: "IDs array cannot be empty!",
        storeIdNotFound: "Store ID not found!",
        deleteSuccess: "Successfully deleted!",
        internalError: "Internal error while deleting favorite.",
      };
  }
};

export const translateFavoriteIdGet = (language: string) => {
  switch (language) {
    case "vi":
      return {
        favoriteIdRequired: "Favorite id là bắt buộc!",
        userIdNotFound: "Không tìm thấy user id!",
        permissionDenied: "Bạn không có quyền xem favorite!",
        internalError: "Lỗi nội bộ khi lấy danh sách yêu thích.",
      };
    case "en":
      return {
        favoriteIdRequired: "Favorite id is required!",
        userIdNotFound: "User id not found!",
        permissionDenied: "You do not have permission to view favorite!",
        internalError: "Internal error while getting favorite.",
      };
    case "zh":
      return {
        favoriteIdRequired: "收藏夹ID是必填项！",
        userIdNotFound: "未找到用户ID！",
        permissionDenied: "您没有权限查看收藏！",
        internalError: "获取收藏时发生内部错误。",
      };
    case "fr":
      return {
        favoriteIdRequired: "L'ID du favori est requis !",
        userIdNotFound: "ID utilisateur introuvable !",
        permissionDenied:
          "Vous n'avez pas l'autorisation de voir les favoris !",
        internalError: "Erreur interne lors de la récupération des favoris.",
      };
    case "ja":
      return {
        favoriteIdRequired: "お気に入りIDは必須です！",
        userIdNotFound: "ユーザーIDが見つかりません！",
        permissionDenied: "お気に入りを表示する権限がありません！",
        internalError: "お気に入りの取得中に内部エラーが発生しました。",
      };
    default:
      return {
        favoriteIdRequired: "Favorite id is required!",
        userIdNotFound: "User id not found!",
        permissionDenied: "You do not have permission to view favorite!",
        internalError: "Internal error while getting favorite.",
      };
  }
};

export const translateFavoriteIdDelete = (language: string) => {
  switch (language) {
    case "vi":
      return {
        userIdNotFound: "Không tìm thấy user id!",
        permissionDenied: "Bạn không có quyền xóa favorite!",
        favoriteIdRequired: "Favorite id là bắt buộc!",
        storeIdNotFound: "Không tìm thấy store id!",
        internalError: "Lỗi nội bộ khi xóa danh sách yêu thích.",
      };
    case "en":
      return {
        userIdNotFound: "User id not found!",
        permissionDenied: "You do not have permission to delete favorite!",
        favoriteIdRequired: "Favorite id is required!",
        storeIdNotFound: "Store id not found!",
        internalError: "Internal error while deleting favorite.",
      };
    case "zh":
      return {
        userIdNotFound: "未找到用户ID！",
        permissionDenied: "您没有权限删除收藏！",
        favoriteIdRequired: "收藏夹ID是必填项！",
        storeIdNotFound: "未找到商店ID！",
        internalError: "删除收藏时发生内部错误。",
      };
    case "fr":
      return {
        userIdNotFound: "ID utilisateur introuvable !",
        permissionDenied:
          "Vous n'avez pas l'autorisation de supprimer le favori !",
        favoriteIdRequired: "L'ID du favori est requis !",
        storeIdNotFound: "ID du magasin introuvable !",
        internalError: "Erreur interne lors de la suppression du favori.",
      };
    case "ja":
      return {
        userIdNotFound: "ユーザーIDが見つかりません！",
        permissionDenied: "お気に入りを削除する権限がありません！",
        favoriteIdRequired: "お気に入りIDは必須です！",
        storeIdNotFound: "店舗IDが見つかりません！",
        internalError: "お気に入りの削除中に内部エラーが発生しました。",
      };
    default:
      return {
        userIdNotFound: "User id not found!",
        permissionDenied: "You do not have permission to delete favorite!",
        favoriteIdRequired: "Favorite id is required!",
        storeIdNotFound: "Store id not found!",
        internalError: "Internal error while deleting favorite.",
      };
  }
};

export const translateFavoritePatch = (language: string) => {
  switch (language) {
    case "vi":
      return {
        userIdNotFound: "Không tìm thấy user id!",
        permissionDenied: "Bạn không có quyền cập nhật favorite!",
        nameRequired: "Name là bắt buộc!",
        favoriteIdRequired: "Favorite id là bắt buộc!",
        storeIdNotFound: "Không tìm thấy store id!",
        internalError: "Lỗi nội bộ khi cập nhật danh sách yêu thích.",
        favoriteExists: "Yêu thích đã tồn tại!",
        favoriteNotFound: "Không tìm thấy yêu thích!",
      };
    case "en":
      return {
        userIdNotFound: "User id not found!",
        permissionDenied: "You do not have permission to update favorite!",
        nameRequired: "Name is required!",
        favoriteIdRequired: "Favorite id is required!",
        storeIdNotFound: "Store id not found!",
        internalError: "Internal error while updating favorite.",
        favoriteExists: "Favorite already exists.",
        favoriteNotFound: "Favorite not found!",
      };
    case "zh":
      return {
        userIdNotFound: "未找到用户ID！",
        permissionDenied: "您没有权限更新收藏！",
        nameRequired: "名称是必填项！",
        favoriteIdRequired: "收藏夹ID是必填项！",
        storeIdNotFound: "未找到商店ID！",
        internalError: "更新收藏时发生内部错误。",
        favoriteExists: "收藏已存在。",
        favoriteNotFound: "未找到收藏！",
      };
    case "fr":
      return {
        userIdNotFound: "ID utilisateur introuvable !",
        permissionDenied:
          "Vous n'avez pas l'autorisation de mettre à jour le favori !",
        nameRequired: "Le nom est requis !",
        favoriteIdRequired: "L'ID du favori est requis !",
        storeIdNotFound: "ID du magasin introuvable !",
        internalError: "Erreur interne lors de la mise à jour du favori.",
        favoriteExists: "Le favori existe déjà.",
        favoriteNotFound: "Favori introuvable !",
      };
    case "ja":
      return {
        userIdNotFound: "ユーザーIDが見つかりません！",
        permissionDenied: "お気に入りを更新する権限がありません！",
        nameRequired: "名前は必須です！",
        favoriteIdRequired: "お気に入りIDは必須です！",
        storeIdNotFound: "店舗IDが見つかりません！",
        internalError: "お気に入りの更新中に内部エラーが発生しました。",
        favoriteExists: "お気に入りはすでに存在します。",
        favoriteNotFound: "お気に入りが見つかりません！",
      };
    default:
      return {
        userIdNotFound: "User id not found!",
        permissionDenied: "You do not have permission to update favorite!",
        nameRequired: "Name is required!",
        favoriteIdRequired: "Favorite id is required!",
        storeIdNotFound: "Store id not found!",
        internalError: "Internal error while updating favorite.",
        favoriteExists: "Favorite already exists.",
        favoriteNotFound: "Favorite not found!",
      };
  }
};

export const translateFeedbackPost = (language: string) => {
  switch (language) {
    case "vi":
      return {
        userIdRequired: "userId là bắt buộc",
        emotionRequired: "Emotion là bắt buộc",
        categoryRequired: "Category là bắt buộc",
        contentRequired: "Content là bắt buộc",
        feedbackLimit:
          "Bạn đã phản hồi hay quay lại sau 1 ngày để phản hồi khác!",
        internalError: "Lỗi nội bộ khi lấy phản hồi.",
      };
    case "en":
      return {
        userIdRequired: "userId is required",
        emotionRequired: "Emotion is required",
        categoryRequired: "Category is required",
        contentRequired: "Content is required",
        feedbackLimit:
          "You have already responded, please come back after 1 day to provide another feedback!",
        internalError: "Internal error while getting feedback.",
      };
    case "zh":
      return {
        userIdRequired: "用户ID是必填项",
        emotionRequired: "情感是必填项",
        categoryRequired: "类别是必填项",
        contentRequired: "内容是必填项",
        feedbackLimit: "您已经反馈过了，请等一天后再进行反馈！",
        internalError: "获取反馈时发生内部错误。",
      };
    case "fr":
      return {
        userIdRequired: "L'ID utilisateur est requis",
        emotionRequired: "L'émotion est requise",
        categoryRequired: "La catégorie est requise",
        contentRequired: "Le contenu est requis",
        feedbackLimit:
          "Vous avez déjà répondu, veuillez revenir après 1 jour pour donner un autre avis !",
        internalError:
          "Erreur interne lors de la récupération des commentaires.",
      };
    case "ja":
      return {
        userIdRequired: "ユーザーIDは必須です",
        emotionRequired: "感情は必須です",
        categoryRequired: "カテゴリは必須です",
        contentRequired: "コンテンツは必須です",
        feedbackLimit:
          "すでにフィードバックを送信しました。1日後に再度フィードバックを送信してください！",
        internalError: "フィードバックの取得中に内部エラーが発生しました。",
      };
    default:
      return {
        userIdRequired: "userId is required",
        emotionRequired: "Emotion is required",
        categoryRequired: "Category is required",
        contentRequired: "Content is required",
        feedbackLimit:
          "You have already responded, please come back after 1 day to provide another feedback!",
        internalError: "Internal error while getting feedback.",
      };
  }
};

export const translateFeedbackGet = (language: string) => {
  switch (language) {
    case "vi":
      return "Lỗi hệ thống khi lấy phản hồi.";
    case "en":
      return "Internal error while getting feedback.";
    case "zh":
      return "获取反馈时发生内部错误。";
    case "fr":
      return "Erreur interne lors de la récupération des commentaires.";
    case "ja":
      return "フィードバックの取得中に内部エラーが発生しました。";
    default:
      return "Internal error while getting feedback.";
  }
};

export const translateFeedbackDelete = (language: string) => {
  switch (language) {
    case "vi":
      return {
        userNotFound: "Không tìm thấy user!",
        permissionDenied: "Bạn không có quyền xóa phản hồi!",
        emptyIdsArray: "Mảng IDs không được trống!",
        feedbackIdNotFound: "Không tìm thấy feedback id!",
        deleteSuccess: "Xóa thành công!",
        internalError: "Lỗi hệ thống khi xóa phản hồi.",
      };
    case "en":
      return {
        userNotFound: "User not found!",
        permissionDenied: "You do not have permission to delete the feedback!",
        emptyIdsArray: "IDs array cannot be empty!",
        feedbackIdNotFound: "Feedback ID not found!",
        deleteSuccess: "Successfully deleted!",
        internalError: "Internal error while deleting the feedback.",
      };
    case "zh":
      return {
        userNotFound: "未找到用户！",
        permissionDenied: "您没有权限删除反馈！",
        emptyIdsArray: "ID数组不能为空！",
        feedbackIdNotFound: "未找到反馈ID！",
        deleteSuccess: "删除成功！",
        internalError: "删除反馈时发生内部错误。",
      };
    case "fr":
      return {
        userNotFound: "Utilisateur introuvable !",
        permissionDenied:
          "Vous n'avez pas l'autorisation de supprimer le retour d'information !",
        emptyIdsArray: "Le tableau des ID ne peut pas être vide !",
        feedbackIdNotFound: "ID du retour d'information introuvable !",
        deleteSuccess: "Supprimé avec succès !",
        internalError:
          "Erreur interne lors de la suppression du retour d'information.",
      };
    case "ja":
      return {
        userNotFound: "ユーザーが見つかりません！",
        permissionDenied: "フィードバックを削除する権限がありません！",
        emptyIdsArray: "ID配列は空にできません！",
        feedbackIdNotFound: "フィードバックIDが見つかりません！",
        deleteSuccess: "削除に成功しました！",
        internalError: "フィードバックの削除中に内部エラーが発生しました。",
      };
    default:
      return {
        userNotFound: "User not found!",
        permissionDenied: "You do not have permission to delete the feedback!",
        emptyIdsArray: "IDs array cannot be empty!",
        feedbackIdNotFound: "Feedback ID not found!",
        deleteSuccess: "Successfully deleted!",
        internalError: "Internal error while deleting the feedback.",
      };
  }
};

export const translateFeedbackIdDelete = (language: string) => {
  switch (language) {
    case "vi":
      return {
        userIdNotFound: "Không tìm thấy user id!",
        permissionDenied: "Bạn không có quyền xóa feedBack!",
        feedbackIdRequired: "feedback id là bắt buộc!",
        storeIdNotFound: "Không tìm thấy store id!",
        internalError: "Lỗi hệ thống khi xóa feedback.",
      };
    case "en":
      return {
        userIdNotFound: "User ID not found!",
        permissionDenied: "You do not have permission to delete the feedback!",
        feedbackIdRequired: "Feedback ID is required!",
        storeIdNotFound: "Store ID not found!",
        internalError: "Internal error while deleting the feedback.",
      };
    case "zh":
      return {
        userIdNotFound: "未找到用户ID！",
        permissionDenied: "您没有权限删除反馈！",
        feedbackIdRequired: "反馈ID是必填项！",
        storeIdNotFound: "未找到商店ID！",
        internalError: "删除反馈时发生内部错误。",
      };
    case "fr":
      return {
        userIdNotFound: "ID utilisateur introuvable !",
        permissionDenied:
          "Vous n'avez pas l'autorisation de supprimer le retour d'information !",
        feedbackIdRequired: "L'ID du retour d'information est requis !",
        storeIdNotFound: "ID du magasin introuvable !",
        internalError:
          "Erreur interne lors de la suppression du retour d'information.",
      };
    case "ja":
      return {
        userIdNotFound: "ユーザーIDが見つかりません！",
        permissionDenied: "フィードバックを削除する権限がありません！",
        feedbackIdRequired: "フィードバックIDが必須です！",
        storeIdNotFound: "店舗IDが見つかりません！",
        internalError: "フィードバックの削除中に内部エラーが発生しました。",
      };
    default:
      return {
        userIdNotFound: "User ID not found!",
        permissionDenied: "You do not have permission to delete the feedback!",
        feedbackIdRequired: "Feedback ID is required!",
        storeIdNotFound: "Store ID not found!",
        internalError: "Internal error while deleting the feedback.",
      };
  }
};

export const translateOrderGet = (language: string) => {
  switch (language) {
    case "vi":
      return {
        userIdNotFound: "Không tìm thấy user id!",
        internalError: "Lỗi hệ thống khi lấy đơn hàng.",
      };
    case "en":
      return {
        userIdNotFound: "User ID not found!",
        internalError: "Internal error while retrieving the order.",
      };
    case "zh":
      return {
        userIdNotFound: "未找到用户ID！",
        internalError: "获取订单时发生内部错误。",
      };
    case "fr":
      return {
        userIdNotFound: "ID utilisateur introuvable !",
        internalError: "Erreur interne lors de la récupération de la commande.",
      };
    case "ja":
      return {
        userIdNotFound: "ユーザーIDが見つかりません！",
        internalError: "注文を取得中に内部エラーが発生しました。",
      };
    default:
      return {
        userIdNotFound: "User ID not found!",
        internalError: "Internal error while retrieving the order.",
      };
  }
};

export const translateCategoryGetAll = (language: string) => {
  switch (language) {
    case "vi":
      return {
        internalError: "Lỗi hệ thống khi lấy danh mục.",
      };
    case "en":
      return {
        internalError: "Internal error while retrieving all categories.",
      };
    case "zh":
      return {
        internalError: "获取所有类别时发生内部错误。",
      };
    case "fr":
      return {
        internalError:
          "Erreur interne lors de la récupération de toutes les catégories.",
      };
    case "ja":
      return {
        internalError: "すべてのカテゴリを取得中に内部エラーが発生しました。",
      };
    default:
      return {
        internalError: "Internal error while retrieving all categories.",
      };
  }
};

export const translateProductGetAll = (language: string) => {
  switch (language) {
    case "vi":
      return {
        internalError: "Lỗi hệ thống khi lấy danh sách sản phẩm.",
      };
    case "en":
      return {
        internalError: "Internal error while retrieving all products.",
      };
    case "zh":
      return {
        internalError: "获取所有产品时发生内部错误。",
      };
    case "fr":
      return {
        internalError:
          "Erreur interne lors de la récupération de tous les produits.",
      };
    case "ja":
      return {
        internalError: "すべての製品を取得中に内部エラーが発生しました。",
      };
    default:
      return {
        internalError: "Internal error while retrieving all products.",
      };
  }
};

export const translateGetProductNotQuery = (language: string) => {
  switch (language) {
    case "vi":
      return {
        storeIdRequired: "Yêu cầu có id cửa hàng!",
        internalError:
          "Lỗi hệ thống khi lấy tất cả sản phẩm mà không có truy vấn.",
      };
    case "en":
      return {
        storeIdRequired: "Store id is required!",
        internalError: "Internal error get all products without query.",
      };
    case "zh":
      return {
        storeIdRequired: "需要商店ID！",
        internalError: "获取所有产品时发生内部错误，未提供查询。",
      };
    case "fr":
      return {
        storeIdRequired: "L'ID du magasin est requis !",
        internalError:
          "Erreur interne lors de la récupération de tous les produits sans requête.",
      };
    case "ja":
      return {
        storeIdRequired: "店舗IDは必須です！",
        internalError: "クエリなしで全製品を取得中に内部エラーが発生しました。",
      };
    default:
      return {
        storeIdRequired: "Store id is required!",
        internalError: "Internal error get all products without query.",
      };
  }
};

export const translateProductNotQueryPatch = (language: string) => {
  switch (language) {
    case "vi":
      return {
        productIdNotFound: "Không tìm thấy id sản phẩm!",
        internalError: "Lỗi hệ thống khi cập nhật sản phẩm.",
      };
    case "en":
      return {
        productIdNotFound: "Product id not found!",
        internalError: "Internal error while patching the product.",
      };
    case "zh":
      return {
        productIdNotFound: "未找到产品ID！",
        internalError: "更新产品时发生内部错误。",
      };
    case "fr":
      return {
        productIdNotFound: "ID du produit introuvable !",
        internalError: "Erreur interne lors de la mise à jour du produit.",
      };
    case "ja":
      return {
        productIdNotFound: "製品IDが見つかりません！",
        internalError: "製品の更新中に内部エラーが発生しました。",
      };
    default:
      return {
        productIdNotFound: "Product id not found!",
        internalError: "Internal error while patching the product.",
      };
  }
};

export const translateImageBillboardGet = (language: string) => {
  switch (language) {
    case "vi":
      return {
        userIdNotFound: "Không tìm thấy user id!",
        permissionDenied: "Bạn không có quyền xem imagebillboard!",
        internalError: "Lỗi hệ thống khi lấy thông tin imagebillboard.",
      };
    case "en":
      return {
        userIdNotFound: "User id not found!",
        permissionDenied:
          "You do not have permission to view the imagebillboard!",
        internalError: "Internal error while getting the imagebillboard.",
      };
    case "zh":
      return {
        userIdNotFound: "未找到用户ID！",
        permissionDenied: "您没有权限查看广告牌图片！",
        internalError: "获取广告牌图片时发生内部错误。",
      };
    case "fr":
      return {
        userIdNotFound: "ID utilisateur introuvable !",
        permissionDenied:
          "Vous n'avez pas l'autorisation de voir l'image du panneau d'affichage !",
        internalError:
          "Erreur interne lors de la récupération de l'image du panneau d'affichage.",
      };
    case "ja":
      return {
        userIdNotFound: "ユーザーIDが見つかりません！",
        permissionDenied: "広告掲示板画像を見る権限がありません！",
        internalError: "広告掲示板画像を取得中に内部エラーが発生しました。",
      };
    default:
      return {
        userIdNotFound: "User id not found!",
        permissionDenied:
          "You do not have permission to view the imagebillboard!",
        internalError: "Internal error while getting the imagebillboard.",
      };
  }
};

export const translateImageBillboardDelete = (language: string) => {
  switch (language) {
    case "vi":
      return {
        userNotFound: "Không tìm thấy user!",
        permissionDenied: "Bạn không có quyền xóa imagebillboard!",
        emptyIdsArray: "Mảng IDs không được trống!",
        deleteSuccess: "Xóa thành công!",
        internalError: "Lỗi hệ thống khi xóa imagebillboards.",
      };
    case "en":
      return {
        userNotFound: "User not found!",
        permissionDenied:
          "You do not have permission to delete the imagebillboard!",
        emptyIdsArray: "IDs array cannot be empty!",
        deleteSuccess: "Deleted successfully!",
        internalError: "Internal error while deleting imagebillboards.",
      };
    case "zh":
      return {
        userNotFound: "未找到用户！",
        permissionDenied: "您没有权限删除广告牌图片！",
        emptyIdsArray: "IDs 数组不能为空！",
        deleteSuccess: "删除成功！",
        internalError: "删除广告牌图片时发生内部错误。",
      };
    case "fr":
      return {
        userNotFound: "Utilisateur introuvable !",
        permissionDenied:
          "Vous n'avez pas l'autorisation de supprimer l'image du panneau d'affichage !",
        emptyIdsArray: "Le tableau des IDs ne peut pas être vide !",
        deleteSuccess: "Supprimé avec succès !",
        internalError:
          "Erreur interne lors de la suppression des images du panneau d'affichage.",
      };
    case "ja":
      return {
        userNotFound: "ユーザーが見つかりません！",
        permissionDenied: "広告掲示板画像を削除する権限がありません！",
        emptyIdsArray: "IDs 配列は空にできません！",
        deleteSuccess: "削除に成功しました！",
        internalError: "広告掲示板画像の削除中に内部エラーが発生しました。",
      };
    default:
      return {
        userNotFound: "User not found!",
        permissionDenied:
          "You do not have permission to delete the imagebillboard!",
        emptyIdsArray: "IDs array cannot be empty!",
        deleteSuccess: "Deleted successfully!",
        internalError: "Internal error while deleting imagebillboards.",
      };
  }
};

export const translateImageBillboardIdGet = (language: string) => {
  switch (language) {
    case "vi":
      return {
        imageBillboardIdRequired: "ImageBillboard là bắt buộc!",
        userIdNotFound: "Không tìm thấy user id!",
        permissionDenied: "Bạn không có quyền xem imagebillboard!",
        internalError: "Lỗi hệ thống khi lấy Imagebillboard.",
      };
    case "en":
      return {
        imageBillboardIdRequired: "ImageBillboard id is required!",
        userIdNotFound: "User id not found!",
        permissionDenied:
          "You do not have permission to view the imagebillboard!",
        internalError: "Internal error while getting the imagebillboard.",
      };
    case "zh":
      return {
        imageBillboardIdRequired: "ImageBillboard id 是必需的！",
        userIdNotFound: "未找到用户 id！",
        permissionDenied: "您没有权限查看广告牌图片！",
        internalError: "获取广告牌图片时发生内部错误。",
      };
    case "fr":
      return {
        imageBillboardIdRequired: "L'ID du panneau d'affichage est requis !",
        userIdNotFound: "ID utilisateur introuvable !",
        permissionDenied:
          "Vous n'avez pas l'autorisation de voir l'image du panneau d'affichage !",
        internalError:
          "Erreur interne lors de la récupération du panneau d'affichage.",
      };
    case "ja":
      return {
        imageBillboardIdRequired: "ImageBillboard id は必須です！",
        userIdNotFound: "ユーザー ID が見つかりません！",
        permissionDenied: "広告掲示板画像を表示する権限がありません！",
        internalError: "広告掲示板画像を取得中に内部エラーが発生しました。",
      };
    default:
      return {
        imageBillboardIdRequired: "ImageBillboard id is required!",
        userIdNotFound: "User id not found!",
        permissionDenied:
          "You do not have permission to view the imagebillboard!",
        internalError: "Internal error while getting the imagebillboard.",
      };
  }
};

export const translateImageBillboardIdDelete = (language: string) => {
  switch (language) {
    case "vi":
      return {
        userNotFound: "Không tìm thấy user!",
        permissionDenied: "Bạn không có quyền xóa imagebillboard!",
        imageBillboardIdRequired: "ImageBillboard là bắt buộc!",
        imageBillboardIdNotFound:
          "Không tìm thấy ImageBillboard id trong bảng!",
        internalError: "Lỗi hệ thống khi xóa billboard.",
      };
    case "en":
      return {
        userNotFound: "User not found!",
        permissionDenied:
          "You do not have permission to delete imagebillboard!",
        imageBillboardIdRequired: "ImageBillboard id is required!",
        imageBillboardIdNotFound:
          "ImageBillboard id not found in either table!",
        internalError: "Internal error while deleting the billboard.",
      };
    case "zh":
      return {
        userNotFound: "未找到用户！",
        permissionDenied: "您没有权限删除广告牌图片！",
        imageBillboardIdRequired: "ImageBillboard id 是必需的！",
        imageBillboardIdNotFound: "在任何表格中都找不到 ImageBillboard id！",
        internalError: "删除广告牌时发生内部错误。",
      };
    case "fr":
      return {
        userNotFound: "Utilisateur non trouvé !",
        permissionDenied:
          "Vous n'avez pas l'autorisation de supprimer l'image du panneau d'affichage !",
        imageBillboardIdRequired: "L'ID du panneau d'affichage est requis !",
        imageBillboardIdNotFound:
          "L'ID du panneau d'affichage n'a pas été trouvé dans aucune des tables !",
        internalError:
          "Erreur interne lors de la suppression du panneau d'affichage.",
      };
    case "ja":
      return {
        userNotFound: "ユーザーが見つかりません！",
        permissionDenied: "広告掲示板画像を削除する権限がありません！",
        imageBillboardIdRequired: "ImageBillboard id は必須です！",
        imageBillboardIdNotFound:
          "どちらのテーブルにも ImageBillboard id が見つかりません！",
        internalError: "広告掲示板を削除中に内部エラーが発生しました。",
      };
    default:
      return {
        userNotFound: "User not found!",
        permissionDenied:
          "You do not have permission to delete imagebillboard!",
        imageBillboardIdRequired: "ImageBillboard id is required!",
        imageBillboardIdNotFound:
          "ImageBillboard id not found in either table!",
        internalError: "Internal error while deleting the billboard.",
      };
  }
};

export const translateImageBillboardIdPatch = (language: string) => {
  switch (language) {
    case "vi":
      return {
        userIdNotFound: "Không tìm thấy user id!",
        permissionDenied: "Bạn không có quyền cập nhật imagebillboard!",
        labelRequired: "Label là bắt buộc!",
        descriptionRequired: "Description là bắt buộc!",
        imagesRequired: "Images billboard là bắt buộc!",
        linkRequired: "Link là bắt buộc!",
        billboardIdRequired: "Billboard id là bắt buộc!",
        billboardNotFound: "Không tìm thấy billboard!",
        labelExists: "Label đã tồn tại!",
        internalError: "Lỗi hệ thống khi cập nhật imagebillboard.",
      };
    case "en":
      return {
        userIdNotFound: "User id not found!",
        permissionDenied:
          "You do not have permission to update imagebillboard!",
        labelRequired: "Label is required!",
        descriptionRequired: "Description is required!",
        imagesRequired: "Images billboard is required!",
        linkRequired: "Link is required!",
        billboardIdRequired: "Billboard id is required!",
        billboardNotFound: "Billboard not found!",
        labelExists: "Label already exists.",
        internalError: "Internal error while updating imagebillboard.",
      };
    case "zh":
      return {
        userIdNotFound: "未找到用户 id！",
        permissionDenied: "您没有权限更新广告牌图片！",
        labelRequired: "Label 是必需的！",
        descriptionRequired: "Description 是必需的！",
        imagesRequired: "广告牌图片是必需的！",
        linkRequired: "Link 是必需的！",
        billboardIdRequired: "Billboard id 是必需的！",
        billboardNotFound: "未找到广告牌！",
        labelExists: "Label 已经存在。",
        internalError: "更新广告牌图片时发生内部错误。",
      };
    case "fr":
      return {
        userIdNotFound: "ID utilisateur introuvable !",
        permissionDenied:
          "Vous n'avez pas l'autorisation de mettre à jour l'image du panneau d'affichage !",
        labelRequired: "Le label est requis !",
        descriptionRequired: "La description est requise !",
        imagesRequired: "Les images du panneau d'affichage sont requises !",
        linkRequired: "Le lien est requis !",
        billboardIdRequired: "L'ID du panneau d'affichage est requis !",
        billboardNotFound: "Panneau d'affichage introuvable !",
        labelExists: "Le label existe déjà.",
        internalError:
          "Erreur interne lors de la mise à jour de l'image du panneau d'affichage.",
      };
    case "ja":
      return {
        userIdNotFound: "ユーザー ID が見つかりません！",
        permissionDenied: "広告掲示板画像を更新する権限がありません！",
        labelRequired: "ラベルは必須です！",
        descriptionRequired: "説明は必須です！",
        imagesRequired: "広告掲示板画像は必須です！",
        linkRequired: "リンクは必須です！",
        billboardIdRequired: "広告掲示板 ID は必須です！",
        billboardNotFound: "広告掲示板が見つかりません！",
        labelExists: "ラベルは既に存在します。",
        internalError: "広告掲示板画像を更新中に内部エラーが発生しました。",
      };
    default:
      return {
        userIdNotFound: "User id not found!",
        permissionDenied:
          "You do not have permission to update imagebillboard!",
        labelRequired: "Label is required!",
        descriptionRequired: "Description is required!",
        imagesRequired: "Images billboard is required!",
        linkRequired: "Link is required!",
        billboardIdRequired: "Billboard id is required!",
        billboardNotFound: "Billboard not found!",
        labelExists: "Label already exists.",
        internalError: "Internal error while updating imagebillboard.",
      };
  }
};


export const translateManageStaffGet = (language: string) => {
  switch (language) {
    case "vi":
      return {
        userIdNotFound: "Không tìm thấy user id!",
        permissionDenied: "Bạn không có quyền xem Manage Staff!",
        internalError: "Lỗi hệ thống khi lấy thông tin Manage Staff.",
      };
    case "en":
      return {
        userIdNotFound: "User id not found!",
        permissionDenied: "You do not have permission to view Manage Staff!",
        internalError: "Internal error while getting Manage Staff.",
      };
    case "zh":
      return {
        userIdNotFound: "未找到用户 ID！",
        permissionDenied: "您没有权限查看 Manage Staff！",
        internalError: "获取 Manage Staff 时发生系统错误。",
      };
    case "fr":
      return {
        userIdNotFound: "ID utilisateur introuvable !",
        permissionDenied:
          "Vous n'avez pas l'autorisation de voir Manage Staff !",
        internalError:
          "Erreur interne lors de la récupération de Manage Staff.",
      };
    case "ja":
      return {
        userIdNotFound: "ユーザー ID が見つかりません！",
        permissionDenied: "Manage Staff を表示する権限がありません！",
        internalError: "Manage Staff を取得中にシステムエラーが発生しました。",
      };
    default:
      return {
        userIdNotFound: "User id not found!",
        permissionDenied: "You do not have permission to view Manage Staff!",
        internalError: "Internal error while getting Manage Staff.",
      };
  }
};

export const translateManageStaffPatch = (language: string) => {
  switch (language) {
    case "vi":
      return {
        userIdNotFound: "Không tìm thấy user id!",
        permissionDenied: "Bạn không có quyền xem Manage Staff!",
        internalError: "Lỗi hệ thống khi lấy thông tin Manage Staff.",
      };
    case "en":
      return {
        userIdNotFound: "User id not found!",
        permissionDenied: "You do not have permission to view Manage Staff!",
        internalError: "Internal error while getting Manage Staff.",
      };
    case "zh":
      return {
        userIdNotFound: "未找到用户 ID！",
        permissionDenied: "您没有权限查看 Manage Staff！",
        internalError: "获取 Manage Staff 时发生系统错误。",
      };
    case "fr":
      return {
        userIdNotFound: "ID utilisateur introuvable !",
        permissionDenied:
          "Vous n'avez pas l'autorisation de voir Manage Staff !",
        internalError:
          "Erreur interne lors de la récupération de Manage Staff.",
      };
    case "ja":
      return {
        userIdNotFound: "ユーザー ID が見つかりません！",
        permissionDenied: "Manage Staff を表示する権限がありません！",
        internalError: "Manage Staff を取得中にシステムエラーが発生しました。",
      };
    default:
      return {
        userIdNotFound: "User id not found!",
        permissionDenied: "You do not have permission to view Manage Staff!",
        internalError: "Internal error while getting Manage Staff.",
      };
  }
};

export const translateManageStaffPost = (language: string) => {
  switch (language) {
    case "vi":
      return {
        userIdNotFound: "Không tìm thấy user id!",
        permissionDenied: "Bạn không có quyền tạo mới Manage Staff!",
        internalError: "Lỗi hệ thống khi tạo mới Manage Staff.",
      };
    case "en":
      return {
        userIdNotFound: "User id not found!",
        permissionDenied: "You do not have permission to create Manage Staff!",
        internalError: "Internal error while creating Manage Staff.",
      };
    case "zh":
      return {
        userIdNotFound: "未找到用户 ID！",
        permissionDenied: "您没有权限创建 Manage Staff！",
        internalError: "创建 Manage Staff 时发生系统错误。",
      };
    case "fr":
      return {
        userIdNotFound: "ID utilisateur introuvable !",
        permissionDenied:
          "Vous n'avez pas l'autorisation de créer Manage Staff !",
        internalError: "Erreur interne lors de la création de Manage Staff.",
      };
    case "ja":
      return {
        userIdNotFound: "ユーザー ID が見つかりません！",
        permissionDenied: "Manage Staff を作成する権限がありません！",
        internalError: "Manage Staff を作成中にシステムエラーが発生しました。",
      };
    default:
      return {
        userIdNotFound: "User id not found!",
        permissionDenied: "You do not have permission to create Manage Staff!",
        internalError: "Internal error while creating Manage Staff.",
      };
  }
};

export const translateManageStaffIdGet = (language: string) => {
  switch (language) {
    case "vi":
      return {
        manageStaffIdRequired: "Managestaff id là bắt buộc!",
        userIdNotFound: "Không tìm thấy user id!",
        permissionDenied: "Bạn không có quyền xem Manage Staff!",
        internalError: "Lỗi hệ thống khi lấy thông tin Manage Staff.",
      };
    case "en":
      return {
        manageStaffIdRequired: "Managestaff id is required!",
        userIdNotFound: "User id not found!",
        permissionDenied: "You do not have permission to view Manage Staff!",
        internalError: "Internal error while fetching Manage Staff.",
      };
    case "zh":
      return {
        manageStaffIdRequired: "Managestaff id 是必需的！",
        userIdNotFound: "未找到用户 ID！",
        permissionDenied: "您没有权限查看 Manage Staff！",
        internalError: "获取 Manage Staff 时发生系统错误。",
      };
    case "fr":
      return {
        manageStaffIdRequired: "L'ID du Manage Staff est requis !",
        userIdNotFound: "ID utilisateur introuvable !",
        permissionDenied:
          "Vous n'avez pas l'autorisation de consulter Manage Staff !",
        internalError:
          "Erreur interne lors de la récupération de Manage Staff.",
      };
    case "ja":
      return {
        manageStaffIdRequired: "ManageStaff ID は必須です！",
        userIdNotFound: "ユーザー ID が見つかりません！",
        permissionDenied: "Manage Staff を表示する権限がありません！",
        internalError: "Manage Staff の取得中にシステムエラーが発生しました。",
      };
    default:
      return {
        manageStaffIdRequired: "Managestaff id is required!",
        userIdNotFound: "User id not found!",
        permissionDenied: "You do not have permission to view Manage Staff!",
        internalError: "Internal error while fetching Manage Staff.",
      };
  }
};

export const translateManageStaffIdDelete = (language: string) => {
  switch (language) {
    case "vi":
      return {
        userIdNotFound: "Không tìm thấy user id!",
        permissionDenied: "Bạn không có quyền xóa Manage Staff!",
        manageStaffIdRequired: "Managestaff id là bắt buộc!",
        storeIdNotFound: "Không tìm thấy store id!",
        internalError: "Lỗi hệ thống khi xóa Manage Staff.",
      };
    case "en":
      return {
        userIdNotFound: "User id not found!",
        permissionDenied: "You do not have permission to delete Manage Staff!",
        manageStaffIdRequired: "Managestaff id is required!",
        storeIdNotFound: "Store id not found!",
        internalError: "Internal error while deleting Manage Staff.",
      };
    case "zh":
      return {
        userIdNotFound: "未找到用户 ID！",
        permissionDenied: "您没有权限删除 Manage Staff！",
        manageStaffIdRequired: "Managestaff id 是必需的！",
        storeIdNotFound: "未找到 store id！",
        internalError: "删除 Manage Staff 时发生系统错误。",
      };
    case "fr":
      return {
        userIdNotFound: "ID utilisateur introuvable !",
        permissionDenied:
          "Vous n'avez pas l'autorisation de supprimer Manage Staff !",
        manageStaffIdRequired: "L'ID du Manage Staff est requis !",
        storeIdNotFound: "ID du magasin introuvable !",
        internalError: "Erreur interne lors de la suppression de Manage Staff.",
      };
    case "ja":
      return {
        userIdNotFound: "ユーザー ID が見つかりません！",
        permissionDenied: "Manage Staff を削除する権限がありません！",
        manageStaffIdRequired: "ManageStaff ID は必須です！",
        storeIdNotFound: "ストア ID が見つかりません！",
        internalError: "Manage Staff の削除中にシステムエラーが発生しました。",
      };
    default:
      return {
        userIdNotFound: "User id not found!",
        permissionDenied: "You do not have permission to delete Manage Staff!",
        manageStaffIdRequired: "Managestaff id is required!",
        storeIdNotFound: "Store id not found!",
        internalError: "Internal error while deleting Manage Staff.",
      };
  }
};

export const translateManageStaffIdPatch = (language: string) => {
  switch (language) {
    case "vi":
      return {
        userIdNotFound: "Không tìm thấy user id!",
        permissionDenied: "Bạn không có quyền cập nhật Manage Staff!",
        nameRequired: "Name là bắt buộc!",
        cmndRequired: "Số CMND là bắt buộc!",
        placeIssuedRequired: "Nơi cấp là bắt buộc!",
        genderRequired: "Giới tính là bắt buộc!",
        degreeRequired: "Bằng cấp là bắt buộc!",
        phoneRequired: "Số diện thoại là bắt buộc!",
        workingTimeRequired: "Thời gian làm việc là bắt buộc!",
        imageRequired: "Hình ảnh là bắt buộc!",
        choosePositionRequired: "Hãy chọn làm thứ mấy!",
        maritalStatusRequired: "Tình trạng hôn nhân là bắt buộc!",
        manageStaffIdRequired: "Managestaff id là bắt buộc!",
        storeIdNotFound: "Không tìm thấy store id!",
        internalError: "Lỗi hệ thống khi cập nhật Manage Staff.",
      };
    case "en":
      return {
        userIdNotFound: "User id not found!",
        permissionDenied: "You do not have permission to update Manage Staff!",
        nameRequired: "Name is required!",
        cmndRequired: "ID card number is required!",
        placeIssuedRequired: "Place of issue is required!",
        genderRequired: "Gender is required!",
        degreeRequired: "Degree is required!",
        phoneRequired: "Phone number is required!",
        workingTimeRequired: "Working time is required!",
        imageRequired: "Image is required!",
        choosePositionRequired: "Please choose your position!",
        maritalStatusRequired: "Marital status is required!",
        manageStaffIdRequired: "Managestaff id is required!",
        storeIdNotFound: "Store id not found!",
        internalError: "Internal error while updating Manage Staff.",
      };
    case "zh":
      return {
        userIdNotFound: "未找到用户 ID！",
        permissionDenied: "您没有权限更新 Manage Staff！",
        nameRequired: "姓名是必需的！",
        cmndRequired: "身份证号码是必需的！",
        placeIssuedRequired: "发证地是必需的！",
        genderRequired: "性别是必需的！",
        degreeRequired: "学历是必需的！",
        phoneRequired: "电话号码是必需的！",
        workingTimeRequired: "工作时间是必需的！",
        imageRequired: "图像是必需的！",
        choosePositionRequired: "请选择您的职位！",
        maritalStatusRequired: "婚姻状况是必需的！",
        manageStaffIdRequired: "Managestaff id 是必需的！",
        storeIdNotFound: "未找到 store id！",
        internalError: "更新 Manage Staff 时发生系统错误。",
      };
    case "fr":
      return {
        userIdNotFound: "ID utilisateur introuvable !",
        permissionDenied:
          "Vous n'avez pas l'autorisation de mettre à jour Manage Staff !",
        nameRequired: "Le nom est requis !",
        cmndRequired: "Le numéro de carte d'identité est requis !",
        placeIssuedRequired: "Le lieu de délivrance est requis !",
        genderRequired: "Le sexe est requis !",
        degreeRequired: "Le diplôme est requis !",
        phoneRequired: "Le numéro de téléphone est requis !",
        workingTimeRequired: "Le temps de travail est requis !",
        imageRequired: "L'image est requise !",
        choosePositionRequired: "Veuillez choisir votre position !",
        maritalStatusRequired: "L'état civil est requis !",
        manageStaffIdRequired: "L'ID du Manage Staff est requis !",
        storeIdNotFound: "ID du magasin introuvable !",
        internalError: "Erreur interne lors de la mise à jour de Manage Staff.",
      };
    case "ja":
      return {
        userIdNotFound: "ユーザー ID が見つかりません！",
        permissionDenied: "Manage Staff を更新する権限がありません！",
        nameRequired: "名前は必須です！",
        cmndRequired: "身分証番号は必須です！",
        placeIssuedRequired: "発行場所は必須です！",
        genderRequired: "性別は必須です！",
        degreeRequired: "学歴は必須です！",
        phoneRequired: "電話番号は必須です！",
        workingTimeRequired: "勤務時間は必須です！",
        imageRequired: "画像は必須です！",
        choosePositionRequired: "ポジションを選択してください！",
        maritalStatusRequired: "婚姻状況は必須です！",
        manageStaffIdRequired: "ManageStaff ID は必須です！",
        storeIdNotFound: "店舗 ID が見つかりません！",
        internalError: "Manage Staff の更新中にシステムエラーが発生しました。",
      };
    default:
      return {
        userIdNotFound: "User id not found!",
        permissionDenied: "You do not have permission to update Manage Staff!",
        nameRequired: "Name is required!",
        cmndRequired: "ID card number is required!",
        placeIssuedRequired: "Place of issue is required!",
        genderRequired: "Gender is required!",
        degreeRequired: "Degree is required!",
        phoneRequired: "Phone number is required!",
        workingTimeRequired: "Working time is required!",
        imageRequired: "Image is required!",
        choosePositionRequired: "Please choose your position!",
        maritalStatusRequired: "Marital status is required!",
        manageStaffIdRequired: "Managestaff id is required!",
        storeIdNotFound: "Store id not found!",
        internalError: "Internal error while updating Manage Staff.",
      };
  }
};

export const translateOrders = (language: string) => {
  switch (language) {
    case "vi":
      return {
        userIdNotFound: "Không tìm thấy user id!",
        internalError: "Lỗi hệ thống khi cập nhật đơn hàng.",
      };
    case "en":
      return {
        userIdNotFound: "User id not found!",
        internalError: "Internal error while updating the order.",
      };
    case "zh":
      return {
        userIdNotFound: "未找到用户 ID！",
        internalError: "更新订单时发生系统错误。",
      };
    case "fr":
      return {
        userIdNotFound: "ID utilisateur introuvable !",
        internalError: "Erreur interne lors de la mise à jour de la commande.",
      };
    case "ja":
      return {
        userIdNotFound: "ユーザー ID が見つかりません！",
        internalError: "注文の更新中にシステムエラーが発生しました。",
      };
    default:
      return {
        userIdNotFound: "User id not found!",
        internalError: "Internal error while updating the order.",
      };
  }
};

export const translateDeliveryOrder = (language: string) => {
  switch (language) {
    case "vi":
      return {
        userIdNotFound: "Không tìm thấy user id!",
        internalError: "Lỗi hệ thống khi cập nhật đơn hàng giao.",
      };
    case "en":
      return {
        userIdNotFound: "User id not found!",
        internalError: "Internal error while updating the delivery order.",
      };
    case "zh":
      return {
        userIdNotFound: "未找到用户 ID！",
        internalError: "更新配送订单时发生系统错误。",
      };
    case "fr":
      return {
        userIdNotFound: "ID utilisateur introuvable !",
        internalError:
          "Erreur interne lors de la mise à jour de la commande de livraison.",
      };
    case "ja":
      return {
        userIdNotFound: "ユーザー ID が見つかりません！",
        internalError: "配送注文の更新中にシステムエラーが発生しました。",
      };
    default:
      return {
        userIdNotFound: "User id not found!",
        internalError: "Internal error while updating the delivery order.",
      };
  }
};

export const translateDeliveryOrderCancel = (language: string) => {
  switch (language) {
    case "vi":
      return {
        userIdNotFound: "Không tìm thấy user id!",
        cancelContentNotFound: "Không tìm thấy nội dung hủy đơn!",
        internalError: "Lỗi hệ thống khi cập nhật đơn hàng giao.",
      };
    case "en":
      return {
        userIdNotFound: "User id not found!",
        cancelContentNotFound: "Cancellation content not found!",
        internalError: "Internal error while updating the delivery order.",
      };
    case "zh":
      return {
        userIdNotFound: "未找到用户 ID！",
        cancelContentNotFound: "未找到取消内容！",
        internalError: "更新配送订单时发生系统错误。",
      };
    case "fr":
      return {
        userIdNotFound: "ID utilisateur introuvable !",
        cancelContentNotFound: "Contenu d'annulation introuvable !",
        internalError:
          "Erreur interne lors de la mise à jour de la commande de livraison.",
      };
    case "ja":
      return {
        userIdNotFound: "ユーザー ID が見つかりません！",
        cancelContentNotFound: "キャンセル内容が見つかりません！",
        internalError: "配送注文の更新中にシステムエラーが発生しました。",
      };
    default:
      return {
        userIdNotFound: "User id not found!",
        cancelContentNotFound: "Cancellation content not found!",
        internalError: "Internal error while updating the delivery order.",
      };
  }
};

export const translateDeliveryOrderUpdate = (language: string) => {
  switch (language) {
    case "vi":
      return {
        userIdNotFound: "Không tìm thấy user id!",
        addDeliveryImage: "Hãy thêm ảnh đã giao!",
        orderNotFound: "Không tìm thấy đơn hàng!",
        internalError: "Lỗi hệ thống khi cập nhật đơn hàng giao.",
      };
    case "en":
      return {
        userIdNotFound: "User id not found!",
        addDeliveryImage: "Please add the delivery image!",
        orderNotFound: "Order not found!",
        internalError: "Internal error while updating the delivery order.",
      };
    case "zh":
      return {
        userIdNotFound: "未找到用户 ID！",
        addDeliveryImage: "请添加已交付的图片！",
        orderNotFound: "未找到订单！",
        internalError: "更新配送订单时发生系统错误。",
      };
    case "fr":
      return {
        userIdNotFound: "ID utilisateur introuvable !",
        addDeliveryImage: "Veuillez ajouter l'image de la livraison !",
        orderNotFound: "Commande introuvable !",
        internalError:
          "Erreur interne lors de la mise à jour de la commande de livraison.",
      };
    case "ja":
      return {
        userIdNotFound: "ユーザー ID が見つかりません！",
        addDeliveryImage: "配送画像を追加してください！",
        orderNotFound: "注文が見つかりません！",
        internalError: "配送注文の更新中にシステムエラーが発生しました。",
      };
    default:
      return {
        userIdNotFound: "User id not found!",
        addDeliveryImage: "Please add the delivery image!",
        orderNotFound: "Order not found!",
        internalError: "Internal error while updating the delivery order.",
      };
  }
};

export const translateReceiveReturnOrderUpdate = (language: string) => {
  switch (language) {
    case "vi":
      return {
        userIdNotFound: "Không tìm thấy user id!",
        internalError: "Lỗi hệ thống khi cập nhật đơn hàng trả lại.",
      };
    case "en":
      return {
        userIdNotFound: "User id not found!",
        internalError:
          "Internal error while updating the receive return order.",
      };
    case "zh":
      return {
        userIdNotFound: "未找到用户 ID！",
        internalError: "更新退货订单时发生系统错误。",
      };
    case "fr":
      return {
        userIdNotFound: "ID utilisateur introuvable !",
        internalError:
          "Erreur interne lors de la mise à jour de la commande de retour.",
      };
    case "ja":
      return {
        userIdNotFound: "ユーザー ID が見つかりません！",
        internalError: "返品注文の更新中にシステムエラーが発生しました。",
      };
    default:
      return {
        userIdNotFound: "User id not found!",
        internalError:
          "Internal error while updating the receive return order.",
      };
  }
};

export const translateReturnProductReceiveOrderUpdate = (language: string) => {
  switch (language) {
    case "vi":
      return {
        userIdNotFound: "Không tìm thấy user id!",
        internalError: "Lỗi hệ thống khi cập nhật đơn hàng trả lại.",
      };
    case "en":
      return {
        userIdNotFound: "User id not found!",
        internalError:
          "Internal error while updating the receive return order.",
      };
    case "zh":
      return {
        userIdNotFound: "未找到用户 ID！",
        internalError: "更新退货订单时发生系统错误。",
      };
    case "fr":
      return {
        userIdNotFound: "ID utilisateur introuvable !",
        internalError:
          "Erreur interne lors de la mise à jour de la commande de retour.",
      };
    case "ja":
      return {
        userIdNotFound: "ユーザー ID が見つかりません！",
        internalError: "返品注文の更新中にシステムエラーが発生しました。",
      };
    default:
      return {
        userIdNotFound: "User id not found!",
        internalError:
          "Internal error while updating the receive return order.",
      };
  }
};

export const translateReturnedProductReceivedOrderErrors = (
  language: string
) => {
  switch (language) {
    case "vi":
      return {
        userIdNotFound: "Không tìm thấy user id!",
        internalError:
          "Lỗi hệ thống khi cập nhật đơn hàng sản phẩm trả lại đã nhận.",
      };
    case "en":
      return {
        userIdNotFound: "User id not found!",
        internalError:
          "Internal error while updating the returned product received order.",
      };
    case "zh":
      return {
        userIdNotFound: "未找到用户 ID！",
        internalError: "更新已接收退货产品订单时发生系统错误。",
      };
    case "fr":
      return {
        userIdNotFound: "ID utilisateur introuvable !",
        internalError:
          "Erreur interne lors de la mise à jour de la commande de produit retourné reçu.",
      };
    case "ja":
      return {
        userIdNotFound: "ユーザー ID が見つかりません！",
        internalError:
          "返品された受領済み商品の注文の更新中にシステムエラーが発生しました。",
      };
    default:
      return {
        userIdNotFound: "User id not found!",
        internalError:
          "Internal error while updating the returned product received order.",
      };
  }
};

export const translateReturnMoneyFromShipperOrder = (language: string) => {
  switch (language) {
    case "vi":
      return {
        userIdNotFound: "Không tìm thấy user id!",
        internalError:
          "Lỗi hệ thống khi cập nhật đơn hàng trả lại tiền từ Shipper.",
      };
    case "en":
      return {
        userIdNotFound: "User id not found!",
        internalError:
          "Internal error while updating the return money order from Shipper.",
      };
    case "zh":
      return {
        userIdNotFound: "未找到用户 ID！",
        internalError: "更新退还金额订单（来自 Shipper）时发生系统错误。",
      };
    case "fr":
      return {
        userIdNotFound: "ID utilisateur introuvable !",
        internalError:
          "Erreur interne lors de la mise à jour de la commande de remboursement depuis Shipper.",
      };
    case "ja":
      return {
        userIdNotFound: "ユーザー ID が見つかりません！",
        internalError:
          "Shipper からの返金注文の更新中にシステムエラーが発生しました。",
      };
    default:
      return {
        userIdNotFound: "User id not found!",
        internalError:
          "Internal error while updating the return money order from Shipper.",
      };
  }
};

export const translatePickupStore = (language: string) => {
  switch (language) {
    case "vi":
      return {
        userIdNotFound: "Không tìm thấy user id!",
        internalError: "Lỗi hệ thống khi cập nhật lấy tại cửa hàng.",
      };
    case "en":
      return {
        userIdNotFound: "User id not found!",
        internalError: "Internal error while updating pickup at store.",
      };
    case "zh":
      return {
        userIdNotFound: "未找到用户 ID！",
        internalError: "更新取货店铺时发生系统错误。",
      };
    case "fr":
      return {
        userIdNotFound: "ID utilisateur introuvable !",
        internalError:
          "Erreur interne lors de la mise à jour de la collecte au magasin.",
      };
    case "ja":
      return {
        userIdNotFound: "ユーザー ID が見つかりません！",
        internalError:
          "店舗でのピックアップ更新中にシステムエラーが発生しました。",
      };
    default:
      return {
        userIdNotFound: "User id not found!",
        internalError: "Internal error while updating pickup at store.",
      };
  }
};

export const translateOrderPreparation = (language: string) => {
  switch (language) {
    case "vi":
      return {
        userIdNotFound: "Không tìm thấy user id!",
        internalError: "Lỗi hệ thống khi cập nhật đã soạn hàng xong.",
      };
    case "en":
      return {
        userIdNotFound: "User id not found!",
        internalError:
          "Internal error while updating item preparation completion.",
      };
    case "zh":
      return {
        userIdNotFound: "未找到用户 ID！",
        internalError: "更新已完成商品准备时发生系统错误。",
      };
    case "fr":
      return {
        userIdNotFound: "ID utilisateur introuvable !",
        internalError:
          "Erreur interne lors de la mise à jour de la préparation des articles terminée.",
      };
    case "ja":
      return {
        userIdNotFound: "ユーザー ID が見つかりません！",
        internalError: "商品準備完了の更新中にシステムエラーが発生しました。",
      };
    default:
      return {
        userIdNotFound: "User id not found!",
        internalError:
          "Internal error while updating item preparation completion.",
      };
  }
};

export const translateOrderPickupSuccess = (language: string) => {
  switch (language) {
    case "vi":
      return {
        userIdNotFound: "Không tìm thấy user id!",
        orderNotFound: "Không tìm thấy đơn hàng!",
        internalError: "Lỗi hệ thống khi cập nhật lấy tại cửa hàng thành công.",
      };
    case "en":
      return {
        userIdNotFound: "User id not found!",
        orderNotFound: "Order not found!",
        internalError: "Internal error while updating pickup store success.",
      };
    case "zh":
      return {
        userIdNotFound: "未找到用户 ID！",
        orderNotFound: "未找到订单！",
        internalError: "更新取货成功时发生系统错误。",
      };
    case "fr":
      return {
        userIdNotFound: "ID utilisateur introuvable !",
        orderNotFound: "Commande introuvable !",
        internalError:
          "Erreur interne lors de la mise à jour de la réussite de la collecte en magasin.",
      };
    case "ja":
      return {
        userIdNotFound: "ユーザー ID が見つかりません！",
        orderNotFound: "注文が見つかりません！",
        internalError:
          "店舗での受け取り成功の更新中にシステムエラーが発生しました。",
      };
    default:
      return {
        userIdNotFound: "User id not found!",
        orderNotFound: "Order not found!",
        internalError: "Internal error while updating pickup store success.",
      };
  }
};

export const translateProductReceive = (language: string) => {
  switch (language) {
    case "vi":
      return {
        userIdNotFound: "Không tìm thấy user id!",
        internalError: "Lỗi hệ thống khi cập nhật nhận sản phẩm.",
      };
    case "en":
      return {
        userIdNotFound: "User id not found!",
        internalError: "Internal error while updating receive product.",
      };
    case "zh":
      return {
        userIdNotFound: "未找到用户 ID！",
        internalError: "更新接收产品时发生系统错误。",
      };
    case "fr":
      return {
        userIdNotFound: "ID utilisateur introuvable !",
        internalError:
          "Erreur interne lors de la mise à jour de la réception du produit.",
      };
    case "ja":
      return {
        userIdNotFound: "ユーザー ID が見つかりません！",
        internalError: "製品受け取りの更新中にシステムエラーが発生しました。",
      };
    default:
      return {
        userIdNotFound: "User id not found!",
        internalError: "Internal error while updating receive product.",
      };
  }
};

export const translateRedeliveryOrder = (language: string) => {
  switch (language) {
    case "vi":
      return {
        userIdNotFound: "Không tìm thấy user id!",
        internalError: "Lỗi hệ thống khi cập nhật đơn hàng giao lại.",
      };
    case "en":
      return {
        userIdNotFound: "User id not found!",
        internalError: "Internal error while updating redelivery order.",
      };
    case "zh":
      return {
        userIdNotFound: "未找到用户 ID！",
        internalError: "更新重新配送订单时发生系统错误。",
      };
    case "fr":
      return {
        userIdNotFound: "ID utilisateur introuvable !",
        internalError:
          "Erreur interne lors de la mise à jour de la commande de redélivrance.",
      };
    case "ja":
      return {
        userIdNotFound: "ユーザー ID が見つかりません！",
        internalError: "再配送注文の更新中にシステムエラーが発生しました。",
      };
    default:
      return {
        userIdNotFound: "User id not found!",
        internalError: "Internal error while updating redelivery order.",
      };
  }
};

export const translateReturnProduct = (language: string) => {
  switch (language) {
    case "vi":
      return {
        userIdNotFound: "Không tìm thấy user id!",
        addReturnImage: "Hãy thêm ảnh lỗi cần trả hàng!",
        addReturnContent: "Hãy thêm nội dung cần trả hàng!",
        internalError: "Lỗi hệ thống khi cập nhật sản phẩm trả lại.",
      };
    case "en":
      return {
        userIdNotFound: "User id not found!",
        addReturnImage: "Please add the image of the product to be returned!",
        addReturnContent: "Please add the content for the return!",
        internalError: "Internal error while updating returned product.",
      };
    case "zh":
      return {
        userIdNotFound: "未找到用户 ID！",
        addReturnImage: "请添加需要退货的商品图片！",
        addReturnContent: "请添加退货内容！",
        internalError: "更新退货商品时发生系统错误。",
      };
    case "fr":
      return {
        userIdNotFound: "ID utilisateur introuvable !",
        addReturnImage: "Veuillez ajouter l'image du produit à retourner !",
        addReturnContent: "Veuillez ajouter le contenu pour le retour !",
        internalError:
          "Erreur interne lors de la mise à jour du produit retourné.",
      };
    case "ja":
      return {
        userIdNotFound: "ユーザー ID が見つかりません！",
        addReturnImage: "返品する商品画像を追加してください！",
        addReturnContent: "返品内容を追加してください！",
        internalError: "返品商品を更新中にシステムエラーが発生しました。",
      };
    default:
      return {
        userIdNotFound: "User id not found!",
        addReturnImage: "Please add the image of the product to be returned!",
        addReturnContent: "Please add the content for the return!",
        internalError: "Internal error while updating returned product.",
      };
  }
};

export const translateProductPost = (language: string) => {
  switch (language) {
    case "vi":
      return {
        userIdNotFound: "Không tìm thấy user id!",
        permissionDenied: "Bạn không có quyền tạo mới product!",
        nameRequired: "Name is required!",
        headingRequired: "Heading is required!",
        headingExists: "Heading đã tồn tại!",
        descriptionRequired: "Description is required!",
        imagesRequired: "Images is required!",
        productDetailRequired: "ProductDetail is required!",
        imagesAlientFeaturesRequired: "Imagesalientfeatures is required!",
        storeIdRequired: "Store id is required!",
        chooseProductDetail: "Hãy chọn lại ProductDetail!",
        storeIdNotFound: "Không tìm thấy store id!",
        internalError: "Lỗi hệ thống khi tạo mới product",
      };
    case "en":
      return {
        userIdNotFound: "User id not found!",
        permissionDenied: "You don't have permission to create a new product!",
        nameRequired: "Name is required!",
        headingRequired: "Heading is required!",
        headingExists: "Heading already exists!",
        descriptionRequired: "Description is required!",
        imagesRequired: "Images is required!",
        productDetailRequired: "ProductDetail is required!",
        imagesAlientFeaturesRequired: "Imagesalientfeatures is required!",
        storeIdRequired: "Store id is required!",
        chooseProductDetail: "Please choose ProductDetail again!",
        storeIdNotFound: "Store id not found!",
        internalError: "Internal error while creating product",
      };
    case "zh":
      return {
        userIdNotFound: "未找到用户ID！",
        permissionDenied: "您没有权限创建新产品！",
        nameRequired: "名称是必填项！",
        headingRequired: "标题是必填项！",
        headingExists: "标题已存在。",
        descriptionRequired: "描述是必填项！",
        imagesRequired: "图片是必填项！",
        productDetailRequired: "产品详细信息是必填项！",
        imagesAlientFeaturesRequired: "突出特色图片是必填项！",
        storeIdRequired: "商店ID是必填项！",
        chooseProductDetail: "请重新选择产品详细信息！",
        storeIdNotFound: "未找到商店ID！",
        internalError: "创建产品时发生系统错误",
      };
    case "fr":
      return {
        userIdNotFound: "ID utilisateur introuvable !",
        permissionDenied:
          "Vous n'avez pas la permission de créer un nouveau produit !",
        nameRequired: "Le nom est requis !",
        headingRequired: "Le titre est requis !",
        headingExists: "Le titre existe déjà.",
        descriptionRequired: "La description est requise !",
        imagesRequired: "Les images sont requises !",
        productDetailRequired: "Les détails du produit sont requis !",
        imagesAlientFeaturesRequired:
          "Les images des caractéristiques principales sont requises !",
        storeIdRequired: "L'ID du magasin est requis !",
        chooseProductDetail:
          "Veuillez choisir à nouveau les détails du produit !",
        storeIdNotFound: "ID du magasin introuvable !",
        internalError: "Erreur interne lors de la création du produit",
      };
    case "ja":
      return {
        userIdNotFound: "ユーザーIDが見つかりません！",
        permissionDenied: "新しい商品を作成する権限がありません！",
        nameRequired: "名前は必須です！",
        headingRequired: "見出しは必須です！",
        headingExists: "見出しはすでに存在します。",
        descriptionRequired: "説明は必須です！",
        imagesRequired: "画像は必須です！",
        productDetailRequired: "製品の詳細は必須です！",
        imagesAlientFeaturesRequired: "主な特徴の画像は必須です！",
        storeIdRequired: "店舗IDは必須です！",
        chooseProductDetail: "製品の詳細を再選択してください！",
        storeIdNotFound: "店舗IDが見つかりません！",
        internalError: "商品作成中にシステムエラーが発生しました",
      };
    default:
      return {
        userIdNotFound: "User id not found!",
        permissionDenied: "You don't have permission to create a new product!",
        nameRequired: "Name is required!",
        headingRequired: "Heading is required!",
        headingExists: "Heading already exists!",
        descriptionRequired: "Description is required!",
        imagesRequired: "Images is required!",
        productDetailRequired: "ProductDetail is required!",
        imagesAlientFeaturesRequired: "Imagesalientfeatures is required!",
        storeIdRequired: "Store id is required!",
        chooseProductDetail: "Please choose ProductDetail again!",
        storeIdNotFound: "Store id not found!",
        internalError: "Internal error while creating product",
      };
  }
};


export const translateProductGet = (language: string) => {
  switch (language) {
    case "vi":
      return {
        storeIdRequired: "Yêu cầu có id cửa hàng!",
        internalError: "Lỗi hệ thống khi lấy thông tin sản phẩm ",
      };
    case "en":
      return {
        storeIdRequired: "Store id is required!",
        internalError: "Internal error while getting product ",
      };
    case "zh":
      return {
        storeIdRequired: "商店ID是必填项！",
        internalError: "获取产品时发生系统错误 ",
      };
    case "fr":
      return {
        storeIdRequired: "L'ID du magasin est requis !",
        internalError: "Erreur interne lors de la récupération du produit ",
      };
    case "ja":
      return {
        storeIdRequired: "店舗IDは必須です！",
        internalError: "商品取得中にシステムエラーが発生しました ",
      };
    default:
      return {
        storeIdRequired: "Store id is required!",
        internalError: "Internal error while getting product ",
      };
  }
};

export const translateProductDelete = (language: string) => {
  switch (language) {
    case "vi":
      return {
        userNotFound: "Không tìm thấy user!",
        permissionDenied: "Bạn không có quyền xóa sản phẩm!",
        emptyIdsArray: "Mảng IDs không được trống!",
        storeIdNotFound: "Không tìm thấy store id!",
        deleteSuccess: "Xóa thành công!",
        internalError: "Lỗi hệ thống khi xóa sản phẩm ",
      };
    case "en":
      return {
        userNotFound: "User not found!",
        permissionDenied: "You do not have permission to delete product!",
        emptyIdsArray: "IDs array cannot be empty!",
        storeIdNotFound: "Store id not found!",
        deleteSuccess: "Delete successful!",
        internalError: "Internal error while deleting product ",
      };
    case "zh":
      return {
        userNotFound: "找不到用户！",
        permissionDenied: "您没有权限删除产品！",
        emptyIdsArray: "IDs 数组不能为空！",
        storeIdNotFound: "找不到商店ID！",
        deleteSuccess: "删除成功！",
        internalError: "删除产品时发生系统错误 ",
      };
    case "fr":
      return {
        userNotFound: "Utilisateur introuvable !",
        permissionDenied:
          "Vous n'avez pas la permission de supprimer le produit !",
        emptyIdsArray: "Le tableau des IDs ne peut pas être vide !",
        storeIdNotFound: "ID du magasin introuvable !",
        deleteSuccess: "Suppression réussie !",
        internalError: "Erreur interne lors de la suppression du produit ",
      };
    case "ja":
      return {
        userNotFound: "ユーザーが見つかりません！",
        permissionDenied: "製品を削除する権限がありません！",
        emptyIdsArray: "ID 配列は空にできません！",
        storeIdNotFound: "店舗IDが見つかりません！",
        deleteSuccess: "削除に成功しました！",
        internalError: "製品削除中にシステムエラーが発生しました ",
      };
    default:
      return {
        userNotFound: "User not found!",
        permissionDenied: "You do not have permission to delete product!",
        emptyIdsArray: "IDs array cannot be empty!",
        storeIdNotFound: "Store id not found!",
        deleteSuccess: "Delete successful!",
        internalError: "Internal error while deleting product ",
      };
  }
};

export const translateProductIdGet = (language: string) => {
  switch (language) {
    case "vi":
      return {
        productIdRequired: "Product id là bắt buộc!",
        productsNotFound: "Không tìm thấy sản phẩm!",
        internalError: "Lỗi hệ thống khi lấy sản phẩm ",
      };
    case "en":
      return {
        productIdRequired: "Product id is required!",
        productsNotFound: "Products not found!",
        internalError: "Internal error while getting product ",
      };
    case "zh":
      return {
        productIdRequired: "产品ID是必需的！",
        productsNotFound: "未找到产品！",
        internalError: "获取产品时发生系统错误 ",
      };
    case "fr":
      return {
        productIdRequired: "L'ID du produit est requis !",
        productsNotFound: "Produits non trouvés !",
        internalError: "Erreur interne lors de l'obtention du produit ",
      };
    case "ja":
      return {
        productIdRequired: "製品IDは必須です！",
        productsNotFound: "製品が見つかりません！",
        internalError: "製品取得中にシステムエラーが発生しました ",
      };
    default:
      return {
        productIdRequired: "Product id is required!",
        productsNotFound: "Products not found!",
        internalError: "Internal error while getting product ",
      };
  }
};

export const translateProductIdDelete = (language: string) => {
  switch (language) {
    case "vi":
      return {
        userIdNotFound: "Không tìm thấy user id!",
        permissionDenied: "Bạn không có quyền xóa product!",
        productIdRequired: "Product id là bắt buộc!",
        storeIdNotFound: "Không tìm thấy store id!",
        internalError: "Lỗi hệ thống khi xóa sản phẩm ",
      };
    case "en":
      return {
        userIdNotFound: "User id not found!",
        permissionDenied: "You do not have permission to delete the product!",
        productIdRequired: "Product id is required!",
        storeIdNotFound: "Store id not found!",
        internalError: "Internal error when deleting product ",
      };
    case "zh":
      return {
        userIdNotFound: "未找到用户ID！",
        permissionDenied: "您没有删除产品的权限！",
        productIdRequired: "产品ID是必需的！",
        storeIdNotFound: "未找到店铺ID！",
        internalError: "删除产品时发生系统错误 ",
      };
    case "fr":
      return {
        userIdNotFound: "ID utilisateur introuvable !",
        permissionDenied:
          "Vous n'avez pas la permission de supprimer le produit !",
        productIdRequired: "L'ID du produit est requis !",
        storeIdNotFound: "ID du magasin introuvable !",
        internalError: "Erreur interne lors de la suppression du produit ",
      };
    case "ja":
      return {
        userIdNotFound: "ユーザーIDが見つかりません！",
        permissionDenied: "製品を削除する権限がありません！",
        productIdRequired: "製品IDは必須です！",
        storeIdNotFound: "店舗IDが見つかりません！",
        internalError: "製品削除中にシステムエラーが発生しました ",
      };
    default:
      return {
        userIdNotFound: "User id not found!",
        permissionDenied: "You do not have permission to delete the product!",
        productIdRequired: "Product id is required!",
        storeIdNotFound: "Store id not found!",
        internalError: "Internal error when deleting product ",
      };
  }
};

export const translateProductIdPatch = (language: string) => {
  switch (language) {
    case "vi":
      return {
        userIdNotFound: "Không tìm thấy user id!",
        permissionDenied: "Bạn không có quyền cập nhật product!",
        nameRequired: "Name là bắt buộc!",
        headingRequired: "Heading là bắt buộc!",
        headingExists: "Heading đã tồn tại!",
        descriptionRequired: "Description là bắt buộc!",
        imagesRequired: "Images là bắt buộc!",
        productDetailRequired: "ProductDetail là bắt buộc!",
        imagesAlientFeaturesRequired: "Imagesalientfeatures là bắt buộc!",
        productIdRequired: "Product id là bắt buộc!",
        productNotFound: "Không tìm thấy sản phẩm!",
        storeIdNotFound: "Không tìm thấy store id!",
        internalError: "Lỗi hệ thống khi cập nhật sản phẩm ",
      };
    case "en":
      return {
        userIdNotFound: "User id not found!",
        permissionDenied: "You do not have permission to update the product!",
        nameRequired: "Name is required!",
        headingRequired: "Heading is required!",
        headingExists: "Heading already exists!",
        descriptionRequired: "Description is required!",
        imagesRequired: "Images are required!",
        productDetailRequired: "Product detail is required!",
        imagesAlientFeaturesRequired:
          "Images with salient features are required!",
        productIdRequired: "Product id is required!",
        productNotFound: "Product not found!",
        storeIdNotFound: "Store id not found!",
        internalError: "Internal error when updating product ",
      };
    case "zh":
      return {
        userIdNotFound: "未找到用户ID！",
        permissionDenied: "您没有更新产品的权限！",
        nameRequired: "名称是必需的！",
        headingRequired: "标题是必需的！",
        headingExists: "标题已存在！",
        descriptionRequired: "描述是必需的！",
        imagesRequired: "图片是必需的！",
        productDetailRequired: "产品详细信息是必需的！",
        imagesAlientFeaturesRequired: "带有显著特点的图片是必需的！",
        productIdRequired: "产品ID是必需的！",
        productNotFound: "未找到产品！",
        storeIdNotFound: "未找到店铺ID！",
        internalError: "更新产品时发生系统错误 ",
      };
    case "fr":
      return {
        userIdNotFound: "ID utilisateur introuvable !",
        permissionDenied:
          "Vous n'avez pas la permission de mettre à jour le produit !",
        nameRequired: "Le nom est requis !",
        headingRequired: "Le titre est requis !",
        headingExists: "Le titre existe déjà !",
        descriptionRequired: "La description est requise !",
        imagesRequired: "Les images sont requises !",
        productDetailRequired: "Les détails du produit sont requis !",
        imagesAlientFeaturesRequired:
          "Les images avec caractéristiques saillantes sont requises !",
        productIdRequired: "L'ID du produit est requis !",
        productNotFound: "Produit introuvable !",
        storeIdNotFound: "ID du magasin introuvable !",
        internalError: "Erreur interne lors de la mise à jour du produit ",
      };
    case "ja":
      return {
        userIdNotFound: "ユーザーIDが見つかりません！",
        permissionDenied: "製品を更新する権限がありません！",
        nameRequired: "名前は必須です！",
        headingRequired: "見出しは必須です！",
        headingExists: "見出しはすでに存在します！",
        descriptionRequired: "説明は必須です！",
        imagesRequired: "画像は必須です！",
        productDetailRequired: "製品詳細は必須です！",
        imagesAlientFeaturesRequired: "特徴的な画像は必須です！",
        productIdRequired: "製品IDは必須です！",
        productNotFound: "製品が見つかりません！",
        storeIdNotFound: "店舗IDが見つかりません！",
        internalError: "製品更新中にシステムエラーが発生しました ",
      };
    default:
      return {
        userIdNotFound: "User id not found!",
        permissionDenied: "You do not have permission to update the product!",
        nameRequired: "Name is required!",
        headingRequired: "Heading is required!",
        headingExists: "Heading already exists!",
        descriptionRequired: "Description is required!",
        imagesRequired: "Images are required!",
        productDetailRequired: "Product detail is required!",
        imagesAlientFeaturesRequired:
          "Images with salient features are required!",
        productIdRequired: "Product id is required!",
        productNotFound: "Product not found!",
        storeIdNotFound: "Store id not found!",
        internalError: "Internal error when updating product ",
      };
  }
};

export const translateProductDetailPost = (language: string) => {
  switch (language) {
    case "vi":
      return {
        userIdNotFound: "Không tìm thấy user id!",
        permissionDenied: "Bạn không có quyền tạo mới product detail!",
        titleRequired: "Tiêu đề là bắt buộc!",
        categoryIdRequired: "CategoryId là bắt buộc!",
        promotionHeadingRequired: "Tiêu đề khuyến mãi là bắt buộc!",
        promotionDescriptionRequired: "Mô tả khuyến mãi là bắt buộc!",
        sizeIdRequired: "SizeId là bắt buộc!",
        colorIdRequired: "ColorId là bắt buộc!",
        nameRequired: "Tên là bắt buộc!",
        percentPromotionRequired: "Phần trăm khuyến mãi là bắt buộc!",
        priceRequired: "Giá là bắt buộc!",
        quantityRequired: "Số lượng là bắt buộc!",
        descriptionSpecificationsRequired:
          "Mô tả thông số kỹ thuật là bắt buộc!",
        valueSpecificationsRequired: "Giá trị thông số kỹ thuật là bắt buộc!",
        descriptionSalientFeaturesRequired:
          "Mô tả tính năng nổi bật là bắt buộc!",
        description2SalientFeaturesRequired:
          "Mô tả tính năng nổi bật 2 là bắt buộc!",
        description3SalientFeaturesRequired:
          "Mô tả tính năng nổi bật 3 là bắt buộc!",
        description4SalientFeaturesRequired:
          "Mô tả tính năng nổi bật 4 là bắt buộc!",
        contentSalientFeaturesRequired:
          "Nội dung tính năng nổi bật là bắt buộc!",
        storeIdRequired: "Store id là bắt buộc!",
        chooseSize: "Hãy chọn lại Size!",
        chooseColor: "Hãy chọn lại Color!",
        chooseCategory: "Hãy chọn lại Category!",
        storeIdNotFound: "Không tìm thấy store id!",
        internalError: "Lỗi hệ thống khi tạo mới product detail!",
        titleExists:"Tiêu đề đã tồn tại"
      };
    case "en":
      return {
        userIdNotFound: "User id not found!",
        permissionDenied:
          "You do not have permission to create a new product detail!",
        titleRequired: "Title is required!",
        categoryIdRequired: "CategoryId is required!",
        promotionHeadingRequired: "Promotion heading is required!",
        promotionDescriptionRequired: "Promotion description is required!",
        sizeIdRequired: "SizeId is required!",
        colorIdRequired: "ColorId is required!",
        nameRequired: "Name is required!",
        percentPromotionRequired: "Percent promotion is required!",
        priceRequired: "Price is required!",
        quantityRequired: "Quantity is required!",
        descriptionSpecificationsRequired:
          "Description specifications are required!",
        valueSpecificationsRequired: "Value specifications are required!",
        descriptionSalientFeaturesRequired:
          "Description of salient features is required!",
        description2SalientFeaturesRequired:
          "Description of salient features 2 is required!",
        description3SalientFeaturesRequired:
          "Description of salient features 3 is required!",
        description4SalientFeaturesRequired:
          "Description of salient features 4 is required!",
        contentSalientFeaturesRequired:
          "Content for salient features is required!",
        storeIdRequired: "Store id is required!",
        chooseSize: "Please reselect a Size!",
        chooseColor: "Please reselect a Color!",
        chooseCategory: "Please reselect a Category!",
        storeIdNotFound: "Store id not found!",
        internalError: "System error when creating a new product detail!",
        titleExists:"Title already exists"
      };
    case "zh":
      return {
        userIdNotFound: "未找到用户 ID！",
        permissionDenied: "您无权创建新产品详情！",
        titleRequired: "标题是必需的！",
        categoryIdRequired: "CategoryId 是必需的！",
        promotionHeadingRequired: "促销标题是必需的！",
        promotionDescriptionRequired: "促销描述是必需的！",
        sizeIdRequired: "SizeId 是必需的！",
        colorIdRequired: "ColorId 是必需的！",
        nameRequired: "名称是必需的！",
        percentPromotionRequired: "促销百分比是必需的！",
        priceRequired: "价格是必需的！",
        quantityRequired: "数量是必需的！",
        descriptionSpecificationsRequired: "规格描述是必需的！",
        valueSpecificationsRequired: "规格值是必需的！",
        descriptionSalientFeaturesRequired: "关键功能描述是必需的！",
        description2SalientFeaturesRequired: "关键功能描述 2 是必需的！",
        description3SalientFeaturesRequired: "关键功能描述 3 是必需的！",
        description4SalientFeaturesRequired: "关键功能描述 4 是必需的！",
        contentSalientFeaturesRequired: "关键功能内容是必需的！",
        storeIdRequired: "商店 ID 是必需的！",
        chooseSize: "请重新选择尺码！",
        chooseColor: "请重新选择颜色！",
        chooseCategory: "请重新选择类别！",
        storeIdNotFound: "未找到商店 ID！",
        internalError: "创建新产品详情时系统错误！",
        titleExists:"标题已存在"
      };
    case "fr":
      return {
        userIdNotFound: "ID utilisateur introuvable !",
        permissionDenied:
          "Vous n'avez pas la permission de créer un nouveau détail de produit !",
        titleRequired: "Le titre est obligatoire !",
        categoryIdRequired: "L'ID de catégorie est obligatoire !",
        promotionHeadingRequired: "Le titre de la promotion est obligatoire !",
        promotionDescriptionRequired:
          "La description de la promotion est obligatoire !",
        sizeIdRequired: "L'ID de taille est obligatoire !",
        colorIdRequired: "L'ID de couleur est obligatoire !",
        nameRequired: "Le nom est obligatoire !",
        percentPromotionRequired:
          "Le pourcentage de promotion est obligatoire !",
        priceRequired: "Le prix est obligatoire !",
        quantityRequired: "La quantité est obligatoire !",
        descriptionSpecificationsRequired:
          "La description des spécifications est obligatoire !",
        valueSpecificationsRequired:
          "La valeur des spécifications est obligatoire !",
        descriptionSalientFeaturesRequired:
          "La description des caractéristiques principales est obligatoire !",
        description2SalientFeaturesRequired:
          "La description des caractéristiques principales 2 est obligatoire !",
        description3SalientFeaturesRequired:
          "La description des caractéristiques principales 3 est obligatoire !",
        description4SalientFeaturesRequired:
          "La description des caractéristiques principales 4 est obligatoire !",
        contentSalientFeaturesRequired:
          "Le contenu des caractéristiques principales est obligatoire !",
        storeIdRequired: "L'ID du magasin est obligatoire !",
        chooseSize: "Veuillez choisir à nouveau une taille !",
        chooseColor: "Veuillez choisir à nouveau une couleur !",
        chooseCategory: "Veuillez choisir à nouveau une catégorie !",
        storeIdNotFound: "ID du magasin introuvable !",
        internalError:
          "Erreur système lors de la création d'un nouveau détail de produit !",
        titleExists:"Le titre existe déjà"
      };
    case "ja":
      return {
        userIdNotFound: "ユーザーIDが見つかりません！",
        permissionDenied: "新しい製品詳細を作成する権限がありません！",
        titleRequired: "タイトルは必須です！",
        categoryIdRequired: "CategoryIdは必須です！",
        promotionHeadingRequired: "プロモーション見出しは必須です！",
        promotionDescriptionRequired: "プロモーションの説明は必須です！",
        sizeIdRequired: "SizeIdは必須です！",
        colorIdRequired: "ColorIdは必須です！",
        nameRequired: "名前は必須です！",
        percentPromotionRequired: "プロモーションの割合は必須です！",
        priceRequired: "価格は必須です！",
        quantityRequired: "数量は必須です！",
        descriptionSpecificationsRequired: "仕様の説明は必須です！",
        valueSpecificationsRequired: "仕様の値は必須です！",
        descriptionSalientFeaturesRequired: "重要な特徴の説明は必須です！",
        description2SalientFeaturesRequired: "重要な特徴2の説明は必須です！",
        description3SalientFeaturesRequired: "重要な特徴3の説明は必須です！",
        description4SalientFeaturesRequired: "重要な特徴4の説明は必須です！",
        contentSalientFeaturesRequired: "重要な特徴の内容は必須です！",
        storeIdRequired: "店舗IDは必須です！",
        chooseSize: "サイズを再選択してください！",
        chooseColor: "色を再選択してください！",
        chooseCategory: "カテゴリーを再選択してください！",
        storeIdNotFound: "店舗IDが見つかりません！",
        internalError: "新しい製品詳細を作成中にシステムエラーが発生しました！",
        titleExists:"タイトルはすでに存在します"
      };
    default: // English
      return {
        userIdNotFound: "User id not found!",
        permissionDenied:
          "You do not have permission to create a new product detail!",
        titleRequired: "Title is required!",
        categoryIdRequired: "CategoryId is required!",
        promotionHeadingRequired: "Promotion heading is required!",
        promotionDescriptionRequired: "Promotion description is required!",
        sizeIdRequired: "SizeId is required!",
        colorIdRequired: "ColorId is required!",
        nameRequired: "Name is required!",
        percentPromotionRequired: "Percent promotion is required!",
        priceRequired: "Price is required!",
        quantityRequired: "Quantity is required!",
        descriptionSpecificationsRequired:
          "Description specifications are required!",
        valueSpecificationsRequired: "Value specifications are required!",
        descriptionSalientFeaturesRequired:
          "Description of salient features is required!",
        description2SalientFeaturesRequired:
          "Description of salient features 2 is required!",
        description3SalientFeaturesRequired:
          "Description of salient features 3 is required!",
        description4SalientFeaturesRequired:
          "Description of salient features 4 is required!",
        contentSalientFeaturesRequired:
          "Content for salient features is required!",
        storeIdRequired: "Store id is required!",
        chooseSize: "Please reselect a Size!",
        chooseColor: "Please reselect a Color!",
        chooseCategory: "Please reselect a Category!",
        storeIdNotFound: "Store id not found!",
        internalError: "System error when creating a new product detail!",
        titleExists:"Title already exists"
      };
  }
};

export const translateProductDetailGet = (language: string) => {
  switch (language) {
    case "vi":
      return {
        storeIdRequired: "Store id là bắt buộc!",
        internalErrorGetProductDetail:
          "Lỗi hệ thống khi lấy chi tiết sản phẩm!",
      };
    case "en":
      return {
        storeIdRequired: "Store id is required!",
        internalErrorGetProductDetail:
          "System error when retrieving product details!",
      };
    case "zh":
      return {
        storeIdRequired: "商店 ID 是必需的！",
        internalErrorGetProductDetail: "获取产品详情时系统错误！",
      };
    case "fr":
      return {
        storeIdRequired: "L'ID du magasin est obligatoire !",
        internalErrorGetProductDetail:
          "Erreur système lors de la récupération des détails du produit !",
      };
    case "ja":
      return {
        storeIdRequired: "店舗 ID は必須です！",
        internalErrorGetProductDetail:
          "商品詳細を取得中にシステムエラーが発生しました！",
      };
    default: // English
      return {
        storeIdRequired: "Store id is required!",
        internalErrorGetProductDetail:
          "System error when retrieving product details!",
      };
  }
};

export const translateProductDetailDelete = (language: string) => {
  switch (language) {
    case "vi":
      return {
        userNotFound: "Không tìm thấy user!",
        permissionDenied: "Bạn không có quyền xóa product detail!",
        idsArrayEmpty: "Mảng IDs không được trống!",
        storeIdNotFound: "Không tìm thấy store id!",
        deleteSuccess: "Xóa thành công!",
        internalErrorDeleteCategory: "Lỗi hệ thống khi xóa danh mục!",
      };
    case "en":
      return {
        userNotFound: "User not found!",
        permissionDenied:
          "You do not have permission to delete product detail!",
        idsArrayEmpty: "IDs array must not be empty!",
        storeIdNotFound: "Store ID not found!",
        deleteSuccess: "Deleted successfully!",
        internalErrorDeleteCategory: "System error when deleting category!",
      };
    case "zh":
      return {
        userNotFound: "找不到用户！",
        permissionDenied: "您没有删除产品详情的权限！",
        idsArrayEmpty: "ID 数组不能为空！",
        storeIdNotFound: "找不到商店 ID！",
        deleteSuccess: "删除成功！",
        internalErrorDeleteCategory: "删除类别时系统错误！",
      };
    case "fr":
      return {
        userNotFound: "Utilisateur introuvable !",
        permissionDenied:
          "Vous n'avez pas la permission de supprimer les détails du produit !",
        idsArrayEmpty: "Le tableau d'IDs ne doit pas être vide !",
        storeIdNotFound: "ID du magasin introuvable !",
        deleteSuccess: "Suppression réussie !",
        internalErrorDeleteCategory:
          "Erreur système lors de la suppression de la catégorie !",
      };
    case "ja":
      return {
        userNotFound: "ユーザーが見つかりません！",
        permissionDenied: "製品詳細を削除する権限がありません！",
        idsArrayEmpty: "ID 配列を空にすることはできません！",
        storeIdNotFound: "店舗 ID が見つかりません！",
        deleteSuccess: "削除成功！",
        internalErrorDeleteCategory:
          "カテゴリ削除中にシステムエラーが発生しました！",
      };
    default: // English
      return {
        userNotFound: "User not found!",
        permissionDenied:
          "You do not have permission to delete product detail!",
        idsArrayEmpty: "IDs array must not be empty!",
        storeIdNotFound: "Store ID not found!",
        deleteSuccess: "Deleted successfully!",
        internalErrorDeleteCategory: "System error when deleting category!",
      };
  }
};

export const translateProductDetailIdGet = (language: string) => {
  switch (language) {
    case "vi":
      return {
        productDetailIdRequired: "Yêu cầu id productdetail!",
        internalErrorGetProductDetail: "Lỗi hệ thống khi lấy productdetail!",
      };
    case "en":
      return {
        userNotFound: "User not found!",
        permissionDenied:
          "You do not have permission to delete product detail!",
        idsArrayEmpty: "IDs array must not be empty!",
        storeIdNotFound: "Store ID not found!",
        deleteSuccess: "Deleted successfully!",
        internalErrorDeleteCategory: "System error when deleting category!",
      };
    case "zh":
      return {
        productDetailIdRequired: "需要产品详情 ID！",
        internalErrorGetProductDetail: "获取产品详情时系统错误！",
      };
    case "fr":
      return {
        productDetailIdRequired:
          "L'identifiant du détail du produit est requis !",
        internalErrorGetProductDetail:
          "Erreur système lors de la récupération du détail du produit !",
      };
    case "ja":
      return {
        productDetailIdRequired: "製品詳細 ID が必要です！",
        internalErrorGetProductDetail:
          "製品詳細を取得する際にシステムエラーが発生しました！",
      };
    default: // English
      return {
        productDetailIdRequired: "Product detail ID is required!",
        internalErrorGetProductDetail:
          "System error when retrieving product detail!",
      };
  }
};

export const translateProductDetailIdDelete = (language: string) => {
  switch (language) {
    case "vi":
      return {
        userIdNotFound: "Không tìm thấy user id!",
        permissionDenied: "Bạn không có quyền xóa product detail!",
        productDetailIdRequired: "Yêu cầu id productdetail!",
        storeIdNotFound: "Không tìm thấy store id!",
        internalErrorDeleteProductDetail: "Lỗi hệ thống khi xóa productdetail!",
      };
    case "en":
      return {
        userIdNotFound: "User ID not found!",
        permissionDenied:
          "You do not have permission to delete product detail!",
        productDetailIdRequired: "Product detail ID is required!",
        storeIdNotFound: "Store ID not found!",
        internalErrorDeleteProductDetail:
          "System error when deleting product detail!",
      };
    case "zh":
      return {
        userIdNotFound: "找不到用户 ID！",
        permissionDenied: "您无权删除产品详情！",
        productDetailIdRequired: "需要产品详情 ID！",
        storeIdNotFound: "找不到商店 ID！",
        internalErrorDeleteProductDetail: "删除产品详情时系统错误！",
      };
    case "fr":
      return {
        userIdNotFound: "ID utilisateur introuvable !",
        permissionDenied:
          "Vous n'avez pas la permission de supprimer le détail du produit !",
        productDetailIdRequired:
          "L'identifiant du détail du produit est requis !",
        storeIdNotFound: "ID de magasin introuvable !",
        internalErrorDeleteProductDetail:
          "Erreur système lors de la suppression du détail du produit !",
      };
    case "ja":
      return {
        userIdNotFound: "ユーザー ID が見つかりません！",
        permissionDenied: "製品詳細を削除する権限がありません！",
        productDetailIdRequired: "製品詳細 ID が必要です！",
        storeIdNotFound: "店舗 ID が見つかりません！",
        internalErrorDeleteProductDetail:
          "製品詳細を削除する際にシステムエラーが発生しました！",
      };
    default: // English
      return {
        userIdNotFound: "User ID not found!",
        permissionDenied:
          "You do not have permission to delete product detail!",
        productDetailIdRequired: "Product detail ID is required!",
        storeIdNotFound: "Store ID not found!",
        internalErrorDeleteProductDetail:
          "System error when deleting product detail!",
      };
  }
};

export const translateProductDetailIdPatch = (language: string) => {
  switch (language) {
    case "vi":
      return {
        userIdNotFound: "Không tìm thấy user id!",
        permissionDenied: "Bạn không có quyền tạo mới product detail!",
        titleRequired: "Tiêu đề là bắt buộc!",
        categoryIdRequired: "CategoryId là bắt buộc!",
        promotionHeadingRequired: "Tiêu đề khuyến mãi là bắt buộc!",
        promotionDescriptionRequired: "Mô tả khuyến mãi là bắt buộc!",
        sizeIdRequired: "SizeId là bắt buộc!",
        colorIdRequired: "ColorId là bắt buộc!",
        nameRequired: "Tên là bắt buộc!",
        percentPromotionRequired: "Phần trăm khuyến mãi là bắt buộc!",
        priceRequired: "Giá là bắt buộc!",
        quantityRequired: "Số lượng là bắt buộc!",
        descriptionSpecificationsRequired:
          "Mô tả thông số kỹ thuật là bắt buộc!",
        valueSpecificationsRequired: "Giá trị thông số kỹ thuật là bắt buộc!",
        descriptionSalientFeaturesRequired:
          "Mô tả tính năng nổi bật là bắt buộc!",
        description2SalientFeaturesRequired:
          "Mô tả tính năng nổi bật 2 là bắt buộc!",
        description3SalientFeaturesRequired:
          "Mô tả tính năng nổi bật 3 là bắt buộc!",
        description4SalientFeaturesRequired:
          "Mô tả tính năng nổi bật 4 là bắt buộc!",
        contentSalientFeaturesRequired:
          "Nội dung tính năng nổi bật là bắt buộc!",
        chooseSize: "Hãy chọn lại Size!",
        chooseColor: "Hãy chọn lại Color!",
        chooseCategory: "Hãy chọn lại Category!",
        productDetailIdRequired: "ProductDetail id là bắt buộc!",
        storeIdNotFound: "Không tìm thấy store id!",
        internalError: "Lỗi hệ thống khi cập nhật product detail!",
        titleExists: "Tiêu đề đã tồn tại",
        productNotFound: "Chi tiết sản phẩm không tìm thấy"
      };
    case "en":
      return {
        userIdNotFound: "User id not found!",
        permissionDenied:
          "You do not have permission to create a new product detail!",
        titleRequired: "Title is required!",
        categoryIdRequired: "CategoryId is required!",
        promotionHeadingRequired: "Promotion heading is required!",
        promotionDescriptionRequired: "Promotion description is required!",
        sizeIdRequired: "SizeId is required!",
        colorIdRequired: "ColorId is required!",
        nameRequired: "Name is required!",
        percentPromotionRequired: "Percent promotion is required!",
        priceRequired: "Price is required!",
        quantityRequired: "Quantity is required!",
        descriptionSpecificationsRequired:
          "Description specifications are required!",
        valueSpecificationsRequired: "Value specifications are required!",
        descriptionSalientFeaturesRequired:
          "Description of salient features is required!",
        description2SalientFeaturesRequired:
          "Description of salient features 2 is required!",
        description3SalientFeaturesRequired:
          "Description of salient features 3 is required!",
        description4SalientFeaturesRequired:
          "Description of salient features 4 is required!",
        contentSalientFeaturesRequired:
          "Content for salient features is required!",
        chooseSize: "Please reselect a Size!",
        chooseColor: "Please reselect a Color!",
        chooseCategory: "Please reselect a Category!",
        productDetailIdRequired: "ProductDetail id is required!",
        storeIdNotFound: "Store id not found!",
        internalError: "System error when updating product detail!",
        titleExists: "Title already exists",
        productNotFound: "Product detail not found"
      };
    case "zh":
      return {
        userIdNotFound: "未找到用户 ID！",
        permissionDenied: "您无权创建新产品详情！",
        titleRequired: "标题是必需的！",
        categoryIdRequired: "CategoryId 是必需的！",
        promotionHeadingRequired: "促销标题是必需的！",
        promotionDescriptionRequired: "促销描述是必需的！",
        sizeIdRequired: "SizeId 是必需的！",
        colorIdRequired: "ColorId 是必需的！",
        nameRequired: "名称是必需的！",
        percentPromotionRequired: "促销百分比是必需的！",
        priceRequired: "价格是必需的！",
        quantityRequired: "数量是必需的！",
        descriptionSpecificationsRequired: "规格描述是必需的！",
        valueSpecificationsRequired: "规格值是必需的！",
        descriptionSalientFeaturesRequired: "关键功能描述是必需的！",
        description2SalientFeaturesRequired: "关键功能描述 2 是必需的！",
        description3SalientFeaturesRequired: "关键功能描述 3 是必需的！",
        description4SalientFeaturesRequired: "关键功能描述 4 是必需的！",
        contentSalientFeaturesRequired: "关键功能内容是必需的！",
        chooseSize: "请重新选择尺码！",
        chooseColor: "请重新选择颜色！",
        chooseCategory: "请重新选择类别！",
        productDetailIdRequired: "ProductDetail id 是必需的！",
        storeIdNotFound: "未找到商店 ID！",
        internalError: "更新产品详情时系统错误！",
        titleExists: "标题已存在",
        productNotFound: "产品详情未找到"
      };
    case "fr":
      return {
        userIdNotFound: "ID utilisateur introuvable !",
        permissionDenied:
          "Vous n'avez pas la permission de créer un nouveau détail de produit !",
        titleRequired: "Le titre est obligatoire !",
        categoryIdRequired: "L'ID de catégorie est obligatoire !",
        promotionHeadingRequired: "Le titre de la promotion est obligatoire !",
        promotionDescriptionRequired:
          "La description de la promotion est obligatoire !",
        sizeIdRequired: "L'ID de taille est obligatoire !",
        colorIdRequired: "L'ID de couleur est obligatoire !",
        nameRequired: "Le nom est obligatoire !",
        percentPromotionRequired:
          "Le pourcentage de promotion est obligatoire !",
        priceRequired: "Le prix est obligatoire !",
        quantityRequired: "La quantité est obligatoire !",
        descriptionSpecificationsRequired:
          "La description des spécifications est obligatoire !",
        valueSpecificationsRequired:
          "La valeur des spécifications est obligatoire !",
        descriptionSalientFeaturesRequired:
          "La description des caractéristiques principales est obligatoire !",
        description2SalientFeaturesRequired:
          "La description des caractéristiques principales 2 est obligatoire !",
        description3SalientFeaturesRequired:
          "La description des caractéristiques principales 3 est obligatoire !",
        description4SalientFeaturesRequired:
          "La description des caractéristiques principales 4 est obligatoire !",
        contentSalientFeaturesRequired:
          "Le contenu des caractéristiques principales est obligatoire !",
        chooseSize: "Veuillez choisir à nouveau une taille !",
        chooseColor: "Veuillez choisir à nouveau une couleur !",
        chooseCategory: "Veuillez choisir à nouveau une catégorie !",
        productDetailIdRequired: "ProductDetail id est obligatoire !",
        storeIdNotFound: "ID du magasin introuvable !",
        internalError:
          "Erreur système lors de la mise à jour du détail de produit !",
        titleExists: "Le titre existe déjà",
        productNotFound: "Détails du produit non trouvés"
      };
    case "ja":
      return {
        userIdNotFound: "ユーザーIDが見つかりません！",
        permissionDenied: "新しい製品詳細を作成する権限がありません！",
        titleRequired: "タイトルは必須です！",
        categoryIdRequired: "CategoryIdは必須です！",
        promotionHeadingRequired: "プロモーション見出しは必須です！",
        promotionDescriptionRequired: "プロモーションの説明は必須です！",
        sizeIdRequired: "SizeIdは必須です！",
        colorIdRequired: "ColorIdは必須です！",
        nameRequired: "名前は必須です！",
        percentPromotionRequired: "プロモーションの割合は必須です！",
        priceRequired: "価格は必須です！",
        quantityRequired: "数量は必須です！",
        descriptionSpecificationsRequired: "仕様の説明は必須です！",
        valueSpecificationsRequired: "仕様の値は必須です！",
        descriptionSalientFeaturesRequired: "重要な特徴の説明は必須です！",
        description2SalientFeaturesRequired: "重要な特徴2の説明は必須です！",
        description3SalientFeaturesRequired: "重要な特徴3の説明は必須です！",
        description4SalientFeaturesRequired: "重要な特徴4の説明は必須です！",
        contentSalientFeaturesRequired: "重要な特徴の内容は必須です！",
        chooseSize: "サイズを再選択してください！",
        chooseColor: "色を再選択してください！",
        chooseCategory: "カテゴリーを再選択してください！",
        productDetailIdRequired: "ProductDetail id は必須です！",
        storeIdNotFound: "店舗IDが見つかりません！",
        internalError: "製品詳細の更新時にシステムエラーが発生しました！",
        titleExists: "タイトルはすでに存在します",
        productNotFound: "製品の詳細が見つかりません"
      };
    default: // English
      return {
        userIdNotFound: "User id not found!",
        permissionDenied:
          "You do not have permission to create a new product detail!",
        titleRequired: "Title is required!",
        categoryIdRequired: "CategoryId is required!",
        promotionHeadingRequired: "Promotion heading is required!",
        promotionDescriptionRequired: "Promotion description is required!",
        sizeIdRequired: "SizeId is required!",
        colorIdRequired: "ColorId is required!",
        nameRequired: "Name is required!",
        percentPromotionRequired: "Percent promotion is required!",
        priceRequired: "Price is required!",
        quantityRequired: "Quantity is required!",
        descriptionSpecificationsRequired:
          "Description specifications are required!",
        valueSpecificationsRequired: "Value specifications are required!",
        descriptionSalientFeaturesRequired:
          "Description of salient features is required!",
        description2SalientFeaturesRequired:
          "Description of salient features 2 is required!",
        description3SalientFeaturesRequired:
          "Description of salient features 3 is required!",
        description4SalientFeaturesRequired:
          "Description of salient features 4 is required!",
        contentSalientFeaturesRequired:
          "Content for salient features is required!",
        chooseSize: "Please reselect a Size!",
        chooseColor: "Please reselect a Color!",
        chooseCategory: "Please reselect a Category!",
        productDetailIdRequired: "ProductDetail id is required!",
        storeIdNotFound: "Store id not found!",
        internalError: "System error when updating product detail!",
        titleExists: "Title already exists",
        productNotFound: "Product detail not found"
      };
  }
};

export const translateSalaryStaffGet = (language: string) => {
  switch (language) {
    case "vi":
      return {
        userIdNotFound: "Không tìm thấy user id!",
        permissionDenied: "Bạn không có quyền xem salarystaff!",
        internalError: "Lỗi hệ thống khi lấy salarystaff!",
      };
    case "en":
      return {
        userIdNotFound: "User id not found!",
        permissionDenied: "You do not have permission to view salarystaff!",
        internalError: "System error when getting salarystaff!",
      };
    case "zh":
      return {
        userIdNotFound: "未找到用户 ID！",
        permissionDenied: "您无权查看 salarystaff！",
        internalError: "获取 salarystaff 时系统错误！",
      };
    case "fr":
      return {
        userIdNotFound: "ID utilisateur introuvable !",
        permissionDenied: "Vous n'avez pas la permission de voir salarystaff !",
        internalError:
          "Erreur système lors de la récupération de salarystaff !",
      };
    case "ja":
      return {
        userIdNotFound: "ユーザーIDが見つかりません！",
        permissionDenied: "salarystaffを見る権限がありません！",
        internalError:
          "salarystaffを取得する際にシステムエラーが発生しました！",
      };
    default: // English
      return {
        userIdNotFound: "User id not found!",
        permissionDenied: "You do not have permission to view salarystaff!",
        internalError: "System error when getting salarystaff!",
      };
  }
};

export const translateSalaryStaffPatch = (language: string) => {
  switch (language) {
    case "vi":
      return {
        userIdNotFound: "Không tìm thấy user id!",
        permissionDenied: "Bạn không có quyền cập nhật salarystaff!",
        bonusRequired: "Bonus là bắt buộc.",
        bonusTitleRequired: "Tiêu đề bonus là bắt buộc.",
        internalError: "Lỗi hệ thống khi cập nhật salarystaff.",
      };
    case "en":
      return {
        userIdNotFound: "User id not found!",
        permissionDenied: "You do not have permission to update salarystaff!",
        bonusRequired: "Bonus is required.",
        bonusTitleRequired: "Bonus title is required.",
        internalError: "System error when updating salarystaff.",
      };
    case "zh":
      return {
        userIdNotFound: "未找到用户 ID！",
        permissionDenied: "您无权更新 salarystaff！",
        bonusRequired: "奖金是必需的。",
        bonusTitleRequired: "奖金标题是必需的。",
        internalError: "更新 salarystaff 时系统错误！",
      };
    case "fr":
      return {
        userIdNotFound: "ID utilisateur introuvable !",
        permissionDenied:
          "Vous n'avez pas la permission de mettre à jour salarystaff !",
        bonusRequired: "La prime est obligatoire.",
        bonusTitleRequired: "Le titre de la prime est obligatoire.",
        internalError: "Erreur système lors de la mise à jour de salarystaff !",
      };
    case "ja":
      return {
        userIdNotFound: "ユーザーIDが見つかりません！",
        permissionDenied: "salarystaffを更新する権限がありません！",
        bonusRequired: "ボーナスは必須です。",
        bonusTitleRequired: "ボーナスのタイトルは必須です。",
        internalError: "salarystaffの更新時にシステムエラーが発生しました！",
      };
    default: // English
      return {
        userIdNotFound: "User id not found!",
        permissionDenied: "You do not have permission to update salarystaff!",
        bonusRequired: "Bonus is required.",
        bonusTitleRequired: "Bonus title is required.",
        internalError: "System error when updating salarystaff.",
      };
  }
};

export const translateSalaryStaffPost = (language: string) => {
  switch (language) {
    case "vi":
      return {
        userIdNotFound: "Không tìm thấy user id!",
        permissionDenied: "Bạn không có quyền tạo mới salarystaff!",
        unbonusRequired: "Unbonus là bắt buộc.",
        unbonusTitleRequired: "Tiêu đề unbonus là bắt buộc.",
        internalError: "Lỗi hệ thống khi tạo mới salarystaff.",
      };
    case "en": // English (moved after Vietnamese)
      return {
        userIdNotFound: "User id not found!",
        permissionDenied:
          "You do not have permission to create a new salarystaff!",
        unbonusRequired: "Unbonus is required.",
        unbonusTitleRequired: "Unbonus title is required.",
        internalError: "System error when creating a new salarystaff.",
      };
    case "zh":
      return {
        userIdNotFound: "未找到用户 ID！",
        permissionDenied: "您无权创建新 salarystaff！",
        unbonusRequired: "Unbonus 是必需的。",
        unbonusTitleRequired: "Unbonus 标题是必需的。",
        internalError: "创建新 salarystaff 时系统错误！",
      };
    case "fr":
      return {
        userIdNotFound: "ID utilisateur introuvable !",
        permissionDenied:
          "Vous n'avez pas la permission de créer un nouveau salarystaff !",
        unbonusRequired: "Unbonus est obligatoire.",
        unbonusTitleRequired: "Le titre d'unbonus est obligatoire.",
        internalError:
          "Erreur système lors de la création d'un nouveau salarystaff !",
      };
    case "ja":
      return {
        userIdNotFound: "ユーザーIDが見つかりません！",
        permissionDenied: "新しい salarystaff を作成する権限がありません！",
        unbonusRequired: "Unbonus は必須です。",
        unbonusTitleRequired: "Unbonus のタイトルは必須です。",
        internalError:
          "新しい salarystaff を作成中にシステムエラーが発生しました！",
      };
    default: // English
      return {
        userIdNotFound: "User id not found!",
        permissionDenied:
          "You do not have permission to create a new salarystaff!",
        unbonusRequired: "Unbonus is required.",
        unbonusTitleRequired: "Unbonus title is required.",
        internalError: "System error when creating a new salarystaff.",
      };
  }
};

export const translateSalaryStaffView = (language: string) => {
  switch (language) {
    case "vi":
      return {
        userIdNotFound: "Không tìm thấy user id!",
        permissionDenied: "Bạn không có quyền xem salarystaff!",
        internalError: "Lỗi hệ thống khi lấy thông tin salarystaff.",
      };
    case "en": // English (moved after Vietnamese)
      return {
        userIdNotFound: "User id not found!",
        permissionDenied: "You do not have permission to view salarystaff!",
        internalError: "System error when retrieving salarystaff information.",
      };
    case "zh":
      return {
        userIdNotFound: "未找到用户 ID！",
        permissionDenied: "您无权查看 salarystaff！",
        internalError: "获取 salarystaff 信息时系统错误！",
      };
    case "fr":
      return {
        userIdNotFound: "ID utilisateur introuvable !",
        permissionDenied: "Vous n'avez pas la permission de voir salarystaff !",
        internalError:
          "Erreur système lors de la récupération des informations salarystaff !",
      };
    case "ja":
      return {
        userIdNotFound: "ユーザーIDが見つかりません！",
        permissionDenied: "salarystaff を表示する権限がありません！",
        internalError:
          "salarystaff 情報を取得中にシステムエラーが発生しました！",
      };
    default: // English
      return {
        userIdNotFound: "User id not found!",
        permissionDenied: "You do not have permission to view salarystaff!",
        internalError: "System error when retrieving salarystaff information.",
      };
  }
};

export const translateSalaryStaffIdGet = (language: string) => {
  switch (language) {
    case "vi":
      return {
        userIdNotFound: "Không tìm thấy user id!",
        permissionDenied: "Bạn không có quyền xem salarystaff!",
        internalError: "Lỗi hệ thống khi lấy thông tin salarystaff.",
      };
    case "en": // English (new case added below Vietnamese)
      return {
        userIdNotFound: "User id not found!",
        permissionDenied: "You do not have permission to view salarystaff!",
        internalError: "System error when retrieving salarystaff information.",
      };
    case "zh":
      return {
        userIdNotFound: "未找到用户 ID！",
        permissionDenied: "您无权查看 salarystaff！",
        internalError: "获取 salarystaff 信息时系统错误！",
      };
    case "fr":
      return {
        userIdNotFound: "ID utilisateur introuvable !",
        permissionDenied: "Vous n'avez pas la permission de voir salarystaff !",
        internalError:
          "Erreur système lors de la récupération des informations salarystaff !",
      };
    case "ja":
      return {
        userIdNotFound: "ユーザーIDが見つかりません！",
        permissionDenied: "salarystaff を表示する権限がありません！",
        internalError:
          "salarystaff 情報を取得中にシステムエラーが発生しました！",
      };
    default: // English
      return {
        userIdNotFound: "User id not found!",
        permissionDenied: "You do not have permission to view salarystaff!",
        internalError: "System error when retrieving salarystaff information.",
      };
  }
};

export const translateSalaryStaffIdPatch = (language: string) => {
  switch (language) {
    case "vi":
      return {
        userIdNotFound: "Không tìm thấy user id!",
        permissionDenied: "Bạn không có quyền cập nhật salarystaff!",
        internalError: "Lỗi hệ thống khi cập nhật salarystaff.",
      };
    case "en": // English (new case added below Vietnamese)
      return {
        userIdNotFound: "User id not found!",
        permissionDenied: "You do not have permission to update salarystaff!",
        internalError: "System error when updating salarystaff.",
      };
    case "zh":
      return {
        userIdNotFound: "未找到用户 ID！",
        permissionDenied: "您无权更新 salarystaff！",
        internalError: "更新 salarystaff 时系统错误！",
      };
    case "fr":
      return {
        userIdNotFound: "ID utilisateur introuvable !",
        permissionDenied:
          "Vous n'avez pas la permission de mettre à jour salarystaff !",
        internalError: "Erreur système lors de la mise à jour de salarystaff !",
      };
    case "ja":
      return {
        userIdNotFound: "ユーザーIDが見つかりません！",
        permissionDenied: "salarystaff を更新する権限がありません！",
        internalError: "salarystaff を更新中にシステムエラーが発生しました！",
      };
    default: // English
      return {
        userIdNotFound: "User id not found!",
        permissionDenied: "You do not have permission to update salarystaff!",
        internalError: "System error when updating salarystaff.",
      };
  }
};

export const translateSalaryStaffIdPost = (language: string) => {
  switch (language) {
    case "vi":
      return {
        userIdNotFound: "Không tìm thấy user id!",
        permissionDenied: "Bạn không có quyền tạo mới salarystaff!",
        internalError: "Lỗi hệ thống khi tạo mới salarystaff.",
      };
    case "en": // English (new case added below Vietnamese)
      return {
        userIdNotFound: "User id not found!",
        permissionDenied:
          "You do not have permission to create a new salarystaff!",
        internalError: "System error when creating a new salarystaff.",
      };
    case "zh":
      return {
        userIdNotFound: "未找到用户 ID！",
        permissionDenied: "您无权创建新的 salarystaff！",
        internalError: "创建 salarystaff 时系统错误！",
      };
    case "fr":
      return {
        userIdNotFound: "ID utilisateur introuvable !",
        permissionDenied:
          "Vous n'avez pas la permission de créer un nouveau salarystaff !",
        internalError: "Erreur système lors de la création de salarystaff !",
      };
    case "ja":
      return {
        userIdNotFound: "ユーザーIDが見つかりません！",
        permissionDenied: "新しい salarystaff を作成する権限がありません！",
        internalError: "salarystaff を作成中にシステムエラーが発生しました！",
      };
    default: // English
      return {
        userIdNotFound: "User id not found!",
        permissionDenied:
          "You do not have permission to create a new salarystaff!",
        internalError: "System error when creating a new salarystaff.",
      };
  }
};

export const translateProductSalePatch = (language: string) => {
  switch (language) {
    case "vi":
      return {
        userIdNotFound: "Không tìm thấy user id!",
        permissionDenied: "Bạn không có quyền cập nhật product!",
        internalError: "Lỗi hệ thống khi cập nhật product sale.",
      };
    case "en": // English (new case added below Vietnamese)
      return {
        userIdNotFound: "User id not found!",
        permissionDenied: "You do not have permission to update the product!",
        internalError: "System error when updating product sale.",
      };
    case "zh":
      return {
        userIdNotFound: "未找到用户 ID！",
        permissionDenied: "您无权更新产品！",
        internalError: "更新产品销售时系统错误！",
      };
    case "fr":
      return {
        userIdNotFound: "ID utilisateur introuvable !",
        permissionDenied:
          "Vous n'avez pas la permission de mettre à jour le produit !",
        internalError:
          "Erreur système lors de la mise à jour de la vente du produit !",
      };
    case "ja":
      return {
        userIdNotFound: "ユーザーIDが見つかりません！",
        permissionDenied: "製品の更新権限がありません！",
        internalError: "製品の販売更新中にシステムエラーが発生しました！",
      };
    default: // English
      return {
        userIdNotFound: "User id not found!",
        permissionDenied: "You do not have permission to update the product!",
        internalError: "System error when updating product sale.",
      };
  }
};

export const translateProductSearchGet = (language: string) => {
  switch (language) {
    case "vi":
      return {
        internalError: "Lỗi hệ thống khi lấy product!",
      };
    case "en": // English (new case added below Vietnamese)
      return {
        internalError: "Internal error while getting product!",
      };
    case "zh":
      return {
        internalError: "获取产品时系统错误！",
      };
    case "fr":
      return {
        internalError: "Erreur système lors de la récupération du produit !",
      };
    case "ja":
      return {
        internalError: "製品取得時にシステムエラーが発生しました！",
      };
    default: // English
      return {
        internalError: "Internal error while getting product!",
      };
  }
};

export const translateSentEmailPost = (language: string) => {
  switch (language) {
    case "vi":
      return {
        userIdNotFound: "Không tìm thấy user id!",
        permissionDenied: "Bạn không có quyền tạo mới sent Email!",
        subjectRequired: "Tiêu đề là bắt buộc!",
        descriptionRequired: "Mô tả là bắt buộc!",
        userRequired: "Yêu cầu chọn người dùng!",
        storeIdRequired: "Store id là bắt buộc!",
        storeIdNotFound: "Không tìm thấy store id!",
        internalError: "Lỗi hệ thống khi tạo mới sent Email!",
        subjectAlreadyExists: "Tiêu đề đã tồn tại!" // Thêm thông báo mới
      };
    case "en":
      return {
        userIdNotFound: "User id not found!",
        permissionDenied: "You do not have permission to create a new sent Email!",
        subjectRequired: "Subject is required!",
        descriptionRequired: "Description is required!",
        userRequired: "You need to select a user!",
        storeIdRequired: "Store id is required!",
        storeIdNotFound: "Store id not found!",
        internalError: "Internal error when creating new sent Email!",
        subjectAlreadyExists: "Subject already exists!" // Thêm thông báo mới
      };
    case "zh":
      return {
        userIdNotFound: "未找到用户 ID！",
        permissionDenied: "您无权创建新邮件！",
        subjectRequired: "标题是必需的！",
        descriptionRequired: "描述是必需的！",
        userRequired: "需要选择用户！",
        storeIdRequired: "商店 ID 是必需的！",
        storeIdNotFound: "未找到商店 ID！",
        internalError: "创建新邮件时系统错误！",
        subjectAlreadyExists: "标题已存在！" // Thêm thông báo mới
      };
    case "fr":
      return {
        userIdNotFound: "ID utilisateur introuvable !",
        permissionDenied: "Vous n'avez pas la permission de créer un nouvel e-mail !",
        subjectRequired: "Le sujet est obligatoire !",
        descriptionRequired: "La description est obligatoire !",
        userRequired: "L'utilisateur doit être sélectionné !",
        storeIdRequired: "L'ID du magasin est obligatoire !",
        storeIdNotFound: "ID du magasin introuvable !",
        internalError: "Erreur système lors de la création du nouvel e-mail !",
        subjectAlreadyExists: "Le sujet existe déjà !" // Thêm thông báo mới
      };
    case "ja":
      return {
        userIdNotFound: "ユーザーIDが見つかりません！",
        permissionDenied: "新しいメールを作成する権限がありません！",
        subjectRequired: "件名は必須です！",
        descriptionRequired: "説明は必須です！",
        userRequired: "ユーザーを選択する必要があります！",
        storeIdRequired: "店舗IDは必須です！",
        storeIdNotFound: "店舗IDが見つかりません！",
        internalError: "新しいメールを作成中にシステムエラーが発生しました！",
        subjectAlreadyExists: "件名はすでに存在します！" // Thêm thông báo mới
      };
    default: // English
      return {
        userIdNotFound: "User id not found!",
        permissionDenied: "You do not have permission to create a new sent Email!",
        subjectRequired: "Subject is required!",
        descriptionRequired: "Description is required!",
        userRequired: "You need to select a user!",
        storeIdRequired: "Store id is required!",
        storeIdNotFound: "Store id not found!",
        internalError: "Internal error when creating new sent Email!",
        subjectAlreadyExists: "Subject already exists!" // Thêm thông báo mới
      };
  }
};


export const translateSentEmailGet = (language: string) => {
  switch (language) {
    case "vi":
      return {
        storeIdRequired: "Store id là bắt buộc!",
        userIdNotFound: "Không tìm thấy user id!",
        permissionDenied: "Bạn không có quyền xem sent Email!",
        internalError: "Lỗi hệ thống khi lấy thông tin sent Email!",
      };
    case "en": // English
      return {
        storeIdRequired: "Store id is required!",
        userIdNotFound: "User id not found!",
        permissionDenied: "You do not have permission to view sent Email!",
        internalError: "Internal error when getting sent Email information!",
      };
    case "zh":
      return {
        storeIdRequired: "商店 ID 是必需的！",
        userIdNotFound: "未找到用户 ID！",
        permissionDenied: "您无权查看邮件！",
        internalError: "获取邮件信息时系统错误！",
      };
    case "fr":
      return {
        storeIdRequired: "L'ID du magasin est obligatoire !",
        userIdNotFound: "ID utilisateur introuvable !",
        permissionDenied: "Vous n'avez pas la permission de voir l'e-mail !",
        internalError:
          "Erreur système lors de la récupération des informations de l'e-mail !",
      };
    case "ja":
      return {
        storeIdRequired: "店舗IDは必須です！",
        userIdNotFound: "ユーザーIDが見つかりません！",
        permissionDenied: "メールを見る権限がありません！",
        internalError: "メール情報を取得中にシステムエラーが発生しました！",
      };
    default: // English
      return {
        storeIdRequired: "Store id is required!",
        userIdNotFound: "User id not found!",
        permissionDenied: "You do not have permission to view sent Email!",
        internalError: "Internal error when getting sent Email information!",
      };
  }
};

export const translateSentEmailDelete = (language: string) => {
  switch (language) {
    case "vi":
      return {
        userNotFound: "Không tìm thấy user!",
        permissionDenied: "Bạn không có quyền xem sent Email!",
        idsArrayNotEmpty: "Mảng IDs không được trống!",
        storeIdNotFound: "Không tìm thấy store id!",
        deleteSuccess: "Xóa thành công!",
        internalError: "Lỗi hệ thống khi xóa sent Email user.",
      };
    case "en": // English
      return {
        userNotFound: "User not found!",
        permissionDenied: "You do not have permission to view sent Email!",
        idsArrayNotEmpty: "IDs array cannot be empty!",
        storeIdNotFound: "Store id not found!",
        deleteSuccess: "Deleted successfully!",
        internalError: "Internal error when deleting sent Email user.",
      };
    case "zh":
      return {
        userNotFound: "未找到用户！",
        permissionDenied: "您无权查看发送的电子邮件！",
        idsArrayNotEmpty: "ID数组不能为空！",
        storeIdNotFound: "未找到商店ID！",
        deleteSuccess: "删除成功！",
        internalError: "删除发送的电子邮件用户时发生系统错误。",
      };
    case "fr":
      return {
        userNotFound: "Utilisateur introuvable !",
        permissionDenied:
          "Vous n'avez pas la permission de voir l'email envoyé !",
        idsArrayNotEmpty: "Le tableau des IDs ne doit pas être vide !",
        storeIdNotFound: "ID du magasin introuvable !",
        deleteSuccess: "Suppression réussie !",
        internalError:
          "Erreur système lors de la suppression de l'email envoyé utilisateur.",
      };
    case "ja":
      return {
        userNotFound: "ユーザーが見つかりません！",
        permissionDenied: "送信されたメールを表示する権限がありません！",
        idsArrayNotEmpty: "IDの配列は空であってはいけません！",
        storeIdNotFound: "店舗IDが見つかりません！",
        deleteSuccess: "削除に成功しました！",
        internalError:
          "送信されたメールのユーザー削除中にシステムエラーが発生しました。",
      };
    default: // Tiếng Anh
      return {
        userNotFound: "User not found!",
        permissionDenied: "You do not have permission to view sent Email!",
        idsArrayNotEmpty: "IDs array cannot be empty!",
        storeIdNotFound: "Store id not found!",
        deleteSuccess: "Deleted successfully!",
        internalError: "Internal error when deleting sent Email user.",
      };
  }
};

export const translateSentEmailIdGet = (language: string) => {
  switch (language) {
    case "vi": // Tiếng Việt
      return {
        sentMailUserIdRequired: "Sentmailuser id là bắt buộc!",
        userIdNotFound: "Không tìm thấy user id!",
        permissionDenied: "Bạn không có quyền xem sent Email!",
        internalError: "Lỗi hệ thống khi lấy sentmailUser.",
      };
    case "en": // English
      return {
        sentMailUserIdRequired: "Sentmailuser id is required!",
        userIdNotFound: "User id not found!",
        permissionDenied: "You do not have permission to view sent Email!",
        internalError: "Internal error when getting sentmailUser.",
      };
    case "zh": // Tiếng Trung
      return {
        sentMailUserIdRequired: "Sentmailuser ID 是必需的！",
        userIdNotFound: "未找到用户 ID！",
        permissionDenied: "您无权查看发送的电子邮件！",
        internalError: "获取 sentmailUser 时系统错误！",
      };
    case "fr": // Tiếng Pháp
      return {
        sentMailUserIdRequired: "Sentmailuser ID est requis !",
        userIdNotFound: "ID utilisateur introuvable !",
        permissionDenied:
          "Vous n'avez pas la permission de voir l'email envoyé !",
        internalError:
          "Erreur système lors de la récupération du sentmailUser !",
      };
    case "ja": // Tiếng Nhật
      return {
        sentMailUserIdRequired: "Sentmailuser ID は必須です！",
        userIdNotFound: "ユーザーIDが見つかりません！",
        permissionDenied: "送信されたメールを表示する権限がありません！",
        internalError: "sentmailUser の取得中にシステムエラーが発生しました！",
      };
    default: // English
      return {
        sentMailUserIdRequired: "Sentmailuser id is required!",
        userIdNotFound: "User id not found!",
        permissionDenied: "You do not have permission to view sent Email!",
        internalError: "Internal error when getting sentmailUser.",
      };
  }
};

export const translateSentEmailIdDelete = (language: string) => {
  switch (language) {
    case "vi": // Tiếng Việt
      return {
        userIdNotFound: "Không tìm thấy user id!",
        permissionDenied: "Bạn không có quyền xóa sent Email!",
        sentMailUserIdRequired: "Sentmailuser id là bắt buộc!",
        storeIdNotFound: "Không tìm thấy store id!",
        rolePermissionDenied: "Vai trò hiện tại của bạn không được quyền!",
        internalError: "Lỗi hệ thống khi xóa sentmailUser.",
      };
    case "en": // English
      return {
        userIdNotFound: "User id not found!",
        permissionDenied: "You do not have permission to delete sent Email!",
        sentMailUserIdRequired: "Sentmailuser id is required!",
        storeIdNotFound: "Store id not found!",
        rolePermissionDenied:
          "Your current role does not have the required permission!",
        internalError: "Internal error when deleting sentmailUser.",
      };
    case "zh": // Tiếng Trung
      return {
        userIdNotFound: "未找到用户 ID！",
        permissionDenied: "您无权删除发送的电子邮件！",
        sentMailUserIdRequired: "Sentmailuser ID 是必需的！",
        storeIdNotFound: "未找到商店 ID！",
        rolePermissionDenied: "您当前的角色没有权限！",
        internalError: "删除 sentmailUser 时系统错误！",
      };
    case "fr": // Tiếng Pháp
      return {
        userIdNotFound: "ID utilisateur introuvable !",
        permissionDenied:
          "Vous n'avez pas la permission de supprimer l'email envoyé !",
        sentMailUserIdRequired: "Sentmailuser ID est requis !",
        storeIdNotFound: "ID du magasin introuvable !",
        rolePermissionDenied:
          "Votre rôle actuel n'a pas les autorisations requises !",
        internalError:
          "Erreur système lors de la suppression du sentmailUser !",
      };
    case "ja": // Tiếng Nhật
      return {
        userIdNotFound: "ユーザーIDが見つかりません！",
        permissionDenied: "送信されたメールを削除する権限がありません！",
        sentMailUserIdRequired: "Sentmailuser ID は必須です！",
        storeIdNotFound: "店舗IDが見つかりません！",
        rolePermissionDenied: "現在の役割では必要な権限がありません！",
        internalError: "sentmailUser を削除中にシステムエラーが発生しました！",
      };
    default: // English
      return {
        userIdNotFound: "User id not found!",
        permissionDenied: "You do not have permission to delete sent Email!",
        sentMailUserIdRequired: "Sentmailuser id is required!",
        storeIdNotFound: "Store id not found!",
        rolePermissionDenied:
          "Your current role does not have the required permission!",
        internalError: "Internal error when deleting sentmailUser.",
      };
  }
};

export const translateSentEmailIdPatch = (language: string) => {
  switch (language) {
    case "vi": // Tiếng Việt
      return {
        userIdNotFound: "Không tìm thấy user id!",
        permissionDenied: "Bạn không có quyền cập nhật sent Email!",
        subjectRequired: "Tiêu đề là bắt buộc!",
        descriptionRequired: "Mô tả là bắt buộc!",
        userRequired: "Yêu cầu chọn người dùng!",
        sentMailUserIdRequired: "Sentmailuser id là bắt buộc!",
        storeIdNotFound: "Không tìm thấy store id!",
        internalError: "Lỗi hệ thống khi cập nhật sentmailUser.",
        subjectAlreadyExists: "Tiêu đề đã tồn tại!", // Thêm thông báo mới
        sentEmailUserNotFound: "Không tìm thấy sent Email user!" // Thêm thông báo mới
      };
    case "en": // English
      return {
        userIdNotFound: "User id not found!",
        permissionDenied: "You do not have permission to update sent Email!",
        subjectRequired: "Subject is required!",
        descriptionRequired: "Description is required!",
        userRequired: "You need to select a user!",
        sentMailUserIdRequired: "Sentmailuser id is required!",
        storeIdNotFound: "Store id not found!",
        internalError: "Internal error when updating sentmailUser.",
        subjectAlreadyExists: "Subject already exists!", // Thêm thông báo mới
        sentEmailUserNotFound: "Sent Email user not found!" // Thêm thông báo mới
      };
    case "zh": // Tiếng Trung
      return {
        userIdNotFound: "未找到用户 ID！",
        permissionDenied: "您无权更新发送的电子邮件！",
        subjectRequired: "标题是必需的！",
        descriptionRequired: "描述是必需的！",
        userRequired: "需要选择用户！",
        sentMailUserIdRequired: "Sentmailuser ID 是必需的！",
        storeIdNotFound: "未找到商店 ID！",
        internalError: "更新 sentmailUser 时系统错误！",
        subjectAlreadyExists: "标题已存在！", // Thêm thông báo mới
        sentEmailUserNotFound: "未找到发送邮件用户！" // Thêm thông báo mới
      };
    case "fr": // Tiếng Pháp
      return {
        userIdNotFound: "ID utilisateur introuvable !",
        permissionDenied: "Vous n'avez pas la permission de mettre à jour l'email envoyé !",
        subjectRequired: "Le sujet est obligatoire !",
        descriptionRequired: "La description est obligatoire !",
        userRequired: "L'utilisateur doit être sélectionné !",
        sentMailUserIdRequired: "Sentmailuser ID est requis !",
        storeIdNotFound: "ID du magasin introuvable !",
        internalError: "Erreur système lors de la mise à jour du sentmailUser !",
        subjectAlreadyExists: "Le sujet existe déjà !", // Thêm thông báo mới
        sentEmailUserNotFound: "Utilisateur du sent Email introuvable !" // Thêm thông báo mới
      };
    case "ja": // Tiếng Nhật
      return {
        userIdNotFound: "ユーザーIDが見つかりません！",
        permissionDenied: "送信されたメールを更新する権限がありません！",
        subjectRequired: "件名は必須です！",
        descriptionRequired: "説明は必須です！",
        userRequired: "ユーザーを選択する必要があります！",
        sentMailUserIdRequired: "Sentmailuser ID は必須です！",
        storeIdNotFound: "店舗IDが見つかりません！",
        internalError: "sentmailUser の更新中にシステムエラーが発生しました！",
        subjectAlreadyExists: "件名はすでに存在します！", // Thêm thông báo mới
        sentEmailUserNotFound: "送信されたメールのユーザーが見つかりません！" // Thêm thông báo mới
      };
    default: // English
      return {
        userIdNotFound: "User id not found!",
        permissionDenied: "You do not have permission to update sent Email!",
        subjectRequired: "Subject is required!",
        descriptionRequired: "Description is required!",
        userRequired: "You need to select a user!",
        sentMailUserIdRequired: "Sentmailuser id is required!",
        storeIdNotFound: "Store id not found!",
        internalError: "Internal error when updating sentmailUser.",
        subjectAlreadyExists: "Subject already exists!", // Thêm thông báo mới
        sentEmailUserNotFound: "Sent Email user not found!" // Thêm thông báo mới
      };
  }
};


export const translateSentEmailIdPost = (language: string) => {
  switch (language) {
    case "vi": // Tiếng Việt
      return {
        userIdNotFound: "Không tìm thấy id người dùng!",
        permissionDenied: "Bạn không có quyền cập nhật sent Email!",
        userNotFound: "Không tìm thấy người dùng để gửi!",
        sentMailUserIdRequired: "Sentmailuser Id là bắt buộc!",
        storeIdNotFound: "Không tìm thấy store id!",
        errorUpdating: "Lỗi cập nhật sentEmailUser",
        internalError: "Lỗi hệ thống khi cập nhật sentmailUser.",
      };
    case "en": // English
      return {
        userIdNotFound: "User id not found!",
        permissionDenied: "You do not have permission to update sent Email!",
        userNotFound: "User not found to send!",
        sentMailUserIdRequired: "Sentmailuser Id is required!",
        storeIdNotFound: "Store id not found!",
        errorUpdating: "Error updating sentEmailUser",
        internalError: "Internal error when updating sentmailUser.",
      };
    case "zh": // Tiếng Trung
      return {
        userIdNotFound: "未找到用户ID！",
        permissionDenied: "您无权更新发送的电子邮件！",
        userNotFound: "未找到用户发送！",
        sentMailUserIdRequired: "Sentmailuser Id 是必需的！",
        storeIdNotFound: "未找到商店ID！",
        errorUpdating: "更新 sentEmailUser 时出错",
        internalError: "更新 sentmailUser 时系统错误！",
      };
    case "fr": // Tiếng Pháp
      return {
        userIdNotFound: "ID utilisateur introuvable !",
        permissionDenied:
          "Vous n'avez pas la permission de mettre à jour l'email envoyé !",
        userNotFound: "Utilisateur non trouvé pour envoyer !",
        sentMailUserIdRequired: "Sentmailuser Id est requis !",
        storeIdNotFound: "ID du magasin introuvable !",
        errorUpdating: "Erreur lors de la mise à jour de sentEmailUser",
        internalError:
          "Erreur système lors de la mise à jour de sentmailUser !",
      };
    case "ja": // Tiếng Nhật
      return {
        userIdNotFound: "ユーザーIDが見つかりません！",
        permissionDenied: "送信されたメールを更新する権限がありません！",
        userNotFound: "送信するユーザーが見つかりません！",
        sentMailUserIdRequired: "Sentmailuser Id は必須です！",
        storeIdNotFound: "店舗IDが見つかりません！",
        errorUpdating: "sentEmailUser 更新時にエラーが発生しました",
        internalError: "sentmailUser 更新中にシステムエラーが発生しました！",
      };
    default: // English
      return {
        userIdNotFound: "User id not found!",
        permissionDenied: "You do not have permission to update sent Email!",
        userNotFound: "User not found to send!",
        sentMailUserIdRequired: "Sentmailuser Id is required!",
        storeIdNotFound: "Store id not found!",
        errorUpdating: "Error updating sentEmailUser",
        internalError: "Internal error when updating sentmailUser.",
      };
  }
};

export const translateSettingUserGet = (language: string) => {
  switch (language) {
    case "vi": // Tiếng Việt
      return {
        userIdNotFound: "Không tìm thấy user id!",
        permissionDenied: "Bạn không có quyền xem settinguser!",
        internalError: "Lỗi cục bộ khi get!",
      };
    case "en": // English
      return {
        userIdNotFound: "User id not found!",
        permissionDenied: "You do not have permission to view settinguser!",
        internalError: "Local error when getting!",
      };
    case "zh": // Tiếng Trung
      return {
        userIdNotFound: "未找到用户ID！",
        permissionDenied: "您无权查看 settinguser！",
        internalError: "获取时本地错误！",
      };
    case "fr": // Tiếng Pháp
      return {
        userIdNotFound: "ID utilisateur introuvable !",
        permissionDenied: "Vous n'avez pas la permission de voir settinguser !",
        internalError: "Erreur locale lors de la récupération !",
      };
    case "ja": // Tiếng Nhật
      return {
        userIdNotFound: "ユーザーIDが見つかりません！",
        permissionDenied: "settinguser を表示する権限がありません！",
        internalError: "取得時にローカルエラーが発生しました！",
      };
    default: // English
      return {
        userIdNotFound: "User id not found!",
        permissionDenied: "You do not have permission to view settinguser!",
        internalError: "Local error when getting!",
      };
  }
};

export const translateSettingUserPatch = (language: string) => {
  switch (language) {
    case "vi": // Tiếng Việt
      return {
        userIdNotFound: "Không tìm thấy user id!",
        permissionDenied: "Bạn không có quyền cập nhật settinguser!",
        adminRequired: "Yêu cầu cần có 1 ADMIN!",
        userBanned: "Người dùng này đã bị ban vĩnh viễn!",
        internalError: "Lỗi cục bộ khi thay đổi user!",
      };
    case "en": // English
      return {
        userIdNotFound: "User id not found!",
        permissionDenied: "You do not have permission to update settinguser!",
        adminRequired: "An ADMIN is required!",
        userBanned: "This user has been permanently banned!",
        internalError: "Local error when updating user!",
      };
    case "zh": // Tiếng Trung
      return {
        userIdNotFound: "未找到用户ID！",
        permissionDenied: "您无权更新 settinguser！",
        adminRequired: "需要一个管理员！",
        userBanned: "该用户已被永久禁用！",
        internalError: "更改用户时本地错误！",
      };
    case "fr": // Tiếng Pháp
      return {
        userIdNotFound: "ID utilisateur introuvable !",
        permissionDenied:
          "Vous n'avez pas la permission de mettre à jour settinguser !",
        adminRequired: "Un ADMIN est requis !",
        userBanned: "Cet utilisateur a été banni définitivement !",
        internalError:
          "Erreur locale lors de la modification de l'utilisateur !",
      };
    case "ja": // Tiếng Nhật
      return {
        userIdNotFound: "ユーザーIDが見つかりません！",
        permissionDenied: "settinguser を更新する権限がありません！",
        adminRequired: "ADMINが必要です！",
        userBanned: "このユーザーは永久に禁止されています！",
        internalError: "ユーザー変更中にローカルエラーが発生しました！",
      };
    default: // English
      return {
        userIdNotFound: "User id not found!",
        permissionDenied: "You do not have permission to update settinguser!",
        adminRequired: "An ADMIN is required!",
        userBanned: "This user has been permanently banned!",
        internalError: "Local error when updating user!",
      };
  }
};

export const translateSettingUserDelete = (language: string) => {
  switch (language) {
    case "vi": // Tiếng Việt
      return {
        userIdNotFound: "Không tìm thấy user id!",
        permissionDenied: "Bạn không có quyền cập nhật settinguser!",
        userBanned: "Người dùng này đã bị ban vĩnh viễn!",
        adminRequired: "Yêu cầu cần có 1 ADMIN!",
        selfBanError: "Bạn không thể tự ban bản thân!",
        internalError: "Lỗi cục bộ khi xóa user!",
      };
    case "en": // English
      return {
        userIdNotFound: "User id not found!",
        permissionDenied: "You do not have permission to update settinguser!",
        userBanned: "This user has been permanently banned!",
        adminRequired: "An ADMIN is required!",
        selfBanError: "You cannot ban yourself!",
        internalError: "Local error when deleting user!",
      };
    case "zh": // Tiếng Trung
      return {
        userIdNotFound: "未找到用户ID！",
        permissionDenied: "您无权更新 settinguser！",
        userBanned: "该用户已被永久禁用！",
        adminRequired: "需要一个管理员！",
        selfBanError: "您不能自我禁用！",
        internalError: "删除用户时本地错误！",
      };
    case "fr": // Tiếng Pháp
      return {
        userIdNotFound: "ID utilisateur introuvable !",
        permissionDenied:
          "Vous n'avez pas la permission de mettre à jour settinguser !",
        userBanned: "Cet utilisateur a été banni définitivement !",
        adminRequired: "Un ADMIN est requis !",
        selfBanError: "Vous ne pouvez pas vous interdire vous-même !",
        internalError:
          "Erreur locale lors de la suppression de l'utilisateur !",
      };
    case "ja": // Tiếng Nhật
      return {
        userIdNotFound: "ユーザーIDが見つかりません！",
        permissionDenied: "settinguser を更新する権限がありません！",
        userBanned: "このユーザーは永久に禁止されています！",
        adminRequired: "ADMINが必要です！",
        selfBanError: "自分を禁止することはできません！",
        internalError: "ユーザー削除中にローカルエラーが発生しました！",
      };
    default: // English
      return {
        userIdNotFound: "User id not found!",
        permissionDenied: "You do not have permission to update settinguser!",
        userBanned: "This user has been permanently banned!",
        adminRequired: "An ADMIN is required!",
        selfBanError: "You cannot ban yourself!",
        internalError: "Local error when deleting user!",
      };
  }
};

export const translateSettingUserBan = (language: string) => {
  switch (language) {
    case "vi": // Tiếng Việt
      return {
        userIdNotFound: "Không tìm thấy user id!",
        permissionDenied: "Bạn không có quyền cập nhật settinguser!",
        selfBanError: "Không thể tự ban chính mình!",
        userBanned: "Người dùng này đã bị ban!",
        selfBanProhibited: "Bạn không thể tự ban bản thân!",
        userNotFound: "Không tìm thấy user id!",
        userPermanentlyBanned: "Người dùng nay đã bị ban vĩnh viễn!",
        internalError: "Lỗi cục bộ khi ban!",
      };
    case "en": // English
      return {
        userIdNotFound: "User id not found!",
        permissionDenied: "You do not have permission to update settinguser!",
        selfBanError: "You cannot ban yourself!",
        userBanned: "This user has been banned!",
        selfBanProhibited: "You cannot ban yourself!",
        userNotFound: "User not found!",
        userPermanentlyBanned: "This user has been permanently banned!",
        internalError: "Internal error when banning user!",
      };
    case "zh": // Tiếng Trung
      return {
        userIdNotFound: "未找到用户ID！",
        permissionDenied: "您无权更新 settinguser！",
        selfBanError: "无法自我禁用！",
        userBanned: "该用户已被禁用！",
        selfBanProhibited: "您不能自我禁用！",
        userNotFound: "未找到用户！",
        userPermanentlyBanned: "该用户已被永久禁用！",
        internalError: "禁止用户时发生本地错误！",
      };
    case "fr": // Tiếng Pháp
      return {
        userIdNotFound: "ID utilisateur introuvable !",
        permissionDenied:
          "Vous n'avez pas la permission de mettre à jour settinguser !",
        selfBanError: "Vous ne pouvez pas vous interdire vous-même !",
        userBanned: "Cet utilisateur a été banni !",
        selfBanProhibited: "Vous ne pouvez pas vous interdire vous-même !",
        userNotFound: "Utilisateur introuvable !",
        userPermanentlyBanned:
          "Cet utilisateur a été banni de façon permanente !",
        internalError: "Erreur locale lors du bannissement de l'utilisateur !",
      };
    case "ja": // Tiếng Nhật
      return {
        userIdNotFound: "ユーザーIDが見つかりません！",
        permissionDenied: "settinguser を更新する権限がありません！",
        selfBanError: "自分を禁止することはできません！",
        userBanned: "このユーザーは禁止されています！",
        selfBanProhibited: "自分を禁止することはできません！",
        userNotFound: "ユーザーが見つかりません！",
        userPermanentlyBanned: "このユーザーは永久に禁止されています！",
        internalError: "ユーザーを禁止する際にローカルエラーが発生しました！",
      };
    default: // English
      return {
        userIdNotFound: "User id not found!",
        permissionDenied: "You do not have permission to update settinguser!",
        selfBanError: "You cannot ban yourself!",
        userBanned: "This user has been banned!",
        selfBanProhibited: "You cannot ban yourself!",
        userNotFound: "User not found!",
        userPermanentlyBanned: "This user has been permanently banned!",
        internalError: "Internal error when banning user!",
      };
  }
};

export const translateSettingUserIsCitizen = (language: string) => {
  switch (language) {
    case "vi": // Tiếng Việt
      return {
        userIdNotFound: "Không tìm thấy user id!",
        permissionDenied: "Bạn không có quyền cập nhật settinguser!",
        internalError: "Lỗi cục bộ khi xác thực!",
      };
    case "en": // English
      return {
        userIdNotFound: "User id not found!",
        permissionDenied: "You do not have permission to update settinguser!",
        internalError: "Internal error during authentication!",
      };
    case "zh": // Tiếng Trung
      return {
        userIdNotFound: "未找到用户ID！",
        permissionDenied: "您无权更新 settinguser！",
        internalError: "验证时发生本地错误！",
      };
    case "fr": // Tiếng Pháp
      return {
        userIdNotFound: "ID utilisateur introuvable !",
        permissionDenied:
          "Vous n'avez pas la permission de mettre à jour settinguser !",
        internalError: "Erreur locale lors de l'authentification !",
      };
    case "ja": // Tiếng Nhật
      return {
        userIdNotFound: "ユーザーIDが見つかりません！",
        permissionDenied: "settinguser を更新する権限がありません！",
        internalError: "認証中にローカルエラーが発生しました！",
      };
    default: // English
      return {
        userIdNotFound: "User id not found!",
        permissionDenied: "You do not have permission to update settinguser!",
        internalError: "Internal error during authentication!",
      };
  }
};

export const translateSettingUserUnban = (language: string) => {
  switch (language) {
    case "vi": // Tiếng Việt
      return {
        userIdNotFound: "Không tìm thấy user id!",
        permissionDenied: "Bạn không có quyền cập nhật settinguser!",
        userNotBanned: "Người dùng này hiện tại không bị ban!",
        cannotUnbanSelf: "Bạn không thể unban bản thân!",
        internalError: "Lỗi cục bộ khi unban!",
      };
    case "en": // English
      return {
        userIdNotFound: "User id not found!",
        permissionDenied: "You do not have permission to update settinguser!",
        userNotBanned: "This user is not currently banned!",
        cannotUnbanSelf: "You cannot unban yourself!",
        internalError: "Internal error during unban!",
      };
    case "zh": // Tiếng Trung
      return {
        userIdNotFound: "未找到用户ID！",
        permissionDenied: "您无权更新 settinguser！",
        userNotBanned: "此用户当前未被禁用！",
        cannotUnbanSelf: "您不能取消禁用自己！",
        internalError: "解除禁令时发生本地错误！",
      };
    case "fr": // Tiếng Pháp
      return {
        userIdNotFound: "ID utilisateur introuvable !",
        permissionDenied:
          "Vous n'avez pas la permission de mettre à jour settinguser !",
        userNotBanned: "Cet utilisateur n'est actuellement pas banni !",
        cannotUnbanSelf: "Vous ne pouvez pas vous débannir vous-même !",
        internalError: "Erreur locale lors de l'annulation du bannissement !",
      };
    case "ja": // Tiếng Nhật
      return {
        userIdNotFound: "ユーザーIDが見つかりません！",
        permissionDenied: "settinguser を更新する権限がありません！",
        userNotBanned: "このユーザーは現在バンされていません！",
        cannotUnbanSelf: "自分自身をアンバンすることはできません！",
        internalError: "アンバン中にローカルエラーが発生しました！",
      };
    default: // English
      return {
        userIdNotFound: "User id not found!",
        permissionDenied: "You do not have permission to update settinguser!",
        userNotBanned: "This user is not currently banned!",
        cannotUnbanSelf: "You cannot unban yourself!",
        internalError: "Internal error during unban!",
      };
  }
};

export const translateShippingRatePost = (language: string) => {
  switch (language) {
    case "vi": // Tiếng Việt
      return {
        userIdNotFound: "Không tìm thấy user id!",
        permissionDenied: "Bạn không có quyền tạo mới shipping rate!",
        nameRequired: "Name là bắt buộc!",
        storeIdRequired: "Store id là bắt buộc!",
        storeIdNotFound: "Không tìm thấy store id!",
        internalError: "Lỗi hệ thống khi tạo mới shipping rate!",
        shippingRateAlreadyExists: "Shipping rate đã tồn tại!" // Thêm thông báo mới
      };
    case "en": // English
      return {
        userIdNotFound: "User id not found!",
        permissionDenied: "You do not have permission to create a new shipping rate!",
        nameRequired: "Name is required!",
        storeIdRequired: "Store id is required!",
        storeIdNotFound: "Store id not found!",
        internalError: "Internal error when creating new shipping rate!",
        shippingRateAlreadyExists: "Shipping rate already exists!" // Thêm thông báo mới
      };
    case "zh": // Tiếng Trung
      return {
        userIdNotFound: "未找到用户 ID！",
        permissionDenied: "您无权创建新的运输费率！",
        nameRequired: "名称是必需的！",
        storeIdRequired: "商店 ID 是必需的！",
        storeIdNotFound: "未找到商店 ID！",
        internalError: "创建运输费率时系统错误！",
        shippingRateAlreadyExists: "运输费率已存在！" // Thêm thông báo mới
      };
    case "fr": // Tiếng Pháp
      return {
        userIdNotFound: "ID utilisateur introuvable !",
        permissionDenied: "Vous n'avez pas la permission de créer un nouveau tarif d'expédition !",
        nameRequired: "Le nom est obligatoire !",
        storeIdRequired: "L'ID du magasin est obligatoire !",
        storeIdNotFound: "ID du magasin introuvable !",
        internalError: "Erreur système lors de la création du tarif d'expédition !",
        shippingRateAlreadyExists: "Le tarif d'expédition existe déjà !" // Thêm thông báo mới
      };
    case "ja": // Tiếng Nhật
      return {
        userIdNotFound: "ユーザーIDが見つかりません！",
        permissionDenied: "新しい配送料金を作成する権限がありません！",
        nameRequired: "名前は必須です！",
        storeIdRequired: "店舗IDは必須です！",
        storeIdNotFound: "店舗IDが見つかりません！",
        internalError: "配送料金作成中にシステムエラーが発生しました！",
        shippingRateAlreadyExists: "配送料金はすでに存在します！" // Thêm thông báo mới
      };
    default: // English
      return {
        userIdNotFound: "User id not found!",
        permissionDenied: "You do not have permission to create a new shipping rate!",
        nameRequired: "Name is required!",
        storeIdRequired: "Store id is required!",
        storeIdNotFound: "Store id not found!",
        internalError: "Internal error when creating new shipping rate!",
        shippingRateAlreadyExists: "Shipping rate already exists!" // Thêm thông báo mới
      };
  }
};


export const translateShippingRateGet = (language: string) => {
  switch (language) {
    case "vi": // Tiếng Việt
      return {
        storeIdRequired: "Store id là bắt buộc!",
        internalError: "Lỗi hệ thống khi lấy shipping rates!",
      };
    case "en": // English
      return {
        storeIdRequired: "Store id is required!",
        internalError: "Internal error when getting shipping rates!",
      };
    case "zh": // Tiếng Trung
      return {
        storeIdRequired: "商店 ID 是必需的！",
        internalError: "获取运输费率时系统错误！",
      };
    case "fr": // Tiếng Pháp
      return {
        storeIdRequired: "L'ID du magasin est obligatoire !",
        internalError:
          "Erreur système lors de la récupération des tarifs d'expédition !",
      };
    case "ja": // Tiếng Nhật
      return {
        storeIdRequired: "店舗IDは必須です！",
        internalError: "配送料金取得中にシステムエラーが発生しました！",
      };
    default: // English
      return {
        storeIdRequired: "Store id is required!",
        internalError: "Internal error when getting shipping rates!",
      };
  }
};

export const translateShippingRateDelete = (language: string) => {
  switch (language) {
    case "vi": // Tiếng Việt
      return {
        userNotFound: "Không tìm thấy user!",
        permissionDenied: "Bạn không có quyền xóa shipping rate!",
        idsArrayNotEmpty: "Mảng IDs không được trống!",
        storeIdNotFound: "Không tìm thấy store id!",
        deleteSuccess: "Xóa thành công!",
        internalError: "Lỗi hệ thống khi xóa category.",
      };
    case "en": // English
      return {
        userNotFound: "User not found!",
        permissionDenied: "You do not have permission to delete shipping rate!",
        idsArrayNotEmpty: "IDs array cannot be empty!",
        storeIdNotFound: "Store id not found!",
        deleteSuccess: "Deleted successfully!",
        internalError: "Internal error when deleting category.",
      };
    case "zh": // Tiếng Trung
      return {
        userNotFound: "未找到用户！",
        permissionDenied: "您无权删除运输费率！",
        idsArrayNotEmpty: "ID数组不能为空！",
        storeIdNotFound: "未找到商店ID！",
        deleteSuccess: "删除成功！",
        internalError: "删除分类时发生系统错误。",
      };
    case "fr": // Tiếng Pháp
      return {
        userNotFound: "Utilisateur introuvable !",
        permissionDenied:
          "Vous n'avez pas la permission de supprimer le tarif d'expédition !",
        idsArrayNotEmpty: "Le tableau des IDs ne doit pas être vide !",
        storeIdNotFound: "ID du magasin introuvable !",
        deleteSuccess: "Suppression réussie !",
        internalError: "Erreur système lors de la suppression de la catégorie.",
      };
    case "ja": // Tiếng Nhật
      return {
        userNotFound: "ユーザーが見つかりません！",
        permissionDenied: "配送料金を削除する権限がありません！",
        idsArrayNotEmpty: "IDの配列は空であってはいけません！",
        storeIdNotFound: "店舗IDが見つかりません！",
        deleteSuccess: "削除に成功しました！",
        internalError: "カテゴリー削除中にシステムエラーが発生しました。",
      };
    default: // English
      return {
        userNotFound: "User not found!",
        permissionDenied: "You do not have permission to delete shipping rate!",
        idsArrayNotEmpty: "IDs array cannot be empty!",
        storeIdNotFound: "Store id not found!",
        deleteSuccess: "Deleted successfully!",
        internalError: "Internal error when deleting category.",
      };
  }
};

export const translateShippingRateIdGet = (language: string) => {
  switch (language) {
    case "vi": // Tiếng Việt
      return {
        shippingRateIdRequired: "Shipping Rates id là bắt buộc!",
        userIdNotFound: "Không tìm thấy user id!",
        permissionDenied: "Bạn không có quyền xem shipping rate!",
        internalError: "Lỗi hệ thống khi lấy thông tin shippingrates.",
      };
    case "en": // English
      return {
        shippingRateIdRequired: "Shipping Rates id is required!",
        userIdNotFound: "User id not found!",
        permissionDenied: "You do not have permission to view shipping rate!",
        internalError: "Internal error when getting shippingrates.",
      };
    case "zh": // Tiếng Trung
      return {
        shippingRateIdRequired: "运输费率ID是必需的！",
        userIdNotFound: "未找到用户ID！",
        permissionDenied: "您无权查看运输费率！",
        internalError: "获取运输费率信息时系统错误！",
      };
    case "fr": // Tiếng Pháp
      return {
        shippingRateIdRequired: "L'ID du tarif d'expédition est requis !",
        userIdNotFound: "ID utilisateur introuvable !",
        permissionDenied:
          "Vous n'avez pas la permission de voir le tarif d'expédition !",
        internalError:
          "Erreur système lors de la récupération des informations des tarifs d'expédition !",
      };
    case "ja": // Tiếng Nhật
      return {
        shippingRateIdRequired: "配送料金IDは必須です！",
        userIdNotFound: "ユーザーIDが見つかりません！",
        permissionDenied: "配送料金を表示する権限がありません！",
        internalError: "配送料金情報を取得中にシステムエラーが発生しました！",
      };
    default: // English
      return {
        shippingRateIdRequired: "Shipping Rates id is required!",
        userIdNotFound: "User id not found!",
        permissionDenied: "You do not have permission to view shipping rate!",
        internalError: "Internal error when getting shippingrates.",
      };
  }
};

export const translateShippingRateIdDelete = (language: string) => {
  switch (language) {
    case "vi": // Tiếng Việt
      return {
        userIdNotFound: "Không tìm thấy user id!",
        permissionDenied: "Bạn không có quyền xóa shipping rate!",
        shippingRateIdRequired: "Shippingrate id là bắt buộc!",
        storeIdNotFound: "Không tìm thấy store id!",
        internalError: "Lỗi hệ thống khi xóa shippingRates.",
      };
    case "en": // English
      return {
        userIdNotFound: "User id not found!",
        permissionDenied: "You do not have permission to delete shipping rate!",
        shippingRateIdRequired: "Shippingrate id is required!",
        storeIdNotFound: "Store id not found!",
        internalError: "Internal error when deleting shippingRates.",
      };
    case "zh": // Tiếng Trung
      return {
        userIdNotFound: "未找到用户ID！",
        permissionDenied: "您无权删除运输费率！",
        shippingRateIdRequired: "运输费率ID是必需的！",
        storeIdNotFound: "未找到商店ID！",
        internalError: "删除运输费率时系统错误！",
      };
    case "fr": // Tiếng Pháp
      return {
        userIdNotFound: "ID utilisateur introuvable !",
        permissionDenied:
          "Vous n'avez pas la permission de supprimer le tarif d'expédition !",
        shippingRateIdRequired: "L'ID du tarif d'expédition est requis !",
        storeIdNotFound: "ID du magasin introuvable !",
        internalError:
          "Erreur système lors de la suppression des tarifs d'expédition !",
      };
    case "ja": // Tiếng Nhật
      return {
        userIdNotFound: "ユーザーIDが見つかりません！",
        permissionDenied: "配送料金を削除する権限がありません！",
        shippingRateIdRequired: "配送料金IDは必須です！",
        storeIdNotFound: "店舗IDが見つかりません！",
        internalError: "配送料金削除中にシステムエラーが発生しました！",
      };
    default: // English
      return {
        userIdNotFound: "User id not found!",
        permissionDenied: "You do not have permission to delete shipping rate!",
        shippingRateIdRequired: "Shippingrate id is required!",
        storeIdNotFound: "Store id not found!",
        internalError: "Internal error when deleting shippingRates.",
      };
  }
};

export const translateShippingRateIdPatch = (language: string) => {
  switch (language) {
    case "vi": // Tiếng Việt
      return {
        userIdNotFound: "Không tìm thấy user id!",
        permissionDenied: "Bạn không có quyền cập nhật shipping rate!",
        nameRequired: "Name là bắt buộc!",
        taxBehaviorRequired: "Taxbehavior là bắt buộc!",
        amountRequired: "Amount là bắt buộc!",
        unitMinRequired: "Unit min là bắt buộc!",
        valueMinRequired: "Value min là bắt buộc!",
        unitMaxRequired: "Unit max là bắt buộc!",
        valueMaxRequired: "Value max là bắt buộc!",
        shippingRateIdRequired: "Shipping Rates id là bắt buộc!",
        storeIdNotFound: "Không tìm thấy store id!",
        internalError: "Lỗi hệ thống khi cập nhật shippingrates.",
        shippingRateNotFound: "Không tìm thấy shipping rate!", // Thêm thông báo mới
        shippingRateAlreadyExists: "Shipping rate đã tồn tại!" // Thêm thông báo mới
      };
    case "en": // English
      return {
        userIdNotFound: "User id not found!",
        permissionDenied: "You do not have permission to update shipping rate!",
        nameRequired: "Name is required!",
        taxBehaviorRequired: "Taxbehavior is required!",
        amountRequired: "Amount is required!",
        unitMinRequired: "Unit min is required!",
        valueMinRequired: "Value min is required!",
        unitMaxRequired: "Unit max required!",
        valueMaxRequired: "Value max is required!",
        shippingRateIdRequired: "Shipping Rates id is required!",
        storeIdNotFound: "Store id not found!",
        internalError: "Internal error patch shippingrates.",
        shippingRateNotFound: "Shipping rate not found.", // Thêm thông báo mới
        shippingRateAlreadyExists: "Shipping rate already exists!" // Thêm thông báo mới
      };
    case "zh": // Tiếng Trung
      return {
        userIdNotFound: "未找到用户ID！",
        permissionDenied: "您无权更新运输费率！",
        nameRequired: "名称是必需的！",
        taxBehaviorRequired: "税务行为是必需的！",
        amountRequired: "金额是必需的！",
        unitMinRequired: "最小单位是必需的！",
        valueMinRequired: "最小值是必需的！",
        unitMaxRequired: "最大单位是必需的！",
        valueMaxRequired: "最大值是必需的！",
        shippingRateIdRequired: "运输费率ID是必需的！",
        storeIdNotFound: "未找到商店ID！",
        internalError: "更新运输费率时系统错误！",
        shippingRateNotFound: "未找到运输费率！", // Thêm thông báo mới
        shippingRateAlreadyExists: "运输费率已存在！" // Thêm thông báo mới
      };
    case "fr": // Tiếng Pháp
      return {
        userIdNotFound: "ID utilisateur introuvable !",
        permissionDenied: "Vous n'avez pas la permission de mettre à jour le tarif d'expédition !",
        nameRequired: "Le nom est requis !",
        taxBehaviorRequired: "Le comportement fiscal est requis !",
        amountRequired: "Le montant est requis !",
        unitMinRequired: "L'unité minimale est requise !",
        valueMinRequired: "La valeur minimale est requise !",
        unitMaxRequired: "L'unité maximale est requise !",
        valueMaxRequired: "La valeur maximale est requise !",
        shippingRateIdRequired: "L'ID des tarifs d'expédition est requis !",
        storeIdNotFound: "ID du magasin introuvable !",
        internalError: "Erreur système lors de la mise à jour des tarifs d'expédition !",
        shippingRateNotFound: "Le tarif d'expédition est introuvable !", // Thêm thông báo mới
        shippingRateAlreadyExists: "Le tarif d'expédition existe déjà !" // Thêm thông báo mới
      };
    case "ja": // Tiếng Nhật
      return {
        userIdNotFound: "ユーザーIDが見つかりません！",
        permissionDenied: "配送料金を更新する権限がありません！",
        nameRequired: "名前は必須です！",
        taxBehaviorRequired: "税務行動は必須です！",
        amountRequired: "金額は必須です！",
        unitMinRequired: "最小単位は必須です！",
        valueMinRequired: "最小値は必須です！",
        unitMaxRequired: "最大単位は必須です！",
        valueMaxRequired: "最大値は必須です！",
        shippingRateIdRequired: "配送料金IDは必須です！",
        storeIdNotFound: "店舗IDが見つかりません！",
        internalError: "配送料金更新中にシステムエラーが発生しました！",
        shippingRateNotFound: "配送料金が見つかりません！", // Thêm thông báo mới
        shippingRateAlreadyExists: "配送料金はすでに存在します！" // Thêm thông báo mới
      };
    default: // English
      return {
        userIdNotFound: "User id not found!",
        permissionDenied: "You do not have permission to update shipping rate!",
        nameRequired: "Name is required!",
        taxBehaviorRequired: "Taxbehavior is required!",
        amountRequired: "Amount is required!",
        unitMinRequired: "Unit min is required!",
        valueMinRequired: "Value min is required!",
        unitMaxRequired: "Unit max required!",
        valueMaxRequired: "Value max is required!",
        shippingRateIdRequired: "Shipping Rates id is required!",
        storeIdNotFound: "Store id not found!",
        internalError: "Internal error patch shippingrates.",
        shippingRateNotFound: "Shipping rate not found.", // Thêm thông báo mới
        shippingRateAlreadyExists: "Shipping rate already exists!" // Thêm thông báo mới
      };
  }
};

export const translateSizePost = (language: string) => {
  switch (language) {
    case "vi": // Tiếng Việt
      return {
        userIdNotFound: "Không tìm thấy user id!",
        permissionDenied: "Bạn không có quyền tạo mới size!",
        nameRequired: "Name là bắt buộc!",
        valueRequired: "Value là bắt buộc!",
        storeIdRequired: "Store id là bắt buộc!",
        storeIdNotFound: "Không tìm thấy store id!",
        internalError: "Lỗi hệ thống khi tạo mới size.",
        sizeAlreadyExists: "Size đã tồn tại!" // Thêm thông báo mới
      };
    case "en": // English
      return {
        userIdNotFound: "User id not found!",
        permissionDenied: "You do not have permission to create new size!",
        nameRequired: "Name is required!",
        valueRequired: "Value is required!",
        storeIdRequired: "Store id is required!",
        storeIdNotFound: "Store id not found!",
        internalError: "Internal error post size.",
        sizeAlreadyExists: "Size already exists!" // Thêm thông báo mới
      };
    case "zh": // Tiếng Trung
      return {
        userIdNotFound: "未找到用户ID！",
        permissionDenied: "您无权创建新尺寸！",
        nameRequired: "名称是必需的！",
        valueRequired: "值是必需的！",
        storeIdRequired: "商店ID是必需的！",
        storeIdNotFound: "未找到商店ID！",
        internalError: "创建新尺寸时系统错误！",
        sizeAlreadyExists: "尺寸已存在！" // Thêm thông báo mới
      };
    case "fr": // Tiếng Pháp
      return {
        userIdNotFound: "ID utilisateur introuvable !",
        permissionDenied: "Vous n'avez pas la permission de créer une nouvelle taille !",
        nameRequired: "Le nom est requis !",
        valueRequired: "La valeur est requise !",
        storeIdRequired: "L'ID du magasin est requis !",
        storeIdNotFound: "ID du magasin introuvable !",
        internalError: "Erreur système lors de la création de la taille !",
        sizeAlreadyExists: "La taille existe déjà !" // Thêm thông báo mới
      };
    case "ja": // Tiếng Nhật
      return {
        userIdNotFound: "ユーザーIDが見つかりません！",
        permissionDenied: "新しいサイズを作成する権限がありません！",
        nameRequired: "名前は必須です！",
        valueRequired: "値は必須です！",
        storeIdRequired: "店舗IDは必須です！",
        storeIdNotFound: "店舗IDが見つかりません！",
        internalError: "新しいサイズ作成中にシステムエラーが発生しました！",
        sizeAlreadyExists: "サイズはすでに存在します！" // Thêm thông báo mới
      };
    default: // English
      return {
        userIdNotFound: "User id not found!",
        permissionDenied: "You do not have permission to create new size!",
        nameRequired: "Name is required!",
        valueRequired: "Value is required!",
        storeIdRequired: "Store id is required!",
        storeIdNotFound: "Store id not found!",
        internalError: "Internal error post size.",
        sizeAlreadyExists: "Size already exists!" // Thêm thông báo mới
      };
  }
};


export const translateSizeGet = (language: string) => {
  switch (language) {
    case "vi": // Tiếng Việt
      return {
        storeIdRequired: "Store id là bắt buộc!",
        internalError: "Lỗi hệ thống khi lấy size.",
      };
    case "en": // English
      return {
        storeIdRequired: "Store id is required!",
        internalError: "Internal error get size.",
      };
    case "zh": // Tiếng Trung
      return {
        storeIdRequired: "商店ID是必需的！",
        internalError: "获取尺寸时系统错误！",
      };
    case "fr": // Tiếng Pháp
      return {
        storeIdRequired: "L'ID du magasin est requis !",
        internalError: "Erreur système lors de la récupération de la taille !",
      };
    case "ja": // Tiếng Nhật
      return {
        storeIdRequired: "店舗IDは必須です！",
        internalError: "サイズ取得時にシステムエラーが発生しました！",
      };
    default: // English
      return {
        storeIdRequired: "Store id is required!",
        internalError: "Internal error get size.",
      };
  }
};

export const translateSizeDelete = (language: string) => {
  switch (language) {
    case "vi": // Tiếng Việt
      return {
        userNotFound: "Không tìm thấy user!",
        permissionDenied: "Bạn không có quyền xóa size!",
        idsArrayNotEmpty: "Mảng IDs không được trống!",
        storeIdNotFound: "Không tìm thấy store id!",
        deleteSuccess: "Xóa thành công!",
        internalError: "Lỗi hệ thống khi xóa category.",
      };
    case "en": // English
      return {
        userNotFound: "User not found!",
        permissionDenied: "You do not have permission to delete size!",
        idsArrayNotEmpty: "IDs array cannot be empty!",
        storeIdNotFound: "Store id not found!",
        deleteSuccess: "Deleted successfully!",
        internalError: "Internal error when deleting category.",
      };
    case "zh": // Tiếng Trung
      return {
        userNotFound: "未找到用户！",
        permissionDenied: "您无权删除大小！",
        idsArrayNotEmpty: "ID数组不能为空！",
        storeIdNotFound: "未找到商店ID！",
        deleteSuccess: "删除成功！",
        internalError: "删除类别时发生系统错误。",
      };
    case "fr": // Tiếng Pháp
      return {
        userNotFound: "Utilisateur introuvable !",
        permissionDenied:
          "Vous n'avez pas la permission de supprimer la taille !",
        idsArrayNotEmpty: "Le tableau des IDs ne doit pas être vide !",
        storeIdNotFound: "ID du magasin introuvable !",
        deleteSuccess: "Suppression réussie !",
        internalError: "Erreur système lors de la suppression de la catégorie.",
      };
    case "ja": // Tiếng Nhật
      return {
        userNotFound: "ユーザーが見つかりません！",
        permissionDenied: "サイズを削除する権限がありません！",
        idsArrayNotEmpty: "IDの配列は空であってはいけません！",
        storeIdNotFound: "店舗IDが見つかりません！",
        deleteSuccess: "削除に成功しました！",
        internalError: "カテゴリー削除中にシステムエラーが発生しました。",
      };
    default: // English
      return {
        userNotFound: "User not found!",
        permissionDenied: "You do not have permission to delete size!",
        idsArrayNotEmpty: "IDs array cannot be empty!",
        storeIdNotFound: "Store id not found!",
        deleteSuccess: "Deleted successfully!",
        internalError: "Internal error when deleting category.",
      };
  }
};

export const translateSizeIdGet = (language: string) => {
  switch (language) {
    case "vi": // Tiếng Việt
      return {
        sizeIdRequired: "Size id là bắt buộc!",
        userNotFound: "Không tìm thấy user id!",
        permissionDenied: "Bạn không có quyền xem size!",
        internalError: "Lỗi hệ thống khi lấy size.",
      };
    case "en": // English
      return {
        sizeIdRequired: "Size id is required!",
        userNotFound: "User id not found!",
        permissionDenied: "You do not have permission to view size!",
        internalError: "Internal error when getting size.",
      };
    case "zh": // Tiếng Trung
      return {
        sizeIdRequired: "尺寸ID是必需的！",
        userNotFound: "未找到用户ID！",
        permissionDenied: "您无权查看尺寸！",
        internalError: "获取尺寸时系统错误！",
      };
    case "fr": // Tiếng Pháp
      return {
        sizeIdRequired: "L'ID de taille est requis !",
        userNotFound: "ID utilisateur introuvable !",
        permissionDenied: "Vous n'avez pas la permission de voir la taille !",
        internalError: "Erreur système lors de la récupération de la taille !",
      };
    case "ja": // Tiếng Nhật
      return {
        sizeIdRequired: "サイズIDは必須です！",
        userNotFound: "ユーザーIDが見つかりません！",
        permissionDenied: "サイズを表示する権限がありません！",
        internalError: "サイズを取得中にシステムエラーが発生しました！",
      };
    default:
      return {
        sizeIdRequired: "Size id is required!",
        userNotFound: "User id not found!",
        permissionDenied: "You do not have permission to view size!",
        internalError: "Internal error when getting size.",
      };
  }
};

export const translateSizeIdDelete = (language: string) => {
  switch (language) {
    case "vi": // Tiếng Việt
      return {
        userIdNotFound: "Không tìm thấy user id!",
        permissionDenied: "Bạn không có quyền xóa size!",
        sizeIdRequired: "Size id là bắt buộc!",
        storeIdNotFound: "Không tìm thấy store id!",
        internalError: "Lỗi hệ thống khi xóa size.",
      };
    case "en": // English
      return {
        userIdNotFound: "User id not found!",
        permissionDenied: "You do not have permission to delete size!",
        sizeIdRequired: "Size id is required!",
        storeIdNotFound: "Store id not found!",
        internalError: "Internal error when deleting size.",
      };
    case "zh": // Tiếng Trung
      return {
        userIdNotFound: "未找到用户ID！",
        permissionDenied: "您无权删除尺寸！",
        sizeIdRequired: "尺寸ID是必需的！",
        storeIdNotFound: "未找到商店ID！",
        internalError: "删除尺寸时系统错误！",
      };
    case "fr": // Tiếng Pháp
      return {
        userIdNotFound: "ID utilisateur introuvable !",
        permissionDenied:
          "Vous n'avez pas la permission de supprimer la taille !",
        sizeIdRequired: "L'ID de taille est requis !",
        storeIdNotFound: "ID du magasin introuvable !",
        internalError: "Erreur système lors de la suppression de la taille !",
      };
    case "ja": // Tiếng Nhật
      return {
        userIdNotFound: "ユーザーIDが見つかりません！",
        permissionDenied: "サイズを削除する権限がありません！",
        sizeIdRequired: "サイズIDは必須です！",
        storeIdNotFound: "店舗IDが見つかりません！",
        internalError: "サイズ削除中にシステムエラーが発生しました！",
      };
    default:
      return {
        userIdNotFound: "User id not found!",
        permissionDenied: "You do not have permission to delete size!",
        sizeIdRequired: "Size id is required!",
        storeIdNotFound: "Store id not found!",
        internalError: "Internal error when deleting size.",
      };
  }
};

export const translateSizeIdPatch = (language: string) => {
  switch (language) {
    case "vi": // Tiếng Việt
      return {
        userIdNotFound: "Không tìm thấy user id!",
        permissionDenied: "Bạn không có quyền cập nhật size!",
        nameRequired: "Name là bắt buộc!",
        valueRequired: "Value là bắt buộc!",
        sizeIdRequired: "Size id là bắt buộc!",
        storeIdNotFound: "Không tìm thấy store id!",
        internalError: "Lỗi hệ thống khi cập nhật size.",
        sizeNotFound: "Không tìm thấy size!",
        sizeAlreadyExists: "Size đã tồn tại!",
      };
    case "en": // English
      return {
        userIdNotFound: "User id not found!",
        permissionDenied: "You do not have permission to update size!",
        nameRequired: "Name is required!",
        valueRequired: "Value is required!",
        sizeIdRequired: "Size id is required!",
        storeIdNotFound: "Store id not found!",
        internalError: "Internal error when updating size.",
        sizeNotFound: "Size not found!",
        sizeAlreadyExists: "Size already exists!",
      };
    case "zh": // Tiếng Trung
      return {
        userIdNotFound: "未找到用户ID！",
        permissionDenied: "您无权更新尺寸！",
        nameRequired: "名称是必需的！",
        valueRequired: "值是必需的！",
        sizeIdRequired: "尺寸ID是必需的！",
        storeIdNotFound: "未找到商店ID！",
        internalError: "更新尺寸时系统错误！",
        sizeNotFound: "未找到尺寸！",
        sizeAlreadyExists: "尺寸已存在！",
      };
    case "fr": // Tiếng Pháp
      return {
        userIdNotFound: "ID utilisateur introuvable !",
        permissionDenied:
          "Vous n'avez pas la permission de mettre à jour la taille !",
        nameRequired: "Le nom est obligatoire !",
        valueRequired: "La valeur est obligatoire !",
        sizeIdRequired: "L'ID de taille est requis !",
        storeIdNotFound: "ID du magasin introuvable !",
        internalError: "Erreur système lors de la mise à jour de la taille !",
        sizeNotFound: "Taille introuvable !",
        sizeAlreadyExists: "La taille existe déjà !",
      };
    case "ja": // Tiếng Nhật
      return {
        userIdNotFound: "ユーザーIDが見つかりません！",
        permissionDenied: "サイズを更新する権限がありません！",
        nameRequired: "名前は必須です！",
        valueRequired: "値は必須です！",
        sizeIdRequired: "サイズIDは必須です！",
        storeIdNotFound: "店舗IDが見つかりません！",
        internalError: "サイズ更新中にシステムエラーが発生しました！",
        sizeNotFound: "サイズが見つかりません！",
        sizeAlreadyExists: "サイズはすでに存在します！",
      };
    default: // English
      return {
        userIdNotFound: "User id not found!",
        permissionDenied: "You do not have permission to update size!",
        nameRequired: "Name is required!",
        valueRequired: "Value is required!",
        sizeIdRequired: "Size id is required!",
        storeIdNotFound: "Store id not found!",
        internalError: "Internal error when updating size.",
        sizeNotFound: "Size not found!",
        sizeAlreadyExists: "Size already exists!",
      };
  }
};


export const translateSystemGet = (language: string) => {
  switch (language) {
    case "vi": // Tiếng Việt
      return {
        userNotFound: "Không tìm thấy user!",
        permissionDenied: "Bạn không có quyền xem system!",
        internalError: "Lỗi hệ thống khi lấy thông tin system.",
      };
    case "en": // English
      return {
        userNotFound: "User not found!",
        permissionDenied: "You do not have permission to view system!",
        internalError: "Internal error when getting system information.",
      };
    case "zh": // Tiếng Trung
      return {
        userNotFound: "未找到用户！",
        permissionDenied: "您无权查看系统！",
        internalError: "获取系统信息时系统错误！",
      };
    case "fr": // Tiếng Pháp
      return {
        userNotFound: "Utilisateur introuvable !",
        permissionDenied: "Vous n'avez pas la permission de voir le système !",
        internalError:
          "Erreur système lors de la récupération des informations du système !",
      };
    case "ja": // Tiếng Nhật
      return {
        userNotFound: "ユーザーが見つかりません！",
        permissionDenied: "システムを見る権限がありません！",
        internalError: "システム情報を取得中にシステムエラーが発生しました！",
      };
    default:
      return {
        userNotFound: "User not found!",
        permissionDenied: "You do not have permission to view system!",
        internalError: "Internal error when getting system information.",
      };
  }
};

export const translateTaxRatePost = (language: string) => {
  switch (language) {
    case "vi": // Tiếng Việt
      return {
        userIdNotFound: "Không tìm thấy user id!",
        permissionDenied: "Bạn không có quyền tạo mới taxrate!",
        nameRequired: "Name là bắt buộc!",
        percentageRequired: "Percentage là bắt buộc!",
        storeIdRequired: "Store id là bắt buộc!",
        storeIdNotFound: "Không tìm thấy store id!",
        internalError: "Lỗi hệ thống khi tạo mới taxrate.",
        taxrateAlreadyExists: "Taxrate đã tồn tại!",
      };
    case "en": // English
      return {
        userIdNotFound: "User id not found!",
        permissionDenied: "You do not have permission to create a new taxrate!",
        nameRequired: "Name is required!",
        percentageRequired: "Percentage is required!",
        storeIdRequired: "Store id is required!",
        storeIdNotFound: "Store id not found!",
        internalError: "Internal error when creating new taxrate.",
        taxrateAlreadyExists: "Taxrate already exists!",
      };
    case "zh": // Tiếng Trung
      return {
        userIdNotFound: "未找到用户 ID！",
        permissionDenied: "您无权创建新的 taxrate！",
        nameRequired: "名称是必需的！",
        percentageRequired: "百分比是必需的！",
        storeIdRequired: "商店 ID 是必需的！",
        storeIdNotFound: "未找到商店 ID！",
        internalError: "创建 taxrate 时系统错误！",
        taxrateAlreadyExists: "Taxrate 已存在！",
      };
    case "fr": // Tiếng Pháp
      return {
        userIdNotFound: "ID utilisateur introuvable !",
        permissionDenied:
          "Vous n'avez pas la permission de créer un nouveau taxrate !",
        nameRequired: "Le nom est obligatoire !",
        percentageRequired: "Le pourcentage est obligatoire !",
        storeIdRequired: "L'ID du magasin est obligatoire !",
        storeIdNotFound: "ID du magasin introuvable !",
        internalError: "Erreur système lors de la création du taxrate !",
        taxrateAlreadyExists: "Le taxrate existe déjà !",
      };
    case "ja": // Tiếng Nhật
      return {
        userIdNotFound: "ユーザーIDが見つかりません！",
        permissionDenied: "新しい税率を作成する権限がありません！",
        nameRequired: "名前は必須です！",
        percentageRequired: "パーセンテージは必須です！",
        storeIdRequired: "店舗IDは必須です！",
        storeIdNotFound: "店舗IDが見つかりません！",
        internalError: "税率作成中にシステムエラーが発生しました！",
        taxrateAlreadyExists: "税率はすでに存在します！",
      };
    default: // English
      return {
        userIdNotFound: "User id not found!",
        permissionDenied: "You do not have permission to create a new taxrate!",
        nameRequired: "Name is required!",
        percentageRequired: "Percentage is required!",
        storeIdRequired: "Store id is required!",
        storeIdNotFound: "Store id not found!",
        internalError: "Internal error when creating new taxrate.",
        taxrateAlreadyExists: "Taxrate already exists!",
      };
  }
};


export const translateTaxRateGet = (language: string) => {
  switch (language) {
    case "vi": // Tiếng Việt
      return {
        storeIdRequired: "Store id là bắt buộc!",
        internalError: "Lỗi hệ thống khi lấy taxrate.",
      };
    case "en": // English
      return {
        storeIdRequired: "Store id is required!",
        internalError: "Internal error get taxrate.",
      };
    case "zh": // Tiếng Trung
      return {
        storeIdRequired: "商店 ID 是必需的！",
        internalError: "获取税率时系统错误！",
      };
    case "fr": // Tiếng Pháp
      return {
        storeIdRequired: "L'ID du magasin est obligatoire !",
        internalError: "Erreur système lors de la récupération du taxrate !",
      };
    case "ja": // Tiếng Nhật
      return {
        storeIdRequired: "店舗IDは必須です！",
        internalError: "税率取得時にシステムエラーが発生しました！",
      };
    default:
      return {
        storeIdRequired: "Store id is required!",
        internalError: "Internal error get taxrate.",
      };
  }
};

export const translateTaxRateDelete = (language: string) => {
  switch (language) {
    case "vi": // Tiếng Việt
      return {
        userNotFound: "Không tìm thấy user!",
        permissionDenied: "Bạn không có quyền xóa taxrate!",
        idsArrayNotEmpty: "Mảng IDs không được trống!",
        storeIdNotFound: "Không tìm thấy store id!",
        deleteSuccess: "Xóa thành công!",
        internalError: "Lỗi hệ thống khi xóa tax rate.",
      };
    case "en": // English
      return {
        userNotFound: "User not found!",
        permissionDenied: "You do not have permission to delete tax rate!",
        idsArrayNotEmpty: "IDs array cannot be empty!",
        storeIdNotFound: "Store id not found!",
        deleteSuccess: "Deleted successfully!",
        internalError: "Internal error when deleting tax rate.",
      };
    case "zh": // Tiếng Trung
      return {
        userNotFound: "未找到用户！",
        permissionDenied: "您无权删除税率！",
        idsArrayNotEmpty: "ID数组不能为空！",
        storeIdNotFound: "未找到商店ID！",
        deleteSuccess: "删除成功！",
        internalError: "删除税率时系统错误。",
      };
    case "fr": // Tiếng Pháp
      return {
        userNotFound: "Utilisateur introuvable !",
        permissionDenied:
          "Vous n'avez pas la permission de supprimer le taux de taxe !",
        idsArrayNotEmpty: "Le tableau des IDs ne doit pas être vide !",
        storeIdNotFound: "ID du magasin introuvable !",
        deleteSuccess: "Suppression réussie !",
        internalError: "Erreur système lors de la suppression du taux de taxe.",
      };
    case "ja": // Tiếng Nhật
      return {
        userNotFound: "ユーザーが見つかりません！",
        permissionDenied: "税率を削除する権限がありません！",
        idsArrayNotEmpty: "IDの配列は空であってはいけません！",
        storeIdNotFound: "店舗IDが見つかりません！",
        deleteSuccess: "削除に成功しました！",
        internalError: "税率削除時にシステムエラーが発生しました。",
      };
    default: // English
      return {
        userNotFound: "User not found!",
        permissionDenied: "You do not have permission to delete tax rate!",
        idsArrayNotEmpty: "IDs array cannot be empty!",
        storeIdNotFound: "Store id not found!",
        deleteSuccess: "Deleted successfully!",
        internalError: "Internal error when deleting tax rate.",
      };
  }
};

export const translateTaxRateIdGet = (language: string) => {
  switch (language) {
    case "vi": // Tiếng Việt
      return {
        taxRateIdRequired: "TaxRate id là bắt buộc!",
        userIdNotFound: "Không tìm thấy user id!",
        permissionDenied: "Bạn không có quyền xem taxrate!",
        internalError: "Lỗi hệ thống khi lấy taxrate.",
      };
    case "en": // English
      return {
        taxRateIdRequired: "TaxRate id is required!",
        userIdNotFound: "User id not found!",
        permissionDenied: "You do not have permission to view tax rate!",
        internalError: "Internal error when getting tax rate.",
      };
    case "zh": // Tiếng Trung
      return {
        taxRateIdRequired: "税率ID是必需的！",
        userIdNotFound: "未找到用户ID！",
        permissionDenied: "您无权查看税率！",
        internalError: "获取税率时系统错误。",
      };
    case "fr": // Tiếng Pháp
      return {
        taxRateIdRequired: "L'ID du taux de taxe est requis !",
        userIdNotFound: "ID utilisateur introuvable !",
        permissionDenied:
          "Vous n'avez pas la permission de voir le taux de taxe !",
        internalError:
          "Erreur système lors de la récupération du taux de taxe.",
      };
    case "ja": // Tiếng Nhật
      return {
        taxRateIdRequired: "税率IDは必須です！",
        userIdNotFound: "ユーザーIDが見つかりません！",
        permissionDenied: "税率を見る権限がありません！",
        internalError: "税率取得時にシステムエラーが発生しました。",
      };
    default: // English
      return {
        taxRateIdRequired: "TaxRate id is required!",
        userIdNotFound: "User id not found!",
        permissionDenied: "You do not have permission to view tax rate!",
        internalError: "Internal error when getting tax rate.",
      };
  }
};

export const translateTaxRateIdDelete = (language: string) => {
  switch (language) {
    case "vi": // Tiếng Việt
      return {
        userIdNotFound: "Không tìm thấy user id!",
        permissionDenied: "Bạn không có quyền xóa taxrate!",
        taxRateIdRequired: "TaxRate id là bắt buộc!",
        storeIdNotFound: "Không tìm thấy store id!",
        internalError: "Lỗi hệ thống khi xóa taxRate.",
      };
    case "en": // English
      return {
        userIdNotFound: "User id not found!",
        permissionDenied: "You do not have permission to delete tax rate!",
        taxRateIdRequired: "TaxRate id is required!",
        storeIdNotFound: "Store id not found!",
        internalError: "Internal error when deleting tax rate.",
      };
    case "zh": // Tiếng Trung
      return {
        userIdNotFound: "未找到用户ID！",
        permissionDenied: "您无权删除税率！",
        taxRateIdRequired: "税率ID是必需的！",
        storeIdNotFound: "未找到商店ID！",
        internalError: "删除税率时系统错误。",
      };
    case "fr": // Tiếng Pháp
      return {
        userIdNotFound: "ID utilisateur introuvable !",
        permissionDenied:
          "Vous n'avez pas la permission de supprimer le taux de taxe !",
        taxRateIdRequired: "L'ID du taux de taxe est requis !",
        storeIdNotFound: "ID du magasin introuvable !",
        internalError: "Erreur système lors de la suppression du taux de taxe.",
      };
    case "ja": // Tiếng Nhật
      return {
        userIdNotFound: "ユーザーIDが見つかりません！",
        permissionDenied: "税率を削除する権限がありません！",
        taxRateIdRequired: "税率IDは必須です！",
        storeIdNotFound: "店舗IDが見つかりません！",
        internalError: "税率削除時にシステムエラーが発生しました。",
      };
    default: // English
      return {
        userIdNotFound: "User id not found!",
        permissionDenied: "You do not have permission to delete tax rate!",
        taxRateIdRequired: "TaxRate id is required!",
        storeIdNotFound: "Store id not found!",
        internalError: "Internal error when deleting tax rate.",
      };
  }
};

export const translateTaxRateIdPatch = (language: string) => {
  switch (language) {
    case "vi": // Tiếng Việt
      return {
        userIdNotFound: "Không tìm thấy user id!",
        permissionDenied: "Bạn không có quyền cập nhật taxrate!",
        nameRequired: "Name là bắt buộc!",
        descriptionRequired: "Description là bắt buộc!",
        percentageRequired: "Percentage là bắt buộc!",
        inclusiveRequired: "Inclusive là bắt buộc!",
        activeRequired: "Active là bắt buộc!",
        taxRateIdRequired: "Taxrate id là bắt buộc!",
        storeIdNotFound: "Không tìm thấy store id!",
        internalError: "Lỗi hệ thống khi cập nhật taxrate.",
        taxrateAlreadyExists: "Taxrate đã tồn tại!",
        taxRateNotFound: "Không tìm thấy taxrate!",
      };
    case "en": // English
      return {
        userIdNotFound: "User id not found!",
        permissionDenied: "You do not have permission to update tax rate!",
        nameRequired: "Name is required!",
        descriptionRequired: "Description is required!",
        percentageRequired: "Percentage is required!",
        inclusiveRequired: "Inclusive is required!",
        activeRequired: "Active is required!",
        taxRateIdRequired: "Taxrate id is required!",
        storeIdNotFound: "Store id not found!",
        internalError: "Internal error when updating tax rate.",
        taxrateAlreadyExists: "Taxrate already exists!",
        taxRateNotFound: "Tax rate not found!",
      };
    case "zh": // Tiếng Trung
      return {
        userIdNotFound: "未找到用户ID！",
        permissionDenied: "您无权更新税率！",
        nameRequired: "名称是必需的！",
        descriptionRequired: "描述是必需的！",
        percentageRequired: "百分比是必需的！",
        inclusiveRequired: "包含是必需的！",
        activeRequired: "活动是必需的！",
        taxRateIdRequired: "税率ID是必需的！",
        storeIdNotFound: "未找到商店ID！",
        internalError: "更新税率时系统错误。",
        taxrateAlreadyExists: "Taxrate 已存在！",
        taxRateNotFound: "未找到税率！",
      };
    case "fr": // Tiếng Pháp
      return {
        userIdNotFound: "ID utilisateur introuvable !",
        permissionDenied:
          "Vous n'avez pas la permission de mettre à jour le taux de taxe !",
        nameRequired: "Le nom est obligatoire !",
        descriptionRequired: "La description est obligatoire !",
        percentageRequired: "Le pourcentage est obligatoire !",
        inclusiveRequired: "Inclusif est obligatoire !",
        activeRequired: "L'état est obligatoire !",
        taxRateIdRequired: "L'ID du taux de taxe est obligatoire !",
        storeIdNotFound: "ID du magasin introuvable !",
        internalError: "Erreur système lors de la mise à jour du taux de taxe.",
        taxrateAlreadyExists: "Le taxrate existe déjà !",
        taxRateNotFound: "Tax rate introuvable !",
      };
    case "ja": // Tiếng Nhật
      return {
        userIdNotFound: "ユーザーIDが見つかりません！",
        permissionDenied: "税率を更新する権限がありません！",
        nameRequired: "名前は必須です！",
        descriptionRequired: "説明は必須です！",
        percentageRequired: "割合は必須です！",
        inclusiveRequired: "含むは必須です！",
        activeRequired: "アクティブは必須です！",
        taxRateIdRequired: "税率IDは必須です！",
        storeIdNotFound: "店舗IDが見つかりません！",
        internalError: "税率更新時にシステムエラーが発生しました。",
        taxrateAlreadyExists: "税率はすでに存在します！",
        taxRateNotFound: "税率が見つかりません！",
      };
    default: // English
      return {
        userIdNotFound: "User id not found!",
        permissionDenied: "You do not have permission to update tax rate!",
        nameRequired: "Name is required!",
        descriptionRequired: "Description is required!",
        percentageRequired: "Percentage is required!",
        inclusiveRequired: "Inclusive is required!",
        activeRequired: "Active is required!",
        taxRateIdRequired: "Taxrate id is required!",
        storeIdNotFound: "Store id not found!",
        internalError: "Internal error when updating tax rate.",
        taxrateAlreadyExists: "Taxrate already exists!",
        taxRateNotFound: "Tax rate not found!",
      };
  }
};


export const translateWareHouseGet = (language: string) => {
  switch (language) {
    case "vi": // Tiếng Việt
      return {
        userIdNotFound: "Không tìm thấy user id!",
        internalError: "Lỗi hệ thống khi cập nhật order.",
      };
    case "en": // English
      return {
        userIdNotFound: "User id not found!",
        internalError: "Internal error when updating order.",
      };
    case "zh": // Tiếng Trung
      return {
        userIdNotFound: "未找到用户ID！",
        internalError: "更新订单时系统错误。",
      };
    case "fr": // Tiếng Pháp
      return {
        userIdNotFound: "ID utilisateur introuvable !",
        internalError: "Erreur système lors de la mise à jour de la commande.",
      };
    case "ja": // Tiếng Nhật
      return {
        userIdNotFound: "ユーザーIDが見つかりません！",
        internalError: "注文更新時にシステムエラーが発生しました。",
      };
    default: // English
      return {
        userIdNotFound: "User id not found!",
        internalError: "Internal error when updating order.",
      };
  }
};

export const translateWheelSpinPost = (language: string) => {
  switch (language) {
    case "vi": // Tiếng Việt
      return {
        userIdNotFound: "Không tìm thấy user id!",
        internalError: "Lỗi hệ thống khi tạo wheel spin.",
      };
    case "en": // English
      return {
        userIdNotFound: "User id not found!",
        internalError: "Internal error when creating wheel spin.",
      };
    case "zh": // Tiếng Trung
      return {
        userIdNotFound: "未找到用户ID！",
        internalError: "创建wheel spin时系统错误。",
      };
    case "fr": // Tiếng Pháp
      return {
        userIdNotFound: "ID utilisateur introuvable !",
        internalError: "Erreur système lors de la création de wheel spin.",
      };
    case "ja": // Tiếng Nhật
      return {
        userIdNotFound: "ユーザーIDが見つかりません！",
        internalError: "wheel spin作成時にシステムエラーが発生しました。",
      };
    default: // English
      return {
        userIdNotFound: "User id not found!",
        internalError: "Internal error when creating wheel spin.",
      };
  }
};

export const translateWheelSpinGet = (language: string) => {
  switch (language) {
    case "vi": // Tiếng Việt
      return {
        userIdNotFound: "Không tìm thấy user id!",
        internalError: "Lỗi hệ thống khi lấy wheelSpin!",
      };
    case "en": // English
      return {
        userIdNotFound: "User id not found!",
        internalError: "Internal error when getting wheelSpin!",
      };
    case "zh": // Tiếng Trung
      return {
        userIdNotFound: "未找到用户ID！",
        internalError: "获取wheelSpin时系统错误！",
      };
    case "fr": // Tiếng Pháp
      return {
        userIdNotFound: "ID utilisateur introuvable !",
        internalError: "Erreur système lors de la récupération de wheelSpin !",
      };
    case "ja": // Tiếng Nhật
      return {
        userIdNotFound: "ユーザーIDが見つかりません！",
        internalError: "wheelSpinを取得中にシステムエラーが発生しました！",
      };
    default: // English
      return {
        userIdNotFound: "User id not found!",
        internalError: "Internal error when getting wheelSpin!",
      };
  }
};

export const translateBonusWheelSpinGet = (language: string) => {
  switch (language) {
    case "vi": // Tiếng Việt
      return {
        userIdNotFound: "Không tìm thấy user id!",
        internalError: "Lỗi hệ thống khi lấy bonus WheelSpin!",
      };
    case "en": // English
      return {
        userIdNotFound: "User id not found!",
        internalError: "Internal error when getting bonus WheelSpin!",
      };
    case "zh": // Tiếng Trung
      return {
        userIdNotFound: "未找到用户ID！",
        internalError: "获取bonus WheelSpin时系统错误！",
      };
    case "fr": // Tiếng Pháp
      return {
        userIdNotFound: "ID utilisateur introuvable !",
        internalError:
          "Erreur système lors de la récupération de bonus WheelSpin !",
      };
    case "ja": // Tiếng Nhật
      return {
        userIdNotFound: "ユーザーIDが見つかりません！",
        internalError:
          "bonus WheelSpinを取得中にシステムエラーが発生しました！",
      };
    default: // English
      return {
        userIdNotFound: "User id not found!",
        internalError: "Internal error when getting bonus WheelSpin!",
      };
  }
};

export const translateBonusWheelSpinPatch = (language: string) => {
  switch (language) {
    case "vi": // Tiếng Việt
      return {
        userIdNotFound: "Không tìm thấy user id!",
        permissionDenied: "Bạn không có quyền cập nhật bonus vòng quay!",
        bonusTitleRequired: "Bonus tiêu đề là bắt buộc.",
        recordNotFound: "Không tìm thấy bản ghi cần cập nhật.",
        internalError: "Lỗi nội bộ khi cập nhật bonus vòng quay.",
      };
    case "en": // English
      return {
        userIdNotFound: "User id not found!",
        permissionDenied:
          "You do not have permission to update bonus wheelSpin!",
        bonusTitleRequired: "Bonus title is required.",
        recordNotFound: "Record to update not found.",
        internalError: "Internal error while updating wheel spin.",
      };
    case "zh": // Tiếng Trung
      return {
        userIdNotFound: "未找到用户ID！",
        permissionDenied: "您无权更新bonus wheelSpin！",
        bonusTitleRequired: "Bonus标题是必需的。",
        recordNotFound: "未找到需要更新的记录。",
        internalError: "更新轮盘时发生内部错误。",
      };
    case "fr": // Tiếng Pháp
      return {
        userIdNotFound: "ID utilisateur introuvable !",
        permissionDenied:
          "Vous n'avez pas la permission de mettre à jour le bonus wheelSpin !",
        bonusTitleRequired: "Le titre du bonus est obligatoire.",
        recordNotFound: "Enregistrement à mettre à jour introuvable.",
        internalError: "Erreur interne lors de la mise à jour du wheelSpin.",
      };
    case "ja": // Tiếng Nhật
      return {
        userIdNotFound: "ユーザーIDが見つかりません！",
        permissionDenied: "bonus wheelSpinを更新する権限がありません！",
        bonusTitleRequired: "ボーナスタイトルは必須です。",
        recordNotFound: "更新するレコードが見つかりません。",
        internalError: "更新時に内部エラーが発生しました。",
      };
    default: // English
      return {
        userIdNotFound: "User id not found!",
        permissionDenied:
          "You do not have permission to update bonus wheelSpin!",
        bonusTitleRequired: "Bonus title is required.",
        recordNotFound: "Record to update not found.",
        internalError: "Internal error while updating wheel spin.",
      };
  }
};

export const translateUnbonusWheelSpinPost = (language: string) => {
  switch (language) {
    case "vi": // Tiếng Việt
      return {
        userIdNotFound: "Không tìm thấy user id!",
        permissionDenied: "Bạn không có quyền cập nhật Unbonus vòng quay!",
        unbonusTitleRequired: "Unbonus tiêu đề là bắt buộc.",
        recordNotFound: "Không tìm thấy bản ghi cần cập nhật.",
        internalError: "Lỗi nội bộ khi tạo unbonus vòng quay.",
      };
    case "en": // English
      return {
        userIdNotFound: "User id not found!",
        permissionDenied:
          "You do not have permission to update Unbonus wheelSpin!",
        unbonusTitleRequired: "Unbonus title is required.",
        recordNotFound: "Record to update not found.",
        internalError: "Internal error while creating unbonus wheelspin.",
      };
    case "zh": // Tiếng Trung
      return {
        userIdNotFound: "未找到用户ID！",
        permissionDenied: "您无权更新Unbonus wheelSpin！",
        unbonusTitleRequired: "Unbonus标题是必需的。",
        recordNotFound: "未找到需要更新的记录。",
        internalError: "创建轮盘时发生内部错误。",
      };
    case "fr": // Tiếng Pháp
      return {
        userIdNotFound: "ID utilisateur introuvable !",
        permissionDenied:
          "Vous n'avez pas la permission de mettre à jour le Unbonus wheelSpin !",
        unbonusTitleRequired: "Le titre Unbonus est obligatoire.",
        recordNotFound: "Enregistrement à mettre à jour introuvable.",
        internalError: "Erreur interne lors de la création du wheelSpin.",
      };
    case "ja": // Tiếng Nhật
      return {
        userIdNotFound: "ユーザーIDが見つかりません！",
        permissionDenied: "Unbonus wheelSpinを更新する権限がありません！",
        unbonusTitleRequired: "Unbonusタイトルは必須です。",
        recordNotFound: "更新するレコードが見つかりません。",
        internalError: "作成中に内部エラーが発生しました。",
      };
    default: // English
      return {
        userIdNotFound: "User id not found!",
        permissionDenied:
          "You do not have permission to update Unbonus wheelSpin!",
        unbonusTitleRequired: "Unbonus title is required.",
        recordNotFound: "Record to update not found.",
        internalError: "Internal error while creating unbonus wheelspin.",
      };
  }
};

export const translateCartAddItem = (language: string) => {
  switch (language) {
    case "vi": // Tiếng Việt
      return {
        userIdNotFound: "Không tìm thấy user id!",
        quantityNotFound: "Không tìm thấy quantity!",
        productIdNotFound: "Không tìm thấy product id!",
        internalError: "Lỗi hệ thống khi tạo cartItem.",
      };
    case "en": // English
      return {
        userIdNotFound: "User id not found!",
        quantityNotFound: "Quantity not found!",
        productIdNotFound: "Product id not found!",
        internalError: "Internal error while creating cartItem.",
      };
    case "zh": // Tiếng Trung
      return {
        userIdNotFound: "未找到用户ID！",
        quantityNotFound: "未找到数量！",
        productIdNotFound: "未找到产品ID！",
        internalError: "创建cartItem时发生系统错误。",
      };
    case "fr": // Tiếng Pháp
      return {
        userIdNotFound: "ID utilisateur introuvable !",
        quantityNotFound: "Quantité introuvable !",
        productIdNotFound: "ID produit introuvable !",
        internalError: "Erreur système lors de la création du cartItem.",
      };
    case "ja": // Tiếng Nhật
      return {
        userIdNotFound: "ユーザーIDが見つかりません！",
        quantityNotFound: "数量が見つかりません！",
        productIdNotFound: "製品IDが見つかりません！",
        internalError: "cartItem作成時にシステムエラーが発生しました。",
      };
    default: // If language is not recognized, default to English
      return {
        userIdNotFound: "User id not found!",
        quantityNotFound: "Quantity not found!",
        productIdNotFound: "Product id not found!",
        internalError: "Internal error while creating cartItem.",
      };
  }
};

export const translateCartItemGet = (language: string) => {
  switch (language) {
    case "vi": // Tiếng Việt
      return {
        userIdNotFound: "Không tìm thấy user id!",
        quantityNotFound: "Không tìm thấy quantity!",
        productIdNotFound: "Không tìm thấy product id!",
        internalError: "Lỗi hệ thống khi tạo cartItem.",
        internalErrorGet: "Lỗi hệ thống khi lấy cartItem.",
      };
    case "en": // English
      return {
        userIdNotFound: "User id not found!",
        quantityNotFound: "Quantity not found!",
        productIdNotFound: "Product id not found!",
        internalError: "Internal error while creating cartItem.",
        internalErrorGet: "Internal error while getting cartItem.",
      };
    case "zh": // Tiếng Trung
      return {
        userIdNotFound: "未找到用户ID！",
        quantityNotFound: "未找到数量！",
        productIdNotFound: "未找到产品ID！",
        internalError: "创建cartItem时发生系统错误。",
        internalErrorGet: "获取cartItem时发生系统错误。",
      };
    case "fr": // Tiếng Pháp
      return {
        userIdNotFound: "ID utilisateur introuvable !",
        quantityNotFound: "Quantité introuvable !",
        productIdNotFound: "ID produit introuvable !",
        internalError: "Erreur système lors de la création du cartItem.",
        internalErrorGet: "Erreur système lors de la récupération du cartItem.",
      };
    case "ja": // Tiếng Nhật
      return {
        userIdNotFound: "ユーザーIDが見つかりません！",
        quantityNotFound: "数量が見つかりません！",
        productIdNotFound: "製品IDが見つかりません！",
        internalError: "cartItem作成時にシステムエラーが発生しました。",
        internalErrorGet: "cartItem取得時にシステムエラーが発生しました。",
      };
    default: // If language is not recognized, default to English
      return {
        userIdNotFound: "User id not found!",
        quantityNotFound: "Quantity not found!",
        productIdNotFound: "Product id not found!",
        internalError: "Internal error while creating cartItem.",
        internalErrorGet: "Internal error while getting cartItem.",
      };
  }
};

export const translateCartItemDeleteMany = (language: string) => {
  switch (language) {
    case "vi": // Tiếng Việt
      return {
        userIdNotFound: "Không tìm thấy user id!",
        internalErrorDeleteMany: "Lỗi hệ thống khi xóa nhiều cartItem.",
      };
    case "en": // English
      return {
        userIdNotFound: "User id not found!",
        internalErrorDeleteMany:
          "Internal error while deleting many cartItems.",
      };
    case "zh": // Tiếng Trung
      return {
        userIdNotFound: "未找到用户ID！",
        internalErrorDeleteMany: "删除多个cartItem时发生系统错误。",
      };
    case "fr": // Tiếng Pháp
      return {
        userIdNotFound: "ID utilisateur introuvable !",
        internalErrorDeleteMany:
          "Erreur système lors de la suppression de plusieurs cartItems.",
      };
    case "ja": // Tiếng Nhật
      return {
        userIdNotFound: "ユーザーIDが見つかりません！",
        internalErrorDeleteMany:
          "複数のcartItem削除時にシステムエラーが発生しました。",
      };
    default: // If language is not recognized, default to English
      return {
        userIdNotFound: "User id not found!",
        internalErrorDeleteMany:
          "Internal error while deleting many cartItems.",
      };
  }
};

export const translateCartItemDelete = (language: string) => {
  switch (language) {
    case "vi": // Tiếng Việt
      return {
        idNotFound: "Không tìm thấy Id!",
        internalErrorDelete: "Lỗi hệ thống khi xóa cartItem.",
      };
    case "en": // English
      return {
        idNotFound: "Id not found!",
        internalErrorDelete: "Internal error while deleting cartItem.",
      };
    case "zh": // Tiếng Trung
      return {
        idNotFound: "未找到ID！",
        internalErrorDelete: "删除cartItem时发生系统错误。",
      };
    case "fr": // Tiếng Pháp
      return {
        idNotFound: "ID introuvable !",
        internalErrorDelete:
          "Erreur système lors de la suppression du cartItem.",
      };
    case "ja": // Tiếng Nhật
      return {
        idNotFound: "IDが見つかりません！",
        internalErrorDelete: "cartItem削除時にシステムエラーが発生しました。",
      };
    default: // If language is not recognized, default to English
      return {
        idNotFound: "Id not found!",
        internalErrorDelete: "Internal error while deleting cartItem.",
      };
  }
};

export const translateDeleteManySelectItem = (language: string) => {
  switch (language) {
    case "vi": // Tiếng Việt
      return {
        idsNotFound: "Không tìm thấy Ids !",
        userIdNotFound: "Không tìm thấy userId !",
        internalErrorDelete: "Lỗi hệ thống khi xóa nhiều item đã chọn.",
      };
    case "en": // English
      return {
        idsNotFound: "Ids not found!",
        userIdNotFound: "UserId not found!",
        internalErrorDelete:
          "Internal error while deleting many selected items.",
      };
    case "zh": // Tiếng Trung
      return {
        idsNotFound: "未找到Ids！",
        userIdNotFound: "未找到userId！",
        internalErrorDelete: "删除多个选定项时发生系统错误。",
      };
    case "fr": // Tiếng Pháp
      return {
        idsNotFound: "IDs introuvables !",
        userIdNotFound: "userId introuvable !",
        internalErrorDelete:
          "Erreur système lors de la suppression de plusieurs éléments sélectionnés.",
      };
    case "ja": // Tiếng Nhật
      return {
        idsNotFound: "Idsが見つかりません！",
        userIdNotFound: "userIdが見つかりません！",
        internalErrorDelete:
          "選択された複数のアイテムを削除中にシステムエラーが発生しました。",
      };
    default: // Default case if language is not recognized
      return {
        idsNotFound: "Ids not found!",
        userIdNotFound: "UserId not found!",
        internalErrorDelete:
          "Internal error while deleting many selected items.",
      };
  }
};

export const translateQuantityItemUpdate = (language: string) => {
  switch (language) {
    case "vi": // Tiếng Việt
      return {
        internalErrorUpdate: "Lỗi hệ thống khi cập nhật số lượng item.",
      };
    case "en": // English
      return {
        internalErrorUpdate: "Internal error while updating quantity item.",
      };
    case "zh": // Tiếng Trung
      return {
        internalErrorUpdate: "更新数量时发生系统错误。",
      };
    case "fr": // Tiếng Pháp
      return {
        internalErrorUpdate:
          "Erreur système lors de la mise à jour de la quantité de l'article.",
      };
    case "ja": // Tiếng Nhật
      return {
        internalErrorUpdate: "数量更新時にシステムエラーが発生しました。",
      };
    default: // Default case if language is not recognized
      return {
        internalErrorUpdate: "Internal error while updating quantity item.",
      };
  }
};

export const translateEmojiPost = (language: string) => {
  switch (language) {
    case "vi": // Tiếng Việt
      return {
        userIdNotFound: "Không tìm thấy user id!",
        commentOrReviewIdNotFound: "Không tìm thấy comment Id hoặc reviewId",
        emojiRequired: "Emoji là bắt buộc!",
        productIdRequired: "productId là bắt buộc!",
        invalidEmojiType: "Loại emoji không hợp lệ!",
        internalError: "Lỗi hệ thống khi post emoji.",
      };
    case "en": // English
      return {
        userIdNotFound: "User id not found!",
        commentOrReviewIdNotFound: "Comment Id or reviewId not found",
        emojiRequired: "Emoji is required!",
        productIdRequired: "ProductId is required!",
        invalidEmojiType: "Invalid emoji type!",
        internalError: "Internal error while posting emoji.",
      };
    case "zh": // Tiếng Trung
      return {
        userIdNotFound: "未找到用户ID！",
        commentOrReviewIdNotFound: "未找到评论ID或评价ID",
        emojiRequired: "Emoji是必需的！",
        productIdRequired: "产品ID是必需的！",
        invalidEmojiType: "无效的emoji类型！",
        internalError: "发布emoji时发生内部错误。",
      };
    case "fr": // Tiếng Pháp
      return {
        userIdNotFound: "ID utilisateur introuvable !",
        commentOrReviewIdNotFound: "ID de commentaire ou d'avis introuvable",
        emojiRequired: "L'emoji est requis !",
        productIdRequired: "L'ID du produit est requis !",
        invalidEmojiType: "Type d'emoji invalide !",
        internalError: "Erreur interne lors de la publication de l'emoji.",
      };
    case "ja": // Tiếng Nhật
      return {
        userIdNotFound: "ユーザーIDが見つかりません！",
        commentOrReviewIdNotFound: "コメントIDまたはレビューIDが見つかりません",
        emojiRequired: "絵文字は必須です！",
        productIdRequired: "製品IDは必須です！",
        invalidEmojiType: "無効な絵文字タイプです！",
        internalError: "絵文字の投稿時に内部エラーが発生しました。",
      };
    default: // Default case if language is not recognized
      return {
        userIdNotFound: "User id not found!",
        commentOrReviewIdNotFound: "Comment Id or reviewId not found",
        emojiRequired: "Emoji is required!",
        productIdRequired: "ProductId is required!",
        invalidEmojiType: "Invalid emoji type!",
        internalError: "Internal error while posting emoji.",
      };
  }
};

export const translateEmojiDelete = (language: string) => {
  switch (language) {
    case "vi": // Tiếng Việt
      return {
        emojiNotFound: "Không tìm thấy emoji.",
        internalError: "Lỗi hệ thống khi xóa emoji.",
      };
    case "en": // English
      return {
        emojiNotFound: "Emoji not found.",
        internalError: "Internal error while deleting emoji.",
      };
    case "zh": // Tiếng Trung
      return {
        emojiNotFound: "未找到emoji。",
        internalError: "删除emoji时发生内部错误。",
      };
    case "fr": // Tiếng Pháp
      return {
        emojiNotFound: "Emoji introuvable.",
        internalError: "Erreur interne lors de la suppression de l'emoji.",
      };
    case "ja": // Tiếng Nhật
      return {
        emojiNotFound: "絵文字が見つかりません。",
        internalError: "絵文字削除時に内部エラーが発生しました。",
      };
    default: // Default case if language is not recognized
      return {
        emojiNotFound: "Emoji not found.",
        internalError: "Internal error while deleting emoji.",
      };
  }
};

export const translateEmojiGet = (language: string) => {
  switch (language) {
    case "vi": // Tiếng Việt
      return {
        internalError: "Lỗi hệ thống khi lấy emoji.",
      };
    case "en": // English
      return {
        internalError: "Internal error while getting emoji.",
      };
    case "zh": // Tiếng Trung
      return {
        internalError: "获取emoji时发生内部错误。",
      };
    case "fr": // Tiếng Pháp
      return {
        internalError: "Erreur interne lors de la récupération de l'emoji.",
      };
    case "ja": // Tiếng Nhật
      return {
        internalError: "絵文字を取得する際に内部エラーが発生しました。",
      };
    default: // Default case if language is not recognized
      return {
        internalError: "Internal error while getting emoji.",
      };
  }
};

export const translateFavoriteProductPost = (language: string) => {
  switch (language) {
    case "vi": // Tiếng Việt
      return {
        userIdNotFound: "Không tìm thấy user id!",
        favoriteIdNotFound: "Không tìm thấy id favorite!",
        productIdRequired: "ProductId là bắt buộc!",
        productNameRequired: "productName là bắt buộc!",
        sizeRequired: "Size là bắt buộc!",
        colorRequired: "Color là bắt buộc!",
        internalError: "Lỗi hệ thống khi thêm sản phẩm yêu thích.",
      };
    case "en": // English
      return {
        userIdNotFound: "User id not found!",
        favoriteIdNotFound: "Favorite id not found!",
        productIdRequired: "ProductId is required!",
        productNameRequired: "ProductName is required!",
        sizeRequired: "Size is required!",
        colorRequired: "Color is required!",
        internalError: "Internal error while posting favorite product.",
      };
    case "zh": // Tiếng Trung
      return {
        userIdNotFound: "未找到用户ID！",
        favoriteIdNotFound: "未找到收藏ID！",
        productIdRequired: "ProductId是必需的！",
        productNameRequired: "ProductName是必需的！",
        sizeRequired: "Size是必需的！",
        colorRequired: "Color是必需的！",
        internalError: "添加收藏产品时发生内部错误。",
      };
    case "fr": // Tiếng Pháp
      return {
        userIdNotFound: "ID utilisateur introuvable !",
        favoriteIdNotFound: "ID de favori introuvable !",
        productIdRequired: "ProductId est requis !",
        productNameRequired: "ProductName est requis !",
        sizeRequired: "Size est requis !",
        colorRequired: "Color est requis !",
        internalError: "Erreur interne lors de l'ajout du produit préféré.",
      };
    case "ja": // Tiếng Nhật
      return {
        userIdNotFound: "ユーザーIDが見つかりません！",
        favoriteIdNotFound: "お気に入りIDが見つかりません！",
        productIdRequired: "ProductIdは必須です！",
        productNameRequired: "ProductNameは必須です！",
        sizeRequired: "Sizeは必須です！",
        colorRequired: "Colorは必須です！",
        internalError: "お気に入り製品の投稿中に内部エラーが発生しました。",
      };
    default: // Default case if language is not recognized
      return {
        userIdNotFound: "User id not found!",
        favoriteIdNotFound: "Favorite id not found!",
        productIdRequired: "ProductId is required!",
        productNameRequired: "ProductName is required!",
        sizeRequired: "Size is required!",
        colorRequired: "Color is required!",
        internalError: "Internal error while posting favorite product.",
      };
  }
};

export const translateFavoriteProductDeleteMany = (language: string) => {
  switch (language) {
    case "vi": // Tiếng Việt
      return {
        userIdNotFound: "Không tìm thấy user id!",
        idNotFound: "Không tìm thấy id!",
        internalError: "Lỗi hệ thống khi xóa nhiều sản phẩm yêu thích.",
      };
    case "en": // English
      return {
        userIdNotFound: "User id not found!",
        idNotFound: "Id not found!",
        internalError: "Internal error while deleting many favorite products.",
      };
    case "zh": // Tiếng Trung
      return {
        userIdNotFound: "未找到用户ID！",
        idNotFound: "未找到ID！",
        internalError: "删除多个收藏产品时发生内部错误。",
      };
    case "fr": // Tiếng Pháp
      return {
        userIdNotFound: "ID utilisateur introuvable !",
        idNotFound: "ID introuvable !",
        internalError:
          "Erreur interne lors de la suppression de plusieurs produits favoris.",
      };
    case "ja": // Tiếng Nhật
      return {
        userIdNotFound: "ユーザーIDが見つかりません！",
        idNotFound: "IDが見つかりません！",
        internalError:
          "複数のお気に入り製品を削除中に内部エラーが発生しました。",
      };
    default: // Default case if language is not recognized
      return {
        userIdNotFound: "User id not found!",
        idNotFound: "Id not found!",
        internalError: "Internal error while deleting many favorite products.",
      };
  }
};

export const translateFavoriteProductGet = (language: string) => {
  switch (language) {
    case "vi": // Tiếng Việt
      return {
        internalError: "Lỗi hệ thống khi lấy sản phẩm yêu thích.",
      };
    case "en": // English
      return {
        internalError: "Internal error while getting favorite product.",
      };
    case "zh": // Tiếng Trung
      return {
        internalError: "获取收藏产品时发生内部错误。",
      };
    case "fr": // Tiếng Pháp
      return {
        internalError:
          "Erreur interne lors de la récupération du produit favori.",
      };
    case "ja": // Tiếng Nhật
      return {
        internalError: "お気に入り製品を取得中に内部エラーが発生しました。",
      };
    default: // Default case if language is not recognized
      return {
        internalError: "Internal error while getting favorite product.",
      };
  }
};

export const translateLeaderboardPost = (language: string) => {
  switch (language) {
    case "vi": // Tiếng Việt
      return {
        internalError: "Lỗi hệ thống khi tạo bảng xếp hạng.",
      };
    case "en": // English
      return {
        internalError: "Internal error while posting leaderboard.",
      };
    case "zh": // Tiếng Trung
      return {
        internalError: "发布排行榜时发生内部错误。",
      };
    case "fr": // Tiếng Pháp
      return {
        internalError: "Erreur interne lors de la publication du classement.",
      };
    case "ja": // Tiếng Nhật
      return {
        internalError: "リーダーボードを投稿中に内部エラーが発生しました。",
      };
    default: // Default case if language is not recognized
      return {
        internalError: "Internal error while posting leaderboard.",
      };
  }
};

export const translateLeaderboardGet = (language: string) => {
  switch (language) {
    case "vi": // Tiếng Việt
      return {
        internalError: "Lỗi hệ thống khi lấy bảng xếp hạng.",
      };
    case "en": // English
      return {
        internalError: "Internal error while getting leaderboard.",
      };
    case "zh": // Tiếng Trung
      return {
        internalError: "获取排行榜时发生内部错误。",
      };
    case "fr": // Tiếng Pháp
      return {
        internalError: "Erreur interne lors de la récupération du classement.",
      };
    case "ja": // Tiếng Nhật
      return {
        internalError: "リーダーボードの取得中に内部エラーが発生しました。",
      };
    default: // Default case if language is not recognized
      return {
        internalError: "Internal error while getting leaderboard.",
      };
  }
};

export const translateUserDeleteAccount = (language: string) => {
  switch (language) {
    case "vi": // Tiếng Việt
      return {
        userIdNotFound: "Không tìm thấy userId!",
        internalError: "Lỗi nội bộ khi xóa người dùng.",
      };
    case "en": // English
      return {
        userIdNotFound: "UserId not found!",
        internalError: "Internal error while deleting user.",
      };
    case "zh": // Tiếng Trung
      return {
        userIdNotFound: "未找到userId！",
        internalError: "删除用户时发生内部错误。",
      };
    case "fr": // Tiếng Pháp
      return {
        userIdNotFound: "UserId introuvable !",
        internalError:
          "Erreur interne lors de la suppression de l'utilisateur.",
      };
    case "ja": // Tiếng Nhật
      return {
        userIdNotFound: "ユーザーIDが見つかりません！",
        internalError: "ユーザー削除中に内部エラーが発生しました。",
      };
    default: // Default case if language is not recognized
      return {
        userIdNotFound: "UserId not found!",
        internalError: "Internal error while deleting user.",
      };
  }
};

export const translateDeviceLimitPost1 = (language: string) => {
  switch (language) {
    case "vi": // Tiếng Việt
      return {
        userIdNotFound: "Không tìm thấy user id!",
        limitDeviceRequired: "Limit Device is required!",
        internalError: "Lỗi nội bộ khi post deviceInfo.",
      };
    case "en": // English
      return {
        userIdNotFound: "User id not found!",
        limitDeviceRequired: "Limit Device is required!",
        internalError: "Internal error while posting deviceInfo.",
      };
    case "zh": // Tiếng Trung
      return {
        userIdNotFound: "未找到用户ID！",
        limitDeviceRequired: "设备限制是必需的！",
        internalError: "发布deviceInfo时发生内部错误。",
      };
    case "fr": // Tiếng Pháp
      return {
        userIdNotFound: "ID utilisateur introuvable !",
        limitDeviceRequired: "La limite de périphériques est requise !",
        internalError: "Erreur interne lors de la publication de deviceInfo.",
      };
    case "ja": // Tiếng Nhật
      return {
        userIdNotFound: "ユーザーIDが見つかりません！",
        limitDeviceRequired: "デバイス制限が必要です！",
        internalError: "deviceInfoを投稿中に内部エラーが発生しました。",
      };
    default: // Default case if language is not recognized
      return {
        userIdNotFound: "User id not found!",
        limitDeviceRequired: "Limit Device is required!",
        internalError: "Internal error while posting deviceInfo.",
      };
  }
};

export const translateDeviceLimitPost2 = (
  language: string,
  newLimitDevice: number | null
) => {
  switch (language) {
    case "vi": // Tiếng Việt
      return {
        changeLimitMessage: `Cần thay đổi giới hạn mới hơn. Hiện tại bạn đã để ${newLimitDevice} thiết bị.`,
        addDeviceMessage: `Thêm thiết bị mới có giới hạn ${newLimitDevice}.`,
      };
    case "en": // English
      return {
        changeLimitMessage: `You need to change to a higher limit. Currently, you have ${newLimitDevice} devices.`,
        addDeviceMessage: `Add a new device with the limit of ${newLimitDevice}.`,
      };
    case "zh": // Tiếng Trung
      return {
        changeLimitMessage: `需要更改为更高的限制。目前您已经有 ${newLimitDevice} 台设备。`,
        addDeviceMessage: `添加新设备，限制为 ${newLimitDevice}。`,
      };
    case "fr": // Tiếng Pháp
      return {
        changeLimitMessage: `Vous devez changer pour une limite plus élevée. Actuellement, vous avez ${newLimitDevice} appareils.`,
        addDeviceMessage: `Ajoutez un nouvel appareil avec une limite de ${newLimitDevice}.`,
      };
    case "ja": // Tiếng Nhật
      return {
        changeLimitMessage: `新しい制限に変更する必要があります。現在、${newLimitDevice} 台のデバイスがあります。`,
        addDeviceMessage: `${newLimitDevice} の制限で新しいデバイスを追加してください。`,
      };
    default: // Default case if language is not recognized
      return {
        changeLimitMessage: `You need to change to a higher limit. Currently, you have ${newLimitDevice} devices.`,
        addDeviceMessage: `Add a new device with the limit of ${newLimitDevice}.`,
      };
  }
};

export const translateDeviceDelete = (
  language: string
): Record<string, string> => {
  switch (language) {
    case "vi": // Tiếng Việt
      return {
        userIdNotFound: "Không tìm thấy userId!",
        idNotFound: "Không tìm thấy id!",
        cannotDeleteOnlyDevice: "Không thể xóa thiết bị duy nhất!",
        internalErrorDeleteDevice: "Lỗi nội bộ khi xóa thiết bị.",
      };
    case "en": // English
      return {
        userIdNotFound: "UserId not found!",
        idNotFound: "Id not found!",
        cannotDeleteOnlyDevice: "Cannot delete the only device!",
        internalErrorDeleteDevice: "Internal error while deleting device.",
      };
    case "zh": // Tiếng Trung
      return {
        userIdNotFound: "未找到userId！",
        idNotFound: "未找到id！",
        cannotDeleteOnlyDevice: "无法删除唯一设备！",
        internalErrorDeleteDevice: "删除设备时发生内部错误。",
      };
    case "fr": // Tiếng Pháp
      return {
        userIdNotFound: "UserId introuvable !",
        idNotFound: "ID introuvable !",
        cannotDeleteOnlyDevice: "Impossible de supprimer le seul appareil !",
        internalErrorDeleteDevice:
          "Erreur interne lors de la suppression de l'appareil.",
      };
    case "ja": // Tiếng Nhật
      return {
        userIdNotFound: "userIdが見つかりません！",
        idNotFound: "idが見つかりません！",
        cannotDeleteOnlyDevice: "唯一のデバイスを削除することはできません！",
        internalErrorDeleteDevice:
          "デバイスの削除中に内部エラーが発生しました。",
      };
    default: // Default case if language is not recognized
      return {
        userIdNotFound: "UserId not found!",
        idNotFound: "Id not found!",
        cannotDeleteOnlyDevice: "Cannot delete the only device!",
        internalErrorDeleteDevice: "Internal error while deleting device.",
      };
  }
};

export const translateResendCountPost = (
  language: string
): Record<string, string> => {
  switch (language) {
    case "vi": // Tiếng Việt
      return {
        userIdNotFound: "Không tìm thấy user id!",
        storeIdRequired: "Store id là bắt buộc!",
        storeIdNotFound: "Không tìm thấy store id!",
        internalErrorPostResendCount: "Lỗi nội bộ khi gửi lại số lần.",
      };
    case "en": // English
      return {
        userIdNotFound: "User id not found!",
        storeIdRequired: "Store id is required!",
        storeIdNotFound: "Store id not found!",
        internalErrorPostResendCount:
          "Internal error while posting resend count.",
      };
    case "zh": // Tiếng Trung
      return {
        userIdNotFound: "未找到用户id！",
        storeIdRequired: "商店id是必需的！",
        storeIdNotFound: "未找到商店id！",
        internalErrorPostResendCount: "重新发送次数时发生内部错误。",
      };
    case "fr": // Tiếng Pháp
      return {
        userIdNotFound: "ID utilisateur introuvable !",
        storeIdRequired: "L'ID du magasin est requis !",
        storeIdNotFound: "ID du magasin introuvable !",
        internalErrorPostResendCount:
          "Erreur interne lors de la mise à jour du nombre de renvois.",
      };
    case "ja": // Tiếng Nhật
      return {
        userIdNotFound: "ユーザーIDが見つかりません！",
        storeIdRequired: "店舗IDは必須です！",
        storeIdNotFound: "店舗IDが見つかりません！",
        internalErrorPostResendCount:
          "再送信回数の送信中に内部エラーが発生しました。",
      };
    default: // Default case if language is not recognized
      return {
        userIdNotFound: "User id not found!",
        storeIdRequired: "Store id is required!",
        storeIdNotFound: "Store id not found!",
        internalErrorPostResendCount:
          "Internal error while posting resend count.",
      };
  }
};

export const translateSentEmailFeedbackPost = (
  language: string
): Record<string, string> => {
  switch (language) {
    case "vi": // Tiếng Việt
      return {
        emailNotFound: "Không tìm thấy email!",
        subjectNotFound: "Không tìm thấy subject!",
        valueNotFound: "Không tìm thấy value!",
        internalErrorPostSentEmailFeedback:
          "Lỗi nội bộ khi gửi feedback Email.",
      };
    case "en": // English
      return {
        emailNotFound: "Email not found!",
        subjectNotFound: "Subject not found!",
        valueNotFound: "Value not found!",
        internalErrorPostSentEmailFeedback:
          "Internal error while posting sent Email feedback.",
      };
    case "zh": // Tiếng Trung
      return {
        emailNotFound: "未找到电子邮件！",
        subjectNotFound: "未找到主题！",
        valueNotFound: "未找到值！",
        internalErrorPostSentEmailFeedback: "发送电子邮件反馈时发生内部错误。",
      };
    case "fr": // Tiếng Pháp
      return {
        emailNotFound: "Email introuvable !",
        subjectNotFound: "Sujet introuvable !",
        valueNotFound: "Valeur introuvable !",
        internalErrorPostSentEmailFeedback:
          "Erreur interne lors de l'envoi des retours par e-mail.",
      };
    case "ja": // Tiếng Nhật
      return {
        emailNotFound: "メールが見つかりません！",
        subjectNotFound: "件名が見つかりません！",
        valueNotFound: "値が見つかりません！",
        internalErrorPostSentEmailFeedback:
          "送信されたメールのフィードバックの投稿中に内部エラーが発生しました。",
      };
    default: // Default case if language is not recognized
      return {
        emailNotFound: "Email not found!",
        subjectNotFound: "Subject not found!",
        valueNotFound: "Value not found!",
        internalErrorPostSentEmailFeedback:
          "Internal error while posting sent Email feedback.",
      };
  }
};

export const translateStoreGet = (language: string): Record<string, string> => {
  switch (language) {
    case "vi": // Tiếng Việt
      return {
        userIdNotFound: "Không tìm thấy user id!",
        permissionDenied: "Bạn không có quyền để xem cửa hàng!",
        internalErrorGetStore: "Lỗi nội bộ khi lấy thông tin cửa hàng.",
      };
    case "en": // English
      return {
        userIdNotFound: "User id not found!",
        permissionDenied: "You do not have permission to view the store!",
        internalErrorGetStore:
          "Internal error while getting store information.",
      };
    case "zh": // Tiếng Trung
      return {
        userIdNotFound: "未找到用户ID！",
        permissionDenied: "您没有权限查看商店！",
        internalErrorGetStore: "获取商店信息时发生内部错误。",
      };
    case "fr": // Tiếng Pháp
      return {
        userIdNotFound: "ID utilisateur introuvable !",
        permissionDenied: "Vous n'avez pas la permission de voir la boutique !",
        internalErrorGetStore:
          "Erreur interne lors de la récupération des informations de la boutique.",
      };
    case "ja": // Tiếng Nhật
      return {
        userIdNotFound: "ユーザーIDが見つかりません！",
        permissionDenied: "店舗を表示する権限がありません！",
        internalErrorGetStore: "店舗情報の取得中に内部エラーが発生しました。",
      };
    default: // Default case if language is not recognized
      return {
        userIdNotFound: "User id not found!",
        permissionDenied: "You do not have permission to view the store!",
        internalErrorGetStore:
          "Internal error while getting store information.",
      };
  }
};

export const translateStorePost = (
  language: string
): Record<string, string> => {
  switch (language) {
    case "vi": // Tiếng Việt
      return {
        userIdNotFound: "Không tìm thấy user id!",
        permissionDenied: "Bạn không có quyền để tạo cửa hàng mới!",
        nameRequired: "Tên là bắt buộc",
        internalErrorPostStore: "Lỗi nội bộ khi tạo cửa hàng mới.",
      };
    case "en": // English
      return {
        userIdNotFound: "User id not found!",
        permissionDenied: "You do not have permission to create a new store!",
        nameRequired: "Name is required",
        internalErrorPostStore: "Internal error while creating the new store.",
      };
    case "zh": // Tiếng Trung
      return {
        userIdNotFound: "未找到用户ID！",
        permissionDenied: "您没有权限创建新商店！",
        nameRequired: "名称是必需的",
        internalErrorPostStore: "创建新商店时发生内部错误。",
      };
    case "fr": // Tiếng Pháp
      return {
        userIdNotFound: "ID utilisateur introuvable !",
        permissionDenied:
          "Vous n'avez pas la permission de créer un nouveau magasin !",
        nameRequired: "Le nom est requis",
        internalErrorPostStore:
          "Erreur interne lors de la création du nouveau magasin.",
      };
    case "ja": // Tiếng Nhật
      return {
        userIdNotFound: "ユーザーIDが見つかりません！",
        permissionDenied: "新しい店舗を作成する権限がありません！",
        nameRequired: "名前は必須です",
        internalErrorPostStore:
          "新しい店舗の作成中に内部エラーが発生しました。",
      };
    default: // Default case if language is not recognized
      return {
        userIdNotFound: "User id not found!",
        permissionDenied: "You do not have permission to create a new store!",
        nameRequired: "Name is required",
        internalErrorPostStore: "Internal error while creating the new store.",
      };
  }
};

export const translateStoreDelete = (
  language: string
): Record<string, string> => {
  switch (language) {
    case "vi": // Tiếng Việt
      return {
        userIdNotFound: "Không tìm thấy userId!",
        permissionDenied: "Bạn không có quyền xóa store!",
        idsArrayNotEmpty: "Mảng IDs không được trống!",
        deletionSuccess: "Xóa thành công!",
        internalErrorDeleteStore: "Lỗi nội bộ khi xóa store.",
      };
    case "en": // English
      return {
        userIdNotFound: "UserId not found!",
        permissionDenied: "You do not have permission to delete the store!",
        idsArrayNotEmpty: "IDs array cannot be empty!",
        deletionSuccess: "Deletion successful!",
        internalErrorDeleteStore: "Internal error while deleting the store.",
      };
    case "zh": // Tiếng Trung
      return {
        userIdNotFound: "未找到用户ID！",
        permissionDenied: "您无权删除商店！",
        idsArrayNotEmpty: "IDs数组不能为空！",
        deletionSuccess: "删除成功！",
        internalErrorDeleteStore: "删除商店时发生内部错误。",
      };
    case "fr": // Tiếng Pháp
      return {
        userIdNotFound: "ID utilisateur introuvable !",
        permissionDenied:
          "Vous n'avez pas la permission de supprimer le magasin !",
        idsArrayNotEmpty: "Le tableau des IDs ne peut pas être vide !",
        deletionSuccess: "Suppression réussie !",
        internalErrorDeleteStore:
          "Erreur interne lors de la suppression du magasin.",
      };
    case "ja": // Tiếng Nhật
      return {
        userIdNotFound: "ユーザーIDが見つかりません！",
        permissionDenied: "ストアを削除する権限がありません！",
        idsArrayNotEmpty: "IDs配列は空にできません！",
        deletionSuccess: "削除成功！",
        internalErrorDeleteStore: "ストア削除中に内部エラーが発生しました。",
      };
    default: // Default case if language is not recognized
      return {
        userIdNotFound: "UserId not found!",
        permissionDenied: "You do not have permission to delete the store!",
        idsArrayNotEmpty: "IDs array cannot be empty!",
        deletionSuccess: "Deletion successful!",
        internalErrorDeleteStore: "Internal error while deleting the store.",
      };
  }
};

export const translateStoreIdPatch = (
  language: string
): Record<string, string> => {
  switch (language) {
    case "vi": // Tiếng Việt
      return {
        userIdNotFound: "Không tìm thấy user id!",
        permissionDenied: "Bạn không có quyền để sửa đổi cửa hàng!",
        nameRequired: "Name là bắt buộc",
        storeIdRequired: "Store id là bắt buộc",
        internalErrorPatchStore: "Lỗi nội bộ khi sửa đổi cửa hàng",
      };
    case "en": // English
      return {
        userIdNotFound: "User id not found!",
        permissionDenied: "You do not have permission to update the store!",
        nameRequired: "Name is required",
        storeIdRequired: "Store id is required",
        internalErrorPatchStore: "Internal error while updating the store",
      };
    case "zh": // Tiếng Trung
      return {
        userIdNotFound: "未找到用户ID！",
        permissionDenied: "您无权修改商店！",
        nameRequired: "名称是必需的",
        storeIdRequired: "商店ID是必需的",
        internalErrorPatchStore: "更新商店时发生内部错误",
      };
    case "fr": // Tiếng Pháp
      return {
        userIdNotFound: "ID utilisateur introuvable !",
        permissionDenied:
          "Vous n'avez pas la permission de modifier le magasin !",
        nameRequired: "Le nom est obligatoire",
        storeIdRequired: "L'ID du magasin est obligatoire",
        internalErrorPatchStore:
          "Erreur interne lors de la mise à jour du magasin",
      };
    case "ja": // Tiếng Nhật
      return {
        userIdNotFound: "ユーザーIDが見つかりません！",
        permissionDenied: "ストアを更新する権限がありません！",
        nameRequired: "名前は必須です",
        storeIdRequired: "ストアIDは必須です",
        internalErrorPatchStore: "店舗更新時に内部エラーが発生しました",
      };
    default: // Default case if language is not recognized
      return {
        userIdNotFound: "User id not found!",
        permissionDenied: "You do not have permission to update the store!",
        nameRequired: "Name is required",
        storeIdRequired: "Store id is required",
        internalErrorPatchStore: "Internal error while updating the store",
      };
  }
};

export const translateStoreIdDelete = (
  language: string
): Record<string, string> => {
  switch (language) {
    case "vi": // Tiếng Việt
      return {
        userIdNotFound: "Không tìm thấy user id!",
        permissionDenied: "Bạn không có quyền để xóa cửa hàng!",
        storeIdRequired: "Store id là bắt buộc",
        cannotDeleteStore:
          "Không thể xóa cửa hàng. Hệ thống cần ít nhất 1 cửa hàng.",
        internalErrorDeleteStore: "Lỗi nội bộ khi xóa cửa hàng",
      };
    case "en": // English
      return {
        userIdNotFound: "User id not found!",
        permissionDenied: "You do not have permission to delete the store!",
        storeIdRequired: "Store id is required",
        cannotDeleteStore:
          "Cannot delete the store. The system requires at least 1 store.",
        internalErrorDeleteStore: "Internal error while deleting the store",
      };
    case "zh": // Tiếng Trung
      return {
        userIdNotFound: "未找到用户ID！",
        permissionDenied: "您无权删除商店！",
        storeIdRequired: "商店ID是必需的",
        cannotDeleteStore: "无法删除商店。系统至少需要一个商店。",
        internalErrorDeleteStore: "删除商店时发生内部错误",
      };
    case "fr": // Tiếng Pháp
      return {
        userIdNotFound: "ID utilisateur introuvable !",
        permissionDenied:
          "Vous n'avez pas la permission de supprimer le magasin !",
        storeIdRequired: "L'ID du magasin est obligatoire",
        cannotDeleteStore:
          "Impossible de supprimer le magasin. Le système nécessite au moins 1 magasin.",
        internalErrorDeleteStore:
          "Erreur interne lors de la suppression du magasin",
      };
    case "ja": // Tiếng Nhật
      return {
        userIdNotFound: "ユーザーIDが見つかりません！",
        permissionDenied: "ストアを削除する権限がありません！",
        storeIdRequired: "ストアIDは必須です",
        cannotDeleteStore:
          "店舗を削除できません。システムには少なくとも1つの店舗が必要です。",
        internalErrorDeleteStore: "店舗削除時に内部エラーが発生しました",
      };
    default: // Default case if language is not recognized
      return {
        userIdNotFound: "User id not found!",
        permissionDenied: "You do not have permission to delete the store!",
        storeIdRequired: "Store id is required",
        cannotDeleteStore:
          "Cannot delete the store. The system requires at least 1 store.",
        internalErrorDeleteStore: "Internal error while deleting the store",
      };
  }
};

export const translateLanguageUpdate = (
  language: string
): Record<string, string> => {
  switch (language) {
    case "vi": // Tiếng Việt
      return {
        userIdNotFound: "Không tìm thấy user id!",
        languageRequired: "Ngôn ngữ là bắt buộc",
        internalErrorUpdateLanguage: "Lỗi nội bộ khi cập nhật ngôn ngữ",
      };
    case "en": // English
      return {
        userIdNotFound: "User id not found!",
        languageRequired: "Language is required",
        internalErrorUpdateLanguage: "Internal error while updating language",
      };
    case "zh": // Tiếng Trung
      return {
        userIdNotFound: "未找到用户ID！",
        languageRequired: "语言是必需的",
        internalErrorUpdateLanguage: "更新语言时发生内部错误",
      };
    case "fr": // Tiếng Pháp
      return {
        userIdNotFound: "ID utilisateur introuvable !",
        languageRequired: "La langue est requise",
        internalErrorUpdateLanguage:
          "Erreur interne lors de la mise à jour de la langue",
      };
    case "ja": // Tiếng Nhật
      return {
        userIdNotFound: "ユーザーIDが見つかりません！",
        languageRequired: "言語は必須です",
        internalErrorUpdateLanguage: "言語の更新時に内部エラーが発生しました",
      };
    default: // Default case if language is not recognized
      return {
        userIdNotFound: "User id not found!",
        languageRequired: "Language is required",
        internalErrorUpdateLanguage: "Internal error while updating language",
      };
  }
};

export const get2FAMessage = (
  language: string,
  email: string,
  token: string,
  domain: string | undefined
): { subject: string; html: string } => {
  switch (language) {
    case "vi": // Tiếng Việt
      return {
        subject: `Mã xác thực 2 yếu tố: ${token}`,
        html: `
                  <p>Xin chào <strong>${email}!</strong> Mã xác thực 2FA của bạn: <strong style="color: #3b82f6; text-decoration: underline;">${token}</strong> là mã xác thực đăng nhập trên <a href="${domain}">vlxd Xuân Trường</a>. Mã có hiệu lực trong vòng 5 phút. Nếu có thắc mắc, vui lòng liên hệ <strong>0352261103</strong>.</p>
              `,
      };
    case "en": // English
      return {
        subject: `Two-Factor Authentication Code: ${token}`,
        html: `
                  <p>Hello <strong>${email}!</strong> Your 2FA code: <strong style="color: #3b82f6; text-decoration: underline;">${token}</strong> is the login authentication code on <a href="${domain}">vlxd Xuân Trường</a>. The code is valid for 5 minutes. If you have any questions, contact <strong>0352261103</strong>.</p>
              `,
      };
    case "zh": // Chinese
      return {
        subject: `二次验证验证码: ${token}`,
        html: `
                  <p>你好 <strong>${email}!</strong> 您的2FA验证码：<strong style="color: #3b82f6; text-decoration: underline;">${token}</strong> 是在 <a href="${domain}">vlxd Xuân Trường</a> 登录的认证码。该验证码在5分钟内有效。如有任何疑问，请联系 <strong>0352261103</strong>.</p>
              `,
      };
    case "fr": // French
      return {
        subject: `Code d'authentification à deux facteurs: ${token}`,
        html: `
                  <p>Bonjour <strong>${email}!</strong> Votre code 2FA : <strong style="color: #3b82f6; text-decoration: underline;">${token}</strong> est le code d'authentification pour vous connecter sur <a href="${domain}">vlxd Xuân Trường</a>. Le code est valable pendant 5 minutes. Si vous avez des questions, contactez <strong>0352261103</strong>.</p>
              `,
      };
    case "ja": // Japanese
      return {
        subject: `二段階認証コード: ${token}`,
        html: `
                  <p>こんにちは <strong>${email}!</strong> あなたの2FAコード：<strong style="color: #3b82f6; text-decoration: underline;">${token}</strong> は <a href="${domain}">vlxd Xuân Trường</a> のログイン認証コードです。このコードは5分間有効です。質問がある場合は、<strong>0352261103</strong> にお問い合わせください。</p>
              `,
      };
    default: // Ngôn ngữ không hợp lệ, mặc định dùng tiếng Anh
      return {
        subject: `Two-Factor Authentication Code: ${token}`,
        html: `
                  <p>Hello <strong>${email}!</strong> Your 2FA code: <strong style="color: #3b82f6; text-decoration: underline;">${token}</strong> is the login authentication code on <a href="${domain}">vlxd Xuân Trường</a>. The code is valid for 5 minutes. If you have any questions, contact <strong>0352261103</strong>.</p>
              `,
      };
  }
};

export const translateResetPasswordMessage = (
  language: string,
  email: string,
  restLink: string,
  resendTokenNewpassword: number | 0
): { subject: string; html: string } => {
  switch (language) {
    case "vi": // Vietnamese
      return {
        subject: "Đặt lại mật khẩu của bạn",
        html: `<p>Xin chào <strong style="color: #3b82f6; text-decoration: underline;">${email}</strong>! Nhấp <a href="${restLink}"> vào đây</a> để làm mới mật khẩu. Xác thực làm mới mật khẩu có hiệu lực trong vòng 5 phút. Nếu có thắc mắc liên hệ <strong>0352261103</strong>. Bạn đã gửi lại <span style="color:#FF3131; font-weight: 800;">${resendTokenNewpassword}</span> lần. Nếu vượt quá 5 lần bạn sẽ bị ban.<p style="color:#FF3131; font-weight: 800;"> Lý do: Spam.</p></p>`,
      };
    case "en": // English
      return {
        subject: "Reset your password",
        html: `<p>Hello <strong style="color: #3b82f6; text-decoration: underline;">${email}</strong>! Click <a href="${restLink}">here</a> to reset your password. The password reset link will expire in 5 minutes. If you have any questions, contact <strong>0352261103</strong>. You have requested a reset <span style="color:#FF3131; font-weight: 800;">${resendTokenNewpassword}</span> times. If this exceeds 5 attempts, your account will be banned.<p style="color:#FF3131; font-weight: 800;"> Reason: Spam.</p></p>`,
      };
    case "zh": // Chinese
      return {
        subject: "重置您的密码",
        html: `<p>你好 <strong style="color: #3b82f6; text-decoration: underline;">${email}</strong>！点击 <a href="${restLink}">此处</a> 重置您的密码。密码重置链接将在5分钟内过期。如果您有任何问题，请联系 <strong>0352261103</strong>。您已请求重置 <span style="color:#FF3131; font-weight: 800;">${resendTokenNewpassword}</span> 次。如果超过5次，您的账户将被禁止。<p style="color:#FF3131; font-weight: 800;">原因：垃圾邮件。</p></p>`,
      };
    case "fr": // French
      return {
        subject: "Réinitialisez votre mot de passe",
        html: `<p>Bonjour <strong style="color: #3b82f6; text-decoration: underline;">${email}</strong> ! Cliquez <a href="${restLink}">ici</a> pour réinitialiser votre mot de passe. Le lien de réinitialisation du mot de passe expirera dans 5 minutes. Si vous avez des questions, contactez <strong>0352261103</strong>. Vous avez demandé une réinitialisation <span style="color:#FF3131; font-weight: 800;">${resendTokenNewpassword}</span> fois. Si cela dépasse 5 tentatives, votre compte sera banni.<p style="color:#FF3131; font-weight: 800;"> Raison : Spam.</p></p>`,
      };
    case "ja": // Japanese
      return {
        subject: "パスワードのリセット",
        html: `<p>こんにちは <strong style="color: #3b82f6; text-decoration: underline;">${email}</strong>！<a href="${restLink}">ここをクリック</a>してパスワードをリセットしてください。パスワードリセットリンクは5分以内に期限切れになります。質問がある場合は、<strong>0352261103</strong>までご連絡ください。パスワードリセットを <span style="color:#FF3131; font-weight: 800;">${resendTokenNewpassword}</span> 回要求しました。5回を超えると、アカウントが禁止されます。<p style="color:#FF3131; font-weight: 800;"> 理由：スパム。</p></p>`,
      };
    default:
      return {
        subject: "Reset your password",
        html: `<p>Hello <strong style="color: #3b82f6; text-decoration: underline;">${email}</strong>! Click <a href="${restLink}">here</a> to reset your password. The password reset link will expire in 5 minutes. If you have any questions, contact <strong>0352261103</strong>.</p>`,
      };
  }
};


export const translateConfirmEmailMessage = (
  language: string, 
  email: string, 
  confirmLink: string, 
  resendTokenVerifyCount: number | 0
): { subject: string, html: string } => {
  switch(language) {
    case 'vi': // Vietnamese
      return {
        subject: "Xác nhận email của bạn",
        html: `<p>Xin chào <strong style="color: #3b82f6; text-decoration: underline;">${email}</strong>! Nhấp <a href="${confirmLink}">vào đây</a> để xác nhận email. Xác thực có hiệu lực trong vòng 5 phút. Nếu có thắc mắc, liên hệ <strong>0352261103</strong>. Bạn đã gửi lại <span style="color:#FF3131; font-weight: 800;">${resendTokenVerifyCount}</span> lần. Nếu vượt quá 5 lần bạn sẽ bị ban.<p style="color:#FF3131; font-weight: 800;"> Lý do: Spam.</p></p>`
      };
    case 'en': // English
      return {
        subject: "Confirm your email",
        html: `<p>Hello <strong style="color: #3b82f6; text-decoration: underline;">${email}</strong>! Click <a href="${confirmLink}">here</a> to confirm your email. The confirmation link will expire in 5 minutes. If you have any questions, contact <strong>0352261103</strong>. You have requested this confirmation <span style="color:#FF3131; font-weight: 800;">${resendTokenVerifyCount}</span> times. If this exceeds 5 attempts, your account will be banned.<p style="color:#FF3131; font-weight: 800;"> Reason: Spam.</p></p>`
      };
    case 'zh': // Chinese
      return {
        subject: "确认您的电子邮件",
        html: `<p>你好 <strong style="color: #3b82f6; text-decoration: underline;">${email}</strong>！点击 <a href="${confirmLink}">此处</a> 确认您的电子邮件。确认链接将在5分钟内过期。如果您有任何问题，请联系 <strong>0352261103</strong>。您已请求确认 <span style="color:#FF3131; font-weight: 800;">${resendTokenVerifyCount}</span> 次。如果超过5次，您的账户将被禁止。<p style="color:#FF3131; font-weight: 800;">原因：垃圾邮件。</p></p>`
      };
    case 'fr': // French
      return {
        subject: "Confirmez votre email",
        html: `<p>Bonjour <strong style="color: #3b82f6; text-decoration: underline;">${email}</strong> ! Cliquez <a href="${confirmLink}">ici</a> pour confirmer votre email. Le lien de confirmation expirera dans 5 minutes. Si vous avez des questions, contactez <strong>0352261103</strong>. Vous avez demandé cette confirmation <span style="color:#FF3131; font-weight: 800;">${resendTokenVerifyCount}</span> fois. Si cela dépasse 5 tentatives, votre compte sera banni.<p style="color:#FF3131; font-weight: 800;"> Raisons : Spam.</p></p>`
      };
    case 'ja': // Japanese
      return {
        subject: "メールアドレスの確認",
        html: `<p>こんにちは <strong style="color: #3b82f6; text-decoration: underline;">${email}</strong>！<a href="${confirmLink}">ここをクリック</a>してメールアドレスを確認してください。確認リンクは5分以内に期限切れになります。質問がある場合は、<strong>0352261103</strong>までご連絡ください。確認を <span style="color:#FF3131; font-weight: 800;">${resendTokenVerifyCount}</span> 回要求しました。5回を超えると、アカウントが禁止されます。<p style="color:#FF3131; font-weight: 800;"> 理由：スパム。</p></p>`
      };
    default:
      return {
        subject: "Confirm your email",
        html: `<p>Hello <strong style="color: #3b82f6; text-decoration: underline;">${email}</strong>! Click <a href="${confirmLink}">here</a> to confirm your email. The confirmation link will expire in 5 minutes. If you have any questions, contact <strong>0352261103</strong>.</p>`
      };
  }
};


export const translateVerifyEmailCitizenMessage = (
  language: string, 
  email: string | null, 
  domain: string | undefined
): { subject: string, html: string } => {
  switch(language) {
    case 'vi': // Vietnamese
      return {
        subject: "Xác thực email của bạn",
        html: `<p>Xin chào <strong style="color: #3b82f6; text-decoration: underline;">${email}</strong>! Tài khoản của bạn đã được xác thực. Bạn đã là nhân viên của <a href="${domain}">vlxd Xuân Trường</a>. Hãy vào xem role hiện tại của bạn đã được thay đổi thành <strong style="color: #3b82f6;">STAFF</strong> chưa? Nếu chưa thay đổi hãy liên hệ <strong>0352261103</strong>.</p>`
      };
    case 'en': // English
      return {
        subject: "Verify your email",
        html: `<p>Hello <strong style="color: #3b82f6; text-decoration: underline;">${email}</strong>! Your account has been verified. You are now an employee of <a href="${domain}">vlxd Xuân Trường</a>. Please check if your role has been updated to <strong style="color: #3b82f6;">STAFF</strong>. If not, contact <strong>0352261103</strong>.</p>`
      };
    case 'zh': // Chinese
      return {
        subject: "验证您的电子邮件",
        html: `<p>你好 <strong style="color: #3b82f6; text-decoration: underline;">${email}</strong>！您的账户已经验证。您现在是 <a href="${domain}">vlxd Xuân Trường</a> 的员工。请检查您的角色是否已更改为 <strong style="color: #3b82f6;">STAFF</strong>。如果没有，请联系 <strong>0352261103</strong>。</p>`
      };
    case 'fr': // French
      return {
        subject: "Vérifiez votre email",
        html: `<p>Bonjour <strong style="color: #3b82f6; text-decoration: underline;">${email}</strong> ! Votre compte a été vérifié. Vous êtes désormais un employé de <a href="${domain}">vlxd Xuân Trường</a>. Veuillez vérifier si votre rôle a été mis à jour en <strong style="color: #3b82f6;">STAFF</strong>. Si ce n'est pas le cas, contactez <strong>0352261103</strong>.</p>`
      };
    case 'ja': // Japanese
      return {
        subject: "メールアドレスの確認",
        html: `<p>こんにちは <strong style="color: #3b82f6; text-decoration: underline;">${email}</strong>！あなたのアカウントは確認されました。現在、あなたは <a href="${domain}">vlxd Xuân Trường</a> の社員です。ロールが <strong style="color: #3b82f6;">STAFF</strong> に変更されているか確認してください。変更されていない場合は、<strong>0352261103</strong> に連絡してください。</p>`
      };
    default:
      return {
        subject: "Verify your email",
        html: `<p>Hello <strong style="color: #3b82f6; text-decoration: underline;">${email}</strong>! Your account has been verified. You are now an employee of <a href="${domain}">vlxd Xuân Trường</a>. Please check if your role has been updated to <strong style="color: #3b82f6;">STAFF</strong>. If not, contact <strong>0352261103</strong>.</p>`
      };
  }
};


export const translateVerifyEmailCitizenShipperMessage = (
  language: string, 
  email: string | null, 
  domain: string | undefined
): { subject: string, html: string } => {
  switch(language) {
    case 'vi': // Vietnamese
      return {
        subject: "Xác thực email của bạn",
        html: `<p>Xin chào <strong style="color: #3b82f6; text-decoration: underline;">${email}</strong>! Tài khoản của bạn đã được xác thực. Bạn đã là nhân viên của <a href="${domain}">vlxd Xuân Trường</a>. Hãy vào xem role hiện tại của bạn đã được thay đổi thành <strong style="color: #3b82f6;">SHIPPER</strong> chưa? Nếu chưa thay đổi hãy liên hệ <strong>0352261103</strong>.</p>`
      };
    case 'en': // English
      return {
        subject: "Verify your email",
        html: `<p>Hello <strong style="color: #3b82f6; text-decoration: underline;">${email}</strong>! Your account has been verified. You are now an employee of <a href="${domain}">vlxd Xuân Trường</a>. Please check if your role has been updated to <strong style="color: #3b82f6;">SHIPPER</strong>. If not, contact <strong>0352261103</strong>.</p>`
      };
    case 'zh': // Chinese
      return {
        subject: "验证您的电子邮件",
        html: `<p>你好 <strong style="color: #3b82f6; text-decoration: underline;">${email}</strong>！您的账户已验证。您现在是 <a href="${domain}">vlxd Xuân Trường</a> 的员工。请检查您的角色是否已更新为 <strong style="color: #3b82f6;">SHIPPER</strong>。如果没有，请联系 <strong>0352261103</strong>。</p>`
      };
    case 'fr': // French
      return {
        subject: "Vérifiez votre email",
        html: `<p>Bonjour <strong style="color: #3b82f6; text-decoration: underline;">${email}</strong> ! Votre compte a été vérifié. Vous êtes désormais un employé de <a href="${domain}">vlxd Xuân Trường</a>. Veuillez vérifier si votre rôle a été mis à jour en <strong style="color: #3b82f6;">SHIPPER</strong>. Si ce n'est pas le cas, contactez <strong>0352261103</strong>.</p>`
      };
    case 'ja': // Japanese
      return {
        subject: "メールアドレスの確認",
        html: `<p>こんにちは <strong style="color: #3b82f6; text-decoration: underline;">${email}</strong>！あなたのアカウントは確認されました。現在、あなたは <a href="${domain}">vlxd Xuân Trường</a> の社員です。ロールが <strong style="color: #3b82f6;">SHIPPER</strong> に変更されているか確認してください。変更されていない場合は、<strong>0352261103</strong> に連絡してください。</p>`
      };
    default:
      return {
        subject: "Verify your email",
        html: `<p>Hello <strong style="color: #3b82f6; text-decoration: underline;">${email}</strong>! Your account has been verified. You are now an employee of <a href="${domain}">vlxd Xuân Trường</a>. Please check if your role has been updated to <strong style="color: #3b82f6;">SHIPPER</strong>. If not, contact <strong>0352261103</strong>.</p>`
      };
  }
};

export const translateVerifyEmailCitizenMarketingMessage = (
  language: string, 
  email: string | null, 
  domain: string | undefined
): { subject: string, html: string } => {
  switch(language) {
    case 'vi': // Vietnamese
      return {
        subject: "Xác thực email của bạn",
        html: `<p>Xin chào <strong style="color: #3b82f6; text-decoration: underline;">${email}</strong>! Tài khoản của bạn đã được xác thực. Bạn đã là nhân viên của <a href="${domain}">vlxd Xuân Trường</a>. Hãy vào xem role hiện tại của bạn đã được thay đổi thành <strong style="color: #3b82f6;">MAKETING</strong> chưa? Nếu chưa thay đổi hãy liên hệ <strong>0352261103</strong>.</p>`
      };
    case 'en': // English
      return {
        subject: "Verify your email",
        html: `<p>Hello <strong style="color: #3b82f6; text-decoration: underline;">${email}</strong>! Your account has been verified. You are now an employee of <a href="${domain}">vlxd Xuân Trường</a>. Please check if your role has been updated to <strong style="color: #3b82f6;">MAKETING</strong>. If not, contact <strong>0352261103</strong>.</p>`
      };
    case 'zh': // Chinese
      return {
        subject: "验证您的电子邮件",
        html: `<p>你好 <strong style="color: #3b82f6; text-decoration: underline;">${email}</strong>！您的账户已验证。您现在是 <a href="${domain}">vlxd Xuân Trường</a> 的员工。请检查您的角色是否已更新为 <strong style="color: #3b82f6;">MAKETING</strong>。如果没有，请联系 <strong>0352261103</strong>。</p>`
      };
    case 'fr': // French
      return {
        subject: "Vérifiez votre email",
        html: `<p>Bonjour <strong style="color: #3b82f6; text-decoration: underline;">${email}</strong> ! Votre compte a été vérifié. Vous êtes désormais un employé de <a href="${domain}">vlxd Xuân Trường</a>. Veuillez vérifier si votre rôle a été mis à jour en <strong style="color: #3b82f6;">MAKETING</strong>. Si ce n'est pas le cas, contactez <strong>0352261103</strong>.</p>`
      };
    case 'ja': // Japanese
      return {
        subject: "メールアドレスの確認",
        html: `<p>こんにちは <strong style="color: #3b82f6; text-decoration: underline;">${email}</strong>！あなたのアカウントは確認されました。現在、あなたは <a href="${domain}">vlxd Xuân Trường</a> の社員です。ロールが <strong style="color: #3b82f6;">MAKETING</strong> に変更されているか確認してください。変更されていない場合は、<strong>0352261103</strong> に連絡してください。</p>`
      };
    default:
      return {
        subject: "Verify your email",
        html: `<p>Hello <strong style="color: #3b82f6; text-decoration: underline;">${email}</strong>! Your account has been verified. You are now an employee of <a href="${domain}">vlxd Xuân Trường</a>. Please check if your role has been updated to <strong style="color: #3b82f6;">MAKETING</strong>. If not, contact <strong>0352261103</strong>.</p>`
      };
  }
};


export const translateBanMessage = (
  language: string, 
  nameuser: string | null | undefined, 
  start: string | null, 
  end: string | null, 
  descriptionBan: string
): { subject: string, html: string } => {
  switch(language) {
    case 'vi': // Vietnamese
      return {
        subject: "Sai quy định!",
        html: `<p>Xin chào <strong style="color: #3b82f6; text-decoration: underline;">${nameuser}</strong>! Tài khoản của bạn đã bị khóa vào lúc <strong>${start}</strong>. Thời gian mở khóa vào ngày ${end}. Bạn đã vi phạm quy định của công ty. Vì lý do: <strong>${descriptionBan}</strong>. Vui lòng liên hệ <strong>0352261103</strong> để biết thêm chi tiết.</p>`
      };
    case 'en': // English
      return {
        subject: "Violation of regulations!",
        html: `<p>Hello <strong style="color: #3b82f6; text-decoration: underline;">${nameuser}</strong>! Your account has been locked at <strong>${start}</strong>. The unlock time is on ${end}. You have violated company regulations. Reason: <strong>${descriptionBan}</strong>. Please contact <strong>0352261103</strong> for more details.</p>`
      };
    case 'zh': // Chinese
      return {
        subject: "违反规定！",
        html: `<p>你好 <strong style="color: #3b82f6; text-decoration: underline;">${nameuser}</strong>！您的账户在 <strong>${start}</strong> 被锁定。解锁时间为 ${end}。您已违反公司规定。原因: <strong>${descriptionBan}</strong>。请联系 <strong>0352261103</strong> 以了解更多详情。</p>`
      };
    case 'fr': // French
      return {
        subject: "Violation des règles!",
        html: `<p>Bonjour <strong style="color: #3b82f6; text-decoration: underline;">${nameuser}</strong> ! Votre compte a été verrouillé à <strong>${start}</strong>. Le déverrouillage aura lieu le ${end}. Vous avez enfreint les règles de l'entreprise. Raisons : <strong>${descriptionBan}</strong>. Veuillez contacter <strong>0352261103</strong> pour plus de détails.</p>`
      };
    case 'ja': // Japanese
      return {
        subject: "規則違反！",
        html: `<p>こんにちは <strong style="color: #3b82f6; text-decoration: underline;">${nameuser}</strong>！あなたのアカウントは <strong>${start}</strong> にロックされました。ロック解除の日時は ${end} です。会社の規定に違反しました。理由: <strong>${descriptionBan}</strong>。詳細については <strong>0352261103</strong> にお問い合わせください。</p>`
      };
    default:
      return {
        subject: "Violation of regulations!",
        html: `<p>Hello <strong style="color: #3b82f6; text-decoration: underline;">${nameuser}</strong>! Your account has been locked at <strong>${start}</strong>. The unlock time is on ${end}. You have violated company regulations. Reason: <strong>${descriptionBan}</strong>. Please contact <strong>0352261103</strong> for more details.</p>`
      };
  }
};


export const translateBanNotStartMessage = (
  language: string, 
  nameuser: string | null | undefined, 
  end: string | null
): { subject: string, html: string } => {
  switch(language) {
    case 'vi': // Vietnamese
      return {
        subject: "Sai quy định!",
        html: `<p>Xin chào <strong style="color: #3b82f6; text-decoration: underline;">${nameuser}</strong>! Tài khoản của bạn đã bị khóa. Thời gian mở khóa vào ngày ${end}. Bạn đã vi phạm quy định của công ty. Vui lòng liên hệ <strong>0352261103</strong> để biết thêm chi tiết.</p>`
      };
    case 'en': // English
      return {
        subject: "Violation of regulations!",
        html: `<p>Hello <strong style="color: #3b82f6; text-decoration: underline;">${nameuser}</strong>! Your account has been locked. The unlock time is on ${end}. You have violated company regulations. Please contact <strong>0352261103</strong> for more details.</p>`
      };
    case 'zh': // Chinese
      return {
        subject: "违反规定！",
        html: `<p>你好 <strong style="color: #3b82f6; text-decoration: underline;">${nameuser}</strong>！您的账户已被锁定。解锁时间为 ${end}。您已违反公司规定。请联系 <strong>0352261103</strong> 以了解更多详情。</p>`
      };
    case 'fr': // French
      return {
        subject: "Violation des règles!",
        html: `<p>Bonjour <strong style="color: #3b82f6; text-decoration: underline;">${nameuser}</strong> ! Votre compte a été verrouillé. Le déverrouillage aura lieu le ${end}. Vous avez enfreint les règles de l'entreprise. Veuillez contacter <strong>0352261103</strong> pour plus de détails.</p>`
      };
    case 'ja': // Japanese
      return {
        subject: "規則違反！",
        html: `<p>こんにちは <strong style="color: #3b82f6; text-decoration: underline;">${nameuser}</strong>！あなたのアカウントはロックされています。ロック解除の日時は ${end} です。会社の規定に違反しました。詳細については <strong>0352261103</strong> にお問い合わせください。</p>`
      };
    default:
      return {
        subject: "Violation of regulations!",
        html: `<p>Hello <strong style="color: #3b82f6; text-decoration: underline;">${nameuser}</strong>! Your account has been locked. The unlock time is on ${end}. You have violated company regulations. Please contact <strong>0352261103</strong> for more details.</p>`
      };
  }
};


export const translateUnbanMessage = (
  language: string, 
  nameuser: string | null | undefined
): { subject: string, html: string } => {
  switch(language) {
    case 'vi': // Vietnamese
      return {
        subject: "Sai quy định!",
        html: `<p>Xin chào <strong style="color: #3b82f6; text-decoration: underline;">${nameuser}</strong>! Tài khoản của bạn đã được mở khóa. Xin lỗi vì đã khóa tài khoản của bạn. Chúng tôi chỉ làm theo những lưu ý và các điều khoản đã đưa ra. Mong bạn thông cảm! Cám ơn bạn đã đồng hành cùng chúng tôi. Vui lòng liên hệ <strong>0352261103</strong> để biết thêm chi tiết.</p>`
      };
    case 'en': // English
      return {
        subject: "Violation of regulations!",
        html: `<p>Hello <strong style="color: #3b82f6; text-decoration: underline;">${nameuser}</strong>! Your account has been unlocked. We apologize for locking your account. We were just following the guidelines and terms that were set. We appreciate your understanding! Thank you for being with us. Please contact <strong>0352261103</strong> for more details.</p>`
      };
    case 'zh': // Chinese
      return {
        subject: "违反规定！",
        html: `<p>你好 <strong style="color: #3b82f6; text-decoration: underline;">${nameuser}</strong>！您的账户已被解锁。我们为锁定您的账户而道歉。我们只是遵循已设置的注意事项和条款。感谢您的理解！感谢您与我们同行。如需更多信息，请联系 <strong>0352261103</strong>。</p>`
      };
    case 'fr': // French
      return {
        subject: "Violation des règles!",
        html: `<p>Bonjour <strong style="color: #3b82f6; text-decoration: underline;">${nameuser}</strong> ! Votre compte a été déverrouillé. Nous nous excusons d'avoir verrouillé votre compte. Nous avons simplement suivi les directives et les termes définis. Nous vous remercions de votre compréhension ! Merci de rester avec nous. Veuillez contacter <strong>0352261103</strong> pour plus de détails.</p>`
      };
    case 'ja': // Japanese
      return {
        subject: "規則違反！",
        html: `<p>こんにちは <strong style="color: #3b82f6; text-decoration: underline;">${nameuser}</strong>！あなたのアカウントはロック解除されました。アカウントをロックしたことをお詫び申し上げます。私たちは設定されたガイドラインと条件に従っただけです。ご理解いただきありがとうございます！私たちと一緒にいてくれてありがとうございます。詳細については <strong>0352261103</strong> にお問い合わせください。</p>`
      };
    default:
      return {
        subject: "Violation of regulations!",
        html: `<p>Hello <strong style="color: #3b82f6; text-decoration: underline;">${nameuser}</strong>! Your account has been unlocked. We apologize for locking your account. We were just following the guidelines and terms that were set. We appreciate your understanding! Thank you for being with us. Please contact <strong>0352261103</strong> for more details.</p>`
      };
  }
};


export const translateAttendanceStartMessage = (
  language: string, 
  nameuser: string | null | undefined, 
  start: string | null, 
  end: string | null, 
  delayHours: number | 0
): { subject: string, html: string } => {
  let penaltyMessage = "";
  
  if (delayHours) {
    penaltyMessage = `<p style="color:#FF3131;">Bạn đã bị -50.000đ. Lý do: điểm danh trễ (${
      Math.floor(delayHours) +
      " giờ " +
      Math.floor((delayHours % 1) * 60) +
      " phút"
    })</p>`;
  }

  switch(language) {
    case 'vi': // Vietnamese
      return {
        subject: "Điểm danh ngày mới!",
        html: `<p>Xin chào <strong style="color: #3b82f6; text-decoration: underline;">${nameuser || "Bạn"}</strong>! Thời gian điểm danh của bạn bắt đầu lúc <strong>${start || "không xác định"}</strong> và kết thúc lúc <strong>${end || "không xác định"}</strong>. Chúc bạn 1 ngày làm việc tràn đầy năng lượng. ${penaltyMessage}</p>`
      };
    case 'en': // English
      return {
        subject: "New Day Attendance!",
        html: `<p>Hello <strong style="color: #3b82f6; text-decoration: underline;">${nameuser || "You"}</strong>! Your attendance starts at <strong>${start || "undefined"}</strong> and ends at <strong>${end || "undefined"}</strong>. Have a productive day! ${penaltyMessage}</p>`
      };
    case 'zh': // Chinese
      return {
        subject: "今日考勤！",
        html: `<p>你好 <strong style="color: #3b82f6; text-decoration: underline;">${nameuser || "您"}</strong>！您的考勤开始时间为 <strong>${start || "未定义"}</strong>，结束时间为 <strong>${end || "未定义"}</strong>。祝你今天工作愉快！ ${penaltyMessage}</p>`
      };
    case 'fr': // French
      return {
        subject: "Présence du jour!",
        html: `<p>Bonjour <strong style="color: #3b82f6; text-decoration: underline;">${nameuser || "Vous"}</strong> ! Votre heure d'entrée est à <strong>${start || "indéfini"}</strong> et votre heure de sortie à <strong>${end || "indéfini"}</strong>. Passez une excellente journée! ${penaltyMessage}</p>`
      };
    case 'ja': // Japanese
      return {
        subject: "今日の出席！",
        html: `<p>こんにちは <strong style="color: #3b82f6; text-decoration: underline;">${nameuser || "あなた"}</strong>！あなたの出席時間は <strong>${start || "未定"}</strong> に始まり、<strong>${end || "未定"}</strong> に終了します。充実した一日をお過ごしください！ ${penaltyMessage}</p>`
      };
    default:
      return {
        subject: "New Day Attendance!",
        html: `<p>Hello <strong style="color: #3b82f6; text-decoration: underline;">${nameuser || "You"}</strong>! Your attendance starts at <strong>${start || "undefined"}</strong> and ends at <strong>${end || "undefined"}</strong>. Have a productive day! ${penaltyMessage}</p>`
      };
  }
};


export const translateAttendanceEndMessage = (
  language: string, 
  nameuser: string | null | undefined, 
  end: string | null
): { subject: string, html: string } => {
  switch(language) {
    case 'vi': // Vietnamese
      return {
        subject: "Kết thúc điểm danh!",
        html: `<p>Xin chào <strong style="color: #3b82f6; text-decoration: underline;">${nameuser}</strong>! Thời gian điểm danh của bạn đã kết thúc vào lúc <strong>${end}</strong>. Chúc bạn 1 ngày tốt lành.</p>`
      };
    case 'en': // English
      return {
        subject: "Attendance finished!",
        html: `<p>Hello <strong style="color: #3b82f6; text-decoration: underline;">${nameuser}</strong>! Your attendance ended at <strong>${end}</strong>. Have a great day.</p>`
      };
    case 'zh': // Chinese
      return {
        subject: "考勤结束！",
        html: `<p>你好 <strong style="color: #3b82f6; text-decoration: underline;">${nameuser}</strong>！您的考勤已于 <strong>${end}</strong> 结束。祝您有个愉快的一天。</p>`
      };
    case 'fr': // French
      return {
        subject: "Présence terminée!",
        html: `<p>Bonjour <strong style="color: #3b82f6; text-decoration: underline;">${nameuser}</strong> ! Votre pointage s'est terminé à <strong>${end}</strong>. Passez une excellente journée.</p>`
      };
    case 'ja': // Japanese
      return {
        subject: "出席終了！",
        html: `<p>こんにちは <strong style="color: #3b82f6; text-decoration: underline;">${nameuser}</strong>！あなたの出席は <strong>${end}</strong> に終了しました。良い一日をお過ごしください。</p>`
      };
    default:
      return {
        subject: "Attendance finished!",
        html: `<p>Hello <strong style="color: #3b82f6; text-decoration: underline;">${nameuser}</strong>! Your attendance ended at <strong>${end}</strong>. Have a great day.</p>`
      };
  }
};


export const translateSalaryTotalMessage = (
  language: string, 
  name: string | null | undefined, 
  totalsalary: string | "0", 
  today: string | null | undefined
): { subject: string, html: string } => {
  switch(language) {
    case 'vi': // Vietnamese
      return {
        subject: "Nhận lương!",
        html: `<p>Xin chào <strong style="color: #3b82f6; text-decoration: underline;">${name}</strong>! Tổng lương của bạn đã nhận <strong>${totalsalary}</strong> vào lúc <strong>${today}</strong></p>`
      };
    case 'en': // English
      return {
        subject: "Salary received!",
        html: `<p>Hello <strong style="color: #3b82f6; text-decoration: underline;">${name}</strong>! Your total salary of <strong>${totalsalary}</strong> has been received on <strong>${today}</strong></p>`
      };
    case 'zh': // Chinese
      return {
        subject: "工资已发放！",
        html: `<p>你好 <strong style="color: #3b82f6; text-decoration: underline;">${name}</strong>！您的总工资 <strong>${totalsalary}</strong> 已于 <strong>${today}</strong> 发放。</p>`
      };
    case 'fr': // French
      return {
        subject: "Salaire reçu!",
        html: `<p>Bonjour <strong style="color: #3b82f6; text-decoration: underline;">${name}</strong> ! Votre salaire total de <strong>${totalsalary}</strong> a été reçu le <strong>${today}</strong></p>`
      };
    case 'ja': // Japanese
      return {
        subject: "給与受け取り！",
        html: `<p>こんにちは <strong style="color: #3b82f6; text-decoration: underline;">${name}</strong>！あなたの総給与 <strong>${totalsalary}</strong> は <strong>${today}</strong> に受け取られました。</p>`
      };
    default:
      return {
        subject: "Salary received!",
        html: `<p>Hello <strong style="color: #3b82f6; text-decoration: underline;">${name}</strong>! Your total salary of <strong>${totalsalary}</strong> has been received on <strong>${today}</strong></p>`
      };
  }
};


export const translateBonusMessage = (
  language: string, 
  name: string | null | undefined, 
  bonus: string | "0", 
  currenmoney: string | "0",
  title: string | null | undefined, 
  today: string | null | undefined, 
): { subject: string, html: string } => {
  switch(language) {
    case 'vi': // Vietnamese
      return {
        subject: "Nhận tiền thường!",
        html: `<p>Xin chào <strong style="color: #3b82f6; text-decoration: underline;">${name}</strong>! Bạn đã nhận thêm <strong>+${bonus}</strong> vào ngày <strong>${today}</strong> vì lý do: <strong>${title}</strong>. Tổng số tiền bonus: <strong>${currenmoney}</strong>.</p>`
      };
    case 'en': // English
      return {
        subject: "Bonus received!",
        html: `<p>Hello <strong style="color: #3b82f6; text-decoration: underline;">${name}</strong>! You have received an additional <strong>+${bonus}</strong> on <strong>${today}</strong> for the reason: <strong>${title}</strong>. Total bonus amount: <strong>${currenmoney}</strong>.</p>`
      };
    case 'zh': // Chinese
      return {
        subject: "奖金已领取！",
        html: `<p>你好 <strong style="color: #3b82f6; text-decoration: underline;">${name}</strong>！您已于 <strong>${today}</strong> 领取了 <strong>+${bonus}</strong> 的奖金，原因是：<strong>${title}</strong>。奖金总额：<strong>${currenmoney}</strong>。</p>`
      };
    case 'fr': // French
      return {
        subject: "Prime reçue!",
        html: `<p>Bonjour <strong style="color: #3b82f6; text-decoration: underline;">${name}</strong> ! Vous avez reçu un supplément de <strong>+${bonus}</strong> le <strong>${today}</strong> pour la raison suivante : <strong>${title}</strong>. Montant total de la prime : <strong>${currenmoney}</strong>.</p>`
      };
    case 'ja': // Japanese
      return {
        subject: "ボーナス受け取り！",
        html: `<p>こんにちは <strong style="color: #3b82f6; text-decoration: underline;">${name}</strong>！あなたは <strong>${today}</strong> に <strong>+${bonus}</strong> のボーナスを受け取りました。理由は：<strong>${title}</strong>。ボーナスの合計金額：<strong>${currenmoney}</strong>。</p>`
      };
    default:
      return {
        subject: "Bonus received!",
        html: `<p>Hello <strong style="color: #3b82f6; text-decoration: underline;">${name}</strong>! You have received an additional <strong>+${bonus}</strong> on <strong>${today}</strong> for the reason: <strong>${title}</strong>. Total bonus amount: <strong>${currenmoney}</strong>.</p>`
      };
  }
};

export const translateUnBonusMessage = (
  language: string, 
  name: string | null | undefined, 
  unbonus: string | "0", 
  currenmoney: string | "0",
  title: string | null | undefined, 
  today: string | null | undefined, 
): { subject: string, html: string } => {
  switch(language) {
    case 'vi': // Vietnamese
      return {
        subject: "Mất tiền thưởng!",
        html: `<p>Xin chào <strong style="color: #3b82f6; text-decoration: underline;">${name}</strong>! Bạn đã bị trừ <strong>${unbonus}</strong> vào ngày <strong>${today}</strong> vì lý do: ${title}. Tổng số tiền bonus còn lại: <strong>${currenmoney}</strong>.</p>`
      };
    case 'en': // English
      return {
        subject: "Bonus deducted!",
        html: `<p>Hello <strong style="color: #3b82f6; text-decoration: underline;">${name}</strong>! You have been deducted <strong>${unbonus}</strong> on <strong>${today}</strong> for the reason: ${title}. Total remaining bonus: <strong>${currenmoney}</strong>.</p>`
      };
    case 'zh': // Chinese
      return {
        subject: "奖金扣除！",
        html: `<p>你好 <strong style="color: #3b82f6; text-decoration: underline;">${name}</strong>！您已于 <strong>${today}</strong> 扣除了 <strong>${unbonus}</strong> 的奖金，原因是：${title}。剩余奖金总额：<strong>${currenmoney}</strong>。</p>`
      };
    case 'fr': // French
      return {
        subject: "Prime déduite!",
        html: `<p>Bonjour <strong style="color: #3b82f6; text-decoration: underline;">${name}</strong> ! Vous avez eu une déduction de <strong>${unbonus}</strong> le <strong>${today}</strong> pour la raison suivante : ${title}. Montant total de la prime restante : <strong>${currenmoney}</strong>.</p>`
      };
    case 'ja': // Japanese
      return {
        subject: "ボーナスが差し引かれました！",
        html: `<p>こんにちは <strong style="color: #3b82f6; text-decoration: underline;">${name}</strong>！あなたは <strong>${today}</strong> に <strong>${unbonus}</strong> のボーナスが差し引かれました。理由は：${title}。残りのボーナス総額：<strong>${currenmoney}</strong>。</p>`
      };
    default:
      return {
        subject: "Bonus deducted!",
        html: `<p>Hello <strong style="color: #3b82f6; text-decoration: underline;">${name}</strong>! You have been deducted <strong>${unbonus}</strong> on <strong>${today}</strong> for the reason: ${title}. Total remaining bonus: <strong>${currenmoney}</strong>.</p>`
      };
  }
};


export const translateSpinRewardMessage = (
  language: string, 
  name: string | null | undefined, 
  bonus: string | "0", 
  currenmoney: string | "0", 
  bonuscoin: string | "0", 
  totalcoin: string | "0",
  title: string | null | undefined, 
  today: string | null | undefined, 
): { subject: string, html: string } => {
  switch(language) {
    case 'vi': // Vietnamese
      return {
        subject: "Nhận thưởng!",
        html: `<p>Xin chào <strong style="color: #3b82f6; text-decoration: underline;">${name}</strong>! Bạn đã nhận thêm <strong>+${bonus} vòng quay</strong> và <strong>+${bonuscoin} xu</strong> vào ngày <strong>${today}</strong> vì lý do <strong>${title}</strong>. Tổng số spin và coin: <strong>${currenmoney} vòng quay</strong> và <strong>${totalcoin} xu</strong>.</p>`
      };
    case 'en': // English
      return {
        subject: "Reward received!",
        html: `<p>Hello <strong style="color: #3b82f6; text-decoration: underline;">${name}</strong>! You have received an additional <strong>+${bonus} spins</strong> and <strong>+${bonuscoin} coins</strong> on <strong>${today}</strong> for the reason: <strong>${title}</strong>. Total spins and coins: <strong>${currenmoney} spins</strong> and <strong>${totalcoin} coins</strong>.</p>`
      };
    case 'zh': // Chinese
      return {
        subject: "奖励已领取！",
        html: `<p>你好 <strong style="color: #3b82f6; text-decoration: underline;">${name}</strong>！您已于 <strong>${today}</strong> 获得了额外的 <strong>+${bonus} 次旋转</strong> 和 <strong>+${bonuscoin} 币</strong>，原因是：<strong>${title}</strong>。总旋转次数和币数：<strong>${currenmoney} 次旋转</strong> 和 <strong>${totalcoin} 币</strong>。</p>`
      };
    case 'fr': // French
      return {
        subject: "Récompense reçue!",
        html: `<p>Bonjour <strong style="color: #3b82f6; text-decoration: underline;">${name}</strong> ! Vous avez reçu un supplément de <strong>+${bonus} tours</strong> et <strong>+${bonuscoin} pièces</strong> le <strong>${today}</strong> pour la raison suivante : <strong>${title}</strong>. Nombre total de tours et pièces : <strong>${currenmoney} tours</strong> et <strong>${totalcoin} pièces</strong>.</p>`
      };
    case 'ja': // Japanese
      return {
        subject: "報酬を受け取りました！",
        html: `<p>こんにちは <strong style="color: #3b82f6; text-decoration: underline;">${name}</strong>！あなたは <strong>${today}</strong> に <strong>+${bonus} 回転</strong> と <strong>+${bonuscoin} コイン</strong> を受け取りました。理由は：<strong>${title}</strong>。合計の回転数とコイン数：<strong>${currenmoney} 回転</strong> と <strong>${totalcoin} コイン</strong>。</p>`
      };
    default:
      return {
        subject: "Reward received!",
        html: `<p>Hello <strong style="color: #3b82f6; text-decoration: underline;">${name}</strong>! You have received an additional <strong>+${bonus} spins</strong> and <strong>+${bonuscoin} coins</strong> on <strong>${today}</strong> for the reason: <strong>${title}</strong>. Total spins and coins: <strong>${currenmoney} spins</strong> and <strong>${totalcoin} coins</strong>.</p>`
      };
  }
};


export const translateSpinUnRewardMessage = (
  language: string, 
  name: string | null | undefined, 
  unbonus: string | "0", 
  currenmoney: string | "0", 
  unbonuscoin: string | "0", 
  totalcoin: string | "0",
  title: string | null | undefined, 
  today: string | null | undefined, 
): { subject: string, html: string } => {
  switch(language) {
    case 'vi': // Vietnamese
      return {
        subject: "Mất thưởng!",
        html: `<p>Xin chào <strong style="color: #3b82f6; text-decoration: underline;">${name}</strong>! Bạn đã bị trừ <strong>${unbonus} vòng quay</strong> và <strong>${unbonuscoin} xu</strong> vào ngày <strong>${today}</strong> vì lý do <strong>${title}</strong>. Tổng số spin và coin còn lại: <strong>${currenmoney} vòng quay</strong> và <strong>${totalcoin} xu</strong>.</p>`
      };
    case 'en': // English
      return {
        subject: "Reward deducted!",
        html: `<p>Hello <strong style="color: #3b82f6; text-decoration: underline;">${name}</strong>! You have been deducted <strong>${unbonus} spins</strong> and <strong>${unbonuscoin} coins</strong> on <strong>${today}</strong> for the reason: <strong>${title}</strong>. Total remaining spins and coins: <strong>${currenmoney} spins</strong> and <strong>${totalcoin} coins</strong>.</p>`
      };
    case 'zh': // Chinese
      return {
        subject: "奖励扣除！",
        html: `<p>你好 <strong style="color: #3b82f6; text-decoration: underline;">${name}</strong>！您已于 <strong>${today}</strong> 扣除了 <strong>${unbonus} 次旋转</strong> 和 <strong>${unbonuscoin} 币</strong>，原因是：<strong>${title}</strong>。剩余的旋转次数和币数：<strong>${currenmoney} 次旋转</strong> 和 <strong>${totalcoin} 币</strong>。</p>`
      };
    case 'fr': // French
      return {
        subject: "Prime déduite!",
        html: `<p>Bonjour <strong style="color: #3b82f6; text-decoration: underline;">${name}</strong> ! Vous avez eu une déduction de <strong>${unbonus} tours</strong> et <strong>${unbonuscoin} pièces</strong> le <strong>${today}</strong> pour la raison suivante : <strong>${title}</strong>. Nombre total de tours et pièces restantes : <strong>${currenmoney} tours</strong> et <strong>${totalcoin} pièces</strong>.</p>`
      };
    case 'ja': // Japanese
      return {
        subject: "ボーナスが差し引かれました！",
        html: `<p>こんにちは <strong style="color: #3b82f6; text-decoration: underline;">${name}</strong>！あなたは <strong>${today}</strong> に <strong>${unbonus} 回転</strong> と <strong>${unbonuscoin} コイン</strong> が差し引かれました。理由は：<strong>${title}</strong>。残りの回転数とコイン数：<strong>${currenmoney} 回転</strong> と <strong>${totalcoin} コイン</strong>。</p>`
      };
    default:
      return {
        subject: "Reward deducted!",
        html: `<p>Hello <strong style="color: #3b82f6; text-decoration: underline;">${name}</strong>! You have been deducted <strong>${unbonus} spins</strong> and <strong>${unbonuscoin} coins</strong> on <strong>${today}</strong> for the reason: <strong>${title}</strong>. Total remaining spins and coins: <strong>${currenmoney} spins</strong> and <strong>${totalcoin} coins</strong>.</p>`
      };
  }
};


export const translateDismissalMessage = (
  language: string, 
  name: string | null | undefined, 
  today: string
): { subject: string, html: string } => {
  switch(language) {
    case 'vi': // Vietnamese
      return {
        subject: "Đình chỉ công việc!",
        html: `<p>Kính gửi <strong>${name},</strong></p>

<p style="margin-top:5px;">Chúng tôi muốn thông báo với bạn rằng sau một thời gian xem xét kỹ lưỡng, chúng tôi đã quyết định rẽ nhánh trong con đường sự nghiệp và chấm dứt hợp đồng lao động của bạn với công ty chúng tôi. Quyết định này không đến từ một lựa chọn dễ dàng, nhưng đây là quyết định mà chúng tôi cảm thấy là tốt nhất cho cả hai bên.</p>

<p style="margin-top:5px;">Chúng tôi cảm ơn sự đóng góp của bạn trong thời gian làm việc tại công ty. Các nỗ lực và thành tựu của bạn không bao giờ được coi nhẹ, và chúng tôi hy vọng bạn sẽ giữ được những kỷ niệm tốt đẹp về thời gian ở đây.</p>

<p style="margin-top:5px;">Chúng tôi cam kết hỗ trợ bạn trong quá trình chuyển tiếp và tìm kiếm cơ hội mới trong sự nghiệp của mình. Vui lòng liên hệ với phòng nhân sự nếu bạn cần bất kỳ hỗ trợ nào.</p>

<p style="margin-top:5px;">Chúng tôi chân thành cảm ơn bạn một lần nữa và chúc bạn may mắn trong những bước tiếp theo trong cuộc đời và sự nghiệp của bạn.</p>

<p style="margin-top:5px;"><strong>Trân trọng,</strong></p>

<p><strong>VLXD XuanTruong</strong> - ${today}.</p>`
      };
    case 'en': // English
      return {
        subject: "Job Suspension!",
        html: `<p>Dear <strong>${name},</strong></p>

<p style="margin-top:5px;">We regret to inform you that after a careful review, we have decided to take a different direction in our career path and terminate your employment contract with our company. This decision was not an easy one, but we believe it is the best decision for both parties.</p>

<p style="margin-top:5px;">We sincerely appreciate your contributions during your time with the company. Your efforts and achievements will never be overlooked, and we hope you will keep fond memories of your time here.</p>

<p style="margin-top:5px;">We are committed to supporting you through this transition and in finding new opportunities in your career. Please contact the HR department if you need any assistance.</p>

<p style="margin-top:5px;">Once again, we sincerely thank you and wish you the best of luck in the next steps of your life and career.</p>

<p style="margin-top:5px;"><strong>Kind regards,</strong></p>

<p><strong>VLXD XuanTruong</strong> - ${today}.</p>`
      };
    case 'zh': // Chinese
      return {
        subject: "工作暂停！",
        html: `<p>亲爱的 <strong>${name},</strong></p>

<p style="margin-top:5px;">我们很遗憾地通知您，在经过仔细审查后，我们决定采取不同的职业发展方向，终止与贵公司的劳动合同。这个决定并不容易，但我们认为这是对双方最好的决定。</p>

<p style="margin-top:5px;">我们衷心感谢您在公司工作的贡献。您的努力和成就永远不会被忽视，我们希望您能留下在这里的美好回忆。</p>

<p style="margin-top:5px;">我们承诺在您的过渡期内为您提供支持，并帮助您寻找新的职业机会。如果您需要任何帮助，请联系HR部门。</p>

<p style="margin-top:5px;">再次感谢您，并祝愿您在未来的生活和职业中一切顺利。</p>

<p style="margin-top:5px;"><strong>此致，</strong></p>

<p><strong>VLXD XuanTruong</strong> - ${today}.</p>`
      };
    case 'fr': // French
      return {
        subject: "Suspension de travail!",
        html: `<p>Cher/Chère <strong>${name},</strong></p>

<p style="margin-top:5px;">Nous avons le regret de vous informer qu'après un examen approfondi, nous avons décidé de prendre une autre direction dans notre parcours professionnel et de mettre fin à votre contrat de travail avec notre société. Cette décision n’a pas été facile, mais nous pensons qu’elle est la meilleure pour les deux parties.</p>

<p style="margin-top:5px;">Nous vous remercions sincèrement pour vos contributions pendant votre temps passé dans l’entreprise. Vos efforts et réalisations ne seront jamais négligés et nous espérons que vous garderez de bons souvenirs de votre temps ici.</p>

<p style="margin-top:5px;">Nous nous engageons à vous soutenir pendant cette transition et dans la recherche de nouvelles opportunités dans votre carrière. Veuillez contacter le département RH si vous avez besoin de quelconque assistance.</p>

<p style="margin-top:5px;">Encore une fois, nous vous remercions sincèrement et vous souhaitons bonne chance pour les prochaines étapes de votre vie et carrière.</p>

<p style="margin-top:5px;"><strong>Cordialement,</strong></p>

<p><strong>VLXD XuanTruong</strong> - ${today}.</p>`
      };
    case 'ja': // Japanese
      return {
        subject: "仕事の停止！",
        html: `<p>親愛なる <strong>${name},</strong></p>

<p style="margin-top:5px;">慎重な審査の結果、私たちはキャリアの方向性を変更することを決定し、貴社との雇用契約を終了することとなりました。この決定は容易なものではありませんでしたが、双方にとって最良の決定だと考えています。</p>

<p style="margin-top:5px;">貴社での貢献に心から感謝しています。あなたの努力と成果は決して軽視されることはありません。そして、ここで過ごした時間の素晴らしい思い出を大切にしていただければと思います。</p>

<p style="margin-top:5px;">この移行期間中、そして新たなキャリアの機会を見つける過程で私たちはあなたをサポートすることをお約束します。ご質問があれば、HR部門にご連絡ください。</p>

<p style="margin-top:5px;">改めて心より感謝し、あなたの今後の人生とキャリアのステップで幸運をお祈りします。</p>

<p style="margin-top:5px;"><strong>敬具,</strong></p>

<p><strong>VLXD XuanTruong</strong> - ${today}.</p>`
      };
    default:
      return {
        subject: "Job Suspension!",
        html: `<p>Dear <strong>${name},</strong></p>

<p style="margin-top:5px;">We regret to inform you that after a careful review, we have decided to take a different direction in our career path and terminate your employment contract with our company. This decision was not an easy one, but we believe it is the best decision for both parties.</p>

<p style="margin-top:5px;">We sincerely appreciate your contributions during your time with the company. Your efforts and achievements will never be overlooked, and we hope you will keep fond memories of your time here.</p>

<p style="margin-top:5px;">We are committed to supporting you through this transition and in finding new opportunities in your career. Please contact the HR department if you need any assistance.</p>

<p style="margin-top:5px;">Once again, we sincerely thank you and wish you the best of luck in the next steps of your life and career.</p>

<p style="margin-top:5px;"><strong>Kind regards,</strong></p>

<p><strong>VLXD XuanTruong</strong> - ${today}.</p>`
      };
  }
};


export const translateDeleteUserMessage = (
  language: string, 
  name: string | null | undefined, 
  today: string
): { subject: string, html: string } => {
  switch(language) {
    case 'vi': // Vietnamese
      return {
        subject: "Khóa tài khoản vĩnh viễn!",
        html: `<p>Kính gửi <strong>${name},</strong></p>

<p style="margin-top:5px;">Tôi viết thư này để tỏ lòng xin lỗi về việc khóa tài khoản của bạn vĩnh viễn. Tôi hiểu rằng việc này đã gây ra sự bất tiện và phiền toái cho bạn, và tôi rất tiếc về điều đó.</p>

<p style="margin-top:5px;">Chúng tôi đã xem xét lại quyết định của mình và nhận ra rằng tài khoản của bạn có vấn đề. Và đã phạm vào luật nghiêm.</p>

<p style="margin-top:5px;">Tôi xin chân thành xin lỗi và mong rằng bạn có thể tha thứ cho sự cố này. Nếu bạn có bất kỳ câu hỏi hoặc yêu cầu gì, xin vui lòng liên hệ trực tiếp với tôi theo địa chỉ email này.</p>

<p style="margin-top:5px;">Một lần nữa, tôi xin lỗi về sự bất tiện này và mong rằng chúng ta có thể tiếp tục hợp tác một cách tích cực trong tương lai.</p>

<p style="margin-top:5px;"><strong>Trân trọng,</strong></p>

<p><strong>VLXD XuanTruong</strong> - ${today}.</p>`
      };
    case 'en': // English
      return {
        subject: "Account Permanently Locked!",
        html: `<p>Dear <strong>${name},</strong></p>

<p style="margin-top:5px;">I am writing this letter to sincerely apologize for the permanent lock of your account. I understand that this has caused inconvenience and frustration for you, and I deeply regret that.</p>

<p style="margin-top:5px;">We have reviewed our decision and realized that there was an issue with your account. It was found to have violated significant policies.</p>

<p style="margin-top:5px;">I sincerely apologize and hope you can forgive this incident. Should you have any questions or requests, please feel free to contact me directly via this email address.</p>

<p style="margin-top:5px;">Once again, I apologize for the inconvenience, and I hope that we can continue to work together positively in the future.</p>

<p style="margin-top:5px;"><strong>Kind regards,</strong></p>

<p><strong>VLXD XuanTruong</strong> - ${today}.</p>`
      };
    case 'zh': // Chinese
      return {
        subject: "账户永久封锁！",
        html: `<p>亲爱的 <strong>${name},</strong></p>

<p style="margin-top:5px;">我写这封信是为了诚挚地为您账户的永久封锁道歉。我理解这给您带来了不便和困扰，为此我深感遗憾。</p>

<p style="margin-top:5px;">我们已重新审查了我们的决定，并意识到您的账户存在问题，并且违反了公司的重大规定。</p>

<p style="margin-top:5px;">我诚恳地道歉，并希望您能原谅此次事件。如有任何问题或要求，请随时通过此电子邮件与我联系。</p>

<p style="margin-top:5px;">再次为此次不便表示歉意，并希望未来我们能够继续积极合作。</p>

<p style="margin-top:5px;"><strong>此致，</strong></p>

<p><strong>VLXD XuanTruong</strong> - ${today}.</p>`
      };
    case 'fr': // French
      return {
        subject: "Compte définitivement verrouillé !",
        html: `<p>Cher/Chère <strong>${name},</strong></p>

<p style="margin-top:5px;">Je vous écris cette lettre pour m'excuser sincèrement pour le verrouillage permanent de votre compte. Je comprends que cela vous a causé des désagréments et des frustrations, et j'en suis profondément désolé.</p>

<p style="margin-top:5px;">Nous avons réexaminé notre décision et avons réalisé qu'il y avait un problème avec votre compte, qui a violé des politiques importantes.</p>

<p style="margin-top:5px;">Je m'excuse sincèrement et j'espère que vous pourrez pardonner cet incident. Si vous avez des questions ou des demandes, n'hésitez pas à me contacter directement via cet e-mail.</p>

<p style="margin-top:5px;">Encore une fois, je vous présente mes excuses pour les désagréments causés, et j'espère que nous pourrons continuer à travailler ensemble de manière positive à l'avenir.</p>

<p style="margin-top:5px;"><strong>Cordialement,</strong></p>

<p><strong>VLXD XuanTruong</strong> - ${today}.</p>`
      };
    case 'ja': // Japanese
      return {
        subject: "アカウントが永久にロックされました！",
        html: `<p>親愛なる <strong>${name},</strong></p>

<p style="margin-top:5px;">あなたのアカウントが永久にロックされたことについて、心からお詫び申し上げます。このことでご不便をおかけしたことを理解しており、深く反省しています。</p>

<p style="margin-top:5px;">私たちはその決定を再考し、あなたのアカウントに問題があることを認識しました。また、重大な規則に違反していたことが判明しました。</p>

<p style="margin-top:5px;">心からお詫び申し上げ、この問題についてご容赦いただければと思います。ご質問やご要望がある場合は、どうぞこのメールアドレスから直接ご連絡ください。</p>

<p style="margin-top:5px;">再度、今回の不便についてお詫び申し上げ、今後ポジティブに協力していけることを願っています。</p>

<p style="margin-top:5px;"><strong>敬具,</strong></p>

<p><strong>VLXD XuanTruong</strong> - ${today}.</p>`
      };
    default:
      return {
        subject: "Account Permanently Locked!",
        html: `<p>Dear <strong>${name},</strong></p>

<p style="margin-top:5px;">I am writing this letter to sincerely apologize for the permanent lock of your account. I understand that this has caused inconvenience and frustration for you, and I deeply regret that.</p>

<p style="margin-top:5px;">We have reviewed our decision and realized that there was an issue with your account. It was found to have violated significant policies.</p>

<p style="margin-top:5px;">I sincerely apologize and hope you can forgive this incident. Should you have any questions or requests, please feel free to contact me directly via this email address.</p>

<p style="margin-top:5px;">Once again, I apologize for the inconvenience, and I hope that we can continue to work together positively in the future.</p>

<p style="margin-top:5px;"><strong>Kind regards,</strong></p>

<p><strong>VLXD XuanTruong</strong> - ${today}.</p>`
      };
  }
};


export const translateDeliverySuccessMessage = (language: string, order: any, formattedDate: string) => {
  switch (language) {
    case "vi":
      return {
        subject: "Giao hàng thành công!",
        html: `
          <div>
            <div>
              <p>Xin chào khách hàng,</p>
              <p>Đơn hàng <span style="color:#FF3131; font-weight: 700;">${order.id}</span> của bạn đã được giao thành công ngày ${formattedDate}.</p>
              <p>Cảm ơn bạn đã tin tưởng và ủng hộ. Vui lòng vào <a style="text-decoration: underline;" href="${process.env.NEXT_PUBLIC_DOMAIN_URL}/warehouse">warehouse</a> để đánh giá chất lượng. Bạn có 3 ngày kể từ ngày nhận hàng để trả hoặc đổi hàng.</p>
            </div>
          </div>
        `
      };
    case "en":
      return {
        subject: "Delivery Successful!",
        html: `
          <div>
            <div>
              <p>Hello Customer,</p>
              <p>Your order <span style="color:#FF3131; font-weight: 700;">${order.id}</span> has been successfully delivered on ${formattedDate}.</p>
              <p>Thank you for your trust and support. Please visit <a style="text-decoration: underline;" href="${process.env.NEXT_PUBLIC_DOMAIN_URL}/warehouse">warehouse</a> to review the quality. You have 3 days from the date of delivery to return or exchange the items.</p>
            </div>
          </div>
        `
      };
    case "zh":
      return {
        subject: "成功交付!",
        html: `
          <div>
            <div>
              <p>亲爱的客户，</p>
              <p>您的订单 <span style="color:#FF3131; font-weight: 700;">${order.id}</span> 已于 ${formattedDate} 成功交付。</p>
              <p>感谢您的信任与支持。请访问 <a style="text-decoration: underline;" href="${process.env.NEXT_PUBLIC_DOMAIN_URL}/warehouse">warehouse</a> 进行质量评价。您有 3 天的时间从交货日期起退货或换货。</p>
            </div>
          </div>
        `
      };
    case "fr":
      return {
        subject: "Livraison réussie!",
        html: `
          <div>
            <div>
              <p>Bonjour Client,</p>
              <p>Votre commande <span style="color:#FF3131; font-weight: 700;">${order.id}</span> a été livrée avec succès le ${formattedDate}.</p>
              <p>Merci pour votre confiance et votre soutien. Veuillez visiter <a style="text-decoration: underline;" href="${process.env.NEXT_PUBLIC_DOMAIN_URL}/warehouse">warehouse</a> pour évaluer la qualité. Vous disposez de 3 jours à compter de la date de livraison pour retourner ou échanger les articles.</p>
            </div>
          </div>
        `
      };
    case "ja":
      return {
        subject: "配達成功！",
        html: `
          <div>
            <div>
              <p>お客様へ、</p>
              <p>ご注文 <span style="color:#FF3131; font-weight: 700;">${order.id}</span> は ${formattedDate} に無事に配達されました。</p>
              <p>ご信頼とご支援ありがとうございます。品質評価のため、<a style="text-decoration: underline;" href="${process.env.NEXT_PUBLIC_DOMAIN_URL}/warehouse">warehouse</a> にアクセスしてください。商品を受け取った日から 3 日以内であれば、返品または交換が可能です。</p>
            </div>
          </div>
        `
      };
    default:
      return {
        subject: "Delivery Successful!",
        html: `
          <div>
            <div>
              <p>Hello Customer,</p>
              <p>Your order <span style="color:#FF3131; font-weight: 700;">${order.id}</span> has been successfully delivered on ${formattedDate}.</p>
              <p>Thank you for your trust and support. Please visit <a style="text-decoration: underline;" href="${process.env.NEXT_PUBLIC_DOMAIN_URL}/warehouse">warehouse</a> to review the quality. You have 3 days from the date of delivery to return or exchange the items.</p>
            </div>
          </div>
        `
      };
  }
};
