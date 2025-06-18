import "./globals.css";

export const metadata = {
  title: "Tensamin Docs",
  description: "The official Documentation for Tensamin",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased dark">
        {children}
      </body>
    </html>
  );
}
