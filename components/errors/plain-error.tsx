import { FC } from "react";

interface PlainErrorProps {
  message: string | undefined;
}

const PlainError: FC<PlainErrorProps> = ({ message }) => {
  return <span className="text-sm text-red-500">{message}</span>;
};

export default PlainError;
