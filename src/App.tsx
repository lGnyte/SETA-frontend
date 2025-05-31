import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import api from './lib/axios';

function App() {

  const fetchData = async () => {
    const res = await api.get('/users');
    console.log(res.data);
  };
  
  const handleClick = () => {
    fetchData();
  }
  
  return (
    <main className="p-4">
      <a href="https://vite.dev" target="_blank">
        <img src={viteLogo} className="logo" alt="Vite logo"/>
      </a>
      <a href="https://react.dev" target="_blank">
        <img src={reactLogo} className="logo react" alt="React logo"/>
      </a>
      <h1 className="text-4xl text-pink-600 font-bold">Hello S.E.T.A.</h1>
      <button type={"button"} className={"bg-gray-200 rounded-md px-4 text-lg font-semibold cursor-pointer border-gray-700 border"} onClick={handleClick}>aaaa</button>
    </main>
  )
}

export default App
