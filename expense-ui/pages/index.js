import { Header } from "@/components/Header";
import { Records } from "@/components/Records";
import axios from "axios";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const login = localStorage.getItem("login");
    axios.get(`http://localhost:3005/categories?loginInfo=${login}`);
  });

  return (
    <div>
      <Header />
      <Records />
    </div>
  );
}
