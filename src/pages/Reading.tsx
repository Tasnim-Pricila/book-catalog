import { useAppSelector } from "../redux/features/hook";
import { useGetUserByEmailQuery } from "../redux/features/users/userApi";
import TableComponent from "../shared/TableComponent";

const Reading = () => {
  const { user } = useAppSelector((state) => state.user);
  const { data: userData } = useGetUserByEmailQuery(user.email!);
  const currentlyReading = userData?.data?.currentlyReading;
  return <TableComponent data={currentlyReading} />;
};

export default Reading;
