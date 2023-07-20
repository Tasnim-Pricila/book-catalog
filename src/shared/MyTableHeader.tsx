import { Table } from "react-bootstrap";

const MyTableHeader = () => {
  return (
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
  );
};

export default MyTableHeader;
