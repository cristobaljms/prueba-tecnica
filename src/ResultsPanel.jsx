import { useState, useEffect } from "react";
import Airtable from "airtable";
import { useParams } from "react-router-dom";
import ArrowBack from "./assets/arrow_back_icon.svg";

var base = new Airtable({
  apiKey:
    "pat5ktt9SGs2y9a2k.b64604b7cb569bb0bdf604cc0eec44540619e8433d80f48180954d7d6b2d4628",
}).base("appPEaWJdX2OxF89e");

function ResultsPanel() {
  const params = useParams();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const results = await base("tblwBZOeEWeZuNkpX")
          .select({
            filterByFormula: `{RepEmail} = "${decodeURIComponent(
              params.email
            )}"`,
          })
          .all();
        const records = results.map((record) => record.fields);
        setData(records);

        const array = [];
        for (let index = 0; index < records.length; index++) {
          const element = records[index];
          if (!array.includes(element.company_name))
            array.push(element.company_name);
        }
        setCompanies(array);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  const handleFilter = (e) => {
    const filteredRecords = data.filter(
      (record) => record.company_name == e.target.value
    );
    setFilteredData(filteredRecords);
  };

  return (
    <main className="min-h-screen">
      <div className="skewed p-4 sm:p-12 flex gap-4 justify-start items-center">
        <div className="text-white bg-white rounded-full">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-0 lg:pointer-events-auto"
            href="/"
          >
            <img src={ArrowBack} alt="Back" width={50} height={50} />
          </a>
        </div>
        <div className="bg-white py-4 px-6 rounded-3xl w-full max-w-2xl mx-auto">
          <div className="flex w-full gap-4">
            <select className="form-input" onChange={(e) => handleFilter(e)}>
              <option value="">Seleccionar compañia</option>
              {companies.map((c, i) => (
                <option key={i} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="container w-full text-black mx-auto p-8">
        {filteredData.map((row, i) => (
          <div key={i}>
            <div className="flex gap-1 w-full py-4 bg-gray-100 p-8 mb-2">
              <p>
                <b>Company Name:</b>
              </p>
              <p>{row.company_name}</p>
            </div>
            <div className="flex gap-1 w-full py-4 bg-gray-100 p-8 mb-2">
              <p>
                <b>First Name:</b>
              </p>
              <p>{row.first_name}</p>
            </div>
            <div className="flex gap-1 w-full py-4 bg-gray-100 p-8 mb-2">
              <p>
                <b>Last Name:</b>
              </p>
              <p>{row.last_name}</p>
            </div>
            <div className="flex gap-1 w-full py-4 bg-gray-100 p-8 mb-2">
              <p>
                <b>Address:</b>
              </p>
              <p>{row.address}</p>
            </div>
            <div className="flex gap-1 w-full py-4 bg-gray-100 p-8 mb-2">
              <p>
                <b>City:</b>
              </p>
              <p>{row.city}</p>
            </div>
            <div className="flex gap-1 w-full py-4 bg-gray-100 p-8 mb-2">
              <p>
                <b>Country:</b>
              </p>
              <p>{row.county}</p>
            </div>
            <div className="flex gap-1 w-full py-4 bg-gray-100 p-8 mb-2">
              <p>
                <b>State:</b>
              </p>
              <p>{row.state}</p>
            </div>
            <div className="flex gap-1 w-full py-4 bg-gray-100 p-8 mb-2">
              <p>
                <b>Zip:</b>
              </p>
              <p>{row.zip}</p>
            </div>
            <div className="flex gap-1 w-full py-4 bg-gray-100 p-8 mb-2">
              <p>
                <b>Phone 1:</b>
              </p>
              <p>{row.phone1}</p>
            </div>
            <div className="flex gap-1 w-full py-4 bg-gray-100 p-8 mb-2">
              <p>
                <b>Phone 2:</b>
              </p>
              <p>{row.phone2}</p>
            </div>
            <div className="flex gap-1 w-full py-4 bg-gray-100 p-8 mb-2">
              <p>
                <b>Email:</b>
              </p>
              <p>{row.email}</p>
            </div>
            <div className="flex gap-1 w-full py-4 bg-gray-100 p-8 mb-2">
              <p>
                <b>Web:</b>
              </p>
              <p>{row.web}</p>
            </div>
            <div className="flex gap-1 w-full py-4 bg-gray-100 p-8 mb-2">
              <p>
                <b>RepEmail:</b>
              </p>
              <p>{row.RepEmail}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default ResultsPanel;
