import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { render } from "@react-email/render";
import { ReactElement } from "react";

export const renderEmailTemplate = async <T extends object>(
  Component: React.FC<T>,
  props: T
): Promise<string> => {
  return await render(Component(props) as ReactElement, {
    pretty: true,
  });
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
