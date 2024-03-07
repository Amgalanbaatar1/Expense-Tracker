import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";

export function Cards() {
  return (
    <div className="flex justify-between">
      <div className="flex gap-4 items-center  ">
        <div className=" w-8 flex justify-center items-center rounded bg-slate-200 h-8">
          <FaAngleLeft />
        </div>
        <p>Last 30 Days</p>
        <div className=" w-8 flex justify-center items-center rounded bg-slate-200 h-8">
          <FaAngleRight />
        </div>
      </div>
      <div>
        <select className="select select-bordered w-full max-w-xs">
          <option disabled selected>
            Newest fisrt
          </option>
          <option>Han Solo</option>
          <option>Greedo</option>
        </select>
      </div>
    </div>
  );
}
