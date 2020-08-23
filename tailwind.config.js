module.exports = {
  purge: ["./src/**/*.svelte"],
  theme: {
    extend: {
      colors: {
        rausch: "#FF5A5F",
        "rausch-dark": "#FF385C",
        babu: "#00A699",
        arches: "#FC642D",
      },
    },
  },
  variants: {
    opacity: ["default", "disabled"],
  },
  plugins: [],
};
