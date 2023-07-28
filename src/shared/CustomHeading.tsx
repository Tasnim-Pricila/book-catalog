interface Iprops {
  smallTitle?: string;
  headTitle: string;
  paragraph?: string;
}

const CustomHeading = ({ smallTitle, headTitle, paragraph }: Iprops) => {
  return (
    <div className="text-center my-5 mx-auto">
      {
        smallTitle &&  <small className="text-uppercase bg-secondary px-3 py-2 text-white border-none rounded-3 d-inline-block my-1 mt-5">
        {smallTitle}
      </small>
      }
     
      <h1 className="mt-2" style={{ fontSize: 40 }}>
        {headTitle}
      </h1>
      {
        paragraph && <h5 className="pe-5 ps-5 mt-3 pb-5">{paragraph}</h5>
      }
      
    </div>
  );
};

export default CustomHeading;
