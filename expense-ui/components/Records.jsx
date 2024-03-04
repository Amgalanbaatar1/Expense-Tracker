import axios from "axios";
import { useEffect, useState } from "react";
export function Records() {
  const [transactions, setTransactions] = useState([]);
  const [amount, setAmount] = useState();
  const [description, setDescription] = useState("hi");
  const [category, setCategory] = useState("");

  function loadTransaction() {
    axios.get("http://localhost:3005/transactions").then((response) => {
      setTransactions(response.data);
    });
  }

  function loadCategory() {
    axios.get("http://localhost:3005/transactions").then((response) => {
      setTransactions(response.data);
    });
  }

  function createCategory() {
    axios
      .post("http://localhost:3005/categories", {
        category_name: setCategory,
        id: 1,
      })

      .then(() => {
        loadCategory();
      });
  }

  function createTransaction() {
    axios
      .post("http://localhost:3005/transactions", {
        amount: amount,
        description: description,
        category_name: setCategory,
        user_id: 1,
      })

      .then(() => {
        loadTransaction();
      });
  }

  useEffect(() => {
    loadTransaction();
  }, []);

  useEffect(() => {
    loadTransaction();
  }, []);

  return (
    <div className="container flex  mx-auto p-5 gap-8  border xl:px-[250px]">
      <div className="flex border-2 p-3 flex-col gap-5">
        <div className="text-bold p-2 text-3xl">Records</div>
        <button className="w-80 h-10 text-white bg-[#0166FF] rounded-2xl" onClick={() => document.getElementById("my_modal_2").showModal()}>
          +Add
        </button>
        <dialog id="my_modal_2" className="modal">
          <div className="  modal-box w-[750px] h-[444px]">
            <h3 className="font-bold text-lg">Add Record</h3>
            <button className="btn rounded-1xl hover:bg-[#0166FF]">Expense</button>
            <button className="btn rounded-1xl mb-7 hover:bg-[#16A34A]">Income</button>
            <p>Amount</p>
            <input id="1" type="text" title="Amount" placeholder="₮ 0000.0000" className="input input-bordered w-full max-w-xs" value={amount} onChange={(e) => setAmount(e.target.value)} />
            <p className="mt-3">Catecory</p>
            <select className="input input-bordered w-full max-w-xs" value={category} onChange={(e) => setCategory(e.target.value)}>
              <option>Food & Drinks</option>
              <option>css</option>
              <option>javaScript</option>
            </select>
            <br />
            <p className="mt-3">Note</p>
            <input type="text" title="Amount" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Note" className="input input-bordered w-full max-w-xs" />
            <button className="w-80 h-10 text-white bg-[#0166FF] mt-7 rounded-2xl" onClick={createTransaction}>
              Add Record
            </button>
          </div>

          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
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
