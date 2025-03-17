import { useState } from 'react';
import { api } from '../api';

export default function UrlAnalytics() {
  const [shortUrl, setShortUrl] = useState('');
  const [analytics, setAnalytics] = useState<any>(null);

  const fetchAnalytics = async () => {
    try {
      const res = await api.get(`/analytics/${shortUrl}`);
      setAnalytics(res.data);
    } catch {
      alert('Ссылка не найдена');
      setAnalytics(null);
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
      <button onClick={fetchAnalytics} className="bg-purple-500 text-white p-2 w-full rounded">
        Получить аналитику
      </button>
      {analytics && (
        <div className="border p-4 mt-4">
          <p><b>Количество переходов:</b> {analytics.clickCount}</p>
          <p><b>Последние IP:</b></p>
          <ul>
            {analytics.recentClicks.map((click: any) => (
              <li key={click.id}>{click.ipAddress} - {new Date(click.createdAt).toLocaleString()}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
