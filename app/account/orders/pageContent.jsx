"use client";
import Alert from "@/components/Alert";
import Container from "@/components/Container";
import Heading from "@/components/Heading";
import Links from "@/components/Links";
import Loader from "@/components/Loader";
import { useAuth } from "@/lib/auth-context";
import { app } from "@/lib/firebase.config";
import NoOrders from "@/public/no_orders.png";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function OrderComponents() {
  const db = getFirestore(app);
  const [orders, setOrders] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = () => {
      setLoading(true);
      getDoc(doc(db, "users", user?.uid))
        .then((doc) => {
          setOrders(doc.data().orders);
          setLoading(false);
        })
        .catch((error) => {
          console.error(error.message);
          setLoading(false);
        });
    };

    fetchData();
  }, []);

  return (
    <div>
      {loading && (
        <Container>
          <div className="h-[90vh] py-12">
            <Loader type="stack" />
          </div>
        </Container>
      )}
      {orders && (
        <div>
          <Heading size={3}>Your orders</Heading>
          {orders?.map((item, index) => (
            <div className="text-2xl" key={index}>
              {item}
            </div>
          ))}
        </div>
      )}
      {!orders && !loading && (
        <div className="bg-zinc-50 py-16 relative z-0">
          <Container size="2xl">
            <div className="w-full aspect-video relative">
              <Image
                src={NoOrders}
                fill
                className="object-cover"
                alt="No Orders"
              />
            </div>
            <div className="mt-6 flex flex-col gap-4">
              <Alert color="secondary" variant="transparent">
                It seems you haven&apos;t placed any orders.{" "}
                <Links uri="/" colored underlined>
                  Shop products
                </Links>{" "}
                to find your orders here.
              </Alert>
            </div>
          </Container>
        </div>
      )}
    </div>
  );
}
