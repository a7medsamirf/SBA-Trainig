import "./cart.scss";
import { getCartApi } from "@/shared-apis";
import CartClientWrapperComponent from "./components/CartClientWrapper-component";

const CartPage = async () => {
  const data = await getCartApi(); // Server Side

  return (
    <div className="container cart-page my-5">
      <CartClientWrapperComponent cartData={data} />
    </div>
  );
};

export default CartPage;
