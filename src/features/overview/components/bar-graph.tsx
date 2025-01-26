'use client';

import * as React from 'react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';

export const description = 'A warehouse inventory tracking chart';

const chartData = [
  { date: '2024-04-01', in: 22, out: 15 },
  { date: '2024-04-02', in: 9, out: 18 },
  { date: '2024-04-03', in: 16, out: 12 },
  { date: '2024-04-04', in: 24, out: 26 },
  { date: '2024-04-05', in: 37, out: 29 },
  { date: '2024-04-06', in: 30, out: 34 },
  { date: '2024-04-07', in: 25, out: 18 },
  { date: '2024-04-08', in: 40, out: 32 },
  { date: '2024-04-09', in: 5, out: 11 },
  { date: '2024-04-10', in: 26, out: 19 },
  { date: '2024-04-11', in: 32, out: 35 },
  { date: '2024-04-12', in: 29, out: 21 },
  { date: '2024-04-13', in: 34, out: 38 },
  { date: '2024-04-14', in: 13, out: 22 },
  { date: '2024-04-15', in: 12, out: 17 },
  { date: '2024-04-16', in: 13, out: 19 },
  { date: '2024-04-17', in: 44, out: 36 },
  { date: '2024-04-18', in: 36, out: 41 },
  { date: '2024-04-19', in: 24, out: 18 },
  { date: '2024-04-20', in: 8, out: 15 },
  { date: '2024-04-21', in: 13, out: 20 },
  { date: '2024-04-22', in: 22, out: 17 },
  { date: '2024-04-23', in: 13, out: 23 },
  { date: '2024-04-24', in: 38, out: 29 },
  { date: '2024-04-25', in: 21, out: 25 },
  { date: '2024-04-26', in: 7, out: 13 },
  { date: '2024-04-27', in: 38, out: 42 },
  { date: '2024-04-28', in: 12, out: 18 },
  { date: '2024-04-29', in: 31, out: 24 },
  { date: '2024-04-30', in: 45, out: 38 },
  { date: '2024-05-01', in: 16, out: 22 },
  { date: '2024-05-02', in: 29, out: 31 },
  { date: '2024-05-03', in: 24, out: 19 },
  { date: '2024-05-04', in: 38, out: 42 },
  { date: '2024-05-05', in: 48, out: 39 },
  { date: '2024-05-06', in: 49, out: 52 },
  { date: '2024-05-07', in: 38, out: 30 },
  { date: '2024-05-08', in: 14, out: 21 },
  { date: '2024-05-09', in: 22, out: 18 },
  { date: '2024-05-10', in: 29, out: 33 },
  { date: '2024-05-11', in: 33, out: 27 },
  { date: '2024-05-12', in: 19, out: 24 },
  { date: '2024-05-13', in: 19, out: 16 },
  { date: '2024-05-14', in: 44, out: 49 },
  { date: '2024-05-15', in: 47, out: 38 },
  { date: '2024-05-16', in: 33, out: 40 },
  { date: '2024-05-17', in: 49, out: 42 },
  { date: '2024-05-18', in: 31, out: 35 },
  { date: '2024-05-19', in: 23, out: 18 },
  { date: '2024-05-20', in: 17, out: 23 },
  { date: '2024-05-21', in: 8, out: 14 },
  { date: '2024-05-22', in: 8, out: 12 },
  { date: '2024-05-23', in: 25, out: 29 },
  { date: '2024-05-24', in: 29, out: 22 },
  { date: '2024-05-25', in: 20, out: 25 },
  { date: '2024-05-26', in: 21, out: 17 },
  { date: '2024-05-27', in: 42, out: 46 },
  { date: '2024-05-28', in: 23, out: 19 },
  { date: '2024-05-29', in: 7, out: 13 },
  { date: '2024-05-30', in: 34, out: 28 },
  { date: '2024-05-31', in: 17, out: 23 },
];


const chartConfig = {
  views: {
    label: 'Total'
  },
  in: {
    label: 'IN',
    color: 'hsl(var(--chart-1))'
  },
  out: {
    label: 'OUT',
    color: 'hsl(var(--chart-2))'
  }
} satisfies ChartConfig;

export function BarGraph() {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>('in');

  const total = React.useMemo(
    () => ({
      in: chartData.reduce((acc, curr) => acc + curr.in, 0),
      out: chartData.reduce((acc, curr) => acc + curr.out, 0)
    }),
    []
  );

  return (
    <Card>
      <CardHeader className='flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row'>
        <div className='flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6'>
          <CardTitle>Shipments</CardTitle>
          <CardDescription>
            Showing total shipment for the last 3 months
          </CardDescription>
        </div>
        <div className='flex'>
          {['in', 'out'].map((key) => {
            const chart = key as keyof typeof chartConfig;
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className='relative flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6'
                onClick={() => setActiveChart(chart)}
              >
                <span className='text-xs text-muted-foreground'>
                  {chartConfig[chart].label}
                </span>
                <span className='text-lg font-bold leading-none sm:text-3xl'>
                  {total[key as keyof typeof total].toLocaleString()}
                </span>
              </button>
            );
          })}
        </div>
      </CardHeader>
      <CardContent className='px-2 sm:p-6'>
        <ChartContainer
          config={chartConfig}
          className='aspect-auto h-[280px] w-full'
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey='date'
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric'
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className='w-[150px]'
                  nameKey='views'
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    });
                  }}
                />
              }
            />
            <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
