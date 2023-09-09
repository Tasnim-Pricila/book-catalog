import { Card, Image } from "react-bootstrap";
import Slider from "react-slick";
import { IBook } from "../types/globalTypes";
import { isValidUrl } from "../utils/customFunction";
import { useNavigate } from "react-router-dom";
import demoImage from "../../src/assets/images/book.jpg";

interface IProps {
  relatedBooks: IBook[] | undefined;
}

const RelatedBooksSlider = ({ relatedBooks }: IProps) => {
  const navigate = useNavigate();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 2,
    slidesToScroll: 1,
    vertical: true, // Enable vertical sliding
    verticalSwiping: true, // Enable vertical swiping
  };

  return (
    <>
      <h4>Related Books</h4>
      {relatedBooks && relatedBooks?.length > 0 ? (
        <div style={{ width: "100%", height: "300px" }} className="mb-5">
          <Slider {...settings}>
            {relatedBooks?.slice(0, 3).map((book) => (
              <Card className="mt-2" key={book._id}>
                <div className="d-flex">
                  <Image
                    role="button"
                    src={isValidUrl(book.image!) ? book?.image : demoImage}
                    alt="fgfgggggg"
                    className=""
                    width="100"
                    height="auto"
                    onClick={() => navigate(`/bookdetails/${book._id!}`)}
                  />
                  <Card.Body style={{ minWidth: 0 }}>
                    <h5 className="text-truncate mb-0">{book?.title}</h5>
                    <Card.Text className="text-truncate mb-0">
                      {book?.author}
                    </Card.Text>
                    <Card.Text className="mb-0">
                      {book?.publication_date?.slice(0, 10)}
                    </Card.Text>
                    <Card.Text className="text-muted mb-0">
                      {" "}
                      {book?.genre}
                    </Card.Text>
                    <Card.Text className="fw-bold">${book?.price}</Card.Text>
                  </Card.Body>
                </div>
              </Card>
            ))}
          </Slider>
        </div>
      ) : (
        <p> No Related Books found</p>
      )}
    </>
  );
};

export default RelatedBooksSlider;
