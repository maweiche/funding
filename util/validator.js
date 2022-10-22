import * as Yup from "yup";

export const DonateSchema = Yup.object({
  directDonation: Yup.string()
    .required("this field is required")
    .max(18, "maximium of 18 characters ")
    .test("checkAmount", "can't donate less than 1000 usdc", function (value) {
      return Number(value) >= 1000;
    }),
  microfund: Yup.string()
    .max(18, "maximium of 18 characters")
    .test("checkAmount", "can't donate less than 1000 usdc", function (value) {
      return value == undefined || Number(value) >= 1000;
    }),
});
