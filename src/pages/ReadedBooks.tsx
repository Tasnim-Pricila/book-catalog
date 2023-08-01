import { useAppSelector } from "../redux/features/hook";
import { useGetUserByEmailQuery } from "../redux/features/users/userApi";
import TableComponent from "../shared/TableComponent";

const ReadedBooks = () => {
  const { user } = useAppSelector((state) => state.user);
  const { data: userData } = useGetUserByEmailQuery(user.email!);

  const completedBooks = userData?.data?.completedBooks;
  return <TableComponent data={completedBooks} />;
};

export default ReadedBooks;
