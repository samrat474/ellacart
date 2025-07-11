"use client";
import Button from "@/components/Button";
import Container from "@/components/Container";
import Heading from "@/components/Heading";
import { useParams } from "next/navigation";

export default function ConfirmOrder() {
  const params = useParams();
  return (
    <div className="py-24 min-h-[80vh]">
      <Container size="2xl">
        <Heading size={4}>Your order is confirmed.</Heading>
        <div className="text-xl mt-4">
          Thanks for your order! Your order{" "}
          <span className="font-mono">{params.id}</span> has been confirmed and
          will be shipped soon. We&apos;ll send you another email with tracking
          information once it&apos;s on its way.
        </div>
        <div className="mt-8 flex items-center gap-4">
          <Button uri="/account/orders">Go to orders</Button>
          <Button uri="/shop" variant="bordered">
            Shop more
          </Button>
        </div>
      </Container>
    </div>
  );
}
