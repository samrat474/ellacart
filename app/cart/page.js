"use client";
import Alert from "@/components/Alert";
import Button from "@/components/Button";
import Container from "@/components/Container";
import Heading from "@/components/Heading";
import Links from "@/components/Links";
import Loader from "@/components/Loader";
import { useAuth } from "@/lib/auth-context";
import { app } from "@/lib/firebase.config";
import NoOrders from "@/public/no_orders.png";
import {
  arrayRemove,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { Calendar, Delete, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Cart() {
  const db = getFirestore(app);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const [empty, setEmpty] = useState(false);
  const [itemIds, setItemIds] = useState();

  useEffect(() => {
    const fetchCartItems = async () => {
      if (!user) {
        setLoading(false);
        setEmpty(true);
        return;
      }

      setLoading(true);
      setEmpty(false);

      try {
        const userRef = doc(db, "users", user.uid);
        const usr = await getDoc(userRef);

        if (usr.exists() && usr.data().cart && usr.data().cart.length > 0) {
          const cartItemsPromises = usr.data().cart.map(async (item) => {
            const productRef = doc(db, "products", item);
            const productSnap = await getDoc(productRef);

            if (productSnap.exists()) {
              return {
                id: productSnap.id,
                data: productSnap.data(),
              };
            }
            return null;
          });

          const fetchedCartItems = await Promise.all(cartItemsPromises);
          const validFetchedItems = fetchedCartItems.filter(
            (item) => item !== null,
          );
          setOrders(validFetchedItems);
          setItemIds(validFetchedItems.map((item) => item.id));
          console.log(itemIds);
        } else {
          setEmpty(true);
          setOrders([]);
        }
      } catch (error) {
        console.error("Error fetching cart items:", error);
        setEmpty(true);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, [user, db]);

  const handleRemove = (id) => {
    updateDoc(doc(db, "users", user.uid), {
      cart: arrayRemove(id),
    }).then(() => {
      window.location.href = "/cart";
    });
  };

  return (
    <div>
      {loading && (
        <Container>
          <div className="h-[90vh] py-12">
            <Loader type="stack" />
          </div>
        </Container>
      )}
      {!empty ? (
        <>
          {orders && (
            <div className="py-24">
              <Container>
                <div className="flex items-center justify-between flex-col md:flex-row gap-6">
                  <Heading size={3}>Your bag</Heading>
                  {/* {itemIds.toString()} */}
                  {itemIds && (
                    <Button uri={`/checkout/${itemIds.join("/")}`}>
                      Proceed to checkout
                    </Button>
                  )}
                </div>
                <div className="flex flex-col gap-8 divide-y divide-slate-300 mt-24">
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
                        <Link href={`/product/${item.id}`}>
                          <div className="line-clamp-2 text-primary-transparent-text">
                            <Heading size={1}>{item.data.title}</Heading>
                          </div>
                        </Link>
                        <div className="mt-6 text-xl font-semibold">
                          ${item.data.price}
                        </div>
                        <div className="mt-6 text-sm">
                          {item.data.description}
                        </div>
                      </div>
                      <div className="flex-1 ">
                        <div className="flex gap-2">
                          <Button uri={`/checkout/${item.id}`}>Buy now</Button>
                          <Button
                            icon={Trash}
                            onClick={() => handleRemove(item.id)}
                            variant="transparent"
                            color="danger"
                          />
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
        </>
      ) : (
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
                It seems you haven&apos;t added any items to cart.{" "}
                <Links uri="/" colored underlined>
                  Shop products
                </Links>{" "}
                and add them to your cart.
              </Alert>
            </div>
          </Container>
        </div>
      )}
    </div>
  );
}
