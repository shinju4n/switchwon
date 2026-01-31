interface PageHeaderProps {
  title: string;
  description: string;
}
export const PageHeader = ({ title, description }: PageHeaderProps) => {
  return (
    <div className="flex flex-col gap-2 px-20 pt-10 pb-4">
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="text-lg text-gray-700">{description}</p>
    </div>
  );
};
