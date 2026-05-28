import { Link } from "react-router";

const projects = [
  {
    name: "Todo List",
    path: "/todolist",
  },
  {
    name: "Form Validation",
    path: "/formvalidation",
  },
  {
    name: "Movie Review",
    path: "/moviereview",
  },
  {
    name: "Blog App",
    path: "/blogapp",
  },
  {
    name: "Quiz Game",
    path: "/quizgame",
  },
  {
    name: "Recipe Finder",
    path: "/recipefinder",
  },
  {
    name: "Weather Dashboard",
    path: "/weather",
  },
];

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 px-4 py-10">
      
      <div className="max-w-6xl mx-auto">
        
        {/* Heading */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            React Projects 🚀
          </h1>

          <p className="text-slate-400 text-lg">
            Explore modern frontend mini projects with beautiful UI.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Link
              key={index}
              to={project.path}
              className="group bg-white/10 border border-white/10 backdrop-blur-lg rounded-3xl p-8 hover:-translate-y-2 hover:border-cyan-400/40 hover:shadow-cyan-500/20 hover:shadow-2xl transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-white group-hover:text-cyan-400 transition">
                  {project.name}
                </h2>

                <span className="text-cyan-400 text-2xl group-hover:translate-x-1 transition">
                  →
                </span>
              </div>

              <p className="text-slate-400 leading-relaxed">
                Click to open and explore the {project.name} project with modern UI and responsive design.
              </p>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Home;