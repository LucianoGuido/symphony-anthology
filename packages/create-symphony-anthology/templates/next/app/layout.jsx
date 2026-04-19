import './symphony.core.css';
import './globals.css';

export const metadata = {
  title: '{{PROJECT_NAME}}',
  description: 'Starter built with the create-symphony-anthology preview',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
