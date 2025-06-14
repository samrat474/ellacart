import Button from "../Button";
import Container from "../Container";
import Heading from "../Heading";

const Welcome = () => {
  return (
    <div className="py-24 min-h-[70vh] flex flex-col items-center">
      <Container>
        <div className="flex flex-col items-center gap-6">
          <h1 className="text-3xl lg:text-5xl font-semibold tracking-tighter text-subtext text-center max-w-xl">
            The best place to buy the products you love.
          </h1>
          <p className="text-center text-lg text-subtext">
            Shop and save more with instant cashback,
            <br />
            no-cost EMI, and exchange offers.
          </p>
          <div className="flex items-center gap-4">
            <Button uri="/shop">Shop now</Button>
            <Button uri="/resources/ellacart-store" variant="bordered">
              Visit Ellacart Store
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Welcome;
