import {
  ReactNode,
  Fragment,
  ThHTMLAttributes,
  useCallback,
  useMemo,
} from "react";
import {
  FaSortDown,
  FaSortUp,
  FaSort,
  FaAngleDown,
  FaAngleRight,
  FaArrowCircleDown,
} from "react-icons/fa";
import { twMerge } from "tailwind-merge";
import {
  SortDirection,
  ExpandedRow,
  ExpandedInstance,
  Row,
  RowData,
  flexRender,
  Table,
} from "@tanstack/react-table";
import { match, P } from "ts-pattern";
import { ButtonProps, Button } from "react-daisyui";
import { useTranslation } from "react-i18next";
import Skeleton from "react-loading-skeleton";
import { clsx } from "clsx";

type IProps = ThHTMLAttributes<HTMLTableCellElement>;
export const TbodyLoader = ({
  colSpan,
  count = 3,
}: {
  colSpan: number;
  count?: number;
}) => {
  return (
    <tbody>
      <tr>
        <td colSpan={colSpan}>
          <Skeleton count={count} />
        </td>
      </tr>
    </tbody>
  );
};

export const StickyTh = ({ className, children, ...props }: IProps) => {
  return (
    <th
      {...props}
      className={twMerge("z-10 sticky top-0 select-none", className)}
    >
      {children}
    </th>
  );
};
export const Sorter = ({ isSorted }: { isSorted?: false | SortDirection }) => {
  if (isSorted === "desc") {
    return <FaSortDown className="inline-block " />;
  } else if (isSorted === "asc") {
    return <FaSortUp className="inline-block" />;
  } else {
    return <FaSort className="opacity-75 inline-block" />;
  }
};
export const Expander = ({ isExpanded }: { isExpanded: boolean }) => {
  if (isExpanded) {
    return <FaAngleDown className="inline-block" />;
  } else {
    return <FaAngleRight className="inline-block" />;
  }
};
export const ExpanderCell = ({
  row: { getIsExpanded, toggleExpanded },
}: {
  row: ExpandedRow;
}) => {
  const handleToggle = useCallback(() => {
    toggleExpanded();
  }, [toggleExpanded]);
  return (
    <td onClick={handleToggle} className="cursor-pointer w-12">
      <Expander isExpanded={getIsExpanded()} />
    </td>
  );
};
export const ExpanderColumnDef = {
  header: "",
  id: "expander",
  cell: ExpanderCell,
};

export const ExpanderHeader = ({
  instance: { toggleAllRowsExpanded, getIsAllRowsExpanded },
}: {
  // eslint-disable-next-line
  instance: ExpandedInstance<any>;
}) => {
  const handleToggle = useCallback(() => {
    toggleAllRowsExpanded();
  }, [toggleAllRowsExpanded]);
  return (
    <div onClick={handleToggle} className="cursor-pointer">
      <Expander isExpanded={getIsAllRowsExpanded()} />
    </div>
  );
};

export const ExpanderBtn = ({
  toggleExpanded,
  getIsExpanded,
}: {
  toggleExpanded: () => void;
  getIsExpanded: () => boolean;
}) => {
  const handleToggle = useCallback(() => {
    toggleExpanded();
  }, [toggleExpanded]);
  return (
    <Button color="ghost" onClick={handleToggle} size="sm">
      <Expander isExpanded={getIsExpanded()} />
    </Button>
  );
};
export const TdCellFn = ({
  className,
  hasTitle,
}: { className?: string; hasTitle?: boolean } = {}) => {
  const TdCell = (info: { getValue: () => unknown }) => {
    const value = info.getValue() as string | number | null | undefined;
    const title = typeof value === "number" ? `${value}` : value || undefined;
    if (hasTitle) {
      return (
        <td title={title} className={className}>
          {value}
        </td>
      );
    } else {
      return <td className={className}>{value}</td>;
    }
  };
  return TdCell;
};
export const TheadEx = <T extends RowData>({
  className,
  table,
  thClassName,
}: {
  className?: string;
  table: Table<T>;
  thClassName?: string;
}) => {
  return (
    <thead className={className}>
      {table.getHeaderGroups().map((headerGroup) => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <StickyTh
              className={thClassName}
              key={header.id}
              onClick={header.column.getToggleSortingHandler()}
            >
              {header.column.getCanSort() && (
                <Sorter isSorted={header.column.getIsSorted()} />
              )}
              {flexRender(header.column.columnDef.header, header.getContext())}
            </StickyTh>
          ))}
        </tr>
      ))}
    </thead>
  );
};
export const TbodyEx = <T extends RowData>({
  className,
  table,
  pending,
  emptyAlert,
  expandedRowRender,
  mobileRowRender,
}: {
  className?: string;
  table: Table<T>;
  pending?: boolean;
  emptyAlert?: ReactNode;
  expandedRowRender?: (row: Row<T>) => JSX.Element;
  mobileRowRender?: (row: Row<T>) => JSX.Element;
}) => {
  const colSpan = useMemo(
    () => table.getHeaderGroups()[0].headers.length,
    [table]
  );
  if (pending) {
    return <TbodyLoader colSpan={colSpan} />;
  } else {
    const { rows } = table.getRowModel();
    if (rows.length === 0 && emptyAlert !== undefined) {
      return (
        <tr>
          <td colSpan={colSpan}>{emptyAlert}</td>
        </tr>
      );
    } else {
      return (
        <tbody className={className}>
          {rows.map((row) => (
            <Fragment key={row.id}>
              {mobileRowRender && (
                <tr className="md:hidden">
                  <td colSpan={colSpan}>{mobileRowRender(row)}</td>
                </tr>
              )}
              <tr
                className={clsx({
                  ["hidden md:table-row"]: !!mobileRowRender,
                })}
              >
                {row.getVisibleCells().map((cell) => (
                  <Fragment key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Fragment>
                ))}
              </tr>
              {row.getIsExpanded() && expandedRowRender && (
                <tr>
                  <td></td>
                  <td colSpan={colSpan - 1}>{expandedRowRender(row)}</td>
                </tr>
              )}
            </Fragment>
          ))}
        </tbody>
      );
    }
  }
};

export const LoadMoreBtn = ({
  variant = "outline",
  color = "info",
  endIcon = <FaArrowCircleDown />,
  ...props
}: Omit<ButtonProps, "fullWidth">) => {
  const { t } = useTranslation("boilerplate");

  return (
    <Button
      {...props}
      variant={variant}
      color={color}
      fullWidth={true}
      endIcon={endIcon}
    >
      {t("load_more")}
    </Button>
  );
};

export const LoadMoreBtnForInfinite = ({
  setSize,
  hasNext,
  isValidating,
}: {
  setSize: (val: (size: number) => number) => unknown;
  hasNext?: boolean;
  isValidating?: boolean;
}) => {
  const handleClick = useCallback(() => {
    setSize((size) => size + 1);
  }, [setSize]);
  if (hasNext) {
    return <LoadMoreBtn loading={isValidating} onClick={handleClick} />;
  } else {
    return null;
  }
};
