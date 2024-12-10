"use client";

import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";

const DeleteProductButton = ({ productId }: { productId: string }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await axios.delete(`/api/products/${productId}`);
      alert("Product deleted successfully");
    } catch (error) {
      alert("Failed to delete product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button variant={"destructive"} onClick={handleDelete} disabled={loading}>
      {loading ? "Deleting..." : "Delete"}
    </Button>
  );
};

export default DeleteProductButton;
