import Header from '@/Components/Header';
import Footer from '@/Components/Footer';

export default function GuestLayout({ children, auth, canLogin, canRegister }) {
  return (
    <div className="mk-wrapper mk-body min-h-screen flex flex-col">
      <Header auth={auth} canLogin={canLogin} canRegister={canRegister} />

      <main className="flex-1 flex items-center justify-center py-10 px-4">
        <div className="w-full max-w-md mk-card mk-card-plain sm:rounded-lg overflow-hidden">
          {children}
        </div>
      </main>

      <Footer />
    </div>
  );
}
