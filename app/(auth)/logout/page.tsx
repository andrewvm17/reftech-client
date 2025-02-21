'use client';
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const LogoutPage = () => {
  const { push } = useRouter(); // Destructure only push

  useEffect(() => {
    const timer = setTimeout(() => {
      push("/");
    }, 2000);

    return () => clearTimeout(timer);
  }, [push]); // Use [push] instead of [router]

  return <div>You have logged out... redirecting in a sec.</div>;
};

export default LogoutPage;
