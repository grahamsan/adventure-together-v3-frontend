interface FieldContainerProps {
  children: React.ReactNode;
  isTripList?: boolean;
}

export default function FieldContainer({
  children,
  isTripList,
}: FieldContainerProps) {
  return (
    <div className="flex justify-center items-center lg:w-[50vw] w-full h-auto py-6 px-4 mx-auto">
      <div
        className={`${
          isTripList
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            : "flex flex-col items-center gap-6 w-full max-w-[500px]"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
