// import { API_ROUTES } from "../utils/constants";
// import { RadioGroup } from "@headlessui/react";
// import { useElements, useStripe, CardElement } from "@stripe/react-stripe-js";
// import { useEffect, useState } from "react";
// import { NavLink, useParams } from "react-router-dom";
// import { StripeSvg } from "./sub-components/Icons";
// import posthog from "posthog-js";
// import { useUser } from "@/UserContext";

// export default function PaymentForm({ accountInfo }) {
//   const { user, setUser } = useUser();
//   const [selectedPlan, setSelectedPlan] = useState("");
//   const [plans, setPlans] = useState([]);
//   const [loadingTransition, setLoadingTransition] = useState(false);
//   const [showSuccessMsg, setShowSuccessMsg] = useState(false);
//   const [processing, setProcessing] = useState(false);
//   const [userChecked, setUserChecked] = useState(false);
//   const [error, setError] = useState();

//   useEffect(() => {
//     async function checkAuthenticationStatus() {
//       try {
//         const response = await fetch(API_ROUTES.checkSession, {
//           credentials: "include",
//         });
//         const data = await response.json();
//         setUserChecked(true);
//       } catch (error) {
//         console.error("Failed to check authentication status:", error);
//       }
//     }
//     async function getPlans() {
//       const response = await fetch(API_ROUTES.plans);
//       const data = await response.json();
//       setPlans(data);
//     }
//     checkAuthenticationStatus();
//     getPlans();
//   }, []);
//   const elements = useElements();
//   const stripe = useStripe();
//   const params = useParams();
//   const chosenPlan = params["*"];
//   useEffect(() => {
//     for (const each of plans) {
//       if (chosenPlan == each.id) {
//         setSelectedPlan(each);
//         break;
//       } else {
//         setSelectedPlan(plans[0]);
//       }
//     }
//   }, [chosenPlan, plans]);
//   async function handleSubmit() {
//     if (selectedPlan.price == 0) {
//       setLoadingTransition(true);
//       setTimeout(() => {
//         setLoadingTransition(false);
//         setShowSuccessMsg(true);
//         if (accountInfo.username) {
//           setUser(accountInfo);
//           posthog.identify(accountInfo.email, {
//             email: accountInfo.email,
//             username: accountInfo.username,
//           });
//         }
//       }, 350);
//     } else {
//       setProcessing(true);
//       const clientSecret = await createSetupIntent();
//       const cardElement = elements.getElement(CardElement);
//       const { setupIntent, error } = await stripe.confirmCardSetup(
//         clientSecret,
//         {
//           payment_method: { card: cardElement },
//         }
//       );
//       if (error) {
//         console.log(`Error ${error}`);
//       } else {
//         const subscription = await createSubscription(
//           setupIntent.payment_method
//         );
//         if (
//           subscription.subscriptionStatus === "active" &&
//           subscription.subscribedPlanId
//         ) {
//           setProcessing(false);
//           setLoadingTransition(true);
//           setUser(subscription);
//           setTimeout(() => {
//             setLoadingTransition(false);
//             setShowSuccessMsg(true);
//           }, 450);
//         } else {
//           setProcessing(false);
//           setError(`Error: ${subscription.error}`);
//         }
//       }
//     }
//   }
//   async function createSubscription(paymentMethodId) {
//     const response = await fetch(API_ROUTES.createSub, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       credentials: "include",
//       withCredentials: true,
//       body: JSON.stringify({
//         paymentMethodId: paymentMethodId,
//         priceId: selectedPlan.priceId,
//         email: user.email ? user.email : accountInfo.email,
//       }),
//     });

//     const subscription = await response.json();
//     return subscription;
//   }

//   async function createSetupIntent() {
//     const response = await fetch(API_ROUTES.createIntent, {
//       method: "POST",
//       credentials: "include",
//       withCredentials: true,
//     });
//     const setupIntent = await response.json();
//     return setupIntent.clientSecret;
//   }
//   function RadioSubs() {
//     return (
//       <div className="w-full md:p-4">
//         <div className="mx-auto w-full max-w-md focus:outline-0">
//           <RadioGroup value={selectedPlan} onChange={setSelectedPlan}>
//             <RadioGroup.Label className="sr-only">Plan</RadioGroup.Label>
//             <div className="space-y-2">
//               {plans
//                 .filter((plan) => (user.email ? plan.price > 0 : true))
//                 .map((plan) => (
//                   <RadioGroup.Option
//                     key={plan.name}
//                     value={plan}
//                     className={({ active, checked }) =>
//                       `${
//                         active
//                           ? "ring-2 ring-white/60 ring-offset-2 ring-offset-sky-300"
//                           : ""
//                       }
//                   ${checked ? "bg-sky-900/75 text-white" : "bg-gray-800"}
//                     relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md border-2 focus:outline-none hover:brightness-125 ${
//                       plan.name == "Starter"
//                         ? "bg-grn bg-cover bg-center border-green-800 border-4"
//                         : plan.name == "Star Player"
//                           ? "bg-gld border-yellow-800 border-4"
//                           : null
//                     }`
//                     }
//                   >
//                     {({ active, checked }) => (
//                       <>
//                         <div className="flex w-full items-center justify-between">
//                           <div className="flex items-center">
//                             <div className="text-sm">
//                               <RadioGroup.Label
//                                 as="p"
//                                 className={`font-medium  ${
//                                   checked ? "text-white" : "text-white"
//                                 }`}
//                               >
//                                 {plan.name == "Starter"
//                                   ? "Starter - Most Popular"
//                                   : plan.name}
//                               </RadioGroup.Label>
//                               <RadioGroup.Description
//                                 as="span"
//                                 className={`inline ${
//                                   checked ? "text-sky-100" : "text-gray-300"
//                                 }`}
//                               >
//                                 <span>
//                                   {plan.price > 0 &&
//                                     `$${plan.price} / Month - `}
//                                 </span>
//                                 <span>
//                                   {plan.price
//                                     ? `${plan.picksPerDay} Picks Per Day`
//                                     : `1 Pick Per Day`}
//                                 </span>{" "}
//                               </RadioGroup.Description>
//                             </div>
//                           </div>
//                           {checked && (
//                             <div className="shrink-0 text-white">
//                               <CheckIcon className="h-6 w-6" />
//                             </div>
//                           )}
//                         </div>
//                       </>
//                     )}
//                   </RadioGroup.Option>
//                 ))}
//             </div>
//           </RadioGroup>
//         </div>
//       </div>
//     );
//   }
//   function CheckIcon(props) {
//     return (
//       <svg viewBox="0 0 24 24" fill="none" {...props}>
//         <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
//         <path
//           d="M7 13l3 3 7-7"
//           stroke="#fff"
//           strokeWidth={1.5}
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         />
//       </svg>
//     );
//   }
//   return (
//     <>
//       {showSuccessMsg ? (
//         <div className="animate-slide-in-right flex flex-col gap-3 items-center">
//           <div className="font-saira_bold text-2xl">Success!</div>
//           <div className="font-saira_bold">Thank you for registering.</div>
//           <div className="font-saira_bold">
//             An email has been sent to your address for verification
//           </div>

//           <NavLink
//             to="/profile"
//             className="bg-gray-300 font-saira_bold px-4 py-2 rounded-lg font-bold hover:bg-gray-200"
//           >
//             Visit Your Profile
//           </NavLink>
//         </div>
//       ) : (
//         plans.length > 0 &&
//         (user.email || userChecked) && (
//           <div
//             className={`flex w-full md:w-3/4 flex-col px-4 pb-3 md:px-12 md:pb-3 gap-3 ${
//               loadingTransition
//                 ? "animate-slide-out-left"
//                 : "animate-slide-in-right"
//             } ${user.email && "md:items-center"}`}
//           >
//             <div>Choose your subscription option:</div>
//             {plans.length > 0 ? RadioSubs() : <div className="h-[728px]"></div>}
//             <div className="text-center w-full">
//               Total: ${selectedPlan.price || 0}.00
//             </div>
//             <div
//               className={`${selectedPlan.price == 0 ? "hidden" : null} ${
//                 user.email && "md:w-3/5"
//               }`}
//             >
//               <StripeSvg />
//               <div
//                 className={`mt-1 p-2 outline-1 outline rounded-md w-full bg-white
//               }`}
//               >
//                 <CardElement />
//               </div>
//             </div>
//             {error}
//             <div className="w-full flex justify-center">
//               <button
//                 onClick={() => !processing && handleSubmit()}
//                 className="bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white rounded-lg w-1/2 text-center px-3 py-2"
//               >
//                 {processing ? "Loading..." : "Sign Up"}
//               </button>
//             </div>{" "}
//             <div className="text-xs">
//               *Please note that all payment processing is securely handled by
//               Stripe. We do not store or have access to your credit card
//               information. For more information on how Stripe protects your
//               payment information, please visit{" "}
//               <a
//                 href="https://stripe.com/docs/security"
//                 alt="Stripes Secuirty Docs"
//                 target="_blank"
//                 rel="noreferrer"
//                 className="text-blue-500"
//               >
//                 Stripe&apos;s Security Page.
//               </a>
//             </div>
//           </div>
//         )
//       )}
//     </>
//   );
// }
