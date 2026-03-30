export default function FilterButton({ label }: { label: string }) {

  return (

    <button className="rounded-full border border-orange-300 px-4 py-2 text-sm text-foreground hover:bg-orange-500/10">

      {label}

    </button>

  );

}

