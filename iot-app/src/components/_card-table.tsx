import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';

interface CardTableProps {
  title: string;
  caption?: string;
  fields: {
    label: string;
    identifier: string;
    type?: 'id' | 'text' | 'number' | 'currency';
  }[];
  data?: { [key: string]: string | number | boolean }[];
}

const CardTable = ({ title, caption, fields, data = [] }: CardTableProps) => {
  return (
    <div className="w-full">
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            {caption && <TableCaption>{caption}</TableCaption>}
            <TableHeader>
              <TableRow>
                {fields.map((field, idx) => (
                  <TableHead
                    // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                    key={idx}
                    className={field.type === 'id' ? 'w-[100px]' : ''}
                  >
                    {field.label}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((row, index) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                <TableRow key={index}>
                  {fields.map((field) => (
                    <TableCell key={field.identifier}>
                      {field.type === 'currency'
                        ? `R$${row[field.identifier]}`
                        : row[field.identifier]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export { CardTable };
