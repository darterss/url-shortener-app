import { useState } from 'react';
import { api } from '../api';

export default function UrlDelete() {
  const [shortUrl, setShortUrl] = useState('');

  const handleDelete = async () => {
    try {
      await api.delete(`/delete/${shortUrl}`);
      alert('Ссылка удалена');
      setShortUrl('');
    } catch {
      alert('Ошибка при удалении');
    }
  };

  return (
    <div className="space-y-2">
      <input
        type="text"
        placeholder="Введите короткую ссылку или алиас"
        value={shortUrl}
        onChange={(e) => setShortUrl(e.target.value)}
        className="border p-2 w-full"
      />
      <button onClick={handleDelete} className="bg-red-500 text-white p-2 w-full rounded">
        Удалить ссылку
      </button>
    </div>
  );
}
