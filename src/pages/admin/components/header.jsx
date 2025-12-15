import { Version } from "../../../mock/version";

export default function Header() {
  return (
    <div className="flex">
      <div>
        <h1 className="mb-8 text-3xl font-extrabold leading-none tracking-tight text-gray-600 ">
          ✅ Registros <strong>{Version}</strong>
        </h1>
      </div>
    </div>
  );
}
