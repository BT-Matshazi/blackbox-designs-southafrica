import React from "react";

export default function Form(props) {
  return (
    <>
      <form action="https://www.payfast.co.za/eng/process" method="post">
        <input
          type="hidden"
          name="merchant_id"
          value={process.env.MERCHANT_ID}
        />
        <input
          type="hidden"
          name="merchant_key"
          value={process.env.MERCHANT_KEY}
        />
        <input
          type="hidden"
          name="return_url"
          value="blackbox-designs.vercel.app"
        />
        <input
          type="hidden"
          name="cancel_url"
          value="blackbox-designs.vercel.app"
        />
        <input
          type="hidden"
          name="notify_url"
          value="blackbox-designs.vercel.app"
        />
        <input type="hidden" name="amount" value={props.price} />
        <input type="hidden" name="item_name" value={props.product} />

        <button
          type="submit"
          disabled={props.price === 0}
          className="w-full px-4 py-2 font-bold text-white bg-accent lg:w-96 hover:bg-accent_hover"
        >
          R{props.price}.00 Order & Pay
        </button>
      </form>
    </>
  );
}
