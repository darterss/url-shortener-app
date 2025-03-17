import { useState } from 'react';
import { api } from '../api';

export default function UrlForm({ onCreated }: { onCreated: (url: any) => void }) {
  const [originalUrl, setOriginalUrl] = useState('');
  const [alias, setAlias] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post('/shorten', { originalUrl, alias: alias || undefined });
      alert('Короткая ссылка: ' + res.data.shortUrl);
      onCreated(res.data);
      setOriginalUrl('');
      setAlias('');
    } catch (error: any) {
      alert(error.response?.data?.message || 'Ошибка при создании ссылки');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <input
        type="url"
        placeholder="Оригинальный URL"
        value={originalUrl}
        onChange={(e) => setOriginalUrl(e.target.value)}
        required
        className="border p-2 w-full"
      />
      <input
        type="text"
        placeholder="Алиас (опционально)"
        value={alias}
        onChange={(e) => setAlias(e.target.value)}
        maxLength={20}
        className="border p-2 w-full"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 w-full rounded">
        Создать короткую ссылку
      </button>
    </form>
  );
}
