import axios from "axios";
import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { CatecorySelect } from "./Select";
export function Records() {
  const [transactions, setTransactions] = useState([]);
  const [amount, setAmount] = useState();
  // const [description, setDescription] = useState("hi");
  const [category_id, setCategory_id] = useState("");

  function loadTransaction() {
    axios.get("http://localhost:3005/transactions").then((response) => {
      setTransactions(response.data);
    });
  }

  function createTransaction() {
    axios
      .post("http://localhost:3005/transactions", {
        amount: amount,
        category_id: category_id,
      })
      .then(() => {
        loadTransaction();
      })
      .catch((error) => {
        console.log(error);
      });
    closeModal();
  }

  useEffect(() => {
    loadTransaction();
  }, []);

  const closeModal = () => {
    return document.getElementById("my_modal_3").close();
  };

  return (
    <div className="container flex  mx-auto p-5 gap-8  border xl:px-[250px]">
      <div className="flex border-2 p-3 flex-col gap-5">
        <div className="text-bold p-2 text-3xl">Records</div>
        <button className="w-80 h-10 text-white bg-[#0166FF] rounded-2xl" onClick={() => document.getElementById("my_modal_3").showModal()}>
          +Add
        </button>
        <dialog id="my_modal_3" className="modal">
          <div className=" border bg-white p-8 flex  mb-[271px] rounded-xl w-[750px] h-[460px]">
            <div>
              <div className="flex justify-between">
                <h3 className="font-bold text-lg">Add Record</h3>
              </div>
              <button className="btn rounded-1xl hover:bg-[#0166FF]">Expense</button>
              <button className="btn rounded-1xl mb-7 hover:bg-[#16A34A]">Income</button>

              <p>Amount</p>
              <div className="flex gap-3">
                <input id="1" type="text" title="Amount" placeholder="₮ 0000.0000" className="input input-bordered w-full max-w-xs" value={amount} onChange={(e) => setAmount(e.target.value)} />
              </div>
              <p className="mt-3">Catecory</p>
              <CatecorySelect value={category_id} onChange={setCategory_id} />

              <div className="flex gap-3 mt-3">
                <div className="flex flex-col">
                  <p>Date</p>
                  <input className="border p-3 rounded-md" type="date" />
                </div>
                <div>
                  <p>Time</p>
                  <input className="border p-3 rounded-md w-[147px]" type="time" />
                </div>
              </div>
              <button className="w-80 h-10 text-white bg-[#0166FF] mt-7 rounded-2xl" onClick={createTransaction}>
                Add Record
              </button>
            </div>
            <form className="p-3" method="dialog">
              <button className="btn text-2xl btn-sm btn-circle btn-ghost ml-[346px]">
                <AiOutlineClose />
              </button>
              <select placeholder="Write here" className="select select-bordered w-[358px]">
                <option>write here</option>
                <option>hi</option>
              </select>
              <textarea className="border rounded-md mt-5" placeholder="Write here" cols={40} rows={12}></textarea>
            </form>
          </div>
        </dialog>
        <input type="text" placeholder="Search?" className="w-80 h-8 rounded-md border-2" />
      </div>
      <div className="border-2 p-1">
        <h1 className="mt-[10px]">Today</h1>

        {transactions.map((transaction) => {
          return (
            <div key={transaction.id} className="w-[894px] h-[64px] flex gap-8 p-8 items-center border-2 mt-[35px] rounded-xl">
              <input type="checkbox" className="w-[24px] h-[24px] " />
              <h1>{transaction.category_name}</h1>
              <div className="flex flex-1 justify-between">
                <div>{transaction.description}</div>
                <div className="text-[#008000]">{transaction.amount}₮</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// transaction_id SERIAL PRIMARY KEY unique not null,
// user_id integer references users (user_id),
// title Text,
// amount Real not null,
// description TEXT,
// createdAt timestamp default now(),
// updatedAt timestamp default now()
