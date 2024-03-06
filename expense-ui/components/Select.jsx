import axios from "axios";
import React, { useEffect, useState } from "react";
import Select from "react-select";

export function CatecorySelect(props) {
  const { onChange } = props;
  const [categories, setCategories] = useState([]);

  function loadCategory() {
    axios.get("http://localhost:3005/categories").then((response) => {
      setCategories(response.data);
    });
  }
  const options = categories.map((category) => {
    return {
      value: category.id,
      label: category.name,
    };
  });

  useEffect(() => {
    loadCategory();
  }, []);

  const handleChangeCategory = (event) => {
    onChange(event.value);
  };
  return <Select className="w-full max-w-xs" options={options} onChange={handleChangeCategory} />;
}
