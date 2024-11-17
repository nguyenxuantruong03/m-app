"use client"
import { useState, useEffect } from 'react';
import Container from "@/components/ui/container";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const PaymentSuccess = () => {
    const router = useRouter();
    const [countdown, setCountdown] = useState(120);
  
    useEffect(() => {
      const interval = setInterval(() => {
        // Check if countdown is greater than 0 before decrementing
        setCountdown(prevCountdown => (prevCountdown > 0 ? prevCountdown - 1 : 0));
      }, 1000);
  
      // Redirect to /home when countdown reaches 0
      if (countdown === 0) {
        router.push('/cart');
      }
  
      // Clear interval when the component is unmounted
      return () => clearInterval(interval);
    }, [countdown, router]);
  
    return (
      <Container>
        <div className="mt-32 py-4">
          <div className="flex items-center justify-center">
            <Image
              src="/images/check-payment-fail.png"
              alt="Error"
              width="100"
              height="100"
            />
          </div>
          <div className="text-center text-lg mt-3 text-slate-200 dark:text-slate-200">
            Đơn hàng của bạn đã thanh toán không thành công. <br />
            Quý khách vui lòng <span className="text-red-600 font-semibold">KIỂM TRA</span> quá trình thanh toán trước khi tắt trình duyệt.
          </div>
          <div className="text-red-800 dark:text-red-700 mt-10">
            <p className="text-center text-lg font-semibold">
              Trở lại trang thanh toán trong {countdown} giây <br />
              Xin vui lòng chờ trong giây lát...
            </p>
          </div>
          <Link href="/home-product" className="mt-4 flex items-center justify-center hover:underline cursor-pointer text-slate-900 dark:text-slate-200">  Trở về trang chủ 🏠</Link>
        </div>
      </Container>
    );
  };
  
  export default PaymentSuccess;
