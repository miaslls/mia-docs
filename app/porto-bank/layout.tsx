import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'RECIBO DE ENTREGA DE CHAVES | MiaDocs',
  icons: '/porto-bank/icon.svg',
  // description: 'TODO:',
};
export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
