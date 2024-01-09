import { Link, Outlet } from "react-router-dom";

export function Home() {
    return (
        <div className="container">
            <div className="text-end border p-2">
                <Link className="mx-2" to="/products">Products</Link>
                <Link to="/cart">Cart</Link>
            </div>
            <div className="p-3 border">
                <Outlet></Outlet>
            </div>
        </div>
    )
}   