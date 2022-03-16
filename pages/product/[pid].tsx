import { useRouter } from "next/router";
import { useEffect } from "react";
const ViewProduct = () => {
  useEffect(() => {
    console.log("sdlfladlk");
  }, []);
  const router = useRouter();
  const { pid } = router.query;
  return <p>Post: {pid}</p>;
};

export default ViewProduct;
