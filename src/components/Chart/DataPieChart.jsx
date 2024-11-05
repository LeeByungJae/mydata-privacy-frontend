import React, { useState } from "react";
import { PieChart, Pie, Sector, Cell } from "recharts";
import "./ChartStyle.css";

const renderDefaultShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    value,
    name,
    percent,
    activeIndex,
    dataLength,
  } = props;

  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);

  // 선을 조금 더 안쪽으로 조정
  const sx = cx + outerRadius * cos;
  const sy = cy + outerRadius * sin;
  const mx = cx + (outerRadius + 10) * cos;
  const my = cy + (outerRadius + 10) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 12; // 끝 위치도 조금 더 짧게 조정
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";
  return (
    <g>
      {/* 기본 파이 조각 */}
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        fillOpacity={0.8}
      />
      {/* 선 및 연결된 텍스트 (기본 상태에서도 항상 표시) */}
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={5} fill={fill} stroke="none" />
      <text
        className="pie-text"
        x={ex + (cos >= 0 ? 1 : -1) * 10}
        y={ey}
        textAnchor={textAnchor}
      >{`${name} ${value}건`}</text>
      <text
        className="pie-sub-text"
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
      >
        {`(${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
    name,
    activeIndex,
    dataLength,
  } = props;

  // 모든 파이 섹션이 활성화 상태인지 확인
  const isAllActive = activeIndex && activeIndex.length === dataLength;

  // "전체" 상태일 때 사용할 색상 (고정된 색상)
  const overallColor = "#232838;"; // 원하는 전체 색상으로 설정

  // 활성화된 섹터의 반지름 값을 늘려 더 두껍게 보이게 합니다.
  const adjustedOuterRadius = outerRadius + 5;

  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (adjustedOuterRadius + 10) * cos;
  const sy = cy + (adjustedOuterRadius + 10) * sin;
  const mx = cx + (adjustedOuterRadius + 25) * cos;
  const my = cy + (adjustedOuterRadius + 25) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 10;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text
        className="pie-center-text"
        x={cx}
        y={cy}
        dy={8}
        textAnchor="middle"
        fill={isAllActive ? overallColor : fill} // 전체일 때 고정 색상 사용
      >
        {isAllActive ? "전체" : payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={adjustedOuterRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill} // 전체일 때 고정 색상 사용
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 10}
        outerRadius={outerRadius + 18}
        fill={fill} // 전체일 때 고정 색상 사용
        fillOpacity={0.8}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill} // 전체일 때 고정 색상 사용
        fill="none"
      />
      <circle cx={ex} cy={ey} r={5} fill={fill} stroke="none" />
      <text
        className="pie-active-text"
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
      >
        {`${name} ${value}건`}
      </text>
      <text
        className="pie-active-sub-text"
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
      >
        {`(${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

export default function DataPieChart({ data, onPieClick, activeIndex }) {
  // const [activeIndex, setActiveIndex] = useS
  const dataLength = data.length;

  // const onPieEnter = (_, index) => {
  //   setActiveIndex(index);
  // };

  return (
    <PieChart width={400} height={320}>
      <Pie
        className="custom-pie"
        data={data}
        activeIndex={activeIndex}
        // onMouseEnter={onPieEnter}
        onClick={(entry, index) => {
          // "전체" 텍스트를 클릭한 경우 onPieClick 호출하지 않음
          if (entry.name !== "전체") {
            onPieClick(entry.name, index);
          }
        }}
        activeShape={(props) =>
          renderActiveShape({ ...props, dataLength, activeIndex })
        }
        inactiveShape={renderDefaultShape}
        cx={180}
        cy={160}
        innerRadius={30}
        outerRadius={100}
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.color} />
        ))}
      </Pie>
    </PieChart>
  );
}
