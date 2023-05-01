import dynamic from "next/dynamic";

export default dynamic(import("./Graph"), {ssr: false})