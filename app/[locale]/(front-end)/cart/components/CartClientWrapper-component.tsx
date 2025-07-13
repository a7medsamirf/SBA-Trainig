"use client";

import React, { useState } from "react";
import CartIndexComponent from "./CartIndex-component";
import { removeFromCartApi } from "@/server-actions";
import { toast } from "react-hot-toast";
import { CartDetailResponse } from "@/models";

interface Props {
  cartData: CartDetailResponse["data"];
}

const CartClientWrapperComponent = ({ cartData }: Props) => {
  const [cartState, setCartState] = useState(cartData);

  const handleRemove = async (courseId: number) => {
    try {
      const res = await removeFromCartApi(courseId);
      if (res?.status === 200) {
        setCartState((prev) => ({
          ...prev,
          carts: prev.carts.filter((x) => x.course.id !== courseId),
        }));
        toast.success("تمت إزالة الدورة من السلة");
      } else {
        toast.error(res?.message || "حدث خطأ");
      }
    } catch {
      toast.error("حدث خطأ أثناء الاتصال بالخادم");
    }
  };

  return (
    <CartIndexComponent
      cartData={cartState}
      onRemoveFromCart={handleRemove}
    />
  );
};

export default CartClientWrapperComponent;
