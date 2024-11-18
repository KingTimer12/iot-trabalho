import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  XAxis,
} from 'recharts';
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from './ui/chart';

const chartConfig = {
  profit: {
    label: 'Lucro',
    color: '#2563eb',
  },
  units: {
    label: 'Unidades',
    color: '#2563eb',
  },
} satisfies ChartConfig;

//#region cor do pie
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
//#endregion

const Charts = ({
  data,
  type = 'bar',
  dataKey,
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
}: { data: any[]; type: 'bar' | 'pie'; dataKey: string }) => {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      {type === 'bar' ? (
        <BarChart accessibilityLayer data={data}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar dataKey={dataKey} fill="var(--color-profit)" radius={4} />
        </BarChart>
      ) : (
        <PieChart>
          <Pie
            nameKey="name"
            dataKey={dataKey}
            fill="#4ade80"
            data={data}
            labelLine={false}
            label={renderCustomizedLabel}
          >
            {data.map((entry) => (
              <Cell
                key={entry.name} // Assuming 'name' is a unique identifier in your data
                fill={COLORS[data.indexOf(entry) % COLORS.length]}
              />
            ))}
          </Pie>
          <ChartTooltip content={<ChartTooltipContent />} />
        </PieChart>
      )}
    </ChartContainer>
  );
};

export { Charts };
