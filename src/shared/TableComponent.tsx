import { Table } from "react-bootstrap";
import { IBook } from "../types/globalTypes";
import './CustomBreadCrumb.css'

const TableComponent = ({ data }: { data: IBook[] | undefined }) => {
  // console.log(data);
  return (
    <>
      {data?.length !== undefined ? (
        <Table responsive hover className="mx-4 my-4 text-center mx-auto" style={{width: 1200}}>
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
              <tr className="align-middle text-center">
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
                <td className="nowrap-cell">{data.title}</td>
                <td>{data.author}</td>
                <td>{data.genre}</td>
                <td>{data.publication_date?.slice(0, 10)}</td>
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
