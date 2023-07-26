import { Table } from "react-bootstrap";
import { IBook } from "../types/globalTypes";

const TableComponent = ({ data }: { data: IBook[] | undefined }) => {
  console.log(data);
  return (
    <>
      {data?.length !== undefined ? (
        <Table striped>
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Book Name</th>
              <th>Author</th>
              <th>Genre</th>
              <th>Published On</th>
              <th>Price</th>
            </tr>
          </thead>
          {data.map((data, i) => (
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
          ))}
        </Table>
      ) : (
        <h5 className="text-center">No Books right now</h5>
      )}
    </>
  );
};

export default TableComponent;
