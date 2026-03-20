import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Studio" },
    {
      name: "description",
      content: "Editorial site starter for photographers and artists.",
    },
  ];
}

export default function Home() {
  return <Welcome />;
}
