import { Product } from "@/types/type";

 //PriceSale: Dụa vào select size mà lấy ra price có giảm percentpromotion
 export const getSizePrice = (data:Product, size: string | null) => {
    switch (size) {
      case data?.productdetail?.size5?.value:
        return (
          data?.productdetail?.price5 *
          ((100 - data?.productdetail?.percentpromotion5) / 100)
        );
      case data?.productdetail?.size4?.value:
        return (
          data?.productdetail?.price4 *
          ((100 - data?.productdetail?.percentpromotion4) / 100)
        );
      case data?.productdetail?.size3?.value:
        return (
          data?.productdetail?.price3 *
          ((100 - data?.productdetail?.percentpromotion3) / 100)
        );
      case data?.productdetail?.size2?.value:
        return (
          data?.productdetail?.price2 *
          ((100 - data?.productdetail?.percentpromotion2) / 100)
        );
      default:
        return (
          data?.productdetail?.price1 *
          ((100 - data?.productdetail?.percentpromotion1) / 100)
        );
    }
  };

  //ColorSale: Dụa vào select color mà lấy ra price có giảm percentpromotion
  export const getColorPrice = (data:Product, color: string | null) => {
    switch (color) {
      case data?.productdetail?.color5?.value:
        return (
          data?.productdetail?.price5 *
          ((100 - data?.productdetail?.percentpromotion5) / 100)
        );
      case data?.productdetail?.color4?.value:
        return (
          data?.productdetail?.price4 *
          ((100 - data?.productdetail?.percentpromotion4) / 100)
        );
      case data?.productdetail?.color3?.value:
        return (
          data?.productdetail?.price3 *
          ((100 - data?.productdetail?.percentpromotion3) / 100)
        );
      case data?.productdetail?.color2?.value:
        return (
          data?.productdetail?.price2 *
          ((100 - data?.productdetail?.percentpromotion2) / 100)
        );
      default:
        return (
          data?.productdetail?.price1 *
          ((100 - data?.productdetail?.percentpromotion1) / 100)
        );
    }
  };

  //PriceOle: Đây là dựa vào select size để lấy là price nhưng ko có giảm percentpromotion
  export const getSizeOldPrice = (data:Product, size: string | null) => {
    switch (size) {
      case data?.productdetail?.size5?.value:
        return data?.productdetail?.price5; // Adjust according to your data structure
      case data?.productdetail?.size4?.value:
        return data?.productdetail?.price4; // Adjust according to your data structure
      case data?.productdetail?.size3?.value:
        return data?.productdetail?.price3; // Adjust according to your data structure
      case data?.productdetail?.size2?.value:
        return data?.productdetail?.price2; // Adjust according to your data structure
      default:
        return data?.productdetail?.price1; // Default to the smallest size's old price
    }
  };

  //ColorOle: Đây là dựa vào select color để lấy là price nhưng ko có giảm percentpromotion
  export const getColorOldPrice = (data:Product, color: string | null) => {
    switch (color) {
      case data?.productdetail?.color5?.value:
        return data?.productdetail?.price5; // Adjust according to your data structure
      case data?.productdetail?.color4?.value:
        return data?.productdetail?.price4; // Adjust according to your data structure
      case data?.productdetail?.color3?.value:
        return data?.productdetail?.price3; // Adjust according to your data structure
      case data?.productdetail?.color2?.value:
        return data?.productdetail?.price2; // Adjust according to your data structure
      default:
        return data?.productdetail?.price1; // Default to the smallest color's old price
    }
  };
