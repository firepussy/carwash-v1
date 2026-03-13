import { cn } from "@/lib/utils";
import { HTMLAttributes, TableHTMLAttributes } from "react";

export const Table = (props: TableHTMLAttributes<HTMLTableElement>) => <table className="w-full text-sm" {...props} />;
export const THead = (props: HTMLAttributes<HTMLTableSectionElement>) => <thead className="text-left text-slate-500" {...props} />;
export const TBody = (props: HTMLAttributes<HTMLTableSectionElement>) => <tbody {...props} />;
export const TR = ({ className, ...props }: HTMLAttributes<HTMLTableRowElement>) => <tr className={cn("border-b", className)} {...props} />;
export const TH = ({ className, ...props }: HTMLAttributes<HTMLTableCellElement>) => <th className={cn("p-3 font-medium", className)} {...props} />;
export const TD = ({ className, ...props }: HTMLAttributes<HTMLTableCellElement>) => <td className={cn("p-3", className)} {...props} />;
