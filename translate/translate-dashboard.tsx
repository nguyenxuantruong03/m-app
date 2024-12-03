export const translateStoreActions = (language: string) => {
  switch (language) {
    case "vi": // Tiếng Việt
      return {
        storeIdCopied: "Store Id đã được sao chép vào clipboard.",
        storeDeleted: "Store đã bị xóa.",
        somethingWentWrong: "Có lỗi xảy ra",
        openMenu: "Mở menu",
        actions: "Hành động",
        copyId: "Sao chép Id",
        update: "Cập nhật",
        delete: "Xóa",
      };
    case "en": // English
      return {
        storeIdCopied: "Store Id copied to the clipboard.",
        storeDeleted: "Store deleted.",
        somethingWentWrong: "Something went wrong",
        openMenu: "Open menu",
        actions: "Actions",
        copyId: "Copy Id",
        update: "Update",
        delete: "Delete",
      };
    case "zh": // Tiếng Trung
      return {
        storeIdCopied: "商店ID已复制到剪贴板。",
        storeDeleted: "商店已删除。",
        somethingWentWrong: "出了点问题",
        openMenu: "打开菜单",
        actions: "操作",
        copyId: "复制ID",
        update: "更新",
        delete: "删除",
      };
    case "fr": // Tiếng Pháp
      return {
        storeIdCopied: "Store Id copié dans le presse-papiers.",
        storeDeleted: "Store supprimé.",
        somethingWentWrong: "Quelque chose a mal tourné",
        openMenu: "Ouvrir le menu",
        actions: "Actions",
        copyId: "Copier l'ID",
        update: "Mettre à jour",
        delete: "Supprimer",
      };
    case "ja": // Tiếng Nhật
      return {
        storeIdCopied: "ストアIDがクリップボードにコピーされました。",
        storeDeleted: "ストアが削除されました。",
        somethingWentWrong: "問題が発生しました",
        openMenu: "メニューを開く",
        actions: "アクション",
        copyId: "IDをコピー",
        update: "更新",
        delete: "削除",
      };
    default: // Default case if language is not recognized
      return {
        storeIdCopied: "Store Id copied to the clipboard.",
        storeDeleted: "Store deleted.",
        somethingWentWrong: "Something went wrong",
        openMenu: "Open menu",
        actions: "Actions",
        copyId: "Copy Id",
        update: "Update",
        delete: "Delete",
      };
  }
};

export const translateStoreClient = (language: string) => {
  switch (language) {
    case "vi": // Tiếng Việt
      return {
        storeDeletedSuccessfully: "Store đã bị xóa thành công",
        somethingWentWrong: "Có lỗi xảy ra",
        store: "Cửa hàng", // Added "Cửa hàng" here
        storeManagement: "Quản lý cửa hàng",
        addNew: "Thêm mới",
        api: "API",
        apiCallsForStore: "API gọi cho Store",
      };
    case "en": // English
      return {
        storeDeletedSuccessfully: "Store deleted successfully",
        somethingWentWrong: "Something went wrong",
        store: "Store", // Added "Store" here
        storeManagement: "Store Management",
        addNew: "Add New",
        api: "API",
        apiCallsForStore: "API calls for Store",
      };
    case "zh": // Tiếng Trung
      return {
        storeDeletedSuccessfully: "商店已成功删除",
        somethingWentWrong: "出了点问题",
        store: "商店", // Added "商店" here
        storeManagement: "店铺管理",
        addNew: "添加新店铺",
        api: "API",
        apiCallsForStore: "商店的API调用",
      };
    case "fr": // Tiếng Pháp
      return {
        storeDeletedSuccessfully: "Le store a été supprimé avec succès",
        somethingWentWrong: "Quelque chose a mal tourné",
        store: "Magasin", // Added "Magasin" here
        storeManagement: "Gestion de magasin",
        addNew: "Ajouter un nouveau",
        api: "API",
        apiCallsForStore: "Appels API pour Store",
      };
    case "ja": // Tiếng Nhật
      return {
        storeDeletedSuccessfully: "ストアが正常に削除されました",
        somethingWentWrong: "問題が発生しました",
        store: "ストア", // Added "ストア" here
        storeManagement: "ストア管理",
        addNew: "新規追加",
        api: "API",
        apiCallsForStore: "ストアのAPI呼び出し",
      };
    default: // Default case if language is not recognized
      return {
        storeDeletedSuccessfully: "Store deleted successfully",
        somethingWentWrong: "Something went wrong",
        store: "Store", // Added "Store" here
        storeManagement: "Store Management",
        addNew: "Add New",
        api: "API",
        apiCallsForStore: "API calls for Store",
      };
  }
};

export const translateStoreForm = (language: string) => {
  switch (language) {
    case "vi": // Tiếng Việt
      return {
        editStore: "Chỉnh sửa cửa hàng",
        createStore: "Tạo cửa hàng",
        editAStore: "Chỉnh sửa một cửa hàng.",
        addANewStore: "Thêm cửa hàng mới",
        saveChanges: "Lưu thay đổi",
        create: "Tạo mới",
        store: "Cửa hàng",
        updated: "Đã cập nhật!",
        created: "Đã tạo!",
        updatingStore: "Đang cập nhật cửa hàng...",
        somethingWentWrong: "Có lỗi xảy ra.",
        storeDeleted: "Cửa hàng đã bị xóa.",
        name: "Tên",
        storeNameExample: "Tên cửa hàng. VD: Hà Nội, Thành Phố Hồ Chí Minh...",
        namePlaceholder: "Tên...",
      };
    case "en": // English
      return {
        editStore: "Edit store",
        createStore: "Create store",
        editAStore: "Edit a store.",
        addANewStore: "Add a new store",
        saveChanges: "Save changes",
        create: "Create",
        store: "Store",
        updated: "Updated!",
        created: "Created!",
        updatingStore: "Updating store...",
        somethingWentWrong: "Something went wrong.",
        storeDeleted: "Store deleted.",
        name: "Name",
        storeNameExample: "Store name. E.g. Hanoi, Ho Chi Minh City...",
        namePlaceholder: "Name...",
      };
    case "zh": // Tiếng Trung
      return {
        editStore: "编辑商店",
        createStore: "创建商店",
        editAStore: "编辑一个商店。",
        addANewStore: "添加新商店",
        saveChanges: "保存更改",
        create: "创建",
        store: "商店",
        updated: "已更新！",
        created: "已创建！",
        updatingStore: "正在更新商店...",
        somethingWentWrong: "出了点问题。",
        storeDeleted: "商店已删除。",
        name: "名称",
        storeNameExample: "商店名称。例如：河内，胡志明市...",
        namePlaceholder: "名称...",
      };
    case "fr": // Tiếng Pháp
      return {
        editStore: "Modifier le magasin",
        createStore: "Créer un magasin",
        editAStore: "Modifier un magasin.",
        addANewStore: "Ajouter un nouveau magasin",
        saveChanges: "Enregistrer les modifications",
        create: "Créer",
        store: "Magasin",
        updated: "Mis à jour !",
        created: "Créé !",
        updatingStore: "Mise à jour du magasin...",
        somethingWentWrong: "Quelque chose a mal tourné.",
        storeDeleted: "Magasin supprimé.",
        name: "Nom",
        storeNameExample:
          "Nom du magasin. Par exemple : Hanoi, Ho Chi Minh Ville...",
        namePlaceholder: "Nom...",
      };
    case "ja": // Tiếng Nhật
      return {
        editStore: "ストアを編集",
        createStore: "ストアを作成",
        editAStore: "ストアを編集します。",
        addANewStore: "新しいストアを追加",
        saveChanges: "変更を保存",
        create: "作成",
        store: "ストア",
        updated: "更新されました！",
        created: "作成されました！",
        updatingStore: "ストアを更新中...",
        somethingWentWrong: "何かがうまくいきませんでした。",
        storeDeleted: "ストアが削除されました。",
        name: "名前",
        storeNameExample: "ストア名。例：ハノイ、ホーチミン市...",
        namePlaceholder: "名前...",
      };
    default: // Default case if language is not recognized
      return {
        editStore: "Edit store",
        createStore: "Create store",
        editAStore: "Edit a store.",
        addANewStore: "Add a new store",
        saveChanges: "Save changes",
        create: "Create",
        store: "Store",
        updated: "Updated!",
        created: "Created!",
        updatingStore: "Updating store...",
        somethingWentWrong: "Something went wrong.",
        storeDeleted: "Store deleted.",
        name: "Name",
        storeNameExample: "Store name. E.g. Hanoi, Ho Chi Minh City...",
        namePlaceholder: "Name...",
      };
  }
};

export const translateDownloadFile = (language: string) => {
  switch (language) {
    case "vi": // Tiếng Việt
      return {
        downloadFile: "Tải xuống tệp",
        statisticalDocuments: "Tài liệu thống kê",
        downloadPdf: "Tải xuống PDF",
        downloadExcel: "Tải xuống Excel",
      };
    case "en": // English
      return {
        downloadFile: "Download File",
        statisticalDocuments: "Statistical Documents",
        downloadPdf: "Download PDF",
        downloadExcel: "Download Excel",
      };
    case "zh": // Tiếng Trung
      return {
        downloadFile: "下载文件",
        statisticalDocuments: "统计文件",
        downloadPdf: "下载 PDF",
        downloadExcel: "下载 Excel",
      };
    case "fr": // Tiếng Pháp
      return {
        downloadFile: "Télécharger le fichier",
        statisticalDocuments: "Documents statistiques",
        downloadPdf: "Télécharger le PDF",
        downloadExcel: "Télécharger Excel",
      };
    case "ja": // Tiếng Nhật
      return {
        downloadFile: "ファイルをダウンロード",
        statisticalDocuments: "統計文書",
        downloadPdf: "PDFをダウンロード",
        downloadExcel: "Excelをダウンロード",
      };
    default: // Default case if language is not recognized
      return {
        downloadFile: "Download File",
        statisticalDocuments: "Statistical Documents",
        downloadPdf: "Download PDF",
        downloadExcel: "Download Excel",
      };
  }
};

export const translateAlertModal = (language: string) => {
  switch (language) {
    case "vi": // Tiếng Việt
      return {
        areYouSure: "Bạn có chắc chắn?",
        deletePermanently: "Hành động này sẽ xóa đi vĩnh viễn!",
        cancel: "Hủy bỏ",
        continueWithEllipsis: "Tiếp tục...",
        continue: "Tiếp tục",
      };
    case "en": // English
      return {
        areYouSure: "Are you sure?",
        deletePermanently: "This action will delete permanently!",
        cancel: "Cancel",
        continueWithEllipsis: "Continue...",
        continue: "Continue",
      };
    case "zh": // Tiếng Trung
      return {
        areYouSure: "您确定吗？",
        deletePermanently: "此操作将永久删除！",
        cancel: "取消",
        continueWithEllipsis: "继续...",
        continue: "继续",
      };
    case "fr": // Tiếng Pháp
      return {
        areYouSure: "Êtes-vous sûr ?",
        deletePermanently: "Cette action supprimera définitivement !",
        cancel: "Annuler",
        continueWithEllipsis: "Continuer...",
        continue: "Continuer",
      };
    case "ja": // Tiếng Nhật
      return {
        areYouSure: "本当に実行しますか？",
        deletePermanently: "この操作は永久に削除されます！",
        cancel: "キャンセル",
        continueWithEllipsis: "続行...",
        continue: "続行",
      };
    default: // English as fallback
      return {
        areYouSure: "Are you sure?",
        deletePermanently: "This action will delete permanently!",
        cancel: "Cancel",
        continueWithEllipsis: "Continue...",
        continue: "Continue",
      };
  }
};

export const translateEventTypes = (language: string) => {
  switch (language) {
    case "vi": // Tiếng Việt
      return {
        birthday: "Sinh nhật",
        overtime: "Tăng ca",
        shiftChange: "Đổi giờ",
        dayOff: "Nghỉ làm",
        busy: "Bận",
        other: "Khác",
      };
    case "en": // English
      return {
        birthday: "Birthday",
        overtime: "Overtime",
        shiftChange: "Shift Change",
        dayOff: "Day Off",
        busy: "Busy",
        other: "Other",
      };
    case "zh": // Tiếng Trung
      return {
        birthday: "生日",
        overtime: "加班",
        shiftChange: "换班",
        dayOff: "休假",
        busy: "忙碌",
        other: "其他",
      };
    case "fr": // Tiếng Pháp
      return {
        birthday: "Anniversaire",
        overtime: "Heures supplémentaires",
        shiftChange: "Changement d'horaire",
        dayOff: "Jour de congé",
        busy: "Occupé",
        other: "Autre",
      };
    case "ja": // Tiếng Nhật
      return {
        birthday: "誕生日",
        overtime: "残業",
        shiftChange: "シフト変更",
        dayOff: "休暇",
        busy: "忙しい",
        other: "その他",
      };
    default: // English as fallback
      return {
        birthday: "Birthday",
        overtime: "Overtime",
        shiftChange: "Shift Change",
        dayOff: "Day Off",
        busy: "Busy",
        other: "Other",
      };
  }
};

export const translateWorkTimeMessages = (
  language: string
): Record<string, string> => {
  switch (language) {
    case "vi": // Tiếng Việt
      return {
        noWorkTime: "Bạn không có thời gian làm việc!",
        lateCheckIn: "Bạn đã điểm danh trễ",
        hours: "giờ",
        minutes: "phút",
        penalty: "và bị -50.000đ. Lý do: Điểm danh trễ.",
        somethingWentWrong: "Đã xảy ra lỗi.",
      };
    case "en": // English
      return {
        noWorkTime: "You have no working time!",
        lateCheckIn: "You checked in late",
        hours: "hours",
        minutes: "minutes",
        penalty: "and were fined -50,000 VND. Reason: Late check-in.",
        somethingWentWrong: "Something went wrong.",
      };
    case "zh": // Tiếng Trung
      return {
        noWorkTime: "您没有工作时间！",
        lateCheckIn: "您迟到了",
        hours: "小时",
        minutes: "分钟",
        penalty: "并被罚款50,000越南盾。原因：迟到签到。",
        somethingWentWrong: "出了点问题。",
      };
    case "fr": // Tiếng Pháp
      return {
        noWorkTime: "Vous n'avez pas de temps de travail !",
        lateCheckIn: "Vous êtes en retard au pointage",
        hours: "heures",
        minutes: "minutes",
        penalty:
          "et avez été pénalisé de -50,000 VND. Raison : Pointage en retard.",
        somethingWentWrong: "Une erreur s'est produite.",
      };
    case "ja": // Tiếng Nhật
      return {
        noWorkTime: "勤務時間がありません！",
        lateCheckIn: "遅刻しました",
        hours: "時間",
        minutes: "分",
        penalty: "罰金-50,000 VNDを科されました。理由：遅刻。",
        somethingWentWrong: "問題が発生しました。",
      };
    default: // English as fallback
      return {
        noWorkTime: "You have no working time!",
        lateCheckIn: "You checked in late",
        hours: "hours",
        minutes: "minutes",
        penalty: "and were fined -50,000 VND. Reason: Late check-in.",
        somethingWentWrong: "Something went wrong.",
      };
  }
};

export const translateAttendanceStart = (
  language: string
): Record<string, string> => {
  switch (language) {
    case "vi": // Tiếng Việt
      return {
        cannotCheckInForAnotherDay: "Không thể điểm danh cho ngày khác!",
        notYourWorkday: "Hôm nay không phải lịch làm của bạn!",
        checkInNotYetTime: "Chưa đến giờ điểm danh hãy quay lại lúc",
        alreadyCheckedIn: "Đã điểm danh cho hôm nay!",
        checkInSuccess: "Điểm danh thành công!",
        user: "Người dùng",
        startTime: "Bắt đầu làm vào lúc",
        endTime: "và kết thúc vào lúc",
        close: "Đóng",
        checkOutNotYetTime: "Chưa đến lúc để kết thúc!",
      };
    case "en": // English
      return {
        cannotCheckInForAnotherDay: "Cannot check in for another day!",
        notYourWorkday: "Today is not your scheduled workday!",
        checkInNotYetTime: "It's not check-in time yet. Please return at",
        alreadyCheckedIn: "You have already checked in for today!",
        checkInSuccess: "Check-in successful!",
        user: "User",
        startTime: "Started work at",
        endTime: "and ended work at",
        close: "Close",
        checkOutNotYetTime: "It's not time to check out yet!",
      };
    case "zh": // Tiếng Trung
      return {
        cannotCheckInForAnotherDay: "无法为其他日期签到！",
        notYourWorkday: "今天不是您的工作日！",
        checkInNotYetTime: "还没到签到时间，请在以下时间回来",
        alreadyCheckedIn: "今天您已经签到过了！",
        checkInSuccess: "签到成功！",
        user: "用户",
        startTime: "开始工作时间",
        endTime: "结束工作时间",
        close: "关闭",
        checkOutNotYetTime: "还没到签退时间！",
      };
    case "fr": // Tiếng Pháp
      return {
        cannotCheckInForAnotherDay:
          "Impossible de pointer pour un autre jour !",
        notYourWorkday: "Aujourd'hui n'est pas votre jour de travail !",
        checkInNotYetTime: "Ce n'est pas encore l'heure de pointer. Revenez à",
        alreadyCheckedIn: "Vous avez déjà pointé aujourd'hui !",
        checkInSuccess: "Pointage réussi !",
        user: "Utilisateur",
        startTime: "Début de travail à",
        endTime: "et fin de travail à",
        close: "Fermer",
        checkOutNotYetTime:
          "Ce n'est pas encore l'heure de pointer la sortie !",
      };
    case "ja": // Tiếng Nhật
      return {
        cannotCheckInForAnotherDay: "別の日のチェックインはできません！",
        notYourWorkday: "今日は勤務日ではありません！",
        checkInNotYetTime:
          "まだチェックインの時間ではありません。以下の時間に戻ってください：",
        alreadyCheckedIn: "本日はすでにチェックイン済みです！",
        checkInSuccess: "チェックイン成功！",
        user: "ユーザー",
        startTime: "開始時間",
        endTime: "終了時間",
        close: "閉じる",
        checkOutNotYetTime: "まだチェックアウトする時間ではありません！",
      };
    default: // English as fallback
      return {
        cannotCheckInForAnotherDay: "Cannot check in for another day!",
        notYourWorkday: "Today is not your scheduled workday!",
        checkInNotYetTime: "It's not check-in time yet. Please return at",
        alreadyCheckedIn: "You have already checked in for today!",
        checkInSuccess: "Check-in successful!",
        user: "User",
        startTime: "Started work at",
        endTime: "and ended work at",
        close: "Close",
        checkOutNotYetTime: "It's not time to check out yet!",
      };
  }
};

export const translateAttendanceEnd = (
  language: string
): Record<string, string> => {
  switch (language) {
    case "vi": // Tiếng Việt
      return {
        cannotCheckOutForAnotherDay: "Không thể kết thúc cho ngày khác!",
        notYourWorkday: "Hôm nay không phải lịch làm của bạn!",
        alreadyCheckedOut: "Đã kết thúc cho ngày hiện tại!",
        checkOutSuccess: "Kết thúc thành công!",
        user: "Người dùng",
        endTime: "Bạn đã kết thúc vào lúc",
        close: "Đóng",
        checkOutNotYetTime: "Chưa đến lúc để kết thúc!",
      };
    case "en": // English
      return {
        cannotCheckOutForAnotherDay: "Cannot check out for another day!",
        notYourWorkday: "Today is not your scheduled workday!",
        alreadyCheckedOut: "You have already checked out for today!",
        checkOutSuccess: "Check-out successful!",
        user: "User",
        endTime: "checked out at",
        close: "Close",
        checkOutNotYetTime: "It's not time to check out yet!",
      };
    case "zh": // Tiếng Trung
      return {
        cannotCheckOutForAnotherDay: "无法为其他日期结束！",
        notYourWorkday: "今天不是您的工作日！",
        alreadyCheckedOut: "今天您已经结束了工作！",
        checkOutSuccess: "成功结束工作！",
        user: "用户",
        endTime: "结束时间",
        close: "关闭",
        checkOutNotYetTime: "还没到结束工作的时间！",
      };
    case "fr": // Tiếng Pháp
      return {
        cannotCheckOutForAnotherDay:
          "Impossible de terminer pour un autre jour !",
        notYourWorkday: "Aujourd'hui n'est pas votre jour de travail !",
        alreadyCheckedOut: "Vous avez déjà terminé pour aujourd'hui !",
        checkOutSuccess: "Fin de journée réussie !",
        user: "Utilisateur",
        endTime: "a terminé à",
        close: "Fermer",
        checkOutNotYetTime: "Ce n'est pas encore l'heure de terminer !",
      };
    case "ja": // Tiếng Nhật
      return {
        cannotCheckOutForAnotherDay: "別の日の終了はできません！",
        notYourWorkday: "今日は勤務日ではありません！",
        alreadyCheckedOut: "本日はすでに終了しています！",
        checkOutSuccess: "終了成功！",
        user: "ユーザー",
        endTime: "終了時間",
        close: "閉じる",
        checkOutNotYetTime: "まだ終了の時間ではありません！",
      };
    default: // English as fallback
      return {
        cannotCheckOutForAnotherDay: "Cannot check out for another day!",
        notYourWorkday: "Today is not your scheduled workday!",
        alreadyCheckedOut: "You have already checked out for today!",
        checkOutSuccess: "Check-out successful!",
        user: "User",
        endTime: "checked out at",
        close: "Close",
        checkOutNotYetTime: "It's not time to check out yet!",
      };
  }
};

export const translateEvent = (language: string): Record<string, string> => {
  switch (language) {
    case "vi": // Tiếng Việt
      return {
        eventAddedSuccess: "Thêm sự kiện thành công!",
        user: "Người dùng",
        eventAddedMessage: "Bạn thêm sự kiện",
        eventAddedAt: "vào lúc",
        close: "Đóng", // Thêm Close
        eventAddError: "Đã xảy ra lỗi khi thêm sự kiện.",
      };
    case "en": // English
      return {
        eventAddedSuccess: "Event added successfully!",
        user: "User",
        eventAddedMessage: "You added the event",
        eventAddedAt: "at",
        close: "Close", // Thêm Close
        eventAddError: "An error occurred while adding the event.",
      };
    case "zh": // Tiếng Trung
      return {
        eventAddedSuccess: "事件添加成功！",
        user: "用户",
        eventAddedMessage: "您添加了事件",
        eventAddedAt: "在",
        close: "关闭", // Thêm Close
        eventAddError: "添加事件时发生错误。",
      };
    case "fr": // Tiếng Pháp
      return {
        eventAddedSuccess: "Événement ajouté avec succès !",
        user: "Utilisateur",
        eventAddedMessage: "Vous avez ajouté l'événement",
        eventAddedAt: "à",
        close: "Fermer", // Thêm Close
        eventAddError:
          "Une erreur est survenue lors de l'ajout de l'événement.",
      };
    case "ja": // Tiếng Nhật
      return {
        eventAddedSuccess: "イベントが正常に追加されました！",
        user: "ユーザー",
        eventAddedMessage: "以下の時間にイベントを追加しました",
        eventAddedAt: "に",
        close: "閉じる", // Thêm Close
        eventAddError: "イベントの追加中にエラーが発生しました。",
      };
    default: // English as fallback
      return {
        eventAddedSuccess: "Event added successfully!",
        user: "User",
        eventAddedMessage: "You added the event",
        eventAddedAt: "at",
        close: "Close", // Thêm Close
        eventAddError: "An error occurred while adding the event.",
      };
  }
};

export const translateEventLimit = (
  language: string,
  eventTitle: string
): string => {
  switch (language) {
    case "vi": // Tiếng Việt
      return `Đã quá số lần sự kiện trong 1 ngày. Không thể thêm: ${eventTitle}`;
    case "en": // English
      return `Event limit exceeded for the day. Cannot add: ${eventTitle}`;
    case "zh": // Tiếng Trung
      return `一天内的事件次数已达上限。无法添加：${eventTitle}`;
    case "fr": // Tiếng Pháp
      return `Le nombre d'événements par jour a été dépassé. Impossible d'ajouter : ${eventTitle}`;
    case "ja": // Tiếng Nhật
      return `1日に設定されたイベント数を超えました。追加できません：${eventTitle}`;
    default: // English as fallback
      return `Event limit exceeded for the day. Cannot add: ${eventTitle}`;
  }
};

export const translateDeleteEvent = (language: string) => {
  switch (language) {
    case "vi": // Tiếng Việt
      return {
        cannotDeleteEvent: "Không thể xóa sự kiện này.",
        eventDeletedSuccess: "Xóa sự kiện thành công!",
        user: "Người dùng",
        eventDeletedMessage: "Bạn đã xóa sự kiện",
        eventDeletedAt: "vào lúc",
        close: "Đóng",
        eventDeleteError: "Đã xảy ra lỗi khi xóa sự kiện.",
      };
    case "en": // English
      return {
        cannotDeleteEvent: "Cannot delete this event.",
        eventDeletedSuccess: "Event deleted successfully!",
        user: "User",
        eventDeletedMessage: "You deleted the event",
        eventDeletedAt: "at",
        close: "Close",
        eventDeleteError: "An error occurred while deleting the event.",
      };
    case "zh": // Tiếng Trung
      return {
        cannotDeleteEvent: "无法删除此事件。",
        eventDeletedSuccess: "事件删除成功！",
        user: "用户",
        eventDeletedMessage: "您删除了事件",
        eventDeletedAt: "在",
        close: "关闭",
        eventDeleteError: "删除事件时发生错误。",
      };
    case "fr": // Tiếng Pháp
      return {
        cannotDeleteEvent: "Impossible de supprimer cet événement.",
        eventDeletedSuccess: "Événement supprimé avec succès !",
        user: "Utilisateur",
        eventDeletedMessage: "Vous avez supprimé l'événement",
        eventDeletedAt: "à",
        close: "Fermer",
        eventDeleteError:
          "Une erreur est survenue lors de la suppression de l'événement.",
      };
    case "ja": // Tiếng Nhật
      return {
        cannotDeleteEvent: "このイベントは削除できません。",
        eventDeletedSuccess: "イベントが正常に削除されました！",
        user: "ユーザー",
        eventDeletedMessage: "イベントを削除しました",
        eventDeletedAt: "に",
        close: "閉じる",
        eventDeleteError: "イベント削除中にエラーが発生しました。",
      };
    default: // English as fallback
      return {
        cannotDeleteEvent: "Cannot delete this event.",
        eventDeletedSuccess: "Event deleted successfully!",
        user: "User",
        eventDeletedMessage: "You deleted the event",
        eventDeletedAt: "at",
        close: "Close",
        eventDeleteError: "An error occurred while deleting the event.",
      };
  }
};

export const translateInvalidIdToDelete = (
  language: string,
  idToDelete: string
): string => {
  switch (language) {
    case "vi": // Tiếng Việt
      return `ID không hợp lệ để xóa: ${idToDelete}`;
    case "en": // English
      return `Invalid id to delete: ${idToDelete}`;
    case "zh": // Tiếng Trung
      return `无效的ID无法删除: ${idToDelete}`;
    case "fr": // Tiếng Pháp
      return `ID invalide à supprimer: ${idToDelete}`;
    case "ja": // Tiếng Nhật
      return `削除する無効なID: ${idToDelete}`;
    default: // English as fallback
      return `Invalid id to delete: ${idToDelete}`;
  }
};

export const translateAttendanceStaff = (language: string) => {
  switch (language) {
    case "vi": // Tiếng Việt
      return {
        user: "Nhân viên điểm danh",
        dragEvent: "Kéo sự kiện",
        attendance: "Điểm danh",
        finish: "Kết thúc",
      };
    case "en": // English
      return {
        user: "Attendance Staff",
        dragEvent: "Drag Event",
        attendance: "Attendance",
        finish: "Finish",
      };
    case "zh": // Tiếng Trung
      return {
        user: "点名员工",
        dragEvent: "拖动事件",
        attendance: "点名",
        finish: "结束",
      };
    case "fr": // Tiếng Pháp
      return {
        user: "Personnel de pointage",
        dragEvent: "Glisser l'événement",
        attendance: "Pointage",
        finish: "Terminer",
      };
    case "ja": // Tiếng Nhật
      return {
        user: "出席スタッフ",
        dragEvent: "イベントをドラッグ",
        attendance: "出席",
        finish: "終了",
      };
    default: // English as fallback
      return {
        user: "Attendance Staff",
        dragEvent: "Drag Event",
        attendance: "Attendance",
        finish: "Finish",
      };
  }
};

export const translateAttendanceCamera = (
  language: string,
  userId: string | null | undefined,
  isCheckAttendanceTitle: string,
  start: string | null,
  end: string | null
) => {
  const status = isCheckAttendanceTitle === "✅" ? "Kết thúc" : "Bắt đầu";
  const timeDetails = `${start || ""}${end ? ` - Kết thúc: ${end}` : ""}`;
  const baseMessage = `Chụp ảnh điểm danh - Tên: ${userId} - Sự kiện:${isCheckAttendanceTitle} - ${status}: ${timeDetails}`;
  const salaryInfo = {
    vi: "Nhân viên sẽ được trả lương thông qua việc điểm danh khuôn mặt để hệ thống quét QR code.",
    en: "Employees will be paid through facial attendance, and the system will scan the QR code.",
    zh: "员工将通过面部考勤获得工资，系统将扫描二维码。",
    fr: "Les employés seront payés via la reconnaissance faciale, et le système scannera le code QR.",
    ja: "従業員は顔認識で給与が支払われ、システムはQRコードをスキャンします。",
  };

  switch (language) {
    case "vi": // Tiếng Việt
      return {
        attendanceMessage: baseMessage,
        salaryInfo: salaryInfo.vi,
      };
    case "en": // English
      return {
        attendanceMessage: `Attendance Photo - Name: ${userId} - Event: ${isCheckAttendanceTitle} - ${
          isCheckAttendanceTitle === "✅" ? "Finish" : "Start"
        }: ${start || ""}${end ? ` - Finish: ${end}` : ""}`,
        salaryInfo: salaryInfo.en,
      };
    case "zh": // Tiếng Trung
      return {
        attendanceMessage: `拍摄点名照片 - 姓名: ${userId} - 事件: ${isCheckAttendanceTitle} - ${
          isCheckAttendanceTitle === "✅" ? "结束" : "开始"
        }: ${start || ""}${end ? ` - 结束: ${end}` : ""}`,
        salaryInfo: salaryInfo.zh,
      };
    case "fr": // Tiếng Pháp
      return {
        attendanceMessage: `Photo de présence - Nom: ${userId} - Événement: ${isCheckAttendanceTitle} - ${
          isCheckAttendanceTitle === "✅" ? "Terminé" : "Commencer"
        }: ${start || ""}${end ? ` - Terminé: ${end}` : ""}`,
        salaryInfo: salaryInfo.fr,
      };
    case "ja": // Tiếng Nhật
      return {
        attendanceMessage: `出席写真 - 名前: ${userId} - イベント: ${isCheckAttendanceTitle} - ${
          isCheckAttendanceTitle === "✅" ? "終了" : "開始"
        }: ${start || ""}${end ? ` - 終了: ${end}` : ""}`,
        salaryInfo: salaryInfo.ja,
      };
    default: // English as fallback
      return {
        attendanceMessage: `Attendance Photo - Name: ${userId} - Event: ${isCheckAttendanceTitle} - ${
          isCheckAttendanceTitle === "✅" ? "Finish" : "Start"
        }: ${start || ""}${end ? ` - Finish: ${end}` : ""}`,
        salaryInfo: salaryInfo.en,
      };
  }
};

export const translateCamera = (language: string) => {
  switch (language) {
    case "vi": // Tiếng Việt
      return {
        cameraNotFound: "Không tìm thấy camera!",
        somethingWentWrong: "Something went wrong!",
        browserNotSupported: "Trình duyệt này không được hỗ trợ!",
        cannotLoadImage2D: "Không thể tải ảnh 2D!",
        imageNotFound: "Không tìm thấy ảnh!",
        imageUploadedSuccess: "Đăng ảnh thành công!",
        alreadyCheckedInToday: "Bạn đã checkin ngày hôm nay!",
        invalidQrCode: "Qr code của bạn không đúng!",
        loadingData: "Đang tải dữ liệu, vui lòng đợi...",
        alreadyCheckedIn: "Ngày hôm nay bạn đã checkin. Hãy quay lại ngày sau!",
        checkedInByNfc: "Bạn đã checkin bằng NFC!",
        qrCodeCorrect: "Qr code của bạn đã đúng.",
        qrCodeIncorrect: "Qr code của bạn không đúng.",
      };
    case "en": // English
      return {
        cameraNotFound: "Camera not found!",
        somethingWentWrong: "Something went wrong!",
        browserNotSupported: "This browser is not supported!",
        cannotLoadImage2D: "Cannot load 2D image!",
        imageNotFound: "Image not found!",
        imageUploadedSuccess: "Image uploaded successfully!",
        alreadyCheckedInToday: "You have already checked in today!",
        invalidQrCode: "Your QR code is incorrect!",
        loadingData: "Loading data, please wait...",
        alreadyCheckedIn:
          "You have already checked in today. Please come back later!",
        checkedInByNfc: "You have checked in by NFC!",
        qrCodeCorrect: "Your QR code is correct.",
        qrCodeIncorrect: "Your QR code is incorrect.",
      };
    case "zh": // Tiếng Trung
      return {
        cameraNotFound: "未找到相机！",
        somethingWentWrong: "出了点问题!",
        browserNotSupported: "此浏览器不受支持！",
        cannotLoadImage2D: "无法加载2D图像！",
        imageNotFound: "未找到图像！",
        imageUploadedSuccess: "图片上传成功！",
        alreadyCheckedInToday: "您今天已经签到！",
        invalidQrCode: "您的二维码不正确！",
        loadingData: "正在加载数据，请稍等...",
        alreadyCheckedIn: "您今天已经签到，请稍后再来！",
        checkedInByNfc: "您已经通过NFC签到！",
        qrCodeCorrect: "您的二维码是正确的。",
        qrCodeIncorrect: "您的二维码不正确。",
      };
    case "fr": // Tiếng Pháp
      return {
        cameraNotFound: "Caméra introuvable !",
        somethingWentWrong: "Quelque chose a mal tourné!",
        browserNotSupported: "Ce navigateur n'est pas pris en charge !",
        cannotLoadImage2D: "Impossible de charger l'image 2D !",
        imageNotFound: "Image introuvable !",
        imageUploadedSuccess: "Image téléchargée avec succès !",
        alreadyCheckedInToday: "Vous êtes déjà inscrit aujourd'hui !",
        invalidQrCode: "Votre QR code est incorrect !",
        loadingData: "Chargement des données, veuillez patienter...",
        alreadyCheckedIn:
          "Vous avez déjà fait votre check-in aujourd'hui. Revenez plus tard !",
        checkedInByNfc: "Vous vous êtes enregistré par NFC !",
        qrCodeCorrect: "Votre QR code est correct.",
        qrCodeIncorrect: "Votre QR code est incorrect.",
      };
    case "ja": // Tiếng Nhật
      return {
        cameraNotFound: "カメラが見つかりません！",
        somethingWentWrong: "何かがうまくいきませんでした!",
        browserNotSupported: "このブラウザはサポートされていません！",
        cannotLoadImage2D: "2D画像を読み込めません！",
        imageNotFound: "画像が見つかりません！",
        imageUploadedSuccess: "画像のアップロードに成功しました！",
        alreadyCheckedInToday: "今日はすでにチェックインしました！",
        invalidQrCode: "QRコードが正しくありません！",
        loadingData: "データを読み込んでいます。しばらくお待ちください...",
        alreadyCheckedIn:
          "今日はすでにチェックインしました。後で戻ってください！",
        checkedInByNfc: "NFCでチェックインしました！",
        qrCodeCorrect: "QRコードが正しいです。",
        qrCodeIncorrect: "QRコードが正しくありません。",
      };
    default: // English as fallback
      return {
        cameraNotFound: "Camera not found!",
        somethingWentWrong: "Something went wrong!",
        browserNotSupported: "This browser is not supported!",
        cannotLoadImage2D: "Cannot load 2D image!",
        imageNotFound: "Image not found!",
        imageUploadedSuccess: "Image uploaded successfully!",
        alreadyCheckedInToday: "You have already checked in today!",
        invalidQrCode: "Your QR code is incorrect!",
        loadingData: "Loading data, please wait...",
        alreadyCheckedIn:
          "You have already checked in today. Please come back later!",
        checkedInByNfc: "You have checked in by NFC!",
        qrCodeCorrect: "Your QR code is correct.",
        qrCodeIncorrect: "Your QR code is incorrect.",
      };
  }
};

export const translateNfcAttendance = (
  language: string,
  userId: string | null | undefined,
  isCheckAttendanceTitle: string,
  start: string | null,
  end: string | null
) => {
  const status = isCheckAttendanceTitle === "✅" ? "Kết thúc" : "Bắt đầu";
  const timeDetails = `${start || ""}${end ? ` - Kết thúc: ${end}` : ""}`;
  const baseMessage = `NFC điểm danh - Tên: ${userId} - Sự kiện:${isCheckAttendanceTitle} - ${status}: ${timeDetails}`;

  switch (language) {
    case "vi": // Tiếng Việt
      return {
        attendanceMessage: baseMessage,
        salaryInfo: "Nhân viên sẽ được trả lương thông qua việc quét NFC.",
      };
    case "en": // English
      return {
        attendanceMessage: `NFC Attendance - Name: ${userId} - Event: ${isCheckAttendanceTitle} - ${
          isCheckAttendanceTitle === "✅" ? "Finish" : "Start"
        }: ${start || ""}${end ? ` - Finish: ${end}` : ""}`,
        salaryInfo: "Employees will be paid through NFC scanning.",
      };
    case "zh": // Tiếng Trung
      return {
        attendanceMessage: `NFC打卡 - 姓名: ${userId} - 事件: ${isCheckAttendanceTitle} - ${
          isCheckAttendanceTitle === "✅" ? "结束" : "开始"
        }: ${start || ""}${end ? ` - 结束: ${end}` : ""}`,
        salaryInfo: "员工将通过NFC扫描获得工资。",
      };
    case "fr": // Tiếng Pháp
      return {
        attendanceMessage: `Pointage NFC - Nom: ${userId} - Événement: ${isCheckAttendanceTitle} - ${
          isCheckAttendanceTitle === "✅" ? "Terminé" : "Commencer"
        }: ${start || ""}${end ? ` - Terminé: ${end}` : ""}`,
        salaryInfo: "Les employés seront payés via la numérisation NFC.",
      };
    case "ja": // Tiếng Nhật
      return {
        attendanceMessage: `NFC出席 - 名前: ${userId} - イベント: ${isCheckAttendanceTitle} - ${
          isCheckAttendanceTitle === "✅" ? "終了" : "開始"
        }: ${start || ""}${end ? ` - 終了: ${end}` : ""}`,
        salaryInfo: "従業員はNFCスキャンで給与が支払われます。",
      };
    default: // English as fallback
      return {
        attendanceMessage: `NFC Attendance - Name: ${userId} - Event: ${isCheckAttendanceTitle} - ${
          isCheckAttendanceTitle === "✅" ? "Finish" : "Start"
        }: ${start || ""}${end ? ` - Finish: ${end}` : ""}`,
        salaryInfo: "Employees will be paid through NFC scanning.",
      };
  }
};

export const translateNfc = (language: string) => {
  switch (language) {
    case "vi": // Tiếng Việt
      return {
        scanStarted: "> Bắt đầu Scan",
        cannotReadNfcData:
          "Argh! Không thể đọc dữ liệu từ mã NFC. Thử mã khác?",
        serialNumber: "> Số Serial",
        records: "> Bản ghi",
        argh: "Argh!",
        scanSuccess: "Quét mã thành công!",
        somethingWentWrong: "Something went wrong!",
        alreadyCheckedInToday: "Bạn đã checkin ngày hôm nay!",
        invalidNfc: "NFC của bạn không đúng!",
        nfcNotFound: "Không tìm thấy mã NFC!",
        startScan: "Bắt đầu Scan",
        nfcReader: "Đầu đọc thẻ NFC",
        holdNfcCardClose: "Giữ gần thẻ",
        alreadyCheckedIn: "Ngày hôm nay bạn đã checkin. Hãy quay lại ngày sau!",
        checkedInByQrCode: "Bạn đã checkin bằng QrCode!",
        nfcCorrect: "NFC của bạn đã đúng.",
        nfcIncorrect: "NFC của bạn không đúng.",
        exit: "Thoát",
      };
    case "en": // English
      return {
        scanStarted: "> Scan started",
        cannotReadNfcData:
          "Argh! Cannot read data from the NFC tag. Try another one?",
        serialNumber: "> Serial Number",
        records: "> Records",
        argh: "Argh!",
        scanSuccess: "Scan successful!",
        somethingWentWrong: "Something went wrong!",
        alreadyCheckedInToday: "You have already checked in today!",
        invalidNfc: "Your NFC is incorrect!",
        nfcNotFound: "NFC tag not found!",
        startScan: "Start Scan",
        nfcReader: "NFC Card Reader",
        holdNfcCardClose: "Hold the card close",
        alreadyCheckedIn:
          "You have already checked in today. Please come back later!",
        checkedInByQrCode: "You have checked in by QR code!",
        nfcCorrect: "Your NFC is correct.",
        nfcIncorrect: "Your NFC is incorrect.",
        exit: "Exit",
      };
    case "zh": // Tiếng Trung
      return {
        scanStarted: "> 开始扫描",
        cannotReadNfcData: "啊！无法读取NFC标签数据。尝试另一个标签？",
        serialNumber: "> 序列号",
        records: "> 记录",
        argh: "啊！",
        scanSuccess: "扫描成功！",
        somethingWentWrong: "出了点问题！",
        alreadyCheckedInToday: "今天您已经签到！",
        invalidNfc: "您的NFC标签不正确！",
        nfcNotFound: "未找到NFC标签！",
        startScan: "开始扫描",
        nfcReader: "NFC卡读取器",
        holdNfcCardClose: "将卡片靠近",
        alreadyCheckedIn: "您今天已签到，请稍后再来！",
        checkedInByQrCode: "您已通过二维码签到！",
        nfcCorrect: "您的NFC标签正确。",
        nfcIncorrect: "您的NFC标签不正确。",
        exit: "退出",
      };
    case "fr": // Tiếng Pháp
      return {
        scanStarted: "> Scan commencé",
        cannotReadNfcData:
          "Argh ! Impossible de lire les données du tag NFC. Essayez un autre ?",
        serialNumber: "> Numéro de série",
        records: "> Enregistrements",
        argh: "Argh !",
        scanSuccess: "Scan réussi !",
        somethingWentWrong: "Quelque chose a mal tourné !",
        alreadyCheckedInToday: "Vous avez déjà check-in aujourd'hui !",
        invalidNfc: "Votre NFC est incorrect !",
        nfcNotFound: "Tag NFC introuvable !",
        startScan: "Commencer le scan",
        nfcReader: "Lecteur de carte NFC",
        holdNfcCardClose: "Tenez la carte près",
        alreadyCheckedIn:
          "Vous avez déjà check-in aujourd'hui. Revenez plus tard !",
        checkedInByQrCode: "Vous vous êtes enregistré avec un QR code !",
        nfcCorrect: "Votre NFC est correct.",
        nfcIncorrect: "Votre NFC est incorrect.",
        exit: "Sortir",
      };
    case "ja": // Tiếng Nhật
      return {
        scanStarted: "> スキャン開始",
        cannotReadNfcData:
          "ああ！NFCタグのデータを読み取れません。別のものを試しますか？",
        serialNumber: "> シリアル番号",
        records: "> レコード",
        argh: "ああ！",
        scanSuccess: "スキャン成功！",
        somethingWentWrong: "何かがうまくいきませんでした！",
        alreadyCheckedInToday: "今日はすでにチェックインしました！",
        invalidNfc: "あなたのNFCは正しくありません！",
        nfcNotFound: "NFCタグが見つかりません！",
        startScan: "スキャン開始",
        nfcReader: "NFCカードリーダー",
        holdNfcCardClose: "カードを近づけてください",
        alreadyCheckedIn:
          "今日はすでにチェックインしました。後で戻ってください！",
        checkedInByQrCode: "QRコードでチェックインしました！",
        nfcCorrect: "あなたのNFCは正しいです。",
        nfcIncorrect: "あなたのNFCは正しくありません。",
        exit: "退出",
      };
    default: // English as fallback
      return {
        scanStarted: "> Scan started",
        cannotReadNfcData:
          "Argh! Cannot read data from the NFC tag. Try another one?",
        serialNumber: "> Serial Number",
        records: "> Records",
        argh: "Argh!",
        scanSuccess: "Scan successful!",
        somethingWentWrong: "Something went wrong!",
        alreadyCheckedInToday: "You have already checked in today!",
        invalidNfc: "Your NFC is incorrect!",
        nfcNotFound: "NFC tag not found!",
        startScan: "Start Scan",
        nfcReader: "NFC Card Reader",
        holdNfcCardClose: "Hold the card close",
        alreadyCheckedIn:
          "You have already checked in today. Please come back later!",
        checkedInByQrCode: "You have checked in by QR code!",
        nfcCorrect: "Your NFC is correct.",
        nfcIncorrect: "Your NFC is incorrect.",
        exit: "Exit",
      };
  }
};

export const translateChooseAttendance = (
  language: string,
  userId: string | null | undefined,
  isCheckAttendanceTitle: string,
  start: string | null,
  end: string | null
) => {
  const status = isCheckAttendanceTitle === "✅" ? "Kết thúc" : "Bắt đầu";
  const timeDetails = `${start || ""}${end ? ` - Kết thúc: ${end}` : ""}`;
  const baseMessage = `Chụp ảnh điểm danh - Tên: ${userId} - Sự kiện: ${isCheckAttendanceTitle} - ${status}: ${timeDetails}`;

  switch (language) {
    case "vi": // Tiếng Việt
      return {
        baseMessage,
        chooseMethod: "Lựa chọn điểm danh theo phương thức NFC hoặc QrCode!",
        nfc: "NFC",
        qrCode: "QrCode",
      };
    case "en": // English
      return {
        baseMessage: `Attendance Photo - Name: ${userId} - Event: ${isCheckAttendanceTitle} - ${
          isCheckAttendanceTitle === "✅" ? "Finish" : "Start"
        }: ${start || ""}${end ? ` - Finish: ${end}` : ""}`,
        chooseMethod: "Choose attendance method: NFC or QR Code!",
        nfc: "NFC",
        qrCode: "QR Code",
      };
    case "zh": // Tiếng Trung
      return {
        baseMessage: `拍摄点名照片 - 姓名: ${userId} - 事件: ${isCheckAttendanceTitle} - ${
          isCheckAttendanceTitle === "✅" ? "结束" : "开始"
        }: ${start || ""}${end ? ` - 结束: ${end}` : ""}`,
        chooseMethod: "选择点名方式：NFC或二维码！",
        nfc: "NFC",
        qrCode: "二维码",
      };
    case "fr": // Tiếng Pháp
      return {
        baseMessage: `Photo de présence - Nom: ${userId} - Événement: ${isCheckAttendanceTitle} - ${
          isCheckAttendanceTitle === "✅" ? "Terminé" : "Commencer"
        }: ${start || ""}${end ? ` - Terminé: ${end}` : ""}`,
        chooseMethod: "Choisissez la méthode de pointage: NFC ou QR Code!",
        nfc: "NFC",
        qrCode: "QR Code",
      };
    case "ja": // Tiếng Nhật
      return {
        baseMessage: `出席写真 - 名前: ${userId} - イベント: ${isCheckAttendanceTitle} - ${
          isCheckAttendanceTitle === "✅" ? "終了" : "開始"
        }: ${start || ""}${end ? ` - 終了: ${end}` : ""}`,
        chooseMethod: "出席方法を選択: NFCまたはQRコード！",
        nfc: "NFC",
        qrCode: "QRコード",
      };
    default: // English as fallback
      return {
        baseMessage: `Attendance Photo - Name: ${userId} - Event: ${isCheckAttendanceTitle} - ${
          isCheckAttendanceTitle === "✅" ? "Finish" : "Start"
        }: ${start || ""}${end ? ` - Finish: ${end}` : ""}`,
        chooseMethod: "Choose attendance method: NFC or QR Code!",
        nfc: "NFC",
        qrCode: "QR Code",
      };
  }
};

export const translateStoreModal = (language: string) => {
  switch (language) {
    case "vi": // Tiếng Việt
      return {
        somethingWentWrong: "Đã có lỗi xảy ra!",
        createStore: "Tạo cửa hàng",
        createStoreOrProduct: "Hãy tạo quản lý cửa hàng hoặc sản phẩm",
        storeName: "Tên cửa hàng",
        pleaseEnterStoreName: "Vui lòng nhập tên cửa hàng",
        publicDisplayName: "Đây là tên hiển thị công khai.",
        cancel: "Hủy",
        continue: "Tiếp tục",
      };
    case "en": // English
      return {
        somethingWentWrong: "Something went wrong!",
        createStore: "Create Store",
        createStoreOrProduct: "Please create a store or product management",
        storeName: "Store Name",
        pleaseEnterStoreName: "Please enter the store name",
        publicDisplayName: "This is the public display name.",
        cancel: "Cancel",
        continue: "Continue",
      };
    case "zh": // Tiếng Trung
      return {
        somethingWentWrong: "出错了！",
        createStore: "创建商店",
        createStoreOrProduct: "请创建商店或产品管理",
        storeName: "商店名称",
        pleaseEnterStoreName: "请输入商店名称",
        publicDisplayName: "这是公开显示的名称。",
        cancel: "取消",
        continue: "继续",
      };
    case "fr": // Tiếng Pháp
      return {
        somethingWentWrong: "Quelque chose a mal tourné !",
        createStore: "Créer une boutique",
        createStoreOrProduct:
          "Veuillez créer une gestion de magasin ou de produit",
        storeName: "Nom du magasin",
        pleaseEnterStoreName: "Veuillez entrer le nom du magasin",
        publicDisplayName: "Ceci est le nom affiché publiquement.",
        cancel: "Annuler",
        continue: "Continuer",
      };
    case "ja": // Tiếng Nhật
      return {
        somethingWentWrong: "何かがうまくいきませんでした！",
        createStore: "店舗を作成",
        createStoreOrProduct: "店舗または製品管理を作成してください",
        storeName: "店舗名",
        pleaseEnterStoreName: "店舗名を入力してください",
        publicDisplayName: "これは公開表示名です。",
        cancel: "キャンセル",
        continue: "続行",
      };
    default: // English as fallback
      return {
        somethingWentWrong: "Something went wrong!",
        createStore: "Create Store",
        createStoreOrProduct: "Please create a store or product management",
        storeName: "Store Name",
        pleaseEnterStoreName: "Please enter the store name",
        publicDisplayName: "This is the public display name.",
        cancel: "Cancel",
        continue: "Continue",
      };
  }
};

export const translateGuestAccountModal = (language: string) => {
  switch (language) {
    case "vi": // Tiếng Việt
      return {
        guestAccountRule: "Quy định tài khoản khách !",
        cannotEditAsGuest:
          "Bạn không được phép chỉnh sửa khi đăng nhập bằng tài khoản khách.",
        limitedFunctionalityAsGuest:
          "Với tư cách là người dùng khách, chức năng bị hạn chế.",
        cannotEditOrComment:
          "Bạn không thể chỉnh sửa hoặc đăng bình luận. Vui lòng đăng nhập bằng tài khoản đã đăng ký để có quyền truy cập đầy đủ vào các tính năng này.",
        cancel: "Hủy bỏ",
        login: "Đăng nhập",
      };
    case "en": // English
      return {
        guestAccountRule: "Guest account policy!",
        cannotEditAsGuest:
          "You are not allowed to edit when logged in as a guest account.",
        limitedFunctionalityAsGuest:
          "As a guest user, functionality is limited.",
        cannotEditOrComment:
          "You cannot edit or post comments. Please log in with a registered account to gain full access to these features.",
        cancel: "Cancel",
        login: "Login",
      };
    case "zh": // Tiếng Trung
      return {
        guestAccountRule: "访客账户政策！",
        cannotEditAsGuest: "以访客账户登录时，您不能编辑。",
        limitedFunctionalityAsGuest: "作为访客用户，功能受限。",
        cannotEditOrComment:
          "您不能编辑或发表评论。请使用注册账户登录以获得完整的功能访问权限。",
        cancel: "取消",
        login: "登录",
      };
    case "fr": // Tiếng Pháp
      return {
        guestAccountRule: "Règles du compte invité !",
        cannotEditAsGuest:
          "Vous ne pouvez pas modifier lorsque vous êtes connecté avec un compte invité.",
        limitedFunctionalityAsGuest:
          "En tant qu'utilisateur invité, les fonctionnalités sont limitées.",
        cannotEditOrComment:
          "Vous ne pouvez pas modifier ou publier de commentaires. Veuillez vous connecter avec un compte enregistré pour accéder pleinement à ces fonctionnalités.",
        cancel: "Annuler",
        login: "Se connecter",
      };
    case "ja": // Tiếng Nhật
      return {
        guestAccountRule: "ゲストアカウントの規定！",
        cannotEditAsGuest:
          "ゲストアカウントでログインしている場合、編集できません。",
        limitedFunctionalityAsGuest:
          "ゲストユーザーとして機能は制限されています。",
        cannotEditOrComment:
          "編集やコメントの投稿はできません。登録したアカウントでログインして、これらの機能に完全にアクセスしてください。",
        cancel: "キャンセル",
        login: "ログイン",
      };
    default: // English as fallback
      return {
        guestAccountRule: "Guest account policy!",
        cannotEditAsGuest:
          "You are not allowed to edit when logged in as a guest account.",
        limitedFunctionalityAsGuest:
          "As a guest user, functionality is limited.",
        cannotEditOrComment:
          "You cannot edit or post comments. Please log in with a registered account to gain full access to these features.",
        cancel: "Cancel",
        login: "Login",
      };
  }
};

export const translateFeedbackMessages = (language: string) => {
  switch (language) {
    case "vi": // Tiếng Việt
      return {
        good: "Tốt",
        average: "Tạm",
        bad: "Tệ",
        poorService: "Phục vụ kém", // Unprofessional service
        terrible: "Quá tệ",
        unprofessionalService: "Dịch vụ không chuyên nghiệp", // Unprofessional service
        delayedResponse: "Nhân viên phản hồi chậm", // Delayed response from staff
        complicatedPayment: "Thanh toán phức tạp", // Complicated payment
        noResponse: "Không có phản hồi từ cuộc gọi", // No response to the call
        websiteIssues: "Vấn đề hiệu suất website", // Website performance issues
        other: "Khác", // Other
      };
    case "en": // English
      return {
        good: "Good",
        average: "Average",
        bad: "Bad",
        poorService: "Unprofessional service",
        terrible: "Too bad",
        unprofessionalService: "Unprofessional service",
        delayedResponse: "Delayed response from staff",
        complicatedPayment: "Complicated payment",
        noResponse: "No response to the call",
        websiteIssues: "Website performance issues",
        other: "Other",
      };
    case "zh": // Tiếng Trung
      return {
        good: "好",
        average: "一般",
        bad: "差",
        poorService: "服务不专业",
        terrible: "太糟糕",
        unprofessionalService: "不专业的服务",
        delayedResponse: "员工响应延迟",
        complicatedPayment: "支付复杂",
        noResponse: "没有回应",
        websiteIssues: "网站性能问题",
        other: "其他",
      };
    case "fr": // Tiếng Pháp
      return {
        good: "Bon",
        average: "Moyenne",
        bad: "Mauvais",
        poorService: "Service non professionnel",
        terrible: "Trop mauvais",
        unprofessionalService: "Service non professionnel",
        delayedResponse: "Réponse retardée du personnel",
        complicatedPayment: "Paiement compliqué",
        noResponse: "Aucune réponse à l'appel",
        websiteIssues: "Problèmes de performance du site web",
        other: "Autre",
      };
    case "ja": // Tiếng Nhật
      return {
        good: "良い",
        average: "普通",
        bad: "悪い",
        poorService: "非専門的なサービス",
        terrible: "ひどい",
        unprofessionalService: "専門的でないサービス",
        delayedResponse: "スタッフの遅延応答",
        complicatedPayment: "複雑な支払い",
        noResponse: "電話に応答なし",
        websiteIssues: "ウェブサイトのパフォーマンス問題",
        other: "その他",
      };
    default: // English as fallback
      return {
        good: "Good",
        average: "Average",
        bad: "Bad",
        poorService: "Unprofessional service",
        terrible: "Too bad",
        unprofessionalService: "Unprofessional service",
        delayedResponse: "Delayed response from staff",
        complicatedPayment: "Complicated payment",
        noResponse: "No response to the call",
        websiteIssues: "Website performance issues",
        other: "Other",
      };
  }
};

export const translateFeedbackActions = (language: string) => {
  switch (language) {
    case "vi": // Tiếng Việt
      return {
        feedbackIdCopied: "ID phản hồi đã được sao chép vào clipboard.",
        feedbackDeleted: "Phản hồi đã bị xóa.",
        somethingWentWrong: "Đã xảy ra lỗi!",
        openMenu: "Mở menu",
        actions: "Hành động",
        copyId: "Sao chép ID",
        sendResponse: "Gửi phản hồi",
        delete: "Xóa",
      };
    case "en": // English
      return {
        feedbackIdCopied: "Feedback Id copied to the clipboard.",
        feedbackDeleted: "Feedback deleted.",
        somethingWentWrong: "Something went wrong!",
        openMenu: "Open menu",
        actions: "Actions",
        copyId: "Copy Id",
        sendResponse: "Send Response",
        delete: "Delete",
      };
    case "zh": // Tiếng Trung
      return {
        feedbackIdCopied: "反馈ID已复制到剪贴板。",
        feedbackDeleted: "反馈已删除。",
        somethingWentWrong: "出了点问题！",
        openMenu: "打开菜单",
        actions: "操作",
        copyId: "复制ID",
        sendResponse: "发送反馈",
        delete: "删除",
      };
    case "fr": // Tiếng Pháp
      return {
        feedbackIdCopied: "ID de retour copié dans le presse-papiers.",
        feedbackDeleted: "Retour supprimé.",
        somethingWentWrong: "Une erreur est survenue!",
        openMenu: "Ouvrir le menu",
        actions: "Actions",
        copyId: "Copier l'ID",
        sendResponse: "Envoyer une réponse",
        delete: "Supprimer",
      };
    case "ja": // Tiếng Nhật
      return {
        feedbackIdCopied:
          "フィードバックIDがクリップボードにコピーされました。",
        feedbackDeleted: "フィードバックが削除されました。",
        somethingWentWrong: "何かがうまくいきませんでした！",
        openMenu: "メニューを開く",
        actions: "アクション",
        copyId: "IDをコピー",
        sendResponse: "返信を送信",
        delete: "削除",
      };
    default: // English as fallback
      return {
        feedbackIdCopied: "Feedback Id copied to the clipboard.",
        feedbackDeleted: "Feedback deleted.",
        somethingWentWrong: "Something went wrong!",
        openMenu: "Open menu",
        actions: "Actions",
        copyId: "Copy Id",
        sendResponse: "Send Response",
        delete: "Delete",
      };
  }
};

export const translateFeedbackClient = (language: string) => {
  switch (language) {
    case "vi": // Tiếng Việt
      return {
        feedbackDeletedSuccess: "Phản hồi đã được xóa thành công.",
        somethingWentWrong: "Đã xảy ra lỗi!",
        feedback: "Phản hồi",
        manageFeedbackStore: "Quản lý Feedback cửa hàng",
        api: "API",
        apiCallsForFeedback: "Các cuộc gọi API cho Feedback",
      };
    case "en": // English
      return {
        feedbackDeletedSuccess: "Feedback deleted successfully.",
        somethingWentWrong: "Something went wrong!",
        feedback: "Feedback",
        manageFeedbackStore: "Manage Store Feedback",
        api: "API",
        apiCallsForFeedback: "API calls for Feedback",
      };
    case "zh": // Tiếng Trung
      return {
        feedbackDeletedSuccess: "反馈已成功删除。",
        somethingWentWrong: "出了点问题！",
        feedback: "反馈",
        manageFeedbackStore: "管理商店反馈",
        api: "API",
        apiCallsForFeedback: "反馈的API调用",
      };
    case "fr": // Tiếng Pháp
      return {
        feedbackDeletedSuccess: "Feedback supprimé avec succès.",
        somethingWentWrong: "Une erreur est survenue!",
        feedback: "Feedback",
        manageFeedbackStore: "Gérer les retours du magasin",
        api: "API",
        apiCallsForFeedback: "Appels API pour les retours",
      };
    case "ja": // Tiếng Nhật
      return {
        feedbackDeletedSuccess: "フィードバックが正常に削除されました。",
        somethingWentWrong: "何かがうまくいきませんでした！",
        feedback: "フィードバック",
        manageFeedbackStore: "店舗のフィードバックを管理",
        api: "API",
        apiCallsForFeedback: "フィードバックのAPI呼び出し",
      };
    default: // English as fallback
      return {
        feedbackDeletedSuccess: "Feedback deleted successfully.",
        somethingWentWrong: "Something went wrong!",
        feedback: "Feedback",
        manageFeedbackStore: "Manage Store Feedback",
        api: "API",
        apiCallsForFeedback: "API calls for Feedback",
      };
  }
};

export const translateSentEmailUserModal = (language: string) => {
  switch (language) {
    case "vi": // Tiếng Việt
      return {
        subjectRequired: "Chủ đề là bắt buộc.",
        emailContentRequired: "Nội dung email là bắt buộc.",
        somethingWentWrong: "Đã xảy ra lỗi!",
        emailSentToUser: "Đã gửi email đến người dùng",
        sendEmailToUser: "Gửi email đến người dùng",
        chooseEmailDesign:
          "Hãy lựa chọn thiết kế cho email gửi đến khách hàng đẹp hơn.",
        sentFrom: "Gửi từ",
        emailTo: "Email đến",
        emailPlaceholder: "Email...",
        subject: "Chủ đề",
        subjectPlaceholder: "Chủ đề...",
        sendEmail: "Gửi email",
        sendFromPlaceholder: "Gửi từ...", // Thêm placeholder "Send from..."
      };
    case "en": // English
      return {
        subjectRequired: "Subject is required.",
        emailContentRequired: "Email content is required.",
        somethingWentWrong: "Something went wrong!",
        emailSentToUser: "Sent email to the user",
        sendEmailToUser: "Send email to the user",
        chooseEmailDesign:
          "Please choose a better design for the email sent to the customer.",
        sentFrom: "Sent from",
        emailTo: "Email to",
        emailPlaceholder: "Email...",
        subject: "Subject",
        subjectPlaceholder: "Subject...",
        sendEmail: "Send Email",
        sendFromPlaceholder: "Send from...", // Added "Send from..." placeholder
      };
    case "zh": // Tiếng Trung
      return {
        subjectRequired: "主题是必填的。",
        emailContentRequired: "电子邮件内容是必填的。",
        somethingWentWrong: "出了点问题！",
        emailSentToUser: "已向用户发送电子邮件",
        sendEmailToUser: "向用户发送电子邮件",
        chooseEmailDesign: "请选择一个更好的设计发送给客户的电子邮件。",
        sentFrom: "发送自",
        emailTo: "发送给",
        emailPlaceholder: "电子邮件...",
        subject: "主题",
        subjectPlaceholder: "主题...",
        sendEmail: "发送电子邮件",
        sendFromPlaceholder: "发送自...", // 添加 "发送自..." 作为 Send from 的占位符
      };
    case "fr": // Tiếng Pháp
      return {
        subjectRequired: "Le sujet est requis.",
        emailContentRequired: "Le contenu de l'email est requis.",
        somethingWentWrong: "Une erreur est survenue!",
        emailSentToUser: "Email envoyé à l'utilisateur",
        sendEmailToUser: "Envoyer un email à l'utilisateur",
        chooseEmailDesign:
          "Veuillez choisir un meilleur design pour l'email envoyé au client.",
        sentFrom: "Envoyé de",
        emailTo: "Email à",
        emailPlaceholder: "Email...",
        subject: "Sujet",
        subjectPlaceholder: "Sujet...",
        sendEmail: "Envoyer l'email",
        sendFromPlaceholder: "Envoyé de...", // Ajout du placeholder "Envoyé de..."
      };
    case "ja": // Tiếng Nhật
      return {
        subjectRequired: "件名は必須です。",
        emailContentRequired: "メールの内容は必須です。",
        somethingWentWrong: "何かがうまくいきませんでした！",
        emailSentToUser: "ユーザーにメールを送信しました",
        sendEmailToUser: "ユーザーにメールを送信する",
        chooseEmailDesign: "お客様に送るメールのデザインを選んでください。",
        sentFrom: "送信元",
        emailTo: "メールへ",
        emailPlaceholder: "メール...",
        subject: "件名",
        subjectPlaceholder: "件名...",
        sendEmail: "メールを送信",
        sendFromPlaceholder: "送信元...", // 送信元のプレースホルダーを追加
      };
    default: // English as fallback
      return {
        subjectRequired: "Subject is required.",
        emailContentRequired: "Email content is required.",
        somethingWentWrong: "Something went wrong!",
        emailSentToUser: "Sent email to the user",
        sendEmailToUser: "Send email to the user",
        chooseEmailDesign:
          "Please choose a better design for the email sent to the customer.",
        sentFrom: "Sent from",
        emailTo: "Email to",
        emailPlaceholder: "Email...",
        subject: "Subject",
        subjectPlaceholder: "Subject...",
        sendEmail: "Send Email",
        sendFromPlaceholder: "Send from...", // Added "Send from..." placeholder
      };
  }
};

export const translateContentTiptap = (language: string) => {
  switch (language) {
    case "vi": // Tiếng Việt
      return {
        title: "Nội dung",
        message:
          "Nhập nội dung xong có thể chỉnh sửa lựa chọn các style bên trên.",
      };
    case "en": // English
      return {
        title: "Content",
        message:
          "After entering the content, you can edit and choose from the styles above.",
      };
    case "zh": // Tiếng Trung
      return {
        title: "内容",
        message: "输入内容后，您可以编辑并选择上方的样式。",
      };
    case "fr": // Tiếng Pháp
      return {
        title: "Contenu",
        message:
          "Après avoir saisi le contenu, vous pouvez modifier et choisir parmi les styles ci-dessus.",
      };
    case "ja": // Tiếng Nhật
      return {
        title: "内容",
        message: "内容を入力した後、上記のスタイルを編集して選択できます。",
      };
    default: // English as fallback
      return {
        title: "Content",
        message:
          "After entering the content, you can edit and choose from the styles above.",
      };
  }
};

export const translateExtensionDefault = (language: string) => {
  switch (language) {
    case "vi": // Tiếng Việt
      return {
        default: "Mặc định",
        bold: "Chữ đậm",
        italic: "Chữ nghiêng",
        strikethrough: "Gạch ngang",
        blockquote: "Khôi trích dẫn",
        code: "Chữ code",
        highlight: "Nổi bật",
        removeHighlight: "Xóa nổi bật",
        subtitle: "Phụ đề",
        underline: "Gạch chân",
        lineHeight: "Line Height",
        link: "Link",
        unlink: "Un link",
        undo: "Hoàn tác",
        redo: "Làm lại",
        horizontalRule: "Đường kẻ ngang", // Thêm dòng này
      };
    case "en": // English
      return {
        default: "Default",
        bold: "Bold",
        italic: "Italic",
        strikethrough: "Strikethrough",
        blockquote: "Blockquote",
        code: "Code",
        highlight: "Highlight",
        removeHighlight: "Remove Highlight",
        subtitle: "Subtitle",
        underline: "Underline",
        lineHeight: "Line Height",
        link: "Link",
        unlink: "Unlink",
        undo: "Undo",
        redo: "Redo",
        horizontalRule: "Horizontal Rule", // Thêm dòng này
      };
    case "zh": // Tiếng Trung
      return {
        default: "默认",
        bold: "加粗",
        italic: "斜体",
        strikethrough: "删除线",
        blockquote: "引用",
        code: "代码",
        highlight: "高亮",
        removeHighlight: "移除高亮",
        subtitle: "副标题",
        underline: "下划线",
        lineHeight: "行高",
        link: "链接",
        unlink: "取消链接",
        undo: "撤销",
        redo: "重做",
        horizontalRule: "水平线", // Thêm dòng này
      };
    case "fr": // Tiếng Pháp
      return {
        default: "Par défaut",
        bold: "Gras",
        italic: "Italique",
        strikethrough: "Barré",
        blockquote: "Citation",
        code: "Code",
        highlight: "Surligner",
        removeHighlight: "Supprimer la mise en surbrillance",
        subtitle: "Sous-titre",
        underline: "Souligner",
        lineHeight: "Hauteur de ligne",
        link: "Lien",
        unlink: "Dissocier",
        undo: "Annuler",
        redo: "Rétablir",
        horizontalRule: "Règle horizontale", // Thêm dòng này
      };
    case "ja": // Tiếng Nhật
      return {
        default: "デフォルト",
        bold: "太字",
        italic: "斜体",
        strikethrough: "打ち消し線",
        blockquote: "引用",
        code: "コード",
        highlight: "ハイライト",
        removeHighlight: "ハイライトを削除",
        subtitle: "サブタイトル",
        underline: "下線",
        lineHeight: "行の高さ",
        link: "リンク",
        unlink: "リンク解除",
        undo: "元に戻す",
        redo: "やり直す",
        horizontalRule: "水平線", // Thêm dòng này
      };
    default: // English as fallback
      return {
        default: "Default",
        bold: "Bold",
        italic: "Italic",
        strikethrough: "Strikethrough",
        blockquote: "Blockquote",
        code: "Code",
        highlight: "Highlight",
        removeHighlight: "Remove Highlight",
        subtitle: "Subtitle",
        underline: "Underline",
        lineHeight: "Line Height",
        link: "Link",
        unlink: "Unlink",
        undo: "Undo",
        redo: "Redo",
        horizontalRule: "Horizontal Rule", // Thêm dòng này
      };
  }
};

export const translateHeadings = (language: string) => {
  switch (language) {
    case "vi": // Tiếng Việt
      return {
        heading: "Tiêu đề",
        heading1: "Tiêu đề 1",
        heading2: "Tiêu đề 2",
        heading3: "Tiêu đề 3",
        heading4: "Tiêu đề 4",
        heading5: "Tiêu đề 5",
        heading6: "Tiêu đề 6",
      };
    case "en": // English
      return {
        heading: "Heading",
        heading1: "Heading 1",
        heading2: "Heading 2",
        heading3: "Heading 3",
        heading4: "Heading 4",
        heading5: "Heading 5",
        heading6: "Heading 6",
      };
    case "zh": // Tiếng Trung
      return {
        heading: "标题",
        heading1: "标题 1",
        heading2: "标题 2",
        heading3: "标题 3",
        heading4: "标题 4",
        heading5: "标题 5",
        heading6: "标题 6",
      };
    case "fr": // Tiếng Pháp
      return {
        heading: "Titre",
        heading1: "Titre 1",
        heading2: "Titre 2",
        heading3: "Titre 3",
        heading4: "Titre 4",
        heading5: "Titre 5",
        heading6: "Titre 6",
      };
    case "ja": // Tiếng Nhật
      return {
        heading: "見出し",
        heading1: "見出し 1",
        heading2: "見出し 2",
        heading3: "見出し 3",
        heading4: "見出し 4",
        heading5: "見出し 5",
        heading6: "見出し 6",
      };
    default: // English as fallback
      return {
        heading: "Heading",
        heading1: "Heading 1",
        heading2: "Heading 2",
        heading3: "Heading 3",
        heading4: "Heading 4",
        heading5: "Heading 5",
        heading6: "Heading 6",
      };
  }
};

export const translateListItems = (language: string) => {
  switch (language) {
    case "vi": // Tiếng Việt
      return {
        listItem: "Mục danh sách",
        list: "Danh sách",
        numberedList: "Danh sách số",
        bulletedList: "Danh sách thêm",
        nestedList: "Danh sách chìm",
        delete: "Xóa",
      };
    case "en": // English
      return {
        listItem: "List Item",
        list: "List",
        numberedList: "Numbered List",
        bulletedList: "Bulleted List",
        nestedList: "Nested List",
        delete: "Delete",
      };
    case "zh": // Tiếng Trung
      return {
        listItem: "列表项",
        list: "列表",
        numberedList: "编号列表",
        bulletedList: "项目符号列表",
        nestedList: "嵌套列表",
        delete: "删除",
      };
    case "fr": // Tiếng Pháp
      return {
        listItem: "Élément de liste",
        list: "Liste",
        numberedList: "Liste numérotée",
        bulletedList: "Liste à puces",
        nestedList: "Liste imbriquée",
        delete: "Supprimer",
      };
    case "ja": // Tiếng Nhật
      return {
        listItem: "リストアイテム",
        list: "リスト",
        numberedList: "番号付きリスト",
        bulletedList: "箇条書きリスト",
        nestedList: "入れ子リスト",
        delete: "削除",
      };
    default: // English as fallback
      return {
        listItem: "List Item",
        list: "List",
        numberedList: "Numbered List",
        bulletedList: "Bulleted List",
        nestedList: "Nested List",
        delete: "Delete",
      };
  }
};

export const translateTable = (language: string) => {
  switch (language) {
    case "vi": // Tiếng Việt
      return {
        table: "Bảng",
        createTable: "Tạo bảng",
        insertTable: "Chèn bảng",
        addColumnBefore: "Thêm 1 cột trước",
        addColumnAfter: "Thêm 1 cột sau",
        deleteColumn: "Xóa 1 cột",
        addRowBefore: "Thêm 1 hàng ngang trước",
        addRowAfter: "Thêm 1 hàng ngang sau",
        deleteRow: "Xóa 1 hàng ngang",
        deleteTable: "Xóa bảng",
        mergeCells: "Hợp nhất các ô",
        splitCell: "Chia ô",
        toggleHeaderColumn: "Tô đậm 1 cột",
        toggleHeaderRow: "Tô đậm 1 hàng ngang",
        toggleHeaderCell: "Tô đậm 1",
        mergeOrSplit: "Hợp nhất hoặc tách",
        setCellAttribute: "Đặt thuộc tính ô",
        fixTables: "Sửa bảng",
        goToNextCell: "Đi đến ô kế",
        goToPreviousCell: "Đi đến ô trước",
      };
    case "en": // English
      return {
        table: "Table",
        createTable: "Create Table",
        insertTable: "Insert Table",
        addColumnBefore: "Add 1 column before",
        addColumnAfter: "Add 1 column after",
        deleteColumn: "Delete 1 column",
        addRowBefore: "Add 1 row before",
        addRowAfter: "Add 1 row after",
        deleteRow: "Delete 1 row",
        deleteTable: "Delete Table",
        mergeCells: "Merge Cells",
        splitCell: "Split Cell",
        toggleHeaderColumn: "Bold 1 column",
        toggleHeaderRow: "Bold 1 row",
        toggleHeaderCell: "Bold 1",
        mergeOrSplit: "Merge or Split",
        setCellAttribute: "Set Cell Attribute",
        fixTables: "Fix Tables",
        goToNextCell: "Go to next cell",
        goToPreviousCell: "Go to previous cell",
      };
    case "zh": // Tiếng Trung
      return {
        table: "表格",
        createTable: "创建表格",
        insertTable: "插入表格",
        addColumnBefore: "在前面添加1列",
        addColumnAfter: "在后面添加1列",
        deleteColumn: "删除1列",
        addRowBefore: "在前面添加1行",
        addRowAfter: "在后面添加1行",
        deleteRow: "删除1行",
        deleteTable: "删除表格",
        mergeCells: "合并单元格",
        splitCell: "拆分单元格",
        toggleHeaderColumn: "加粗1列",
        toggleHeaderRow: "加粗1行",
        toggleHeaderCell: "加粗1个",
        mergeOrSplit: "合并或拆分",
        setCellAttribute: "设置单元格属性",
        fixTables: "修复表格",
        goToNextCell: "跳到下一个单元格",
        goToPreviousCell: "跳到前一个单元格",
      };
    case "fr": // Tiếng Pháp
      return {
        table: "Table",
        createTable: "Créer une table",
        insertTable: "Insérer une table",
        addColumnBefore: "Ajouter 1 colonne avant",
        addColumnAfter: "Ajouter 1 colonne après",
        deleteColumn: "Supprimer 1 colonne",
        addRowBefore: "Ajouter 1 ligne avant",
        addRowAfter: "Ajouter 1 ligne après",
        deleteRow: "Supprimer 1 ligne",
        deleteTable: "Supprimer la table",
        mergeCells: "Fusionner les cellules",
        splitCell: "Diviser la cellule",
        toggleHeaderColumn: "Mettre en gras 1 colonne",
        toggleHeaderRow: "Mettre en gras 1 ligne",
        toggleHeaderCell: "Mettre en gras 1",
        mergeOrSplit: "Fusionner ou diviser",
        setCellAttribute: "Définir l'attribut de la cellule",
        fixTables: "Réparer les tables",
        goToNextCell: "Aller à la cellule suivante",
        goToPreviousCell: "Aller à la cellule précédente",
      };
    case "ja": // Tiếng Nhật
      return {
        table: "テーブル",
        createTable: "テーブルを作成",
        insertTable: "テーブルを挿入",
        addColumnBefore: "前に1列を追加",
        addColumnAfter: "後に1列を追加",
        deleteColumn: "1列を削除",
        addRowBefore: "前に1行を追加",
        addRowAfter: "後に1行を追加",
        deleteRow: "1行を削除",
        deleteTable: "テーブルを削除",
        mergeCells: "セルを結合",
        splitCell: "セルを分割",
        toggleHeaderColumn: "1列を太字に",
        toggleHeaderRow: "1行を太字に",
        toggleHeaderCell: "1個を太字に",
        mergeOrSplit: "結合または分割",
        setCellAttribute: "セル属性を設定",
        fixTables: "テーブルを修正",
        goToNextCell: "次のセルに移動",
        goToPreviousCell: "前のセルに移動",
      };
    default: // English as fallback
      return {
        table: "Table",
        createTable: "Create Table",
        insertTable: "Insert Table",
        addColumnBefore: "Add 1 column before",
        addColumnAfter: "Add 1 column after",
        deleteColumn: "Delete 1 column",
        addRowBefore: "Add 1 row before",
        addRowAfter: "Add 1 row after",
        deleteRow: "Delete 1 row",
        deleteTable: "Delete Table",
        mergeCells: "Merge Cells",
        splitCell: "Split Cell",
        toggleHeaderColumn: "Bold 1 column",
        toggleHeaderRow: "Bold 1 row",
        toggleHeaderCell: "Bold 1",
        mergeOrSplit: "Merge or Split",
        setCellAttribute: "Set Cell Attribute",
        fixTables: "Fix Tables",
        goToNextCell: "Go to next cell",
        goToPreviousCell: "Go to previous cell",
      };
  }
};

export const translateTextAlign = (language: string) => {
  switch (language) {
    case "vi": // Tiếng Việt
      return {
        textAlign: "Căn chỉnh văn bản", // Thêm mục TextAlign
        textLeft: "Căn trái",
        textRight: "Căn phải",
        textCenter: "Căn giữa",
        textJustify: "Căn đều",
      };
    case "en": // English
      return {
        textAlign: "Text alignment", // Thêm mục TextAlign
        textLeft: "Text left",
        textRight: "Text right",
        textCenter: "Text center",
        textJustify: "Text justify",
      };
    case "zh": // Tiếng Trung
      return {
        textAlign: "文本对齐", // Thêm mục TextAlign
        textLeft: "左对齐",
        textRight: "右对齐",
        textCenter: "居中对齐",
        textJustify: "两端对齐",
      };
    case "fr": // Tiếng Pháp
      return {
        textAlign: "Alignement du texte", // Thêm mục TextAlign
        textLeft: "Aligner à gauche",
        textRight: "Aligner à droite",
        textCenter: "Aligner au centre",
        textJustify: "Justifier",
      };
    case "ja": // Tiếng Nhật
      return {
        textAlign: "テキストの配置", // Thêm mục TextAlign
        textLeft: "左揃え",
        textRight: "右揃え",
        textCenter: "中央揃え",
        textJustify: "両端揃え",
      };
    default: // English as fallback
      return {
        textAlign: "Text alignment", // Thêm mục TextAlign
        textLeft: "Text left",
        textRight: "Text right",
        textCenter: "Text center",
        textJustify: "Text justify",
      };
  }
};

export const translateTaskList = (language: string) => {
  switch (language) {
    case "vi": // Tiếng Việt
      return {
        taskItemAndTaskList: "Nhiệm vụ và Danh sách nhiệm vụ",
        list: "Danh sách",
        addNewList: "Thêm mới danh sách",
        nestedList: "Danh sách chìm",
        deleteList: "Xóa danh sách",
      };
    case "en": // English
      return {
        taskItemAndTaskList: "TaskItem and TaskList",
        list: "List",
        addNewList: "Add new list",
        nestedList: "Nested list",
        deleteList: "Delete list",
      };
    case "zh": // Tiếng Trung
      return {
        taskItemAndTaskList: "任务项和任务列表",
        list: "列表",
        addNewList: "添加新列表",
        nestedList: "嵌套列表",
        deleteList: "删除列表",
      };
    case "fr": // Tiếng Pháp
      return {
        taskItemAndTaskList: "TaskItem et TaskList",
        list: "Liste",
        addNewList: "Ajouter une nouvelle liste",
        nestedList: "Liste imbriquée",
        deleteList: "Supprimer la liste",
      };
    case "ja": // Tiếng Nhật
      return {
        taskItemAndTaskList: "タスクアイテムとタスクリスト",
        list: "リスト",
        addNewList: "新しいリストを追加",
        nestedList: "ネストされたリスト",
        deleteList: "リストを削除",
      };
    default: // English as fallback
      return {
        taskItemAndTaskList: "TaskItem and TaskList",
        list: "List",
        addNewList: "Add new list",
        nestedList: "Nested list",
        deleteList: "Delete list",
      };
  }
};

export const translateSentEmailAction = (language: string) => {
  switch (language) {
    case "vi": // Tiếng Việt
      return {
        sentEmailUserIdCopied: "ID người dùng đã được sao chép vào clipboard.",
        sentEmailUserDeleted: "Người dùng đã bị xóa.",
        somethingWentWrong: "Đã có lỗi xảy ra!",
        sentEmailWithSubject: "Đã gửi email với chủ đề",
        updatingSentEmail: "Đang cập nhật email đã gửi...",
        sentEmailError: "Lỗi khi gửi email.",
        openMenu: "Mở menu",
        actions: "Hành động",
        copyId: "Sao chép ID",
        update: "Cập nhật",
        delete: "Xóa",
        sentUser: "Gửi đến người dùng",
      };
    case "en": // English
      return {
        sentEmailUserIdCopied: "Sent email user ID copied to the clipboard.",
        sentEmailUserDeleted: "Sent email user deleted.",
        somethingWentWrong: "Something went wrong!",
        sentEmailWithSubject: "Sent email with subject",
        updatingSentEmail: "Updating sent email...",
        sentEmailError: "Sent email error.",
        openMenu: "Open menu",
        actions: "Actions",
        copyId: "Copy ID",
        update: "Update",
        delete: "Delete",
        sentUser: "Sent user",
      };
    case "zh": // Tiếng Trung
      return {
        sentEmailUserIdCopied: "发送的用户ID已复制到剪贴板。",
        sentEmailUserDeleted: "发送的用户已删除。",
        somethingWentWrong: "发生了错误！",
        sentEmailWithSubject: "已发送主题为的电子邮件",
        updatingSentEmail: "正在更新已发送的电子邮件...",
        sentEmailError: "发送电子邮件时出错。",
        openMenu: "打开菜单",
        actions: "操作",
        copyId: "复制ID",
        update: "更新",
        delete: "删除",
        sentUser: "发送给用户",
      };
    case "fr": // Tiếng Pháp
      return {
        sentEmailUserIdCopied:
          "ID utilisateur de l'email envoyé copié dans le presse-papiers.",
        sentEmailUserDeleted: "Utilisateur de l'email envoyé supprimé.",
        somethingWentWrong: "Quelque chose a mal tourné !",
        sentEmailWithSubject: "Email envoyé avec le sujet",
        updatingSentEmail: "Mise à jour de l'email envoyé...",
        sentEmailError: "Erreur lors de l'envoi de l'email.",
        openMenu: "Ouvrir le menu",
        actions: "Actions",
        copyId: "Copier l'ID",
        update: "Mettre à jour",
        delete: "Supprimer",
        sentUser: "Envoyer à l'utilisateur",
      };
    case "ja": // Tiếng Nhật
      return {
        sentEmailUserIdCopied:
          "送信されたメールユーザーIDがクリップボードにコピーされました。",
        sentEmailUserDeleted: "送信されたメールユーザーが削除されました。",
        somethingWentWrong: "問題が発生しました！",
        sentEmailWithSubject: "件名付きでメールを送信しました",
        updatingSentEmail: "送信されたメールを更新しています...",
        sentEmailError: "メール送信エラー。",
        openMenu: "メニューを開く",
        actions: "アクション",
        copyId: "IDをコピー",
        update: "更新",
        delete: "削除",
        sentUser: "ユーザーに送信",
      };
    default: // English as fallback
      return {
        sentEmailUserIdCopied: "Sent email user ID copied to the clipboard.",
        sentEmailUserDeleted: "Sent email user deleted.",
        somethingWentWrong: "Something went wrong!",
        sentEmailWithSubject: "Sent email with subject",
        updatingSentEmail: "Updating sent email...",
        sentEmailError: "Sent email error.",
        openMenu: "Open menu",
        actions: "Actions",
        copyId: "Copy ID",
        update: "Update",
        delete: "Delete",
        sentUser: "Sent user",
      };
  }
};

export const translateSendEmailClient = (language: string) => {
  switch (language) {
    case "vi": // Tiếng Việt
      return {
        deletedSuccessfully: "Đã xóa thành công",
        somethingWentWrong: "Đã có lỗi xảy ra!",
        sendMail: "Gửi email",
        manageSendMail: "Quản lý gửi email",
        addNew: "Thêm mới",
        api: "API",
        apiCallsForSendEmailUser: "API gọi cho người dùng gửi email",
      };
    case "en": // English
      return {
        deletedSuccessfully: "Deleted successfully",
        somethingWentWrong: "Something went wrong!",
        sendMail: "Send mail",
        manageSendMail: "Manage send mail",
        addNew: "Add new",
        api: "API",
        apiCallsForSendEmailUser: "API calls for SendEmailUser",
      };
    case "zh": // Tiếng Trung
      return {
        deletedSuccessfully: "删除成功",
        somethingWentWrong: "发生了错误！",
        sendMail: "发送邮件",
        manageSendMail: "管理发送邮件",
        addNew: "添加新",
        api: "API",
        apiCallsForSendEmailUser: "发送邮件用户的API调用",
      };
    case "fr": // Tiếng Pháp
      return {
        deletedSuccessfully: "Supprimé avec succès",
        somethingWentWrong: "Quelque chose a mal tourné !",
        sendMail: "Envoyer un mail",
        manageSendMail: "Gérer l'envoi de mails",
        addNew: "Ajouter nouveau",
        api: "API",
        apiCallsForSendEmailUser: "Appels API pour SendEmailUser",
      };
    case "ja": // Tiếng Nhật
      return {
        deletedSuccessfully: "削除成功",
        somethingWentWrong: "問題が発生しました！",
        sendMail: "メール送信",
        manageSendMail: "メール送信管理",
        addNew: "新規追加",
        api: "API",
        apiCallsForSendEmailUser: "SendEmailUserのAPI呼び出し",
      };
    default: // English as fallback
      return {
        deletedSuccessfully: "Deleted successfully",
        somethingWentWrong: "Something went wrong!",
        sendMail: "Send mail",
        manageSendMail: "Manage send mail",
        addNew: "Add new",
        api: "API",
        apiCallsForSendEmailUser: "API calls for SendEmailUser",
      };
  }
};

export const translateSentEmailForm = (language: string) => {
  switch (language) {
    case "vi":
      return {
        editSent: "Chỉnh sửa đã gửi",
        createSent: "Tạo mới đã gửi",
        editASent: "Chỉnh sửa một email đã gửi",
        addANewSent: "Thêm email mới",
        saveChanges: "Lưu thay đổi",
        create: "Tạo",
        somethingWentWrong: "Đã có lỗi xảy ra!",
        noChangesMade: "Không có thay đổi nào được thực hiện.",
        duplicateEntriesFound: "Tìm thấy mục trùng lặp",
        email: "Email",
        andFavorites: "và Ưa thích",
        cannotExistTogether: "không thể cùng tồn tại. Chỉ chọn 1 trong 2.",
        sentEmailUser: "Người dùng gửi email",
        updated: "đã cập nhật",
        created: "đã tạo",
        updatingSentEmailUser: "Đang cập nhật người dùng gửi email...",
        sentEmailUserDeleted: "Người dùng gửi email đã bị xóa.",
        onlySelectAllOrPopular:
          "Bạn chỉ có thể chọn All hoặc Phổ biến, không thể chọn cả hai.",
        ifChoosePopular:
          "Nếu bạn chọn phổ biến mặc định sẽ xóa tất cả lựa chọn khác.",
        ifChooseAll: "Nếu bạn chọn All mặc định sẽ xóa tất cả lựa chọn khác.",
        copyingNotAllowed: "Sao chép không được phép.",
        pastingNotAllowed: "Dán không được phép.",
        cuttingNotAllowed: "Cắt không được phép.",
        copyingPastingNotAllowed: "Sao chép và dán không được phép.",
        subject: "Chủ đề",
        enterSubjectToMakeItClear:
          "Nhập chủ đề, để người dùng dễ dàng nhận biết về chủ đề gì?",
        enterSubject: "Nhập chủ đề...",
        user: "Người dùng",
        mentionUserWithAt:
          "Khi @ sẽ gọi người dùng. Đối với $ sử dụng cho ưa thích của người dùng.",
        enterUserNameWithAt: "Nhập tên người dùng và dùng @ để mention...",
        errorAvatar: "Lỗi avatar của",
        description: "Mô tả",
        enterAtLeastTwoChars: "Nhập ít nhất 2 ký tự.",
      };

    case "en":
      return {
        editSent: "Edit sent",
        createSent: "Create sent",
        editASent: "Edit a sent email",
        addANewSent: "Add new sent email",
        saveChanges: "Save changes",
        create: "Create",
        somethingWentWrong: "Something went wrong!",
        noChangesMade: "No changes made.",
        duplicateEntriesFound: "Duplicate entries found",
        email: "Email",
        andFavorites: "and Favorites",
        cannotExistTogether: "cannot exist together. Choose only one.",
        sentEmailUser: "Sent email user",
        updated: "updated",
        created: "created",
        updatingSentEmailUser: "Updating sent email user...",
        sentEmailUserDeleted: "Sent email user deleted.",
        onlySelectAllOrPopular:
          "You can only select All or Popular, not both.",
        ifChoosePopular:
          "If you choose Popular, it will remove all other selections.",
        ifChooseAll: "If you choose All, it will remove all other selections.",
        copyingNotAllowed: "Copying not allowed.",
        pastingNotAllowed: "Pasting not allowed.",
        cuttingNotAllowed: "Cutting not allowed.",
        copyingPastingNotAllowed: "Copying and pasting not allowed.",
        subject: "Subject",
        enterSubjectToMakeItClear:
          "Enter a subject to make it clear for the user.",
        enterSubject: "Enter subject...",
        user: "User",
        mentionUserWithAt:
          "When @ is used, it mentions a user. Use $ for the user's favorites.",
        enterUserNameWithAt: "Enter username and use @ to mention...",
        errorAvatar: "Error in avatar of",
        description: "Description",
        enterAtLeastTwoChars: "Enter at least 2 characters.",
      };

    case "zh":
      return {
        editSent: "编辑已发送",
        createSent: "创建已发送",
        editASent: "编辑已发送的电子邮件",
        addANewSent: "添加新的已发送电子邮件",
        saveChanges: "保存更改",
        create: "创建",
        somethingWentWrong: "出了点问题！",
        noChangesMade: "没有做出任何更改。",
        duplicateEntriesFound: "发现重复条目",
        email: "电子邮件",
        andFavorites: "和收藏",
        cannotExistTogether: "不能同时存在。请选择其中之一。",
        sentEmailUser: "已发送的用户",
        updated: "已更新",
        created: "已创建",
        updatingSentEmailUser: "正在更新已发送的用户...",
        sentEmailUserDeleted: "已发送的用户已删除。",
        onlySelectAllOrPopular:
          "您只能选择所有或热门，不能选择两者。",
        ifChoosePopular:
          "如果选择热门，将删除所有其他选择。",
        ifChooseAll: "如果选择所有，将删除所有其他选择。",
        copyingNotAllowed: "不允许复制。",
        pastingNotAllowed: "不允许粘贴。",
        cuttingNotAllowed: "不允许剪切。",
        copyingPastingNotAllowed: "不允许复制和粘贴。",
        subject: "主题",
        enterSubjectToMakeItClear:
          "输入主题，以便用户清楚知道主题是什么。",
        enterSubject: "输入主题...",
        user: "用户",
        mentionUserWithAt:
          "使用 @ 时会提到用户。对 $ 使用用户的收藏。",
        enterUserNameWithAt: "输入用户名并使用 @ 来提到...",
        errorAvatar: "头像错误",
        description: "描述",
        enterAtLeastTwoChars: "请输入至少 2 个字符。",
      };

    case "fr":
      return {
        editSent: "Modifier envoyé",
        createSent: "Créer envoyé",
        editASent: "Modifier un e-mail envoyé",
        addANewSent: "Ajouter un nouvel e-mail envoyé",
        saveChanges: "Enregistrer les modifications",
        create: "Créer",
        somethingWentWrong: "Quelque chose s'est mal passé !",
        noChangesMade: "Aucun changement effectué.",
        duplicateEntriesFound: "Entrées en double trouvées",
        email: "E-mail",
        andFavorites: "et Favoris",
        cannotExistTogether: "ne peuvent pas exister ensemble. Choisissez-en un seul.",
        sentEmailUser: "Utilisateur envoyé par e-mail",
        updated: "mis à jour",
        created: "créé",
        updatingSentEmailUser: "Mise à jour de l'utilisateur envoyé par e-mail...",
        sentEmailUserDeleted: "L'utilisateur envoyé par e-mail a été supprimé.",
        onlySelectAllOrPopular:
          "Vous ne pouvez sélectionner que Tous ou Populaire, pas les deux.",
        ifChoosePopular:
          "Si vous choisissez Populaire, cela supprimera toutes les autres sélections.",
        ifChooseAll: "Si vous choisissez Tous, cela supprimera toutes les autres sélections.",
        copyingNotAllowed: "Copie non autorisée.",
        pastingNotAllowed: "Collage non autorisé.",
        cuttingNotAllowed: "Couper non autorisé.",
        copyingPastingNotAllowed: "Copier et coller non autorisés.",
        subject: "Sujet",
        enterSubjectToMakeItClear:
          "Entrez un sujet pour clarifier de quoi il s'agit.",
        enterSubject: "Entrez le sujet...",
        user: "Utilisateur",
        mentionUserWithAt:
          "Lorsque @ est utilisé, cela mentionne un utilisateur. Utilisez $ pour les favoris de l'utilisateur.",
        enterUserNameWithAt: "Entrez le nom d'utilisateur et utilisez @ pour mentionner...",
        errorAvatar: "Erreur d'avatar de",
        description: "Description",
        enterAtLeastTwoChars: "Entrez au moins 2 caractères.",
      };

    case "ja":
      return {
        editSent: "送信済みの編集",
        createSent: "送信済みの作成",
        editASent: "送信されたメールを編集",
        addANewSent: "新しい送信メールを追加",
        saveChanges: "変更を保存",
        create: "作成",
        somethingWentWrong: "問題が発生しました！",
        noChangesMade: "変更はありませんでした。",
        duplicateEntriesFound: "重複したエントリが見つかりました",
        email: "メール",
        andFavorites: "とお気に入り",
        cannotExistTogether: "一緒に存在することはできません。1つだけ選択してください。",
        sentEmailUser: "送信メールのユーザー",
        updated: "更新されました",
        created: "作成されました",
        updatingSentEmailUser: "送信メールのユーザーを更新しています...",
        sentEmailUserDeleted: "送信メールのユーザーが削除されました。",
        onlySelectAllOrPopular:
          "すべてまたは人気のどちらかを選択できます。両方は選択できません。",
        ifChoosePopular:
          "人気を選択すると、他のすべての選択が削除されます。",
        ifChooseAll: "すべてを選択すると、他のすべての選択が削除されます。",
        copyingNotAllowed: "コピーは許可されていません。",
        pastingNotAllowed: "貼り付けは許可されていません。",
        cuttingNotAllowed: "切り取りは許可されていません。",
        copyingPastingNotAllowed: "コピーと貼り付けは許可されていません。",
        subject: "件名",
        enterSubjectToMakeItClear:
          "件名を入力して、ユーザーにわかりやすくします。",
        enterSubject: "件名を入力...",
        user: "ユーザー",
        mentionUserWithAt:
          "@を使用するとユーザーをメンションします。$はユーザーのお気に入りに使用します。",
        enterUserNameWithAt: "ユーザー名を入力し、@を使ってメンション...",
        errorAvatar: "アバターのエラー",
        description: "説明",
        enterAtLeastTwoChars: "少なくとも2文字を入力してください。",
      };

    default:
      return {
        editSent: "Edit sent",
        createSent: "Create sent",
        editASent: "Edit a sent email",
        addANewSent: "Add new sent email",
        saveChanges: "Save changes",
        create: "Create",
        somethingWentWrong: "Something went wrong!",
        noChangesMade: "No changes made.",
        duplicateEntriesFound: "Duplicate entries found",
        email: "Email",
        andFavorites: "and Favorites",
        cannotExistTogether: "cannot exist together. Choose only one.",
        sentEmailUser: "Sent email user",
        updated: "updated",
        created: "created",
        updatingSentEmailUser: "Updating sent email user...",
        sentEmailUserDeleted: "Sent email user deleted.",
        onlySelectAllOrPopular:
          "You can only select All or Popular, not both.",
        ifChoosePopular:
          "If you choose Popular, it will remove all other selections.",
        ifChooseAll: "If you choose All, it will remove all other selections.",
        copyingNotAllowed: "Copying not allowed.",
        pastingNotAllowed: "Pasting not allowed.",
        cuttingNotAllowed: "Cutting not allowed.",
        copyingPastingNotAllowed: "Copying and pasting not allowed.",
        subject: "Subject",
        enterSubjectToMakeItClear:
          "Enter a subject to make it clear for the user.",
        enterSubject: "Enter subject...",
        user: "User",
        mentionUserWithAt:
          "When @ is used, it mentions a user. Use $ for the user's favorites.",
        enterUserNameWithAt: "Enter username and use @ to mention...",
        errorAvatar: "Error in avatar of",
        description: "Description",
        enterAtLeastTwoChars: "Enter at least 2 characters.",
      };
  }
};

export const translateSentEmailUserSheet = (language: string) => {
  switch (language) {
    case "vi": // Tiếng Việt
      return {
        subject: "chủ đề đã tồn tại",
        existingdescription: "mô tả đã tồn tại",
        notfound: "không tìm thấy!",
        edit: "chỉnh sửa",
      };
    case "en": // English
      return {
        subject: "an existing subject",
        existingdescription: "an existing description",
        notfound: "not found!",
        edit: "edit",
      };
    case "zh": // Tiếng Trung
      return {
        subject: "已存在的主题",
        existingdescription: "已存在的描述",
        notfound: "未找到！",
        edit: "编辑",
      };
    case "fr": // Tiếng Pháp
      return {
        subject: "un sujet existant",
        existingdescription: "une description existante",
        notfound: "non trouvé !",
        edit: "modifier",
      };
    case "ja": // Tiếng Nhật
      return {
        subject: "既存の件名",
        existingdescription: "既存の説明",
        notfound: "見つかりません！",
        edit: "編集",
      };
    default: // English as fallback
      return {
        subject: "an existing subject",
        existingdescription: "an existing description",
        notfound: "not found!",
        edit: "edit",
      };
  }
};

export const translateSentEmailEditForm = (language: string) => {
  switch (language) {
    case "vi": // Tiếng Việt
      return {
        requiredName: "Bắt buộc nhập name.",
        requiredDescription: "Bắt buộc nhập description.",
        updateSuccess: "Cập nhật thành công!",
        somethingWentWrong: "Something went wrong!",
        subject: "Chủ đề",
        enterSubject: "Nhập chủ đề...",
        taxDescription: "Mô tả thuế",
        enterTaxDescription: "Nhập mô tả thuế...",
        saveChange: "Save Change",
      };
    case "en": // English
      return {
        requiredName: "Name is required.",
        requiredDescription: "Description is required.",
        updateSuccess: "Update successful!",
        somethingWentWrong: "Something went wrong!",
        subject: "Subject",
        enterSubject: "Enter subject...",
        taxDescription: "Tax description",
        enterTaxDescription: "Enter tax description...",
        saveChange: "Save Change",
      };
    case "zh": // Tiếng Trung
      return {
        requiredName: "必须输入名称。",
        requiredDescription: "必须输入描述。",
        updateSuccess: "更新成功！",
        somethingWentWrong: "出错了！",
        subject: "主题",
        enterSubject: "请输入主题...",
        taxDescription: "税务描述",
        enterTaxDescription: "请输入税务描述...",
        saveChange: "保存更改",
      };
    case "fr": // Tiếng Pháp
      return {
        requiredName: "Le nom est requis.",
        requiredDescription: "La description est requise.",
        updateSuccess: "Mise à jour réussie !",
        somethingWentWrong: "Quelque chose a mal tourné !",
        subject: "Sujet",
        enterSubject: "Entrez le sujet...",
        taxDescription: "Description de la taxe",
        enterTaxDescription: "Entrez la description de la taxe...",
        saveChange: "Sauvegarder les modifications",
      };
    case "ja": // Tiếng Nhật
      return {
        requiredName: "名前は必須です。",
        requiredDescription: "説明は必須です。",
        updateSuccess: "更新成功！",
        somethingWentWrong: "何かがうまくいきませんでした！",
        subject: "件名",
        enterSubject: "件名を入力...",
        taxDescription: "税金の説明",
        enterTaxDescription: "税金の説明を入力...",
        saveChange: "変更を保存",
      };
    default: // English as fallback
      return {
        requiredName: "Name is required.",
        requiredDescription: "Description is required.",
        updateSuccess: "Update successful!",
        somethingWentWrong: "Something went wrong!",
        subject: "Subject",
        enterSubject: "Enter subject...",
        taxDescription: "Tax description",
        enterTaxDescription: "Enter tax description...",
        saveChange: "Save Change",
      };
  }
};

export const transalteBillboardAction = (language: string) => {
  switch (language) {
    case "vi": // Tiếng Việt
      return {
        billboardIdCopied: "Billboard Id đã được sao chép vào clipboard.",
        billboardDeleted: "Billboard đã bị xóa.",
        somethingWentWrong: "Có gì đó không đúng!",
        openMenu: "Mở menu",
        actions: "Hành động",
        copyId: "Sao chép Id",
        update: "Cập nhật",
        delete: "Xóa",
      };
    case "en": // English
      return {
        billboardIdCopied: "Billboard Id copied to the clipboard.",
        billboardDeleted: "Billboard deleted.",
        somethingWentWrong: "Something went wrong!",
        openMenu: "Open menu",
        actions: "Actions",
        copyId: "Copy Id",
        update: "Update",
        delete: "Delete",
      };
    case "zh": // Tiếng Trung
      return {
        billboardIdCopied: "广告牌ID已复制到剪贴板。",
        billboardDeleted: "广告牌已删除。",
        somethingWentWrong: "出了点问题！",
        openMenu: "打开菜单",
        actions: "操作",
        copyId: "复制Id",
        update: "更新",
        delete: "删除",
      };
    case "fr": // Tiếng Pháp
      return {
        billboardIdCopied:
          "L'ID de l'affichage a été copié dans le presse-papiers.",
        billboardDeleted: "L'affichage a été supprimé.",
        somethingWentWrong: "Quelque chose s'est mal passé!",
        openMenu: "Ouvrir le menu",
        actions: "Actions",
        copyId: "Copier l'ID",
        update: "Mettre à jour",
        delete: "Supprimer",
      };
    case "ja": // Tiếng Nhật
      return {
        billboardIdCopied: "ビルボードIDがクリップボードにコピーされました。",
        billboardDeleted: "ビルボードが削除されました。",
        somethingWentWrong: "何かがうまくいきませんでした！",
        openMenu: "メニューを開く",
        actions: "アクション",
        copyId: "IDをコピー",
        update: "更新",
        delete: "削除",
      };
    default: // English as fallback
      return {
        billboardIdCopied: "Billboard Id copied to the clipboard.",
        billboardDeleted: "Billboard deleted.",
        somethingWentWrong: "Something went wrong!",
        openMenu: "Open menu",
        actions: "Actions",
        copyId: "Copy Id",
        update: "Update",
        delete: "Delete",
      };
  }
};

export const getBillboardMessages = (language: string) => {
  switch (language) {
    case "vi": // Tiếng Việt
      return {
        billboardIdCopied: "Billboard Id đã được sao chép vào clipboard.",
        billboardDeleted: "Billboard đã bị xóa.",
        somethingWentWrong: "Có gì đó không đúng!",
        openMenu: "Mở menu",
        actions: "Hành động",
        copyId: "Sao chép Id",
        update: "Cập nhật",
        delete: "Xóa",
      };
    case "en": // English
      return {
        billboardIdCopied: "Billboard Id copied to the clipboard.",
        billboardDeleted: "Billboard deleted.",
        somethingWentWrong: "Something went wrong!",
        openMenu: "Open menu",
        actions: "Actions",
        copyId: "Copy Id",
        update: "Update",
        delete: "Delete",
      };
    case "zh": // Tiếng Trung
      return {
        billboardIdCopied: "广告牌ID已复制到剪贴板。",
        billboardDeleted: "广告牌已删除。",
        somethingWentWrong: "出了点问题！",
        openMenu: "打开菜单",
        actions: "操作",
        copyId: "复制Id",
        update: "更新",
        delete: "删除",
      };
    case "fr": // Tiếng Pháp
      return {
        billboardIdCopied:
          "L'ID de l'affichage a été copié dans le presse-papiers.",
        billboardDeleted: "L'affichage a été supprimé.",
        somethingWentWrong: "Quelque chose s'est mal passé!",
        openMenu: "Ouvrir le menu",
        actions: "Actions",
        copyId: "Copier l'ID",
        update: "Mettre à jour",
        delete: "Supprimer",
      };
    case "ja": // Tiếng Nhật
      return {
        billboardIdCopied: "ビルボードIDがクリップボードにコピーされました。",
        billboardDeleted: "ビルボードが削除されました。",
        somethingWentWrong: "何かがうまくいきませんでした！",
        openMenu: "メニューを開く",
        actions: "アクション",
        copyId: "IDをコピー",
        update: "更新",
        delete: "削除",
      };
    default: // English as fallback
      return {
        billboardIdCopied: "Billboard Id copied to the clipboard.",
        billboardDeleted: "Billboard deleted.",
        somethingWentWrong: "Something went wrong!",
        openMenu: "Open menu",
        actions: "Actions",
        copyId: "Copy Id",
        update: "Update",
        delete: "Delete",
      };
  }
};

export const getBillboardClient = (language: string) => {
  switch (language) {
    case "vi": // Tiếng Việt
      return {
        billboardsDeletedSuccessfully: "Billboard đã được xóa thành công.",
        somethingWentWrong: "Có gì đó không đúng!",
        billboardImage: "Ảnh quảng cáo",
        manageBillboardImages: "Quản lý ảnh quảng cáo cửa hàng",
        addNew: "Thêm mới",
        api: "API",
        apiCallsForBillboards: "API gọi cho Billboard",
      };
    case "en": // English
      return {
        billboardsDeletedSuccessfully: "Billboards deleted successfully",
        somethingWentWrong: "Something went wrong!",
        billboardImage: "Billboard image",
        manageBillboardImages: "Manage store billboard images",
        addNew: "Add new",
        api: "API",
        apiCallsForBillboards: "API calls for Billboards",
      };
    case "zh": // Tiếng Trung
      return {
        billboardsDeletedSuccessfully: "广告牌已成功删除",
        somethingWentWrong: "出了点问题！",
        billboardImage: "广告牌图片",
        manageBillboardImages: "管理商店广告牌图片",
        addNew: "新增",
        api: "API",
        apiCallsForBillboards: "广告牌的API调用",
      };
    case "fr": // Tiếng Pháp
      return {
        billboardsDeletedSuccessfully:
          "Les panneaux publicitaires ont été supprimés avec succès",
        somethingWentWrong: "Quelque chose s'est mal passé!",
        billboardImage: "Image du panneau publicitaire",
        manageBillboardImages:
          "Gérer les images du panneau publicitaire du magasin",
        addNew: "Ajouter nouveau",
        api: "API",
        apiCallsForBillboards: "Appels API pour les panneaux publicitaires",
      };
    case "ja": // Tiếng Nhật
      return {
        billboardsDeletedSuccessfully: "ビルボードが正常に削除されました",
        somethingWentWrong: "何かがうまくいきませんでした！",
        billboardImage: "広告画像",
        manageBillboardImages: "店舗の広告画像の管理",
        addNew: "新規追加",
        api: "API",
        apiCallsForBillboards: "広告板のAPI呼び出し",
      };
    default: // English as fallback
      return {
        billboardsDeletedSuccessfully: "Billboards deleted successfully",
        somethingWentWrong: "Something went wrong!",
        billboardImage: "Billboard image",
        manageBillboardImages: "Manage store billboard images",
        addNew: "Add new",
        api: "API",
        apiCallsForBillboards: "API calls for Billboards",
      };
  }
};

export const getBillboardEditRowSheet = (language: string) => {
  switch (language) {
    case "vi": // Tiếng Việt
      return {
        notFound: "Không tìm thấy!",
        edit: "Chỉnh sửa",
        editAnExisting: "Chỉnh sửa một mục hiện có",
      };
    case "en": // English
      return {
        notFound: "Not found!",
        edit: "Edit",
        editAnExisting: "Edit an existing",
      };
    case "zh": // Tiếng Trung
      return {
        notFound: "未找到！",
        edit: "编辑",
        editAnExisting: "编辑现有内容",
      };
    case "fr": // Tiếng Pháp
      return {
        notFound: "Non trouvé !",
        edit: "Éditer",
        editAnExisting: "Modifier un élément existant",
      };
    case "ja": // Tiếng Nhật
      return {
        notFound: "見つかりません！",
        edit: "編集",
        editAnExisting: "既存のものを編集",
      };
    default: // English as fallback
      return {
        notFound: "Not found!",
        edit: "Edit",
        editAnExisting: "Edit an existing",
      };
  }
};

export const getBillboardLabelFormSheet = (language: string) => {
  switch (language) {
    case "vi": // Tiếng Việt
      return {
        minLength: "Nhập ít nhất 2 ký tự.",
        updateSuccess: "Cập nhật thành công!",
        somethingWentWrong: "Có gì đó không đúng!",
        productName: "Tên sản phẩm",
        enterProductName: "Nhập tên ...",
        description: "Mô tả",
        enterDescription: "Nhập mô tả ...",
        saveChanges: "Lưu thay đổi",
      };
    case "en": // English
      return {
        minLength: "Enter at least 2 characters.",
        updateSuccess: "Update successful!",
        somethingWentWrong: "Something went wrong!",
        productName: "Product Name",
        enterProductName: "Enter name ...",
        description: "Description",
        enterDescription: "Enter description ...",
        saveChanges: "Save Changes",
      };
    case "zh": // Chinese
      return {
        minLength: "请输入至少2个字符。",
        updateSuccess: "更新成功！",
        somethingWentWrong: "出了点问题！",
        productName: "产品名称",
        enterProductName: "请输入名称 ...",
        description: "描述",
        enterDescription: "请输入描述 ...",
        saveChanges: "保存更改",
      };
    case "fr": // French
      return {
        minLength: "Entrez au moins 2 caractères.",
        updateSuccess: "Mise à jour réussie!",
        somethingWentWrong: "Quelque chose a mal tourné!",
        productName: "Nom du produit",
        enterProductName: "Entrez le nom ...",
        description: "Description",
        enterDescription: "Entrez la description ...",
        saveChanges: "Sauvegarder les modifications",
      };
    case "ja": // Japanese
      return {
        minLength: "2文字以上入力してください。",
        updateSuccess: "更新成功！",
        somethingWentWrong: "何かがうまくいきませんでした！",
        productName: "製品名",
        enterProductName: "名前を入力 ...",
        description: "説明",
        enterDescription: "説明を入力 ...",
        saveChanges: "変更を保存",
      };
    default: // English as fallback
      return {
        minLength: "Enter at least 2 characters.",
        updateSuccess: "Update successful!",
        somethingWentWrong: "Something went wrong!",
        productName: "Product Name",
        enterProductName: "Enter name ...",
        description: "Description",
        enterDescription: "Enter description ...",
        saveChanges: "Save Changes",
      };
  }
};

export const getBillboardForm = (language: string) => {
  switch (language) {
    case "vi": // Tiếng Việt
      return {
        editBillboard: "Chỉnh sửa bảng quảng cáo",
        createBillboard: "Tạo bảng quảng cáo",
        editBillboardDescription: "Chỉnh sửa bảng quảng cáo.",
        addNewBillboard: "Thêm mới bảng quảng cáo",
        saveChanges: "Lưu thay đổi",
        create: "Tạo mới",
        minLength: "Nhập ít nhất 2 ký tự.",
        billboard: "Bảng quảng cáo",
        updated: "Đã cập nhật bảng quảng cáo!",
        created: "Đã tạo bảng quảng cáo!",
        close: "Đóng",
        somethingWentWrong: "Có gì đó không đúng!",
        deleted: "Bảng quảng cáo đã bị xóa.",
        imageNote:
          "Lưu ý: chỉ thêm tối đa 10 ảnh và ảnh phải rõ nét với tất cả màn hình.",
        label: "Nhãn",
        labelPlaceholder: "Enter label...",
        labelRecommend: "Hãy đặt tên phù hợp với tất cả ảnh trên.",
        description: "Mô tả",
        descriptionPlaceholder: "Enter description...",
        descriptionRecommend: "Hãy đặt mô tả phù hợp với tất cả ảnh trên.",
        image: "Ảnh",
        updatedOther: "Đã cập nhật",
        createdOther: "Đã tạo",
      };
    case "en": // English
      return {
        editBillboard: "Edit billboard",
        createBillboard: "Create billboard",
        editBillboardDescription: "Edit billboard.",
        addNewBillboard: "Add new billboard",
        saveChanges: "Save changes",
        create: "Create",
        minLength: "Enter at least 2 characters.",
        billboard: "Billboard",
        updated: "Billboard updated!",
        created: "Billboard created!",
        close: "Close",
        somethingWentWrong: "Something went wrong!",
        deleted: "Billboard deleted.",
        imageNote:
          "Note: Only add up to 10 images and the images must be clear on all screens.",
        label: "Label",
        labelPlaceholder: "Enter label...",
        labelRecommend: "Please name it to match all images above.",
        description: "Description",
        descriptionPlaceholder: "Enter description...",
        descriptionRecommend: "Please name it to match all images above.",
        image: "Image",
        updatedOther: "Updated",
        createdOther: "Created",
      };
    case "zh": // Chinese
      return {
        editBillboard: "编辑广告牌",
        createBillboard: "创建广告牌",
        editBillboardDescription: "编辑广告牌。",
        addNewBillboard: "添加新广告牌",
        saveChanges: "保存更改",
        create: "创建",
        minLength: "请输入至少2个字符。",
        billboard: "广告牌",
        updated: "广告牌已更新！",
        created: "广告牌已创建！",
        close: "关闭",
        somethingWentWrong: "出了点问题！",
        deleted: "广告牌已删除。",
        imageNote: "注意：最多只能添加10张图片，且图片在所有屏幕上都必须清晰。",
        label: "标签",
        labelPlaceholder: "输入标签...",
        labelRecommend: "请为所有图片命名。",
        description: "描述",
        descriptionPlaceholder: "输入描述...",
        descriptionRecommend: "请为所有图片命名。",
        image: "图片",
        updatedOther: "已更新",
        createdOther: "已创建",
      };
    case "ja": // Japanese
      return {
        editBillboard: "ビルボードの編集",
        createBillboard: "ビルボードの作成",
        editBillboardDescription: "ビルボードの編集。",
        addNewBillboard: "新しいビルボードを追加",
        saveChanges: "変更を保存",
        create: "作成",
        minLength: "2文字以上を入力してください。",
        billboard: "ビルボード",
        updated: "ビルボードが更新されました！",
        created: "ビルボードが作成されました！",
        close: "閉じる",
        somethingWentWrong: "何かがうまくいきませんでした！",
        deleted: "ビルボードが削除されました。",
        imageNote:
          "注意：最大10枚の画像を追加できます、すべての画面で画像が鮮明である必要があります。",
        label: "ラベル",
        labelPlaceholder: "ラベルを入力...",
        labelRecommend: "上記のすべての画像に合った名前を付けてください。",
        description: "説明",
        descriptionPlaceholder: "説明を入力...",
        descriptionRecommend:
          "上記のすべての画像に合った名前を付けてください。",
        image: "画像",
        updatedOther: "更新済み",
        createdOther: "作成済み",
      };
    case "fr": // French
      return {
        editBillboard: "Modifier le panneau publicitaire",
        createBillboard: "Créer le panneau publicitaire",
        editBillboardDescription: "Modifier le panneau publicitaire.",
        addNewBillboard: "Ajouter un nouveau panneau publicitaire",
        saveChanges: "Enregistrer les modifications",
        create: "Créer",
        minLength: "Entrez au moins 2 caractères.",
        billboard: "Panneau publicitaire",
        updated: "Panneau publicitaire mis à jour !",
        created: "Panneau publicitaire créé !",
        close: "Fermer",
        somethingWentWrong: "Quelque chose s'est mal passé !",
        deleted: "Le panneau publicitaire a été supprimé.",
        imageNote:
          "Note : ajoutez jusqu'à 10 images et les images doivent être claires sur tous les écrans.",
        label: "Étiquette",
        labelPlaceholder: "Entrez l'étiquette...",
        labelRecommend:
          "Veuillez nommer de manière appropriée toutes les images ci-dessus.",
        description: "Description",
        descriptionPlaceholder: "Entrez la description...",
        descriptionRecommend:
          "Veuillez nommer de manière appropriée toutes les images ci-dessus.",
        image: "Image",
        updatedOther: "Mis à jour",
        createdOther: "Créé",
      };
    default:
      return {
        editBillboard: "Chỉnh sửa bảng quảng cáo",
        createBillboard: "Tạo bảng quảng cáo",
        editBillboardDescription: "Chỉnh sửa bảng quảng cáo.",
        addNewBillboard: "Thêm mới bảng quảng cáo",
        saveChanges: "Lưu thay đổi",
        create: "Tạo mới",
        minLength: "Nhập ít nhất 2 ký tự.",
        billboard: "Bảng quảng cáo",
        updated: "Đã cập nhật bảng quảng cáo!",
        created: "Đã tạo bảng quảng cáo!",
        close: "Đóng",
        somethingWentWrong: "Có gì đó không đúng!",
        deleted: "Bảng quảng cáo đã bị xóa.",
        imageNote:
          "Lưu ý: chỉ thêm tối đa 10 ảnh và ảnh phải rõ nét với tất cả màn hình.",
        label: "Nhãn",
        labelPlaceholder: "Enter label...",
        labelRecommend: "Hãy đặt tên phù hợp với tất cả ảnh trên.",
        description: "Mô tả",
        descriptionPlaceholder: "Enter description...",
        descriptionRecommend: "Hãy đặt mô tả phù hợp với tất cả ảnh trên.",
        image: "Ảnh",
        updatedOther: "Đã cập nhật",
        createdOther: "Đã tạo",
      };
  }
};

export const getImageUpload = (language: string) => {
  switch (language) {
    case "vi": // Tiếng Việt
      return {
        errorAddingImage:
          "Đã có vấn đề khi thêm ảnh. Hãy làm mới trang để thử lại!",
        uploadImage: "Tải ảnh lên",
      };
    case "en": // English
      return {
        errorAddingImage:
          "There was an issue adding the image. Please refresh the page to try again!",
        uploadImage: "Upload an Image",
      };
    case "zh": // Chinese
      return {
        errorAddingImage: "添加图片时出现问题。请刷新页面重试！",
        uploadImage: "上传图片",
      };
    case "ja": // Japanese
      return {
        errorAddingImage:
          "画像の追加に問題が発生しました。ページを更新して再試行してください！",
        uploadImage: "画像をアップロード",
      };
    case "fr": // French
      return {
        errorAddingImage:
          "Il y a eu un problème lors de l'ajout de l'image. Veuillez actualiser la page pour réessayer !",
        uploadImage: "Télécharger une image",
      };
    default:
      return {
        errorAddingImage:
          "There was an issue adding the image. Please refresh the page to try again!",
        uploadImage: "Upload an Image",
      };
  }
};

export const getCategoriesEditRow = (language: string) => {
  switch (language) {
    case "vi": // Tiếng Việt
      return {
        notFound: "Không tìm thấy!",
        editName: "Chỉnh sửa tên",
        editExistingName: "Chỉnh sửa tên hiện có",
      };
    case "en": // English
      return {
        notFound: "Not found!",
        editName: "Edit Name",
        editExistingName: "Edit an existing name",
      };
    case "zh": // Chinese
      return {
        notFound: "未找到！",
        editName: "编辑名称",
        editExistingName: "编辑现有名称",
      };
    case "fr": // French
      return {
        notFound: "Introuvable !",
        editName: "Modifier le nom",
        editExistingName: "Modifier un nom existant",
      };
    case "ja": // Japanese
      return {
        notFound: "見つかりません！",
        editName: "名前を編集",
        editExistingName: "既存の名前を編集する",
      };
    default: // Default case
      return {
        notFound: "Not found!",
        editName: "Edit Name",
        editExistingName: "Edit an existing name",
      };
  }
};

export const getCategoriesNameFormSheet = (language: string) => {
  switch (language) {
    case "vi": // Tiếng Việt
      return {
        minLength: "Nhập ít nhất 2 ký tự.",
        updateSuccess: "Cập nhật thành công!",
        somethingWentWrong: "Có gì đó không đúng.",
        productName: "Tên sản phẩm",
        enterName: "Nhập tên ...",
        saveChange: "Lưu thay đổi",
      };
    case "en": // English
      return {
        minLength: "Enter at least 2 characters.",
        updateSuccess: "Update successful!",
        somethingWentWrong: "Something went wrong.",
        productName: "Product Name",
        enterName: "Enter name ...",
        saveChange: "Save Change",
      };
    case "zh": // Chinese
      return {
        minLength: "请输入至少2个字符。",
        updateSuccess: "更新成功！",
        somethingWentWrong: "出了些问题。",
        productName: "产品名称",
        enterName: "输入名称...",
        saveChange: "保存更改",
      };
    case "fr": // French
      return {
        minLength: "Entrez au moins 2 caractères.",
        updateSuccess: "Mise à jour réussie !",
        somethingWentWrong: "Quelque chose s'est mal passé.",
        productName: "Nom du produit",
        enterName: "Entrez le nom ...",
        saveChange: "Enregistrer les modifications",
      };
    case "ja": // Japanese
      return {
        minLength: "少なくとも2文字を入力してください。",
        updateSuccess: "更新に成功しました！",
        somethingWentWrong: "問題が発生しました。",
        productName: "製品名",
        enterName: "名前を入力...",
        saveChange: "変更を保存",
      };
    default: // Default to English
      return {
        minLength: "Enter at least 2 characters.",
        updateSuccess: "Update successful!",
        somethingWentWrong: "Something went wrong.",
        productName: "Product Name",
        enterName: "Enter name ...",
        saveChange: "Save Change",
      };
  }
};

export const getCategoriesAction = (language: string) => {
  switch (language) {
    case "vi": // Tiếng Việt
      return {
        copied: "Danh mục Id đã được sao chép vào clipboard.",
        deleted: "Danh mục đã bị xóa.",
        error: "Có lỗi xảy ra!",
        openMenu: "Mở menu",
        actions: "Hành động",
        copyId: "Sao chép Id",
        update: "Cập nhật",
        delete: "Xóa",
      };
    case "en": // English
      return {
        copied: "Categories Id copied to the clipboard.",
        deleted: "Categories deleted.",
        error: "Something went wrong!",
        openMenu: "Open menu",
        actions: "Actions",
        copyId: "Copy Id",
        update: "Update",
        delete: "Delete",
      };
    case "zh": // Chinese
      return {
        copied: "类别 Id 已复制到剪贴板。",
        deleted: "类别已删除。",
        error: "出现问题！",
        openMenu: "打开菜单",
        actions: "操作",
        copyId: "复制 Id",
        update: "更新",
        delete: "删除",
      };
    case "fr": // French
      return {
        copied: "Identifiant de catégorie copié dans le presse-papiers.",
        deleted: "Catégories supprimées.",
        error: "Quelque chose a mal tourné !",
        openMenu: "Ouvrir le menu",
        actions: "Actions",
        copyId: "Copier l'Id",
        update: "Mettre à jour",
        delete: "Supprimer",
      };
    case "ja": // Japanese
      return {
        copied: "カテゴリ ID がクリップボードにコピーされました。",
        deleted: "カテゴリが削除されました。",
        error: "問題が発生しました！",
        openMenu: "メニューを開く",
        actions: "アクション",
        copyId: "ID をコピー",
        update: "更新する",
        delete: "削除する",
      };
    default: // Default case
      return {
        copied: "Categories Id copied to the clipboard.",
        deleted: "Categories deleted.",
        error: "Something went wrong!",
        openMenu: "Open menu",
        actions: "Actions",
        copyId: "Copy Id",
        update: "Update",
        delete: "Delete",
      };
  }
};

export const getCategoriesClient = (language: string) => {
  switch (language) {
    case "vi": // Tiếng Việt
      return {
        categoryDeleted: "Xóa loại sản phẩm thành công",
        error: "Có lỗi xảy ra!",
        category: "Loại sản phẩm",
        manageCategory: "Quản lý loại sản phẩm cửa hàng",
        addNew: "Thêm mới",
        api: "API",
        apiCalls: "Gọi API cho loại sản phẩm",
      };
    case "en": // English
      return {
        categoryDeleted: "Category deleted successfully",
        error: "Something went wrong!",
        category: "Category",
        manageCategory: "Manage store categories",
        addNew: "Add New",
        api: "API",
        apiCalls: "API calls for Category",
      };
    case "zh": // Chinese
      return {
        categoryDeleted: "类别已成功删除",
        error: "出现问题！",
        category: "类别",
        manageCategory: "管理商店类别",
        addNew: "新增",
        api: "API",
        apiCalls: "类别的 API 调用",
      };
    case "fr": // French
      return {
        categoryDeleted: "Catégorie supprimée avec succès",
        error: "Quelque chose a mal tourné !",
        category: "Catégorie",
        manageCategory: "Gérer les catégories du magasin",
        addNew: "Ajouter nouveau",
        api: "API",
        apiCalls: "Appels API pour la catégorie",
      };
    case "ja": // Japanese
      return {
        categoryDeleted: "カテゴリが正常に削除されました",
        error: "問題が発生しました！",
        category: "カテゴリ",
        manageCategory: "店舗カテゴリの管理",
        addNew: "新規追加",
        api: "API",
        apiCalls: "カテゴリの API 呼び出し",
      };
    default: // Default case
      return {
        categoryDeleted: "Category deleted successfully",
        error: "Something went wrong!",
        category: "Category",
        manageCategory: "Manage store categories",
        addNew: "Add New",
        api: "API",
        apiCalls: "API calls for Category",
      };
  }
};

export const getCategoryForm = (language: string) => {
  switch (language) {
    case "vi": // Tiếng Việt
      return {
        editCategory: "Chỉnh sửa loại sản phẩm",
        createCategory: "Tạo loại sản phẩm",
        editCategoryDescription: "Chỉnh sửa một loại sản phẩm.",
        addNewCategory: "Thêm một loại sản phẩm mới",
        saveChanges: "Lưu thay đổi",
        create: "Tạo mới",
        minCharacters: "Nhập ít nhất 4 ký tự.",
        category: "Loại sản phẩm",
        updated: "đã được cập nhật",
        created: "đã được tạo",
        updatingCategory: "Đang cập nhật loại sản phẩm...",
        error: "Có lỗi xảy ra.",
        categoryDeleted: "Loại sản phẩm đã bị xóa.",
        name: "Tên",
        nameHint: "Hãy đặt tên phù hợp với từng loại hàng. VD: Pin con ó ...",
        enterLabel: "Nhập nhãn ...",
      };
    case "en": // English
      return {
        editCategory: "Edit category",
        createCategory: "Create category",
        editCategoryDescription: "Edit a category.",
        addNewCategory: "Add a new category",
        saveChanges: "Save changes",
        create: "Create",
        minCharacters: "Enter at least 4 characters.",
        category: "Category",
        updated: "updated",
        created: "created",
        updatingCategory: "Updating category...",
        error: "Something went wrong.",
        categoryDeleted: "Category deleted.",
        name: "Name",
        nameHint:
          "Set a name appropriate to each product type. E.g., Eagle batteries ...",
        enterLabel: "Enter label ...",
      };
    case "zh": // Chinese
      return {
        editCategory: "编辑类别",
        createCategory: "创建类别",
        editCategoryDescription: "编辑一个类别。",
        addNewCategory: "添加新类别",
        saveChanges: "保存更改",
        create: "创建",
        minCharacters: "输入至少 4 个字符。",
        category: "类别",
        updated: "已更新",
        created: "已创建",
        updatingCategory: "正在更新类别...",
        error: "出现问题。",
        categoryDeleted: "类别已删除。",
        name: "名称",
        nameHint: "为每种产品类型设置合适的名称。例如：老鹰电池...",
        enterLabel: "输入标签 ...",
      };
    case "fr": // French
      return {
        editCategory: "Modifier la catégorie",
        createCategory: "Créer une catégorie",
        editCategoryDescription: "Modifier une catégorie.",
        addNewCategory: "Ajouter une nouvelle catégorie",
        saveChanges: "Enregistrer les modifications",
        create: "Créer",
        minCharacters: "Entrez au moins 4 caractères.",
        category: "Catégorie",
        updated: "mis à jour",
        created: "créé",
        updatingCategory: "Mise à jour de la catégorie...",
        error: "Quelque chose a mal tourné.",
        categoryDeleted: "Catégorie supprimée.",
        name: "Nom",
        nameHint:
          "Définissez un nom adapté à chaque type de produit. Par exemple : Piles aigles ...",
        enterLabel: "Entrez une étiquette ...",
      };
    case "ja": // Japanese
      return {
        editCategory: "カテゴリを編集",
        createCategory: "カテゴリを作成",
        editCategoryDescription: "カテゴリを編集する。",
        addNewCategory: "新しいカテゴリを追加",
        saveChanges: "変更を保存",
        create: "作成する",
        minCharacters: "少なくとも 4 文字を入力してください。",
        category: "カテゴリ",
        updated: "更新されました",
        created: "作成されました",
        updatingCategory: "カテゴリを更新しています...",
        error: "問題が発生しました。",
        categoryDeleted: "カテゴリが削除されました。",
        name: "名前",
        nameHint:
          "各製品タイプに適した名前を設定してください。例：イーグルバッテリー...",
        enterLabel: "ラベルを入力 ...",
      };
    default: // Default case
      return {
        editCategory: "Edit category",
        createCategory: "Create category",
        editCategoryDescription: "Edit a category.",
        addNewCategory: "Add a new category",
        saveChanges: "Save changes",
        create: "Create",
        minCharacters: "Enter at least 4 characters.",
        category: "Category",
        updated: "updated",
        created: "created",
        updatingCategory: "Updating category...",
        error: "Something went wrong.",
        categoryDeleted: "Category deleted.",
        name: "Name",
        nameHint:
          "Set a name appropriate to each product type. E.g., Eagle batteries ...",
        enterLabel: "Enter label ...",
      };
  }
};

export const getProductEditRow = (language: string) => {
  switch (language) {
    case "vi": // Tiếng Việt
      return {
        edit: "Chỉnh sửa",
        editExisting: "Chỉnh sửa một mục hiện có",
      };
    case "en": // English
      return {
        edit: "Edit",
        editExisting: "Edit an existing",
      };
    case "zh": // Chinese
      return {
        edit: "编辑",
        editExisting: "编辑现有的",
      };
    case "fr": // French
      return {
        edit: "Modifier",
        editExisting: "Modifier un existant",
      };
    case "ja": // Japanese
      return {
        edit: "編集",
        editExisting: "既存のものを編集",
      };
    default: // Default case
      return {
        edit: "Edit",
        editExisting: "Edit an existing",
      };
  }
};

export const getProductFormEdit = (language: string) => {
  switch (language) {
    case "vi": // Tiếng Việt
      return {
        minCharacters: "Nhập ít nhất 2 ký tự.",
        selectProductDetail: "Hãy chọn 1 ProductDetail.",
        updateSuccess: "Cập nhật thành công!",
        error: "Có lỗi xảy ra.",
        productName: "Tên sản phẩm",
        enterProductName: "Nhập tên sản phẩm ...",
        saveChanges: "Lưu thay đổi",
      };
    case "en": // English
      return {
        minCharacters: "Enter at least 2 characters.",
        selectProductDetail: "Please select 1 ProductDetail.",
        updateSuccess: "Update successful!",
        error: "Something went wrong.",
        productName: "Product Name",
        enterProductName: "Enter product name ...",
        saveChanges: "Save Change",
      };
    case "zh": // Chinese
      return {
        minCharacters: "输入至少 2 个字符。",
        selectProductDetail: "请选择 1 个 ProductDetail。",
        updateSuccess: "更新成功！",
        error: "出现问题。",
        productName: "产品名称",
        enterProductName: "输入产品名称 ...",
        saveChanges: "保存更改",
      };
    case "fr": // French
      return {
        minCharacters: "Entrez au moins 2 caractères.",
        selectProductDetail: "Veuillez sélectionner 1 ProductDetail.",
        updateSuccess: "Mise à jour réussie !",
        error: "Quelque chose a mal tourné.",
        productName: "Nom du produit",
        enterProductName: "Entrez le nom du produit ...",
        saveChanges: "Sauvegarder les modifications",
      };
    case "ja": // Japanese
      return {
        minCharacters: "最低 2 文字を入力してください。",
        selectProductDetail: "1 つの ProductDetail を選択してください。",
        updateSuccess: "更新成功！",
        error: "問題が発生しました。",
        productName: "製品名",
        enterProductName: "製品名を入力してください ...",
        saveChanges: "変更を保存",
      };
    default: // Default case
      return {
        minCharacters: "Enter at least 2 characters.",
        selectProductDetail: "Please select 1 ProductDetail.",
        updateSuccess: "Update successful!",
        error: "Something went wrong.",
        productName: "Product Name",
        enterProductName: "Enter product name ...",
        saveChanges: "Save Change",
      };
  }
};

export const getProductAction = (language: string) => {
  switch (language) {
    case "vi": // Tiếng Việt
      return {
        productIdCopied: "Product Id đã được sao chép vào clipboard.",
        productDeleted: "Sản phẩm đã bị xóa.",
        error: "Có lỗi xảy ra.",
        openMenu: "Mở menu",
        actions: "Hành động",
        copyId: "Sao chép Id",
        update: "Cập nhật",
        delete: "Xóa",
      };
    case "en": // English
      return {
        productIdCopied: "Product Id copied to the clipboard.",
        productDeleted: "Product deleted.",
        error: "Something went wrong.",
        openMenu: "Open menu",
        actions: "Actions",
        copyId: "Copy Id",
        update: "Update",
        delete: "Delete",
      };
    case "zh": // Chinese
      return {
        productIdCopied: "产品 ID 已复制到剪贴板。",
        productDeleted: "产品已删除。",
        error: "出现问题。",
        openMenu: "打开菜单",
        actions: "操作",
        copyId: "复制 ID",
        update: "更新",
        delete: "删除",
      };
    case "fr": // French
      return {
        productIdCopied: "ID du produit copié dans le presse-papiers.",
        productDeleted: "Produit supprimé.",
        error: "Quelque chose a mal tourné.",
        openMenu: "Ouvrir le menu",
        actions: "Actions",
        copyId: "Copier l'ID",
        update: "Mettre à jour",
        delete: "Supprimer",
      };
    case "ja": // Japanese
      return {
        productIdCopied: "製品 ID がクリップボードにコピーされました。",
        productDeleted: "製品が削除されました。",
        error: "問題が発生しました。",
        openMenu: "メニューを開く",
        actions: "アクション",
        copyId: "ID をコピー",
        update: "更新する",
        delete: "削除する",
      };
    default: // Default case
      return {
        productIdCopied: "Product Id copied to the clipboard.",
        productDeleted: "Product deleted.",
        error: "Something went wrong.",
        openMenu: "Open menu",
        actions: "Actions",
        copyId: "Copy Id",
        update: "Update",
        delete: "Delete",
      };
  }
};

export const getProductClient = (language: string) => {
  switch (language) {
    case "vi": // Tiếng Việt
      return {
        productDeletedSuccessfully: "Sản phẩm đã bị xóa thành công",
        error: "Có lỗi xảy ra.",
        product: "Sản phẩm",
        manageProduct: "Quản lý sản phẩm cửa hàng",
        addNew: "Thêm mới",
        api: "API",
        apiCallsForProduct: "Gọi API cho sản phẩm",
      };
    case "en": // English
      return {
        productDeletedSuccessfully: "Product deleted successfully",
        error: "Something went wrong.",
        product: "Product",
        manageProduct: "Manage store products",
        addNew: "Add New",
        api: "API",
        apiCallsForProduct: "API calls for Product",
      };
    case "zh": // Chinese
      return {
        productDeletedSuccessfully: "产品已成功删除",
        error: "出现问题。",
        product: "产品",
        manageProduct: "管理商店产品",
        addNew: "新增",
        api: "API",
        apiCallsForProduct: "产品的 API 调用",
      };
    case "fr": // French
      return {
        productDeletedSuccessfully: "Produit supprimé avec succès",
        error: "Quelque chose a mal tourné.",
        product: "Produit",
        manageProduct: "Gérer les produits du magasin",
        addNew: "Ajouter nouveau",
        api: "API",
        apiCallsForProduct: "Appels API pour le produit",
      };
    case "ja": // Japanese
      return {
        productDeletedSuccessfully: "製品が正常に削除されました",
        error: "問題が発生しました。",
        product: "製品",
        manageProduct: "店舗製品の管理",
        addNew: "新規追加",
        api: "API",
        apiCallsForProduct: "製品の API 呼び出し",
      };
    default: // Default case
      return {
        productDeletedSuccessfully: "Product deleted successfully",
        error: "Something went wrong.",
        product: "Product",
        manageProduct: "Manage store products",
        addNew: "Add New",
        api: "API",
        apiCallsForProduct: "API calls for Product",
      };
  }
};

export const getProductForm = (language: string) => {
  switch (language) {
    case "vi": // Tiếng Việt
      return {
        editProduct: "Chỉnh sửa sản phẩm",
        createProduct: "Tạo sản phẩm",
        editAProduct: "Chỉnh sửa một sản phẩm.",
        addNewProduct: "Thêm sản phẩm mới",
        saveChanges: "Lưu thay đổi",
        create: "Tạo mới",
        min2Characters: "Nhập ít nhất 2 ký tự.",
        min4Characters: "Nhập ít nhất 4 ký tự.",
        selectProductDetail: "Hãy chọn 1 ProductDetail.",
        product: "Sản phẩm",
        updated: "đã được cập nhật",
        created: "đã được tạo",
        productUpdated: "Sản phẩm đã được cập nhật!",
        productCreated: "Sản phẩm đã được tạo!",
        close: "Đóng",
        productDeleted: "Sản phẩm đã bị xóa.",
        error: "Có lỗi xảy ra!",
        productImages: "Hình ảnh sản phẩm",
        productImageHint: "Hãy chụp ảnh sản phẩm rõ nét xóa phông.",
        selectImagesLimit: "Chỉ chọn 10 ảnh sản phẩm rõ nét.",
        productDescriptionImages: "Hình ảnh mô tả sản phẩm",
        productDescriptionImagesHint: "Chỉ chọn 2 ảnh sản phẩm chi tiết nhất.",
        productName: "Tên sản phẩm",
        productNameHint: "Hãy nhập đầy đủ tên sản phẩm.",
        enterProductName: "Nhập tên sản phẩm ...",
        description: "Mô tả",
        descriptionHint: "Mô tả ngắn về sản phẩm.",
        enterDescriptionName: "Nhập tên mô tả ...",
        productDetail: "Chi tiết sản phẩm",
        selectProductDetailHint: "Lựa chọn chi tiết sản phẩm phù hợp.",
        selectProductDetailLabel: "Select a productdetail",
        showOnHomePage: "Hiển thị trang chủ",
        homePageHint: "Sản phẩm này sẽ xuất hiện trên trang chủ",
        outOfStock: "Hết hàng",
        productHidden: "Sản phẩm sẽ bị ẩn",
      };
    case "en": // English
      return {
        editProduct: "Edit product",
        createProduct: "Create product",
        editAProduct: "Edit a product.",
        addNewProduct: "Add a new product",
        saveChanges: "Save changes",
        create: "Create",
        min2Characters: "Enter at least 2 characters.",
        min4Characters: "Enter at least 4 characters.",
        selectProductDetail: "Please select 1 ProductDetail.",
        product: "Product",
        updated: "updated",
        created: "created",
        productUpdated: "Product updated!",
        productCreated: "Product created!",
        close: "Close",
        productDeleted: "Product deleted.",
        error: "Something went wrong!",
        productImages: "Product images",
        productImageHint:
          "Please take clear product photos with background removed.",
        selectImagesLimit: "Select only 10 clear product images.",
        productDescriptionImages: "Product description images",
        productDescriptionImagesHint:
          "Select only 2 most detailed product images.",
        productName: "Product name",
        productNameHint: "Please enter the full product name.",
        enterProductName: "Enter product name ...",
        description: "Description",
        descriptionHint: "A short description of the product.",
        enterDescriptionName: "Enter description name ...",
        productDetail: "Product detail",
        selectProductDetailHint: "Choose a suitable product detail.",
        selectProductDetailLabel: "Select a productdetail",
        showOnHomePage: "Show on homepage",
        homePageHint: "This product will appear on the homepage",
        outOfStock: "Out of stock",
        productHidden: "The product will be hidden",
      };
    case "zh": // Chinese
      return {
        editProduct: "编辑产品",
        createProduct: "创建产品",
        editAProduct: "编辑一个产品。",
        addNewProduct: "添加新产品",
        saveChanges: "保存更改",
        create: "创建",
        min2Characters: "请输入至少 2 个字符。",
        min4Characters: "请输入至少 4 个字符。",
        selectProductDetail: "请选择 1 个 ProductDetail。",
        product: "产品",
        updated: "已更新",
        created: "已创建",
        productUpdated: "产品已更新！",
        productCreated: "产品已创建！",
        close: "关闭",
        productDeleted: "产品已删除。",
        error: "出现问题！",
        productImages: "产品图片",
        productImageHint: "请拍摄清晰的产品照片并移除背景。",
        selectImagesLimit: "仅选择 10 张清晰的产品图片。",
        productDescriptionImages: "产品描述图片",
        productDescriptionImagesHint: "仅选择 2 张最详细的产品图片。",
        productName: "产品名称",
        productNameHint: "请输入完整的产品名称。",
        enterProductName: "输入产品名称 ...",
        description: "描述",
        descriptionHint: "简短的产品描述。",
        enterDescriptionName: "输入描述名称 ...",
        productDetail: "产品细节",
        selectProductDetailHint: "选择合适的产品细节。",
        selectProductDetailLabel: "选择产品细节",
        showOnHomePage: "显示在主页",
        homePageHint: "该产品将出现在主页",
        outOfStock: "缺货",
        productHidden: "产品将被隐藏",
      };
    case "fr": // French
      return {
        editProduct: "Modifier le produit",
        createProduct: "Créer un produit",
        editAProduct: "Modifier un produit.",
        addNewProduct: "Ajouter un nouveau produit",
        saveChanges: "Enregistrer les modifications",
        create: "Créer",
        min2Characters: "Entrez au moins 2 caractères.",
        min4Characters: "Entrez au moins 4 caractères.",
        selectProductDetail: "Veuillez sélectionner 1 ProductDetail.",
        product: "Produit",
        updated: "mis à jour",
        created: "créé",
        productUpdated: "Produit mis à jour!",
        productCreated: "Produit créé!",
        close: "Fermer",
        productDeleted: "Produit supprimé.",
        error: "Quelque chose a mal tourné!",
        productImages: "Images du produit",
        productImageHint:
          "Veuillez prendre des photos claires du produit avec arrière-plan supprimé.",
        selectImagesLimit:
          "Sélectionnez uniquement 10 images de produit claires.",
        productDescriptionImages: "Images de description du produit",
        productDescriptionImagesHint:
          "Sélectionnez uniquement 2 images de produit les plus détaillées.",
        productName: "Nom du produit",
        productNameHint: "Veuillez entrer le nom complet du produit.",
        enterProductName: "Entrez le nom du produit ...",
        description: "Description",
        descriptionHint: "Une brève description du produit.",
        enterDescriptionName: "Entrez le nom de la description ...",
        productDetail: "Détail du produit",
        selectProductDetailHint: "Choisissez un détail produit approprié.",
        selectProductDetailLabel: "Sélectionnez un détail du produit",
        showOnHomePage: "Afficher sur la page d'accueil",
        homePageHint: "Ce produit apparaîtra sur la page d'accueil",
        outOfStock: "Rupture de stock",
        productHidden: "Le produit sera caché",
      };
    case "ja": // Japanese
      return {
        editProduct: "製品を編集",
        createProduct: "製品を作成",
        editAProduct: "製品を編集する。",
        addNewProduct: "新しい製品を追加",
        saveChanges: "変更を保存",
        create: "作成する",
        min2Characters: "最低 2 文字を入力してください。",
        min4Characters: "最低 4 文字を入力してください。",
        selectProductDetail: "1 つの ProductDetail を選択してください。",
        product: "製品",
        updated: "更新されました",
        created: "作成されました",
        productUpdated: "製品が更新されました！",
        productCreated: "製品が作成されました！",
        close: "閉じる",
        productDeleted: "製品は削除されました。",
        error: "問題が発生しました！",
        productImages: "製品画像",
        productImageHint: "背景を削除した明確な製品写真を撮影してください。",
        selectImagesLimit: "明確な製品画像を最大 10 枚選択してください。",
        productDescriptionImages: "製品説明画像",
        productDescriptionImagesHint:
          "最も詳細な 2 枚の製品画像を選択してください。",
        productName: "製品名",
        productNameHint: "製品の完全な名前を入力してください。",
        enterProductName: "製品名を入力してください ...",
        description: "説明",
        descriptionHint: "製品の簡単な説明。",
        enterDescriptionName: "説明名を入力してください ...",
        productDetail: "製品詳細",
        selectProductDetailHint: "適切な製品詳細を選択してください。",
        selectProductDetailLabel: "製品詳細を選択",
        showOnHomePage: "ホームページに表示",
        homePageHint: "この製品はホームページに表示されます",
        outOfStock: "在庫切れ",
        productHidden: "製品は非表示になります",
      };
    default: // Default case
      return {
        editProduct: "Edit product",
        createProduct: "Create product",
        editAProduct: "Edit a product.",
        addNewProduct: "Add a new product",
        saveChanges: "Save changes",
        create: "Create",
        min2Characters: "Enter at least 2 characters.",
        min4Characters: "Enter at least 4 characters.",
        selectProductDetail: "Please select 1 ProductDetail.",
        product: "Product",
        updated: "updated",
        created: "created",
        productUpdated: "Product updated!",
        productCreated: "Product created!",
        close: "Close",
        productDeleted: "Product deleted.",
        error: "Something went wrong!",
        productImages: "Product images",
        productImageHint:
          "Please take clear product photos with background removed.",
        selectImagesLimit: "Select only 10 clear product images.",
        productDescriptionImages: "Product description images",
        productDescriptionImagesHint:
          "Select only 2 most detailed product images.",
        productName: "Product name",
        productNameHint: "Please enter the full product name.",
        enterProductName: "Enter product name ...",
        description: "Description",
        descriptionHint: "A short description of the product.",
        enterDescriptionName: "Enter description name ...",
        productDetail: "Product detail",
        selectProductDetailHint: "Choose a suitable product detail.",
        selectProductDetailLabel: "Select a productdetail",
        showOnHomePage: "Show on homepage",
        homePageHint: "This product will appear on the homepage",
        outOfStock: "Out of stock",
        productHidden: "The product will be hidden",
      };
  }
};

export const getProductDetailEditRow = (language: string) => {
  switch (language) {
    case "vi":
      return {
        edit: "Chỉnh sửa",
        editAnExisting: "Chỉnh sửa một mục hiện có",
      };
    case "en":
      return {
        edit: "Edit",
        editAnExisting: "Edit an existing",
      };
    case "zh":
      return {
        edit: "编辑",
        editAnExisting: "编辑现有的项目",
      };
    case "fr":
      return {
        edit: "Modifier",
        editAnExisting: "Modifier un élément existant",
      };
    case "ja":
      return {
        edit: "編集",
        editAnExisting: "既存の項目を編集する",
      };
    default:
      return {
        edit: "Edit",
        editAnExisting: "Edit an existing",
      };
  }
};

export const getProductDetailFormEditSheet = (language: string) => {
  switch (language) {
    case "vi":
      return {
        min2Characters: "Nhập ít nhất 2 ký tự.",
        noNegativeNumber: "Không được nhập số âm.",
        selectSize: "Hãy chọn 1 size phù hợp.",
        selectColor: "Hãy chọn 1 color phù hợp.",
        minPrice: "Hãy nhập ít nhất 500 đồng.",
        percentageRange: "Hãy nhập phần trăm từ 1 đến 100.",
        quantityRange: "Hãy nhập số lượng từ 1 đến 9999.",
        selectCategory: "Hãy chọn 1 category phù hợp.",
        updateSuccess: "Cập nhật thành công!",
        error: "Something went wrong.",
        title: "Tiêu đề",
        enterTitle: "Nhập tiêu đề ...",
        productName1: "Tên sản phẩm 1",
        enterProductName1: "Nhập tên sản phẩm 1...",
        productPrice1: "Giá sản phẩm 1",
        enterProductPrice1: "Nhập giá sản phẩm 1...",
        productDiscount1: "Giảm giá sản phẩm 1",
        enterProductDiscount1: "Nhập % giảm sản phẩm 1 ...",
        productQuantity1: "Số lượng còn trong kho 1",
        enterProductQuantity1: "Nhập số lượng còn trong kho 1...",
        productName2: "Tên sản phẩm 2",
        enterProductName2: "Nhập tên sản phẩm 2...",
        productPrice2: "Giá sản phẩm 2",
        enterProductPrice2: "Nhập giá sản phẩm 2...",
        productDiscount2: "Giảm giá sản phẩm 2",
        enterProductDiscount2: "Nhập % giảm sản phẩm 2 ...",
        productQuantity2: "Số lượng còn trong kho 2",
        enterProductQuantity2: "Nhập số lượng còn trong kho 2...",
        productName3: "Tên sản phẩm 3",
        enterProductName3: "Nhập tên sản phẩm 3...",
        productPrice3: "Giá sản phẩm 3",
        enterProductPrice3: "Nhập giá sản phẩm 3...",
        productDiscount3: "Giảm giá sản phẩm 3",
        enterProductDiscount3: "Nhập % giảm sản phẩm 3 ...",
        productQuantity3: "Số lượng còn trong kho 3",
        enterProductQuantity3: "Nhập số lượng còn trong kho 3...",
        productName4: "Tên sản phẩm 4",
        enterProductName4: "Nhập tên sản phẩm 4...",
        productPrice4: "Giá sản phẩm 4",
        enterProductPrice4: "Nhập giá sản phẩm 4...",
        productDiscount4: "Giảm giá sản phẩm 4",
        enterProductDiscount4: "Nhập % giảm sản phẩm 4 ...",
        productQuantity4: "Số lượng còn trong kho 4",
        enterProductQuantity4: "Nhập số lượng còn trong kho 4...",
        productName5: "Tên sản phẩm 5",
        enterProductName5: "Nhập tên sản phẩm 5...",
        productPrice5: "Giá sản phẩm 5",
        enterProductPrice5: "Nhập giá sản phẩm 5...",
        productDiscount5: "Giảm giá sản phẩm 5",
        enterProductDiscount5: "Nhập % giảm sản phẩm 5 ...",
        productQuantity5: "Số lượng còn trong kho 5",
        enterProductQuantity5: "Nhập số lượng còn trong kho 5...",
        bulkPromotion: "Khuyến mãi sỉ",
        enterBulkPromotion: "Nhập khuyến mãi sỉ ...",
        tenderPromotion: "Khuyến mãi thầu",
        enterTenderPromotion: "Nhập khuyến mãi thầu ...",
        warrantyPrice1: "Giá tiền bảo hành 1",
        enterWarrantyPrice1: "Nhập giá tiền bảo hành ...",
        warrantyPrice2: "Giá tiền bảo hành 2",
        enterWarrantyPrice2: "Nhập giá tiền bảo hành ...",
        warrantyPrice3: "Giá tiền bảo hành 3",
        enterWarrantyPrice3: "Nhập giá tiền bảo hành ...",
        warrantyPrice4: "Giá tiền bảo hành 4",
        enterWarrantyPrice4: "Nhập giá tiền bảo hành ...",
        specification: "Thông số",
        enterSpecification: "Nhập thông số ...",
        specContent: "Nội dung thông số",
        enterSpecContent: "Nhập nội dung thông số ...",
        featureDescription: "Mô tả tính năng nổi bật",
        enterFeatureDescription: "Nhập mô tả tính năng nổi bật ...",
        featureContent: "Nội dung tính năng nổi bật",
        enterFeatureContent: "Nhập nội dung tính năng nổi bật ...",
        saveChange: "Save Change",
      };
    case "en":
      return {
        min2Characters: "Enter at least 2 characters.",
        noNegativeNumber: "Do not enter negative numbers.",
        selectSize: "Please select a suitable size.",
        selectColor: "Please select a suitable color.",
        minPrice: "Enter at least 500 VND.",
        percentageRange: "Enter a percentage from 1 to 100.",
        quantityRange: "Enter a quantity from 1 to 9999.",
        selectCategory: "Please select a suitable category.",
        updateSuccess: "Updated successfully!",
        error: "Something went wrong.",
        title: "Title",
        enterTitle: "Enter title ...",
        productName1: "Product Name 1",
        enterProductName1: "Enter product name 1...",
        productPrice1: "Product Price 1",
        enterProductPrice1: "Enter product price 1...",
        productDiscount1: "Product Discount 1",
        enterProductDiscount1: "Enter product 1 discount percentage ...",
        productQuantity1: "Product Quantity 1",
        enterProductQuantity1: "Enter product 1 quantity in stock...",
        productName2: "Product Name 2",
        enterProductName2: "Enter product name 2...",
        productPrice2: "Product Price 2",
        enterProductPrice2: "Enter product price 2...",
        productDiscount2: "Product Discount 2",
        enterProductDiscount2: "Enter product 2 discount percentage ...",
        productQuantity2: "Product Quantity 2",
        enterProductQuantity2: "Enter product 2 quantity in stock...",
        productName3: "Product Name 3",
        enterProductName3: "Enter product name 3...",
        productPrice3: "Product Price 3",
        enterProductPrice3: "Enter product price 3...",
        productDiscount3: "Product Discount 3",
        enterProductDiscount3: "Enter product 3 discount percentage ...",
        productQuantity3: "Product Quantity 3",
        enterProductQuantity3: "Enter product 3 quantity in stock...",
        productName4: "Product Name 4",
        enterProductName4: "Enter product name 4...",
        productPrice4: "Product Price 4",
        enterProductPrice4: "Enter product price 4...",
        productDiscount4: "Product Discount 4",
        enterProductDiscount4: "Enter product 4 discount percentage ...",
        productQuantity4: "Product Quantity 4",
        enterProductQuantity4: "Enter product 4 quantity in stock...",
        productName5: "Product Name 5",
        enterProductName5: "Enter product name 5...",
        productPrice5: "Product Price 5",
        enterProductPrice5: "Enter product price 5...",
        productDiscount5: "Product Discount 5",
        enterProductDiscount5: "Enter product 5 discount percentage ...",
        productQuantity5: "Product Quantity 5",
        enterProductQuantity5: "Enter product 5 quantity in stock...",
        bulkPromotion: "Bulk Promotion",
        enterBulkPromotion: "Enter bulk promotion ...",
        tenderPromotion: "Tender Promotion",
        enterTenderPromotion: "Enter tender promotion ...",
        warrantyPrice1: "Warranty Price 1",
        enterWarrantyPrice1: "Enter warranty price ...",
        warrantyPrice2: "Warranty Price 2",
        enterWarrantyPrice2: "Enter warranty price ...",
        warrantyPrice3: "Warranty Price 3",
        enterWarrantyPrice3: "Enter warranty price ...",
        warrantyPrice4: "Warranty Price 4",
        enterWarrantyPrice4: "Enter warranty price ...",
        specification: "Specification",
        enterSpecification: "Enter specification ...",
        specContent: "Specification Content",
        enterSpecContent: "Enter specification content ...",
        featureDescription: "Feature Description",
        enterFeatureDescription: "Enter feature description ...",
        featureContent: "Feature Content",
        enterFeatureContent: "Enter feature content ...",
        saveChange: "Save Change",
      };
    case "zh":
      return {
        min2Characters: "请输入至少2个字符。",
        noNegativeNumber: "不能输入负数。",
        selectSize: "请选择合适的尺码。",
        selectColor: "请选择合适的颜色。",
        minPrice: "请输入至少500越南盾。",
        percentageRange: "请输入1到100之间的百分比。",
        quantityRange: "请输入1到9999之间的数量。",
        selectCategory: "请选择合适的类别。",
        updateSuccess: "更新成功！",
        error: "发生错误。",
        title: "标题",
        enterTitle: "请输入标题 ...",
        productName1: "产品名称 1",
        enterProductName1: "请输入产品名称 1 ...",
        productPrice1: "产品价格 1",
        enterProductPrice1: "请输入产品价格 1 ...",
        productDiscount1: "产品折扣 1",
        enterProductDiscount1: "请输入产品 1 的折扣百分比 ...",
        productQuantity1: "产品库存数量 1",
        enterProductQuantity1: "请输入产品 1 的库存数量 ...",
        productName2: "产品名称 2",
        enterProductName2: "请输入产品名称 2 ...",
        productPrice2: "产品价格 2",
        enterProductPrice2: "请输入产品价格 2 ...",
        productDiscount2: "产品折扣 2",
        enterProductDiscount2: "请输入产品 2 的折扣百分比 ...",
        productQuantity2: "产品库存数量 2",
        enterProductQuantity2: "请输入产品 2 的库存数量 ...",
        productName3: "产品名称 3",
        enterProductName3: "请输入产品名称 3 ...",
        productPrice3: "产品价格 3",
        enterProductPrice3: "请输入产品价格 3 ...",
        productDiscount3: "产品折扣 3",
        enterProductDiscount3: "请输入产品 3 的折扣百分比 ...",
        productQuantity3: "产品库存数量 3",
        enterProductQuantity3: "请输入产品 3 的库存数量 ...",
        productName4: "产品名称 4",
        enterProductName4: "请输入产品名称 4 ...",
        productPrice4: "产品价格 4",
        enterProductPrice4: "请输入产品价格 4 ...",
        productDiscount4: "产品折扣 4",
        enterProductDiscount4: "请输入产品 4 的折扣百分比 ...",
        productQuantity4: "产品库存数量 4",
        enterProductQuantity4: "请输入产品 4 的库存数量 ...",
        productName5: "产品名称 5",
        enterProductName5: "请输入产品名称 5 ...",
        productPrice5: "产品价格 5",
        enterProductPrice5: "请输入产品价格 5 ...",
        productDiscount5: "产品折扣 5",
        enterProductDiscount5: "请输入产品 5 的折扣百分比 ...",
        productQuantity5: "产品库存数量 5",
        enterProductQuantity5: "请输入产品 5 的库存数量 ...",
        bulkPromotion: "批发促销",
        enterBulkPromotion: "请输入批发促销 ...",
        tenderPromotion: "招标促销",
        enterTenderPromotion: "请输入招标促销 ...",
        warrantyPrice1: "保修价格 1",
        enterWarrantyPrice1: "请输入保修价格 ...",
        warrantyPrice2: "保修价格 2",
        enterWarrantyPrice2: "请输入保修价格 ...",
        warrantyPrice3: "保修价格 3",
        enterWarrantyPrice3: "请输入保修价格 ...",
        warrantyPrice4: "保修价格 4",
        enterWarrantyPrice4: "请输入保修价格 ...",
        specification: "规格",
        enterSpecification: "请输入规格 ...",
        specContent: "规格内容",
        enterSpecContent: "请输入规格内容 ...",
        featureDescription: "功能描述",
        enterFeatureDescription: "请输入功能描述 ...",
        featureContent: "功能内容",
        enterFeatureContent: "请输入功能内容 ...",
        saveChange: "保存更改",
      };
    case "fr":
      return {
        min2Characters: "Entrez au moins 2 caractères.",
        noNegativeNumber: "Il ne faut pas entrer de nombres négatifs.",
        selectSize: "Veuillez sélectionner une taille appropriée.",
        selectColor: "Veuillez sélectionner une couleur appropriée.",
        minPrice: "Entrez au moins 500 VND.",
        percentageRange: "Entrez un pourcentage entre 1 et 100.",
        quantityRange: "Entrez une quantité entre 1 et 9999.",
        selectCategory: "Veuillez sélectionner une catégorie appropriée.",
        updateSuccess: "Mise à jour réussie !",
        error: "Quelque chose s'est mal passé.",
        title: "Titre",
        enterTitle: "Entrez le titre ...",
        productName1: "Nom du produit 1",
        enterProductName1: "Entrez le nom du produit 1 ...",
        productPrice1: "Prix du produit 1",
        enterProductPrice1: "Entrez le prix du produit 1 ...",
        productDiscount1: "Réduction du produit 1",
        enterProductDiscount1:
          "Entrez le pourcentage de réduction du produit 1 ...",
        productQuantity1: "Quantité du produit 1",
        enterProductQuantity1: "Entrez la quantité du produit 1 en stock ...",
        productName2: "Nom du produit 2",
        enterProductName2: "Entrez le nom du produit 2 ...",
        productPrice2: "Prix du produit 2",
        enterProductPrice2: "Entrez le prix du produit 2 ...",
        productDiscount2: "Réduction du produit 2",
        enterProductDiscount2:
          "Entrez le pourcentage de réduction du produit 2 ...",
        productQuantity2: "Quantité du produit 2",
        enterProductQuantity2: "Entrez la quantité du produit 2 en stock ...",
        productName3: "Nom du produit 3",
        enterProductName3: "Entrez le nom du produit 3 ...",
        productPrice3: "Prix du produit 3",
        enterProductPrice3: "Entrez le prix du produit 3 ...",
        productDiscount3: "Réduction du produit 3",
        enterProductDiscount3:
          "Entrez le pourcentage de réduction du produit 3 ...",
        productQuantity3: "Quantité du produit 3",
        enterProductQuantity3: "Entrez la quantité du produit 3 en stock ...",
        productName4: "Nom du produit 4",
        enterProductName4: "Entrez le nom du produit 4 ...",
        productPrice4: "Prix du produit 4",
        enterProductPrice4: "Entrez le prix du produit 4 ...",
        productDiscount4: "Réduction du produit 4",
        enterProductDiscount4:
          "Entrez le pourcentage de réduction du produit 4 ...",
        productQuantity4: "Quantité du produit 4",
        enterProductQuantity4: "Entrez la quantité du produit 4 en stock ...",
        productName5: "Nom du produit 5",
        enterProductName5: "Entrez le nom du produit 5 ...",
        productPrice5: "Prix du produit 5",
        enterProductPrice5: "Entrez le prix du produit 5 ...",
        productDiscount5: "Réduction du produit 5",
        enterProductDiscount5:
          "Entrez le pourcentage de réduction du produit 5 ...",
        productQuantity5: "Quantité du produit 5",
        enterProductQuantity5: "Entrez la quantité du produit 5 en stock ...",
        bulkPromotion: "Promotion en gros",
        enterBulkPromotion: "Entrez la promotion en gros ...",
        tenderPromotion: "Promotion d'appel d'offres",
        enterTenderPromotion: "Entrez la promotion d'appel d'offres ...",
        warrantyPrice1: "Prix de garantie 1",
        enterWarrantyPrice1: "Entrez le prix de la garantie ...",
        warrantyPrice2: "Prix de garantie 2",
        enterWarrantyPrice2: "Entrez le prix de la garantie ...",
        warrantyPrice3: "Prix de garantie 3",
        enterWarrantyPrice3: "Entrez le prix de la garantie ...",
        warrantyPrice4: "Prix de garantie 4",
        enterWarrantyPrice4: "Entrez le prix de la garantie ...",
        specification: "Spécification",
        enterSpecification: "Entrez la spécification ...",
        specContent: "Contenu de la spécification",
        enterSpecContent: "Entrez le contenu de la spécification ...",
        featureDescription: "Description de la fonctionnalité",
        enterFeatureDescription:
          "Entrez la description de la fonctionnalité ...",
        featureContent: "Contenu de la fonctionnalité",
        enterFeatureContent: "Entrez le contenu de la fonctionnalité ...",
        saveChange: "Sauvegarder les modifications",
      };

    case "ja":
      return {
        min2Characters: "最低2文字を入力してください。",
        noNegativeNumber: "負の数は入力できません。",
        selectSize: "適切なサイズを選択してください。",
        selectColor: "適切な色を選択してください。",
        minPrice: "最低500ベトナムドンを入力してください。",
        percentageRange: "1から100の間でパーセンテージを入力してください。",
        quantityRange: "1から9999の間で数量を入力してください。",
        selectCategory: "適切なカテゴリーを選択してください。",
        updateSuccess: "更新に成功しました！",
        error: "エラーが発生しました。",
        title: "タイトル",
        enterTitle: "タイトルを入力してください ...",
        productName1: "製品名 1",
        enterProductName1: "製品名 1 を入力してください ...",
        productPrice1: "製品価格 1",
        enterProductPrice1: "製品価格 1 を入力してください ...",
        productDiscount1: "製品割引 1",
        enterProductDiscount1: "製品 1 の割引率を入力してください ...",
        productQuantity1: "在庫数 1",
        enterProductQuantity1: "製品 1 の在庫数を入力してください ...",
        productName2: "製品名 2",
        enterProductName2: "製品名 2 を入力してください ...",
        productPrice2: "製品価格 2",
        enterProductPrice2: "製品価格 2 を入力してください ...",
        productDiscount2: "製品割引 2",
        enterProductDiscount2: "製品 2 の割引率を入力してください ...",
        productQuantity2: "在庫数 2",
        enterProductQuantity2: "製品 2 の在庫数を入力してください ...",
        productName3: "製品名 3",
        enterProductName3: "製品名 3 を入力してください ...",
        productPrice3: "製品価格 3",
        enterProductPrice3: "製品価格 3 を入力してください ...",
        productDiscount3: "製品割引 3",
        enterProductDiscount3: "製品 3 の割引率を入力してください ...",
        productQuantity3: "在庫数 3",
        enterProductQuantity3: "製品 3 の在庫数を入力してください ...",
        productName4: "製品名 4",
        enterProductName4: "製品名 4 を入力してください ...",
        productPrice4: "製品価格 4",
        enterProductPrice4: "製品価格 4 を入力してください ...",
        productDiscount4: "製品割引 4",
        enterProductDiscount4: "製品 4 の割引率を入力してください ...",
        productQuantity4: "在庫数 4",
        enterProductQuantity4: "製品 4 の在庫数を入力してください ...",
        productName5: "製品名 5",
        enterProductName5: "製品名 5 を入力してください ...",
        productPrice5: "製品価格 5",
        enterProductPrice5: "製品価格 5 を入力してください ...",
        productDiscount5: "製品割引 5",
        enterProductDiscount5: "製品 5 の割引率を入力してください ...",
        productQuantity5: "在庫数 5",
        enterProductQuantity5: "製品 5 の在庫数を入力してください ...",
        bulkPromotion: "卸売プロモーション",
        enterBulkPromotion: "卸売プロモーションを入力してください ...",
        tenderPromotion: "入札プロモーション",
        enterTenderPromotion: "入札プロモーションを入力してください ...",
        warrantyPrice1: "保証価格 1",
        enterWarrantyPrice1: "保証価格を入力してください ...",
        warrantyPrice2: "保証価格 2",
        enterWarrantyPrice2: "保証価格を入力してください ...",
        warrantyPrice3: "保証価格 3",
        enterWarrantyPrice3: "保証価格を入力してください ...",
        warrantyPrice4: "保証価格 4",
        enterWarrantyPrice4: "保証価格を入力してください ...",
        specification: "仕様",
        enterSpecification: "仕様を入力してください ...",
        specContent: "仕様内容",
        enterSpecContent: "仕様内容を入力してください ...",
        featureDescription: "特徴の説明",
        enterFeatureDescription: "特徴の説明を入力してください ...",
        featureContent: "特徴の内容",
        enterFeatureContent: "特徴の内容を入力してください ...",
        saveChange: "変更を保存",
      };

    default:
      return {
        min2Characters: "Enter at least 2 characters.",
        noNegativeNumber: "Do not enter negative numbers.",
        selectSize: "Please select a suitable size.",
        selectColor: "Please select a suitable color.",
        minPrice: "Enter at least 500 VND.",
        percentageRange: "Enter a percentage from 1 to 100.",
        quantityRange: "Enter a quantity from 1 to 9999.",
        selectCategory: "Please select a suitable category.",
        updateSuccess: "Updated successfully!",
        error: "Something went wrong.",
        title: "Title",
        enterTitle: "Enter title ...",
        productName1: "Product Name 1",
        enterProductName1: "Enter product name 1...",
        productPrice1: "Product Price 1",
        enterProductPrice1: "Enter product price 1...",
        productDiscount1: "Product Discount 1",
        enterProductDiscount1: "Enter product 1 discount percentage ...",
        productQuantity1: "Product Quantity 1",
        enterProductQuantity1: "Enter product 1 quantity in stock...",
        productName2: "Product Name 2",
        enterProductName2: "Enter product name 2...",
        productPrice2: "Product Price 2",
        enterProductPrice2: "Enter product price 2...",
        productDiscount2: "Product Discount 2",
        enterProductDiscount2: "Enter product 2 discount percentage ...",
        productQuantity2: "Product Quantity 2",
        enterProductQuantity2: "Enter product 2 quantity in stock...",
        productName3: "Product Name 3",
        enterProductName3: "Enter product name 3...",
        productPrice3: "Product Price 3",
        enterProductPrice3: "Enter product price 3...",
        productDiscount3: "Product Discount 3",
        enterProductDiscount3: "Enter product 3 discount percentage ...",
        productQuantity3: "Product Quantity 3",
        enterProductQuantity3: "Enter product 3 quantity in stock...",
        productName4: "Product Name 4",
        enterProductName4: "Enter product name 4...",
        productPrice4: "Product Price 4",
        enterProductPrice4: "Enter product price 4...",
        productDiscount4: "Product Discount 4",
        enterProductDiscount4: "Enter product 4 discount percentage ...",
        productQuantity4: "Product Quantity 4",
        enterProductQuantity4: "Enter product 4 quantity in stock...",
        productName5: "Product Name 5",
        enterProductName5: "Enter product name 5...",
        productPrice5: "Product Price 5",
        enterProductPrice5: "Enter product price 5...",
        productDiscount5: "Product Discount 5",
        enterProductDiscount5: "Enter product 5 discount percentage ...",
        productQuantity5: "Product Quantity 5",
        enterProductQuantity5: "Enter product 5 quantity in stock...",
        bulkPromotion: "Bulk Promotion",
        enterBulkPromotion: "Enter bulk promotion ...",
        tenderPromotion: "Tender Promotion",
        enterTenderPromotion: "Enter tender promotion ...",
        warrantyPrice1: "Warranty Price 1",
        enterWarrantyPrice1: "Enter warranty price ...",
        warrantyPrice2: "Warranty Price 2",
        enterWarrantyPrice2: "Enter warranty price ...",
        warrantyPrice3: "Warranty Price 3",
        enterWarrantyPrice3: "Enter warranty price ...",
        warrantyPrice4: "Warranty Price 4",
        enterWarrantyPrice4: "Enter warranty price ...",
        specification: "Specification",
        enterSpecification: "Enter specification ...",
        specContent: "Specification Content",
        enterSpecContent: "Enter specification content ...",
        featureDescription: "Feature Description",
        enterFeatureDescription: "Enter feature description ...",
        featureContent: "Feature Content",
        enterFeatureContent: "Enter feature content ...",
        saveChange: "Save Change",
      };
  }
};

export const getProductDetailAction = (language: string) => {
  switch (language) {
    case "vi":
      return {
        productDetailIdCopied:
          "ID chi tiết sản phẩm đã được sao chép vào clipboard.",
        productDetailDeleted: "Chi tiết sản phẩm đã bị xóa.",
        somethingWentWrong: "Có gì đó sai!",
        openMenu: "Mở menu",
        actions: "Hành động",
        copyId: "Sao chép ID",
        update: "Cập nhật",
        delete: "Xóa",
      };
    case "en":
      return {
        productDetailIdCopied: "Product Detail Id copied to the clipboard.",
        productDetailDeleted: "Product Detail deleted.",
        somethingWentWrong: "Something went wrong!",
        openMenu: "Open menu",
        actions: "Actions",
        copyId: "CopyId",
        update: "Update",
        delete: "Delete",
      };
    case "zh":
      return {
        productDetailIdCopied: "产品详情 ID 已复制到剪贴板。",
        productDetailDeleted: "产品详情已删除。",
        somethingWentWrong: "出错了！",
        openMenu: "打开菜单",
        actions: "操作",
        copyId: "复制ID",
        update: "更新",
        delete: "删除",
      };
    case "fr":
      return {
        productDetailIdCopied:
          "ID des détails du produit copié dans le presse-papiers.",
        productDetailDeleted: "Détail du produit supprimé.",
        somethingWentWrong: "Quelque chose s'est mal passé !",
        openMenu: "Ouvrir le menu",
        actions: "Actions",
        copyId: "Copier l'ID",
        update: "Mettre à jour",
        delete: "Supprimer",
      };
    case "ja":
      return {
        productDetailIdCopied: "製品詳細IDがクリップボードにコピーされました。",
        productDetailDeleted: "製品詳細が削除されました。",
        somethingWentWrong: "エラーが発生しました！",
        openMenu: "メニューを開く",
        actions: "アクション",
        copyId: "IDをコピー",
        update: "更新",
        delete: "削除",
      };
    default:
      return {
        productDetailIdCopied: "Product Detail Id copied to the clipboard.",
        productDetailDeleted: "Product Detail deleted.",
        somethingWentWrong: "Something went wrong!",
        openMenu: "Open menu",
        actions: "Actions",
        copyId: "CopyId",
        update: "Update",
        delete: "Delete",
      };
  }
};

export const getProductDetailClient = (language: string) => {
  switch (language) {
    case "vi":
      return {
        productDetailDeletedSuccessfully:
          "Chi tiết sản phẩm đã xóa thành công.",
        somethingWentWrong: "Có gì đó sai!",
        productDetail: "Chi tiết sản phẩm",
        manageProductDetail: "Quản lý sản phẩm chi tiết",
        addNew: "Thêm mới",
        api: "API",
        apiCallsForProductDetail: "API calls for ProductDetail",
      };
    case "en":
      return {
        productDetailDeletedSuccessfully: "Product Detail deleted successfully",
        somethingWentWrong: "Something went wrong!",
        productDetail: "Product Detail",
        manageProductDetail: "Manage product details",
        addNew: "Add New",
        api: "API",
        apiCallsForProductDetail: "API calls for ProductDetail",
      };
    case "zh":
      return {
        productDetailDeletedSuccessfully: "产品详情已成功删除。",
        somethingWentWrong: "出错了！",
        productDetail: "产品详情",
        manageProductDetail: "管理产品详细信息",
        addNew: "新增",
        api: "API",
        apiCallsForProductDetail: "产品详情的API调用",
      };
    case "fr":
      return {
        productDetailDeletedSuccessfully:
          "Détail du produit supprimé avec succès.",
        somethingWentWrong: "Quelque chose s'est mal passé !",
        productDetail: "Détail du produit",
        manageProductDetail: "Gérer les détails du produit",
        addNew: "Ajouter un nouveau",
        api: "API",
        apiCallsForProductDetail: "Appels API pour le détail du produit",
      };
    case "ja":
      return {
        productDetailDeletedSuccessfully: "製品詳細が正常に削除されました。",
        somethingWentWrong: "エラーが発生しました！",
        productDetail: "製品詳細",
        manageProductDetail: "製品詳細の管理",
        addNew: "新規追加",
        api: "API",
        apiCallsForProductDetail: "製品詳細のAPIコール",
      };
    default:
      return {
        productDetailDeletedSuccessfully: "Product Detail deleted successfully",
        somethingWentWrong: "Something went wrong!",
        productDetail: "Product Detail",
        manageProductDetail: "Manage product details",
        addNew: "Add New",
        api: "API",
        apiCallsForProductDetail: "API calls for ProductDetail",
      };
  }
};

export const getProductDetailFormSchema = (language: string) => {
  switch (language) {
    case "vi":
      return {
        minTwoCharacters: "Nhập ít nhất 2 ký tự.",
        noNegativeNumbers: "Không được nhập số âm.",
        chooseValidSize: "Hãy chọn 1 size phù hợp.",
        chooseValidColor: "Hãy chọn 1 color phù hợp.",
        minAmount: "Hãy nhập ít nhất 500 đồng.",
        percentageRange: "Hãy nhập phần trăm từ 1 đến 100.",
        quantityRange: "Hãy nhập số lượng từ 1 đến 9999.",
        chooseValidCategory: "Hãy chọn 1 category phù hợp.",
      };
    case "en":
      return {
        minTwoCharacters: "Enter at least 2 characters.",
        noNegativeNumbers: "Negative numbers are not allowed.",
        chooseValidSize: "Please choose a valid size.",
        chooseValidColor: "Please choose a valid color.",
        minAmount: "Enter at least 500 VND.",
        percentageRange: "Enter a percentage between 1 and 100.",
        quantityRange: "Enter a quantity between 1 and 9999.",
        chooseValidCategory: "Please choose a valid category.",
      };
    case "zh":
      return {
        minTwoCharacters: "请输入至少2个字符。",
        noNegativeNumbers: "不能输入负数。",
        chooseValidSize: "请选择一个合适的尺寸。",
        chooseValidColor: "请选择一个合适的颜色。",
        minAmount: "请输入至少500越南盾。",
        percentageRange: "请输入1到100之间的百分比。",
        quantityRange: "请输入1到9999之间的数量。",
        chooseValidCategory: "请选择一个合适的分类。",
      };
    case "fr":
      return {
        minTwoCharacters: "Entrez au moins 2 caractères.",
        noNegativeNumbers: "Les nombres négatifs ne sont pas autorisés.",
        chooseValidSize: "Veuillez choisir une taille valide.",
        chooseValidColor: "Veuillez choisir une couleur valide.",
        minAmount: "Entrez au moins 500 VND.",
        percentageRange: "Entrez un pourcentage entre 1 et 100.",
        quantityRange: "Entrez une quantité entre 1 et 9999.",
        chooseValidCategory: "Veuillez choisir une catégorie valide.",
      };
    case "ja":
      return {
        minTwoCharacters: "少なくとも2文字を入力してください。",
        noNegativeNumbers: "負の数は入力できません。",
        chooseValidSize: "適切なサイズを選んでください。",
        chooseValidColor: "適切な色を選んでください。",
        minAmount: "最低500ドンを入力してください。",
        percentageRange: "1から100の間のパーセンテージを入力してください。",
        quantityRange: "1から9999の間の数量を入力してください。",
        chooseValidCategory: "適切なカテゴリを選択してください。",
      };
    default:
      return {
        minTwoCharacters: "Enter at least 2 characters.",
        noNegativeNumbers: "Negative numbers are not allowed.",
        chooseValidSize: "Please choose a valid size.",
        chooseValidColor: "Please choose a valid color.",
        minAmount: "Enter at least 500 VND.",
        percentageRange: "Enter a percentage between 1 and 100.",
        quantityRange: "Enter a quantity between 1 and 9999.",
        chooseValidCategory: "Please choose a valid category.",
      };
  }
};

export const getProductDetailHandle = (language: string) => {
  switch (language) {
    case "vi":
      return {
        editProductDetail: "Chỉnh sửa chi tiết sản phẩm",
        createProductDetail: "Tạo chi tiết sản phẩm",
        editAProductDetail: "Chỉnh sửa một chi tiết sản phẩm",
        addNewProductDetail: "Thêm mới chi tiết sản phẩm",
        saveChanges: "Lưu thay đổi",
        create: "Tạo mới",
        productDetail: "Chi tiết sản phẩm",
        updated: "đã cập nhật",
        created: "đã tạo",
        updatingProductDetail: "Đang cập nhật chi tiết sản phẩm...",
        somethingWentWrong: "Có gì đó sai!",
        productDeleted: "Sản phẩm đã bị xóa.",
      };
    case "en":
      return {
        editProductDetail: "Edit Product Detail",
        createProductDetail: "Create Product Detail",
        editAProductDetail: "Edit a Product Detail",
        addNewProductDetail: "Add a new Product Detail",
        saveChanges: "Save changes",
        create: "Create",
        productDetail: "Product Detail",
        updated: "updated",
        created: "created",
        updatingProductDetail: "Updating product detail...",
        somethingWentWrong: "Something went wrong!",
        productDeleted: "Product deleted.",
      };
    case "zh":
      return {
        editProductDetail: "编辑产品详情",
        createProductDetail: "创建产品详情",
        editAProductDetail: "编辑一个产品详情",
        addNewProductDetail: "添加新的产品详情",
        saveChanges: "保存更改",
        create: "创建",
        productDetail: "产品详情",
        updated: "已更新",
        created: "已创建",
        updatingProductDetail: "正在更新产品详情...",
        somethingWentWrong: "出了点问题！",
        productDeleted: "产品已删除。",
      };
    case "fr":
      return {
        editProductDetail: "Modifier le détail du produit",
        createProductDetail: "Créer le détail du produit",
        editAProductDetail: "Modifier un détail du produit",
        addNewProductDetail: "Ajouter un nouveau détail du produit",
        saveChanges: "Sauvegarder les modifications",
        create: "Créer",
        productDetail: "Détail du produit",
        updated: "mis à jour",
        created: "créé",
        updatingProductDetail: "Mise à jour du détail du produit...",
        somethingWentWrong: "Quelque chose s'est mal passé !",
        productDeleted: "Produit supprimé.",
      };
    case "ja":
      return {
        editProductDetail: "製品詳細を編集",
        createProductDetail: "製品詳細を作成",
        editAProductDetail: "製品詳細を編集する",
        addNewProductDetail: "新しい製品詳細を追加",
        saveChanges: "変更を保存",
        create: "作成",
        productDetail: "製品詳細",
        updated: "更新されました",
        created: "作成されました",
        updatingProductDetail: "製品詳細を更新中...",
        somethingWentWrong: "何かがうまくいかなかった！",
        productDeleted: "製品が削除されました。",
      };
    default:
      return {
        editProductDetail: "Edit Product Detail",
        createProductDetail: "Create Product Detail",
        editAProductDetail: "Edit a Product Detail",
        addNewProductDetail: "Add a new Product Detail",
        saveChanges: "Save changes",
        create: "Create",
        productDetail: "Product Detail",
        updated: "updated",
        created: "created",
        updatingProductDetail: "Updating product detail...",
        somethingWentWrong: "Something went wrong!",
        productDeleted: "Product deleted.",
      };
  }
};

export const getProductDetailForm = (language: string) => {
  switch (language) {
    case "vi":
      return {
        title: "Tiêu đề",
        enterTitle: "Hãy nhập tiêu để dễ dàng lựa chọn khi tạo sản phẩm.",
        enterTitlePlaceholder: "Nhập tiêu đề ...",

        productName1: "Tên sản phẩm 1",
        enterProductName1:
          "Nhập đầy đủ tên sản phẩm. Không bao gồm các loại khác như kích thước...",
        enterProductName1Placeholder: "Nhập tên sản phẩm 1...",

        productPrice1: "Giá sản phẩm 1",
        enterProductPrice1: "Nhập giá của sản phẩm.",
        enterProductPrice1Placeholder: "Nhập giá sản phẩm 1...",

        discountProduct1: "Giảm giá sản phẩm 1",
        discountDescription: "Sản phẩm sẽ giảm giá từ 0% đến 100%.",
        enterDiscountProduct1: "Nhập % giảm sản phẩm 1 ...",

        stockProduct1: "Số lượng còn trong kho 1",
        stockDescription: "Xem thử số lượng sản phẩm còn trong kho bao nhiêu.",
        enterStockProduct1: "Nhập số lượng còn trong kho 1...",

        productName2: "Tên sản phẩm 2",
        enterProductName2Placeholder: "Nhập tên sản phẩm 2...",

        productPrice2: "Giá sản phẩm 2",
        enterProductPrice2Placeholder: "Nhập giá sản phẩm 2...",

        discountProduct2: "Giảm giá sản phẩm 2",
        enterDiscountProduct2: "Nhập % giảm sản phẩm 2 ...",

        stockProduct2: "Số lượng còn trong kho 2",
        enterStockProduct2: "Nhập số lượng còn trong kho 2...",

        productName3: "Tên sản phẩm 3",
        enterProductName3Placeholder: "Nhập tên sản phẩm 3...",

        productPrice3: "Giá sản phẩm 3",
        enterProductPrice3Placeholder: "Nhập giá sản phẩm 3...",

        discountProduct3: "Giảm giá sản phẩm 3",
        enterDiscountProduct3: "Nhập % giảm sản phẩm 3 ...",

        stockProduct3: "Số lượng còn trong kho 3",
        enterStockProduct3: "Nhập số lượng còn trong kho 3...",

        productName4: "Tên sản phẩm 4",
        enterProductName4Placeholder: "Nhập tên sản phẩm 4...",

        productPrice4: "Giá sản phẩm 4",
        enterProductPrice4Placeholder: "Nhập giá sản phẩm 4...",

        discountProduct4: "Giảm giá sản phẩm 4",
        enterDiscountProduct4: "Nhập % giảm sản phẩm 4 ...",

        stockProduct4: "Số lượng còn trong kho 4",
        enterStockProduct4: "Nhập số lượng còn trong kho 4...",

        productName5: "Tên sản phẩm 5",
        enterProductName5Placeholder: "Nhập tên sản phẩm 5...",

        productPrice5: "Giá sản phẩm 5",
        enterProductPrice5Placeholder: "Nhập giá sản phẩm 5...",

        discountProduct5: "Giảm giá sản phẩm 5",
        enterDiscountProduct5: "Nhập % giảm sản phẩm 5 ...",

        stockProduct5: "Số lượng còn trong kho 5",
        enterStockProduct5: "Nhập số lượng còn trong kho 5...",

        wholesaleDiscount: "Khuyến mãi sỉ",
        wholesaleDescription: "Ghi những ưa đãi giành cho khách hàng mua sỉ.",
        enterWholesaleDiscount: "Nhập khuyến mãi sỉ ...",

        contractorDiscount: "Khuyến mãi thầu",
        contractorDescription: "Nhập những ưa đãi giành cho những nhà thầu.",
        enterContractorDiscount: "Nhập khuyến mãi thầu ...",

        warrantyPrice1: "Giá tiền bảo hành 1",
        warrantyDescription:
          "Lưu ý: Sẽ có một vài sản phẩm sẽ bỏ chi phí để bảo hành.",
        enterWarrantyPrice1: "Nhập giá tiền bảo hành ...",

        warrantyPrice2: "Giá tiền bảo hành 2",
        enterWarrantyPrice2: "Nhập giá tiền bảo hành ...",

        warrantyPrice3: "Giá tiền bảo hành 3",
        enterWarrantyPrice3: "Nhập giá tiền bảo hành ...",

        warrantyPrice4: "Giá tiền bảo hành 4",
        enterWarrantyPrice4: "Nhập giá tiền bảo hành ...",

        specifications: "Thông số",
        enterSpecifications:
          "Nhập thông số sản phẩm pin VD: Thời gian sử dụng:",
        enterSpecificationsPlaceholder: "Nhập thông số ...",

        specificationsContent: "Nội dung thông số",
        enterSpecificationsContent: "Nhập nội dung thông số VD: 2400 giờ",
        enterSpecificationsContentPlaceholder: "Nhập nội dung thông số ...",

        featureDescription: "Mô tả tính năng nổi bật",
        featureDescriptionContent:
          "Mô tả những tính năng nổi bật: Vd: Có thể chông nước và ngoài trời.",
        enterFeatureDescription: "Nhập mô tả tính năng nổi bật ...",

        featureContent: "Nội dung tính năng nổi bật",
        featureContentDescription:
          "Hãy một nội dung dài mô tả chi tiết nhất về sản phẩm và liệt kê ưa và nhược điểm.",
        enterFeatureContent: "Nhập nội dung tính năng nổi bật ...",

        productColor1: "Màu sản phẩm 1",
        selectColor: "Select a color",

        productSize1: "Kích cỡ sản phẩm 1",
        selectSize: "Select a size",

        productColor2: "Màu sản phẩm 2",
        productSize2: "Kích cỡ sản phẩm 2",

        productColor3: "Màu sản phẩm 3",
        productSize3: "Kích cỡ sản phẩm 3",

        productColor4: "Màu sản phẩm 4",
        productSize4: "Kích cỡ sản phẩm 4",

        productColor5: "Màu sản phẩm 5",
        productSize5: "Kích cỡ sản phẩm 5",

        category: "Loại",
        selectCategory: "Select a category",
      };
    case "en":
      return {
        title: "Title",
        enterTitle:
          "Please enter the title to easily select when creating the product.",
        enterTitlePlaceholder: "Enter title ...",

        productName1: "Product Name 1",
        enterProductName1:
          "Enter the full name of the product. Exclude other types like size...",
        enterProductName1Placeholder: "Enter product name 1...",

        productPrice1: "Product Price 1",
        enterProductPrice1: "Enter the price of the product.",
        enterProductPrice1Placeholder: "Enter product price 1...",

        discountProduct1: "Discount Product 1",
        discountDescription: "The product will be discounted from 0% to 100%.",
        enterDiscountProduct1: "Enter discount percentage for product 1 ...",

        stockProduct1: "Stock remaining in warehouse 1",
        stockDescription: "Check the remaining stock quantity for the product.",
        enterStockProduct1: "Enter stock quantity for product 1...",

        productName2: "Product Name 2",
        enterProductName2Placeholder: "Enter product name 2...",

        productPrice2: "Product Price 2",
        enterProductPrice2Placeholder: "Enter product price 2...",

        discountProduct2: "Discount Product 2",
        enterDiscountProduct2: "Enter discount percentage for product 2 ...",

        stockProduct2: "Stock remaining in warehouse 2",
        enterStockProduct2: "Enter stock quantity for product 2...",

        productName3: "Product Name 3",
        enterProductName3Placeholder: "Enter product name 3...",

        productPrice3: "Product Price 3",
        enterProductPrice3Placeholder: "Enter product price 3...",

        discountProduct3: "Discount Product 3",
        enterDiscountProduct3: "Enter discount percentage for product 3 ...",

        stockProduct3: "Stock remaining in warehouse 3",
        enterStockProduct3: "Enter stock quantity for product 3...",

        productName4: "Product Name 4",
        enterProductName4Placeholder: "Enter product name 4...",

        productPrice4: "Product Price 4",
        enterProductPrice4Placeholder: "Enter product price 4...",

        discountProduct4: "Discount Product 4",
        enterDiscountProduct4: "Enter discount percentage for product 4 ...",

        stockProduct4: "Stock remaining in warehouse 4",
        enterStockProduct4: "Enter stock quantity for product 4...",

        productName5: "Product Name 5",
        enterProductName5Placeholder: "Enter product name 5...",

        productPrice5: "Product Price 5",
        enterProductPrice5Placeholder: "Enter product price 5...",

        discountProduct5: "Discount Product 5",
        enterDiscountProduct5: "Enter discount percentage for product 5 ...",

        stockProduct5: "Stock remaining in warehouse 5",
        enterStockProduct5: "Enter stock quantity for product 5...",

        wholesaleDiscount: "Wholesale Discount",
        wholesaleDescription: "Record the benefits for wholesale customers.",
        enterWholesaleDiscount: "Enter wholesale discount ...",

        contractorDiscount: "Contractor Discount",
        contractorDescription: "Enter the benefits for contractors.",
        enterContractorDiscount: "Enter contractor discount ...",

        warrantyPrice1: "Warranty Price 1",
        warrantyDescription: "Note: Some products may have warranty costs.",
        enterWarrantyPrice1: "Enter warranty price ...",

        warrantyPrice2: "Warranty Price 2",
        enterWarrantyPrice2: "Enter warranty price ...",

        warrantyPrice3: "Warranty Price 3",
        enterWarrantyPrice3: "Enter warranty price ...",

        warrantyPrice4: "Warranty Price 4",
        enterWarrantyPrice4: "Enter warranty price ...",

        specifications: "Specifications",
        enterSpecifications: "Enter product specifications like: Usage time:",
        enterSpecificationsPlaceholder: "Enter specifications ...",

        specificationsContent: "Specifications Content",
        enterSpecificationsContent: "Enter content like: 2400 hours",
        enterSpecificationsContentPlaceholder:
          "Enter specifications content ...",

        featureDescription: "Feature Description",
        featureDescriptionContent:
          "Describe the prominent features: Ex: Waterproof and outdoor capable.",
        enterFeatureDescription: "Enter feature description ...",

        featureContent: "Feature Content",
        featureContentDescription:
          "Provide a long description with product details and list pros and cons.",
        enterFeatureContent: "Enter feature content ...",

        productColor1: "Product Color 1",
        selectColor: "Select a color",

        productSize1: "Product Size 1",
        selectSize: "Select a size",

        productColor2: "Product Color 2",
        productSize2: "Product Size 2",

        productColor3: "Product Color 3",
        productSize3: "Product Size 3",

        productColor4: "Product Color 4",
        productSize4: "Product Size 4",

        productColor5: "Product Color 5",
        productSize5: "Product Size 5",

        category: "Category",
        selectCategory: "Select a category",
      };
    case "zh":
      return {
        title: "标题",
        enterTitle: "请输入标题，以便在创建产品时轻松选择。",
        enterTitlePlaceholder: "请输入标题...",

        productName1: "产品名称 1",
        enterProductName1: "请输入产品的完整名称。不要包括其他类型，如尺寸等。",
        enterProductName1Placeholder: "请输入产品名称 1...",

        productPrice1: "产品价格 1",
        enterProductPrice1: "请输入产品的价格。",
        enterProductPrice1Placeholder: "请输入产品价格 1...",

        discountProduct1: "产品 1 折扣",
        discountDescription: "产品将折扣0%至100%。",
        enterDiscountProduct1: "请输入产品 1 的折扣百分比...",

        stockProduct1: "仓库中剩余库存 1",
        stockDescription: "检查产品的剩余库存数量。",
        enterStockProduct1: "请输入产品 1 的库存数量...",

        productName2: "产品名称 2",
        enterProductName2Placeholder: "请输入产品名称 2...",

        productPrice2: "产品价格 2",
        enterProductPrice2Placeholder: "请输入产品价格 2...",

        discountProduct2: "产品 2 折扣",
        enterDiscountProduct2: "请输入产品 2 的折扣百分比...",

        stockProduct2: "仓库中剩余库存 2",
        enterStockProduct2: "请输入产品 2 的库存数量...",

        productName3: "产品名称 3",
        enterProductName3Placeholder: "请输入产品名称 3...",

        productPrice3: "产品价格 3",
        enterProductPrice3Placeholder: "请输入产品价格 3...",

        discountProduct3: "产品 3 折扣",
        enterDiscountProduct3: "请输入产品 3 的折扣百分比...",

        stockProduct3: "仓库中剩余库存 3",
        enterStockProduct3: "请输入产品 3 的库存数量...",

        productName4: "产品名称 4",
        enterProductName4Placeholder: "请输入产品名称 4...",

        productPrice4: "产品价格 4",
        enterProductPrice4Placeholder: "请输入产品价格 4...",

        discountProduct4: "产品 4 折扣",
        enterDiscountProduct4: "请输入产品 4 的折扣百分比...",

        stockProduct4: "仓库中剩余库存 4",
        enterStockProduct4: "请输入产品 4 的库存数量...",

        productName5: "产品名称 5",
        enterProductName5Placeholder: "请输入产品名称 5...",

        productPrice5: "产品价格 5",
        enterProductPrice5Placeholder: "请输入产品价格 5...",

        discountProduct5: "产品 5 折扣",
        enterDiscountProduct5: "请输入产品 5 的折扣百分比...",

        stockProduct5: "仓库中剩余库存 5",
        enterStockProduct5: "请输入产品 5 的库存数量...",

        wholesaleDiscount: "批发折扣",
        wholesaleDescription: "记录批发客户的优惠。",
        enterWholesaleDiscount: "请输入批发折扣...",

        contractorDiscount: "承包商折扣",
        contractorDescription: "请输入承包商的优惠。",
        enterContractorDiscount: "请输入承包商折扣...",

        warrantyPrice1: "保修价格 1",
        warrantyDescription: "注意：一些产品可能会有保修费用。",
        enterWarrantyPrice1: "请输入保修价格...",

        warrantyPrice2: "保修价格 2",
        enterWarrantyPrice2: "请输入保修价格...",

        warrantyPrice3: "保修价格 3",
        enterWarrantyPrice3: "请输入保修价格...",

        warrantyPrice4: "保修价格 4",
        enterWarrantyPrice4: "请输入保修价格...",

        specifications: "规格",
        enterSpecifications: "请输入产品规格，例如：使用时间：",
        enterSpecificationsPlaceholder: "请输入规格...",

        specificationsContent: "规格内容",
        enterSpecificationsContent: "请输入内容，例如：2400小时。",
        enterSpecificationsContentPlaceholder: "请输入规格内容...",

        featureDescription: "功能描述",
        featureDescriptionContent:
          "描述产品的突出特点，例如：防水和可户外使用。",
        enterFeatureDescription: "请输入功能描述...",

        featureContent: "功能内容",
        featureContentDescription: "提供产品详细描述并列出优缺点。",
        enterFeatureContent: "请输入功能内容...",

        productColor1: "产品颜色 1",
        selectColor: "选择颜色",

        productSize1: "产品尺寸 1",
        selectSize: "选择尺寸",

        productColor2: "产品颜色 2",
        productSize2: "产品尺寸 2",

        productColor3: "产品颜色 3",
        productSize3: "产品尺寸 3",

        productColor4: "产品颜色 4",
        productSize4: "产品尺寸 4",

        productColor5: "产品颜色 5",
        productSize5: "产品尺寸 5",

        category: "类别",
        selectCategory: "选择类别",
      };
    case "fr":
      return {
        title: "Titre",
        enterTitle:
          "Veuillez entrer le titre pour le sélectionner facilement lors de la création du produit.",
        enterTitlePlaceholder: "Entrez le titre ...",

        productName1: "Nom du produit 1",
        enterProductName1:
          "Entrez le nom complet du produit. N'incluez pas d'autres types comme la taille ...",
        enterProductName1Placeholder: "Entrez le nom du produit 1...",

        productPrice1: "Prix du produit 1",
        enterProductPrice1: "Entrez le prix du produit.",
        enterProductPrice1Placeholder: "Entrez le prix du produit 1...",

        discountProduct1: "Remise produit 1",
        discountDescription: "Le produit sera réduit de 0% à 100%.",
        enterDiscountProduct1:
          "Entrez le pourcentage de remise pour le produit 1 ...",

        stockProduct1: "Stock restant dans l'entrepôt 1",
        stockDescription:
          "Vérifiez la quantité restante en stock pour le produit.",
        enterStockProduct1: "Entrez la quantité en stock pour le produit 1...",

        productName2: "Nom du produit 2",
        enterProductName2Placeholder: "Entrez le nom du produit 2...",

        productPrice2: "Prix du produit 2",
        enterProductPrice2Placeholder: "Entrez le prix du produit 2...",

        discountProduct2: "Remise produit 2",
        enterDiscountProduct2:
          "Entrez le pourcentage de remise pour le produit 2 ...",

        stockProduct2: "Stock restant dans l'entrepôt 2",
        enterStockProduct2: "Entrez la quantité en stock pour le produit 2...",

        productName3: "Nom du produit 3",
        enterProductName3Placeholder: "Entrez le nom du produit 3...",

        productPrice3: "Prix du produit 3",
        enterProductPrice3Placeholder: "Entrez le prix du produit 3...",

        discountProduct3: "Remise produit 3",
        enterDiscountProduct3:
          "Entrez le pourcentage de remise pour le produit 3 ...",

        stockProduct3: "Stock restant dans l'entrepôt 3",
        enterStockProduct3: "Entrez la quantité en stock pour le produit 3...",

        productName4: "Nom du produit 4",
        enterProductName4Placeholder: "Entrez le nom du produit 4...",

        productPrice4: "Prix du produit 4",
        enterProductPrice4Placeholder: "Entrez le prix du produit 4...",

        discountProduct4: "Remise produit 4",
        enterDiscountProduct4:
          "Entrez le pourcentage de remise pour le produit 4 ...",

        stockProduct4: "Stock restant dans l'entrepôt 4",
        enterStockProduct4: "Entrez la quantité en stock pour le produit 4...",

        productName5: "Nom du produit 5",
        enterProductName5Placeholder: "Entrez le nom du produit 5...",

        productPrice5: "Prix du produit 5",
        enterProductPrice5Placeholder: "Entrez le prix du produit 5...",

        discountProduct5: "Remise produit 5",
        enterDiscountProduct5:
          "Entrez le pourcentage de remise pour le produit 5 ...",

        stockProduct5: "Stock restant dans l'entrepôt 5",
        enterStockProduct5: "Entrez la quantité en stock pour le produit 5...",

        wholesaleDiscount: "Remise en gros",
        wholesaleDescription:
          "Enregistrez les avantages pour les clients en gros.",
        enterWholesaleDiscount: "Entrez la remise en gros ...",

        contractorDiscount: "Remise pour les entrepreneurs",
        contractorDescription: "Entrez les avantages pour les entrepreneurs.",
        enterContractorDiscount: "Entrez la remise pour les entrepreneurs ...",

        warrantyPrice1: "Prix de la garantie 1",
        warrantyDescription:
          "Note : Certains produits peuvent avoir des frais de garantie.",
        enterWarrantyPrice1: "Entrez le prix de la garantie ...",

        warrantyPrice2: "Prix de la garantie 2",
        enterWarrantyPrice2: "Entrez le prix de la garantie ...",

        warrantyPrice3: "Prix de la garantie 3",
        enterWarrantyPrice3: "Entrez le prix de la garantie ...",

        warrantyPrice4: "Prix de la garantie 4",
        enterWarrantyPrice4: "Entrez le prix de la garantie ...",

        specifications: "Spécifications",
        enterSpecifications:
          "Entrez les spécifications du produit, par exemple : Temps d'utilisation :",
        enterSpecificationsPlaceholder: "Entrez les spécifications ...",

        specificationsContent: "Contenu des spécifications",
        enterSpecificationsContent: "Entrez le contenu comme : 2400 heures.",
        enterSpecificationsContentPlaceholder:
          "Entrez le contenu des spécifications ...",

        featureDescription: "Description des caractéristiques",
        featureDescriptionContent:
          "Décrivez les caractéristiques principales : Ex : Étanchéité et utilisable en extérieur.",
        enterFeatureDescription:
          "Entrez la description des caractéristiques ...",

        featureContent: "Contenu des caractéristiques",
        featureContentDescription:
          "Fournissez une longue description avec les détails du produit et listez les avantages et inconvénients.",
        enterFeatureContent: "Entrez le contenu des caractéristiques ...",

        productColor1: "Couleur du produit 1",
        selectColor: "Sélectionner une couleur",

        productSize1: "Taille du produit 1",
        selectSize: "Sélectionner une taille",

        productColor2: "Couleur du produit 2",
        productSize2: "Taille du produit 2",

        productColor3: "Couleur du produit 3",
        productSize3: "Taille du produit 3",

        productColor4: "Couleur du produit 4",
        productSize4: "Taille du produit 4",

        productColor5: "Couleur du produit 5",
        productSize5: "Taille du produit 5",

        category: "Catégorie",
        selectCategory: "Sélectionner une catégorie",
      };
    case "ja":
      return {
        title: "タイトル",
        enterTitle:
          "製品を作成する際に簡単に選択できるようにタイトルを入力してください。",
        enterTitlePlaceholder: "タイトルを入力 ...",

        productName1: "製品名 1",
        enterProductName1:
          "製品のフルネームを入力してください。他のタイプ（サイズなど）は含めないでください。",
        enterProductName1Placeholder: "製品名 1 を入力 ...",

        productPrice1: "製品価格 1",
        enterProductPrice1: "製品の価格を入力してください。",
        enterProductPrice1Placeholder: "製品価格 1 を入力 ...",

        discountProduct1: "製品割引 1",
        discountDescription: "製品は0％から100％の範囲で割引されます。",
        enterDiscountProduct1: "製品 1 の割引率を入力 ...",

        stockProduct1: "在庫残量 1",
        stockDescription: "製品の残り在庫数を確認してください。",
        enterStockProduct1: "製品 1 の在庫数を入力 ...",

        productName2: "製品名 2",
        enterProductName2Placeholder: "製品名 2 を入力 ...",

        productPrice2: "製品価格 2",
        enterProductPrice2Placeholder: "製品価格 2 を入力 ...",

        discountProduct2: "製品割引 2",
        enterDiscountProduct2: "製品 2 の割引率を入力 ...",

        stockProduct2: "在庫残量 2",
        enterStockProduct2: "製品 2 の在庫数を入力 ...",

        productName3: "製品名 3",
        enterProductName3Placeholder: "製品名 3 を入力 ...",

        productPrice3: "製品価格 3",
        enterProductPrice3Placeholder: "製品価格 3 を入力 ...",

        discountProduct3: "製品割引 3",
        enterDiscountProduct3: "製品 3 の割引率を入力 ...",

        stockProduct3: "在庫残量 3",
        enterStockProduct3: "製品 3 の在庫数を入力 ...",

        productName4: "製品名 4",
        enterProductName4Placeholder: "製品名 4 を入力 ...",

        productPrice4: "製品価格 4",
        enterProductPrice4Placeholder: "製品価格 4 を入力 ...",

        discountProduct4: "製品割引 4",
        enterDiscountProduct4: "製品 4 の割引率を入力 ...",

        stockProduct4: "在庫残量 4",
        enterStockProduct4: "製品 4 の在庫数を入力 ...",

        productName5: "製品名 5",
        enterProductName5Placeholder: "製品名 5 を入力 ...",

        productPrice5: "製品価格 5",
        enterProductPrice5Placeholder: "製品価格 5 を入力 ...",

        discountProduct5: "製品割引 5",
        enterDiscountProduct5: "製品 5 の割引率を入力 ...",

        stockProduct5: "在庫残量 5",
        enterStockProduct5: "製品 5 の在庫数を入力 ...",

        wholesaleDiscount: "卸売割引",
        wholesaleDescription: "卸売顧客への特典を記録します。",
        enterWholesaleDiscount: "卸売割引を入力 ...",

        contractorDiscount: "契約者割引",
        contractorDescription: "契約者への特典を入力します。",
        enterContractorDiscount: "契約者割引を入力 ...",

        warrantyPrice1: "保証価格 1",
        warrantyDescription: "注意: 一部の製品には保証料金がかかります。",
        enterWarrantyPrice1: "保証価格を入力 ...",

        warrantyPrice2: "保証価格 2",
        enterWarrantyPrice2: "保証価格を入力 ...",

        warrantyPrice3: "保証価格 3",
        enterWarrantyPrice3: "保証価格を入力 ...",

        warrantyPrice4: "保証価格 4",
        enterWarrantyPrice4: "保証価格を入力 ...",

        specifications: "仕様",
        enterSpecifications: "製品仕様を入力してください。例: 使用時間:",
        enterSpecificationsPlaceholder: "仕様を入力 ...",

        specificationsContent: "仕様内容",
        enterSpecificationsContent: "例: 2400時間などの内容を入力。",
        enterSpecificationsContentPlaceholder: "仕様内容を入力 ...",

        featureDescription: "特徴の説明",
        featureDescriptionContent:
          "目立つ特徴を説明します。例: 防水で屋外使用可能。",
        enterFeatureDescription: "特徴の説明を入力 ...",

        featureContent: "特徴の内容",
        featureContentDescription:
          "製品の詳細な説明を提供し、長所と短所をリストアップします。",
        enterFeatureContent: "特徴の内容を入力 ...",

        productColor1: "製品色 1",
        selectColor: "色を選択",

        productSize1: "製品サイズ 1",
        selectSize: "サイズを選択",

        productColor2: "製品色 2",
        productSize2: "製品サイズ 2",

        productColor3: "製品色 3",
        productSize3: "製品サイズ 3",

        productColor4: "製品色 4",
        productSize4: "製品サイズ 4",

        productColor5: "製品色 5",
        productSize5: "製品サイズ 5",

        category: "カテゴリー",
        selectCategory: "カテゴリーを選択",
      };

    default:
      return {
        title: "Title",
        enterTitle:
          "Please enter the title to easily select when creating the product.",
        enterTitlePlaceholder: "Enter title ...",

        productName1: "Product Name 1",
        enterProductName1:
          "Enter the full name of the product. Exclude other types like size...",
        enterProductName1Placeholder: "Enter product name 1...",

        productPrice1: "Product Price 1",
        enterProductPrice1: "Enter the price of the product.",
        enterProductPrice1Placeholder: "Enter product price 1...",

        discountProduct1: "Discount Product 1",
        discountDescription: "The product will be discounted from 0% to 100%.",
        enterDiscountProduct1: "Enter discount percentage for product 1 ...",

        stockProduct1: "Stock remaining in warehouse 1",
        stockDescription: "Check the remaining stock quantity for the product.",
        enterStockProduct1: "Enter stock quantity for product 1...",

        productName2: "Product Name 2",
        enterProductName2Placeholder: "Enter product name 2...",

        productPrice2: "Product Price 2",
        enterProductPrice2Placeholder: "Enter product price 2...",

        discountProduct2: "Discount Product 2",
        enterDiscountProduct2: "Enter discount percentage for product 2 ...",

        stockProduct2: "Stock remaining in warehouse 2",
        enterStockProduct2: "Enter stock quantity for product 2...",

        productName3: "Product Name 3",
        enterProductName3Placeholder: "Enter product name 3...",

        productPrice3: "Product Price 3",
        enterProductPrice3Placeholder: "Enter product price 3...",

        discountProduct3: "Discount Product 3",
        enterDiscountProduct3: "Enter discount percentage for product 3 ...",

        stockProduct3: "Stock remaining in warehouse 3",
        enterStockProduct3: "Enter stock quantity for product 3...",

        productName4: "Product Name 4",
        enterProductName4Placeholder: "Enter product name 4...",

        productPrice4: "Product Price 4",
        enterProductPrice4Placeholder: "Enter product price 4...",

        discountProduct4: "Discount Product 4",
        enterDiscountProduct4: "Enter discount percentage for product 4 ...",

        stockProduct4: "Stock remaining in warehouse 4",
        enterStockProduct4: "Enter stock quantity for product 4...",

        productName5: "Product Name 5",
        enterProductName5Placeholder: "Enter product name 5...",

        productPrice5: "Product Price 5",
        enterProductPrice5Placeholder: "Enter product price 5...",

        discountProduct5: "Discount Product 5",
        enterDiscountProduct5: "Enter discount percentage for product 5 ...",

        stockProduct5: "Stock remaining in warehouse 5",
        enterStockProduct5: "Enter stock quantity for product 5...",

        wholesaleDiscount: "Wholesale Discount",
        wholesaleDescription: "Record the benefits for wholesale customers.",
        enterWholesaleDiscount: "Enter wholesale discount ...",

        contractorDiscount: "Contractor Discount",
        contractorDescription: "Enter the benefits for contractors.",
        enterContractorDiscount: "Enter contractor discount ...",

        warrantyPrice1: "Warranty Price 1",
        warrantyDescription: "Note: Some products may have warranty costs.",
        enterWarrantyPrice1: "Enter warranty price ...",

        warrantyPrice2: "Warranty Price 2",
        enterWarrantyPrice2: "Enter warranty price ...",

        warrantyPrice3: "Warranty Price 3",
        enterWarrantyPrice3: "Enter warranty price ...",

        warrantyPrice4: "Warranty Price 4",
        enterWarrantyPrice4: "Enter warranty price ...",

        specifications: "Specifications",
        enterSpecifications: "Enter product specifications like: Usage time:",
        enterSpecificationsPlaceholder: "Enter specifications ...",

        specificationsContent: "Specifications Content",
        enterSpecificationsContent: "Enter content like: 2400 hours",
        enterSpecificationsContentPlaceholder:
          "Enter specifications content ...",

        featureDescription: "Feature Description",
        featureDescriptionContent:
          "Describe the prominent features: Ex: Waterproof and outdoor capable.",
        enterFeatureDescription: "Enter feature description ...",

        featureContent: "Feature Content",
        featureContentDescription:
          "Provide a long description with product details and list pros and cons.",
        enterFeatureContent: "Enter feature content ...",

        productColor1: "Product Color 1",
        selectColor: "Select a color",

        productSize1: "Product Size 1",
        selectSize: "Select a size",

        productColor2: "Product Color 2",
        productSize2: "Product Size 2",

        productColor3: "Product Color 3",
        productSize3: "Product Size 3",

        productColor4: "Product Color 4",
        productSize4: "Product Size 4",

        productColor5: "Product Color 5",
        productSize5: "Product Size 5",

        category: "Category",
        selectCategory: "Select a category",
      };
  }
};

export function getColorEditRow(language: string) {
  switch (language) {
    case "vi":
      return {
        notFound: "Không tìm thấy!",
        edit: "Chỉnh sửa",
        editExisting: "Chỉnh sửa một cái đã có",
      };
    case "en":
      return {
        notFound: "Not found!",
        edit: "Edit",
        editExisting: "Edit an existing",
      };
    case "zh":
      return {
        notFound: "未找到！",
        edit: "编辑",
        editExisting: "编辑现有的",
      };
    case "fr":
      return {
        notFound: "Non trouvé !",
        edit: "Modifier",
        editExisting: "Modifier un existant",
      };
    case "ja":
      return {
        notFound: "見つかりません！",
        edit: "編集",
        editExisting: "既存の編集",
      };
    default:
      return {
        notFound: "Not found!",
        edit: "Edit",
        editExisting: "Edit an existing",
      };
  }
}

export function getColorNameFormSheet(language: string) {
  switch (language) {
    case "vi":
      return {
        minLength2: "Nhập ít nhất 2 ký tự.",
        updateSuccess: "Cập nhật thành công!",
        somethingWrong: "Something went wrong!",
        productName: "Tên sản phẩm",
        enterProductName: "Nhập tên ...",
        color: "Màu",
        enterColor: "Enter color ...",
        saveChange: "Save Change",
      };
    case "en":
      return {
        minLength2: "Enter at least 2 characters.",
        updateSuccess: "Update successful!",
        somethingWrong: "Something went wrong!",
        productName: "Product Name",
        enterProductName: "Enter name ...",
        color: "Color",
        enterColor: "Enter color ...",
        saveChange: "Save Change",
      };
    case "zh":
      return {
        minLength2: "至少输入2个字符。",
        updateSuccess: "更新成功！",
        somethingWrong: "出了点问题！",
        productName: "产品名称",
        enterProductName: "输入名称 ...",
        color: "颜色",
        enterColor: "输入颜色 ...",
        saveChange: "保存更改",
      };
    case "fr":
      return {
        minLength2: "Entrez au moins 2 caractères.",
        updateSuccess: "Mise à jour réussie !",
        somethingWrong: "Quelque chose a mal tourné !",
        productName: "Nom du produit",
        enterProductName: "Entrez le nom ...",
        color: "Couleur",
        enterColor: "Entrez la couleur ...",
        saveChange: "Sauvegarder les modifications",
      };
    case "ja":
      return {
        minLength2: "2文字以上を入力してください。",
        updateSuccess: "更新成功！",
        somethingWrong: "何かがうまくいきませんでした！",
        productName: "商品名",
        enterProductName: "名前を入力 ...",
        color: "色",
        enterColor: "色を入力 ...",
        saveChange: "変更を保存",
      };
    default:
      return {
        minLength2: "Enter at least 2 characters.",
        updateSuccess: "Update successful!",
        somethingWrong: "Something went wrong!",
        productName: "Product Name",
        enterProductName: "Enter name ...",
        color: "Color",
        enterColor: "Enter color ...",
        saveChange: "Save Change",
      };
  }
}

export function getColorActions(language: string) {
  switch (language) {
    case "vi":
      return {
        colorIdCopied: "ID màu đã được sao chép vào clipboard.",
        colorDeleted: "Màu đã bị xóa.",
        somethingWrong: "Something went wrong!",
        openMenu: "Mở menu",
        actions: "Hành động",
        copyId: "Sao chép ID",
        update: "Cập nhật",
        delete: "Xóa",
      };
    case "en":
      return {
        colorIdCopied: "Color Id copied to the clipboard.",
        colorDeleted: "Color deleted.",
        somethingWrong: "Something went wrong!",
        openMenu: "Open menu",
        actions: "Actions",
        copyId: "Copy Id",
        update: "Update",
        delete: "Delete",
      };
    case "zh":
      return {
        colorIdCopied: "颜色ID已复制到剪贴板。",
        colorDeleted: "颜色已删除。",
        somethingWrong: "出了点问题！",
        openMenu: "打开菜单",
        actions: "操作",
        copyId: "复制ID",
        update: "更新",
        delete: "删除",
      };
    case "fr":
      return {
        colorIdCopied: "L'ID de couleur a été copié dans le presse-papiers.",
        colorDeleted: "Couleur supprimée.",
        somethingWrong: "Quelque chose a mal tourné !",
        openMenu: "Ouvrir le menu",
        actions: "Actions",
        copyId: "Copier l'ID",
        update: "Mettre à jour",
        delete: "Supprimer",
      };
    case "ja":
      return {
        colorIdCopied: "カラーIDがクリップボードにコピーされました。",
        colorDeleted: "カラーが削除されました。",
        somethingWrong: "何かがうまくいきませんでした！",
        openMenu: "メニューを開く",
        actions: "アクション",
        copyId: "IDをコピー",
        update: "更新",
        delete: "削除",
      };
    default:
      return {
        colorIdCopied: "Color Id copied to the clipboard.",
        colorDeleted: "Color deleted.",
        somethingWrong: "Something went wrong!",
        openMenu: "Open menu",
        actions: "Actions",
        copyId: "Copy Id",
        update: "Update",
        delete: "Delete",
      };
  }
}

export function getColorClient(language: string) {
  switch (language) {
    case "vi":
      return {
        colorDeletedSuccessfully: "Màu đã xóa thành công.",
        somethingWrong: "Something went wrong!",
        color: "Màu",
        manageStoreColors: "Quản lý màu cửa hàng",
        addNew: "Thêm mới",
        api: "API",
        apiCallsForColor: "API gọi cho Màu",
      };
    case "en":
      return {
        colorDeletedSuccessfully: "Color deleted successfully",
        somethingWrong: "Something went wrong!",
        color: "Color",
        manageStoreColors: "Manage Store Colors",
        addNew: "Add New",
        api: "API",
        apiCallsForColor: "API calls for Color",
      };
    case "zh":
      return {
        colorDeletedSuccessfully: "颜色删除成功",
        somethingWrong: "出了点问题！",
        color: "颜色",
        manageStoreColors: "管理商店颜色",
        addNew: "新增",
        api: "API",
        apiCallsForColor: "颜色的API调用",
      };
    case "fr":
      return {
        colorDeletedSuccessfully: "Couleur supprimée avec succès",
        somethingWrong: "Quelque chose a mal tourné !",
        color: "Couleur",
        manageStoreColors: "Gérer les couleurs du magasin",
        addNew: "Ajouter nouveau",
        api: "API",
        apiCallsForColor: "Appels API pour la couleur",
      };
    case "ja":
      return {
        colorDeletedSuccessfully: "カラーが正常に削除されました",
        somethingWrong: "何かがうまくいきませんでした！",
        color: "カラー",
        manageStoreColors: "店舗のカラー管理",
        addNew: "新規追加",
        api: "API",
        apiCallsForColor: "カラーのAPI呼び出し",
      };
    default:
      return {
        colorDeletedSuccessfully: "Color deleted successfully",
        somethingWrong: "Something went wrong!",
        color: "Color",
        manageStoreColors: "Manage Store Colors",
        addNew: "Add New",
        api: "API",
        apiCallsForColor: "API calls for Color",
      };
  }
}

export function getColorForm(language: string) {
  switch (language) {
    case "vi":
      return {
        editColor: "Chỉnh sửa màu",
        createColor: "Tạo màu",
        editAColor: "Chỉnh sửa một màu",
        addNewColor: "Thêm màu mới",
        saveChanges: "Lưu thay đổi",
        create: "Tạo",
        enterAtLeast2Characters: "Nhập ít nhất 2 ký tự.",
        enterValidHexCode: "Hãy nhập mã hex hợp lệ.",
        color: "Màu",
        updated: "Đã cập nhật",
        created: "Đã tạo",
        updatingColor: "Đang cập nhật màu...",
        somethingWrong: "Có gì đó không đúng!",
        colorDeleted: "Màu đã bị xóa.",
        name: "Tên",
        colorName: "Tên của màu sắc.",
        enterName: "Nhập tên ...",
        colorDescription:
          "Để chọn màu chính xác hãy biết được mã màu hoặc tìm trên mạng màu có code rgb, #...",
        enterColor: "Nhập màu ...",
      };
    case "en":
      return {
        editColor: "Edit color",
        createColor: "Create color",
        editAColor: "Edit a color",
        addNewColor: "Add a new color",
        saveChanges: "Save changes",
        create: "Create",
        enterAtLeast2Characters: "Enter at least 2 characters.",
        enterValidHexCode: "Please enter a valid hex code.",
        color: "Color",
        updated: "Updated",
        created: "Created",
        updatingColor: "Updating color...",
        somethingWrong: "Something went wrong!",
        colorDeleted: "Color deleted.",
        name: "Name",
        colorName: "Color name.",
        enterName: "Enter name ...",
        colorDescription:
          "To choose the correct color, know its hex code or search online for the color with rgb code, #...",
        enterColor: "Enter color ...",
      };
    case "zh":
      return {
        editColor: "编辑颜色",
        createColor: "创建颜色",
        editAColor: "编辑颜色",
        addNewColor: "添加新颜色",
        saveChanges: "保存更改",
        create: "创建",
        enterAtLeast2Characters: "请输入至少2个字符。",
        enterValidHexCode: "请输入有效的十六进制代码。",
        color: "颜色",
        updated: "已更新",
        created: "已创建",
        updatingColor: "正在更新颜色...",
        somethingWrong: "出了点问题！",
        colorDeleted: "颜色已删除。",
        name: "名称",
        colorName: "颜色名称。",
        enterName: "输入名称 ...",
        colorDescription:
          "要选择正确的颜色，请知道它的十六进制代码或在网上查找rgb代码或# ...的颜色。",
        enterColor: "输入颜色 ...",
      };
    case "fr":
      return {
        editColor: "Modifier la couleur",
        createColor: "Créer une couleur",
        editAColor: "Modifier une couleur",
        addNewColor: "Ajouter une nouvelle couleur",
        saveChanges: "Sauvegarder les modifications",
        create: "Créer",
        enterAtLeast2Characters: "Entrez au moins 2 caractères.",
        enterValidHexCode: "Veuillez entrer un code hex valide.",
        color: "Couleur",
        updated: "Mis à jour",
        created: "Créé",
        updatingColor: "Mise à jour de la couleur...",
        somethingWrong: "Quelque chose a mal tourné !",
        colorDeleted: "Couleur supprimée.",
        name: "Nom",
        colorName: "Nom de la couleur.",
        enterName: "Entrez le nom ...",
        colorDescription:
          "Pour choisir la couleur correcte, connaissez son code hex ou recherchez en ligne la couleur avec le code rgb, # ...",
        enterColor: "Entrez la couleur ...",
      };
    case "ja":
      return {
        editColor: "カラーを編集",
        createColor: "カラーを作成",
        editAColor: "カラーを編集",
        addNewColor: "新しいカラーを追加",
        saveChanges: "変更を保存",
        create: "作成",
        enterAtLeast2Characters: "最低2文字を入力してください。",
        enterValidHexCode: "有効な16進コードを入力してください。",
        color: "カラー",
        updated: "更新されました",
        created: "作成されました",
        updatingColor: "カラーを更新中...",
        somethingWrong: "何か問題が発生しました！",
        colorDeleted: "カラーが削除されました。",
        name: "名前",
        colorName: "カラーの名前。",
        enterName: "名前を入力 ...",
        colorDescription:
          "正しいカラーを選ぶには、16進コードを知っているか、オンラインでrgbコードや#...のカラーを検索してください。",
        enterColor: "カラーを入力 ...",
      };
    default:
      return {
        editColor: "Edit color",
        createColor: "Create color",
        editAColor: "Edit a color",
        addNewColor: "Add a new color",
        saveChanges: "Save changes",
        create: "Create",
        enterAtLeast2Characters: "Enter at least 2 characters.",
        enterValidHexCode: "Please enter a valid hex code.",
        color: "Color",
        updated: "Updated",
        created: "Created",
        updatingColor: "Updating color...",
        somethingWrong: "Something went wrong!",
        colorDeleted: "Color deleted.",
        name: "Name",
        colorName: "Color name.",
        enterName: "Enter name ...",
        colorDescription:
          "To choose the correct color, know its hex code or search online for the color with rgb code, #...",
        enterColor: "Enter color ...",
      };
  }
}

export function getCommentAction(language: string) {
  switch (language) {
    case "vi":
      return {
        userBannedForever: "Người dùng đã bị ban vĩnh viễn!",
        somethingWrong: "Có gì đó không đúng!",
        unban: "Mở ban",
        updatingUnbanUser: "Đang cập nhật mở ban người dùng...",
        openMenu: "Mở menu",
        actions: "Hành động",
        banForever: "Ban vĩnh viễn",
        ban: "Ban",
        unBan: "Mở ban",
      };
    case "en":
      return {
        userBannedForever: "User has been permanently banned!",
        somethingWrong: "Something went wrong!",
        unban: "Unban",
        updatingUnbanUser: "Updating unban user...",
        openMenu: "Open menu",
        actions: "Actions",
        banForever: "Ban Forever",
        ban: "Ban",
        unBan: "UnBan",
      };
    case "zh":
      return {
        userBannedForever: "用户已被永久封禁！",
        somethingWrong: "出了点问题！",
        unban: "解封",
        updatingUnbanUser: "正在更新解封用户...",
        openMenu: "打开菜单",
        actions: "操作",
        banForever: "永久封禁",
        ban: "封禁",
        unBan: "解封",
      };
    case "fr":
      return {
        userBannedForever: "L'utilisateur a été banni définitivement !",
        somethingWrong: "Quelque chose a mal tourné !",
        unban: "Débannir",
        updatingUnbanUser: "Mise à jour de l'utilisateur débanni...",
        openMenu: "Ouvrir le menu",
        actions: "Actions",
        banForever: "Bannir définitivement",
        ban: "Bannir",
        unBan: "Débannir",
      };
    case "ja":
      return {
        userBannedForever: "ユーザーは永久に禁止されています！",
        somethingWrong: "何か問題が発生しました！",
        unban: "禁止解除",
        updatingUnbanUser: "禁止解除中...",
        openMenu: "メニューを開く",
        actions: "アクション",
        banForever: "永久に禁止",
        ban: "禁止",
        unBan: "禁止解除",
      };
    default:
      return {
        userBannedForever: "User has been permanently banned!",
        somethingWrong: "Something went wrong!",
        unban: "Unban",
        updatingUnbanUser: "Updating unban user...",
        openMenu: "Open menu",
        actions: "Actions",
        banForever: "Ban Forever",
        ban: "Ban",
        unBan: "UnBan",
      };
  }
}

export const getCommentClient = (language: string) => {
  switch (language) {
    case "vi":
      return {
        review: "Đánh giá",
        manageReview: "Quản lý đánh giá",
        api: "API",
        apiCalls: "API calls for Comment",
      };
    case "en":
      return {
        review: "Review",
        manageReview: "Manage Review",
        api: "API",
        apiCalls: "API calls for Comment",
      };
    case "zh":
      return {
        review: "评价",
        manageReview: "管理评价",
        api: "API",
        apiCalls: "评论的API调用",
      };
    case "fr":
      return {
        review: "Avis",
        manageReview: "Gérer les avis",
        api: "API",
        apiCalls: "Appels API pour les commentaires",
      };
    case "ja":
      return {
        review: "レビュー",
        manageReview: "レビュー管理",
        api: "API",
        apiCalls: "コメント用API呼び出し",
      };
    default:
      return {
        review: "Review",
        manageReview: "Manage Review",
        api: "API",
        apiCalls: "API calls for Comment",
      };
  }
};

export function getSettingUserSheet(language: string) {
  switch (language) {
    case "vi":
      return {
        banUser: "Ban người dùng",
        name: "Tên",
        enterBanTimeAndContent:
          "Hãy nhập thời gian người dùng bị ban và nội dung ban.",
      };
    case "en":
      return {
        banUser: "Ban user",
        name: "Name",
        enterBanTimeAndContent: "Please enter the ban duration and content.",
      };
    case "zh":
      return {
        banUser: "封禁用户",
        name: "姓名",
        enterBanTimeAndContent: "请输入用户被封禁的时间和封禁内容。",
      };
    case "fr":
      return {
        banUser: "Bannir l'utilisateur",
        name: "Nom",
        enterBanTimeAndContent:
          "Veuillez entrer la durée de la bannissement et le contenu du bannissement.",
      };
    case "ja":
      return {
        banUser: "ユーザーを禁止",
        name: "名前",
        enterBanTimeAndContent:
          "ユーザーが禁止された時間と内容を入力してください。",
      };
    default:
      return {
        banUser: "Ban user",
        name: "Name",
        enterBanTimeAndContent: "Please enter the ban duration and content.",
      };
  }
}

export function getSettingUserFormBanUser(language: string) {
  switch (language) {
    case "vi":
      return {
        banContentMinLength:
          "Nội dung ban cần ít nhất 3 ký tự và không khoảng trắng đầu dòng.",
        cannotBanPastTime: "Bạn không thể ban vào một thời điểm đã qua.",
        banTimeMin10Min: "Thời gian ban phải ít nhất là 10 phút.",
        banSuccess: "Ban thành công người dùng",
        somethingWentWrong: "Something went wrong!",
        content: "Nội dung",
        enterBanContent: "Hãy nhập nội dung ban...",
        banTime: "Thời gian ban",
        unbanTime: "Thời gian mở ban...",
        save: "Lưu",
      };
    case "en":
      return {
        banContentMinLength:
          "Ban content must be at least 3 characters and cannot have leading spaces.",
        cannotBanPastTime: "You cannot ban at a past time.",
        banTimeMin10Min: "Ban time must be at least 10 minutes.",
        banSuccess: "User banned successfully",
        somethingWentWrong: "Something went wrong!",
        content: "Content",
        enterBanContent: "Please enter the ban content...",
        banTime: "Ban time",
        unbanTime: "Unban time...",
        save: "Save",
      };
    case "zh":
      return {
        banContentMinLength: "封禁内容至少需要 3 个字符且不能有前导空格。",
        cannotBanPastTime: "您不能在过去的时间进行封禁。",
        banTimeMin10Min: "封禁时间必须至少 10 分钟。",
        banSuccess: "用户已成功封禁",
        somethingWentWrong: "发生错误！",
        content: "内容",
        enterBanContent: "请输入封禁内容...",
        banTime: "封禁时间",
        unbanTime: "解除封禁时间...",
        save: "保存",
      };
    case "fr":
      return {
        banContentMinLength:
          "Le contenu de la bannissement doit comporter au moins 3 caractères et ne pas avoir d'espaces en début.",
        cannotBanPastTime: "Vous ne pouvez pas bannir à une heure passée.",
        banTimeMin10Min:
          "Le temps de bannissement doit être d'au moins 10 minutes.",
        banSuccess: "Utilisateur banni avec succès",
        somethingWentWrong: "Quelque chose s'est mal passé!",
        content: "Contenu",
        enterBanContent: "Veuillez entrer le contenu du bannissement...",
        banTime: "Temps de bannissement",
        unbanTime: "Temps de déban...",
        save: "Sauvegarder",
      };
    case "ja":
      return {
        banContentMinLength:
          "禁止内容は最低でも3文字必要で、先頭に空白を含むことはできません。",
        cannotBanPastTime: "過去の時間には禁止できません。",
        banTimeMin10Min: "禁止時間は最低10分でなければなりません。",
        banSuccess: "ユーザーが正常に禁止されました",
        somethingWentWrong: "何かがうまくいきませんでした！",
        content: "内容",
        enterBanContent: "禁止内容を入力してください...",
        banTime: "禁止時間",
        unbanTime: "解除禁止時間...",
        save: "保存",
      };
    default:
      return {
        banContentMinLength:
          "Ban content must be at least 3 characters and cannot have leading spaces.",
        cannotBanPastTime: "You cannot ban at a past time.",
        banTimeMin10Min: "Ban time must be at least 10 minutes.",
        banSuccess: "User banned successfully",
        somethingWentWrong: "Something went wrong!",
        content: "Content",
        enterBanContent: "Please enter the ban content...",
        banTime: "Ban time",
        unbanTime: "Unban time...",
        save: "Save",
      };
  }
}

export function getCouponEditRow(language: string) {
  switch (language) {
    case "vi":
      return {
        edit: "Chỉnh sửa",
        editExisting: "Chỉnh sửa một cái có sẵn",
      };
    case "en":
      return {
        edit: "Edit",
        editExisting: "Edit an existing",
      };
    case "zh":
      return {
        edit: "编辑",
        editExisting: "编辑现有内容",
      };
    case "fr":
      return {
        edit: "Éditer",
        editExisting: "Éditer un élément existant",
      };
    case "ja":
      return {
        edit: "編集",
        editExisting: "既存の編集",
      };
    default:
      return {
        edit: "Edit",
        editExisting: "Edit an existing",
      };
  }
}

export function getCouponFormEdit(language: string) {
  switch (language) {
    case "vi":
      return {
        minLength: "Nhập ít nhất 2 ký tự.",
        minPercentage: "Hãy nhập ít nhất 1%.",
        minMonth: "Nhập ít nhất 1 tháng.",
        minPerson: "Nhập ít nhất 1 người.",
        updateSuccess: "Cập nhật thành công!",
        somethingWentWrong: "Something went wrong!",
        productName: "Tên sản phẩm",
        enterProductName: "Nhập tên ...",
        saveChange: "Lưu thay đổi",
      };
    case "en":
      return {
        minLength: "Enter at least 2 characters.",
        minPercentage: "Please enter at least 1%.",
        minMonth: "Enter at least 1 month.",
        minPerson: "Enter at least 1 person.",
        updateSuccess: "Update successful!",
        somethingWentWrong: "Something went wrong!",
        productName: "Product Name",
        enterProductName: "Enter name ...",
        saveChange: "Save Change",
      };
    case "zh":
      return {
        minLength: "请输入至少2个字符。",
        minPercentage: "请输入至少1%。",
        minMonth: "请输入至少1个月。",
        minPerson: "请输入至少1个人。",
        updateSuccess: "更新成功！",
        somethingWentWrong: "出了点问题！",
        productName: "产品名称",
        enterProductName: "请输入名称 ...",
        saveChange: "保存更改",
      };
    case "fr":
      return {
        minLength: "Entrez au moins 2 caractères.",
        minPercentage: "Veuillez entrer au moins 1%.",
        minMonth: "Entrez au moins 1 mois.",
        minPerson: "Entrez au moins 1 personne.",
        updateSuccess: "Mise à jour réussie!",
        somethingWentWrong: "Quelque chose a mal tourné!",
        productName: "Nom du produit",
        enterProductName: "Entrez le nom ...",
        saveChange: "Enregistrer les modifications",
      };
    case "ja":
      return {
        minLength: "2文字以上を入力してください。",
        minPercentage: "少なくとも1%を入力してください。",
        minMonth: "少なくとも1か月を入力してください。",
        minPerson: "少なくとも1人を入力してください。",
        updateSuccess: "更新成功！",
        somethingWentWrong: "何かがうまくいきませんでした！",
        productName: "商品名",
        enterProductName: "名前を入力してください ...",
        saveChange: "変更を保存",
      };
    default:
      return {
        minLength: "Enter at least 2 characters.",
        minPercentage: "Please enter at least 1%.",
        minMonth: "Enter at least 1 month.",
        minPerson: "Enter at least 1 person.",
        updateSuccess: "Update successful!",
        somethingWentWrong: "Something went wrong!",
        productName: "Product Name",
        enterProductName: "Enter name ...",
        saveChange: "Save Change",
      };
  }
}

export function getCouponAction(language: string) {
  switch (language) {
    case "vi":
      return {
        couponIdCopied: "Mã giảm giá đã được sao chép vào clipboard.",
        couponDeleted: "Mã giảm giá đã bị xóa.",
        somethingWentWrong: "Something went wrong!",
        openMenu: "Mở menu",
        actions: "Hành động",
        copyId: "Sao chép mã",
        update: "Cập nhật",
        delete: "Xóa",
      };
    case "en":
      return {
        couponIdCopied: "Coupon Id copied to the clipboard.",
        couponDeleted: "Coupon deleted.",
        somethingWentWrong: "Something went wrong!",
        openMenu: "Open menu",
        actions: "Actions",
        copyId: "Copy Id",
        update: "Update",
        delete: "Delete",
      };
    case "zh":
      return {
        couponIdCopied: "优惠券ID已复制到剪贴板。",
        couponDeleted: "优惠券已删除。",
        somethingWentWrong: "出了点问题！",
        openMenu: "打开菜单",
        actions: "操作",
        copyId: "复制ID",
        update: "更新",
        delete: "删除",
      };
    case "fr":
      return {
        couponIdCopied: "ID de coupon copié dans le presse-papiers.",
        couponDeleted: "Coupon supprimé.",
        somethingWentWrong: "Quelque chose a mal tourné!",
        openMenu: "Ouvrir le menu",
        actions: "Actions",
        copyId: "Copier l'ID",
        update: "Mettre à jour",
        delete: "Supprimer",
      };
    case "ja":
      return {
        couponIdCopied: "クーポンIDがクリップボードにコピーされました。",
        couponDeleted: "クーポンが削除されました。",
        somethingWentWrong: "何かがうまくいきませんでした！",
        openMenu: "メニューを開く",
        actions: "アクション",
        copyId: "IDをコピー",
        update: "更新",
        delete: "削除",
      };
    default:
      return {
        couponIdCopied: "Coupon Id copied to the clipboard.",
        couponDeleted: "Coupon deleted.",
        somethingWentWrong: "Something went wrong!",
        openMenu: "Open menu",
        actions: "Actions",
        copyId: "Copy Id",
        update: "Update",
        delete: "Delete",
      };
  }
}

export function getCouponClient(language: string) {
  switch (language) {
    case "vi":
      return {
        couponDeletedSuccessfully: "Mã giảm giá đã được xóa thành công.",
        somethingWentWrong: "Something went wrong!",
        coupon: "Mã giảm giá",
        manageCoupon: "Quản lý Coupon",
        addNew: "Thêm mới",
        api: "API",
        apiCallsForCoupon: "API calls for Coupon",
      };
    case "en":
      return {
        couponDeletedSuccessfully: "Coupon deleted successfully",
        somethingWentWrong: "Something went wrong!",
        coupon: "Coupon",
        manageCoupon: "Quản lý mã giảm giá",
        addNew: "Add New",
        api: "API",
        apiCallsForCoupon: "API calls for Coupon",
      };
    case "zh":
      return {
        couponDeletedSuccessfully: "优惠券已成功删除",
        somethingWentWrong: "出了点问题！",
        coupon: "优惠券",
        manageCoupon: "管理优惠券",
        addNew: "新增",
        api: "API",
        apiCallsForCoupon: "API调用优惠券",
      };
    case "fr":
      return {
        couponDeletedSuccessfully: "Coupon supprimé avec succès",
        somethingWentWrong: "Quelque chose a mal tourné!",
        coupon: "Coupon",
        manageCoupon: "Gérer le coupon",
        addNew: "Ajouter nouveau",
        api: "API",
        apiCallsForCoupon: "Appels API pour Coupon",
      };
    case "ja":
      return {
        couponDeletedSuccessfully: "クーポンが正常に削除されました",
        somethingWentWrong: "何かがうまくいきませんでした！",
        coupon: "クーポン",
        manageCoupon: "クーポン管理",
        addNew: "新規追加",
        api: "API",
        apiCallsForCoupon: "APIクーポンの呼び出し",
      };
    default:
      return {
        couponDeletedSuccessfully: "Coupon deleted successfully",
        somethingWentWrong: "Something went wrong!",
        coupon: "Coupon",
        manageCoupon: "Manage Coupon",
        addNew: "Add New",
        api: "API",
        apiCallsForCoupon: "API calls for Coupon",
      };
  }
}

export function getCouponForm(language: string) {
  switch (language) {
    case "vi":
      return {
        editCoupon: "Chỉnh sửa mã giảm giá",
        createCoupon: "Tạo mã giảm giá",
        editCouponDescription: "Chỉnh sửa một mã giảm giá",
        addCoupon: "Thêm một mã giảm giá mới",
        saveChanges: "Lưu thay đổi",
        create: "Tạo mới",
        minLength: "Nhập ít nhất 2 ký tự.",
        minPercentage: "Nhập ít nhất 1%.",
        minMonths: "Nhập ít nhất 1 tháng.",
        minPeople: "Nhập ít nhất 1 người.",
        expirationNotPast: "Thời gian hết hạn không được ở quá khứ.",
        coupon: "Mã giảm giá",
        discountPercentage: "Phần trăm giảm giá",
        updated: "đã cập nhật",
        created: "đã tạo",
        maxQuantity: "Số lượng tối đa",
        repeatPeople: "người. Lặp lại",
        months: "tháng",
        couponUpdated: "Mã giảm giá đã được cập nhật!",
        couponCreated: "Mã giảm giá đã được tạo!",
        close: "Đóng",
        somethingWentWrong: "Đã xảy ra lỗi.",
        couponDeleted: "Mã giảm giá đã bị xóa.",
        discountImage: "Hình ảnh giảm giá",
        selectDiscountImage: "Chọn những hình ảnh đẹp phù hợp với mã giảm giá.",
        couponName: "Tên mã giảm giá",
        couponNameDescription: "Tên mã giảm giá. Ví dụ: Giảm giá sốc 50% ...",
        enterCouponName: "Nhập tên mã giảm giá ...",
        couponDescription: "Mô tả mã giảm giá",
        enterCouponDescription: "Nhập mô tả mã giảm giá ...",
        durationDescription:
          "Khoảng thời gian (Nếu chọn 'mãi mãi' hoặc 'một lần' thì không điền số tháng.)",
        selectDuration: "Chọn khoảng thời gian",
        durationInMonthsDescription:
          "Khoảng thời gian trong tháng (0-12) (Nếu chọn 'mãi mãi' hoặc 'một lần' thì không điền số tháng.)",
        enterDurationInMonths: "Nhập số tháng trong khoảng thời gian ...",
        promotionPercentageDescription: "Phần trăm khuyến mãi (0-100)",
        enterPromotionPercentage: "Nhập phần trăm khuyến mãi ...",
        maxDiscountQuantity: "Số lượng tối đa được giảm giá",
        enterMaxDiscountQuantity: "Nhập số lượng tối đa được giảm giá ...",
        expirationTime: "Thời gian hết hạn",
      };
    case "en":
      return {
        editCoupon: "Edit coupon",
        createCoupon: "Create coupon",
        editCouponDescription: "Edit a coupon",
        addCoupon: "Add a new coupon",
        saveChanges: "Save changes",
        create: "Create",
        minLength: "Enter at least 2 characters.",
        minPercentage: "Enter at least 1%.",
        minMonths: "Enter at least 1 month.",
        minPeople: "Enter at least 1 person.",
        expirationNotPast: "Expiration time cannot be in the past.",
        coupon: "Coupon",
        discountPercentage: "Discount percentage",
        updated: "updated",
        created: "created",
        maxQuantity: "Maximum quantity",
        repeatPeople: "people. Repeat",
        months: "months",
        couponUpdated: "Coupon updated!",
        couponCreated: "Coupon created!",
        close: "Close",
        somethingWentWrong: "Something went wrong.",
        couponDeleted: "Coupon deleted.",
        discountImage: "Discount image",
        selectDiscountImage: "Choose appealing images for the coupon.",
        couponName: "Coupon name",
        couponNameDescription: "Coupon name. E.g.: Shocking 50% off...",
        enterCouponName: "Enter coupon name...",
        couponDescription: "Coupon description",
        enterCouponDescription: "Enter coupon description...",
        durationDescription:
          "Duration (If 'forever' or 'once' is selected, do not input months.)",
        selectDuration: "Select Duration",
        durationInMonthsDescription:
          "Duration in months (0-12) (If 'forever' or 'once' is selected, do not input months.)",
        enterDurationInMonths: "Enter duration in months...",
        promotionPercentageDescription: "Promotion percentage (0-100)",
        enterPromotionPercentage: "Enter promotion percentage...",
        maxDiscountQuantity: "Maximum discount quantity",
        enterMaxDiscountQuantity: "Enter maximum discount quantity...",
        expirationTime: "Expiration time",
      };
    case "zh":
      return {
        editCoupon: "编辑优惠券",
        createCoupon: "创建优惠券",
        editCouponDescription: "编辑一个优惠券",
        addCoupon: "添加一个新优惠券",
        saveChanges: "保存更改",
        create: "创建",
        minLength: "请输入至少2个字符。",
        minPercentage: "请输入至少1%。",
        minMonths: "请输入至少1个月。",
        minPeople: "请输入至少1人。",
        expirationNotPast: "过期时间不能在过去。",
        coupon: "优惠券",
        discountPercentage: "折扣百分比",
        updated: "已更新",
        created: "已创建",
        maxQuantity: "最大数量",
        repeatPeople: "人。重复",
        months: "月",
        couponUpdated: "优惠券已更新！",
        couponCreated: "优惠券已创建！",
        close: "关闭",
        somethingWentWrong: "出了点问题。",
        couponDeleted: "优惠券已删除。",
        discountImage: "折扣图片",
        selectDiscountImage: "选择适合优惠券的美观图片。",
        couponName: "优惠券名称",
        couponNameDescription: "优惠券名称。例如：震撼50%折扣...",
        enterCouponName: "输入优惠券名称...",
        couponDescription: "优惠券描述",
        enterCouponDescription: "输入优惠券描述...",
        durationDescription:
          "持续时间（如果选择“永久”或“一次”，请不要输入月份。）",
        selectDuration: "选择持续时间",
        durationInMonthsDescription:
          "月份（0-12）（如果选择“永久”或“一次”，请不要输入月份。）",
        enterDurationInMonths: "输入持续时间（单位：月）...",
        promotionPercentageDescription: "促销百分比（0-100）",
        enterPromotionPercentage: "输入促销百分比...",
        maxDiscountQuantity: "最大折扣数量",
        enterMaxDiscountQuantity: "输入最大折扣数量...",
        expirationTime: "过期时间",
      };
    case "fr":
      return {
        editCoupon: "Modifier le coupon",
        createCoupon: "Créer un coupon",
        editCouponDescription: "Modifier un coupon",
        addCoupon: "Ajouter un nouveau coupon",
        saveChanges: "Sauvegarder les modifications",
        create: "Créer",
        minLength: "Entrez au moins 2 caractères.",
        minPercentage: "Entrez au moins 1%.",
        minMonths: "Entrez au moins 1 mois.",
        minPeople: "Entrez au moins 1 personne.",
        expirationNotPast:
          "La date d'expiration ne peut pas être dans le passé.",
        coupon: "Coupon",
        discountPercentage: "Pourcentage de réduction",
        updated: "mis à jour",
        created: "créé",
        maxQuantity: "Quantité maximale",
        repeatPeople: "personnes. Répéter",
        months: "mois",
        couponUpdated: "Coupon mis à jour !",
        couponCreated: "Coupon créé !",
        close: "Fermer",
        somethingWentWrong: "Quelque chose a mal tourné.",
        couponDeleted: "Coupon supprimé.",
        discountImage: "Image de réduction",
        selectDiscountImage:
          "Choisissez des images attrayantes pour le coupon.",
        couponName: "Nom du coupon",
        couponNameDescription: "Nom du coupon. Exemple : Réduction choc 50%...",
        enterCouponName: "Entrez le nom du coupon...",
        couponDescription: "Description du coupon",
        enterCouponDescription: "Entrez la description du coupon...",
        durationDescription:
          "Durée (Si 'forever' ou 'once' est sélectionné, ne pas remplir le champ mois.)",
        selectDuration: "Sélectionnez la durée",
        durationInMonthsDescription:
          "Durée en mois (0-12) (Si 'forever' ou 'once' est sélectionné, ne pas remplir le champ mois.)",
        enterDurationInMonths: "Entrez la durée en mois...",
        promotionPercentageDescription: "Pourcentage de promotion (0-100)",
        enterPromotionPercentage: "Entrez le pourcentage de promotion...",
        maxDiscountQuantity: "Quantité maximale de réduction",
        enterMaxDiscountQuantity: "Entrez la quantité maximale de réduction...",
        expirationTime: "Date d'expiration",
      };
    case "ja":
      return {
        editCoupon: "クーポンを編集",
        createCoupon: "クーポンを作成",
        editCouponDescription: "クーポンを編集する",
        addCoupon: "新しいクーポンを追加する",
        saveChanges: "変更を保存",
        create: "作成",
        minLength: "少なくとも2文字を入力してください。",
        minPercentage: "少なくとも1％を入力してください。",
        minMonths: "少なくとも1か月を入力してください。",
        minPeople: "少なくとも1人を入力してください。",
        expirationNotPast: "有効期限が過去になってはいけません。",
        coupon: "クーポン",
        discountPercentage: "割引率",
        updated: "更新されました",
        created: "作成されました",
        maxQuantity: "最大数量",
        repeatPeople: "人。繰り返す",
        months: "ヶ月",
        couponUpdated: "クーポンが更新されました！",
        couponCreated: "クーポンが作成されました！",
        close: "閉じる",
        somethingWentWrong: "問題が発生しました。",
        couponDeleted: "クーポンが削除されました。",
        discountImage: "割引画像",
        selectDiscountImage: "クーポンに適した魅力的な画像を選択してください。",
        couponName: "クーポン名",
        couponNameDescription: "クーポン名。例：ショッキングな50％オフ...",
        enterCouponName: "クーポン名を入力してください...",
        couponDescription: "クーポンの説明",
        enterCouponDescription: "クーポンの説明を入力してください...",
        durationDescription:
          "期間（「永久」または「一度」を選択した場合、月数を入力しないでください。）",
        selectDuration: "期間を選択",
        durationInMonthsDescription:
          "月数（0～12）（「永久」または「一度」を選択した場合、月数を入力しないでください。）",
        enterDurationInMonths: "月数を入力してください...",
        promotionPercentageDescription:
          "プロモーションパーセンテージ（0～100）",
        enterPromotionPercentage:
          "プロモーションパーセンテージを入力してください...",
        maxDiscountQuantity: "最大割引数量",
        enterMaxDiscountQuantity: "最大割引数量を入力してください...",
        expirationTime: "有効期限",
      };
    default:
      return {
        editCoupon: "Edit coupon",
        createCoupon: "Create coupon",
        editCouponDescription: "Edit a coupon",
        addCoupon: "Add a new coupon",
        saveChanges: "Save changes",
        create: "Create",
        minLength: "Enter at least 2 characters.",
        minPercentage: "Enter at least 1%.",
        minMonths: "Enter at least 1 month.",
        minPeople: "Enter at least 1 person.",
        expirationNotPast: "Expiration time cannot be in the past.",
        coupon: "Coupon",
        discountPercentage: "Discount percentage",
        updated: "updated",
        created: "created",
        maxQuantity: "Maximum quantity",
        repeatPeople: "people. Repeat",
        months: "months",
        couponUpdated: "Coupon updated!",
        couponCreated: "Coupon created!",
        close: "Close",
        somethingWentWrong: "Something went wrong.",
        couponDeleted: "Coupon deleted.",
        discountImage: "Discount image",
        selectDiscountImage: "Choose appealing images for the coupon.",
        couponName: "Coupon name",
        couponNameDescription: "Coupon name. E.g.: Shocking 50% off...",
        enterCouponName: "Enter coupon name...",
        couponDescription: "Coupon description",
        enterCouponDescription: "Enter coupon description...",
        durationDescription:
          "Duration (If 'forever' or 'once' is selected, do not input months.)",
        selectDuration: "Select Duration",
        durationInMonthsDescription:
          "Duration in months (0-12) (If 'forever' or 'once' is selected, do not input months.)",
        enterDurationInMonths: "Enter duration in months...",
        promotionPercentageDescription: "Promotion percentage (0-100)",
        enterPromotionPercentage: "Enter promotion percentage...",
        maxDiscountQuantity: "Maximum discount quantity",
        enterMaxDiscountQuantity: "Enter maximum discount quantity...",
        expirationTime: "Expiration time",
      };
  }
}

export function getFavoriteEditRow(language: string) {
  switch (language) {
    case "vi":
      return {
        notFound: "Không tìm thấy!",
        editName: "Chỉnh sửa tên",
        editExistingName: "Chỉnh sửa một tên hiện có",
      };
    case "en":
      return {
        notFound: "Not found!",
        editName: "Edit Name",
        editExistingName: "Edit an existing name",
      };
    case "zh":
      return {
        notFound: "未找到！",
        editName: "编辑名称",
        editExistingName: "编辑现有名称",
      };
    case "fr":
      return {
        notFound: "Introuvable !",
        editName: "Modifier le nom",
        editExistingName: "Modifier un nom existant",
      };
    case "ja":
      return {
        notFound: "見つかりません！",
        editName: "名前を編集する",
        editExistingName: "既存の名前を編集する",
      };
    default:
      return {
        notFound: "Not found!",
        editName: "Edit Name",
        editExistingName: "Edit an existing name",
      };
  }
}

export function getFavoriteNameForm(language: string) {
  switch (language) {
    case "vi":
      return {
        minLength: "Nhập ít nhất 2 ký tự.",
        updateSuccess: "Cập nhật thành công!",
        somethingWentWrong: "Something went wrong!",
        productName: "Tên sản phẩm",
        enterProductName: "Nhập tên ...",
        saveChange: "Lưu thay đổi",
      };
    case "en":
      return {
        minLength: "Enter at least 2 characters.",
        updateSuccess: "Update successful!",
        somethingWentWrong: "Something went wrong!",
        productName: "Product Name",
        enterProductName: "Enter name ...",
        saveChange: "Save Change",
      };
    case "zh":
      return {
        minLength: "请输入至少2个字符。",
        updateSuccess: "更新成功！",
        somethingWentWrong: "出了点问题！",
        productName: "产品名称",
        enterProductName: "请输入名称 ...",
        saveChange: "保存更改",
      };
    case "fr":
      return {
        minLength: "Entrez au moins 2 caractères.",
        updateSuccess: "Mise à jour réussie!",
        somethingWentWrong: "Quelque chose a mal tourné!",
        productName: "Nom du produit",
        enterProductName: "Entrez le nom ...",
        saveChange: "Enregistrer les modifications",
      };
    case "ja":
      return {
        minLength: "2文字以上を入力してください。",
        updateSuccess: "更新成功！",
        somethingWentWrong: "何かがうまくいきませんでした！",
        productName: "商品名",
        enterProductName: "名前を入力してください ...",
        saveChange: "変更を保存",
      };
    default:
      return {
        minLength: "Enter at least 2 characters.",
        updateSuccess: "Update successful!",
        somethingWentWrong: "Something went wrong!",
        productName: "Product Name",
        enterProductName: "Enter name ...",
        saveChange: "Save Change",
      };
  }
}

export function getFavoriteAction(language: string) {
  switch (language) {
    case "vi":
      return {
        favoriteIdCopied: "ID yêu thích đã được sao chép vào clipboard.",
        favoriteDeleted: "Yêu thích đã bị xóa.",
        somethingWentWrong: "Đã xảy ra lỗi!",
        openMenu: "Mở menu",
        actions: "Hành động",
        copyId: "Sao chép ID",
        update: "Cập nhật",
        delete: "Xóa",
      };
    case "en":
      return {
        favoriteIdCopied: "Favorite Id copied to the clipboard.",
        favoriteDeleted: "Favorite deleted.",
        somethingWentWrong: "Something went wrong!",
        openMenu: "Open menu",
        actions: "Actions",
        copyId: "CopyId",
        update: "Update",
        delete: "Delete",
      };
    case "zh":
      return {
        favoriteIdCopied: "收藏ID已复制到剪贴板。",
        favoriteDeleted: "收藏已删除。",
        somethingWentWrong: "出了点问题！",
        openMenu: "打开菜单",
        actions: "操作",
        copyId: "复制ID",
        update: "更新",
        delete: "删除",
      };
    case "fr":
      return {
        favoriteIdCopied: "L'ID favori a été copié dans le presse-papiers.",
        favoriteDeleted: "Favori supprimé.",
        somethingWentWrong: "Quelque chose a mal tourné!",
        openMenu: "Ouvrir le menu",
        actions: "Actions",
        copyId: "Copier l'ID",
        update: "Mettre à jour",
        delete: "Supprimer",
      };
    case "ja":
      return {
        favoriteIdCopied: "お気に入りIDがクリップボードにコピーされました。",
        favoriteDeleted: "お気に入りが削除されました。",
        somethingWentWrong: "何かがうまくいきませんでした！",
        openMenu: "メニューを開く",
        actions: "アクション",
        copyId: "IDをコピー",
        update: "更新",
        delete: "削除",
      };
    default:
      return {
        favoriteIdCopied: "Favorite Id copied to the clipboard.",
        favoriteDeleted: "Favorite deleted.",
        somethingWentWrong: "Something went wrong!",
        openMenu: "Open menu",
        actions: "Actions",
        copyId: "CopyId",
        update: "Update",
        delete: "Delete",
      };
  }
}

export function getFavoriteClient(language: string) {
  switch (language) {
    case "vi":
      return {
        favoriteDeletedSuccessfully: "Sở thích đã bị xóa thành công.",
        somethingWentWrong: "Đã xảy ra lỗi!",
        favorite: "Sở thích",
        favoriteManagement: "Quản lý sở thích sản phẩm",
        addNew: "Thêm mới",
        api: "API",
        apiCallsForFavorite: "API calls for Favorite",
      };
    case "en":
      return {
        favoriteDeletedSuccessfully: "Favorite deleted successfully.",
        somethingWentWrong: "Something went wrong!",
        favorite: "Favorite",
        favoriteManagement: "Product Favorite Management",
        addNew: "Add new",
        api: "API",
        apiCallsForFavorite: "API calls for Favorite",
      };
    case "zh":
      return {
        favoriteDeletedSuccessfully: "收藏已成功删除。",
        somethingWentWrong: "出了点问题！",
        favorite: "收藏",
        favoriteManagement: "产品收藏管理",
        addNew: "添加新项",
        api: "API",
        apiCallsForFavorite: "收藏的API调用",
      };
    case "fr":
      return {
        favoriteDeletedSuccessfully: "Favori supprimé avec succès.",
        somethingWentWrong: "Quelque chose a mal tourné!",
        favorite: "Favori",
        favoriteManagement: "Gestion des produits favoris",
        addNew: "Ajouter un nouveau",
        api: "API",
        apiCallsForFavorite: "Appels API pour Favori",
      };
    case "ja":
      return {
        favoriteDeletedSuccessfully: "お気に入りが正常に削除されました。",
        somethingWentWrong: "何かがうまくいきませんでした！",
        favorite: "お気に入り",
        favoriteManagement: "製品のお気に入り管理",
        addNew: "新規追加",
        api: "API",
        apiCallsForFavorite: "お気に入りのAPI呼び出し",
      };
    default:
      return {
        favoriteDeletedSuccessfully: "Favorite deleted successfully.",
        somethingWentWrong: "Something went wrong!",
        favorite: "Favorite",
        favoriteManagement: "Product Favorite Management",
        addNew: "Add new",
        api: "API",
        apiCallsForFavorite: "API calls for Favorite",
      };
  }
}

export function getFavoriteForm(language: string) {
  switch (language) {
    case "vi":
      return {
        editFavorite: "Chỉnh sửa sở thích",
        createFavorite: "Tạo sở thích",
        editAFavorite: "Chỉnh sửa một sở thích",
        addNewFavorite: "Thêm sở thích mới",
        saveChanges: "Lưu thay đổi",
        create: "Tạo mới",
        minLength: "Nhập ít nhất 2 ký tự.",
        favorite: "Sở thích",
        updated: "đã cập nhật",
        created: "đã tạo",
        updatingFavorite: "Đang cập nhật sở thích...",
        somethingWentWrong: "Đã xảy ra lỗi!",
        favoriteDeleted: "Sở thích đã bị xóa.",
        label: "Tên",
        favoriteTypesDescription: "Các loại sản phẩm mà khách hàng ưa thích.",
        enterLabel: "Nhập tên ...",
      };
    case "en":
      return {
        editFavorite: "Edit favorite",
        createFavorite: "Create favorite",
        editAFavorite: "Edit a favorite",
        addNewFavorite: "Add a new favorite",
        saveChanges: "Save changes",
        create: "Create",
        minLength: "Enter at least 2 characters.",
        favorite: "Favorite",
        updated: "updated",
        created: "created",
        updatingFavorite: "Updating favorite...",
        somethingWentWrong: "Something went wrong!",
        favoriteDeleted: "Favorite deleted.",
        label: "Label",
        favoriteTypesDescription: "The types of products customers prefer.",
        enterLabel: "Enter label ...",
      };
    case "zh":
      return {
        editFavorite: "编辑收藏",
        createFavorite: "创建收藏",
        editAFavorite: "编辑一个收藏",
        addNewFavorite: "添加新收藏",
        saveChanges: "保存更改",
        create: "创建",
        minLength: "请输入至少2个字符。",
        favorite: "收藏",
        updated: "已更新",
        created: "已创建",
        updatingFavorite: "正在更新收藏...",
        somethingWentWrong: "出了点问题！",
        favoriteDeleted: "收藏已删除。",
        label: "标签",
        favoriteTypesDescription: "客户喜好的产品类型。",
        enterLabel: "请输入标签...",
      };
    case "fr":
      return {
        editFavorite: "Modifier le favori",
        createFavorite: "Créer un favori",
        editAFavorite: "Modifier un favori",
        addNewFavorite: "Ajouter un nouveau favori",
        saveChanges: "Enregistrer les modifications",
        create: "Créer",
        minLength: "Entrez au moins 2 caractères.",
        favorite: "Favori",
        updated: "mis à jour",
        created: "créé",
        updatingFavorite: "Mise à jour du favori...",
        somethingWentWrong: "Quelque chose a mal tourné!",
        favoriteDeleted: "Favori supprimé.",
        label: "Étiquette",
        favoriteTypesDescription: "Les types de produits préférés des clients.",
        enterLabel: "Entrez une étiquette...",
      };
    case "ja":
      return {
        editFavorite: "お気に入りを編集",
        createFavorite: "お気に入りを作成",
        editAFavorite: "お気に入りを編集",
        addNewFavorite: "新しいお気に入りを追加",
        saveChanges: "変更を保存",
        create: "作成",
        minLength: "2文字以上を入力してください。",
        favorite: "お気に入り",
        updated: "更新しました",
        created: "作成しました",
        updatingFavorite: "お気に入りを更新しています...",
        somethingWentWrong: "何かがうまくいきませんでした！",
        favoriteDeleted: "お気に入りが削除されました。",
        label: "ラベル",
        favoriteTypesDescription: "顧客が好む製品の種類。",
        enterLabel: "ラベルを入力してください...",
      };
    default:
      return {
        editFavorite: "Edit favorite",
        createFavorite: "Create favorite",
        editAFavorite: "Edit a favorite",
        addNewFavorite: "Add a new favorite",
        saveChanges: "Save changes",
        create: "Create",
        minLength: "Enter at least 2 characters.",
        favorite: "Favorite",
        updated: "updated",
        created: "created",
        updatingFavorite: "Updating favorite...",
        somethingWentWrong: "Something went wrong!",
        favoriteDeleted: "Favorite deleted.",
        label: "Label",
        favoriteTypesDescription: "The types of products customers prefer.",
        enterLabel: "Enter label ...",
      };
  }
}

export function getImageBillboardAction(language: string) {
  switch (language) {
    case "vi":
      return {
        billboardIdCopied:
          "ID biển quảng cáo đã được sao chép vào bảng clipboard.",
        imageBillboardDeleted: "Hình ảnh biển quảng cáo đã bị xóa.",
        somethingWentWrong: "Đã xảy ra lỗi!",
        openMenu: "Mở menu",
        actions: "Hành động",
        copyId: "Sao chép ID",
        update: "Cập nhật",
        delete: "Xóa",
      };
    case "en":
      return {
        billboardIdCopied: "Image Billboard Id copied to the clipboard.",
        imageBillboardDeleted: "Image Billboard deleted.",
        somethingWentWrong: "Something went wrong!",
        openMenu: "Open menu",
        actions: "Actions",
        copyId: "Copy Id",
        update: "Update",
        delete: "Delete",
      };
    case "zh":
      return {
        billboardIdCopied: "广告牌ID已复制到剪贴板。",
        imageBillboardDeleted: "广告牌图片已删除。",
        somethingWentWrong: "出了点问题！",
        openMenu: "打开菜单",
        actions: "操作",
        copyId: "复制ID",
        update: "更新",
        delete: "删除",
      };
    case "fr":
      return {
        billboardIdCopied:
          "L'ID du panneau d'affichage a été copié dans le presse-papiers.",
        imageBillboardDeleted: "Image du panneau d'affichage supprimée.",
        somethingWentWrong: "Quelque chose a mal tourné !",
        openMenu: "Ouvrir le menu",
        actions: "Actions",
        copyId: "Copier l'ID",
        update: "Mettre à jour",
        delete: "Supprimer",
      };
    case "ja":
      return {
        billboardIdCopied: "ビルボードIDがクリップボードにコピーされました。",
        imageBillboardDeleted: "ビルボード画像が削除されました。",
        somethingWentWrong: "何かがうまくいきませんでした！",
        openMenu: "メニューを開く",
        actions: "アクション",
        copyId: "IDをコピー",
        update: "更新",
        delete: "削除",
      };
    default:
      return {
        billboardIdCopied: "Image Billboard Id copied to the clipboard.",
        imageBillboardDeleted: "Image Billboard deleted.",
        somethingWentWrong: "Something went wrong!",
        openMenu: "Open menu",
        actions: "Actions",
        copyId: "Copy Id",
        update: "Update",
        delete: "Delete",
      };
  }
}

export function getImageBillboardClient(language: string) {
  switch (language) {
    case "vi":
      return {
        imageBillboardsDeletedSuccessfully:
          "Hình ảnh biển quảng cáo đã được xóa thành công.",
        somethingWentWrong: "Đã xảy ra lỗi!",
        description: "Mô tả ảnh quảng cáo",
        manageDescription: "Quản lý mô tả ảnh quảng cáo cửa hàng",
        api: "API",
        apiCalls: "API calls for mô tả ảnh quảng cáo",
      };
    case "en":
      return {
        imageBillboardsDeletedSuccessfully:
          "Image Billboards deleted successfully.",
        somethingWentWrong: "Something went wrong!",
        description: "Image billboard description",
        manageDescription: "Manage image billboard description",
        api: "API",
        apiCalls: "API calls for image billboard description",
      };
    case "zh":
      return {
        imageBillboardsDeletedSuccessfully: "广告牌图片已成功删除。",
        somethingWentWrong: "出了点问题！",
        description: "广告牌图片描述",
        manageDescription: "管理广告牌图片描述",
        api: "API",
        apiCalls: "广告牌图片描述的API调用",
      };
    case "fr":
      return {
        imageBillboardsDeletedSuccessfully:
          "Les images des panneaux d'affichage ont été supprimées avec succès.",
        somethingWentWrong: "Quelque chose a mal tourné !",
        description: "Description de l'image du panneau d'affichage",
        manageDescription:
          "Gérer la description de l'image du panneau d'affichage",
        api: "API",
        apiCalls:
          "Appels API pour la description de l'image du panneau d'affichage",
      };
    case "ja":
      return {
        imageBillboardsDeletedSuccessfully:
          "ビルボード画像が正常に削除されました。",
        somethingWentWrong: "何かがうまくいきませんでした！",
        description: "ビルボード画像の説明",
        manageDescription: "ビルボード画像の説明を管理",
        api: "API",
        apiCalls: "ビルボード画像の説明に対するAPIコール",
      };
    default:
      return {
        imageBillboardsDeletedSuccessfully:
          "Image Billboards deleted successfully.",
        somethingWentWrong: "Something went wrong!",
        description: "Image billboard description",
        manageDescription: "Manage image billboard description",
        api: "API",
        apiCalls: "API calls for image billboard description",
      };
  }
}

export const getImageBillboardForm = (language: string) => {
  switch (language) {
    case "vi":
      return {
        editImageBillboard: "Chỉnh sửa ảnh biển quảng cáo",
        createImageBillboard: "Tạo ảnh biển quảng cáo",
        editAImageBillboard: "Chỉnh sửa một ảnh biển quảng cáo",
        addNewImageBillboard: "Thêm ảnh biển quảng cáo mới",
        saveChanges: "Lưu thay đổi",
        create: "Tạo mới",
        minLength: "Nhập ít nhất 4 ký tự.",
        imageBillboard: "Ảnh biển quảng cáo",
        updated: "đã cập nhật",
        imageBillboardUpdated: "Ảnh biển quảng cáo đã được cập nhật!",
        close: "Đóng",
        somethingWentWrong: "Đã xảy ra lỗi!",
        imageBillboardDeleted: "Hình ảnh biển quảng cáo đã bị xóa.",
        label: "Nhãn",
        enterLabel: "Hãy đặt tên phù hợp với tất cả ảnh trên.",
        enterLabelPlaceholder: "Nhập nhãn ...",
        description: "Mô tả",
        enterDescription: "Hãy đặt mô tả phù hợp với tất cả ảnh trên.",
        enterDescriptionPlaceholder: "Nhập mô tả ...",
        link: "Link",
        enterLink: "Đặt đường dẫn phù hợp với ảnh.",
        enterLinkPlaceholder: "Nhập đường dẫn ...",
      };
    case "en":
      return {
        editImageBillboard: "Edit image billboard",
        createImageBillboard: "Create image billboard",
        editAImageBillboard: "Edit a image billboard",
        addNewImageBillboard: "Add a new image billboard",
        saveChanges: "Save changes",
        create: "Create",
        minLength: "Enter at least 4 characters.",
        imageBillboard: "Image billboard",
        updated: "updated",
        imageBillboardUpdated: "Image billboard updated!",
        close: "Close",
        somethingWentWrong: "Something went wrong!",
        imageBillboardDeleted: "Image billboard deleted.",
        label: "Label",
        enterLabel: "Please enter a label suitable for all images.",
        enterLabelPlaceholder: "Enter label ...",
        description: "Description",
        enterDescription: "Please enter a description suitable for all images.",
        enterDescriptionPlaceholder: "Enter description ...",
        link: "Link",
        enterLink: "Please enter a link suitable for the image.",
        enterLinkPlaceholder: "Enter link ...",
      };
    case "zh":
      return {
        editImageBillboard: "编辑广告牌图片",
        createImageBillboard: "创建广告牌图片",
        editAImageBillboard: "编辑广告牌图片",
        addNewImageBillboard: "添加新的广告牌图片",
        saveChanges: "保存更改",
        create: "创建",
        minLength: "请输入至少4个字符。",
        imageBillboard: "广告牌图片",
        updated: "已更新",
        imageBillboardUpdated: "广告牌图片已更新！",
        close: "关闭",
        somethingWentWrong: "出了点问题！",
        imageBillboardDeleted: "广告牌图片已删除。",
        label: "标签",
        enterLabel: "请输入适用于所有图片的标签。",
        enterLabelPlaceholder: "请输入标签 ...",
        description: "描述",
        enterDescription: "请输入适用于所有图片的描述。",
        enterDescriptionPlaceholder: "请输入描述 ...",
        link: "链接",
        enterLink: "请输入适合该图片的链接。",
        enterLinkPlaceholder: "请输入链接 ...",
      };
    case "fr":
      return {
        editImageBillboard: "Modifier l'image du panneau d'affichage",
        createImageBillboard: "Créer l'image du panneau d'affichage",
        editAImageBillboard: "Modifier une image du panneau d'affichage",
        addNewImageBillboard:
          "Ajouter une nouvelle image du panneau d'affichage",
        saveChanges: "Enregistrer les modifications",
        create: "Créer",
        minLength: "Entrez au moins 4 caractères.",
        imageBillboard: "Image du panneau d'affichage",
        updated: "mis à jour",
        imageBillboardUpdated: "Image du panneau d'affichage mise à jour!",
        close: "Fermer",
        somethingWentWrong: "Quelque chose a mal tourné !",
        imageBillboardDeleted: "Image du panneau d'affichage supprimée.",
        label: "Étiquette",
        enterLabel:
          "Veuillez entrer une étiquette appropriée pour toutes les images.",
        enterLabelPlaceholder: "Entrez l'étiquette ...",
        description: "Description",
        enterDescription:
          "Veuillez entrer une description appropriée pour toutes les images.",
        enterDescriptionPlaceholder: "Entrez la description ...",
        link: "Lien",
        enterLink: "Veuillez entrer un lien approprié pour l'image.",
        enterLinkPlaceholder: "Entrez le lien ...",
      };
    case "ja":
      return {
        editImageBillboard: "ビルボード画像を編集",
        createImageBillboard: "ビルボード画像を作成",
        editAImageBillboard: "ビルボード画像を編集",
        addNewImageBillboard: "新しいビルボード画像を追加",
        saveChanges: "変更を保存",
        create: "作成",
        minLength: "最低4文字を入力してください。",
        imageBillboard: "ビルボード画像",
        updated: "更新済み",
        imageBillboardUpdated: "ビルボード画像が更新されました！",
        close: "閉じる",
        somethingWentWrong: "何かがうまくいきませんでした！",
        imageBillboardDeleted: "ビルボード画像が削除されました。",
        label: "ラベル",
        enterLabel: "すべての画像に適したラベルを入力してください。",
        enterLabelPlaceholder: "ラベルを入力 ...",
        description: "説明",
        enterDescription: "すべての画像に適した説明を入力してください。",
        enterDescriptionPlaceholder: "説明を入力 ...",
        link: "リンク",
        enterLink: "画像に適したリンクを入力してください。",
        enterLinkPlaceholder: "リンクを入力 ...",
      };
    default:
      return {
        editImageBillboard: "Edit image billboard",
        createImageBillboard: "Create image billboard",
        editAImageBillboard: "Edit a image billboard",
        addNewImageBillboard: "Add a new image billboard",
        saveChanges: "Save changes",
        create: "Create",
        minLength: "Enter at least 4 characters.",
        imageBillboard: "Image billboard",
        updated: "updated",
        imageBillboardUpdated: "Image billboard updated!",
        close: "Close",
        somethingWentWrong: "Something went wrong!",
        imageBillboardDeleted: "Image billboard deleted.",
        label: "Label",
        enterLabel: "Please enter a label suitable for all images.",
        enterLabelPlaceholder: "Enter label ...",
        description: "Description",
        enterDescription: "Please enter a description suitable for all images.",
        enterDescriptionPlaceholder: "Enter description ...",
        link: "Link",
        enterLink: "Please enter a link suitable for the image.",
        enterLinkPlaceholder: "Enter link ...",
      };
  }
};

export function getNotFoundMessage(language: string) {
  switch (language) {
    case "vi":
      return "Không tìm thấy!";
    case "en":
      return "Not Found!";
    case "zh":
      return "未找到!";
    case "fr":
      return "Introuvable!";
    case "ja":
      return "見つかりませんでした！";
    default:
      return "Not Found!";
  }
}

export function getManageAttendanceClient(language: string) {
  switch (language) {
    case "vi":
      return {
        attendance: "Điểm danh",
        manageAttendance: "Quản lý điểm danh",
        api: "API",
        apiCalls: "API calls for quản lý điểm danh",
      };
    case "en":
      return {
        attendance: "Attendance",
        manageAttendance: "Manage Attendance",
        api: "API",
        apiCalls: "API calls for manage attendance",
      };
    case "zh":
      return {
        attendance: "点名",
        manageAttendance: "管理点名",
        api: "API",
        apiCalls: "管理点名的API调用",
      };
    case "fr":
      return {
        attendance: "Présence",
        manageAttendance: "Gérer la présence",
        api: "API",
        apiCalls: "Appels API pour gérer la présence",
      };
    case "ja":
      return {
        attendance: "出席",
        manageAttendance: "出席管理",
        api: "API",
        apiCalls: "出席管理のAPIコール",
      };
    default:
      return {
        attendance: "Attendance",
        manageAttendance: "Manage Attendance",
        api: "API",
        apiCalls: "API calls for manage attendance",
      };
  }
}

export const getDayName = (day: string, language: string) => {
  switch (language) {
    case "vi":
      switch (day) {
        case "Monday":
          return "Thứ 2";
        case "Tuesday":
          return "Thứ 3";
        case "Wednesday":
          return "Thứ 4";
        case "Thursday":
          return "Thứ 5";
        case "Friday":
          return "Thứ 6";
        case "Saturday":
          return "Thứ 7";
        case "Sunday":
          return "Chủ Nhật";
        default:
          return "";
      }
    case "en":
      switch (day) {
        case "Monday":
          return "Monday";
        case "Tuesday":
          return "Tuesday";
        case "Wednesday":
          return "Wednesday";
        case "Thursday":
          return "Thursday";
        case "Friday":
          return "Friday";
        case "Saturday":
          return "Saturday";
        case "Sunday":
          return "Sunday";
        default:
          return "";
      }
    case "zh":
      switch (day) {
        case "Monday":
          return "星期一";
        case "Tuesday":
          return "星期二";
        case "Wednesday":
          return "星期三";
        case "Thursday":
          return "星期四";
        case "Friday":
          return "星期五";
        case "Saturday":
          return "星期六";
        case "Sunday":
          return "星期天";
        default:
          return "";
      }
    case "fr":
      switch (day) {
        case "Monday":
          return "Lundi";
        case "Tuesday":
          return "Mardi";
        case "Wednesday":
          return "Mercredi";
        case "Thursday":
          return "Jeudi";
        case "Friday":
          return "Vendredi";
        case "Saturday":
          return "Samedi";
        case "Sunday":
          return "Dimanche";
        default:
          return "";
      }
    case "ja":
      switch (day) {
        case "Monday":
          return "月曜日";
        case "Tuesday":
          return "火曜日";
        case "Wednesday":
          return "水曜日";
        case "Thursday":
          return "木曜日";
        case "Friday":
          return "金曜日";
        case "Saturday":
          return "土曜日";
        case "Sunday":
          return "日曜日";
        default:
          return "";
      }
    default:
      return "";
  }
};

export const getManageStaffEditRow = (language: string) => {
  switch (language) {
    case "vi":
      return {
        notFound: "Không tìm thấy!",
        edit: "Chỉnh sửa",
        editAnExisting: "Chỉnh sửa một cái đã có sẵn",
      };
    case "en":
      return {
        notFound: "Not found!",
        edit: "Edit",
        editAnExisting: "Edit an existing",
      };
    case "zh":
      return {
        notFound: "没有找到！",
        edit: "编辑",
        editAnExisting: "编辑现有的",
      };
    case "fr":
      return {
        notFound: "Non trouvé !",
        edit: "Modifier",
        editAnExisting: "Modifier un existant",
      };
    case "ja":
      return {
        notFound: "見つかりません！",
        edit: "編集",
        editAnExisting: "既存の編集",
      };
    default:
      return {
        notFound: "Not found!",
        edit: "Edit",
        editAnExisting: "Edit an existing",
      };
  }
};

export const getManageStaffSchemaFormEdit = (language: string) => {
  switch (language) {
    case "vi":
      return {
        requiredName: "Bắt buộc nhập name.",
        requiredEmail: "Bắt buộc nhập email.",
        missingRole: "Bạn thiếu role.",
        invalidIdCard: "Vui lòng nhập số CMND hợp lệ chỉ có số.",
        invalidPhone: "Vui lòng nhập số điện thoại hợp lệ chỉ có số.",
        minLength: "Nhập ít nhất 2 ký tự.",
        addImage: "Hãy thêm 1 ảnh",
        requiredGender: "Bắt buộc chọn 1 gender.",
        requiredDegree: "Bắt buộc chọn 1 degree.",
        requiredMaritalStatus: "Bắt buộc chọn 1 maritalStatus.",
        requiredWorkingTime: "Bắt buộc chọn 1 workingTime.",
        requiredStartTime: "Hãy nhập giờ bắt đầu làm việc.",
      };
    case "en":
      return {
        requiredName: "Name is required.",
        requiredEmail: "Email is required.",
        missingRole: "Role is missing.",
        invalidIdCard: "Please enter a valid ID number with only numbers.",
        invalidPhone: "Please enter a valid phone number with only numbers.",
        minLength: "Enter at least 2 characters.",
        addImage: "Please add an image.",
        requiredGender: "You must select a gender.",
        requiredDegree: "You must select a degree.",
        requiredMaritalStatus: "You must select a marital status.",
        requiredWorkingTime: "You must select a working time.",
        requiredStartTime: "Please enter a start time.",
      };
    case "zh":
      return {
        requiredName: "必须输入姓名。",
        requiredEmail: "必须输入电子邮件。",
        missingRole: "缺少角色。",
        invalidIdCard: "请输入有效的身份证号码，只能是数字。",
        invalidPhone: "请输入有效的电话号码，只能是数字。",
        minLength: "请输入至少2个字符。",
        addImage: "请添加一张图片。",
        requiredGender: "必须选择性别。",
        requiredDegree: "必须选择学位。",
        requiredMaritalStatus: "必须选择婚姻状况。",
        requiredWorkingTime: "必须选择工作时间。",
        requiredStartTime: "请输入开始工作时间。",
      };
    case "fr":
      return {
        requiredName: "Le nom est requis.",
        requiredEmail: "L'email est requis.",
        missingRole: "Le rôle est manquant.",
        invalidIdCard:
          "Veuillez entrer un numéro de pièce d'identité valide, uniquement des chiffres.",
        invalidPhone:
          "Veuillez entrer un numéro de téléphone valide, uniquement des chiffres.",
        minLength: "Entrez au moins 2 caractères.",
        addImage: "Veuillez ajouter une image.",
        requiredGender: "Vous devez sélectionner un sexe.",
        requiredDegree: "Vous devez sélectionner un diplôme.",
        requiredMaritalStatus: "Vous devez sélectionner un statut matrimonial.",
        requiredWorkingTime: "Vous devez sélectionner un horaire de travail.",
        requiredStartTime: "Veuillez entrer une heure de début.",
      };
    case "ja":
      return {
        requiredName: "名前は必須です。",
        requiredEmail: "メールアドレスは必須です。",
        missingRole: "役割が不足しています。",
        invalidIdCard: "有効なIDカード番号を入力してください。数字のみ。",
        invalidPhone: "有効な電話番号を入力してください。数字のみ。",
        minLength: "2文字以上を入力してください。",
        addImage: "画像を追加してください。",
        requiredGender: "性別を選択する必要があります。",
        requiredDegree: "学位を選択する必要があります。",
        requiredMaritalStatus: "婚姻状況を選択する必要があります。",
        requiredWorkingTime: "勤務時間を選択する必要があります。",
        requiredStartTime: "開始時間を入力してください。",
      };
    default:
      return {
        requiredName: "Name is required.",
        requiredEmail: "Email is required.",
        missingRole: "Role is missing.",
        invalidIdCard: "Please enter a valid ID number with only numbers.",
        invalidPhone: "Please enter a valid phone number with only numbers.",
        minLength: "Enter at least 2 characters.",
        addImage: "Please add an image.",
        requiredGender: "You must select a gender.",
        requiredDegree: "You must select a degree.",
        requiredMaritalStatus: "You must select a marital status.",
        requiredWorkingTime: "You must select a working time.",
        requiredStartTime: "Please enter a start time.",
      };
  }
};

export const getManageStaffForm = (language: string) => {
  switch (language) {
    case "vi":
      return {
        updateSuccess: "Cập nhật thành công!",
        somethingWentWrong: "Đã xảy ra lỗi!",
        name: "Tên",
        enterName: "Nhập tên ...",
        phoneNumber: "Số điện thoại",
        maxPhoneNumberLength: "(*) Nhập tối đa 11 số!",
        samplePhoneNumber: "095348...",
        idCardExpiration: "Ngày hết hạn CMND",
        birthday: "Sinh nhật",
        startWorkingTime: "Thời gian bắt đầu làm việc",
        idCardNumber: "Số CCCD",
        maxIdCardLength: "(*) Nhập tối đa 12 số!",
        sampleIdCard: "0582356234...",
        gender: "Giới tính",
        selectGender: "Select Gender",
        degree: "Bằng cấp",
        selectDegree: "Select Degree",
        maritalStatus: "Tình trạng hôn nhân",
        selectMaritalStatus: "Select Marital Status",
        workingTime: "Thời gian làm việc",
        selectWorkingTime: "Select Working Time",
        issuedBy: "Cấp ở đâu",
        issuedByInfo: "Bộ Công An Quận ...",
        saveChanges: "Save Change",
      };
    case "en":
      return {
        updateSuccess: "Update successful!",
        somethingWentWrong: "Something went wrong!",
        name: "Name",
        enterName: "Enter name ...",
        phoneNumber: "Phone number",
        maxPhoneNumberLength: "(*) Enter up to 11 digits!",
        samplePhoneNumber: "095348...",
        idCardExpiration: "ID Card expiration date",
        birthday: "Birthday",
        startWorkingTime: "Start working time",
        idCardNumber: "ID Card number",
        maxIdCardLength: "(*) Enter up to 12 digits!",
        sampleIdCard: "0582356234...",
        gender: "Gender",
        selectGender: "Select Gender",
        degree: "Degree",
        selectDegree: "Select Degree",
        maritalStatus: "Marital Status",
        selectMaritalStatus: "Select Marital Status",
        workingTime: "Working time",
        selectWorkingTime: "Select Working Time",
        issuedBy: "Issued by",
        issuedByInfo: "Ministry of Public Security District ...",
        saveChanges: "Save Change",
      };
    case "zh":
      return {
        updateSuccess: "更新成功！",
        somethingWentWrong: "出了点问题！",
        name: "姓名",
        enterName: "请输入姓名 ...",
        phoneNumber: "电话号码",
        maxPhoneNumberLength: "(*) 输入最多11个数字！",
        samplePhoneNumber: "095348...",
        idCardExpiration: "身份证到期日",
        birthday: "生日",
        startWorkingTime: "开始工作时间",
        idCardNumber: "身份证号码",
        maxIdCardLength: "(*) 输入最多12个数字！",
        sampleIdCard: "0582356234...",
        gender: "性别",
        selectGender: "选择性别",
        degree: "学位",
        selectDegree: "选择学位",
        maritalStatus: "婚姻状况",
        selectMaritalStatus: "选择婚姻状况",
        workingTime: "工作时间",
        selectWorkingTime: "选择工作时间",
        issuedBy: "发证机构",
        issuedByInfo: "公安部区 ...",
        saveChanges: "保存更改",
      };
    case "fr":
      return {
        updateSuccess: "Mise à jour réussie!",
        somethingWentWrong: "Quelque chose a mal tourné!",
        name: "Nom",
        enterName: "Entrez le nom ...",
        phoneNumber: "Numéro de téléphone",
        maxPhoneNumberLength: "(*) Entrez jusqu'à 11 chiffres!",
        samplePhoneNumber: "095348...",
        idCardExpiration: "Date d'expiration de la carte d'identité",
        birthday: "Anniversaire",
        startWorkingTime: "Heure de début du travail",
        idCardNumber: "Numéro de carte d'identité",
        maxIdCardLength: "(*) Entrez jusqu'à 12 chiffres!",
        sampleIdCard: "0582356234...",
        gender: "Genre",
        selectGender: "Sélectionner le sexe",
        degree: "Diplôme",
        selectDegree: "Sélectionner le diplôme",
        maritalStatus: "État civil",
        selectMaritalStatus: "Sélectionner l'état civil",
        workingTime: "Heure de travail",
        selectWorkingTime: "Sélectionner l'heure de travail",
        issuedBy: "Délivré par",
        issuedByInfo: "Ministère de la sécurité publique District ...",
        saveChanges: "Sauvegarder les modifications",
      };
    case "ja":
      return {
        updateSuccess: "更新成功！",
        somethingWentWrong: "何かがうまくいきませんでした！",
        name: "名前",
        enterName: "名前を入力してください ...",
        phoneNumber: "電話番号",
        maxPhoneNumberLength: "(*) 最大11桁の数字を入力してください！",
        samplePhoneNumber: "095348...",
        idCardExpiration: "IDカードの有効期限",
        birthday: "誕生日",
        startWorkingTime: "勤務開始時間",
        idCardNumber: "IDカード番号",
        maxIdCardLength: "(*) 最大12桁の数字を入力してください！",
        sampleIdCard: "0582356234...",
        gender: "性別",
        selectGender: "性別を選択",
        degree: "学位",
        selectDegree: "学位を選択",
        maritalStatus: "婚姻状況",
        selectMaritalStatus: "婚姻状況を選択",
        workingTime: "勤務時間",
        selectWorkingTime: "勤務時間を選択",
        issuedBy: "発行元",
        issuedByInfo: "公安部区 ...",
        saveChanges: "変更を保存",
      };
    default:
      return {
        updateSuccess: "Update successful!",
        somethingWentWrong: "Something went wrong!",
        name: "Name",
        enterName: "Enter name ...",
        phoneNumber: "Phone number",
        maxPhoneNumberLength: "(*) Enter up to 11 digits!",
        samplePhoneNumber: "095348...",
        idCardExpiration: "ID Card expiration date",
        birthday: "Birthday",
        startWorkingTime: "Start working time",
        idCardNumber: "ID Card number",
        maxIdCardLength: "(*) Enter up to 12 digits!",
        sampleIdCard: "0582356234...",
        gender: "Gender",
        selectGender: "Select Gender",
        degree: "Degree",
        selectDegree: "Select Degree",
        maritalStatus: "Marital Status",
        selectMaritalStatus: "Select Marital Status",
        workingTime: "Working time",
        selectWorkingTime: "Select Working Time",
        issuedBy: "Issued by",
        issuedByInfo: "Ministry of Public Security District ...",
        saveChanges: "Save Change",
      };
  }
};

export const getManageStaffAction = (language: string) => {
  switch (language) {
    case "vi":
      return {
        staffIdCopied: "ID nhân viên đã được sao chép vào bảng t clipboard.",
        firedSuccessfully: "Đuổi việc thành công!",
        somethingWentWrong: "Đã xảy ra lỗi!",
        emailSent: "Email đã được gửi!",
        verificationEmailSentTo: "Email xác minh đã được gửi đến",
        updatingVerificationEmail: "Đang cập nhật email xác minh...",
        openMenu: "Mở menu",
        actions: "Hành động",
        copyId: "Sao chép ID",
        update: "Cập nhật",
        fireStaff: "Đuổi việc",
        sentVerify: "Gửi xác minh",
      };
    case "en":
      return {
        staffIdCopied: "STAFF Id copied to the clipboard.",
        firedSuccessfully: "Fired successfully!",
        somethingWentWrong: "Something went wrong!",
        emailSent: "Email sent!",
        verificationEmailSentTo: "Verification email sent to",
        updatingVerificationEmail: "Updating verification email...",
        openMenu: "Open menu",
        actions: "Actions",
        copyId: "Copy Id",
        update: "Update",
        fireStaff: "Fire staff",
        sentVerify: "Sent Verify",
      };
    case "zh":
      return {
        staffIdCopied: "员工ID已复制到剪贴板。",
        firedSuccessfully: "解雇成功！",
        somethingWentWrong: "出了点问题！",
        emailSent: "电子邮件已发送！",
        verificationEmailSentTo: "验证电子邮件已发送到",
        updatingVerificationEmail: "正在更新验证电子邮件...",
        openMenu: "打开菜单",
        actions: "操作",
        copyId: "复制ID",
        update: "更新",
        fireStaff: "解雇员工",
        sentVerify: "发送验证",
      };
    case "fr":
      return {
        staffIdCopied: "L'ID du personnel a été copié dans le presse-papiers.",
        firedSuccessfully: "Renvoi réussi!",
        somethingWentWrong: "Quelque chose a mal tourné!",
        emailSent: "E-mail envoyé!",
        verificationEmailSentTo: "E-mail de vérification envoyé à",
        updatingVerificationEmail: "Mise à jour de l'e-mail de vérification...",
        openMenu: "Ouvrir le menu",
        actions: "Actions",
        copyId: "Copier l'ID",
        update: "Mettre à jour",
        fireStaff: "Licencier le personnel",
        sentVerify: "Envoyer la vérification",
      };
    case "ja":
      return {
        staffIdCopied: "スタッフIDがクリップボードにコピーされました。",
        firedSuccessfully: "解雇が成功しました！",
        somethingWentWrong: "何かがうまくいきませんでした！",
        emailSent: "Eメールが送信されました！",
        verificationEmailSentTo: "確認メールが送信されました",
        updatingVerificationEmail: "確認メールを更新しています...",
        openMenu: "メニューを開く",
        actions: "アクション",
        copyId: "IDをコピー",
        update: "更新",
        fireStaff: "スタッフを解雇",
        sentVerify: "確認を送信",
      };
    default:
      return {
        staffIdCopied: "STAFF Id copied to the clipboard.",
        firedSuccessfully: "Fired successfully!",
        somethingWentWrong: "Something went wrong!",
        emailSent: "Email sent!",
        verificationEmailSentTo: "Verification email sent to",
        updatingVerificationEmail: "Updating verification email...",
        openMenu: "Open menu",
        actions: "Actions",
        copyId: "Copy Id",
        update: "Update",
        fireStaff: "Fire staff",
        sentVerify: "Sent Verify",
      };
  }
};

export const getManagestaffClient = (language: string) => {
  switch (language) {
    case "vi":
      return {
        sentAllToUser: "Đã gửi tất cả cho người dùng!",
        verificationEmailsSentTo: "Verification emails sent to",
        somethingWentWrong: "Đã xảy ra lỗi!",
        staff: "Nhân viên",
        manageStaff: "Quản lý nhân viên",
        sentAll: "Gửi tất cả",
        api: "API",
        apiCallsForStaff: "API calls for Staff",
      };
    case "en":
      return {
        sentAllToUser: "Sent all to the user!",
        verificationEmailsSentTo: "Verification emails sent to",
        somethingWentWrong: "Something went wrong!",
        staff: "Staff",
        manageStaff: "Manage staff",
        sentAll: "Sent All",
        api: "API",
        apiCallsForStaff: "API calls for Staff",
      };
    case "zh":
      return {
        sentAllToUser: "所有已发送给用户！",
        verificationEmailsSentTo: "验证电子邮件已发送到",
        somethingWentWrong: "出了点问题！",
        staff: "员工",
        manageStaff: "管理员工",
        sentAll: "发送全部",
        api: "API",
        apiCallsForStaff: "员工的API调用",
      };
    case "fr":
      return {
        sentAllToUser: "Tout envoyé à l'utilisateur !",
        verificationEmailsSentTo: "E-mails de vérification envoyés à",
        somethingWentWrong: "Quelque chose a mal tourné !",
        staff: "Personnel",
        manageStaff: "Gérer le personnel",
        sentAll: "Envoyer tout",
        api: "API",
        apiCallsForStaff: "Appels API pour le personnel",
      };
    case "ja":
      return {
        sentAllToUser: "すべてのメールがユーザーに送信されました！",
        verificationEmailsSentTo: "確認メールが送信されました",
        somethingWentWrong: "何かがうまくいきませんでした！",
        staff: "スタッフ",
        manageStaff: "スタッフ管理",
        sentAll: "すべて送信",
        api: "API",
        apiCallsForStaff: "スタッフのAPI呼び出し",
      };
    default:
      return {
        sentAllToUser: "Sent all to the user!",
        verificationEmailsSentTo: "Verification emails sent to",
        somethingWentWrong: "Something went wrong!",
        staff: "Staff",
        manageStaff: "Manage staff",
        sentAll: "Sent All",
        api: "API",
        apiCallsForStaff: "API calls for Staff",
      };
  }
};

export const getManageStaffSchemaForm = (language: string) => {
  switch (language) {
    case "vi":
      return {
        edit: "Chỉnh sửa",
        saveChanges: "Lưu thay đổi",
        requiredEmail: "Bắt buộc nhập email",
        requiredName: "Bắt buộc nhập name",
        validCmnd: "Vui lòng nhập số CMND hợp lệ chỉ có số.",
        validPhoneNumber: "Vui lòng nhập số điện thoại hợp lệ chỉ có số.",
        requiredGender: "Bắt buộc chọn 1 gender.",
        requiredDegree: "Bắt buộc chọn 1 degree.",
        requiredMaritalStatus: "Bắt buộc chọn 1 maritalStatus.",
        requiredWorkingTime: "Bắt buộc chọn 1 workingTime.",
        enterStartWorkTime: "Hãy nhập giờ bắt đầu làm việc.",
        minLength2: "Nhập ít nhất 2 ký tự.",
        chooseImage: "Hãy chọn 1 ảnh.",
      };
    case "en":
      return {
        edit: "Edit",
        saveChanges: "Save changes",
        requiredEmail: "Email is required",
        requiredName: "Name is required",
        validCmnd: "Please enter a valid ID number with only numbers.",
        validPhoneNumber:
          "Please enter a valid phone number with only numbers.",
        requiredGender: "Please select 1 gender.",
        requiredDegree: "Please select 1 degree.",
        requiredMaritalStatus: "Please select 1 marital status.",
        requiredWorkingTime: "Please select 1 working time.",
        enterStartWorkTime: "Please enter the start work time.",
        minLength2: "Enter at least 2 characters.",
        chooseImage: "Please choose 1 image.",
      };
    case "zh":
      return {
        edit: "编辑",
        saveChanges: "保存更改",
        requiredEmail: "必须输入电子邮件",
        requiredName: "必须输入姓名",
        validCmnd: "请输入有效的身份证号码，仅允许数字。",
        validPhoneNumber: "请输入有效的电话号码，仅允许数字。",
        requiredGender: "必须选择1个性别。",
        requiredDegree: "必须选择1个学历。",
        requiredMaritalStatus: "必须选择1个婚姻状况。",
        requiredWorkingTime: "必须选择1个工作时间。",
        enterStartWorkTime: "请输入开始工作时间。",
        minLength2: "请输入至少2个字符。",
        chooseImage: "请选择1张图片。",
      };
    case "fr":
      return {
        edit: "Modifier",
        saveChanges: "Enregistrer les modifications",
        requiredEmail: "Email requis",
        requiredName: "Nom requis",
        validCmnd:
          "Veuillez entrer un numéro de pièce d'identité valide avec uniquement des chiffres.",
        validPhoneNumber:
          "Veuillez entrer un numéro de téléphone valide avec uniquement des chiffres.",
        requiredGender: "Veuillez sélectionner un sexe.",
        requiredDegree: "Veuillez sélectionner un diplôme.",
        requiredMaritalStatus: "Veuillez sélectionner un statut matrimonial.",
        requiredWorkingTime: "Veuillez sélectionner un horaire de travail.",
        enterStartWorkTime: "Veuillez entrer l'heure de début de travail.",
        minLength2: "Entrez au moins 2 caractères.",
        chooseImage: "Veuillez choisir une image.",
      };
    case "ja":
      return {
        edit: "編集",
        saveChanges: "変更を保存",
        requiredEmail: "メールアドレスは必須です",
        requiredName: "名前は必須です",
        validCmnd:
          "有効なID番号を入力してください。数字のみで入力してください。",
        validPhoneNumber:
          "有効な電話番号を入力してください。数字のみで入力してください。",
        requiredGender: "1つの性別を選択してください。",
        requiredDegree: "1つの学位を選択してください。",
        requiredMaritalStatus: "1つの婚姻状況を選択してください。",
        requiredWorkingTime: "1つの勤務時間を選択してください。",
        enterStartWorkTime: "勤務開始時間を入力してください。",
        minLength2: "2文字以上入力してください。",
        chooseImage: "1枚の画像を選択してください。",
      };
    default:
      return {
        edit: "Edit",
        saveChanges: "Save changes",
        requiredEmail: "Email is required",
        requiredName: "Name is required",
        validCmnd: "Please enter a valid ID number with only numbers.",
        validPhoneNumber:
          "Please enter a valid phone number with only numbers.",
        requiredGender: "Please select 1 gender.",
        requiredDegree: "Please select 1 degree.",
        requiredMaritalStatus: "Please select 1 marital status.",
        requiredWorkingTime: "Please select 1 working time.",
        enterStartWorkTime: "Please enter the start work time.",
        minLength2: "Enter at least 2 characters.",
        chooseImage: "Please choose 1 image.",
      };
  }
};

export const getDayNameForm = (day: string, language: string): string => {
  switch (language) {
    case "vi":
      return (
        {
          Monday: "Thứ 2",
          Tuesday: "Thứ 3",
          Wednesday: "Thứ 4",
          Thursday: "Thứ 5",
          Friday: "Thứ 6",
          Saturday: "Thứ 7",
          Sunday: "Chủ Nhật",
        }[day] || day
      );

    case "en":
      return (
        {
          Monday: "Monday",
          Tuesday: "Tuesday",
          Wednesday: "Wednesday",
          Thursday: "Thursday",
          Friday: "Friday",
          Saturday: "Saturday",
          Sunday: "Sunday",
        }[day] || day
      );

    case "zh":
      return (
        {
          Monday: "星期一",
          Tuesday: "星期二",
          Wednesday: "星期三",
          Thursday: "星期四",
          Friday: "星期五",
          Saturday: "星期六",
          Sunday: "星期天",
        }[day] || day
      );

    case "fr":
      return (
        {
          Monday: "Lundi",
          Tuesday: "Mardi",
          Wednesday: "Mercredi",
          Thursday: "Jeudi",
          Friday: "Vendredi",
          Saturday: "Samedi",
          Sunday: "Dimanche",
        }[day] || day
      );

    case "ja":
      return (
        {
          Monday: "月曜日",
          Tuesday: "火曜日",
          Wednesday: "水曜日",
          Thursday: "木曜日",
          Friday: "金曜日",
          Saturday: "土曜日",
          Sunday: "日曜日",
        }[day] || day
      );

    default:
      return day;
  }
};

export const getManageStaffsForm = (language: string) => {
  switch (language) {
    case "vi":
      return {
        selectOneRepresentative: "Chỉ chọn 1 đại diện hãy xóa các ảnh khác!",
        manageStaff: "Quản lý nhân viên",
        updated: "đã cập nhật",
        manageStaffUpdated: "Quản lý nhân viên đã được cập nhật!",
        close: "Đóng",
        somethingWentWrong: "Đã xảy ra lỗi!",
        colorDeleted: "Màu đã bị xóa.",
        image: "Hình ảnh",
        employeeImage: "Đây là hình ảnh nhân viên ảnh phông xanh.",
        selectOneClearImage: "Chỉ chọn 1 ảnh đại diện rõ nét.",
        phoneNumber: "Số điện thoại",
        phoneNumberMaxLength: "Số điện thoại của nhân viên tối đa 10 số.",
        examplePhoneNumber: "095348...",
        idCardNumber: "Số CCDD",
        idCardNumberMaxLength: "Nhập tối đa 12 số giống với trong CCCD",
        exampleIdCardNumber: "0582356234...",
        name: "Tên",
        nameDescription: "Tên nhân viên theo giấy khai sinh.",
        exampleName: "Họ và tên ...",
        birthday: "Sinh nhật",
        birthdayDescription:
          "Dựa vào giấy khai sinh ghi chính xác sinh nhật để ưa đãi cho nhân viên.",
        workingStartTime: "Thời gian bắt đầu làm việc",
        workingStartTimeDescription:
          "Quan trọng: Liên quan đến điểm danh của nhân viên sẽ bắt đầu điểm danh vào mấy giờ.",
        idCardIssued: "CCCD cấp ở đâu",
        idCardIssuedDescription:
          "Nơi căn cước công dân được cấp. VD: Bộ Công An Quận Bình Tân.",
        exampleIdCardIssuer: "Bộ Công An Quận ...",
        idCardExpirationDate: "Ngày hết hạn CMND",
        idCardExpirationDescription:
          "Thời gian Căn cước công dân hết hạn năm ở dưới ảnh hoặc dưới nơi cập.",
        gender: "Giới tính",
        selectGender: "Lựa chọn giới tính nhân viên.",
        genderDescription: "Hãy lựa chọn giới tính phù hợp với thẻ căn cước",
        selectDegree: "Lựa chọn bằng cấp",
        degree: "Bằng cấp",
        degreeDescription:
          "Bắt buộc nhân viên cung cấp lương sẽ phù thuộc vào bằng cấp có được.",
        maritalStatus: "Tình trạng hôn nhân",
        maritalStatusDescription: "Theo dõi tình trạng hôn nhân của nhân viên.",
        maritalStatusSelect: "Lựa chọn tình trạng hôn nhân",
        workingTime: "Thời gian làm việc",
        workingTimeDescription:
          "Lựa chọn loại công việc bán thời gian hay fulltime.",
        workingTimeSelect: "Lựa chọn thời gian làm việc",
        employeeQrCode: "Qr code nhân viên",
        qrCodeDescription:
          "Mã này sẽ được cấp bởi quản lý để nhân viên điểm danh.",
        qrCodeExample: "Mã qr ...",
        employeeNfc: "NFC Nhân viên",
        nfcDescription: "Nhân viên sẽ được tích hợp NFC vào QrCode.",
        nfPlaceholder: "Mã nfc...",
        identityVerification: "Định danh",
        identityVerificationDescription:
          "Xác nhận thông tin nhân viên đã cập nhật đầy đủ thông tin hay chưa.",
        accountVerification: "Tài khoản xác thực",
        workingDay: "Thứ làm việc",
        workingDayNote:
          "Lưu ý: Chọn đúng thứ ngày làm việc để nhân viên điểm danh. Nếu chọn sai nhân viên không thể điểm danh.",
      };

    case "en":
      return {
        selectOneRepresentative:
          "Select one representative, please remove other images!",
        manageStaff: "Manage Staff",
        updated: "updated",
        manageStaffUpdated: "Manage Staff updated!",
        close: "Close",
        somethingWentWrong: "Something went wrong!",
        colorDeleted: "Color deleted.",
        image: "Image",
        employeeImage: "This is the employee's image with a green background.",
        selectOneClearImage: "Please select one clear profile image.",
        phoneNumber: "Phone Number",
        phoneNumberMaxLength:
          "Employee's phone number must be a maximum of 10 digits.",
        examplePhoneNumber: "095348...",
        idCardNumber: "ID Card Number",
        idCardNumberMaxLength:
          "Enter a maximum of 12 digits, as in the ID card.",
        exampleIdCardNumber: "0582356234...",
        name: "Name",
        nameDescription: "Employee's name according to the birth certificate.",
        exampleName: "Full name ...",
        birthday: "Birthday",
        birthdayDescription:
          "Please enter the exact birthdate as stated on the birth certificate for employee benefits.",
        workingStartTime: "Working Start Time",
        workingStartTimeDescription:
          "Important: This will determine the start time for employee attendance.",
        idCardIssued: "ID Card Issued By",
        idCardIssuedDescription:
          "The issuing authority of the ID card. E.g., Ministry of Public Security, District ...",
        exampleIdCardIssuer: "Ministry of Public Security, District ...",
        idCardExpirationDate: "ID Card Expiration Date",
        idCardExpirationDescription:
          "The expiration date of the ID card, which is located below the image or under the details.",
        gender: "Gender",
        selectGender: "Select employee's gender.",
        genderDescription: "Please select a gender that matches the ID card.",
        selectDegree: "Select Degree",
        degree: "Degree",
        degreeDescription:
          "Employees must provide their degree; salary will depend on the degree obtained.",
        maritalStatus: "Marital Status",
        maritalStatusDescription: "Track the marital status of the employee.",
        maritalStatusSelect: "Select Marital Status",
        workingTime: "Working Time",
        workingTimeDescription:
          "Choose whether the employee works part-time or full-time.",
        workingTimeSelect: "Select Working Time",
        employeeQrCode: "Employee QR Code",
        qrCodeDescription:
          "This code will be issued by the manager for employee attendance.",
        qrCodeExample: "QR code ...",
        employeeNfc: "Employee NFC",
        nfcDescription:
          "The employee will be integrated with NFC into the QR code.",
        nfPlaceholder: "NFC code...",
        identityVerification: "Identity Verification",
        identityVerificationDescription:
          "Verify if the employee's information has been fully updated.",
        accountVerification: "Account Verification",
        workingDay: "Working Day",
        workingDayNote:
          "Note: Choose the correct working day to enable employee attendance. If selected incorrectly, the employee will not be able to check-in.",
      };

    case "zh":
      return {
        selectOneRepresentative: "请选择一个代表，请删除其他图片！",
        manageStaff: "管理员工",
        updated: "已更新",
        manageStaffUpdated: "管理员工已更新！",
        close: "关闭",
        somethingWentWrong: "出错了！",
        colorDeleted: "颜色已删除。",
        image: "图片",
        employeeImage: "这是员工的绿底图片。",
        selectOneClearImage: "请选择一个清晰的头像图片。",
        phoneNumber: "电话号码",
        phoneNumberMaxLength: "员工电话号码最多10位。",
        examplePhoneNumber: "095348...",
        idCardNumber: "身份证号",
        idCardNumberMaxLength: "最多输入12位数字，和身份证上的数字一样。",
        exampleIdCardNumber: "0582356234...",
        name: "姓名",
        nameDescription: "根据出生证明填写员工姓名。",
        exampleName: "姓名 ...",
        birthday: "生日",
        birthdayDescription: "请准确输入员工的生日，以便提供福利。",
        workingStartTime: "工作开始时间",
        workingStartTimeDescription: "重要：这将确定员工打卡的开始时间。",
        idCardIssued: "身份证发放地",
        idCardIssuedDescription: "身份证发放机关，例如：公安部，某区。",
        exampleIdCardIssuer: "公安部，某区...",
        idCardExpirationDate: "身份证到期日",
        idCardExpirationDescription: "身份证到期日位于图片或下方详细信息。",
        gender: "性别",
        selectGender: "选择员工性别。",
        genderDescription: "请选择与身份证匹配的性别。",
        selectDegree: "选择学位",
        degree: "学位",
        degreeDescription: "员工必须提供学位，薪资将根据学位确定。",
        maritalStatus: "婚姻状况",
        maritalStatusDescription: "跟踪员工的婚姻状况。",
        maritalStatusSelect: "选择婚姻状况",
        workingTime: "工作时间",
        workingTimeDescription: "选择员工是全职还是兼职。",
        workingTimeSelect: "选择工作时间",
        employeeQrCode: "员工二维码",
        qrCodeDescription: "此二维码将由管理者为员工的打卡提供。",
        qrCodeExample: "二维码 ...",
        employeeNfc: "员工NFC",
        nfcDescription: "员工将被集成NFC到二维码中。",
        nfPlaceholder: "NFC 码...",
        identityVerification: "身份验证",
        identityVerificationDescription: "验证员工信息是否已完整更新。",
        accountVerification: "账户验证",
        workingDay: "工作日",
        workingDayNote:
          "注意：选择正确的工作日，以启用员工打卡。如果选择错误，员工将无法打卡。",
      };

    case "fr":
      return {
        selectOneRepresentative:
          "Sélectionnez un représentant, veuillez supprimer les autres images !",
        manageStaff: "Gérer le personnel",
        updated: "mis à jour",
        manageStaffUpdated: "Gérer le personnel mis à jour !",
        close: "Fermer",
        somethingWentWrong: "Quelque chose s'est mal passé !",
        colorDeleted: "Couleur supprimée.",
        image: "Image",
        employeeImage: "Voici l'image de l'employé avec un fond vert.",
        selectOneClearImage:
          "Veuillez sélectionner une image de profil claire.",
        phoneNumber: "Numéro de téléphone",
        phoneNumberMaxLength:
          "Le numéro de téléphone de l'employé doit comporter un maximum de 10 chiffres.",
        examplePhoneNumber: "095348...",
        idCardNumber: "Numéro de carte d'identité",
        idCardNumberMaxLength:
          "Entrez un maximum de 12 chiffres, comme dans la carte d'identité.",
        exampleIdCardNumber: "0582356234...",
        name: "Nom",
        nameDescription: "Nom de l'employé selon l'acte de naissance.",
        exampleName: "Nom complet ...",
        birthday: "Date de naissance",
        birthdayDescription:
          "Veuillez entrer la date de naissance exacte selon l'acte de naissance pour bénéficier des avantages pour l'employé.",
        workingStartTime: "Heure de début du travail",
        workingStartTimeDescription:
          "Important : Cela déterminera l'heure de début de l'horodateur de l'employé.",
        idCardIssued: "Carte d'identité délivrée par",
        idCardIssuedDescription:
          "L'autorité de délivrance de la carte d'identité. Ex : Ministère de la sécurité publique, district ...",
        exampleIdCardIssuer: "Ministère de la sécurité publique, district ...",
        idCardExpirationDate: "Date d'expiration de la carte d'identité",
        idCardExpirationDescription:
          "La date d'expiration de la carte d'identité se trouve sous l'image ou sous les détails.",
        gender: "Sexe",
        selectGender: "Sélectionnez le sexe de l'employé.",
        genderDescription:
          "Veuillez sélectionner un sexe qui correspond à la carte d'identité.",
        selectDegree: "Sélectionnez le diplôme",
        degree: "Diplôme",
        degreeDescription:
          "Les employés doivent fournir leur diplôme ; le salaire dépendra du diplôme obtenu.",
        maritalStatus: "État civil",
        maritalStatusDescription: "Suivez l'état civil de l'employé.",
        maritalStatusSelect: "Sélectionnez l'état civil",
        workingTime: "Temps de travail",
        workingTimeDescription:
          "Choisissez si l'employé travaille à temps partiel ou à temps plein.",
        workingTimeSelect: "Sélectionnez le temps de travail",
        employeeQrCode: "QR Code de l'employé",
        qrCodeDescription:
          "Ce code sera fourni par le responsable pour que l'employé puisse pointer.",
        qrCodeExample: "QR code ...",
        employeeNfc: "NFC Employé",
        nfcDescription:
          "L'employé sera intégré avec la technologie NFC dans le QR code.",
        nfPlaceholder: "Code NFC...",
        identityVerification: "Vérification de l'identité",
        identityVerificationDescription:
          "Vérifiez si les informations de l'employé ont été entièrement mises à jour.",
        accountVerification: "Vérification du compte",
        workingDay: "Jour de travail",
        workingDayNote:
          "Note : Choisissez le jour de travail correct pour activer l'horodateur de l'employé. Si sélectionné incorrectement, l'employé ne pourra pas pointer.",
      };

    case "ja":
      return {
        selectOneRepresentative:
          "1つの代表者を選択してください。他の画像を削除してください！",
        manageStaff: "スタッフ管理",
        updated: "更新されました",
        manageStaffUpdated: "スタッフ管理が更新されました！",
        close: "閉じる",
        somethingWentWrong: "何かがうまくいきませんでした！",
        colorDeleted: "色が削除されました。",
        image: "画像",
        employeeImage: "これは従業員の緑色の背景の画像です。",
        selectOneClearImage: "1つの明確なプロフィール画像を選択してください。",
        phoneNumber: "電話番号",
        phoneNumberMaxLength: "従業員の電話番号は最大10桁にしてください。",
        examplePhoneNumber: "095348...",
        idCardNumber: "IDカード番号",
        idCardNumberMaxLength:
          "最大12桁を入力してください。IDカードと同じように。",
        exampleIdCardNumber: "0582356234...",
        name: "名前",
        nameDescription: "出生証明書に基づいて従業員の名前を入力してください。",
        exampleName: "フルネーム ...",
        birthday: "誕生日",
        birthdayDescription:
          "従業員の誕生日を出生証明書に基づいて正確に入力してください。",
        workingStartTime: "勤務開始時間",
        workingStartTimeDescription:
          "重要：これは従業員の打刻開始時間を決定します。",
        idCardIssued: "IDカード発行機関",
        idCardIssuedDescription: "IDカードの発行機関。例：公安省、区 ...",
        exampleIdCardIssuer: "公安省、区 ...",
        idCardExpirationDate: "IDカードの有効期限",
        idCardExpirationDescription:
          "IDカードの有効期限は、画像または詳細の下に記載されています。",
        gender: "性別",
        selectGender: "従業員の性別を選択してください。",
        genderDescription:
          "従業員の性別をIDカードに一致するように選択してください。",
        selectDegree: "学位を選択してください。",
        degree: "学位",
        degreeDescription:
          "従業員は学位を提供する必要があります。給与は取得した学位に基づいて決まります。",
        maritalStatus: "婚姻状況",
        maritalStatusDescription: "従業員の婚姻状況を追跡します。",
        maritalStatusSelect: "婚姻状況を選択",
        workingTime: "勤務時間",
        workingTimeDescription:
          "従業員がフルタイムかパートタイムかを選択します。",
        workingTimeSelect: "勤務時間を選択",
        employeeQrCode: "従業員QRコード",
        qrCodeDescription:
          "このコードはマネージャーから従業員の打刻用に提供されます。",
        qrCodeExample: "QRコード ...",
        employeeNfc: "従業員NFC",
        nfcDescription: "従業員はNFC技術をQRコードに統合されます。",
        nfPlaceholder: "NFC コード...",
        identityVerification: "本人確認",
        identityVerificationDescription:
          "従業員の情報が完全に更新されたか確認してください。",
        accountVerification: "アカウント確認",
        workingDay: "勤務日",
        workingDayNote:
          "注意：従業員が打刻できるように、正しい勤務日を選択してください。誤って選択すると、従業員は打刻できません。",
      };

    default:
      return {
        selectOneRepresentative:
          "Select one representative, please remove other images!",
        manageStaff: "Manage Staff",
        updated: "updated",
        manageStaffUpdated: "Manage Staff updated!",
        close: "Close",
        somethingWentWrong: "Something went wrong!",
        colorDeleted: "Color deleted.",
        image: "Image",
        employeeImage: "This is the employee's image with a green background.",
        selectOneClearImage: "Please select one clear profile image.",
        phoneNumber: "Phone Number",
        phoneNumberMaxLength:
          "Employee's phone number must be a maximum of 10 digits.",
        examplePhoneNumber: "095348...",
        idCardNumber: "ID Card Number",
        idCardNumberMaxLength:
          "Enter a maximum of 12 digits, as in the ID card.",
        exampleIdCardNumber: "0582356234...",
        name: "Name",
        nameDescription: "Employee's name according to the birth certificate.",
        exampleName: "Full name ...",
        birthday: "Birthday",
        birthdayDescription:
          "Please enter the exact birthdate as stated on the birth certificate for employee benefits.",
        workingStartTime: "Working Start Time",
        workingStartTimeDescription:
          "Important: This will determine the start time for employee attendance.",
        idCardIssued: "ID Card Issued By",
        idCardIssuedDescription:
          "The issuing authority of the ID card. E.g., Ministry of Public Security, District ...",
        exampleIdCardIssuer: "Ministry of Public Security, District ...",
        idCardExpirationDate: "ID Card Expiration Date",
        idCardExpirationDescription:
          "The expiration date of the ID card, which is located below the image or under the details.",
        gender: "Gender",
        selectGender: "Select employee's gender.",
        genderDescription: "Please select a gender that matches the ID card.",
        selectDegree: "Select Degree",
        degree: "Degree",
        degreeDescription:
          "Employees must provide their degree; salary will depend on the degree obtained.",
        maritalStatus: "Marital Status",
        maritalStatusDescription: "Track the marital status of the employee.",
        maritalStatusSelect: "Select Marital Status",
        workingTime: "Working Time",
        workingTimeDescription:
          "Choose whether the employee works part-time or full-time.",
        workingTimeSelect: "Select Working Time",
        employeeQrCode: "Employee QR Code",
        qrCodeDescription:
          "This code will be issued by the manager for employee attendance.",
        qrCodeExample: "QR code ...",
        employeeNfc: "Employee NFC",
        nfcDescription:
          "The employee will be integrated with NFC into the QR code.",
        nfPlaceholder: "NFC code...",
        identityVerification: "Identity Verification",
        identityVerificationDescription:
          "Verify if the employee's information has been fully updated.",
        accountVerification: "Account Verification",
        workingDay: "Working Day",
        workingDayNote:
          "Note: Choose the correct working day to enable employee attendance. If selected incorrectly, the employee will not be able to check-in.",
      };
  }
};

export const getDayNameMultipleSelct = (language: string) => {
  switch (language) {
    case "vi":
      return {
        Monday: "Thứ 2",
        Tuesday: "Thứ 3",
        Wednesday: "Thứ 4",
        Thursday: "Thứ 5",
        Friday: "Thứ 6",
        Saturday: "Thứ 7",
        Sunday: "Chủ nhật",
      };

    case "en":
      return {
        Monday: "Monday",
        Tuesday: "Tuesday",
        Wednesday: "Wednesday",
        Thursday: "Thursday",
        Friday: "Friday",
        Saturday: "Saturday",
        Sunday: "Sunday",
      };

    case "zh":
      return {
        Monday: "星期一",
        Tuesday: "星期二",
        Wednesday: "星期三",
        Thursday: "星期四",
        Friday: "星期五",
        Saturday: "星期六",
        Sunday: "星期天",
      };

    case "fr":
      return {
        Monday: "Lundi",
        Tuesday: "Mardi",
        Wednesday: "Mercredi",
        Thursday: "Jeudi",
        Friday: "Vendredi",
        Saturday: "Samedi",
        Sunday: "Dimanche",
      };

    case "ja":
      return {
        Monday: "月曜日",
        Tuesday: "火曜日",
        Wednesday: "水曜日",
        Thursday: "木曜日",
        Friday: "金曜日",
        Saturday: "土曜日",
        Sunday: "日曜日",
      };
    default:
      return {
        Monday: "Monday",
        Tuesday: "Tuesday",
        Wednesday: "Wednesday",
        Thursday: "Thursday",
        Friday: "Friday",
        Saturday: "Saturday",
        Sunday: "Sunday",
      };
  }
};

export const getDelivery = (language: string) => {
  switch (language) {
    case "vi":
      return {
        receiveOrder: "Nhận đơn khách hàng",
        updatingStatus: "Cập nhật trạng thái...",
        somethingWentWrong: "Đã xảy ra lỗi!",
        receiveReturnOrder: "Nhận đơn khách hàng trả lại",
        openMenu: "Mở menu",
        actions: "Hành động",
        receiveReturnedGoods: "Nhận hàng trả",
        receiveOrderPlaceholder: "Nhận đơn",
        empty: "Trống",
      };

    case "zh":
      return {
        receiveOrder: "接收客户订单",
        updatingStatus: "更新状态...",
        somethingWentWrong: "出了点问题！",
        receiveReturnOrder: "接收客户退货订单",
        openMenu: "打开菜单",
        actions: "操作",
        receiveReturnedGoods: "接收退货",
        receiveOrderPlaceholder: "接收订单",
        empty: "空的",
      };

    case "fr":
      return {
        receiveOrder: "Recevoir la commande client",
        updatingStatus: "Mise à jour du statut...",
        somethingWentWrong: "Quelque chose a mal tourné !",
        receiveReturnOrder: "Recevoir la commande de retour client",
        openMenu: "Ouvrir le menu",
        actions: "Actions",
        receiveReturnedGoods: "Recevoir les biens retournés",
        receiveOrderPlaceholder: "Recevoir une commande",
        empty: "Vide",
      };

    case "ja":
      return {
        receiveOrder: "顧客の注文を受け取る",
        updatingStatus: "ステータスを更新しています...",
        somethingWentWrong: "何かがうまくいきませんでした！",
        receiveReturnOrder: "顧客の返品注文を受け取る",
        openMenu: "メニューを開く",
        actions: "アクション",
        receiveReturnedGoods: "返品された商品を受け取る",
        receiveOrderPlaceholder: "注文を受け取る",
        empty: "空",
      };

    default:
      return {
        receiveOrder: "Receive customer order",
        updatingStatus: "Updating status...",
        somethingWentWrong: "Something went wrong!",
        receiveReturnOrder: "Receive customer return order",
        openMenu: "Open menu",
        actions: "Actions",
        receiveReturnedGoods: "Receive returned goods",
        receiveOrderPlaceholder: "Receive order",
        empty: "Empty",
      };
  }
};

export const getDeliveryClient = (language: string) => {
  switch (language) {
    case "vi":
      return {
        delivery: "Giao hàng",
        manageDelivery: "Quản lý giao hàng cho các shipper",
      };

    case "en":
      return {
        delivery: "Delivery",
        manageDelivery: "Manage delivery for shippers",
      };

    case "zh":
      return {
        delivery: "配送",
        manageDelivery: "为快递员管理配送",
      };

    case "fr":
      return {
        delivery: "Livraison",
        manageDelivery: "Gérer la livraison pour les livreurs",
      };

    case "ja":
      return {
        delivery: "配送",
        manageDelivery: "配送員のための配送管理",
      };

    default:
      return {
        delivery: "Delivery",
        manageDelivery: "Manage delivery for shippers",
      };
  }
};

export const getNavDelivery = (language: string) => {
  switch (language) {
    case "vi":
      return {
        receiveOrder: "Nhận đơn hàng",
        delivery: "Giao hàng",
        deliveredOrders: "Đơn hàng đã giao của bạn",
      };

    case "en":
      return {
        receiveOrder: "Receive order",
        delivery: "Delivery",
        deliveredOrders: "Your delivered orders",
      };

    case "zh":
      return {
        receiveOrder: "接收订单",
        delivery: "配送",
        deliveredOrders: "您的已配送订单",
      };

    case "fr":
      return {
        receiveOrder: "Recevoir la commande",
        delivery: "Livraison",
        deliveredOrders: "Vos commandes livrées",
      };

    case "ja":
      return {
        receiveOrder: "注文を受け取る",
        delivery: "配送",
        deliveredOrders: "配達済みの注文",
      };

    default:
      return {
        receiveOrder: "Receive order",
        delivery: "Delivery",
        deliveredOrders: "Your delivered orders",
      };
  }
};

export const getOrderFormLeaflet = (language: string) => {
  switch (language) {
    case "vi":
      return {
        destination: "Điểm đến",
        invalidAddress: "Địa chỉ không đúng",
        defaultMap: "Map mặc định",
        waterColorMap: "Map màu nước",
        darkMode: "Dark",
        googleStreet: "Google Street",
        googleSatellite: "Google Satellite",
        geocodingFailed: "Geocoding failed for location",
        enterAddress: "Nhập địa chỉ...",
        somethingWentWrong: "Something went wrong!",
      };

    case "en":
      return {
        destination: "Destination",
        invalidAddress: "Invalid address",
        defaultMap: "Default map",
        waterColorMap: "Water color map",
        darkMode: "Dark",
        googleStreet: "Google Street",
        googleSatellite: "Google Satellite",
        geocodingFailed: "Geocoding failed for location",
        enterAddress: "Enter address...",
        somethingWentWrong: "Something went wrong!",
      };

    case "zh":
      return {
        destination: "目的地",
        invalidAddress: "地址无效",
        defaultMap: "默认地图",
        waterColorMap: "水彩地图",
        darkMode: "暗黑模式",
        googleStreet: "谷歌街景",
        googleSatellite: "谷歌卫星",
        geocodingFailed: "地理编码失败",
        enterAddress: "输入地址...",
        somethingWentWrong: "出了点问题！",
      };

    case "fr":
      return {
        destination: "Destination",
        invalidAddress: "Adresse invalide",
        defaultMap: "Carte par défaut",
        waterColorMap: "Carte couleur aquarelle",
        darkMode: "Sombre",
        googleStreet: "Google Street",
        googleSatellite: "Google Satellite",
        geocodingFailed: "Échec du géocodage pour cet emplacement",
        enterAddress: "Entrer l'adresse...",
        somethingWentWrong: "Quelque chose a mal tourné!",
      };

    case "ja":
      return {
        destination: "目的地",
        invalidAddress: "無効な住所",
        defaultMap: "デフォルトマップ",
        waterColorMap: "水彩画マップ",
        darkMode: "ダーク",
        googleStreet: "Google Street",
        googleSatellite: "Google Satellite",
        geocodingFailed: "位置情報のジオコーディングに失敗しました",
        enterAddress: "住所を入力...",
        somethingWentWrong: "何かがうまくいきませんでした！",
      };

    default:
      return {
        destination: "Destination",
        invalidAddress: "Invalid address",
        defaultMap: "Default map",
        waterColorMap: "Water color map",
        darkMode: "Dark",
        googleStreet: "Google Street",
        googleSatellite: "Google Satellite",
        geocodingFailed: "Geocoding failed for location",
        enterAddress: "Enter address...",
        somethingWentWrong: "Something went wrong!",
      };
  }
};

export const getDeliveryComfirmationAction = (language: string) => {
  switch (language) {
    case "vi":
      return {
        overdueOrder:
          "Đơn hàng đã quá hạn 2 ngày, không thể xác thực thành công.",
        deliveredSuccessfully: "Đã giao thành công",
        updatingStatus: "Đang cập nhật trạng thái...",
        errorOccurred: "Something went wrong!",
        overdueCancelOrder:
          "Đơn hàng đã quá hạn 2 ngày, không thể hủy đơn hàng.",
        enterOrderStatus: "Hãy nhập nội dung trạng thái đơn hàng!",
        canceledSuccessfully: "Đã hủy thành công đơn hàng",
        returnedProductReceived: "Đã nhận sản phẩm trả lại",
        actions: "Actions",
        receivedReturnedGoods: "Đã nhận lại hàng",
        delivered: "Đã giao",
        cancelOrderReason: "Hủy đơn hàng (lý do)",
        address: "Địa chỉ",
        empty: "Trống",
        deliveredImage: "Hình ảnh đã giao",
        selectClearImages: "Chỉ chọn 2 ảnh sản phẩm rõ nét.",
        cancel: "Cancel",
        send: "Gửi",
        enterCancelReason: "Nhập lý do hủy đơn...",
        openMenu: "Mở menu",
        takeTwoDeliveredImages: "Hãy chụp 2 ảnh sản phẩm đã giao.",
        save: "Lưu",
      };

    case "en":
      return {
        overdueOrder:
          "Order is overdue by 2 days, unable to verify successfully.",
        deliveredSuccessfully: "Delivered successfully",
        updatingStatus: "Updating status...",
        errorOccurred: "Something went wrong!",
        overdueCancelOrder:
          "Order is overdue by 2 days, unable to cancel the order.",
        enterOrderStatus: "Please enter the order status!",
        canceledSuccessfully: "Order canceled successfully",
        returnedProductReceived: "Returned product received",
        actions: "Actions",
        receivedReturnedGoods: "Returned goods received",
        delivered: "Delivered",
        cancelOrderReason: "Cancel order (reason)",
        address: "Address",
        empty: "Empty",
        deliveredImage: "Delivered image",
        selectClearImages: "Please select 2 clear product images.",
        cancel: "Cancel",
        send: "Send",
        enterCancelReason: "Enter cancel reason...",
        openMenu: "Open menu",
        takeTwoDeliveredImages:
          "Please take 2 images of the delivered product.",
        save: "Save",
      };

    case "zh":
      return {
        overdueOrder: "订单已逾期 2 天，无法验证成功。",
        deliveredSuccessfully: "已成功配送",
        updatingStatus: "正在更新状态...",
        errorOccurred: "发生错误！",
        overdueCancelOrder: "订单已逾期 2 天，无法取消订单。",
        enterOrderStatus: "请输入订单状态内容！",
        canceledSuccessfully: "订单已成功取消",
        returnedProductReceived: "已收到退货产品",
        actions: "操作",
        receivedReturnedGoods: "已收到退回的货物",
        delivered: "已配送",
        cancelOrderReason: "取消订单（理由）",
        address: "地址",
        empty: "空的",
        deliveredImage: "已配送图片",
        selectClearImages: "请选择2张清晰的产品图片。",
        cancel: "取消",
        send: "发送",
        enterCancelReason: "输入取消原因...",
        openMenu: "打开菜单",
        takeTwoDeliveredImages: "请拍摄2张已配送产品的照片。",
        save: "保存",
      };

    case "fr":
      return {
        overdueOrder:
          "La commande est en retard de 2 jours, impossible de vérifier avec succès.",
        deliveredSuccessfully: "Livré avec succès",
        updatingStatus: "Mise à jour du statut...",
        errorOccurred: "Une erreur s'est produite !",
        overdueCancelOrder:
          "La commande est en retard de 2 jours, impossible d'annuler la commande.",
        enterOrderStatus: "Veuillez entrer le statut de la commande !",
        canceledSuccessfully: "Commande annulée avec succès",
        returnedProductReceived: "Produit retourné reçu",
        actions: "Actions",
        receivedReturnedGoods: "Marchandises retournées reçues",
        delivered: "Livré",
        cancelOrderReason: "Annuler la commande (raison)",
        address: "Adresse",
        empty: "Vide",
        deliveredImage: "Image livrée",
        selectClearImages: "Veuillez sélectionner 2 images claires du produit.",
        cancel: "Annuler",
        send: "Envoyer",
        enterCancelReason: "Entrez la raison de l'annulation...",
        openMenu: "Ouvrir le menu",
        takeTwoDeliveredImages: "Veuillez prendre 2 photos du produit livré.",
        save: "Enregistrer",
      };

    case "ja":
      return {
        overdueOrder: "注文は2日遅れており、正常に確認できません。",
        deliveredSuccessfully: "配達成功",
        updatingStatus: "ステータスを更新中...",
        errorOccurred: "何かがうまくいきませんでした！",
        overdueCancelOrder: "注文は2日遅れており、キャンセルできません。",
        enterOrderStatus: "注文のステータス内容を入力してください！",
        canceledSuccessfully: "注文は正常にキャンセルされました",
        returnedProductReceived: "返品された商品を受け取りました",
        actions: "アクション",
        receivedReturnedGoods: "返品された商品を受け取った",
        delivered: "配達済み",
        cancelOrderReason: "注文キャンセル（理由）",
        address: "住所",
        empty: "空",
        deliveredImage: "配達画像",
        selectClearImages: "明確な商品画像を2枚選択してください。",
        cancel: "キャンセル",
        send: "送信",
        enterCancelReason: "キャンセル理由を入力してください...",
        openMenu: "メニューを開く",
        takeTwoDeliveredImages: "配達済みの商品画像を2枚撮影してください。",
        save: "保存",
      };

    default:
      return {
        overdueOrder:
          "Order is overdue by 2 days, unable to verify successfully.",
        deliveredSuccessfully: "Delivered successfully",
        updatingStatus: "Updating status...",
        errorOccurred: "Something went wrong!",
        overdueCancelOrder:
          "Order is overdue by 2 days, unable to cancel the order.",
        enterOrderStatus: "Please enter the order status!",
        canceledSuccessfully: "Order canceled successfully",
        returnedProductReceived: "Returned product received",
        actions: "Actions",
        receivedReturnedGoods: "Returned goods received",
        delivered: "Delivered",
        cancelOrderReason: "Cancel order (reason)",
        address: "Address",
        empty: "Empty",
        deliveredImage: "Delivered image",
        selectClearImages: "Please select 2 clear product images.",
        cancel: "Cancel",
        send: "Send",
        enterCancelReason: "Enter cancel reason...",
        openMenu: "Open menu",
        takeTwoDeliveredImages:
          "Please take 2 images of the delivered product.",
        save: "Save",
      };
  }
};

export const getDeliveryComfirmationClient = (language: string) => {
  switch (language) {
    case "vi":
      return {
        orderInProgress: "Đơn hàng đang giao",
        manageOrderConfirmation: "Quản lý xác nhận đơn hàng đang giao",
      };

    case "en":
      return {
        orderInProgress: "Order in progress",
        manageOrderConfirmation: "Manage order confirmation in progress",
      };

    case "zh":
      return {
        orderInProgress: "订单正在配送中",
        manageOrderConfirmation: "管理正在配送的订单确认",
      };

    case "fr":
      return {
        orderInProgress: "Commande en cours de livraison",
        manageOrderConfirmation:
          "Gérer la confirmation de la commande en cours de livraison",
      };

    case "ja":
      return {
        orderInProgress: "配送中の注文",
        manageOrderConfirmation: "配送中の注文確認を管理",
      };

    default:
      return {
        orderInProgress: "Order in progress",
        manageOrderConfirmation: "Manage order confirmation in progress",
      };
  }
};

export const getMyOrderDelivered = (language: string) => {
  switch (language) {
    case "vi":
      return {
        yourOrders: "Đơn hàng của bạn",
        manageDeliveredOrCancelledOrders:
          "Quản lý đơn hàng đã giao hoặc đã hủy",
      };

    case "en":
      return {
        yourOrders: "Your orders",
        manageDeliveredOrCancelledOrders:
          "Manage delivered or cancelled orders",
      };

    case "zh":
      return {
        yourOrders: "您的订单",
        manageDeliveredOrCancelledOrders: "管理已配送或已取消的订单",
      };

    case "fr":
      return {
        yourOrders: "Vos commandes",
        manageDeliveredOrCancelledOrders:
          "Gérer les commandes livrées ou annulées",
      };

    case "ja":
      return {
        yourOrders: "あなたの注文",
        manageDeliveredOrCancelledOrders:
          "配達済みまたはキャンセルされた注文を管理",
      };

    default:
      return {
        yourOrders: "Your orders",
        manageDeliveredOrCancelledOrders:
          "Manage delivered or cancelled orders",
      };
  }
};

export const getOrderAction = (language: string) => {
  switch (language) {
    case "vi":
      return {
        receivedAtStore: "Đã nhận tại cửa hàng",
        updatingStatus: "Đang cập nhật trạng thái...",
        somethingWentWrong: "Có lỗi xảy ra!",
        collectedMoneyFromShipper: "Đã lấy tiền từ shipper",
        confirmResendOrder: "Xác nhận giao lại đơn hàng",
        confirmOrderSuccessfully: "Xác nhận thành công đơn hàng",
        orderPrepared: "Đã soạn xong đơn hàng",
        handoverShipperSuccess: "Bàn giao shipper thành công!",
        receiveCustomerOrder: "Nhận đơn khách hàng",
        receiveReturnedOrder: "Nhận đơn khách hàng trả lại",
        deliveredSuccessfully: "Đã giao thành công",
        enterOrderStatus: "Hãy nhập nội dung trạng thái đơn hàng!",
        orderCancelledSuccessfully: "Đã hủy thành công đơn hàng",
        receivedReturnedProduct: "Đã nhận sản phẩm trả lại",
        openMenu: "Mở menu",
        actions: "Hành động",
        empty: "Trống",
        address: "Địa chỉ",
        collectMoneyFromShipper: "Lấy tiền hàng từ shipper",
        resendGoods: "Giao lại hàng",
        confirmOrder: "Xác nhận đơn hàng",
        orderPreparedAtStore: "Soạn hàng nhận tại cửa hàng",
        shipperPickup: "Shipper đến nhận",
        receiveOrder: "Nhận đơn",
        receiveReturnedGoods: "Nhận hàng trả",
        goodsReceivedBack: "Đã nhận lại hàng",
        delivered: "Đã giao",
        cancelOrderReason: "Hủy đơn hàng (lý do)",
        deliveredImage: "Hình ảnh đã giao",
        takeTwoDeliveredImages: "Hãy chụp 2 ảnh sản phẩm đã giao.",
        selectClearImages: "Chỉ chọn 2 ảnh sản phẩm rõ nét.",
        cancel: "Hủy",
        send: "Gửi",
        enterCancelReason: "Nhập lý do hủy đơn...",
        save: "Lưu",
        prepared: "Đã soạn xong",
        handoverToShipper: "Bàn giao shipper",
      };

    case "en":
      return {
        receivedAtStore: "Received at store",
        updatingStatus: "Updating status...",
        somethingWentWrong: "Something went wrong!",
        collectedMoneyFromShipper: "Collected money from shipper",
        confirmResendOrder: "Confirm resend order",
        confirmOrderSuccessfully: "Order confirmed successfully",
        orderPrepared: "Order prepared",
        handoverShipperSuccess: "Handover to shipper successful!",
        receiveCustomerOrder: "Receive customer order",
        receiveReturnedOrder: "Receive returned customer order",
        deliveredSuccessfully: "Delivered successfully",
        enterOrderStatus: "Please enter the order status!",
        orderCancelledSuccessfully: "Order cancelled successfully",
        receivedReturnedProduct: "Received returned product",
        openMenu: "Open menu",
        actions: "Actions",
        empty: "Empty",
        address: "Address",
        collectMoneyFromShipper: "Collect money from shipper",
        resendGoods: "Resend goods",
        confirmOrder: "Confirm order",
        orderPreparedAtStore: "Order prepared at store",
        shipperPickup: "Shipper pickup",
        receiveOrder: "Receive order",
        receiveReturnedGoods: "Receive returned goods",
        goodsReceivedBack: "Goods received back",
        delivered: "Delivered",
        cancelOrderReason: "Cancel order (reason)",
        deliveredImage: "Delivered image",
        takeTwoDeliveredImages:
          "Please take 2 pictures of the delivered products.",
        selectClearImages: "Only select 2 clear product images.",
        cancel: "Cancel",
        send: "Send",
        enterCancelReason: "Enter the reason for cancellation...",
        save: "Save",
        prepared: "Prepared",
        handoverToShipper: "Handover to shipper",
      };

    case "zh":
      return {
        receivedAtStore: "已在店内接收",
        updatingStatus: "正在更新状态...",
        somethingWentWrong: "发生错误！",
        collectedMoneyFromShipper: "已从配送员处收款",
        confirmResendOrder: "确认重新配送订单",
        confirmOrderSuccessfully: "订单确认成功",
        orderPrepared: "订单已准备好",
        handoverShipperSuccess: "成功移交配送员！",
        receiveCustomerOrder: "接收客户订单",
        receiveReturnedOrder: "接收退回的客户订单",
        deliveredSuccessfully: "配送成功",
        enterOrderStatus: "请输入订单状态！",
        orderCancelledSuccessfully: "订单取消成功",
        receivedReturnedProduct: "收到退回的产品",
        openMenu: "打开菜单",
        actions: "操作",
        empty: "空",
        address: "地址",
        collectMoneyFromShipper: "从配送员处收款",
        resendGoods: "重新配送商品",
        confirmOrder: "确认订单",
        orderPreparedAtStore: "订单在店内已准备好",
        shipperPickup: "配送员取货",
        receiveOrder: "接收订单",
        receiveReturnedGoods: "接收退货",
        goodsReceivedBack: "商品已退回",
        delivered: "已配送",
        cancelOrderReason: "取消订单（原因）",
        deliveredImage: "配送图片",
        takeTwoDeliveredImages: "请拍摄 2 张配送商品的照片。",
        selectClearImages: "仅选择 2 张清晰的商品照片。",
        cancel: "取消",
        send: "发送",
        enterCancelReason: "输入取消原因...",
        save: "保存",
        prepared: "已准备好",
        handoverToShipper: "移交配送员",
      };

    case "fr":
      return {
        receivedAtStore: "Reçu au magasin",
        updatingStatus: "Mise à jour du statut...",
        somethingWentWrong: "Une erreur s'est produite !",
        collectedMoneyFromShipper: "Argent collecté auprès du livreur",
        confirmResendOrder: "Confirmer la réexpédition de la commande",
        confirmOrderSuccessfully: "Commande confirmée avec succès",
        orderPrepared: "Commande préparée",
        handoverShipperSuccess: "Livraison au livreur réussie !",
        receiveCustomerOrder: "Recevoir la commande client",
        receiveReturnedOrder: "Recevoir la commande retournée",
        deliveredSuccessfully: "Livré avec succès",
        enterOrderStatus: "Veuillez saisir le statut de la commande !",
        orderCancelledSuccessfully: "Commande annulée avec succès",
        receivedReturnedProduct: "Produit retourné reçu",
        openMenu: "Ouvrir le menu",
        actions: "Actions",
        empty: "Vide",
        address: "Adresse",
        collectMoneyFromShipper: "Collecter l'argent auprès du livreur",
        resendGoods: "Renvoyer les marchandises",
        confirmOrder: "Confirmer la commande",
        orderPreparedAtStore: "Commande préparée en magasin",
        shipperPickup: "Livreur vient chercher",
        receiveOrder: "Recevoir la commande",
        receiveReturnedGoods: "Recevoir les marchandises retournées",
        goodsReceivedBack: "Marchandises reçues en retour",
        delivered: "Livré",
        cancelOrderReason: "Annuler la commande (raison)",
        deliveredImage: "Image livrée",
        takeTwoDeliveredImages:
          "Veuillez prendre 2 photos des produits livrés.",
        selectClearImages:
          "Choisissez uniquement 2 photos claires des produits.",
        cancel: "Annuler",
        send: "Envoyer",
        enterCancelReason: "Entrez la raison de l'annulation...",
        save: "Enregistrer",
        prepared: "Préparé",
        handoverToShipper: "Remis au livreur",
      };

    case "ja":
      return {
        receivedAtStore: "店舗で受け取り済み",
        updatingStatus: "ステータスを更新中...",
        somethingWentWrong: "問題が発生しました！",
        collectedMoneyFromShipper: "配送業者からの支払いを受け取りました",
        confirmResendOrder: "再配送の注文を確認する",
        confirmOrderSuccessfully: "注文を正常に確認しました",
        orderPrepared: "注文を準備しました",
        handoverShipperSuccess: "配送業者への引き渡しに成功！",
        receiveCustomerOrder: "顧客の注文を受け取る",
        receiveReturnedOrder: "返品された顧客の注文を受け取る",
        deliveredSuccessfully: "配達完了",
        enterOrderStatus: "注文状況を入力してください！",
        orderCancelledSuccessfully: "注文が正常にキャンセルされました",
        receivedReturnedProduct: "返品された製品を受け取りました",
        openMenu: "メニューを開く",
        actions: "アクション",
        empty: "空",
        address: "住所",
        collectMoneyFromShipper: "配送業者から支払いを受け取る",
        resendGoods: "商品を再配送する",
        confirmOrder: "注文を確認する",
        orderPreparedAtStore: "店舗で準備した注文",
        shipperPickup: "配送業者が受け取る",
        receiveOrder: "注文を受け取る",
        receiveReturnedGoods: "返品商品を受け取る",
        goodsReceivedBack: "返品された商品を受け取る",
        delivered: "配達済み",
        cancelOrderReason: "注文をキャンセルする（理由）",
        deliveredImage: "配達済み画像",
        takeTwoDeliveredImages: "配達商品を2枚撮影してください。",
        selectClearImages: "2枚の鮮明な商品画像のみを選択してください。",
        cancel: "キャンセル",
        send: "送信",
        enterCancelReason: "キャンセル理由を入力してください...",
        save: "保存",
        prepared: "準備完了",
        handoverToShipper: "配送業者に引き渡し",
      };

    default:
      return {
        receivedAtStore: "Received at store",
        updatingStatus: "Updating status...",
        somethingWentWrong: "Something went wrong!",
        collectedMoneyFromShipper: "Collected money from shipper",
        confirmResendOrder: "Confirm resend order",
        confirmOrderSuccessfully: "Order confirmed successfully",
        orderPrepared: "Order prepared",
        handoverShipperSuccess: "Handover to shipper successful!",
        receiveCustomerOrder: "Receive customer order",
        receiveReturnedOrder: "Receive returned customer order",
        deliveredSuccessfully: "Delivered successfully",
        enterOrderStatus: "Please enter the order status!",
        orderCancelledSuccessfully: "Order cancelled successfully",
        receivedReturnedProduct: "Received returned product",
        openMenu: "Open menu",
        actions: "Actions",
        empty: "Empty",
        address: "Address",
        collectMoneyFromShipper: "Collect money from shipper",
        resendGoods: "Resend goods",
        confirmOrder: "Confirm order",
        orderPreparedAtStore: "Order prepared at store",
        shipperPickup: "Shipper pickup",
        receiveOrder: "Receive order",
        receiveReturnedGoods: "Receive returned goods",
        goodsReceivedBack: "Goods received back",
        delivered: "Delivered",
        cancelOrderReason: "Cancel order (reason)",
        deliveredImage: "Delivered image",
        takeTwoDeliveredImages:
          "Please take 2 pictures of the delivered products.",
        selectClearImages: "Only select 2 clear product images.",
        cancel: "Cancel",
        send: "Send",
        enterCancelReason: "Enter the reason for cancellation...",
        save: "Save",
        prepared: "Prepared",
        handoverToShipper: "Handover to shipper",
      };
  }
};

export const getOrderClient = (language: string) => {
  switch (language) {
    case "vi":
      return {
        order: "Đơn hàng",
        manageProductOrders: "Quản lý đơn hàng sản phẩm",
      };

    case "en":
      return {
        order: "Order",
        manageProductOrders: "Manage product orders",
      };

    case "zh":
      return {
        order: "订单",
        manageProductOrders: "管理产品订单",
      };

    case "fr":
      return {
        order: "Commande",
        manageProductOrders: "Gérer les commandes de produits",
      };

    case "ja":
      return {
        order: "注文",
        manageProductOrders: "商品の注文を管理する",
      };

    default:
      return {
        order: "Order",
        manageProductOrders: "Manage product orders",
      };
  }
};


export const getOrderNavbar = (language: string) => {
  switch (language) {
    case "vi":
      return {
        confirmOrder: "Xác nhận đơn hàng",
        pickUpAtStore: "Nhận tại cửa hàng",
        prepareGoods: "Soạn hàng",
        orderOverview: "Tổng quan đơn hàng",
        returnGoods: "Trả hàng",
      };

    case "en":
      return {
        confirmOrder: "Confirm order",
        pickUpAtStore: "Pick up at store",
        prepareGoods: "Prepare goods",
        orderOverview: "Order overview",
        returnGoods: "Return goods",
      };

    case "zh":
      return {
        confirmOrder: "确认订单",
        pickUpAtStore: "在店取货",
        prepareGoods: "准备商品",
        orderOverview: "订单概览",
        returnGoods: "退货",
      };

    case "fr":
      return {
        confirmOrder: "Confirmer la commande",
        pickUpAtStore: "Retirer en magasin",
        prepareGoods: "Préparer les marchandises",
        orderOverview: "Aperçu de la commande",
        returnGoods: "Retourner les marchandises",
      };

    case "ja":
      return {
        confirmOrder: "注文を確認する",
        pickUpAtStore: "店舗で受け取る",
        prepareGoods: "商品の準備",
        orderOverview: "注文の概要",
        returnGoods: "返品",
      };

    default:
      return {
        confirmOrder: "Confirm order",
        pickUpAtStore: "Pick up at store",
        prepareGoods: "Prepare goods",
        orderOverview: "Order overview",
        returnGoods: "Return goods",
      };
  }
};


export const getOrderConfirmationActions = (language: string) => {
  switch (language) {
    case "vi":
      return {
        confirmOrderSuccessfully: "Xác nhận thành công đơn hàng",
        updatingStatus: "Đang cập nhật trạng thái...",
        somethingWentWrong: "Something went wrong!",
        openMenu: "Mở menu",
        actions: "Actions",
        confirmOrder: "Xác nhận đơn hàng",
        empty: "Trống",
      };

    case "en":
      return {
        confirmOrderSuccessfully: "Order confirmed successfully",
        updatingStatus: "Updating status...",
        somethingWentWrong: "Something went wrong!",
        openMenu: "Open menu",
        actions: "Actions",
        confirmOrder: "Confirm order",
        empty: "Empty",
      };

    case "zh":
      return {
        confirmOrderSuccessfully: "订单确认成功",
        updatingStatus: "更新状态中...",
        somethingWentWrong: "出错了！",
        openMenu: "打开菜单",
        actions: "操作",
        confirmOrder: "确认订单",
        empty: "空",
      };

    case "fr":
      return {
        confirmOrderSuccessfully: "Commande confirmée avec succès",
        updatingStatus: "Mise à jour du statut...",
        somethingWentWrong: "Quelque chose s'est mal passé !",
        openMenu: "Ouvrir le menu",
        actions: "Actions",
        confirmOrder: "Confirmer la commande",
        empty: "Vide",
      };

    case "ja":
      return {
        confirmOrderSuccessfully: "注文が正常に確認されました",
        updatingStatus: "ステータス更新中...",
        somethingWentWrong: "何かがうまくいきませんでした！",
        openMenu: "メニューを開く",
        actions: "アクション",
        confirmOrder: "注文を確認する",
        empty: "空",
      };

    default:
      return {
        confirmOrderSuccessfully: "Order confirmed successfully",
        updatingStatus: "Updating status...",
        somethingWentWrong: "Something went wrong!",
        openMenu: "Open menu",
        actions: "Actions",
        confirmOrder: "Confirm order",
        empty: "Empty",
      };
  }
};

export const getOrderConfirmationClient = (language: string) => {
  switch (language) {
    case "vi":
      return {
        confirmOrder: "Xác nhận đơn hàng",
        manageOrderConfirmation: "Quản lý xác nhận đơn hàng",
      };

    case "en":
      return {
        confirmOrder: "Confirm order",
        manageOrderConfirmation: "Manage order confirmation",
      };

    case "zh":
      return {
        confirmOrder: "确认订单",
        manageOrderConfirmation: "管理订单确认",
      };

    case "fr":
      return {
        confirmOrder: "Confirmer la commande",
        manageOrderConfirmation: "Gérer la confirmation de la commande",
      };

    case "ja":
      return {
        confirmOrder: "注文を確認する",
        manageOrderConfirmation: "注文確認を管理する",
      };

    default:
      return {
        confirmOrder: "Confirm order",
        manageOrderConfirmation: "Manage order confirmation",
      };
  }
};


export const getOrderProcessPrepareAction = (language: string) => {
  switch (language) {
    case "vi":
      return {
        orderPrepared: "Đã soạn xong đơn hàng",
        updatingStatus: "Đang cập nhật trạng thái...",
        somethingWentWrong: "Something went wrong!",
        openMenu: "Mở menu",
        actions: "Actions",
        handoverToShipper: "Bàn giao shipper",
        empty: "Trống",
        prepared: "Đã soạn xong", // Đã soạn xong
      };

    case "en":
      return {
        orderPrepared: "Order prepared",
        updatingStatus: "Updating status...",
        somethingWentWrong: "Something went wrong!",
        openMenu: "Open menu",
        actions: "Actions",
        handoverToShipper: "Handover to shipper",
        empty: "Empty",
        prepared: "Prepared", // Đã soạn xong
      };

    case "zh":
      return {
        orderPrepared: "订单已准备好",
        updatingStatus: "更新状态中...",
        somethingWentWrong: "出错了！",
        openMenu: "打开菜单",
        actions: "操作",
        handoverToShipper: "交给配送员",
        empty: "空",
        prepared: "已准备好", // Đã soạn xong
      };

    case "fr":
      return {
        orderPrepared: "Commande préparée",
        updatingStatus: "Mise à jour du statut...",
        somethingWentWrong: "Quelque chose s'est mal passé !",
        openMenu: "Ouvrir le menu",
        actions: "Actions",
        handoverToShipper: "Remise au livreur",
        empty: "Vide",
        prepared: "Préparé", // Đã soạn xong
      };

    case "ja":
      return {
        orderPrepared: "注文が準備完了しました",
        updatingStatus: "ステータス更新中...",
        somethingWentWrong: "何かがうまくいきませんでした！",
        openMenu: "メニューを開く",
        actions: "アクション",
        handoverToShipper: "配送業者に引き渡し",
        empty: "空",
        prepared: "準備完了", // Đã soạn xong
      };

    default:
      return {
        orderPrepared: "Order prepared",
        updatingStatus: "Updating status...",
        somethingWentWrong: "Something went wrong!",
        openMenu: "Open menu",
        actions: "Actions",
        handoverToShipper: "Handover to shipper",
        empty: "Empty",
        prepared: "Prepared", // Đã soạn xong
      };
  }
};

export const getOrderProcessPrepareClient = (language: string) => {
  switch (language) {
    case "vi":
      return {
        prepareGoods: "Soạn hàng",
        staffPrepareGoods: "Nhân viên soạn hàng",
      };

    case "en":
      return {
        prepareGoods: "Prepare goods",
        staffPrepareGoods: "Staff prepares goods",
      };

    case "zh":
      return {
        prepareGoods: "准备商品",
        staffPrepareGoods: "员工准备商品",
      };

    case "fr":
      return {
        prepareGoods: "Préparer les marchandises",
        staffPrepareGoods: "Le personnel prépare les marchandises",
      };

    case "ja":
      return {
        prepareGoods: "商品を準備する",
        staffPrepareGoods: "スタッフが商品を準備する",
      };

    default:
      return {
        prepareGoods: "Prepare goods",
        staffPrepareGoods: "Staff prepares goods",
      };
  }
};

export const getOrderPickupStoreAction = (language: string) => {
  switch (language) {
    case "vi":
      return {
        confirmOrderSuccessfully: "Xác nhận thành công đơn hàng",
        updatingStatus: "Đang cập nhật trạng thái...",
        somethingWentWrong: "Something went wrong!",
        openMenu: "Mở menu",
        actions: "Actions",
        orderPreparedAtStore: "Soạn hàng nhận tại cửa hàng",
        empty: "Trống",
      };

    case "en":
      return {
        confirmOrderSuccessfully: "Order confirmed successfully",
        updatingStatus: "Updating status...",
        somethingWentWrong: "Something went wrong!",
        openMenu: "Open menu",
        actions: "Actions",
        orderPreparedAtStore: "Prepare goods at store",
        empty: "Empty",
      };

    case "zh":
      return {
        confirmOrderSuccessfully: "订单确认成功",
        updatingStatus: "更新状态中...",
        somethingWentWrong: "出错了！",
        openMenu: "打开菜单",
        actions: "操作",
        orderPreparedAtStore: "在店铺准备商品",
        empty: "空",
      };

    case "fr":
      return {
        confirmOrderSuccessfully: "Commande confirmée avec succès",
        updatingStatus: "Mise à jour du statut...",
        somethingWentWrong: "Quelque chose s'est mal passé !",
        openMenu: "Ouvrir le menu",
        actions: "Actions",
        orderPreparedAtStore: "Préparer les marchandises au magasin",
        empty: "Vide",
      };

    case "ja":
      return {
        confirmOrderSuccessfully: "注文が正常に確認されました",
        updatingStatus: "ステータス更新中...",
        somethingWentWrong: "何かがうまくいきませんでした！",
        openMenu: "メニューを開く",
        actions: "アクション",
        orderPreparedAtStore: "店舗で商品を準備する",
        empty: "空",
      };

    default:
      return {
        confirmOrderSuccessfully: "Order confirmed successfully",
        updatingStatus: "Updating status...",
        somethingWentWrong: "Something went wrong!",
        openMenu: "Open menu",
        actions: "Actions",
        orderPreparedAtStore: "Prepare goods at store",
        empty: "Empty",
      };
  }
};

export const getOrderPickupStoreClient = (language: string) => {
  switch (language) {
    case "vi":
      return {
        receiveAtStore: "Nhận tại cửa hàng",
        manageCustomerReceiveAtStore: "Quản lý khách hàng nhận tại cửa hàng",
      };

    case "en":
      return {
        receiveAtStore: "Receive at store",
        manageCustomerReceiveAtStore: "Manage customers receiving at store",
      };

    case "zh":
      return {
        receiveAtStore: "到店领取",
        manageCustomerReceiveAtStore: "管理到店领取的客户",
      };

    case "fr":
      return {
        receiveAtStore: "Réception en magasin",
        manageCustomerReceiveAtStore: "Gérer les clients recevant en magasin",
      };

    case "ja":
      return {
        receiveAtStore: "店舗で受け取る",
        manageCustomerReceiveAtStore: "店舗で受け取る顧客を管理する",
      };

    default:
      return {
        receiveAtStore: "Receive at store",
        manageCustomerReceiveAtStore: "Manage customers receiving at store",
      };
  }
};

export const getOrderReturnProductAction = (language: string) => {
  switch (language) {
    case "vi":
      return {
        handoverShipperSuccess: "Bàn giao shipper thành công!",
        updatingStatus: "Đang cập nhật trạng thái...",
        somethingWentWrong: "Something went wrong!",
        openMenu: "Mở menu",
        actions: "Actions",
        shipperPickup: "Shipper đến nhận",
        empty: "Trống",
      };

    case "en":
      return {
        handoverShipperSuccess: "Handover to shipper successful!",
        updatingStatus: "Updating status...",
        somethingWentWrong: "Something went wrong!",
        openMenu: "Open menu",
        actions: "Actions",
        shipperPickup: "Shipper picking up",
        empty: "Empty",
      };

    case "zh":
      return {
        handoverShipperSuccess: "成功交付给配送员！",
        updatingStatus: "更新状态中...",
        somethingWentWrong: "出错了！",
        openMenu: "打开菜单",
        actions: "操作",
        shipperPickup: "配送员来取",
        empty: "空",
      };

    case "fr":
      return {
        handoverShipperSuccess: "Remise au livreur réussie!",
        updatingStatus: "Mise à jour du statut...",
        somethingWentWrong: "Quelque chose s'est mal passé !",
        openMenu: "Ouvrir le menu",
        actions: "Actions",
        shipperPickup: "Le livreur vient chercher",
        empty: "Vide",
      };

    case "ja":
      return {
        handoverShipperSuccess: "配送業者への引き渡しが完了しました！",
        updatingStatus: "ステータス更新中...",
        somethingWentWrong: "何かがうまくいきませんでした！",
        openMenu: "メニューを開く",
        actions: "アクション",
        shipperPickup: "配送業者が取りに来る",
        empty: "空",
      };

    default:
      return {
        handoverShipperSuccess: "Handover to shipper successful!",
        updatingStatus: "Updating status...",
        somethingWentWrong: "Something went wrong!",
        openMenu: "Open menu",
        actions: "Actions",
        shipperPickup: "Shipper picking up",
        empty: "Empty",
      };
  }
};

export const getOrderReturnProductClient = (language: string) => {
  switch (language) {
    case "vi":
      return {
        receiveAtStore: "Nhận tại cửa hàng",
        manageCustomerReceiveAtStore: "Quản lý khách hàng nhận tại cửa hàng",
      };

    case "en":
      return {
        receiveAtStore: "Receive at store",
        manageCustomerReceiveAtStore: "Manage customers receiving at store",
      };

    case "zh":
      return {
        receiveAtStore: "到店领取",
        manageCustomerReceiveAtStore: "管理到店领取的客户",
      };

    case "fr":
      return {
        receiveAtStore: "Réception en magasin",
        manageCustomerReceiveAtStore: "Gérer les clients recevant en magasin",
      };

    case "ja":
      return {
        receiveAtStore: "店舗で受け取る",
        manageCustomerReceiveAtStore: "店舗で受け取る顧客を管理する",
      };

    default:
      return {
        receiveAtStore: "Receive at store",
        manageCustomerReceiveAtStore: "Manage customers receiving at store",
      };
  }
};


export const getSalaryStaffAction = (language: string) => {
  switch (language) {
    case "vi":
      return {
        added: "Đã thêm",
        bonusAmount: "Số tiền bonus",
        remainingBonus: "Tổng bonus còn lại",
        updatingBonus: "Updating bonus...",
        somethingWentWrong: "Something went wrong!",
        unbonusAmount: "Số tiền unbonus",
        updatingUnbonus: "Updating unbonus...",
        paidSalaryTo: "Đã trả lương cho",
        updatingPaid: "Updating paid...",
        refreshSuccessBonus: "Làm mới thành công! Bonus",
        salaryDay: "Salary Day",
        salaryTotal: "Salary Total",
        paid: "Paid",
        sent: "Sent",
        updatingResetData: "Updating reset...",
        openMenu: "Mở menu",
        actions: "Actions",
        bonus: "Bonus",
        unbonus: "UnBonus",
        paySalary: "Trả lương",
        reset: "Reset",
        enterTitle: "Enter title...",
        enterBonus: "Enter bonus...",
        save: "Lưu",
        cancel: "Cancel",
        enterUnbonus: "Enter unbonus...",
      };

    case "en":
      return {
        added: "Added",
        bonusAmount: "Bonus Amount",
        remainingBonus: "Remaining Bonus",
        updatingBonus: "Updating bonus...",
        somethingWentWrong: "Something went wrong!",
        unbonusAmount: "Unbonus Amount",
        updatingUnbonus: "Updating unbonus...",
        paidSalaryTo: "Paid salary to",
        updatingPaid: "Updating paid...",
        refreshSuccessBonus: "Successfully refreshed! Bonus",
        salaryDay: "Salary Day",
        salaryTotal: "Salary Total",
        paid: "Paid",
        sent: "Sent",
        updatingResetData: "Updating reset...",
        openMenu: "Open menu",
        actions: "Actions",
        bonus: "Bonus",
        unbonus: "UnBonus",
        paySalary: "Pay Salary",
        reset: "Reset",
        enterTitle: "Enter title...",
        enterBonus: "Enter bonus...",
        save: "Save",
        cancel: "Cancel",
        enterUnbonus: "Enter unbonus...",
      };

    case "zh":
      return {
        added: "已添加",
        bonusAmount: "奖金金额",
        remainingBonus: "剩余奖金",
        updatingBonus: "正在更新奖金...",
        somethingWentWrong: "发生错误！",
        unbonusAmount: "未奖金金额",
        updatingUnbonus: "正在更新未奖金...",
        paidSalaryTo: "已支付工资给",
        updatingPaid: "正在更新已支付...",
        refreshSuccessBonus: "刷新成功！奖金",
        salaryDay: "发薪日",
        salaryTotal: "工资总额",
        paid: "已支付",
        sent: "已发送",
        updatingResetData: "正在更新重置数据...",
        openMenu: "打开菜单",
        actions: "操作",
        bonus: "奖金",
        unbonus: "未奖金",
        paySalary: "支付工资",
        reset: "重置",
        enterTitle: "输入标题...",
        enterBonus: "输入奖金...",
        save: "保存",
        cancel: "取消",
        enterUnbonus: "输入未奖金...",
      };

    case "fr":
      return {
        added: "Ajouté",
        bonusAmount: "Montant du bonus",
        remainingBonus: "Bonus restant",
        updatingBonus: "Mise à jour du bonus...",
        somethingWentWrong: "Quelque chose a mal tourné !",
        unbonusAmount: "Montant non bonus",
        updatingUnbonus: "Mise à jour du non bonus...",
        paidSalaryTo: "Salaire payé à",
        updatingPaid: "Mise à jour des paiements...",
        refreshSuccessBonus: "Mise à jour réussie ! Bonus",
        salaryDay: "Jour de salaire",
        salaryTotal: "Total du salaire",
        paid: "Payé",
        sent: "Envoyé",
        updatingResetData: "Mise à jour des données de réinitialisation...",
        openMenu: "Ouvrir le menu",
        actions: "Actions",
        bonus: "Bonus",
        unbonus: "Non bonus",
        paySalary: "Payer le salaire",
        reset: "Réinitialiser",
        enterTitle: "Entrez le titre...",
        enterBonus: "Entrez le bonus...",
        save: "Sauvegarder",
        cancel: "Annuler",
        enterUnbonus: "Entrez le non bonus...",
      };

    case "ja":
      return {
        added: "追加されました",
        bonusAmount: "ボーナス金額",
        remainingBonus: "残りのボーナス",
        updatingBonus: "ボーナスを更新中...",
        somethingWentWrong: "何かがうまくいかなかった！",
        unbonusAmount: "未ボーナス金額",
        updatingUnbonus: "未ボーナスを更新中...",
        paidSalaryTo: "給与を支払いました",
        updatingPaid: "支払いを更新中...",
        refreshSuccessBonus: "更新成功！ボーナス",
        salaryDay: "給料日",
        salaryTotal: "総給料",
        paid: "支払い済み",
        sent: "送信済み",
        updatingResetData: "リセットデータを更新中...",
        openMenu: "メニューを開く",
        actions: "アクション",
        bonus: "ボーナス",
        unbonus: "未ボーナス",
        paySalary: "給与支払い",
        reset: "リセット",
        enterTitle: "タイトルを入力...",
        enterBonus: "ボーナスを入力...",
        save: "保存",
        cancel: "キャンセル",
        enterUnbonus: "未ボーナスを入力...",
      };

    default:
      return {
        added: "Added",
        bonusAmount: "Bonus Amount",
        remainingBonus: "Remaining Bonus",
        updatingBonus: "Updating bonus...",
        somethingWentWrong: "Something went wrong!",
        unbonusAmount: "Unbonus Amount",
        updatingUnbonus: "Updating unbonus...",
        paidSalaryTo: "Paid salary to",
        updatingPaid: "Updating paid...",
        refreshSuccessBonus: "Successfully refreshed! Bonus",
        salaryDay: "Salary Day",
        salaryTotal: "Salary Total",
        paid: "Paid",
        sent: "Sent",
        updatingResetData: "Updating reset...",
        openMenu: "Open menu",
        actions: "Actions",
        bonus: "Bonus",
        unbonus: "UnBonus",
        paySalary: "Pay Salary",
        reset: "Reset",
        enterTitle: "Enter title...",
        enterBonus: "Enter bonus...",
        save: "Save",
        cancel: "Cancel",
        enterUnbonus: "Enter unbonus...",
      };
  }
};

export const getSalaryStaffClient = (language: string) => {
  switch (language) {
    case "vi":
      return {
        salary: "Lương",
        manageSalaryStaff: "Quản lý lương nhân viên",
        api: "API",
        apiCallsForSalaryStaff: "API calls for salary staff",
      };

    case "en":
      return {
        salary: "Salary",
        manageSalaryStaff: "Manage salary staff",
        api: "API",
        apiCallsForSalaryStaff: "API calls for salary staff",
      };

    case "zh":
      return {
        salary: "工资",
        manageSalaryStaff: "员工薪资管理",
        api: "API",
        apiCallsForSalaryStaff: "薪资员工的API调用",
      };

    case "fr":
      return {
        salary: "Salaire",
        manageSalaryStaff: "Gérer le salaire du personnel",
        api: "API",
        apiCallsForSalaryStaff: "Appels API pour le personnel de salaire",
      };

    case "ja":
      return {
        salary: "給与",
        manageSalaryStaff: "スタッフの給与管理",
        api: "API",
        apiCallsForSalaryStaff: "給与スタッフ用API呼び出し",
      };

    default:
      return {
        salary: "Salary",
        manageSalaryStaff: "Manage salary staff",
        api: "API",
        apiCallsForSalaryStaff: "API calls for salary staff",
      };
  }
};

export const getSaleProductList = (language: string) => {
  switch (language) {
    case "vi":
      return {
        somethingWentWrong: "Đã có lỗi xảy ra!",
        productUpdated: "Sản phẩm đã được cập nhật.",
        saleAll: "Giảm giá tất cả",
        removeSaleAll: "Xóa giảm giá tất cả",
        viewProduct: "Xem sản phẩm",
        sold: "Đã bán",
        stock: "Tồn kho",
        discount: "Giảm giá",
        productSale: "Sản phẩm giảm giá",
      };

    case "en":
      return {
        somethingWentWrong: "Something went wrong!",
        productUpdated: "Product updated.",
        saleAll: "Sale All",
        removeSaleAll: "Remove Sale All",
        viewProduct: "View product",
        sold: "Sold",
        stock: "Stock",
        discount: "Discount",
        productSale: "Product sale",
      };

    case "zh":
      return {
        somethingWentWrong: "出现问题！",
        productUpdated: "产品已更新。",
        saleAll: "全部促销",
        removeSaleAll: "取消所有促销",
        viewProduct: "查看产品",
        sold: "已售出",
        stock: "库存",
        discount: "折扣",
        productSale: "产品促销",
      };

    case "fr":
      return {
        somethingWentWrong: "Quelque chose a mal tourné !",
        productUpdated: "Produit mis à jour.",
        saleAll: "Vente de tout",
        removeSaleAll: "Retirer la vente de tout",
        viewProduct: "Voir le produit",
        sold: "Vendu",
        stock: "Stock",
        discount: "Remise",
        productSale: "Promotion produit",
      };

    case "ja":
      return {
        somethingWentWrong: "何か問題が発生しました！",
        productUpdated: "製品が更新されました。",
        saleAll: "全品セール",
        removeSaleAll: "すべてのセールを削除",
        viewProduct: "製品を見る",
        sold: "販売済み",
        stock: "在庫",
        discount: "割引",
        productSale: "製品セール",
      };

    default:
      return {
        somethingWentWrong: "Something went wrong!",
        productUpdated: "Product updated.",
        saleAll: "Sale All",
        removeSaleAll: "Remove Sale All",
        viewProduct: "View product",
        sold: "Sold",
        stock: "Stock",
        discount: "Discount",
        productSale: "Product sale",
      };
  }
};

export const getSaleProductFormToggleCard = (language: string) => {
  switch (language) {
    case "vi":
      return {
        startEndTimeRequired: "Thời gian bắt đầu và kết thúc là bắt buộc.",
        endTimeAfterStartTime: "Thời gian kết thúc phải sau thời gian bắt đầu.",
        productUpdated: "Sản phẩm đã được cập nhật.",
        somethingWentWrong: "Đã có lỗi xảy ra!",
        cleared: "Đã xóa.",
        outOfStock: "Hết hàng...",
        saleStart: "Bắt đầu bán",
        saleEnd: "Kết thúc bán",
        waiting: "Đang chờ...",
        saveChanges: "Lưu thay đổi",
        clear: "Xóa",
      };

    case "en":
      return {
        startEndTimeRequired: "Start time and end time are required.",
        endTimeAfterStartTime: "End time must be after start time.",
        productUpdated: "Product updated.",
        somethingWentWrong: "Something went wrong!",
        cleared: "Cleared.",
        outOfStock: "Out of stock...",
        saleStart: "Sale Start",
        saleEnd: "Sale End",
        waiting: "Waiting...",
        saveChanges: "Save Changes",
        clear: "Clear",
      };

    case "zh":
      return {
        startEndTimeRequired: "开始时间和结束时间是必填项。",
        endTimeAfterStartTime: "结束时间必须在开始时间之后。",
        productUpdated: "产品已更新。",
        somethingWentWrong: "出现问题！",
        cleared: "已清除。",
        outOfStock: "库存不足...",
        saleStart: "促销开始",
        saleEnd: "促销结束",
        waiting: "等待中...",
        saveChanges: "保存更改",
        clear: "清除",
      };

    case "fr":
      return {
        startEndTimeRequired: "L'heure de début et l'heure de fin sont requises.",
        endTimeAfterStartTime: "L'heure de fin doit être après l'heure de début.",
        productUpdated: "Produit mis à jour.",
        somethingWentWrong: "Quelque chose a mal tourné !",
        cleared: "Effacé.",
        outOfStock: "En rupture de stock...",
        saleStart: "Début des soldes",
        saleEnd: "Fin des soldes",
        waiting: "En attente...",
        saveChanges: "Sauvegarder les modifications",
        clear: "Effacer",
      };

    case "ja":
      return {
        startEndTimeRequired: "開始時間と終了時間は必須です。",
        endTimeAfterStartTime: "終了時間は開始時間の後でなければなりません。",
        productUpdated: "製品が更新されました。",
        somethingWentWrong: "何か問題が発生しました！",
        cleared: "クリアしました。",
        outOfStock: "在庫切れ...",
        saleStart: "セール開始",
        saleEnd: "セール終了",
        waiting: "待機中...",
        saveChanges: "変更を保存",
        clear: "クリア",
      };

    default:
      return {
        startEndTimeRequired: "Start time and end time are required.",
        endTimeAfterStartTime: "End time must be after start time.",
        productUpdated: "Product updated.",
        somethingWentWrong: "Something went wrong!",
        cleared: "Cleared.",
        outOfStock: "Out of stock...",
        saleStart: "Sale Start",
        saleEnd: "Sale End",
        waiting: "Waiting...",
        saveChanges: "Save Changes",
        clear: "Clear",
      };
  }
};

export const getSettingForm = (language: string) => {
  switch (language) {
    case "vi":
      return {
        storeUpdated: "Cửa hàng đã được cập nhật",
        somethingWentWrong: "Đã có lỗi xảy ra!",
        storeDeleted: "Cửa hàng đã bị xóa",
        settings: "Cài đặt",
        manageStore: "Quản lý cửa hàng",
        name: "Tên",
        storeNamePlaceholder: "Tên cửa hàng...",
        saveChanges: "Lưu thay đổi",
      };

    case "en":
      return {
        storeUpdated: "Store updated",
        somethingWentWrong: "Something went wrong!",
        storeDeleted: "Store deleted",
        settings: "Settings",
        manageStore: "Manage store",
        name: "Name",
        storeNamePlaceholder: "Store name...",
        saveChanges: "Save changes",
      };

    case "zh":
      return {
        storeUpdated: "商店已更新",
        somethingWentWrong: "出了点问题！",
        storeDeleted: "商店已删除",
        settings: "设置",
        manageStore: "管理商店",
        name: "名称",
        storeNamePlaceholder: "商店名称...",
        saveChanges: "保存更改",
      };

    case "fr":
      return {
        storeUpdated: "Magasin mis à jour",
        somethingWentWrong: "Quelque chose s'est mal passé !",
        storeDeleted: "Magasin supprimé",
        settings: "Paramètres",
        manageStore: "Gérer le magasin",
        name: "Nom",
        storeNamePlaceholder: "Nom du magasin...",
        saveChanges: "Enregistrer les modifications",
      };

    case "ja":
      return {
        storeUpdated: "店舗が更新されました",
        somethingWentWrong: "問題が発生しました！",
        storeDeleted: "店舗が削除されました",
        settings: "設定",
        manageStore: "店舗管理",
        name: "名前",
        storeNamePlaceholder: "店舗名...",
        saveChanges: "変更を保存",
      };

    default:
      return {
        storeUpdated: "Store updated",
        somethingWentWrong: "Something went wrong!",
        storeDeleted: "Store deleted",
        settings: "Settings",
        manageStore: "Manage store",
        name: "Name",
        storeNamePlaceholder: "Store name...",
        saveChanges: "Save changes",
      };
  }
};

export const getSettingUserAction = (language: string) => {
  switch (language) {
    case "vi":
      return {
        userBannedForever: "Người dùng đã bị ban vĩnh viễn!",
        somethingWentWrong: "Đã có lỗi xảy ra!",
        unban: "Gỡ ban",
        updatingUnbanUser: "Đang cập nhật gỡ ban người dùng...",
        fullAuthentication: "Xác thực đầy đủ",
        updatingCitizenUser: "Đang cập nhật người dùng công dân...",
        removeAuthentication: "Xóa xác thực",
        openMenu: "Mở menu",
        actions: "Hành động",
        banForever: "Ban vĩnh viễn",
        ban: "Ban",
        fullAuthenticationText: "Xác thực đầy đủ",
        removeAuthenticationText: "Xóa xác thực",
      };

    case "en":
      return {
        userBannedForever: "User has been banned permanently!",
        somethingWentWrong: "Something went wrong!",
        unban: "Unban",
        updatingUnbanUser: "Updating unban user...",
        fullAuthentication: "Full authentication",
        updatingCitizenUser: "Updating citizen user...",
        removeAuthentication: "Remove authentication",
        openMenu: "Open menu",
        actions: "Actions",
        banForever: "Ban forever",
        ban: "Ban",
        fullAuthenticationText: "Full authentication",
        removeAuthenticationText: "Remove authentication",
      };

    case "zh":
      return {
        userBannedForever: "用户已被永久封禁！",
        somethingWentWrong: "出了点问题！",
        unban: "解禁",
        updatingUnbanUser: "正在更新解禁用户...",
        fullAuthentication: "完全认证",
        updatingCitizenUser: "正在更新公民用户...",
        removeAuthentication: "删除认证",
        openMenu: "打开菜单",
        actions: "操作",
        banForever: "永久封禁",
        ban: "封禁",
        fullAuthenticationText: "完全认证",
        removeAuthenticationText: "删除认证",
      };

    case "fr":
      return {
        userBannedForever: "L'utilisateur a été banni définitivement !",
        somethingWentWrong: "Quelque chose s'est mal passé !",
        unban: "Unban",
        updatingUnbanUser: "Mise à jour de l'utilisateur unban...",
        fullAuthentication: "Authentification complète",
        updatingCitizenUser: "Mise à jour de l'utilisateur citoyen...",
        removeAuthentication: "Supprimer l'authentification",
        openMenu: "Ouvrir le menu",
        actions: "Actions",
        banForever: "Bannir définitivement",
        ban: "Bannir",
        fullAuthenticationText: "Authentification complète",
        removeAuthenticationText: "Supprimer l'authentification",
      };

    case "ja":
      return {
        userBannedForever: "ユーザーは永続的に禁止されました！",
        somethingWentWrong: "問題が発生しました！",
        unban: "アンバン",
        updatingUnbanUser: "ユーザーのアンバンを更新しています...",
        fullAuthentication: "完全な認証",
        updatingCitizenUser: "市民ユーザーを更新しています...",
        removeAuthentication: "認証を削除",
        openMenu: "メニューを開く",
        actions: "アクション",
        banForever: "永続的に禁止",
        ban: "禁止",
        fullAuthenticationText: "完全な認証",
        removeAuthenticationText: "認証を削除",
      };

    default:
      return {
        userBannedForever: "User has been banned permanently!",
        somethingWentWrong: "Something went wrong!",
        unban: "Unban",
        updatingUnbanUser: "Updating unban user...",
        fullAuthentication: "Full authentication",
        updatingCitizenUser: "Updating citizen user...",
        removeAuthentication: "Remove authentication",
        openMenu: "Open menu",
        actions: "Actions",
        banForever: "Ban forever",
        ban: "Ban",
        fullAuthenticationText: "Full authentication",
        removeAuthenticationText: "Remove authentication",
      };
  }
};

export const getSettingUserClient = (language: string) => {
  switch (language) {
    case "vi":
      return {
        user: "Người dùng",
        userManagement: "Quản lý người dùng",
        api: "API",
        apiCallsForUser: "API calls for User",
      };

    case "en":
      return {
        user: "User",
        userManagement: "User management",
        api: "API",
        apiCallsForUser: "API calls for User",
      };

    case "zh":
      return {
        user: "用户",
        userManagement: "用户管理",
        api: "API",
        apiCallsForUser: "用户的API调用",
      };

    case "fr":
      return {
        user: "Utilisateur",
        userManagement: "Gestion des utilisateurs",
        api: "API",
        apiCallsForUser: "Appels API pour l'utilisateur",
      };

    case "ja":
      return {
        user: "ユーザー",
        userManagement: "ユーザー管理",
        api: "API",
        apiCallsForUser: "ユーザーのAPI呼び出し",
      };

    default:
      return {
        user: "User",
        userManagement: "User management",
        api: "API",
        apiCallsForUser: "API calls for User",
      };
  }
};

export const getUnitText = (language: string, unit: string): string => {
  switch (language) {
    case "vi":
      const unitMappingVi: Record<string, string> = {
        hour: "Giờ",
        day: "Ngày",
        week: "Tuần",
        month: "Tháng",
        business_day: "Ngày làm việc",
      };
      return unitMappingVi[unit] || "";

    case "en":
      const unitMappingEn: Record<string, string> = {
        hour: "Hour",
        day: "Day",
        week: "Week",
        month: "Month",
        business_day: "Business Day",
      };
      return unitMappingEn[unit] || "";

    case "zh":
      const unitMappingZh: Record<string, string> = {
        hour: "小时",
        day: "天",
        week: "周",
        month: "月",
        business_day: "工作日",
      };
      return unitMappingZh[unit] || "";

    case "fr":
      const unitMappingFr: Record<string, string> = {
        hour: "Heure",
        day: "Jour",
        week: "Semaine",
        month: "Mois",
        business_day: "Jour ouvré",
      };
      return unitMappingFr[unit] || "";

    case "ja":
      const unitMappingJa: Record<string, string> = {
        hour: "時間",
        day: "日",
        week: "週間",
        month: "月",
        business_day: "営業日",
      };
      return unitMappingJa[unit] || "";

    default:
      return "";
  }
};

export const getShippingTaxcodeText = (language: string, taxcode: string | null): string => {
  if (taxcode === null) return ""; // Trả về chuỗi rỗng nếu taxcode là null

  switch (language) {
    case "vi":
      const ShippingTaxcodeMappingVi: Record<string, string> = {
        txcd_00000000: "Không chịu thuế",
        txcd_92010001: "Người giao chịu thuế",
      };
      return ShippingTaxcodeMappingVi[taxcode] || "";

    case "en":
      const ShippingTaxcodeMappingEn: Record<string, string> = {
        txcd_00000000: "No tax",
        txcd_92010001: "Shipper pays tax",
      };
      return ShippingTaxcodeMappingEn[taxcode] || "";

    case "zh":
      const ShippingTaxcodeMappingZh: Record<string, string> = {
        txcd_00000000: "不征税",
        txcd_92010001: "由发货人支付税款",
      };
      return ShippingTaxcodeMappingZh[taxcode] || "";

    case "fr":
      const ShippingTaxcodeMappingFr: Record<string, string> = {
        txcd_00000000: "Exonéré de taxe",
        txcd_92010001: "L'expéditeur paie la taxe",
      };
      return ShippingTaxcodeMappingFr[taxcode] || "";

    case "ja":
      const ShippingTaxcodeMappingJa: Record<string, string> = {
        txcd_00000000: "税金なし",
        txcd_92010001: "発送者が税金を支払う",
      };
      return ShippingTaxcodeMappingJa[taxcode] || "";

    default:
      return "";
  }
};

export const getTaxBehaviorMessage = (language: string, taxBehaviorType: string | null | undefined) => {
  switch (language) {
    case "vi":
      switch (taxBehaviorType) {
        case "exclusive":
          return "Loại trừ";
        case "inclusive":
          return "Bao gồm";
        case "unspecified":
          return "Không xác định";
        default:
          return "";
      }
    case "en":
      switch (taxBehaviorType) {
        case "exclusive":
          return "Exclusive";
        case "inclusive":
          return "Inclusive";
        case "unspecified":
          return "Unspecified";
        default:
          return "";
      }
    case "zh":
      switch (taxBehaviorType) {
        case "exclusive":
          return "排除";
        case "inclusive":
          return "包含";
        case "unspecified":
          return "未指定";
        default:
          return "";
      }
    case "fr":
      switch (taxBehaviorType) {
        case "exclusive":
          return "Exclusif";
        case "inclusive":
          return "Inclusif";
        case "unspecified":
          return "Non spécifié";
        default:
          return "";
      }
    case "ja":
      switch (taxBehaviorType) {
        case "exclusive":
          return "除外";
        case "inclusive":
          return "含む";
        case "unspecified":
          return "未指定";
        default:
          return "";
      }
    default:
      switch (taxBehaviorType) {
        case "exclusive":
          return "Exclusive";
        case "inclusive":
          return "Inclusive";
        case "unspecified":
          return "Unspecified";
        default:
          return "";
      }
  }
};

export const getShippingRateEditRow = (language: string) => {
  switch (language) {
    case "vi":
      return {
        notFound: "Không tìm thấy!",
        edit: "Chỉnh sửa",
        editAnExisting: "Chỉnh sửa cái đã có sẵn",
      };
    case "en":
      return {
        notFound: "Not found!",
        edit: "Edit",
        editAnExisting: "Edit an existing",
      };
    case "zh":
      return {
        notFound: "未找到!",
        edit: "编辑",
        editAnExisting: "编辑现有",
      };
    case "fr":
      return {
        notFound: "Pas trouvé!",
        edit: "Modifier",
        editAnExisting: "Modifier un existant",
      };
    case "ja":
      return {
        notFound: "見つかりません!",
        edit: "編集",
        editAnExisting: "既存の編集",
      };
    default:
      return {
        notFound: "Not found!",
        edit: "Edit",
        editAnExisting: "Edit an existing",
      };
  }
};


export const getShippingRateFormEdit = (language: string) => {
  switch (language) {
      case "vi":
        return {
          requiredName: "Nhập ít nhất 2 ký tự.",
          requiredTaxcode: "Bắt buộc nhập taxcode.",
          requiredTaxbehavior: "Bắt buộc nhập taxbehavior.",
          enterMinPrice: "Hãy nhập giá ít nhất 500đ.",
          requiredUnitmin: "Bắt buộc nhập unitmin.",
          enterValumin: "Hãy nhập valumin.",
          requiredUnitmax: "Bắt buộc nhập unitmax.",
          enterValuemax: "Hãy nhập valuemax.",
          updateSuccess: "Cập nhật thành công!",
          somethingWentWrong: "Something went wrong!",
          productName: "Tên sản phẩm",
          enterName: "Nhập tên ...",
          saveChange: "Save Change",
        };
      case "en":
        return {
          requiredName: "Name is required.",
          requiredTaxcode: "Taxcode is required.",
          requiredTaxbehavior: "Tax behavior is required.",
          enterMinPrice: "Enter a price of at least 500 VND.",
          requiredUnitmin: "Unitmin is required.",
          enterValumin: "Enter valumin.",
          requiredUnitmax: "Unitmax is required.",
          enterValuemax: "Enter valuemax.",
          updateSuccess: "Update successful!",
          somethingWentWrong: "Something went wrong!",
          productName: "Product name",
          enterName: "Enter name...",
          saveChange: "Save Change",
        };
      case "zh":
        return {
          requiredName: "必须输入名称。",
          requiredTaxcode: "必须输入税码。",
          requiredTaxbehavior: "必须输入税行为。",
          enterMinPrice: "请输入至少500 VND的价格。",
          requiredUnitmin: "必须输入unitmin。",
          enterValumin: "请输入valumin。",
          requiredUnitmax: "必须输入unitmax。",
          enterValuemax: "请输入valuemax。",
          updateSuccess: "更新成功！",
          somethingWentWrong: "出了点问题！",
          productName: "产品名称",
          enterName: "请输入名称...",
          saveChange: "保存更改",
        };
      case "fr":
        return {
          requiredName: "Le nom est requis.",
          requiredTaxcode: "Le code fiscal est requis.",
          requiredTaxbehavior: "Le comportement fiscal est requis.",
          enterMinPrice: "Entrez un prix d'au moins 500 VND.",
          requiredUnitmin: "L'unité minimale est requise.",
          enterValumin: "Entrez valumin.",
          requiredUnitmax: "L'unité maximale est requise.",
          enterValuemax: "Entrez valuemax.",
          updateSuccess: "Mise à jour réussie !",
          somethingWentWrong: "Il y a eu un problème !",
          productName: "Nom du produit",
          enterName: "Entrez le nom...",
          saveChange: "Sauvegarder les modifications",
        };
      case "ja":
        return {
          requiredName: "名前は必須です。",
          requiredTaxcode: "税コードは必須です。",
          requiredTaxbehavior: "税行動は必須です。",
          enterMinPrice: "最低500VNDの価格を入力してください。",
          requiredUnitmin: "unitminは必須です。",
          enterValumin: "valuminを入力してください。",
          requiredUnitmax: "unitmaxは必須です。",
          enterValuemax: "valuemaxを入力してください。",
          updateSuccess: "更新成功！",
          somethingWentWrong: "何か問題が発生しました！",
          productName: "製品名",
          enterName: "名前を入力...",
          saveChange: "変更を保存",
        };
      default:
        return {
          requiredName: "Name is required.",
          requiredTaxcode: "Taxcode is required.",
          requiredTaxbehavior: "Tax behavior is required.",
          enterMinPrice: "Enter a price of at least 500 VND.",
          requiredUnitmin: "Unitmin is required.",
          enterValumin: "Enter valumin.",
          requiredUnitmax: "Unitmax is required.",
          enterValuemax: "Enter valuemax.",
          updateSuccess: "Update successful!",
          somethingWentWrong: "Something went wrong!",
          productName: "Product name",
          enterName: "Enter name...",
          saveChange: "Save Change",
        };
    }
};

export const getShippingRateAction = (language: string) => {
  switch (language) {
    case "vi":
      return {
        copiedShippingRateId: "Mã vận chuyển đã được sao chép vào clipboard.",
        shippingRatesDeleted: "Các tỷ lệ vận chuyển đã bị xóa.",
        somethingWentWrong: "Đã có lỗi xảy ra!",
        openMenu: "Mở menu",
        actions: "Hành động",
        copyId: "Sao chép mã",
        update: "Cập nhật",
        delete: "Xóa",
      };
    case "en":
      return {
        copiedShippingRateId: "Shipping Rate Id copied to the clipboard.",
        shippingRatesDeleted: "Shipping rates deleted.",
        somethingWentWrong: "Something went wrong!",
        openMenu: "Open menu",
        actions: "Actions",
        copyId: "Copy Id",
        update: "Update",
        delete: "Delete",
      };
    case "zh":
      return {
        copiedShippingRateId: "运费ID已复制到剪贴板。",
        shippingRatesDeleted: "运费已删除。",
        somethingWentWrong: "发生错误！",
        openMenu: "打开菜单",
        actions: "操作",
        copyId: "复制ID",
        update: "更新",
        delete: "删除",
      };
    case "fr":
      return {
        copiedShippingRateId: "L'ID de tarif d'expédition a été copié dans le presse-papiers.",
        shippingRatesDeleted: "Les tarifs d'expédition ont été supprimés.",
        somethingWentWrong: "Une erreur s'est produite !",
        openMenu: "Ouvrir le menu",
        actions: "Actions",
        copyId: "Copier l'ID",
        update: "Mettre à jour",
        delete: "Supprimer",
      };
    case "ja":
      return {
        copiedShippingRateId: "配送料金IDがクリップボードにコピーされました。",
        shippingRatesDeleted: "配送料金が削除されました。",
        somethingWentWrong: "エラーが発生しました！",
        openMenu: "メニューを開く",
        actions: "アクション",
        copyId: "IDをコピー",
        update: "更新",
        delete: "削除",
      };
    default:
      return {
        copiedShippingRateId: "Shipping Rate Id copied to the clipboard.",
        shippingRatesDeleted: "Shipping rates deleted.",
        somethingWentWrong: "Something went wrong!",
        openMenu: "Open menu",
        actions: "Actions",
        copyId: "Copy Id",
        update: "Update",
        delete: "Delete",
      };
  }
};

export const getShippingRateClient = (language: string) => {
  switch (language) {
    case "vi":
      return {
        shippingRateDeletedSuccessfully: "Đã xóa tỷ lệ vận chuyển thành công",
        somethingWentWrong: "Đã có lỗi xảy ra!",
        shipping: "Vận chuyển",
        manageShippingRates: "Quản lý giá vận chuyển",
        addNew: "Thêm mới",
        api: "API",
        apiCallsForShippingRates: "API calls for Shippingrates",
      };
    case "en":
      return {
        shippingRateDeletedSuccessfully: "Shipping rate deleted successfully",
        somethingWentWrong: "Something went wrong!",
        shipping: "Shipping",
        manageShippingRates: "Manage Shipping Rates",
        addNew: "Add New",
        api: "API",
        apiCallsForShippingRates: "API calls for Shippingrates",
      };
    case "zh":
      return {
        shippingRateDeletedSuccessfully: "运输费用删除成功",
        somethingWentWrong: "发生错误！",
        shipping: "运输",
        manageShippingRates: "管理运费",
        addNew: "新增",
        api: "API",
        apiCallsForShippingRates: "运费的API调用",
      };
    case "fr":
      return {
        shippingRateDeletedSuccessfully: "Tarif d'expédition supprimé avec succès",
        somethingWentWrong: "Une erreur s'est produite !",
        shipping: "Expédition",
        manageShippingRates: "Gérer les tarifs d'expédition",
        addNew: "Ajouter un nouveau",
        api: "API",
        apiCallsForShippingRates: "Appels API pour les tarifs d'expédition",
      };
    case "ja":
      return {
        shippingRateDeletedSuccessfully: "配送料金が正常に削除されました",
        somethingWentWrong: "エラーが発生しました！",
        shipping: "配送",
        manageShippingRates: "配送料金の管理",
        addNew: "新規追加",
        api: "API",
        apiCallsForShippingRates: "配送料金のAPI呼び出し",
      };
    default:
      return {
        shippingRateDeletedSuccessfully: "Shipping rate deleted successfully",
        somethingWentWrong: "Something went wrong!",
        shipping: "Shipping",
        manageShippingRates: "Manage Shipping Rates",
        addNew: "Add New",
        api: "API",
        apiCallsForShippingRates: "API calls for Shippingrates",
      };
  }
};


export const getShippingRateSchema = (language: string) => {
  switch (language) {
    case "vi":
      return {
        requiredName: "Nhập ít nhất 2 ký tự.",
        requiredTaxbehavior: "Hãy chọn 1 taxbehavior.",
        enterMinPrice: "Hãy nhập ít nhất 500 đồng.",
        enterMinHour: "Hãy nhập ít nhất 1 tiếng.",
        chooseHourOrDay: "Hãy chọn giờ hoặc ngày.",
        requiredTaxcode: "Hãy chọn 1 loại taxcode.",
        maxTimeGreaterThanMinTime: "Thời gian tối đa phải lớn hơn thời gian tối thiểu.",
        editShippingRates: "Chỉnh sửa giá vận chuyển",
        createShippingRates: "Tạo giá vận chuyển",
        editAShippingRates: "Chỉnh sửa một giá vận chuyển",
        addNewShippingRates: "Thêm giá vận chuyển mới",
        saveChanges: "Lưu thay đổi",
        create: "Tạo",
      };
    case "en":
      return {
        requiredName: "Enter at least 2 characters.",
        requiredTaxbehavior: "Please select 1 tax behavior.",
        enterMinPrice: "Please enter at least 500 VND.",
        enterMinHour: "Please enter at least 1 hour.",
        chooseHourOrDay: "Please select hour or day.",
        requiredTaxcode: "Please select 1 taxcode type.",
        maxTimeGreaterThanMinTime: "Maximum time must be greater than minimum time.",
        editShippingRates: "Edit shipping rates",
        createShippingRates: "Create shipping rates",
        editAShippingRates: "Edit a shipping rate",
        addNewShippingRates: "Add a new shipping rate",
        saveChanges: "Save changes",
        create: "Create",
      };
    case "zh":
      return {
        requiredName: "请输入至少2个字符。",
        requiredTaxbehavior: "请选择一个税行为。",
        enterMinPrice: "请输入至少500越南盾。",
        enterMinHour: "请输入至少1小时。",
        chooseHourOrDay: "请选择小时或天。",
        requiredTaxcode: "请选择一个税码类型。",
        maxTimeGreaterThanMinTime: "最大时间必须大于最小时间。",
        editShippingRates: "编辑运输费用",
        createShippingRates: "创建运输费用",
        editAShippingRates: "编辑一个运输费用",
        addNewShippingRates: "添加新的运输费用",
        saveChanges: "保存更改",
        create: "创建",
      };
    case "fr":
      return {
        requiredName: "Entrez au moins 2 caractères.",
        requiredTaxbehavior: "Veuillez sélectionner un comportement fiscal.",
        enterMinPrice: "Veuillez entrer au moins 500 VND.",
        enterMinHour: "Veuillez entrer au moins 1 heure.",
        chooseHourOrDay: "Veuillez choisir une heure ou un jour.",
        requiredTaxcode: "Veuillez sélectionner un type de code fiscal.",
        maxTimeGreaterThanMinTime: "Le temps maximum doit être supérieur au temps minimum.",
        editShippingRates: "Modifier les tarifs d'expédition",
        createShippingRates: "Créer des tarifs d'expédition",
        editAShippingRates: "Modifier un tarif d'expédition",
        addNewShippingRates: "Ajouter un nouveau tarif d'expédition",
        saveChanges: "Sauvegarder les modifications",
        create: "Créer",
      };
    case "ja":
      return {
        requiredName: "少なくとも2文字を入力してください。",
        requiredTaxbehavior: "1つの税行動を選択してください。",
        enterMinPrice: "最低500VNDを入力してください。",
        enterMinHour: "最低1時間を入力してください。",
        chooseHourOrDay: "時間または日を選択してください。",
        requiredTaxcode: "1つの税コードタイプを選択してください。",
        maxTimeGreaterThanMinTime: "最大時間は最小時間より大きくなければなりません。",
        editShippingRates: "配送料金の編集",
        createShippingRates: "配送料金の作成",
        editAShippingRates: "配送料金の編集",
        addNewShippingRates: "新しい配送料金を追加",
        saveChanges: "変更を保存",
        create: "作成",
      };
    default:
      return {
        requiredName: "Enter at least 2 characters.",
        requiredTaxbehavior: "Please select 1 tax behavior.",
        enterMinPrice: "Please enter at least 500 VND.",
        enterMinHour: "Please enter at least 1 hour.",
        chooseHourOrDay: "Please select hour or day.",
        requiredTaxcode: "Please select 1 taxcode type.",
        maxTimeGreaterThanMinTime: "Maximum time must be greater than minimum time.",
        editShippingRates: "Edit shipping rates",
        createShippingRates: "Create shipping rates",
        editAShippingRates: "Edit a shipping rate",
        addNewShippingRates: "Add a new shipping rate",
        saveChanges: "Save changes",
        create: "Create",
      };
  }
};


export const getShippingRateForm = (language: string) => {
  switch (language) {
    case "vi":
      return {
        shippingRate: "Giá vận chuyển",
        updatingShippingRates: "Đang cập nhật giá vận chuyển...",
        somethingWentWrong: "Đã có lỗi xảy ra!",
        shippingName: "Tên giao hàng",
        enterShippingName: "Nhập cái tên sản phẩm muốn giao.",
        enterShippingNamePlaceholder: "Nhập tên giao hàng ...",
        amount: "Số tiền",
        enterAmount: "Nhập phí tiền giao hàng.",
        enterAmountPlaceholder: "Nhập số tiền ...",
        taxBehavior: "Hành vi thuế",
        selectTaxBehavior: "Chọn loại thuế...",
        selectTaxBehaviorPlaceholder: "Chọn hành vi thuế",
        minTime: "Thời gian thấp nhất",
        minTimeNote: "Lưu ý: Nhập không quá 2400 giờ. Khoảng thời gian thấp nhất sẽ được giao.",
        enterMinTime: "Nhập phần thời gian thấp nhất ...",
        maxTimeError: "Thời gian thấp nhất không được lớn hơn 2400 giờ",
        minUnit: "Đơn vị thấp nhất",
        selectMinUnit: "Chọn giờ hoặc ngày.",
        selectMinUnitPlaceholder: "Select Unit Min",
        maxTime: "Thời gian tối đa",
        maxTimeNote: "Lưu ý: Nhập không quá 2400 giờ. Đây là thời gian tối đa khách hàng sẽ nhận được sản phẩm.",
        enterMaxTime: "Nhập phần thời gian tối đa ...",
        maxUnit: "Đơn vị tối đa",
        selectMaxUnit: "Chọn giờ hoặc ngày.",
        selectMaxUnitPlaceholder: "Select Unit Max",
        taxCode: "Người chịu thuế",
        defaultTaxCodeNote: "Mặc định đơn hàng sẽ được cửa hàng chịu thuế.",
        selectShippingTaxcode: "Select ShippingTaxcode",
        activity: "Hoạt động",
        taxStatusNote: "Lựa chọn ngừng hoặc mở thuế mặc định là ngừng.",
        taxStatusOptions: "Ngừng hoặc mở thuế",
        updated: "Đã cập nhật",
        created: "Đã tạo mới",
      };
    case "en":
      return {
        shippingRate: "Shipping Rate",
        updatingShippingRates: "Updating shipping rates...",
        somethingWentWrong: "Something went wrong!",
        shippingName: "Shipping name",
        enterShippingName: "Enter the product name to ship.",
        enterShippingNamePlaceholder: "Enter shipping name...",
        amount: "Amount",
        enterAmount: "Enter shipping fee.",
        enterAmountPlaceholder: "Enter amount...",
        taxBehavior: "Tax behavior",
        selectTaxBehavior: "Select tax behavior...",
        selectTaxBehaviorPlaceholder: "Select tax behavior",
        minTime: "Minimum time",
        minTimeNote: "Note: Enter no more than 2400 hours. The minimum time will be delivered.",
        enterMinTime: "Enter the minimum time...",
        maxTimeError: "Minimum time cannot exceed 2400 hours",
        minUnit: "Minimum unit",
        selectMinUnit: "Select hours or days.",
        selectMinUnitPlaceholder: "Select Unit Min",
        maxTime: "Maximum time",
        maxTimeNote: "Note: Enter no more than 2400 hours. This is the maximum time the customer will receive the product.",
        enterMaxTime: "Enter the maximum time...",
        maxUnit: "Maximum unit",
        selectMaxUnit: "Select hours or days.",
        selectMaxUnitPlaceholder: "Select Unit Max",
        taxCode: "Taxpayer",
        defaultTaxCodeNote: "By default, the store will be responsible for tax.",
        selectShippingTaxcode: "Select ShippingTaxcode",
        activity: "Activity",
        taxStatusNote: "Select whether to disable or enable tax, by default tax is disabled.",
        taxStatusOptions: "Disable or enable tax",
        updated: "Updated",
        created: "Created",
      };
    case "zh":
      return {
        shippingRate: "运费",
        updatingShippingRates: "正在更新运费...",
        somethingWentWrong: "出了点问题！",
        shippingName: "运输名称",
        enterShippingName: "输入要运输的产品名称。",
        enterShippingNamePlaceholder: "输入运输名称...",
        amount: "金额",
        enterAmount: "输入运费。",
        enterAmountPlaceholder: "输入金额...",
        taxBehavior: "税务行为",
        selectTaxBehavior: "选择税务行为...",
        selectTaxBehaviorPlaceholder: "选择税务行为",
        minTime: "最短时间",
        minTimeNote: "注意：输入不超过2400小时。最短时间将被交付。",
        enterMinTime: "输入最短时间...",
        maxTimeError: "最短时间不能超过2400小时",
        minUnit: "最小单位",
        selectMinUnit: "选择小时或天。",
        selectMinUnitPlaceholder: "选择最小单位",
        maxTime: "最长时间",
        maxTimeNote: "注意：输入不超过2400小时。最大时间是客户收到产品的时间。",
        enterMaxTime: "输入最长时间...",
        maxUnit: "最大单位",
        selectMaxUnit: "选择小时或天。",
        selectMaxUnitPlaceholder: "选择最大单位",
        taxCode: "税务人",
        defaultTaxCodeNote: "默认情况下，由商店负责税收。",
        selectShippingTaxcode: "选择运费税码",
        activity: "活动",
        taxStatusNote: "选择禁用或启用税收，默认情况下禁用税收。",
        taxStatusOptions: "禁用或启用税收",
        updated: "已更新",
        created: "已创建",
      };
    case "fr":
      return {
        shippingRate: "Tarif d'expédition",
        updatingShippingRates: "Mise à jour des tarifs d'expédition...",
        somethingWentWrong: "Il y a eu un problème !",
        shippingName: "Nom de l'expédition",
        enterShippingName: "Entrez le nom du produit à expédier.",
        enterShippingNamePlaceholder: "Entrez le nom de l'expédition...",
        amount: "Montant",
        enterAmount: "Entrez les frais d'expédition.",
        enterAmountPlaceholder: "Entrez le montant...",
        taxBehavior: "Comportement fiscal",
        selectTaxBehavior: "Sélectionnez le comportement fiscal...",
        selectTaxBehaviorPlaceholder: "Sélectionnez le comportement fiscal",
        minTime: "Temps minimum",
        minTimeNote: "Note : Entrez pas plus de 2400 heures. Le temps minimum sera livré.",
        enterMinTime: "Entrez le temps minimum...",
        maxTimeError: "Le temps minimum ne peut pas dépasser 2400 heures",
        minUnit: "Unité minimale",
        selectMinUnit: "Sélectionnez des heures ou des jours.",
        selectMinUnitPlaceholder: "Sélectionnez l'unité minimale",
        maxTime: "Temps maximum",
        maxTimeNote: "Note : Entrez pas plus de 2400 heures. C'est le temps maximum pour que le client reçoive le produit.",
        enterMaxTime: "Entrez le temps maximum...",
        maxUnit: "Unité maximale",
        selectMaxUnit: "Sélectionnez des heures ou des jours.",
        selectMaxUnitPlaceholder: "Sélectionnez l'unité maximale",
        taxCode: "Code fiscal",
        defaultTaxCodeNote: "Par défaut, la boutique est responsable des taxes.",
        selectShippingTaxcode: "Sélectionnez le code fiscal d'expédition",
        activity: "Activité",
        taxStatusNote: "Sélectionnez si vous souhaitez désactiver ou activer la taxe, par défaut, la taxe est désactivée.",
        taxStatusOptions: "Désactiver ou activer la taxe",
        updated: "Mis à jour",
        created: "Créé",
      };
    case "ja":
      return {
        shippingRate: "配送料金",
        updatingShippingRates: "配送料金を更新しています...",
        somethingWentWrong: "何か問題が発生しました！",
        shippingName: "配送名",
        enterShippingName: "配送する製品名を入力してください。",
        enterShippingNamePlaceholder: "配送名を入力...",
        amount: "金額",
        enterAmount: "配送料金を入力してください。",
        enterAmountPlaceholder: "金額を入力...",
        taxBehavior: "税務行動",
        selectTaxBehavior: "税務行動を選択...",
        selectTaxBehaviorPlaceholder: "税務行動を選択",
        minTime: "最短時間",
        minTimeNote: "注意：最大2400時間以内で入力してください。最短時間で配達されます。",
        enterMinTime: "最短時間を入力してください...",
        maxTimeError: "最短時間は2400時間を超えてはいけません",
        minUnit: "最小単位",
        selectMinUnit: "時間または日を選択してください。",
        selectMinUnitPlaceholder: "最小単位を選択",
        maxTime: "最大時間",
        maxTimeNote: "注意：最大2400時間以内で入力してください。これは顧客が製品を受け取る最大時間です。",
        enterMaxTime: "最大時間を入力してください...",
        maxUnit: "最大単位",
        selectMaxUnit: "時間または日を選択してください。",
        selectMaxUnitPlaceholder: "最大単位を選択",
        taxCode: "納税者",
        defaultTaxCodeNote: "デフォルトでは、店舗が税金を負担します。",
        selectShippingTaxcode: "配送税コードを選択",
        activity: "活動",
        taxStatusNote: "税金を無効または有効にするかを選択してください。デフォルトでは税金は無効です。",
        taxStatusOptions: "税金を無効または有効にする",
        updated: "更新済み",
        created: "作成済み",
      };
    default:
      return {
        shippingRate: "Shipping Rate",
        updatingShippingRates: "Updating shipping rates...",
        somethingWentWrong: "Something went wrong!",
        shippingName: "Shipping name",
        enterShippingName: "Enter the product name to ship.",
        enterShippingNamePlaceholder: "Enter shipping name...",
        amount: "Amount",
        enterAmount: "Enter shipping fee.",
        enterAmountPlaceholder: "Enter amount...",
        taxBehavior: "Tax behavior",
        selectTaxBehavior: "Select tax behavior...",
        selectTaxBehaviorPlaceholder: "Select tax behavior",
        minTime: "Minimum time",
        minTimeNote: "Note: Enter no more than 2400 hours. The minimum time will be delivered.",
        enterMinTime: "Enter the minimum time...",
        maxTimeError: "Minimum time cannot exceed 2400 hours",
        minUnit: "Minimum unit",
        selectMinUnit: "Select hours or days.",
        selectMinUnitPlaceholder: "Select Unit Min",
        maxTime: "Maximum time",
        maxTimeNote: "Note: Enter no more than 2400 hours. This is the maximum time the customer will receive the product.",
        enterMaxTime: "Enter the maximum time...",
        maxUnit: "Maximum unit",
        selectMaxUnit: "Select hours or days.",
        selectMaxUnitPlaceholder: "Select Unit Max",
        taxCode: "Taxpayer",
        defaultTaxCodeNote: "By default, the store will be responsible for tax.",
        selectShippingTaxcode: "Select ShippingTaxcode",
        activity: "Activity",
        taxStatusNote: "Select whether to disable or enable tax, by default tax is disabled.",
        taxStatusOptions: "Disable or enable tax",
        updated: "Updated",
        created: "Created",
      };
  }
};


export const getSizeEditRow = (language: string) => {
  switch (language) {
    case "vi":
      return {
        notFound: "Không tìm thấy!",
        edit: "Chỉnh sửa",
        editExisting: "Chỉnh sửa một cái đã có",
      };
    case "en":
      return {
        notFound: "Not found!",
        edit: "Edit",
        editExisting: "Edit an existing",
      };
    case "zh":
      return {
        notFound: "未找到！",
        edit: "编辑",
        editExisting: "编辑现有",
      };
    case "fr":
      return {
        notFound: "Introuvable !",
        edit: "Éditer",
        editExisting: "Éditer un existant",
      };
    case "ja":
      return {
        notFound: "見つかりません！",
        edit: "編集",
        editExisting: "既存の編集",
      };
    default:
      return {
        notFound: "Not found!",
        edit: "Edit",
        editExisting: "Edit an existing",
      };
  }
};


export const getSizeFormEdit = (language: string) => {
  switch (language) {
    case "vi":
      return {
        requiredName: "Nhập ít nhất 2 ký tự.",
        updateSuccess: "Cập nhật thành công!",
        somethingWentWrong: "Something went wrong!",
        productName: "Tên sản phẩm",
        enterName: "Nhập tên ...",
        value: "Giá trị",
        valuePlaceholder: "Value ...",
        saveChange: "Save Change",
        requiredMinLength: "Nhập ít nhất 1 ký tự.",
      };
    case "en":
      return {
        requiredName: "Enter at least 2 characters.",
        updateSuccess: "Update successful!",
        somethingWentWrong: "Something went wrong!",
        productName: "Product name",
        enterName: "Enter name...",
        value: "Value",
        valuePlaceholder: "Value ...",
        saveChange: "Save Change",
        requiredMinLength: "Enter at least 1 character.",
      };
    case "zh":
      return {
        requiredName: "至少输入2个字符。",
        updateSuccess: "更新成功！",
        somethingWentWrong: "出了点问题！",
        productName: "产品名称",
        enterName: "请输入名称...",
        value: "价值",
        valuePlaceholder: "Value ...",
        saveChange: "保存更改",
        requiredMinLength: "至少输入1个字符。",
      };
    case "fr":
      return {
        requiredName: "Entrez au moins 2 caractères.",
        updateSuccess: "Mise à jour réussie !",
        somethingWentWrong: "Il y a eu un problème !",
        productName: "Nom du produit",
        enterName: "Entrez le nom...",
        value: "Valeur",
        valuePlaceholder: "Value ...",
        saveChange: "Sauvegarder les modifications",
        requiredMinLength: "Entrez au moins 1 caractère.",
      };
    case "ja":
      return {
        requiredName: "最低2文字を入力してください。",
        updateSuccess: "更新成功！",
        somethingWentWrong: "何か問題が発生しました！",
        productName: "製品名",
        enterName: "名前を入力...",
        value: "価値",
        valuePlaceholder: "Value ...",
        saveChange: "変更を保存",
        requiredMinLength: "最低1文字を入力してください。",
      };
    default:
      return {
        requiredName: "Enter at least 2 characters.",
        updateSuccess: "Update successful!",
        somethingWentWrong: "Something went wrong!",
        productName: "Product name",
        enterName: "Enter name...",
        value: "Value",
        valuePlaceholder: "Value ...",
        saveChange: "Save Change",
        requiredMinLength: "Enter at least 1 character.",
      };
  }
};

export const getSizeAction = (language: string) => {
  switch (language) {
    case "vi":
      return {
        sizeIdCopied: "Size Id đã được sao chép vào clipboard.",
        sizeDeleted: "Size đã bị xóa.",
        somethingWentWrong: "Đã có lỗi xảy ra!",
        openMenu: "Mở menu",
        actions: "Hành động",
        copyId: "Sao chép ID",
        update: "Cập nhật",
        delete: "Xóa",
      };
    case "en":
      return {
        sizeIdCopied: "Size Id copied to the clipboard.",
        sizeDeleted: "Size deleted.",
        somethingWentWrong: "Something went wrong!",
        openMenu: "Open menu",
        actions: "Actions",
        copyId: "Copy Id",
        update: "Update",
        delete: "Delete",
      };
    case "zh":
      return {
        sizeIdCopied: "尺寸ID已复制到剪贴板。",
        sizeDeleted: "尺寸已删除。",
        somethingWentWrong: "出现问题！",
        openMenu: "打开菜单",
        actions: "操作",
        copyId: "复制ID",
        update: "更新",
        delete: "删除",
      };
    case "fr":
      return {
        sizeIdCopied: "ID de taille copié dans le presse-papiers.",
        sizeDeleted: "Taille supprimée.",
        somethingWentWrong: "Il y a eu un problème !",
        openMenu: "Ouvrir le menu",
        actions: "Actions",
        copyId: "Copier l'ID",
        update: "Mettre à jour",
        delete: "Supprimer",
      };
    case "ja":
      return {
        sizeIdCopied: "サイズIDがクリップボードにコピーされました。",
        sizeDeleted: "サイズが削除されました。",
        somethingWentWrong: "何か問題が発生しました！",
        openMenu: "メニューを開く",
        actions: "アクション",
        copyId: "IDをコピー",
        update: "更新",
        delete: "削除",
      };
    default:
      return {
        sizeIdCopied: "Size Id copied to the clipboard.",
        sizeDeleted: "Size deleted.",
        somethingWentWrong: "Something went wrong!",
        openMenu: "Open menu",
        actions: "Actions",
        copyId: "Copy Id",
        update: "Update",
        delete: "Delete",
      };
  }
};

export const getSizeClient = (language: string) => {
  switch (language) {
    case "vi":
      return {
        sizeDeletedSuccess: "Kích cỡ đã bị xóa thành công.",
        somethingWentWrong: "Đã có lỗi xảy ra!",
        size: "Kích cỡ",
        manageSize: "Quản lý kích cỡ cửa hàng",
        addNew: "Thêm mới",
        api: "API",
        apiCallsForSize: "API gọi cho kích cỡ",
      };
    case "en":
      return {
        sizeDeletedSuccess: "Size deleted successfully.",
        somethingWentWrong: "Something went wrong!",
        size: "Size",
        manageSize: "Manage store sizes",
        addNew: "Add New",
        api: "API",
        apiCallsForSize: "API calls for Size",
      };
    case "zh":
      return {
        sizeDeletedSuccess: "尺寸已成功删除。",
        somethingWentWrong: "出现问题！",
        size: "尺寸",
        manageSize: "管理商店尺寸",
        addNew: "添加新尺寸",
        api: "API",
        apiCallsForSize: "尺寸的API调用",
      };
    case "fr":
      return {
        sizeDeletedSuccess: "La taille a été supprimée avec succès.",
        somethingWentWrong: "Il y a eu un problème !",
        size: "Taille",
        manageSize: "Gérer les tailles du magasin",
        addNew: "Ajouter une nouvelle taille",
        api: "API",
        apiCallsForSize: "Appels API pour la taille",
      };
    case "ja":
      return {
        sizeDeletedSuccess: "サイズは正常に削除されました。",
        somethingWentWrong: "何か問題が発生しました！",
        size: "サイズ",
        manageSize: "店舗サイズの管理",
        addNew: "新しいサイズを追加",
        api: "API",
        apiCallsForSize: "サイズのAPI呼び出し",
      };
    default:
      return {
        sizeDeletedSuccess: "Size deleted successfully.",
        somethingWentWrong: "Something went wrong!",
        size: "Size",
        manageSize: "Manage store sizes",
        addNew: "Add New",
        api: "API",
        apiCallsForSize: "API calls for Size",
      };
  }
};


export const getSizeForm = (language: string) => {
  switch (language) {
    case "vi":
      return {
        editSize: "Chỉnh sửa kích cỡ",
        createSize: "Tạo kích cỡ",
        editASize: "Chỉnh sửa một kích cỡ",
        addANewSize: "Thêm kích cỡ mới",
        saveChanges: "Lưu thay đổi",
        create: "Tạo",
        requiredTwoCharacters: "Nhập ít nhất 2 ký tự.",
        requiredOneCharacter: "Nhập ít nhất 1 ký tự.",
        size: "Kích cỡ",
        updated: "Đã cập nhật",
        created: "Đã tạo",
        updatingSize: "Đang cập nhật kích cỡ...",
        somethingWentWrong: "Đã có lỗi xảy ra!",
        sizeDeleted: "Kích cỡ đã bị xóa.",
        name: "Tên",
        sizeNameExample: "Tên kích thước. VD: Lớn, Trung bình, nhỏ...",
        namePlaceholder: "Nhập tên ...",
        shortName: "Tên ngắn gọn",
        shortNameExample: "Giống với tên kích thước nhưng chỉ cần ghi chữ cái đầu. VD: S,M,L...",
        value: "Giá trị",
      };

    case "en":
      return {
        editSize: "Edit size",
        createSize: "Create size",
        editASize: "Edit a size",
        addANewSize: "Add a new size",
        saveChanges: "Save changes",
        create: "Create",
        requiredTwoCharacters: "Enter at least 2 characters.",
        requiredOneCharacter: "Enter at least 1 character.",
        size: "Size",
        updated: "Updated",
        created: "Created",
        updatingSize: "Updating size...",
        somethingWentWrong: "Something went wrong!",
        sizeDeleted: "Size deleted.",
        name: "Name",
        sizeNameExample: "Size name. Example: Large, Medium, Small...",
        namePlaceholder: "Enter name ...",
        shortName: "Short name",
        shortNameExample: "Similar to size name, but just use the first letter. Example: S, M, L...",
        value: "Value",
      };

    case "zh":
      return {
        editSize: "编辑尺寸",
        createSize: "创建尺寸",
        editASize: "编辑一个尺寸",
        addANewSize: "添加新尺寸",
        saveChanges: "保存更改",
        create: "创建",
        requiredTwoCharacters: "请输入至少2个字符。",
        requiredOneCharacter: "请输入至少1个字符。",
        size: "尺寸",
        updated: "已更新",
        created: "已创建",
        updatingSize: "正在更新尺寸...",
        somethingWentWrong: "出现问题！",
        sizeDeleted: "尺寸已删除。",
        name: "名称",
        sizeNameExample: "尺寸名称。例如：大、中、小...",
        namePlaceholder: "请输入名称 ...",
        shortName: "简称",
        shortNameExample: "与尺寸名称类似，但只需使用首字母。例如：S, M, L...",
        value: "值",
      };

    case "fr":
      return {
        editSize: "Modifier la taille",
        createSize: "Créer une taille",
        editASize: "Modifier une taille",
        addANewSize: "Ajouter une nouvelle taille",
        saveChanges: "Sauvegarder les modifications",
        create: "Créer",
        requiredTwoCharacters: "Entrez au moins 2 caractères.",
        requiredOneCharacter: "Entrez au moins 1 caractère.",
        size: "Taille",
        updated: "Mis à jour",
        created: "Créé",
        updatingSize: "Mise à jour de la taille...",
        somethingWentWrong: "Quelque chose s'est mal passé !",
        sizeDeleted: "Taille supprimée.",
        name: "Nom",
        sizeNameExample: "Nom de la taille. Exemple : Grand, Moyen, Petit...",
        namePlaceholder: "Entrez le nom ...",
        shortName: "Nom court",
        shortNameExample: "Similaire au nom de taille, mais avec seulement la première lettre. Exemple : S, M, L...",
        value: "Valeur",
      };

    case "ja":
      return {
        editSize: "サイズを編集",
        createSize: "サイズを作成",
        editASize: "サイズを編集",
        addANewSize: "新しいサイズを追加",
        saveChanges: "変更を保存",
        create: "作成",
        requiredTwoCharacters: "少なくとも2文字を入力してください。",
        requiredOneCharacter: "少なくとも1文字を入力してください。",
        size: "サイズ",
        updated: "更新されました",
        created: "作成されました",
        updatingSize: "サイズを更新中...",
        somethingWentWrong: "何か問題が発生しました！",
        sizeDeleted: "サイズが削除されました。",
        name: "名前",
        sizeNameExample: "サイズの名前。例：大、中、小...",
        namePlaceholder: "名前を入力 ...",
        shortName: "略称",
        shortNameExample: "サイズ名と似ていますが、最初の文字だけを使用します。例：S、M、L...",
        value: "値",
      };

    default:
      return {
        editSize: "Edit size",
        createSize: "Create size",
        editASize: "Edit a size",
        addANewSize: "Add a new size",
        saveChanges: "Save changes",
        create: "Create",
        requiredTwoCharacters: "Enter at least 2 characters.",
        requiredOneCharacter: "Enter at least 1 character.",
        size: "Size",
        updated: "Updated",
        created: "Created",
        updatingSize: "Updating size...",
        somethingWentWrong: "Something went wrong!",
        sizeDeleted: "Size deleted.",
        name: "Name",
        sizeNameExample: "Size name. Example: Large, Medium, Small...",
        namePlaceholder: "Enter name ...",
        shortName: "Short name",
        shortNameExample: "Similar to size name, but just use the first letter. Example: S, M, L...",
        value: "Value",
      };
  }
};

export const getSystemAction = (language: string) => {
  switch (language) {
    case "vi":
      return {
        userProcess: "Quá trình người dùng thực hiện",
        userInfo: "Thông tin người dùng trong hệ thống",
      };
    case "en":
      return {
        userProcess: "User process",
        userInfo: "User information in the system",
      };
    case "zh":
      return {
        userProcess: "用户操作过程",
        userInfo: "系统中的用户信息",
      };
    case "fr":
      return {
        userProcess: "Processus de l'utilisateur",
        userInfo: "Informations sur l'utilisateur dans le système",
      };
    case "ja":
      return {
        userProcess: "ユーザーのプロセス",
        userInfo: "システム内のユーザー情報",
      };
    default:
      return {
        userProcess: "User process",
        userInfo: "User information in the system",
      };
  }
};

export const getSystemClient = (language: string) => {
  switch (language) {
    case "vi":
      return {
        system: "Hệ thống",
        systemManagement: "Quản lý hệ thống",
        api: "API",
        apiCallsForSystem: "API calls for System",
      };
    case "en":
      return {
        system: "System",
        systemManagement: "System management",
        api: "API",
        apiCallsForSystem: "API calls for System",
      };
    case "zh":
      return {
        system: "系统",
        systemManagement: "系统管理",
        api: "API",
        apiCallsForSystem: "系统的API调用",
      };
    case "fr":
      return {
        system: "Système",
        systemManagement: "Gestion du système",
        api: "API",
        apiCallsForSystem: "Appels API pour le système",
      };
    case "ja":
      return {
        system: "システム",
        systemManagement: "システム管理",
        api: "API",
        apiCallsForSystem: "システムのAPI呼び出し",
      };
    default:
      return {
        system: "System",
        systemManagement: "System management",
        api: "API",
        apiCallsForSystem: "API calls for System",
      };
  }
};


export const getTaxrateEditRow = (language: string) => {
  switch (language) {
    case "vi":
      return {
        notFound: "Không tìm thấy!",
        edit: "Chỉnh sửa",
        editAnExisting: "Chỉnh sửa một cái đã tồn tại",
      };
    case "en":
      return {
        notFound: "Not found!",
        edit: "Edit",
        editAnExisting: "Edit an existing",
      };
    case "zh":
      return {
        notFound: "未找到！",
        edit: "编辑",
        editAnExisting: "编辑现有的",
      };
    case "fr":
      return {
        notFound: "Non trouvé !",
        edit: "Modifier",
        editAnExisting: "Modifier un existant",
      };
    case "ja":
      return {
        notFound: "見つかりません！",
        edit: "編集",
        editAnExisting: "既存の編集",
      };
    default:
      return {
        notFound: "Not found!",
        edit: "Edit",
        editAnExisting: "Edit an existing",
      };
  }
};

export const getTaxrateFormEdit = (language: string) => {
  switch (language) {
    case "vi":
      return {
        requiredName: "Nhập ít nhất 2 ký tự.",
        requiredTaxtype: "Bắt buộc chọn taxtype.",
        requiredDescription: "Bắt buộc nhập description.",
        enterMinPrice: "Hãy nhập giá ít nhất 1%.",
        updateSuccess: "Cập nhật thành công!",
        somethingWentWrong: "Something went wrong!",
        productName: "Tên sản phẩm",
        enterName: "Nhập tên ...",
        taxDescription: "Mô tả thuế",
        enterTaxDescription: "Nhập mô tả thuế ...",
        saveChange: "Save Change",
      };
    case "en":
      return {
        requiredName: "Enter at least 2 characters.",
        requiredTaxtype: "Taxtype is required.",
        requiredDescription: "Description is required.",
        enterMinPrice: "Enter a price of at least 1%.",
        updateSuccess: "Update successful!",
        somethingWentWrong: "Something went wrong!",
        productName: "Product name",
        enterName: "Enter name...",
        taxDescription: "Tax description",
        enterTaxDescription: "Enter tax description...",
        saveChange: "Save Change",
      };
    case "zh":
      return {
        requiredName: "请输入至少2个字符。",
        requiredTaxtype: "必须选择税种。",
        requiredDescription: "必须输入描述。",
        enterMinPrice: "请输入至少1%的价格。",
        updateSuccess: "更新成功！",
        somethingWentWrong: "出了点问题！",
        productName: "产品名称",
        enterName: "请输入名称...",
        taxDescription: "税务描述",
        enterTaxDescription: "请输入税务描述...",
        saveChange: "保存更改",
      };
    case "fr":
      return {
        requiredName: "Entrez au moins 2 caractères.",
        requiredTaxtype: "Le type de taxe est requis.",
        requiredDescription: "La description est requise.",
        enterMinPrice: "Entrez un prix d'au moins 1%.",
        updateSuccess: "Mise à jour réussie !",
        somethingWentWrong: "Il y a eu un problème !",
        productName: "Nom du produit",
        enterName: "Entrez le nom...",
        taxDescription: "Description de la taxe",
        enterTaxDescription: "Entrez la description de la taxe...",
        saveChange: "Sauvegarder les modifications",
      };
    case "ja":
      return {
        requiredName: "名前は必須です。2文字以上入力してください。",
        requiredTaxtype: "税タイプは必須です。",
        requiredDescription: "説明は必須です。",
        enterMinPrice: "最低1%の価格を入力してください。",
        updateSuccess: "更新成功！",
        somethingWentWrong: "何か問題が発生しました！",
        productName: "製品名",
        enterName: "名前を入力...",
        taxDescription: "税務説明",
        enterTaxDescription: "税務説明を入力...",
        saveChange: "変更を保存",
      };
    default:
      return {
        requiredName: "Enter at least 2 characters.",
        requiredTaxtype: "Taxtype is required.",
        requiredDescription: "Description is required.",
        enterMinPrice: "Enter a price of at least 1%.",
        updateSuccess: "Update successful!",
        somethingWentWrong: "Something went wrong!",
        productName: "Product name",
        enterName: "Enter name...",
        taxDescription: "Tax description",
        enterTaxDescription: "Enter tax description...",
        saveChange: "Save Change",
      };
  }
};


export const getTaxrateAction = (language: string) => {
  switch (language) {
    case "vi":
      return {
        taxRateIdCopied: "TaxRate Id đã được sao chép vào clipboard.",
        taxRateDeleted: "Taxrate đã bị xóa.",
        somethingWentWrong: "Đã có lỗi xảy ra!",
        openMenu: "Mở menu",
        actions: "Hành động",
        copyId: "Sao chép Id",
        update: "Cập nhật",
        delete: "Xóa",
      };
    case "en":
      return {
        taxRateIdCopied: "TaxRate Id copied to the clipboard.",
        taxRateDeleted: "Taxrate deleted.",
        somethingWentWrong: "Something went wrong!",
        openMenu: "Open menu",
        actions: "Actions",
        copyId: "Copy Id",
        update: "Update",
        delete: "Delete",
      };
    case "zh":
      return {
        taxRateIdCopied: "税率ID已复制到剪贴板。",
        taxRateDeleted: "税率已删除。",
        somethingWentWrong: "出了点问题！",
        openMenu: "打开菜单",
        actions: "操作",
        copyId: "复制ID",
        update: "更新",
        delete: "删除",
      };
    case "fr":
      return {
        taxRateIdCopied: "L'ID du taux de taxe a été copié dans le presse-papiers.",
        taxRateDeleted: "Le taux de taxe a été supprimé.",
        somethingWentWrong: "Il y a eu un problème !",
        openMenu: "Ouvrir le menu",
        actions: "Actions",
        copyId: "Copier l'ID",
        update: "Mettre à jour",
        delete: "Supprimer",
      };
    case "ja":
      return {
        taxRateIdCopied: "税率IDがクリップボードにコピーされました。",
        taxRateDeleted: "税率が削除されました。",
        somethingWentWrong: "何か問題が発生しました！",
        openMenu: "メニューを開く",
        actions: "アクション",
        copyId: "IDをコピー",
        update: "更新",
        delete: "削除",
      };
    default:
      return {
        taxRateIdCopied: "TaxRate Id copied to the clipboard.",
        taxRateDeleted: "Taxrate deleted.",
        somethingWentWrong: "Something went wrong!",
        openMenu: "Open menu",
        actions: "Actions",
        copyId: "Copy Id",
        update: "Update",
        delete: "Delete",
      };
  }
};


export const getTaxrateClient = (language: string) => {
  switch (language) {
    case "vi":
      return {
        taxRateDeletedSuccessfully: "Taxrate đã bị xóa thành công.",
        somethingWentWrong: "Đã có lỗi xảy ra!",
        tax: "Thuế",
        taxManagement: "Quản lý thuế",
        addNew: "Thêm mới",
        api: "API",
        apiCallsForTaxRate: "API calls for Taxrate",
      };
    case "en":
      return {
        taxRateDeletedSuccessfully: "Taxrate deleted successfully.",
        somethingWentWrong: "Something went wrong!",
        tax: "Tax",
        taxManagement: "Tax management",
        addNew: "Add new",
        api: "API",
        apiCallsForTaxRate: "API calls for Taxrate",
      };
    case "zh":
      return {
        taxRateDeletedSuccessfully: "税率已成功删除。",
        somethingWentWrong: "出了点问题！",
        tax: "税",
        taxManagement: "税务管理",
        addNew: "新增",
        api: "API",
        apiCallsForTaxRate: "税率的API调用",
      };
    case "fr":
      return {
        taxRateDeletedSuccessfully: "Le taux de taxe a été supprimé avec succès.",
        somethingWentWrong: "Il y a eu un problème !",
        tax: "Taxe",
        taxManagement: "Gestion des taxes",
        addNew: "Ajouter un nouveau",
        api: "API",
        apiCallsForTaxRate: "Appels API pour le taux de taxe",
      };
    case "ja":
      return {
        taxRateDeletedSuccessfully: "税率は正常に削除されました。",
        somethingWentWrong: "何か問題が発生しました！",
        tax: "税金",
        taxManagement: "税金管理",
        addNew: "新規追加",
        api: "API",
        apiCallsForTaxRate: "税率のAPI呼び出し",
      };
    default:
      return {
        taxRateDeletedSuccessfully: "Taxrate deleted successfully.",
        somethingWentWrong: "Something went wrong!",
        tax: "Tax",
        taxManagement: "Tax management",
        addNew: "Add new",
        api: "API",
        apiCallsForTaxRate: "API calls for Taxrate",
      };
  }
};


export const getTaxRateSchema = (language: string) => {
  switch (language) {
    case "vi":
      return {
        requiredName: "Nhập ít nhất 2 ký tự.",
        requiredTaxtype: "Hãy chọn 1 loại thuế.",
        enterMinPrice: "Hãy nhập ít nhất 1%.",
        editTaxRate: "Chỉnh sửa tỷ lệ thuế",
        createTaxRate: "Tạo tỷ lệ thuế",
        editATaxRate: "Chỉnh sửa tỷ lệ thuế",
        addNewTaxRate: "Thêm mới tỷ lệ thuế",
        saveChanges: "Lưu thay đổi",
        create: "Tạo mới",
      };
    case "en":
      return {
        requiredName: "Enter at least 2 characters.",
        requiredTaxtype: "Please select a tax type.",
        enterMinPrice: "Enter at least 1%.",
        editTaxRate: "Edit tax rate",
        createTaxRate: "Create tax rate",
        editATaxRate: "Edit a tax rate",
        addNewTaxRate: "Add a new tax rate",
        saveChanges: "Save changes",
        create: "Create",
      };
    case "zh":
      return {
        requiredName: "请输入至少2个字符。",
        requiredTaxtype: "请选择一种税种。",
        enterMinPrice: "请输入至少1%的价格。",
        editTaxRate: "编辑税率",
        createTaxRate: "创建税率",
        editATaxRate: "编辑税率",
        addNewTaxRate: "添加新税率",
        saveChanges: "保存更改",
        create: "创建",
      };
    case "fr":
      return {
        requiredName: "Entrez au moins 2 caractères.",
        requiredTaxtype: "Veuillez sélectionner un type de taxe.",
        enterMinPrice: "Entrez au moins 1%.",
        editTaxRate: "Modifier le taux de taxe",
        createTaxRate: "Créer un taux de taxe",
        editATaxRate: "Modifier un taux de taxe",
        addNewTaxRate: "Ajouter un nouveau taux de taxe",
        saveChanges: "Sauvegarder les modifications",
        create: "Créer",
      };
    case "ja":
      return {
        requiredName: "名前は必須です。",
        requiredTaxtype: "税タイプは必須です。",
        enterMinPrice: "最低1%を入力してください。",
        editTaxRate: "税率を編集",
        createTaxRate: "税率を作成",
        editATaxRate: "税率を編集",
        addNewTaxRate: "新しい税率を追加",
        saveChanges: "変更を保存",
        create: "作成",
      };
    default:
      return {
        requiredName: "Enter at least 2 characters.",
        requiredTaxtype: "Please select a tax type.",
        enterMinPrice: "Enter at least 1%.",
        editTaxRate: "Edit tax rate",
        createTaxRate: "Create tax rate",
        editATaxRate: "Edit a tax rate",
        addNewTaxRate: "Add a new tax rate",
        saveChanges: "Save changes",
        create: "Create",
      };
  }
};


export const getTaxRateForm = (language: string) => {
  switch (language) {
    case "vi":
      return {
        taxRate: "Tỷ lệ thuế",
        updated: "Cập nhật tỷ lệ thuế",
        created: "Tạo tỷ lệ thuế",
        updatingTaxRate: "Đang cập nhật tỷ lệ thuế...",
        somethingWentWrong: "Đã có lỗi xảy ra!",
        taxName: "Tên thuế",
        taxNamePrompt: "Tên loại thuế là gì?",
        enterTaxName: "Nhập tên thuế ...",
        taxDescription: "Mô tả thuế",
        taxDescriptionPrompt: "Giải thích sơ qua về thuế cần phải đóng.",
        enterTaxDescription: "Nhập mô tả thuế ...",
        taxType: "Loại thuế",
        taxTypePrompt: "Hãy lựa chọn loại thuế là VAT hoặc là thuế mua sắm.",
        selectTaxType: "Chọn loại thuế",
        taxPercentage: "Phần trăm thuế",
        taxPercentagePrompt: "Phần trăm thuế sẽ bắt đầu từ mốc 0% - 100%",
        enterTaxPercentage: "Nhập phần trăm thuế ...",
        activity: "Hoạt động",
        taxActivityPrompt: "Mặc định thuế sẽ ngừng, nếu muốn hoạt động thì mở lên.",
        taxStatusOptions: "Ngừng hoặc mở thuế",
        includesExclusive: "Bao gồm hay độc quyền",
        includesPrompt: "Xem thử loại thuế này do sản phẩm độc quyền hay do các nguyên nhân khác.",
        includes: "Bao gồm",
      };
    case "en":
      return {
        taxRate: "Tax rate",
        updated: "Tax rate updated",
        created: "Tax rate created",
        updatingTaxRate: "Updating tax rate...",
        somethingWentWrong: "Something went wrong!",
        taxName: "Tax name",
        taxNamePrompt: "What is the tax type name?",
        enterTaxName: "Enter tax name...",
        taxDescription: "Tax description",
        taxDescriptionPrompt: "Briefly explain the tax to be paid.",
        enterTaxDescription: "Enter tax description...",
        taxType: "Tax type",
        taxTypePrompt: "Please choose a tax type, either VAT or sales tax.",
        selectTaxType: "Select Tax Type",
        taxPercentage: "Tax percentage",
        taxPercentagePrompt: "Tax percentage should range from 0% to 100%",
        enterTaxPercentage: "Enter tax percentage...",
        activity: "Activity",
        taxActivityPrompt: "By default, the tax will be paused, enable it to activate.",
        taxStatusOptions: "Pause or activate tax",
        includesExclusive: "Includes or Exclusive",
        includesPrompt: "Check if this tax is exclusive to a product or caused by other reasons.",
        includes: "Includes",
      };
    case "zh":
      return {
        taxRate: "税率",
        updated: "税率已更新",
        created: "已创建税率",
        updatingTaxRate: "正在更新税率...",
        somethingWentWrong: "出了点问题！",
        taxName: "税名",
        taxNamePrompt: "税种名称是什么？",
        enterTaxName: "请输入税名...",
        taxDescription: "税务描述",
        taxDescriptionPrompt: "简要说明需要支付的税款。",
        enterTaxDescription: "请输入税务描述...",
        taxType: "税种",
        taxTypePrompt: "请选择税种：增值税 (VAT) 或销售税。",
        selectTaxType: "选择税种",
        taxPercentage: "税率百分比",
        taxPercentagePrompt: "税率应在 0% 至 100% 之间",
        enterTaxPercentage: "请输入税率百分比...",
        activity: "活动",
        taxActivityPrompt: "默认税将暂停，启用以激活。",
        taxStatusOptions: "暂停或启用税",
        includesExclusive: "包含或独占",
        includesPrompt: "检查此税是否专属于产品或由于其他原因。",
        includes: "包含",
      };
    case "fr":
      return {
        taxRate: "Taux d'imposition",
        updated: "Taux d'imposition mis à jour",
        created: "Taux d'imposition créé",
        updatingTaxRate: "Mise à jour du taux d'imposition...",
        somethingWentWrong: "Un problème est survenu !",
        taxName: "Nom de la taxe",
        taxNamePrompt: "Quel est le nom du type de taxe ?",
        enterTaxName: "Entrez le nom de la taxe...",
        taxDescription: "Description de la taxe",
        taxDescriptionPrompt: "Expliquez brièvement la taxe à payer.",
        enterTaxDescription: "Entrez la description de la taxe...",
        taxType: "Type de taxe",
        taxTypePrompt: "Veuillez choisir un type de taxe : TVA ou taxe sur les ventes.",
        selectTaxType: "Sélectionnez le type de taxe",
        taxPercentage: "Pourcentage de taxe",
        taxPercentagePrompt: "Le pourcentage de taxe doit être compris entre 0 % et 100 %",
        enterTaxPercentage: "Entrez le pourcentage de taxe...",
        activity: "Activité",
        taxActivityPrompt: "Par défaut, la taxe sera suspendue, activez-la pour l'activer.",
        taxStatusOptions: "Suspendre ou activer la taxe",
        includesExclusive: "Inclut ou exclusif",
        includesPrompt: "Vérifiez si cette taxe est exclusive à un produit ou due à d'autres raisons.",
        includes: "Inclut",
      };
    case "ja":
      return {
        taxRate: "税率",
        updated: "税率が更新されました",
        created: "税率が作成されました",
        updatingTaxRate: "税率を更新しています...",
        somethingWentWrong: "問題が発生しました！",
        taxName: "税名",
        taxNamePrompt: "税のタイプ名は何ですか？",
        enterTaxName: "税名を入力してください...",
        taxDescription: "税の説明",
        taxDescriptionPrompt: "支払う税金を簡単に説明してください。",
        enterTaxDescription: "税の説明を入力してください...",
        taxType: "税タイプ",
        taxTypePrompt: "税タイプを選択してください：VAT または消費税。",
        selectTaxType: "税タイプを選択",
        taxPercentage: "税率",
        taxPercentagePrompt: "税率は 0% ～ 100% の範囲内である必要があります",
        enterTaxPercentage: "税率を入力してください...",
        activity: "アクティビティ",
        taxActivityPrompt: "デフォルトで税金は一時停止されます。有効にするにはオンにしてください。",
        taxStatusOptions: "税を一時停止または有効化",
        includesExclusive: "含むまたは排他的",
        includesPrompt: "この税金が製品専用か、それとも他の理由によるものかを確認してください。",
        includes: "含む",
      };
    default:
      return {
        taxRate: "Tax rate",
        updated: "Tax rate updated",
        created: "Tax rate created",
        updatingTaxRate: "Updating tax rate...",
        somethingWentWrong: "Something went wrong!",
        taxName: "Tax name",
        taxNamePrompt: "What is the tax type name?",
        enterTaxName: "Enter tax name...",
        taxDescription: "Tax description",
        taxDescriptionPrompt: "Briefly explain the tax to be paid.",
        enterTaxDescription: "Enter tax description...",
        taxType: "Tax type",
        taxTypePrompt: "Please choose a tax type, either VAT or sales tax.",
        selectTaxType: "Select Tax Type",
        taxPercentage: "Tax percentage",
        taxPercentagePrompt: "Tax percentage should range from 0% to 100%",
        enterTaxPercentage: "Enter tax percentage...",
        activity: "Activity",
        taxActivityPrompt: "By default, the tax will be paused, enable it to activate.",
        taxStatusOptions: "Pause or activate tax",
        includesExclusive: "Includes or Exclusive",
        includesPrompt: "Check if this tax is exclusive to a product or caused by other reasons.",
        includes: "Includes",
      };
  }
};


export const getwheelSpinAction = (language: string) => {
  switch (language) {
    case "vi":
      return {
        addedBonus: "Đã cộng thêm",
        deducted: "Đã bị trừ",
        rotation: "vòng quay",
        and: "và",
        coin: "xu",
        total: "Tổng",
        updatingBonus: "Đang cập nhật phần thưởng...",
        updatingUnbonus: "Đang cập nhật phần phạt...",
        somethingWentWrong: "Đã có lỗi xảy ra!",
        openMenu: "Mở menu",
        actions: "Hành động",
        bonus: "Thêm thưởng",
        unbonus: "Trừ thưởng",
        enterTitle: "Nhập tiêu đề...",
        enterBonusRotation: "Nhập vòng quay phần thưởng...",
        enterCoin: "Nhập xu...",
        save: "Lưu",
        cancel: "Hủy",
        enterUnbonusRotation: "Nhập vòng quay bị trừ...",
        enterUncoin: "Nhập xu bị trừ...",
        content: "Nội dung",
      };
    case "en":
      return {
        addedBonus: "Bonus added",
        deducted: "Deducted",
        rotation: "rotation",
        and: "and",
        coin: "coin",
        total: "Total",
        updatingBonus: "Updating bonus...",
        updatingUnbonus: "Updating unbonus...",
        somethingWentWrong: "Something went wrong!",
        openMenu: "Open menu",
        actions: "Actions",
        bonus: "Add Bonus",
        unbonus: "Deduct Bonus",
        enterTitle: "Enter title...",
        enterBonusRotation: "Enter bonus rotation...",
        enterCoin: "Enter coin...",
        save: "Save",
        cancel: "Cancel",
        enterUnbonusRotation: "Enter unbonus rotation...",
        enterUncoin: "Enter uncoin...",
        content: "Content",
      };
    case "zh":
      return {
        addedBonus: "奖励已添加",
        deducted: "已扣除",
        rotation: "转动",
        and: "和",
        coin: "硬币",
        total: "总计",
        updatingBonus: "正在更新奖励...",
        updatingUnbonus: "正在更新扣除...",
        somethingWentWrong: "出了点问题！",
        openMenu: "打开菜单",
        actions: "操作",
        bonus: "添加奖励",
        unbonus: "扣除奖励",
        enterTitle: "输入标题...",
        enterBonusRotation: "输入奖励转动...",
        enterCoin: "输入硬币...",
        save: "保存",
        cancel: "取消",
        enterUnbonusRotation: "输入扣除转动...",
        enterUncoin: "输入扣除硬币...",
        content: "内容",
      };
    case "fr":
      return {
        addedBonus: "Bonus ajouté",
        deducted: "Déduit",
        rotation: "rotation",
        and: "et",
        coin: "pièce",
        total: "Total",
        updatingBonus: "Mise à jour du bonus...",
        updatingUnbonus: "Mise à jour de la pénalité...",
        somethingWentWrong: "Un problème est survenu !",
        openMenu: "Ouvrir le menu",
        actions: "Actions",
        bonus: "Ajouter un bonus",
        unbonus: "Déduire un bonus",
        enterTitle: "Entrez le titre...",
        enterBonusRotation: "Entrez la rotation bonus...",
        enterCoin: "Entrez une pièce...",
        save: "Sauvegarder",
        cancel: "Annuler",
        enterUnbonusRotation: "Entrez la rotation de pénalité...",
        enterUncoin: "Entrez une pièce pénalité...",
        content: "Contenu",
      };
    case "ja":
      return {
        addedBonus: "ボーナスが追加されました",
        deducted: "差し引かれました",
        rotation: "回転",
        and: "と",
        coin: "コイン",
        total: "合計",
        updatingBonus: "ボーナスを更新しています...",
        updatingUnbonus: "控除を更新しています...",
        somethingWentWrong: "問題が発生しました！",
        openMenu: "メニューを開く",
        actions: "アクション",
        bonus: "ボーナスを追加",
        unbonus: "ボーナスを控除",
        enterTitle: "タイトルを入力してください...",
        enterBonusRotation: "ボーナス回転を入力してください...",
        enterCoin: "コインを入力してください...",
        save: "保存",
        cancel: "キャンセル",
        enterUnbonusRotation: "控除回転を入力してください...",
        enterUncoin: "控除コインを入力してください...",
        content: "コンテンツ",
      };
    default:
      return {
        addedBonus: "Bonus added",
        deducted: "Deducted",
        rotation: "rotation",
        and: "and",
        coin: "coin",
        total: "Total",
        updatingBonus: "Updating bonus...",
        updatingUnbonus: "Updating unbonus...",
        somethingWentWrong: "Something went wrong!",
        openMenu: "Open menu",
        actions: "Actions",
        bonus: "Add Bonus",
        unbonus: "Deduct Bonus",
        enterTitle: "Enter title...",
        enterBonusRotation: "Enter bonus rotation...",
        enterCoin: "Enter coin...",
        save: "Save",
        cancel: "Cancel",
        enterUnbonusRotation: "Enter unbonus rotation...",
        enterUncoin: "Enter uncoin...",
        content: "Content",
      };
  }
};


export const getWheelSpinClient = (language: string) => {
  switch (language) {
    case "vi":
      return {
        wheelSpin: "Vòng quay",
        manageWheelSpin: "Quản lý Vòng quay",
        api: "API",
        apiCalls: "API calls for wheel spin",
      };
    case "en":
      return {
        wheelSpin: "Wheel Spin",
        manageWheelSpin: "Manage Wheel Spin",
        api: "API",
        apiCalls: "API calls for wheel spin",
      };
    case "zh":
      return {
        wheelSpin: "转盘",
        manageWheelSpin: "管理转盘",
        api: "API",
        apiCalls: "转盘的API调用",
      };
    case "fr":
      return {
        wheelSpin: "Roue de la chance",
        manageWheelSpin: "Gérer la roue de la chance",
        api: "API",
        apiCalls: "Appels API pour la roue de la chance",
      };
    case "ja":
      return {
        wheelSpin: "ルーレット",
        manageWheelSpin: "ルーレット管理",
        api: "API",
        apiCalls: "ルーレット用のAPI呼び出し",
      };
    default:
      return {
        wheelSpin: "Wheel Spin",
        manageWheelSpin: "Manage Wheel Spin",
        api: "API",
        apiCalls: "API calls for wheel spin",
      };
  }
};


export const getDataTable = (language: string) => {
  switch (language) {
    case "vi":
      return {
        search: "Tìm kiếm",
        delete: "Xóa",
        totalShipperDebt: "Tổng nợ shipper",
        totalCollectedFromShipper: "Tổng tiền thu được từ shipper",
        noResults: "Không có kết quả.",
        of: "của",
        rowsSelected: "hàng được chọn",
        previous: "Trước",
        next: "Tiếp",
      };
    case "en":
      return {
        search: "Search",
        delete: "Delete",
        totalShipperDebt: "Total shipper debt",
        totalCollectedFromShipper: "Total collected from shipper",
        noResults: "No results.",
        of: "of",
        rowsSelected: "row(s) selected",
        previous: "Previous",
        next: "Next",
      };
    case "zh":
      return {
        search: "搜索",
        delete: "删除",
        totalShipperDebt: "送货员总债务",
        totalCollectedFromShipper: "从送货员收集的总金额",
        noResults: "没有结果。",
        of: "的",
        rowsSelected: "行已选择",
        previous: "上一页",
        next: "下一页",
      };
    case "fr":
      return {
        search: "Rechercher",
        delete: "Supprimer",
        totalShipperDebt: "Dette totale du livreur",
        totalCollectedFromShipper: "Total collecté auprès du livreur",
        noResults: "Aucun résultat.",
        of: "de",
        rowsSelected: "ligne(s) sélectionnée(s)",
        previous: "Précédent",
        next: "Suivant",
      };
    case "ja":
      return {
        search: "検索",
        delete: "削除",
        totalShipperDebt: "配達員の総負債",
        totalCollectedFromShipper: "配達員から集めた合計金額",
        noResults: "結果がありません。",
        of: "の",
        rowsSelected: "行が選択されました",
        previous: "前へ",
        next: "次へ",
      };
    default:
      return {
        search: "Search",
        delete: "Delete",
        totalShipperDebt: "Total shipper debt",
        totalCollectedFromShipper: "Total collected from shipper",
        noResults: "No results.",
        of: "of",
        rowsSelected: "row(s) selected",
        previous: "Previous",
        next: "Next",
      };
  }
};

export const getPickCalendar = (language: string) => {
  switch (language) {
    case "vi":
      return {
        pickDateTime: "Chọn ngày và giờ",
        fromTime: "Từ giờ",
        toTime: "Đến giờ",
      };
    case "en":
      return {
        pickDateTime: "Pick a date and time",
        fromTime: "From Time",
        toTime: "To Time",
      };
    case "zh":
      return {
        pickDateTime: "选择日期和时间",
        fromTime: "从时间",
        toTime: "到时间",
      };
    case "fr":
      return {
        pickDateTime: "Choisissez une date et une heure",
        fromTime: "De l'heure",
        toTime: "À l'heure",
      };
    case "ja":
      return {
        pickDateTime: "日付と時間を選択",
        fromTime: "開始時刻",
        toTime: "終了時刻",
      };
    default:
      return {
        pickDateTime: "Pick a date and time",
        fromTime: "From Time",
        toTime: "To Time",
      };
  }
};

export const getUsersLabel = (language: string, maxRedemptionsValue: number): string => {
  // Kiểm tra số lượng và thay đổi từ "user" hoặc "users"
  const isPlural = maxRedemptionsValue > 1;

  switch (language) {
    case "vi": // Tiếng Việt
      return isPlural ? "người dùng" : "người dùng";
    case "en": // Tiếng Anh
      return isPlural ? "users" : "user";
    case "zh": // Tiếng Trung
      return isPlural ? "用户" : "用户"; // Chữ Trung không thay đổi dạng số nhiều
    case "fr": // Tiếng Pháp
      return isPlural ? "utilisateurs" : "utilisateur";
    case "ja": // Tiếng Nhật
      return isPlural ? "ユーザー" : "ユーザー"; // Chữ Nhật không thay đổi dạng số nhiều
    default:
      return "users"; // Mặc định Tiếng Anh
  }
};

export const getMonthLabel = (language: string): string => {
  switch (language) {
    case "vi": // Tiếng Việt
      return "tháng";
    case "en": // Tiếng Anh
      return "month";
    case "zh": // Tiếng Trung
      return "个月"; // Gè yuè
    case "fr": // Tiếng Pháp
      return "mois";
    case "ja": // Tiếng Nhật
      return "ヶ月"; // Kagetsu
    default:
      return "month"; // Mặc định Tiếng Anh
  }
};


export const getStatusDisplay = (status: string, language: string) => {
  switch (language) {
    case "vi": // Tiếng Việt
      switch (status) {
        case "Cho_xac_nhan":
          return <span className="text-red-500 font-semibold">Chờ xác nhận</span>;
        case "Soan_hang":
          return <span className="text-yellow-500 font-semibold">Soạn hàng</span>;
        case "Cho_lay_hang":
          return <span className="text-yellow-500 font-semibold">Chờ lấy hàng</span>;
        case "Dang_giao":
          return <span className="text-blue-500 font-semibold">Đang giao</span>;
        case "Giao_lai_hang":
          return <span className="text-yellow-500 font-semibold">Giao hàng lại</span>;
        case "Danh_gia":
          return <span className="text-yellow-500 font-semibold">Đánh giá</span>;
        case "Da_giao":
          return <span className="text-green-500 font-semibold">Đã giao</span>;
        case "Da_huy":
          return <span className="text-red-500 font-semibold">Đã hủy</span>;
        case "Tra_hang":
          return <span className="text-yellow-500 font-semibold">Trả hàng</span>;
        case "Nhan_tai_cua_hang":
          return <span className="text-red-500 font-semibold">Nhận tại cửa hàng</span>;
        case "Soan_hang_nhan_tai_cua_hang":
          return <span className="text-yellow-500 font-semibold">Soạn hàng nhận tại cửa hàng</span>;
        case "Da_soan_hang_xong":
          return <span className="text-blue-500 font-semibold">Đã soạn hàng xong</span>;
        case "Da_nhan_tai_cua_hang":
          return <span className="text-green-500 font-semibold">Đã nhận tại cửa hàng</span>;
        case "Shipper_chuan_bi":
          return <span className="text-yellow-500 font-semibold">Shipper chuẩn bị</span>;
        case "Shipper_dang_den":
          return <span className="text-yellow-500 font-semibold">Shipper đang đến</span>;
        case "Da_nhan_tra_hang":
          return <span className="text-green-500 font-semibold">Đã nhận trả hàng</span>;
        default:
          return <span className="font-semibold">{status}</span>;
      }

    case "en": // Tiếng Anh
      switch (status) {
        case "Cho_xac_nhan":
          return <span className="text-red-500 font-semibold">Waiting for confirmation</span>;
        case "Soan_hang":
          return <span className="text-yellow-500 font-semibold">Preparing items</span>;
        case "Cho_lay_hang":
          return <span className="text-yellow-500 font-semibold">Waiting for pickup</span>;
        case "Dang_giao":
          return <span className="text-blue-500 font-semibold">In transit</span>;
        case "Giao_lai_hang":
          return <span className="text-yellow-500 font-semibold">Rescheduling delivery</span>;
        case "Danh_gia":
          return <span className="text-yellow-500 font-semibold">Rating</span>;
        case "Da_giao":
          return <span className="text-green-500 font-semibold">Delivered</span>;
        case "Da_huy":
          return <span className="text-red-500 font-semibold">Canceled</span>;
        case "Tra_hang":
          return <span className="text-yellow-500 font-semibold">Returned</span>;
        case "Nhan_tai_cua_hang":
          return <span className="text-red-500 font-semibold">Pickup at store</span>;
        case "Soan_hang_nhan_tai_cua_hang":
          return <span className="text-yellow-500 font-semibold">Preparing for store pickup</span>;
        case "Da_soan_hang_xong":
          return <span className="text-blue-500 font-semibold">Items prepared</span>;
        case "Da_nhan_tai_cua_hang":
          return <span className="text-green-500 font-semibold">Picked up at store</span>;
        case "Shipper_chuan_bi":
          return <span className="text-yellow-500 font-semibold">Shipper preparing</span>;
        case "Shipper_dang_den":
          return <span className="text-yellow-500 font-semibold">Shipper on the way</span>;
        case "Da_nhan_tra_hang":
          return <span className="text-green-500 font-semibold">Returned items received</span>;
        default:
          return <span className="font-semibold">{status}</span>;
      }

    case "zh": // Tiếng Trung
      switch (status) {
        case "Cho_xac_nhan":
          return <span className="text-red-500 font-semibold">等待确认</span>;
        case "Soan_hang":
          return <span className="text-yellow-500 font-semibold">准备货物</span>;
        case "Cho_lay_hang":
          return <span className="text-yellow-500 font-semibold">等待取货</span>;
        case "Dang_giao":
          return <span className="text-blue-500 font-semibold">运输中</span>;
        case "Giao_lai_hang":
          return <span className="text-yellow-500 font-semibold">重新配送</span>;
        case "Danh_gia":
          return <span className="text-yellow-500 font-semibold">评价</span>;
        case "Da_giao":
          return <span className="text-green-500 font-semibold">已配送</span>;
        case "Da_huy":
          return <span className="text-red-500 font-semibold">已取消</span>;
        case "Tra_hang":
          return <span className="text-yellow-500 font-semibold">退货</span>;
        case "Nhan_tai_cua_hang":
          return <span className="text-red-500 font-semibold">商店取货</span>;
        case "Soan_hang_nhan_tai_cua_hang":
          return <span className="text-yellow-500 font-semibold">准备商店取货</span>;
        case "Da_soan_hang_xong":
          return <span className="text-blue-500 font-semibold">已准备好商品</span>;
        case "Da_nhan_tai_cua_hang":
          return <span className="text-green-500 font-semibold">已在商店取货</span>;
        case "Shipper_chuan_bi":
          return <span className="text-yellow-500 font-semibold">发货员准备中</span>;
        case "Shipper_dang_den":
          return <span className="text-yellow-500 font-semibold">发货员在路上</span>;
        case "Da_nhan_tra_hang":
          return <span className="text-green-500 font-semibold">已收到退货</span>;
        default:
          return <span className="font-semibold">{status}</span>;
      }

    case "fr": // Tiếng Pháp
      switch (status) {
        case "Cho_xac_nhan":
          return <span className="text-red-500 font-semibold">En attente de confirmation</span>;
        case "Soan_hang":
          return <span className="text-yellow-500 font-semibold">Préparation des articles</span>;
        case "Cho_lay_hang":
          return <span className="text-yellow-500 font-semibold">En attente de ramassage</span>;
        case "Dang_giao":
          return <span className="text-blue-500 font-semibold">En transit</span>;
        case "Giao_lai_hang":
          return <span className="text-yellow-500 font-semibold">Livraison reprogrammée</span>;
        case "Danh_gia":
          return <span className="text-yellow-500 font-semibold">Évaluation</span>;
        case "Da_giao":
          return <span className="text-green-500 font-semibold">Livré</span>;
        case "Da_huy":
          return <span className="text-red-500 font-semibold">Annulé</span>;
        case "Tra_hang":
          return <span className="text-yellow-500 font-semibold">Retour</span>;
        case "Nhan_tai_cua_hang":
          return <span className="text-red-500 font-semibold">Récupération en magasin</span>;
        case "Soan_hang_nhan_tai_cua_hang":
          return <span className="text-yellow-500 font-semibold">Préparation pour récupération en magasin</span>;
        case "Da_soan_hang_xong":
          return <span className="text-blue-500 font-semibold">Articles préparés</span>;
        case "Da_nhan_tai_cua_hang":
          return <span className="text-green-500 font-semibold">Récupéré en magasin</span>;
        case "Shipper_chuan_bi":
          return <span className="text-yellow-500 font-semibold">Préparation du livreur</span>;
        case "Shipper_dang_den":
          return <span className="text-yellow-500 font-semibold">Livreur en chemin</span>;
        case "Da_nhan_tra_hang":
          return <span className="text-green-500 font-semibold">Retour reçu</span>;
        default:
          return <span className="font-semibold">{status}</span>;
      }

    case "ja": // Tiếng Nhật
      switch (status) {
        case "Cho_xac_nhan":
          return <span className="text-red-500 font-semibold">確認待ち</span>;
        case "Soan_hang":
          return <span className="text-yellow-500 font-semibold">商品準備中</span>;
        case "Cho_lay_hang":
          return <span className="text-yellow-500 font-semibold">ピックアップ待機</span>;
        case "Dang_giao":
          return <span className="text-blue-500 font-semibold">配送中</span>;
        case "Giao_lai_hang":
          return <span className="text-yellow-500 font-semibold">再配送</span>;
        case "Danh_gia":
          return <span className="text-yellow-500 font-semibold">評価</span>;
        case "Da_giao":
          return <span className="text-green-500 font-semibold">配送完了</span>;
        case "Da_huy":
          return <span className="text-red-500 font-semibold">キャンセル済み</span>;
        case "Tra_hang":
          return <span className="text-yellow-500 font-semibold">返品</span>;
        case "Nhan_tai_cua_hang":
          return <span className="text-red-500 font-semibold">店舗で受け取り</span>;
        case "Soan_hang_nhan_tai_cua_hang":
          return <span className="text-yellow-500 font-semibold">店舗受け取り準備中</span>;
        case "Da_soan_hang_xong":
          return <span className="text-blue-500 font-semibold">商品準備完了</span>;
        case "Da_nhan_tai_cua_hang":
          return <span className="text-green-500 font-semibold">店舗で受け取った</span>;
        case "Shipper_chuan_bi":
          return <span className="text-yellow-500 font-semibold">配達員準備中</span>;
        case "Shipper_dang_den":
          return <span className="text-yellow-500 font-semibold">配達員到着中</span>;
        case "Da_nhan_tra_hang":
          return <span className="text-green-500 font-semibold">返品受け取り完了</span>;
        default:
          return <span className="font-semibold">{status}</span>;
      }

    default:
      return <span className="font-semibold">{status}</span>;
  }
};

export const taxTypeMapping: Record<string, Record<string, string>> = {
  vi: {
    vat: "VAT",
    sales_tax: "Thuế doanh thu",
  },
  en: {
    vat: "VAT",
    sales_tax: "Sales Tax",
  },
  zh: {
    vat: "增值税",
    sales_tax: "销售税",
  },
  fr: {
    vat: "TVA",
    sales_tax: "Taxe de vente",
  },
  ja: {
    vat: "消費税",
    sales_tax: "売上税",
  },
};

export const getSettingUserColumn = (language: string) => {
  switch (language) {
    case "vi": // Tiếng Việt
      return {
        success: "Thay đổi thành công!",
        error: "Something went wrong!",
        save: "Lưu",
        cancel: "Hủy",
      };
    case "en": // Tiếng Anh
      return {
        success: "Change successful!",
        error: "Something went wrong!",
        save: "Save",
        cancel: "Cancel",
      };
    case "zh": // Tiếng Trung
      return {
        success: "更改成功！",
        error: "出错了！",
        save: "保存",
        cancel: "取消",
      };
    case "fr": // Tiếng Pháp
      return {
        success: "Changement réussi!",
        error: "Quelque chose a mal tourné!",
        save: "Enregistrer",
        cancel: "Annuler",
      };
    case "ja": // Tiếng Nhật
      return {
        success: "変更が成功しました！",
        error: "何かがうまくいきませんでした！",
        save: "保存",
        cancel: "キャンセル",
      };
    default:
      return {
        success: "Change successful!",
        error: "Something went wrong!",
        save: "Save",
        cancel: "Cancel",
      };
  }
};
