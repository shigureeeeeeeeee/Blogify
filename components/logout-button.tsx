"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

export function LogoutButton({ className, ...props }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogout() {
    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/logout", { method: "POST" });
      if (response.ok) {
        const data = await response.json();
        await signOut({ redirect: false });
        router.push(data.url);
        router.refresh();
      }
    } catch (error) {
      console.error("ログアウトエラー:", error);
    }
    setIsLoading(false);
  }

  return (
    <Button
      onClick={handleLogout}
      disabled={isLoading}
      variant="ghost"
      className={className}
      {...props}
    >
      {isLoading ? "ログアウト中..." : "ログアウト"}
    </Button>
  );
}