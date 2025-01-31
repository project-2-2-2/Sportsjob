import Navbar from "./Navbar";
 import { useTheme } from "../../../contexts/theme";
const Layout = ({ children }) => {
		const { theme } = useTheme();
	
	return (
 		<div className='min-h-screen bg-amber-100'>
			 	 	 

 			<Navbar />
		 
 
			<main className='max-w-7xl mx-auto px-4 py-6'>{children}</main>
		</div>
 	);
};
export default Layout;