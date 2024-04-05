import { CartContext } from "@/lib/cartContext";
import Link from "next/link";
import { useContext } from "react";

const Navbar = () => {
  const { cartItems, toggle, showModal } = useContext(CartContext);
  return (
    <div className="lg:flex justify-between items-center md:block md:w-full px-20 h-[20%] py-3 bg-gray-800">
      <div className="flex items-center justify-between gap-x-8">
        <Link
          href="/"
          className="text-2xl uppercase font-bold mt-10 text-center mb-5 dark:text-white"
        >
          Shopping Store
        </Link>
      </div>

      <div className="flex gap-x-4 mt-4 items-center">
        {!showModal && (
          <button
            className="px-4 py-3 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-200 focus:outline-none focus:bg-gray-700 dark:bg-gray-100 dark:text-black"
            onClick={toggle}
          >
            Cart ({cartItems?.length})
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
