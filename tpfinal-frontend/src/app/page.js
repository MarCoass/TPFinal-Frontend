const fetchEjemplo = () => {
  return fetch("http://127.0.0.1:8000/ejemplo").then((response) => response.json());
  
};

export default async function Home() {
  const data = await fetchEjemplo();
  console.log(data);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p>HOLI</p>
      <div>{data.message}<br/>
      {data.timestamp}</div>
    </main>
  );
}
