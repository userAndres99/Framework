import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useForm, router } from '@inertiajs/react';

export default function CreatePost() {
  const { data, setData, processing, errors, reset } = useForm({
    titulo: '',
    contenido: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    router.post('/blog', data, {
      onSuccess: () => reset(),
    });
  };

  return (
    <AuthenticatedLayout>
      <Head title="Crear publicación" />
      <div className="max-w-2xl mx-auto mt-16 px-4">
        <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8 transition-transform hover:scale-[1.01] duration-300">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-xl font-bold text-white">U</div>
            <h2 className="text-2xl font-bold text-gray-900">Crea tu publicación</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <input
                type="text"
                value={data.titulo}
                onChange={(e) => setData('titulo', e.target.value)}
                placeholder="Título de la publicación..."
                className="w-full border border-gray-300 rounded-2xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition shadow-sm text-gray-800 placeholder-gray-400"
              />
              {errors.titulo && <p className="text-red-500 text-sm mt-1">{errors.titulo}</p>}
            </div>

            <div>
              <textarea
                value={data.contenido}
                onChange={(e) => setData('contenido', e.target.value)}
                placeholder="Escribe tu contenido..."
                className="w-full border border-gray-300 rounded-2xl px-5 py-3 h-40 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition shadow-sm text-gray-800 placeholder-gray-400"
              />
              {errors.contenido && <p className="text-red-500 text-sm mt-1">{errors.contenido}</p>}
            </div>

            <button
              type="submit"
              disabled={processing}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-2xl shadow-lg transition flex justify-center items-center gap-2"
            >
              Publicar
            </button>
          </form>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}