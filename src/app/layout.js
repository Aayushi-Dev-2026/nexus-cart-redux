import ReduxProvider from '../providers/ReduxProvider';
import './globals.css';

export const metadata = {
  title: 'Nexus Cart | Redux E-Commerce SPA',
  description: 'Sprint 10 State Management Application',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}