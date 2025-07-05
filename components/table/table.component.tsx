import { cn } from "@/utils";
import { ReactNode } from "react";
import styles from "./table.module.scss";

export function Table({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={styles.tableContainer}>
      <table className={cn(styles.table, className)}>{children}</table>
    </div>
  );
}

export function TableHeader({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <thead className={cn(styles.table__header, className)}>{children}</thead>
  );
}

export function TableBody({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <tbody className={cn(styles.table__body, className)}>{children}</tbody>
  );
}

export function TableRow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <tr className={cn(styles.table__row, className)}>{children}</tr>;
}

export function TableHead({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <th className={cn(styles.table__head, className)}>{children}</th>;
}

export function TableCell({
  children,
  className,
  colSpan,
}: {
  children: ReactNode;
  className?: string;
  colSpan?: number;
}) {
  return (
    <td className={cn(styles.table__cell, className)} colSpan={colSpan}>
      {children}
    </td>
  );
}

export function TableFooter({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <tfoot className={cn(styles.table__footer, className)}>{children}</tfoot>
  );
}
