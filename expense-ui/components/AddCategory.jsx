import axios from "axios";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useEffect, useState } from "react";
import { LuPlus } from "react-icons/lu";
import { SeeIcon } from "@/public/SeeIcon";

export function AddCategory() {
  const [categories, setcategories] = useState([]);
  const [name, setName] = useState([]);

  function loadCategory() {
    axios.get("http://localhost:3005/categories").then((response) => {
      setcategories(response.data);
    });
  }

  function createCategory() {
    axios
      .post("http://localhost:3005/categories", {
        name: name,
      })
      .then(() => {
        loadCategory();
      })
      .catch((error) => {
        console.log(error);
      });
    closeModal();
  }

  useEffect(() => {
    loadCategory();
  }, []);

  const closeModal = () => {
    return document.getElementById("my_modal_3").close();
  };
  function deleteCategory(id) {
    if (confirm("Delete?")) {
      axios.delete(`http://localhost:3005/categories/${id}`).then(() => {
        loadCategory();
      });
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <b>Types</b>
      <div className="flex flex-col gap-3">
        <div className="flex gap-3  items-center">
          <input type="checkbox" defaultChecked className="checkbox checkbox-xs" />
          <p>All</p>
        </div>
        <div className="flex gap-3  items-center">
          <input type="checkbox" defaultChecked className="checkbox checkbox-xs" />
          <p>Income</p>
        </div>

        <div className="flex gap-3  items-center">
          <input type="checkbox" defaultChecked className="checkbox checkbox-xs" />
          <p>Expense</p>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <div className="text-blue-600 text-2xl">
          <LuPlus />
        </div>
        <button onClick={() => document.getElementById("my_modal_4").showModal()}>Add Category</button>

        <dialog id="my_modal_4" className="modal">
          <div className="modal-box p-8">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>
            <h3 className="font-bold text-lg">Add Category</h3>
            <div className="flex mt-3 gap-3 ">
              <select className="select select-bordered w-5 max-w-xs">
                <option disabled selected>
                  Who shot first?
                </option>
                <option>Han Solo</option>
                <option>Greedo</option>
              </select>
              <input type="text" placeholder="Write Category name..." className="border h-[50px] p-2 rounded-lg w-[315px]" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <button className="w-80 h-10 ml-[69px] text-white bg-green-500 mt-7 rounded-3xl" onClick={createCategory}>
              Add Category
            </button>
          </div>
        </dialog>
      </div>

      {categories.map((category) => {
        return (
          <div key={category.id} className=" bg-white flex gap-8 items-center  ">
            <div className="flex flex-1 justify-between">
              <div className="flex justify-center items-center gap-3">
                <SeeIcon />
                <p>{category.name}</p>
              </div>
            </div>
            <RiDeleteBin6Line onClick={() => deleteCategory(category.id)} />
          </div>
        );
      })}
    </div>
  );
}
