"use client";
import Button from "@/components/Button";
import Container from "@/components/Container";
import Heading from "@/components/Heading";
import Loader from "@/components/Loader";
import ProductCard from "@/components/ProductCard";
import { app } from "@/lib/firebase.config";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ShopCategory() {
  const [data, setData] = useState();
  const db = getFirestore(app);
  const params = useParams();
  const category = params.category;

  useEffect(() => {
    const ref = collection(db, "products");
    const q = query(ref, where("category", "==", category));
    getDocs(q).then((snaps) => {
      let arr = [];
      snaps.forEach((snap) => {
        arr.push({
          id: snap.id,
          data: snap.data(),
        });
      });
      setData(arr);
    });
  }, []);

  return (
    <div className="py-12 px-8">
      <Heading size={4}>{category.toUpperCase().replace("-", " & ")}</Heading>
      <div className="mt-12">
        <div className="grid border-l border-t border-slate-300 grid-cols-1 divide-x divide-y divide-slate-300 md:grid-cols-2 lg:grid-cols-4">
          {data ? (
            data.map((item, index) => (
              <ProductCard
                title={item.data.title}
                desc={item.data.description}
                id={item.id}
                price={item.data.price}
                image={item.data.images}
                key={index}
              />
            ))
          ) : (
            <Loader />
          )}
        </div>
      </div>
    </div>
  );
}
