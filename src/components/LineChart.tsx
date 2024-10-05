import { useEffect, useMemo, useRef, useState } from "react";
import * as d3 from "d3";

export interface DataPoint {
  date: string; // ISO 8601 formatted date string
  sales: number; // String representation of a number
  cost: number; // String representation of a number
  clicks: number; // String representation of a number
}

export interface Metric {
  key: string;
  label: string;
  accessor: (d: DataPoint) => number;
  color: string;
  backgroundColor: string;
}

interface Dimensions {
  width: number;
  height: number;
  margins: number;
  containerWidth: number | null;
  containerHeight: number | null;
}

type LineChartProps = {
  data: DataPoint[];
  metrics: Metric[];
};

const generateYScale = (
  data: DataPoint[],
  metrics: Metric[],
  dimensions: { containerHeight: number }
): d3.ScaleLinear<number, number, never> => {
  // generate scale
  let minForEachMetric: number[] = [];
  let maxForEachMetric: number[] = [];

  // get min/max for each metric
  metrics.forEach((metric) => {
    let metricMax = d3.max(data, metric.accessor) as number;
    maxForEachMetric.push(metricMax);
    let metricMin = d3.min(data, metric.accessor) as number;
    minForEachMetric.push(metricMin);
  });

  // get min/max of all metrics
  let max = d3.max(maxForEachMetric) as number;
  let min = d3.min(minForEachMetric) as number;

  // if min is less than 0 we want actual min, else 0.
  if (min > 0) {
    min = 0;
  }

  return d3
    .scaleLinear()
    .domain([min, max])
    .range([dimensions.containerHeight, 0])
    .nice();
};

//position tooltip on x-axis
const calculateTooltipXPos = (
  dimensions: Dimensions,
  mousePos: number[],
  hoveredIndexData: DataPoint,
  xScale: d3.ScaleTime<number, number, never>,
  xAccessor: { (d: DataPoint): Date | null; (arg0: any): any }
) => {
  // determine if left or right side of chart
  let chartMiddleX = dimensions.width / 2;
  // mouse on left
  if (mousePos[0] <= chartMiddleX) {
    return xScale(xAccessor(hoveredIndexData) || new Date(0)) + 30;
    // mouse on right
  } else {
    return xScale(xAccessor(hoveredIndexData) || new Date(0)) - 150;
  }
};

//position tooltip on y-axis
const calculateTooltipYPos = (mousePos: number[], selectedMetrics: any[]) => {
  let offset = mousePos[1] + 10;
  selectedMetrics.forEach(() => {
    offset = offset - 5;
  });

  return offset;
};

const LineChart = ({ data, metrics }: LineChartProps) => {
  // Element References
  const svgRef = useRef<SVGSVGElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const svgContainer = useRef<HTMLDivElement | null>(null); // The PARENT of the SVG

  // State to track width and height of SVG Container
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const dimensions: Dimensions = useMemo(() => {
    let dimensions = {
      width: width,
      height: height,
      margins: 10,
      containerWidth: 0,
      containerHeight: 0,
    };

    dimensions.containerWidth = dimensions.width - dimensions.margins * 2;
    dimensions.containerHeight =
      dimensions.height - dimensions.margins * 2 || 0;

    return dimensions;
  }, [width, height]);

  useEffect(() => {
    const getSvgContainerSize = () => {
      const newWidth = svgContainer.current?.clientWidth || 0;
      setWidth(newWidth);

      const newHeight = svgContainer.current?.clientHeight || 0;
      setHeight(newHeight);
    };
    getSvgContainerSize();
    window.addEventListener("resize", getSvgContainerSize);
    return () => window.removeEventListener("resize", getSvgContainerSize);
  }, []);

  const svg = useMemo(() => {
    return d3
      .select(svgRef.current)
      .classed("line-chart-svg", true)
      .attr("width", dimensions.width)
      .attr("height", dimensions.height);
  }, [dimensions]);

  const container = useMemo(() => {
    // remove all previous elements
    svg.selectAll(".line-chart-inner-container").remove();

    return svg
      .append("g")
      .classed("line-chart-inner-container", true)
      .attr(
        "transform",
        `translate(${dimensions.margins}, ${dimensions.margins})`
      );
  }, [svg, dimensions]);

  const xAccessor = useMemo(() => {
    return (d: DataPoint) => new Date(d.date);
  }, []);

  // expected date format is Date object
  const xScale = useMemo(() => {
    return d3
      .scaleTime()
      .domain(d3.extent(data, xAccessor) as [Date, Date])
      .range([0, dimensions.containerWidth!]);
  }, [dimensions, xAccessor, data]);

  // const xAxis = useMemo(() => {
  //   return d3.axisBottom(xScale);
  // }, [xScale]);

  const yScale = useMemo(() => {
    return generateYScale(data, metrics, {
      containerHeight: dimensions.containerHeight || 0,
    });
  }, [data, metrics, dimensions]);

  const lineGenerator = (
    scale: d3.ScaleLinear<number, number, never>,
    accessor: (d: DataPoint) => number
  ) => {
    return d3
      .line<DataPoint>()
      .x((d) => xScale(xAccessor(d)))
      .y((d) => scale(accessor(d)))
      .curve(d3.curveBumpX);
  };

  // draw lines
  useEffect(() => {
    try {
      svg.selectAll(".data-path").remove();

      metrics.forEach((metric) => {
        const line = lineGenerator(yScale, metric.accessor);
        const linePath = line(data);

        container
          .append("path")
          .classed("data-path", true)
          .attr("d", linePath || "")
          .attr("fill", "none")
          .attr("stroke", metric.color)
          .attr("stroke-width", 1);
      });
    } catch (error) {
      console.log(error);
    }
  }, [svg, container, xAccessor, xScale, data, metrics, yScale]);

  //draw x axis
  // useEffect(() => {
  //   svg.selectAll(".xAxis").remove();
  //   container
  //     .append("g")
  //     .classed("xAxis", true)
  //     .style("transform", `translateY(${dimensions.containerHeight}px)`)
  //     .call(xAxis);
  // }, [svg, container, xAxis, dimensions]);

  // draw tooltip
  useEffect(() => {
    try {
      const tooltip = d3.select(tooltipRef.current);

      const onTouchMouseMoveMouse = (event: any) => {
        const mousePos = d3.pointer(event, this);

        // x coordinate stored in mousePos index 0
        const date = xScale.invert(mousePos[0]);

        // Custom Bisector - left, center, right
        const dateBisector = d3.bisector(xAccessor).center;

        const bisectionIndex = dateBisector(data, date);
        // math.max prevents negative index reference error
        const hoveredIndexData = data[Math.max(0, bisectionIndex)];

        // CIRCLES
        // remove all previous circles
        container.selectAll("circle").remove();

        // draw new circles
        metrics.forEach((metric) => {
          container
            .append("circle")
            .classed("tool-tip-dot", true)
            .attr("r", 7)
            .attr("fill", metric.color)
            .style("pointer-events", "none")
            .style("opacity", 0.7)
            .attr("cx", xScale(xAccessor(hoveredIndexData) || new Date(0)))
            .attr("cy", yScale(metric.accessor(hoveredIndexData)))
            .raise();
        });

        // TOOLTIP
        const x = calculateTooltipXPos(
          dimensions,
          mousePos,
          hoveredIndexData,
          xScale,
          xAccessor
        );
        const y = calculateTooltipYPos(mousePos, metrics);

        // position tooltip
        tooltip.style("top", `${y}px`).style("left", `${x}px`);

        // tooltip data

        // remove all previous tooltip elements
        tooltip.selectAll("label").remove();
        tooltip.selectAll("p").remove();
        tooltip.selectAll(".lc-tooltip-data").remove();

        // format tooltip label
        const dateFormatter = d3.timeFormat("%B %-d, %Y");

        tooltip
          .select(".date")
          .text(`${dateFormatter(xAccessor(hoveredIndexData))}`);

        metrics.forEach((metric) => {
          tooltip
            .select(".data")
            .append("div")
            .classed("lc-tooltip-data", true)
            .each(function () {
              d3.select(this)
                .append("label")
                .classed("lc-tooltip-data-label", true)
                .text(metric.label);

              d3.select(this)
                .append("p")
                .classed("lc-tooltip-data-value", true)
                .text(metric.accessor(hoveredIndexData))
                .style("color", metric.color)
                //.style("border", `1px solid ${metric.color}`)
                .style("border-radius", "2px")
                .style("padding", "2px 5px")
                .style("background-color", metric.backgroundColor);
            });
        });
      };

      const onMouseEnter = () => {
        // make tooltip visible
        tooltip.style("visibility", "visible").style("opacity", "0.9");
      };

      const onMouseLeave = () => {
        // remove all previous circles
        container.selectAll("circle").remove();
        // make tooltip invisible
        tooltip.style("visibility", "hidden").style("opacity", "0");
      };

      container
        .append("rect")
        .classed("line-chart-mouse-tracker", true)
        .attr("width", dimensions.containerWidth)
        .attr("height", dimensions.containerHeight)
        .style("opacity", 0)
        .on("touchmouse mousemove", (event) => onTouchMouseMoveMouse(event))
        .on("mouseenter", () => onMouseEnter())
        .on("mouseleave", () => onMouseLeave());
    } catch (error) {
      console.log(error);
    }
  }, [container, dimensions, xAccessor, xScale, data]);

  return (
    <div className="line-chart-container">
      <div ref={svgContainer} className="line-chart-svg-container">
        <svg ref={svgRef} />
        <div ref={tooltipRef} className="lc-tooltip">
          <div className="date"></div>
          <div className="data"></div>
        </div>
      </div>
    </div>
  );
};

export default LineChart;
