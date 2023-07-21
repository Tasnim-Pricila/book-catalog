import { useAppSelector } from "../redux/features/hook";
import { useGetUserByEmailQuery } from "../redux/features/users/userApi";
import TableComponent from "../shared/TableComponent";

const ReadedBooks = () => {
  const { user } = useAppSelector((state) => state.user);
  const { data: userData } = useGetUserByEmailQuery(user.email!);
  return <TableComponent data={userData?.data?.completedBooks} />;
};

export default ReadedBooks;
