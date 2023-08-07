import { useAppSelector } from "../redux/features/hook";
import { useGetUserByEmailQuery } from "../redux/features/users/userApi";
import CustomBreadCrumb from "../shared/CustomBreadCrumb";
import TableComponent from "../shared/TableComponent";

const ReadedBooks = () => {
  const { user } = useAppSelector((state) => state.user);
  const { data: userData, isLoading } = useGetUserByEmailQuery(user.email!);

  const completedBooks = userData?.data?.completedBooks;
  return (
    <>
      <CustomBreadCrumb Menu1="Home" activeMenu="Completed Books" />
      <TableComponent data={completedBooks} loading={isLoading}/>
    </>
  );
};

export default ReadedBooks;
