import Navbar from "./Navbar";
import { useTheme } from "../../../contexts/theme";

const Layout = ({ children }) => {
    const { theme } = useTheme();

    return (
        <div className="bg-amber-100 min-h-screen">
            <Navbar className="sticky top-0 z-50" />
            <main>{children}</main>
        </div>
    );
};

export default Layout;