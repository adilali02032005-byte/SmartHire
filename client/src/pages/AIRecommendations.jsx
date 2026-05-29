import { useState } from "react";
import axios from "axios";

function AIRecommendations() {

  const [skills, setSkills] = useState("");

  const [result, setResult] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        try{

            const token = localStorage.getItem("token");

            const res = await axios.post(
                "http://localhost:5000/api/ai/recommend",
                { skills },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setResult(res.data.response);

        }catch(error){

            console.log(error);

            alert(
                error.response?.data?.message ||
                "Something went wrong"
            );
        }
    };


  return (
    <div className="p-10">

      <h1 className="text-3xl font-bold mb-6">
        AI Job Recommendations
      </h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 max-w-md"
      >

        <textarea
          placeholder="Enter your skills"
          value={skills}
          onChange={(e) =>
            setSkills(e.target.value)
          }
          className="border p-2"
        />

        <button
          className="bg-black text-white p-2 cursor-pointer"
        >
          Get Recommendations
        </button>

      </form>

      {result && (
        <div className="mt-6 border p-4 rounded">
          <pre className="whitespace-pre-wrap">
            {result}
          </pre>
        </div>
      )}

    </div>
  );
}

export default AIRecommendations;