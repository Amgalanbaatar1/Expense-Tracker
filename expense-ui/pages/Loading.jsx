import { Logo } from "@/public/HeaderLogo";

export function Loading() {
  return (
    <div className=" flex flex-col gap-5 items-center justify-center mt-80">
      <div className="flex gap-3">
        <Logo />
        <p className="font-extrabold text-xl ">Geld</p>
      </div>
      <span className="loading text-[#0166FF] loading-spinner "></span>
      <p className="font-bold">Түр хүлээнэ үү...</p>
    </div>
  );
}
