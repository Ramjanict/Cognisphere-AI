"use client";

import { RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

interface Props {
  children: React.ReactNode;
}

export default function ProtectedDashboard({ children }: Props) {
  const { token } = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.replace("/login");
    }
  }, [router]);

  return <>{children}</>;
}
