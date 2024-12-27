import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import aa from "./aa.jpeg";
import { UserContext } from "../context/user.context";
import axios from "../config/axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { user } = useContext(UserContext);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [projectName, setProjectName] = useState("");
  const [project, setProject] = useState([]);

  const navigate = useNavigate();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const createProject = (e) => {
    e.preventDefault();
    console.log("Project Name:", projectName);
    // Handle form submission logic here

    axios
      .post("/projects/create", { name: projectName })
      .then((res) => {
        console.log(res.data);
        setIsModalOpen(false);
      })
      .catch((err) => {
        console.error(err);
      });
    // handleCloseModal();
  };

  useEffect(() => {
    axios
      .get("/projects/all")
      .then((res) => {
        setProject(res.data.projects);
        // console.log(project);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="absolute top-4 right-4">
        <Link to="/login">
          <button className="px-4 py-2 m-2 text-white bg-blue-500 rounded hover:bg-blue-700">
            Login
          </button>
        </Link>
        <Link to="/register">
          <button className="px-4 py-2 m-2 text-white bg-green-500 rounded hover:bg-green-700">
            Register
          </button>
        </Link>
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center"
      >
        <img src={aa} alt="AI Robot" className="w-48 h-48 mb-4" />
        <h1 className="text-4xl font-bold text-gray-800">
          Welcome to Surya's AI Assistant
        </h1>

        <h3 style={{ marginTop: "2rem" }}>
          <button
            className="border border-sl border-slate-300 rounded-md w-28 h-28"
            onClick={handleOpenModal}
          >
            Create Project
            <i className="ri-link"></i>
          </button>
        </h3>
      </motion.div>
      <br />
      <br />
      <span>{JSON.stringify(user.email)}</span>
      {project.map((project) => (
        <div
          key={project._id}
          onClick={() => {
            navigate(`/project`, {
              state: { project },
            });
          }}
          className="project flex flex-col gap-2 cursor-pointer p-4 border border-slate-300 rounded-md min-w-52 hover:bg-slate-200"
        >
          <h2 className="font-semibold">{project.name}</h2>

          <div className="flex gap-2">
            <p>
              {" "}
              <small>
                {" "}
                <i className="ri-user-line"></i> Collaborators
              </small>{" "}
              :
            </p>
            {project.users.length}
          </div>
        </div>
      ))}

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Enter Project Name</h2>
            <form onSubmit={createProject}>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="projectName"
                >
                  Project Name
                </label>
                <input
                  type="text"
                  id="projectName"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 mr-2 text-white bg-gray-500 rounded hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
