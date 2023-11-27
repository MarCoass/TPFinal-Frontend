export default function CustomSpinner({ mensaje }) {
  return (
    <div
      className="inline-block h-[5rem] w-[5rem] animate-spin rounded-full border-8 border-solid border-current border-r-transparent text-lila-500 align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
      role="status">
      <span
        className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
      >{mensaje}</span>
    </div>

  );
}
