/** WetFuel brand red — used for interactive card hover borders */
export const BRAND_RED = "#ce1c1a";

export const cardHoverBorderSx = {
  transition: "border-color 150ms, box-shadow 250ms, transform 150ms",
  "&:hover": {
    borderColor: BRAND_RED,
  },
};
