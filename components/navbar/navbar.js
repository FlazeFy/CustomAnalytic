import Link from 'next/link'

export default function Navbar(props) {
    function getActive(val, curr){
        if(val == curr){
            return "nav-item active";
        } else {
            return "nav-item";
        }
    }

    return (
        <nav className="navbar navbar-expand-lg w-100">
            <div className="container-fluid">
                <Link href="/">
                    <li className="navbar-brand">Custom Analytic</li>
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <Link href="/dashboard">
                            <li className={getActive(props.active, "dashboard")}>
                                <span className="nav-link" aria-current="page">Dashboard</span>
                            </li>
                        </Link>
                        <Link href="/products">
                            <li className={getActive(props.active, "products")}>
                                <span className="nav-link" href="#">Product</span>
                            </li>
                        </Link>
                        <Link href="/sales">
                            <li className={getActive(props.active, "sales")}>
                                <span className="nav-link" href="#">Sales</span>
                            </li>
                        </Link>
                    </ul>
                </div>
            </div>
        </nav>
    )
}