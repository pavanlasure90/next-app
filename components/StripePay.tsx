"use client"


import React from "react";
import StripeCheckout from "react-stripe-checkout";
import { useRouter } from "next/navigation";

interface StripePayProps {
  totalPrice: number; // Rename grandTotal to totalPrice
  clearCart: () => void;
}

const StripePay: React.FC<StripePayProps> = ({ totalPrice, clearCart }) => {
  const priceForStripe = totalPrice * 100;
  const publishableKey = "pk_test_51OlDNLSBX6XtUqrlF6qXhGVxmGNBa9KSmIUfzW8NRXHgoqgt5ZqOQGOtSHXGa6FpQ0vjp9QYc5z8KUKNGweVy3or002p99CLh5";
  const router = useRouter();

  const onToken = (token: any) => {
    console.log(token);
    alert("Payment is successful! Your order has been placed.");
    clearCart();
    router.push('/ordered');
  };

  return (
    <StripeCheckout
      label="Pay Now"
      name="Ahex Tech"
      billingAddress
      shippingAddress
      image="https://picsum.photos/200/300"
      description={`Your total is $${totalPrice}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripePay;
