import { Conversation, Message } from "@prisma/client";

export interface Store {
  name: string;
}

export interface Billboard {
  id: string;
  label: string;
  description: string;
  imagebillboard: ImageBillboard[];
}

export interface ImageBillboard {
  id: string;
  url: string;
  label: string;
  link: string | null;
  description: string;
}

export interface CartItemType {
  id: string;
  warranty: number;
  quantity: number;
  size: string;
  color: string;
  user: User;
  product: Product;
}

export enum CategoryType {
  CATEGORY,
  CATEGORY1,
  CATEGORY2,
  CATEGORY3,
  CATEGORY4,
  CATEGORY5,
  CATEGORY6,
  CATEGORY7,
  CATEGORY8,
  CATEGORY9,
  CATEGORY10,
  CATEGORY11,
}

export type Category = {
  id: string;
  storeId: string;
  categoryType: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Categories = {
  categories: Category[];
  categories1: Category[];
  categories2: Category[];
  categories3: Category[];
  categories4: Category[];
  categories5: Category[];
  categories6: Category[];
  categories7: Category[];
  categories8: Category[];
  categories9: Category[];
  categories10: Category[];
  categories11: Category[];
};

export enum ProductType {
  PRODUCT = "PRODUCT",
  PRODUCT1 = "PRODUCT1",
  PRODUCT2 = "PRODUCT2",
  PRODUCT3 = "PRODUCT3",
  PRODUCT4 = "PRODUCT4",
  PRODUCT5 = "PRODUCT5",
  PRODUCT6 = "PRODUCT6",
  PRODUCT7 = "PRODUCT7",
  PRODUCT8 = "PRODUCT8",
  PRODUCT9 = "PRODUCT9",
  PRODUCT10 = "PRODUCT10",
  PRODUCT11 = "PRODUCT11",
}
export type ProductDetail = {
  id: string;
  storeId: string;
  store: Store;
  product: Product[];
  title: string;
  name1: string;
  name2: string;
  name3: string;
  name4: string;
  name5: string;
  price1: number;
  price2: number;
  price3: number;
  price4: number;
  price5: number;
  percentpromotion1: number;
  percentpromotion2: number;
  percentpromotion3: number;
  percentpromotion4: number;
  percentpromotion5: number;
  quantity1: number;
  quantity2: number;
  quantity3: number;
  quantity4: number;
  quantity5: number;
  // Khuyến mãi
  promotionheading: string;
  promotiondescription: string;
  //Bảo hành
  warranty1: number;
  warranty2: number;
  warranty3: number;
  warranty4: number;

  // Tính năng nổi bật
  descriptionsalientfeatures: string;
  description2salientfeatures: string;
  description3salientfeatures: string;
  description4salientfeatures: string;
  contentsalientfeatures: string;

  //Chi tiết sản phẩm
  descriptionspecifications: string;
  valuespecifications: string;
  description2specifications: string;
  value2specifications: string;
  description3specifications: string;
  value3specifications: string;
  description4specifications: string;
  value4specifications: string;
  description5specifications: string;
  value5specifications: string;
  description6specifications: string;
  value6specifications: string;
  description7specifications: string;
  value7specifications: string;
  description8specifications: string;
  value8specifications: string;
  description9specifications: string;
  value9specifications: string;
  description10specifications: string;
  value10specifications: string;
  description11specifications: string;
  value11specifications: string;
  description12specifications: string;
  value12specifications: string;
  description13specifications: string;
  value13specifications: string;
  description14specifications: string;
  value14specifications: string;
  categoryId: string;
  category: Category;
  size1Id: string;
  size1: Size;
  size2Id: string;
  size2: Size;
  size3Id: string;
  size3: Size;
  size4Id: string;
  size4: Size;
  size5Id: string;
  size5: Size;
  color1Id: string;
  color1: Color;
  color2Id: string;
  color2: Color;
  color3Id: string;
  color3: Color;
  color4Id: string;
  color4: Color;
  color5Id: string;
  color5: Color;
};

export interface Comment {
  rating: number;
  comment: string;
  productId: string;
  product: any;
  id?: string;
  responses?: ResponseComment[];
  createdAt?: Date;
  user?: any;
  changeReview?: boolean;
  totalchange?: number | undefined;
}

export interface ResponseComment {
  id?: string;
  commentId: string;
  description: string;
  changeReview?: boolean;
  totalchange?: number | undefined;
  user?: any;
  createdAt?: Date;
}

export interface Product {
  id: string;
  storeId: string;
  store: Store;
  productType: ProductType;
  name: string;
  heading: string;
  description: string;
  sold: number;
  isFeatured: Boolean;
  isArchived: Boolean;
  images: Image[];
  imagesalientfeatures: Imagesalientfeaturesproduct[];
  comment?: Comment[]
  responsecomment?: ResponseComment[]
  cartItem: CartItemType;
  productdetailId: string;
  quantity?: number;
  isSale?: boolean;
  timeSaleStart?: Date;
  timeSaleEnd?: Date;
  productdetail: ProductDetail;
}

export interface ProductCartLocal {
  id: string;
  storeId: string;
  store: Store;
  productType: ProductType; // Add this field to distinguish product type (Product1 or Product2)
  name: string;
  heading: string;
  description: string;
  sold: number;
  isFeatured: Boolean;
  warranty: string;
  isArchived: Boolean;
  images: Image[];
  cartId: string;
  imagesalientfeatures: Imagesalientfeaturesproduct[];
  cartItem: CartItemType;
  productdetailId: string;
  quantity?: number;
  productdetail: ProductDetail;
  size: string;
  color: string;
}

export interface FavoriteProduct {
  id: string;
  productId: string;
  product: Product;
  productName: string;
  comment?: Comment[];
  userId: string;
  selectedColor: string;
  selectedSize: string;
}

export interface Order {
  id: string;
  orderItem: OrderItem[];
  shipper: User;
  phone: string;
  address: string;
  adressOther: string;
  status: string;
  name: string;
  note: string;
  userId: string;
  gender: string;
  deliveryMethod: string;
  email: string;
  isPaid: boolean;
  returnProduct: boolean;
  locationLatEnd?: number;
  locationLngEnd?: number;
  updatedAt: Date;
  createdAt: Date;
}

export interface OrderItem {
  id: string;
  pricesales: number;
  product?: Product
  size?: string;
  color?: string;
  quantity?: string;
  warranty?: string
  isGift: boolean;
  createdAt: Date;
}

export interface Size {
  id: string;
  name: string;
  value: string;
}
export interface Color {
  id: string;
  name: string;
  value: string;
}
export interface Image {
  id: string;
  url: string;
}

export interface Imagesalientfeaturesproduct {
  id: string;
  url: string;
}

export interface ImageCredential {
  id: string;
  url: string;
}

export interface User {
  id: string;
  imageCredential: ImageCredential[];
  image: string;
  name: string;
  email: string;
  phonenumber: string;
  nameuser: string;
  isSharingLocation?: boolean;
  locationLat?: number;
  locationLng?: number;
}
export interface Emoji {
  id: string;
  commentId: string;
  userId: string;
  productId: string;
  emoji: string;
  emojilengthLove: number;
  emojilengthHaha: number;
  emojilengthWow: number;
  emojilengthAngry: number;
  emojilengthLike: number;
  createdAt: Date;
  updatedAt: Date;
  user: User;
}

export interface Provinces {
  value: string;
  label: string;
}

export interface Coupon {
  id: string;
  name: string
  percent: number;
  redeemby: Date;
  description: string;
  maxredemptions: number;
  imagecoupon : ImageCoupon[]
}

//Message 
export type FullMessageType = Message & {
  sender: User, 
  seen: User[]
};

export type FullConversationType = Conversation & { 
  users: User[]; 
  messages: FullMessageType[]
};

export interface ImageCoupon {
  id: string;
  url: string;
}

export interface Leaderboard {
  id:string; 
  score: number
  user: User
}

export type ChatMessage = {
  type: "user" | "bot";
  message: string;
  timestamp: string;
};


//-------------------------Pacman---------------------------
export type Character = {
  velocity: number;
  size: number;
  border: number;
  topScoreBoard: number;
  color: string;
  name: string;
};

export enum COLOR {
  PACMAN_DEAD = "white",
  GHOST_DEAD = "white",
  RED = "red",
  BLUE = "blue",
  ORANGE = "orange",
  GREEN = "green",
}

export enum DIFFICULTY {
  EASY = "easy",
  MEDIUM = "medium",
  ADVANCED = "advanced",
}

export type Difficulty =
  | DIFFICULTY.EASY
  | DIFFICULTY.MEDIUM
  | DIFFICULTY.ADVANCED;

export enum DIRECTION {
  LEFT = "left",
  RIGHT = "right",
  UP = "up",
  DOWN = "down",
}

export type Direction =
  | DIRECTION.LEFT
  | DIRECTION.RIGHT
  | DIRECTION.UP
  | DIRECTION.DOWN;

export enum ARROW {
  LEFT = 37,
  RIGHT = 39,
  UP = 38,
  DOWN = 40,
}

export enum GAME_STATUS {
  IN_PROGRESS = "in_progress",
  PAUSED = "paused",
  LOST = "lost",
  WON = "won",
}

export type GameStatus =
  | GAME_STATUS.IN_PROGRESS
  | GAME_STATUS.LOST
  | GAME_STATUS.WON
  | GAME_STATUS.PAUSED;

export type Position = {
  top: number;
  left: number;
};

export const ghostStartPosition: Position = {
  top: 300,
  left: 300,
};

export const pacmanStartPosition: Position = {
  top: 0,
  left: 0,
};
