import Image from "next/image";

export function Header() {
  return (
    <div className="flex items-center justify-between mb-12">
      <div className="flex items-center space-x-4">
        <Image
          src="https://assets.dailypay.com/wp-content/uploads/dailypay-logo.svg"
          alt="DailyPay Logo"
          width={180}
          height={40}
          priority
        />
        <h1 className="text-2xl font-bold text-[#FF4D2D]">Manager Portal</h1>
      </div>
    </div>
  );
}
