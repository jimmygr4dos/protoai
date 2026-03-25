export const LoadingState = ({ message }: { message: string }) => {
  return (
    <div className="proto-panel rounded-5 p-3 d-flex align-items-center gap-3">
      <div className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
      <span>{message}</span>
    </div>
  );
};


