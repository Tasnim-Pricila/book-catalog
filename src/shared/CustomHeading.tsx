interface Iprops {
  smallTitle?: string;
  headTitle: string;
  paragraph?: string;
}

const CustomHeading = ({ smallTitle, headTitle, paragraph }: Iprops) => {
  return (
    <div className="text-center my-5 mx-auto">
      {smallTitle && (
        <small
          className="text-uppercase px-3 py-2 fw-bold border-none rounded-3 d-inline-block my-1 mt-5"
          style={{ background: "rgb(228, 225, 225)", color: "#493f3fe3" }}
        >
          {smallTitle}
        </small>
      )}

      <h1 className="mt-2 fw-bold" style={{ fontSize: 40 }}>
        {headTitle}
      </h1>
      {paragraph && <h5 className="pe-5 ps-5 mt-3 pb-5 text-muted">{paragraph}</h5>}
    </div>
  );
};

export default CustomHeading;
