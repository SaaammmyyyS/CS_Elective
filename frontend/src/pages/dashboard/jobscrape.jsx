import React from "react";
import { Typography } from "@material-tailwind/react";
import TextField from "@/widgets/ui/textfield";
import Dropdown from "@/widgets/ui/dropdown";
import CustomButton from "@/widgets/ui/Button";
import { useState } from "react";

export const Jobscrape = () => {
  const priceRange = [
    { label: "₱0", value: "0" },
    { label: "₱10k", value: "10000" },
    { label: "₱15k", value: "15000" },
    { label: "₱20k", value: "20000" },
    { label: "₱30k", value: "30000" },
    { label: "₱40k", value: "40000" },
    { label: "₱50k", value: "50000" },
    { label: "₱60k", value: "60000" },
    { label: "₱70k", value: "70000" },
    { label: "₱80k", value: "80000" },
    { label: "₱100k", value: "100000" },
    { label: "₱120k", value: "120000" },
    { label: "₱150k", value: "150000" },
  ];
  const [keyword, setKeyWord] = useState("");
  const [location, setLocation] = useState("");
  const [minSalary, setMinSalary] = useState("");
  const [maxSalary, setMaxSalary] = useState("");

  const handleSubmit = () => {
    //API CALL
    //Display Data
  };

  const handleMinSalary = (selectedValue) => {
    setMinSalary(selectedValue);
  };

  const handleMaxSalary = (selectedValue) => {
    setMaxSalary(selectedValue);
  };

  return (
    <div>
      <Typography variant="h1" color="green">
        ---
      </Typography>
      <form action="" className="container mx-auto">
        <div className="flex flex-col flex-wrap justify-center space-x-2 md:flex-row">
          <div className="mb-2">
            <TextField
              className=""
              inputLabel="Keyword"
              value={keyword}
              onChange={(e) => setKeyWord(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <TextField
              inputLabel="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          <div className="mb-2">
            <Dropdown
              className="w-full"
              options={priceRange}
              value={minSalary}
              onChange={handleMinSalary}
              defaultOption={"₱0"}
              label={"Paying from"}
            />
          </div>

          <div className="mb-2">
            <Dropdown
              className="w-full"
              options={priceRange}
              value={maxSalary}
              onChange={handleMaxSalary}
              label={"to"}
            />
          </div>

          <div>
            <CustomButton id="submit" onClick={handleSubmit} className="w-full">
              Scrape
            </CustomButton>
          </div>
        </div>
      </form>

      <div className="flex h-screen items-center justify-center overflow-x-scroll rounded-lg bg-gray-100">
        Job Cards Here
      </div>
    </div>
  );
};

export default Jobscrape;
