import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "styled-components";
import mintTheme from "carbon-react/lib/style/themes/mint";
import GlobalStyle from "carbon-react/lib/style/global-style";
import AppWrapper from "carbon-react/lib/components/app-wrapper";
import Box from "carbon-react/lib/components/box";

// dayjs imports
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import dayjsRelativeTime from "dayjs/plugin/relativeTime";
import advancedFormat from "dayjs/plugin/advancedFormat";

// dayjs config
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(dayjsRelativeTime);
dayjs.extend(advancedFormat);

// dayjs timezone config
let tzLocal = dayjs.tz.guess(); // gets local client timezone - Europe/Madrid (CET)
tzLocal = "Europe/London"; // reassign to specific timezone - America/New_York (EST)
dayjs.tz.setDefault(tzLocal); // sets default timezone ONLY when .tz() is chained !!

/**
 * NOTE: benchmarks for Number(string) VS parseInt(string, 10)
 * show Number() approx 33% faster performance
 * ref: http://phrogz.net/js/string_to_number.html
 */

const FormatHelper = {
  formatDateLocal: (date) => {
    // LOCAL timezone - Europe/Madrid (CET)
    // IGNORES dayjs.tz.setDefault() setting because .tz() NOT chained
    return dayjs(Number(date)).format("DD MMMM YYYY HH:mm:ss:SSS");
  },
  formatDateUTC: (date) => {
    // UTC universal time
    // IGNORES dayjs.tz.setDefault() setting because .tz() NOT chained
    return dayjs.utc(Number(date)).format("DD MMMM YYYY HH:mm:ss:SSS");
  },
  formatDateLondon: (date) => {
    // America/New_York (EST) - set by dayjs.tz.setDefault()
    dayjs.tz.setDefault("Europe/London");
    return dayjs(Number(date)).tz().format("DD MMMM YYYY HH:mm:ss:SSS");
  },
  formatDateNYC: (date) => {
    // America/New_York (EST) - set by dayjs.tz.setDefault()
    // dayjs.tz.setDefault("America/New_York");
    dayjs.tz.setDefault("Europe/London");
    return dayjs(Number(date)).tz().format("DD MMMM YYYY HH:mm:ss:SSS");
  },
  formatDateIST: (date) => {
    // America/New_York (EST) - set by dayjs.tz.setDefault()
    // dayjs.tz.setDefault("Asia/Kolkata");
    dayjs.tz.setDefault("Europe/London");
    return dayjs(Number(date)).tz().format("DD MMMM YYYY HH:mm:ss:SSS");
  }
};

//const now = String(Date.now()); // timestamps will be fetched as strings
const UTCdate = new Date("2022-03-27T03:00:00Z");
const dateFormat = "YYYY-MM-DDTHH:mm:ss";
// console.log(UTCdate.getTime());

const convertedDate = dayjs(UTCdate, dateFormat);

console.log(convertedDate);
console.log(convertedDate.startOf("day"));
console.log(convertedDate.startOf("month"));

const now = UTCdate.getTime();

const App = () => {
  return (
    <ThemeProvider theme={mintTheme}>
      <GlobalStyle />
      <AppWrapper>
        <h1>
          <code>dayjs examples testing timezone localisation</code>
        </h1>
        <hr />

        {/* =========================================================== */}

        <div style={{ fontFamily: "monospace" }}>
          <Box display="flex" alignItems="center">
            <Box flex="2 1 0">
              <strong>dayjs.tz.guess()</strong>
            </Box>
            <Box flex="3 1 0">{dayjs.tz.guess()}</Box>
          </Box>
          <hr />

          <Box display="flex" alignItems="center">
            <Box flex="2 1 0">
              <strong>
                dayjs.tz(){" "}
                <span style={{ color: "silver" }}>
                  set by dayjs.tz.setDefault()
                </span>
              </strong>
            </Box>
            <Box flex="3 1 0">{tzLocal}</Box>
          </Box>
          <hr />

          <Box display="flex" alignItems="center">
            <Box flex="2 1 0">
              <strong>
                now
                <span style={{ color: "silver" }}> = String(Date.now())</span>
              </strong>
            </Box>
            <Box flex="3 1 0">{now}</Box>
          </Box>
          <hr />

          {/* =========================================================== */}

          <Box display="flex" alignItems="center">
            <Box flex="2 1 0">
              <strong>formatDateLocal(now)</strong>
            </Box>
            <Box flex="3 1 0">{FormatHelper.formatDateLocal(now)}</Box>
          </Box>
          <hr />

          <Box display="flex" alignItems="center">
            <Box flex="2 1 0">
              <strong>formatDateUTC(now)</strong>
            </Box>
            <Box flex="3 1 0">{FormatHelper.formatDateUTC(now)}</Box>
          </Box>
          <hr />

          <Box display="flex" alignItems="center">
            <Box flex="2 1 0">
              <strong>
                formatDateLondon(now){" "}
                <span style={{ color: "silver" }}>
                  set by dayjs.tz.setDefault("Europe/London")
                </span>
              </strong>
            </Box>
            <Box flex="3 1 0"> {FormatHelper.formatDateLondon(now)}</Box>
          </Box>
          <hr />
          <Box display="flex" alignItems="center">
            <Box flex="2 1 0">
              <strong>
                formatDateIST(now){" "}
                <span style={{ color: "silver" }}>
                  set by dayjs.tz.setDefault("Asia/Kolkata")
                </span>
              </strong>
            </Box>
            <Box flex="3 1 0"> {FormatHelper.formatDateIST(now)}</Box>
          </Box>
          <hr />
          <Box display="flex" alignItems="center">
            <Box flex="2 1 0">
              <strong>
                formatDateNYC(now){" "}
                <span style={{ color: "silver" }}>
                  set by dayjs.tz.setDefault("America/New_York")
                </span>
              </strong>
            </Box>
            <Box flex="3 1 0"> {FormatHelper.formatDateNYC(now)}</Box>
          </Box>
        </div>
      </AppWrapper>
    </ThemeProvider>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
