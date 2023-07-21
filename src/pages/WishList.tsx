import { useAppSelector } from "../redux/features/hook";
import { useGetUserByEmailQuery } from "../redux/features/users/userApi";
import TableComponent from "../shared/TableComponent";

const WishList = () => {
  const { user } = useAppSelector((state) => state.user);
  const { data: userData } = useGetUserByEmailQuery(user.email!);
  return <TableComponent data={userData?.data?.wishlist} />;
};

export default WishList;
