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
import { Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function OrderComponents() {
  const db = getFirestore(app);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const newDate = (date, days) => {
    const d = new Date(date);
    d.setDate(d.getDate() + days);
    return d;
  };

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user?.uid) {
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const ordersRef = collection(db, "orders");
        const q = query(ordersRef, where("userId", "==", user.uid));
        const ordersSnapshot = await getDocs(q);

        const orderPromises = ordersSnapshot.docs.map(async (orderDoc) => {
          const productId = orderDoc.data().productId;
          const productDoc = await getDoc(doc(db, "products", productId));

          if (productDoc.exists()) {
            return {
              id: orderDoc.id,
              productId: productDoc.id,
              data: productDoc.data(),
              date: new Date(orderDoc.data().time.seconds * 1000),
              delivery: newDate(
                orderDoc.data().time.seconds * 1000,
                orderDoc.data().delivery,
              ),
            };
          }
          return null;
        });

        const fetchedOrders = await Promise.all(orderPromises);
        setOrders(fetchedOrders.filter((order) => order !== null));
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders(); // Call the async function
  }, [user]);

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
        <div className="py-24">
          <Container>
            <Heading size={3}>Your orders</Heading>
            <div className="flex flex-col gap-8 divide-y divide-slate-300 mt-12">
              {orders.map((item, index) => (
                <div
                  className="flex flex-col md:flex-row pb-8 gap-8"
                  key={index}
                >
                  <div className="flex-1 aspect-square overflow-hidden bg-slate-200 relative">
                    <Image
                      src={item.data.images.split(";")[0]}
                      alt={item.data.images}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-[2]">
                    <Link href={`/product/${item.productId}`}>
                      <div className="line-clamp-2 text-primary-transparent-text">
                        <Heading size={1}>{item.data.title}</Heading>
                      </div>
                    </Link>
                    <div className="mt-6 text-xl font-semibold">
                      ${item.data.price}
                    </div>
                    <div className="mt-6 flex items-center gap-4">
                      <Calendar />
                      <span>
                        Ordered on:{" "}
                        {item.date.toLocaleDateString("en-IN", {
                          weekday: "long",
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col gap-1">
                    <div className="text-sm">Arriving by</div>
                    <div className="text-lg font-semibold text-success-bordered-text">
                      {item.delivery.toLocaleDateString("en-IN", {
                        weekday: "long",
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Container>
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
