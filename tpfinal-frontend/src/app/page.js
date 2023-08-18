export default function Home() {
  fetch("http://127.0.0.1:8000/ejemplo")
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error("Error:", error));

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p>HOLI</p>
    </main>
  );
}
