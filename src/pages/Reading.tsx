import { useAppSelector } from "../redux/features/hook";
import { useGetUserByEmailQuery } from "../redux/features/users/userApi";
import CustomBreadCrumb from "../shared/CustomBreadCrumb";
import TableComponent from "../shared/TableComponent";

const Reading = () => {
  const { user } = useAppSelector((state) => state.user);
  const { data: userData, isLoading } = useGetUserByEmailQuery(user.email!);
  const currentlyReading = userData?.data?.currentlyReading;
  return (
    <>
      <CustomBreadCrumb Menu1="Home" activeMenu="Already Reading" />
      <TableComponent data={currentlyReading} loading={isLoading} />
    </>
  );
};

export default Reading;
