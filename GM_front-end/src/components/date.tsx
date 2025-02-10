import { useState } from "react";

export default function DateDisplay() {
  const [date] = useState(new Date());
  return <p className=" font-mono text-[10px] text-gray-400">{date.toDateString()}</p>;
}