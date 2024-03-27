type InfoCardProps = {
  title: string;
  content: string | JSX.Element;
  className?: string;
};

const InfoCard: React.FC<InfoCardProps> = ({
  title,
  content,
  className = '',
}) => {
  return (
    <div
      className={`flex flex-col gap-[10px] w-[628px] h-[293px] px-[57px] py-[52px] box-border ${className}`}
    >
      <h4 className="font-bold text-[36px] text-white mb-6">{title}</h4>
      {typeof content === 'string' ? (
        <p className="text-xl text-white font-light">{content}</p>
      ) : (
        content
      )}
    </div>
  );
};

export default InfoCard;
