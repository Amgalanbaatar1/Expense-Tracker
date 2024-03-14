import { Logo } from "@/public/headerLogo";
import axios from "axios";
import { useState } from "react";

export default function signUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  function handleSubmit() {
    axios
      .post("http://localhost:3005/users/create", {
        email: email,
        password: password,
        name: name,
      })
      .then(() => {
        setEmail(""), setName(""), setPassword("");
      })
      .catch((error) => {
        console.error("Error creating user:", error);
      });
  }

  return (
    <div>
      <div className="flex justify-between">
        <div className="flex flex-col p-10 h-[426px] w-[384px] ml-[330px] mt-[250px]">
          <div className="flex  justify-center items-center gap-3 ">
            <a href="http://localhost:3000/">
              <Logo />
            </a>
            <h1 className="font-extrabold text-xl">Geld</h1>
          </div>
          <div className="flex flex-col text-center justify-center items-center">
            <h1 className="mt-10 font-semibold text-2xl">Create Geld account</h1>
            <p className="mb-10">Sign up below to create your Wallet account</p>
          </div>
          <div className="flex flex-col gap-4">
            <input className="border p-2  rounded-xl bg-[#F3F4F6]" placeholder="Name" type="name" onChange={(e) => setName(e.target.value)} />
            <input className="border p-2  rounded-xl bg-[#F3F4F6]" placeholder="Email" type="email" onChange={(e) => setEmail(e.target.value)} />
            <input className="border p-2 rounded-xl  bg-[#F3F4F6]" placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
            <a className="text-[#0166FF]" href="http://localhost:3000/logIn">
              <button className="border rounded-2xl p-2 text-white bg-[#0166FF]" onClick={handleSubmit}>
                Sign up
              </button>
            </a>
          </div>
          <div className="flex gap-3 justify-center items-center mt-10">
            <p>Already have account?</p>
            <a className="text-[#0166FF]" href="http://localhost:3000/logIn">
              Log In
            </a>
          </div>
        </div>
        <div className="border w-[1000px] h-[1065px] bg-[#0166FF]"></div>
      </div>
    </div>
  );
}
