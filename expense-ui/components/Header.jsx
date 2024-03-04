import { Logo } from "@/public/headerLogo";

export function Header() {
  return (
    <div className=" sticky top-0 z-10  justify-between flex gap-5 container mx-auto border px-5 py-5 xl:py-8 xl:px-[250px] ">
      <div className="flex gap-5">
        <Logo />
        <h2>Dashboard</h2>
        <b>Records</b>
      </div>
      <div className="flex gap-5">
        <button className="btn btn-primary rounded-3xl">+ Records</button>
        <div className="avatar">
          <div className="w-10 h-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
          </div>
        </div>
      </div>
    </div>
  );
}
