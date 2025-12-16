export default function Error500() {
  return (
    <div class="container flex items-center mx-auto mt-20">
      <div class="flex flex-col items-center max-w-sm mx-auto text-center">
        <p class="p-3 text-sm font-medium text-red-500 rounded-full bg-red-50 ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
            />
          </svg>
        </p>
        <h1 class="mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl">
          ERROR 500
        </h1>
        <p class="mt-4 text-gray-500 dark:text-gray-400">
          Error 500: Error interno del servidor. Algo salió mal.
        </p>
      </div>
    </div>
  );
}
