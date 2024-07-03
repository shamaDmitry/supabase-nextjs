import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import MoveHorizontalIcon from "@/components/icons/MoveHorizontalIcon";
import { createClient } from "@/utils/supabase/server";
import { format } from "date-fns";
import Link from "next/link";

const getData = async () => {
  const supabase = createClient();
  const { data } = await supabase
    .from("orders")
    .select("*, customers(*)")
    .order("order_number", { ascending: true });
  return data || [];
};

export async function RecentOrderTable() {
  const data = await getData();

  return (
    <div className="border shadow-sm rounded-lg p-2">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Order</TableHead>
            <TableHead className="min-w-[150px]">Customer</TableHead>
            <TableHead className="hidden md:table-cell">Date</TableHead>
            <TableHead className="text-right">Total</TableHead>
            <TableHead className="hidden sm:table-cell">Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((row) => {
            return (
              <TableRow key={row.id}>
                <TableCell className="font-medium">
                  #{row.order_number}
                </TableCell>

                <TableCell>{row.name}</TableCell>

                <TableCell className="hidden md:table-cell">
                  {format(row.created_at, "MMMM dd, yyyy")}
                </TableCell>

                <TableCell className="text-right">${row.price}</TableCell>

                <TableCell className="hidden sm:table-cell capitalize">
                  {row.status}
                </TableCell>

                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoveHorizontalIcon className="w-4 h-4" />
                        <span className="sr-only">Actions</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Link href={`/orders/${row.id}`}>View order</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link href={`/customers/${row.customers.id}`}>
                          Customer details
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
