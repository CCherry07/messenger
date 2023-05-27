export const EmptyState = () => {
  return (
    <div
      className="
      px-4
      py-10
      sm:px-6
      lg:px-8
      h-screen
      flex
      justify-center
      items-center
      bg-gray-100
    "
    >
      <div className="text-center items-center flex flex-col">
        <h3
          className="
            mt-2
            text-2xl
            font-bold
            text-gray-900
          "
        >
          No data found
        </h3>
      </div>
    </div>
  );
};

export default EmptyState;
