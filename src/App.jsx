
import { scaleLinear, scaleBand, extent, line, symbol } from "d3";
import { AxisLeft, AxisBottom } from "@visx/axis";
import census from "./census";

function App() {
  const chartSize = 800;
  const margin = 30;
  const legendPadding = 200;

  const male1900 = [];
  const male2000 = [];
  const female1900 = [];
  const female2000 = [];
  const totalPeople = [];
  const ages = ["5", "10", "15", "20", "25", "30", "45", "50", "60", "65", "70", "75", "80", "85", "90"]

  for (const entry of census) {
    totalPeople.push(entry.People / 1000000);
    if (entry.Sex == 1) {
      if (entry.Year == 1900) {
        male1900.push(entry.People / 1000000);
      } else {
        male2000.push(entry.People / 1000000);
      }
    } else {
      if (entry.Year == 1900) {
        female1900.push(entry.People / 1000000);
      } else {
        female2000.push(entry.People / 1000000);
      }     
    }
  }

  // console.log(totalPeople)

  const _extent = extent(totalPeople);
  const _scaleY = scaleLinear()
    .domain(_extent)
    .range([chartSize - margin, margin]);
  const _scaleLine = scaleLinear()
    .domain([0, 18.6])
    .range([margin, chartSize - margin]);
  const _scaleAge = scaleBand()
  .domain(ages)
  .range([0, chartSize - margin - margin]);
  const _lineMaker = line()
    .x((d, i) => {
      return _scaleLine(i);
    })
    .y((d) => {
      return _scaleY(d);
    });
  
  const total = []

  total.push(male1900)
  total.push(male2000)
  total.push(female1900)
  total.push(female2000)

  return (
    <div style={{ margin: 20 }}>
      <h1> U.S. Age Population in 1900 and 2000</h1>
      <svg width={chartSize + legendPadding} 
          height={chartSize}>
        <AxisLeft left={margin} scale={_scaleY} />
        <AxisBottom
          top={chartSize - margin}
          left={margin}
          scale={_scaleAge}
          tickValues={ages}
        />
        <path
          stroke = {"skyblue"}
          strokeWidth = {2}
          fill = {"none"}
          d={_lineMaker(male1900)}
        />
        <path
          stroke = {"blue"}
          strokeWidth = {2}
          fill = {"none"}
          d={_lineMaker(male2000)}
        />
        <path
          stroke = {"pink"}
          strokeWidth = {2}
          fill = {"none"}
          d={_lineMaker(female1900)}
        />
        <path
          stroke = {"deeppink"}
          strokeWidth = {2}
          fill = {"none"}
          d={_lineMaker(female2000)}
        />
        <text x="-150" y="45" transform="rotate(-90)" fontSize={10}>
          U.S. Population (millions)
        </text>
        <text x="40" y="760" fontSize={10}>
          Ages (0 - 90)
        </text>
        <text
          fill={"black"}
          style={{
            fontSize: 10,
          }}
          x={260}
          y={570}
        >
        Male Population (1900) 
        </text>
        <text
          fill={"black"}
          style={{
            fontSize: 10,
          }}
          x={505}
          y={600}
        >
        Male Population (2000)
        </text>
        <text
          fill={"black"}
          style={{
            fontSize: 10,
          }}
          x={670}
          y={550}
        >
        Female Population (2000)
        </text>
        <text
          fill={"black"}
          style={{
            fontSize: 10,
          }}
          x={230}
          y={660}
        >
        Female Population (1900)
        </text>
      </svg>
    </div>
  )
}

export default App
