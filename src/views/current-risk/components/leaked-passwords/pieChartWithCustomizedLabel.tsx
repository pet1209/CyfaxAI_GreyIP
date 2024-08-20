import React from 'react';  
import { PieChart, Pie, Cell, ResponsiveContainer, Layer, Line, Text } from 'recharts';  
import useDetailReport from "@/views/current-risk/hooks/useDetailReport";  

const COLORS = ["#390039", "#720072", "#ab00ab"];  
const RADIAN = Math.PI / 180;  

interface CustomLabelProps {  
  cx: number;  
  cy: number;  
  midAngle: number;  
  outerRadius: number;  
  percent: number;  
  index: number;  
  value: number;  
  color: string;  
}  

const sliceBorderWidth = 3;

const renderCustomizedLabel = ({   
  cx,   
  cy,   
  midAngle,   
  outerRadius,   
  value,   
  index,   
  color   
}: CustomLabelProps) => {  
  const radius = outerRadius - sliceBorderWidth / 2;  
  const lineLength = 20; // Extend the line outward from the slice edge  
  const totalRadius = radius + lineLength;  
  const radian = RADIAN; // Use the RADIAN constant already defined  
  const sin = Math.sin(-midAngle * radian);  
  const cos = Math.cos(-midAngle * radian);  

  const lineStartX = cx + radius * cos;  
  const lineStartY = cy + radius * sin;  

  const lineEndX = cx + totalRadius * cos;  
  const lineEndY = cy + totalRadius * sin;  

  const textOffset = 12;   
  const textX = lineEndX + (cos >= 0 ? 1 : -1) * textOffset;  
  const textAnchor = cos >= 0 ? 'start' : 'end';  

  return (  
    <g>  
      <polyline  
        points={`${lineStartX},${lineStartY} ${lineEndX},${lineEndY}`}  
        stroke="black"  
        strokeWidth="2"  
        fill="none"/>  
      <text  
        x={textX} y={lineEndY}  
        textAnchor={textAnchor}  
        fill={color}  
        dominantBaseline="central">  
          {`${value}`}  
      </text>  
    </g>  
  );  
};  

const LeakedPieChart = () => {  
  const { combolist_chart } = useDetailReport();  
  const transformedData = combolist_chart.map((item, index) => ({  
    name: item.legend,  
    value: item.count,  
    color: COLORS[index % COLORS.length],  
  }));  

  const sliceBorderColor = 'white'; // Assuming a white background; adjust as needed.  
  const sliceBorderWidth = 3;
  
  return (  
    <ResponsiveContainer width="100%" height="100%">  
      <PieChart>  
        <Pie  
          data={transformedData}  
          cx="50%"  
          cy="50%"  
          label={renderCustomizedLabel}  
          labelLine={false} // Set to false if you do not wish to show a connecting line  
          outerRadius={80}  
          innerRadius={0} // You can adjust this if you want a donut-shaped pie chart  
          fill="#8884d8"  
          dataKey="value"  
          stroke={sliceBorderColor}  
          strokeWidth={sliceBorderWidth} // Create a 'white space'  
        >  
          {transformedData.map((entry, index) => (  
            <Cell key={`cell-${index}`} fill={entry.color} />  
          ))}  
        </Pie>  
      </PieChart>  
    </ResponsiveContainer>  
  );  
};  

export default LeakedPieChart;