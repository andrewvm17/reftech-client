"use client"
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    // Perform actions that depend on router, e.g., router.push()
    // Example: Redirect to home page after a delay
    const timeoutId = setTimeout(() => {
      router.push('/');
    }, 2000);

    // Cleanup function to clear the timeout if the component unmounts
    return () => clearTimeout(timeoutId);
  }, [router]); // Include router in the dependency array

  return <div>Logging out...</div>;
}

export default LogoutPage;