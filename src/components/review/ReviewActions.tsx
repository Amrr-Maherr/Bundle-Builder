type ReviewActionsProps = {
  total: number;
  isSaving: boolean;
  isSaved: boolean;
  onSave: () => void;
};

export function ReviewActions({
  total,
  isSaving,
  isSaved,
  onSave,
}: ReviewActionsProps) {
  return (
    <>
      <button
        type="button"
        disabled={total === 0}
        className="mt-[4px] w-full cursor-pointer rounded-[4px] bg-primary py-[13px] text-[17px] font-bold text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Checkout
      </button>
      <button
        type="button"
        onClick={onSave}
        disabled={isSaving}
        className="mt-[8px] cursor-pointer text-center text-xs italic text-[#484848] underline underline-offset-2 transition-colors hover:text-foreground disabled:opacity-50"
      >
        {isSaving ? "Saving..." : isSaved ? "Saved!" : "Save my system for later"}
      </button>
    </>
  );
}
