import * as Yup from "yup";

export const DonateSchema = Yup.object({
  directDonation: Yup.string()
    .required("this field is required")
    .max(10, "max 10 numbers ")
    .test("checkAmount", "Can't donate less than 100 usdc", function (value) {
      return Number(value) >= 100;
    }),
  microfund: Yup.string()
    .max(10, "max of 10 numbers")
    .test("checkAmount", "Can't donate less than 100 usdc", function (value) {
      return value == undefined || Number(value) >= 100;
    }),
});
