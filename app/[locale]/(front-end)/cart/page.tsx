import "./cart.scss";
import { getCartApi } from "@/shared-apis";
import CartClientWrapperComponent from "./components/CartClientWrapper-component";

const CartPage = async () => {
  const data = await getCartApi(); // Server Side

  return (
    <div className="container my-5 cart-page">
      <CartClientWrapperComponent cartData={data} />
    </div>
  );
};

export default CartPage;
