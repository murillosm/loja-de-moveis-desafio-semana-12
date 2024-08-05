import React from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import PageHeader from "../components/nav/PageHeader";
import Info from "../components/Info";
import { useCartContext } from "../context/CartContext";

const schema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  companyName: z.string().optional(),
  zipCode: z.string().min(1, { message: "ZIP code is required" }),
  country: z.string().min(1, { message: "Country is required" }),
  streetAddress: z.string().min(1, { message: "Street address is required" }),
  city: z.string().min(1, { message: "City is required" }),
  province: z.string().min(1, { message: "Province is required" }),
  addonAddress: z.string().optional(),
  email: z.string().email({ message: "Invalid email address" }),
  additionalInfo: z.string().optional(),
});

const Checkout = () => {
  const { cart } = useCartContext();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  type FormData = {
    firstName: string;
    lastName: string;
    companyName: string;
    zipCode: string;
    country: string;
    streetAddress: string;
    city: string;
    province: string;
    addonAddress: string;
    email: string;
    additionalInfo: string;
  };

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  const checkCEP = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const cep = e.target.value;
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await response.json();

    console.log(data);

    if (data.erro) {
      return {
        zipCode: {
          message: "Invalid CEP code",
        },
      };
    }

    setValue("country", data.uf);
    setValue("streetAddress", data.logradouro);
    setValue("city", data.localidade);
    setValue("province", data.bairro);
  };

  return (
    <>
      <PageHeader title={"Checkout"} currentPath={"/checkout"} />
      <div className="px-[100px] py-16 flex lg:flex-row flex-col">
      <form
        onSubmit={handleSubmit as SubmitHandler<FieldValues>}
        className="w-full lg:w-1/2 px-4 md:px-[100px] py-8 md:py-[72px] flex justify-center flex-col gap-6"
      >
          <h1 className="font-poppins font-semibold text-4xl">Billing details</h1>
          <div className="flex gap-6">
            <div>
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                {...register("firstName")}
                className="w-full border border-gray-300 p-2 rounded-md"
              />
              {errors.firstName && (
                <span className="text-red-600">{errors.firstName?.message?.toString()}</span>
              )}
            </div>
            <div>
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                {...register("lastName")}
                className="w-full border border-gray-300 p-2 rounded-md"
              />
              {errors.lastName && (
                <span className="text-red-600">{errors.lastName?.message?.toString()}</span>
              )}
            </div>
          </div>
          <div>
            <label htmlFor="companyName">Company Name (Optional)</label>
            <input
              type="text"
              id="companyName"
              {...register("companyName")}
              className="w-full border border-gray-300 p-2 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="zipCode">ZIP code</label>
            <input
              type="text"
              id="zipCode"
              {...register("zipCode")}
              className="w-full border border-gray-300 p-2 rounded-md"
              onBlur={checkCEP}
            />
            {errors.zipCode && (
              <span className="text-red-600">{errors.zipCode.message?.toString()}</span>
            )}
          </div>
          <div>
            <label htmlFor="country">Country / Region</label>
            <input
              type="text"
              id="country"
              {...register("country")}
              className="w-full border border-gray-300 p-2 rounded-md"
            />
            {errors.country && (
              <span className="text-red-600">{errors.country.message?.toString()}</span>
            )}
          </div>
          <div>
            <label htmlFor="streetAddress">Street address</label>
            <input
              type="text"
              id="streetAddress"
              {...register("streetAddress")}
              className="w-full border border-gray-300 p-2 rounded-md"
            />
            {errors.streetAddress && (
              <span className="text-red-600">{errors.streetAddress.message?.toString()}</span>
            )}
          </div>
          <div>
            <label htmlFor="city">Town / City</label>
            <input
              type="text"
              id="city"
              {...register("city")}
              className="w-full border border-gray-300 p-2 rounded-md"
            />
            {errors.city && (
              <span className="text-red-600">{errors.city.message?.toString()}</span>
            )}
          </div>
          <div>
            <label htmlFor="province">Province</label>
            <input
              type="text"
              id="province"
              {...register("province")}
              className="w-full border border-gray-300 p-2 rounded-md"
            />
            {errors.province && (
              <span className="text-red-600">{errors.province.message?.toString()}</span>
            )}
          </div>
          <div>
            <label htmlFor="addonAddress">Add-on address</label>
            <input
              type="text"
              id="addonAddress"
              {...register("addonAddress")}
              className="w-full border border-gray-300 p-2 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              id="email"
              {...register("email")}
              className="w-full border border-gray-300 p-2 rounded-md"
            />
            {errors.email && (
              <span className="text-red-600">{errors.email.message?.toString()}</span>
            )}
          </div>
          <div>
            <label htmlFor="additionalInfo">Additional information</label>
            <input
              type="text"
              id="additionalInfo"
              {...register("additionalInfo")}
              className="w-full border border-gray-300 p-2 rounded-md"
            />
          </div>
        </form>

        <div className="w-full lg:w-1/2 m-10 h-[789px] bg-white p-4 flex flex-col">
          <div className="flex-grow flex flex-col justify-between">
            <div>
              <div className="text-black text-2xl font-medium font-['Poppins'] flex justify-between">
                <span>Product</span>
                <span>Subtotal</span>
              </div>
              {cart.map((item) => (
                <div className="w-full">
                  <div className="mt-4 flex justify-between items-center">
                    <div className="text-black text-base font-normal font-['Poppins']">
                      {item.title}
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-1">
                    <div className="text-black text-xs font-medium font-['Poppins']">
                      X {item.quantity}
                    </div>
                    <div className="text-black text-base font-light font-['Poppins']">
                      R${(item.salePrice * item.quantity).toFixed(2)}
                    </div>
                  </div>
                </div>
              ))}

              <div className="mt-4 text-black text-base font-normal font-['Poppins'] flex justify-between">
                <span>Subtotal</span>
                <span>
                  R$
                  {cart
                    .reduce(
                      (acc, item) => acc + item.salePrice * item.quantity,
                      0
                    )
                    .toFixed(2)}
                </span>
              </div>

              <div className="text-black text-base font-normal font-['Poppins'] flex justify-between">
                <span>Total</span>
                <span className=" text-[#b88e2f] text-2xl font-bold font-['Poppins'] text-right">
                  R$
                  {cart
                    .reduce(
                      (acc, item) => acc + item.salePrice * item.quantity,
                      0
                    )
                    .toFixed(2)}
                </span>
              </div>

              <div className="my-6 border-t border-[#d9d9d9]"></div>

              <div className="text-black text-base font-light font-['Poppins'] text-justify">
                Your personal data will be used to support your experience
                throughout this website, to manage access to your account, and
                for other purposes described in our
                <span className="font-semibold"> privacy policy.</span>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center mb-2">
                <div className="w-3.5 h-3.5 bg-black rounded-full mr-2"></div>
                <div className="text-black text-base font-normal font-['Poppins']">
                  Direct Bank Transfer
                </div>
              </div>

              <div className="text-[#9f9f9f] text-base font-light font-['Poppins'] text-justify">
                Make your payment directly into our bank account. Please use
                your Order ID as the payment reference. Your order will not be
                shipped until the funds have cleared in our account.
              </div>

              <div className="mt-6 flex items-center mb-2">
                <div className="w-3.5 h-3.5 rounded-full border border-[#9f9f9f] mr-2"></div>
                <div className="text-[#9f9f9f] text-base font-medium font-['Poppins']">
                  Direct Bank Transfer
                </div>
              </div>

              <div className="flex items-center mb-2">
                <div className="w-3.5 h-3.5 rounded-full border border-[#9f9f9f] mr-2"></div>
                <div className="text-[#9f9f9f] text-base font-medium font-['Poppins']">
                  Cash On Delivery
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 w-full flex justify-center">
            <button
              className="w-[318px] h-16 rounded-[15px] border border-black flex items-center justify-center"
              onClick={handleSubmit(onSubmit)}
            >
              <span className="text-black text-xl font-normal font-['Poppins']">
                Place order
              </span>
            </button>
          </div>
        </div>
      </div>
      <Info />
    </>
  );
};

export default Checkout;
