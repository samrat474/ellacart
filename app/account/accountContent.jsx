"use client";
import Alert from "@/components/Alert";
import Container from "@/components/Container";
import { useAuth } from "@/lib/auth-context";
import { TriangleAlert } from "lucide-react";

export default function AccountContent() {
  const { user } = useAuth();

  return (
    <div className="min-h-[70vh] py-24">
      <Container>
        <div className="text-3xl font-medium tracking-tighter mb-8">
          Welcome, {user?.displayName}.
        </div>
        <Alert icon={TriangleAlert} color="warning">
          There is a major outage in our servers. Services will be resumed
          shortly.
        </Alert>
      </Container>
    </div>
  );
}
