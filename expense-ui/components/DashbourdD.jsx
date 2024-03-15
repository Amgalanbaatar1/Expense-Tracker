import { CardImg, CardLogo } from "@/public/CardLogo";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaCircleArrowUp } from "react-icons/fa6";
import { IoArrowDownCircle } from "react-icons/io5";

export function DashbourdD() {
  const [amount, setAmount] = useState();

  function totalExpense() {
    axios.get("http://localhost:3005/transactions/sum").then((response) => {
      setAmount(response.data);
    });
  }
  useEffect(() => {
    totalExpense();
  }, []);
  return (
    <div className="container mx-auto border mt-10 px-5 py-5 xl:py-8 xl:px-[250px]">
      <div className="flex gap-10 ">
        <div className=" card bg-[#0166FF] h-[219px] w-[384px] text-primary-content">
          <div className="p-8 flex flex-col gap-24">
            <CardLogo />
            <div>
              <p className="font-normal ">Cash</p>
              <h3 className="text-white font-semibold ">10,000,00</h3>
            </div>
          </div>
        </div>
        <div className=" h-[219px] w-[384px] border card  text-primary-content">
          <div className="card-body ">
            <div className="flex gap-2 items-center">
              <div className="w-[8px] rounded-full h-[8px]  bg-[#84CC16]"></div>
              <h2 className="text-black font-semibold">Your Income </h2>
            </div>
            <div>
              {amount && <p className="font-semibold text-4xl text-black">{amount.incomeSum}₮</p>}
              <p className="text-[#64748B]">Your Income Amount</p>

              <div className="mt-5">
                <FaCircleArrowUp className="text-[#84CC16] text-xl" />
                <p className="text-black font-normal">32% from last month</p>
              </div>
            </div>
          </div>
        </div>
        <div className=" h-[219px] w-[384px] border card  text-primary-content">
          <div className="card-body ">
            <div className="flex gap-2 items-center">
              <div className="w-[8px] rounded-full h-[8px]  bg-[#0166FF]"></div>
              <h2 className="text-black font-semibold">Total Expenses</h2>
            </div>
            <div>
              {amount && <p className="font-semibold text-4xl text-black">{amount.expenseSum}₮</p>}
              <p className="text-[#64748B]">Your Income Amount</p>
              <div className="mt-5">
                <IoArrowDownCircle className="text-[#84CC16] text-2xl" />
                <p className="text-black font-normal">32% from last month</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
