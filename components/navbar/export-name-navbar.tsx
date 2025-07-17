import {
  Boxes,
  Cable,
  CalendarDays,
  CalendarRange,
  CircleEllipsis,
  Fan,
  Gauge,
  HandCoins,
  Landmark,
  Lightbulb,
  LockKeyhole,
  Mail,
  MessageSquareMore,
  PackageOpen,
  PaintRoller,
  Palette,
  PencilRuler,
  PlugZap,
  Receipt,
  ReceiptText,
  ServerCog,
  Settings,
  ShowerHead,
  TicketPercent,
  UserRound,
  UsersRound,
  Droplet,
  Webhook,
  Battery,
  Pipette,
  AlignJustify,
  Users,
  Construction,
  Layers3,
  AlignEndHorizontal,
  Package2,
  Container,
  Contact,
  Banknote,
  Settings2,
  BookHeart,
  MessageSquareText,
  Truck,
  Store,
  MessageSquareReply,
} from "lucide-react";
import { useTranslations } from "next-intl";

export const route = (params: string, pathname: string) => {
  const t = useTranslations("navbardashboard");

  return [
    {
      href: `/${params}`,
      label: t("route.overview"),
      icon: <Gauge className="size-5" />,
      content: t("route.salesDataOverview"),
      active: pathname === `/${params}`,
    },
    {
      href: `/store`,
      label: t("route.stores"),
      icon: <Store className="size-5" />,
      content: t("route.storeList"),
      active: pathname === `/store`,
    },
    {
      href: `/${params}/feedback`,
      label: t("route.feedback"),
      icon: <MessageSquareReply className="size-5" />,
      content: t("route.storeReviews"),
      active: pathname === `/${params}/feedback`,
    },
  ];
};

export const staff = (params: string, pathname: string) => {
  const t = useTranslations("navbardashboard");

  return [
    {
      href: `/${params}/attendancestaff`,
      label: t("attendance.employeeattendance"),
      icon: <CalendarDays className="size-5" />,
      content: t("attendance.automaticpayroll"),
      active: pathname === `/${params}/attendancestaff`,
    },
    {
      href: `/${params}/sentmailuser`,
      label: t("attendance.sendmail"),
      icon: <Mail className="size-5" />,
      content: t("attendance.maildescription"),
      active: pathname === `/${params}/sentmailuser`,
    },
    {
      href: `/${params}/manageattendance`,
      label: t("attendance.attendancecontrol"),
      icon: <CalendarRange className="size-5" />,
      content: t("attendance.userattendance"),
      active: pathname === `/${params}/manageattendance`,
    },
    {
      href: `/${params}/salarystaff`,
      label: t("attendance.salarymanagement"),
      icon: <Landmark className="size-5" />,
      content: t("attendance.attendancepayroll"),
      active: pathname === `/${params}/salarystaff`,
    },
    {
      href: `/${params}/wheelSpin`,
      label: t("attendance.coinmanagement"),
      icon: <HandCoins className="size-5" />,
      content: t("attendance.coinmanagementdesc"),
      active: pathname === `/${params}/wheelSpin`,
    },
    {
      href: `/${params}/comment`,
      label: t("attendance.reviewmanagement"),
      icon: <MessageSquareMore className="size-5" />,
      content: t("attendance.userreviews"),
      active: pathname === `/${params}/comment`,
    },
  ];
};

export const billboard = (params: string, pathname: string) => {
  const t = useTranslations("navbardashboard");

  return [
    {
      href: `/${params}/billboards`,
      label: t("billboards.adImage"),
      icon: <MessageSquareMore className="size-5" />,
      content: t("billboards.adImageManagement"),
      active: pathname === `/${params}/billboards`,
    },
    {
      href: `/${params}/image-billboards`,
      label: t("billboards.imageDescription"),
      icon: <MessageSquareText className="size-5" />,
      content: t("billboards.adImageDetails"),
      active: pathname === `/${params}/image-billboards`,
    },
  ];
};


export const categories = (params: string, pathname: string) => {
  const t = useTranslations("navbardashboard");

  return [
    {
      href: `/${params}/categories`,
      label: t("categories.pin"),
      icon: <Battery className="size-5" />,
      content: t("categories.pinDescription"),
      active: pathname === `/${params}/categories`,
    },
    {
      href: `/${params}/categories1`,
      label: t("categories.fan"),
      icon: <Fan className="size-5" />,
      content: t("categories.fanDescription"),
      active: pathname === `/${params}/categories1`,
    },
    {
      href: `/${params}/categories2`,
      label: t("categories.plasticPipe"),
      icon: <Droplet className="size-5" />,
      content: t("categories.plasticPipeDescription"),
      active: pathname === `/${params}/categories2`,
    },
    {
      href: `/${params}/categories3`,
      label: t("categories.electricWire"),
      icon: <Cable className="size-5" />,
      content: t("categories.electricWireDescription"),
      active: pathname === `/${params}/categories3`,
    },
    {
      href: `/${params}/categories4`,
      label: t("categories.cuttingStone"),
      icon: <Webhook className="size-5" />,
      content: t("categories.cuttingStoneDescription"),
      active: pathname === `/${params}/categories4`,
    },
    {
      href: `/${params}/categories5`,
      label: t("categories.lock"),
      icon: <LockKeyhole className="size-5" />,
      content: t("categories.lockDescription"),
      active: pathname === `/${params}/categories5`,
    },
    {
      href: `/${params}/categories6`,
      label: t("categories.glue"),
      icon: <Pipette className="size-5" />,
      content: t("categories.glueDescription"),
      active: pathname === `/${params}/categories6`,
    },
    {
      href: `/${params}/categories7`,
      label: t("categories.socket"),
      icon: <PlugZap className="size-5" />,
      content: t("categories.socketDescription"),
      active: pathname === `/${params}/categories7`,
    },
    {
      href: `/${params}/categories8`,
      label: t("categories.paint"),
      icon: <PaintRoller className="size-5" />,
      content: t("categories.paintDescription"),
      active: pathname === `/${params}/categories8`,
    },
    {
      href: `/${params}/categories9`,
      label: t("categories.bathroomMaterials"),
      icon: <ShowerHead className="size-5" />,
      content: t("categories.bathroomMaterialsDescription"),
      active: pathname === `/${params}/categories9`,
    },
    {
      href: `/${params}/categories10`,
      label: t("categories.lightBulb"),
      icon: <Lightbulb className="size-5" />,
      content: t("categories.lightBulbDescription"),
      active: pathname === `/${params}/categories10`,
    },
    {
      href: `/${params}/categories11`,
      label: t("categories.dailyUseItems"),
      icon: <CircleEllipsis className="size-5" />,
      content: t("categories.dailyUseItemsDescription"),
      active: pathname === `/${params}/categories11`,
    },
  ];
};


export const parameter = (params: string, pathname: string) => {
  const t = useTranslations("navbardashboard");

  return [
    {
      href: `/${params}/size`,
      label: t("parameter.size"),
      icon: <PencilRuler className="size-5" />,
      content: t("parameter.sizeDescription"),
      active: pathname === `/${params}/size`,
    },
    {
      href: `/${params}/color`,
      label: t("parameter.color"),
      icon: <Palette className="size-5" />,
      content: t("parameter.colorDescription"),
      active: pathname === `/${params}/color`,
    },
    {
      href: `/${params}/productdetail`,
      label: t("parameter.productDetails"),
      icon: <Boxes className="size-5" />,
      content: t("parameter.productDetailsDescription"),
      active: pathname === `/${params}/productdetail`,
    },
    {
      href: `/${params}/favorite`,
      label: t("parameter.preferences"),
      icon: <BookHeart className="size-5" />,
      content: t("parameter.preferencesDescription"),
      active: pathname === `/${params}/favorite`,
    },
  ];
};

export const product = (params: string, pathname: string) => {
  const t = useTranslations("navbardashboard");

  return [
    {
      href: `/${params}/product`,
      label: t("product.pin"),
      icon: <Battery className="size-5" />,
      content: t("product.pinDescription"),
      active: pathname === `/${params}/product`,
    },
    {
      href: `/${params}/product1`,
      label: t("product.fan"),
      icon: <Fan className="size-5" />,
      content: t("product.fanDescription"),
      active: pathname === `/${params}/product1`,
    },
    {
      href: `/${params}/product2`,
      label: t("product.pipe"),
      icon: <Droplet className="size-5" />,
      content: t("product.pipeDescription"),
      active: pathname === `/${params}/product2`,
    },
    {
      href: `/${params}/product3`,
      label: t("product.wire"),
      icon: <Cable className="size-5" />,
      content: t("product.wireDescription"),
      active: pathname === `/${params}/product3`,
    },
    {
      href: `/${params}/product4`,
      label: t("product.cuttingStone"),
      icon: <Webhook className="size-5" />,
      content: t("product.cuttingStoneDescription"),
      active: pathname === `/${params}/product4`,
    },
    {
      href: `/${params}/product5`,
      label: t("product.lock"),
      icon: <LockKeyhole className="size-5" />,
      content: t("product.lockDescription"),
      active: pathname === `/${params}/product5`,
    },
    {
      href: `/${params}/product6`,
      label: t("product.glue"),
      icon: <Pipette className="size-5" />,
      content: t("product.glueDescription"),
      active: pathname === `/${params}/product6`,
    },
    {
      href: `/${params}/product7`,
      label: t("product.socket"),
      icon: <PlugZap className="size-5" />,
      content: t("product.socketDescription"),
      active: pathname === `/${params}/product7`,
    },
    {
      href: `/${params}/product8`,
      label: t("product.paint"),
      icon: <PaintRoller className="size-5" />,
      content: t("product.paintDescription"),
      active: pathname === `/${params}/product8`,
    },
    {
      href: `/${params}/product9`,
      label: t("product.bathroomMaterial"),
      icon: <ShowerHead className="size-5" />,
      content: t("product.bathroomMaterialDescription"),
      active: pathname === `/${params}/product9`,
    },
    {
      href: `/${params}/product10`,
      label: t("product.lightBulb"),
      icon: <Lightbulb className="size-5" />,
      content: t("product.lightBulbDescription"),
      active: pathname === `/${params}/product10`,
    },
    {
      href: `/${params}/product11`,
      label: t("product.commonItems"),
      icon: <CircleEllipsis className="size-5" />,
      content: t("product.commonItemsDescription"),
      active: pathname === `/${params}/product11`,
    },
    {
      href: `/${params}/saleproduct`,
      label: t("product.discount"),
      icon: <TicketPercent className="size-5" />,
      content: t("product.discountDescription"),
      active: pathname === `/${params}/saleproduct`,
    },
  ];
};


export const order = (params: string, pathname: string) => {
  const t = useTranslations("navbardashboard");

  return [
    {
      href: `/${params}/orders/order-confirmation`,
      label: t("orderManagement.order"),
      icon: <PackageOpen className="size-5" />,
      content: t("orderManagement.orderDescription"),
      active: pathname === `/${params}/orders/order-confirmation`,
    },
    {
      href: `/${params}/delivery`,
      label: t("orderManagement.delivery"),
      icon: <Truck className="size-5" />,
      content: t("orderManagement.deliveryDescription"),
      active: pathname === `/${params}/delivery`,
    },
  ];
};


export const user = (params: string, pathname: string) => {
  const t = useTranslations("navbardashboard");

  return [
    {
      href: `/${params}/settingusers`,
      label: t("userManagement.user"),
      icon: <UsersRound className="size-5" />,
      content: t("userManagement.userDescription"),
      active: pathname === `/${params}/settingusers`,
    },
    {
      href: `/${params}/managestaff`,
      label: t("userManagement.staff"),
      icon: <UserRound className="size-5" />,
      content: t("userManagement.staffDescription"),
      active: pathname === `/${params}/managestaff`,
    },
  ];
};


export const checkout = (params: string, pathname: string) => {
  const t = useTranslations("navbardashboard");

  return [
    {
      href: `/${params}/coupon`,
      label: t("checkout.discountCode"),
      icon: <TicketPercent className="size-5" />,
      content: t("checkout.discountCodeDescription"),
      active: pathname === `/${params}/coupon`,
    },
    {
      href: `/${params}/taxrate`,
      label: t("checkout.tax"),
      icon: <Receipt className="size-5" />,
      content: t("checkout.taxDescription"),
      active: pathname === `/${params}/taxrate`,
    },
    {
      href: `/${params}/shippingrates`,
      label: t("checkout.shippingFee"),
      icon: <ReceiptText className="size-5" />,
      content: t("checkout.shippingFeeDescription"),
      active: pathname === `/${params}/shippingrates`,
    },
  ];
};


export const setting = (params: string, pathname: string) => {
  const t = useTranslations("navbardashboard");

  return [
    {
      href: `/${params}/settings`,
      label: t("setting.settings"),
      icon: <Settings className="size-5" />,
      content: t("setting.settingsDescription"),
      active: pathname === `/${params}/settings`,
    },
    {
      href: `/${params}/system`,
      label: t("setting.system"),
      icon: <ServerCog className="size-5" />,
      content: t("setting.systemDescription"),
      active: pathname === `/${params}/system`,
    },
  ];
};

export const routeTitle = () => {
  const t = useTranslations("navbardashboard");
  
  return [
    {
      mainicon: (
        <span className="flex items-center 2xl:text-base lg:text-sm">
          <AlignJustify className="size-3 lg:h-5 lg:w-5 2xl:size-4 mr-1" />
          {t("overview")}
        </span>
      ),
      icon: <AlignJustify className="size-5" />,
    },
  ];
};

export const staffTitle = () => {
  const t = useTranslations("navbardashboard");

  return [
    {
      mainicon: (
        <span className="flex items-center 2xl:text-base lg:text-sm">
          <Users className="size-3 lg:h-5 lg:w-5 2xl:size-4 mr-1" />
          {t("employees")}
        </span>
      ),
      icon: <Users className="size-5" />,
    },
  ];
};

export const billboardTitle = () => {
  const t = useTranslations("navbardashboard");

  return [
    {
      mainicon: (
        <span className="flex items-center 2xl:text-base lg:text-sm">
          <Construction className="size-3 lg:h-5 lg:w-5 2xl:size-4 mr-1" />
          {t("billboard")}
        </span>
      ),
      icon: <Construction className="size-5" />,
    },
  ];
};

export const categoryTitle = () => {
  const t = useTranslations("navbardashboard");

  return [
    {
      mainicon: (
        <span className="flex items-center 2xl:text-base lg:text-sm">
          <Layers3 className="size-3 lg:h-5 lg:w-5 2xl:size-4 mr-1" />
          {t("productCategory")}
        </span>
      ),
      icon: <Layers3 className="size-5" />,
    },
  ];
};

export const parameterTitle = () => {
  const t = useTranslations("navbardashboard");

  return [
    {
      mainicon: (
        <span className="flex items-center 2xl:text-base lg:text-sm">
          <AlignEndHorizontal className="size-3 lg:h-5 lg:w-5 2xl:size-4 mr-1" />
          {t("specifications")}
        </span>
      ),
      icon: <AlignEndHorizontal className="size-5" />,
    },
  ];
};

export const productTitle = () => {
  const t = useTranslations("navbardashboard");

  return [
    {
      mainicon: (
        <span className="flex items-center 2xl:text-base lg:text-sm">
          <Package2 className="size-3 lg:h-5 lg:w-5 2xl:size-4 mr-1" />
          {t("products")}
        </span>
      ),
      icon: <Package2 className="size-5" />,
    },
  ];
};

export const orderTitle = () => {
  const t = useTranslations("navbardashboard");

  return [
    {
      mainicon: (
        <span className="flex items-center 2xl:text-base lg:text-sm">
          <Container className="size-3 lg:h-5 lg:w-5 2xl:size-4 mr-1" />
          {t("orders")}
        </span>
      ),
      icon: <Container className="size-5" />,
    },
  ];
};

export const userTitle = () => {
  const t = useTranslations("navbardashboard");

  return [
    {
      mainicon: (
        <span className="flex items-center 2xl:text-base lg:text-sm">
          <Contact className="size-3 lg:h-5 lg:w-5 2xl:size-4 mr-1" />
          {t("users")}
        </span>
      ),
      icon: <Contact className="size-5" />,
    },
  ];
};

export const checkoutTitle = () => {
  const t = useTranslations("navbardashboard");

  return [
    {
      mainicon: (
        <span className="flex items-center 2xl:text-base lg:text-sm">
          <Banknote className="size-3 lg:h-5 lg:w-5 2xl:size-4 mr-1" />
          {t("payments")}
        </span>
      ),
      icon: <Banknote className="size-5" />,
    },
  ];
};

export const settingTitle = () => {
  const t = useTranslations("navbardashboard");

  return [
    {
      mainicon: (
        <span className="flex items-center 2xl:text-base lg:text-sm">
          <Settings2 className="size-3 lg:h-5 lg:w-5 2xl:size-4 mr-1" />
          {t("settings")}
        </span>
      ),
      icon: <Settings2 className="size-5" />,
    },
  ];
};

