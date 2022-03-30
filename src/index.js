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
let tzLocal = dayjs.tz.guess(); 
tzLocal = "Europe/London"; 
dayjs.tz.setDefault(tzLocal); 


const FormatHelper = {
  formatDateLocal: (date) => {
    // LOCAL timezone - Europe/Madrid (CET)
    
    return dayjs(Number(date)).format("DD MMMM YYYY HH:mm:ss:SSS");  // to local format - 
  },
  formatDateUTC: (date) => {
    // UTC universal time

    return dayjs.utc(Number(date)).format("DD MMMM YYYY HH:mm:ss:SSS");
  },
  formatDateLondon: (date) => {
    // America/New_York (EST) - set by dayjs.tz.setDefault()
    dayjs.tz.setDefault("Europe/London");
    //dayjs.tz.setDefault("Europe/London");
    return dayjs(Number(date)).tz().format("DD MMMM YYYY HH:mm:ss:SSS");
  },
  formatDateBrowseApp: (date) => {
    // America/New_York (EST) - set by dayjs.tz.setDefault()
    dayjs.tz.setDefault("Europe/London");
    const todayDate = dayjs(date).tz().startOf('day') 
    console.log(todayDate.format())
    console.log("BOolean", dayjs(todayDate).tz().isSame("2022-03-27T00:00:00Z", "day"))  // false
    return  dayjs(todayDate).tz().format("DD MMMM YYYY HH:mm:ss:SSS");  // Local time to Europe London
  },
  formatDateNYC: (date) => {
    // America/New_York (EST) - set by dayjs.tz.setDefault()
     dayjs.tz.setDefault("America/New_York");
    //dayjs.tz.setDefault("Europe/London");
    return dayjs(Number(date)).tz().format("DD MMMM YYYY HH:mm:ss:SSS");
  },
  formatDateIST: (date) => {
    // America/New_York (EST) - set by dayjs.tz.setDefault()
     dayjs.tz.setDefault("Asia/Kolkata");
    //dayjs.tz.setDefault("Europe/London");
    return dayjs(Number(date)).tz().format("DD MMMM YYYY HH:mm:ss:SSS");
  }
};


//const now = String(Date.now()); // timestamps will be fetched as strings
const UTCdate = "2022-03-25T23:00:00Z"  //  view Slots 
const dateFormat = "YYYY-MM-DDTHH:mm:ss";
// console.log(UTCdate.getTime());

const convertedDate = dayjs(UTCdate, dateFormat);
// const todayDate = toDate(null).startOf('day') 
//   return toDate(todayDate).isSame(date, 'day')


// console.log(convertedDate);
// console.log(convertedDate.startOf("day"));
// console.log(convertedDate.startOf("month"));



const now = convertedDate.$d.getTime();

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
              formatDateBrowseApp(now){" "}
                <span style={{ color: "silver" }}>
                  set by dayjs.tz.setDefault("Europe/London")
                </span>
              </strong>
            </Box>
            <Box flex="3 1 0"> {FormatHelper.formatDateBrowseApp(now)}</Box>
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
