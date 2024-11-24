import { CardTable, Charts } from '@/components';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { type DashboardData, useDashboard } from '@/stories';
import WebSocket from '@tauri-apps/plugin-websocket';
import { useEffect } from 'react';

const Home = () => {
  const {
    setData,
    data: {
      cards = [],
      sellers = [],
      charts: { profitMonthData = [], typesData = [], unitsSoldMonthData = [] },
    },
  } = useDashboard();

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    let ws: WebSocket | null = null;

    const connectWebSocket = async () => {
      ws = await WebSocket.connect('ws://127.0.0.1:80');

      ws.addListener((msg) => {
        if (typeof msg.data === 'string') {
          const data = JSON.parse(msg.data) as DashboardData;
          console.log(data);
          setData(data);
        }
      });

      ws.send(JSON.stringify({ data: { application: 'app-desktop' } }));
    };

    connectWebSocket();

    return () => {
      if (ws) {
        ws.disconnect();
      }
    };
  }, []);

  return (
    <section className="flex flex-col justify-center items-center gap-4">
      <div className="grid grid-cols-9 *:col-span-3 gap-4 *:p-2">
        {cards.map(({ title, value, prefix, suffix }) => (
          <Card
            key={title}
            className="flex flex-col justify-center items-center"
          >
            <CardHeader>
              <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="flex gap-1">
                <p>{prefix}</p>
                <p>
                  {Number.isNaN(Number(value))
                    ? value
                    : Number(value).toLocaleString('pt-BR')}
                </p>
                <p>{suffix}</p>
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid grid-cols-3 *:col-span-1 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Lucro Mensal</CardTitle>
          </CardHeader>
          <CardContent>
            <Charts data={profitMonthData} type="bar" dataKey="profit" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Unidades Vendidas pelos Meses</CardTitle>
          </CardHeader>
          <CardContent>
            <Charts data={unitsSoldMonthData} type="bar" dataKey="units" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Sabores Mais Vendidos</CardTitle>
          </CardHeader>
          <CardContent>
            <Charts data={typesData} type="pie" dataKey="value" />
          </CardContent>
        </Card>
      </div>
      <CardTable
        title="Vendedores Ativos"
        fields={[
          { label: 'Id', identifier: 'id', type: 'id' },
          { label: 'Nome', identifier: 'name', type: 'text' },
          {
            label: 'Unidades vendidas',
            identifier: 'unitsSold',
            type: 'number',
          },
          { label: 'Faltam', identifier: 'toFinish', type: 'number' },
          { label: 'Lucro', identifier: 'profit', type: 'currency' },
        ]}
        data={sellers}
        caption="Lista de vendedores ativos no momento"
      />
    </section>
  );
};

export default Home;
