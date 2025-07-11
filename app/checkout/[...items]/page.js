"use client";

import Alert from "@/components/Alert";
import Button from "@/components/Button";
import Container from "@/components/Container";
import Heading from "@/components/Heading";
import Input from "@/components/Input";
import { useAuth } from "@/lib/auth-context";
import { routeProtected } from "@/lib/auth-routes";
import { app } from "@/lib/firebase.config";
import {
  addDoc,
  collection,
  documentId,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { Check, TriangleAlert } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function Checkout() {
  const params = useParams();
  const db = getFirestore(app);
  const [data, setData] = useState();
  const items = params.items;
  const { user } = useAuth();
  const [total, setTotal] = useState(0);
  const [info, setInfo] = useState({
    card: "",
    cvv: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    zip: "",
    state: "",
    country: "",
  });

  useEffect(() => {
    const ref = collection(db, "products");
    const q = query(ref, where(documentId(), "in", items));
    getDocs(q).then((snaps) => {
      let arr = [],
        x = 0;
      snaps.forEach((snap) => {
        arr.push({
          id: snap.id,
          data: snap.data(),
        });
        x += parseInt(snap.data().price);
      });
      setData(arr);
      setTotal(x);
    });
  }, []);

  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [error, setError] = useState("");

  const handleCheckout = (e) => {
    e.preventDefault();
    setLoading(true);
    items.forEach((item) => {
      addDoc(collection(db, "orders"), {
        productId: item,
        userId: user.uid,
        time: new Date(),
        delivery: Math.floor(Math.random() * 8) + 4,
      })
        .then(() => {
          router.push("/orders/confirm-order");
        })
        .catch((err) => {
          setError(err.message);
        });
    });
  };

  return (
    <div>
      <Container size="fluid">
        <div className="py-12">
          <Heading size={3}>Checkout</Heading>
          <div className="mt-12 grid grid-cols-4 lg:divide-x divide-slate-300">
            <div className="col-span-2 lg:pr-8">
              <Alert color="warning" variant="transparent" icon={TriangleAlert}>
                We are facing issues with payment, and are only accepting card
                payments. We are working on this problem to resume services
                momentarily.
              </Alert>
              {user && (
                <form className="mt-6" onSubmit={handleCheckout}>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-3">
                      <Input
                        value={user.email}
                        placeholder="Email"
                        readOnly
                        required
                      />
                    </div>
                    <div className="col-span-3">
                      <Input
                        value={user.displayName}
                        placeholder="Name"
                        readOnly
                        required
                      />
                    </div>
                    <div className="col-span-2">
                      <Input
                        value={info.card}
                        onChange={(e) =>
                          setInfo({
                            ...info,
                            card: e.target.value,
                          })
                        }
                        placeholder="Card number"
                        type="number"
                        required
                      />
                    </div>
                    <div className="col-span-1">
                      <Input
                        value={info.cvv}
                        onChange={(e) =>
                          setInfo({
                            ...info,
                            cvv: e.target.value,
                          })
                        }
                        placeholder="CVV"
                        type="password"
                        required
                      />
                    </div>
                    <div className="col-span-3">
                      <Input
                        value={info.addressLine1}
                        onChange={(e) =>
                          setInfo({
                            ...info,
                            addressLine1: e.target.value,
                          })
                        }
                        placeholder="Address line 1"
                        type="text"
                        required
                      />
                    </div>
                    <div className="col-span-3">
                      <Input
                        value={info.addressLine2}
                        onChange={(e) =>
                          setInfo({
                            ...info,
                            addressLine2: e.target.value,
                          })
                        }
                        placeholder="Address line 2"
                        type="text"
                        required
                      />
                    </div>
                    <div className="col-span-1">
                      <Input
                        value={info.city}
                        onChange={(e) =>
                          setInfo({
                            ...info,
                            city: e.target.value,
                          })
                        }
                        placeholder="City"
                        type="text"
                        required
                      />
                    </div>
                    <div className="col-span-1">
                      <Input
                        value={info.zip}
                        onChange={(e) =>
                          setInfo({
                            ...info,
                            zip: e.target.value,
                          })
                        }
                        placeholder="ZIP"
                        type="number"
                        required
                      />
                    </div>
                    <div className="col-span-1">
                      <Input
                        value={info.country}
                        onChange={(e) =>
                          setInfo({
                            ...info,
                            country: e.target.value,
                          })
                        }
                        placeholder="Country"
                        type="text"
                        required
                      />
                    </div>
                    <div className="flex items-center gap-4">
                      <Button color="success" loading={loading}>
                        Checkout
                      </Button>
                      {items.length !== 1 && (
                        <Button variant="transparent" color="secondary">
                          Edit cart
                        </Button>
                      )}
                    </div>
                  </div>
                </form>
              )}
              <div className="mt-6">
                {error && <Alert color="danger">{error}</Alert>}
              </div>
            </div>
            <div className="col-span-2 flex flex-col gap-8 lg:pl-8">
              {data &&
                data.map((item, index) => (
                  <div
                    className="grid grid-cols-4 gap-4 bg-slate-50 p-1 rounded-2xl overflow-hidden"
                    key={index}
                  >
                    <div className="col-span-1 aspect-square relative rounded-xl overflow-hidden bg-slate-100 ">
                      <Image
                        src={item.data.images.split(";")[0]}
                        alt={item.data.images}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="col-span-3 py-4 pr-8">
                      <div className="line-clamp-2 text-lg">
                        {item.data.title}
                      </div>
                      <div className="mt-2 text-xl font-semibold">
                        ${item.data.price}
                      </div>
                    </div>
                  </div>
                ))}
              <div className="mt-4 pt-4 border-t border-slate-200">
                <div className="grid grid-cols-3 gap-1">
                  <div className="col-span-1">Subtotal:</div>
                  <div className="col-span-2">${total}</div>
                  <div className="col-span-1">Shipping:</div>
                  <div className="col-span-2">
                    ${parseFloat(0.03 * total).toFixed(2)}
                  </div>
                  <div className="col-span-1">Taxes:</div>
                  <div className="col-span-2">
                    ${parseFloat(0.13 * total).toFixed(2)}
                  </div>
                </div>
              </div>
              <div className="pt-4 border-t border-slate-200">
                <div className="grid grid-cols-3 text-xl gap-1">
                  <div className="col-span-1">Total:</div>
                  <div className="col-span-2 font-semibold">
                    $
                    {parseFloat(total + 0.13 * total + 0.07 * total).toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default routeProtected(Checkout);
