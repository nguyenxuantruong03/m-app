import {
  translateAttendanceManagement,
  translateBillboard,
  translateCategoriNavbar,
  translatecheckoutNavbar,
  translateNavbarRoute,
  translateOrderManagement,
  translateParamaterNavbar,
  translateProductNavbar,
  translateSettingsNavbar,
  translateTitleNavbar,
  translateUserManagement,
} from "@/translate/translate-client";
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

export const route = (
  params: string,
  pathname: string,
  languageToUse: string
) => [
  {
    href: `/${params}`,
    label: translateNavbarRoute(languageToUse).overview,
    icon: <Gauge className="size-5" />,
    content: translateNavbarRoute(languageToUse).salesDataOverview,
    active: pathname === `/${params}`,
  },
  {
    href: `/store`,
    label: translateNavbarRoute(languageToUse).stores,
    icon: <Store className="size-5" />,
    content: translateNavbarRoute(languageToUse).storeList,
    active: pathname === `/store`,
  },
  {
    href: `/${params}/feedback`,
    label: translateNavbarRoute(languageToUse).feedback,
    icon: <MessageSquareReply className="size-5" />,
    content: translateNavbarRoute(languageToUse).storeReviews,
    active: pathname === `/${params}/feedback`,
  },
];
export const staff = (
  params: string,
  pathname: string,
  languageToUse: string
) => [
  {
    href: `/${params}/attendancestaff`,
    label: translateAttendanceManagement(languageToUse).employeeattendance,
    icon: <CalendarDays className="size-5" />,
    content: translateAttendanceManagement(languageToUse).automaticpayroll,
    active: pathname === `/${params}/attendancestaff`,
  },
  {
    href: `/${params}/sentmailuser`,
    label: translateAttendanceManagement(languageToUse).sendmail,
    icon: <Mail className="size-5" />,
    content: translateAttendanceManagement(languageToUse).maildescription,
    active: pathname === `/${params}/sentmailuser`,
  },
  {
    href: `/${params}/manageattendance`,
    label: translateAttendanceManagement(languageToUse).attendancecontrol,
    icon: <CalendarRange className="size-5" />,
    content: translateAttendanceManagement(languageToUse).userattendance,
    active: pathname === `/${params}/manageattendance`,
  },
  {
    href: `/${params}/salarystaff`,
    label: translateAttendanceManagement(languageToUse).salarymanagement,
    icon: <Landmark className="size-5" />,
    content: translateAttendanceManagement(languageToUse).attendancepayroll,
    active: pathname === `/${params}/salarystaff`,
  },
  {
    href: `/${params}/wheelSpin`,
    label: translateAttendanceManagement(languageToUse).coinmanagement,
    icon: <HandCoins className="size-5" />,
    content: translateAttendanceManagement(languageToUse).coinmanagementdesc,
    active: pathname === `/${params}/wheelSpin`,
  },
  {
    href: `/${params}/comment`,
    label: translateAttendanceManagement(languageToUse).reviewmanagement,
    icon: <MessageSquareMore className="size-5" />,
    content: translateAttendanceManagement(languageToUse).userreviews,
    active: pathname === `/${params}/comment`,
  },
];
export const billboard = (
  params: string,
  pathname: string,
  languageToUse: string
) => [
  {
    href: `/${params}/billboards`,
    label: translateBillboard(languageToUse).adImage,
    icon: <MessageSquareMore className="size-5" />,
    content: translateBillboard(languageToUse).adImageManagement,
    active: pathname === `/${params}/billboards`,
  },
  {
    href: `/${params}/image-billboards`,
    label: translateBillboard(languageToUse).imageDescription,
    icon: <MessageSquareText className="size-5" />,
    content: translateBillboard(languageToUse).adImageDetails,
    active: pathname === `/${params}/image-billboards`,
  },
];

export const categories = (
  params: string,
  pathname: string,
  languageToUse: string
) => [
  {
    href: `/${params}/categories`,
    label: translateCategoriNavbar(languageToUse).pin,
    icon: <Battery className="size-5" />,
    content: translateCategoriNavbar(languageToUse).pinDescription,
    active: pathname === `/${params}/categories`,
  },
  {
    href: `/${params}/categories1`,
    label: translateCategoriNavbar(languageToUse).fan,
    icon: <Fan className="size-5" />,
    content: translateCategoriNavbar(languageToUse).fanDescription,
    active: pathname === `/${params}/categories1`,
  },
  {
    href: `/${params}/categories2`,
    label: translateCategoriNavbar(languageToUse).plasticPipe,
    icon: <Droplet className="size-5" />,
    content: translateCategoriNavbar(languageToUse).plasticPipeDescription,
    active: pathname === `/${params}/categories2`,
  },
  {
    href: `/${params}/categories3`,
    label: translateCategoriNavbar(languageToUse).electricWire,
    icon: <Cable className="size-5" />,
    content: translateCategoriNavbar(languageToUse).electricWireDescription,
    active: pathname === `/${params}/categories3`,
  },
  {
    href: `/${params}/categories4`,
    label: translateCategoriNavbar(languageToUse).cuttingStone,
    icon: <Webhook className="size-5" />,
    content: translateCategoriNavbar(languageToUse).cuttingStoneDescription,
    active: pathname === `/${params}/categories4`,
  },
  {
    href: `/${params}/categories5`,
    label: translateCategoriNavbar(languageToUse).lock,
    icon: <LockKeyhole className="size-5" />,
    content: translateCategoriNavbar(languageToUse).lockDescription,
    active: pathname === `/${params}/categories5`,
  },
  {
    href: `/${params}/categories6`,
    label: translateCategoriNavbar(languageToUse).glue,
    icon: <Pipette className="size-5" />,
    content: translateCategoriNavbar(languageToUse).glueDescription,
    active: pathname === `/${params}/categories6`,
  },
  {
    href: `/${params}/categories7`,
    label: translateCategoriNavbar(languageToUse).socket,
    icon: <PlugZap className="size-5" />,
    content: translateCategoriNavbar(languageToUse).socketDescription,
    active: pathname === `/${params}/categories7`,
  },
  {
    href: `/${params}/categories8`,
    label: translateCategoriNavbar(languageToUse).paint,
    icon: <PaintRoller className="size-5" />,
    content: translateCategoriNavbar(languageToUse).paintDescription,
    active: pathname === `/${params}/categories8`,
  },
  {
    href: `/${params}/categories9`,
    label: translateCategoriNavbar(languageToUse).bathroomMaterials,
    icon: <ShowerHead className="size-5" />,
    content:
      translateCategoriNavbar(languageToUse).bathroomMaterialsDescription,
    active: pathname === `/${params}/categories9`,
  },
  {
    href: `/${params}/categories10`,
    label: translateCategoriNavbar(languageToUse).lightBulb,
    icon: <Lightbulb className="size-5" />,
    content: translateCategoriNavbar(languageToUse).lightBulbDescription,
    active: pathname === `/${params}/categories10`,
  },
  {
    href: `/${params}/categories11`,
    label: translateCategoriNavbar(languageToUse).dailyUseItems,
    icon: <CircleEllipsis className="size-5" />,
    content: translateCategoriNavbar(languageToUse).dailyUseItemsDescription,
    active: pathname === `/${params}/categories11`,
  },
];

export const parameter = (
  params: string,
  pathname: string,
  languageToUse: string
) => [
  {
    href: `/${params}/size`,
    label: translateParamaterNavbar(languageToUse).size,
    icon: <PencilRuler className="size-5" />,
    content: translateParamaterNavbar(languageToUse).sizeDescription,
    active: pathname === `/${params}/size`,
  },
  {
    href: `/${params}/color`,
    label: translateParamaterNavbar(languageToUse).color,
    icon: <Palette className="size-5" />,
    content: translateParamaterNavbar(languageToUse).colorDescription,
    active: pathname === `/${params}/color`,
  },
  {
    href: `/${params}/productdetail`,
    label: translateParamaterNavbar(languageToUse).productDetails,
    icon: <Boxes className="size-5" />,
    content: translateParamaterNavbar(languageToUse).productDetailsDescription,
    active: pathname === `/${params}/productdetail`,
  },
  {
    href: `/${params}/favorite`,
    label: translateParamaterNavbar(languageToUse).preferences,
    icon: <BookHeart className="size-5" />,
    content: translateParamaterNavbar(languageToUse).preferencesDescription,
    active: pathname === `/${params}/favorite`,
  },
];

export const product = (
  params: string,
  pathname: string,
  languageToUse: string
) => [
  {
    href: `/${params}/product`,
    label: translateProductNavbar(languageToUse).pin,
    icon: <Battery className="size-5" />,
    content: translateProductNavbar(languageToUse).pinDescription,
    active: pathname === `/${params}/product`,
  },
  {
    href: `/${params}/product1`,
    label: translateProductNavbar(languageToUse).fan,
    icon: <Fan className="size-5" />,
    content: translateProductNavbar(languageToUse).fanDescription,
    active: pathname === `/${params}/product1`,
  },
  {
    href: `/${params}/product2`,
    label: translateProductNavbar(languageToUse).pipe,
    icon: <Droplet className="size-5" />,
    content: translateProductNavbar(languageToUse).pipeDescription,
    active: pathname === `/${params}/product2`,
  },
  {
    href: `/${params}/product3`,
    label: translateProductNavbar(languageToUse).wire,
    icon: <Cable className="size-5" />,
    content: translateProductNavbar(languageToUse).wireDescription,
    active: pathname === `/${params}/product3`,
  },
  {
    href: `/${params}/product4`,
    label: translateProductNavbar(languageToUse).cuttingStone,
    icon: <Webhook className="size-5" />,
    content: translateProductNavbar(languageToUse).cuttingStoneDescription,
    active: pathname === `/${params}/product4`,
  },
  {
    href: `/${params}/product5`,
    label: translateProductNavbar(languageToUse).lock,
    icon: <LockKeyhole className="size-5" />,
    content: translateProductNavbar(languageToUse).lockDescription,
    active: pathname === `/${params}/product5`,
  },
  {
    href: `/${params}/product6`,
    label: translateProductNavbar(languageToUse).glue,
    icon: <Pipette className="size-5" />,
    content: translateProductNavbar(languageToUse).glueDescription,
    active: pathname === `/${params}/product6`,
  },
  {
    href: `/${params}/product7`,
    label: translateProductNavbar(languageToUse).socket,
    icon: <PlugZap className="size-5" />,
    content: translateProductNavbar(languageToUse).socketDescription,
    active: pathname === `/${params}/product7`,
  },
  {
    href: `/${params}/product8`,
    label: translateProductNavbar(languageToUse).paint,
    icon: <PaintRoller className="size-5" />,
    content: translateProductNavbar(languageToUse).paintDescription,
    active: pathname === `/${params}/product8`,
  },
  {
    href: `/${params}/product9`,
    label: translateProductNavbar(languageToUse).bathroomMaterial,
    icon: <ShowerHead className="size-5" />,
    content: translateProductNavbar(languageToUse).bathroomMaterialDescription,
    active: pathname === `/${params}/product9`,
  },
  {
    href: `/${params}/product10`,
    label: translateProductNavbar(languageToUse).lightBulb,
    icon: <Lightbulb className="size-5" />,
    content: translateProductNavbar(languageToUse).lightBulbDescription,
    active: pathname === `/${params}/product10`,
  },
  {
    href: `/${params}/product11`,
    label: translateProductNavbar(languageToUse).commonItems,
    icon: <CircleEllipsis className="size-5" />,
    content: translateProductNavbar(languageToUse).commonItemsDescription,
    active: pathname === `/${params}/product11`,
  },
  {
    href: `/${params}/saleproduct`,
    label: translateProductNavbar(languageToUse).discount,
    icon: <TicketPercent className="size-5" />,
    content: translateProductNavbar(languageToUse).discountDescription,
    active: pathname === `/${params}/saleproduct`,
  },
];

export const order = (
  params: string,
  pathname: string,
  languageToUse: string
) => [
  {
    href: `/${params}/orders/order-confirmation`,
    label: translateOrderManagement(languageToUse).order,
    icon: <PackageOpen className="size-5" />,
    content: translateOrderManagement(languageToUse).orderDescription,
    active: pathname === `/${params}/orders/order-confirmation`,
  },
  {
    href: `/${params}/delivery`,
    label: translateOrderManagement(languageToUse).delivery,
    icon: <Truck className="size-5" />,
    content: translateOrderManagement(languageToUse).deliveryDescription,
    active: pathname === `/${params}/delivery`,
  },
];

export const user = (
  params: string,
  pathname: string,
  languageToUse: string
) => [
  {
    href: `/${params}/settingusers`,
    label: translateUserManagement(languageToUse).user,
    icon: <UsersRound className="size-5" />,
    content: translateUserManagement(languageToUse).userDescription,
    active: pathname === `/${params}/settingusers`,
  },
  {
    href: `/${params}/managestaff`,
    label: translateUserManagement(languageToUse).staff,
    icon: <UserRound className="size-5" />,
    content: translateUserManagement(languageToUse).staffDescription,
    active: pathname === `/${params}/managestaff`,
  },
];

export const checkout = (
  params: string,
  pathname: string,
  languageToUse: string
) => [
  {
    href: `/${params}/coupon`,
    label: translatecheckoutNavbar(languageToUse).discountCode,
    icon: <TicketPercent className="size-5" />,
    content: translatecheckoutNavbar(languageToUse).discountCodeDescription,
    active: pathname === `/${params}/coupon`,
  },
  {
    href: `/${params}/taxrate`,
    label: translatecheckoutNavbar(languageToUse).tax,
    icon: <Receipt className="size-5" />,
    content: translatecheckoutNavbar(languageToUse).taxDescription,
    active: pathname === `/${params}/taxrate`,
  },
  {
    href: `/${params}/shippingrates`,
    label: translatecheckoutNavbar(languageToUse).shippingFee,
    icon: <ReceiptText className="size-5" />,
    content: translatecheckoutNavbar(languageToUse).shippingFeeDescription,
    active: pathname === `/${params}/shippingrates`,
  },
];

export const setting = (
  params: string,
  pathname: string,
  languageToUse: string
) => [
  {
    href: `/${params}/settings`,
    label: translateSettingsNavbar(languageToUse).settings,
    icon: <Settings className="size-5" />,
    content: translateSettingsNavbar(languageToUse).settingsDescription,
    active: pathname === `/${params}/settings`,
  },
  {
    href: `/${params}/system`,
    label: translateSettingsNavbar(languageToUse).system,
    icon: <ServerCog className="size-5" />,
    content: translateSettingsNavbar(languageToUse).systemDescription,
    active: pathname === `/${params}/system`,
  },
];

export const routeTitle = (languageToUse: string) => [
  {
    mainicon: (
      <span className="flex items-center 2xl:text-base lg:text-sm">
        <AlignJustify className="size-3 lg:h-5 lg:w-5 2xl:size-4 mr-1" />
        {translateTitleNavbar(languageToUse).overview}
      </span>
    ),
    icon: <AlignJustify className="size-5" />,
  },
];

export const staffTitle = (languageToUse: string) => [
  {
    mainicon: (
      <span className="flex items-center 2xl:text-base lg:text-sm">
        <Users className="size-3 lg:h-5 lg:w-5 2xl:size-4 mr-1" />
        {translateTitleNavbar(languageToUse).employees}
      </span>
    ),
    icon: <Users className="size-5" />,
  },
];

export const billboardTitle = (languageToUse: string) => [
  {
    mainicon: (
      <span className="flex items-center 2xl:text-base lg:text-sm">
        <Construction className="size-3 lg:h-5 lg:w-5 2xl:size-4 mr-1" />
        {translateTitleNavbar(languageToUse).billboard}
      </span>
    ),
    icon: <Construction className="size-5" />,
  },
];

export const categoryTitle = (languageToUse: string) => [
  {
    mainicon: (
      <span className="flex items-center 2xl:text-base lg:text-sm">
        <Layers3 className="size-3 lg:h-5 lg:w-5 2xl:size-4 mr-1" />
        {translateTitleNavbar(languageToUse).productType}
      </span>
    ),
    icon: <Layers3 className="size-5" />,
  },
];

export const parameterTitle = (languageToUse: string) => [
  {
    mainicon: (
      <span className="flex items-center 2xl:text-base lg:text-sm">
        <AlignEndHorizontal className="size-3 lg:h-5 lg:w-5 2xl:size-4 mr-1" />
        {translateTitleNavbar(languageToUse).specs}
      </span>
    ),
    icon: <AlignEndHorizontal className="size-5" />,
  },
];

export const productTitle = (languageToUse: string) => [
  {
    mainicon: (
      <span className="flex items-center 2xl:text-base lg:text-sm">
        <Package2 className="size-3 lg:h-5 lg:w-5 2xl:size-4 mr-1" />
        {translateTitleNavbar(languageToUse).products}
      </span>
    ),
    icon: <Package2 className="size-5" />,
  },
];

export const orderTitle = (languageToUse: string) => [
  {
    mainicon: (
      <span className="flex items-center 2xl:text-base lg:text-sm">
        <Container className="size-3 lg:h-5 lg:w-5 2xl:size-4 mr-1" />
        {translateTitleNavbar(languageToUse).orders}
      </span>
    ),
    icon: <Container className="size-5" />,
  },
];

export const userTitle = (languageToUse: string) => [
  {
    mainicon: (
      <span className="flex items-center 2xl:text-base lg:text-sm">
        <Contact className="size-3 lg:h-5 lg:w-5 2xl:size-4 mr-1" />
        {translateTitleNavbar(languageToUse).users}
      </span>
    ),
    icon: <Contact className="size-5" />,
  },
];

export const checkoutTitle = (languageToUse: string) => [
  {
    mainicon: (
      <span className="flex items-center 2xl:text-base lg:text-sm">
        <Banknote className="size-3 lg:h-5 lg:w-5 2xl:size-4 mr-1" />
        {translateTitleNavbar(languageToUse).payments}
      </span>
    ),
    icon: <Banknote className="size-5" />,
  },
];

export const settingTitle = (languageToUse: string) => [
  {
    mainicon: (
      <span className="flex items-center 2xl:text-base lg:text-sm">
        <Settings2 className="size-3 lg:h-5 lg:w-5 2xl:size-4 mr-1" />
        {translateTitleNavbar(languageToUse).settings}
      </span>
    ),
    icon: <Settings2 className="size-5" />,
  },
];
