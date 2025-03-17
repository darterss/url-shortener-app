import UrlForm from './components/UrlForm';
import UrlInfo from './components/UrlInfo';
import UrlDelete from './components/UrlDelete';
import UrlAnalytics from './components/UrlAnalytics';
import { useState } from 'react';

function App() {
  const [createdLinks, setCreatedLinks] = useState<any[]>([]);

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8 bg-gray-50 rounded-lg shadow-lg">
      <h1 className="text-4xl font-extrabold text-center text-blue-600 mb-6">
        Сервис сокращения ссылок
      </h1>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <UrlForm onCreated={(url) => setCreatedLinks([url, ...createdLinks])} />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <UrlInfo />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <UrlAnalytics />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <UrlDelete />
      </div>

      <h2 className="text-2xl font-semibold text-center mt-8">Созданные ссылки</h2>
      <ul className="space-y-4 mt-4">
        {createdLinks.map((link, idx) => (
          <li key={idx} className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all">
            <a
              href={link.shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-700 text-lg font-medium"
            >
              {link.shortUrl}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
