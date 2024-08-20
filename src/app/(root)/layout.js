import RootNavbar from "@/components/navbar/RootNavbar";


export default function RootLayout({ children }) {
  return (
    <main>
      <RootNavbar />
      {children}
    </main>
  );
}
