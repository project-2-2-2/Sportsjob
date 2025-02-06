import Navbar from "./Navbar";
 import { useTheme } from "../../../contexts/theme";
const Layout = ({ children }) => {
		const { theme } = useTheme();
	
	return (
 		<div className=' bg-amber-100'>
			 	 	 

 			<Navbar />
		 
 
			<main >{children}</main>
		</div>
 	);
};
export default Layout;