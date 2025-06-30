export interface PrivateLayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: PrivateLayoutProps) => {
  return (
    <div className="w-full min-h-screen flex flex-col bg-white">
      <div className="flex-1 w-full flex justify-center bg-white">
        <div className="w-full flex flex-col justify-center items-center">
          {children}
        </div>
      </div>
    </div>
  );
};
