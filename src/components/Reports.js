import React, { useContext, useEffect } from "react";
import { ReportContext } from "../context/report/ReportContext";
import dayjs from "dayjs";
import converter from "../converters";

import "../styles/reports.scss";
import ReportEditor from "./ReportEditor";
import BlockReports from "./BlockReports";
const cssClass = `reports`;
const todayString = dayjs(Date()).format("YYYY-MM-DD");

export default function Reports() {
  const { fetchReports, reports, fetchStatic } = useContext(ReportContext);

  useEffect(() => {
    fetchStatic();
    fetchReports();
    // eslint-disable-next-line
  }, []);

  const days = {};

  reports.forEach(report => {
    const reportDay = converter.date.toView(report.begin);
    days[reportDay] = days[reportDay] || [];
    days[reportDay].push(report);
  });

  const daysBlock = Object.keys(days)
    .sort((a, b) => new Date(b) - new Date(a))
    .map(day => {
      const afterTitle = day === todayString ? " (Today)" : "";
      return {
        reports: days[day],
        title: day + afterTitle
      };
    });

  function getDays() {
    return daysBlock.map(dayBlock => {
      return (
        <BlockReports
          key={dayBlock.title}
          title={dayBlock.title}
          reports={dayBlock.reports}
        ></BlockReports>
      );
    });
  }

  return (
    <div className={cssClass}>
      <div className={`${cssClass}__list`}>
        <h3>Reports</h3>
        {getDays()}
      </div>

      <div className={`${cssClass}__editor`}>
        <ReportEditor />
      </div>
    </div>
  );
}
