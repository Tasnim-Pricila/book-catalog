import { useAppSelector } from "../redux/features/hook";
import { useGetUserByEmailQuery } from "../redux/features/users/userApi";
import CustomBreadCrumb from "../shared/CustomBreadCrumb";
import TableComponent from "../shared/TableComponent";

const WishList = () => {
  const { user } = useAppSelector((state) => state.user);
  const { data: userData } = useGetUserByEmailQuery(user.email!);

  const wishlist = userData?.data?.wishlist;
  return(
  <>
    <CustomBreadCrumb Menu1="Home" activeMenu="Your Wishlist" />
    <TableComponent data={wishlist} />;
  </>
)};

export default WishList;
