import { useState } from 'react';
import { api } from '../api';

export default function UrlInfo() {
  const [shortUrl, setShortUrl] = useState('');
  const [info, setInfo] = useState<any>(null);

  const fetchInfo = async () => {
    try {
      const res = await api.get(`/info/${shortUrl}`);
      setInfo(res.data);
    } catch {
      alert('Ссылка не найдена');
      setInfo(null);
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
      <button onClick={fetchInfo} className="bg-green-500 text-white p-2 w-full rounded">
        Получить информацию
      </button>
      {info && (
        <div className="border p-4 mt-4">
          <p><b>Оригинальный URL:</b> {info.originalUrl}</p>
          <p><b>Дата создания:</b> {new Date(info.createdAt).toLocaleString()}</p>
          <p><b>Переходов:</b> {info.clickCount}</p>
        </div>
      )}
    </div>
  );
}
