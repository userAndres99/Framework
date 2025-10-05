import Header from '@/Components/Header';
import Footer from '@/Components/Footer';
import { Head } from '@inertiajs/react';

export default function PublicLayout({ children, title = 'Huellas Solidarias', auth, canLogin, canRegister }) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <div className="mk-wrapper mk-body min-h-screen">
        <Header auth={auth} canLogin={canLogin} canRegister={canRegister} />
        <main className="mk-container" style={{ padding: '3.5rem 1rem' }}>{children}</main>
        <Footer />
      </div>
    </>
  );
}