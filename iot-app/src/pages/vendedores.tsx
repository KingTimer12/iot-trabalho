import { DataTable } from '@/components';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { ColumnDef, ColumnFiltersState } from '@tanstack/react-table';
import { fetch } from '@tauri-apps/plugin-http';
import { MoreHorizontal } from 'lucide-react';
import { useEffect, useState } from 'react';

type Sellers = {
  id: string;
  name: string;
  status: 'ativo' | 'inativo';
};

const columns: ColumnDef<Sellers>[] = [
  {
    id: 'actions',
    cell: () => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Editar</DropdownMenuItem>
            <DropdownMenuItem className="bg-destructive/80 text-destructive-foreground">
              Deletar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
  {
    accessorKey: 'id',
    header: 'Id',
  },
  {
    accessorKey: 'name',
    header: 'Nome',
  },
  {
    accessorKey: 'ativo',
    header: 'Status',
    cell: ({ row }) => {
      const data = row.getValue<boolean>('ativo');

      return <div>{data ? 'Ativo' : 'Inativo'}</div>;
    },
  },
];

const Vendedores = () => {
  const [data, setData] = useState<Sellers[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:80/vendedores', {
          method: 'GET',
        });
        const { data } = await response.json();
        setData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="flex flex-col justify-center items-center gap-4">
      <DataTable columns={columns} data={data} title="Vendedores" />
    </section>
  );
};

export default Vendedores;
