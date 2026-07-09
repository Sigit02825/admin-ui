import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Card from "../Elements/Card";

function CardUpcomingBill(props) {
  const { data, loading = false } = props;

  return (
    <>
      <Card
        title="Upcoming Bill"
        link="/bill"
       	desc={
          loading ? (
            <div className="min-h-[220px] flex flex-col justify-center items-center text-primary">
              <CircularProgress color="inherit" size={50} enableTrackSlot />
              <span className="mt-3">Loading Data</span>
            </div>
          ) : data.length === 0 ? (
            <div className="min-h-[220px] flex items-center justify-center text-gray-03">
              Belum ada data bills.
            </div>
          ) : (
            <div className="flex flex-col justify-around h-full">
						  {data.map((item) => (
		            <div key={item.id} className="flex justify-between pt-3 pb-3">
		              <div className="flex">
		                <div className="bg-special-bg p-4 rounded-lg flex flex-col">
		                  <span className="text-xs">{item.month}</span>
		                  <span className="text-2xl font-bold">{item.date}</span>
		                </div>
		                <div className="ms-10">
		                  {item.icon}
		                  <span className="font-bold">{item.name}</span>
		                  <br />
		                  <span className="text-xs">Last Charge - {item.lastCharge}</span>
		                </div>
		              </div>
		              <div className="flex items-center">
		                <span className="py-2 px-4 border border-gray-05 rounded-lg font-bold">
		                  ${item.amount}
		                </span>
		              </div>
		            </div>
		          ))}
			      </div>
          )
        }
      />
    </>
  );
}

export default CardUpcomingBill;
