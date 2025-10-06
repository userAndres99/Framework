import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import axios from 'axios';

const FALLBACK_POST_IMAGE = '/images/placeholder-post.jpg'; 

export default function Index({ posts = [] }) {
  const [reacciones, setReacciones] = useState(
    posts.reduce((acc, post) => { acc[post.id] = post.reacciones ? post.reacciones.length : 0; return acc; }, {})
  );

  const [comentariosInput, setComentariosInput] = useState(
    posts.reduce((acc, post) => { acc[post.id] = ''; return acc; }, {})
  );

  const [comentarios, setComentarios] = useState(
    posts.reduce((acc, post) => { acc[post.id] = post.comentarios || []; return acc; }, {})
  );

  const reaccionar = async (postId) => {
    try {
      const { data } = await axios.post(`/blog/${postId}/reacciones`, { tipo: 'like' });
      setReacciones((prev) => ({ ...prev, [postId]: data.total }));
    } catch (err) {
      console.error(err);
    }
  };

  const enviarComentario = async (e, postId) => {
    e.preventDefault();
    if (!comentariosInput[postId]) return;

    try {
      const { data } = await axios.post(`/blog/${postId}/comentarios`, {
        contenido: comentariosInput[postId],
      });

      setComentarios((prev) => ({
        ...prev,
        [postId]: [...prev[postId], data.comentario],
      }));

      setComentariosInput((prev) => ({ ...prev, [postId]: '' }));
    } catch (err) {
      console.error(err);
    }
  };

  const handleImgError = (e) => {
    e.currentTarget.src = FALLBACK_POST_IMAGE;
  };

  return (
    <AuthenticatedLayout>
      <Head title="Blog" />
      <div className="max-w-4xl mx-auto mt-10 space-y-8 px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold text-gray-900">Blog</h1>
          <Link
            href="/blog/create"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-2 rounded-lg shadow-lg transition"
          >
            Nueva Publicación
          </Link>
        </div>

        {posts.length === 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center text-gray-600">No hay publicaciones todavía.</div>
        )}

        {posts.map((post) => (
          <article key={post.id} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition p-6">
            <div className="flex items-center mb-4">
              <img
                src={post.user?.profile_photo_url || '/images/DefaultPerfil.jpg'}
                alt={post.user?.name || 'Usuario'}
                className="w-10 h-10 rounded-full mr-3 border border-gray-300 object-cover"
                onError={(e) => { e.currentTarget.src = '/images/DefaultPerfil.jpg'; }}
              />
              <div>
                <p className="font-semibold text-gray-800">{post.user?.name || 'Anónimo'}</p>
                <p className="text-sm text-gray-500">{new Date(post.created_at).toLocaleDateString()}</p>
              </div>
            </div>

            {post.imagen_url && (
              <div className="mb-4 w-full overflow-hidden rounded-lg bg-gray-100">
                <img
                  src={post.imagen_url}
                  alt={post.titulo}
                  onError={handleImgError}
                  loading="lazy"
                  className="w-full h-64 object-contain bg-gray-100 rounded-lg mb-4"
                  //className="w-full h-64 sm:h-72 md:h-80 lg:h-96 object-cover block"
                />
              </div>
            )}

            <h2 className="text-2xl font-bold text-gray-900 mb-2">{post.titulo}</h2>
            <p className="text-gray-700 mb-4 whitespace-pre-line">{post.contenido}</p>

            <div className="flex items-center gap-3 mb-4">
              <button
                onClick={() => reaccionar(post.id)}
                className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full shadow-md transition"
                aria-label={`Me gusta ${post.titulo}`}
              >
                👍 Me gusta ({reacciones[post.id] ?? 0})
              </button>
              <Link href={`/blog/${post.id}`} className="text-sm text-gray-600 hover:underline">Ver publicación</Link>
            </div>

            <div className="mt-6 space-y-3">
              {(comentarios[post.id] || []).map((c) => (
                <div key={c.id} className="flex items-start gap-3 bg-gray-50 p-3 rounded-xl shadow-sm">
                  <img
                    src={c.user?.profile_photo_url || '/images/DefaultPerfil.jpg'}
                    alt={c.user?.name || 'Usuario'}
                    className="w-8 h-8 rounded-full border border-gray-300 object-cover"
                    onError={(e) => { e.currentTarget.src = '/images/DefaultPerfil.jpg'; }}
                  />
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{c.user?.name || 'Anónimo'}</p>
                    <p className="text-gray-700 text-sm">{c.contenido}</p>
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={(e) => enviarComentario(e, post.id)} className="mt-4 flex gap-3">
              <input
                type="text"
                value={comentariosInput[post.id] ?? ''}
                onChange={(e) =>
                  setComentariosInput((prev) => ({ ...prev, [post.id]: e.target.value }))
                }
                placeholder="Escribe un comentario..."
                className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-full shadow-md transition"
              >
                Enviar
              </button>
            </form>
          </article>
        ))}
      </div>
    </AuthenticatedLayout>
  );
}