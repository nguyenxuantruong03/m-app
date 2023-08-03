"use client"

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
const MainNav = ({className,...props}:React.HTMLAttributes<HTMLElement>) => {
  const pathname = usePathname();
  const params = useParams();
  const [isShown, setIsShown] = useState(false);
  const [isShown1, setIsShown1] = useState(false);
  const [isShown2, setIsShown2] = useState(false);
  const [isShown3, setIsShown3] = useState(false);
  const [isShown4, setIsShown4] = useState(false);
  
  const handleMouseOver = () => {
    setIsShown(true);
  };

  const handleMouseOut = () => {
    setIsShown(false);
  };

  const handleMouseOver1 = () => {
    setIsShown1(true);
  };

  const handleMouseOut1 = () => {
    setIsShown1(false);
  };
  const handleMouseOver2 = () => {
    setIsShown2(true);
  };

  const handleMouseOut2 = () => {
    setIsShown2(false);
  };
  const handleMouseOver3 = () => {
    setIsShown3(true);
  };

  const handleMouseOut3 = () => {
    setIsShown3(false);
  };
  const handleMouseOver4 = () => {
    setIsShown4(true);
  };

  const handleMouseOut4 = () => {
    setIsShown4(false);
  };
  const routes = [
    {
      href: `/${params.storeId}`,
      label: "Tổng quan",
      active: pathname === `/${params.storeId}`,
    },
  ];
  const billboards =[
    {
      href: `/${params.storeId}/billboards`,
      label: "Ảnh quảng cáo",
      active: pathname === `/${params.storeId}/billboards`,
    },
    {
      href: `/${params.storeId}/billboardsmini`,
      label: "Ảnh quảng cáo nhỏ",
      active: pathname === `/${params.storeId}/billboardsmini`,
    },
    {
      href: `/${params.storeId}/billboardssale`,
      label: "Ảnh quảng cáo giảm giá",
      active: pathname === `/${params.storeId}/billboardssale`,
    },
  ]

  const categorys =[
    {
      href: `/${params.storeId}/categories`,
      label: "Phân loại",
      active: pathname === `/${params.storeId}/categories`,
    },
    {
      href: `/${params.storeId}/categories1`,
      label: "Phân loại 1",
      active: pathname === `/${params.storeId}/categories1`,
    },
    {
      href: `/${params.storeId}/categories2`,
      label: "Phân loại 2",
      active: pathname === `/${params.storeId}/categories2`,
    },
    {
      href: `/${params.storeId}/categories3`,
      label: "Phân loại 3",
      active: pathname === `/${params.storeId}/categories3`,
    },
    {
      href: `/${params.storeId}/categories4`,
      label: "Phân loại 4",
      active: pathname === `/${params.storeId}/categories4`,
    },
    {
      href: `/${params.storeId}/categories5`,
      label: "Phân loại 5",
      active: pathname === `/${params.storeId}/categories5`,
    },
    {
      href: `/${params.storeId}/categories6`,
      label: "Phân loại 6",
      active: pathname === `/${params.storeId}/categories6`,
    },
    {
      href: `/${params.storeId}/categories7`,
      label: "Phân loại 7",
      active: pathname === `/${params.storeId}/categories7`,
    },
    {
      href: `/${params.storeId}/categories8`,
      label: "Phân loại 8",
      active: pathname === `/${params.storeId}/categories8`,
    },
    {
      href: `/${params.storeId}/categories9`,
      label: "Phân loại 9",
      active: pathname === `/${params.storeId}/categories9`,
    },
  ]

  const parameters=[
    {
      href: `/${params.storeId}/size`,
      label: "Kích thước",
      active: pathname === `/${params.storeId}/size`,
    },
    {
      href: `/${params.storeId}/color`,
      label: "Màu sắc",
      active: pathname === `/${params.storeId}/color`,
    },
    {
      href: `/${params.storeId}/specifications`,
      label: "Thông số kỹ thuật",
      active: pathname === `/${params.storeId}/specifications`,
    },
    {
      href: `/${params.storeId}/salientfeatures`,
      label: "Tính năng nổi bật",
      active: pathname === `/${params.storeId}/salientfeatures`,
    },
  ]

  const products = [
    {
        href: `/${params.storeId}/product`,
        label: "Sản phẩm",
        active: pathname === `/${params.storeId}/product`,
      },
      {
        href: `/${params.storeId}/product1`,
        label: "Sản phẩm1",
        active: pathname === `/${params.storeId}/product1`,
      },
      {
        href: `/${params.storeId}/product2`,
        label: "Sản phẩm2",
        active: pathname === `/${params.storeId}/product2`,
      },
      {
        href: `/${params.storeId}/product3`,
        label: "Sản phẩm3",
        active: pathname === `/${params.storeId}/product3`,
      },
      {
        href: `/${params.storeId}/product4`,
        label: "Sản phẩm4",
        active: pathname === `/${params.storeId}/product4`,
      },
      {
        href: `/${params.storeId}/product5`,
        label: "Sản phẩm5",
        active: pathname === `/${params.storeId}/product5`,
      },
      {
        href: `/${params.storeId}/product6`,
        label: "Sản phẩm6",
        active: pathname === `/${params.storeId}/product6`,
      },
      {
        href: `/${params.storeId}/product7`,
        label: "Sản phẩm7",
        active: pathname === `/${params.storeId}/product7`,
      },
      {
        href: `/${params.storeId}/product8`,
        label: "Sản phẩm8",
        active: pathname === `/${params.storeId}/product8`,
      },
      {
        href: `/${params.storeId}/product9`,
        label: "Sản phẩm9",
        active: pathname === `/${params.storeId}/product9`,
      },
  ]
  const productmainpages=[
    {
      href: `/${params.storeId}/tivi`,
      label: "Tivi",
      active: pathname === `/${params.storeId}/tivi`,
    },
    {
      href: `/${params.storeId}/watch`,
      label: "Đồng hồ thông minh",
      active: pathname === `/${params.storeId}/watch`,
    },
    {
      href: `/${params.storeId}/headphone`,
      label: "Tai nghe",
      active: pathname === `/${params.storeId}/headphone`,
    },
    {
      href: `/${params.storeId}/ipad`,
      label: "Ipad",
      active: pathname === `/${params.storeId}/ipad`,
    },
    {
      href: `/${params.storeId}/laptop`,
      label: "Laptop",
      active: pathname === `/${params.storeId}/laptop`,
    },
  ]

  const orders= [
    {
      href: `/${params.storeId}/orders`,
      label: "Khác",
      active: pathname === `/${params.storeId}/orders`,
    },
    
  ]
  const settings =[
    {
      href: `/${params.storeId}/settings`,
      label: "Cài đặt",
      active: pathname === `/${params.storeId}/settings`,
    },
  ]
  return (
    <>
    {/* Overview */}
    <nav className={cn("flex items-center space-x-4 lg:space-x-6",className)}>
    {routes.map((route)=>(
<Link
        key={route.href}
        href={route.href}
        className={cn("text-md font-medium transition-colors hover:text-primary",
        route.active ? 'text-black dark:text-white' : 'text-muted-foreground'
        )}
        >
        {route.label}
        </Link>
    ))}
    </nav>
    {/* Billboard */}
    <nav className={cn("flex items-center space-x-4 lg:space-x-6",className)}
    onMouseOver={handleMouseOver} 
    onMouseOut={handleMouseOut}
    >
      <div className="relative cursor-pointer rounded-sm px-2 py-1 hover:bg-slate-200">
      <p className="hover:text-red-500 font-medium">Billboard </p>
      <p >
            <ChevronDown className="absolute left-4 w-12 " />
      </p>
      </div>
    <div className="relative z-30 top-9 right-44">
      {isShown && (
      <div className="
      px-5
      py-5
      grid 
      grid-cols-1
      absolute 
      w-[200px] 
      h-[150px] 
      shadow-xl 
      bg-white 
      rounded-md 
      ">
    {billboards.map((billboard)=>(
        <Link
        key={billboard.href}
        href={billboard.href}
        className={cn("text-sm font-medium transition-colors hover:text-primary",
        billboard.active ? 'text-black dark:text-white' : 'text-muted-foreground'
        )}
        >
        {billboard.label}
        </Link>
    ))}
      </div>
      )}
    </div>

    </nav>
    {/* Category */}
    <nav className={cn("flex items-center space-x-4 lg:space-x-6",className)}
    onMouseOver={handleMouseOver1} 
    onMouseOut={handleMouseOut1}
    >
      <div className="relative cursor-pointer rounded-sm px-2 py-1 hover:bg-slate-200">
      <p className="hover:text-red-500 font-medium">Category </p>
      <p >
            <ChevronDown className="absolute left-4 w-12 " />
      </p>
      </div>
    <div className="relative z-30 top-9 right-44">
      {isShown1 && (
      <div className="
      px-5
      py-5
      grid 
      grid-cols-1
      absolute 
      w-[200px] 
      h-[370px] 
      shadow-xl 
      bg-white 
      rounded-md 
      ">
    {categorys.map((category)=>(
        <Link
        key={category.href}
        href={category.href}
        className={cn("text-sm font-medium transition-colors hover:text-primary",
        category.active ? 'text-black dark:text-white' : 'text-muted-foreground'
        )}
        >
        {category.label}
        </Link>
    ))}
      </div>
      )}
    </div>

    </nav>
    {/* Parameter */}
    <nav className={cn("flex items-center space-x-4 lg:space-x-6",className)}
    onMouseOver={handleMouseOver2} 
    onMouseOut={handleMouseOut2}
    >
      <div className="relative cursor-pointer rounded-sm px-2 py-1 hover:bg-slate-200">
      <p className="hover:text-red-500 font-medium">Parameter </p>
      <p >
            <ChevronDown className="absolute left-5 w-12 " />
      </p>
      </div>
    <div className="relative z-30 top-9 right-44">
      {isShown2 && (
      <div className="
      px-5
      py-5
      grid 
      grid-cols-1
      absolute 
      w-[200px] 
      h-[150px] 
      shadow-xl 
      bg-white 
      rounded-md 
      ">
    {parameters.map((parameter)=>(
        <Link
        key={parameter.href}
        href={parameter.href}
        className={cn("text-sm font-medium transition-colors hover:text-primary",
        parameter.active ? 'text-black dark:text-white' : 'text-muted-foreground'
        )}
        >
        {parameter.label}
        </Link>
    ))}
      </div>
      )}
    </div>

    </nav>
    {/* Product */}
    <nav className={cn("flex items-center space-x-4 lg:space-x-6",className)}
    onMouseOver={handleMouseOver3} 
    onMouseOut={handleMouseOut3}
    >
      <div className="relative cursor-pointer rounded-sm px-2 py-1 hover:bg-slate-200">
      <p className="hover:text-red-500 font-medium">Product </p>
      <p >
            <ChevronDown className="absolute left-4 w-12 " />
      </p>
      </div>
    <div className="relative z-30 top-9 right-40">
      {isShown3 && (
      <div className="
      px-5
      py-5
      grid 
      grid-cols-1
      absolute 
      w-[200px] 
      h-[370px] 
      shadow-xl 
      bg-white 
      rounded-md 
      ">
    {products.map((product)=>(
        <Link
        key={product.href}
        href={product.href}
        className={cn("text-sm font-medium transition-colors hover:text-primary",
        product.active ? 'text-black dark:text-white' : 'text-muted-foreground'
        )}
        >
        {product.label}
        </Link>
    ))}
      </div>
      )}
    </div>

    </nav>
    {/* Product main page */}
    <nav className={cn("flex items-center space-x-4 lg:space-x-6",className)}
    onMouseOver={handleMouseOver4} 
    onMouseOut={handleMouseOut4}
    >
      <div className="relative cursor-pointer rounded-sm px-2 py-1 hover:bg-slate-200">
      <p className="hover:text-red-500 font-medium">Product Main Page </p>
      <p >
            <ChevronDown className="absolute left-14 w-12 " />
      </p>
      </div>
    <div className="relative z-30 top-9 right-48">
      {isShown4 && (
      <div className="
      px-5
      py-5
      grid 
      grid-cols-1
      absolute 
      w-[200px] 
      h-[170px] 
      shadow-xl 
      bg-white 
      rounded-md 
      ">
    {productmainpages.map((productmainpage)=>(
        <Link
        key={productmainpage.href}
        href={productmainpage.href}
        className={cn("text-sm font-medium transition-colors hover:text-primary",
        productmainpage.active ? 'text-black dark:text-white' : 'text-muted-foreground'
        )}
        >
        {productmainpage.label}
        </Link>
    ))}
      </div>
      )}
    </div>

    </nav>
    {/* Order */}
    <nav className={cn("flex items-center space-x-4 lg:space-x-6",className)}>
    {orders.map((order)=>(
<Link
        key={order.href}
        href={order.href}
        className={cn("text-md font-medium transition-colors hover:text-primary",
        order.active ? 'text-black dark:text-white' : 'text-muted-foreground'
        )}
        >
        {order.label}
        </Link>
    ))}
    </nav>
     {/* Setting */}
    <nav className={cn("flex items-center space-x-4 lg:space-x-6",className)}>
     {settings.map((setting)=>(
 <Link
         key={setting.href}
         href={setting.href}
         className={cn("text-md font-medium transition-colors hover:text-primary",
         setting.active ? 'text-black dark:text-white' : 'text-muted-foreground'
         )}
         >
         {setting.label}
         </Link>
     ))}
    </nav>
    </>
  )
};

export default MainNav;
