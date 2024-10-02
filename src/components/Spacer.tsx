const Spacer = ({
  vertical = 0,
  horizontal = 0,
  verticalMobile = 0,
  horizontalMobile = 0,
}) => {
  const desktopStyle = {
    width: `${horizontal}rem`,
    height: `${vertical}rem`,
  };

  const mobileStyle = {
    width: `${horizontalMobile}rem`,
    height: `${verticalMobile}rem`,
  };

  return (
    <>
      <div className="hidden lg:block" style={desktopStyle}></div>
      <div className="block lg:hidden" style={mobileStyle}></div>
    </>
  );
};

export default Spacer;
