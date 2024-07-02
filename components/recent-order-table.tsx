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

export function RecentOrderTable() {
  return (
    <div className="border shadow-sm rounded-lg p-2">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Order</TableHead>
            <TableHead className="min-w-[150px]">Customer</TableHead>
            <TableHead className="hidden md:table-cell">Channel</TableHead>
            <TableHead className="hidden md:table-cell">Date</TableHead>
            <TableHead className="text-right">Total</TableHead>
            <TableHead className="hidden sm:table-cell">Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">#3210</TableCell>
            <TableCell>Olivia Martin</TableCell>
            <TableCell className="hidden md:table-cell">Online Store</TableCell>
            <TableCell className="hidden md:table-cell">
              February 20, 2022
            </TableCell>
            <TableCell className="text-right">$42.25</TableCell>
            <TableCell className="hidden sm:table-cell">Shipped</TableCell>
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoveHorizontalIcon className="w-4 h-4" />
                    <span className="sr-only">Actions</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>View order</DropdownMenuItem>
                  <DropdownMenuItem>Customer details</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
