import {
  AppWindow,
  AppWindowMac,
  AreaChart,
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
  LineChart,
  Users,
  Construction,
  Layers3,
  AlignEndHorizontal,
  Package2,
  Container,
  Contact,
  Banknote,
  Settings2,
} from "lucide-react";

export const route = (params: string, pathname: string) => [
  {
    href: `/${params}`,
    label: "Tổng quan",
    icon: <Gauge className="size-5" />,
    content: "Tổng quan dữ liệu dữ liệu bán hàng.",
    active: pathname === `/${params}`,
  },
];
export const datastatistic = (params: string, pathname: string) => [
  {
    href: `/${params}/datastatistics`,
    label: "Thống kê dữ liệu",
    icon: <AreaChart className="size-5" />,
    content: "Tổng quan dữ liệu trang bán hàng.",
    active: pathname === `/${params}/datastatistics`,
  },
];
export const staff = (params: string, pathname: string) => [
  {
    href: `/${params}/attendancestaff`,
    label: "Nhân viên điểm danh",
    icon: <CalendarDays className="size-5" />,
    content: "Nhân viên điểm danh tự động nhận lương",
    active: pathname === `/${params}/attendancestaff`,
  },
  {
    href: `/${params}/sentmailuser`,
    label: "Gửi Mail",
    icon: <Mail className="size-5" />,
    content: "Người đến người dùng hoặc cộng đồng.",
    active: pathname === `/${params}/sentmailuser`,
  },
  {
    href: `/${params}/manageattendance`,
    label: "Quản lý điểm danh",
    icon: <CalendarRange className="size-5" />,
    content: "Quản lý dữ liệu điểm danh người dùng",
    active: pathname === `/${params}/manageattendance`,
  },
  {
    href: `/${params}/salarystaff`,
    label: "Quản lý lương nhân viên",
    icon: <Landmark className="size-5" />,
    content: "Quản lý lương nhân viên khi điểm danh.",
    active: pathname === `/${params}/salarystaff`,
  },
  {
    href: `/${params}/wheelSpin`,
    label: "Quản lý xu, vòng quay",
    icon: <HandCoins className="size-5" />,
    content: "Quản lý xu, vòng quay cho người dùng.",
    active: pathname === `/${params}/wheelSpin`,
  },
  {
    href: `/${params}/comment`,
    label: "Quản lý đánh giá",
    icon: <MessageSquareMore className="size-5" />,
    content: "Quản lý đánh giá của người dùng.",
    active: pathname === `/${params}/comment`,
  },
];
export const billboard = (params: string, pathname: string) => [
  {
    href: `/${params}/billboards`,
    label: "Ảnh quảng cáo",
    icon: <AppWindowMac className="size-5" />,
    content: "Quản lý ảnh quảng cáo trên trang bán hàng.",
    active: pathname === `/${params}/billboards`,
  },
  {
    href: `/${params}/billboardstime`,
    label: "Thời gian hiển thị",
    icon: <AppWindow className="size-5" />,
    content: "Quản lý thời gian hiển thị ảnh quảng cáo.",
    active: pathname === `/${params}/billboardstime`,
  },
];

export const categories = (params: string, pathname: string) => [
  {
    href: `/${params}/categories`,
    label: "Pin",
    icon: <Battery className="size-5" />,
    content: "Pin cho các thiết bị điện tử.",
    active: pathname === `/${params}/categories`,
  },
  {
    href: `/${params}/categories1`,
    label: "Quạt",
    icon: <Fan className="size-5" />,
    content: "Loại Quạt đa dụng.",
    active: pathname === `/${params}/categories1`,
  },
  {
    href: `/${params}/categories2`,
    label: "Ống nhựa , Ống lưới xanh",
    icon: <Droplet className="size-5" />,
    content: "Loại Ống nhựa , Ống lưới xanh đa dụng.",
    active: pathname === `/${params}/categories2`,
  },
  {
    href: `/${params}/categories3`,
    label: "Dây điện",
    icon: <Cable className="size-5" />,
    content: "Loại Dây điện đa dụng.",
    active: pathname === `/${params}/categories3`,
  },
  {
    href: `/${params}/categories4`,
    label: "Đá cắt",
    icon: <Webhook className="size-5" />,
    content: "Loại Đá cắt đa dụng.",
    active: pathname === `/${params}/categories4`,
  },
  {
    href: `/${params}/categories5`,
    label: "Ổ khóa",
    icon: <LockKeyhole className="size-5" />,
    content: "Loại Ổ khóa đa dụng.",
    active: pathname === `/${params}/categories5`,
  },
  {
    href: `/${params}/categories6`,
    label: "Keo",
    icon: <Pipette className="size-5" />,
    content: "Loại Keo đa dụng.",
    active: pathname === `/${params}/categories6`,
  },
  {
    href: `/${params}/categories7`,
    label: "Ổ cắm, mặt ổ cắm",
    icon: <PlugZap className="size-5" />,
    content: "Loại Ổ cắm, mặt ổ cắm đa dụng.",
    active: pathname === `/${params}/categories7`,
  },
  {
    href: `/${params}/categories8`,
    label: "Sơn",
    icon: <PaintRoller className="size-5" />,
    content: "Loại Sơn đa dụng.",
    active: pathname === `/${params}/categories8`,
  },
  {
    href: `/${params}/categories9`,
    label: "Vật liệu nhà tắm",
    icon: <ShowerHead className="size-5" />,
    content: "Loại Vật liệu nhà tắm đa dụng.",
    active: pathname === `/${params}/categories9`,
  },
  {
    href: `/${params}/categories10`,
    label: "Bóng đèn",
    icon: <Lightbulb className="size-5" />,
    content: "Loại Bóng đèn đa dụng.",
    active: pathname === `/${params}/categories10`,
  },
  {
    href: `/${params}/categories11`,
    label: "Đồ thường dùng",
    icon: <CircleEllipsis className="size-5" />,
    content: "Loại Đồ thường dùng đa dụng.",
    active: pathname === `/${params}/categories11`,
  },
];

export const parameter = (params: string, pathname: string) => [
  {
    href: `/${params}/size`,
    label: "Kích thước",
    icon: <PencilRuler className="size-5" />,
    content: "Kích thước sản phẩm.",
    active: pathname === `/${params}/size`,
  },
  {
    href: `/${params}/color`,
    label: "Màu sắc",
    icon: <Palette className="size-5" />,
    content: "Màu sắc sản phẩm.",
    active: pathname === `/${params}/color`,
  },
  {
    href: `/${params}/productdetail`,
    label: "Chi tiết sản phẩm",
    icon: <Boxes className="size-5" />,
    content: "Chi tiết sản phẩm.",
    active: pathname === `/${params}/productdetail`,
  },
];

export const product = (params: string, pathname: string) => [
  {
    href: `/${params}/product`,
    label: "Pin",
    icon: <Battery className="size-5" />,
    content: "Sản phẩm Pin.",
    active: pathname === `/${params}/product`,
  },
  {
    href: `/${params}/product1`,
    label: "Quạt",
    icon: <Fan className="size-5" />,
    content: "Sản phẩm Quạt.",
    active: pathname === `/${params}/product1`,
  },
  {
    href: `/${params}/product2`,
    label: "Ống nhựa, Ống lưới xanh",
    icon: <Droplet className="size-5" />,
    content: "Sản phẩm Ống nhựa, Ống lưới xanh.",
    active: pathname === `/${params}/product2`,
  },
  {
    href: `/${params}/product3`,
    label: "Dây điện",
    icon: <Cable className="size-5" />,
    content: "Sản phẩm Dây điện.",
    active: pathname === `/${params}/product3`,
  },
  {
    href: `/${params}/product4`,
    label: "Đá cắt",
    icon: <Webhook className="size-5" />,
    content: "Sản phẩm Đá cắt.",
    active: pathname === `/${params}/product4`,
  },
  {
    href: `/${params}/product5`,
    label: "Ổ khóa",
    icon: <LockKeyhole className="size-5" />,
    content: "Sản phẩm Ổ khóa.",
    active: pathname === `/${params}/product5`,
  },
  {
    href: `/${params}/product6`,
    label: "Keo",
    icon: <Pipette className="size-5" />,
    content: "Sản phẩm Keo.",
    active: pathname === `/${params}/product6`,
  },
  {
    href: `/${params}/product7`,
    label: "Ổ cắm, mặt ổ cắm",
    icon: <PlugZap className="size-5" />,
    content: "Sản phẩm Ổ cắm, mặt ổ cắm.",
    active: pathname === `/${params}/product7`,
  },
  {
    href: `/${params}/product8`,
    label: "Sơn",
    icon: <PaintRoller className="size-5" />,
    content: "Sản phẩm Sơn.",
    active: pathname === `/${params}/product8`,
  },
  {
    href: `/${params}/product9`,
    label: "Vật liệu nhà tắm",
    icon: <ShowerHead className="size-5" />,
    content: "Sản phẩm Vật liệu nhà tắm.",
    active: pathname === `/${params}/product9`,
  },
  {
    href: `/${params}/product10`,
    label: "Bóng đèn",
    icon: <Lightbulb className="size-5" />,
    content: "Sản phẩm Bóng đèn.",
    active: pathname === `/${params}/product10`,
  },
  {
    href: `/${params}/product11`,
    label: "Đồ thường dùng",
    icon: <CircleEllipsis className="size-5" />,
    content: "Sản phẩm Đồ thường dùng.",
    active: pathname === `/${params}/product11`,
  },
];

export const order = (params: string, pathname: string) => [
  {
    href: `/${params}/orders`,
    label: "Đơn hàng",
    icon: <PackageOpen className="size-5" />,
    content: "Quản lý đơn hàng của người dùng đặt hàng.",
    active: pathname === `/${params}/orders`,
  },
];

export const user = (params: string, pathname: string) => [
  {
    href: `/${params}/settingusers`,
    label: "Người dùng",
    icon: <UsersRound className="size-5" />,
    content: "Người dùng đăng nhập.",
    active: pathname === `/${params}/settingusers`,
  },
  {
    href: `/${params}/managestaff`,
    label: "Nhân viên",
    icon: <UserRound className="size-5" />,
    content: "Tài khoản nhân viên quản lý cửa hàng.",
    active: pathname === `/${params}/managestaff`,
  },
];

export const checkout = (params: string, pathname: string) => [
  {
    href: `/${params}/coupon`,
    label: "Mã giảm giá",
    icon: <TicketPercent className="size-5" />,
    content: "Mã giảm giá cho người dùng.",
    active: pathname === `/${params}/coupon`,
  },
  {
    href: `/${params}/taxrate`,
    label: "Thuế",
    icon: <Receipt className="size-5" />,
    content: "Thuế cho người dùng.",
    active: pathname === `/${params}/taxrate`,
  },
  {
    href: `/${params}/shippingrates`,
    label: "Phí giao hàng",
    icon: <ReceiptText className="size-5" />,
    content: "Phí giao hàng cho người dùng.",
    active: pathname === `/${params}/shippingrates`,
  },
];

export const setting = (params: string, pathname: string) => [
  {
    href: `/${params}/settings`,
    label: "Cài đặt",
    icon: <Settings className="size-5" />,
    content: "Cài đặt cửa hàng.",
    active: pathname === `/${params}/settings`,
  },
  {
    href: `/${params}/system`,
    label: "Hệ thống",
    icon: <ServerCog className="size-5" />,
    content: "Hê thống người dùng.",
    active: pathname === `/${params}/system`,
  },
];

export const routeTitle = [
  {
    mainicon: (
      <span className="flex items-center 2xl:text-base lg:text-sm">
        <AlignJustify className="size-3 lg:h-5 lg:w-5 2xl:size-4 mr-1" />
        Tổng quan
      </span>
    ),
  },
];

export const datastatisticTitle = [
  {
    mainicon: (
      <span className="flex items-center 2xl:text-base lg:text-sm">
        <LineChart className="size-3 lg:h-5 lg:w-5 2xl:size-4 mr-1" />
        Thống kê
      </span>
    ),
  },
];

export const staffTitle = [
  {
    mainicon: (
      <span className="flex items-center 2xl:text-base lg:text-sm">
        <Users className="size-3 lg:h-5 lg:w-5 2xl:size-4 mr-1" />
        Nhân viên{" "}
      </span>
    ),
  },
];

export const billboardTitle = [
  {
    mainicon: (
      <span className="flex items-center 2xl:text-base lg:text-sm">
        <Construction className="size-3 lg:h-5 lg:w-5 2xl:size-4 mr-1" />
        Quảng cáo
      </span>
    ),
  },
];

export const categoryTitle = [
  {
    mainicon: (
      <span className="flex items-center 2xl:text-base lg:text-sm">
        <Layers3 className="size-3 lg:h-5 lg:w-5 2xl:size-4 mr-1" />
        Danh mục
      </span>
    ),
  },
];

export const parameterTitle = [
  {
    mainicon: (
      <span className="flex items-center 2xl:text-base lg:text-sm">
        <AlignEndHorizontal className="size-3 lg:h-5 lg:w-5 2xl:size-4 mr-1" />
        Tham số
      </span>
    ),
  },
];

export const productTitle = [
  {
    mainicon: (
      <span className="flex items-center 2xl:text-base lg:text-sm">
        <Package2 className="size-3 lg:h-5 lg:w-5 2xl:size-4 mr-1" />
        Sản phẩm
      </span>
    ),
  },
];

export const orderTitle = [
  {
    mainicon: (
      <span className="flex items-center 2xl:text-base lg:text-sm">
        <Container className="size-3 lg:h-5 lg:w-5 2xl:size-4 mr-1" />
        Đơn hàng
      </span>
    ),
  },
];

export const userTitle = [
  {
    mainicon: (
      <span className="flex items-center 2xl:text-base lg:text-sm">
        <Contact className="size-3 lg:h-5 lg:w-5 2xl:size-4 mr-1" />
        Người dùng
      </span>
    ),
  },
];

export const checkoutTitle = [
  {
    mainicon: (
      <span className="flex items-center 2xl:text-base lg:text-sm">
        <Banknote className="size-3 lg:h-5 lg:w-5 2xl:size-4 mr-1" />
        Thanh toán
      </span>
    ),
  },
];

export const settingTitle = [
  {
    mainicon: (
      <span className="flex items-center 2xl:text-base lg:text-sm">
        <Settings2 className="size-3 lg:h-5 lg:w-5 2xl:size-4 mr-1" />
        Cài đặt
      </span>
    ),
  },
];
