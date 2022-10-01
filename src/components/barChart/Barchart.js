import "./barchart.scss"
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
    { name: "January", Sell: 1200, Commission: 360 },
    { name: "February", Sell: 2100, Commission: 525 },
    { name: "March", Sell: 800, Commission: 240 },
    { name: "April", Sell: 1600, Commission: 480 },
    { name: "May", Sell: 900, Commission: 270 },
    { name: "June", Sell: 1700, Commission: 510 },
    { name: "July", Sell: 1600, Commission: 480 },
    { name: "August", Sell: 900, Commission: 270 },
    { name: "September", Sell: 1700, Commission: 510 },
  ];

const Barchart = () => {
    return (
        <div className="barchart">
             <ResponsiveContainer width={'99%'} height={450}>
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Sell" fill="#000033" />
          <Bar dataKey="Commission" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
        </div>
    )
}
export default Barchart