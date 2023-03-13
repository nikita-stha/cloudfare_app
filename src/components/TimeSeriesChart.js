import {
    Label,
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from "recharts";


export default function TimeSeriesChart(props){
    return (
        <div className="card">
            <h2>{props.title}</h2>
            <ResponsiveContainer width={"100%"} height={300} min-width={300}>
                <LineChart data={props.data} width={"100%"} height={300} min-width={300}
                margin={{
                    top: 10,
                     right: 30,
                    left: 20,
                    bottom: 30,
                }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="Date" domain={["dataMin", "dataMax"]}>
                        <Label value="Date" position="bottom"/>
                    </XAxis>
                    <YAxis yAxisId="1">
                        <Label
                        value="Value"
                        angle={-90}
                        position="left"
                        dy="-5"
                        />
                    </YAxis>
                    { props.multi && <YAxis yAxisId="2" orientation="right">
                        <Label
                        value="Value"
                        angle={-90}
                        position="right"
                        dy="-5"
                        />
                    </YAxis>}
                    
                    <Legend verticalAlign="top"/>
                    <Tooltip/>
                    <Line  yAxisId="1" dataKey="total" stroke="#8884d8" animationDuration={300}/>
                    {props.multi && <Line  yAxisId="2" dataKey="http" stroke="#82ca9d" animationDuration={300}/>}
                    
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}
