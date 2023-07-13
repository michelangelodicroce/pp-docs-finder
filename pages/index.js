import { useCallback, useState } from 'react'

export default function Index() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState({});

  const handleSearch = useCallback(async () => {
    try {
      const response = await fetch(`/api/doc/${query}`);
      const data = await response.json();

      setResults(data);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  }, [query]);

  return (
    <>
      <div>
        <input style={{width: '400px'}} type="text" onChange={({ target }) => setQuery(target.value)} value={query}/>
        <button onClick={handleSearch}>Search</button>
      </div>
      <ul>
        {JSON.stringify(results)}
      </ul>
    </>
  )
}
