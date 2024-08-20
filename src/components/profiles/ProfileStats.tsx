"use client"

import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

import { type Profile, CompleteProfile } from "@/lib/db/schema/profiles";

const chartConfig = {
    salary: {
        label: "Salario",
        color: "hsl(var(--chart-1))",
    },
    label: {
        color: "hsl(var(--background))",
    },
} satisfies ChartConfig

export function ProfileStats({
    profiles,

}: {
    profiles: CompleteProfile[];

}) {

    const totalSalary = profiles.reduce((sum, profile) => sum + profile.salary, 0);
    const averageSalary = totalSalary / profiles.length;


    return (
        <Card>
            <CardHeader>
                <CardTitle>💵 Salarios</CardTitle>
                <CardDescription>
                    El promedio de los salarios es de ${averageSalary}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart
                        accessibilityLayer
                        data={profiles}
                        layout="vertical"
                        margin={{
                            right: 40,
                        }}
                    >
                        <CartesianGrid horizontal={false} />
                        <YAxis
                            dataKey="name"
                            type="category"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value: any) => value.slice(0, 3)}
                            hide
                        />
                        <XAxis dataKey="salary" type="number" hide />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="line" />}
                        />
                        <Bar
                            dataKey="salary"
                            layout="vertical"
                            fill="darkblue"
                            radius={4}
                        >
                            <LabelList
                                dataKey="salary"
                                position="right"
                                offset={8}
                                className="fill-foreground"
                                fontSize={12}
                            />
                        </Bar>
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}