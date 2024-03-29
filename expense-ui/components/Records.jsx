import axios from "axios";
import { Loading } from "@/pages/Loading";
import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CatecorySelect } from "./Select";
import { Hause } from "@/public/Hause";
import { Cards } from "./Cards";
import * as dayjs from "dayjs";
import { AddCategory } from "./AddCategory";
export function Records() {
  const [transactions, setTransactions] = useState([]);
  const [amount, setAmount] = useState();
  const [date, setDate] = useState();
  const [loading, setLoading] = useState(true);
  const [type, setType] = useState("EXPENSE");

  // const [description, setDescription] = useState("hi");
  const [category_id, setCategory_id] = useState("");

  function loadTransaction() {
    setLoading(true);
    axios.get("http://localhost:3005/transactions").then((response) => {
      setTransactions(response.data);
      setLoading(false);
    });
  }

  function createTransaction() {
    const login = localStorage.getItem("login");
    axios
      .post(`http://localhost:3005/transactions?logInfo=${login}`, {
        amount: type === "EXPENSE" ? -amount : amount,
        category_id: category_id,
        date: date,
      })
      .then(() => {
        loadTransaction();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
    closeModal();
  }

  useEffect(() => {
    loadTransaction();
  }, []);

  const closeModal = () => {
    return document.getElementById("my_modal_3").close();
  };
  function deleteTransactions(id) {
    if (confirm("Delete?")) {
      axios.delete(`http://localhost:3005/transactions/${id}`).then(() => {
        loadTransaction();
      });
    }
  }

  if (loading) return <Loading />;

  return (
    <div className="container flex bg-[#F3F4F6]  mx-auto p-5 gap-8  border xl:px-[250px]">
      <div className="flex bg-white rounded-2xl  p-3 flex-col gap-5">
        <div className="text-bold p-2 text-3xl">Records</div>
        <button className="w-80 h-10 text-white bg-[#0166FF] rounded-2xl" onClick={() => document.getElementById("my_modal_3").showModal()}>
          +Add
        </button>
        <dialog id="my_modal_3" className="modal">
          <div className=" border bg-white p-8 pt-4 flex  mb-[271px] rounded-xl w-[750px] h-[460px]">
            <div>
              <div className="flex justify-between">
                <h3 className="font-bold text-lg">Add Record</h3>
              </div>
              <button onClick={() => setType("EXPENSE")} className={`btn rounded-1xl hover:bg-[#0166FF]`}>
                Expense
              </button>
              <button onClick={() => setType("INCOME")} className="btn rounded-1xl mb-7 hover:bg-[#16A34A]">
                Income
              </button>

              <p>Amount</p>
              <div className="flex gap-3">
                <input id="1" type="text" title="Amount" placeholder="₮ 0000.0000" className="input input-bordered w-full max-w-xs" value={amount} onChange={(e) => setAmount(e.target.value)} />
              </div>

              <p className="mt-3">Category</p>
              <CatecorySelect value={category_id} onChange={setCategory_id} />

              <div className="flex gap-3 mt-3">
                <div className="flex flex-col">
                  <p>Date</p>
                  <input className="border p-3 rounded-md" type="datetime-local" value={date} onChange={(e) => setDate(e.target.value)} />
                </div>
              </div>
              {/*==================================== ADD RECORD ================================================*/}
              <button className={`${type === "EXPENSE" ? "bg-blue-600" : "bg-green-600"} w-80 h-10 text-white bg-[#0166FF] mt-7 rounded-2xl`} onClick={createTransaction}>
                Add Record
              </button>
            </div>
            <form className="p-2" method="dialog">
              <button className="btn text-2xl btn-sm btn-circle btn-ghost ml-[346px]">
                <AiOutlineClose />
              </button>
              <select placeholder="Write here" className="select  select-bordered w-[358px]">
                <option>write here</option>
              </select>
              <textarea className="border rounded-md mt-5" placeholder="Write here" cols={40} rows={12}></textarea>
            </form>
          </div>
        </dialog>
        <input type="text" placeholder="Search?" className="w-80 h-8 p-3 rounded-md border-2" />

        <AddCategory />
        <div>
          <p className="text-xl">Amount range</p>
          <div className="flex gap-5">
            <input type="text" className="border w-[100px] rounded h-[40px]" />
            <input type="text" className=" border w-[100px] rounded h-[40px]" />
          </div>
          <input type="range" className="w-[210px] mt-3" />
        </div>
      </div>
      <div className="p-1">
        <Cards />
        {transactions.map((transaction) => {
          return (
            <div key={transaction.id} className="w-[894px] h-[64px] bg-white flex gap-8 p-8 items-center border-1F3F4F6 mt-[35px] rounded-xl">
              <input type="checkbox" className="w-[24px] h-[24px] " />
              <Hause />

              <div className="flex flex-col">
                <h1>{transaction.category_name}</h1>
                <p>{dayjs(transaction.date).format("MM/DD")}</p>
              </div>
              <div className="flex flex-1 justify-between">
                <div>{transaction.description}</div>
                <div className={`${transaction.amount < 0 ? "text-rose-600" : "text-green-600"}`}>{transaction.amount} ₮</div>
              </div>
              <RiDeleteBin6Line onClick={() => deleteTransactions(transaction.id)} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
