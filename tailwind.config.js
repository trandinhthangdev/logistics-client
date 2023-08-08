/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                light: "#f7f7f7",
                dark: "#f7f7f7",
            },
            fontFamily: {
                sans: ["Nunito", "sans-serif"],
            },
        },
    },
    plugins: [],
};
