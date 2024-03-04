import BusinessDetails from "./businessDetails";
import ServicesDetails from "./servicesDetails";
import HeaderAppBar from "./headerAppBar";

export default function Home({isAdmin,setIsAdmin}) {
    return (<>
        <HeaderAppBar isAdmin={isAdmin} setIsAdmin={setIsAdmin}></HeaderAppBar>     
        {!isAdmin && <ServicesDetails isAdmin={isAdmin} setIsAdmin={setIsAdmin}></ServicesDetails>}
        <BusinessDetails isAdmin={isAdmin} setIsAdmin={setIsAdmin}></BusinessDetails>
    </>)
}