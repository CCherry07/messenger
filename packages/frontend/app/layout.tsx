import "./globals.css";
import AuthContext from "./context/AuthContext";
// import ActiveStatus from './components/ActiveStatus'
import ToasterContext from "./context/ToasterContext";

export const metadata = {
  title: "Messenger",
  description: "Messenger Clone",
};

import Providers from "./providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthContext>
          <Providers>
            <ToasterContext />
            {/* <ActiveStatus /> */}
            {children}
          </Providers>
        </AuthContext>
      </body>
    </html>
  );
}
