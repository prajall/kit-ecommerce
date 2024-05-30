"use client";
import React, { useRef } from "react";
import { Player } from "@lordicon/react";
import { useState, useEffect } from "react";
import cart from "@/animatedIcons/cart.json";
import { Button } from "@/components/ui/button";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { useTheme } from "next-themes";
import { useParams } from "next/navigation";
import { addItemsToCart } from "@/cart";

const AddToCart = () => {
  const productId = useParams().productId;
  const playerRef = useRef<Player>(null);
  const [hoverCart, setHoverCart] = useState(false);
  const [iconColor, setIconColor] = useState("#f3f2f3");
  const { theme } = useTheme();

  useEffect(() => {
    if (theme == "dark") {
      setIconColor("#f3f2f3");
    } else {
      setIconColor("#000000");
    }
    if (hoverCart) {
      playerRef.current?.playFromBeginning();
    }
  }, [hoverCart]);

  const addToCart = () => {
    addItemsToCart(productId);
  };

  return (
    <Button
      className="flex gap-1 w-40"
      onMouseEnter={() => setHoverCart(true)}
      onMouseLeave={() => setHoverCart(false)}
      variant={"outline"}
      onClick={addToCart}
    >
      Add to Cart
      <Player icon={cart} ref={playerRef} colorize={iconColor} />
    </Button>
  );
};

export default AddToCart;
