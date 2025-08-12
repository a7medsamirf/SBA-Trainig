"use client";
import SvgShop from '@/components/icons/svg/shop';
import { useCart } from "@/context/CartContext";
import { Link } from "@/i18n/routing";

export const CartMenuItem = ({ cartCount }: { cartCount: number }) => {
  // const { cartCount } = useCart();

  return (
    <li className="has-children item.submenu Shop">
      <Link href="/cart">
        <SvgShop width={20} />
        {cartCount > 0 && <span className="badge">{cartCount}</span>}
      </Link>
    </li>
  );
};
