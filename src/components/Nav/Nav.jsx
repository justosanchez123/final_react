import { Link } from "react-router-dom";
import { useCartContext } from "../../context/CartContext/useCartContext";
import "./Nav.css";

export const Nav = () => {
    const {getTotalItems} = useCartContext(); 
    return ( <nav>
        <ul>
            <li>
                <Link to={"/"}>Productos</Link>
            </li>
                        
            <li>
                <Link to={"category/productos"}></Link>
            </li>
            <li>
                <Link to={"category/local"}>Nacional</Link>
            </li>
            <li>
                <Link to={"category/extranjero"}>Internacional</Link>
            </li>
            <li>
                <Link to="/cart">Carrito</Link>
                {getTotalItems() > 0 && (
                    <span className="in-cart">{getTotalItems()}</span>
                )}
            </li>
        </ul>
    </nav>
  );
}