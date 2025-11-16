export const metadata = {
  title: "Somato",
  description: "Order food online with role-based access",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        {children}
      </body>
    </html>
  );
}
