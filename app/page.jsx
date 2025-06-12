import Button from "@/components/Button";
import Container from "@/components/Container";
import { app } from "@/lib/firebase.config";
import { getAuth } from "firebase/auth";

export default function Home() {
  const auth = getAuth(app);
  return (
    <div className="py-12">
      <Container>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae
        architecto dolores voluptatum sequi quod doloribus optio aperiam, animi
        laudantium delectus ab iusto molestias incidunt quam odio porro suscipit
        illum aspernatur.
        <Button uri="d">sd</Button>
      </Container>
    </div>
  );
}
