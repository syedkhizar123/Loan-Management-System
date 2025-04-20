import { Link } from "react-router"
export default function NotFound() {
    return (
        <>
            <div>
                <h1>Page Not Found</h1>
                <Link to={"/"}>
                <button>Back to Home</button>
                </Link>
            </div>
        </>
    )
}