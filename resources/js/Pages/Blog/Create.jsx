import React, { useEffect, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function CreatePost() {
  const { data, setData, processing, errors, reset, post } = useForm({
    titulo: '',
    contenido: '',
    imagen: null,
  });

  const [preview, setPreview] = useState(null);

  // Generar/revocar preview cuando cambia data.imagen
  useEffect(() => {
    if (!data.imagen) {
      setPreview(null);
      return;
    }
    const objectUrl = URL.createObjectURL(data.imagen);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [data.imagen]);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0] ?? null;
    setData('imagen', file);
  };

  const removeImage = () => {
    setData('imagen', null);
    setPreview((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return null;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    post('/blog', {
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
                className="w-full border border-gray-300 rounded-2xl px-5 py-3"
              />
              {errors.titulo && <p className="text-red-500 text-sm mt-1">{errors.titulo}</p>}
            </div>

            <div>
              <textarea
                value={data.contenido}
                onChange={(e) => setData('contenido', e.target.value)}
                placeholder="Escribe tu contenido..."
                className="w-full border border-gray-300 rounded-2xl px-5 py-3 h-40 resize-none"
              />
              {errors.contenido && <p className="text-red-500 text-sm mt-1">{errors.contenido}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Imagen (opcional)</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full"
              />
              {errors.imagen && <p className="text-red-500 text-sm mt-1">{errors.imagen}</p>}
            </div>

            {preview && (
              <div className="mt-3">
                <div className="relative inline-block">
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full max-h-64 object-cover rounded-lg border"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-2 right-2 bg-white bg-opacity-80 rounded-full p-1 shadow"
                    aria-label="Eliminar imagen"
                  >
                    ✕
                  </button>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={processing}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-2xl"
            >
              {processing ? 'Publicando...' : 'Publicar'}
            </button>
          </form>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}