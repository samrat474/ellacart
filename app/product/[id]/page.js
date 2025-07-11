"use client";
import Button from "@/components/Button";
import Container from "@/components/Container";
import Heading from "@/components/Heading";
import { useAuth } from "@/lib/auth-context";
import { app } from "@/lib/firebase.config";
import {
  arrayUnion,
  doc,
  getDoc,
  getFirestore,
  updateDoc,
} from "firebase/firestore";
import { ListCheck, ShoppingBag } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Product() {
  const params = useParams();
  const id = params.id;
  const db = getFirestore(app);

  const { user } = useAuth();

  const [data, setData] = useState();
  const [over, setOver] = useState("");
  const [added, setAdded] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    getDoc(doc(db, "products", id)).then((snap) => {
      if (snap.exists()) setData(snap.data());
    });
  }, []);

  const addedUi = () => {
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
    }, 2000);
  };

  const handleBagAdd = () => {
    if (!user) {
      router.push("/auth/sign-in");
    } else {
      setLoading(true);
      const docRef = doc(db, "users", user.uid);
      updateDoc(docRef, {
        cart: arrayUnion(id),
      }).then(() => {
        setLoading(false);
        addedUi();
      });
    }
  };

  return (
    <div className="py-12">
      <Container>
        {data ? (
          <>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-1 grid place-items-center">
                <div className="w-full md:w-3/4 aspect-square relative gap-12 md:gap-0 overflow-hidden rounded-4xl">
                  <Image
                    src={over ? over : data.images.split(";")[0]}
                    fill
                    className="object-cover"
                    alt={over}
                  />
                </div>
              </div>
              <div className="flex flex-row md:flex-col relative overflow-y-auto md:overflow-hidden items-center gap-4">
                {data.images.split(";").map((image, index) => (
                  <div
                    className="h-32 shrink-0 cursor-pointer hover:opacity-70 w-32 border rounded-2xl overflow-hidden aspect-square relative"
                    key={index}
                    onClick={() => setOver(image)}
                  >
                    <Image
                      src={image}
                      alt={image}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-32 grid grid-cols-1 md:divide-x divide-slate-300 lg:grid-cols-4">
              <div className="col-span-3 md:pr-8">
                <Heading size={3}>{data.title}</Heading>
                <div className="mt-12 text-xl">{data.description}</div>
                <div className="mt-12">Made in {data.country}.</div>
              </div>
              <div className="col-span-1 md:pl-8">
                <div className="flex flex-col gap-1">
                  <strike className="text-xs text-slate-500">
                    ${parseInt(1.33 * data.price)}
                  </strike>
                  <div className="text-3xl font-bold">${data.price}</div>
                </div>
                <div className="flex flex-col gap-4 mt-12">
                  <Button uri={`/checkout/${id}`}>Buy now</Button>
                  <Button
                    variant="transparent"
                    icon={added ? ListCheck : ShoppingBag}
                    onClick={handleBagAdd}
                    loading={loading}
                  >
                    {added ? "Sent to bag" : "Add to bag"}
                  </Button>
                </div>
              </div>
            </div>
          </>
        ) : (
          "Loading..."
        )}
      </Container>
    </div>
  );
}
