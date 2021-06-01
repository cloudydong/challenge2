import React from "react";

interface IButtonProps {
  canClick: boolean;
  loading: boolean;
  actionText: string;
}

export const Button: React.FC<IButtonProps> = ({
  canClick,
  loading,
  actionText,
}) => (
  <button
    className={`text-white py-3 transition-colors ${
      canClick
        ? "bg-rallyGreen hover:bg-rallyGreen-dark"
        : "bg-rallyGreen-light opacity-50 pointer-events-none"
    }`}
  >
    {loading ? "...로딩중" : actionText}
  </button>
);
