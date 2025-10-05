import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import Hero from '@/Components/Hero';
import FeatureCard from '@/Components/FeatureCard';

export default function Home({ auth, canLogin, canRegister }) {
  return (
    <PublicLayout auth={auth} canLogin={canLogin} canRegister={canRegister}>
      <Head>
        <title>Home</title>
        <link rel="preload" as="image" href="/images/Hero.jpg" />
      </Head>

      <div className="mk-container" style={{ padding: '3.5rem 1rem' }}>
        <Hero
          title="Huellas Solidarias"
          subtitle="Plataforma para reportar y coordinar rescates, adopciones y reencuentros de mascotas."
          imageClass="w-full h-[720px] md:h-[920px] lg:h-[500px] object-cover"
        >
          <div className="mt-6 flex gap-3">
            <Link
              href={route('register')}
              aria-label="Quiero empezar a ayudar — crear cuenta"
              className="mk-btn mk-btn-primary inline-flex items-center text-sm"
            >
              Quiero empezar a ayudar
            </Link>

            <Link
              href={route('login')}
              aria-label="Ya tengo cuenta — iniciar sesión"
              className="mk-btn mk-btn-outline inline-flex items-center text-sm"
            >
              Ya tengo cuenta
            </Link>
          </div>
        </Hero>

        <section className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard title="Reportes con ubicación">
            Publica casos con foto y localización exacta en el mapa.
          </FeatureCard>

          <FeatureCard title="Verificación de organizaciones">
            Refugios y asociaciones pueden verificarse y gestionar donaciones y eventos.
          </FeatureCard>

          <FeatureCard title="Recursos comunitarios">
            Guías, formularios y un foro para resolver dudas y compartir experiencias.
          </FeatureCard>
        </section>
      </div>
    </PublicLayout>
  );
}