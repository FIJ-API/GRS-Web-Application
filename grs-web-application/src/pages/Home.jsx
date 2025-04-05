import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const cards = [
    { label: "BodyCams", route: "/bodycams" },
    { label: "Usuários", route: "/usuarios" },
    { label: "Empresas", route: "/empresas" },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
        {cards.map((card) => (
          <div
            key={card.label}
            className="bg-white p-8 rounded-2xl shadow-md cursor-pointer text-center hover:shadow-lg transition duration-300"
            onClick={() => navigate(card.route)}
          >
            <h2 className="text-xl font-bold text-gray-800">{card.label}</h2>
            <p className="text-gray-500 mt-2">Clique para visualizar</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
