import { Table } from "react-bootstrap";
import MyTableHeader from "../shared/MyTableHeader";
import { useAppSelector } from "../redux/features/hook";
import { useGetUserByEmailQuery } from "../redux/features/users/userApi";

const ReadedBooks = () => {
  const { user } = useAppSelector((state) => state.user);
  const { data: userData } = useGetUserByEmailQuery(user.email!);
  return (
    <Table striped>
      <MyTableHeader />
      {userData?.data?.completedBooks?.length !== undefined ? (
        userData?.data?.completedBooks?.map((data, i) => (
          <tbody>
            <tr className="align-middle">
              <td>{i + 1}</td>
              <td>
                <img
                  src={data.image}
                  alt=""
                  className="img-fluid"
                  width={50}
                  height={50}
                />
              </td>
              <td>{data.title}</td>
              <td>{data.author}</td>
              <td>{data.genre}</td>
              <td>{data.publication_date}</td>
              <td>{data.price}</td>
            </tr>
          </tbody>
        ))
      ) : (
        <h5 className="text-center">No Books right now</h5>
      )}
    </Table>
  );
};

export default ReadedBooks;
