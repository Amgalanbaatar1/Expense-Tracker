import { Logo } from "@/public/headerLogo";
import axios from "axios";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  function handleSubmit() {
    console.log({ email, pass });
    axios
      .post("http://localhost:3005/logIn", {
        email,
        pass,
      })
      .then(() => {
        alert("Success");
        localStorage.setItem("login", `${email}:${pass}`);
        window.location = "/";
      })
      .catch((e) => {
        if (e.response.status === 401) {
          alert("Username or password is incorrect");
        }
      });
  }

  return (
    <div>
      <div className="flex justify-between">
        <div className="flex flex-col border p-10 h-[426px] w-[384px] ml-[330px] mt-[276px]">
          <div className="flex  justify-center items-center gap-3 ">
            <a href="http://localhost:3000/">
              <Logo />
            </a>
            <h1 className="font-extrabold text-xl">Geld</h1>
          </div>
          <div className="flex flex-col justify-center items-center">
            <h1 className="mt-10 font-semibold text-2xl">Welcome Back</h1>
            <p className="mb-10">Welcome back, Please enter your details</p>
          </div>
          <div className="flex flex-col gap-4">
            <input className="border p-2  rounded-xl bg-[#F3F4F6]" placeholder="Email" type="email" onChange={(e) => setEmail(e.target.value)} />
            <input className="border p-2 rounded-xl  bg-[#F3F4F6]" placeholder="password" type="password" onChange={(e) => setPass(e.target.value)} />
            <button className="border rounded-2xl p-2 text-white bg-[#0166FF]" onClick={handleSubmit}>
              Log In
            </button>
          </div>
        </div>
        <div className="border w-[1000px] h-[1065px] bg-[#0166FF]"></div>
      </div>
    </div>
  );
}
