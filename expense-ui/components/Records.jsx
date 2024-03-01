import axios from "axios";
import { useEffect, useState } from "react";
export function Records() {
  const [transactions, setTransactions] = useState([]);
  const [amount, setAmount] = useState();
  const [description, setDescription] = useState("hello");
  const [title, setTitle] = useState("");

  function loadTasks() {
    axios.get("http://localhost:3005/transactions").then((response) => {
      setTransactions(response.data);
    });
  }

  function createNewTask() {
    axios
      .post("http://localhost:3005/transactions", {
        amount: amount,
        description: description,
        title: title,
        user_id: 1,
      })

      .then(() => {
        loadTasks();
      });
  }

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <div className="container flex  mx-auto p-5 gap-8  border xl:px-[250px]">
      <div className="flex border-2 p-3 flex-col gap-5">
        <div className="text-bold p-2 text-3xl">Records</div>
        <button className="w-80 h-10 text-white bg-[#0166FF] rounded-2xl" onClick={() => document.getElementById("my_modal_2").showModal()}>
          +Add
        </button>
        <dialog id="my_modal_2" className="modal">
          <div className="modal-box w-[750px] h-[444px]">
            <h3 className="font-bold text-lg">Add Record</h3>
            <button className="btn rounded-3xl hover:bg-[#0166FF]">Expense</button>
            <button className="btn rounded-3xl mb-7 hover:bg-[#0166FF]">Income</button>
            <p>Amount</p>
            <input id="1" type="text" title="Amount" placeholder="₮ 0000.0000" className="input input-bordered w-full max-w-xs" value={amount} onChange={(e) => setAmount(e.target.value)} />
            <p className=" mt-7">Catecory</p>
            <select value={title} onChange={(e) => setTitle(e.target.value)}>
              {" "}
              <option>html</option>
              <option>css</option>
              <option>javaScript</option>
            </select>{" "}
            <br />
            <input type="text" title="Amount" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Note" className="input input-bordered w-full max-w-xs" />
            <button className="w-80 h-10 text-white bg-[#0166FF] mt-7 rounded-2xl" onClick={createNewTask}>
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
            <div key={transaction.id} className="w-[894px] h-[64px] flex justify-between items-center border-2 mt-[35px] rounded-xl">
              <input type="checkbox" className="w-[24px] h-[24px] " />
              <h1>{transaction.title}</h1>
              <div className="text-[#008000]">{transaction.amount}₮</div>
              <div>{transaction.description}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
