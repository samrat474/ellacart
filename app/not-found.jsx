import Button from "@/components/Button";
import Container from "@/components/Container";
import Heading from "@/components/Heading";

export default function NotFound() {
  return (
    <Container>
      <div className="min-h-[70vh] flex flex-col items-center gap-8 justify-center">
        <div className="lg:hidden text-center">
          <Heading size={4} colored>
            It seems we are
            <br />
            facing some troubles.
          </Heading>
        </div>
        <div className="hidden lg:block text-center">
          <Heading size={6} colored>
            It seems we are
            <br />
            facing some trouble.
          </Heading>
        </div>
        <div className="text-xl text-subtext text-center">
          We are trying to resolve this and services should resume shortly.
        </div>
        <div className="flex items-center gap-4">
          <Button variant="bordered" uri="/">
            Go to home
          </Button>
        </div>
      </div>
    </Container>
  );
}
